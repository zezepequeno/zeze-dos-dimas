const ADMIN_EMAIL = "virtualinvest@gmail.com";

auth.onAuthStateChanged(user => {
  const btnAdmin = document.getElementById("btnAdmin");
  if (!btnAdmin) return;

  btnAdmin.style.display =
    user && user.email === ADMIN_EMAIL ? "inline-block" : "none";
});
