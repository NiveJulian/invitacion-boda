"use client"

import { useForm } from "react-hook-form"
import { Music, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function MusicForm() {
  const { register, handleSubmit, reset } = useForm()
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: any) => {
    const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz3L9NuRn-RBeQyOQUb8LhBw2lTWbTGwwveUuKaCJuJls3SIv65arQr0f2OGViJtF4/exec";

    try {
      setIsSubmitting(true);
      const response = await fetch(SCRIPT_URL, {
        method: "POST",
        body: JSON.stringify({ ...data, sheet: "Musica" }),
      });

      if (response.ok) {
        toast.success("¡Confirmación enviada! Te esperamos.");
        reset();
      }
    } catch (error) {
      toast.error("Hubo un error, por favor intenta de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div className="bg-[#faf9f6] p-12 rounded-3xl border border-[#c9a86c]/20 text-center space-y-10 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-8 opacity-5">
        <Music className="w-32 h-32" />
      </div>

      <div className="space-y-4">
        <h2 className="text-4xl font-serif text-[#4a4a4a]">¿Qué canción no puede faltar?</h2>
        <p className="text-[#8e8e8e] font-light italic">Ayúdanos a armar la playlist de la fiesta</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto space-y-6">
        <div className="space-y-4 text-left">
          <Input
            {...register("song", { required: true })}
            placeholder="Nombre de la canción y artista"
            className="bg-white border-[#e5e5e5] rounded-xl h-12 focus:ring-[#c9a86c] focus:border-[#c9a86c]"
          />
          <Input
            {...register("guest")}
            placeholder="Tu nombre (opcional)"
            className="bg-white border-[#e5e5e5] rounded-xl h-12 focus:ring-[#c9a86c] focus:border-[#c9a86c]"
          />
        </div>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#c9a86c] hover:bg-[#b0915a] text-white rounded-full h-12 text-sm uppercase tracking-widest transition-all flex items-center justify-center"
        >
          {isSubmitting ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : null}
          Enviar Sugerencia
        </Button>
      </form>
    </div>
  )
}
