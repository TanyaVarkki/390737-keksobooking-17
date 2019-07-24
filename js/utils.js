'use strict';
(function () {
  // функция поиска случайного числа в интервале
  var getRandomFromInterval = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  window.utils = {
    getRandomFromInterval: getRandomFromInterval
  };

})();
