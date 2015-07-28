var guid = require('./guid');

module.exports = function discover(key, handler) {
  var discoveredEventsIds = {};
  var publishEventName = guid + ':publish';
  var discoverEventName = guid + ':discover';

  var stop = function () {
    window.removeEventListener(publishEventName, listener);
  };

  var listener = function (ev) {
    ev = ev.detail;
    if (ev && ev.id && ev.key === key && !discoveredEventsIds.hasOwnProperty(ev.id)) {
      discoveredEventsIds[ev.id] = true;
      handler(ev.value, stop);
    }
  };
  window.addEventListener(publishEventName, listener);

  var event = new CustomEvent(discoverEventName, {
    detail: {
      key: key
    }
  });
  window.dispatchEvent(event);

  return {
    stop: stop
  }
};