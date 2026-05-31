export default function Footer() {
  return (
    <footer id="footer" className="border-t border-cyan-950/40 bg-[#05080f]/90 py-8 font-mono text-xs text-center text-gray-500 mt-12">
      <div className="max-w-7xl mx-auto px-4 space-y-3">
        <p>© {new Date().getFullYear()} NINJA INFOTECH — MATRIX LABORATORY. TODOS OS DIREITOS COMPILADOS.</p>
        <div className="flex justify-center flex-wrap gap-4 text-[10px] text-gray-600">
          <span>TERMO_DE_GARANTIA: 180 DIAS EM MICRO-REBALLING</span>
          <span>📍 MATRIZ NEON DISTRICT</span>
          <span>🔧 EQUIPAMENTO ANTIESTÁTICO ESD HOMOLOGADO</span>
        </div>
      </div>
    </footer>
  );
}
