var guid = require('./guid');

module.exports = function publish(key, value) {
  var publishEventName = guid + ':publish';
  var discoverEventName = guid + ':discover';

  var dispatch = function() {
    var event = new CustomEvent(publishEventName, {
      detail: {
        key: key,
        value: value
      }
    });
    window.dispatchEvent(event);
  };

  var listener = function (ev) {
    ev = ev.detail;
    if (ev && ev.key === key) {
      dispatch();
    }
  };

  window.addEventListener(discoverEventName, listener);

  dispatch();

  return {
    stop: function () {
      window.removeEventListener(discoverEventName, listener);
    }
  }
};