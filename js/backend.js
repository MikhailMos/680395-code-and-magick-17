'use strict';

(function () {
  var URL_UPLOAD = 'https://js.dump.academy/code-and-magick';
  var URL_LOAD = URL_UPLOAD + '/data';
  var TIMEOUT_QUERY = 10000;
  var STATUS_OK = 200;

  var getXhr = function (_load, _error) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_OK) {
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

    xhr.timeout = TIMEOUT_QUERY;

    xhr.open('GET', URL_LOAD);
    xhr.send();
  };

  var save = function (data, onLoad, onError) {
    var xhr = getXhr(onLoad, onError);

    xhr.open('POST', URL_UPLOAD);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    save: save
  };

})();
