// Verifica autenticação
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
      console.log("Login realizado:", result.user.displayName);
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
