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
  const { register, handleSubmit, reset, setValue, getValues } = useForm({
    defaultValues: {
      attendance: "si",
      name: "",
      phone: "",
      diet: "",
      message: ""
    }
  })
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [receiptUrl, setReceiptUrl] = useState("");

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.url) {
        setReceiptUrl(data.url);
        toast.success("Comprobante cargado correctamente");
      } else {
        toast.error(`Error: ${data.error || "No se pudo subir"}`);
      }
    } catch (error) {
      toast.error("Error al conectar con el servidor");
    } finally {
      setIsUploading(false);
    }
  };

  const onSubmit = async (data: any) => {
    if (!receiptUrl) {
      toast.error("Por favor, sube el comprobante de transferencia");
      return;
    }

    const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzzBQXvTQdFmf40W0qe-ePLWIcFdft5_TL0FWBnqFAC28s-VWtpjdIVVDSd0nvHdWg/exec";

    // Usamos URLSearchParams para que Google Script lo reciba como parámetros de formulario
    const formData = new URLSearchParams();
    formData.append("name", data.name);
    formData.append("phone", data.phone || "");
    formData.append("attendance", data.attendance);
    formData.append("diet", data.diet || "");
    formData.append("message", data.message || "");
    formData.append("receipt", receiptUrl);
    formData.append("sheet", "RSVP");

    console.log("Enviando datos...", Object.fromEntries(formData));

    try {
      setIsSubmitting(true);
      await fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData.toString(),
      });

      toast.success("¡Confirmación enviada! Te esperamos.");
      reset();
      setReceiptUrl("");
    } catch (error) {
      console.error("Error al enviar:", error);
      toast.error("Hubo un error, por favor intenta de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="rsvp" className="space-y-12">
      <div className="text-center space-y-4">
        <h2 className="text-4xl md:text-6xl font-script font-normal text-[#4a4a4a]">Confirma tu Asistencia</h2>
        <div className="ornament mx-auto w-48 opacity-50" />
        <p className="text-[#8e8e8e] font-light italic">Por favor, confirma antes del 1 de Agosto</p>
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

        {/* Subida de Comprobante */}
        <div className="space-y-4 p-6 bg-[#faf9f6] rounded-2xl border-2 border-dashed border-[#e5e5e5]">
          <Label className="text-xs uppercase tracking-widest text-[#8e8e8e]">Comprobante de Transferencia (Obligatorio)</Label>
          <div className="flex flex-col items-center justify-center space-y-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
              id="receipt-upload"
            />
            <label
              htmlFor="receipt-upload"
              className={`flex flex-col items-center justify-center w-full h-32 cursor-pointer transition-all ${
                receiptUrl ? "bg-green-50 border-green-200" : "hover:bg-[#f0f0f0]"
              }`}
            >
              {isUploading ? (
                <Loader2 className="w-8 h-8 animate-spin text-[#c9a86c]" />
              ) : receiptUrl ? (
                <div className="text-center">
                  <p className="text-green-600 font-medium">✓ Comprobante cargado</p>
                  <p className="text-xs text-gray-500">Haz clic para cambiar</p>
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-sm text-gray-500">Haz clic para subir captura</p>
                  <p className="text-[10px] uppercase tracking-tighter text-gray-400 mt-1">JPG, PNG o Captura de pantalla</p>
                </div>
              )}
            </label>
          </div>
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
          disabled={isSubmitting || isUploading}
          className="w-full bg-[#4a4a4a] hover:bg-black text-white rounded-full h-14 text-sm uppercase tracking-widest transition-all shadow-lg flex items-center justify-center"
        >
          {isSubmitting ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : null}
          Confirmar Asistencia
        </Button>
      </form>
    </div>
  )
}
