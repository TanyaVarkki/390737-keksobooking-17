'use strict';
(function () {
  var housingType = document.querySelector('#housing-type');

  // выбираем из массива объявления похожие по типу жилья
  var filter = function (data) {
    var filtredData = data.filter(function (it) {
      return checkHousingType(it);
    });
    return filtredData;
  };

  // проверка на случай выбора любого типа жилья и конкретного типа жилья
  var checkHousingType = function (it) {
    if (housingType.value === 'any') {
      return true;
    }
    return housingType.value === it.offer.type;
  };

  window.filter = {
    housingType: filter
  }

})();
