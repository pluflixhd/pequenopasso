import { useState } from "react";
import { ArrowRight, CheckCircle2, MapPin, ShieldAlert, Truck } from "lucide-react";

interface ShippingQuote {
  cep: string;
  carrier: string;
  price: number;
  estimatedDays: number;
  /** Só exibir se a transportadora e a política de reembolso confirmarem isso. */
  guaranteedUnderSevenDays: boolean;
  /** A verificação de primeira compra ocorre no servidor autenticado. */
  firstPurchaseFreeApplied: boolean;
}
const endpoint = import.meta.env.VITE_SHIPPING_QUOTE_ENDPOINT as string | undefined;

export function ShippingEstimator() {
  const [cep, setCep] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [quote, setQuote] = useState<ShippingQuote | null>(null);
  const clean = cep.replace(/\D/g, "");
  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setQuote(null);
    if (clean.length !== 8) {
      setError("Digite um CEP válido com 8 números.");
      return;
    }
    if (!endpoint) {
      setError("A consulta de frete ainda está em configuração. Os prazos e valores serão exibidos quando a transportadora estiver conectada.");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ cep: clean }), credentials: "same-origin" });
      if (!response.ok) throw new Error("Consulta temporariamente indisponível.");
      const data: unknown = await response.json();
      if (!isShippingQuote(data) || data.cep.replace(/\D/g, "") !== clean) {
        throw new Error("A transportadora retornou um orçamento inválido.");
      }
      setQuote(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Não foi possível calcular o frete. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="shipping-panel">
      <div className="mb-5 flex items-start gap-3"><Truck size={22} className="mt-1 shrink-0 text-gold-deep" /><div>
        <h3 className="font-display text-2xl">Entrega para o seu endereço</h3>
        <p className="mt-1 text-sm text-muted-foreground">Consulte a disponibilidade por CEP. Somente prazos confirmados pela transportadora serão apresentados.</p>
      </div></div>
      <form onSubmit={onSubmit} className="flex flex-col gap-2 sm:flex-row">
        <label htmlFor="shipping-cep" className="sr-only">Seu CEP</label>
        <input id="shipping-cep" inputMode="numeric" autoComplete="postal-code" maxLength={9} value={cep} onChange={(e) => setCep(e.target.value.replace(/[^\d-]/g, "").slice(0, 9))} placeholder="00000-000" className="shipping-input" />
        <button type="submit" disabled={loading} className="btn-gold justify-center disabled:opacity-50">{loading ? "Calculando..." : "Consultar CEP"} <ArrowRight size={16}/></button>
      </form>
      {error && <p role="status" className="mt-4 flex gap-2 text-sm text-muted-foreground"><ShieldAlert size={17} className="shrink-0" />{error}</p>}
      {quote && <div role="status" className="mt-5 rounded-xl border border-border p-4 text-sm">
        <p className="flex items-center gap-2 font-semibold"><MapPin size={16}/>{quote.carrier} · {quote.estimatedDays} dias corridos estimados</p>
        <p className="mt-1">{quote.firstPurchaseFreeApplied ? "Frete grátis validado para esta compra" : `Frete calculado: ${new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(quote.price)}`}</p>
        {quote.guaranteedUnderSevenDays && <p className="mt-2 flex items-center gap-2 text-primary"><CheckCircle2 size={16}/>Entrega em menos de 7 dias com garantia aplicável, conforme condições do pedido.</p>}
      </div>}
      <p className="mt-4 text-xs text-muted-foreground">Frete grátis para primeira compra e eventual garantia de prazo dependem de validação no checkout e das condições logísticas do CEP.</p>
    </div>
  );
}

function isShippingQuote(value: unknown): value is ShippingQuote {
  if (typeof value !== "object" || value === null) return false;
  const v = value as Partial<ShippingQuote>;
  return typeof v.cep === "string" && /^\d{8}$/.test(v.cep.replace(/\D/g, "")) && typeof v.carrier === "string" && v.carrier.trim().length > 0 &&
    typeof v.price === "number" && Number.isFinite(v.price) && v.price >= 0 &&
    typeof v.estimatedDays === "number" && Number.isInteger(v.estimatedDays) && v.estimatedDays >= 0 &&
    typeof v.guaranteedUnderSevenDays === "boolean" && typeof v.firstPurchaseFreeApplied === "boolean";
}
