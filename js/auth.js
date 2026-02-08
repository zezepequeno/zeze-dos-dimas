const ADMIN_EMAIL = "virtualinvest@gmail.com";

auth.onAuthStateChanged(user => {
  const btnLogin = document.getElementById("btnLogin");
  const btnPerfil = document.getElementById("btnPerfil");
  const userTop = document.getElementById("userTop");
  const userFoto = document.getElementById("userFoto");
  const userNome = document.getElementById("userNome");

  if (user) {
    btnLogin && (btnLogin.style.display = "none");
    btnPerfil && (btnPerfil.style.display = "inline-block");

    userTop && (userTop.style.display = "flex");
    userFoto && (userFoto.src = user.photoURL || "");
    userNome && (userNome.textContent = user.displayName || "Usuário");

  } else {
    btnLogin && (btnLogin.style.display = "inline-block");
    btnPerfil && (btnPerfil.style.display = "none");
    userTop && (userTop.style.display = "none");
  }
});

function loginComGoogle() {
  auth.signInWithPopup(provider).then(async res => {
    const user = res.user;
    const ref = db.collection("usuarios").doc(user.uid);
    const snap = await ref.get();

    if (!snap.exists) {
      await ref.set({
        uid: user.uid,
        nome: user.displayName,
        email: user.email,
        foto: user.photoURL,
        admin: user.email === ADMIN_EMAIL,
        vip: false,
        banido: false,
        moedas: 0,
        criadoEm: firebase.firestore.FieldValue.serverTimestamp()
      });
    }

    window.location.href = "/zeze-dos-dimas/pages/perfil.html";
  });
}

function irParaPerfil() {
  window.location.href = "/zeze-dos-dimas/pages/perfil.html";
}

function irParaAdmin() {
  window.location.href = "/zeze-dos-dimas/admin/admin.html";
}

function logout() {
  auth.signOut().then(() => {
    window.location.href = "/zeze-dos-dimas/index.html";
  });
}
