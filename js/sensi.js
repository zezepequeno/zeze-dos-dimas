function gerarSensibilidade() {
  const marca = document.getElementById("marca").value;
  const desempenho = document.getElementById("desempenho").value;

  let geral, red, x2, x4, awm, olhadinha;

  if (desempenho === "fraco") {
    geral = 90;
    red = 85;
    x2 = 75;
    x4 = 65;
    awm = 50;
    olhadinha = 60;
  } else if (desempenho === "medio") {
    geral = 95;
    red = 90;
    x2 = 80;
    x4 = 70;
    awm = 55;
    olhadinha = 65;
  } else {
    geral = 100;
    red = 95;
    x2 = 85;
    x4 = 75;
    awm = 60;
    olhadinha = 70;
  }

  const texto = `
  Geral: ${geral}<br>
  Ponto Vermelho: ${red}<br>
  Mira 2x: ${x2}<br>
  Mira 4x: ${x4}<br>
  AWM: ${awm}<br>
  Olhadinha: ${olhadinha}
  `;

  document.getElementById("sensibilidade").innerHTML = texto;
  document.getElementById("resultado").style.display = "block";
}
