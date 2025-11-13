document.getElementById("buscar").addEventListener("click", () => {
  const user = document.getElementById("usuario").value.trim();
  if (!user) return alert("Ingrese un usuario");

  document.getElementById("resultado").innerHTML = "🔎 Buscando...";

  //fetch: comparación  -  then: entonces//
  fetch(`https://api.github.com/users/${user}/repos`)
    .then((res) => {
      if (!res.ok) throw new Error("Usuario no encontrado");
      return res.json();
    })
    .then((data) => {
      document.getElementById("resultado").innerHTML = `
        <img src="${data.avatar_url}" alt="Avatar">
        <h2>${data.login}</h2>
        <p>👥 Seguidores: ${data.followers}</p>
        <p>📦 Repos públicos: ${data.public_repos}</p>
        <p>🌎 Ubicación geográfica: ${data.location || "No disponible"}</p>
        <p>⭐ Estrellas: ${data.stars}</p>
        <a href="${data.html_url}" target="_blank">Ver perfil</a>
      `;
      fetch(`https://api.github.com/users/${user}/repos?per_page=5&sort=updated`)
  .then(res => res.json())
  .then(repos => {
    const lista = repos.map(r => `<li><a href="${r.html_url}" target="_blank">${r.name}</a></li>`).join("");
    document.getElementById("resultado").innerHTML += `
      <h3>📂 Últimos repositorios:</h3>
      <ul>${lista}</ul>
    `;
  });

    })
    .catch((error) => {
      document.getElementById("resultado").innerHTML = `❌ ${error.message}`;
    })
    .finally(() => console.log("🔍 Búsqueda finalizada"));
});
