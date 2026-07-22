"use client"

import { ArrowRight } from "lucide-react"

interface WelcomePageProps {
  onExplore: () => void
  onNavigateOffice: (buildingId: string, officeId: string) => void
}

interface Leader {
  id: string
  name: string
  title: string
  photo: string
  clickable: boolean
  buildingId?: string
  officeId?: string
}

const IMG = "/images/manager images/"

// Top of the hierarchy — the Minister (not clickable)
const minister: Leader = {
  id: "minister",
  name: "His Excellency Dr. Beliko Mola Getahun",
  title: "Minister of Innovation and Technology",
  photo: `${IMG}Dr. Belete Mola.png`,
  clickable: false,
}

// State ministers / heads reporting to the Minister (clickable — navigate to their office directory)
const leaders: Leader[] = [
  {
    id: "research-innovation",
    name: "Honorable Dr. Baisa Bedada",
    title: "State Minister of Research and Innovation Development",
    photo: `${IMG}Dr. Bayisa Bedada.png`,
    clickable: true,
    buildingId: "building-a",
    officeId: "innovation-research",
  },
  {
    id: "ict-digital",
    name: "His Excellency Ato Muluken Kere",
    title: "State Minister of ICT and Digital Economy",
    photo: `${IMG}Muluken Kere.png`,
    clickable: true,
    buildingId: "building-b",
    officeId: "ict-digital-economy",
  },
  {
    id: "advisory",
    name: "Honorable Dr. Fozia Amin",
    title: "Advisory State Minister",
    photo: `${IMG}Dr.Foziya Amin.png`,
    clickable: true,
    buildingId: "building-a",
    officeId: "advisory-state-minister",
  },
  {
    id: "head-ministers-office",
    name: "Ato Leul Seyoum",
    title: "Head of Minister's Office / Partnership & Alliance Affairs",
    photo: `${IMG}Liul Siyum.png`,
    clickable: true,
    buildingId: "building-a",
    officeId: "partnership-alliance",
  },
  {
    id: "chief-administration",
    name: "Ato Solomon Aynimar",
    title: "Chief Executive Officer of Operations / Administration",
    photo: `${IMG}Solomon Aynimar.png`,
    clickable: true,
    buildingId: "building-a",
    officeId: "administration",
  },
]

function LeaderCard({
  leader,
  onNavigate,
}: {
  leader: Leader
  onNavigate?: (leader: Leader) => void
}) {
  const content = (
    <>
      <div className="aspect-square w-full overflow-hidden rounded-xl border border-border bg-muted">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={leader.photo || "/placeholder.svg"}
          alt={leader.name}
          className="h-full w-full object-cover object-top"
          crossOrigin="anonymous"
        />
      </div>
      <p className="mt-2.5 text-[15px] font-semibold leading-snug text-primary text-balance">{leader.name}</p>
      <p className="text-sm leading-snug text-foreground/70 text-pretty">{leader.title}</p>
    </>
  )

  if (!leader.clickable) {
    // Minister — not clickable, default cursor, no interaction
    return <div className="flex cursor-default flex-col items-center text-center select-none">{content}</div>
  }

  return (
    <button
      type="button"
      onClick={() => onNavigate?.(leader)}
      className="group flex flex-col items-center rounded-2xl p-2 text-center transition-all duration-200 hover:-translate-y-0.5 hover:bg-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
      aria-label={`View ${leader.name}'s office directory`}
    >
      {content}
      <span className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-semibold text-primary opacity-0 transition-opacity group-hover:opacity-100">
        View directory
        <ArrowRight className="size-3" />
      </span>
    </button>
  )
}

export function WelcomePage({ onExplore, onNavigateOffice }: WelcomePageProps) {
  function handleNavigate(leader: Leader) {
    if (leader.buildingId && leader.officeId) {
      onNavigateOffice(leader.buildingId, leader.officeId)
    }
  }

  return (
    <div className="mx-auto grid h-full w-full max-w-[1500px] grid-cols-1 items-start gap-6 overflow-y-auto px-5 py-6 md:grid-cols-[3fr_7fr] md:items-center md:gap-10 md:px-8">
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
      <section className="flex flex-col justify-center py-2">
        <div className="relative flex flex-col rounded-3xl border border-border bg-card p-5 shadow-[0_20px_60px_-30px_rgba(8,105,118,0.45)] md:p-6">
          <h2 className="text-center font-display text-xl font-bold tracking-tight text-primary md:text-2xl">
            Ministry Leadership
          </h2>
          <p className="mx-auto mt-1 max-w-md text-center text-sm text-muted-foreground">
            Select a State Minister or Advisor to view their sector directory.
          </p>

          {/* Minister (featured, not clickable) */}
          <div className="mt-4 flex flex-col items-center">
            <div className="w-full max-w-[150px]">
              <LeaderCard leader={minister} />
            </div>
            <div className="mt-3 h-3 w-px bg-border" aria-hidden="true" />
          </div>

          {/* Clickable leaders — equal-sized photos */}
          <div className="mt-2 grid grid-cols-3 gap-4 sm:grid-cols-5">
            {leaders.map((leader) => (
              <LeaderCard key={leader.id} leader={leader} onNavigate={handleNavigate} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
