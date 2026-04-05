const params = new URLSearchParams(window.location.search);

const search = params.get("search");
const genres = params.getAll("genre");
const page = parseInt(params.get("page")) || 1;

const porPagina = 24;

const resultados = document.getElementById("resultados");

fetch('/data.json')
.then(res => res.json())
.then(data => {

  let filtrados = data;

  if (search) {
    filtrados = filtrados.filter(item =>
      item.titulo.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (genres.length > 0) {
    filtrados = filtrados.filter(item => {
      if (!item.genero) return false;
      const itemGenres = item.genero.toLowerCase().split(",");
      return genres.every(g => itemGenres.includes(g.toLowerCase()));
    });
  }

  const inicio = (page - 1) * porPagina;
  const fin = inicio + porPagina;
  const paginaItems = filtrados.slice(inicio, fin);

  resultados.innerHTML = "";

  paginaItems.forEach(item => {
  resultados.innerHTML += `
    <a class="card" href="${item.url}">
      
      <div style="position: relative;">
        ${item.badge ? `<span class="card-badge">${item.badge}</span>` : ""}
        <img src="${item.imagen}" alt="${item.titulo}" style="width: 100%;">
      </div>

      <div class="card-content">
        <h3>${item.titulo}</h3>
      </div>

    </a>
  `;
});

  const totalPaginas = Math.ceil(filtrados.length / porPagina);

  let pagHTML = "";
  for (let i = 1; i <= totalPaginas; i++) {
  if(i === page){
    pagHTML += `<a href="?${buildQuery(i)}" class="active">${i}</a>`;
  } else {
    pagHTML += `<a href="?${buildQuery(i)}">${i}</a>`;
  }
}

  document.getElementById("paginacion").innerHTML = pagHTML;

});

function buildQuery(pageNum){
  const params = new URLSearchParams();

  if(search) params.set("search", search);
  genres.forEach(g => params.append("genre", g));
  params.set("page", pageNum);

  return params.toString();
}
