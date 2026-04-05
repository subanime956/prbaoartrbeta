const params = new URLSearchParams(window.location.search);

const search = params.get("search");
const genres = params.getAll("genre");
const page = parseInt(params.get("page")) || 1;

const porPagina = 6;

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

 let pagHTML = "";

const maxVisible = 5;
const totalPaginas = Math.ceil(filtrados.length / porPagina);

// 🔥 botón anterior
if(page > 1){
  pagHTML += `<a href="?${buildQuery(page - 1)}">«</a>`;
}

// 🔥 rango dinámico
let start = Math.max(1, page - Math.floor(maxVisible / 2));
let end = start + maxVisible - 1;

if(end > totalPaginas){
  end = totalPaginas;
  start = Math.max(1, end - maxVisible + 1);
}

// 🔥 primera + puntos
if(start > 1){
  pagHTML += `<a href="?${buildQuery(1)}">1</a>`;
  if(start > 2){
    pagHTML += `<span>...</span>`;
  }
}

// 🔢 páginas visibles
for(let i = start; i <= end; i++){
  if(i === page){
    pagHTML += `<a class="active">${i}</a>`;
  } else {
    pagHTML += `<a href="?${buildQuery(i)}">${i}</a>`;
  }
}

// 🔥 última + puntos
if(end < totalPaginas){
  if(end < totalPaginas - 1){
    pagHTML += `<span>...</span>`;
  }
  pagHTML += `<a href="?${buildQuery(totalPaginas)}">${totalPaginas}</a>`;
}

// 🔥 botón siguiente
if(page < totalPaginas){
  pagHTML += `<a href="?${buildQuery(page + 1)}">»</a>`;
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
