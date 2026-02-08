// Observa autenticação
auth.onAuthStateChanged(user => {
  if (user) {
    console.log("Usuário logado:", user.displayName);
  } else {
    console.log("Usuário não logado");
  }
});

// Login Google (somente quando clicar)
function loginComGoogle() {
  auth.signInWithPopup(provider)
    .then(result => {
      const user = result.user;

      console.log("Login realizado:", user.displayName);

      const uid = user.uid;

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

// Logout
function logout() {
  auth.signOut().then(() => {
    window.location.href = "../index.html";
  });
}
