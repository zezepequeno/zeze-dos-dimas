// Observa autenticação
auth.onAuthStateChanged(user => {
  if (user) {
    console.log("Usuário logado:", user.displayName);
  } else {
    console.log("Usuário não logado");
  }
});

// Login com Google
function loginComGoogle() {
  auth.signInWithPopup(provider)
    .then(result => {
      salvarUsuario(result.user);
    })
    .catch(error => {
      console.warn("Popup bloqueado, usando redirect...", error);
      auth.signInWithRedirect(provider);
    });
}

// Retorno do redirect (celular)
auth.getRedirectResult()
  .then(result => {
    if (result.user) {
      salvarUsuario(result.user);
    }
  })
  .catch(error => {
    console.error("Erro no redirect:", error);
  });

// Salva usuário no Firestore
function salvarUsuario(user) {
  console.log("Login realizado:", user.displayName);

  const uid = user.uid;
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

  // Redireciona para perfil
  window.location.href = "pages/perfil.html";
}

// Logout
function logout() {
  auth.signOut().then(() => {
    window.location.href = "../index.html";
  });
}
