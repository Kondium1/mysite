const elements = {
    cartVoidText: document.getElementById('cartVoidText'),
    container: document.getElementById('cartContainer'),
    container1: document.getElementById('cartContainer1')
};

let amount = 0;

function createCartProduct(product) {
    const price = product.originalPrice * product.quantity;
    const page = document.createElement('div');
    page.classList.add("grid", "grid-cols-2auto", "md:grid-cols-3", "shadow-md", "rounded-2xl", "p-2", "min-h-48", "gap-2");
    page.innerHTML = `
        <div class="col-start-1">
            <img class="w-36 h-36" src="${product.image1}" alt="${product.title}">
        </div>
        <div class="grid max-w-40 col-start-1 grid-cols-3 md:col-start-3 md:items-center">
            <button onclick="updateQuantity(${product.id}, -1)" class="justify-self-end h-10 w-10 bg-gray-300 rounded-md hover:bg-gray-400"> - </button>
                <label class="rounded-md">
                 <input id="quantity-${product.id}" class="w-full h-full text-center outline-none" type="number" min="1" maxlength="2" content="2" value="${product.quantity}" readonly>
                </label>
            <button onclick="updateQuantity(${product.id}, 1)" class="justify-self-start h-10 w-10 bg-gray-300 rounded-md hover:bg-gray-400"> + </button>
        </div>
        <div class="col-start-2 row-start-1">
          <p class="">${product.title}</p>
          <p id="price-${product.id}" class="text-purple-700 font-bold text-2xl">${price} ₽</p>
        </div>
    `;
    return page;
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
        product.quantity = Math.max(1, product.quantity + change);
        if (product.quantity === 0) cart = cart.filter(p => p.id !== productId);  // Удаление товара

        localStorage.setItem('products', JSON.stringify(cart));
        displayCartProducts();  // Перерисовываем корзину
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
