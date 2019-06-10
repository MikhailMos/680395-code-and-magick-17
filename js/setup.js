'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан', 'Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];

var userDialog = document.querySelector('.setup');
var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var fragment = document.createDocumentFragment();

var MyObject = function (firstName, lastName, coatColor, eyesColor) {
  this.name = firstName + ' ' + lastName;
  this.coatColor = coatColor;
  this.eyesColor = eyesColor;
};

var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var getWizardArr = function (firstNames, lastNames, coatColors, eyesColors) {
  var resArr = [];
  for (var i = 0; i < firstNames.length; i++) {
    resArr.push(new MyObject(firstNames[getRandomInt(0, firstNames.length)], lastNames[getRandomInt(0, lastNames.length)], coatColors[getRandomInt(0, coatColors.length)], eyesColors[getRandomInt(0, eyesColors.length)]));
  }

  return resArr;
};

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var wizards = getWizardArr(WIZARD_NAMES, WIZARD_SURNAMES, WIZARD_COAT_COLOR, WIZARD_EYES_COLOR);

for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}

similarListElement.appendChild(fragment);
userDialog.classList.remove('hidden');
document.querySelector('.setup-similar').classList.remove('hidden');
