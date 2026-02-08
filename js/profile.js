auth.onAuthStateChanged(user => {
  if (!user) {
    window.location.href = "/zeze-dos-dimas/index.html";
    return;
  }

  const uid = user.uid;

  db.collection("usuarios").doc(uid).get()
    .then(doc => {
      if (doc.exists) {
        const dados = doc.data();

        document.getElementById("perfilNome").textContent =
          dados.nome || user.displayName || "Usuário";

        document.getElementById("perfilEmail").textContent =
          dados.email || user.email || "";

        document.getElementById("perfilFoto").src =
          dados.foto || user.photoURL || "";
      }
    })
    .catch(error => {
      console.error("Erro ao buscar dados do perfil:", error);
    });
});
