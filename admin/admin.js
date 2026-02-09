// ===============================
// Painel Admin - ZEZE DOS DIMAS
// ===============================

// EMAIL DO ADMIN (SÓ VOCÊ)
const ADMIN_EMAIL = "virtualinvest@gmail.com";

// 🔐 PROTEÇÃO TOTAL DO PAINEL
auth.onAuthStateChanged(async user => {

  // ❌ NÃO LOGADO OU NÃO É ADMIN
  if (!user || user.email !== ADMIN_EMAIL) {
    alert("Acesso negado.");
    window.location.href = "../index.html";
    return;
  }

  // ✅ MOSTRA EMAIL DO ADMIN NO PAINEL
  const adminEmailEl = document.getElementById("adminEmail");
  if (adminEmailEl) {
    adminEmailEl.textContent = user.email;
  }

  // 📋 CARREGA LISTA DE USUÁRIOS
  carregarUsuarios();
});

// ===============================
// 📋 LISTAR USUÁRIOS
// ===============================
async function carregarUsuarios() {
  const usersList = document.getElementById("usersList");
  if (!usersList) return;

  usersList.innerHTML = "";

  try {
    const snapshot = await db.collection("usuarios").get();

    snapshot.forEach(doc => {
      const u = doc.data();

      const card = document.createElement("div");
      card.className = "card animate";

      card.innerHTML = `
        <h3>${u.nome || "Usuário"}</h3>
        <p>Email: ${u.email || "Não informado"}</p>
        <p>Status: ${u.vip === true ? "VIP 🔥" : "FREE"}</p>
        <p>Banido: ${u.banido === true ? "SIM" : "NÃO"}</p>

        <button onclick="toggleVIP('${doc.id}', ${u.vip === true})">
          ${u.vip === true ? "REMOVER VIP" : "DAR VIP"}
        </button>

        <button
          onclick="toggleBan('${doc.id}', ${u.banido === true})"
          style="background:#ff3b3b;color:#fff;"
        >
          ${u.banido === true ? "DESBANIR" : "BANIR"}
        </button>
      `;

      usersList.appendChild(card);
    });

  } catch (erro) {
    console.error("Erro ao carregar usuários:", erro);
    usersList.innerHTML = "<p>Erro ao carregar usuários.</p>";
  }
}

// ===============================
// ⭐ ATIVAR / REMOVER VIP
// ===============================
async function toggleVIP(uid, statusAtual) {
  try {
    await db.collection("usuarios").doc(uid).update({
      vip: !statusAtual
    });
    carregarUsuarios();
  } catch (erro) {
    console.error("Erro ao alterar VIP:", erro);
  }
}

// ===============================
// 🚫 BANIR / DESBANIR
// ===============================
async function toggleBan(uid, statusAtual) {
  try {
    await db.collection("usuarios").doc(uid).update({
      banido: !statusAtual
    });
    carregarUsuarios();
  } catch (erro) {
    console.error("Erro ao alterar ban:", erro);
  }
}
