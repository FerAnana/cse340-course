document.querySelector('.menu-toggle').addEventListener('click', () => {
    document.querySelector('.menu-toggle').classList.toggle('active');
    document.getElementById('nav-bar').classList.toggle('active');
});