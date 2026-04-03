
  document.addEventListener("DOMContentLoaded", function () {
    function asignarLink(id, url) {
      const enlace = document.getElementById(id);
      if (enlace) {
        enlace.href = url;
        enlace.target = "_blank";
        enlace.rel = "noopener noreferrer";
      }
    }

    // Redes sociales - PC
    asignarLink("social-twitter-pc", "https://x.com/sitiosrtr");
    asignarLink("social-whatsapp-pc", "https://whatsapp.com/channel/0029Vb5iKDyIiRooDhF2Dj1J");
    asignarLink("social-facebook-pc", "https://www.facebook.com/AnimeRTRh");
    asignarLink("social-youtube-pc", "https://www.youtube.com/@animertroficial");
    asignarLink("social-donar-pc", "https://www.descargasrtr.com/p/donar.html");

    // Redes sociales - Móvil
    asignarLink("social-twitter-mobile", "https://x.com/sitiosrtr");
    asignarLink("social-whatsapp-mobile", "https://whatsapp.com/channel/0029Vb5iKDyIiRooDhF2Dj1J");
    asignarLink("social-facebook-mobile", "https://www.facebook.com/AnimeRTRh");
    asignarLink("social-youtube-mobile", "https://www.youtube.com/@animertroficial");
    asignarLink("social-donar-mobile", "https://www.descargasrtr.com/p/donar.html");
  });

 function toggleMenu() {
    const menu = document.getElementById("mobileMenu");
    const overlay = document.getElementById("menuOverlay");
    const body = document.body;

    const isOpen = menu.classList.toggle("open");
    overlay.classList.toggle("active");

    if (isOpen) {
      body.classList.add("no-scroll");
    } else {
      body.classList.remove("no-scroll");
    }
  }

  function closeMenu() {
    const menu = document.getElementById("mobileMenu");
    const overlay = document.getElementById("menuOverlay");
    const body = document.body;

    menu.classList.remove("open");
    overlay.classList.remove("active");
    body.classList.remove("no-scroll");
  }

  function closeMenuOnResize() {
    if (window.innerWidth > 1000) {
      closeMenu();
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    const overlay = document.getElementById("menuOverlay");
    const menu = document.getElementById("mobileMenu");
    const body = document.body;

    overlay.addEventListener("click", function (e) {
      if (!menu.contains(e.target)) {
        closeMenu();
      }
    });

    // Cerrar menú al cargar si es pantalla grande
    closeMenuOnResize();

    // Cerrar menú al redimensionar si pasa los 1000px
    window.addEventListener("resize", closeMenuOnResize);
  });

  function closeMobileMenuOnResize() {
    const menu = document.getElementById('mobileMenu');
    const overlay = document.getElementById('menuOverlay');

    // Si pantalla es grande y el menú está abierto
    if (window.innerWidth > 1000) {
      if (menu.classList.contains('open')) {
        menu.classList.remove('open');
      }

      if (overlay.classList.contains('active')) {
        overlay.classList.remove('active');
      }

      // Restaurar scroll global
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
  }

  // Ejecutar al cargar y redimensionar
  window.addEventListener('resize', closeMobileMenuOnResize);
  window.addEventListener('load', closeMobileMenuOnResize);