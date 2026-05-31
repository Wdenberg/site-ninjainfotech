import { Sparkles, Sliders, Terminal, Calendar } from "lucide-react";

interface NavbarProps {
  activeTab: "diagnostico" | "lab" | "chat" | "agendamento";
  setActiveTab: (tab: "diagnostico" | "lab" | "chat" | "agendamento") => void;
  solderStationTemp: number;
  siliconPurity: number;
  activeRepairCount: number;
}

export default function Navbar({
  activeTab,
  setActiveTab,
  solderStationTemp,
  siliconPurity,
  activeRepairCount,
}: NavbarProps) {
  return (
    <nav id="navbar" className="sticky top-0 z-50 border-b border-cyan-900/30 bg-black/50 backdrop-blur-md px-6 py-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-cyan-500 rounded-sm rotate-45 flex items-center justify-center shrink-0">
            <div className="w-4 h-4 border-2 border-black"></div>
          </div>
          <div>
            <span className="font-mono text-xl font-black uppercase tracking-tighter text-white">
              NINJA<span className="text-cyan-400 glow-text-cyan">INFOTECH</span>
            </span>
            <p className="font-mono text-[9px] text-cyan-500/80 tracking-widest uppercase">
              // CYBER REPAIR ARMORY
            </p>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex flex-wrap gap-1 rounded bg-[#111] p-1 border border-cyan-950/60 font-mono text-xs">
          <button
            id="tab-diagnostico"
            onClick={() => setActiveTab("diagnostico")}
            className={`flex items-center gap-1.5 px-4 py-2 transition cursor-pointer ${
              activeTab === "diagnostico"
                ? "bg-transparent text-cyan-400 border-b-2 border-cyan-400 font-bold"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <Sparkles className="h-3.5 w-3.5" />
            Diagnóstico AI
          </button>
          <button
            id="tab-lab"
            onClick={() => setActiveTab("lab")}
            className={`flex items-center gap-1.5 px-4 py-2 transition cursor-pointer ${
              activeTab === "lab"
                ? "bg-transparent text-cyan-400 border-b-2 border-cyan-400 font-bold"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <Sliders className="h-3.5 w-3.5" />
            Playground Lab
          </button>
          <button
            id="tab-chat"
            onClick={() => setActiveTab("chat")}
            className={`flex items-center gap-1.5 px-4 py-2 transition cursor-pointer relative ${
              activeTab === "chat"
                ? "bg-transparent text-cyan-400 border-b-2 border-cyan-400 font-bold"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <Terminal className="h-3.5 w-3.5" />
            Chat Cyber-Ninja
            <span className="absolute -top-1 -right-1 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
            </span>
          </button>
          <button
            id="tab-agendamento"
            onClick={() => setActiveTab("agendamento")}
            className={`flex items-center gap-1.5 px-4 py-2 transition cursor-pointer ${
              activeTab === "agendamento"
                ? "bg-transparent text-cyan-400 border-b-2 border-cyan-400 font-bold"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <Calendar className="h-3.5 w-3.5" />
            Agendar Reparo
          </button>
        </div>

        {/* Quick System Diagnostics Bar */}
        <div className="hidden lg:flex items-center gap-4 border-l border-cyan-900/30 pl-4 text-[11px] font-mono text-gray-400">
          <div>
            <span className="text-gray-500">TEMP SOLDA:</span>{" "}
            <span className="text-orange-400 font-medium">{solderStationTemp}°C</span>
          </div>
          <div>
            <span className="text-gray-500">SILÍCIO_P:</span>{" "}
            <span className="text-cyan-400 font-medium">{siliconPurity}%</span>
          </div>
          <div>
            <span className="text-gray-500">LAB_FILA:</span>{" "}
            <span className="text-purple-400 font-medium">{activeRepairCount} Ativos</span>
          </div>
        </div>

      </div>
    </nav>
  );
}
