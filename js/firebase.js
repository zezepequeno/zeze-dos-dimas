// Configuração Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCWFLa-oKekYvvEhaxL_S8NZopxI-GID60",
  authDomain: "zeze-dos-dimas.firebaseapp.com",
  projectId: "zeze-dos-dimas",
  storageBucket: "zeze-dos-dimas.appspot.com",
  messagingSenderId: "831377776200",
  appId: "1:831377776200:web:089b2ff4120db93325827d",
  measurementId: "G-YNDH2FH765"
};

// Inicializa Firebase (proteção contra inicializar duas vezes)
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// ===== SERVIÇOS =====
const auth = firebase.auth();
const db = firebase.firestore(); // 🔥 ISSO É O QUE FALTAVA
const provider = new firebase.auth.GoogleAuthProvider();

// Força seleção de conta Google
provider.setCustomParameters({
  prompt: "select_account"
});
