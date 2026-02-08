function girarRoleta() {
  const premios = [
    "Cupom 10% OFF",
    "Cupom 20% OFF",
    "Passe de Elite Free Fire",
    "Giro Grátis",
    "Nada 😅"
  ];

  const sorteio = Math.floor(Math.random() * premios.length);
  const premio = premios[sorteio];

  document.getElementById("resultadoRoleta").innerHTML =
    "🎉 Você ganhou: <strong>" + premio + "</strong>";
}

function abrirBau() {
  const premiosBau = [
    "Cupom 5% OFF",
    "Cupom 15% OFF",
    "Produto Free Fire",
    "Baú Vazio 😭"
  ];

  const sorteio = Math.floor(Math.random() * premiosBau.length);
  const premio = premiosBau[sorteio];

  document.getElementById("resultadoBau").innerHTML =
    "🎁 Prêmio do baú: <strong>" + premio + "</strong>";
}
