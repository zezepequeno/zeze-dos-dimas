const ADMIN_EMAIL = "virtualinvest@gmail.com";

auth.onAuthStateChanged(async user => {
  const btnLogin = document.getElementById("btnLogin");
  const btnPerfil = document.getElementById("btnPerfil");
  const userTop = document.getElementById("userTop");
  const userFoto = document.getElementById("userFoto");
  const userNome = document.getElementById("userNome");
  const userBadge = document.getElementById("userBadge");
  const btnAdmin = document.getElementById("btnAdmin");

  // 🔒 DESLOGADO
  if (!user) {
    btnLogin && (btnLogin.style.display = "inline-block");
    btnPerfil && (btnPerfil.style.display = "none");
    userTop && (userTop.style.display = "none");
    btnAdmin && (btnAdmin.style.display = "none");
    return;
  }

  try {
    const ref = db.collection("usuarios").doc(user.uid);
    const snap = await ref.get();

    if (!snap.exists) {
      console.warn("Usuário sem documento no Firestore");
      return;
    }

    const dados = snap.data();

    // 🚫 BANIDO
    if (dados.banido === true) {
      alert("Sua conta foi banida.");
      await auth.signOut();
      window.location.href = "/zeze-dos-dimas/index.html";
      return;
    }

    // 🎯 UI LOGADO
    btnLogin && (btnLogin.style.display = "none");
    btnPerfil && (btnPerfil.style.display = "inline-block");
    userTop && (userTop.style.display = "flex");

    userFoto && (userFoto.src = user.photoURL || "");
    userNome && (userNome.textContent = user.displayName || "Usuário");

    // 🏷️ BADGE
    if (userBadge) {
      userBadge.style.display = "inline-block";
      userBadge.textContent = dados.vip ? "VIP 🔥" : "FREE";
      userBadge.className = "badge " + (dados.vip ? "vip" : "free");
    }

    // 👑 ADMIN (SÓ VOCÊ)
    if (btnAdmin) {
      btnAdmin.style.display =
        user.email === ADMIN_EMAIL ? "inline-block" : "none";
    }

    // 🌐 DISPONÍVEL GLOBAL
    window.USER_DATA = dados;

  } catch (erro) {
    console.error("Erro no auth.js:", erro);
    btnAdmin && (btnAdmin.style.display = "none");
  }
});
