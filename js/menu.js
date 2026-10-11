const menuBtn = document.getElementById('menu-btn');
const menu = document.getElementById('menu');

if (menuBtn && menu) {
    function definirMenuAberto(aberto) {
        menu.classList.toggle('menu-aberto', aberto);
        menuBtn.setAttribute('aria-expanded', String(aberto));
        menuBtn.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
    }

    menuBtn.setAttribute('aria-controls', menu.id);
    definirMenuAberto(false);

    menuBtn.addEventListener('click', function () {
        const aberto = menuBtn.getAttribute('aria-expanded') !== 'true';
        definirMenuAberto(aberto);
    });

    menu.addEventListener('keydown', function (evento) {
        if (evento.key === 'Escape') {
            definirMenuAberto(false);
            menuBtn.focus();
        }
    });
}
