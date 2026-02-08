const ADMIN_EMAIL = "virtualinvest@gmail.com";

auth.onAuthStateChanged(async user => {
  const btnLogin = document.getElementById("btnLogin");
  const btnPerfil = document.getElementById("btnPerfil");
  const userTop = document.getElementById("userTop");
  const userFoto = document.getElementById("userFoto");
  const userNome = document.getElementById("userNome");
  const userBadge = document.getElementById("userBadge");
  const btnAdmin = document.getElementById("btnAdmin");

  if (!user) {
    btnLogin && (btnLogin.style.display = "inline-block");
    btnPerfil && (btnPerfil.style.display = "none");
    userTop && (userTop.style.display = "none");
    btnAdmin && (btnAdmin.style.display = "none");
    return;
  }

  const ref = db.collection("usuarios").doc(user.uid);
  const snap = await ref.get();
  if (!snap.exists) return;

  const dados = snap.data();

  if (dados.banido) {
    alert("Sua conta foi banida.");
    await auth.signOut();
    window.location.href = "/zeze-dos-dimas/index.html";
    return;
  }

  btnLogin && (btnLogin.style.display = "none");
  btnPerfil && (btnPerfil.style.display = "inline-block");
  userTop && (userTop.style.display = "flex");

  userFoto && (userFoto.src = user.photoURL || "");
  userNome && (userNome.textContent = user.displayName || "Usuário");

  if (userBadge) {
    userBadge.style.display = "inline-block";
    userBadge.textContent = dados.vip ? "VIP 🔥" : "FREE";
  }

  btnAdmin && (btnAdmin.style.display = user.email === ADMIN_EMAIL ? "inline-block" : "none");
});
