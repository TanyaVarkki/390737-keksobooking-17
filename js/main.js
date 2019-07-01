'use strict';

var TYPE_OF_PLACE = ['palace', 'flat', 'house', 'bungalo'];
var AUTHORS_QUANTITY = 8;
var MIN_X = 0;
var MAX_X = 600;
var MIN_Y = 130;
var MAX_Y = 630;


//функция поиска случайного числа
var getRandomItem = function (array) {
  var rand = Math.floor(Math.random() * array.length);
  return array[rand];
};

// создание массива номеров
var getAuthorNumbers = function(AUTHORS_QUANTITY) {
  var authorNumbers = [];
  for (var i = 1; i <= AUTHORS_QUANTITY; i++) {
    authorNumbers[i] = '0' + 'i';
  }
  return authorNumbers;
};

// функция поиска случайного числа в интервале
var getRandomFromInterval = function(min, max) {
  return Math.floor(Math.random()*(max-min+1)+min);
};

// создаем массив объектов
var getObjects = function(quantity) {
  var objects = [];
  for (var i = 0; i < quantity; i++ ) {
    objects[i] = {
      author: {
        avatar: 'img/avatars/user' + 'getRandomItem(getAuthorNumbers)' + '.png'
      },
      offer: {
        type: getRandomItem(TYPE_OF_PLACE)
      },
      location: {
        x: getRandomFromInterval(MIN_X, MAX_X),
        y: getRandomFromInterval(MIN_Y, MAX_Y)
      }
    }
  }
  return objects;
};

// remove class .map--faded
var map = document.querySelector('.map');
map.classList.remove('map--faded');

var mapPins = document.querySelector('.map__pins');

var pinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.pin');

var mapPin = function (pin) {
  var pinElement = pinTemplate.cloneNode(true);

  pinElement.querySelector('.map__pin').style.left = pin.location.x + 20;
  pinElement.querySelector('.map__pin').style.top = pin.location.y + 40;
  pinElement.querySelector('img').src = pin.author.avatar;
  pinElement.querySelector('img').alt = pin.offer.type;

  return pinElement;
};

var renderPin = function (objects) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < objects.length; i++) {
    fragment.appendChild(renderPin(objects[i]));
  }
  mapPins.appendChild(fragment);
};


var objectsNumber = getObjects(8);
renderPin(objectsNumber);
