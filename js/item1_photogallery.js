'use strict';

document.addEventListener('DOMContentLoaded', function () {
    var photoItems = [new PhotoItem('img/item/thumb_11.jpg', 'img/item/full1.jpg'), new PhotoItem('img/item/thumb_12.jpg', 'img/item/full12.jpg'), new PhotoItem('img/item/thumb_13.jpg', 'img/item/full13.jpg')];

    var photosSwitcher = new PhotosSwitcher(photoItems, _.template(document.getElementById('photos-switcher-template').innerHTML));

    document.getElementById("photogallery-wrapper").appendChild(photosSwitcher.build());
});