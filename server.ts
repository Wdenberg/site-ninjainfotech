
/*
import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

// Load environment variables
dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware
  app.use(express.json());

  // Initialize Gemini Client
  let ai: GoogleGenAI | null = null;
  const apiKey = process.env.GEMINI_API_KEY;

  if (apiKey) {
    try {
      ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });
      console.log("Gemini AI Client initialized successfully.");
    } catch (err) {
      console.error("Failed to initialize Gemini AI Client:", err);
    }
  } else {
    console.warn("WARN: GEMINI_API_KEY environment variable is missing. Running in simulator-only AI fallback mode.");
  }

  // API endpoint for Smart Hardware Diagnostics
  app.post("/api/diagnose", async (req, res) => {
    const { deviceType, component, symptom, userMessage, history } = req.body;

    if (!deviceType || !component || !symptom) {
      return res.status(400).json({ error: "Parâmetros deviceType, component e symptom são obrigatórios." });
    }

    const systemInstruction = `Você é o Cyber-Ninja Diagnostico AI (Mestre de Reparo de Hardware 404). 
Especialista em:
1. Placas de Vídeo (GPUs - Reballing, curto em curto-circuito, VRM danificado, troca de thermalpads, oxidação, reballing de VRAM).
2. Notebooks (Conserto de dobradiça, rebalanceamento elétrico, curtos na linha de 19V, gravação de BIOS, Super I/O).
3. Placas-Mãe (Desktop - soquete torto, mosfets queimados, reflow de chipset, solda SMD).
4. Videogames (PS5, Xbox, Switch - problemas de HDMI, CI de vídeo, barulho de cooler Cooler Boost, troca de metal líquido, thermal throttling).

ATITUDE:
- Linguagem descolada de cyberpunk / hacker de hardware, misterioso, ágil, e muito técnico. Use metáforas como "seu canal de dados", "resistores fritos", "refluxo ninja".
- Dê passos reais de diagnóstico que uma assistência avançada faria (usar multímetro na escala de diodo, estação de retrabalho a 380°C, osciloscópio, fluxo amtech, etc.).
- Sempre termine com um nível de perigo de 1 a 10 (nível ninja de risco de estática/curto total) e uma estimativa de preço aproximada em créditos/reais cibernéticos.
- Responda em Português do Brasil com excelente estrutura em Markdown.
- Evite respostas longas demais. Seja focado no diagnóstico e na solução.`;

    const promptMessage = `O usuário está relatando um problema em seu hardware:
- Dispositivo: ${deviceType}
- Componente: ${component}
- Sintoma/Defeito: ${symptom}
- Mensagem adicional/sintoma detalhado: ${userMessage || "Nenhuma mensagem adicional."}

Por favor, forneça um diagnóstico cyber-ninja preciso, passos detalhados de análise técnica e uma estimativa de solução física para este problema.`;

    // Static Fallback Responses in case API key is missing
    if (!ai) {
      console.log("Mocking AI response (No API Key configured)");
      return res.json({
        text: `### 🛠️ MODELO DE SIMULAÇÃO OFFLINE DE ATENDIMENTO NINJA 🛠️

Detectamos que o seu **${deviceType}** (foco no componente **${component}**) está manifestando o sintoma: **"${symptom}"**.

#### 🔍 Diagnóstico do Sensor Cyber-Ninja:
Isso geralmente indica um estágio inicial de colapso de sinal. Em placas base e sistemas mobile como esse, a flutuação pode estar ligada a:
1. **Falta de alimentação limpa**: Ruídos nos reguladores pulsados de tensão (VRMs) ou falha na trilha de 3.3V/5V/19V.
2. **Estresse térmico severo**: Fadiga das esferas de solda SAC305 (BGA) sob o chip principal devido a constantes dilatações térmicas ou desgaste irreversível da interface térmica de fábrica.

#### 🔧 Protocolo de Reparação Ninja Sugerido:
1. **Inspeção Térmica**: Utilize uma câmera térmica infravermelha de alta sensibilidade para testar hotspots na inicialização precoce.
2. **Varredura com Multímetro**: Meça a resistência das bobinas principais em relação ao terra (ground-check). Curto abaixo de 2 ohms em linhas de alta potência pode indicar mosfets superiores em curto total.
3. **Fase de Cura (Reflow/Rebalanceamento)**: Aplicação de fluxo de solda no-clean de alta viscosidade, aquecimento controlado na rampa infravermelha a 220°C para reorganização interna de esferas ou, em casos críticos, a execução completa de **Reballing**.

---
⚡ **Nível de Perigo Coaxial**: **7/10** (Risco moderado/alto se feito sem estação de retrabalho antiestática ESD profissional!).
💵 **Estimativa de Solução de Bancada**: R$ 180 a R$ 520 (dependendo do material de re-peças consumido).`
      });
    }

    try {
      // Create chat context using history if available, or just call simple generateContent
      // Let's call generateContent with system instruction
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: promptMessage,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.8,
        },
      });

      return res.json({ text: response.text });
    } catch (err: any) {
      console.error("Gemini API execution failed:", err);
      return res.status(500).json({
        error: "Falha na comunicação com o cérebro artificial Ninja.",
        details: err.message,
      });
    }
  });

  // Client-side API for custom interactive Ninja chat sessions
  app.post("/api/chat", async (req, res) => {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "O parâmetro 'messages' deve ser um array." });
    }

    if (!ai) {
      return res.json({
        text: "Desculpe, parceiro! Meu canal neural (Gemini API) não está conectado por cabo óptico (.env sem GEMINI_API_KEY). Mas eu, o Ninja do Hardware, garanto: se tem silício e solda, eu posso consertar com minhas próprias mãos virtuais! Me diga, quer simular um teste de estresse de GPU ou um refiltro térmico no painel ao lado?"
      });
    }

    try {
      const systemInstruction = `Você é o Cyber-Ninja, atendente supremo da Ninja Infotech.
Seu trabalho é dar suporte a clientes com problemas em placas de vídeo (GPUs), notebooks, placas mãe e consoles de videogame.
Seja imersivo em uma atmosfera cyberpunk de neon. Sua linguagem é energética, recheada de termos reais de eletrônica militar e informática avançada, mas de fácil compreensão.
Responda sempre em Português do Brasil de forma concisa. Se o usuário estiver nervoso, o acalme dizendo que "nenhuma GPU está perdida nas mãos de um ninja dos circuitos".`;

      // Convert message formats
      // Our message format is [{ role: 'user' | 'assistant', content: string }]
      // Gemini expects role to be 'user' or 'model'
      const contents = messages.map((m) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      }));

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: contents,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.8,
        },
      });

      return res.json({ text: response.text });
    } catch (err: any) {
      console.error("Gemini Chat Error:", err);
      return res.status(500).json({ error: "Erro neural ao processar resposta.", details: err.message });
    }
  });

  // Live Server Setup for Vite development server or production static files
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite development middleware integrated.");
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Serving production static files from 'dist' directory.");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Ninja Server CORE] Iniciado com sucesso.`);
    console.log(`Acesse a rede segura em: http://localhost:${PORT}`);
    console.log(`Porta e interfaces de roteamento ativas.`);
  });
}

startServer().catch((error) => {
  console.error("ERRO CRÍTICO ao iniciar o servidor ninja:", error);
});
*/