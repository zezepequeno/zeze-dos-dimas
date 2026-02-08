const ADMIN_EMAIL = "virtualinvest@gmail.com";

// ===============================
// OBSERVA AUTENTICAÇÃO GLOBAL
// ===============================
auth.onAuthStateChanged(async user => {
  const btnLogin = document.getElementById("btnLogin");
  const btnPerfil = document.getElementById("btnPerfil");

  const userTop = document.getElementById("userTop");
  const userFoto = document.getElementById("userFoto");
  const userNome = document.getElementById("userNome");

  const btnAdmin = document.getElementById("btnAdmin");

  if (user) {
    if (btnLogin) btnLogin.style.display = "none";
    if (btnPerfil) btnPerfil.style.display = "inline-block";

    if (userTop) userTop.style.display = "flex";
    if (userFoto) userFoto.src = user.photoURL || "";
    if (userNome) userNome.textContent = user.displayName || "Usuário";

    if (btnAdmin && user.email === ADMIN_EMAIL) {
      btnAdmin.style.display = "inline-block";
    }

  } else {
    if (btnLogin) btnLogin.style.display = "inline-block";
    if (btnPerfil) btnPerfil.style.display = "none";
    if (userTop) userTop.style.display = "none";
    if (btnAdmin) btnAdmin.style.display = "none";
  }
});

// ===============================
// LOGIN GOOGLE + FIRESTORE AUTO
// ===============================
function loginComGoogle() {
  auth.signInWithPopup(provider).then(async result => {
    const user = result.user;
    const uid = user.uid;

    const userRef = db.collection("usuarios").doc(uid);
    const snap = await userRef.get();

    if (!snap.exists) {
      await userRef.set({
        uid,
        provider: "google",

        dadosPrincipais: {
          uid,
          nome: user.displayName || "",
          email: user.email || "",
          foto: user.photoURL || "",
          telefone: user.phoneNumber || "",
          emailVerificado: user.emailVerified,
          criadoEmAuth: user.metadata.creationTime,
          ultimoLoginAuth: user.metadata.lastSignInTime
        },

        nome: user.displayName || "",
        email: user.email || "",
        foto: user.photoURL || "",

        vip: false,
        nivel: "free",
        banido: false,
        admin: user.email === ADMIN_EMAIL,

        acessos: 1,
        compras: 0,
        moedas: 0,

        criadoEm: firebase.firestore.FieldValue.serverTimestamp(),
        ultimoAcesso: firebase.firestore.FieldValue.serverTimestamp()
      });
    } else {
      await userRef.update({
        ultimoAcesso: firebase.firestore.FieldValue.serverTimestamp(),
        acessos: firebase.firestore.FieldValue.increment(1),
        "dadosPrincipais.ultimoLoginAuth": user.metadata.lastSignInTime
      });
    }

    window.location.href = "/zeze/pages/perfil.html";
  })
  .catch(err => {
    console.error(err);
    alert("Erro ao fazer login");
  });
}

// ===============================
// NAVEGAÇÃO
// ===============================
function irParaPerfil() {
  window.location.href = "/zeze/pages/perfil.html";
}

function irParaAdmin() {
  window.location.href = "/zeze/pages/admin.html";
}

function logout() {
  auth.signOut().then(() => {
    window.location.href = "/zeze/index.html";
  });
}
