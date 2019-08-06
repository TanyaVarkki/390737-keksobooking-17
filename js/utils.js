'use strict';
(function () {
  // функция поиска случайного числа в интервале
  var getRandomFromInterval = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  var ESC_KEYCODE = 27;

  var isEscEvent = function (evt, action) {
    if (evt.keyCode === ESC_KEYCODE) {
      action();
    }
  };

  window.utils = {
    isEscEvent: isEscEvent,
    getRandomFromInterval: getRandomFromInterval
  };

})();
