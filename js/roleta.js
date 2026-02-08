// ===============================
// Sistema de Roleta 🎰
// ZEZE DOS DIMAS
// ===============================

let girando = false;

function girarRoleta() {
  if (girando) return;
  girando = true;

  const premios = [
    { texto: "🎟 Cupom 5%", tipo: "comum" },
    { texto: "🎟 Cupom 10%", tipo: "comum" },
    { texto: "💎 Diamantes", tipo: "raro" },
    { texto: "🔥 Item Raro", tipo: "epico" },
    { texto: "❌ Não foi dessa vez", tipo: "fail" }
  ];

  const resultadoEl = document.getElementById("resultadoRoleta");
  const botao = document.getElementById("btnRoleta");

  if (!resultadoEl) {
    girando = false;
    return;
  }

  if (botao) {
    botao.disabled = true;
    botao.innerText = "GIRANDO... 🎡";
    botao.style.opacity = "0.6";
  }

  resultadoEl.innerHTML = "🎡 Girando...";
  resultadoEl.className = "resultado loading";

  setTimeout(() => {
    const indice = Math.floor(Math.random() * premios.length);
    const premio = premios[indice];

    resultadoEl.innerHTML = `
      <div class="resultado-box ${premio.tipo}">
        <strong>🎉 Resultado</strong>
        <p>${premio.texto}</p>
      </div>
    `;

    resultadoEl.className = "resultado show";

    if (botao) {
      botao.disabled = false;
      botao.innerText = "GIRAR NOVAMENTE 🎰";
      botao.style.opacity = "1";
    }

    girando = false;
  }, 1600);
}
