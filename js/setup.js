'use strict';

(function () {

  var STYLE_ERROR = 'position: fixed; top: 0; left: 0; right: 0; font-size: 30px; margin: 0 auto; padding: 10px; text-align: center; background-color: rgba(255, 0, 0, 0.8); z-index: 10;';

  var rank = function (wizard) {
    var rankWizard = 0;

    if (wizard.colorCoat === window.setup.colorCoat) {
      rankWizard += 2;
    }
    if (wizard.colorEyes === window.setup.colorEyes) {
      rankWizard += 1;
    }

    return rankWizard;
  };

  var namesComparator = function (leftWizard, rightWizard) {
    if (leftWizard > rightWizard) {
      return 1;
    } else if (leftWizard < rightWizard) {
      return -1;
    } else {
      return 0;
    }
  };

  var updateWizards = function () {
    var sortWizards = wizards.slice();

    window.render(sortWizards.sort(function (left, right) {
      var rankDiff = rank(right) - rank(left);
      if (rankDiff === 0) {
        rankDiff = namesComparator(left.name, right.name);
      }
      return rankDiff;
    }));
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
