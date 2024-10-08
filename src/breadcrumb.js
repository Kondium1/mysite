function generateBreadcrumbs() {
    const breadcrumb = document.getElementById('breadcrumbs');
    const urlParams = new URLSearchParams(window.location.search);
    const category = JSON.parse(localStorage.getItem('categories')) || [];
    const productId = urlParams.get('id');

    const homeCrumb = `<li><a href="index.html" class="text-blue-500 hover:underline">Home</a></li>`;
    breadcrumb.innerHTML += homeCrumb;

    if (category) {
        const isCategoryPage = window.location.search.includes(`category`);
        const categoryCrumb = `
        <li><span class="mx-2">/</span>
        ${isCategoryPage ? `<span>${category}</span>` : `<a href="category.html?category=${category}" class="text-blue-500 hover:underline">${category}</a>`}
        </li>`;
        breadcrumb.innerHTML += categoryCrumb;
    }

    if (productId) {
        const isProductPage = window.location.search.includes(`id`);
        const productCrumb = `
        <li><span class="mx-2">/</span>
        ${isProductPage ? `<span>Товар #${productId}</span>` : `<a href="ProductPage.html?id=${productId}" class="text-blue-500 hover:underline">Товар #${productId}</a>`}
        </li>`;
        breadcrumb.innerHTML += productCrumb;
    }
}
document.addEventListener('DOMContentLoaded', generateBreadcrumbs);