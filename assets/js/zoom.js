(function(){
  // Zoom predeterminado 80%
  const zoom = 0.80;

  function isFirefox(){
    return navigator.userAgent.toLowerCase().includes('firefox');
  }

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
})();
