import { useState, FormEvent } from "react";
import { motion } from "motion/react";
import { Calendar, FileCheck, CheckCircle2, MapPin, Clock } from "lucide-react";
import { HardwareIssueTemplate } from "../types";

interface BookingTabProps {
  activeTemplate: HardwareIssueTemplate;
  selectedComponent: string;
  selectedDeviceType: string;
  activeRepairCount: number;
}

export default function BookingTab({
  activeTemplate,
  selectedComponent,
  selectedDeviceType,
  activeRepairCount,
}: BookingTabProps) {
  const [clientName, setClientName] = useState("");
  const [clientWhatsapp, setClientWhatsapp] = useState("");
  const [ticketHash, setTicketHash] = useState("");
  const [isBooked, setIsBooked] = useState(false);

  const handleBooking = (e: FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientWhatsapp) return;

    const alphabetStr = "0123456789ABCDEFGHJKLMNOPQRSTUVWXYZ";
    let hash = "NINJA-";
    for (let i = 0; i < 8; i++) {
      hash += alphabetStr.charAt(Math.floor(Math.random() * alphabetStr.length));
    }
    setTicketHash(hash);
    setIsBooked(true);
  };

  return (
    <div className="max-w-xl mx-auto">
      {!isBooked ? (
        <div className="rounded-xl border border-white/5 bg-[#111111] p-6 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-3 text-cyan-500 font-mono text-[9px] opacity-15 select-none">
            RESERVA_SECURE
          </div>

          <h2 className="text-lg font-bold uppercase tracking-widest text-white border-b border-white/5 pb-3 mb-4 flex items-center gap-2 font-mono">
            <Calendar className="h-5 w-5 text-cyan-400" />
            Agendar Reparo de Bancada
          </h2>

          <p className="text-xs text-gray-400 font-sans mb-6 leading-relaxed">
            Insira seus dados heróicos abaixo para gerar sua <strong>Proposta Operacional de Entrada de Hardware</strong>. Ao chegar em nossa matriz com o número de proposta, faremos a desoxidação imediata.
          </p>

          <form onSubmit={handleBooking} className="space-y-4 font-mono text-xs">
            <div className="space-y-1.5">
              <label className="text-gray-400">NOME EXECUTIVO DO CLIENTE:</label>
              <input
                type="text"
                required
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="Ex: Wdenberg Oliveira"
                className="w-full bg-[#161616] border border-white/5 rounded-lg p-3 text-white focus:outline-none focus:border-cyan-500 font-sans text-sm"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-gray-400">CONEXÃO SECRETA (WHATSAPP):</label>
              <input
                type="text"
                required
                value={clientWhatsapp}
                onChange={(e) => setClientWhatsapp(e.target.value)}
                placeholder="Ex: (85) 99999-9999"
                className="w-full bg-[#161616] border border-white/5 rounded-lg p-3 text-white focus:outline-none focus:border-cyan-500 font-sans text-sm"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-gray-400">DISPOSITIVO DESIGNADO:</label>
              <div className="p-3 bg-[#0d0d0d] border border-white/5 rounded-lg flex items-center justify-between text-white font-sans text-sm">
                <span>
                  {activeTemplate.name} ({selectedComponent})
                </span>
                <span className="text-[10px] font-mono uppercase bg-[#161616] border border-white/5 text-cyan-400 px-2 py-0.5 rounded leading-none shrink-0 font-bold">
                  SELECIONADO
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-semibold uppercase tracking-wider py-3.5 rounded-none skew-x-[-12deg] flex items-center justify-center gap-2 font-mono transition shadow-[0_4px_15px_rgba(20,184,166,0.15)] cursor-pointer"
            >
              <span className="skew-x-[12deg] inline-block font-sans font-black flex items-center gap-1.5 leading-none">
                <FileCheck className="h-5 w-5" />
                Gerar Proposta e Reservar Bancada
              </span>
            </button>
          </form>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-xl border border-cyan-400/30 bg-[#111111] p-6 shadow-2xl relative overflow-hidden glow-teal font-mono text-xs text-left"
        >
          <div className="absolute top-0 right-0 p-3 bg-green-500/10 text-green-400 font-bold px-3 py-1 rounded-bl-lg border-b border-l border-green-500/20 uppercase tracking-widest leading-none">
            ATIVADO
          </div>

          <div className="text-center pb-4 border-b border-white/5">
            <CheckCircle2 className="h-12 w-12 text-green-400 mx-auto mb-2 animate-bounce" />
            <h3 className="text-white font-extrabold uppercase tracking-widest text-sm">
              PROPOSTA DE ENTRADA HOMOLOGADA!
            </h3>
            <p className="font-sans text-[11px] text-gray-500 max-w-sm mx-auto mt-1">
              Apresente este código hash em nossa bancada física para garantir prioridade quântica de desmontagem.
            </p>
          </div>

          {/* Receipt styling */}
          <div className="my-5 p-4 bg-[#161616] rounded-lg border border-white/5 space-y-3.5 text-gray-300">
            <div className="flex justify-between border-b border-white/5 pb-2 gap-4">
              <span className="text-gray-500">CÓDIGO HASH OPERACIONAL:</span>
              <span className="text-cyan-400 font-bold tracking-widest text-right">{ticketHash}</span>
            </div>

            <div className="flex justify-between border-b border-white/5 pb-2 gap-4">
              <span className="text-gray-500">CLIENTE PROPONENTE:</span>
              <span className="text-white font-sans text-right">{clientName}</span>
            </div>

            <div className="flex justify-between border-b border-white/5 pb-2 gap-4">
              <span className="text-gray-500">CANAL DE WHATSAPP:</span>
              <span className="text-white font-sans text-right">{clientWhatsapp}</span>
            </div>

            <div className="flex justify-between border-b border-white/5 pb-2 gap-4">
              <span className="text-gray-500">DISPOSITIVO / COMPONENTE:</span>
              <span className="text-white font-bold text-right text-xs truncate">
                {selectedComponent} ({selectedDeviceType.toUpperCase()})
              </span>
            </div>

            <div className="flex justify-between border-b border-white/5 pb-2 gap-4">
              <span className="text-gray-500">FILA DE ENTRADA:</span>
              <span className="text-purple-400 text-right">BANCADA INTERNA #{activeRepairCount + 1}</span>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center bg-[#0d0d0d] p-3 rounded border border-white/5 mt-2 text-[10px] text-gray-500 gap-2 font-mono">
              <div className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5 text-cyan-500" />
                <span>Matriz Ninja: Av. do Silício, 1010, Neon District</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5 text-cyan-500" />
                <span>09:00 - 19:00</span>
              </div>
            </div>
          </div>

          {/* Close state trigger */}
          <div className="space-y-2.5">
            <button
              onClick={() => setIsBooked(false)}
              className="w-full bg-cyan-400 hover:bg-cyan-300 text-black py-2.5 rounded-none skew-x-[-12deg] font-bold font-sans text-xs uppercase tracking-wider transition text-center block cursor-pointer"
            >
              <span className="skew-x-[12deg] inline-block font-sans font-black">
                Reservar Outra Entrada de Dispositivo
              </span>
            </button>

            <button
              type="button"
              onClick={() => window.print()}
              className="w-full border border-white/5 hover:bg-[#161616] text-gray-400 hover:text-white py-2.5 rounded-lg transition text-center font-sans text-xs cursor-pointer"
            >
              Imprimir Comprovante de Entrada
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
