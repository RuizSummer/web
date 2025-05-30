// IndexedDB Setup
let db;
const request = indexedDB.open("TelecomCartDB", 1);

request.onupgradeneeded = function(event) {
    db = event.target.result;
    const store = db.createObjectStore("cart", { keyPath: "id" });
    store.createIndex("name", "name", { unique: false });
};

request.onsuccess = function(event) {
    db = event.target.result;
    loadServices();
    updateCart();
};

request.onerror = function(event) {
    console.error("IndexedDB error:", event.target.errorCode);
};

// Add to Cart
function addToCart(serviceId) {
    const service = services.find(s => s.id === serviceId);
    const transaction = db.transaction(["cart"], "readwrite");
    const store = transaction.objectStore("cart");
    const request = store.get(serviceId);

    request.onsuccess = function(event) {
        let item = event.target.result;
        if (item) {
            item.quantity += 1;
            item.total = item.quantity * item.price;
            store.put(item);
        } else {
            item = {
                id: service.id,
                name: service.name,
                price: service.price,
                quantity: 1,
                total: service.price
            };
            store.add(item);
        }
        updateCart();
        // Animate cart badge
        const badge = document.getElementById("cartCount");
        badge.classList.add("animate__animated", "animate__bounce");
        setTimeout(() => badge.classList.remove("animate__animated", "animate__bounce"), 500);
    };
}

// Update Cart
function updateCart() {
    const transaction = db.transaction(["cart"], "readonly");
    const store = transaction.objectStore("cart");
    const request = store.getAll();

    request.onsuccess = function(event) {
        const items = event.target.result;
        const cartItems = document.getElementById("cartItems");
        const cartCount = document.getElementById("cartCount");
        const cartTotal = document.getElementById("cartTotal");
        cartItems.innerHTML = "";
        let total = 0;
        let count = 0;

        items.forEach(item => {
            total += item.total;
            count += item.quantity;
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${item.name}</td>
                <td>S/ ${item.price}</td>
                <td>
                    <input type="number" min="1" value="${item.quantity}" class="form-control w-75" onchange="updateQuantity(${item.id}, this.value)">
                </td>
                <td>S/ ${item.total}</td>
                <td><button class="btn btn-danger btn-sm" onclick="removeFromCart(${item.id})">Eliminar</button></td>
            `;
            cartItems.appendChild(row);
        });

        cartCount.textContent = count;
        cartTotal.textContent = total.toFixed(2);
    };
}

// Update Quantity
function updateQuantity(id, quantity) {
    quantity = parseInt(quantity);
    if (quantity < 1) return;
    const transaction = db.transaction(["cart"], "readwrite");
    const store = transaction.objectStore("cart");
    const request = store.get(id);

    request.onsuccess = function(event) {
        let item = event.target.result;
        if (item) {
            item.quantity = quantity;
            item.total = item.quantity * item.price;
            store.put(item);
            updateCart();
        }
    };
}

// Remove from Cart
function removeFromCart(id) {
    const transaction = db.transaction(["cart"], "readwrite");
    const store = transaction.objectStore("cart");
    store.delete(id);
    updateCart();
}

// Clear Cart
function clearCart() {
    const transaction = db.transaction(["cart"], "readwrite");
    const store = transaction.objectStore("cart");
    store.clear();
    updateCart();
}

// Checkout (Placeholder)
function checkout() {
    alert("¡Compra finalizada! Gracias por elegir Telecom Network Peru.");
    clearCart();
}

// Send Contact (Placeholder)
function sendContact() {
    const name = document.getElementById("contactName").value;
    const email = document.getElementById("contactEmail").value;
    const message = document.getElementById("contactMessage").value;
    if (name && email && message) {
        alert("Mensaje enviado. ¡Gracias por contactarnos!");
        document.getElementById("contactName").value = "";
        document.getElementById("contactEmail").value = "";
        document.getElementById("contactMessage").value = "";
    } else {
        alert("Por favor, completa todos los campos.");
    }
}