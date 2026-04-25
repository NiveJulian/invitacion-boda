"use client"

import { useState, useEffect } from "react"
import { Heart } from "lucide-react"

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const weddingDate = new Date("2025-11-15T17:00:00").getTime()

    const calculateTimeLeft = () => {
      const now = new Date().getTime()
      const difference = weddingDate - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [])

  const timeUnits = [
    { value: timeLeft.days, label: "Días" },
    { value: timeLeft.hours, label: "Horas" },
    { value: timeLeft.minutes, label: "Minutos" },
    { value: timeLeft.seconds, label: "Segundos" },
  ]

  return (
    <section className="bg-secondary py-20 px-4">
      <div className="mx-auto max-w-4xl text-center">
        <Heart className="mx-auto mb-6 h-8 w-8 text-primary" />
        <h2 className="mb-4 text-3xl font-light tracking-wide md:text-4xl">
          Faltan
        </h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-8">
          {timeUnits.map((unit) => (
            <div
              key={unit.label}
              className="rounded-lg bg-card p-6 shadow-sm"
            >
              <span className="block text-4xl font-light text-primary md:text-5xl lg:text-6xl">
                {String(unit.value).padStart(2, "0")}
              </span>
              <span className="mt-2 block text-sm tracking-widest uppercase text-muted-foreground">
                {unit.label}
              </span>
            </div>
          ))}
        </div>
        <p className="mt-8 text-lg text-muted-foreground">
          Para el día más especial de nuestras vidas
        </p>
      </div>
    </section>
  )
}
