// Services Data
const services = [
    { id: 1, name: "Fibra Óptica Empresarial", price: 500, category: "Enterprise", description: "Internet de alta velocidad para empresas.", src: "fibra.jpeg" },
    { id: 2, name: "VPN Segura", price: 300, category: "Networking", description: "Conexión privada y segura para tu red.", src: "vpn.jpeg" },
    { id: 3, name: "Telefonía VoIP", price: 200, category: "Collaboration", description: "Soluciones de telefonía por internet.", src: "telefonia.jpeg" },
    { id: 4, name: "Videoconferencia Cloud", price: 400, category: "Collaboration", description: "Plataforma para reuniones virtuales.", src: "videoconf.jpeg" },
    { id: 5, name: "SD-WAN Avanzado", price: 600, category: "Networking", description: "Optimización de redes empresariales.", src: "sdwan.jpeg" },
    { id: 6, name: "Cloud Empresarial", price: 800, category: "Enterprise", description: "Soluciones de almacenamiento en la nube.", src: "cloud.jpeg" }
];

// Load Services
function loadServices() {
    const container = document.getElementById("servicesContainer");
    services.forEach(service => {
        const card = document.createElement("div");
        card.className = "col";
        card.innerHTML = `
            <div class="card service-card h-100">
                <img src="${service.src}" class="card-img-top" alt="${service.name}">
                <div class="card-body">
                    <h5 class="card-title">${service.name}</h5>
                    <p class="card-text">${service.description}</p>
                    <p class="card-text"><strong>Categoría:</strong> ${service.category}</p>
                    <p class="card-text"><strong>Precio:</strong> S/ ${service.price}</p>
                    <button class="btn btn-primary" onclick="addToCart(${service.id})">Agregar al Carrito</button>
                </div>
            </div>
        `;
        container.appendChild(card);
    });

    // Add fade-in effect for cards
    document.querySelectorAll('.service-card').forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('fade-in');
        }, index * 100);
    });
}