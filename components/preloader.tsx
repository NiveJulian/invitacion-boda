"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const IMAGES_TO_PRELOAD = [
  "https://cdn.atomsolucionesit.com.ar/misxv/BodaSYO/3-%20syo.jpeg",
  "https://cdn-byfest.infinityfreeapp.com/images/Seba%20y%20Orne%20-%20Pre%20Boda-31.jpg.jpeg",
  "https://cdn-byfest.infinityfreeapp.com/images/Seba%20y%20Orne%20-%20Pre%20Boda-56.jpg.jpeg",
  "https://cdn-byfest.infinityfreeapp.com/images/Seba%20y%20Orne%20-%20Pre%20Boda-105.jpg.jpeg",
  "https://cdn.atomsolucionesit.com.ar/misxv/BodaSYO/1-%20syo.jpeg",
  "https://cdn.atomsolucionesit.com.ar/misxv/BodaSYO/2-%20syo.jpeg",
  "https://cdn.atomsolucionesit.com.ar/misxv/BodaSYO/4-%20syo.jpeg",
  "https://cdn.atomsolucionesit.com.ar/misxv/BodaSYO/5-%20syo.jpeg",
]

import { toast } from "sonner"

export function Preloader() {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Bloquear scroll mientras carga
    if (isLoading) {
      document.body.style.overflow = "hidden"
    }

    const getCookie = (name: string) => {
      const value = `; ${document.cookie}`
      const parts = value.split(`; ${name}=`)
      if (parts.length === 2) return parts.pop()?.split(';').shift()
    }

    const hasLoaded = getCookie("app-preloaded") || sessionStorage.getItem("app-loaded")
    
    if (hasLoaded) {
      setIsLoading(false)
      document.body.style.overflow = "unset"
      return
    }

    let loadedCount = 0
    const totalImages = IMAGES_TO_PRELOAD.length

    const preloadImage = (src: string) => {
      return new Promise((resolve, reject) => {
        const img = new Image()
        img.src = src
        img.onload = () => {
          loadedCount++
          setProgress(Math.round((loadedCount / totalImages) * 100))
          resolve(src)
        }
        img.onerror = reject
      })
    }

    Promise.all(IMAGES_TO_PRELOAD.map(preloadImage))
      .then(() => {
        setTimeout(() => {
          setIsLoading(false)
          document.body.style.overflow = "unset"
          sessionStorage.setItem("app-loaded", "true")
          document.cookie = "app-preloaded=true; max-age=86400; path=/"
          
          toast.success("Imágenes cargadas correctamente", {
            description: "¡Disfruta de nuestra invitación!",
            duration: 4000,
          })
        }, 1500)
      })
      .catch((err) => {
        console.error("Error preloading images:", err)
        setIsLoading(false)
        document.body.style.overflow = "unset"
      })

    // Limpieza al desmontar
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isLoading])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white"
        >
          <div className="relative flex flex-col items-center space-y-8 px-4 text-center">
            {/* Logo o Iniciales Animadas */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
              className="text-5xl md:text-7xl font-serif text-[#c9a86c]"
            >
              S & O
            </motion.div>

            <div className="space-y-4 w-64 md:w-80">
              <p className="text-[#8e8e8e] font-light tracking-[0.2em] uppercase text-xs">
                Preparando momentos mágicos
              </p>
              
              {/* Barra de progreso elegante */}
              <div className="h-[2px] w-full bg-[#f0f0f0] overflow-hidden rounded-full">
                <motion.div
                  className="h-full bg-[#c9a86c]"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              
              <p className="text-[#c9a86c] font-serif italic text-sm">
                {progress}%
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
