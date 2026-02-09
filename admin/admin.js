// ===============================
// Painel Admin - ZEZE DOS DIMAS
// ===============================

const ADMIN_EMAIL = "virtualinvest@gmail.com";

// 🔐 BLOQUEIA ACESSO DIRETO
auth.onAuthStateChanged(async user => {
  if (!user || user.email !== ADMIN_EMAIL) {
    alert("Acesso negado.");
    window.location.href = "../index.html";
    return;
  }

  // Mostra email do admin
  const adminEmail = document.getElementById("adminEmail");
  adminEmail && (adminEmail.textContent = user.email);

  carregarUsuarios();
});

// 📋 LISTA DE USUÁRIOS
async function carregarUsuarios() {
  const usersList = document.getElementById("usersList");
  if (!usersList) return;

  usersList.innerHTML = "";

  const snapshot = await db.collection("usuarios").get();

  snapshot.forEach(doc => {
    const u = doc.data();

    const card = document.createElement("div");
    card.className = "card animate";

    card.innerHTML = `
      <h3>${u.nome || "Usuário"}</h3>
      <p>Email: ${u.email}</p>
      <p>Status: ${u.vip ? "VIP 🔥" : "FREE"}</p>
      <p>Banido: ${u.banido ? "SIM" : "NÃO"}</p>

      <button onclick="toggleVIP('${doc.id}', ${u.vip})">
        ${u.vip ? "REMOVER VIP" : "DAR VIP"}
      </button>

      <button onclick="toggleBan('${doc.id}', ${u.banido})"
        style="background:#ff3b3b;color:#fff;">
        ${u.banido ? "DESBANIR" : "BANIR"}
      </button>
    `;

    usersList.appendChild(card);
  });
}

// ⭐ VIP
async function toggleVIP(uid, statusAtual) {
  await db.collection("usuarios").doc(uid).update({
    vip: !statusAtual
  });
  carregarUsuarios();
}

// 🚫 BAN
async function toggleBan(uid, statusAtual) {
  await db.collection("usuarios").doc(uid).update({
    banido: !statusAtual
  });
  carregarUsuarios();
}
