'use strict';

(function () {
  window.corolize = function (element, colors, inputDefaultValue) {
    element.addEventListener('click', function () {
      var color = colors[window.utils.getRandomInt(0, colors.length)];
      if (element.tagName.toLowerCase() === 'div') {
        inputDefaultValue = color;
        element.style.backgroundColor = inputDefaultValue;
      } else {
        element.style.fill = color;
        inputDefaultValue = element.style.fill;
      }
    });
  };
})();
