import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Product } from "@/data/products";
import { formatBRL, isPurchasable } from "@/data/products";

export function ProductVisual({ product, large = false }: { product: Product; large?: boolean }) {
  const generated = product.imageOrigin === "gerada-ia";
  return (
    <div className={cn("product-visual", large && "product-visual-large", generated && "product-visual-generated", product.imageOrigin === "foto-enviada" && "product-visual-supplied")}>
      <img src={product.image} alt={generated ? `Imagem fotorrealista gerada por IA de ${product.name}` : product.imageOrigin === "foto-enviada" ? `Imagem enviada do produto ${product.name}, dados técnicos pendentes de confirmação` : `Imagem anterior do catálogo: ${product.name}`} loading={large ? "eager" : "lazy"} decoding="async" width={1920} height={1080} className="product-visual-image" />
      <span className="product-visual-note">{generated ? "Imagem gerada por IA" : product.imageOrigin === "foto-enviada" ? "Imagem enviada pelo lojista" : "Foto anterior • validar"}</span>
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
