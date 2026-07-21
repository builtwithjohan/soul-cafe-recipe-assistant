(function () {
  "use strict";

  function createPubSubStore() {
    const listeners = {};

    function subscribe(topic, listener) {
      if (!listeners[topic]) {
        listeners[topic] = [];
      }
      listeners[topic].push(listener);

      return function unsubscribe() {
        listeners[topic] = (listeners[topic] || []).filter((fn) => fn !== listener);
      };
    }

    function publish(topic, payload) {
      (listeners[topic] || []).forEach((listener) => {
        try {
          listener(payload);
        } catch (_error) {
        }
      });
    }

    return {
      subscribe,
      publish,
    };
  }

  window.AppStore = {
    createPubSubStore,
  };
})();
