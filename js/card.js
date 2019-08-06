'use strict';

(function () {
  // карточка объявления
  var cardTemplate = document.querySelector('#card')
	  .content
	  .querySelector('.map__card');
  var filtersContainer = document.querySelector('.map__filters-container');

  var card;

  var HousingType = {
    bungalo: 'Бунгало',
    flat: 'Квартира',
    house: 'Дом',
    palace: 'Дворец'
  };

  // открытие карточки удалением класса хидден
  var openPopup = function () {
    var popup = document.querySelector('.popup');
    popup.classList.remove('hidden');
  };

  // закрытие карточки по нажатию на esc
  var onPopupEscPress = function (evt) {
    window.utils.isEscEvent(evt, closePopup);
  };

  var closePopup = function () {
    var popup = document.querySelector('.popup');
    popup.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
  };

  // создаем элемент из списка удобств
  var createLiElement = function (el, secondClass) {
    var li = document.createElement('li');
    li.classList.add('popup__feature');
    li.classList.add('popup__feature--' + secondClass + '');
    el.insertAdjacentElement('afterbegin', li);
  };

  //создаем элемент для изображения
  var createImgElement = function (el, imgSrc) {
    var img = document.createElement('img');
    img.classList.add('popup__photo');
    img.width = '45';
    img.height = '40';
    img.alt = 'Фотография жилья';
    img.src = imgSrc;
    el.insertAdjacentElement('afterbegin', img);
  };

  //создаем карточку с помощью клонирования образца
  var renderCard = function (cardElement) {
    card = cardTemplate.cloneNode(true);

    card.querySelector('.popup__title').textContent = cardElement.offer.title;
    card.querySelector('.popup__text--address').textContent = cardElement.offer.address;
    card.querySelector('.popup__text--price').textContent = cardElement.offer.price + '₽/ночь';
    card.querySelector('.popup__type').textContent = HousingType[cardElement.offer.type];
    card.querySelector('.popup__text--capacity').textContent = 'Комнат: ' + cardElement.offer.rooms + ', ' + 'гостей: ' + cardElement.offer.guests ;
    card.querySelector('.popup__text--time').textContent = 'Заезд после ' + cardElement.offer.checkin + ', выезд до ' + cardElement.offer.checkout;
    var cardFeature = card.querySelector('.popup__features');
    card.querySelector('.popup__description').textContent = cardElement.offer.description;
    var cardPhotos = card.querySelector('.popup__photos');
    card.querySelector('.popup__avatar').src = cardElement.author.avatar;
    cardFeature.innerHTML = '';
    for (var j = 0; j < cardElement.offer.features.length; j++) {
      createLiElement(cardFeature, cardElement.offer.features[j]);
    }
    cardPhotos.innerHTML = '';
    for (var i = 0; i < cardElement.offer.photos.length; i++) {
      createImgElement(cardPhotos, cardElement.offer.photos[i]);
    }
    card.classList.add('hidden');
    return card;
  };

  // вставляем карточку в разметку перед элементом filtersContainer
  // закрытие карточки по нажатию на эскейп и на крестик
  var cardControl = function (elements) {
    renderCard(elements);
    window.map.area.insertBefore(card, filtersContainer);

    var popupClose = document.querySelector('.popup__close');
    popupClose.addEventListener('click', function () {
      closePopup();
    });
    document.addEventListener('keydown', onPopupEscPress);
  };

  // показываем карточку при клике на пин
  var setCard = function (pins) {
    var selectPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var i = 0; i < selectPins.length; i++) {
      selectPins[i].addEventListener('click', function () {
        cardControl(pins[i]);
        openPopup();
      });
    }
  };

  window.card = {
    set: setCard
  };

})();
