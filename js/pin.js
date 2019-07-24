'use strict';

(function () {
  // создаем метки похожих объявлений
  var NUMBER_OF_PINS = 8;
  var mapPins = document.querySelector('.map__pins');

  var pinTemplate = document.querySelector('#pin')
      .content
      .querySelector('button');

  // создаем элемент с помощью клонирования исходного образца
  var mapPin = function (pin) {
    var pinElement = pinTemplate.cloneNode(true);

    pinElement.style.left = pin.location.x + 20 + 'px';
    pinElement.style.top = pin.location.y + 40 + 'px';
    pinElement.querySelector('img').src = pin.author.avatar;
    pinElement.querySelector('img').alt = pin.offer.type;

    return pinElement;
  };

  // функция создает и добавляет фрагмент из объектов
  var renderPin = function (objects) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < NUMBER_OF_PINS; i++) {
      fragment.appendChild(mapPin(objects[i]));
    }
    mapPins.appendChild(fragment);
  };

  window.pin = {
    render: renderPin
  };

})();
