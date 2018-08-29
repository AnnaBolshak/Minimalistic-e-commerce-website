'use strict';

document.addEventListener('DOMContentLoaded', function () {
    ViewHelper.updateBagInfo();
    updateTotalPrice();

    showCartContent();

    document.getElementById('shopping-bag-list').addEventListener('click', function (e) {
        var target = e.target;
        while (target != this) {
            if (target.classList.contains("remove-item")) {
                var cart = CartManager.instance.currentCart;
                cart.deleteItem(target.dataset.id);
                CartManager.instance.saveCart(cart);

                ViewHelper.updateBagInfo();
                updateTotalPrice();
                showCartContent();

                return;
            }
            if (target.classList.contains("q-control")) {
                var newQuantity = 0;
                if (target.classList.contains("minus") || target.classList.contains("plus")) {
                    var cartItemId = target.dataset.id;
                    var _cart = CartManager.instance.currentCart;
                    var cartItem = _cart.getItem(cartItemId);
                    var step = target.classList.contains("minus") ? -1 : 1;
                    if (step < 0 && cartItem.quantity <= 1) {
                        _cart.deleteItem(cartItemId);
                        showCartContent();
                    } else {
                        cartItem.setQuantity(cartItem.quantity + step);
                    }
                    CartManager.instance.saveCart(_cart);

                    ViewHelper.updateBagInfo();
                    updateTotalPrice();
                    if (target.parentNode.getElementsByClassName("q-control-value")) {
                        target.parentNode.getElementsByClassName("q-control-value")[0].innerText = cartItem.quantity;
                    }
                }
                return;
            }
            target = target.parentNode;
        }
    });
    document.getElementById('clear-cart').addEventListener('click', function (e) {
        clearCart('Your shopping bag is empty. Use Catalog to add new items');
    });
    document.getElementById('buy-now').addEventListener('click', function (e) {
        var cart = CartManager.instance.currentCart;

        if (cart.quantity > 0) {
            clearCart('Thank you for your purchase');
        }
    });
});

function clearCart(message) {
    CartManager.instance.clear(message);
    ViewHelper.updateBagInfo();
    updateTotalPrice();
    showCartContent();
}

function updateTotalPrice() {
    var totalPriceWrapper = document.getElementById('cart-total-price');
    if (totalPriceWrapper != null) {
        totalPriceWrapper.innerText = ViewHelper.priceFormat(CartManager.instance.currentCart.price);
    }
}

function buildCart(cart, carItemTemplate) {
    var cartItemNodes = document.createElement('div');

    cart.items.forEach(function (cartItem) {
        var html = carItemTemplate({ cartItem: cartItem });
        var div = document.createElement('div');
        div.innerHTML = html.trim();
        var cartItemNode = div.firstChild;
        cartItemNodes.appendChild(cartItemNode);
    });

    cartItemNodes = cartItemNodes.childNodes;

    return cartItemNodes;
}

function showCartContent() {
    var cartItemTemplate = _.template(document.getElementById('cart-item-template').innerHTML);
    var cartItemNodes = buildCart(CartManager.instance.currentCart, cartItemTemplate);
    var shoppingBagListElement = document.getElementById("shopping-bag-list");
    shoppingBagListElement.innerHTML = '';
    for (var i = 0; i < cartItemNodes.length; i++) {
        shoppingBagListElement.appendChild(cartItemNodes[i].cloneNode(true));
    }
}