auth.onAuthStateChanged(user => {
  if (!user) {
    window.location.href = "../index.html";
    return;
  }

  const uid = user.uid;

  // Busca dados no Firestore
  db.collection("usuarios").doc(uid).get()
    .then(doc => {
      let nome, email, foto;

      if (doc.exists) {
        const dados = doc.data();
        nome = dados.nome;
        email = dados.email;
        foto = dados.foto;
      }

      // Fallback seguro
      document.getElementById("userName").textContent =
        nome || user.displayName || "Usuário";

      document.getElementById("userEmail").textContent =
        email || user.email || "";

      document.getElementById("userPhoto").src =
        foto || user.photoURL || "";
    })
    .catch(error => {
      console.error("Erro ao buscar dados do perfil:", error);

      // Fallback total
      document.getElementById("userName").textContent =
        user.displayName || "Usuário";

      document.getElementById("userEmail").textContent =
        user.email || "";

      document.getElementById("userPhoto").src =
        user.photoURL || "";
    });
});
