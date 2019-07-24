'use strict';

(function () {
  // создаем метки похожих объявлений
  var NUMBER_OF_PINS = 8;
  var TYPE_OF_PLACE = ['palace', 'flat', 'house', 'bungalo'];
  var mapPins = document.querySelector('.map__pins');

  // создаем массив объектов
  var getObjects = function (quantity) {
    var objects = [];
    for (var i = 0; i < quantity; i++) {
      objects[i] = {
        author: {
          avatar: 'img/avatars/user0' + (i + 1) + '.png'
        },
        offer: {
          type: window.utils.getRandomFromInterval(TYPE_OF_PLACE[0], TYPE_OF_PLACE.length - 1)
        },
        location: {
          x: window.utils.getRandomFromInterval(window.data.MIN_X, window.data.MAX_X),
          y: window.utils.getRandomFromInterval(window.data.MIN_Y, window.data.MAX_Y)
        }
      };
    }
    return objects;
  };

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
    for (var i = 0; i < objects.length; i++) {
      fragment.appendChild(mapPin(objects[i]));
    }
    mapPins.appendChild(fragment);
  };

  // создаем заданное количество меток
  var renderPins = function () {
    var objectsNumber = getObjects(NUMBER_OF_PINS);
    renderPin(objectsNumber);
  };

  window.pin = {
    render: renderPins
  };

})();
