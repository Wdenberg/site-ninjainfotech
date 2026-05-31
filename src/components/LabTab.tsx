import { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  Activity,
  Flame,
  Cpu,
  Trash2,
  Droplet,
  CheckCircle2,
  Zap,
  Thermometer,
  AlertTriangle,
} from "lucide-react";

export default function LabTab() {
  const [labSubTab, setLabSubTab] = useState<"gpu" | "motherboard" | "cooling">("gpu");

  // A. GPU Simulator State
  const [coreClock, setCoreClock] = useState(1500); // Mhz
  const [memClock, setMemClock] = useState(2000); // Mhz
  const [isStressTesting, setIsStressTesting] = useState(false);
  const [stressProgress, setStressProgress] = useState(0);
  const [fpsValue, setFpsValue] = useState(60);
  const [gpuTemp, setGpuTemp] = useState(42);
  const [hasGpuMelted, setHasGpuMelted] = useState(false);
  const [gpuState, setGpuState] = useState<"idle" | "testing" | "damaged" | "reflowed">("idle");
  const [gpuLog, setGpuLog] = useState<string[]>([
    "[NINJA-BIOS] GPU Pronta.",
    "[SISTEMA] Aguardando teste de estresse...",
  ]);

  // B. Motherboard Simulator State
  const [boardNodes, setBoardNodes] = useState([
    { id: "vr_mosfet", name: "Capacitor de Alta Frequência VRM", isRepaired: false, posX: "45%", posY: "30%" },
    { id: "cmos_batt", name: "Circuito da Bateria CMOS (RTC)", isRepaired: true, posX: "75%", posY: "65%" },
    { id: "bios_chip", name: "Chip Físico de BIOS EPROM", isRepaired: false, posX: "35%", posY: "75%" },
    { id: "pcie_slot", name: "Trilha Canal de Sinal PCIe x16", isRepaired: false, posX: "20%", posY: "42%" },
  ]);
  const [isSoldering, setIsSoldering] = useState<string | null>(null);
  const [circuitRepairedCount, setCircuitRepairedCount] = useState(1);

  // C. Console Cooling State
  const [dustPercentage, setDustPercentage] = useState(68);
  const [liquidMetalQuality, setLiquidMetalQuality] = useState(30); // in %
  const [fanRpm, setFanRpm] = useState(1200);
  const [consoleTemp, setConsoleTemp] = useState(78);
  const [coolingActionLog, setCoolingActionLog] = useState<string>(
    "Sensores térmicos acusando alta retenção de poeira nas aletas de ventilação."
  );

  // Run Realtime Stress Test simulation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isStressTesting && !hasGpuMelted) {
      interval = setInterval(() => {
        setStressProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsStressTesting(false);
            setGpuState("reflowed");
            setGpuLog((old) => [
              ...old,
              "⭐ [SUCESSO] Teste de estresse concluído! Silício estável.",
              "✓ GPU aprovada nos testes cibernéticos!",
            ]);
            return 100;
          }

          // Calculate thermodynamic variables based on clocks
          const baseSpeedRatio = (coreClock + memClock) / 3500;
          const currentTemp = Math.floor(
            40 + prev * 0.4 + baseSpeedRatio * 32 + (Math.random() * 4 - 2)
          );
          setGpuTemp(currentTemp);

          // Overclock limit warning / melting trigger
          if (currentTemp >= 92) {
            setHasGpuMelted(true);
            setIsStressTesting(false);
            setGpuState("damaged");
            setGpuTemp(98);
            setFpsValue(0);
            setGpuLog((old) => [
              ...old,
              "❌ [FALHA CRÍTICA] LIMITE TÉRMICO EXCEDIDO!",
              "💥 Artefatos de memória e colapso de clock detectados.",
              "⚠️ Recomenda-se executar o REFLOW NINJA imediatamente!",
            ]);
            return prev;
          }

          // Generate dynamic hardware variables
          const currentFps = Math.floor(
            coreClock * 0.05 + memClock * 0.01 - currentTemp * 0.1
          );
          setFpsValue(currentFps);

          // Random telemetry logs
          if (prev % 20 === 0) {
            setGpuLog((old) => [
              ...old,
              `[TELEMETRIA] Temp: ${currentTemp}°C | FPS: ${currentFps} | VRAM Lock: Ativa.`,
            ]);
          }

          return prev + 5;
        });
      }, 200);
    }
    return () => clearInterval(interval);
  }, [isStressTesting, coreClock, memClock, hasGpuMelted]);

  const startGpuStressTest = () => {
    setHasGpuMelted(false);
    setStressProgress(0);
    setIsStressTesting(true);
    setGpuState("testing");
    setGpuLog([
      "🔬 Inicializando Benchmark Estressante Ultra-VR...",
      "[ALIMENTAÇÃO] Fornecendo 320 Watts de limite energético.",
    ]);
  };

  const executeNinjaReflow = () => {
    setGpuState("idle");
    setGpuLog((old) => [
      ...old,
      "🧯 Aplicando fluxo líquido Amtech...",
      "🔥 Aplicando curva térmica controlada a 220°C no núcleo...",
      "🧊 Resfriamento criogênico ultra-rápido consolidado.",
      "✓ Nova pasta térmica aplicada (14.2 W/mK).",
    ]);
    setTimeout(() => {
      setHasGpuMelted(false);
      setGpuTemp(40);
      setGpuState("reflowed");
      setFpsValue(60);
      setGpuLog((old) => [
        ...old,
        "🌟 GPU Totalmente Estabilizada! Pronto para o próximo Overclock com segurança.",
      ]);
    }, 1500);
  };

  const handleSolderNode = (nodeId: string) => {
    setIsSoldering(nodeId);
    setTimeout(() => {
      setBoardNodes((prev) =>
        prev.map((n) => (n.id === nodeId ? { ...n, isRepaired: true } : n))
      );
      setIsSoldering(null);
      // Track total repaired
      const currentRepairedCount = boardNodes.filter(
        (n) => n.id === nodeId || n.isRepaired
      ).length;
      setCircuitRepairedCount(currentRepairedCount);
    }, 1200);
  };

  const resetCircuitBoard = () => {
    setBoardNodes([
      { id: "vr_mosfet", name: "Capacitor de Alta Frequência VRM", isRepaired: false, posX: "45%", posY: "30%" },
      { id: "cmos_batt", name: "Circuito da Bateria CMOS (RTC)", isRepaired: false, posX: "75%", posY: "65%" },
      { id: "bios_chip", name: "Chip Físico de BIOS EPROM", isRepaired: false, posX: "35%", posY: "75%" },
      { id: "pcie_slot", name: "Trilha Canal de Sinal PCIe x16", isRepaired: false, posX: "20%", posY: "42%" },
    ]);
    setCircuitRepairedCount(0);
  };

  // Console thermodynamic logic
  useEffect(() => {
    // Temp increases with dust, decreases with liquid metal quality, and adjusts with fan rpm
    const baseTemp = 45;
    const dustImpact = (dustPercentage / 100) * 35;
    const coolingImpact = ((100 - liquidMetalQuality) / 100) * 20;
    const computedTemp = Math.floor(
      baseTemp + dustImpact + coolingImpact - (fanRpm - 1000) * 0.005
    );
    setConsoleTemp(computedTemp);

    // Compute automatic fan control
    if (computedTemp > 85) {
      setCoolingActionLog(
        "🚨 [PERIGO ENERGÉTICO] Cooler a 100% (Modo Turbina)! Mensagem de superaquecimento iminente."
      );
    } else if (computedTemp > 70) {
      setCoolingActionLog(
        "⚠️ Alerta térmico: Dissipação de calor debilitada por obstrução gasosa."
      );
    } else {
      setCoolingActionLog("✓ Temperatura controlada de forma silenciosa.");
    }
  }, [dustPercentage, liquidMetalQuality, fanRpm]);

  // Adjust fan speed dynamically based on console temp
  useEffect(() => {
    if (consoleTemp > 85) {
      setFanRpm(2800);
    } else if (consoleTemp > 70) {
      setFanRpm(2000);
    } else {
      setFanRpm(1250);
    }
  }, [consoleTemp]);

  const cleanConsoleDust = () => {
    setDustPercentage(5);
    setCoolingActionLog(
      "💨 Soprador industrial de CO2 disparado! Poeira desintegrada instantaneamente."
    );
  };

  const applyLiquidMetal = () => {
    setLiquidMetalQuality(95);
    setCoolingActionLog(
      "🧪 Metal Líquido de grau aeroespacial de 128W/mK reaplicado com precisão cirúrgica."
    );
  };

  return (
    <div className="space-y-8">
      {/* Lab Subnav */}
      <div className="flex flex-wrap border-b border-cyan-950/80 pb-1 gap-2 font-mono text-xs">
        <button
          onClick={() => setLabSubTab("gpu")}
          className={`px-4 py-2 border-b-2 transition cursor-pointer ${
            labSubTab === "gpu"
              ? "border-cyan-500 text-cyan-400 font-bold"
              : "border-transparent text-gray-500 hover:text-gray-300"
          }`}
        >
          ⚡ Stress Test / Overclock & Reflow GPU
        </button>
        <button
          onClick={() => setLabSubTab("motherboard")}
          className={`px-4 py-2 border-b-2 transition cursor-pointer ${
            labSubTab === "motherboard"
              ? "border-cyan-500 text-cyan-400 font-bold"
              : "border-transparent text-gray-500 hover:text-gray-300"
          }`}
        >
          🧩 Circuito Micro-Solder Placa-Mãe
        </button>
        <button
          onClick={() => setLabSubTab("cooling")}
          className={`px-4 py-2 border-b-2 transition cursor-pointer ${
            labSubTab === "cooling"
              ? "border-cyan-500 text-cyan-400 font-bold"
              : "border-transparent text-gray-500 hover:text-gray-300"
          }`}
        >
          🌡️ Simulador Refrigeração Consoles PS5
        </button>
      </div>

      {/* A. LAB - GPU SIMULATOR */}
      {labSubTab === "gpu" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Controls */}
          <div className="lg:col-span-12 xl:col-span-4 space-y-6">
            <div className="rounded-xl border border-cyan-900/30 bg-[#111111] p-6 space-y-6 shadow-xl relative overflow-hidden">
              <div>
                <h3 className="text-white font-bold uppercase tracking-widest font-mono text-sm border-b border-white/5 pb-2">
                  MÓDULO DE OVERCLOCKING DA CPU/GPU
                </h3>
                <p className="text-xs text-gray-400 font-sans mt-2">
                  Calibre as frequências de clock centrais. Atenção: Clocks excessivos sem dissipação de calor
                  adequada podem quebrar a estrutura da solda por estresse térmico em menos de 10 segundos!
                </p>
              </div>

              {/* Core Clock Slider */}
              <div className="space-y-2 font-mono text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 uppercase">GPU Core Clock (Mhz):</span>
                  <span className={`${coreClock > 1950 ? "text-red-400 font-bold" : "text-cyan-400"}`}>
                    {coreClock} Mhz {coreClock > 1950 && "🔥 EXTREMO"}
                  </span>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="2500"
                  step="50"
                  value={coreClock}
                  disabled={isStressTesting}
                  onChange={(e) => setCoreClock(+e.target.value)}
                  className="w-full accent-cyan-400 bg-white/5 h-1.5 rounded-lg cursor-pointer"
                />
              </div>

              {/* Memory Clock Slider */}
              <div className="space-y-2 font-mono text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Memory Clock (GDDR6):</span>
                  <span className={`${memClock > 2300 ? "text-red-400 font-bold" : "text-cyan-400"}`}>
                    {memClock} Mhz
                  </span>
                </div>
                <input
                  type="range"
                  min="1500"
                  max="2800"
                  step="50"
                  value={memClock}
                  disabled={isStressTesting}
                  onChange={(e) => setMemClock(+e.target.value)}
                  className="w-full accent-cyan-400 bg-white/5 h-1.5 rounded-lg cursor-pointer"
                />
              </div>

              {/* Controls Buttons */}
              <div className="space-y-3 font-mono text-xs pt-2">
                <button
                  onClick={startGpuStressTest}
                  disabled={isStressTesting || hasGpuMelted}
                  className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-semibold py-3 px-4 rounded-none skew-x-[-12deg] flex items-center justify-center gap-1.5 transition disabled:opacity-50 uppercase tracking-widest cursor-pointer shadow-[0_0_10px_rgba(34,211,238,0.2)] font-sans font-black"
                >
                  <span className="skew-x-[12deg] inline-block flex items-center gap-1">
                    <Activity className="h-4 w-4 shrink-0 animate-pulse" />
                    Iniciar Benchmark de Estresse
                  </span>
                </button>

                <button
                  onClick={executeNinjaReflow}
                  disabled={!hasGpuMelted && gpuState !== "damaged"}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold py-3 px-4 rounded-none skew-x-[-12deg] flex items-center justify-center gap-1.5 transition disabled:opacity-30 uppercase tracking-widest relative cursor-pointer font-sans font-black"
                >
                  <span className="skew-x-[12deg] inline-block flex items-center gap-1">
                    <Flame className="h-4 w-4 animate-bounce" />
                    Fazer Reparo Reflow Ninja
                  </span>
                  {hasGpuMelted && (
                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Right Simulator Panel */}
          <div className="lg:col-span-12 xl:col-span-8 space-y-6">
            <div className="rounded-xl border border-white/5 bg-[#111] p-6 shadow-xl space-y-4 font-mono text-xs relative overflow-hidden">
              {/* Interactive Visual Canvas / Status Indicator */}
              <div className="border border-white/5 bg-[#161616] aspect-video rounded-lg relative overflow-hidden flex flex-col justify-between p-4 bg-grid-cyber">
                {/* GLITCH OVERLAY / PHYSICAL ARTIFACTS TO DEMONSTRATE MELTING INTENT */}
                {hasGpuMelted && (
                  <div className="absolute inset-0 z-20 overflow-hidden pointer-events-none bg-red-950/30">
                    <div className="absolute inset-x-0 h-4 bg-purple-500/40 shadow-[0_0_15px_#a855f7] scanner-line" />
                    <div className="absolute top-[20%] left-[10%] w-12 h-12 bg-green-500/80 blink border border-white" />
                    <div className="absolute top-[50%] right-[30%] w-8 h-20 bg-blue-500/80 blink border border-white" />
                    <div className="absolute bottom-[30%] left-[45%] w-16 h-8 bg-pink-500/85 blink border border-white" />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-xs">
                      <div className="text-center p-4 rounded-xl border border-red-500/40 bg-[#110505] animate-pulse">
                        <AlertTriangle className="h-10 w-10 text-red-500 mx-auto mb-2" />
                        <span className="text-red-400 font-bold uppercase tracking-widest text-sm text-[11px]">
                          ⚠️ CORE BLACKOUT: GPU DERRETIDA!
                        </span>
                        <p className="font-sans text-[10px] text-gray-400 mt-1 max-w-xs mx-auto">
                          As frequências overclocked ultrapassaram a tolerância física do chip. Execute o
                          conserto de reflow.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {gpuState === "testing" && (
                  <div className="absolute inset-x-0 h-0.5 bg-cyan-500/30 scanner-line z-10 pointer-events-none" />
                )}

                {/* Telemetry Display */}
                <div className="flex justify-between items-center border-b border-white/5 pb-2 z-10">
                  <span className="text-cyan-400 font-bold flex items-center gap-1 text-[11px]">
                    <Cpu className="h-4 w-4" /> MONITOR DE RENDIMENTO DE ARQUITETURA
                  </span>
                  <span className="text-[10px] bg-[#111] px-2 py-0.5 rounded border border-white/5 text-cyan-400 text-right">
                    {gpuState.toUpperCase()}
                  </span>
                </div>

                {/* Large Thermometer or RPM Display */}
                <div className="flex flex-col sm:flex-row items-center justify-around py-4 z-10 gap-4">
                  {/* Speed Gauge */}
                  <div className="text-center">
                    <span className="text-gray-500 text-[10px] block">FRAME RATE</span>
                    <span className={`text-4xl font-extrabold ${hasGpuMelted ? "text-gray-600" : "text-white"}`}>
                      {hasGpuMelted ? "00" : fpsValue} <span className="text-xs text-gray-500 font-normal">FPS</span>
                    </span>
                  </div>

                  {/* Temperature */}
                  <div className="text-center">
                    <span className="text-gray-500 text-[10px] block font-sans">NÚCLEO TERMOPAR</span>
                    <span
                      className={`text-4xl font-extrabold flex items-center justify-center ${
                        gpuTemp > 85
                          ? "text-red-500 font-black animate-pulse"
                          : gpuTemp > 70
                          ? "text-yellow-400"
                          : "text-emerald-400"
                      }`}
                    >
                      <Thermometer className="h-6 w-6 stroke-[3]" />
                      {gpuTemp}°C
                    </span>
                  </div>

                  {/* Progress bar */}
                  {isStressTesting && (
                    <div className="text-center">
                      <span className="text-cyan-500 text-[10px] block mb-1">STRESS PROGRESS</span>
                      <div className="w-24 bg-[#111]/60 rounded-full h-2.5 overflow-hidden border border-white/5">
                        <div
                          className="bg-cyan-400 h-2.5 rounded-full animate-pulse"
                          style={{ width: `${stressProgress}%` }}
                        />
                      </div>
                      <span className="text-[10px] text-cyan-300 mt-1 block">{stressProgress}%</span>
                    </div>
                  )}
                </div>

                {/* Interactive Graph Simulation bar */}
                <div className="space-y-1.5 z-10 w-full">
                  <div className="flex justify-between text-[9px] text-gray-500 mb-0.5">
                    <span>RECURSO COMPUTACIONAL DO INTEGRADO (ESTRESSE)</span>
                    <span>{stressProgress}%</span>
                  </div>
                  <div className="h-4 bg-[#111] rounded-sm border border-white/5 flex overflow-hidden">
                    {Array.from({ length: 40 }).map((_, idx) => {
                      const isActive = idx < stressProgress * 0.4;
                      return (
                        <div
                          key={idx}
                          className={`grow mx-[1px] rounded-xs transition-colors duration-200 ${
                            hasGpuMelted
                              ? "bg-red-950/20"
                              : isActive
                              ? gpuTemp > 85
                                ? "bg-red-500"
                                : gpuTemp > 70
                                ? "bg-yellow-400"
                                : "bg-cyan-400"
                              : "bg-[#18181b]"
                          }`}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Log Screen */}
              <div className="space-y-2 border border-white/5 bg-[#090909] p-4 rounded-lg">
                <span className="text-[10px] text-cyan-400 uppercase tracking-widest block font-bold">
                  HISTÓRICO DO DIAGNÓSTICO DE SILÍCIO:
                </span>
                <div className="h-32 overflow-y-auto font-mono text-[11px] text-gray-400 space-y-1">
                  {gpuLog.map((log, idx) => (
                    <div key={idx} className="flex gap-2">
                      <span className="text-gray-600 font-normal">[{new Date().toLocaleTimeString()}]</span>
                      <span
                        className={
                          log.includes("❌") || log.includes("💥")
                            ? "text-red-400 font-bold"
                            : log.includes("✓") || log.includes("⭐")
                            ? "text-green-400 font-bold"
                            : "text-gray-300"
                        }
                      >
                        {log}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* B. LAB - MOTHERBOARD SIMULATOR */}
      {labSubTab === "motherboard" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Explanatory text & status */}
          <div className="lg:col-span-12 xl:col-span-4 space-y-6">
            <div className="rounded-xl border border-white/5 bg-[#111111] p-6 space-y-4 shadow-xl font-mono text-xs">
              <div>
                <h3 className="text-white font-bold uppercase tracking-widest text-sm border-b border-white/5 pb-2">
                  MÓDULO DE SOLDA DE CIRCUITO INTERATIVO
                </h3>
                <p className="text-xs text-gray-400 font-sans mt-2 leading-relaxed">
                  Neste simulador de placa-mãe de bancada, nosso osciloscópio aponta capacitores e controladores
                  MOSFET fora da capacitância operacional.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <span className="text-gray-400 font-bold uppercase tracking-wider block">REPAROS ATINGIDOS:</span>
                <div className="flex gap-1.5 items-center justify-between text-white p-3 bg-[#161616] rounded-lg border border-white/5">
                  <span>Circuitos Saudáveis:</span>
                  <span className="text-cyan-400 font-bold font-mono text-sm leading-none">
                    {circuitRepairedCount} / {boardNodes.length}
                  </span>
                </div>

                {circuitRepairedCount === boardNodes.length ? (
                  <div className="p-3 bg-green-950/40 text-green-400 font-sans rounded-lg border border-green-900/40 flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0" />
                    <span>
                      <strong>Excelente!</strong> Todas as trilhas elétricas estão restabelecidas e o loop de
                      BIOS foi resolvido.
                    </span>
                  </div>
                ) : (
                  <p className="text-[11px] font-sans text-gray-500 italic">
                    Identifique os pinos piscando em vermelho no circuito ao lado e clique neles para re-soldar
                    com precisão.
                  </p>
                )}
              </div>

              <button
                onClick={resetCircuitBoard}
                className="w-full border border-white/5 text-gray-400 hover:text-white hover:border-cyan-500 py-2.5 rounded-none font-mono tracking-wider transition cursor-pointer bg-[#161616]"
              >
                Resetar Todos os Circuitos
              </button>
            </div>
          </div>

          {/* Motherboard Graphic Interactive Canvas */}
          <div className="lg:col-span-12 xl:col-span-8">
            <div className="rounded-xl border border-white/5 bg-[#111111] p-6 shadow-xl space-y-4 font-mono text-xs text-center relative">
              <div className="flex justify-between items-center border-b border-white/5 pb-3 font-mono text-xs text-left mb-2 gap-2">
                <span className="text-cyan-400 font-bold uppercase tracking-widest">
                  MAPA DE SINALIZAÇÃO DO CIRCUITO IMPRESSO
                </span>
                <span className="text-gray-500 text-[10px] text-right">REWORK STATION</span>
              </div>

              {/* Schematic Representation container */}
              <div className="relative aspect-video max-w-2xl mx-auto rounded-lg bg-[#090909] border border-white/5 flex items-center justify-center bg-grid-cyber select-none overflow-hidden group">
                {/* Soldering effect text spark */}
                {isSoldering && (
                  <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/70 backdrop-blur-xs font-mono text-xs">
                    <motion.div
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ repeat: Infinity, duration: 0.8 }}
                      className="text-center text-yellow-500 border border-yellow-500/30 p-4 rounded-xl space-y-2 bg-[#110d05]"
                    >
                      <Zap className="h-8 w-8 text-yellow-400 mx-auto animate-bounce" />
                      <span className="font-bold tracking-widest uppercase block text-[11px]">
                        ⚡ EXECUTANDO REFLOW DE PINOS SMD...
                      </span>
                      <span className="text-[10px] text-gray-400 font-sans block">
                        Injetando fluxo e organizando junções de metal a 380°C.
                      </span>
                    </motion.div>
                  </div>
                )}

                {/* Motherboard Abstract Layout Represented by SVGs and Board Accents */}
                <div className="absolute inset-4 rounded border border-white/5 grid grid-cols-4 grid-rows-3 p-4 gap-2 opacity-10 pointer-events-none">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div
                      key={i}
                      className="border border-white/40 rounded-sm flex items-center justify-center text-[10px] font-mono font-bold"
                    />
                  ))}
                </div>

                {/* CPU Socket Center Drawing placeholder */}
                <div className="absolute top-[35%] left-[45%] h-24 w-24 border-2 border-dashed border-cyan-900/40 rounded-xl flex items-center justify-center bg-[#111]/20">
                  <Cpu className="h-10 w-10 text-cyan-950/60" />
                  <span className="absolute bottom-1 font-mono text-[8px] text-cyan-950/60 leading-none">
                    CYBER-NUCLEUS
                  </span>
                </div>

                {/* Connecting Paths SVG drawn across nodes */}
                <svg className="absolute inset-0 h-full w-full pointer-events-none z-10" xmlns="http://www.w3.org/2000/svg">
                  {/* VRM Path */}
                  <line x1="45%" y1="30%" x2="55%" y2="45%" stroke="#161616" strokeWidth="4" />
                  <line
                    x1="45%"
                    y1="30%"
                    x2="55%"
                    y2="45%"
                    stroke={boardNodes[0].isRepaired ? "#22d3ee" : "#ef4444"}
                    strokeWidth="1.5"
                    strokeDasharray="5,5"
                    className="animate-pulse"
                  />

                  {/* CMOS Path */}
                  <line x1="75%" y1="65%" x2="55%" y2="55%" stroke="#161616" strokeWidth="4" />
                  <line
                    x1="75%"
                    y1="65%"
                    x2="55%"
                    y2="55%"
                    stroke={boardNodes[1].isRepaired ? "#22d3ee" : "#ef4444"}
                    strokeWidth="1.5"
                  />

                  {/* Bios Path */}
                  <line x1="35%" y1="75%" x2="45%" y2="55%" stroke="#161616" strokeWidth="4" />
                  <line
                    x1="35%"
                    y1="75%"
                    x2="45%"
                    y2="55%"
                    stroke={boardNodes[2].isRepaired ? "#22d3ee" : "#ef4444"}
                    strokeWidth="1.5"
                  />

                  {/* PCIe Path */}
                  <line x1="20%" y1="42%" x2="45%" y2="45%" stroke="#161616" strokeWidth="4" />
                  <line
                    x1="20%"
                    y1="42%"
                    x2="45%"
                    y2="45%"
                    stroke={boardNodes[3].isRepaired ? "#22d3ee" : "#ef4444"}
                    strokeWidth="1.5"
                  />
                </svg>

                {/* Dynamic Interactive Pin Nodes */}
                {boardNodes.map((node) => (
                  <div
                    key={node.id}
                    style={{ left: node.posX, top: node.posY }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group/node"
                  >
                    <button
                      id={`solder-node-${node.id}`}
                      onClick={() => !node.isRepaired && handleSolderNode(node.id)}
                      disabled={isSoldering !== null || node.isRepaired}
                      className={`h-7 w-7 rounded-full flex items-center justify-center border transition relative cursor-pointer ${
                        node.isRepaired
                          ? "bg-cyan-950/80 border-cyan-400 text-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.4)]"
                          : "bg-red-950/80 border-red-500 text-red-400 shadow-[0_0_10px_rgba(239,68,68,0.4)] animate-pulse hover:scale-110"
                      }`}
                    >
                      <Zap className="h-3 w-3 fill-current" />
                      {!node.isRepaired && (
                        <span className="absolute inset-0 rounded-full border border-red-500 animate-ping opacity-60 pointer-events-none" />
                      )}
                    </button>

                    {/* Node Hover Tooltip info */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-8 opacity-0 group-hover/node:opacity-100 transition duration-150 rounded bg-[#161616] border border-white/5 px-2.5 py-1.5 whitespace-nowrap z-20 pointer-events-none max-w-xs">
                      <span className="text-[10px] font-bold text-white block uppercase tracking-wider">{node.name}</span>
                      <span
                        className={`text-[9px] block mt-0.5 ${
                          node.isRepaired ? "text-cyan-400" : "text-red-400 font-bold"
                        }`}
                      >
                        {node.isRepaired ? "✓ CONEXÃO ESTABILIZADA" : "✖ CURTO-CIRCUITO DETECTADO"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-[11px] font-sans text-gray-400 max-w-md mx-auto leading-relaxed mt-2 text-center">
                ⚠️ <strong>Dica Ninja:</strong> Se o barramento elétrico PCIe x16 estiver flutuando, a placa de
                vídeo acoplada pode perder linhas de transferência de dados, derrubando a velocidade de x16 para x1!
              </div>
            </div>
          </div>
        </div>
      )}

      {/* C. LAB - CONSOLE COOLING SIMULATOR */}
      {labSubTab === "cooling" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column Controls */}
          <div className="lg:col-span-12 xl:col-span-4 space-y-6">
            <div className="rounded-xl border border-white/5 bg-[#111111] p-6 space-y-6 shadow-xl relative overflow-hidden font-mono text-xs">
              <div>
                <h3 className="text-white font-bold uppercase tracking-widest text-sm border-b border-white/5 pb-2">
                  MÓDULO REFRIGERAÇÃO TURBO PS5/XBOX
                </h3>
                <p className="text-xs text-gray-400 font-sans mt-2 leading-relaxed">
                  Sistemas de games modernos como PlayStation 5 utilizam **Metal Líquido** no encapsulamento da
                  APU. Ajuste as alavancas abaixo para ver o colapso térmico das aletas do dissipador em tempo
                  real.
                </p>
              </div>

              {/* Dust bar */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">Obstrução de Poeira:</span>
                  <span className={`${dustPercentage > 50 ? "text-red-400 font-bold" : "text-cyan-400"}`}>
                    {dustPercentage}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={dustPercentage}
                  onChange={(e) => setDustPercentage(+e.target.value)}
                  className="w-full accent-cyan-400 bg-white/5 h-1.5 rounded-lg cursor-pointer"
                />
              </div>

              {/* liquid metal quality */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400 font-sans">Qualidade da Liga Térmica (Metal Líquido):</span>
                  <span className={`${liquidMetalQuality < 50 ? "text-red-400 font-bold" : "text-cyan-400"}`}>
                    {liquidMetalQuality}% de Contato
                  </span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={liquidMetalQuality}
                  onChange={(e) => setLiquidMetalQuality(+e.target.value)}
                  className="w-full accent-cyan-400 bg-white/5 h-1.5 rounded-lg cursor-pointer"
                />
              </div>

              {/* Action Triggers */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={cleanConsoleDust}
                  className="bg-[#161616] hover:bg-cyan-950/20 border border-white/5 text-cyan-400 font-bold py-3.5 px-2 rounded-none skew-x-[-12deg] flex items-center justify-center gap-1.5 transition uppercase tracking-widest text-[10px] cursor-pointer font-sans font-black"
                >
                  <span className="skew-x-[12deg] inline-block flex items-center gap-1 whitespace-nowrap">
                    <Trash2 className="h-3.5 w-3.5 shrink-0" />
                    Limpar Obstrução C02
                  </span>
                </button>
                <button
                  onClick={applyLiquidMetal}
                  className="bg-[#161616] hover:bg-purple-950/20 border border-white/5 text-pink-400 font-bold py-3.5 px-2 rounded-none skew-x-[-12deg] flex items-center justify-center gap-1.5 transition uppercase tracking-widest text-[10px] cursor-pointer font-sans font-black"
                >
                  <span className="skew-x-[12deg] inline-block flex items-center gap-1 whitespace-nowrap">
                    <Droplet className="h-3.5 w-3.5 shrink-0" />
                    Aplicar Metal Líquido
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column simulation results with cooling system animations */}
          <div className="lg:col-span-12 xl:col-span-8">
            <div className="rounded-xl border border-white/5 bg-[#111111] p-6 shadow-xl space-y-4 font-mono text-xs text-left relative overflow-hidden">
              <div className="flex justify-between items-center border-b border-white/5 pb-3">
                <span className="text-cyan-400 font-bold uppercase tracking-widest">
                  SISTEMA DIRECIONADOR DE CALOR ATIVO
                </span>
                <span className="text-gray-500">APU APX_SINE-3</span>
              </div>

              {/* Cool graphic layout representing APU block */}
              <div className="border border-white/5 bg-[#161616] p-4 rounded-lg relative overflow-hidden flex flex-col md:flex-row gap-6 items-center">
                {/* Interactive cooler spinning */}
                <div className="relative h-28 w-28 shrink-0 flex items-center justify-center rounded-full border border-white/5 bg-[#111] shadow-[0_0_20px_rgba(20,184,166,0.05)]">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      repeat: Infinity,
                      duration: fanRpm > 2500 ? 0.3 : fanRpm > 1800 ? 0.7 : 1.5,
                      ease: "linear",
                    }}
                    className="absolute inset-2 border-4 border-dashed border-gray-600 rounded-full"
                  />
                  <div className="absolute inset-5 bg-gradient-to-br from-cyan-400/10 to-transparent rounded-full border border-cyan-500/10" />
                  <div className="text-center z-10 font-mono">
                    <span className="text-[10px] text-gray-500 block leading-tight">COOLER BOOST</span>
                    <span className="text-white text-xs font-bold block">{fanRpm} RPM</span>
                  </div>
                </div>

                {/* Interactive Dynamic Heat Level Stats */}
                <div className="grow space-y-3.5 font-mono text-xs w-full">
                  <div className="flex justify-between items-center border-b border-white/5 pb-1.5 gap-2">
                    <span className="text-gray-500 uppercase">Temperatura Consola:</span>
                    <span
                      className={`text-md font-bold leading-none text-right ${
                        consoleTemp > 75 ? "text-red-400 animate-pulse font-black animate-pulse" : "text-emerald-400"
                      }`}
                    >
                      {consoleTemp}°C {consoleTemp > 75 && "⚠️ OVERHEAT"}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-gray-500 uppercase text-[10px]">Taxa de fluxo de ar através das aletas:</span>
                    <div className="w-full bg-[#111] h-1.5 rounded-full overflow-hidden border border-white/5">
                      <div
                        className="bg-cyan-400 h-1.5 rounded-full transition-all duration-300"
                        style={{ width: `${Math.max(5, 100 - dustPercentage)}%` }}
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-gray-500 uppercase text-[10px]">
                      Condutividade do contato elétrico da pasta:
                    </span>
                    <div className="w-full bg-[#111] h-1.5 rounded-full overflow-hidden border border-white/5">
                      <div
                        className="bg-[#a855f7] h-1.5 rounded-full transition-all duration-300"
                        style={{ width: `${liquidMetalQuality}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Display warning or action triggers */}
              <div className="p-4 bg-[#090909] border border-white/5 rounded-lg flex gap-3 items-center">
                <Activity
                  className={`h-5 w-5 shrink-0 ${
                    consoleTemp > 75 ? "text-red-400 animate-spin" : "text-cyan-400 animate-pulse"
                  }`}
                />
                <div>
                  <span className="text-[11px] font-bold text-white block uppercase tracking-wider">
                    LÉXICO DE TELEMETRIA TÉRMICA:
                  </span>
                  <p className="text-gray-400 font-sans text-[11px] leading-relaxed mt-0.5">
                    {coolingActionLog}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
