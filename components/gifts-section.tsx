"use client"

import { Gift, Copy, Check } from "lucide-react"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export function GiftsSection() {
  const [copied, setCopied] = useState(false)
  const alias = "OYS2026"
  const cbu = "4530000800011405307311"

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="text-center py-16 px-8 rounded-3xl bg-white shadow-xl shadow-[#c9a86c]/5 border border-[#c9a86c]/10 space-y-8 relative overflow-hidden">
      <div className="space-y-4">
        <h2 className="text-4xl md:text-6xl font-script font-normal text-[#4a4a4a]">Mesa de Regalos</h2>
        <div className="ornament mx-auto w-32 opacity-30" />
        <p className="max-w-xl mx-auto text-[#8e8e8e] font-light leading-relaxed">
          Tu presencia es nuestro mejor regalo. Pero si deseas hacernos un presente, aquí te dejamos los datos. El costo de la tarjeta es de <b>$45.000</b>. Por favor, enviar comprobante de pago para confirmar asistencia.
        </p>
      </div>

      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-[#c9a86c] hover:bg-[#b0915a] text-white px-12 py-6 rounded-full text-sm uppercase tracking-widest transition-all">
            Ver Datos Bancarios
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-md bg-[#faf9f6]">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl text-center">Datos de Transferencia</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="p-6 bg-white rounded-2xl border border-[#f0f0f0] space-y-4">
              <div className="grid grid-cols-2 gap-4 text-left">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-[#8e8e8e] mb-1">Banco</p>
                  <p className="font-medium">Naranja X</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-[#8e8e8e] mb-1">Titular</p>
                  <p className="font-medium text-sm">Ornella G. Mecozzi</p>
                </div>
                <div className="col-span-2">
                  <p className="text-[10px] uppercase tracking-widest text-[#8e8e8e] mb-1">CUIL</p>
                  <p className="font-medium">27-45528246-8</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="relative">
                  <p className="text-[10px] uppercase tracking-widest text-[#8e8e8e] mb-1">Alias</p>
                  <div className="flex items-center justify-between p-3 bg-[#faf9f6] rounded-xl border border-dashed border-[#c9a86c]">
                    <code className="text-sm font-mono text-[#4a4a4a]">{alias}</code>
                    <button 
                      onClick={() => copyToClipboard(alias)}
                      className="p-2 hover:bg-[#c9a86c]/10 rounded-lg transition-colors text-[#c9a86c]"
                    >
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="relative">
                  <p className="text-[10px] uppercase tracking-widest text-[#8e8e8e] mb-1">CBU</p>
                  <div className="flex items-center justify-between p-3 bg-[#faf9f6] rounded-xl border border-dashed border-[#c9a86c]">
                    <code className="text-xs font-mono text-[#4a4a4a]">{cbu}</code>
                    <button 
                      onClick={() => copyToClipboard(cbu)}
                      className="p-2 hover:bg-[#c9a86c]/10 rounded-lg transition-colors text-[#c9a86c]"
                    >
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-center text-xs text-[#8e8e8e] italic">
              ¡Muchas gracias por tu generosidad!
            </p>
          </div>
        </DialogContent>
      </Dialog>

      <div className="absolute -bottom-10 -right-10 opacity-5 rotate-12">
        <Gift className="w-48 h-48" />
      </div>
    </div>
  )
}
