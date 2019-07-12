'use strict';

var TYPE_OF_PLACE = ['palace', 'flat', 'house', 'bungalo'];
var MIN_X = 0;
var MAX_X = 1200;
var MIN_Y = 130;
var MAX_Y = 630;
var MPM_WIDTH = 65;
var MPM_HEIGHT = 65;
var NUMBER_OF_PINS = 8;
var PINS = false;

var mapPins = document.querySelector('.map__pins');
var adForm = document.querySelector('.ad-form');
var adFormFieldsets = adForm.querySelectorAll('fieldset');
var mapPinMain = document.querySelector('.map__pin--main');
var addressInput = document.querySelector('input[name=address]');
var map = document.querySelector('.map');

// функция поиска случайного числа в интервале
var getRandomFromInterval = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

// создаем массив объектов
var getObjects = function (quantity) {
  var objects = [];
  for (var i = 0; i < quantity; i++) {
    objects[i] = {
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },
      offer: {
        type: getRandomFromInterval(TYPE_OF_PLACE[0], TYPE_OF_PLACE.length - 1)
      },
      location: {
        x: getRandomFromInterval(MIN_X, MAX_X),
        y: getRandomFromInterval(MIN_Y, MAX_Y)
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

// добавление атрибута disabled для филдсетов
var setFieldsetDisabled = function () {
  for (var i = 0; i < adFormFieldsets.length; i++) {
    adFormFieldsets[i].setAttribute('disabled', 'disabled');
  }
};
setFieldsetDisabled();

// удаление атрибута disabled для филдсетов
var removeFieldsetDisabled = function () {
  for (var i = 0; i < adFormFieldsets.length; i++) {
    adFormFieldsets[i].removeAttribute('disabled', 'disabled');
  }
};

// определяем координаты пина в неактивном режиме
// переносим данные в инпут адреса
var locX = mapPinMain.offsetLeft + Math.ceil(MPM_WIDTH / 2);
var locY = mapPinMain.offsetTop + Math.ceil(MPM_HEIGHT / 2);
addressInput.value = locX + ',' + locY;

// заполнение инпета адреса данными в зависимости от положения пина
var fillAddressInput = function(evt) {
  var lastX = evt.pageX;
  var lastY = evt.pageY;
  addressInput.value = lastX + ',' + lastY;
};

// активизация страницы
var activateMap = function () {
  map.classList.remove('map--faded');

  adForm.classList.remove('ad-form--disabled');

  removeFieldsetDisabled();
};

// переводим страницу Букинга в активный режим по клику на метку
mapPinMain.addEventListener('click', function (evt) {
  activateMap();

  // проверка на наличие пинов, если есть - то удаляем старые, рисуем новые,

  var flag = false;

  // создаем заданное количество меток
  var renderPins = function() {
    flag = true;
    var objectsNumber = getObjects(NUMBER_OF_PINS);
    renderPin(objectsNumber);
  };

  if (flag) {
    mapPins.removeChild(fragment);
  }

  fillAddressInput(evt);
});
