'use strict';
// приводим страницу в активный режим передвижением пина

(function () {
  var mapPinMain = document.querySelector('.map__pin--main');
  var addressInput = document.querySelector('input[name=address]');
  var map = document.querySelector('.map');

  // определяем координаты пина в неактивном режиме
  // переносим данные в инпут адреса
  var locX = mapPinMain.offsetLeft + Math.ceil(window.data.MPM_WIDTH / 2);
  var locY = mapPinMain.offsetTop + Math.ceil(window.data.MPM_HEIGHT / 2);
  addressInput.value = locX + ',' + locY;

  // активизация страницы
  var activateMap = function () {
    map.classList.remove('map--faded');

    window.form.ad.classList.remove('ad-form--disabled');

    window.form.removeFieldsetDisabled();
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
      mapPinMain.style.top = setBorders(window.data.MIN_Y, window.data.MAX_Y, parseInt(mapPinMain.style.top, 10));
      mapPinMain.style.left = setBorders(window.data.MIN_X, window.data.MAX_X, parseInt(mapPinMain.style.left, 10));

      // заполняем адрес инпут в соответствии с новыми координатами и учетом размеров пина
      var pointerX = (mapPinMain.offsetLeft - shift.x) + Math.floor(window.data.MPM_WIDTH / 2);
      var pointerY = (mapPinMain.offsetTop - shift.y) + window.data.MPM_HEIGHT + window.data.MPM_POINTER;
      addressInput.value = pointerX + ',' + pointerY;
    };

    // отрисовка пинов при успешной обработке запроса

    var successHandler = function (objects) {
      window.data.pins = objects;
      window.pin.render(window.data.pins);
      window.card.set(window.data.pins);
    };

    // при ошибке
    var errorHandler = function (errorMessage) {
      var node = document.createElement('div');
      node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
      node.style.position = 'absolute';
      node.style.left = 0;
      node.style.right = 0;
      node.style.fontSize = '30px';

      node.textContent = errorMessage;
      document.body.insertAdjacentElement('afterbegin', node);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      // приводим страницу в активный режим
      if (isMainPinMove) {
        isMainPinMove = false;
        activateMap();
        window.backend.load(successHandler, errorHandler);
      }

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  window.map = {
    area: map
  };

})();
