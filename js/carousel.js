document.addEventListener('DOMContentLoaded', function() {
    const products = [
        {
            id: 'rose-clay-mask',
            name: 'Rose Clay Facial Mask',
            price: '$24.99',
            badge: 'New'
        },
        {
            id: 'lavender-soap-bar',
            name: 'Lavender Soap Bar',
            price: '$12.99',
            badge: 'Best Seller'
        },
        {
            id: 'eucalyptus-soy-candle',
            name: 'Eucalyptus Soy Candle',
            price: '$29.99',
            badge: 'Organic'
        },
        {
            id: 'vitamin-c-serum',
            name: 'Vitamin C Facial Serum',
            price: '$34.99',
            badge: 'Vegan'
        },
        {
            id: 'shea-butter-cream',
            name: 'Shea Butter Body Cream',
            price: '$19.99',
            badge: 'Popular'
        }
    ];

    let currentRotation = 0;
    let activeIndex = 0;

    function positionCarouselItems() {
        const items = document.querySelectorAll('.carousel-item');
        const angleStep = 360 / items.length;
        const radius = 140;

        items.forEach((item, index) => {
            const angle = (index * angleStep + currentRotation) * (Math.PI / 180);
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;

            const scale = Math.cos(angle) * 0.3 + 0.7;
            const zIndex = Math.round(scale * 10);

            item.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
            item.style.zIndex = zIndex;
            item.style.opacity = scale;

            // Update active item
            if (index === activeIndex) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }

    function rotateCarousel(direction) {
        const angleStep = 360 / products.length;
        currentRotation += direction * angleStep;
        activeIndex = (activeIndex - direction + products.length) % products.length;

        positionCarouselItems();
        updateCenterDisplay();
    }

    function updateCenterDisplay() {
        const centerDisplay = document.getElementById('centerDisplay');
        const product = products[activeIndex];

        centerDisplay.innerHTML = `
            <h3>${product.name}</h3>
            <div class="price">${product.price}</div>
            <button class="add-to-cart-btn" onclick="addToCart('${product.id}')">Add to Cart</button>
        `;
    }

    // Expose rotateCarousel globally for button onclick
    window.rotateCarousel = rotateCarousel;

    // Auto rotation
    let autoRotateInterval = setInterval(() => {
        rotateCarousel(1);
    }, 4000);

    // Pause auto rotation on hover
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', () => {
            clearInterval(autoRotateInterval);
        });

        carouselContainer.addEventListener('mouseleave', () => {
            autoRotateInterval = setInterval(() => {
                rotateCarousel(1);
            }, 4000);
        });

        // Touch/swipe support for mobile
        let startX = 0;
        let startY = 0;

        carouselContainer.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        });

        carouselContainer.addEventListener('touchend', (e) => {
            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;
            const diffX = startX - endX;
            const diffY = startY - endY;

            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    rotateCarousel(1); // Swipe left, rotate right
                } else {
                    rotateCarousel(-1); // Swipe right, rotate left
                }
            }
        });
    }

    // Initialize carousel
    positionCarouselItems();
    updateCenterDisplay();
});