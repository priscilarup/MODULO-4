const listaNotas = document.getElementById("listaNotas");
let notas = JSON.parse(localStorage.getItem("notas")) || []; 
//JSON.pase convierte a objeto --> notas está en el HTML// 
// si no encuentra la nota sale un array vacío//

function mostrarNotas() {
  listaNotas.innerHTML = "";
  notas.forEach((texto, i) => {
    const li = document.createElement("li");
    li.textContent = texto;
    listaNotas.appendChild(li);
  });
}

document.getElementById("guardar").addEventListener("click", () => {
  const nota = document.getElementById("nota").value.trim();
  if (nota) {
    notas.push(nota);
    localStorage.setItem("notas", JSON.stringify(notas));
    mostrarNotas();
    document.getElementById("nota").value = "";
  }
});

document.getElementById("borrar").addEventListener("click", () => {
  localStorage.removeItem("notas");
  notas = [];
  mostrarNotas();
});

mostrarNotas();