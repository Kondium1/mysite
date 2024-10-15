const modalContainer = document.getElementById('modal-container');

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

function openModal(product) {
    modalContainer.innerHTML = `
        <div class="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-10">
            <div class="grid grid-cols-2 bg-white rounded-lg p-6 w-full max-w-lg relative">
                <button id="closeModalBtn" class="absolute col-start-2 top-2 right-2 text-gray-500 hover:text-gray-700">&times;</button>
                <h2 class="col-start-2 text-xl font-bold mb-4">${product.title}</h2>
                <img class="col-start-1 w-full pr-10 h-64 object-cover" src="${product.image1}" alt="${product.title}">
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