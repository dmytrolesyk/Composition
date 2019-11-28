'use strict';

const eventEmitter = {
  on(event, handler) {
    if (!this._eventHandlers) this._eventHandlers = {};
    if (!this._eventHandlers[event]) this._eventHandlers[event] = [];
    this._eventHandlers[event].push(handler);
  },
  emit(event, ...args) {
    if (!this._eventHandlers || !this._eventHandlers[event]) return;
    this._eventHandlers[event].forEach(handler => handler(...args));
  }
};

const compose = (...fns) => {
  const composed = par => {
    let res;
    try {
      res = fns.reduceRight((v, f) => f(v), par);
    } catch (error) {
      composed.emit('error', error);
      return;
    }
    return res;
  };
  return Object.assign(composed, eventEmitter);
};

module.exports = { compose };
