'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CarouselItem = function CarouselItem(imagePath, action) {
    _classCallCheck(this, CarouselItem);

    this.imagePath = imagePath;
    this.action = action;
};

var Carousel = function () {
    function Carousel(items, carouselTemplate) {
        _classCallCheck(this, Carousel);

        this.items = items;
        this.carouselTemplate = carouselTemplate;

        this._currentIndex = 0;
        this.carousel = null;
        this.timeoutId = null;
        this.timeoutMilisec = 10000;

        this.touchStartX = 0;
        this.touchStartY = 0;
    }

    _createClass(Carousel, [{
        key: 'next',
        value: function next() {
            this.currentIndex++;
            this.showCurrentSlide();
        }
    }, {
        key: 'previous',
        value: function previous() {
            this.currentIndex--;
            this.showCurrentSlide();
        }
    }, {
        key: 'showCurrentSlide',
        value: function showCurrentSlide() {
            var itemElements = this.carousel.getElementsByClassName("carousel_item");
            for (var i = 0; i < itemElements.length; i++) {
                var item = itemElements[i];
                item.classList.remove('active');
                item.classList.remove('animated');
                item.classList.remove('fadeIn');
            }

            var classInstance = this;

            var currentSlide = _.find(itemElements, function (item) {
                return item.dataset.id == classInstance.currentIndex;
            });

            currentSlide.classList.add("active");
            currentSlide.classList.add("animated");
            currentSlide.classList.add("fadeIn");

            var indicatorElements = this.carousel.getElementsByClassName("carousel_indicator_item");
            for (var _i = 0; _i < indicatorElements.length; _i++) {
                indicatorElements[_i].classList.remove('active');
            }

            var indicatorElement = _.find(indicatorElements, function (item) {
                return item.dataset.id == classInstance.currentIndex;
            });
            indicatorElement.classList.add("active");

            this.runTimer();
        }
    }, {
        key: 'build',
        value: function build() {
            if (this.carousel != null) {
                return this.carousel;
            }

            var html = this.carouselTemplate({ items: this.items });

            this.carousel = document.createElement('div');
            this.carousel.innerHTML = html;
            this.carousel = this.carousel.firstElementChild;

            var classInstance = this;

            var nextBtn = this.carousel.getElementsByClassName("next_btn")[0];
            if (nextBtn != undefined) {
                nextBtn.onclick = function (event) {
                    classInstance.next();
                };
            }

            var prevBtn = this.carousel.getElementsByClassName("prev_btn")[0];
            if (prevBtn != undefined) {
                prevBtn.onclick = function (event) {
                    classInstance.previous();
                };
            }

            var indicator = this.carousel.getElementsByClassName("indicator")[0];

            indicator.addEventListener("click", function (event) {
                var target = event.target;
                while (target != this) {
                    if (target.classList.contains('carousel_indicator_item')) {
                        classInstance.currentIndex = parseInt(event.target.dataset.id);
                        classInstance.showCurrentSlide();
                        return;
                    }
                    target = target.parentNode;
                }
            });

            //swiping
            this.carousel.addEventListener("touchstart", this.handleStartSwipe.bind(this), false);
            this.carousel.addEventListener("touchend", this.handleEndSwipe.bind(this), false);

            return this.carousel;
        }
    }, {
        key: 'runTimer',
        value: function runTimer() {
            this.stopTimer();
            this.timeoutId = setTimeout(this.next.bind(this), this.timeoutMilisec);
        }
    }, {
        key: 'stopTimer',
        value: function stopTimer() {
            clearTimeout(this.timeoutId);
        }
    }, {
        key: 'handleStartSwipe',
        value: function handleStartSwipe(event) {
            event.preventDefault();

            this.touchStartX = event.changedTouches[0].clientX;
            this.touchStartY = event.changedTouches[0].clientY;
        }
    }, {
        key: 'handleEndSwipe',
        value: function handleEndSwipe(event) {
            event.preventDefault();

            var touchEndX = event.changedTouches[0].clientX;
            var touchEndY = event.changedTouches[0].clientY;

            var horizontalOffset = touchEndX - this.touchStartX;
            var verticalOffset = touchEndY - this.touchStartY;

            if (Math.abs(horizontalOffset) > Math.abs(verticalOffset)) {
                if (horizontalOffset > 0) {
                    this.previous();
                } else {
                    this.next();
                }
            }

            this.touchStartX = 0;
            this.touchStartY = 0;
        }
    }, {
        key: 'currentIndex',
        set: function set(index) {
            if (index >= this.items.length) {
                this._currentIndex = 0;
            } else if (index < 0) {
                this._currentIndex = this.items.length - 1;
            } else {
                this._currentIndex = index;
            }
        },
        get: function get() {
            return this._currentIndex;
        }
    }]);

    return Carousel;
}();