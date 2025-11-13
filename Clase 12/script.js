const apiKey = "e6e47fa6ec9eca5f6c8030f0cafc1350"; // 🔑 Regístrate en openweathermap.org para obtener tu clave

document.getElementById("buscar").addEventListener("click", async () => {
  const ciudad = document.getElementById("ciudad").value.trim();
  if (!ciudad) return alert("Por favor, ingresa una ciudad");

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&units=metric&lang=es&appid=${apiKey}`
    );

    const data = await res.json();

    if (data.cod !== 200) {
      document.getElementById("resultado").innerHTML = "❌ Ciudad no encontrada";
      return;
    }

    // Construir URL del ícono
    const icono = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    // Mostrar resultados
    document.getElementById("resultado").innerHTML = `
      <h2>${data.name}, ${data.sys.country}</h2>
      <p>🌡️ Temp: ${data.main.temp}°C</p>
      <p>💨 Viento: ${data.wind.speed} km/h</p>
      <p>☁️ Clima: ${data.weather[0].description}</p>
      <img src="${icono}" alt="icono del clima">
    `;
  } catch (error) {
    document.getElementById("resultado").innerHTML = "⚠️ Error al conectar con la API";
  }
});
