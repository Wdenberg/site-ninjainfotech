import { useState, useEffect, useMemo, FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";

import {
  HARDWARE_TEMPLATES,
  ESTIMATED_PRICES_NINJA,
  DiagnosticResult,
} from "./types";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import DiagnosticTab from "./components/DiagnosticTab";
import LabTab from "./components/LabTab";
import ChatTab from "./components/ChatTab";
import BookingTab from "./components/BookingTab";
import Footer from "./components/Footer";

const ninjaMascot = "/src/assets/images/cyber_ninja_mascot_1779930031356.png";

export default function App() {
  // Navigation & Interactive States
  const [activeTab, setActiveTab] = useState<"diagnostico" | "lab" | "chat" | "agendamento">("diagnostico");

  // Custom Ticker Values (Dynamic)
  const [siliconPurity, setSiliconPurity] = useState(99.4);
  const [solderStationTemp, setSolderStationTemp] = useState(380);
  const [activeRepairCount, setActiveRepairCount] = useState(14);

  // Interval timers for interactive tickers
  useEffect(() => {
    const interval = setInterval(() => {
      setSiliconPurity((prev) => +(prev + (Math.random() * 0.2 - 0.1)).toFixed(2));
      setSolderStationTemp((prev) => Math.floor(prev + (Math.random() * 6 - 3)));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // --- TAB 1: SMART DIAGNOSTIC FORM STATE ---
  const [selectedDeviceType, setSelectedDeviceType] = useState<"gpu" | "laptop" | "motherboard" | "console">("gpu");
  const [selectedComponent, setSelectedComponent] = useState("");
  const [selectedSymptom, setSelectedSymptom] = useState("");
  const [additionalMessage, setAdditionalMessage] = useState("");

  const [isDiagnosing, setIsDiagnosing] = useState(false);
  const [diagnosticSteps, setDiagnosticSteps] = useState<string[]>([]);
  const [diagnosticResult, setDiagnosticResult] = useState<DiagnosticResult | null>(null);

  // Automatically update suggested components and symptoms when device type changes
  const activeTemplate = useMemo(() => {
    return HARDWARE_TEMPLATES.find((t) => t.category === selectedDeviceType)!;
  }, [selectedDeviceType]);

  useEffect(() => {
    setSelectedComponent(activeTemplate.components[0]);
    setSelectedSymptom(activeTemplate.symptoms[0]);
  }, [selectedDeviceType, activeTemplate]);

  const handleRunDiagnostic = async (e: FormEvent) => {
    e.preventDefault();
    setIsDiagnosing(true);
    setDiagnosticResult(null);
    setDiagnosticSteps([]);

    const steps = [
      "🔗 Inicializando varredura de barramento seguro...",
      "⚡ Injetando sinal pulsado nas linhas de alta voltagem (CHECK VRM)...",
      "🔬 Analisando oscilação BGA e resistores com sensor térmico...",
      "🔮 Consultando banco de conhecimentos estelares do Cyber-Ninja AI...",
      "🛠️ Formatando relatório técnico de bancada...",
    ];

    for (let i = 0; i < steps.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 600));
      setDiagnosticSteps((prev) => [...prev, steps[i]]);
    }

    try {
      const response = await fetch("/api/diagnose", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          deviceType: activeTemplate.name,
          component: selectedComponent,
          symptom: selectedSymptom,
          userMessage: additionalMessage,
        }),
      });

      if (!response.ok) {
        throw new Error("Erro de infraestrutura do servidor.");
      }

      const data = await response.json();

      setDiagnosticResult({
        deviceType: activeTemplate.name,
        component: selectedComponent,
        symptom: selectedSymptom,
        dangerLevel: Math.floor(Math.random() * 4) + 6, // 6 to 10
        repairTime: selectedDeviceType === "gpu" ? "1 a 3 dias úteis" : "2 a 4 dias úteis",
        estimatedCost: `R$ ${Math.floor(Math.random() * 200) + ESTIMATED_PRICES_NINJA[selectedDeviceType].min}`,
        technicalSteps: [
          `Remover dissipador de calor e limpar interface de silício anterior com Álcool Isopropílico 99.8%.`,
          `Mapear oscilações ohmicas do componente ${selectedComponent} usando multímetro digital calibrado nos pontos de teste (VCore/VMem).`,
          `Refazer micro-solda térmica ou trocar o encapsulamento físico afetado na estação de calor profissional.`,
          `Aplicar pasta térmica de alta performance (Kryonaut Extreme / Metal Líquido) e novos thermalpads com condutividade de 12.8W/mK.`,
        ],
        narrative: data.text || "Sem detalhes adicionais.",
      });
    } catch (err) {
      console.error(err);
      // Fallback
      setDiagnosticResult({
        deviceType: activeTemplate.name,
        component: selectedComponent,
        symptom: selectedSymptom,
        dangerLevel: 8,
        repairTime: "2 dias úteis",
        estimatedCost: "R$ 380,00",
        technicalSteps: [
          "Limpeza química antiestática",
          "Varredura de curtos virtuais na trilha SMD",
          "Troca física de fusíveis e capacitores danificados",
        ],
        narrative:
          "Ocorreu uma falha ao conectar com a matriz neural. Mas nosso banco offline prevê curto de dissipação de carga no chip de silício devido à dilatação por picos térmicos.",
      });
    } finally {
      setIsDiagnosing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] bg-grid-cyber font-sans text-gray-200 selection:bg-cyan-500 selection:text-black relative">
      {/* Background Decorative Tech Lines */}
      <div className="absolute top-20 right-4 flex flex-col gap-1 items-end opacity-30 pointer-events-none">
        <div className="w-12 h-1 bg-cyan-500"></div>
        <div className="w-8 h-1 bg-cyan-500"></div>
        <div className="w-16 h-1 bg-cyan-500"></div>
      </div>

      {/* Reusable Navbar Component */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        solderStationTemp={solderStationTemp}
        siliconPurity={siliconPurity}
        activeRepairCount={activeRepairCount}
      />

      {/* Reusable Hero Component */}
      <Hero setActiveTab={setActiveTab} ninjaMascot={ninjaMascot} />

      {/* Main Layout Content Tabs */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <AnimatePresence mode="wait">
          {activeTab === "diagnostico" && (
            <motion.div
              key="diagnostico-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
            >
              <DiagnosticTab
                selectedDeviceType={selectedDeviceType}
                setSelectedDeviceType={setSelectedDeviceType}
                selectedComponent={selectedComponent}
                setSelectedComponent={setSelectedComponent}
                selectedSymptom={selectedSymptom}
                setSelectedSymptom={setSelectedSymptom}
                additionalMessage={additionalMessage}
                setAdditionalMessage={setAdditionalMessage}
                isDiagnosing={isDiagnosing}
                diagnosticSteps={diagnosticSteps}
                diagnosticResult={diagnosticResult}
                setDiagnosticResult={setDiagnosticResult}
                handleRunDiagnostic={handleRunDiagnostic}
                activeTemplate={activeTemplate}
                setActiveTab={setActiveTab}
              />
            </motion.div>
          )}

          {activeTab === "lab" && (
            <motion.div
              key="lab-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
            >
              <LabTab />
            </motion.div>
          )}

          {activeTab === "chat" && (
            <motion.div
              key="chat-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
            >
              <ChatTab />
            </motion.div>
          )}

          {activeTab === "agendamento" && (
            <motion.div
              key="agendamento-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
            >
              <BookingTab
                activeTemplate={activeTemplate}
                selectedComponent={selectedComponent}
                selectedDeviceType={selectedDeviceType}
                activeRepairCount={activeRepairCount}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Reusable Footer Component */}
      <Footer />
    </div>
  );
}
