import type { Product } from "@/data/products";
import { formatBRL } from "@/data/products";

export function ProductCard({ product }: { product: Product }) {
  const off = Math.round((1 - product.price / product.oldPrice) * 100);
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-elegant transition-transform duration-500 hover:-translate-y-1">
      <div className="relative aspect-square overflow-hidden">
        <img src={product.image} alt={product.name} loading="lazy" width={816} height={816} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <span className="absolute left-4 top-4 rounded-full bg-primary px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary-foreground">{product.badge}</span>
        <span className="absolute right-4 top-4 rounded-full bg-gold px-3 py-1 text-xs font-bold text-gold-foreground">-{off}%</span>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <h3 className="font-display text-2xl text-card-foreground">{product.name}</h3>
        <p className="text-sm text-muted-foreground">{product.description}</p>
        <div className="mt-auto flex items-baseline gap-3 pt-2">
          <span className="font-display text-3xl text-primary">{formatBRL(product.price)}</span>
          <span className="text-sm text-muted-foreground line-through">{formatBRL(product.oldPrice)}</span>
        </div>
        <p className="text-xs text-muted-foreground">ou 10x de {formatBRL(product.price / 10)} sem juros</p>
        <a href={product.checkoutUrl} className="btn-gold mt-2 text-center">Comprar agora</a>
      </div>
    </article>
  );
}
