function toggleMenu() {
  const menu = document.getElementById("menu");
  const overlay = document.getElementById("overlay");

  const isOpen = menu.classList.toggle("open");
  overlay.classList.toggle("active");

  document.body.classList.toggle("no-scroll", isOpen);
}

function abrirBusqueda(){
  const bar = document.getElementById("searchBar");
  bar.classList.add("active");

  setTimeout(() => {
    document.getElementById("searchInput").focus();
  }, 200);
}

function cerrarBusqueda(){
  document.getElementById("searchBar").classList.remove("active");
}

document.getElementById("searchInput").addEventListener("keydown", function(e){
  if(e.key === "Enter"){
    const valor = this.value.trim();
    if(valor !== ""){
      window.location.href = "/catalogo?search=" + encodeURIComponent(valor);
    }
  }
});