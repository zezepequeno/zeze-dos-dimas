// roleta.js
// ===============================
// Sistema de Roleta Free Fire
// ===============================

function girarRoleta() {
  const premios = [
    "🎟 Cupom de 5%",
    "🎟 Cupom de 10%",
    "💎 Diamantes",
    "🔥 Item Raro",
    "❌ Não foi dessa vez"
  ];

  const indiceSorteado = Math.floor(Math.random() * premios.length);
  const premio = premios[indiceSorteado];

  const resultadoEl = document.getElementById("resultadoRoleta");
  if (!resultadoEl) return;

  resultadoEl.innerHTML = `
    <strong>🎉 Resultado da Roleta</strong><br>
    ${premio}
  `;
}
