'use strict';

(function () {
  var WIZARD_COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var WIZARD_EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLOR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var Coordinate = function (x, y) {
    this.x = x;
    this.y = y;
  };

  var saveOnServer = function (evt) {
    window.backend.save(new FormData(form), window.setup.successHendler, window.setup.errorHendler);
    evt.preventDefault();

    var copyWizard = document.querySelector('svg').cloneNode(true);

    copyWizard.querySelector('#wizard-coat').style.fill = wizardCoat.style.fill;
    copyWizard.querySelector('#wizard-eyes').style.fill = wizardEyes.style.fill;

    var wizardBase64Right = window.svg2base64(copyWizard);

    copyWizard.querySelector('#wizard').setAttribute('transform', 'translate(62, 0) scale(-1, 1)');
    var wizardBase64Left = window.svg2base64(copyWizard);

    window.restartGame(wizardBase64Right, wizardBase64Left);
  };

  var onUserDialogEscPress = function (evt) {
    if (!evt.target.classList.contains('setup-user-name')) {
      window.utils.isEscEvent(evt, onUserDialogClose);
    }
  };

  var onUserDialogOpen = function () {
    window.setup.isOpenedDialog = true;
    userDialog.classList.remove('hidden');
    if (userDialogDefaultCoodts.y !== 0) {
      userDialog.style.left = userDialogDefaultCoodts.x + 'px';
      userDialog.style.top = userDialogDefaultCoodts.y + 'px';
    } else {
      // запоминаем начальные координаты
      userDialogDefaultCoodts.x = userDialog.offsetLeft;
      userDialogDefaultCoodts.y = userDialog.offsetTop;
    }

    window.corolize(wizardEyes, WIZARD_EYES_COLOR, inputsWizardEyes[0].defaultValue);
    window.corolize(wizardCoat, WIZARD_COAT_COLOR, inputsWizardColor[0].defaultValue);
    window.corolize(setupFireballWrap, FIREBALL_COLOR, inputFireballSetup.defaultValue);

    window.setup.colorEyes = inputsWizardEyes[0].defaultValue;
    window.setup.colorCoat = inputsWizardColor[0].defaultValue;
    window.setup.colorFireball = inputFireballSetup.defaultValue;

    window.setup.updateWizards();
    document.addEventListener('keydown', onUserDialogEscPress);
    form.addEventListener('submit', saveOnServer);
  };

  var onUserDialogClose = function () {
    window.setup.isOpenedDialog = false;
    userDialog.classList.add('hidden');
    document.removeEventListener('keydown', onUserDialogEscPress);
    form.removeEventListener('submit', saveOnServer);
  };

  var onCloseUserDialogEnterPress = function (evt) {
    window.utils.isEnterEvent(evt, onUserDialogClose);
  };

  var onOpenUserDialogEnterPress = function (evt) {
    window.utils.isEnterEvent(evt, onUserDialogOpen);
  };

  window.dialog = {
    saveOnServer: saveOnServer
  };

  var userDialog = document.querySelector('.setup');
  var form = userDialog.querySelector('.setup-wizard-form');
  var dialogHandle = userDialog.querySelector('.upload');
  var userDialogClose = userDialog.querySelector('.setup-close');
  var userDialogOpen = document.querySelector('.setup-open');
  var userDialogDefaultCoodts = new Coordinate(0, 0);

  var setupWizard = userDialog.querySelector('.setup-wizard');
  var inputsWizardColor = document.getElementsByName('coat-color');
  var wizardCoat = setupWizard.querySelector('.wizard-coat');
  var inputsWizardEyes = document.getElementsByName('eyes-color');
  var wizardEyes = setupWizard.querySelector('.wizard-eyes');
  var setupFireballWrap = userDialog.querySelector('.setup-fireball-wrap');
  var inputFireballSetup = setupFireballWrap.querySelector('input');

  dialogHandle.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoodts = new Coordinate(evt.clientX, evt.clientY);

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = new Coordinate(startCoodts.x - moveEvt.clientX, startCoodts.y - moveEvt.clientY);

      startCoodts = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      userDialog.style.top = (userDialog.offsetTop - shift.y) + 'px';
      userDialog.style.left = (userDialog.offsetLeft - shift.x) + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          dialogHandle.removeEventListener('click', onClickPreventDefault);
        };
        dialogHandle.addEventListener('click', onClickPreventDefault);
      }
    };

    var dragged = false;

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  userDialogOpen.addEventListener('click', onUserDialogOpen);
  userDialogOpen.addEventListener('keydown', onOpenUserDialogEnterPress);
  userDialogClose.addEventListener('click', onUserDialogClose);
  userDialogClose.addEventListener('keydown', onCloseUserDialogEnterPress);

})();

