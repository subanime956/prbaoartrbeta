fetch('data.json')
  .then(res => res.json())
  .then(data => {

    const input = document.getElementById('search');
    const resultados = document.getElementById('resultados');

    input.addEventListener('input', () => {
      const valor = input.value.toLowerCase();
      resultados.innerHTML = '';

      const filtrados = data.filter(item =>
        item.titulo.toLowerCase().includes(valor)
      );

      filtrados.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('card');

        div.innerHTML = `
          <a href="${item.url}" style="text-decoration:none; color:white;">
            <img src="${item.imagen}">
            <p>${item.titulo}</p>
          </a>
        `;

        resultados.appendChild(div);
      });
    });

  });
