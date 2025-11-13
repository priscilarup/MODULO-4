const listaNotas = document.getElementById("listaNotas");
let notas = JSON.parse(localStorage.getItem("notas")) || []; 
//JSON.pase convierte a objeto --> notas está en el HTML// 
// si no encuentra la nota sale un array vacío//

function mostrarNotas() {
  listaNotas.innerHTML = "";
  notas.forEach((nota, i) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <div class="contenido">
        <p class="fecha">🕒 ${nota.fecha}</p>
        <p>${nota.texto}</p>
      </div>
      <button class="eliminar" data-index="${i}">Eliminar</button>
    `;

    listaNotas.appendChild(li);
  });

  // Asignar evento a cada botón "Eliminar"
  document.querySelectorAll(".eliminar").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const index = e.target.dataset.index;
      notas.splice(index, 1);
      localStorage.setItem("notas", JSON.stringify(notas));
      mostrarNotas();
    });
  });
}

document.getElementById("guardar").addEventListener("click", () => {
  const texto = document.getElementById("nota").value.trim();
  if (texto) {
    const fecha = new Date().toLocaleString("es-AR");
    notas.push({ texto, fecha });
    localStorage.setItem("notas", JSON.stringify(notas));
    mostrarNotas();
    document.getElementById("nota").value = "";
  }
});

document.getElementById("borrar").addEventListener("click", () => {
  if (confirm("¿Seguro que querés borrar todas las notas?")) {
    localStorage.removeItem("notas");
    notas = [];
    mostrarNotas();
  }
});

mostrarNotas();
