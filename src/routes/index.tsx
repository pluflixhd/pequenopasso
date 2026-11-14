import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState, type CSSProperties } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, ChevronDown, Gift, MapPin, Menu, PackageCheck, Search, ShieldCheck, Sparkles, Truck, X } from "lucide-react";
import hero from "@/assets/hero-natal.jpg";
import { categories, formatBRL, getCategory, getProduct, isPurchasable, products, type Category, type Product } from "@/data/products";
import { ProductCard, ProductVisual } from "@/components/store/ProductCard";
import { ShippingEstimator } from "@/components/store/ShippingEstimator";
import { Countdown } from "@/components/store/Countdown";

export const Route = createFileRoute("/")({
  validateSearch: (query: Record<string, unknown>) => ({
    produto: typeof query["produto"] === "string" ? query["produto"] : undefined,
    categoria: typeof query["categoria"] === "string" ? query["categoria"] : undefined,
  }),
  head: () => ({
    meta: [
      { title: "PEQUENO PASSO | Natal 2026 • Coleção especial" },
      { name: "description", content: "Conheça a coleção de Natal da Pequeno Passo: fantasias, caixas especiais e ideias de iluminação para celebrar com elegância." },
      { property: "og:title", content: "PEQUENO PASSO | O Natal mais mágico começa aqui" },
      { property: "og:description", content: "Fantasias, luzes e detalhes para celebrar cada momento. Catálogo especial de Natal." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Storefront,
});

const categoryIds = new Set(categories.map((c) => c.id));
const navItems = [
  { label: "Início", href: "/" },
  { label: "Fantasias & Kits", href: "/?categoria=kits" },
  { label: "Pisca-Piscas", href: "/?categoria=piscas" },
  { label: "Fitas LED", href: "/?categoria=fitas" },
  { label: "Coleção completa", href: "/#colecao" },
];
function Brand({ light = false }: { light?: boolean }) {
  return <a href="/" aria-label="Pequeno Passo - voltar ao início" className={`brand-mark ${light ? "brand-light" : ""}`}>
    <span className="brand-crest"><Sparkles size={17} strokeWidth={1.4} /></span>
    <span className="brand-lines"><strong>PEQUENO PASSO</strong><small>Momentos que ficam</small></span>
  </a>;
}
function Header() {
  const [open, setOpen] = useState(false);
  return <>
    <div className="announcement"><Gift size={15} /><span>FRETE GRÁTIS NA PRIMEIRA COMPRA</span><span className="announcement-suffix">• Benefício em configuração, sujeito à validação no checkout</span></div>
    <header className="site-header">
      <div className="site-header-inner">
        <Brand />
        <nav className="desktop-nav" aria-label="Navegação principal">
          {navItems.map((item) => <a key={item.label} href={item.href}>{item.label}</a>)}
        </nav>
        <div className="header-actions"><a className="header-collection" href="/#colecao">Explorar Natal <ArrowUpRight size={16} /></a>
          <button type="button" className="menu-toggle" aria-label={open ? "Fechar menu" : "Abrir menu"} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</button>
        </div>
      </div>
      {open && <nav className="mobile-nav" aria-label="Navegação móvel">{navItems.map((item) => <a key={item.label} href={item.href} onClick={() => setOpen(false)}>{item.label}<ArrowUpRight size={15}/></a>)}</nav>}
    </header>
  </>;
}
function Footer() {
  return <footer className="site-footer"><div className="site-footer-inner">
    <div><Brand light/><p className="mt-5 max-w-xs text-sm leading-7 text-white/65">Cada detalhe pode transformar um instante em uma lembrança para guardar. Bem-vindo ao Natal da Pequeno Passo.</p></div>
    <div><p className="footer-heading">Explore</p>{categories.map((c) => <a key={c.id} href={`/?categoria=${c.id}`}>{c.label}</a>)}</div>
    <div><p className="footer-heading">Informações</p><p>Atendimento, checkout e transportadoras serão configurados pelo responsável pela loja.</p><p>Preços, estoque e condições somente após confirmação.</p></div>
  </div><div className="footer-bottom">© 2026 PEQUENO PASSO <span>Uma temporada para iluminar memórias.</span></div></footer>;
}
function Benefits() {
  return <section className="benefits-strip" aria-label="Condições da loja">
    <div><Gift size={24}/><span><strong>Primeira compra</strong><small>Frete grátis em preparação*</small></span></div>
    <div><MapPin size={24}/><span><strong>Todo o Brasil</strong><small>Conforme atendimento ao CEP</small></span></div>
    <div><Truck size={24}/><span><strong>Entrega transparente</strong><small>Prazo real informado por CEP</small></span></div>
    <div><ShieldCheck size={24}/><span><strong>Compra consciente</strong><small>Sem promessas ou valores fictícios</small></span></div>
  </section>;
}
function CollectionSection({ title, eyebrow, description, items, href, id }: { title: string; eyebrow: string; description: string; items: Product[]; href: string; id?: string }) {
  return <section id={id} className="section-wrap">
    <div className="section-heading"><div><span className="eyebrow">{eyebrow}</span><h2>{title}</h2><p>{description}</p></div><a href={href} className="text-link">Ver coleção <ArrowUpRight size={18}/></a></div>
    <div className="products-grid">{items.map((product) => <ProductCard key={product.id} product={product}/>)}</div>
  </section>;
}
function Highlight({ item, side }: { item: Product; side: "left" | "right" }) {
  return <article className={`feature-tile feature-${side}`}>
    <a className="feature-media" href={`/?produto=${item.id}`}><ProductVisual product={item} large/></a>
    <div className="feature-description"><span className="eyebrow">{side === "left" ? "PROTAGONISTA DA TEMPORADA" : "TRADIÇÃO RENOVADA"}</span>
      <h3>{item.name}</h3><p>{item.description}</p><a className="btn-outline" href={`/?produto=${item.id}`}>Descubra os detalhes <ArrowUpRight size={17}/></a>
    </div>
  </article>;
}
function Home() {
  const kit = getProduct("caixa-magica-papai-noel");
  const fantasy = getProduct("fantasia-classica-papai-noel");
  return <main>
    <section className="hero-section">
      <img src={hero} alt="Cenário elegante de Natal com decoração e presentes" className="hero-image" />
      <div className="hero-shade"/>
      <div className="hero-body">
        <div className="hero-kicker"><span/> APRESENTAMOS O NATAL 2026 <span/></div>
        <h1>O NATAL MAIS <em>MÁGICO</em> COMEÇA AQUI.</h1>
        <p>Fantasias encantadoras, luzes que transformam ambientes e detalhes que fazem cada momento valer a pena.</p>
        <div className="hero-buttons"><a className="btn-gold" href="#colecao">Explorar coleção de Natal <ArrowUpRight size={18}/></a><a className="btn-ghost" href="/?produto=caixa-magica-papai-noel">Conhecer a Caixa Mágica <ArrowRight size={17}/></a></div>
        <div className="hero-countdown"><span>A contagem para o Natal</span><Countdown/></div>
      </div>
      <div className="hero-bottom-caption">PEQUENO PASSO <span>•</span> PRESENTES, LUZES E LEMBRANÇAS</div>
    </section>
    <Benefits />
    <section id="destaques" className="section-wrap featured-wrap">
      <div className="centered-heading"><span className="eyebrow">EDIÇÃO ESPECIAL</span><h2>O encanto está nos detalhes.</h2><p>Uma seleção pensada para criar instantes que merecem ser lembrados.</p></div>
      <div className="featured-grid">{kit && <Highlight item={kit} side="left"/>}{fantasy && <Highlight item={fantasy} side="right"/>}</div>
    </section>
    <section className="editorial-banner">
      <div className="editorial-copy"><span className="eyebrow">O PRESENTE É A EXPERIÊNCIA</span><h2>A magia do Natal começa quando o Papai Noel chega.</h2><p>Imagine abrir uma caixa e encontrar o início de uma noite inesquecível. A Caixa Mágica está sendo preparada para fazer parte de encontros especiais, celebrações e lembranças em família.</p><strong>“Neste Natal, não entregue apenas presentes. Entregue a magia de quem chegou para trazê-los.”</strong><a href="/?produto=caixa-magica-papai-noel" className="btn-gold">Conhecer a Caixa Mágica <ArrowUpRight size={18}/></a></div>
      <div className="editorial-art">{kit && <ProductVisual product={kit} large/>}</div>
    </section>
    <CollectionSection id="colecao" eyebrow="A LUZ DA TEMPORADA" title="Iluminação mágica de Natal" description="Transforme cada cantinho em um cenário acolhedor. Descubra propostas de luzes que valorizam a decoração e os encontros de dezembro." href="/?categoria=piscas" items={products.filter((p) => p.category === "piscas").slice(0,4)}/>
    <div className="interlude"><Sparkles size={23}/><p>ACENDA A MAGIA DO NATAL.</p><span>Um detalhe de luz muda toda a atmosfera.</span><a href="/?categoria=cortinas">Descobrir iluminação natalina <ArrowUpRight size={17}/></a></div>
    <CollectionSection eyebrow="LUZ QUE TRANSFORMA" title="LED decorativo, infinitas possibilidades." description="Explore cores, crie cenários e dê personalidade aos seus espaços com propostas para salas, quartos e ambientes de celebração." href="/?categoria=fitas" items={products.filter((p) => p.category === "fitas").slice(0,4)}/>
    <section className="section-wrap space-top-sm"><div className="collections-title"><div><span className="eyebrow">NAVEGUE PELA TEMPORADA</span><h2>Encontre seu próximo detalhe.</h2></div></div><div className="category-grid">{categories.map((c, i) => <a key={c.id} className="category-tile" href={`/?categoria=${c.id}`} style={{ "--tile-index": i } as CSSProperties}><span>0{i+1}</span><strong>{c.label}</strong><small>{c.description}</small><ArrowUpRight size={22}/></a>)}</div></section>
    <section className="shipping-feature"><div className="shipping-feature-copy"><span className="eyebrow">ENTREGA COM TRANSPARÊNCIA</span><h2>Sua celebração merece chegar com tranquilidade.</h2><p>Estamos preparando o benefício de frete grátis na primeira compra. A cobertura e o prazo serão calculados conforme o CEP e a transportadora. A promessa de entrega em menos de sete dias só aparecerá quando confirmada para o pedido.</p><div className="flex items-center gap-2 text-xs text-muted-foreground"><PackageCheck size={16}/> Sem prazos fictícios. Sem taxas ocultas para compensar promoções.</div></div><ShippingEstimator/></section>
    <section className="final-cta"><span className="eyebrow">UM NATAL PARA CHAMAR DE SEU</span><h2>Os melhores momentos começam com um pequeno passo.</h2><p>Descubra a coleção especial e encontre a inspiração para celebrar.</p><a href="/?categoria=todos" className="btn-gold">Explorar catálogo completo <ArrowUpRight size={17}/></a></section>
  </main>;
}
function Catalog({ category }: { category: Category | undefined }) {
  const [term, setTerm] = useState("");
  const [selected, setSelected] = useState<Category | "todos">(category || "todos");
  const list = useMemo(() => products.filter((p) => (selected === "todos" || p.category === selected) && `${p.name} ${p.description}`.toLowerCase().includes(term.trim().toLowerCase())), [term, selected]);
  const selectedCategory = selected === "todos" ? null : getCategory(selected);
  return <main><div className="subpage-hero"><a href="/" className="back-link"><ArrowLeft size={17}/> Voltar ao início</a><span className="eyebrow">PEQUENO PASSO · NATAL 2026</span><h1>{selectedCategory?.label || "Coleção completa de Natal"}</h1><p>{selectedCategory?.description || "Fantasias, luzes e detalhes para celebrar. Conheça as ideias do nosso catálogo e acompanhe os lançamentos confirmados."}</p></div>
    <div className="section-wrap catalog-page"><div className="catalog-toolbar"><div className="catalog-chips"><button type="button" className={selected === "todos" ? "active" : ""} onClick={() => setSelected("todos")}>Todos</button>{categories.map((c) => <button type="button" key={c.id} className={selected === c.id ? "active" : ""} onClick={() => setSelected(c.id)}>{c.label}</button>)}</div><label className="catalog-search"><Search size={17}/><span className="sr-only">Buscar produtos</span><input value={term} onChange={(e) => setTerm(e.target.value)} placeholder="Busque na coleção..." /></label></div>
      <div className="catalog-count">{list.length} {list.length === 1 ? "item em prévia" : "itens na coleção"} <span>Produtos sujeitos à confirmação antes da venda</span></div>
      {list.length ? <div className="products-grid">{list.map((product) => <ProductCard key={product.id} product={product}/>)}</div> : <div className="catalog-empty">Nenhum item corresponde à busca. <button onClick={() => { setTerm(""); setSelected("todos"); }}>Limpar filtros</button></div>}
    </div>
  </main>;
}
function ProductDetail({ product }: { product: Product }) {
  const purchasable = isPurchasable(product);
  const related = products.filter((p) => p.id !== product.id && (p.category === product.category || (product.category === "kits" && p.category === "decoracao"))).slice(0,4);
  return <main>
    <div className="product-breadcrumb"><a href="/">Início</a><span>/</span><a href={`/?categoria=${product.category}`}>{getCategory(product.category)?.label}</a><span>/</span><span>{product.name}</span></div>
    <div className="product-detail"><div className="detail-media">
      {product.image ? <a href={product.image} target="_blank" rel="noopener noreferrer" aria-label={`Abrir imagem completa de ${product.name}`}><ProductVisual product={product} large/></a> : <ProductVisual product={product} large/>}
    </div>
    <div className="detail-copy"><span className="eyebrow">PEQUENO PASSO · EDIÇÃO NATALINA</span><h1>{product.name}</h1><div className="detail-rule"/><p className="detail-lead">{product.id === "caixa-magica-papai-noel" ? "Uma apresentação especial para transformar um simples momento em uma lembrança inesquecível." : product.description}</p>
      {product.id === "caixa-magica-papai-noel" && <div className="detail-story"><p>Imagine a emoção de abrir uma caixa e encontrar tudo preparado para dar vida ao personagem mais querido do Natal.</p><p>A Caixa Mágica do Papai Noel foi pensada para quem deseja transformar a noite de Natal em um espetáculo de alegria, surpresa e encantamento.</p><p>Seja para surpreender as crianças, criar momentos especiais em família ou preparar uma visita inesquecível, a proposta é transformar a tradição em uma experiência cheia de personalidade.</p><strong>Neste Natal, não entregue apenas presentes. Entregue a magia de quem chegou para trazê-los.</strong></div>}
      <div className="detail-price">{purchasable && typeof product.price === "number" ? <strong>{formatBRL(product.price)}</strong> : <><span className="draft-pill"><Check size={15}/> Item em preparação</span><p>Preço, disponibilidade e ficha técnica ainda não confirmados.</p></>}</div>
      {purchasable && product.checkoutUrl ? <a className="btn-gold detail-buy" href={product.checkoutUrl} rel="noopener noreferrer">{product.id === "caixa-magica-papai-noel" ? "QUERO VIVER A MAGIA DO NATAL" : "Comprar agora"} <ArrowUpRight size={17}/></a> : <div className="detail-action-disabled"><ShieldCheck size={19}/> A compra será habilitada quando o responsável confirmar este produto e configurar o checkout.</div>}
      <div className="detail-accordion"><h2>Informações do produto <ChevronDown size={17}/></h2><ul>{(product.details || ["Fornecedor, estoque e especificações técnicas: aguardando validação.", "Não há acessórios, medidas, alimentação ou características presumidas."]).map((detail) => <li key={detail}>{detail}</li>)}</ul></div>
      <div className="detail-accordion"><h2>Entrega e condições <ChevronDown size={17}/></h2><p>O prazo de entrega será calculado com a transportadora para o CEP informado. A promoção de frete grátis na primeira compra ainda depende de integração e verificação da elegibilidade.</p></div>
    </div></div>
    <section className="detail-shipping section-wrap"><ShippingEstimator/></section>
    {related.length > 0 && <CollectionSection title="Combine com outras ideias." eyebrow="TAMBÉM PODE ENCANTAR" description="Inspirações da mesma coleção. Confirme a compatibilidade antes de combinar produtos." href={`/?categoria=${product.category}`} items={related}/>}
  </main>;
}
function Storefront() {
  const { produto, categoria } = Route.useSearch();
  const found = produto ? getProduct(produto) : undefined;
  const selected = categoria && categoryIds.has(categoria as Category) ? categoria as Category : undefined;
  return <div className="storefront"><Header/>{produto && !found
    ? <main className="missing-product"><h1>Este produto não foi encontrado.</h1><p>Explore a coleção disponível em prévia.</p><a href="/?categoria=todos" className="btn-gold">Ver coleção <ArrowRight size={17}/></a></main>
    : found ? <ProductDetail product={found}/>
    : categoria ? <Catalog category={selected}/>
    : <Home/>}<Footer/></div>;
}
