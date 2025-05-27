// --- Product Data ---
const products = [
    {
        id: 'rose-clay-mask',
        name: 'Rose Clay Facial Mask',
        description: 'A luxurious clay mask infused with rose petals and botanical extracts to purify and rejuvenate your skin, leaving it soft, smooth, and glowing.',
        price: '$24.99',
        image: 'pics/store/bath 3.jpg',
        badge: 'New Arrival'
    },
    {
        id: 'lavender-soap',
        name: 'Lavender Soap Bar',
        description: 'Hand-crafted artisan soap with pure lavender essential oil and organic shea butter. Perfect for sensitive skin and evening relaxation routines.',
        price: '$12.99',
        image: 'pics/store/candle4.jpg',
        badge: 'Best Seller'
    },
    {
        id: 'eucalyptus-candle',
        name: 'Eucalyptus Soy Candle',
        description: 'Premium soy wax candle with eucalyptus and mint essential oils. Creates a spa-like atmosphere with 45+ hours of clean burning.',
        price: '$28.99',
        image: 'pics/store/frag1.jpg',
        badge: 'Limited Edition'
    },
    {
        id: 'shea-body-cream',
        name: 'Shea Butter Body Cream',
        description: 'Rich, nourishing body cream made with organic shea butter and vitamin E. Provides long-lasting hydration for silky smooth skin.',
        price: '$19.99',
        image: 'pics/store/gift 4.jpg',
        badge: 'Organic'
    },
    {
        id: 'vitamin-c-serum',
        name: 'Vitamin C Facial Serum',
        description: 'Potent anti-aging serum with 20% vitamin C, hyaluronic acid, and botanical extracts. Brightens skin and reduces fine lines.',
        price: '$34.99',
        image: 'pics/Relax Soak Breathe Unwind (1000 x 400 px).png',
        badge: 'Premium'
    }
];

// --- Carousel Logic ---
let currentProductIndex = 0;

function selectProduct(index) {
    currentProductIndex = index;
    updateProductDisplay();
    updateThumbnails();
}

function changeProduct(direction) {
    currentProductIndex += direction;
    if (currentProductIndex >= products.length) currentProductIndex = 0;
    if (currentProductIndex < 0) currentProductIndex = products.length - 1;
    updateProductDisplay();
    updateThumbnails();
}

function updateProductDisplay() {
    const product = products[currentProductIndex];
    document.getElementById('featuredImage').src = product.image;
    document.getElementById('featuredImage').alt = product.name;
    document.getElementById('productTitle').textContent = product.name;
    document.getElementById('productDescription').textContent = product.description;
    document.getElementById('productPrice').textContent = product.price;
    document.getElementById('productBadge').textContent = product.badge;
    // Update the Add to Cart button to use the correct product id
    const addBtn = document.querySelector('.carousel-info .add-to-cart-btn');
    if (addBtn) {
        addBtn.setAttribute('onclick', `addProductToCart('${product.id}')`);
    }
}

function updateThumbnails() {
    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach((thumb, index) => {
        thumb.classList.toggle('active', index === currentProductIndex);
    });
}

// --- Cart Functions (use cart.js) ---
function addProductToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    const price = parseFloat(product.price.replace('$', ''));
    addToCart(product.id, product.name, price, product.image); // from cart.js
    showNotification(`${product.name} added to cart`);
}

// --- Cart Count Display ---
function updateCartCount() {
    if (typeof window.updateCartDisplay === "function") {
        window.updateCartDisplay();
    }
}

// --- Notification ---
function showNotification(message, type = 'success') {
    const notification = document.getElementById('notification');
    const messageElement = document.getElementById('notificationMessage');
    if (messageElement) messageElement.textContent = message;
    notification.className = 'notification';
    notification.classList.add(type, 'show');
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// --- Mobile Menu ---
function toggleMobileMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('active');
    const isExpanded = navLinks.classList.contains('active');
    document.querySelector('.mobile-menu').setAttribute('aria-expanded', isExpanded);
}

// --- Category Navigation ---
function navigateToCategory(category) {
    window.location.href = `shop.html?category=${category}`;
}

// --- Newsletter ---
function handleNewsletterSubmit(event) {
    event.preventDefault();
    const emailInput = event.target.querySelector('.newsletter-input');
    const email = emailInput.value;
    if (!email || !email.includes('@')) {
        showNotification('Please enter a valid email address.', 'error');
        return;
    }
    showNotification('Thank you for subscribing! Check your email for a 15% off coupon.');
    event.target.reset();
}

// --- Carousel Keyboard Navigation ---
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') changeProduct(-1);
    else if (e.key === 'ArrowRight') changeProduct(1);
});

// --- Initialize on DOMContentLoaded ---
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
    updateProductDisplay();
    updateThumbnails();

    // Auto-rotate carousel
    setInterval(() => {
        changeProduct(1);
    }, 8000);
});

// --- Service Worker for PWA (optional) ---
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then(registration => {
            console.log('ServiceWorker registration successful');
        }).catch(err => {
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}