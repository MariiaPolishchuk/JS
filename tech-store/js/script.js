document.addEventListener('DOMContentLoaded', function () {
    const products = [
        {
            id: 1,
            name: 'MacBook, 2020',
            price: 1299,
            image: 'img/1.png',
            description: 'The latest MacBook model with a sleek design and powerful performance.',
            specifications: {
                processor: 'Apple M1',
                ram: '8GB',
                storage: '256GB SSD',
                display: '13.3-inch Retina display'
            }
        },
        {
            id: 2,
            name: 'IPhone14',
            price: 1399,
            image: 'img/2.jpg',
            description: 'The new iPhone 14 with advanced features and improved performance.',
            specifications: {
                processor: 'A14 Bionic',
                ram: '6GB',
                storage: '128GB',
                display: '6.1-inch Super Retina XDR display'
            }
        },
        {
            id: 3,
            name: 'IPhone15Pro',
            price: 1499,
            image: 'img/3.jpg',
            description: 'The iPhone 15 Pro with cutting-edge technology and superior camera.',
            specifications: {
                processor: 'A15 Bionic',
                ram: '6GB',
                storage: '256GB',
                display: '6.1-inch Super Retina XDR display'
            }
        }
    ];

    const cart = [];

    function renderProducts(filteredProducts = products) {
        const productList = document.getElementById('product-list');
        productList.innerHTML = filteredProducts.map(product => `
            <div class="product">
                <img src="${product.image}" alt="${product.name}" data-id="${product.id}">
                <div>
                    <span>${product.name} - $${product.price}</span>
                    <button data-id="${product.id}" class="add-to-cart">Add to Cart</button>
                </div>
            </div>
        `).join('');

        document.querySelectorAll(".product img").forEach(function (image) {
            image.onclick = function () {
                const productId = Number(this.getAttribute('data-id'));
                const product = products.find(p => p.id === productId);
                if (product) {
                    modal.style.display = "flex";
                    modalImg.src = product.image;
                    captionText.innerHTML = `<h2>${product.name}</h2> <span class='bold'>$${product.price}</span>`;
                    descriptionText.innerHTML = `<p>${product.description}</p>`;
                    specificationsText.innerHTML = `
                        <h3>Specifications:</h3>
                        <ul>
                            <li>Processor: ${product.specifications.processor}</li>
                            <li>RAM: ${product.specifications.ram}</li>
                            <li>Storage: ${product.specifications.storage}</li>
                            <li>Display: ${product.specifications.display}</li>
                        </ul>
                        <button data-id="${product.id}" class="product add-to-cart">Add to Cart</button>
                    `;
                } else {
                    console.log("Product not found:", productId);
                }
            }
        });
    }

    function renderCart() {
        const cartList = document.getElementById('cart');
        const itemCounts = cart.reduce((acc, item) => {
            acc[item.id] = (acc[item.id] || 0) + 1;
            return acc;
        }, {});

        cartList.innerHTML = Object.keys(itemCounts).map(productId => {
            const product = products.find(p => p.id === Number(productId));
            const count = itemCounts[productId];
            return `
                <div class="cart-item">
                    <img src="${product.image}" alt="${product.name}">
                    <span>${product.name} (${count}) - $${(product.price * count).toFixed(2)}</span>
                    <div>
                        <button data-id="${product.id}" class="remove-from-cart">Remove</button>
                    </div>
                </div>
            `;
        }).join('');
        updateTotalAmount();
    }

    function addToCart(productId) {
        const product = products.find(p => p.id === productId);
        if (product) {
            cart.push(product);
            renderCart();
            alert(`${product.name} has been added to your cart!`);
        }
    }

    function removeFromCart(productId) {
        const index = cart.findIndex(item => item.id === productId);
        if (index !== -1) {
            cart.splice(index, 1);
            renderCart();
            if (cart.length === 0) {
                closeCartModal();
                alert('Your cart is empty!');
            }
        }
    }


    function updateTotalAmount() {
        const totalAmount = cart.reduce((total, item) => total + item.price, 0);
        document.getElementById('total-amount').textContent = totalAmount.toFixed(2);
    }

    function checkout() {
        if (cart.length === 0) {
            alert('Your cart is empty!');
            closeCartModal()
            return;
        }
        alert(`Thank you for your purchase! Your total is $${document.getElementById('total-amount').textContent}.`);
        cart.length = 0;
        renderCart();
        closeCartModal();
    }

    function openCartModal() {
        document.getElementById('cart-modal').style.display = 'flex';
    }

    function closeCartModal() {
        document.getElementById('cart-modal').style.display = 'none';
    }

    function searchProducts(query) {
        const filteredProducts = products.filter(product =>
            product.name.toLowerCase().includes(query.toLowerCase())
        );
        renderProducts(filteredProducts);
    }

    document.addEventListener('click', function (event) {
        if (event.target.classList.contains('add-to-cart')) {
            const productId = Number(event.target.getAttribute('data-id'));
            addToCart(productId);
        }
        if (event.target.classList.contains('remove-from-cart')) {
            const productId = Number(event.target.getAttribute('data-id'));
            removeFromCart(productId);
        }
        if (event.target.id === 'cart-button') {
            openCartModal();
        }
        if (event.target.classList.contains('close')) {
            closeCartModal();
        }
        if (event.target.id === 'checkout-button') {
            checkout();
        }
        if (event.target.id === 'search-button') {
            const query = document.getElementById('search-input').value;
            searchProducts(query);
        }
        if (event.target.id === 'clear-button') {
            document.getElementById('search-input').value = '';
            renderProducts(); 
        }
    });

    renderProducts();

    const modal = document.getElementById("image-modal");
    const modalImg = document.getElementById("modal-image");
    const captionText = document.getElementById("caption");
    const descriptionText = document.getElementById("product-description");
    const specificationsText = document.getElementById("product-specifications");

    const closeModal = document.querySelector(".modal .close");

    closeModal.onclick = function () {
        modal.style.display = "none";
    }

    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    }
});


