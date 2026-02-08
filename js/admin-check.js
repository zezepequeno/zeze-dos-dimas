const ADMIN_EMAIL = "virtualinvest@gmail.com";

auth.onAuthStateChanged(async user => {
  const btnAdmin = document.getElementById("btnAdmin");

  if (!user) return;

  if (user.email === ADMIN_EMAIL) {
    btnAdmin && (btnAdmin.style.display = "inline-block");
  } else {
    btnAdmin && (btnAdmin.style.display = "none");
  }
});
