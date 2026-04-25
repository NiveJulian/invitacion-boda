"use client"

import { useState, useEffect } from "react"
import { Hero } from "@/components/hero"
import { Countdown } from "@/components/countdown"
import { EventDetails } from "@/components/event-details"
import { PhotoCarousel } from "@/components/photo-carousel"
import { MusicForm } from "@/components/music-form"
import { InfoSections } from "@/components/info-sections"
import { GiftsSection } from "@/components/gifts-section"
import { RSVPForm } from "@/components/rsvp-form"
import { Footer } from "@/components/footer"

export default function WeddingPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <main className="min-h-screen bg-[#faf9f6] text-[#4a4a4a] overflow-x-hidden">
      <Hero />
      
      <div className="max-w-4xl mx-auto px-4 py-16 space-y-32">
        <section id="countdown" className="scroll-mt-20">
          <Countdown targetDate="2026-12-18T18:00:00" />
        </section>

        <section id="ceremonia" className="scroll-mt-20">
          <EventDetails />
        </section>

        <section id="retratos" className="scroll-mt-20">
          <PhotoCarousel />
        </section>

        <section id="musica" className="scroll-mt-20">
          <MusicForm />
        </section>

        <section id="info" className="scroll-mt-20">
          <InfoSections />
        </section>

        <section id="regalos" className="scroll-mt-20">
          <GiftsSection />
        </section>

        <section id="rsvp" className="scroll-mt-20 pb-20">
          <RSVPForm />
        </section>
      </div>

      <Footer />
    </main>
  )
}
