(function(){
  const widget  = document.getElementById(&#39;zoomWidget&#39;);
  const toggle  = document.getElementById(&#39;zoomToggle&#39;);
  const readout = document.getElementById(&#39;zoom-readout&#39;);

  // &#9989; Zoom por defecto
  function isMobile(){
  return /android|iphone|ipad|ipod|opera mini|iemobile|wpdesktop/i.test(navigator.userAgent.toLowerCase());
}

// ✅ Zoom por defecto según dispositivo
let zoom = isMobile() ? 0.80 : 1.00;
  const step = 0.05;
  const minZoom = 0.60;
  const maxZoom = 1.20;

  function isFirefox(){
    return navigator.userAgent.toLowerCase().includes(&#39;firefox&#39;);
  }

  function applyZoom(){
    // Chrome/Edge/Brave: zoom real (reflow)
    if(!isFirefox()){
      document.documentElement.style.zoom = zoom;
      document.documentElement.style.transform = &#39;&#39;;
      document.documentElement.style.width = &#39;&#39;;
    } else {
      // Firefox fallback
      document.documentElement.style.zoom = &#39;&#39;;
      document.documentElement.style.transformOrigin = &#39;top left&#39;;
      document.documentElement.style.transform = `scale(${zoom})`;
      document.documentElement.style.width = `calc(100% / ${zoom})`;
    }

    readout.textContent = Math.round(zoom * 100) + &#39;%&#39;;
    localStorage.setItem(&#39;siteZoom&#39;, String(zoom));
  }

  // cargar guardado
  const saved = parseFloat(localStorage.getItem(&#39;siteZoom&#39;));
  if(!Number.isNaN(saved)) zoom = Math.min(maxZoom, Math.max(minZoom, saved));

  // botones
  document.getElementById(&#39;zIn&#39;).onclick = () =&gt; {
    zoom = Math.min(maxZoom, +(zoom + step).toFixed(2));
    applyZoom();
  };
  document.getElementById(&#39;zOut&#39;).onclick = () =&gt; {
    zoom = Math.max(minZoom, +(zoom - step).toFixed(2));
    applyZoom();
  };
  document.getElementById(&#39;zReset&#39;).onclick = () =&gt; {
    function isMobile(){
  zoom = isMobile() ? 0.80 : 1.00;
    applyZoom();
  };

  // desplegar
  toggle.onclick = () =&gt; {
    widget.dataset.open = (widget.dataset.open === &quot;1&quot;) ? &quot;0&quot; : &quot;1&quot;;
  };

  // cerrar al click afuera
  document.addEventListener(&#39;click&#39;, (e) =&gt; {
    if(!widget.contains(e.target)) widget.dataset.open = &quot;0&quot;;
  });

  // aplicar
  applyZoom();
})();
