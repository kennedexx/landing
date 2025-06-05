"use client"

import type React from "react"
import { useEffect, useState } from "react"
import Image from "next/image"

export default function ArtHouseLanding() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [showStickyCTA, setShowStickyCTA] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // Mouse tracking for parallax effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Countdown timer
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime()
      const nextSunday = new Date()
      nextSunday.setDate(nextSunday.getDate() + (7 - nextSunday.getDay()))
      nextSunday.setHours(23, 59, 59, 999)

      const distance = nextSunday.getTime() - now

      const days = Math.floor(distance / (1000 * 60 * 60 * 24))
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((distance % (1000 * 60)) / 1000)

      setCountdown({ days, hours, minutes, seconds })
    }

    updateCountdown()
    const interval = setInterval(updateCountdown, 1000)
    return () => clearInterval(interval)
  }, [])

  // Carousel auto-advance
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  // Testimonials auto-advance
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % 5)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  // Sticky CTA on scroll
  useEffect(() => {
    const handleScroll = () => {
      setShowStickyCTA(window.scrollY > window.innerHeight * 0.5)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert("Obrigado! Entraremos em contato em breve com seu desconto especial!")
  }

  const carouselImages = [
    { src: "/carousel-1-estampados.jpeg", alt: "Papéis estampados com padrões geométricos" },
    { src: "/carousel-2-estampados.jpeg", alt: "Papéis com textura rústica" },
    { src: "/carousel-3-textura.jpeg", alt: "Papéis com textura sutil" },
    { src: "/carousel-4-lisos.jpeg", alt: "Papéis lisos em tons neutros" },
    { src: "/carousel-5-personalizados.jpeg", alt: "Papel personalizado tema floresta" },
    { src: "/carousel-6-personalizados.jpeg", alt: "Papel personalizado nuvens rosa" },
    { src: "/carousel-7-personalizados.jpeg", alt: "Papel personalizado mapa-múndi" },
  ]

  const testimonials = [
    {
      text: "Recomendo demais! Consegui montar o projeto do meu papel de parede personalizado de forma muito fácil devido a disponibilidade e compromisso dos profissionais. A entrega também foi dentro do prazo, o que fez muita diferença pra mim. Podem ir sem medo!",
      author: "Gabriel Barbeiro",
    },
    {
      text: "Há mais de cinco anos tenho papel de parede nas salas, quartos e corredores, estão perfeitos. Recentemente aplicação no teto, para correção de imperfeições do gesso, ficou sensacional. Recomendo.",
      author: "Lucia Helena",
    },
    {
      text: "Somente elogios, já comprei 3 vezes nos últimos 6 anos e todos os atendimentos foram incríveis, desde a escolha do papel de parede, até a instalação. Recomendo muito.",
      author: "Camila Silva",
    },
    {
      text: "Foi muito satisfatória. Atendimento vip, entregou no prazo, equipe instaladora profissional e eficiente. Recomendo.",
      author: "Marlene S. Alexandre",
    },
    {
      text: "A Art House tem um atendimento eficiente em local de fácil acesso, Alice a proprietária é muito amável e comprometida com a qualidade e a variedade de seus produtos, inclusive oferece uma coleção de belíssimas padronagens. Fiquei muito contente com o serviço prestado, parabéns! Obrigada!",
      author: "Rita Cazalles",
    },
  ]

  return (
    <div className="font-roboto bg-white overflow-hidden">
      {/* Floating Elements Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div
          className="absolute w-96 h-96 bg-gradient-to-r from-emerald-400/10 to-blue-400/10 rounded-full blur-3xl animate-float"
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
            top: "10%",
            left: "10%",
          }}
        />
        <div
          className="absolute w-80 h-80 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-float-delayed"
          style={{
            transform: `translate(${mousePosition.x * -0.01}px, ${mousePosition.y * -0.01}px)`,
            top: "60%",
            right: "10%",
          }}
        />
        <div
          className="absolute w-64 h-64 bg-gradient-to-r from-yellow-400/10 to-orange-400/10 rounded-full blur-3xl animate-float-slow"
          style={{
            transform: `translate(${mousePosition.x * 0.015}px, ${mousePosition.y * 0.015}px)`,
            bottom: "20%",
            left: "20%",
          }}
        />
      </div>

      {/* Navigation Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-lg border-b border-gray-100 transition-all duration-300">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <a href="https://arthousepapeldeparede.com.br/" target="_blank" rel="noreferrer">
              <Image src="/logo-art-house.png" alt="Art House Logo" width={120} height={60} className="h-12 w-auto" />
            </a>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <a href="#beneficios" className="text-gray-700 hover:text-[#1B5E3A] transition-colors font-medium">
              Benefícios
            </a>
            <a href="#decorativos" className="text-gray-700 hover:text-[#1B5E3A] transition-colors font-medium">
              Produtos
            </a>
            <a href="#depoimentos" className="text-gray-700 hover:text-[#1B5E3A] transition-colors font-medium">
              Depoimentos
            </a>
            <a
              href="https://wa.me/5561986792057"
              target="_blank"
              className="bg-gradient-to-r from-[#1B5E3A] to-[#2d7a4f] text-white px-6 py-2 rounded-full font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              rel="noreferrer"
            >
              💬 WhatsApp
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero-cover.jpeg"
            alt="Revestimento vinílico de alta qualidade"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 z-10">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full animate-float-particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
              }}
            />
          ))}
        </div>

        <div className="relative z-20 container mx-auto px-4 text-white text-center max-w-5xl pt-20">
          <div className="animate-fade-in-up">
            <h1 className="font-montserrat font-bold text-4xl md:text-7xl leading-tight mb-8 bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
              Revestimento Vinílico: 3x mais durável que pintura, sem sujeira e com estilo.
            </h1>

            <h2 className="font-roboto font-light text-xl md:text-2xl leading-relaxed mb-12 text-gray-200 animate-fade-in-up animation-delay-200">
              Paredes sempre impecáveis: revestimento lavável de alta durabilidade, instalação rápida sem bagunça, com a
              qualidade de quem tem 25 anos de experiência.
            </h2>

            <div className="flex flex-col md:flex-row gap-6 justify-center items-center animate-fade-in-up animation-delay-400">
              <a
                href="https://wa.me/5561986792057"
                target="_blank"
                className="group bg-gradient-to-r from-[#1B5E3A] to-[#2d7a4f] text-white px-10 py-5 rounded-2xl font-montserrat font-semibold text-lg inline-flex items-center gap-3 hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 relative overflow-hidden"
                rel="noreferrer"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                <span className="relative">💬 WhatsApp – Fale com um Especialista</span>
              </a>
              <a
                href="#formulario"
                className="group bg-white/10 backdrop-blur-sm text-white px-10 py-5 rounded-2xl font-montserrat font-semibold text-lg border-2 border-white/30 hover:bg-white hover:text-gray-800 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2"
              >
                Quero Meu Desconto
              </a>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="animate-bounce">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* Festival do Papel Promo Banner */}
      <section className="relative py-20 bg-gradient-to-br from-[#F5F5F5] via-white to-[#F5F5F5] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#1B5E3A]/5 to-[#FF9500]/5"></div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="animate-fade-in-up">
            <h2 className="font-montserrat font-bold text-4xl md:text-5xl bg-gradient-to-r from-[#1B5E3A] to-[#2d7a4f] bg-clip-text text-transparent mb-8">
              Festival do Papel: Papéis a pronta entrega na loja com até 50% OFF - Só Esta Semana!
            </h2>

            <p className="font-roboto text-xl md:text-2xl text-gray-700 mb-12 max-w-4xl mx-auto leading-relaxed">
              Renove suas paredes com economia. Promoção por tempo limitado! Preencha o formulário e ganhe +5% de
              desconto extra na sua compra.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto mb-12">
              {[
                { label: "Dias", value: countdown.days },
                { label: "Horas", value: countdown.hours },
                { label: "Min", value: countdown.minutes },
                { label: "Seg", value: countdown.seconds },
              ].map((item, index) => (
                <div key={index} className="group">
                  <div className="bg-white p-6 rounded-3xl shadow-xl text-center transform transition-all duration-300 hover:scale-110 hover:shadow-2xl border border-gray-100">
                    <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#FF9500] to-[#ff7b00] bg-clip-text text-transparent mb-2">
                      {item.value.toString().padStart(2, "0")}
                    </div>
                    <div className="text-sm text-gray-600 font-medium">{item.label}</div>
                  </div>
                </div>
              ))}
            </div>

            <a
              href="#formulario"
              className="group bg-gradient-to-r from-[#FF9500] to-[#ff7b00] text-white px-12 py-6 rounded-2xl font-montserrat font-bold text-xl inline-block hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 relative overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
              <span className="relative">🎉 Aproveitar Desconto Agora</span>
            </a>
          </div>
        </div>
      </section>

      {/* Benefícios Section */}
      <section id="beneficios" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-white"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20 animate-fade-in-up">
            <h2 className="font-montserrat font-bold text-4xl md:text-5xl bg-gradient-to-r from-[#1B5E3A] to-[#2d7a4f] bg-clip-text text-transparent mb-6">
              Por que escolher nosso revestimento vinílico?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Descubra as vantagens que fazem toda a diferença na sua decoração
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "✓",
                title: "Durabilidade 3X",
                desc: "Até 10 anos de vida útil sem retoques.",
                gradient: "from-green-400 to-emerald-600",
              },
              {
                icon: "🧽",
                title: "Lavável",
                desc: "Limpeza fácil com pano úmido.",
                gradient: "from-blue-400 to-cyan-600",
              },
              {
                icon: "⚡",
                title: "Instalação Sem Bagunça",
                desc: "Ambiente pronto em horas, sem cheiro de tinta.",
                gradient: "from-yellow-400 to-orange-600",
              },
              {
                icon: "🏠",
                title: "Conforto Imediato",
                desc: "Use o espaço no mesmo dia.",
                gradient: "from-purple-400 to-pink-600",
              },
              {
                icon: "👥",
                title: "Equipe Própria",
                desc: "Instaladores profissionais com garantia.",
                gradient: "from-indigo-400 to-blue-600",
              },
              {
                icon: "⭐",
                title: "25 Anos de Excelência",
                desc: "Nota 5.0 no Google.",
                gradient: "from-red-400 to-pink-600",
              },
            ].map((benefit, index) => (
              <div key={index} className="group animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="text-center p-8 rounded-3xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-4 border border-gray-100 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div
                    className={`w-20 h-20 bg-gradient-to-r ${benefit.gradient} rounded-full flex items-center justify-center mx-auto mb-6 text-white text-3xl shadow-lg transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 relative z-10`}
                  >
                    {benefit.icon}
                  </div>

                  <h3 className="font-montserrat font-bold text-2xl text-[#1B5E3A] mb-4 relative z-10">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 text-lg leading-relaxed relative z-10">{benefit.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Decorativos & Personalizados */}
      <section
        id="decorativos"
        className="py-24 bg-gradient-to-br from-[#F5F5F5] via-white to-[#F5F5F5] relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#1B5E3A]/5 to-transparent"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="font-montserrat font-bold text-4xl md:text-5xl bg-gradient-to-r from-[#1B5E3A] to-[#2d7a4f] bg-clip-text text-transparent mb-6 leading-tight">
              Mais do que lisos: decorativos e personalizados que expressam seu estilo.
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Descubra nossa coleção completa: desde padrões sofisticados até projetos únicos criados especialmente para
              você
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
            {/* Carousel */}
            <div className="lg:col-span-3 animate-fade-in-up">
              <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                <div className="relative w-full aspect-[3/2]">
                  {carouselImages.map((image, index) => (
                    <div
                      key={index}
                      className={`absolute inset-0 transition-all duration-1000 transform ${
                        currentSlide === index ? "opacity-100 scale-100" : "opacity-0 scale-110"
                      }`}
                    >
                      <Image src={image.src || "/placeholder.svg"} alt={image.alt} fill className="object-cover" />
                    </div>
                  ))}
                </div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

                {/* Image Counter */}
                <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                  {currentSlide + 1} / {carouselImages.length}
                </div>
              </div>

              <div className="flex justify-center mt-8 gap-3">
                {carouselImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-4 h-4 rounded-full transition-all duration-300 ${
                      currentSlide === index ? "bg-[#1B5E3A] scale-125" : "bg-gray-300 hover:bg-gray-400"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="lg:col-span-2 animate-fade-in-up animation-delay-200">
              <div className="space-y-8">
                <div className="group p-8 bg-white rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-3xl transform group-hover:scale-110 transition-transform duration-300">
                      🎨
                    </div>
                    <div>
                      <h3 className="font-montserrat font-bold text-2xl text-[#1B5E3A] mb-2">Padrões Exclusivos</h3>
                      <p className="text-gray-600">Designs únicos e sofisticados</p>
                    </div>
                  </div>
                  <p className="font-roboto text-lg text-gray-700 leading-relaxed">
                    Madeira natural, tijolinho rústico, mármore elegante, geométricos modernos e texturas premium que
                    transformam qualquer ambiente.
                  </p>
                </div>

                <div className="group p-8 bg-white rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center text-3xl transform group-hover:scale-110 transition-transform duration-300">
                      ✨
                    </div>
                    <div>
                      <h3 className="font-montserrat font-bold text-2xl text-[#1B5E3A] mb-2">
                        Projetos Personalizados
                      </h3>
                      <p className="text-gray-600">Criações únicas para você</p>
                    </div>
                  </div>
                  <p className="font-roboto text-lg text-gray-700 leading-relaxed">
                    Desenvolvemos papéis de parede únicos em vinil adesivo ou papel texturizado. Perfeito para quartos
                    infantis temáticos, logotipos empresariais, murais fotográficos e projetos especiais.
                  </p>
                </div>

                <div className="group p-8 bg-white rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center text-3xl transform group-hover:scale-110 transition-transform duration-300">
                      🏆
                    </div>
                    <div>
                      <h3 className="font-montserrat font-bold text-2xl text-[#1B5E3A] mb-2">Qualidade Premium</h3>
                      <p className="text-gray-600">25 anos de experiência</p>
                    </div>
                  </div>
                  <p className="font-roboto text-lg text-gray-700 leading-relaxed">
                    Materiais de alta qualidade, impressão em alta resolução e acabamento impecável. Cada projeto é
                    tratado com o cuidado e atenção aos detalhes que você merece.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparativo */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-white"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20 animate-fade-in-up">
            <h2 className="font-montserrat font-bold text-4xl md:text-5xl bg-gradient-to-r from-[#1B5E3A] to-[#2d7a4f] bg-clip-text text-transparent mb-6">
              Comparativo: Pintura vs Revestimento Vinílico
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Veja por que o revestimento vinílico é a melhor escolha
            </p>
          </div>

          {/* Desktop Table */}
          <div className="hidden lg:block overflow-x-auto animate-fade-in-up animation-delay-200">
            <div className="min-w-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-[#1B5E3A] to-[#2d7a4f] text-white">
                  <tr>
                    <th className="px-8 py-6 text-left font-montserrat font-bold text-lg">Aspecto</th>
                    <th className="px-8 py-6 text-left font-montserrat font-bold text-lg">Pintura Tradicional</th>
                    <th className="px-8 py-6 text-left font-montserrat font-bold text-lg">Revestimento Vinílico</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      aspect: "Durabilidade",
                      traditional: "~3-5 anos antes de precisar repintar.",
                      vinyl: "Até 10 anos sem perder a qualidade.",
                    },
                    {
                      aspect: "Manutenção",
                      traditional: "Dificulta limpeza; manchas e retoques frequentes.",
                      vinyl: "Superfície lavável: pano úmido basta.",
                    },
                    {
                      aspect: "Instalação",
                      traditional: "Obra demorada, sujeira e cheiro forte.",
                      vinyl: "Aplicação rápida, limpa e sem cheiro.",
                    },
                    {
                      aspect: "Variedade",
                      traditional: "Cores limitadas.",
                      vinyl: "Design ilimitado e texturas premium.",
                    },
                    {
                      aspect: "Conforto",
                      traditional: "Interrompe rotina.",
                      vinyl: "Use o ambiente no mesmo dia.",
                    },
                    {
                      aspect: "Custo-benefício",
                      traditional: "Mais barata só no início.",
                      vinyl: "Economia no longo prazo.",
                    },
                  ].map((row, index) => (
                    <tr
                      key={index}
                      className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-gradient-to-r hover:from-[#1B5E3A]/5 hover:to-transparent transition-all duration-300`}
                    >
                      <td className="px-8 py-6 font-montserrat font-bold text-[#1B5E3A] text-lg">{row.aspect}</td>
                      <td className="px-8 py-6 text-gray-600 text-lg">{row.traditional}</td>
                      <td className="px-8 py-6 text-gray-800 font-semibold text-lg relative">
                        <span className="relative z-10">{row.vinyl}</span>
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#1B5E3A] to-[#2d7a4f] rounded-r"></div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden space-y-6 animate-fade-in-up animation-delay-200">
            {[
              {
                aspect: "Durabilidade",
                traditional: "~3-5 anos antes de precisar repintar.",
                vinyl: "Até 10 anos sem perder a qualidade.",
                icon: "⏰",
              },
              {
                aspect: "Manutenção",
                traditional: "Dificulta limpeza; manchas e retoques frequentes.",
                vinyl: "Superfície lavável: pano úmido basta.",
                icon: "🧽",
              },
              {
                aspect: "Instalação",
                traditional: "Obra demorada, sujeira e cheiro forte.",
                vinyl: "Aplicação rápida, limpa e sem cheiro.",
                icon: "🔨",
              },
              {
                aspect: "Variedade",
                traditional: "Cores limitadas.",
                vinyl: "Design ilimitado e texturas premium.",
                icon: "🎨",
              },
              {
                aspect: "Conforto",
                traditional: "Interrompe rotina.",
                vinyl: "Use o ambiente no mesmo dia.",
                icon: "🏠",
              },
              {
                aspect: "Custo-benefício",
                traditional: "Mais barata só no início.",
                vinyl: "Economia no longo prazo.",
                icon: "💰",
              },
            ].map((row, index) => (
              <div key={index} className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-[#1B5E3A] to-[#2d7a4f] p-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{row.icon}</span>
                    <h3 className="font-montserrat font-bold text-xl text-white">{row.aspect}</h3>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg">
                    <h4 className="font-semibold text-red-800 mb-2">❌ Pintura Tradicional</h4>
                    <p className="text-red-700">{row.traditional}</p>
                  </div>

                  <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg">
                    <h4 className="font-semibold text-green-800 mb-2">✅ Revestimento Vinílico</h4>
                    <p className="text-green-700 font-medium">{row.vinyl}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      <section
        id="depoimentos"
        className="py-24 bg-gradient-to-br from-[#F5F5F5] via-white to-[#F5F5F5] relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#1B5E3A]/5 to-transparent"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20 animate-fade-in-up">
            <h2 className="font-montserrat font-bold text-4xl md:text-5xl bg-gradient-to-r from-[#1B5E3A] to-[#2d7a4f] bg-clip-text text-transparent mb-6">
              O que nossos clientes dizem
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Mais de 100 clientes satisfeitos com nota 5.0 no Google
            </p>
          </div>

          <div className="max-w-4xl mx-auto animate-fade-in-up animation-delay-200">
            <div className="relative">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className={`transition-all duration-1000 ${
                    currentTestimonial === index
                      ? "opacity-100 transform translate-x-0"
                      : "opacity-0 transform translate-x-full absolute inset-0"
                  }`}
                >
                  <div className="bg-white p-12 rounded-3xl shadow-2xl text-center border border-gray-100 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#1B5E3A]/5 to-transparent opacity-50"></div>

                    <div className="flex justify-center mb-6 relative z-10">
                      <div className="flex text-yellow-400 text-3xl">
                        <span>⭐⭐⭐⭐⭐</span>
                      </div>
                    </div>

                    <p className="text-2xl text-gray-700 mb-8 italic leading-relaxed font-light relative z-10">
                      "{testimonial.text}"
                    </p>

                    <p className="font-montserrat font-bold text-xl text-[#1B5E3A] relative z-10">
                      — {testimonial.author}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-12 gap-4">
              {[0, 1, 2, 3, 4].map((index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-4 h-4 rounded-full transition-all duration-300 ${
                    currentTestimonial === index ? "bg-[#1B5E3A] scale-125" : "bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Formulário de Contato */}
      <section id="formulario" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-white"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
            <div className="animate-fade-in-up">
              <div className="bg-white p-10 rounded-3xl shadow-2xl border border-gray-100 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#1B5E3A]/5 to-transparent opacity-50"></div>

                <h2 className="font-montserrat font-bold text-4xl bg-gradient-to-r from-[#1B5E3A] to-[#2d7a4f] bg-clip-text text-transparent mb-8 relative z-10">
                  Fale Conosco & Ganhe 5% OFF
                </h2>

                <form onSubmit={handleFormSubmit} className="space-y-6 relative z-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="nome" className="block text-sm font-semibold text-gray-700 mb-3">
                        Nome Completo
                      </label>
                      <input
                        type="text"
                        id="nome"
                        name="nome"
                        required
                        className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#1B5E3A] focus:border-transparent transition-all duration-300 text-lg"
                        placeholder="Seu nome completo"
                      />
                    </div>

                    <div>
                      <label htmlFor="whatsapp" className="block text-sm font-semibold text-gray-700 mb-3">
                        WhatsApp
                      </label>
                      <input
                        type="tel"
                        id="whatsapp"
                        name="whatsapp"
                        required
                        className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#1B5E3A] focus:border-transparent transition-all duration-300 text-lg"
                        placeholder="(61) 99999-9999"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-3">
                      E-mail
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#1B5E3A] focus:border-transparent transition-all duration-300 text-lg"
                      placeholder="seu@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="interesse" className="block text-sm font-semibold text-gray-700 mb-3">
                      O que mais te atrai em papel de parede?
                    </label>
                    <textarea
                      id="interesse"
                      name="interesse"
                      rows={4}
                      className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#1B5E3A] focus:border-transparent transition-all duration-300 text-lg resize-none"
                      placeholder="Conte-nos sobre seu projeto..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#1B5E3A] to-[#2d7a4f] text-white py-6 rounded-2xl font-montserrat font-bold text-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 relative overflow-hidden group"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                    <span className="relative">🎁 Enviar & Receber Desconto</span>
                  </button>

                  <p className="text-sm text-gray-500 text-center">🔒 Seus dados estão protegidos. Não fazemos spam.</p>
                </form>
              </div>
            </div>

            <div className="text-center animate-fade-in-up animation-delay-200">
              <div className="relative">
                <Image
                  src="/loja-interior.jpeg"
                  alt="Interior da loja Art House com variedade de papéis de parede"
                  width={500}
                  height={600}
                  className="w-full max-w-lg mx-auto rounded-3xl shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1B5E3A]/20 to-transparent rounded-3xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 to-black text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#1B5E3A]/10 to-transparent"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
            <div className="animate-fade-in-up">
              <div className="flex items-center mb-6">
                <Image
                  src="/logo-art-house.png"
                  alt="Art House Logo"
                  width={150}
                  height={75}
                  className="h-16 w-auto filter brightness-0 invert"
                />
              </div>
              <h3 className="font-montserrat font-bold text-2xl text-white mb-4">
                Art House | 25 anos transformando ambientes em Brasília.
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                Especialistas em revestimento vinílico com a qualidade e confiança que você merece.
              </p>
            </div>

            <div className="animate-fade-in-up animation-delay-200">
              <h4 className="font-montserrat font-bold text-xl text-white mb-6">Contato</h4>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-[#1B5E3A] to-[#2d7a4f] rounded-full flex items-center justify-center">
                    📍
                  </div>
                  <p className="text-gray-300 text-lg">CLS 311, Bloco C, Loja 29, Asa Sul, Brasília - DF</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-[#1B5E3A] to-[#2d7a4f] rounded-full flex items-center justify-center">
                    📞
                  </div>
                  <a href="tel:61986792057" className="text-gray-300 text-lg hover:text-white transition-colors">
                    (61) 98679-2057
                  </a>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-[#1B5E3A] to-[#2d7a4f] rounded-full flex items-center justify-center">
                    ✉️
                  </div>
                  <a
                    href="mailto:arthouse751@hotmail.com"
                    className="text-gray-300 text-lg hover:text-white transition-colors"
                  >
                    arthouse751@hotmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center pt-12 border-t border-gray-700">
            <div className="flex justify-center items-center gap-3 mb-6">
              <span className="text-yellow-400 text-2xl">⭐⭐⭐⭐⭐</span>
              <span className="font-bold text-xl bg-gradient-to-r from-[#1B5E3A] to-[#2d7a4f] bg-clip-text text-transparent">
                Avaliação 5.0/5 – 100+ reviews no Google
              </span>
            </div>
            <p className="text-gray-400 text-lg">© 2024 Art House. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/5561986792057"
        target="_blank"
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-green-500 to-green-600 text-white p-5 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 animate-pulse-slow group"
        rel="noreferrer"
      >
        <svg
          className="w-8 h-8 group-hover:scale-110 transition-transform duration-300"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
        </svg>
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold animate-bounce">
          !
        </div>
      </a>

      {/* Sticky Mobile CTA */}
      {showStickyCTA && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-gray-200 p-4 md:hidden shadow-2xl">
          <div className="flex gap-3">
            <a
              href="https://wa.me/5561986792057"
              target="_blank"
              className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-4 px-4 rounded-xl font-semibold text-center hover:shadow-lg transition-all duration-300 transform active:scale-95"
              rel="noreferrer"
            >
              💬 WhatsApp
            </a>
            <a
              href="#formulario"
              className="flex-1 bg-gradient-to-r from-[#1B5E3A] to-[#2d7a4f] text-white py-4 px-4 rounded-xl font-semibold text-center hover:shadow-lg transition-all duration-300 transform active:scale-95"
            >
              📝 Formulário
            </a>
          </div>
        </div>
      )}
    </div>
  )
}
