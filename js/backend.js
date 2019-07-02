'use strict';

(function () {
  var URL_UPLOAD = 'https://js.dump.academy/code-and-magick';
  var URL_LOAD = URL_UPLOAD + '/data';

  var getXhr = function (_load, _error) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        _load(xhr.response);
      } else {
        _error('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      _error('Произошла ошибка');
    });

    return xhr;
  };

  var load = function (onLoad, onError) {
    var xhr = getXhr(onLoad, onError);

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + ' мс');
    });

    xhr.timeout = timeoutQuery;

    xhr.open('GET', URL_LOAD);
    xhr.send();
  };

  var save = function (data, onLoad, onError) {
    var xhr = getXhr(onLoad, onError);

    xhr.open('POST', URL_UPLOAD);
    xhr.send(data);
  };

  var timeoutQuery = 10000;

  window.backend = {
    load: load,
    save: save
  };

})();
