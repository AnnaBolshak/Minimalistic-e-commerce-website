'use strict';

document.addEventListener('DOMContentLoaded', function () {
    var photoItems = [new PhotoItem('img/item/thumb_21.jpg', 'img/item/full2.jpg'), new PhotoItem('img/item/thumb_22.jpg', 'img/item/full22.jpg'), new PhotoItem('img/item/thumb_23.jpg', 'img/item/full23.jpg')];

    var photosSwitcher = new PhotosSwitcher(photoItems, _.template(document.getElementById('photos-switcher-template').innerHTML));

    document.getElementById("photogallery-wrapper").appendChild(photosSwitcher.build());
});