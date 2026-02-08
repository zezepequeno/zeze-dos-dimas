auth.onAuthStateChanged(user => {
  if (!user) {
    // 🔒 Proteção: só entra logado
    window.location.href = "../index.html";
    return;
  }

  const uid = user.uid;

  // 🔥 Busca dados no Firestore
  db.collection("usuarios").doc(uid).get()
    .then(doc => {

      if (doc.exists) {
        const dados = doc.data();

        document.getElementById("userName").textContent =
          dados.nome || user.displayName || "Usuário";

        document.getElementById("userEmail").textContent =
          dados.email || user.email || "";

        document.getElementById("userPhoto").src =
          dados.foto || user.photoURL || "";

      } else {
        // ⚠️ Fallback se não existir no banco
        document.getElementById("userName").textContent =
          user.displayName || "Usuário";

        document.getElementById("userEmail").textContent =
          user.email || "";

        document.getElementById("userPhoto").src =
          user.photoURL || "";
      }

    })
    .catch(error => {
      console.error("Erro ao buscar dados do perfil:", error);
    });
});
