'use strict';

(function () {
  var onUserDialogEscPress = function (evt) {
    if (!evt.target.classList.contains('setup-user-name')) {
      window.utils.isEscEvent(evt, onUserDialogClose);
    }
  };

  var onUserDialogOpen = function () {
    userDialog.classList.remove('hidden');
    document.addEventListener('keydown', onUserDialogEscPress);
  };

  var onUserDialogClose = function () {
    userDialog.classList.add('hidden');
    document.removeEventListener('keydown', onUserDialogEscPress);
  };

  var onCloseUserDialogEnterPress = function (evt) {
    window.utils.isEnterEvent(evt, onUserDialogClose);
  };

  var onOpenUserDialogEnterPress = function (evt) {
    window.utils.isEnterEvent(evt, onUserDialogOpen);
  };

  var userDialog = document.querySelector('.setup');
  var dialogHandle = userDialog.querySelector('.upload');
  var userDialogClose = userDialog.querySelector('.setup-close');
  var userDialogOpen = document.querySelector('.setup-open');

  dialogHandle.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoodts = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoodts.x - moveEvt.clientX,
        y: startCoodts.y - moveEvt.clientY
      };

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

