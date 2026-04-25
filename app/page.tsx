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

import { motion } from "framer-motion"

export default function WeddingPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const fadeIn = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.8, ease: "easeOut" }
  }

  return (
    <main className="min-h-screen bg-[#faf9f6] text-[#4a4a4a] overflow-x-hidden">
      <Hero />
      
      <div className="max-w-4xl mx-auto px-4 py-16 space-y-32">
        <motion.section id="countdown" className="scroll-mt-20" {...fadeIn}>
          <Countdown targetDate="2026-12-18T18:00:00" />
        </motion.section>

        <motion.section id="ceremonia" className="scroll-mt-20" {...fadeIn}>
          <EventDetails />
        </motion.section>

        <motion.section id="retratos" className="scroll-mt-20" {...fadeIn}>
          <PhotoCarousel />
        </motion.section>

        <motion.section id="musica" className="scroll-mt-20" {...fadeIn}>
          <MusicForm />
        </motion.section>

        <motion.section id="info" className="scroll-mt-20" {...fadeIn}>
          <InfoSections />
        </motion.section>

        <motion.section id="regalos" className="scroll-mt-20" {...fadeIn}>
          <GiftsSection />
        </motion.section>

        <motion.section id="rsvp" className="scroll-mt-20 pb-20" {...fadeIn}>
          <RSVPForm />
        </motion.section>
      </div>

      <Footer />
    </main>
  )
}
