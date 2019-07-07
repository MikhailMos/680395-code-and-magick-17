'use strict';

(function () {

  var STYLE_ERROR = 'position: fixed; top: 0; left: 0; right: 0; font-size: 30px; margin: 0 auto; padding: 10px; text-align: center; background-color: rgba(255, 0, 0, 0.8); z-index: 10;';

  var updateWizards = function () {

    var matchesCoatEyesWizards = wizards.filter(function (it) {
      return (it.colorCoat === window.setup.colorCoat) && (it.colorEyes === window.setup.colorEyes);
    });

    var matchesOnlyCoatWizards = wizards.filter(function (it) {
      return (it.colorCoat === window.setup.colorCoat) && (it.colorEyes !== window.setup.colorEyes);
    });

    var matchesOnlyEyesWizards = wizards.filter(function (it) {
      return (it.colorCoat !== window.setup.colorCoat) && (it.colorEyes === window.setup.colorEyes);
    });

    var otherWizards = wizards.filter(function (it) {
      return (it.colorCoat !== window.setup.colorCoat) && (it.colorEyes !== window.setup.colorEyes);
    });

    var sameWizards = [].concat(matchesCoatEyesWizards, matchesOnlyCoatWizards, matchesOnlyEyesWizards, otherWizards);

    window.render(sameWizards);
  };

  var loadHendler = function (data) {
    wizards = data.slice();
    if (window.setup.isOpenedDialog) {
      updateWizards();
    }
  };

  var errorHendler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = STYLE_ERROR;

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var successHendler = function (responsive) {
    if ((typeof (responsive) === 'object') && (JSON.stringify(responsive).length > 0)) {
      form.removeEventListener('submit', window.dialog.saveOnServer);
      userDialog.classList.add('hidden');
    } else {
      errorHendler('Что-то пошло не так!');
    }
  };

  var userDialog = document.querySelector('.setup');
  var form = userDialog.querySelector('.setup-wizard-form');
  var wizards = [];

  var colorEyes;
  var colorCoat;
  var colorFireBall;

  window.setup = {
    isOpenedDialog: false,
    successHendler: successHendler,
    errorHendler: errorHendler,
    updateWizards: updateWizards,
    colorEyes: colorEyes,
    colorCoat: colorCoat,
    colorFireBall: colorFireBall
  };

  window.backend.load(loadHendler, errorHendler);

})();
