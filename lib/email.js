import 'server-only';
import nodemailer from 'nodemailer';
import { formatPrice } from '@/data/site';

let transport;
function mailer() {
  if (!transport) {
    transport = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_APP_PASSWORD },
    });
  }
  return transport;
}

export const isEmailConfigured = () => Boolean(process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD);

const esc = (s = '') => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const AREA = { inside_dhaka: 'Inside Dhaka', outside_dhaka: 'Outside Dhaka' };

function itemsTable(items) {
  const rows = items.map((i) => `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid #eee">
        <b>${esc(i.name)}</b><br><span style="color:#666">${esc(i.color_name)} · Size ${esc(i.size)} · Qty ${i.qty}</span>
      </td>
      <td style="padding:10px 0;border-bottom:1px solid #eee;text-align:right;white-space:nowrap">${formatPrice(i.price * i.qty)}</td>
    </tr>`).join('');
  return `<table width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;font-size:14px">${rows}</table>`;
}

function totals(order) {
  const row = (label, value, bold) =>
    `<tr><td style="padding:4px 0;${bold ? 'font-weight:700;font-size:16px' : 'color:#555'}">${label}</td><td style="padding:4px 0;text-align:right;${bold ? 'font-weight:700;font-size:16px' : ''}">${value}</td></tr>`;
  return `<table width="100%" cellspacing="0" cellpadding="0" style="margin-top:12px;font-size:14px">
    ${row('Subtotal', formatPrice(order.subtotal))}
    ${row(`Delivery (${AREA[order.area]})`, formatPrice(order.delivery))}
    ${row('Total — Cash on Delivery', formatPrice(order.total), true)}
  </table>`;
}

const shell = (body) => `<!doctype html><html><body style="margin:0;background:#f4f4f4;font-family:Arial,Helvetica,sans-serif;color:#111">
  <div style="max-width:560px;margin:0 auto;padding:24px 16px">
    <div style="text-align:center;font-weight:700;letter-spacing:6px;font-size:22px;padding:8px 0 20px">FOREVER</div>
    <div style="background:#fff;padding:24px">${body}</div>
    <p style="text-align:center;color:#999;font-size:12px;margin-top:16px">FOREVER · Embrace the journey</p>
  </div></body></html>`;

export async function sendOwnerEmail(order, items) {
  const to = process.env.ORDER_NOTIFY_EMAIL || process.env.GMAIL_USER;
  const html = shell(`
    <h2 style="margin:0 0 4px;font-size:20px">New order ${esc(order.order_no)}</h2>
    <p style="margin:0 0 18px;color:#555">${formatPrice(order.total)} · ${items.reduce((s, i) => s + i.qty, 0)} item(s) · Cash on Delivery</p>
    <h3 style="font-size:13px;letter-spacing:1px;text-transform:uppercase;margin:0 0 6px">Customer</h3>
    <p style="margin:0 0 18px;line-height:1.6">
      <b>${esc(order.customer_name)}</b><br>
      Phone: <a href="tel:${esc(order.phone)}">${esc(order.phone)}</a><br>
      ${order.email ? `Email: ${esc(order.email)}<br>` : ''}
      ${esc(order.address).replace(/\n/g, '<br>')}<br>
      ${AREA[order.area]}
      ${order.note ? `<br><i>Note: ${esc(order.note)}</i>` : ''}
    </p>
    <h3 style="font-size:13px;letter-spacing:1px;text-transform:uppercase;margin:0 0 6px">Items</h3>
    ${itemsTable(items)}
    ${totals(order)}
  `);
  await mailer().sendMail({
    from: `"FOREVER Orders" <${process.env.GMAIL_USER}>`,
    to,
    replyTo: order.email || undefined,
    subject: `New order ${order.order_no} — ${formatPrice(order.total)} — ${order.customer_name}`,
    html,
  });
}

export async function sendCustomerEmail(order, items) {
  if (!order.email) return;
  const html = shell(`
    <h2 style="margin:0 0 6px;font-size:20px">Thank you, ${esc(order.customer_name.split(' ')[0])}!</h2>
    <p style="margin:0 0 18px;color:#555;line-height:1.6">
      We've received your order <b>${esc(order.order_no)}</b>. We'll call you on <b>${esc(order.phone)}</b> to confirm it before we ship.
    </p>
    ${itemsTable(items)}
    ${totals(order)}
    <h3 style="font-size:13px;letter-spacing:1px;text-transform:uppercase;margin:22px 0 6px">Delivering to</h3>
    <p style="margin:0;line-height:1.6;color:#333">${esc(order.address).replace(/\n/g, '<br>')}<br>${AREA[order.area]}</p>
    <p style="margin:22px 0 0;color:#555;line-height:1.6">Pay in cash when your order arrives. Questions? Just reply to this email.</p>
  `);
  await mailer().sendMail({
    from: `"FOREVER" <${process.env.GMAIL_USER}>`,
    to: order.email,
    subject: `Your FOREVER order ${order.order_no} is confirmed`,
    html,
  });
}
