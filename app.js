// Simulated database with real image links
const menuData = [
    { 
        id: 1, 
        name: "Classic Cheeseburger", 
        description: "Double beef patty, cheddar cheese, lettuce, and tomato.", 
        price: 12.50, 
        category: "burgers", 
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=200&q=80" 
    },
    { 
        id: 2, 
        name: "BBQ Bacon Burger", 
        description: "Beef patty, crispy bacon, onion rings, and BBQ sauce.", 
        price: 14.00, 
        category: "burgers", 
        image: "https://images.unsplash.com/photo-1594212202811-94578f7e2211?auto=format&fit=crop&w=200&q=80" 
    },
    { 
        id: 3, 
        name: "Margherita Pizza", 
        description: "Tomato sauce, fior di latte mozzarella, and fresh basil.", 
        price: 16.00, 
        category: "pizzas", 
        image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=200&q=80" 
    },
    { 
        id: 4, 
        name: "Pepperoni Pizza", 
        description: "Double pepperoni and extra cheese.", 
        price: 18.50, 
        category: "pizzas", 
        image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=200&q=80" 
    },
    { 
        id: 5, 
        name: "Coca Cola 500ml", 
        description: "Classic chilled cola.", 
        price: 2.50, 
        category: "drinks", 
        image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=200&q=80" 
    },
    { 
        id: 6, 
        name: "Craft IPA Beer", 
        description: "Pint of cold draft IPA beer.", 
        price: 6.00, 
        category: "drinks", 
        image: "https://images.unsplash.com/photo-1535958636474-b021ce4849ec?auto=format&fit=crop&w=200&q=80" 
    }
];

let cart = [];

// DOM Elements
const menuListElement = document.getElementById('menu-list');
const categoryButtons = document.querySelectorAll('.category-btn');
const cartCountElement = document.getElementById('cart-count');
const cartModal = document.getElementById('cart-modal');
const cartToggle = document.getElementById('cart-toggle');
const closeCartBtn = document.getElementById('close-cart');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalElement = document.getElementById('cart-total');

// Initial Render
document.addEventListener('DOMContentLoaded', () => {
    renderMenu('all');
});

// Category Filter Logic
categoryButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        document.querySelector('.category-btn.active').classList.remove('active');
        e.target.classList.add('active');
        const category = e.target.getAttribute('data-category');
        renderMenu(category);
    });
});

// Render Products
function renderMenu(filterCategory) {
    menuListElement.innerHTML = '';
    
    const filteredData = filterCategory === 'all' 
        ? menuData 
        : menuData.filter(item => item.category === filterCategory);

    filteredData.forEach(item => {
        const itemHTML = `
            <article class="menu-item">
                <img src="${item.image}" alt="${item.name}" class="item-img">
                <div class="item-info">
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                    <div class="item-bottom">
                        <span class="price">$${item.price.toFixed(2)}</span>
                        <button class="add-btn" onclick="addToCart(${item.id})">+</button>
                    </div>
                </div>
            </article>
        `;
        menuListElement.insertAdjacentHTML('beforeend', itemHTML);
    });
}

// Cart Logic
function addToCart(itemId) {
    const product = menuData.find(item => item.id === itemId);
    const existingItem = cart.find(item => item.id === itemId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    updateCartUI();
}

function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    updateCartUI();
}

function updateCartUI() {
    // Update bubble count
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    cartCountElement.textContent = totalItems;

    // Update cart content
    cartItemsContainer.innerHTML = '';
    let totalPrice = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        totalPrice += itemTotal;

        const cartItemHTML = `
            <div class="cart-item">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <span>$${item.price.toFixed(2)} x ${item.quantity}</span>
                </div>
                <div>
                    <strong>$${itemTotal.toFixed(2)}</strong>
                    <button onclick="removeFromCart(${item.id})" style="margin-left: 10px; color: var(--primary-color); border: none; background: none; font-weight: bold; cursor: pointer;">X</button>
                </div>
            </div>
        `;
        cartItemsContainer.insertAdjacentHTML('beforeend', cartItemHTML);
    });

    cartTotalElement.textContent = `$${totalPrice.toFixed(2)}`;
}

// Open / Close Modal
cartToggle.addEventListener('click', () => {
    cartModal.classList.add('open');
});

closeCartBtn.addEventListener('click', () => {
    cartModal.classList.remove('open');
});

// Close cart when clicking outside the modal content
cartModal.addEventListener('click', (e) => {
    if(e.target === cartModal) {
        cartModal.classList.remove('open');
    }
});