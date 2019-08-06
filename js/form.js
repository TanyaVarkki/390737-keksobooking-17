'use strict';

(function () {
  // работа с формой
  var adForm = document.querySelector('.ad-form');
  var adFormFieldsets = adForm.querySelectorAll('fieldset');
  var typeValue = document.getElementById('type');
  var price = document.querySelector('#price');
  var adFormTimeIn = document.querySelector('#timein'); // поле выбора времени заезда
  var adFormTimeOut = document.querySelector('#timeout'); // поле выбора времени выезда
  var typePriceMap = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
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

  // изменяем минимальную стоимость за ночь в зависимости от типа жилья
  var changePrice = function () {
    price.min = typePriceMap[typeValue.value];
    price.placeholder = typePriceMap[typeValue.value];
  };

  typeValue.addEventListener('change', changePrice);

  // синхронизируем изменение времени
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

  window.form = {
    removeFieldsetDisabled: removeFieldsetDisabled,
    ad: adForm
  };

})();
