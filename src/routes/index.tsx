import { createFileRoute } from "@tanstack/react-router";
import hero from "@/assets/hero-natal.jpg";
import { products } from "@/data/products";
import { ProductCard } from "@/components/store/ProductCard";
import { Countdown } from "@/components/store/Countdown";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Maison Noël — Decoração de Natal de Luxo" },
      { name: "description", content: "Artigos de Natal elegantes e exclusivos: bolas de vidro, guirlandas e velas artesanais. Transforme sua casa neste Natal." },
      { property: "og:title", content: "Maison Noël — Decoração de Natal de Luxo" },
      { property: "og:description", content: "Peças artesanais em esmeralda e ouro para um Natal inesquecível." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const perks = [
  ["Frete grátis", "em compras acima de R$ 299"],
  ["Feito à mão", "peças artesanais exclusivas"],
  ["Embalagem presente", "pronta para presentear"],
  ["Compra segura", "7 dias para troca"],
];
const reviews = [
  ["Mariana S.", "A guirlanda é ainda mais linda pessoalmente. Recebi elogios de todos os convidados!"],
  ["Ricardo P.", "Qualidade impecável. As bolas de vidro parecem peças de museu."],
  ["Juliana M.", "A vela perfuma a casa inteira. Já comprei mais três para presentear."],
];

function Index() {
  return (
    <main className="bg-background text-foreground">
      <div className="bg-gold py-2 text-center text-xs font-semibold uppercase tracking-[0.2em] text-gold-foreground">
        Coleção de Natal com até 35% OFF · Estoque limitado
      </div>

      <section className="relative min-h-[90vh] overflow-hidden bg-hero text-hero-foreground">
        <img src={hero} alt="Presentes e enfeites de Natal dourados" width={1600} height={1008} className="absolute inset-0 h-full w-full object-cover opacity-70" />
        <div className="absolute inset-0 bg-hero-fade" />
        <div className="relative mx-auto flex min-h-[90vh] max-w-6xl flex-col justify-center gap-8 px-6 py-24">
          <p className="font-display text-2xl italic text-gold">Maison Noël</p>
          <h1 className="max-w-2xl font-display text-5xl leading-[1.05] md:text-7xl animate-rise">
            Um Natal tão elegante quanto <em className="text-gold">a sua casa</em> merece.
          </h1>
          <p className="max-w-lg text-lg text-hero-foreground/80">
            Peças artesanais em esmeralda e ouro, criadas para transformar cada canto em memória.
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <a href="#colecao" className="btn-gold">Ver a coleção</a>
            <span className="text-sm text-hero-foreground/70">★★★★★ +2.400 clientes encantados</span>
          </div>
          <div>
            <p className="mb-3 text-xs uppercase tracking-widest text-hero-foreground/70">O Natal chega em</p>
            <Countdown />
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-6 py-10 md:grid-cols-4">
          {perks.map(([t, d]) => (
            <div key={t} className="text-center">
              <p className="font-display text-xl text-primary">{t}</p>
              <p className="text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="colecao" className="mx-auto max-w-6xl px-6 py-24">
        <div className="mb-14 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-gold-deep">Coleção 2026</p>
          <h2 className="mt-3 font-display text-4xl md:text-5xl">Escolhidos para encantar</h2>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      <section className="bg-secondary py-24">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="mb-12 text-center font-display text-4xl">Quem compra, volta</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {reviews.map(([n, t]) => (
              <figure key={n} className="rounded-2xl bg-card p-8 shadow-elegant">
                <p className="text-gold-deep">★★★★★</p>
                <blockquote className="mt-4 font-display text-xl italic">“{t}”</blockquote>
                <figcaption className="mt-4 text-sm text-muted-foreground">— {n}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-hero py-24 text-center text-hero-foreground">
        <div className="mx-auto max-w-2xl px-6">
          <h2 className="font-display text-4xl md:text-5xl">Garanta antes que esgote</h2>
          <p className="mt-4 text-hero-foreground/80">Produções artesanais em quantidade limitada. Peça agora e receba a tempo do Natal.</p>
          <a href="#colecao" className="btn-gold mt-8 inline-block">Quero o meu</a>
        </div>
      </section>

      <footer className="py-10 text-center text-sm text-muted-foreground">© 2026 Maison Noël · Feito com carinho para o seu Natal</footer>
    </main>
  );
}
