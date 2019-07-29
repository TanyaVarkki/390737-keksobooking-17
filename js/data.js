'use strict';
(function () {
  var MP_WIDTH = 50;
  var MP_HEIGHT = 70;
  var MPM_WIDTH = 65;
  var MPM_HEIGHT = 65;
  var MPM_POINTER = 22;
  var MIN_X = 0;
  var MAX_X = 1200 - MPM_WIDTH;
  var MIN_Y = 130 - (MPM_HEIGHT + MPM_POINTER);
  var MAX_Y = 630 - (MPM_HEIGHT + MPM_POINTER);

  window.data = {
    MIN_X: MIN_X,
    MAX_X: MAX_X,
    MIN_Y: MIN_Y,
    MAX_Y: MAX_Y,
    MP_WIDTH: MP_WIDTH,
    MP_HEIGHT: MP_HEIGHT,
    MPM_WIDTH: MPM_WIDTH,
    MPM_HEIGHT: MPM_HEIGHT,
    MPM_POINTER: MPM_POINTER
  };

})();
