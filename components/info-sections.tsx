import { Shirt, Info, MessageSquare } from "lucide-react"

export function InfoSections() {
  const sections = [
    {
      icon: Shirt,
      title: "Dress Code",
      content: "Elegante. (Prohibido color marrón, usan las damas de honor; prohibido color blanco, novia). Colores sugeridos: Tierra, verde, celestito, amarillito, etc. Estilo boho.",
      color: "bg-[#fdfbf7]"
    },
    {
      icon: Info,
      title: "Tarjeta & Confirmación",
      content: "Valor de la tarjeta: $30.000. Se confirma presencia una vez abonada la misma (Tiempo límite hasta el 1 de Agosto).",
      color: "bg-[#f8f9fa]"
    }
  ]

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {sections.map((section, index) => (
        <div
          key={index}
          className={`${section.color} p-10 rounded-[2.5rem] border-2 border-[#c9a86c]/20 text-center space-y-6 hover:border-[#c9a86c]/50 hover:shadow-2xl hover:shadow-[#c9a86c]/10 transition-all duration-700 group`}
        >
          <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mx-auto shadow-md text-[#c9a86c] group-hover:scale-110 transition-transform duration-500">
            <section.icon className="w-8 h-8" />
          </div>
          <h3 className="text-3xl font-script text-[#4a4a4a]">{section.title}</h3>
          <p className="text-sm md:text-base text-[#4a4a4a] leading-relaxed font-accent font-light tracking-wide">
            {section.content}
          </p>
        </div>
      ))}
    </div>
  )
}
