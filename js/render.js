'use strict';

(function () {
  var MAX_WIZARD = 5;

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;
    // wizardElement.querySelector('.setup-fireball-wrap').style.backgroundColor = wizard.colorFireball;

    return wizardElement;
  };

  window.render = function (data) {
    var fragment = document.createDocumentFragment();
    var takeNumber = data.length > MAX_WIZARD ? MAX_WIZARD : data.length;

    similarListElement.innerHTML = '';

    for (var i = 0; i < takeNumber; i++) {
      fragment.appendChild(renderWizard(data[i]));
    }

    similarListElement.appendChild(fragment);
    if (similar.classList.contains('hidden')) {
      similar.classList.remove('hidden');
    }
  };

  var similar = document.querySelector('.setup-similar');
  var similarListElement = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

})();
