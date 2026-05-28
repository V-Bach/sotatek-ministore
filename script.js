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

