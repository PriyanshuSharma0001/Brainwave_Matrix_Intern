document.addEventListener("DOMContentLoaded", () => {
    let cart = [];

    function updateCartCount() {
        document.getElementById("cart-count").textContent = cart.reduce((total, item) => total + item.quantity, 0);
    }

    function renderCart() {
        let cartContainer = document.getElementById("cart-container");
        if (!cartContainer) {
            cartContainer = document.createElement("div");
            cartContainer.id = "cart-container";
            cartContainer.style.position = "fixed";
            cartContainer.style.top = "50px";
            cartContainer.style.right = "20px";
            cartContainer.style.background = "white";
            cartContainer.style.padding = "10px";
            cartContainer.style.border = "1px solid #ccc";
            document.body.appendChild(cartContainer);
        }
        cartContainer.innerHTML = "<h3>Shopping Cart</h3>";

        if (cart.length === 0) {
            cartContainer.innerHTML += "<p>Cart is empty</p>";
            return;
        }

        cart.forEach((item, index) => {
            const itemDiv = document.createElement("div");
            itemDiv.innerHTML = `${item.name} - $${item.price} x ${item.quantity} 
                <button data-index="${index}" class="remove-from-cart">Remove</button>`;
            cartContainer.appendChild(itemDiv);
        });

        document.querySelectorAll(".remove-from-cart").forEach(button => {
            button.addEventListener("click", (event) => {
                const index = event.target.getAttribute("data-index");
                cart.splice(index, 1);
                updateCartCount();
                renderCart();
            });
        });
    }

    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", (event) => {
            const product = event.target.closest(".product");
            const productId = product.getAttribute("data-id");
            const productName = product.getAttribute("data-name");
            const productPrice = parseFloat(product.getAttribute("data-price"));

            const existingProduct = cart.find(item => item.id === productId);
            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                cart.push({ id: productId, name: productName, price: productPrice, quantity: 1 });
            }

            updateCartCount();
            renderCart();
        });
    });
});
