const params = new URLSearchParams(window.location.search);

const search = params.get("search");
const genres = params.getAll("genre"); // 🔥 MULTIPLE
const page = parseInt(params.get("page")) || 1;

const porPagina = 8; // 👈 puedes cambiarlo

const resultados = document.getElementById("resultados");
const titulo = document.getElementById("titulo");

fetch('/data.json')
.then(res => res.json())
.then(data => {

  let filtrados = data;

  // 🔍 búsqueda
  if (search) {
    filtrados = filtrados.filter(item =>
      item.titulo.toLowerCase().includes(search.toLowerCase())
    );
  }

  // 🎭 múltiples géneros
  if (genres.length > 0) {
    filtrados = filtrados.filter(item => {
      if (!item.genero) return false;

      const itemGenres = item.genero.toLowerCase().split(",");

      // 🔥 debe incluir TODOS los géneros seleccionados
      return genres.every(g =>
        itemGenres.includes(g.toLowerCase())
      );
    });
  }

  // 📄 PAGINACIÓN
  const inicio = (page - 1) * porPagina;
  const fin = inicio + porPagina;
  const paginaItems = filtrados.slice(inicio, fin);

  // 🖼️ render
  resultados.innerHTML = "";

  paginaItems.forEach(item => {
    resultados.innerHTML += `
      <div class="card">
        <a href="${item.url}" style="color:white;text-decoration:none;">
          <img src="${item.imagen}">
          <p>${item.titulo}</p>
        </a>
      </div>
    `;
  });

  // 🔢 botones de página
  const totalPaginas = Math.ceil(filtrados.length / porPagina);

  let pagHTML = "";
  for (let i = 1; i <= totalPaginas; i++) {
    pagHTML += `<a href="?${buildQuery(i)}">${i}</a> `;
  }

  document.getElementById("paginacion").innerHTML = pagHTML;

});

// 🔥 mantener filtros al cambiar página
function buildQuery(pageNum){
  const params = new URLSearchParams();

  if(search) params.set("search", search);

  genres.forEach(g => params.append("genre", g));

  params.set("page", pageNum);

  return params.toString();
}
