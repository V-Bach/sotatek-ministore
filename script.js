// ==========================================
// 1. DATA: PRODUCTS & STATE
// ==========================================
const products = [
    {
        id: 1,
        name: "Classic Beige Hoodie",
        category: "Hoodies",
        price: 45.00,
        oldPrice: 55.00,
        rating: 4.8,
        discount: "-18%",
        image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&q=80"
    },
    {
        id: 2,
        name: "Minimalist White T-Shirt",
        category: "T-Shirts",
        price: 25.00,
        oldPrice: null,
        rating: 4.5,
        discount: null,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80"
    },
    {
        id: 3,
        name: "Cozy Knit Sweater",
        category: "Sweaters",
        price: 60.00,
        oldPrice: 75.00,
        rating: 4.9,
        discount: "-20%",
        image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=500&q=80"
    },
    {
        id: 4,
        name: "Linen Summer Dress",
        category: "Women",
        price: 50.00,
        oldPrice: null,
        rating: 4.7,
        discount: null,
        image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500&q=80"
    },
    {
        id: 5,
        name: "Vintage Denim Jacket",
        category: "Men",
        price: 85.00,
        oldPrice: 100.00,
        rating: 4.6,
        discount: "-15%",
        image: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=500&q=80"
    },
    {
        id: 6,
        name: "Casual Cotton Shirt",
        category: "Men",
        price: 35.00,
        oldPrice: 40.00,
        rating: 4.4,
        discount: "-12%",
        image: "https://images.unsplash.com/photo-1596755094514-f87e32f85e23?w=500&q=80"
    }
];

let cart = [];

// ==========================================
// 2. UTILITIES
// ==========================================
const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
};

// ==========================================
// 3. RENDER PRODUCTS
// ==========================================
const renderProducts = () => {
    const productsGrid = document.getElementById('product-grid');
    productsGrid.innerHTML = '';

    products.forEach(product => {
        let priceHtml = `<span class="current-price">${formatCurrency(product.price)}</span>`;
        if (product.oldPrice) {
            priceHtml += `<span class="old-price">${formatCurrency(product.oldPrice)}</span>`;
        }

        let badgeHtml = '';
        if (product.discount) {
            badgeHtml = `<div class="discount-badge">${product.discount}</div>`;
        }

        const productCard = document.createElement('div');
        productCard.classList.add('product-card');

        productCard.innerHTML = `
            <div class="product-image-container">
                ${badgeHtml}
                <img src="${product.image}" alt="${product.name}" class="product-image">
            </div>
            <div class="product-info">
                <span class="product-category">${product.category}</span>
                <h3 class="product-name">${product.name}</h3>
                <div class="rating-stars">
                    ${'<i class="fa-solid fa-star"></i>'.repeat(Math.floor(product.rating))}
                    ${product.rating % 1 !== 0 ? '<i class="fa-solid fa-star-half-stroke"></i>' : ''}
                </div>
                <div class="price-row">
                    ${priceHtml}
                </div>
                <button class="add-to-cart-btn" onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        `;

        productsGrid.appendChild(productCard);
    });
};
// ==========================================
// 4. CART MANAGEMENT
// ==========================================
const addToCart = (productId) => {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    updateCartUI();
    openCart(); // Automatically open cart sidebar when adding items
};

const updateQuantity = (productId, change) => {
    const itemIndex = cart.findIndex(item => item.id === productId);
    
    if (itemIndex !== -1) {
        cart[itemIndex].quantity += change;
        
        if (cart[itemIndex].quantity <= 0) {
            cart.splice(itemIndex, 1);
        }
        
        updateCartUI();
    }
};

const removeFromCart = (productId) => {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
};

// ==========================================
// 5. UPDATE CART UI
// ==========================================
const updateCartUI = () => {
    renderCartItems();
    updateCartCount();
    calculateTotal();
};

const renderCartItems = () => {
    const cartItemsContainer = document.getElementById('cart-items');
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                <i class="fa-solid fa-bag-shopping"></i>
                <p>Your cart is currently empty.</p>
            </div>
        `;
        document.getElementById('checkout-btn').disabled = true;
        document.getElementById('checkout-btn').style.opacity = '0.5';
        return;
    }

    document.getElementById('checkout-btn').disabled = false;
    document.getElementById('checkout-btn').style.opacity = '1';
    cartItemsContainer.innerHTML = '';

    cart.forEach(item => {
        const cartItemDiv = document.createElement('div');
        cartItemDiv.classList.add('cart-item');
        
        cartItemDiv.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-details">
                <div>
                    <h4 class="cart-item-title">${item.name}</h4>
                    <div class="cart-item-price">${formatCurrency(item.price)}</div>
                </div>
                
                <div class="cart-item-actions">
                    <div class="qty-controls">
                        <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                        <span class="qty-value">${item.quantity}</span>
                        <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                    </div>
                    <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
                </div>
            </div>
        `;
        
        cartItemsContainer.appendChild(cartItemDiv);
    });
};

const updateCartCount = () => {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cart-count').innerText = totalItems;
};

const calculateTotal = () => {
    const totalPrice = cart.reduce((sum, item) => {
        return sum + (item.price * item.quantity);
    }, 0);
    
    document.getElementById('total-price').innerText = formatCurrency(totalPrice);
};

// ==========================================
// 6. TOGGLE SIDEBAR CART
// ==========================================
const toggleCart = () => {
    const sidebar = document.getElementById('cart-sidebar');
    const overlay = document.getElementById('cart-overlay');
    
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
};

const openCart = () => {
    document.getElementById('cart-sidebar').classList.add('active');
    document.getElementById('cart-overlay').classList.add('active');
};

const checkout = () => {
    if (cart.length === 0) return;

    alert(`Thank you for your purchase! Total is ${document.getElementById('total-price').innerText}.`);
    cart = [];
    updateCartUI();
    toggleCart();
};

// ==========================================
// 7. INITIALIZE APP
// ==========================================
window.onload = () => {
    renderProducts();
    updateCartUI();
};

