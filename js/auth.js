// Observa autenticação
auth.onAuthStateChanged(user => {
  if (user) {
    console.log("Usuário logado:", user.displayName);
  } else {
    console.log("Usuário não logado");
  }
});

// Login Google (REDIRECT - funciona em mobile)
function loginComGoogle() {
  auth.signInWithRedirect(provider);
}

// Trata retorno do redirect
auth.getRedirectResult()
  .then(result => {
    if (result.user) {
      console.log("Login realizado:", result.user.displayName);
      window.location.href = "pages/perfil.html";
    }
  })
  .catch(error => {
    console.error("Erro no login:", error);
    alert("Erro ao fazer login com Google.");
  });

// Logout
function logout() {
  auth.signOut().then(() => {
    window.location.href = "../index.html";
  });
}
