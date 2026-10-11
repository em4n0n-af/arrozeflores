(() => {
    const campoBuscaAutores = document.getElementById('busca-autores');
    const resultadoBuscaAutores = document.getElementById('resultado-busca');
    const listaAutores = document.querySelector('.alfabetica');

    if (!campoBuscaAutores || !resultadoBuscaAutores || !listaAutores) {
        return;
    }

    const autores = Array.from(listaAutores.querySelectorAll('.autor'));
    const letras = Array.from(listaAutores.querySelectorAll('h2'));
    function normalizarTexto(texto) {
        return texto
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLocaleLowerCase('pt-BR')
            .trim();
    }

    function filtrarAutores() {
        const consulta = normalizarTexto(campoBuscaAutores.value);
        autores.forEach(function (autor) {
            const corresponde = normalizarTexto(autor.textContent).includes(consulta);
            autor.hidden = !corresponde;
        });

        letras.forEach(function (letra) {
            let proximo = letra.nextElementSibling;
            let temAutorVisivel = false;

            while (proximo && proximo.tagName !== 'H2') {
                if (proximo.classList.contains('autor') && !proximo.hidden) {
                    temAutorVisivel = true;
                    break;
                }
                proximo = proximo.nextElementSibling;
            }

            letra.hidden = !temAutorVisivel;
        });

        resultadoBuscaAutores.textContent = consulta && !autores.some(function (autor) {
            return !autor.hidden;
        })
            ? 'Nenhum autor encontrado.'
            : '';
    }

    campoBuscaAutores.addEventListener('input', filtrarAutores);
    filtrarAutores();
})();
