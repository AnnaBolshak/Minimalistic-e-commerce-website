'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

document.addEventListener('DOMContentLoaded', function () {
    ViewHelper.updateBagInfo();

    document.getElementById('add-to-bag').addEventListener('click', function (e) {
        var productId = this.dataset.itemid; //'80d32566-d81c-4ba0-9edf-0eceda3b4360'; //Dark classic fit suit
        var products = Product.fromObjects(window.catalog);
        var product = products.filter(function ($a) {
            return $a.id == productId;
        })[0];
        var cartItem = new CartItem(product.id, product.title, product.discountedPrice, product.thumbnail, product.hasNew, product.url);
        var selectedSizeElement = document.getElementById('product-size-selector').getElementsByClassName('is-active')[0];
        if (selectedSizeElement != undefined && selectedSizeElement != null) {
            cartItem.size = selectedSizeElement.dataset.value;
        }
        var selectedColorElement = document.getElementById('product-color-selector').getElementsByClassName('is-active')[0];
        if (selectedColorElement != undefined && selectedColorElement != null) {
            cartItem.color = selectedColorElement.dataset.value;
        }

        var cartManager = CartManager.instance;
        cartManager.currentCart.addItem(cartItem);
        cartManager.saveCurrentCart();

        ViewHelper.updateBagInfo();
    });

    // let photoItems = [new PhotoItem('img/item/thumb_11.jpg', 'img/item/full1.jpg'),
    //     new PhotoItem('img/item/thumb_12.jpg', 'img/item/full12.jpg'),
    //     new PhotoItem('img/item/thumb_13.jpg', 'img/item/full13.jpg')];
    //
    // let photosSwitcher = new PhotosSwitcher(photoItems,
    //     _.template(document.getElementById('photos-switcher-template').innerHTML));
    //
    // document.getElementById("photogallery-wrapper").appendChild(photosSwitcher.build());
});

var PhotosSwitcher = function () {
    function PhotosSwitcher(items, template) {
        _classCallCheck(this, PhotosSwitcher);

        this.items = items;
        this.template = template;
    }

    _createClass(PhotosSwitcher, [{
        key: 'build',
        value: function build() {
            var photosSwitcher = document.createElement('div');
            var html = this.template({ items: this.items });
            photosSwitcher.innerHTML = html.trim();
            photosSwitcher = photosSwitcher.firstElementChild;

            photosSwitcher.addEventListener('click', function (e) {
                var target = e.target;
                while (target != this) {
                    if (target.classList.contains('a-preview-photo')) {
                        var previews = this.getElementsByClassName('a-preview-photo');
                        for (var i = 0; i < previews.length; i++) {
                            previews[i].classList.remove('is-active');
                        }
                        target.classList.add('is-active');

                        var imgElement = this.getElementsByClassName('big-photo__img')[0];
                        imgElement.src = target.dataset.value;

                        return;
                    }
                    target = target.parentNode;
                }
            });
            return photosSwitcher;
        }
    }]);

    return PhotosSwitcher;
}();

var PhotoItem = function PhotoItem(thumbnailPath, fullPath) {
    _classCallCheck(this, PhotoItem);

    this.thumbnailPath = thumbnailPath;
    this.fullPath = fullPath;
};