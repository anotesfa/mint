"use client";

import Image from "next/image";
import { ArrowRight, Building2, MapPinned, Search, Sparkles, Users } from "lucide-react";
import { buildings, type SearchHit } from "@/lib/ministry-data";
import { DirectorySearch } from "@/components/directory-search";
import { t, type Lang } from "@/lib/translations";

interface PortalPageProps {
  language: Lang;
  onViewBuilding: (buildingId: string) => void;
  onSearchSelect: (hit: SearchHit) => void;
}

export function PortalPage({ language, onViewBuilding, onSearchSelect }: PortalPageProps) {
  const tr = t[language];

  const stats = [
    { icon: Building2, value: "2",   label: tr.buildings   },
    { icon: Users,     value: "10+", label: tr.offices     },
    { icon: MapPinned, value: "20+", label: tr.departments },
  ];

  const tips = [
    { icon: Search,    text: tr.tipSearch  },
    { icon: Building2, text: tr.tipBrowse  },
    { icon: MapPinned, text: tr.tipFloor   },
  ];

  // Amharic building descriptions
  const buildingDesc = (id: string) =>
    id === "building-a" ? tr.buildingADesc : tr.buildingBDesc;

  return (
    <div className="relative h-full w-full overflow-y-auto">
      {/* ambient background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 size-[480px] rounded-full bg-primary/7 blur-[100px]" />
        <div className="absolute -bottom-32 right-0 size-[360px] rounded-full bg-[#c08a2e]/5 blur-[90px]" />
        <svg className="absolute inset-0 h-full w-full opacity-[0.022]" aria-hidden="true">
          <defs>
            <pattern id="pdot" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="1.5" cy="1.5" r="1.5" fill="currentColor" className="text-primary" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#pdot)" />
        </svg>
      </div>

      <div className="relative mx-auto flex h-full max-w-[1400px] flex-col gap-0 px-5 py-8 md:px-10 md:py-10">

        {/* ── Top: Hero + Search ── */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-[40%_60%] md:gap-12">

          {/* Left: copy + stats */}
          <div className="flex flex-col justify-center animate-fade-in">
            <span className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-primary">
              <Sparkles className="size-3.5" />
              {tr.mintNavPortal}
            </span>

            <h1 className="font-display text-3xl font-black leading-[1.05] tracking-tight text-balance md:text-4xl">
              <span className="text-foreground">{tr.whereToGo}</span>
              <br />
              <span className="bg-gradient-to-r from-primary to-[#c08a2e] bg-clip-text text-transparent">
                {tr.likeToGo}
              </span>
            </h1>

            <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-muted-foreground">
              {tr.portalDesc}
            </p>

            {/* stats row */}
            <div className="mt-6 flex flex-wrap gap-3">
              {stats.map(({ icon: Icon, value, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2.5 rounded-xl border border-border bg-card px-4 py-2.5 shadow-sm"
                >
                  <span className="flex size-7 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="size-3.5 text-primary" />
                  </span>
                  <span className="text-base font-black text-primary">{value}</span>
                  <span className="text-xs font-semibold text-muted-foreground">{label}</span>
                </div>
              ))}
            </div>

            {/* quick-tip list */}
            <ul className="mt-6 flex flex-col gap-2.5">
              {tips.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-3">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-accent ring-1 ring-border">
                    <Icon className="size-4 text-primary" />
                  </span>
                  <span className="text-sm font-medium text-foreground/75">{text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: search box + building cards */}
          <div className="flex flex-col gap-5 animate-fade-in" style={{ animationDelay: "80ms" }}>
            {/* Search */}
            <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
              <p className="mb-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                {tr.quickSearch}
              </p>
              <DirectorySearch
                language={language}
                onSelect={onSearchSelect}
                autoFocus
              />
            </div>

            {/* Building cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {buildings.map((b, i) => (
                <article
                  key={b.id}
                  style={{ animationDelay: `${140 + i * 80}ms` }}
                  className="animate-slide-fade group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_20px_50px_-20px_rgba(8,105,118,0.4)]"
                >
                  {/* image */}
                  <div className="relative h-64 overflow-hidden bg-accent">
                    <Image
                      src={b.illustration || "/placeholder.svg"}
                      alt={`${b.name} illustration`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                      sizes="(max-width: 768px) 100vw, 28vw"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary/25 via-transparent to-transparent opacity-0 transition-opacity duration-400 group-hover:opacity-100" />
                    <span className="absolute left-3 top-3 rounded-lg bg-black/40 px-2.5 py-1 text-[11px] font-bold text-white backdrop-blur-sm">
                      {b.shortName}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-4">
                    <h2 className="font-display text-lg font-bold tracking-tight text-foreground">
                      {language === "am"
                        ? b.id === "building-a" ? "ህንጻ ሀ" : "ህንጻ ለ"
                        : b.name}
                    </h2>
                    <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                      {buildingDesc(b.id)}
                    </p>
                    <button
                      type="button"
                      onClick={() => onViewBuilding(b.id)}
                      className="group/btn mt-4 inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground shadow-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-md hover:shadow-primary/25 active:scale-[0.98]"
                    >
                      {tr.viewOffices}
                      <ArrowRight className="size-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
