'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

document.addEventListener('DOMContentLoaded', function () {
    ViewHelper.updateBagInfo();

    var products = Product.fromObjects(window.catalog);
    var catalogObj = new Catalog(products, _.template(document.getElementById('catalog-item-template').innerHTML));
    var productNodes = catalogObj.build();
    var goodsListElement = document.getElementById("goods-list");
    for (var i = 0; i < productNodes.length; i++) {
        goodsListElement.appendChild(productNodes[i].cloneNode(true));
    }

    document.getElementById('filter').addEventListener('click', function (e) {
        var target = e.target;
        while (target != this) {
            if (target.classList.contains('filter-titles')) {
                this.classList.toggle('filter-state-open');
            }
            if (target.classList.contains('filter-list-item')) {
                var selectSection = void 0;
                var node = target.parentElement;
                while (node != this) {
                    if (node.classList.contains('filter-section')) {
                        selectSection = node;
                        break;
                    } else {
                        node = node.parentElement;
                    }
                }
                var selectResult = document.getElementById(selectSection.dataset.select);

                if (target.classList.contains('not-selected')) {
                    selectSection.classList.remove('is-selected');
                    selectResult.classList.remove('is-selected');
                    selectResult.innerText = target.dataset.default;
                } else {
                    selectSection.classList.add('is-selected');
                    selectResult.classList.add('is-selected');
                    selectResult.innerText = target.firstChild.innerText;
                }

                return;
            }
            target = target.parentNode;
        }
    });
});

var Catalog = function () {
    function Catalog(products, productTemplate) {
        _classCallCheck(this, Catalog);

        this.products = products;
        this.productTemplate = productTemplate;

        this.catalog = null;
    }

    _createClass(Catalog, [{
        key: 'build',
        value: function build() {
            var filter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { category: 'women', fashion: 'Casual style' };
            var order = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { orderBy: "dateAdded", orderDirection: "desc" };

            if (this.catalog != null) {
                return this.catalog;
            }

            this.catalog = document.createElement('div');

            var products = this.products;
            products = this.applyFiltering(products, filter);
            products = this.applySorting(products, order);

            products.forEach(function (product) {
                var html = this.productTemplate({ product: product });
                var div = document.createElement('div');
                div.innerHTML = html.trim();
                var productNode = div.firstChild;
                this.catalog.appendChild(productNode);
            }, this);

            this.catalog = this.catalog.childNodes;

            return this.catalog;
        }
    }, {
        key: 'applyFiltering',
        value: function applyFiltering(products, filter) {
            var filteredProducts = products;
            if (filter.hasOwnProperty('category') || filter.hasOwnProperty('fashion')) {
                filteredProducts = _.filter(filteredProducts, function (product) {
                    var satisfied = true;
                    if (filter.hasOwnProperty('category')) {
                        satisfied = satisfied && product.category == filter.category;
                    }
                    if (filter.hasOwnProperty('fashion')) {
                        satisfied = satisfied && product.fashion == filter.fashion;
                    }
                    return satisfied;
                });
            }

            return filteredProducts;
        }
    }, {
        key: 'applySorting',
        value: function applySorting(products, order) {
            var sortedProducts = products;
            if (order.hasOwnProperty('orderBy') && order.hasOwnProperty('orderDirection')) {
                sortedProducts = _.orderBy(sortedProducts, [order.orderBy], [order.orderDirection]);
            }

            return sortedProducts;
        }
    }]);

    return Catalog;
}();