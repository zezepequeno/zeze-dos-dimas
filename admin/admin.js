const ADMIN_EMAIL = "virtualinvest@gmail.com";

// ===============================
// PROTEÇÃO DO PAINEL ADMIN
// ===============================
auth.onAuthStateChanged(async user => {

  if (!user) {
    window.location.href = "/zeze-dos-dimas/index.html";
    return;
  }

  if (user.email !== ADMIN_EMAIL) {
    alert("Acesso negado");
    window.location.href = "/zeze-dos-dimas/index.html";
    return;
  }

  // Mostra email do admin
  document.getElementById("adminEmail").textContent =
    "Logado como: " + user.email;

  carregarUsuarios();
});

// ===============================
// CARREGAR USUÁRIOS
// ===============================
function carregarUsuarios() {
  const usersList = document.getElementById("usersList");
  usersList.innerHTML = "";

  db.collection("usuarios").orderBy("criadoEm", "desc").get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        const u = doc.data();

        const div = document.createElement("div");
        div.className = "user-card";

        div.innerHTML = `
          <strong>${u.nome || "Sem nome"}</strong><br>
          <small>${u.email}</small><br>
          <span>Status: ${u.banido ? "🚫 Banido" : "✅ Ativo"}</span><br>
          <span>VIP: ${u.vip ? "⭐ Sim" : "Não"}</span><br><br>

          <button onclick="banirUsuario('${doc.id}', ${u.banido})">
            ${u.banido ? "Desbanir" : "Banir"}
          </button>

          <button onclick="vipUsuario('${doc.id}', ${u.vip})">
            ${u.vip ? "Remover VIP" : "Tornar VIP"}
          </button>
        `;

        usersList.appendChild(div);
      });
    });
}

// ===============================
// BAN / DESBAN
// ===============================
function banirUsuario(uid, statusAtual) {
  db.collection("usuarios").doc(uid).update({
    banido: !statusAtual
  }).then(carregarUsuarios);
}

// ===============================
// VIP / REMOVER VIP
// ===============================
function vipUsuario(uid, statusAtual) {
  db.collection("usuarios").doc(uid).update({
    vip: !statusAtual
  }).then(carregarUsuarios);
}
