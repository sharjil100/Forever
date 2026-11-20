import { notFound } from 'next/navigation';
import ProductView from '@/components/ProductView';
import ProductCard from '@/components/ProductCard';
import { products, getProduct, completeTheLook } from '@/data/products';

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }) {
  const p = getProduct(params.slug);
  return p ? { title: `${p.name} — ${p.colorName} | FOREVER` } : {};
}

export default function ProductPage({ params }) {
  const product = getProduct(params.slug);
  if (!product) notFound();

  const colorways = products.filter((p) => p.category === product.category);
  const related = completeTheLook(product);

  return (
    <>
      <ProductView product={product} colorways={colorways} />
      <section className="section">
        <div className="section-head">
          <h2 className="section-title">Complete the Look</h2>
        </div>
        <div className="grid">
          {related.map((p) => <ProductCard key={p.slug} product={p} />)}
        </div>
      </section>
    </>
  );
}
