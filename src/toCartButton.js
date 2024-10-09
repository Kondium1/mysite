const header = document.getElementById('header');
const header_sm = document.getElementById('header_sm');
const url = 'сart.html';
function createToCartButtonForPC(url) {
    const button = document.createElement('a');
    button.href = url;
    button.classList.add('hidden');
    button.classList.add('md:flex');
    button.classList.add('justify-center');
    button.classList.add('md:col-span-1');
    button.classList.add('md:col-start-12');
    button.innerHTML = `
        <button class="relative p-2 rounded-md focus:outline-none hover:bg-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                </svg>
                <span id="cartCount" class="absolute top-0 right-0 bg-red-600 text-white rounded-full w-5 h-5 text-sm flex items-center justify-center">0</span>
        </button>
      `;
    return button;
}

function createToCartButtonForSM(url) {
    const button = document.createElement('a');
    button.href = url;
    button.classList.add('flex');
    button.classList.add('items-center');
    button.classList.add('justify-center');
    button.innerHTML = `
        <button class="relative">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
            </svg>
            <span id="cartCount1" class="absolute top-0 right-0 bg-red-600 text-white rounded-full w-4 h-4 text-sm flex items-center justify-center">0</span>
        </button>
      `;
    return button;
}


const btn = createToCartButtonForPC(url);
const btn2 = createToCartButtonForSM(url);
header.appendChild(btn);
header_sm.appendChild(btn2)

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('products')) || [];

    const totalItems = cart.reduce((sum, product) => sum + product.quantity, 0);

    const cartCountElement = document.getElementById('cartCount');
    const cartCountElement1 = document.getElementById('cartCount1');

    if (cartCountElement) {
        cartCountElement.textContent = totalItems;
    }
    if (cartCountElement1) {
        cartCountElement1.textContent = totalItems;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
});




