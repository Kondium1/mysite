const elements = {
    cartVoidText: document.getElementById('cartVoidText'),
    container: document.getElementById('cartContainer'),
    container1: document.getElementById('cartContainer1')
};

let amount = 0;

function createCartProduct(product) {
    const price = product.originalPrice * product.quantity;
    const page = document.createElement('div');
    page.classList.add("grid", "grid-cols-2auto", "md:grid-cols-3", "shadow-md", "rounded-2xl", "p-2", "min-h-48", "gap-2", "rounded-md");
    page.innerHTML = `
        <div class="grid group relative justify-items-center items-center">
            <a href="ProductPage.html?id=${product.id}" class="col-start-1 rounded-md">
                <img class="object-cover h-28 w-24 md:w-48 md:h-52" src="${product.image1}" alt="${product.title}">
            </a>
            <button onclick="quickView(${product.id})" class="absolute bottom-8 left-1/2 rounded-md transform -translate-x-1/2 bg-blue-500 text-white px-4 py-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                Быстрый просмотр 
            </button>
        </div>
        <div class="grid max-w-40 col-start-1 grid-cols-3 self-center md:col-start-3 md:justify-self-center md:self-center">
            <button onclick="updateQuantity(${product.id}, -1)" class="justify-self-end h-8 w-8 bg-gray-300 rounded-md hover:bg-gray-400"> - </button>
                <label class="rounded-md">
                 <input id="quantity-${product.id}" class="w-full h-full text-center outline-none" type="number" maxlength="2" content="2" value="${product.quantity}" readonly>
                </label>
            <button onclick="updateQuantity(${product.id}, 1)" class="justify-self-start h-8 w-8 bg-gray-300 rounded-md hover:bg-gray-400"> + </button>
        </div>
        <div class="col-start-2 row-start-1">
          <a href="ProductPage.html?id=${product.id}">${product.title}</a>
          <p id="price-${product.id}" class="text-purple-700 font-bold text-2xl">${price} ₽</p>
        </div>
        <button onclick="deleteProduct(${product.id})" class="bg-gray-300 p-1 rounded-md hover:bg-red-500 duration-200 justify-self-end md:justify-self-center md:self-center md:p-2 col-start-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
            </svg>
        </button>
    `;
    return page;
}

function deleteProduct(productId){
    let cart = JSON.parse(localStorage.getItem('products'));
    const product = cart.find(p => p.id === productId);

    if (product) {
        cart = cart.filter(p => p.id !== productId);
        localStorage.setItem('products', JSON.stringify(cart));
        displayCartProducts();
        updateCartCount();
    }
}

// Создание общего блока корзины
function createCartSummary(count) {
    const page = document.createElement('div');
    page.classList.add("grid", "grid-cols-2", "grid-rows-3", "shadow-md", "p-2", "rounded-md");
    page.innerHTML = `
        <p class="col-start-1 p-4">Товары, ${count} шт.</p>
        <p class="col-start-2 p-4">${amount} ₽</p>
        <p class="col-start-1 p-4">Итого</p>
        <p class="col-start-2 p-4">${amount} ₽</p>
        <button onclick="applyOrderButton()" class="col-span-2 bg-blue-400 text-white rounded-md hover:bg-blue-500">Заказать</button>
    `;
    return page;
}

// Обновление количества товара
function updateQuantity(productId, change) {
    let cart = JSON.parse(localStorage.getItem('products'));
    const product = cart.find(p => p.id === productId);

    if (product) {
        product.quantity = Math.max(0, product.quantity + change);
        if (product.quantity === 0){
            cart = cart.filter(p => p.id !== productId);
        }


        localStorage.setItem('products', JSON.stringify(cart));
        displayCartProducts();
        updateCartCount();
    }
}


// Функция для оформления заказа
function applyOrderButton() {
    elements.container.innerHTML = '';
    elements.container1.innerHTML = '';
    elements.cartVoidText.classList.replace('hidden', 'flex');
    localStorage.removeItem('products');
    updateCartCount();
}

// Рассчитываем и отображаем корзину
function displayCartProducts() {
    amount = 0;
    elements.container1.innerHTML = '';
    elements.container.innerHTML = '';
    let cart = JSON.parse(localStorage.getItem('products')) || [];

    if (cart.length) {
        elements.cartVoidText.classList.replace('flex', 'hidden');
        cart.forEach(product => {
            amount += product.originalPrice * product.quantity;
            elements.container.appendChild(createCartProduct(product));
        });
        elements.container1.appendChild(createCartSummary(cart.length));
    } else {
        elements.cartVoidText.classList.replace('hidden', 'flex');
    }
}

// Инициализация при загрузке страницы
window.onload = displayCartProducts;
