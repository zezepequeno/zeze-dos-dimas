// Observa autenticação (CONTROLA OS BOTÕES)
auth.onAuthStateChanged(user => {
  const btnLogin = document.getElementById("btnLogin");
  const btnPerfil = document.getElementById("btnPerfil");

  if (user) {
    console.log("Usuário logado:", user.displayName);

    if (btnLogin) btnLogin.style.display = "none";
    if (btnPerfil) btnPerfil.style.display = "inline-block";

  } else {
    console.log("Usuário não logado");

    if (btnLogin) btnLogin.style.display = "inline-block";
    if (btnPerfil) btnPerfil.style.display = "none";
  }
});

// Login Google
function loginComGoogle() {
  auth.signInWithPopup(provider)
    .then(result => {
      const user = result.user;
      const uid = user.uid;

      console.log("Login realizado:", user.displayName);

      // 🔥 Salva usuário no Firestore se não existir
      const userRef = db.collection("usuarios").doc(uid);

      userRef.get().then(doc => {
        if (!doc.exists) {
          userRef.set({
            uid: uid,
            nome: user.displayName || "",
            email: user.email || "",
            foto: user.photoURL || "",
            provider: "google",
            criadoEm: firebase.firestore.FieldValue.serverTimestamp()
          });
        }
      });

      // Redireciona para o perfil
      window.location.href = "pages/perfil.html";
    })
    .catch(error => {
      console.error("Erro no login:", error);
      alert("Erro ao fazer login com Google.");
    });
}

// Ir para perfil
function irParaPerfil() {
  window.location.href = "pages/perfil.html";
}

// Logout
function logout() {
  auth.signOut().then(() => {
    window.location.href = "../index.html";
  });
}
