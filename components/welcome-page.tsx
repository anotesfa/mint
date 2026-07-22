"use client"

import { useEffect, useState } from "react"
import { ArrowRight, X } from "lucide-react"

interface WelcomePageProps {
  onExplore: () => void
}

interface SectorMember {
  name: string
  amharic?: string
  title: string
  titleAmharic?: string
  photo: string
}

interface Leader {
  id: string
  name: string
  title: string
  photo: string
  clickable: boolean
  sectorName?: string
  members?: SectorMember[]
}

const PLACEHOLDER = "/placeholder-user.jpg"
const IMG = "/images/manager images/"

// Top of the hierarchy — the Minister (not clickable)
const minister: Leader = {
  id: "minister",
  name: "His Excellency Dr. Beliko Mola Getahun",
  title: "Minister of Innovation and Technology",
  photo: `${IMG}Dr. Belete Mola.png`,
  clickable: false,
}

// The three state ministers / advisor (clickable — open their directory document)
const leaders: Leader[] = [
  {
    id: "research-innovation",
    name: "Honorable Dr. Baisa Bedada",
    title: "State Minister of Research and Innovation Development",
    photo: `${IMG}Dr. Bayisa Bedada.png`,
    clickable: true,
    sectorName: "Innovation and Research Sector",
    members: [
      {
        name: "Ato Selamyhun Adefris",
        amharic: "አቶ ሰላምይሁን አደፍረስ",
        title: "CEO of Innovation Development",
        titleAmharic: "የኢኖቬሽን ልማት ዋና ስራ አስፈጻሚ",
        photo: `${IMG}Selamyihun.png`,
      },
      {
        name: "Habtamu Abera (PhD)",
        amharic: "ዶ/ር ሀብታሙ አበራ",
        title: "CEO of National Research and Development",
        titleAmharic: "የብሄራዊ ምርምር እና ልማት ዋና ስራ አስፈጻሚ",
        photo: `${IMG}Dr. Habtamu Abera.png`,
      },
      {
        name: "Tekelemariam Tessema (PhD)",
        amharic: "ዶ/ር ተክለማርያም ተሰማ",
        title: "CEO of Technology Development and Transfer",
        titleAmharic: "የቴክኖሎጂ ልማት እና ሽግግር ዋና ስራ አስፈጻሚ",
        photo: `${IMG}Dr. Teklemariyam Tesema.png`,
      },
    ],
  },
  {
    id: "ict-digital",
    name: "His Excellency Ato Muluken Kere",
    title: "State Minister of ICT and Digital Economy",
    photo: `${IMG}Muluken Kere.png`,
    clickable: true,
    sectorName: "ICT and Digital Economy Sector",
    members: [
      {
        name: "Ato Yonas Hailu",
        amharic: "አቶ ዮናስ ሀይሉ",
        title: "CEO of ICT Infrastructure Development and Administration",
        titleAmharic: "የኢሲቲ መሰረተ ልማት ልማትና አስተዳደር ዋና ስራ አስፈጻሚ",
        photo: `${IMG}Yonas Hailu.png`,
      },
      {
        name: "Ato Seyoum Mengesha",
        amharic: "አቶ ስዩም መንገሻ",
        title: "CEO of Digital Economy Development",
        titleAmharic: "የዲጂታል ኢኮኖሚ ልማት ዋና ስራ አስፈጻሚ",
        photo: `${IMG}Siyum Mengesha.png`,
      },
      {
        name: "W/o Miraj Zekiyi",
        amharic: "ወ/ሮ ሚራጅ ዘኪይ",
        title: "CEO of Electronic Government Development",
        titleAmharic: "የኤሌክትሮኒክ መንግስት ልማት ዋና ስራ አስፈጻሚ",
        photo: `${IMG}Mihiraj Zekiya.png`,
      },
    ],
  },
  {
    id: "advisory",
    name: "Honorable Dr. Fozia Amin",
    title: "Advisor to the Minister of Foreign Affairs",
    photo: `${IMG}Dr.Foziya Amin.png`,
    clickable: true,
    sectorName: "Advisory State Minister Sector",
    members: [
      {
        name: "Dr. Bekerem Lema (PhD)",
        amharic: "ዶ/ር በክሬም ለማ",
        title: "Policy & Strategic Research Lead Executive",
        titleAmharic: "የፖሊሲና ስትራቴጂ ጥናትና ምርምር መሪ ስራ አስፈጻሚ",
        photo: PLACEHOLDER,
      },
      {
        name: "Ato Tesfaye Alemayehu",
        amharic: "አቶ ተስፋዬ አለማየሁ",
        title: "Public Relations & Communication Service Executive",
        titleAmharic: "የሕዝብ ግንኙነትና ኮሙኒኬሽን አገልግሎት ስራ አስፈጻሚ",
        photo: PLACEHOLDER,
      },
      {
        name: "Ato Shimelis Lema",
        amharic: "አቶ ሽመልስ ለማ",
        title: "Audit Executive",
        titleAmharic: "የኦዲት ስራ አስፈጻሚ",
        photo: PLACEHOLDER,
      },
      {
        name: "Ato Melaku Lema",
        amharic: "አቶ መልካሙ ለማ",
        title: "Legal Service Executive",
        titleAmharic: "የህግ አገልግሎት ስራ አስፈጻሚ",
        photo: PLACEHOLDER,
      },
      {
        name: "Ato Mengistu Mamo",
        amharic: "አቶ መኮንን ሞገስ",
        title: "Ethics Monitoring Executive",
        titleAmharic: "የስነ-ምግባር መከታተያ ስራ አስፈጻሚ",
        photo: PLACEHOLDER,
      },
      {
        name: "Ato Abebe Tesfaye",
        amharic: "አቶ ሰበር እንዳለወ",
        title: "Institutional Change Executive",
        titleAmharic: "የተቋማዊ ለውጥ ስራ አስፈጻሚ",
        photo: PLACEHOLDER,
      },
      {
        name: "W/ro Abebech G/Michael",
        amharic: "ወ/ሮ አበበች ገብረሚካኤል",
        title: "Women, Youth & Social Affairs Executive",
        titleAmharic: "የሴቶችና ወጣቶች ማህበራዊ አካታችነት ስራ አስፈጻሚ",
        photo: PLACEHOLDER,
      },
      {
        name: "W/ro Eneyesh Fikre",
        amharic: "ወ/ሮ እጅግታ ቴጂ",
        title: "Innovation Hub Head",
        titleAmharic: "የኢኖቬሽን HUB ፅህፈት ቤት ኃላፊ",
        photo: PLACEHOLDER,
      },
    ],
  },
]

function LeaderCard({
  leader,
  onOpen,
  featured = false,
}: {
  leader: Leader
  onOpen?: (leader: Leader) => void
  featured?: boolean
}) {
  const content = (
    <>
      <div
        className={`overflow-hidden rounded-xl border border-border bg-muted ${
          featured ? "aspect-[4/3] w-full max-w-[320px]" : "aspect-[4/3] w-full"
        }`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={leader.photo || "/placeholder.svg"}
          alt={leader.name}
          className="h-full w-full object-cover object-top"
          crossOrigin="anonymous"
        />
      </div>
      <p
        className={`mt-2.5 font-semibold text-primary ${featured ? "text-lg" : "text-[15px]"} leading-snug text-balance`}
      >
        {leader.name}
      </p>
      <p className={`text-foreground/70 leading-snug text-pretty ${featured ? "text-base" : "text-sm"}`}>
        {leader.title}
      </p>
    </>
  )

  if (!leader.clickable) {
    // Minister — not clickable, default cursor, no interaction
    return <div className="flex cursor-default flex-col items-center text-center select-none">{content}</div>
  }

  return (
    <button
      type="button"
      onClick={() => onOpen?.(leader)}
      className="group flex flex-col items-center rounded-2xl p-2 text-center transition-all duration-200 hover:-translate-y-0.5 hover:bg-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
      aria-label={`View directory for ${leader.name}`}
    >
      {content}
      <span className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-semibold text-primary opacity-0 transition-opacity group-hover:opacity-100">
        View document
        <ArrowRight className="size-3" />
      </span>
    </button>
  )
}

function DirectoryModal({ leader, onClose }: { leader: Leader; onClose: () => void }) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/50 p-4 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label={`${leader.sectorName} directory`}
      onClick={onClose}
    >
      <div
        className="flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start gap-4 border-b border-border bg-accent/50 p-5">
          <div className="size-16 shrink-0 overflow-hidden rounded-xl border border-border bg-muted">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={leader.photo || "/placeholder.svg"}
              alt={leader.name}
              className="h-full w-full object-cover object-top"
              crossOrigin="anonymous"
            />
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="font-display text-lg font-bold leading-tight text-primary text-balance">
              {leader.sectorName}
            </h2>
            <p className="mt-0.5 text-sm font-semibold text-foreground">{leader.name}</p>
            <p className="text-xs text-muted-foreground text-pretty">{leader.title}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-background hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
            aria-label="Close"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Members */}
        <div className="min-h-0 flex-1 overflow-y-auto p-5">
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-foreground/60">
            Sector Leadership &amp; Key Roles
          </h3>
          <ul className="space-y-2.5">
            {leader.members?.map((m) => (
              <li
                key={m.name}
                className="flex items-center gap-3 rounded-2xl border border-border bg-background p-3"
              >
                <div className="size-12 shrink-0 overflow-hidden rounded-lg border border-border bg-muted">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={m.photo || "/placeholder.svg"}
                    alt={m.name}
                    className="h-full w-full object-cover object-top"
                    crossOrigin="anonymous"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-foreground leading-tight">
                    {m.name}
                    {m.amharic ? (
                      <span className="ml-2 font-normal text-muted-foreground">{m.amharic}</span>
                    ) : null}
                  </p>
                  <p className="text-xs text-primary text-pretty">{m.title}</p>
                  {m.titleAmharic ? (
                    <p className="text-xs text-muted-foreground text-pretty">{m.titleAmharic}</p>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export function WelcomePage({ onExplore }: WelcomePageProps) {
  const [openLeader, setOpenLeader] = useState<Leader | null>(null)

  return (
    <div className="mx-auto grid h-full w-full max-w-[1500px] grid-cols-1 items-center gap-6 px-5 py-6 md:grid-cols-[3fr_7fr] md:gap-10 md:px-8">
      {/* Left */}
      <section className="flex flex-col items-start justify-center">
        <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
          <span className="size-1.5 rounded-full bg-primary" />
          Ministry Wayfinding System
        </span>
        <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-balance md:text-6xl">
          Where would you like to go?
        </h1>
        <p className="mt-4 max-w-md text-[15px] leading-relaxed text-muted-foreground">
          Instantly locate ministry offices, departments, managers, room numbers and buildings across the
          Ministry of Innovation and Technology.
        </p>
        <button
          type="button"
          onClick={onExplore}
          className="group relative mt-8 inline-flex items-center gap-3 overflow-hidden rounded-2xl bg-primary px-7 py-4 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-300 hover:scale-[1.03] hover:shadow-xl hover:shadow-primary/30 active:scale-100"
        >
          <span className="pointer-events-none absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-500 group-hover:translate-x-0" />
          Explore Ministry Portal
          <ArrowRight className="size-5 transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </section>

      {/* Right — leadership structure */}
      <section className="flex h-full min-h-0 flex-col justify-center">
        <div className="relative flex min-h-0 flex-col overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-[0_20px_60px_-30px_rgba(8,105,118,0.45)] md:p-10">
          <h2 className="text-center font-display text-2xl font-bold tracking-tight text-primary md:text-3xl">
            Ministry Leadership
          </h2>
          <p className="mx-auto mt-1.5 max-w-md text-center text-sm text-muted-foreground">
            Select a State Minister or Advisor to view their sector directory.
          </p>

          {/* Minister (featured, not clickable) */}
          <div className="mt-7 flex flex-col items-center">
            <LeaderCard leader={minister} featured />
            <div className="mt-5 h-5 w-px bg-border" aria-hidden="true" />
          </div>

          {/* Three clickable leaders */}
          <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {leaders.map((leader) => (
              <LeaderCard key={leader.id} leader={leader} onOpen={setOpenLeader} />
            ))}
          </div>
        </div>
      </section>

      {openLeader ? <DirectoryModal leader={openLeader} onClose={() => setOpenLeader(null)} /> : null}
    </div>
  )
}
