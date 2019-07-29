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

    pinElement.style.left = pin.location.x + window.data.MP_WIDTH / 2 + 'px';
    pinElement.style.top = pin.location.y + window.data.MP_HEIGHT + 'px';
    pinElement.querySelector('img').src = pin.author.avatar;
    pinElement.querySelector('img').alt = pin.offer.type;

    return pinElement;
  };

  // удаление ранее отрисованных пинов
  var deletePin = function () {
    var newPins = mapPins.querySelectorAll('button:not(.map__pin--main)');
    for (var i = 0; i < newPins.length; i++) {
      mapPins.removeChild(newPins[i]);
    }
  };

  var isNewPin = false;

  // функция создает и добавляет фрагмент из объектов
  var renderPin = function (objects) {
    //проверяем были ли отрисованы пины
    if (isNewPin) {
      deletePin();
    };

    isNewPin = true;
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < NUMBER_OF_PINS; i++) {
      fragment.appendChild(mapPin(objects[i]));
    }
    mapPins.appendChild(fragment);
  };

  window.pin = {
    render: renderPin,
    mapAds: mapPins
  };

})();
