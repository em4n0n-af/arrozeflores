// Captura o botão de menu e o próprio menu
const menuBtn = document.getElementById('menu-btn');
const menu = document.getElementById('menu');

// Adiciona o evento de clique para abrir/fechar o menu
menuBtn.addEventListener('click', function() {
    menu.classList.toggle('menu-aberto'); // Alterna entre abrir e fechar
});
