'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан', 'Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLOR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var MAX_WIZARD = 5;
var ENTER_KEYCODE = 13;
var ESC_KEYCODE = 27;

var Wizard = function (firstName, lastName, coatColor, eyesColor) {
  this.name = firstName + ' ' + lastName;
  this.coatColor = coatColor;
  this.eyesColor = eyesColor;
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

var onUserDialogEscPress = function (evt) {
  if ((evt.keyCode === ESC_KEYCODE) && (!evt.target.classList.contains('setup-user-name'))) {
    closeUserDialog();
  }
};

var openUserDialog = function () {
  userDialog.classList.remove('hidden');
  document.addEventListener('keydown', onUserDialogEscPress);
};

var closeUserDialog = function () {
  userDialog.classList.add('hidden');
  document.removeEventListener('keydown', onUserDialogEscPress);
};

var userDialog = document.querySelector('.setup');
var userDialogClose = userDialog.querySelector('.setup-close');
var userDialogOpen = document.querySelector('.setup-open');
var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var fragment = document.createDocumentFragment();
var wizards = [];
var setupWizard = userDialog.querySelector('.setup-wizard');
var inputsWizardColor = document.getElementsByName('coat-color');
var wizardCoat = setupWizard.querySelector('.wizard-coat');
var inputsWizardEyes = document.getElementsByName('eyes-color');
var wizardEyes = setupWizard.querySelector('.wizard-eyes');
var setupFireballWrap = userDialog.querySelector('.setup-fireball-wrap');
var inputFireballSetup = setupFireballWrap.querySelector('input');

for (var i = 0; i < MAX_WIZARD; i++) {
  wizards.push(new Wizard(WIZARD_NAMES[getRandomInt(0, WIZARD_NAMES.length)], WIZARD_SURNAMES[getRandomInt(0, WIZARD_SURNAMES.length)], WIZARD_COAT_COLOR[getRandomInt(0, WIZARD_COAT_COLOR.length)], WIZARD_EYES_COLOR[getRandomInt(0, WIZARD_EYES_COLOR.length)]));
  fragment.appendChild(renderWizard(wizards[i]));
}

similarListElement.appendChild(fragment);
userDialogOpen.addEventListener('click', function () {
  openUserDialog();
});

userDialogOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openUserDialog();
  }
});

userDialogClose.addEventListener('click', function () {
  closeUserDialog();
});

userDialogClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closeUserDialog();
  }
});

wizardCoat.addEventListener('click', function () {
  wizardCoat.style.fill = WIZARD_COAT_COLOR[getRandomInt(0, WIZARD_COAT_COLOR.length)];
  inputsWizardColor[0].defaultValue = wizardCoat.style.fill;
});

wizardEyes.addEventListener('click', function () {
  wizardEyes.style.fill = WIZARD_EYES_COLOR[getRandomInt(0, WIZARD_EYES_COLOR.length)];
  inputsWizardEyes[0].defaultValue = wizardEyes.style.fill;
});

setupFireballWrap.addEventListener('click', function () {
  inputFireballSetup.defaultValue = FIREBALL_COLOR[getRandomInt(0, FIREBALL_COLOR.length)];
  setupFireballWrap.style.backgroundColor = inputFireballSetup.defaultValue;
});

document.querySelector('.setup-similar').classList.remove('hidden');
