// ===============================
// Gerador de Sensibilidade Free Fire
// ===============================

function gerarSensibilidade() {
  const marcaEl = document.getElementById("marca");
  const desempenhoEl = document.getElementById("desempenho");

  if (!marcaEl || !desempenhoEl) return;

  const desempenho = desempenhoEl.value;

  let sensibilidade = {
    geral: 0,
    red: 0,
    x2: 0,
    x4: 0,
    awm: 0,
    olhadinha: 0
  };

  if (desempenho === "fraco") {
    sensibilidade = {
      geral: 90,
      red: 85,
      x2: 75,
      x4: 65,
      awm: 50,
      olhadinha: 60
    };
  } 
  else if (desempenho === "medio") {
    sensibilidade = {
      geral: 95,
      red: 90,
      x2: 80,
      x4: 70,
      awm: 55,
      olhadinha: 65
    };
  } 
  else {
    sensibilidade = {
      geral: 100,
      red: 95,
      x2: 85,
      x4: 75,
      awm: 60,
      olhadinha: 70
    };
  }

  const resultadoHTML = `
    <p>🎯 Geral: <strong>${sensibilidade.geral}</strong></p>
    <p>🔴 Ponto Vermelho: <strong>${sensibilidade.red}</strong></p>
    <p>🔍 Mira 2x: <strong>${sensibilidade.x2}</strong></p>
    <p>🔎 Mira 4x: <strong>${sensibilidade.x4}</strong></p>
    <p>🎯 AWM: <strong>${sensibilidade.awm}</strong></p>
    <p>👁️ Olhadinha: <strong>${sensibilidade.olhadinha}</strong></p>
  `;

  const sensiEl = document.getElementById("sensibilidade");
  const resultadoBox = document.getElementById("resultado");

  if (!sensiEl || !resultadoBox) return;

  sensiEl.innerHTML = resultadoHTML;
  resultadoBox.style.display = "block";
}
