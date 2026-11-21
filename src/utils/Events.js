export function dispatchEvent(element, eventName, detail, options = {}) {
  const event = new CustomEvent(eventName, {
    detail,
    bubbles: options.bubbles !== false,
    cancelable: options.cancelable !== false,
    composed: options.composed !== false,
    ...options
  });
  element.dispatchEvent(event);
  return event;
}

export function listenOnce(element, eventName, callback) {
  const handler = (e) => {
    element.removeEventListener(eventName, handler);
    callback(e);
  };
  element.addEventListener(eventName, handler);
}
