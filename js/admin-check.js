// ===============================
// VERIFICAÇÃO DE ADMIN GLOBAL
// ===============================
const ADMIN_EMAIL = "virtualinvest@gmail.com";

auth.onAuthStateChanged(user => {

  const btnAdmin = document.getElementById("btnAdmin");

  // Esconde botão por padrão
  if (btnAdmin) btnAdmin.style.display = "none";

  // Não logado → nada
  if (!user) return;

  // Se for admin
  if (user.email === ADMIN_EMAIL) {

    // Mostra botão admin no site
    if (btnAdmin) btnAdmin.style.display = "inline-block";

    // Marca admin no HTML (opcional)
    document.body.setAttribute("data-admin", "true");

  }

});
