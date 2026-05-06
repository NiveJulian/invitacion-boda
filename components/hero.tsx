"use client"

import { useState, useRef } from "react"
import { Play, Pause, Volume2, VolumeX } from "lucide-react"

export function Hero() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [videoError, setVideoError] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const handleStart = () => {
    setIsPlaying(true)
    if (videoRef.current) {
      videoRef.current.play()
      videoRef.current.muted = false
      setIsMuted(false)
    }
  }

  const [isAudioPlaying, setIsAudioPlaying] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play();
        setIsAudioPlaying(true);
      } else {
        audioRef.current.pause();
        setIsAudioPlaying(false);
      }
    }
  };

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <audio ref={audioRef} src="https://cdn.atomsolucionesit.com.ar/misxv/BodaSYO/boda-thousandyears.mp3" autoPlay loop preload="auto" />
      {/* Background Video */}
      <div
        className="absolute inset-0 bg-cover bg-center grayscale-[20%] opacity-90"
        style={{ backgroundImage: 'url("https://cdn.atomsolucionesit.com.ar/misxv/BodaSYO/3-%20syo.jpeg")' }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4">
        {!isPlaying ? (
          <button
            onClick={handleStart}
            className="group flex flex-col items-center justify-center space-y-6 transition-all duration-700 hover:scale-105"
          >
            <div className="w-24 h-24 rounded-full border-2 border-white/50 flex items-center justify-center bg-white/10 backdrop-blur-md group-hover:bg-white/20 transition-all">
              <Play className="w-10 h-10 fill-white" />
            </div>
            <div className="space-y-2">
              <h1 className="text-5xl md:text-7xl font-script tracking-normal">Ornella y Sebastian</h1>
              <p className="text-lg md:text-xl font-accent font-light tracking-[0.6em] uppercase opacity-80">Nuestra Boda</p>
            </div>
            <p className="text-sm italic opacity-60 animate-pulse">Haz clic para entrar</p>
          </button>
        ) : (
          <div className="animate-in fade-in duration-1000 space-y-8">
            <h1 className="text-8xl md:text-[10rem] font-script tracking-normal mb-4">O & S</h1>
            <div className="h-[1px] w-32 bg-white/50 mx-auto" />
            <p className="text-2xl md:text-3xl font-accent font-light tracking-[0.6em] uppercase">18 de Diciembre 2026</p>
            <button
              onClick={toggleAudio}
              className="absolute bottom-10 right-10 p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all"
            >
              {isAudioPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
            </button>
          </div>
        )}
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-4 animate-bounce opacity-60">
        <span className="text-xs uppercase tracking-[0.2em] text-white">Desliza</span>
        <div className="w-[1px] h-12 bg-white/50" />
      </div>
    </section>
  )
}
