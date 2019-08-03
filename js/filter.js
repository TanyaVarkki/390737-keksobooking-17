'use strict';
(function () {
  var housingType = document.querySelector('#housing-type');
  var currentHousingType = housingType.value;

  // устанавливаем обработчик на фильтр на по типу жилья
  housingType.addEventListener('change', function () {
	   housingTypeFilter();
	  });

  var housingTypeFilter = function () {
    currentHousingType = housingType.value;
    filterOffers();
  };

  var filterOffers = function () {
    var filteredData = [];
    filteredData = window.data.pins.filter(function (it) {
      return housingType.value === 'any' || it.offer.type === housingType.value;
    });
    debugger;
    window.pin.render(filteredData);
  };



  // // устанавливаем обработчик на фильтр на по типу жилья
  // housingType.addEventListener('change', function () {
  //   currentHousingType === housingType.value;
  //   filterOffers();
  // });
  //
  // // выбираем из массива объявления похожие по типу жилья
  // var housingTypeFilter = function (data) {
  //   var filtredData = data.filter(function (it) {
  //     return checkHousingType(it);
  //   });
  //   return filtredData;
  // };
  //
  // // проверка на случай выбора любого типа жилья и конкретного типа жилья
  // var checkHousingType = function (it) {
  //   return housingType.value === 'any' || it.offer.type === housingType.value;
  // };
  //
  // var filterOffers = function () {
  //   var sameOffersPins = window.data.pins.filter(housingTypeFilter);
  //
  //   window.offers.type(sameOffersPins);
  // };


  // var filter = function (data) {
  //   var filteredData = data.filter(finction(it) {
  //     if (housingType.value === 'any') {
  //       return true;
  //     }
  //     return housingType.value === it.offer.type;
  //   });
  //   window.render(filteredData);
  //   debugger;
  // };


  // housingType.addEventListener('change', function (evt) {
  //   var filter = function (data) {
  //     var filteredData = data.filter(finction(it) {
  //       return evt.target.it === it.offer.type;
  //     }
  //
  //     };
  //
  //     window.render(filteredData);
  //   });
    // var filter = function (data) {
    //   var filteredData = data.filter(finction(it) {
    //     return evt.target.it === it.offer.type;
    //   });
    // }


  // // выбираем из массива объявления похожие по типу жилья
  // var filter = function (data) {
  //   var filtredData = data.filter(function (it) {
  //     return checkHousingType(it);
  //   });
  //   return filtredData;
  // };
  //
  // // проверка на случай выбора любого типа жилья и конкретного типа жилья
  // var checkHousingType = function (it) {
  //   if (housingType.value === 'any') {
  //     return true;
  //   }
  //   return housingType.value === it.offer.type;
  // };

})();
