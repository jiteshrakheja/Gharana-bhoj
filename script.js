// Gharana Bhoj - Complete JavaScript

const menuData = {
    starters: [
        { id: 1, name: "Samosa", price: 30, description: "Crispy triangular pastry filled with spiced potatoes and peas", image: "assets/sampsa.jfif" },
        { id: 2, name: "Paneer Tikka", price: 120, description: "Soft cottage cheese cubes marinated in spices and grilled", image: "assets/paneer tikka.jfif" },
        { id: 3, name: "Veg Spring Roll", price: 80, description: "Crispy rolls filled with fresh vegetables and noodles", image: "assets/spring roll.jfif" },
        { id: 4, name: "Aloo Tikki", price: 40, description: "Spiced potato patties served with chutney and yogurt", image: "assets/aloo tiki].jfif" },
        { id: 5, name: "Hara Bhara Kabab", price: 100, description: "Mixed vegetable and spinach kababs with mint chutney", image: "assets/hara bhara.jfif" }
    ],
    mains: [
        { id: 6, name: "Dal Makhani", price: 160, description: "Creamy black lentils cooked with butter and spices", image: "assets/dal makhni.jfif" },
        { id: 7, name: "Paneer Butter Masala", price: 180, description: "Soft cottage cheese in rich tomato and butter gravy", image: "assets/malai kofta.jfif" },
        { id: 8, name: "Mixed Veg Curry", price: 140, description: "Assorted vegetables cooked in aromatic spices", image: "assets/chole masala.jfif" },
        { id: 9, name: "Palak Paneer", price: 170, description: "Cottage cheese cubes in creamy spinach gravy", image: "assets/palak paneetr.jfif" },
        { id: 10, name: "Veg Biryani", price: 150, description: "Fragrant rice cooked with vegetables and aromatic spices", image: "assets/veg pulao.jfif" }
    ],
    desserts: [
        { id: 11, name: "Gulab Jamun", price: 60, description: "Soft milk dumplings soaked in sugar syrup", image: "assets/gulab jamun.jfif" },
        { id: 12, name: "Rasmalai", price: 80, description: "Soft cottage cheese patties in sweetened milk", image: "assets/rasamalai.jfif" },
        { id: 13, name: "Kheer", price: 50, description: "Creamy rice pudding with nuts and cardamom", image: "assets/kheer.jfif" }
    ],
    beverages: [
        { id: 14, name: "Mango Lassi", price: 50, description: "Sweet yogurt drink with mango flavor", image: "assets/mango lassi.jfif" },
        { id: 15, name: "Masala Chai", price: 30, description: "Spiced Indian tea with milk and sugar", image: "assets/masala caho.jfif" },
        { id: 16, name: "Fresh Lime Soda", price: 40, description: "Refreshing lime soda with mint", image: "assets/fresh lime soda.jfif" }
    ]
};

let cart = [];
let orders = [];
let orderIdCounter = 1000;
let selectedPaymentMethod = '';

document.addEventListener('DOMContentLoaded', function () {
    loadMenu();
    updateCart();

    const orderForm = document.getElementById('orderForm');
    if (orderForm) {
        orderForm.addEventListener('submit', handleOrderSubmit);
    }
});

function loadMenu() {
    const menuContainer = document.getElementById('menuContainer');
    if (!menuContainer) return;

    let menuHTML = '';

    Object.keys(menuData).forEach(category => {
        menuHTML += `<div class="menu-category">
            <h3>${category.charAt(0).toUpperCase() + category.slice(1)}</h3>
            <div class="menu-grid">`;

        menuData[category].forEach(item => {
            menuHTML += `
                <div class="menu-card">
                    <img src="${item.image}" alt="${item.name}" onerror="this.src='https://via.placeholder.com/400x300?text=${item.name}'">
                    <div class="menu-info">
                        <h3>${item.name}</h3>
                        <p>${item.description}</p>
                        <div class="price">₹${item.price}</div>
                        <button class="add-to-cart" onclick="addToCart(${item.id})">
                            <i class="fas fa-cart-plus"></i> Add to Cart
                        </button>
                    </div>
                </div>
            `;
        });

        menuHTML += `</div></div>`;
    });

    menuContainer.innerHTML = menuHTML;
}

function selectPayment(method) {
    selectedPaymentMethod = method;

    document.querySelectorAll('.payment-option').forEach(option => {
        option.classList.remove('selected');
    });

    event.currentTarget.classList.add('selected');

    document.getElementById('cardDetails').style.display = method === 'card' ? 'block' : 'none';
    document.getElementById('upiDetails').style.display = method === 'upi' ? 'block' : 'none';

    document.getElementById('selectedPayment').value = method;
}

function addToCart(itemId) {
    const item = findMenuItem(itemId);
    if (!item) return;

    const existingItem = cart.find(cartItem => cartItem.id === itemId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            ...item,
            quantity: 1
        });
    }

    updateCart();
    showNotification(`${item.name} added to cart!`, 'success');
}

function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    updateCart();
}

function updateQuantity(itemId, change) {
    const item = cart.find(cartItem => cartItem.id === itemId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(itemId);
        } else {
            updateCart();
        }
    }
}

function updateCart() {
    const cartCount = document.getElementById('cartCount');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');

    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }

    if (cartItems) {
        if (cart.length === 0) {
            cartItems.innerHTML = '<p>Your cart is empty</p>';
        } else {
            let cartHTML = '';
            cart.forEach(item => {
                cartHTML += `
                    <div class="cart-item">
                        <div>
                            <h4>${item.name}</h4>
                            <p>₹${item.price} x ${item.quantity}</p>
                        </div>
                        <div>
                            <button onclick="updateQuantity(${item.id}, -1)">-</button>
                            <span>${item.quantity}</span>
                            <button onclick="updateQuantity(${item.id}, 1)">+</button>
                            <button onclick="removeFromCart(${item.id})" style="background: #f44336; color: white; border: none; padding: 5px 10px; border-radius: 5px; cursor: pointer;">Remove</button>
                        </div>
                    </div>
                `;
            });
            cartItems.innerHTML = cartHTML;
        }
    }

    if (cartTotal) {
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotal.textContent = `Total: ₹${total}`;
    }
}

function handleOrderSubmit(e) {
    e.preventDefault();

    if (cart.length === 0) {
        showNotification('Your cart is empty! Please add items before ordering.', 'error');
        return;
    }

    const formData = new FormData(e.target);
    const paymentMethod = formData.get('payment');

    if (!paymentMethod) {
        showNotification('Please select a payment method', 'error');
        return;
    }

    if (paymentMethod === 'card') {
        const cardNumber = formData.get('cardNumber');
        const cardName = formData.get('cardName');
        const expiry = formData.get('expiry');
        const cvv = formData.get('cvv');

        if (!cardNumber || !cardName || !expiry || !cvv) {
            showNotification('Please fill all card details', 'error');
            return;
        }
    }

    if (paymentMethod === 'upi') {
        const upiId = formData.get('upiId');
        if (!upiId) {
            showNotification('Please enter your UPI ID', 'error');
            return;
        }
    }

    const deliveryTime = new Date();
    deliveryTime.setMinutes(deliveryTime.getMinutes() + 25 + Math.random() * 11);

    const order = {
        id: `ORD${orderIdCounter++}`,
        items: [...cart],
        customer: {
            name: formData.get('name'),
            phone: formData.get('phone'),
            email: formData.get('email'),
            address: formData.get('address'),
            payment: paymentMethod,
            upiId: paymentMethod === 'upi' ? formData.get('upiId') : null,
            cardNumber: paymentMethod === 'card' ? formData.get('cardNumber') : null
        },
        total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        status: 'pending',
        timestamp: new Date().toISOString(),
        estimatedDelivery: deliveryTime.toISOString(),
        tracking: {
            placed: new Date().toISOString(),
            confirmed: null,
            preparing: null,
            outForDelivery: null,
            delivered: null
        }
    };

    orders.push(order);

    cart = [];
    updateCart();

    showOrderConfirmation(order);

    e.target.reset();

    document.querySelectorAll('.payment-option').forEach(option => {
        option.classList.remove('selected');
    });

    document.getElementById('cardDetails').style.display = 'none';
    document.getElementById('upiDetails').style.display = 'none';
}

function showOrderConfirmation(order) {
    const modal = document.getElementById('orderModal');
    const orderDetails = document.getElementById('orderDetails');

    if (!modal || !orderDetails) return;

    const itemsList = order.items.map(item =>
        `${item.quantity}x ${item.name} - ₹${item.price * item.quantity}`
    ).join('<br>');

    orderDetails.innerHTML = `
        <div class="order-summary">
            <div class="order-confirmation-header">
                <h3>🎉 Order Confirmed!</h3>
                <div class="order-id-display">${order.id}</div>
            </div>
            <div class="order-items">
                <h4>Items:</h4>
                <p>${itemsList}</p>
            </div>
            <div class="order-customer">
                <h4>Customer Details:</h4>
                <p><strong>Name:</strong> ${order.customer.name}</p>
                <p><strong>Phone:</strong> ${order.customer.phone}</p>
                <p><strong>Address:</strong> ${order.customer.address}</p>
                <p><strong>Payment:</strong> ${order.customer.payment}</p>
            </div>
            <div class="order-total">
                <h4>Total: ₹${order.total}</h4>
            </div>
            <div class="order-next-steps">
                <h4>Next Steps:</h4>
                <p>1. Save your Order ID: <strong>${order.id}</strong></p>
                <p>2. Go to "Track Order" to check status</p>
                <p>3. Estimated delivery: ${new Date(order.estimatedDelivery).toLocaleString()}</p>
            </div>
        </div>
    `;

    modal.style.display = 'block';
}

function trackOrder() {
    const phone = document.getElementById('trackingPhone').value;
    if (!phone) {
        showNotification('Please enter your phone number', 'error');
        return;
    }

    const customerOrders = orders.filter(order => order.customer.phone === phone);

    const trackingResult = document.getElementById('trackingResult');
    if (!trackingResult) return;

    if (customerOrders.length === 0) {
        trackingResult.innerHTML = '<p>No orders found for this phone number</p>';
        return;
    }

    let trackingHTML = '<h3>Your Orders:</h3>';
    customerOrders.forEach(order => {
        trackingHTML += `
            <div class="order-tracking">
                <h4>Order ID: ${order.id}</h4>
                <p>Status: ${order.status}</p>
                <p>Total: ₹${order.total}</p>
                <p>Estimated Delivery: ${new Date(order.estimatedDelivery).toLocaleString()}</p>
                <div class="tracking-steps">
                    <div class="step ${order.tracking.placed ? 'completed' : ''}">
                        <i class="fas fa-check"></i>
                    </div>
                    <div class="step ${order.tracking.confirmed ? 'completed' : ''}">
                        <i class="fas fa-check"></i>
                    </div>
                    <div class="step ${order.tracking.preparing ? 'completed' : ''}">
                        <i class="fas fa-check"></i>
                    </div>
                    <div class="step ${order.tracking.outForDelivery ? 'completed' : ''}">
                        <i class="fas fa-check"></i>
                    </div>
                    <div class="step ${order.tracking.delivered ? 'completed' : ''}">
                        <i class="fas fa-check"></i>
                    </div>
                </div>
                <div style="display: flex; justify-content: space-between; margin-top: 10px; font-size: 12px;">
                    <span>Placed</span>
                    <span>Confirmed</span>
                    <span>Preparing</span>
                    <span>Out for Delivery</span>
                    <span>Delivered</span>
                </div>
            </div>
        `;
    });

    trackingResult.innerHTML = trackingHTML;
}

function findMenuItem(itemId) {
    for (let category in menuData) {
        const item = menuData[category].find(item => item.id === itemId);
        if (item) return item;
    }
    return null;
}

function showNotification(message, type = 'info') {
    const notification = document.getElementById('notification');
    if (!notification) return;

    notification.textContent = message;
    notification.className = `notification ${type}`;
    notification.style.display = 'block';

    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}

function closeModal() {
    const modal = document.getElementById('orderModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

window.onclick = function (event) {
    const modal = document.getElementById('orderModal');
    if (modal && event.target === modal) {
        modal.style.display = 'none';
    }
}
