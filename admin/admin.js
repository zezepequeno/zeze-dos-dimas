const ADMIN_EMAIL = "virtualinvest@gmail.com";

auth.onAuthStateChanged(async user => {
  if (!user || user.email !== ADMIN_EMAIL) {
    alert("Acesso negado.");
    window.location.href = "../index.html";
    return;
  }

  document.getElementById("adminEmail").textContent =
    "Admin logado: " + user.email;

  carregarUsuarios();
});

async function carregarUsuarios() {
  const list = document.getElementById("usersList");
  list.innerHTML = "";

  const snap = await db.collection("usuarios").get();

  snap.forEach(doc => {
    const u = doc.data();

    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <h3>${u.nome || "Sem nome"}</h3>
      <p>${u.email}</p>
      <p>VIP: ${u.vip ? "SIM" : "NÃO"}</p>
      <p>Banido: ${u.banido ? "SIM" : "NÃO"}</p>

      <button onclick="vip('${doc.id}', ${!u.vip})">
        ${u.vip ? "REMOVER VIP" : "DAR VIP"}
      </button>

      <button onclick="banir('${doc.id}', ${!u.banido})">
        ${u.banido ? "DESBANIR" : "BANIR"}
      </button>
    `;

    list.appendChild(div);
  });
}

function vip(uid, status) {
  db.collection("usuarios").doc(uid).update({ vip: status });
  carregarUsuarios();
}

function banir(uid, status) {
  db.collection("usuarios").doc(uid).update({ banido: status });
  carregarUsuarios();
}
