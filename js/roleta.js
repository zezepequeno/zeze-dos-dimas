function girarRoleta() {
  const premios = [
    "🎟 Cupom 5%",
    "🎟 Cupom 10%",
    "💎 Diamantes",
    "🔥 Item Raro",
    "❌ Não foi dessa vez"
  ];

  const sorteio = Math.floor(Math.random() * premios.length);
  const resultado = premios[sorteio];

  const resultadoEl = document.getElementById("resultadoRoleta");
  resultadoEl.innerText = "🎉 Resultado: " + resultado;
}
