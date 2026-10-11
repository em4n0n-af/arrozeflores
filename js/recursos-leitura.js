(() => {
    const secaoTexto = document.querySelector('.texto');

    if (!secaoTexto) {
        return;
    }

    const controles = document.createElement('div');
    controles.className = 'controles-leitura';
    controles.setAttribute('role', 'group');
    controles.setAttribute('aria-label', 'Controles de leitura');

    const elementoRaiz = document.documentElement;
    let escalaAtual = 1;

    function criarBotao(rotulo, texto, acao) {
        const botao = document.createElement('button');
        botao.type = 'button';
        botao.textContent = texto;
        botao.setAttribute('aria-label', rotulo);
        botao.addEventListener('click', acao);
        controles.appendChild(botao);
    }

    const indicadorTamanho = document.createElement('span');
    indicadorTamanho.className = 'tamanho-leitura';
    indicadorTamanho.setAttribute('aria-live', 'polite');

    function atualizarTamanho(escala) {
        escalaAtual = Math.min(1.5, Math.max(0.85, escala));
        elementoRaiz.style.setProperty('--escala-leitura', escalaAtual);
        indicadorTamanho.textContent = `${Math.round(escalaAtual * 100)}%`;
    }

    criarBotao('Diminuir tamanho do texto', 'A−', function () {
        atualizarTamanho(escalaAtual - 0.1);
    });
    controles.appendChild(indicadorTamanho);
    criarBotao('Aumentar tamanho do texto', 'A+', function () {
        atualizarTamanho(escalaAtual + 0.1);
    });
    criarBotao('Restaurar tamanho original do texto', 'Tamanho original', function () {
        elementoRaiz.style.removeProperty('--escala-leitura');
        escalaAtual = 1;
        indicadorTamanho.textContent = '100%';
    });
    criarBotao('Imprimir ou salvar como PDF', 'Imprimir / salvar PDF', function () {
        window.print();
    });
    secaoTexto.parentNode.insertBefore(controles, secaoTexto);
    indicadorTamanho.textContent = '100%';

    const botaoVoltarAoInicio = document.createElement('button');
    botaoVoltarAoInicio.type = 'button';
    botaoVoltarAoInicio.className = 'voltar-topo';
    botaoVoltarAoInicio.textContent = '↑';
    botaoVoltarAoInicio.setAttribute('aria-label', 'Voltar ao início da página');
    botaoVoltarAoInicio.hidden = true;
    botaoVoltarAoInicio.addEventListener('click', function () {
        const comportamento = window.matchMedia('(prefers-reduced-motion: reduce)').matches
            ? 'auto'
            : 'smooth';
        window.scrollTo({ top: 0, behavior: comportamento });
    });
    document.body.appendChild(botaoVoltarAoInicio);

    function atualizarVisibilidadeVoltarAoInicio() {
        botaoVoltarAoInicio.hidden = window.scrollY < 500;
    }

    window.addEventListener('scroll', atualizarVisibilidadeVoltarAoInicio, { passive: true });
    atualizarVisibilidadeVoltarAoInicio();
})();
