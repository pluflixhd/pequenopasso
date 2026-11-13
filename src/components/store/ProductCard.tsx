import { ArrowUpRight, Gift, Sparkles, Lightbulb, TreePine, Stars, Layers3 } from "lucide-react";
import type { CSSProperties } from "react";
import type { Product } from "@/data/products";
import { formatBRL, isPurchasable } from "@/data/products";

const illustrations = { kits: Gift, piscas: Sparkles, cortinas: Stars, fitas: Lightbulb, decoracao: TreePine };

export function ProductVisual({ product, large = false }: { product: Product; large?: boolean }) {
  const Icon = illustrations[product.category] ?? Layers3;
  const visualStyle = { "--art-hue": product.visualHue } as CSSProperties;
  return (
    <div className={`product-visual ${large ? "product-visual-large" : ""}`} style={visualStyle}>
      {product.image ? (
        <img src={product.image} alt={product.imageIsConcept ? "Ilustração conceitual da embalagem natalina, não uma fotografia do kit" : `Imagem anterior do catálogo: ${product.name}`} loading={large ? "eager" : "lazy"} className="product-visual-image" />
      ) : (
        <div aria-hidden="true" className="product-visual-symbol">
          <span className="product-visual-halo" />
          <Icon strokeWidth={0.7} className="product-visual-icon" />
          <span className="product-visual-orbit product-visual-orbit-one" />
          <span className="product-visual-orbit product-visual-orbit-two" />
        </div>
      )}
      <span className="product-visual-note">{product.imageIsConcept ? "Imagem conceitual" : product.image ? "Foto anterior • validar" : "Visual ilustrativo • foto pendente"}</span>
    </div>
  );
}

export function ProductCard({ product }: { product: Product }) {
  const purchasable = isPurchasable(product);
  return (
    <article className="catalog-card group">
      <a href={`/?produto=${encodeURIComponent(product.id)}`} aria-label={`Conhecer ${product.name}`} className="block">
        <div className="relative overflow-hidden">
          <ProductVisual product={product} />
          <span className="catalog-tag">{purchasable ? (product.badge || "Disponível") : "Prévia da coleção"}</span>
        </div>
      </a>
      <div className="catalog-content">
        <span className="eyebrow text-xs">{product.category === "kits" ? "FANTASIAS & KITS" : product.category === "fitas" ? "LED DECORATIVO" : "COLEÇÃO DE NATAL"}</span>
        <a href={`/?produto=${encodeURIComponent(product.id)}`} className="catalog-title">{product.name}</a>
        <p className="catalog-description">{product.description}</p>
        {purchasable && typeof product.price === "number"
          ? <p className="catalog-price">{formatBRL(product.price)}</p>
          : <p className="catalog-pending">Preço e disponibilidade a confirmar</p>}
        <a href={`/?produto=${encodeURIComponent(product.id)}`} className="catalog-link">
          Ver detalhes <ArrowUpRight size={17} strokeWidth={1.6} />
        </a>
      </div>
    </article>
  );
}
