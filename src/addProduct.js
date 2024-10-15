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
            } else {
                console.error('Продукт не найден');
            }
        })
        .catch(error => console.error('Ошибка при загрузке данных:', error));
}