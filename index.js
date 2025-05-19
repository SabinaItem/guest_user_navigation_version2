document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.nav-toggle');
    const navCenter = document.querySelector('.nav-center');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navCenter.classList.toggle('active');
    });
});