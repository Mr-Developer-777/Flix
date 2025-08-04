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
}

// Mostrar opiniones al cargar la página
window.onload = mostrarOpiniones;
