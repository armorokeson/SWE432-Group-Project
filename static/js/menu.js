document.addEventListener('DOMContentLoaded', function() {
    const menuButton = document.getElementById('menuButton');
    const menu = document.getElementById('menu');

    // Toggle the menu visibility when the button is clicked
    menuButton.addEventListener('click', function() {
        if (menu.style.display === 'none' || menu.style.display === '') {
            menu.style.display = 'block';
        } else {
            menu.style.display = 'none';
        }
    });
});