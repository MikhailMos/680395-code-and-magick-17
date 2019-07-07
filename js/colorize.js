'use strict';

(function () {

  window.corolize = function (element, colors, inputDefaultValue) {
    element.addEventListener('click', function (evt) {
      var color = colors[window.utils.getRandomInt(0, colors.length)];
      if (element.tagName.toLowerCase() === 'div') {
        inputDefaultValue = color;
        element.style.backgroundColor = inputDefaultValue;
        window.setup.colorFireball = inputDefaultValue;
      } else {
        element.style.fill = color;
        inputDefaultValue = element.style.fill;
        if (evt.target.classList.contains('wizard-eyes')) {
          window.setup.colorEyes = color;
        } else {
          window.setup.colorCoat = color;
        }
      }
      window.setup.updateWizards();
    });
  };
})();
