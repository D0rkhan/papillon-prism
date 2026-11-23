/**
 * Web / desktop stand-in for @expo/ui/swift-ui and @expo/ui/jetpack-compose,
 * which require native views at import time. Every component renders its children
 * (so layouts still work); every modifier is a no-op.
 */
const React = require("react");

const Passthrough = ({ children }) => (children === undefined ? null : React.createElement(React.Fragment, null, children));
const cache = new Map();

// Modifiers can be nested (shapes.rectangle(), …): a callable proxy that returns itself.
const noop = new Proxy(function () { return {}; }, {
  get: (_t, k) => (k === "__esModule" ? false : k === Symbol.toPrimitive ? () => "" : noop),
  apply: () => ({}),
});

module.exports = new Proxy(
  {},
  {
    get(_target, key) {
      if (key === "__esModule") { return true; }
      if (key === "default") { return Passthrough; }
      if (typeof key !== "string") { return undefined; }
      if (!cache.has(key)) {
        // Lower-case exports are modifiers (padding(), frame()…): return a no-op factory.
        cache.set(key, /^[a-z]/.test(key) ? noop : Passthrough);
      }
      return cache.get(key);
    },
  }
);
