'use strict';

(function () {

  var artifactsShop = document.querySelector('.setup-artifacts-shop');
  var artifactsWizard = document.querySelector('.setup-artifacts');
  var draggedItem = null;

  artifactsShop.addEventListener('dragstart', function (evt) {
    if (evt.target.tagName.toLowerCase() === 'img') {
      draggedItem = evt.target;
      evt.dataTransfer.setData('text', evt.target.alt);
    }
    return false;
  });

  artifactsWizard.addEventListener('drop', function (evt) {
    evt.target.style.backgroundColor = '';
    evt.target.appendChild(draggedItem);
    return false;
  });

  artifactsWizard.addEventListener('dragenter', function (evt) {
    evt.target.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
    evt.preventDefault();
  });

  artifactsWizard.addEventListener('dragover', function (evt) {
    evt.preventDefault();
    return false;
  });

  artifactsWizard.addEventListener('dragleave', function (evt) {
    evt.preventDefault();
    evt.target.style.backgroundColor = '';
  });

})();
