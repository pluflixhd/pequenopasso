import { describe, expect, it } from "vitest";
import { categories, getProduct, isPurchasable, products } from "@/data/products";

describe("Catálogo Pequeno Passo", () => {
  it("preserva os três registros anteriores e prepara 35 propostas distintas", () => {
    expect(products).toHaveLength(38);
    expect(new Set(products.map((product) => product.id)).size).toBe(products.length);
    expect(categories).toHaveLength(5);
  });
  it("não permite vender rascunhos com valores ou checkouts não validados", () => {
    const antigo = getProduct("bolas");
    expect(antigo).toBeDefined();
    expect(isPurchasable(antigo!)).toBe(false);
    expect(products.every((product) => !isPurchasable(product))).toBe(true);
  });
  it("exige publicação, preço e checkout https para autorizar compra", () => {
    const kit = getProduct("caixa-magica-papai-noel");
    expect(kit).toBeDefined();
    expect(isPurchasable({ ...kit!, status: "publicado", price: 159, checkoutUrl: "#" })).toBe(false);
    expect(isPurchasable({ ...kit!, status: "rascunho", price: 159, checkoutUrl: "https://checkout.example.com/kit" })).toBe(false);
    expect(isPurchasable({ ...kit!, status: "publicado", price: 159, checkoutUrl: "https://checkout.example.com/kit" })).toBe(true);
  });
});
