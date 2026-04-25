"use client"

import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Loader2 } from "lucide-react"
import { useState } from "react"

export function RSVPForm() {
  const { register, handleSubmit, reset, setValue } = useForm()
  const [isSubmitting, setIsSubmitting] = useState(false);
  const onSubmit = async (data: any) => {
    const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz3L9NuRn-RBeQyOQUb8LhBw2lTWbTGwwveUuKaCJuJls3SIv65arQr0f2OGViJtF4/exec";

    try {
      setIsSubmitting(true);
      const response = await fetch(SCRIPT_URL, {
        method: "POST",
        body: JSON.stringify({ ...data, sheet: "RSVP" }),
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
    <div id="rsvp" className="space-y-12">
      <div className="text-center space-y-4">
        <h2 className="text-4xl md:text-6xl font-serif text-[#4a4a4a]">Confirma tu Asistencia</h2>
        <div className="ornament mx-auto w-48 opacity-50" />
        <p className="text-[#8e8e8e] font-light italic">Por favor, confirma antes del 30 de Noviembre</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl mx-auto bg-white p-8 md:p-12 rounded-[2rem] shadow-2xl border border-[#f0f0f0] space-y-8">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-xs uppercase tracking-widest text-[#8e8e8e]">Nombre Completo</Label>
            <Input
              id="name"
              {...register("name", { required: true })}
              placeholder="Juan Pérez"
              className="bg-[#faf9f6] border-none h-12 rounded-xl focus:ring-1 focus:ring-[#c9a86c]"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-xs uppercase tracking-widest text-[#8e8e8e]">WhatsApp</Label>
            <Input
              id="phone"
              {...register("phone")}
              placeholder="+54 11 1234 5678"
              className="bg-[#faf9f6] border-none h-12 rounded-xl focus:ring-1 focus:ring-[#c9a86c]"
            />
          </div>
        </div>

        <div className="space-y-4">
          <Label className="text-xs uppercase tracking-widest text-[#8e8e8e]">¿Asistirás?</Label>
          <RadioGroup
            defaultValue="si"
            onValueChange={(val) => setValue("attendance", val)}
            className="flex gap-8"
          >
            <div className="flex items-center space-x-2 cursor-pointer">
              <RadioGroupItem value="si" id="si" className="border-[#c9a86c] text-[#c9a86c]" />
              <Label htmlFor="si" className="cursor-pointer">¡Sí, ahí estaré!</Label>
            </div>
            <div className="flex items-center space-x-2 cursor-pointer">
              <RadioGroupItem value="no" id="no" className="border-[#c9a86c] text-[#c9a86c]" />
              <Label htmlFor="no" className="cursor-pointer">Lo siento, no puedo</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label htmlFor="diet" className="text-xs uppercase tracking-widest text-[#8e8e8e]">Restricciones Alimentarias</Label>
          <Input
            id="diet"
            {...register("diet")}
            placeholder="Ej: Celíaco, Vegetariano..."
            className="bg-[#faf9f6] border-none h-12 rounded-xl focus:ring-1 focus:ring-[#c9a86c]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="message" className="text-xs uppercase tracking-widest text-[#8e8e8e]">Mensaje para los novios</Label>
          <Textarea
            id="message"
            {...register("message")}
            placeholder="Déjanos un mensaje especial..."
            className="bg-[#faf9f6] border-none min-h-[120px] rounded-2xl focus:ring-1 focus:ring-[#c9a86c] resize-none"
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-[#4a4a4a] hover:bg-black text-white rounded-full h-14 text-sm uppercase tracking-widest transition-all shadow-lg"
        >
          Confirmar Asistencia
        </Button>
      </form>
    </div>
  )
}
