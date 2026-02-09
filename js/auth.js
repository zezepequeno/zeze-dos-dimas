const ADMIN_EMAIL = "virtualinvest@gmail.com";

function loginComGoogle() {
  auth.signInWithPopup(provider).catch(console.error);
}

function logout() {
  auth.signOut();
}

function irParaPerfil() {
  window.location.href = "pages/perfil.html";
}

function irParaAdmin() {
  window.location.href = "pages/admin.html";
}

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

  if (!snap.exists) {
    await ref.set({
      nome: user.displayName,
      email: user.email,
      vip: false,
      banido: false,
      moedas: 0,
      criadoEm: firebase.firestore.FieldValue.serverTimestamp()
    });
  }

  const dados = (await ref.get()).data();

  if (dados.banido) {
    alert("Sua conta foi banida.");
    logout();
    return;
  }

  btnLogin && (btnLogin.style.display = "none");
  btnPerfil && (btnPerfil.style.display = "inline-block");
  userTop && (userTop.style.display = "flex");

  userFoto && (userFoto.src = user.photoURL);
  userNome && (userNome.textContent = user.displayName);
  userBadge && (
    userBadge.textContent = dados.vip ? "VIP 🔥" : "FREE",
    userBadge.style.display = "inline-block"
  );

  btnAdmin && (
    btnAdmin.style.display =
      user.email === ADMIN_EMAIL ? "inline-block" : "none"
  );
});
