/**
 *
 * I need a javascript object that's not in the DOM to have an event model LIKE a dom object please?
 * addEventListener, dispatchEvent, and removeEventListeners must all work, with the listeners firing
 * and being selectively removed.  here's what I came up with:
*/


var ObjEventTxRx = {
  listeners: [],
  addEventListener: function(type, callback) {
    this.listeners.push({
      'type': type,
      'callback': callback,
    });
  },
  dispatchEvent: function(evt) {
    var type = evt.type;
    var callbacks = this.listeners.filter(function (listener) {
      return type === listener.type;
    });
    for (var i = 0; i < callbacks.length; i++) {
      callbacks[i].callback(evt);
    }
  },
  removeEventListener: function(type, callback) {
    var newListeners = this.listeners.filter(function (listener) {
      var result = true;
      if (listener.type === type && listener.callback === callback) {
        result = false;
      }
      return result;
    });
    this.listeners = newListeners;
  },
};

function txRxIfy(object) {
  for (var prop in ObjEventTxRx) {
    if (ObjEventTxRx.hasOwnProperty(prop)) {
      object[prop] = ObjEventTxRx[prop];
    }
  }
}

