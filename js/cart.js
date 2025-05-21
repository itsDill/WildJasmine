// Get cart from localStorage
function getCart() {
    const cartData = localStorage.getItem('wildJasmineCart');
    return cartData ? JSON.parse(cartData) : [];
}

// Save cart to localStorage and update display
function saveCart(cart) {
    localStorage.setItem('wildJasmineCart', JSON.stringify(cart));
    updateCartDisplay();
}

// Add item to cart
function addToCart(productId, productName, productPrice, productImage) {
    const cart = getCart();
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            id: productId,
            name: productName,
            price: productPrice,
            image: productImage,
            quantity: 1
        });
    }
    saveCart(cart);
}

// Remove item from cart
function removeFromCart(productId) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== productId);
    saveCart(cart);
}

// Update quantity of an item
function updateQuantity(productId, newQuantity) {
    let cart = getCart();
    const itemToUpdate = cart.find(item => item.id === productId);
    if (itemToUpdate) {
        itemToUpdate.quantity = newQuantity;
        if (itemToUpdate.quantity < 1) {
            removeFromCart(productId);
            return;
        }
        saveCart(cart);
    }
}

// Clear the cart
function clearCart() {
    localStorage.removeItem('wildJasmineCart');
    updateCartDisplay();
}

// Get total price
function getTotal() {
    const cart = getCart();
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
}

// Update cart count in header
function updateCartDisplay() {
    const cart = getCart();
    const cartCountElement = document.querySelector('.cart-count');
    if (cartCountElement) {
        const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCountElement.textContent = totalCount;
    }
    // Optionally update cart items elsewhere on the page
    // const cartItemsContainer = document.querySelector('.cart-items');
    // if (cartItemsContainer) { ... }
}

// Listen for add-to-cart button clicks (for dynamically generated products)
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('add-to-cart')) {
        // Find product info from DOM
        const productCard = event.target.closest('.product-card');
        if (productCard) {
            const productName = productCard.querySelector('.product-title')?.textContent?.trim() || '';
            const productPriceText = productCard.querySelector('.price')?.textContent?.replace('$', '') || '0';
            const productPrice = parseFloat(productPriceText);
            const productImage = productCard.querySelector('.product-img')?.getAttribute('src') || '';
            const productId = productName.toLowerCase().replace(/\s+/g, '-'); // Simple slug as ID

            addToCart(productId, productName, productPrice, productImage);
        }
    }
});

// Initialize cart display on page load
document.addEventListener('DOMContentLoaded', updateCartDisplay);