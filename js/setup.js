'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан', 'Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLOR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var MAX_WIZARD = 5;

var Wizard = function () {
  this.name = WIZARD_NAMES[getRandomInt(0, WIZARD_NAMES.length)] + ' ' + WIZARD_SURNAMES[getRandomInt(0, WIZARD_SURNAMES.length)];
  this.coatColor = WIZARD_COAT_COLOR[getRandomInt(0, WIZARD_COAT_COLOR.length)];
  this.eyesColor = WIZARD_EYES_COLOR[getRandomInt(0, WIZARD_EYES_COLOR.length)];
};

var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var getColor = function (element, colors, inputDefaultValue) {
  element.addEventListener('click', function () {
    var color = colors[getRandomInt(0, colors.length)];
    if (element.tagName.toLowerCase() === 'div') {
      inputDefaultValue = color;
      element.style.backgroundColor = inputDefaultValue;
    } else {
      element.style.fill = color;
      inputDefaultValue = element.style.fill;
    }
  });
};

var userDialog = document.querySelector('.setup');
var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var fragment = document.createDocumentFragment();
var setupWizard = userDialog.querySelector('.setup-wizard');
var inputsWizardColor = document.getElementsByName('coat-color');
var wizardCoat = setupWizard.querySelector('.wizard-coat');
var inputsWizardEyes = document.getElementsByName('eyes-color');
var wizardEyes = setupWizard.querySelector('.wizard-eyes');
var setupFireballWrap = userDialog.querySelector('.setup-fireball-wrap');
var inputFireballSetup = setupFireballWrap.querySelector('input');

for (var i = 0; i < MAX_WIZARD; i++) {
  fragment.appendChild(renderWizard(new Wizard()));
}

similarListElement.appendChild(fragment);

getColor(wizardEyes, WIZARD_EYES_COLOR, inputsWizardEyes[0].defaultValue);
getColor(wizardCoat, WIZARD_COAT_COLOR, inputsWizardColor[0].defaultValue);
getColor(setupFireballWrap, FIREBALL_COLOR, inputFireballSetup.defaultValue);

document.querySelector('.setup-similar').classList.remove('hidden');
