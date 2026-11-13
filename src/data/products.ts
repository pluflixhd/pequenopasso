import bolas from "@/assets/p-bolas.jpg";
import guirlanda from "@/assets/p-guirlanda.jpg";
import vela from "@/assets/p-vela.jpg";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  oldPrice: number;
  image: string;
  badge: string;
  /** Cole aqui o link do seu checkout para este produto. */
  checkoutUrl: string;
}

export const products: Product[] = [
  { id: "bolas", name: "Coleção Esmeralda Real", description: "6 bolas de vidro soprado com detalhes em ouro, feitas à mão.", price: 189.9, oldPrice: 279.9, image: bolas, badge: "Mais vendido", checkoutUrl: "#" },
  { id: "guirlanda", name: "Guirlanda Dourada Natural", description: "Pinho, laranjas secas e laço de cetim dourado. 45 cm.", price: 249.9, oldPrice: 349.9, image: guirlanda, badge: "Últimas unidades", checkoutUrl: "#" },
  { id: "vela", name: "Vela Christmas Spice", description: "Canela, pinho e cravo. Cera de soja, 60h de queima.", price: 119.9, oldPrice: 159.9, image: vela, badge: "Exclusivo", checkoutUrl: "#" },
];

export const formatBRL = (v: number) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
