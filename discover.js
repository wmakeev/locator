var guid = require('./guid');

module.export = function discover (key, predicate, timeout) {
    var publishEventName  = guid + ':publish';
    var discoverEventName = guid + ':discover';
    if (typeof predicate === 'number') {
        timeout = predicate;
        predicate = null;
    }
    return new Promise(function (resolve, reject) {
        var listener = function (ev) {
            ev = ev.detail;
            if (ev && ev.key === key) {
                if (predicate ? predicate(ev.value) : true) {
                    window.removeEventListener(publishEventName, listener);
                    resolve(ev.value);
                }
            }
        };
        window.addEventListener(publishEventName, listener);
        var event = new CustomEvent(discoverEventName, {
            detail: {
                key: key
            }
        });
        window.dispatchEvent(event);
        if (timeout) {
            setTimeout(function () {
                window.removeEventListener(publishEventName, listener);
                reject(new Error('discover for [' + key + '] timeout'))
            }, timeout * 1000)
        }
    })
};