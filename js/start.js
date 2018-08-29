'use strict';

document.addEventListener('DOMContentLoaded', function () {
    ViewHelper.updateBagInfo();

    var carouselItems = [new CarouselItem('img/carousel/1.jpg', 'catalog.html'), new CarouselItem('img/carousel/2.jpg', 'item.html'), new CarouselItem('img/carousel/3.jpg', 'item2.html')];

    var carousel = new Carousel(carouselItems, _.template(document.getElementById('carousel-template').innerHTML));

    document.getElementById("carousel-wrapper").appendChild(carousel.build());
    carousel.showCurrentSlide();
});