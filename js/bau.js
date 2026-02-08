// bau.js
// ===============================
// Sistema de Abertura de Baú
// ===============================

function abrirBau() {
  const premios = [
    "🎁 Cupom de 15%",
    "💎 100 Diamantes",
    "🎫 Passe Elite",
    "🔥 Skin Aleatória",
    "❌ Baú vazio"
  ];

  const indiceSorteado = Math.floor(Math.random() * premios.length);
  const premio = premios[indiceSorteado];

  const resultadoEl = document.getElementById("resultadoBau");
  if (!resultadoEl) return;

  resultadoEl.innerHTML = `
    <strong>🎉 Resultado do Baú</strong><br>
    ${premio}
  `;
}
