// app.js

function publicarOpinion() {
  const username = document.getElementById("username").value.trim();
  const titulo = document.getElementById("titulo").value.trim();
  const contenido = document.getElementById("contenido").value.trim();

  if (!username || !titulo || !contenido) {
    alert("Por favor, completá todos los campos.");
    return;
  }

  const opinion = {
    username,
    titulo,
    contenido,
    fecha: new Date().toLocaleString()
  };

  const opiniones = JSON.parse(localStorage.getItem("opiniones")) || [];
  opiniones.unshift(opinion);
  localStorage.setItem("opiniones", JSON.stringify(opiniones));

  document.getElementById("username").value = "";
  document.getElementById("titulo").value = "";
  document.getElementById("contenido").value = "";

  mostrarOpiniones();
}

function mostrarOpiniones() {
  const opiniones = JSON.parse(localStorage.getItem("opiniones")) || [];
  const contenedor = document.getElementById("opiniones");

  contenedor.innerHTML = "<h2>Opiniones recientes</h2>";

  opiniones.forEach(op => {
    const div = document.createElement("div");
    div.className = "opinion";
    div.innerHTML = `
      <h3>${op.titulo}</h3>
      <p><strong>${op.username}</strong> (${op.fecha})</p>
      <p>${op.contenido}</p>
    `;
    contenedor.appendChild(div);
  });
}// Importante: para Firebase v9 modular

// Configuración de Firebase (poné la tuya acá)
const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_DOMINIO.firebaseapp.com",
  projectId: "TU_PROJECT_ID",
  storageBucket: "TU_BUCKET.appspot.com",
  messagingSenderId: "TU_SENDER_ID",
  appId: "TU_APP_ID"
};

// Inicializar Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Guardar opinión en Firestore
async function publicarOpinion() {
  const username = document.getElementById("username").value.trim();
  const titulo = document.getElementById("titulo").value.trim();
  const contenido = document.getElementById("contenido").value.trim();

  if (!username || !titulo || !contenido) {
    alert("Por favor, completá todos los campos.");
    return;
  }

  try {
    await db.collection("opiniones").add({
      username,
      titulo,
      contenido,
      fecha: new Date()
    });
    alert("Opinión guardada!");
    mostrarOpiniones(); // recargamos opiniones
  } catch (e) {
    alert("Error guardando opinión: " + e.message);
  }
}

