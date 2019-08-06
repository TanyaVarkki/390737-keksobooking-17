'use strict';
(function () {
  var housingType = document.querySelector('#housing-type');


  // устанавливаем обработчик на фильтр на по типу жилья
  housingType.addEventListener('change', function () {
    housingTypeFilter();
  });

  var housingTypeFilter = function () {
    filterOffers();
  };

  var filterOffers = function () {
    var filteredData = [];
    filteredData = window.data.pins.filter(function (it) {
      return housingType.value === 'any' || it.offer.type === housingType.value;
    });
    window.pin.render(filteredData);
  };

})();
