import bolas from "@/assets/p-bolas.jpg";
import guirlanda from "@/assets/p-guirlanda.jpg";
import vela from "@/assets/p-vela.jpg";
import { generatedImages } from "@/data/product-images";

/** Catálogo editorial: somente itens confirmados pelo lojista podem ser publicados. */
export type Category = "kits" | "piscas" | "cortinas" | "fitas" | "decoracao";
export type ProductStatus = "rascunho" | "publicado";

export interface Product {
  id: string;
  name: string;
  description: string;
  category: Category;
  status: ProductStatus;
  /** Fotos devem ser reais e corresponder ao SKU. Ilustração não prova composição. */
  image?: string;
  imageIsConcept?: boolean;
  imageOrigin?: "foto-enviada" | "ilustracao" | "catalogo-anterior" | "gerada-ia";
  visualHue: number;
  price?: number;
  oldPrice?: number;
  checkoutUrl?: string;
  badge?: string;
  composition?: string[];
  details?: string[];
}

export const categories: { id: Category; label: string; description: string }[] = [
  { id: "kits", label: "Fantasias & Kits", description: "Histórias para celebrar em família" },
  { id: "piscas", label: "Pisca-Piscas", description: "Pontos de luz para cada ambiente" },
  { id: "cortinas", label: "Cortinas & Cascatas", description: "Luz em movimento, com elegância" },
  { id: "fitas", label: "Fitas LED", description: "Uma atmosfera feita de cor" },
  { id: "decoracao", label: "Decoração Iluminada", description: "Os detalhes que transformam" },
];

const draft = (id: string, name: string, category: Category, description: string, visualHue: number): Product => ({
  id, name, category, description, visualHue, status: "rascunho",
});

const catalog: Product[] = [
  {
    ...draft("caixa-magica-papai-noel", "Caixa Mágica do Papai Noel", "kits", "Edição Especial de Natal. Uma apresentação pensada para transformar a chegada do Papai Noel em uma lembrança inesquecível.", 10),
    badge: "Destaque da temporada",
    image: "/caixa-magica-conceito.svg",
    imageIsConcept: true,
    details: ["Composição do kit: aguardando confirmação do fornecedor.", "Tamanhos, materiais e acessórios: a confirmar.", "A imagem da embalagem é conceitual e não representa itens já inclusos."],
  },
  {
    ...draft("fantasia-classica-papai-noel", "Fantasia Clássica de Papai Noel", "kits", "Entre no espírito do Natal e seja o protagonista dos momentos mais especiais. Ideal para festas, apresentações e encontros familiares.", 0),
    badge: "Peça independente",
    details: ["Conteúdo exato da fantasia, tecido, tamanhos e disponibilidade: a confirmar.", "Vendida separadamente da Caixa Mágica, cuja composição ainda será definida."],
  },
  ...[
    ["pisca-branco-quente", "Pisca-Pisca LED Branco Quente", 42],
    ["pisca-branco-frio", "Pisca-Pisca LED Branco Frio", 205],
    ["pisca-colorido", "Pisca-Pisca LED Colorido", 300],
    ["pisca-azul", "Pisca-Pisca LED Azul", 222],
    ["pisca-vermelho", "Pisca-Pisca LED Vermelho", 0],
    ["pisca-verde", "Pisca-Pisca LED Verde", 140],
    ["pisca-fio-de-fada", "Pisca-Pisca Fio de Fada", 50],
    ["pisca-arvore", "Pisca-Pisca para Árvore", 95],
  ].map(([id, name, hue]) => draft(String(id), String(name), "piscas", "Possibilidade de iluminação natalina. Comprimento, voltagem, quantidade de LEDs e modos serão informados após a confirmação do SKU.", Number(hue))),
  ...[
    ["cascata-natalina", "Cascata de Luzes Natalinas", 45],
    ["cortina-led", "Cortina de LED Natalina", 205],
    ["mangueira-luminosa", "Mangueira Luminosa Natalina", 320],
    ["rede-luzes-led", "Rede de Luzes Decorativas", 130],
  ].map(([id, name, hue]) => draft(String(id), String(name), "cortinas", "Modelo para ambientações luminosas. Medidas, alimentação e uso interno ou externo sujeitos à ficha técnica do fornecedor.", Number(hue))),
  ...[
    ["fita-rgb", "Fita LED RGB Colorida", 300],
    ["fita-rgb-controle", "Fita LED RGB com Controle Remoto", 265],
    ["fita-rgb-app", "Fita LED RGB com Aplicativo", 205],
    ["fita-rgbic", "Fita LED RGBIC Multicolorida", 330],
    ["fita-branco-quente", "Fita LED Branco Quente", 45],
    ["fita-branco-frio", "Fita LED Branco Frio", 208],
    ["fita-quarto", "Fita LED para Quarto", 285],
    ["fita-sala", "Fita LED para Sala e Painéis", 180],
    ["fita-natal", "Fita LED para Decoração Natalina", 8],
    ["fita-externa", "Fita LED para Ambientes Externos", 145],
  ].map(([id, name, hue]) => draft(String(id), String(name), "fitas", "Sugestão de modelo para o catálogo. Recursos, comprimento, alimentação, compatibilidade e grau IP dependem de confirmação técnica.", Number(hue))),
  ...[
    ["estrela-de-topo", "Estrela Decorativa para Árvore", 47],
    ["ornamento-estrela", "Estrela de Natal Iluminada", 55],
    ["sino-decorativo", "Sino Decorativo Natalino", 38],
    ["luminaria-rena", "Luminária Decorativa de Rena", 28],
    ["arvore-mesa", "Mini Árvore Decorativa", 130],
    ["enfeite-janela", "Enfeite Luminoso para Janela", 218],
    ["luminaria-casa", "Casinha de Natal Decorativa", 33],
    ["cordao-luminoso", "Cordão de Luz Decorativo", 280],
    ["estrelas-pendentes", "Estrelas Decorativas Pendentes", 65],
    ["centro-mesa", "Centro de Mesa Natalino", 12],
    ["arco-decorativo", "Arco Decorativo de Natal", 160],
  ].map(([id, name, hue]) => draft(String(id), String(name), "decoracao", "Ideia de sortimento para validação. Ainda não é um SKU disponível: confirmar fornecedor, composição, fotos, estoque e preço antes da publicação.", Number(hue))),
  // Itens previamente existentes preservados, porém despublicados até conferir dados.
  { ...draft("bolas", "Coleção Esmeralda Real", "decoracao", "Linha existente na vitrine anterior. Composição e especificações aguardam validação.", 138), image: bolas, badge: "Catálogo anterior", price: 189.9, oldPrice: 279.9 },
  { ...draft("guirlanda", "Guirlanda Dourada Natural", "decoracao", "Linha existente na vitrine anterior. Composição e especificações aguardam validação.", 44), image: guirlanda, badge: "Catálogo anterior", price: 249.9, oldPrice: 349.9 },
  { ...draft("vela", "Vela Christmas Spice", "decoracao", "Linha existente na vitrine anterior. Composição e especificações aguardam validação.", 22), image: vela, badge: "Catálogo anterior", price: 119.9, oldPrice: 159.9 },
];


/** Fotos entregues pelo lojista: associação individual e exata, sem trocar cores/modelos. */
export const suppliedPhotos: Record<string, string> = {
  "pisca-branco-quente": "/produtos/pisca-branco-quente.avif",
  "pisca-branco-frio": "/produtos/pisca-branco-frio.avif",
  "pisca-colorido": "/produtos/pisca-colorido.avif",
  "pisca-azul": "/produtos/pisca-azul.avif",
  "fita-rgb": "/produtos/fita-rgb.avif",
  "fita-rgb-controle": "/produtos/fita-rgb-controle.avif",
};

/**
 * Todo item tem agora sua própria imagem.
 * Itens sem foto do fornecedor usam uma imagem fotorrealista individual gerada por IA.
 * Não reutilizar fotos de outra variante, nem deduzir especificações a partir da arte.
 */
export const products: Product[] = catalog.map((product) => {
  const suppliedPhoto = suppliedPhotos[product.id];
  const generatedImage = generatedImages[product.id];
  return {
    ...product,
    image: suppliedPhoto ?? generatedImage ?? product.image,
    imageOrigin: suppliedPhoto
      ? "foto-enviada"
      : generatedImage ? "gerada-ia" : "catalogo-anterior",
    imageIsConcept: Boolean(generatedImage),
  };
});
export const getProduct = (id: string) => products.find((product) => product.id === id);
export const getCategory = (id: Category) => categories.find((category) => category.id === id);
export const formatBRL = (value: number) => value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

/** Um produto não pode ser adquirido sem dados reais e checkout configurado pelo lojista. */
export const isPurchasable = (product: Product) =>
  product.status === "publicado" &&
  typeof product.price === "number" &&
  product.price >= 0 &&
  !!product.checkoutUrl &&
  /^https:\/\//.test(product.checkoutUrl);
