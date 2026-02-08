// Verifica autenticação
auth.onAuthStateChanged(user => {
  if (!user) {
    loginComGoogle();
  } else {
    console.log("Usuário logado:", user.displayName);
  }
});

// Função de login
function loginComGoogle() {
  auth.signInWithPopup(provider)
    .then(result => {
      console.log("Login realizado:", result.user.displayName);
    })
    .catch(error => {
      console.error("Erro no login:", error);
      alert("Erro ao fazer login com Google.");
    });
}

// Logout (pronto pra usar depois)
function logout() {
  auth.signOut().then(() => {
    location.reload();
  });
}
