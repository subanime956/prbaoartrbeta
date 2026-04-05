(function(){
  const widget  = document.getElementById('zoomWidget');
  const toggle  = document.getElementById('zoomToggle');
  const readout = document.getElementById('zoom-readout');

  // ✅ Zoom por defecto
  let zoom = 0.90;
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
    readout.textContent = Math.round(zoom * 100) + '%';
    localStorage.setItem('siteZoom', String(zoom));
  }

  // cargar guardado
  const saved = parseFloat(localStorage.getItem('siteZoom'));
  if(!Number.isNaN(saved)) zoom = Math.min(maxZoom, Math.max(minZoom, saved));

  // botones
  const zIn = document.getElementById('zIn');
  const zOut = document.getElementById('zOut');
  const zReset = document.getElementById('zReset');

  if(zIn) zIn.onclick = () => { zoom = Math.min(maxZoom, +(zoom + step).toFixed(2)); applyZoom(); };
  if(zOut) zOut.onclick = () => { zoom = Math.max(minZoom, +(zoom - step).toFixed(2)); applyZoom(); };
  if(zReset) zReset.onclick = () => { zoom = 0.90; applyZoom(); };

  // desplegar
  toggle.onclick = (e) => {
    e.stopPropagation();
    widget.dataset.open = widget.dataset.open === "1" ? "0" : "1";
  };

  // cerrar al click afuera
  document.addEventListener('click', (e) => {
    if(!widget.contains(e.target)) widget.dataset.open = "0";
  });

  // aplicar zoom inicial
  applyZoom();
})();
