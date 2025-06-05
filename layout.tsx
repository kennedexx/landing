import type React from "react"
import type { Metadata } from "next"
import { Montserrat, Roboto } from "next/font/google"
import "./globals.css"

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
})

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Art House - Revestimento Vinílico Premium | 25 Anos de Experiência",
  description:
    "Revestimento vinílico 3x mais durável que pintura. Instalação sem sujeira, paredes sempre impecáveis. 25 anos de experiência em Brasília.",
  keywords: "papel de parede, revestimento vinílico, Brasília, decoração, reforma",
  openGraph: {
    title: "Art House - Revestimento Vinílico Premium",
    description: "Transforme suas paredes com revestimento vinílico de alta qualidade. 25 anos de experiência.",
    type: "website",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={`scroll-smooth ${montserrat.variable} ${roboto.variable}`}>
      <body className="font-roboto">{children}</body>
    </html>
  )
}
