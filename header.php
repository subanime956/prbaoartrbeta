<?php
// header.php
$searchQuery = isset($_GET['search']) ? trim($_GET['search']) : '';
?>

<!-- CSS -->
<link rel="stylesheet" href="/assets/css/header.css">

<header class="header">
  <div class="header-container">
    <!-- LOGO IZQUIERDA -->
    <div class="logo">
      <a href="/">
        <img src="/assets/img/AnimeRTR.webp">
      </a>
    </div>

    <!-- DERECHA -->
    <div class="actions">
      <button class="icon-btn" onclick="abrirBusqueda()">
        <i class="fa fa-search"></i>
      </button>

      <button class="icon-btn" onclick="toggleMenu()">
        <i class="fa fa-bars"></i>
      </button>
    </div>
  </div>

  <!-- BARRA DE BÚSQUEDA -->
  <div id="searchBar" class="<?= $searchQuery ? 'active' : '' ?>">
    <form method="get" action="/catalogo">
      <input type="text" name="search" id="searchInput" placeholder="Buscar anime..." value="<?= htmlspecialchars($searchQuery) ?>" />
      <button type="button" onclick="cerrarBusqueda()">
        <i class="fa fa-times"></i>
      </button>
    </form>
  </div>
</header>

<!-- OVERLAY -->
<div id="overlay" onclick="toggleMenu()"></div>

<!-- MENÚ -->
<div id="menu">
  <div class="menu-links">
    <a href="#"><i class="fa fa-home"></i>Inicio</a>
    <a href="#"><i class="fa fa-play-circle"></i>Anime</a>
    <a href="#"><i class="fa fa-heart"></i>Hentai</a>
    <a href="#"><i class="fa fa-book"></i>Doujins</a>
    <a href="#"><i class="fa fa-fire"></i>Rule34</a>
    <a href="#"><i class="fa fa-gamepad"></i>Juegos</a>
    <a href="#"><i class="fa fa-ban"></i>DMCA</a>
    <a href="#"><i class="fa fa-envelope"></i>Contacto</a>
  </div>

  <div class="menu-social">
    <a href="https://x.com/sitiosrtr" title="X/Twitter"><i class="fa fa-twitter"></i></a>
    <a href="https://whatsapp.com/channel/0029Vb5iKDyIiRooDhF2Dj1J" title="WhatsApp"><i class="fa fa-whatsapp"></i></a>
    <a href="https://www.facebook.com/AnimeRTRh" title="Facebook"><i class="fa fa-facebook"></i></a>
    <a href="https://www.youtube.com/@animertroficial" title="YouTube"><i class="fa fa-youtube-play"></i></a>
    <a href="https://www.descargasrtr.com/p/donar.html" title="Donar"><i class="fa fa-paypal"></i></a>
  </div>
</div>

<!-- JS -->
<script src="/assets/js/header.js"></script>
