function createPageProduct(product) {
    const page = document.createElement('div');
    page.classList.add('grid', 'grid-cols-1', 'gap-1', 'justify-items-center', 'md:grid-cols-2');

    page.innerHTML = `
        <!-- Слайдер -->
        <div class="relative h-[500px] max-w-xs rounded-lg overflow-hidden md:max-w-md md:h-[700px]">
            <div id="slider" class="grid grid-cols-3 transition-transform duration-500 ease-in-out h-full w-full">
                <div class="h-full flex items-center justify-center">
                    <img src="${product.image1}" class="h-full object-cover" alt="${product.title}">
                </div>
                <div class="h-full flex items-center justify-center">
                    <img src="${product.image2}" class="h-full object-cover" alt="${product.title}">
                </div>
                <div class="h-full flex items-center justify-center">
                    <img src="${product.image3}" class="h-full object-cover" alt="${product.title}">
                </div>
            </div>

            <!-- Кнопки переключения -->
            <button id="prev" class="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-4 py-2 rounded-full opacity-75 hover:opacity-100 transition-opacity duration-300">
                <
            </button>
            <button id="next" class="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-4 py-2 rounded-full opacity-75 hover:opacity-100 transition-opacity duration-300">
                >
            </button>
        </div>

        <!-- Контент справа -->
        <div class="grid grid-rows-4 md:p-24">
            <h1 class="text-2xl font-bold">${product.title}</h1>
            <div class="text-2xl font-bold text-purple-700">${product.originalPrice} ₽</div>
            <p class="">Описание товара: ${product.description}</p>
            <button onclick="addProduct(${product.id})" class="grid grid-cols-8 bg-blue-500 rounded-2xl max-h-16 text-white items-center p-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 col-span-1">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                </svg>
                <p class="col-span-6">В корзину</p>
            </button>
        </div>
    `;
    return page;
}

function addProduct(id) {
    fetch('../product.json')
        .then(response => response.json())
        .then(products => {
            const product = products.find(product => product.id === Number(id));
            if (product) {
                // Получаем текущее состояние корзины из localStorage
                let cart = JSON.parse(localStorage.getItem('products')) || [];

                const existingProduct = cart.find(item => item.id === product.id);
                if (existingProduct) {
                    // Если товар уже есть в корзине, увеличиваем количество
                    existingProduct.quantity += product.quantity;
                } else {
                    // Если товара нет в корзине, добавляем его
                    cart.push(product);
                }

                // Сохраняем обновлённую корзину в localStorage
                localStorage.setItem('products', JSON.stringify(cart));

                updateCartCount();

                alert('Товар добавлен в корзину!'); // Сообщение об успешном добавлении
            } else {
                console.error('Продукт не найден');
            }
        })
        .catch(error => console.error('Ошибка при загрузке данных:', error));
}

// Загрузка данных о товарах и создание страницы товара
fetch("../product.json")
    .then(response => response.json())
    .then(products => {
        // Получаем ID товара из URL
        const urlParams = new URLSearchParams(window.location.search);
        const productId = Number(urlParams.get('id'));

        // Поиск товара по ID
        const product = products.find(p => p.id === productId);

        if (product) {
            // Создаем и добавляем страницу товара
            const productPage = createPageProduct(product);
            document.getElementById('cards-page').appendChild(productPage);

            // Инициализация слайдера
            initializeSlider();
        } else {
            // Если товар не найден, показываем сообщение
            document.getElementById('cards-page').innerHTML = '<p>Товар не найден.</p>';
        }
    })
    .catch(error => {
        console.error('Ошибка при загрузке данных:', error);
        document.getElementById('cards-page').innerHTML = '<p>Ошибка загрузки данных о товаре.</p>';
    });

function initializeSlider() {
    const slider = document.getElementById('slider');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    const totalSlides = slider.children.length;
    slider.style.width = `${totalSlides * 100}%`;

    let currentIndex = 0;

    // Функция для обновления положения слайдера
    function updateSlider() {
        slider.style.transform = `translateX(-${currentIndex * 33.3}%)`;
    }

    // Программное назначение обработчиков для кнопок
    prevButton.addEventListener('click', function() {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateSlider();
    });

    nextButton.addEventListener('click', function() {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateSlider();
    });
}