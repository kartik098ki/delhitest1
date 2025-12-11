// Firebase Configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Check if user is logged in
function isLoggedIn() {
    return localStorage.getItem('userToken') !== null;
}

// Check auth state
auth.onAuthStateChanged((user) => {
    if (user) {
        localStorage.setItem('user', JSON.stringify({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName
        }));
        updateAuthUI();
    } else {
        localStorage.removeItem('user');
        updateAuthUI();
    }
});

// Update auth UI
function updateAuthUI() {
    const accountBtn = document.getElementById('accountBtn');
    if (isLoggedIn()) {
        const user = JSON.parse(localStorage.getItem('user'));
        accountBtn.innerHTML = '<i class="fas fa-user-check"></i>';
    } else {
        accountBtn.innerHTML = '<i class="fas fa-user"></i>';
    }
}

// Show account details
function showAccountDetails() {
    const user = JSON.parse(localStorage.getItem('user'));
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    
    let orderHistory = '<p style="text-align: center; padding: 20px;">No orders yet</p>';
    if (orders.length > 0) {
        orderHistory = orders.map(order => `
            <div style="padding: 10px; border-bottom: 1px solid #eee;">
                <div style="display: flex; justify-content: space-between;">
                    <span>Order #${Math.floor(Math.random() * 1000000)}</span>
                    <span>₹${order.total}</span>
                </div>
                <small>${new Date(order.time).toLocaleDateString()}</small>
            </div>
        `).join('');
    }
    
    // Create and show an account modal
    const accountModal = document.createElement('div');
    accountModal.className = 'modal-overlay active';
    accountModal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3 class="modal-title">My Account</h3>
                <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <div class="account-info" style="padding: 15px;">
                    <h4>${user.displayName || 'User'}</h4>
                    <p>${user.email}</p>
                </div>
                <div class="account-section" style="padding: 15px; border-top: 1px solid #eee;">
                    <h5>Order History</h5>
                    ${orderHistory}
                </div>
                <div class="account-section" style="padding: 15px; border-top: 1px solid #eee;">
                    <button class="place-order-btn" onclick="logout()">Logout</button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(accountModal);
}

// Show login modal
function showLoginModal() {
    // Create and show a login modal
    const loginModal = document.createElement('div');
    loginModal.className = 'modal-overlay active';
    loginModal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3 class="modal-title">Login / Sign Up</h3>
                <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label class="form-label">Email</label>
                    <input type="email" class="form-input" id="loginEmail" placeholder="Enter your email">
                </div>
                <div class="form-group">
                    <label class="form-label">Password</label>
                    <input type="password" class="form-input" id="loginPassword" placeholder="Enter your password">
                </div>
                <button class="place-order-btn" onclick="handleLogin()">Login</button>
                <p style="text-align: center; margin-top: 15px;">New user? <a href="#" onclick="showSignupForm()">Sign Up</a></p>
            </div>
        </div>
    `;
    document.body.appendChild(loginModal);
}

// Handle login
function handleLogin() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    if (!email || !password) {
        showToast('Please enter email and password');
        return;
    }
    
    // For demo purposes, we'll use a simple mock authentication
    // In production, replace this with actual Firebase authentication
    if (email && password) {
        const user = {
            uid: 'mock-' + Date.now(),
            email: email,
            displayName: email.split('@')[0]
        };
        
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('userToken', 'mock-token-' + Date.now());
        
        document.querySelector('.modal-overlay').remove();
        showToast('Login successful!');
        updateAuthUI();
    }
}

// Show signup form
function showSignupForm() {
    const modalBody = document.querySelector('.modal-body');
    modalBody.innerHTML = `
        <div class="form-group">
            <label class="form-label">Full Name</label>
            <input type="text" class="form-input" id="signupName" placeholder="Enter your name">
        </div>
        <div class="form-group">
            <label class="form-label">Email</label>
            <input type="email" class="form-input" id="signupEmail" placeholder="Enter your email">
        </div>
        <div class="form-group">
            <label class="form-label">Password</label>
            <input type="password" class="form-input" id="signupPassword" placeholder="Create a password">
        </div>
        <button class="place-order-btn" onclick="handleSignup()">Sign Up</button>
        <p style="text-align: center; margin-top: 15px;">Already have an account? <a href="#" onclick="showLoginForm()">Login</a></p>
    `;
}

// Handle signup
function handleSignup() {
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    
    if (!name || !email || !password) {
        showToast('Please enter all details');
        return;
    }
    
    // For demo purposes, we'll use a simple mock authentication
    // In production, replace this with actual Firebase authentication
    const user = {
        uid: 'mock-' + Date.now(),
        email: email,
        displayName: name
    };
    
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('userToken', 'mock-token-' + Date.now());
    
    document.querySelector('.modal-overlay').remove();
    showToast('Account created successfully!');
    updateAuthUI();
}

// Show login form
function showLoginForm() {
    const modalBody = document.querySelector('.modal-body');
    modalBody.innerHTML = `
        <div class="form-group">
            <label class="form-label">Email</label>
            <input type="email" class="form-input" id="loginEmail" placeholder="Enter your email">
        </div>
        <div class="form-group">
            <label class="form-label">Password</label>
            <input type="password" class="form-input" id="loginPassword" placeholder="Enter your password">
        </div>
        <button class="place-order-btn" onclick="handleLogin()">Login</button>
        <p style="text-align: center; margin-top: 15px;">New user? <a href="#" onclick="showSignupForm()">Sign Up</a></p>
    `;
}

// Show wishlist
function showWishlist() {
    if (!isLoggedIn()) {
        showLoginModal();
        return;
    }
    
    // Create and show a wishlist modal
    const wishlistModal = document.createElement('div');
    wishlistModal.className = 'modal-overlay active';
    wishlistModal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3 class="modal-title">My Wishlist</h3>
                <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <p style="text-align: center; padding: 20px;">Your wishlist is empty</p>
            </div>
        </div>
    `;
    document.body.appendChild(wishlistModal);
}

// Show notifications
function showNotifications() {
    if (!isLoggedIn()) {
        showLoginModal();
        return;
    }
    
    // Create and show a notifications modal
    const notificationsModal = document.createElement('div');
    notificationsModal.className = 'modal-overlay active';
    notificationsModal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3 class="modal-title">Notifications</h3>
                <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <div class="notification-item" style="padding: 15px; border-bottom: 1px solid #eee;">
                    <h4>Special Offer!</h4>
                    <p>Get 20% off on your next order. Use code: RAIL20</p>
                    <small>2 hours ago</small>
                </div>
                <div class="notification-item" style="padding: 15px; border-bottom: 1px solid #eee;">
                    <h4>Order Delivered</h4>
                    <p>Your order #12345 has been delivered successfully</p>
                    <small>Yesterday</small>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(notificationsModal);
}

// Logout function
function logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('userToken');
    showToast('Logged out successfully');
    updateAuthUI();
    document.querySelector('.modal-overlay').remove();
}

// Initialize auth UI on page load
document.addEventListener('DOMContentLoaded', () => {
    updateAuthUI();
    
    // Account button
    document.getElementById('accountBtn').addEventListener('click', () => {
        if (isLoggedIn()) {
            showAccountDetails();
        } else {
            showLoginModal();
        }
    });

    // Wishlist button
    document.getElementById('wishlistBtn').addEventListener('click', showWishlist);

    // Notification button
    document.getElementById('notificationBtn').addEventListener('click', showNotifications);
});