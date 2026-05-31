import { motion } from "motion/react";

interface HeroProps {
  setActiveTab: (tab: "diagnostico" | "lab" | "chat" | "agendamento") => void;
  ninjaMascot: string;
}

export default function Hero({ setActiveTab, ninjaMascot }: HeroProps) {
  return (
    <header id="hero" className="relative overflow-hidden border-b border-cyan-900/30 bg-[#050505] pt-10 pb-8 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        <div className="lg:col-span-12 xl:col-span-7 space-y-4 z-10 text-center lg:text-left">
          <span className="text-cyan-500 font-mono text-xs tracking-widest uppercase block">// PROTOCOLO DE REPARO AVANÇADO</span>
          
          <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter leading-none text-white uppercase">
            TECH <span className="text-transparent" style={{ WebkitTextStroke: "1px #22d3ee" }}>RESURRECTION</span>
          </h1>

          <p className="max-w-lg text-sm md:text-base text-gray-400 leading-relaxed font-sans mt-2">
            Especialistas em reviver hardware de alto desempenho. De reballing meticuloso de GPUs a reparos complexos em placas-mãe, consoles modernos e notebooks de alta engenharia.
          </p>

          <div className="flex flex-wrap gap-4 mt-4">
            <div className="p-4 bg-[#111111] border border-cyan-900/30 rounded-lg flex-1 min-w-[150px]">
              <div className="text-[10px] text-cyan-500 uppercase font-bold mb-1">Uptime do Laboratório</div>
              <div className="text-2xl font-mono text-white">99.98%</div>
            </div>
            <div className="p-4 bg-[#111111] border border-cyan-900/30 rounded-lg flex-1 min-w-[150px]">
              <div className="text-[10px] text-cyan-500 uppercase font-bold mb-1">TAXA DE SUCESSO</div>
              <div className="text-2xl font-mono text-cyan-400 italic font-bold">LETHAL</div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center lg:justify-start gap-5">
            <button 
              onClick={() => setActiveTab("agendamento")}
              className="px-8 py-4 bg-cyan-500 text-black font-black uppercase text-sm rounded-none skew-x-[-12deg] hover:bg-cyan-400 transition-all cursor-pointer shadow-[0_0_15px_rgba(34,211,238,0.3)]"
            >
              <span className="skew-x-[12deg] inline-block font-sans font-black">Iniciar Reparo Agora</span>
            </button>
            <div className="text-[10px] font-mono text-gray-500 uppercase leading-tight text-left">
              [01] Envio Seguro<br/>[02] Diagnóstico Zero Cost<br/>[03] Devolução Turbo
            </div>
          </div>
        </div>

        {/* BONECO NINJA GERADO NA COMPOSIÇÃO DESTAQUE */}
        <div className="lg:col-span-12 xl:col-span-5 flex justify-center relative">
          <div className="absolute w-80 h-80 border border-cyan-500/10 rounded-full animate-pulse pointer-events-none"></div>
          <div className="absolute w-[440px] h-[440px] border-t border-r border-cyan-500/5 rounded-full rotate-45 pointer-events-none"></div>
          
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="relative relative-ninja-container p-2 rounded-2xl bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/10 border border-cyan-900/30 shadow-[0_0_50px_rgba(20,184,166,0.1)] z-10"
          >
            <img
              src={ninjaMascot}
              alt="Cyber Ninja Mascot"
              referrerPolicy="no-referrer"
              className="w-56 h-56 md:w-64 md:h-64 object-cover rounded-xl"
            />
            <div className="absolute inset-y-0 right-0 w-2 pointer-events-none bg-gradient-to-l from-[#050505] to-transparent" />
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/95 border border-cyan-500/30 px-3 py-1 rounded font-mono text-[10px] text-cyan-400 flex items-center gap-1.5 whitespace-nowrap shadow-md">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-ping" />
              CYBER-NINJA SYSTEM: ONLINE
            </div>
          </motion.div>
        </div>

      </div>
    </header>
  );
}
