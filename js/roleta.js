// ===============================
// Roleta Free Fire 🎰
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

  if (!resultadoEl || !botao) {
    console.warn("Elementos da roleta não encontrados");
    girando = false;
    return;
  }

  // 🔒 Bloqueia botão enquanto gira
  botao.disabled = true;
  botao.innerText = "GIRANDO... 🎰";
  botao.style.opacity = "0.6";

  resultadoEl.classList.remove("show");
  resultadoEl.innerHTML = "🎰 Girando a roleta...";

  // ⏳ Simula giro real
  setTimeout(() => {
    const sorteio = Math.floor(Math.random() * premios.length);
    const premio = premios[sorteio];

    resultadoEl.innerHTML = `
      <div class="resultado ${premio.tipo}">
        🎉 <strong>${premio.texto}</strong>
      </div>
    `;

    resultadoEl.classList.add("show");

    // 🔓 Libera botão
    botao.disabled = false;
    botao.innerText = "GIRAR NOVAMENTE 🎰";
    botao.style.opacity = "1";
    girando = false;

  }, 2000); // tempo do giro
}
