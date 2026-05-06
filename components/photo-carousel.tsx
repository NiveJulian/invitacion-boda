"use client"

import * as React from "react"
import Autoplay from "embla-carousel-autoplay"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export function PhotoCarousel() {
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  )

  const photos = [
    { url: "https://cdn-byfest.infinityfreeapp.com/images/Seba%20y%20Orne%20-%20Pre%20Boda-31.jpg.jpeg", title: "La espera" },
    { url: "https://cdn-byfest.infinityfreeapp.com/images/Seba%20y%20Orne%20-%20Pre%20Boda-56.jpg.jpeg", title: "Abrazos llenos de amor" },
    { url: "https://cdn-byfest.infinityfreeapp.com/images/Seba%20y%20Orne%20-%20Pre%20Boda-105.jpg.jpeg", title: "Promesa Eterna" },
    { url: "https://cdn.atomsolucionesit.com.ar/misxv/BodaSYO/1-%20syo.jpeg", title: "Risas Compartidas" },
    { url: "https://cdn.atomsolucionesit.com.ar/misxv/BodaSYO/2-%20syo.jpeg", title: "Miradas que Conectan" },
    { url: "https://cdn.atomsolucionesit.com.ar/misxv/BodaSYO/4-%20syo.jpeg", title: "Almas Gemelas" },
    { url: "https://cdn.atomsolucionesit.com.ar/misxv/BodaSYO/5-%20syo.jpeg", title: "Juntos por Siempre" }
  ];


  return (
    <div className="space-y-12">
      <div className="text-center">
        <h2 className="text-5xl md:text-7xl font-script text-[#4a4a4a] mb-4">Retratos de nuestro Amor</h2>
        <p className="text-[#8e8e8e] font-light tracking-widest uppercase text-xs">Momentos compartidos</p>
      </div>

      <Carousel
        plugins={[plugin.current]}
        className="w-full max-w-4xl mx-auto"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {photos.map((photo, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Card className="border-none overflow-hidden rounded-3xl shadow-2xl">
                  <CardContent className="flex aspect-video items-center justify-center p-0 relative">
                    <img
                      src={photo.url}
                      alt={photo.title}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/60 to-transparent">
                      <p className="text-white font-serif text-2xl">{photo.title}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="hidden md:block">
          <CarouselPrevious className="border-[#c9a86c] text-[#c9a86c] hover:bg-[#c9a86c] hover:text-white" />
          <CarouselNext className="border-[#c9a86c] text-[#c9a86c] hover:bg-[#c9a86c] hover:text-white" />
        </div>
      </Carousel>
    </div>
  )
}
