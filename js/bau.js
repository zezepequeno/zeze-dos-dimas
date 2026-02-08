function abrirBau() {
  const premios = [
    "🎁 Cupom 15%",
    "💎 100 Diamantes",
    "🎫 Passe Elite",
    "🔥 Skin Aleatória",
    "❌ Baú vazio"
  ];

  const sorteio = Math.floor(Math.random() * premios.length);
  const resultado = premios[sorteio];

  const resultadoEl = document.getElementById("resultadoBau");
  resultadoEl.innerText = "🎉 Você ganhou: " + resultado;
}
