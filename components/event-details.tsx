"use client"

import { MapPin, Calendar, Clock } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export function EventDetails() {
  const MapButton = ({ name, address, mapUrl }: { name: string; address: string; mapUrl: string }) => (
    <Dialog>
      <DialogTrigger asChild>
        <button className="mt-6 px-8 py-3 rounded-full border border-[#c9a86c] text-[#c9a86c] text-xs uppercase tracking-widest hover:bg-[#c9a86c] hover:text-white transition-all duration-300">
          Cómo llegar
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl h-[80vh] bg-[#faf9f6] border-none shadow-2xl">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl text-[#4a4a4a] text-center">{name}</DialogTitle>
          <p className="text-center text-sm text-[#8e8e8e] mb-4">{address}</p>
        </DialogHeader>
        <div className="flex-1 w-full h-full rounded-xl overflow-hidden border border-[#e5e5e5]">
          <iframe
            src={mapUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </DialogContent>
    </Dialog>
  )

  return (
    <div className="space-y-20">
      <div className="text-center">
        <h2 className="text-6xl md:text-8xl font-script text-[#4a4a4a] mb-6">Nuestra Boda</h2>
        <div className="ornament mx-auto w-48 mb-12" />
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Ceremonia */}
        <div className="bg-white p-12 rounded-2xl shadow-sm border border-[#f0f0f0] text-center flex flex-col items-center group hover:shadow-xl hover:-translate-y-1 transition-all duration-500">
          <div className="w-16 h-16 rounded-full bg-[#faf9f6] flex items-center justify-center mb-8 text-[#c9a86c] group-hover:scale-110 transition-transform">
            <Calendar className="w-8 h-8" />
          </div>
          <h3 className="text-4xl font-script mb-4">Ceremonia</h3>
          <div className="space-y-2 text-[#8e8e8e] font-light">
            <p className="flex items-center justify-center gap-2">
              <Clock className="w-4 h-4" /> 18:00 Hs
            </p>
            <p className="flex items-center justify-center gap-2">
              <MapPin className="w-4 h-4" /> Sociedad Rural
            </p>
            <p className="text-sm italic">Paso de los Libres, Corrientes</p>
          </div>
          <MapButton 
            name="Sociedad Rural" 
            address="Paso de los Libres, Corrientes"
            mapUrl="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d2060.2501730493486!2d-57.18508960590598!3d-29.722251166499294!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses!2sar!4v1777131441425!5m2!1ses!2sar"
          />
        </div>

        {/* Fiesta */}
        <div className="bg-white p-12 rounded-2xl shadow-sm border border-[#f0f0f0] text-center flex flex-col items-center group hover:shadow-xl hover:-translate-y-1 transition-all duration-500">
          <div className="w-16 h-16 rounded-full bg-[#faf9f6] flex items-center justify-center mb-8 text-[#c9a86c] group-hover:scale-110 transition-transform">
            <Clock className="w-8 h-8" />
          </div>
          <h3 className="text-4xl font-script mb-4">Celebración</h3>
          <div className="space-y-2 text-[#8e8e8e] font-light">
            <p className="flex items-center justify-center gap-2">
              <Clock className="w-4 h-4" /> 21:00 Hs
            </p>
            <p className="flex items-center justify-center gap-2">
              <MapPin className="w-4 h-4" /> Sociedad Rural
            </p>
            <p className="text-sm italic">Paso de los Libres, Corrientes</p>
          </div>
          <MapButton 
            name="Sociedad Rural" 
            address="Paso de los Libres, Corrientes"
            mapUrl="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d2060.2501730493486!2d-57.18508960590598!3d-29.722251166499294!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses!2sar!4v1777131441425!5m2!1ses!2sar"
          />
        </div>
      </div>
    </div>
  )
}
