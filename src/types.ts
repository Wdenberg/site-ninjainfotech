export interface HardwareDevice {
  id: string;
  name: string;
  category: "gpu" | "laptop" | "motherboard" | "console";
  brand: string;
  model: string;
  status: "broken" | "diagnosing" | "repairing" | "optimized";
  symptom: string;
}

export interface HardwareIssueTemplate {
  category: "gpu" | "laptop" | "motherboard" | "console";
  name: string;
  symptoms: string[];
  components: string[];
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export interface DiagnosticResult {
  deviceType: string;
  component: string;
  symptom: string;
  dangerLevel: number;
  repairTime: string;
  estimatedCost: string;
  technicalSteps: string[];
  narrative: string;
}

export const HARDWARE_TEMPLATES: HardwareIssueTemplate[] = [
  {
    category: "gpu",
    name: "Placa de Vídeo (GPU)",
    symptoms: [
      "Artefatos na tela (linhas, blocos coloridos)",
      "Tela preta ao instalar drivers",
      "Liga mas não dá vídeo (sem sinal)",
      "Superaquecimento e Thermal Throttling",
      "Perda de desempenho abrupta (queda de FPS)",
      "Ruído excessivo nos fans (cooler desalinhado)",
      "Não liga (curto na linha de 12V / PCIe)"
    ],
    components: ["GPU Core / Silício BGA", "Memórias VRAM (GDDR6)", "Fases de Alimentação (MOSFETs / VRM)", "Bios Chip (EPROM)", "Capacitores de tântalo", "Conector de Força 12Vhpwr/PCIe", "Thermal pads / Pasta térmica"]
  },
  {
    category: "laptop",
    name: "Notebook / Macbook",
    symptoms: [
      "Não liga (sem sinal de LED)",
      "Desliga sozinho após minutos de uso",
      "Teclado ou Touchpad inoperante",
      "Carrega bateria apenas em certo ângulo (Jack DC com mau contato)",
      "Tela quebrada, piscando ou com cores invertidas",
      "Curto-circuito após derramamento de líquido",
      "Dobradiça da carcaça quebrada ou emperrada",
      "Lento demais e travando na inicialização"
    ],
    components: ["Linha de Alta Voltagem (19V)", "Super I/O (Controlador de periféricos)", "Circuito Integrado de Charge / Bateria", "Dobradiças de aço / Carcaça plástica", "Conector Jack de Alimentação", "Tela LCD / Cabo Flat LVDS", "Cooler de CPU / Dissipador de calor COPPER"]
  },
  {
    category: "motherboard",
    name: "Placa-Mãe (Desktop)",
    symptoms: [
      "Liga e desliga em loop infinito",
      "Não reconhece memórias RAM (Bip ou LED vermelho)",
      "Pinos do soquete tortos (Intel/AMD)",
      "Portas USB ou Rede Ethernet queimadas",
      "Bios corrompida (não carrega setup)",
      "Oxidação aparente nos circuitos",
      "Não reconhece SSD NVMe / Armazenamento"
    ],
    components: ["Soquete da CPU (LGA / AM4 / AM5)", "Chipset Principal (PCH)", "Controlador PWM / Linha reguladora de RAM", "Chip de Rede / CI de Áudio Realtek", "Slots PCIe principais", "Canais de Memória RAM (Trilhas)", "Termistor de proteção contra surtos"]
  },
  {
    category: "console",
    name: "Vídeo Game (PS5 / Xbox / Switch)",
    symptoms: [
      "Sem imagem (Luz azul da morte / HDMI queimado)",
      "Desliga por superaquecimento (Mensagem de aviso na tela)",
      "Não lê mídias físicas / Barulho no leitor",
      "Erro de armazenamento (Memória SSD flash soldada corrompida)",
      "Bateria do Switch descarrega em minutos",
      "Controle drift no analógico / Botões inoperantes",
      "Conector USB-C ou HDMI fisicamente quebrado"
    ],
    components: ["CI de Controle HDMI (Panasonic/Encoder)", "Metal Líquido / Dissipador principal", "Módulo de memória SSD integrada", "Leitor Óptico / Engrenagens de inserção", "Bobinas e capacitores de entrada HDMI", "Módulo Wifi/Bluetooth interno", "Power Supply (Fonte de alimentação integrada)"]
  }
];

export const ESTIMATED_PRICES_NINJA = {
  gpu: { min: 250, max: 950, label: "Troca de esferas (reballing), reparo de fases VRM ou troca total de memórias VRAM." },
  laptop: { min: 180, max: 750, label: "Troca de Super I/O, reconstrução de dobradiças, desoxidação e reparo elétrico em placa lógica." },
  motherboard: { min: 150, max: 600, label: "Alinhamento de pinos do soquete, regravação física de BIOS e substituição de MOSFETs." },
  console: { min: 190, max: 800, label: "Substituição do encoder HDMI, recalibração de refrigeração para Metal Líquido ou restauração de trilhas." }
};
