(function(){

  function isMobile(){
    return window.innerWidth <= 768;
  }

  let zoom = isMobile() ? 0.80 : 1.00;

  const step = 0.05;
  const minZoom = 0.60;
  const maxZoom = 1.20;

  function isFirefox(){
    return navigator.userAgent.toLowerCase().includes('firefox');
  }

  function applyZoom(){
    if(!isFirefox()){
      document.documentElement.style.zoom = zoom;
      document.documentElement.style.transform = '';
      document.documentElement.style.width = '';
    } else {
      document.documentElement.style.zoom = '';
      document.documentElement.style.transformOrigin = 'top left';
      document.documentElement.style.transform = `scale(${zoom})`;
      document.documentElement.style.width = `calc(100% / ${zoom})`;
    }

    const readout = document.getElementById('zoom-readout');
    if(readout){
      readout.textContent = Math.round(zoom * 100) + '%';
    }

    localStorage.setItem('siteZoom', zoom);
  }

  window.addEventListener('DOMContentLoaded', () => {

    const widget  = document.getElementById('zoomWidget');
    const toggle  = document.getElementById('zoomToggle');

    const saved = parseFloat(localStorage.getItem('siteZoom'));
    if(!isNaN(saved)){
      zoom = Math.min(maxZoom, Math.max(minZoom, saved));
    }

    document.getElementById('zIn').onclick = () => {
      zoom = Math.min(maxZoom, +(zoom + step).toFixed(2));
      applyZoom();
    };

    document.getElementById('zOut').onclick = () => {
      zoom = Math.max(minZoom, +(zoom - step).toFixed(2));
      applyZoom();
    };

    document.getElementById('zReset').onclick = () => {
      zoom = isMobile() ? 0.80 : 1.00;
      applyZoom();
    };

    toggle.onclick = () => {
      widget.dataset.open = widget.dataset.open === "1" ? "0" : "1";
    };

    document.addEventListener('click', (e) => {
      if(!widget.contains(e.target)){
        widget.dataset.open = "0";
      }
    });

    applyZoom();
  });

})();
