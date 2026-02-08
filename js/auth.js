// Observa autenticação (CONTROLA BOTÕES + TOPO)
auth.onAuthStateChanged(user => {
  const btnLogin = document.getElementById("btnLogin");
  const btnPerfil = document.getElementById("btnPerfil");

  const userTop = document.getElementById("userTop");
  const userFoto = document.getElementById("userFoto");
  const userNome = document.getElementById("userNome");

  if (user) {
    console.log("Usuário logado:", user.displayName);

    if (btnLogin) btnLogin.style.display = "none";
    if (btnPerfil) btnPerfil.style.display = "inline-block";

    if (userTop) userTop.style.display = "flex";
    if (userFoto) userFoto.src = user.photoURL || "";
    if (userNome) userNome.textContent = user.displayName || "";

  } else {
    console.log("Usuário não logado");

    if (btnLogin) btnLogin.style.display = "inline-block";
    if (btnPerfil) btnPerfil.style.display = "none";

    if (userTop) userTop.style.display = "none";
  }
});

// Login Google
function loginComGoogle() {
  auth.signInWithPopup(provider)
    .then(result => {
      const user = result.user;
      const uid = user.uid;

      const userRef = db.collection("usuarios").doc(uid);

      userRef.get().then(doc => {
        if (!doc.exists) {
          userRef.set({

            // =========================
            // IDENTIFICAÇÃO GLOBAL
            // =========================
            uid: uid,
            provider: "google",

            // =========================
            // DADOS PRINCIPAIS (COMPLETO)
            // =========================
            dadosPrincipais: {
              uid: uid,
              nome: user.displayName || "",
              email: user.email || "",
              foto: user.photoURL || "",
              telefone: user.phoneNumber || "",
              provider: "google",
              emailVerificado: user.emailVerified,
              criadoEmAuth: user.metadata.creationTime,
              ultimoLoginAuth: user.metadata.lastSignInTime
            },

            // =========================
            // DADOS RÁPIDOS (ATALHO)
            // =========================
            nome: user.displayName || "",
            email: user.email || "",
            foto: user.photoURL || "",

            // =========================
            // STATUS DA CONTA
            // =========================
            vip: false,
            nivel: "free",
            banido: false,

            // =========================
            // CONTROLE E ESTATÍSTICAS
            // =========================
            acessos: 1,
            compras: 0,
            moedas: 0,

            // =========================
            // TIMESTAMPS
            // =========================
            criadoEm: firebase.firestore.FieldValue.serverTimestamp(),
            ultimoAcesso: firebase.firestore.FieldValue.serverTimestamp()
          });

        } else {
          // Atualiza acesso se já existir
          userRef.update({
            ultimoAcesso: firebase.firestore.FieldValue.serverTimestamp(),
            acessos: firebase.firestore.FieldValue.increment(1),
            "dadosPrincipais.ultimoLoginAuth": user.metadata.lastSignInTime
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
