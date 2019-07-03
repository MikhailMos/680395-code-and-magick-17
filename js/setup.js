'use strict';

(function () {
  var WIZARD_COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var WIZARD_EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLOR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var MAX_WIZARD = 5;

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

    return wizardElement;
  };

  var loadHendler = function (wizards) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < MAX_WIZARD; i++) {
      fragment.appendChild(renderWizard(wizards[i]));
    }

    similarListElement.appendChild(fragment);
    document.querySelector('.setup-similar').classList.remove('hidden');
  };

  var errorHendler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 10; margin: 0 auto; padding: 10px; text-align: center; bacground-color: rgba(239, 32, 32, 0.7);';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '25px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var successHendler = function (responsive) {
    if ((typeof (responsive) === 'object') && (JSON.stringify(responsive).length > 0)) {
      userDialog.classList.add('hidden');
    }
  };

  var userDialog = document.querySelector('.setup');
  var form = userDialog.querySelector('.setup-wizard-form');
  var similarListElement = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  var setupWizard = userDialog.querySelector('.setup-wizard');
  var inputsWizardColor = document.getElementsByName('coat-color');
  var wizardCoat = setupWizard.querySelector('.wizard-coat');
  var inputsWizardEyes = document.getElementsByName('eyes-color');
  var wizardEyes = setupWizard.querySelector('.wizard-eyes');
  var setupFireballWrap = userDialog.querySelector('.setup-fireball-wrap');
  var inputFireballSetup = setupFireballWrap.querySelector('input');

  window.corolize(wizardEyes, WIZARD_EYES_COLOR, inputsWizardEyes[0].defaultValue);
  window.corolize(wizardCoat, WIZARD_COAT_COLOR, inputsWizardColor[0].defaultValue);
  window.corolize(setupFireballWrap, FIREBALL_COLOR, inputFireballSetup.defaultValue);

  window.backend.load(loadHendler, errorHendler);

  form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form), successHendler, errorHendler);
    evt.preventDefault();
  });
})();
