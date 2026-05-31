import { FormEvent } from "react";
import { motion } from "motion/react";
import {
  Sparkles,
  Cpu,
  Laptop,
  HardDrive,
  Gamepad2,
  ChevronDown,
  Zap,
  RefreshCw,
  ShieldAlert,
  Flame,
  Activity,
  Wrench,
  ChevronRight,
  Trash2,
} from "lucide-react";
import { HardwareIssueTemplate, DiagnosticResult } from "../types";

interface DiagnosticTabProps {
  selectedDeviceType: "gpu" | "laptop" | "motherboard" | "console";
  setSelectedDeviceType: (val: "gpu" | "laptop" | "motherboard" | "console") => void;
  selectedComponent: string;
  setSelectedComponent: (val: string) => void;
  selectedSymptom: string;
  setSelectedSymptom: (val: string) => void;
  additionalMessage: string;
  setAdditionalMessage: (val: string) => void;
  isDiagnosing: boolean;
  diagnosticSteps: string[];
  diagnosticResult: DiagnosticResult | null;
  setDiagnosticResult: (val: DiagnosticResult | null) => void;
  handleRunDiagnostic: (e: FormEvent) => void;
  activeTemplate: HardwareIssueTemplate;
  setActiveTab: (tab: "diagnostico" | "lab" | "chat" | "agendamento") => void;
}

export default function DiagnosticTab({
  selectedDeviceType,
  setSelectedDeviceType,
  selectedComponent,
  setSelectedComponent,
  selectedSymptom,
  setSelectedSymptom,
  additionalMessage,
  setAdditionalMessage,
  isDiagnosing,
  diagnosticSteps,
  diagnosticResult,
  setDiagnosticResult,
  handleRunDiagnostic,
  activeTemplate,
  setActiveTab,
}: DiagnosticTabProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      
      {/* Left Column: Form Setup */}
      <div className="lg:col-span-12 xl:col-span-5 space-y-6">
        
        <div className="rounded-xl border border-cyan-900/40 bg-[#111] p-6 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-3 text-cyan-500 font-mono text-xs opacity-20">
            DIAGNOSTICS_SYS
          </div>

          <h2 className="text-lg font-bold uppercase tracking-widest text-white border-b border-cyan-900/20 pb-3 mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-cyan-400" />
            Início do Diagnóstico AI
          </h2>

          <p className="text-xs text-gray-400 mb-6 font-sans">
            Selecione os parâmetros da sua máquina abaixo para que o Cyber-Ninja processe a falha e recomende o melhor protocolo operacional.
          </p>

          <form onSubmit={handleRunDiagnostic} className="space-y-4 font-mono text-xs">
            
            {/* Device Selector Buttons */}
            <div className="space-y-2">
              <label className="text-gray-400 tracking-wider">TIPO DE FERRAGEM:</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { key: "gpu", val: "Placa de Vídeo", icon: Cpu },
                  { key: "laptop", val: "Notebook", icon: Laptop },
                  { key: "motherboard", val: "Placa-Mãe", icon: HardDrive },
                  { key: "console", val: "Videogame", icon: Gamepad2 }
                ].map(dev => {
                  const Icon = dev.icon;
                  return (
                    <button
                      key={dev.key}
                      type="button"
                      onClick={() => setSelectedDeviceType(dev.key as any)}
                      className={`flex items-center gap-2 p-3 rounded-lg border text-left transition cursor-pointer ${
                        selectedDeviceType === dev.key
                          ? "bg-cyan-500/10 border-cyan-400 text-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.15)]"
                          : "bg-[#161616] border-white/5 text-gray-400 hover:border-cyan-500/30"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{dev.val}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Component Dropdown */}
            <div className="space-y-1.5 font-mono">
              <label className="text-gray-400 tracking-wider">COMPONENTE SOB SUSPEITA:</label>
              <div className="relative">
                <select
                  value={selectedComponent || ""}
                  onChange={(e) => setSelectedComponent(e.target.value)}
                  className="w-full bg-[#161616] border border-white/5 text-gray-200 px-3 py-2.5 rounded-lg appearance-none cursor-pointer focus:outline-none focus:border-cyan-500 transition"
                >
                  {activeTemplate.components.map((c, idx) => (
                    <option key={idx} value={c} className="bg-[#111111]">{c}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-cyan-400 pointer-events-none" />
              </div>
            </div>

            {/* Symptom Dropdown */}
            <div className="space-y-1.5 font-mono">
              <label className="text-gray-400 tracking-wider">DEFICIÊNCIA REINCIDENTE (SINTOMA):</label>
              <div className="relative">
                <select
                  value={selectedSymptom || ""}
                  onChange={(e) => setSelectedSymptom(e.target.value)}
                  className="w-full bg-[#161616] border border-white/5 text-gray-200 px-3 py-2.5 rounded-lg appearance-none cursor-pointer focus:outline-none focus:border-cyan-500 transition"
                >
                  {activeTemplate.symptoms.map((s, idx) => (
                    <option key={idx} value={s} className="bg-[#111111]">{s}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-cyan-400 pointer-events-none" />
              </div>
            </div>

            {/* Symptom Details Field */}
            <div className="space-y-1.5 font-mono">
              <label className="text-gray-400 tracking-wider">DETALHES ADICIONAIS OU ANOTAÇÃO EXTRA (OPCIONAL):</label>
              <textarea
                value={additionalMessage}
                onChange={(e) => setAdditionalMessage(e.target.value)}
                placeholder="Ex: Minha placa pisca luz verde por 3 segundos antes do blackout..."
                rows={3}
                className="w-full bg-[#161616] border border-white/5 rounded-lg p-3 text-gray-200 focus:outline-none focus:border-cyan-500 placeholder:text-gray-600 font-sans text-sm resize-none"
              />
            </div>

            {/* Launch Analysis */}
            <button
              type="submit"
              disabled={isDiagnosing}
              className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-semibold uppercase tracking-wider py-3 rounded-lg flex items-center justify-center gap-2 font-sans transition shadow-[0_4px_15px_rgba(34,211,238,0.25)] disabled:opacity-50 cursor-pointer"
            >
              {isDiagnosing ? (
                <>
                  <RefreshCw className="h-5 w-5 animate-spin" />
                  Varrendo Rede Lógica...
                </>
              ) : (
                <>
                  <Zap className="h-5 w-5 fill-current" />
                  Executar Diagnóstico Quântico
                </>
              )}
            </button>

          </form>
        </div>

        {/* Technical Assistance Quick Information Card */}
        <div className="rounded-xl border border-cyan-900/30 bg-[#111111]/60 p-6 font-mono text-xs space-y-3">
          <h3 className="font-sans font-bold text-sm text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
            <ShieldAlert className="h-4 w-4" /> REGRAS DE SEGURANÇA ANTIESTÁTICA (ESD)
          </h3>
          <p className="text-gray-400 font-sans text-[11px] leading-relaxed">
            Sistemas eletrônicos modernos funcionam com microcontroladores suscetíveis a danos permanentes por carga estática acumulada no corpo humano. Antes de qualquer abertura ou manipulação de componentes:
          </p>
          <ul className="space-y-1.5 text-gray-400 pl-4 list-disc text-[11px] font-sans">
            <li>Utilize pulseira de aterramento ESD de malha metálica conectada ao terra de bancada.</li>
            <li>Sempre descarregue os capacitores primários da fonte mantendo o botão Power pressionado por 15 segundos sem cabo elétrico.</li>
            <li>Evite superfícies de madeira resinada ou carpete ao realizar o re-soldamento básico.</li>
          </ul>
        </div>

      </div>

      {/* Right Column: Dynamic Matrix Loading / Diagnostic Result Cards */}
      <div className="lg:col-span-12 xl:col-span-7 space-y-6">
        
        {/* 1. Standard Placeholder state when no diagnosis is executed */}
        {!isDiagnosing && !diagnosticResult && (
          <div className="h-full rounded-xl border border-dashed border-cyan-900/30 bg-[#111]/20 p-12 flex flex-col items-center justify-center text-center gap-4 text-gray-500 font-mono min-h-[400px]">
            <Cpu className="h-16 w-16 text-cyan-950/60 animate-bounce" />
            <div className="space-y-1">
              <p className="text-sm font-bold text-gray-400 uppercase">PRONTO PARA INGESTÃO DE PERFIL</p>
              <p className="text-xs text-gray-500 max-w-sm font-sans">Configure o formulário técnico à esquerda e acione o reator de diagnóstico para revelar as soluções operacionais sugeridas.</p>
            </div>
          </div>
        )}

        {/* 2. Loading Scan Terminal State */}
        {isDiagnosing && (
          <div className="rounded-xl border border-cyan-400/40 bg-[#0d0d0d] p-6 shadow-2xl space-y-4 font-mono text-xs min-h-[400px] flex flex-col justify-between glow-teal relative overflow-hidden">
            
            <div className="absolute top-0 inset-x-0 h-1 bg-cyan-500/20 overflow-hidden">
              <div className="h-full w-1/3 bg-cyan-400 animate-[scanning_1.5s_ease-in-out_infinite]" />
            </div>

            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-cyan-900/30 pb-3 gap-2">
                <span className="text-cyan-400 font-bold uppercase tracking-widest animate-pulse">⚡ VARREDURA DE ARQUITETURA EM ANDAMENTO...</span>
                <span className="text-cyan-500">MÉTODO: INTEGRAÇÃO GEMINI SILICON</span>
              </div>

              <div className="space-y-2 mt-4">
                {diagnosticSteps.map((step, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-gray-300 flex items-start gap-2"
                  >
                    <span className="text-cyan-500 shrink-0">[{idx + 1}]</span>
                    <span>{step}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="border-t border-cyan-900/30 pt-4 flex flex-col sm:flex-row sm:items-center justify-between text-gray-500 bg-[#111111]/90 p-3 rounded-lg gap-2 mt-4">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 animate-spin text-cyan-400" />
                <span className="font-sans">Reunindo informações de barramento em tempo real...</span>
              </div>
              <span className="text-right">REATOR ATIVO</span>
            </div>

          </div>
        )}

        {/* 3. Diagnosed Response Card */}
        {!isDiagnosing && diagnosticResult && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            
            <div className="rounded-xl border border-cyan-400/40 bg-[#111] p-6 shadow-2xl glow-teal relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-cyan-500/10 text-cyan-400 font-mono text-[10px] px-3 py-1 rounded-bl-lg border-b border-l border-cyan-500/30 uppercase tracking-widest">
                Diagnóstico Consolidado
              </div>

              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 bg-cyan-500/10 rounded-lg border border-cyan-500 flex items-center justify-center text-cyan-400">
                  <Cpu className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-cyan-500 uppercase tracking-widest">{diagnosticResult.deviceType}</span>
                  <h3 className="text-lg font-bold text-white uppercase font-mono">{diagnosticResult.component}</h3>
                </div>
              </div>

              {/* Info Pills */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 my-4 font-mono text-xs">
                <div className="p-3 bg-[#161616] rounded-lg border border-white/5 flex flex-col justify-between">
                  <span className="text-gray-500 uppercase">Perigo de Danos:</span>
                  <span className="text-red-400 font-bold text-sm mt-1 flex items-center gap-1">
                    <Flame className="h-4 w-4 text-red-500" />
                    {diagnosticResult.dangerLevel}/10 Crítico
                  </span>
                </div>
                <div className="p-3 bg-[#161616] rounded-lg border border-white/5 flex flex-col justify-between">
                  <span className="text-gray-500 uppercase">Tempo de Bancada:</span>
                  <span className="text-cyan-400 font-bold text-sm mt-1">{diagnosticResult.repairTime}</span>
                </div>
                <div className="p-3 bg-[#161616] rounded-lg border border-white/5 flex flex-col justify-between">
                  <span className="text-gray-500 uppercase">Orçamento Estimado:</span>
                  <span className="text-green-400 font-bold text-md mt-1 italic glow-text-cyan">{diagnosticResult.estimatedCost}</span>
                </div>
              </div>

              {/* Main Narrative - Markdown Styled Render */}
              <div className="border-t border-b border-white/5 py-4 my-5 font-mono">
                <h4 className="font-mono text-xs text-cyan-400 pb-2 flex items-center gap-1.5 uppercase tracking-widest">
                  <Activity className="h-3.5 w-3.5" /> PARECER DO CYBER-NINJA:
                </h4>
                <div className="text-sm font-sans text-gray-300 leading-relaxed space-y-2 whitespace-pre-line bg-[#090909] p-4 rounded-lg border border-white/5">
                  {diagnosticResult.narrative}
                </div>
              </div>

              {/* Technical checklist step physical checks */}
              <div className="space-y-3 font-mono text-xs">
                <h4 className="text-cyan-400 uppercase tracking-widest flex items-center gap-1.5 border-b border-white/5 pb-2">
                  <Wrench className="h-4 w-4" /> PROTOCOLO DE INTERVENÇÃO MANUAL RECOMENDADO:
                </h4>
                <div className="space-y-2.5 pl-1">
                  {diagnosticResult.technicalSteps.map((step, idx) => (
                    <div key={idx} className="flex gap-2.5 items-start">
                      <div className="mt-1 h-4 w-4 rounded bg-[#161616] border border-cyan-500/40 text-cyan-400 text-[10px] font-bold flex items-center justify-center shrink-0">
                        {idx + 1}
                      </div>
                      <p className="text-gray-300 text-[11px] leading-relaxed font-sans">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Booking Link */}
              <div className="mt-6 flex flex-col xl:flex-row justify-between items-center bg-[#161616] p-4 rounded-xl border border-cyan-500/20 gap-4">
                <div className="text-center xl:text-left">
                  <span className="text-[11px] uppercase font-mono text-cyan-400 tracking-wider">PRETENDE ENVIAR SEU CHIP PARA NOSSA BANCADA?</span>
                  <p className="text-xs text-gray-400 font-sans mt-0.5">Nossa bancada está equipada com infravermelho de precisão de 0.2mm anti-estática.</p>
                </div>
                <button
                  onClick={() => setActiveTab("agendamento")}
                  className="bg-cyan-500 hover:bg-cyan-400 text-black px-6 py-3 rounded-none skew-x-[-12deg] font-bold font-sans text-xs uppercase tracking-wider transition shrink-0 flex items-center gap-1.5 cursor-pointer shadow-[0_0_10px_rgba(34,211,238,0.2)] w-full xl:w-auto justify-center"
                >
                  <span className="skew-x-[12deg] inline-block font-sans font-black flex items-center gap-1">
                    Ir para Agendar Reparo
                    <ChevronRight className="h-4 w-4" />
                  </span>
                </button>
              </div>

            </div>

            {/* Quick diagnostic clean state trigger */}
            <div className="text-center font-mono text-xs">
              <button
                onClick={() => setDiagnosticResult(null)}
                className="text-gray-500 hover:text-cyan-400 transition flex items-center gap-1.5 mx-auto py-1 border border-white/5 rounded px-2.5 bg-[#111] cursor-pointer"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Zerar Diagnóstico e Recomeçar Rastreamento
              </button>
            </div>

          </motion.div>
        )}

      </div>

    </div>
  );
}
