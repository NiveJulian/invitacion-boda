"use client"

import { useState, useEffect } from "react"

interface CountdownProps {
  targetDate: string
}

export function Countdown({ targetDate }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const timer = setInterval(() => {
      const difference = +new Date(targetDate) - +new Date()
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      } else {
        clearInterval(timer)
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center">
      <div className="text-4xl md:text-6xl font-serif text-[#c9a86c] mb-1">
        {value.toString().padStart(2, "0")}
      </div>
      <div className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-[#8e8e8e]">
        {label}
      </div>
    </div>
  )

  return (
    <div className="text-center space-y-12 py-10">
      <div className="space-y-4">
        <h2 className="text-sm uppercase tracking-[0.3em] text-[#8e8e8e]">Cada segundo cuenta</h2>
        <div className="h-[1px] w-12 bg-[#c9a86c] mx-auto opacity-50" />
        <h3 className="text-3xl md:text-5xl font-serif text-[#4a4a4a]">Faltan para el Gran Día</h3>
      </div>

      <div className="grid grid-cols-4 gap-4 md:gap-12 max-w-2xl mx-auto">
        <TimeUnit value={timeLeft.days} label="Días" />
        <TimeUnit value={timeLeft.hours} label="Horas" />
        <TimeUnit value={timeLeft.minutes} label="Minutos" />
        <TimeUnit value={timeLeft.seconds} label="Segundos" />
      </div>
    </div>
  )
}
