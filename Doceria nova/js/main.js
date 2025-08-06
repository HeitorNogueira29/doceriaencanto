// main.js
document.addEventListener('DOMContentLoaded', () => {
    const cart = JSON.parse(localStorage.getItem('carrinho')) || [];
    const cartContainer = document.getElementById('cart-container');
    const totalDisplay = document.getElementById('total-display');

    function updateCart() {
        cartContainer.innerHTML = '';
        let total = 0;

        cart.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            itemElement.innerHTML = `
                <p>Item: ${item.type} (${item.size})</p>
                <p>Quantidade: ${item.quantity}</p>
                <button onclick="removeFromCart(${index})">Remover</button>
            `;
            cartContainer.appendChild(itemElement);
            total += item.price * item.quantity;
        });

        totalDisplay.innerText = `Total: R$ ${total.toFixed(2)}`;
    }

    window.addToCart = (type, size, quantity, price) => {
        const item = { type, size, quantity, price };
        cart.push(item);
        localStorage.setItem('carrinho', JSON.stringify(cart));
        updateCart();
    };

    window.removeFromCart = (index) => {
        cart.splice(index, 1);
        localStorage.setItem('carrinho', JSON.stringify(cart));
        updateCart();
    };

    if (document.getElementById('tabela-pedido')) {
        let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
        let tabela = document.getElementById('tabela-pedido');
        let total = 0;
        tabela.innerHTML = '';
        carrinho.forEach((item, idx) => {
            let subtotal = item.preco * item.quantidade;
            total += subtotal;
            tabela.innerHTML += `
                <tr>
                    <td>${idx + 1}</td>
                    <td>${item.quantidade}</td>
                    <td>${item.nome}</td>
                    <td>${item.tamanho}</td>
                    <td>R$ ${subtotal.toFixed(2)}</td>
                </tr>
            `;
        });
        document.getElementById('valor-total').textContent = total.toFixed(2);
    }
});