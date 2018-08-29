'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

document.addEventListener('DOMContentLoaded', function () {
    var radioButtonsWrapper = document.getElementsByClassName('radio_buttons_wrapper');
    for (var i = 0; i < radioButtonsWrapper.length; i++) {
        radioButtonsWrapper[i].addEventListener('click', radioButtonWrapperClickHandler);
    }

    document.getElementById('search-block').addEventListener('click', function (e) {
        var target = e.target;
        while (target != this) {
            if (target.classList.contains('search__submit')) {
                this.classList.toggle('search-state-open');
                return;
            }
            target = target.parentNode;
        }
    });

    document.getElementById('nav').addEventListener('click', function (e) {
        var target = e.target;
        while (target != this) {
            if (target.classList.contains('menu')) {
                this.classList.toggle('menu_state_open');
                var icon = target.getElementsByClassName('mobile-menu__icon');
                for (var item in icon.item) {
                    item.classList.toggle('icon-state_open');
                }
                var WraperLinkList = this.getElementsByClassName('menu-links');;
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = WraperLinkList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var linkList = _step.value;

                        linkList.classList.toggle('menu-links-state_open');
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }

                return;
            }
            target = target.parentNode;
        }
    });
});
// new line
function radioButtonWrapperClickHandler(event) {
    var target = event.target;
    while (target != this) {
        if (target.classList.contains('radio_button')) {
            var radioButtons = this.getElementsByClassName("radio_button");
            for (var i = 0; i < radioButtons.length; i++) {
                radioButtons[i].classList.remove('is-active');
            }

            target.classList.add("is-active");
            return;
        }
        target = target.parentNode;
    }
}

var Product = function () {
    function Product(id, dateAdded, title, description, placeholder, discountedPrice, price, hasNew, category, fashion, colors, sizes, thumbnail, preview) {
        var url = arguments.length > 14 && arguments[14] !== undefined ? arguments[14] : 'item.html';

        _classCallCheck(this, Product);

        this.id = id;
        this.dateAdded = dateAdded;
        this.title = title;
        this.description = description;
        this.placeholder = placeholder;
        this.discountedPrice = discountedPrice;
        this.price = price;
        this.hasNew = hasNew;
        this.category = category;
        this.fashion = fashion;
        this.colors = colors;
        this.sizes = sizes;
        this.thumbnail = thumbnail;
        this.preview = preview;
        this.url = url;
    }

    _createClass(Product, null, [{
        key: 'fromObject',
        value: function fromObject(object) {
            var product = new Product();
            for (var key in object) {
                if (product.hasOwnProperty(key)) {
                    if (key == "dateAdded") {
                        product[key] = new Date(object[key]);
                    } else {
                        product[key] = object[key];
                    }
                }
            }

            return product;
        }
    }, {
        key: 'fromObjects',
        value: function fromObjects(objects) {
            var products = objects.map(function ($a) {
                return Product.fromObject($a);
            });
            return products;
        }
    }]);

    return Product;
}();

var CartItem = function () {
    function CartItem(productId, title, price, thumbnail) {
        var hasNew = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
        var url = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 'item.html';

        _classCallCheck(this, CartItem);

        this.productId = productId;
        this.title = title;
        this.price = price;
        this.thumbnail = thumbnail;
        this.hasNew = hasNew;
        this.color = '';
        this.size = '';
        this.quantity = 1;
        this.url = url;
    }

    _createClass(CartItem, [{
        key: 'setQuantity',
        value: function setQuantity(number) {
            this.quantity = number;
        }
    }, {
        key: 'uniqueId',
        get: function get() {
            var id = this.productId + '_' + this.color + '_' + this.size;
            return id;
        }
    }], [{
        key: 'fromJSONObject',
        value: function fromJSONObject(object) {
            var cartItem = Object.setPrototypeOf(object, CartItem.prototype);
            return cartItem;
        }
    }]);

    return CartItem;
}();

var Cart = function () {
    function Cart() {
        _classCallCheck(this, Cart);

        this.items = [];
    }

    _createClass(Cart, [{
        key: 'getItem',
        value: function getItem(id) {
            return this.items.filter(function ($a) {
                return $a.uniqueId == id;
            })[0];
        }
    }, {
        key: 'addItem',
        value: function addItem(item) {
            var id = item.uniqueId;
            var existedCartItem = this.getItem(id);
            if (existedCartItem === undefined) {
                this.items.push(item);
            } else {
                existedCartItem.setQuantity(existedCartItem.quantity + 1);
            }
        }
    }, {
        key: 'deleteItem',
        value: function deleteItem(id) {
            var index = _.findIndex(this.items, function (item) {
                return item.uniqueId == id;
            });
            if (index > -1) {
                this.items.splice(index, 1);
            }
        }
    }, {
        key: 'sumUp',
        value: function sumUp(key) {
            var sum;
            sum = this.items.reduce(function (previousValue, currentValue) {
                return previousValue + currentValue[key] * currentValue.quantity;
            }, 0);
            return sum;
        }
    }, {
        key: 'sumQuantity',
        value: function sumQuantity() {
            var sum;
            sum = this.items.reduce(function (previousValue, currentValue) {
                return previousValue + currentValue.quantity;
            }, 0);
            return sum;
        }
    }, {
        key: 'price',
        get: function get() {
            return this.sumUp('price');
        }
    }, {
        key: 'quantity',
        get: function get() {
            return this.sumQuantity();
        }
    }], [{
        key: 'fromJSONObject',
        value: function fromJSONObject(object) {
            var cart = Object.setPrototypeOf(object, Cart.prototype);
            if (Array.isArray(cart.items)) {
                cart.items = cart.items.map(CartItem.fromJSONObject);
            }
            return cart;
        }
    }]);

    return Cart;
}();

var CartManager = function () {
    function CartManager() {
        _classCallCheck(this, CartManager);

        if (!CartManager.singleInstance) {
            CartManager.singleInstance = this;
            this._currentCart = null;
        }
        return CartManager.singleInstance;
    }

    _createClass(CartManager, [{
        key: 'saveCurrentCart',
        value: function saveCurrentCart() {
            this.saveCart(this.currentCart);
        }
    }, {
        key: 'saveCart',
        value: function saveCart(cart) {
            localStorage.setItem('cart', JSON.stringify(cart));
        }
    }, {
        key: 'clear',
        value: function clear(message) {
            this._currentCart = null;
            localStorage.removeItem('cart');
            localStorage.setItem('cart-message', message);
        }
    }, {
        key: 'currentCart',
        get: function get() {
            if (this._currentCart == null) {
                var storedCartObject = localStorage.getItem('cart');
                if (storedCartObject !== null && storedCartObject !== undefined) {
                    var jsonObject = JSON.parse(storedCartObject);
                    var cart = Cart.fromJSONObject(jsonObject);
                    this._currentCart = cart;
                } else {
                    this._currentCart = new Cart();
                }
            }

            return this._currentCart;
        }
    }], [{
        key: 'instance',
        get: function get() {
            return new CartManager();
        }
    }]);

    return CartManager;
}();

var ViewHelper = function () {
    function ViewHelper() {
        _classCallCheck(this, ViewHelper);
    }

    _createClass(ViewHelper, null, [{
        key: 'percentDiscount',
        value: function percentDiscount(newPrice, oldPrice) {
            var discount = oldPrice - newPrice;
            var discountPercent = discount / oldPrice;
            var discountText = -1 * Math.round(discountPercent * 100) + " %";
            return discountText;
        }
    }, {
        key: 'priceFormat',
        value: function priceFormat(price) {
            var priceString = '\xA3' + price.toFixed(2);
            return priceString;
        }
    }, {
        key: 'updateBagInfo',
        value: function updateBagInfo() {
            var cart = CartManager.instance.currentCart;

            var priceWrapper = document.getElementById('header-bag-price');
            if (priceWrapper != null) {
                priceWrapper.innerText = ViewHelper.priceFormat(cart.price);
            }

            var quantityWrapper = document.getElementById('header-bag-quantity');
            if (quantityWrapper != null) {
                quantityWrapper.innerText = cart.quantity;
            }

            var cartMessage = document.getElementById('cart-message');
            if (cartMessage != null) {
                if (cart.quantity == 0) {
                    cartMessage.classList.add('show');
                    var storedCartMessage = localStorage.getItem('cart-message');
                    if (storedCartMessage !== null && storedCartMessage !== undefined) {
                        cartMessage.innerText = storedCartMessage;
                    } else {
                        cartMessage.innerText = 'Your shopping bag is empty. Use Catalog to add new items';
                    }
                } else {
                    cartMessage.classList.remove('show');
                }
            }
        }
    }]);

    return ViewHelper;
}();