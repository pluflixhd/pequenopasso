import { describe, expect, it } from "vitest";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { categories, getProduct, isPurchasable, products, suppliedPhotos } from "@/data/products";
import { generatedImages } from "@/data/product-images";

describe("Catálogo Pequeno Passo", () => {
  it("preserva os três registros anteriores e prepara 35 propostas distintas", () => {
    expect(products).toHaveLength(38);
    expect(new Set(products.map((product) => product.id)).size).toBe(products.length);
    expect(categories).toHaveLength(5);
  });
  it("não permite vender rascunhos com valores ou checkouts não validados", () => {
    const antigo = getProduct("bolas");
    expect(antigo).toBeDefined();
    if (!antigo) throw new Error("Produto anterior ausente");
    expect(isPurchasable(antigo)).toBe(false);
    expect(products.every((product) => !isPurchasable(product))).toBe(true);
  });
  it("exige publicação, preço e checkout https para autorizar compra", () => {
    const kit = getProduct("caixa-magica-papai-noel");
    expect(kit).toBeDefined();
    if (!kit) throw new Error("Kit ausente");
    expect(isPurchasable({ ...kit, status: "publicado", price: 159, checkoutUrl: "#" })).toBe(false);
    expect(isPurchasable({ ...kit, status: "rascunho", price: 159, checkoutUrl: "https://checkout.example.com/kit" })).toBe(false);
    expect(isPurchasable({ ...kit, status: "publicado", price: 159, checkoutUrl: "https://checkout.example.com/kit" })).toBe(true);
  });
  it("associa as seis fotos enviadas aos modelos e variantes corretos", () => {
    expect(suppliedPhotos).toEqual({
      "pisca-branco-quente": "/produtos/pisca-branco-quente.avif",
      "pisca-branco-frio": "/produtos/pisca-branco-frio.avif",
      "pisca-colorido": "/produtos/pisca-colorido.avif",
      "pisca-azul": "/produtos/pisca-azul.avif",
      "fita-rgb": "/produtos/fita-rgb.avif",
      "fita-rgb-controle": "/produtos/fita-rgb-controle.avif",
    });
    expect(Object.values(suppliedPhotos).every((path) => path.endsWith(".avif"))).toBe(true);
  });

  it("mostra uma imagem exclusiva existente para cada item do catálogo", () => {
    const images = products.map((p) => p.image).filter((url): url is string => !!url);
    expect(images).toHaveLength(products.length);
    expect(new Set(images).size).toBe(products.length);
    for (const product of products) {
      expect(product.image).toBeTruthy();
      if (product.image?.startsWith("/produtos/") || product.image === "/caixa-magica-conceito.svg") {
        expect(existsSync(join(process.cwd(), "public", product.image.slice(1)))).toBe(true);
      }
    }
  });
  it("substitui todas as 29 ilustrações por imagens fotorrealistas individuais", () => {
    expect(Object.keys(generatedImages)).toHaveLength(29);
    expect(products.some((product) => product.image?.endsWith(".svg"))).toBe(false);
    for (const [id, image] of Object.entries(generatedImages)) {
      expect(getProduct(id)?.image).toBe(image);
      expect(getProduct(id)?.imageOrigin).toBe("gerada-ia");
    }
  });
  it("mantém as fotos enviadas separadas das imagens geradas", () => {
    for (const [id, image] of Object.entries(suppliedPhotos)) {
      expect(getProduct(id)?.image).toBe(image);
      expect(getProduct(id)?.imageOrigin).toBe("foto-enviada");
    }
    for (const id of ["bolas", "guirlanda", "vela"]) {
      expect(getProduct(id)?.imageOrigin).toBe("catalogo-anterior");
    }
  });
});
