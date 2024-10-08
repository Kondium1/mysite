/*Контейнер карточек*/
const cardsContainer = document.getElementById('cards-container');
const paginationContainer = document.getElementById('pagination');
const modalContainer = document.getElementById('modal-container');
const toTopBtn = document.getElementById('toTopBtn');
const productsPerPage = 20;
let currentPage = 1;
let filteredProducts = [];
let isNet;
const netnine = document.getElementById('net-nine');
const netfour = document.getElementById('net-four');

const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get('category');

window.onscroll = function () {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        toTopBtn.classList.remove('hidden');
    } else {
        toTopBtn.classList.add('hidden');
    }
};

toTopBtn.addEventListener('click', function () {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

function toggleGrid(isNine) {
    netnine.classList.toggle('text-black', isNine);
    netnine.classList.toggle('text-gray-400', !isNine);
    netfour.classList.toggle('text-black', !isNine);
    netfour.classList.toggle('text-gray-400', isNine);
    isNet = isNine;
    cardsContainer.classList.toggle('lg:grid-cols-6', isNine);
    cardsContainer.classList.toggle('lg:grid-cols-5', !isNine);
    cardsContainer.classList.toggle('md:grid-cols-5', isNine);
    cardsContainer.classList.toggle('md:grid-cols-4', !isNine);
}

netnine.onclick = () => toggleGrid(true);
netfour.onclick = () => toggleGrid(false);

function changePage(pageNumber) {
    currentPage = pageNumber;
    displayProducts();
    setupPagination();
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.classList.add('grid', 'bg-white', 'shadow-md', 'rounded-lg', 'overflow-hidden', 'w-60', 'group', 'relative', 'w-full', 'h-full',
        'rounded', 'transition', 'grid-rows-4auto');

    card.innerHTML = `
        <a href="ProductPage.html?id=${product.id}" class="block rounded-md">
            <div class="h-58 flex items-center justify-center overflow-hidden">
                <img class="object-cover w-full h-full" src="${product.image1}" alt="${product.title}">
            </div>
        </a>
        <button onclick="quickView(${product.id})" class="absolute bottom-1/3 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-2 rounded-md opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            Быстрый просмотр 
       </button>
        <div class="text-purple-700 font-bold text-2xl p-2">${product.originalPrice} ₽</div>
        <a href="ProductPage.html?id=${product.id}" class="block px-2">${product.title}</a>
        <button onclick="addProduct(${product.id})" id="addToCart" class="p-2 grid grid-cols-8 w-full bg-blue-500 text-white rounded-md">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 col-span-1">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
            </svg>
            <p class="col-span-6">В корзину</p>
        </button>
    `;
    return card;
}

function openModal(product) {
    modalContainer.innerHTML = `
        <div class="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-10">
            <div class="grid grid-cols-2 bg-white rounded-lg p-6 w-full max-w-lg relative">
                <button id="closeModalBtn" class="absolute col-start-2 top-2 right-2 text-gray-500 hover:text-gray-700">&times;</button>
                <h2 class="col-start-2 text-xl font-bold mb-4">${product.title}</h2>
                <img class="col-start-1 w-full h-64 object-cover mb-4" src="${product.image1}" alt="${product.title}">
                <p class="mb-4">${product.description}</p>
                <div class="col-start-2 text-purple-700 font-bold text-2xl mb-4">${product.originalPrice} ₽</div>
                <button id="addToCartModal" onclick="addProduct(${product.id})" class="col-start-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">Добавить в корзину</button>
            </div>
        </div>
    `;
    modalContainer.classList.remove('hidden');

    document.getElementById('closeModalBtn').onclick = () => {
        modalContainer.classList.add('hidden');
    };
}

// Функция для быстрого просмотра товара
function quickView(productId) {
    fetch('../product.json')
        .then(response => response.json())
        .then(products => {
            const product = products.find(item => item.id === productId);
            if (product) {
                openModal(product); // Открыть модальное окно с данными товара
            }
        })
        .catch(error => console.error('Ошибка при загрузке данных:', error));
}


function addProduct(id) {
    fetch('../product.json')
        .then(response => response.json())
        .then(products => {
            const product = products.find(product => product.id === Number(id));
            if (product) {
                let cart = JSON.parse(localStorage.getItem('products')) || [];

                const existingProduct = cart.find(item => item.id === product.id);
                if (existingProduct) {
                    existingProduct.quantity += product.quantity;
                } else {
                    cart.push(product);
                }
                localStorage.setItem('products', JSON.stringify(cart));

                updateCartCount();
            } else {
                console.error('Продукт не найден');
            }
        })
        .catch(error => console.error('Ошибка при загрузке данных:', error));
}


function displayProducts() {
    const start = (currentPage - 1) * productsPerPage;
    const end = start + productsPerPage;
    const productsToShow = filteredProducts.slice(start, end);

    cardsContainer.innerHTML = '';

    productsToShow.forEach(product => {
        const productCard = createProductCard(product);
        cardsContainer.appendChild(productCard);

    });
}

function setupPagination() {
    paginationContainer.innerHTML = '';

    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.textContent = i;
        pageButton.classList.add('px-4', 'py-2', 'bg-gray-300', 'hover:bg-gray-400', 'rounded', 'mx-1');

        if (i === currentPage) {
            pageButton.classList.add('text-white');
        }

        pageButton.addEventListener('click', () => changePage(i));

        paginationContainer.appendChild(pageButton);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    localStorage.setItem('categories', JSON.stringify(category));
});

fetch('../product.json')
    .then(response => response.json())
    .then(products => {
        filteredProducts = products.filter(product => product.category === category);
        displayProducts();
        setupPagination();
    })
    .catch(error => console.error('Ошибка при загрузке данных:', error));

