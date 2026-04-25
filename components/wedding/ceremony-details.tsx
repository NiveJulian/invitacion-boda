"use client"

import { useState } from "react"
import { MapPin, Clock, Calendar, Church, PartyPopper } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"

interface EventCardProps {
  icon: React.ReactNode
  title: string
  date: string
  time: string
  location: string
  address: string
  mapUrl: string
}

function EventCard({ icon, title, date, time, location, address, mapUrl }: EventCardProps) {
  const [isMapOpen, setIsMapOpen] = useState(false)

  return (
    <>
      <div className="group rounded-2xl bg-card p-8 shadow-lg transition-all hover:shadow-xl">
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-primary/10 p-4 text-primary">
            {icon}
          </div>
        </div>
        <h3 className="mb-4 text-center text-2xl font-medium">{title}</h3>
        <div className="space-y-3 text-center">
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{date}</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{time}</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span className="text-balance">{location}</span>
          </div>
          <p className="text-sm text-muted-foreground/70">{address}</p>
        </div>
        <div className="mt-6 flex justify-center">
          <Button
            variant="outline"
            onClick={() => setIsMapOpen(true)}
            className="gap-2"
          >
            <MapPin className="h-4 w-4" />
            ¿Cómo llegar?
          </Button>
        </div>
      </div>

      <Dialog open={isMapOpen} onOpenChange={setIsMapOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{location}</DialogDescription>
          </DialogHeader>
          <div className="aspect-video w-full overflow-hidden rounded-lg">
            <iframe
              src={mapUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`Mapa de ${title}`}
            />
          </div>
          <div className="flex justify-center">
            <Button asChild>
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Abrir en Google Maps
              </a>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export function CeremonyDetails() {
  return (
    <section id="ceremony" className="bg-background py-20 px-4">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-light tracking-wide md:text-5xl">
            Ceremonia & Celebración
          </h2>
          <div className="ornament mx-auto w-32" />
          <p className="mt-4 text-lg text-muted-foreground">
            Nos encantaría que nos acompañaras en estos momentos tan especiales
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <EventCard
            icon={<Church className="h-8 w-8" />}
            title="Ceremonia Religiosa"
            date="Sábado, 15 de Noviembre de 2025"
            time="17:00 hrs"
            location="Parroquia San Miguel Arcángel"
            address="Av. Insurgentes Sur 1234, Col. Del Valle, CDMX"
            mapUrl="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3763.5!2d-99.17!3d19.38!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDIyJzQ4LjAiTiA5OcKwMTAnMTIuMCJX!5e0!3m2!1ses!2smx!4v1234567890"
          />
          <EventCard
            icon={<PartyPopper className="h-8 w-8" />}
            title="Recepción"
            date="Sábado, 15 de Noviembre de 2025"
            time="19:00 hrs"
            location="Hacienda Los Laureles"
            address="Carr. Picacho-Ajusco Km 5.5, Tlalpan, CDMX"
            mapUrl="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3763.5!2d-99.20!3d19.30!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDE4JzAwLjAiTiA5OcKwMTInMDAuMCJX!5e0!3m2!1ses!2smx!4v1234567891"
          />
        </div>
      </div>
    </section>
  )
}
