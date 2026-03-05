import { useEffect, useMemo, useState } from "react";
import logo from "./assets/Logo.png";
import certificate from "./assets/Certificate.png";
import qr from "./assets/Qr.png";

const CONFIG = {
  brand: {
    name: "Comité Nacional #ContraElRuido",
    tagline: "Del ruido al radicado efectivo",
    green: "#16A34A",
  },
  pricing: {
    normal: 50000,
    presale: 40000,
    presaleDeadlineText: "Válida hasta el jueves",
  },
  links: {
    driveFolder:
      "https://drive.google.com/drive/folders/1XKUHGHeS6_VZbw5bzNLA3VFHgkPUqFgn?usp=drive_link",
    checkout: "#pasos",
    whatsapp:
      "https://wa.me/573125841631?text=Hola%20quiero%20enviar%20mi%20comprobante%20%23ContraElRuido",
    videoUrl: "https://www.youtube.com/embed/WgMw3yVcH3g",
  },
  person: {
    name: "Hernán Morantes",
    roleLine: "El derecho debe proteger la vida y no solo adornar estanterías.",
  },
  legal: {
    kitNote:
      "Incluye modelos y jurisprudencia actualizada (sentencia T-003/26) y acompañamiento experto.",
  },
};

function formatCOP(value: number) {
  return value.toLocaleString("es-CO");
}

function classNames(...xs: Array<string | false | undefined | null>) {
  return xs.filter(Boolean).join(" ");
}

function useScrollSpy(ids: string[]) {
  const [active, setActive] = useState(ids[0] ?? "");

  useEffect(() => {
    const els = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (!els.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0)
          )[0];
        if (visible?.target?.id) setActive(visible.target.id);
      },
      { root: null, threshold: [0.15, 0.3, 0.45], rootMargin: "-20% 0px -70% 0px" }
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [ids]);

  return active;
}

function AnchorLink({
  href,
  children,
  active,
}: {
  href: string;
  children: React.ReactNode;
  active?: boolean;
}) {
  return (
    <a
      href={href}
      className={classNames(
        "text-sm font-medium transition-colors",
        active ? "text-black" : "text-neutral-600 hover:text-black"
      )}
    >
      {children}
    </a>
  );
}

/** Decoración: “hojitas” sutiles para dar contraste sin ensuciar */
function LeafSprinkles({
  className = "",
  seed = 7,
  count = 14,
}: {
  className?: string;
  seed?: number;
  count?: number;
}) {
  // PRNG estable (no parpadea en cada render)
  const rand = useMemo(() => {
    let s = seed >>> 0;
    return () => {
      // xorshift32
      s ^= s << 13;
      s ^= s >>> 17;
      s ^= s << 5;
      return (s >>> 0) / 4294967296;
    };
  }, [seed]);

  // Siluetas orgánicas (borde irregular)
  const SHAPES = [
    "polygon(50% 0%, 58% 4%, 66% 10%, 76% 18%, 85% 30%, 92% 44%, 96% 54%, 94% 62%, 88% 74%, 78% 84%, 64% 92%, 50% 100%, 36% 92%, 22% 84%, 12% 74%, 6% 62%, 4% 54%, 8% 44%, 15% 30%, 24% 18%, 34% 10%, 42% 4%)",
    "polygon(50% 0%, 64% 7%, 76% 18%, 86% 33%, 94% 48%, 92% 58%, 88% 68%, 80% 80%, 66% 92%, 50% 100%, 34% 92%, 20% 80%, 12% 68%, 8% 58%, 6% 48%, 14% 33%, 24% 18%, 36% 7%)",
    "polygon(50% 0%, 60% 9%, 72% 22%, 86% 40%, 95% 52%, 90% 66%, 80% 80%, 64% 92%, 50% 100%, 36% 92%, 20% 80%, 10% 66%, 5% 52%, 14% 40%, 28% 22%, 40% 9%)",
  ] as const;

  const leaves = useMemo(() => {
    const arr: Array<{
      top: string;
      left: string;
      w: number;
      h: number;
      r: number;
      o: number;
      blur: number;
      flip: number;
      shape: string;
    }> = [];

    // “hero leaves” grandes en esquinas (enmarcan)
    const hero = [
      { top: "6%", left: "-2%", w: 74, h: 150, r: -22, o: 0.18 },
      { top: "10%", left: "90%", w: 84, h: 170, r: 18, o: 0.16 },
      { top: "70%", left: "-3%", w: 92, h: 185, r: 26, o: 0.14 },
      { top: "76%", left: "88%", w: 78, h: 160, r: -18, o: 0.14 },
    ];

    hero.forEach((h) => {
      const shape = SHAPES[Math.floor(rand() * SHAPES.length)];
      const flip = rand() > 0.5 ? -1 : 1;
      arr.push({
        top: h.top,
        left: h.left,
        w: h.w,
        h: h.h,
        r: h.r + (rand() * 10 - 5),
        o: h.o,
        blur: 0.15 + rand() * 0.35,
        flip,
        shape,
      });
    });

    // hojas medianas/pequeñas aleatorias
    for (let i = 0; i < count; i++) {
      const t = 6 + rand() * 88; // 6..94
      const l = 4 + rand() * 92; // 4..96

      const isSmall = rand() < 0.45;
      const w = isSmall ? 22 + rand() * 10 : 30 + rand() * 24; // 22..32 / 30..54
      const h = isSmall ? 44 + rand() * 18 : 64 + rand() * 44; // 44..62 / 64..108

      const shape = SHAPES[Math.floor(rand() * SHAPES.length)];
      const flip = rand() > 0.5 ? -1 : 1;
      const r = rand() * 70 - 35; // -35..35
      const o = isSmall ? 0.08 + rand() * 0.08 : 0.1 + rand() * 0.1;
      const blur = 0.12 + rand() * 0.45;

      arr.push({
        top: `${t.toFixed(2)}%`,
        left: `${l.toFixed(2)}%`,
        w: Math.round(w),
        h: Math.round(h),
        r,
        o,
        blur,
        flip,
        shape,
      });
    }

    return arr;
  }, [count, rand, SHAPES]);

  return (
    <div className={classNames("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden>
      {leaves.map((l, i) => (
        <span
          key={i}
          className="absolute block"
          style={{
            top: l.top,
            left: l.left,
            width: `${l.w}px`,
            height: `${l.h}px`,
            opacity: l.o,
            clipPath: l.shape,

            transform: `rotate(${l.r}deg) scaleX(${l.flip})`,
            filter: `blur(${l.blur}px) saturate(1.12)`,

            // base + luz
            backgroundImage: `
              radial-gradient(120% 90% at 30% 25%, rgba(255,255,255,0.32) 0%, rgba(255,255,255,0) 55%),
              linear-gradient(145deg, rgba(74,222,128,0.92) 0%, ${CONFIG.brand.green} 55%, rgba(22,101,52,0.96) 100%),

              /* nervadura central */
              linear-gradient(90deg, transparent 48.5%, rgba(255,255,255,0.28) 50%, transparent 51.5%),

              /* nervaduras laterales (dos direcciones) */
              repeating-linear-gradient(
                140deg,
                rgba(255,255,255,0) 0px,
                rgba(255,255,255,0) 7px,
                rgba(255,255,255,0.16) 8px,
                rgba(255,255,255,0) 11px
              ),
              repeating-linear-gradient(
                40deg,
                rgba(255,255,255,0) 0px,
                rgba(255,255,255,0) 9px,
                rgba(255,255,255,0.11) 10px,
                rgba(255,255,255,0) 13px
              )
            `,
            backgroundBlendMode: "screen, normal, overlay, soft-light, soft-light",

            border: "1px solid rgba(22,163,74,0.22)",
            boxShadow: "0 16px 44px rgba(22,163,74,0.16)",
          }}
        />
      ))}
    </div>
  );
}

/** Blobs suaves tipo “círculo del video” para romper el blanco */
function GreenBlobs({ className = "" }: { className?: string }) {
  return (
    <div className={classNames("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden>
      <div
        className="absolute -left-24 top-10 h-64 w-64 rounded-full blur-3xl"
        style={{ backgroundColor: `${CONFIG.brand.green}1A` }}
      />
      <div
        className="absolute -right-28 top-24 h-72 w-72 rounded-full blur-3xl"
        style={{ backgroundColor: `${CONFIG.brand.green}14` }}
      />
      <div
        className="absolute left-1/2 top-[65%] h-56 w-56 -translate-x-1/2 rounded-full blur-3xl"
        style={{ backgroundColor: `${CONFIG.brand.green}12` }}
      />
    </div>
  );
}

function PricingCard({
  pricePresale,
}: {
  pricePresale: string;
  priceNormal: string;
}) {
  return (
    <div className="mt-6 rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-sm font-semibold">Membresía</div>
          <div className="mt-1 text-sm text-neutral-600">{CONFIG.legal.kitNote}</div>
        </div>

        <div
          className="shrink-0 rounded-full px-3 py-1 text-xs font-semibold"
          style={{
            backgroundColor: `${CONFIG.brand.green}14`,
            color: CONFIG.brand.green,
            border: `1px solid ${CONFIG.brand.green}44`,
          }}
        >
          {CONFIG.pricing.presaleDeadlineText}
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <a
          href="#pasos"
          className="inline-flex w-full items-center justify-center rounded-xl bg-black px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 sm:w-auto"
        >
          Inscribirme ahora ({pricePresale})
        </a>
      </div>

      <p className="mt-4 text-xs text-neutral-500">
        *Este sitio es informativo y pedagógico. La membresía incluye acompañamiento y recursos para actuar
        con rigor técnico.
      </p>
    </div>
  );
}

export default function ContraElRuidoLanding() {
  const sections = useMemo(
    () => ["inicio", "propuesta", "beneficios", "pasos", "inscripcion", "contacto"],
    []
  );
  const active = useScrollSpy(sections);

  const priceNormal = `$${formatCOP(CONFIG.pricing.normal)}`;
  const pricePresale = `$${formatCOP(CONFIG.pricing.presale)}`;

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      {/* Top bar / Nav */}
      <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          {/* Logo */}
          <a href="#inicio" className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-xl border border-neutral-200 bg-white shadow-sm" aria-hidden>
              <img src={logo} alt="logo" className="h-10 w-10 object-contain" />
            </div>

            <div className="leading-tight">
              <div className="text-sm font-extrabold tracking-tight">{CONFIG.brand.name}</div>
              <div className="text-xs text-neutral-600">{CONFIG.brand.tagline}</div>
            </div>
          </a>

          {/* Quick nav */}
          <nav className="hidden items-center gap-5 md:flex" aria-label="Navegación rápida">
            <AnchorLink href="#propuesta" active={active === "propuesta"}>
              Propuesta
            </AnchorLink>
            <AnchorLink href="#beneficios" active={active === "beneficios"}>
              Beneficios
            </AnchorLink>
            <AnchorLink href="#pasos" active={active === "pasos"}>
              Inscripción
            </AnchorLink>
            <AnchorLink href="#contacto" active={active === "contacto"}>
              Contacto
            </AnchorLink>
          </nav>

          {/* CTA */}
          <div className="flex items-center gap-2">
            <div className="hidden text-right sm:block">
              <div className="text-xs text-neutral-600">
                Preventa: <span className="font-semibold">{pricePresale}</span>
              </div>
              <div className="text-xs text-neutral-500">Regular: {priceNormal}</div>
            </div>
            <a
              href={CONFIG.links.checkout}
              className="inline-flex items-center justify-center rounded-xl bg-black px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
            >
              Inscribirme por {pricePresale}
            </a>
          </div>
        </div>
      </header>

      {/* HERO */}
<section id="inicio" className="relative">
  {/* Fondo decorativo */}
  <div className="absolute inset-0 z-0 opacity-80">
    <GreenBlobs />
    {/*<LeafSprinkles seed={11} count={18} />*/}
  </div>

  {/* Contenido */}
  <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 items-stretch gap-10 px-4 py-12 md:grid-cols-2 md:py-16">
          {/* Left column */}
          <div className="flex h-full flex-col">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs font-medium text-neutral-700 shadow-sm">
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: CONFIG.brand.green }} aria-hidden />
              Taller + Kit Jurídico + Acciones colectivas y regionales
            </div>

            <h1 className="mt-4 text-4xl font-black tracking-tight md:text-5xl">
              Recupera tu tranquilidad y la de tu familia, protege el valor de tu hogar y cuida el ambiente
            </h1>

            <p className="mt-4 text-base leading-relaxed text-neutral-700 md:text-lg">
              Únete al <span className="font-semibold">{CONFIG.brand.name}</span>. Obtén las herramientas legales
              para pasar de la queja al <span className="font-semibold">radicado efectivo</span>.
            </p>

            <PricingCard pricePresale={pricePresale} priceNormal={priceNormal} />
            <div className="flex-1" />
          </div>

          {/* Right column (video) */}
          <div className="relative flex h-full">
            <div className="flex h-full w-full flex-col rounded-2xl border border-neutral-200 bg-white p-3 shadow-sm">
              <div className="aspect-[5/5] overflow-hidden rounded-xl bg-neutral-100">
                <iframe
                  title={`Video de ${CONFIG.person.name}`}
                  src={CONFIG.links.videoUrl}
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              <div className="mt-3 flex items-start justify-between gap-3">
                <div>
                  <div className="text-sm font-semibold">{CONFIG.person.name}</div>
                  <div className="text-sm text-neutral-600">{CONFIG.person.roleLine}</div>
                </div>

                <div
                  className="hidden rounded-xl px-3 py-2 text-xs font-semibold md:block"
                  style={{
                    backgroundColor: `${CONFIG.brand.green}14`,
                    color: CONFIG.brand.green,
                    border: `1px solid ${CONFIG.brand.green}44`,
                  }}
                >
                  #ContraElRuido
                </div>
              </div>

              <div className="flex-1" />
            </div>

            <div
              className="pointer-events-none absolute -right-6 -top-6 hidden h-28 w-28 rounded-full md:block"
              style={{ backgroundColor: `${CONFIG.brand.green}1A` }}
              aria-hidden
            />
          </div>
        </div>
      </section>

      {/* PROPUESTA */}
<section id="propuesta" className="relative border-t border-neutral-200 bg-white">
  {/* Fondo decorativo */}
  <div className="absolute inset-0 z-0 opacity-80">
    <GreenBlobs />
    <LeafSprinkles seed={25} count={12} />
  </div>

  {/* Contenido */}
  <div className="relative z-10 mx-auto max-w-6xl px-4 py-14">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:items-center">
            <div>
              <h2 className="text-3xl font-black tracking-tight">Documentación y Estructura del Taller</h2>
              <p className="mt-3 text-neutral-700">
                Creemos en la transparencia. Antes de inscribirte, puedes revisar nuestra propuesta técnica y el
                contenido de los módulos pedagógicos.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a
                  href={CONFIG.links.driveFolder}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-xl border bg-white px-5 py-3 text-sm font-semibold shadow-sm transition hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-neutral-300 focus:ring-offset-2"
                  style={{ borderColor: CONFIG.brand.green }}
                >
                  📁 Ver Propuesta y Módulos en Drive
                </a>
                <a
                  href="#beneficios"
                  className="inline-flex items-center justify-center rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
                >
                  Ver beneficios
                </a>
              </div>

              <p className="mt-3 text-xs text-neutral-500">
                *El enlace dirige a una carpeta con PDF de Propuesta Estratégica y cronograma de 2 talleres.
              </p>
            </div>

            <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold">Qué encontrarás</div>
                <div
                  className="rounded-full px-3 py-1 text-xs font-semibold"
                  style={{
                    backgroundColor: `${CONFIG.brand.green}14`,
                    color: CONFIG.brand.green,
                    border: `1px solid ${CONFIG.brand.green}44`,
                  }}
                >
                  Acceso previo
                </div>
              </div>

              <ul className="mt-4 space-y-3 text-sm text-neutral-700">
                {[
                  "Propuesta Estratégica del Comité Nacional.",
                  "Módulos pedagógicos (explicar lo complejo de forma simple).",
                  "Cronograma de los 2 talleres y dinámica de acompañamiento.",
                  "Alcance del Kit Jurídico PREMIUM (modelos y guías).",
                ].map((t) => (
                  <li key={t} className="flex gap-3">
                    <span
                      className="mt-1 h-2 w-2 rounded-full"
                      style={{ backgroundColor: CONFIG.brand.green }}
                      aria-hidden
                    />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFICIOS */}
      <section id="beneficios" className="relative border-t border-neutral-200 bg-neutral-50">
  {/* Fondo decorativo */}
  <div className="absolute inset-0 z-0 opacity-80">
    <GreenBlobs />
    {/* <LeafSprinkles seed={17} count={14} /> */}
  </div>

  {/* Contenido */}
  <div className="relative z-10 mx-auto max-w-6xl px-4 py-14">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-3xl font-black tracking-tight">¿Por qué esta membresía es tu mejor inversión?</h2>
              <p className="mt-2 text-neutral-700">
                Diseñado para que cualquier persona pueda actuar con rigor técnico, sin letra menuda.
              </p>
            </div>

            <div className="rounded-2xl border border-neutral-200 bg-white px-4 py-3 shadow-sm">
              <div className="text-xs text-neutral-600">Inversión</div>
              <div className="text-sm font-semibold">
                Preventa {pricePresale} <span className="text-neutral-400">/</span> Regular {priceNormal}
              </div>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {/* 1 */}
            <div
              className="relative rounded-2xl bg-white p-6 shadow-sm"
              style={{ border: `2px solid ${CONFIG.brand.green}` }}
            >
              <div
                className="absolute -top-3 left-5 rounded-full px-3 py-1 text-xs font-extrabold"
                style={{ backgroundColor: CONFIG.brand.green, color: "white" }}
              >
                EL MEJOR VALOR
              </div>
              <div className="text-sm font-semibold">Ahorro Jurídico Masivo</div>
              <p className="mt-2 text-sm text-neutral-700">
                Un abogado particular puede cobrar hasta <span className="font-semibold">$5.000.000</span>. Aquí
                elaboras tus acciones por <span className="font-semibold">{priceNormal}</span> (o{" "}
                <span className="font-semibold">{pricePresale}</span> en preventa) con acompañamiento experto.
              </p>
              <div className="mt-4 rounded-xl border border-neutral-200 bg-neutral-50 p-3 text-xs text-neutral-700">
                Pagas una fracción mínima y avanzas con guía.
              </div>
            </div>

            {/* ✅ 2 (NUEVO TEXTO) */}
            <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
              <div className="text-sm font-semibold">Protege tus derechos</div>
              <p className="mt-2 text-sm text-neutral-700">
                Recupera la tranquilidad, salud y tu vida digna. Garantiza un ambiente sano para tu familia.
              </p>
              <div className="mt-4 text-xs text-neutral-500">Tu bienestar no es negociable: se defiende.</div>
            </div>

            {/* 3 */}
            <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
              <div className="text-sm font-semibold">Pedagogía Inclusiva</div>
              <p className="mt-2 text-sm text-neutral-700">
                Método: <span className="font-semibold">“Explicar lo complejo de forma simple”</span>. Para
                cualquiera (15 a 80+), con rigor técnico.
              </p>
              <div className="mt-4 text-xs text-neutral-500">Aprendes haciendo: de la teoría al radicado.</div>
            </div>

            {/* 4 */}
            <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
              <div className="text-sm font-semibold">Músculo Jurídico y Social</div>
              <p className="mt-2 text-sm text-neutral-700">
                Acceso al <span className="font-semibold">Kit Jurídico PREMIUM</span> con modelos actualizados
                (T-003/26). Además, el <span className="font-semibold">20%</span> financia acciones regionales.
              </p>
              <div className="mt-4 text-xs text-neutral-500">Tu membresía también mueve el cambio.</div>
            </div>
          </div>
        </div>
      </section>

      {/* PASOS (NEGRO) */}
      <section id="pasos" className="border-t border-neutral-800 bg-black text-white">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:items-stretch">
            {/* LEFT */}
            <div className="flex flex-col">
              <h2 className="text-3xl font-black tracking-tight">Guía de Inscripción en 3 pasos</h2>
              <p className="mt-2 text-white/75">
                Sencillez total: pagas, validas por WhatsApp y recibes tu acreditación + fechas.
              </p>

              <div className="mt-6 flex-1 rounded-2xl border border-white/10 bg-white/5 p-6">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                  <div className="shrink-0">
                    <div className="mb-2 text-xs font-semibold text-white/70">Pago rápido</div>
                    <div className="grid place-items-center rounded-xl border border-white/10 bg-white p-2 shadow-sm">
                      <img
                        src={qr}
                        alt="QR de pago"
                        className="h-44 w-44 object-contain sm:h-48 sm:w-48"
                      />
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-3">
                      <div className="text-sm font-semibold">Pago manual</div>
                      <div
                        className="rounded-full px-3 py-1 text-xs font-semibold"
                        style={{
                          backgroundColor: `${CONFIG.brand.green}14`,
                          color: CONFIG.brand.green,
                          border: `1px solid ${CONFIG.brand.green}44`,
                        }}
                      >
                        Transferencia
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-1 gap-2 text-sm text-white/75">
                      <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                        Banco: <span className="font-medium text-white">Bancolombia</span>
                      </div>
                      <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                        Cuenta: <span className="font-medium text-white">07843006463</span>
                      </div>
                      <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                        Tipo: <span className="font-medium text-white">Ahorros</span>
                      </div>
                    </div>

                    <div className="flex-1" />
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div className="flex">
              <div className="w-full rounded-2xl border border-white/10 bg-white/5 p-6">
                <ol className="space-y-5">
                  {[
                    {
                      t: "Pago",
                      d: (
                        <>
                          Realiza tu transferencia de{" "}
                          <span className="font-semibold">{pricePresale}</span> (preventa) vía Nequi / Daviplata /
                          Bancolombia.
                          <div className="mt-1 text-xs text-white/60">
                            {CONFIG.pricing.presaleDeadlineText}
                          </div>
                        </>
                      ),
                    },
                    { t: "Validación", d: "Haz clic en el botón de abajo para enviar tu comprobante por WhatsApp." },
                    {
                      t: "Acceso",
                      d: "Una vez validado, recibirás tu acreditación como Miembro del Comité y las fechas de los talleres.",
                    },
                  ].map((x, i) => (
                    <li key={x.t} className="flex gap-4">
                      <div
                        className="grid h-9 w-9 shrink-0 place-items-center rounded-xl font-extrabold text-black"
                        style={{ backgroundColor: CONFIG.brand.green }}
                        aria-hidden
                      >
                        {i + 1}
                      </div>
                      <div>
                        <div className="font-semibold">{x.t}</div>
                        <div className="text-sm text-white/75">{x.d}</div>
                      </div>
                    </li>
                  ))}
                </ol>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <a
                    href={CONFIG.links.whatsapp}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex w-full items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold text-black shadow-sm transition hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-black sm:w-auto"
                    style={{ backgroundColor: CONFIG.brand.green }}
                  >
                    Enviar comprobante por WhatsApp
                  </a>
                  <a
                    href="#inscripcion"
                    className="inline-flex w-full items-center justify-center rounded-xl border border-white/20 bg-white/0 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-black sm:w-auto"
                  >
                    Ver resumen de inscripción
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INSCRIPCIÓN */}
      <section id="inscripcion" className="relative border-t border-neutral-200 bg-white">
  {/* Fondo decorativo */}
  <div className="absolute inset-0 z-0 opacity-75">
    <GreenBlobs />
    <LeafSprinkles seed={28} count={10} />
  </div>

  {/* Contenido */}
  <div className="relative z-10 mx-auto max-w-6xl px-4 py-14">
          <div className="grid grid-cols-1 items-stretch gap-8 md:grid-cols-2 md:items-stretch">
            <div className="flex h-full flex-col">
              <h2 className="text-3xl font-black tracking-tight">Inscríbete y empieza a actuar</h2>
              <p className="mt-2 text-neutral-700">
                Accede al taller, al kit y a la guía para pasar de la queja a un proceso con soporte técnico.
              </p>

              <div className="mt-6 rounded-2xl border border-neutral-200 bg-neutral-50 p-5">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold">Membresía</div>
                  <div className="text-sm">
                    <span className="font-semibold" style={{ color: CONFIG.brand.green }}>
                      {pricePresale}
                    </span>{" "}
                    <span className="text-neutral-500">(preventa)</span>
                  </div>
                </div>

                <div className="mt-3 text-sm text-neutral-700">
                  Incluye:
                  <ul className="mt-2 space-y-1 text-sm text-neutral-700">
                    <li>• 2 talleres (cronograma en Drive)</li>
                    <li>• Kit Jurídico PREMIUM (modelos y guías)</li>
                    <li>• Acompañamiento para radicado efectivo</li>
                    <li>• 20% destinado a acciones regionales</li>
                  </ul>
                </div>

                <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                  <a
                    href={CONFIG.links.whatsapp}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold text-black shadow-sm transition hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-neutral-300 focus:ring-offset-2"
                    style={{ backgroundColor: CONFIG.brand.green }}
                  >
                    Enviar comprobante y activar acceso
                  </a>
                  <a
                    href={CONFIG.links.driveFolder}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-xl border bg-white px-5 py-3 text-sm font-semibold shadow-sm transition hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-neutral-300 focus:ring-offset-2"
                    style={{ borderColor: CONFIG.brand.green }}
                  >
                    Ver propuesta completa
                  </a>
                </div>
              </div>

              <div className="flex-1" />
            </div>

            <div className="flex h-full">
              <div className="flex h-full w-full flex-col rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold">Certificado de Membresía</div>
                    <div className="text-sm text-neutral-600">Miniatura del diploma (preview)</div>
                  </div>
                  <div
                    className="rounded-full px-3 py-1 text-xs font-semibold"
                    style={{
                      backgroundColor: `${CONFIG.brand.green}14`,
                      color: CONFIG.brand.green,
                      border: `1px solid ${CONFIG.brand.green}44`,
                    }}
                  >
                    Incluido
                  </div>
                </div>

                <div className="mt-4 grid flex-1 place-items-center rounded-2xl border border-dashed border-neutral-300 bg-neutral-50 p-2">
                  <img
                    src={certificate}
                    alt="certificado"
                    className="max-h-[200px] w-full rounded-xl object-contain"
                  />
                </div>

                <div className="mt-4 text-sm text-neutral-700">
                  Recibirás tu acreditación como Miembro del Comité Nacional y las fechas de los talleres al validar
                  tu pago.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER / CONTACTO */}
      <footer id="contacto" className="border-t border-neutral-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:items-start">
            <div>
              <div className="text-sm font-extrabold tracking-tight">{CONFIG.brand.name}</div>
              <div className="mt-2 text-sm text-neutral-600">
                Justicia accesible, claridad pedagógica y acción estratégica para proteger tu tranquilidad.
              </div>
            </div>

            <div className="text-sm text-neutral-700">
              <div className="font-semibold">Enlaces</div>
              <ul className="mt-2 space-y-2">
                <li>
                  <a className="hover:underline" href="#propuesta">
                    Propuesta y módulos
                  </a>
                </li>
                <li>
                  <a className="hover:underline" href="#beneficios">
                    Beneficios
                  </a>
                </li>
                <li>
                  <a className="hover:underline" href="#pasos">
                    Inscripción
                  </a>
                </li>
              </ul>
            </div>

            <div className="text-sm text-neutral-700">
              <div className="font-semibold">Acción rápida</div>
              <p className="mt-2 text-neutral-600">Envía tu comprobante y activa tu acceso.</p>
              <div className="mt-3 flex flex-col gap-3">
                <a
                  href={CONFIG.links.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold text-black shadow-sm transition hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-neutral-300 focus:ring-offset-2"
                  style={{ backgroundColor: CONFIG.brand.green }}
                >
                  WhatsApp: Enviar comprobante
                </a>
                <a
                  href={CONFIG.links.driveFolder}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-xl border bg-white px-5 py-3 text-sm font-semibold shadow-sm transition hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-neutral-300 focus:ring-offset-2"
                  style={{ borderColor: CONFIG.brand.green }}
                >
                  Ver documentación en Drive
                </a>
              </div>
            </div>
          </div>

          <div className="mt-10 border-t border-neutral-200 pt-6 text-xs text-neutral-500">
            © {new Date().getFullYear()} {CONFIG.brand.name}. Todos los derechos reservados.
          </div>
        </div>
      </footer>

      {/* WhatsApp Floating Button */}
      <a
        href={CONFIG.links.whatsapp}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm font-semibold text-black shadow-lg transition hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-neutral-300 focus:ring-offset-2"
        style={{ backgroundColor: CONFIG.brand.green }}
        aria-label="Enviar Comprobante de Pago por WhatsApp"
      >
        <span aria-hidden>💬</span> Enviar Comprobante de Pago
      </a>
    </div>
  );
}