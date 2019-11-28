'use strict';

const pipe = (...fns) => {
  if (fns.some(f => typeof f !== 'function')) {
    throw new Error('Not a functional argument');
  }
  return x => fns.reduce((v, f) => f(v), x);
};

module.exports = { pipe };
