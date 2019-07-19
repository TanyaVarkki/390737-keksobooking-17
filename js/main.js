'use strict';

var TYPE_OF_PLACE = ['palace', 'flat', 'house', 'bungalo'];
var MPM_WIDTH = 65;
var MPM_HEIGHT = 65;
var MPM_POINTER = 22;
var NUMBER_OF_PINS = 8;
var MIN_X = 0;
var MAX_X = 1200 - MPM_WIDTH;
var MIN_Y = 130 - (MPM_HEIGHT + MPM_POINTER);
var MAX_Y = 630 - (MPM_HEIGHT + MPM_POINTER);

var mapPins = document.querySelector('.map__pins');
var adForm = document.querySelector('.ad-form');
var adFormFieldsets = adForm.querySelectorAll('fieldset');
var mapPinMain = document.querySelector('.map__pin--main');
var addressInput = document.querySelector('input[name=address]');
var map = document.querySelector('.map');
var typeValue = document.getElementById('type');
var price = document.querySelector('#price');
var typePriceMap = {
  'bungalo': 0,
  'flat': 1000,
  'house': 5000,
  'palace': 10000
};

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

// создаем заданное количество меток
var renderPins = function () {
  var objectsNumber = getObjects(NUMBER_OF_PINS);
  renderPin(objectsNumber);
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

// активизация страницы
var activateMap = function () {
  map.classList.remove('map--faded');

  adForm.classList.remove('ad-form--disabled');

  removeFieldsetDisabled();
};

// метка движения пина
var isMainPinMove = true;

// функция, устанавающая границы перемещения
var setBorders = function (min, max, current) {
  if (current < min) {
    var value = min + 'px';
    return value;
  }
  if (current > max) {
    value = max + 'px';
    return value;
  }
  return value;
};

// отслеживаем нажатие на пин
mapPinMain.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  // записываем начальные координаты движения
  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  // отслеживаем перемещение и перезаписываем координаты
  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    // прописываем в стилях новое положение пина
    mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
    mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';

    // устанавливаем границы для перетаскивания метки по карте
    mapPinMain.style.top = setBorders(MIN_Y, MAX_Y, parseInt(mapPinMain.style.top, 10));
    mapPinMain.style.left = setBorders(MIN_X, MAX_X, parseInt(mapPinMain.style.left, 10));

    // заполняем адрес инпут в соответствии с новыми координатами и учетом размеров пина
    var pointerX = (mapPinMain.offsetLeft - shift.x) + Math.floor(MPM_WIDTH / 2);
    var pointerY = (mapPinMain.offsetTop - shift.y) + MPM_HEIGHT + MPM_POINTER;
    addressInput.value = pointerX + ',' + pointerY;
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();
    // приводим страницу в активный режим
    if (isMainPinMove) {
      isMainPinMove = false;
      activateMap();
      renderPins();
    }

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});

// изменяем минимальную стоимость за ночь в зависимости от типа жилья
var changePrice = function () {
  price.min = typePriceMap[typeValue.value];
  price.placeholder = typePriceMap[typeValue.value];
};

typeValue.addEventListener('change', changePrice);

// синхронизируем изменение времени
var adFormTimeIn = document.querySelector('#timein'); // поле выбора времени заезда
var adFormTimeOut = document.querySelector('#timeout'); // поле выбора времени выезда

var timeSync = function (select1, select2) {
  select2.value = select1.value;
};

// синхронизируем изменения в полях «Время заезда» и «Время выезда»
adFormTimeIn.addEventListener('change', function () {
  timeSync(adFormTimeIn, adFormTimeOut);
});

adFormTimeOut.addEventListener('change', function () {
  timeSync(adFormTimeOut, adFormTimeIn);
});
