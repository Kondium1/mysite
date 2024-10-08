const menu = document.getElementById('menu');
const menuButtonPC = document.getElementById('menuButtonPC');
const menuButtonPhone = document.getElementById('menuButtonPhone');
const backButtonMenu = document.getElementById('backButtonMenu');

const overlay = document.getElementById('overlay');

menuButtonPC.onclick = function () {
    menu.classList.toggle("-translate-x-full");
    overlay.classList.remove("hidden");
}

menuButtonPhone.onclick = function () {
    menu.classList.toggle("-translate-x-full");
}

backButtonMenu.onclick = function () {
    menu.classList.toggle("-translate-x-full");
}

overlay.onclick = function () {
    menu.classList.toggle("-translate-x-full");
    overlay.classList.add("hidden");
}

