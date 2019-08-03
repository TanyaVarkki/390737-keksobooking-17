'use strict';

(function () {
  // создаем метки похожих объявлений
  var NUMBER_OF_PINS = 5;
  var mapPins = document.querySelector('.map__pins');

  var pinTemplate = document.querySelector('#pin')
      .content
      .querySelector('button');

  // создаем элемент с помощью клонирования исходного образца
  var mapPin = function (pin) {
    var pinElement = pinTemplate.cloneNode(true);

    pinElement.style.left = pin.location.x + window.data.MP_WIDTH / 2 + 'px';
    pinElement.style.top = pin.location.y + window.data.MP_HEIGHT + 'px';
    pinElement.querySelector('img').src = pin.author.avatar;
    pinElement.querySelector('img').alt = pin.offer.type;

    return pinElement;
  };

  // удаление ранее отрисованных пинов
  var deletePin = function () {
    var renderedPins = mapPins.querySelectorAll('button:not(.map__pin--main)');
    if (renderedPins.length) {
      for (var i = 0; i < renderedPins.length; i++) {
        mapPins.removeChild(renderedPins[i]);
      }
    }
  };

  // функция создает и добавляет фрагмент из объектов
  var renderPin = function (objects) {
    // если пины были отрисованы, удаляем их
    deletePin();
    var fragment = document.createDocumentFragment();
    var cuttedPins = objects.slice(0, NUMBER_OF_PINS);
    for (var i = 0; i < cuttedPins.length; i++) {
      fragment.appendChild(mapPin(cuttedPins[i]));
    }
    mapPins.appendChild(fragment);
  };

  window.pin = {
    render: renderPin,
    mapAds: mapPins
  };

})();
