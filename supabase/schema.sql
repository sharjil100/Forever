-- FOREVER store schema. Run once in Supabase → SQL Editor (safe to re-run).
-- Only the website's server (service_role key) can read/write; RLS is on with no public policies.

create table if not exists public.stock (
  slug       text    not null,
  size       text    not null,
  qty        integer not null default 0 check (qty >= 0),
  updated_at timestamptz not null default now(),
  primary key (slug, size)
);

create sequence if not exists public.order_number_seq start 1001;

create table if not exists public.orders (
  id            bigint generated always as identity primary key,
  order_no      text not null unique default ('FV-' || nextval('public.order_number_seq')),
  created_at    timestamptz not null default now(),
  status        text not null default 'new'
                check (status in ('new', 'confirmed', 'shipped', 'delivered', 'cancelled')),
  customer_name text not null,
  phone         text not null,
  email         text,
  address       text not null,
  area          text not null check (area in ('inside_dhaka', 'outside_dhaka')),
  note          text,
  subtotal      integer not null,
  delivery      integer not null,
  total         integer not null
);

create table if not exists public.order_items (
  id         bigint generated always as identity primary key,
  order_id   bigint not null references public.orders(id) on delete cascade,
  slug       text not null,
  name       text not null,
  color_name text not null,
  size       text not null,
  qty        integer not null check (qty > 0),
  price      integer not null
);

create index if not exists orders_created_idx on public.orders (created_at desc);
create index if not exists orders_status_idx on public.orders (status);
create index if not exists order_items_order_idx on public.order_items (order_id);

-- Only the server key (service_role) gets access; the public anon key gets nothing.
grant usage on schema public to service_role;
grant select, insert, update, delete on public.stock, public.orders, public.order_items to service_role;
grant usage, select on sequence public.order_number_seq to service_role;
revoke all on public.stock, public.orders, public.order_items from anon, authenticated;

alter table public.stock       enable row level security;
alter table public.orders      enable row level security;
alter table public.order_items enable row level security;

-- Place an order atomically: lock the stock rows, check every item, decrement, insert.
-- p_order: {customer_name, phone, email, address, area, note, subtotal, delivery, total}
-- p_items: [{slug, name, color_name, size, qty, price}, ...]  (prices are computed by the server, not the browser)
create or replace function public.place_order(p_order jsonb, p_items jsonb)
returns table (order_id bigint, order_no text)
language plpgsql
security definer
set search_path = public
as $$
#variable_conflict use_column
declare
  it        jsonb;
  available integer;
  short     text[] := '{}';
  new_id    bigint;
  new_no    text;
begin
  -- lock in a stable order to avoid deadlocks between simultaneous orders
  for it in select value from jsonb_array_elements(p_items) order by value->>'slug', value->>'size' loop
    select s.qty into available from stock s
      where s.slug = it->>'slug' and s.size = it->>'size' for update;
    if available is null or available < (it->>'qty')::int then
      short := short || format('%s|%s|%s', it->>'slug', it->>'size', coalesce(available, 0));
    end if;
  end loop;

  if array_length(short, 1) > 0 then
    raise exception 'OUT_OF_STOCK:%', array_to_string(short, ',') using errcode = 'P0001';
  end if;

  for it in select value from jsonb_array_elements(p_items) loop
    update stock set qty = qty - (it->>'qty')::int, updated_at = now()
      where slug = it->>'slug' and size = it->>'size';
  end loop;

  insert into orders (customer_name, phone, email, address, area, note, subtotal, delivery, total)
  values (p_order->>'customer_name', p_order->>'phone', nullif(p_order->>'email', ''),
          p_order->>'address', p_order->>'area', nullif(p_order->>'note', ''),
          (p_order->>'subtotal')::int, (p_order->>'delivery')::int, (p_order->>'total')::int)
  returning id, orders.order_no into new_id, new_no;

  insert into order_items (order_id, slug, name, color_name, size, qty, price)
  select new_id, i->>'slug', i->>'name', i->>'color_name', i->>'size', (i->>'qty')::int, (i->>'price')::int
  from jsonb_array_elements(p_items) i;

  return query select new_id, new_no;
end;
$$;

-- Change an order's status. Cancelling puts the items back into stock; a cancelled order can't be reopened.
create or replace function public.set_order_status(p_order_id bigint, p_status text)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  current_status text;
begin
  select status into current_status from orders where id = p_order_id for update;
  if current_status is null then
    raise exception 'ORDER_NOT_FOUND';
  end if;
  if current_status = 'cancelled' then
    raise exception 'ORDER_ALREADY_CANCELLED';
  end if;
  if p_status = 'cancelled' then
    update stock s set qty = s.qty + oi.qty, updated_at = now()
      from order_items oi
      where oi.order_id = p_order_id and s.slug = oi.slug and s.size = oi.size;
  end if;
  update orders set status = p_status where id = p_order_id;
end;
$$;

revoke all on function public.place_order(jsonb, jsonb) from public, anon, authenticated;
revoke all on function public.set_order_status(bigint, text) from public, anon, authenticated;
grant execute on function public.place_order(jsonb, jsonb) to service_role;
grant execute on function public.set_order_status(bigint, text) to service_role;

-- Opening stock (counted 19 Nov 2026).
-- Only inserted on the first run; after that, manage quantities in /admin/stock.
insert into public.stock (slug, size, qty) values
  ('hoodie-steel-grey',       'XL', 9), ('hoodie-steel-grey',       'L', 18), ('hoodie-steel-grey',       'M', 0),
  ('hoodie-cherry-wood',      'XL', 8), ('hoodie-cherry-wood',      'L', 15), ('hoodie-cherry-wood',      'M', 2),
  ('hoodie-fossil',           'XL', 7), ('hoodie-fossil',           'L', 14), ('hoodie-fossil',           'M', 0),
  ('hoodie-undying-black',    'XL', 7), ('hoodie-undying-black',    'L', 12), ('hoodie-undying-black',    'M', 2),
  ('sweatpant-steel-grey',    'XL', 1), ('sweatpant-steel-grey',    'L', 7),  ('sweatpant-steel-grey',    'M', 5),
  ('sweatpant-cherry-wood',   'XL', 2), ('sweatpant-cherry-wood',   'L', 7),  ('sweatpant-cherry-wood',   'M', 7),
  ('sweatpant-fossil',        'XL', 1), ('sweatpant-fossil',        'L', 5),  ('sweatpant-fossil',        'M', 0),
  ('sweatpant-undying-black', 'XL', 3), ('sweatpant-undying-black', 'L', 0),  ('sweatpant-undying-black', 'M', 1)
on conflict do nothing;

-- T-shirts: not counted yet → 0, which the site shows as "Available Soon". Enter counts in /admin/stock.
insert into public.stock (slug, size, qty)
select p.slug, s.size, 0
from (values ('tee-obsidian'), ('tee-asphalt'), ('tee-rust'), ('tee-bare-minimum'), ('tee-mocha')) as p(slug)
cross join (values ('S'), ('M'), ('L'), ('XL')) as s(size)
on conflict do nothing;
