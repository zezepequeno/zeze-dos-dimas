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
    return;
  }

  const ref = db.collection("usuarios").doc(user.uid);
  const snap = await ref.get();
  if (!snap.exists) return;

  const dados = snap.data();

  // 🚫 BANIMENTO
  if (dados.banido) {
    alert("Sua conta foi banida.");
    await auth.signOut();
    window.location.href = "/zeze/index.html";
    return;
  }

  btnLogin.style.display = "none";
  btnPerfil.style.display =
