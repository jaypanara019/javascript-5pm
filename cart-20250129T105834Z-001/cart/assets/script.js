document.addEventListener('DOMContentLoaded', () => {
    const cartIcon = document.querySelector('#cart-icon');
    const cart = document.querySelector('.cart');
    const closeCart = document.querySelector('#close-cart');
    const cartContent = document.querySelector('.cart-content');
    const totalPriceElement = document.querySelector('.total-price');

    const updateCartFromLocalStorage = () => {
        const storedCart = JSON.parse(localStorage.getItem('cartItems')) || [];
        cartContent.innerHTML = '';
        storedCart.forEach(item => {
            addProductToCart(item.title, item.price, item.img, item.quantity, false);
        });
        updateTotalPrice();
    };

    const saveCartToLocalStorage = () => {
        const cartItems = Array.from(cartContent.querySelectorAll('.cart-box')).map(cartBox => {
            const title = cartBox.querySelector('.cart-product-title').innerText;
            const price = cartBox.querySelector('.cart-price').innerText;
            const img = cartBox.querySelector('.cart-img').src;
            const quantity = cartBox.querySelector('.cart-quantity').value;
            return { title, price, img, quantity };
        });
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    };

    const addProductToCart = (title, price, img, quantity = 1, shouldSave = true) => {
        const cartItemNames = cartContent.querySelectorAll('.cart-product-title');
        if (Array.from(cartItemNames).some(item => item.innerText === title)) {
            alert('This item is already in your cart');
            return;
        }

        const cartShopBox = document.createElement('div');
        cartShopBox.classList.add('cart-box');
        cartShopBox.innerHTML = `
            <img src="${img}" alt="${title}" class="cart-img">
            <div class="detail-box">
                <div class="cart-product-title">${title}</div>
                <div class="cart-price">${price}</div>
                <input type="number" value="${quantity}" class="cart-quantity">
            </div>
            <i class="bx bxs-trash-alt cart-remove"></i>`;
        cartContent.appendChild(cartShopBox);

        cartShopBox.querySelector('.cart-remove').addEventListener('click', () => {
            cartShopBox.remove();
            updateTotalPrice();
            saveCartToLocalStorage();
        });
        cartShopBox.querySelector('.cart-quantity').addEventListener('change', event => {
            if (isNaN(event.target.value) || event.target.value <= 0) {
                event.target.value = 1;
            }
            updateTotalPrice();
            saveCartToLocalStorage();
        });

        if (shouldSave) saveCartToLocalStorage();
        updateTotalPrice();
    };

    const updateTotalPrice = () => {
        const cartBoxes = cartContent.querySelectorAll('.cart-box');
        let total = 0;
        cartBoxes.forEach(cartBox => {
            const price = parseFloat(cartBox.querySelector('.cart-price').innerText.replace('€', '').replace(',', '.'));
            const quantity = parseInt(cartBox.querySelector('.cart-quantity').value);
            total += price * quantity;
        });
        totalPriceElement.innerText = `${total.toFixed(2).replace('.', ',')} €`;
    };

    cartIcon.addEventListener('click', () => cart.classList.add('active'));
    closeCart.addEventListener('click', () => cart.classList.remove('active'));

    document.querySelectorAll('.add-cart').forEach(button => {
        button.addEventListener('click', event => {
            const product = event.target.closest('.product-box');
            const title = product.querySelector('.product-title').innerText;
            const price = product.querySelector('.price').innerText;
            const img = product.querySelector('.product-img').src;
            addProductToCart(title, price, img);
        });
    });

    document.querySelector('.btn-buy').addEventListener('click', () => {
        if (cartContent.children.length === 0) {
            alert('Your cart is empty');
        } else {
            alert('Order successfully placed');
            cartContent.innerHTML = '';
            updateTotalPrice();
            localStorage.removeItem('cartItems');
        }
    });

    updateCartFromLocalStorage();
});
