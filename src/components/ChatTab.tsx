import { useState, useEffect, useRef, FormEvent } from "react";
import { motion } from "motion/react";
import { Send, RefreshCw } from "lucide-react";
import { ChatMessage } from "../types";

export default function ChatTab() {
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Saudações do clã cibernético, mestre das máquinas! Sou o Cyber-Ninja Diagnostician. Está ouvindo pios de coil whine nas fases reguladoras, vendo fumaça de silício ou sua taxa de quadros derreteu? Insira seus sintomas e deixe meus sensores investigarem!",
      timestamp: "Seguro UTMB.",
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isSendingChat, setIsSendingChat] = useState(false);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const handleSendChatMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsgId = Date.now().toString();
    const newUserMessage: ChatMessage = {
      id: userMsgId,
      role: "user",
      content: inputText,
      timestamp: new Date().toLocaleTimeString(),
    };

    setChatMessages((prev) => [...prev, newUserMessage]);
    setInputText("");
    setIsSendingChat(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...chatMessages, newUserMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error("Falha na interface cibernética.");
      }

      const data = await response.json();

      setChatMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: data.text || "Sem resposta do núcleo.",
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
    } catch (err) {
      console.error(err);
      setChatMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content:
            "❌ [ERRO DE PROTOCOLO NEURAL] Tive um espasmo no barramento por falta de conectividade direta de IA, mas repita o sintoma que ativarei minhas reservas offline!",
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
    } finally {
      setIsSendingChat(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      <div className="rounded-xl border border-cyan-400/40 bg-[#111111] shadow-2xl overflow-hidden glow-teal">
        {/* Header terminal fine details */}
        <div className="bg-[#090909] border-b border-white/5 px-4 py-3.5 flex items-center justify-between font-mono text-xs font-bold">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
            <span className="text-cyan-400 tracking-wider font-extrabold ml-1 uppercase">
              CYBER-NINJA NEURAL DIAGNOSTICS CLIENT
            </span>
          </div>
          <span className="text-gray-500 select-none">NODE_SYS: v404-SECURE</span>
        </div>

        {/* Messages Panel Scroll Area */}
        <div className="p-4 h-[420px] overflow-y-auto space-y-4 bg-grid-cyber font-mono text-xs">
          {chatMessages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 max-w-2xl ${
                msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
              }`}
            >
              {/* Avatar represent */}
              <div
                className={`h-8 w-8 rounded flex items-center justify-center shrink-0 border ${
                  msg.role === "user"
                    ? "bg-[#18181b] border-white/5 text-purple-400 animate-pulse"
                    : "bg-[#161616] border-cyan-400/20 text-cyan-400"
                }`}
              >
                {msg.role === "user" ? "USR" : "NJ"}
              </div>

              {/* Text Dialog Content Bubble */}
              <div
                className={`p-4 rounded-xl border leading-relaxed text-sm font-sans ${
                  msg.role === "user"
                    ? "bg-purple-500/5 border-purple-500/20 text-purple-100"
                    : "bg-[#111]/95 border-white/5 text-cyan-100 whitespace-pre-line"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}

          {/* Loading Response state */}
          {isSendingChat && (
            <div className="flex gap-3 mr-auto items-center max-w-sm">
              <div className="h-8 w-8 rounded flex items-center justify-center bg-[#161616] border border-white/5 text-cyan-400 shrink-0">
                <RefreshCw className="h-4 w-4 animate-spin" />
              </div>
              <div className="px-4 py-3.5 rounded-xl bg-[#111]/90 border border-white/5 text-cyan-400 italic font-sans text-sm">
                Cyber-Ninja meditando na solda fria elétrica...
              </div>
            </div>
          )}

          <div ref={terminalEndRef} />
        </div>

        {/* Input Text Form Client */}
        <form
          onSubmit={handleSendChatMessage}
          className="bg-[#161616] border-t border-white/5 p-3 flex gap-3 font-mono text-xs"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Descreva a queixa da GPU, placa barulhenta ou console sem sinal..."
            disabled={isSendingChat}
            className="grow bg-[#0d0d0d] border border-white/5 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 placeholder:text-gray-600 font-sans text-sm"
          />
          <button
            type="submit"
            disabled={isSendingChat || !inputText.trim()}
            className="bg-cyan-500 hover:bg-cyan-400 text-black px-6 rounded-none skew-x-[-12deg] font-bold transition disabled:opacity-30 uppercase tracking-widest font-sans text-xs cursor-pointer"
          >
            <span className="skew-x-[12deg] inline-block font-sans font-black flex items-center gap-1.5">
              Transmitir
              <Send className="h-4 w-4" />
            </span>
          </button>
        </form>
      </div>
    </div>
  );
}
