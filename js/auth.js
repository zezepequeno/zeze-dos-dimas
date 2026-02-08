// Verifica autenticação
auth.onAuthStateChanged(user => {
  if (!user) {
    loginComGoogle();
  } else {
    console.log("Usuário logado:", user.displayName);
  }
});

// Login Google
function loginComGoogle() {
  auth.signInWithPopup(provider)
    .then(result => {
      console.log("Login realizado:", result.user.displayName);
      if (window.location.pathname.includes("index.html")) {
        window.location.href = "pages/perfil.html";
      }
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
