const ADMIN_EMAIL = "virtualinvest@gmail.com";

auth.onAuthStateChanged(async user => {
  if (!user || user.email !== ADMIN_EMAIL) {
    window.location.href = "/zeze-dos-dimas/index.html";
    return;
  }

  document.getElementById("adminEmail").textContent =
    `Logado como admin: ${user.email}`;

  carregarUsuarios();
});

async function carregarUsuarios() {
  const usersList = document.getElementById("usersList");
  usersList.innerHTML = "Carregando usuários...";

  const snapshot = await db.collection("usuarios").get();
  usersList.innerHTML = "";

  snapshot.forEach(doc => {
    const u = doc.data();

    const div = document.createElement("div");
    div.className = "user-card";

    div.innerHTML = `
      <img src="${u.foto || ""}">
      <h3>${u.nome || "Usuário"}</h3>
      <p>${u.email || ""}</p>
      <p>Status: ${u.banido ? "🚫 Banido" : "✅ Ativo"}</p>
      <p>Nível: ${u.nivel || "free"}</p>

      <div class="user-actions">
        <button class="btn-vip" onclick="darVIP('${doc.id}')">VIP</button>
        ${
          u.banido
            ? `<button class="btn-unban" onclick="desbanir('${doc.id}')">Desbanir</button>`
            : `<button class="btn-ban" onclick="banir('${doc.id}')">Banir</button>`
        }
      </div>
    `;

    usersList.appendChild(div);
  });
}

function darVIP(uid) {
  db.collection("usuarios").doc(uid).update({
    vip: true,
    nivel: "vip"
  }).then(carregarUsuarios);
}

function banir(uid) {
  db.collection("usuarios").doc(uid).update({
    banido: true
  }).then(carregarUsuarios);
}

function desbanir(uid) {
  db.collection("usuarios").doc(uid).update({
    banido: false
  }).then(carregarUsuarios);
}
