// Products data
const products = [
    {
        id: 1,
        name: "Kurkura",
        weight: "1 piece",
        price: 20,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTChrMS5X1bdGwUyXZxIWWYuH3tQGEnqDomWA&s",
        category: "snacks",
        badge: "Bestseller",
        rating: 4.5,
        reviews: 127
    },
    {
        id: 2,
        name: "Lay's",
        weight: "2 pieces",
        price: 20,
        image: "https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_600/NI_CATALOG/IMAGES/CIW/2024/8/1/a19b918c-0bad-4c0f-b751-48a8393e4bb0_673_1.png",
        category: "meals",
        rating: 4.3,
        reviews: 89
    },
    {
        id: 3,
        name: "Uncle chipps",
        weight: "1 plate",
        price: 20,
        image: "https://www.bbassets.com/media/uploads/p/l/40015992_18-uncle-chips-uncle-chips-potato-chips-spicy-treat-flavour.jpg",
        category: "meals",
        badge: "Popular",
        rating: 4.7,
        reviews: 203
    },
    {
        id: 4,
        name: "Dairy milk silk choclate",
        weight: "250g",
        price: 100,
        image: "https://www.bbassets.com/media/uploads/p/l/100265003_26-cadbury-dairy-milk-silk-fruit-nut-chocolate-bar.jpg",
        category: "desserts",
        rating: 4.2,
        reviews: 56
    },
    {
        id: 5,
        name: "Cadbury Oreo Creme ",
        weight: "1 piece",
        price: 29,
        image: "https://www.quickpantry.in/cdn/shop/files/CadburyOreoCremeBiscuits-Strawberry113.75g.webp?v=1733084643",
        category: "snacks",
        rating: 4.6,
        reviews: 178
    },
    {
        id: 6,
        name: "Original 20W iPhone Charger",
        weight: "500g",
        price: 490,
        image: "https://cdn.screenguards.co.in/media/catalog/product/cache/11/image/9df78eab33525d08d6e5fb8d27136e95/t/y/type-c_to_lightning_20w_pd.jpg",
        category: "beverages",
        rating: 4.1,
        reviews: 92
    },
    {
        id: 7,
        name: "Nescafe Gold Premium Jar",
        weight: "250ml",
        price: 590,
        image: "https://www.urbangroc.com/wp-content/uploads/2023/02/nescafe-gold-blend-thum.jpg",
        category: "beverages",
        rating: 4.4,
        reviews: 156
    },
    {
        id: 8,
        name: "Chocolate Dream Cake",
        weight: "200g",
        price: 120,
        image: "https://www.thedessertsymphony.in/cdn/shop/files/1.jpg?v=1704731141&width=1946",
        category: "desserts",
        badge: "Must Try",
        rating: 4.8,
        reviews: 234
    },
    {
        id: 9,
        name: "Bingo Mad Angles",
        weight: "300ml",
        price: 20,
        image: "https://rukminim2.flixcart.com/image/480/480/kdrpksw0/chips/b/7/d/90-madangle-achari-bingo-original-imafuhf5yzz9nbar.jpeg?q=90",
        category: "meals",
        rating: 4.0,
        reviews: 67
    },
    {
        id: 10,
        name: "  Mad Angle Mystery Pickle ",
        weight: "200g",
        price: 20,
        image: "https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_600/NI_CATALOG/IMAGES/ciw/2025/6/27/8befa8ae-decf-4720-9445-1cb5b95f4bd5_NPI-005279_1_20250627_072042.png",
        category: "vegetables",
        rating: 4.3,
        reviews: 78
    },
    {
        id: 11,
        name: "Panda keychain",
        weight: "1 piece",
        price: 130,
        image: "https://wonderlandgarden.in/cdn/shop/files/614hjXxKYRL._SX679_679x679.jpg?v=1736242084",
        category: "snacks",
        rating: 4.5,
        reviews: 145
    },
    {
        id: 12,
        name: "Parle Hide & Seek Biscui",
        weight: "100g",
        price: 30,
        image: "https://indiashopping.io/cdn/shop/files/parle-cookies-100-gms-parle-hide-seek-biscuit-100-gms-44306576441632.png?v=1737805232",
        category: "beverages",
        rating: 4.2,
        reviews: 103
    }
];

// Cart state
let cart = [];
let currentCategory = 'all';

// SheetDB Configuration
const SHEETDB_API_URL = "https://sheetdb.io/api/v1/42oa85sg85d0a";
const SHEETDB_API_KEY = "42oa85sg85d0a";

// Notifications data
let notifications = [
    {
        id: 1,
        title: "Special Offer!",
        message: "Get 20% off on your next order. Use code: RAIL20",
        time: "2 hours ago",
        unread: true
    },
    {
        id: 2,
        title: "Order Delivered",
        message: "Your order #12345 has been delivered successfully",
        time: "Yesterday",
        unread: true
    }
];

// Chat messages
let chatMessages = [
    {
        type: 'bot',
        message: 'Hello! Welcome to RailQuick support. How can I help you today?',
        time: '10:30 AM'
    }
];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderProducts('all');
    renderRecommendedItems();
    setupEventListeners();
    createFloatingEmojis();
    updateNotificationBadge();
    checkForOrders();
});

// Check for existing orders on page load
function checkForOrders() {
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    if (orders.length > 0) {
        // Update notification with latest order status
        const latestOrder = orders[orders.length - 1];
        const notification = {
            id: 3,
            title: "Order Status Update",
            message: `Your order #${latestOrder.orderId} is ${latestOrder.status}`,
            time: "Just now",
            unread: true
        };
        notifications.push(notification);
        updateNotificationBadge();
    }
}

// Create floating emojis for cool effect
function createFloatingEmojis() {
    const emojis = ['🍔', '🍕', '🥗', '🍱', '🍜', '🍛', '🥤', '🍦', '🍰'];
    
    setInterval(() => {
        if (Math.random() > 0.7) {
            const emoji = document.createElement('div');
            emoji.className = 'floating-emoji';
            emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            emoji.style.left = Math.random() * 100 + '%';
            emoji.style.animationDuration = (15 + Math.random() * 10) + 's';
            document.body.appendChild(emoji);
            
            // Remove emoji after animation
            setTimeout(() => {
                emoji.remove();
            }, 25000);
        }
    }, 3000);
}

// Render recommended items
function renderRecommendedItems() {
    const grid = document.getElementById('recommendedGrid');
    grid.innerHTML = '';
    
    // Get 4 random products as recommendations
    const recommended = [...products].sort(() => 0.5 - Math.random()).slice(0, 4);
    
    recommended.forEach(product => {
        const card = document.createElement('div');
        card.className = 'recommended-card';
        
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="recommended-image">
            <div class="recommended-content">
                <div>
                    <div class="recommended-title">${product.name}</div>
                    <div class="product-rating">
                        <div class="rating-stars">
                            ${generateStarRating(product.rating)}
                        </div>
                        <span class="rating-count">(${product.reviews})</span>
                    </div>
                </div>
                <div class="recommended-price">₹${product.price}</div>
            </div>
            ${product.badge ? `<div class="recommended-tag">${product.badge}</div>` : ''}
        `;
        
        card.addEventListener('click', () => {
            addToCart(product.id);
        });
        
        grid.appendChild(card);
    });
}

// Generate star rating HTML
function generateStarRating(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;
    
    let starsHTML = '';
    
    for (let i = 0; i < fullStars; i++) {
        starsHTML += '<i class="fas fa-star rating-star filled"></i>';
    }
    
    if (halfStar) {
        starsHTML += '<i class="fas fa-star-half-alt rating-star filled"></i>';
    }
    
    for (let i = 0; i < emptyStars; i++) {
        starsHTML += '<i class="far fa-star rating-star"></i>';
    }
    
    return starsHTML;
}

// Render products
function renderProducts(category) {
    const grid = document.getElementById('productGrid');
    grid.innerHTML = '';

    const filtered = category === 'all' 
        ? products 
        : products.filter(p => p.category === category);

    filtered.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        
        const inCart = cart.find(item => item.id === product.id);
        const quantity = inCart ? inCart.quantity : 0;
        
        card.innerHTML = `
            ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ''}
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-details">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-weight">${product.weight}</p>
                <div class="product-rating">
                    <div class="rating-stars">
                        ${generateStarRating(product.rating)}
                    </div>
                    <span class="rating-count">(${product.reviews})</span>
                </div>
                <div class="product-footer">
                    <span class="product-price">₹${product.price}</span>
                    <div class="product-quantity" data-id="${product.id}">
                        ${quantity > 0 ? `
                            <button class="qty-btn decrease">
                                <i class="fas fa-minus"></i>
                            </button>
                            <span class="qty-value">${quantity}</span>
                            <button class="qty-btn increase">
                                <i class="fas fa-plus"></i>
                            </button>
                        ` : `
                            <button class="qty-btn add-to-cart">
                                <i class="fas fa-plus"></i>
                            </button>
                        `}
                    </div>
                </div>
            </div>
        `;
        
        grid.appendChild(card);
    });

    // Add event listeners for quantity controls
    document.querySelectorAll('.qty-btn.decrease').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const id = parseInt(btn.closest('.product-quantity').dataset.id);
            decreaseQuantity(id);
        });
    });
    
    document.querySelectorAll('.qty-btn.increase').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const id = parseInt(btn.closest('.product-quantity').dataset.id);
            increaseQuantity(id);
        });
    });
    
    document.querySelectorAll('.qty-btn.add-to-cart').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const id = parseInt(btn.closest('.product-quantity').dataset.id);
            addToCart(id);
        });
    });
}

// Increase quantity
function increaseQuantity(productId) {
    const product = products.find(p => p.id === productId);
    const existing = cart.find(item => item.id === productId);
    
    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    updateCart();
    renderProducts(currentCategory);
    showToast(`${product.name} added to cart!`);
}

// Decrease quantity
function decreaseQuantity(productId) {
    const existing = cart.find(item => item.id === productId);
    
    if (existing && existing.quantity > 1) {
        existing.quantity--;
        updateCart();
        renderProducts(currentCategory);
    } else if (existing && existing.quantity === 1) {
        // Remove from cart if quantity is 1 and user clicks decrease
        cart = cart.filter(item => item.id !== productId);
        updateCart();
        renderProducts(currentCategory);
        showToast('Item removed from cart');
    }
}

// Setup event listeners
function setupEventListeners() {
    // Category cards
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', () => {
            const category = card.dataset.category;
            renderProducts(category);
        });
    });

    // Cart FAB
    document.getElementById('cartFab').addEventListener('click', () => {
        document.getElementById('cartSidebar').classList.add('open');
    });

    // Close cart
    document.getElementById('closeCart').addEventListener('click', () => {
        document.getElementById('cartSidebar').classList.remove('open');
    });

    // Checkout
    document.getElementById('checkoutBtn').addEventListener('click', () => {
        if (cart.length === 0) {
            showToast('Your cart is empty!');
            return;
        }
        openCheckoutModal();
    });

    // Modal close
    document.getElementById('modalClose').addEventListener('click', () => {
        document.getElementById('checkoutModal').classList.remove('active');
    });

    // Payment modal close
    document.getElementById('paymentModalClose').addEventListener('click', () => {
        document.getElementById('paymentModal').classList.remove('active');
    });

    // Track order button - Show coming soon
    document.getElementById('trackOrderBtn').addEventListener('click', () => {
        showComingSoon('Track Your Order');
    });

    // Live chat
    document.getElementById('chatFab').addEventListener('click', () => {
        showComingSoon('Live Chat');
    });

    // Notifications modal close
    document.getElementById('notificationsModalClose').addEventListener('click', () => {
        document.getElementById('notificationsModal').classList.remove('active');
    });

    // Submit order
    document.getElementById('checkoutForm').addEventListener('submit', (e) => {
        e.preventDefault();
        
        const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;
        
        if (paymentMethod === 'online') {
            openPaymentModal();
        } else {
            processOrder('cod');
        }
    });

    // Process payment
    document.getElementById('processPaymentBtn').addEventListener('click', () => {
        processPayment();
    });

    // Back to home
    document.getElementById('backHomeBtn').addEventListener('click', () => {
        location.reload();
    });

    // Wishlist button - Show coming soon
    document.getElementById('wishlistBtn').addEventListener('click', () => {
        showComingSoon('Wishlist');
    });

    // Notification button
    document.getElementById('notificationBtn').addEventListener('click', () => {
        showNotifications();
    });

    // Search
    document.getElementById('searchBtn').addEventListener('click', () => {
        const query = document.getElementById('searchInput').value.toLowerCase();
        if (query) {
            const results = products.filter(p => 
                p.name.toLowerCase().includes(query)
            );
            if (results.length > 0) {
                const grid = document.getElementById('productGrid');
                grid.innerHTML = '';
                results.forEach(product => {
                    const card = document.createElement('div');
                    card.className = 'product-card';
                    card.innerHTML = `
                        <img src="${product.image}" alt="${product.name}" class="product-image">
                        <div class="product-details">
                            <h3 class="product-name">${product.name}</h3>
                            <p class="product-weight">${product.weight}</p>
                            <div class="product-footer">
                                <span class="product-price">₹${product.price}</span>
                                <button class="qty-btn add-to-cart" data-id="${product.id}">
                                    <i class="fas fa-plus"></i>
                                </button>
                            </div>
                        </div>
                    `;
                    grid.appendChild(card);
                });
                showToast(`Found ${results.length} results`);
            } else {
                showToast('No products found');
            }
        }
    });

    // Format card number input
    document.getElementById('cardNumber')?.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\s/g, '');
        let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
        e.target.value = formattedValue;
    });

    // Format expiry date input
    document.getElementById('expiryDate')?.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length >= 2) {
            value = value.slice(0, 2) + '/' + value.slice(2, 4);
        }
        e.target.value = value;
    });

    // Only allow numbers in CVV
    document.getElementById('cvv')?.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/\D/g, '').slice(0, 3);
    });
}

// Show coming soon modal
function showComingSoon(feature) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay active';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3 class="modal-title">${feature}</h3>
                <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <div class="coming-soon-modal">
                    <i class="fas fa-${feature === 'Track Your Order' ? 'map-marked-alt' : 'comments'}"></i>
                    <h3>Coming Soon!</h3>
                    <p>We're working hard to bring you the ${feature.toLowerCase()} feature. Stay tuned for updates!</p>
                    <button class="place-order-btn" onclick="this.closest('.modal-overlay').remove()">Got it</button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

// Show notifications
function showNotifications() {
    const modal = document.getElementById('notificationsModal');
    const notificationsList = document.getElementById('notificationsList');
    
    notificationsList.innerHTML = '';
    
    if (notifications.length === 0) {
        notificationsList.innerHTML = '<p style="text-align: center; padding: 20px;">No notifications</p>';
    } else {
        notifications.forEach(notification => {
            const notificationItem = document.createElement('div');
            notificationItem.className = `notification-item ${notification.unread ? 'unread' : ''}`;
            notificationItem.innerHTML = `
                <h4>${notification.title}</h4>
                <p>${notification.message}</p>
                <small>${notification.time}</small>
                ${notification.unread ? `<button class="mark-read" onclick="markAsRead(${notification.id})"><i class="fas fa-check"></i></button>` : ''}
            `;
            notificationsList.appendChild(notificationItem);
        });
    }
    
    modal.classList.add('active');
}

// Mark notification as read
function markAsRead(notificationId) {
    const notification = notifications.find(n => n.id === notificationId);
    if (notification) {
        notification.unread = false;
        updateNotificationBadge();
        showNotifications(); // Refresh notifications list
        showToast('Notification marked as read');
    }
}

// Update notification badge
function updateNotificationBadge() {
    const badge = document.getElementById('notificationBadge');
    const unreadCount = notifications.filter(n => n.unread).length;
    
    if (unreadCount > 0) {
        badge.textContent = unreadCount;
        badge.style.display = 'flex';
    } else {
        badge.style.display = 'none';
    }
}

// Add to cart (legacy function for search results)
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existing = cart.find(item => item.id === productId);
    
    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    updateCart();
    renderProducts(currentCategory);
    showToast(`${product.name} added to cart!`);
}

// Update cart
function updateCart() {
    const count = document.getElementById('cartCount');
    const total = document.getElementById('cartTotal');
    const items = document.getElementById('cartItems');
    
    // Calculate total items correctly
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    count.textContent = totalItems;
    
    // Make sure count is visible and properly styled
    if (totalItems > 0) {
        count.style.display = 'flex';
        count.style.transform = 'scale(1.2)';
        setTimeout(() => {
            count.style.transform = 'scale(1)';
        }, 300);
    } else {
        count.style.display = 'none';
    }
    
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    total.textContent = `₹${totalPrice}`;
    
    items.innerHTML = '';
    if (cart.length === 0) {
        items.innerHTML = '<p style="text-align:center; padding:2rem;">Your cart is empty</p>';
        return;
    }
    
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-details">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">₹${item.price}</div>
                <div class="quantity-controls">
                    <button class="qty-btn decrease" data-id="${item.id}">
                        <i class="fas fa-minus"></i>
                    </button>
                    <span>${item.quantity}</span>
                    <button class="qty-btn increase" data-id="${item.id}">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
            </div>
            <i class="fas fa-trash remove-item" data-id="${item.id}"></i>
        `;
        items.appendChild(cartItem);
    });
    
    // Quantity controls
    document.querySelectorAll('.increase').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = parseInt(btn.dataset.id);
            const item = cart.find(i => i.id === id);
            if (item) {
                item.quantity++;
                updateCart();
            }
        });
    });
    
    document.querySelectorAll('.decrease').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = parseInt(btn.dataset.id);
            const item = cart.find(i => i.id === id);
            if (item && item.quantity > 1) {
                item.quantity--;
                updateCart();
            }
        });
    });
    
    document.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = parseInt(btn.dataset.id);
            cart = cart.filter(i => i.id !== id);
            updateCart();
            renderProducts(currentCategory);
            showToast('Item removed from cart');
        });
    });
}

// Open checkout modal
function openCheckoutModal() {
    const modal = document.getElementById('checkoutModal');
    const summaryItems = document.getElementById('orderSummaryItems');
    const summaryTotal = document.getElementById('summaryTotal');
    
    summaryItems.innerHTML = '';
    cart.forEach(item => {
        summaryItems.innerHTML += `
            <div class="summary-item">
                <span>${item.name} x ${item.quantity}</span>
                <span>₹${item.price * item.quantity}</span>
            </div>
        `;
    });
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    summaryTotal.textContent = `₹${total}`;
    
    modal.classList.add('active');
}

// Open payment modal
function openPaymentModal() {
    const modal = document.getElementById('paymentModal');
    const summaryItems = document.getElementById('paymentSummaryItems');
    const summaryTotal = document.getElementById('paymentTotal');
    
    summaryItems.innerHTML = '';
    cart.forEach(item => {
        summaryItems.innerHTML += `
            <div class="summary-item">
                <span>${item.name} x ${item.quantity}</span>
                <span>₹${item.price * item.quantity}</span>
            </div>
        `;
    });
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    summaryTotal.textContent = `₹${total}`;
    
    modal.classList.add('active');
}

// Process payment
function processPayment() {
    const cardNumber = document.getElementById('cardNumber').value;
    const expiryDate = document.getElementById('expiryDate').value;
    const cvv = document.getElementById('cvv').value;
    const cardholderName = document.getElementById('cardholderName').value;
    
    // Simple validation
    if (!cardNumber || cardNumber.replace(/\s/g, '').length < 16) {
        showToast('Please enter a valid card number');
        return;
    }
    
    if (!expiryDate || expiryDate.length < 5) {
        showToast('Please enter a valid expiry date');
        return;
    }
    
    if (!cvv || cvv.length < 3) {
        showToast('Please enter a valid CVV');
        return;
    }
    
    if (!cardholderName) {
        showToast('Please enter cardholder name');
        return;
    }
    
    // Simulate payment processing
    showToast('Processing payment...');
    
    setTimeout(() => {
        document.getElementById('paymentModal').classList.remove('active');
        processOrder('online');
    }, 2000);
}

// Send SMS with order details
async function sendOrderSMS(order) {
    const phoneNumber = order.phone;
    const orderId = order.orderId;
    const customerName = order.name;
    const totalAmount = order.total;
    const trainNumber = order.train;
    const seatNumber = order.seat;
    
    // SMS message template
    const message = `Dear ${customerName}, your order #${orderId} is confirmed! Amount: ₹${totalAmount}. Train: ${trainNumber}, Seat: ${seatNumber}. We'll deliver at the next station. Thank you for choosing RailQuick!`;
    
    // For demo purposes, we'll just log the message
    console.log('SMS would be sent to:', phoneNumber);
    console.log('Message:', message);
    
    // For demo, return success
    return { success: true, messageId: 'demo_' + Date.now() };
}

// Save order to Google Sheets via SheetDB
async function saveOrderToSheetDB(order) {
    try {
        // Prepare order data for SheetDB
        const orderData = {
            OrderID: order.orderId,
            CustomerName: order.name,
            PhoneNumber: order.phone,
            TrainNumber: order.train,
            SeatCoachNumber: order.seat,
            OrderItems: order.items.map(item => `${item.name} x ${item.quantity}`).join(', '),
            TotalAmount: order.total,
            PaymentMethod: order.paymentMethod,
            OrderDate: new Date().toLocaleDateString(),
            Status: "Processing"
        };
        
        // Send to SheetDB API
        const response = await fetch(SHEETDB_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${SHEETDB_API_KEY}`
            },
            body: JSON.stringify({
                data: orderData
            })
        });
        
        if (!response.ok) {
            throw new Error('Failed to save order to SheetDB');
        }
        
        const result = await response.json();
        
        // Also save to localStorage as backup
        const orders = JSON.parse(localStorage.getItem('orders') || '[]');
        orders.push(order);
        localStorage.setItem('orders', JSON.stringify(orders));
        
        return { success: true, sheetDBId: result.id };
    } catch (error) {
        console.error('Error saving order to SheetDB:', error);
        return { success: false, error: error.message };
    }
}

// Process order
async function processOrder(paymentMethod) {
    const order = {
        orderId: 'RQ' + Date.now(),
        name: document.getElementById('customerName').value,
        phone: document.getElementById('contactNumber').value,
        train: document.getElementById('trainNumber').value,
        seat: document.getElementById('seatNumber').value,
        items: cart,
        total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        paymentMethod: paymentMethod,
        time: new Date().toISOString()
    };
    
    // Show loading
    showToast('Placing order...');
    
    // Save order to Google Sheets via SheetDB
    const saveResult = await saveOrderToSheetDB(order);
    
    if (saveResult.success) {
        // Send SMS notification
        const smsResult = await sendOrderSMS(order);
        
        // Update order status in SheetDB to "Confirmed"
        try {
            await fetch(`${SHEETDB_API_URL}/${saveResult.sheetDBId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${SHEETDB_API_KEY}`
                },
                body: JSON.stringify({
                    data: {
                        Status: "Confirmed"
                    }
                })
            });
        } catch (error) {
            console.error('Error updating order status:', error);
        }
        
        // Close modals and show success page
        document.getElementById('checkoutModal').classList.remove('active');
        document.getElementById('cartSidebar').classList.remove('open');
        
        cart = [];
        updateCart();
        renderProducts(currentCategory);
        
        showSuccessPage(order, smsResult);
    } else {
        showToast('Failed to place order. Please try again.');
    }
}

// Show success page
function showSuccessPage(order, smsResult) {
    // Hide main content and show success page
    document.querySelector('main').style.display = 'none';
    document.querySelector('header').style.display = 'none';
    document.querySelector('.location-bar').style.display = 'none';
    document.querySelector('.cart-container').style.display = 'none';
    document.querySelector('.chat-container').style.display = 'none';
    
    const successPage = document.getElementById('successPage');
    successPage.style.display = 'flex';
    
    // Update order details
    document.getElementById('orderId').textContent = '#' + order.orderId;
    document.getElementById('customerNameDisplay').textContent = order.name;
    document.getElementById('trainNumberDisplay').textContent = order.train;
    document.getElementById('seatNumberDisplay').textContent = order.seat;
    document.getElementById('paymentMethodDisplay').textContent = 
        order.paymentMethod === 'online' ? 'Online Payment' : 'Cash on Delivery';
    document.getElementById('totalAmountDisplay').textContent = '₹' + order.total;
    
    // Calculate estimated delivery time (next station in ~30 mins)
    const deliveryTime = new Date(Date.now() + 30 * 60000);
    document.getElementById('deliveryTimeDisplay').textContent = 
        deliveryTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    
    // Add SMS status
    const detailContainer = document.querySelector('.success-details');
    const smsStatusDiv = document.createElement('div');
    smsStatusDiv.className = 'detail-row';
    smsStatusDiv.innerHTML = `
        <span class="detail-label">SMS Status</span>
        <span class="detail-value">
            <div class="sms-status ${smsResult.success ? 'success' : 'error'}">
                <i class="fas ${smsResult.success ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
                ${smsResult.success ? 'SMS Sent Successfully' : 'SMS Failed'}
            </div>
        </span>
    `;
    detailContainer.appendChild(smsStatusDiv);
    
    // Show success message
    showToast('Order placed successfully! We will deliver soon.');
}

// Show toast
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.querySelector('.toast-message').textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}