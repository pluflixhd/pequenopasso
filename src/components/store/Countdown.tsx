import { useEffect, useState } from "react";

const target = () => { const n = new Date(); return new Date(n.getMonth() === 11 && n.getDate() > 25 ? n.getFullYear() + 1 : n.getFullYear(), 11, 25); };

export function Countdown() {
  const [ms, setMs] = useState<number | null>(null);
  useEffect(() => { const t = () => setMs(target().getTime() - Date.now()); t(); const i = setInterval(t, 1000); return () => clearInterval(i); }, []);
  const parts = ms === null ? [0, 0, 0, 0] : [ms / 864e5, (ms / 36e5) % 24, (ms / 6e4) % 60, (ms / 1e3) % 60].map(Math.floor);
  const labels = ["dias", "horas", "min", "seg"];
  return (
    <div className="flex gap-3" aria-label="Contagem regressiva para o Natal">
      {parts.map((v, i) => (
        <div key={labels[i]} className="min-w-16 rounded-xl border border-gold/40 bg-background/10 px-3 py-2 text-center backdrop-blur">
          <div className="font-display text-3xl text-gold">{String(v).padStart(2, "0")}</div>
          <div className="text-[10px] uppercase tracking-widest text-hero-foreground/70">{labels[i]}</div>
        </div>
      ))}
    </div>
  );
}
