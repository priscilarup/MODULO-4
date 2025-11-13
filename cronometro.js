// Variables para el cronómetro
let segundos = 0;
let intervalo;

// Función para actualizar la visualización del cronómetro
function actualizarCronometro() {
    const hrs = String(Math.floor(segundos / 3600)).padStart(2, "0");
    const mins = String(Math.floor((segundos % 3600) / 60)).padStart(2, "0");
    const secs = String(segundos % 60).padStart(2, "0");

    // Usar template literal para la interpolación correcta
    const cronometro = document.getElementById("cronometro");
    if (cronometro) {
        cronometro.textContent = `${hrs}:${mins}:${secs}`;
    }
}

// Asegurarse de que el DOM esté cargado antes de agregar event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Botón iniciar
    const btnIniciar = document.getElementById("iniciar");
    if (btnIniciar) {
        btnIniciar.addEventListener("click", () => {
            if (!intervalo) {
                intervalo = setInterval(() => {
                    segundos++;
                    actualizarCronometro();
                }, 1000);
            }
        });
    }

    // Botón detener
    const btnDetener = document.getElementById("detener");
    if (btnDetener) {
        btnDetener.addEventListener("click", () => {
            clearInterval(intervalo);
            intervalo = null;
        });
    }

    // Botón reiniciar
    const btnReiniciar = document.getElementById("reiniciar");
    if (btnReiniciar) {
        btnReiniciar.addEventListener("click", () => {
            segundos = 0;
            actualizarCronometro();
            clearInterval(intervalo);
            intervalo = null;
        });
    }
});

