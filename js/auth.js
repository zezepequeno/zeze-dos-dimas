const ADMIN_EMAIL = "virtualinvest@gmail.com";

auth.onAuthStateChanged(async user => {
  const btnLogin = document.getElementById("btnLogin");
  const btnPerfil = document.getElementById("btnPerfil");
  const userTop = document.getElementById("userTop");
  const userFoto = document.getElementById("userFoto");
  const userNome = document.getElementById("userNome");
  const userBadge = document.getElementById("userBadge");
  const btnAdmin = document.getElementById("btnAdmin");

  // 🔓 DESLOGADO
  if (!user) {
    btnLogin && (btnLogin.style.display = "inline-block");
    btnPerfil && (btnPerfil.style.display = "none");
    userTop && (userTop.style.display = "none");
    btnAdmin && (btnAdmin.style.display = "none");
    return;
  }

  // 🔎 BUSCA DADOS DO USUÁRIO
  let snap;
  try {
    const ref = db.collection("usuarios").doc(user.uid);
    snap = await ref.get();
  } catch (e) {
    console.error("Erro ao buscar usuário:", e);
    return;
  }

  if (!snap || !snap.exists) return;

  const dados = snap.data();

  // 🚫 BANIMENTO
  if (dados.banido === true) {
    alert("Sua conta foi banida.");
    await auth.signOut();
    window.location.href = "/zeze-dos-dimas/index.html";
    return;
  }

  // ✅ LOGADO
  btnLogin && (btnLogin.style.display = "none");
  btnPerfil && (btnPerfil.style.display = "inline-block");
  userTop && (userTop.style.display = "flex");

  userFoto && (userFoto.src = user.photoURL || "");
  userNome && (userNome.textContent = user.displayName || "Usuário");

  // 🏷️ BADGE
  if (userBadge) {
    userBadge.style.display = "inline-block";
    userBadge.textContent = dados.vip ? "VIP 🔥" : "FREE";
  }

  // 🧑‍⚖️ ADMIN — DUPLA VERIFICAÇÃO (EMAIL + CLAIM)
  try {
    const token = await user.getIdTokenResult();
    const isAdmin =
      user.email === ADMIN_EMAIL || token.claims.admin === true;

    btnAdmin && (btnAdmin.style.display = isAdmin ? "inline-block" : "none");
  } catch (e) {
    console.warn("Erro ao verificar admin:", e);
    btnAdmin && (btnAdmin.style.display = "none");
  }
});
