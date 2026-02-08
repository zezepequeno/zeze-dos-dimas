// ===== ANIMAÇÕES AO ROLAR A PÁGINA =====
const animatedElements = document.querySelectorAll(".animate");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
    }
  });
}, { threshold: 0.2 });

animatedElements.forEach(el => observer.observe(el));

// ===== ROLETAS =====
function girarRoleta() {
  const premios = [
    "Cupom 10% OFF",
    "Cupom 20% OFF",
    "Passe de Elite Free Fire",
    "Giro Grátis",
    "Nada 😅"
  ];

  const resultado = document.getElementById("resultadoRoleta");
  resultado.innerHTML = "🎰 Girando...";
  resultado.classList.add("loading");

  setTimeout(() => {
    const sorteio = Math.floor(Math.random() * premios.length);
    resultado.classList.remove("loading");
    resultado.innerHTML =
      "🎉 Você ganhou: <strong>" + premios[sorteio] + "</strong>";
  }, 1500);
}

// ===== BAÚ =====
function abrirBau() {
  const premiosBau = [
    "Cupom 5% OFF",
    "Cupom 15% OFF",
    "Produto Free Fire",
    "Baú Vazio 😭"
  ];

  const resultado = document.getElementById("resultadoBau");
  resultado.innerHTML = "🔓 Abrindo baú...";
  resultado.classList.add("loading");

  setTimeout(() => {
    const sorteio = Math.floor(Math.random() * premiosBau.length);
    resultado.classList.remove("loading");
    resultado.innerHTML =
      "🎁 Prêmio do baú: <strong>" + premiosBau[sorteio] + "</strong>";
  }, 1500);
}
