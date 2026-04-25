import { Shirt, Info, MessageSquare } from "lucide-react"

export function InfoSections() {
  const sections = [
    {
      icon: Shirt,
      title: "Dress Code",
      content: "Elegante Sport. ¡Queremos que te sientas cómodo para bailar toda la noche!",
      color: "bg-[#fdfbf7]"
    },
    {
      icon: Info,
      title: "Tips & Notas",
      content: "Si tienes alguna restricción alimentaria (celiaquía, vegetariano, etc.), por favor avísanos al confirmar.",
      color: "bg-[#f8f9fa]"
    }
  ]

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {sections.map((section, index) => (
        <div
          key={index}
          className={`${section.color} p-8 rounded-2xl border border-[#f0f0f0] text-center space-y-6 hover:shadow-lg transition-all duration-500`}
        >
          <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mx-auto shadow-sm text-[#c9a86c]">
            <section.icon className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-serif text-[#4a4a4a]">{section.title}</h3>
          <p className="text-sm text-[#8e8e8e] leading-relaxed font-light">
            {section.content}
          </p>
        </div>
      ))}
    </div>
  )
}
