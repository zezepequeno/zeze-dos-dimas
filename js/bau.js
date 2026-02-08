// ===============================
// Sistema de Abertura de Baú 🎁
// ZEZE DOS DIMAS
// ===============================

let abrindo = false;

function abrirBau() {
  if (abrindo) return;
  abrindo = true;

  const premios = [
    { texto: "🎁 Cupom de 15%", tipo: "comum" },
    { texto: "💎 100 Diamantes", tipo: "raro" },
    { texto: "🎫 Passe Elite", tipo: "epico" },
    { texto: "🔥 Skin Aleatória", tipo: "epico" },
    { texto: "❌ Baú vazio", tipo: "fail" }
  ];

  const resultadoEl = document.getElementById("resultadoBau");
  const botao = document.getElementById("btnBau");

  if (!resultadoEl) {
    abrindo = false;
    return;
  }

  // 🎁 Feedback visual
  if (botao) {
    botao.disabled = true;
    botao.innerText = "ABRINDO... 🎁";
    botao.style.opacity = "0.6";
  }

  resultadoEl.classList.remove("show", "comum", "raro", "epico", "fail");
  resultadoEl.innerHTML = "🔓 Abrindo o baú...";

  setTimeout(() => {
    const indiceSorteado = Math.floor(Math.random() * premios.length);
    const premio = premios[indiceSorteado];

    resultadoEl.innerHTML = `
      <div class="resultado-box ${premio.tipo}">
        <strong>🎉 Resultado do Baú</strong><br><br>
        ${premio.texto}
      </div>
    `;

    resultadoEl.classList.add("show", premio.tipo);

    if (botao) {
      botao.disabled = false;
      botao.innerText = "ABRIR NOVAMENTE 🎁";
      botao.style.opacity = "1";
    }

    abrindo = false;
  }, 1800);
}
