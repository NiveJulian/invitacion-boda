"use client"

import { useState, useRef } from "react"
import { Play, Pause, Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroVideo() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Video Background */}
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        loop
        muted={isMuted}
        playsInline
        poster="https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=80"
      >
        <source
          src="https://videos.pexels.com/video-files/3327290/3327290-uhd_2560_1440_30fps.mp4"
          type="video/mp4"
        />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white">
        <p className="mb-4 text-lg tracking-[0.3em] uppercase opacity-90">Estás invitado a nuestra boda</p>
        <h1 className="mb-6 text-6xl font-light tracking-wide md:text-8xl lg:text-9xl">
          María <span className="font-serif italic text-accent">&</span> Carlos
        </h1>
        <div className="ornament w-48 mb-6" />
        <p className="text-xl tracking-widest opacity-90 md:text-2xl">15 de Noviembre, 2025</p>
      </div>

      {/* Video Controls */}
      <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={togglePlay}
          className="rounded-full border-white/30 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 hover:text-white"
        >
          {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
          <span className="sr-only">{isPlaying ? "Pausar" : "Reproducir"}</span>
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={toggleMute}
          className="rounded-full border-white/30 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 hover:text-white"
        >
          {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
          <span className="sr-only">{isMuted ? "Activar sonido" : "Silenciar"}</span>
        </Button>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 right-8 z-20 hidden md:block">
        <div className="flex flex-col items-center gap-2 text-white/70">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <div className="h-12 w-px animate-pulse bg-white/50" />
        </div>
      </div>
    </section>
  )
}
