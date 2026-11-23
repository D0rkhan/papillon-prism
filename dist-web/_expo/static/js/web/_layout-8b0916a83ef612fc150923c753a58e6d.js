__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  function _interopDefault(e) {
    return e && e.__esModule ? e : {
      default: e
    };
  }
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return OnboardingLayout;
    }
  });
  var _react = require(_dependencyMap[0]);
  var React = _interopDefault(_react);
  var _expoRouter = require(_dependencyMap[1]);
  var _utilsThemeScreenOptions = require(_dependencyMap[2]);
  var _reactJsxRuntime = require(_dependencyMap[3]);
  function OnboardingLayout() {
    const screenOptions = (0, _utilsThemeScreenOptions.useScreenOptions)();
    const newScreenOptions = React.default.useMemo(() => ({
      ...screenOptions,
      headerShown: true,
      headerBackVisible: true,
      headerTransparent: true,
      headerBackButtonDisplayMode: "minimal",
      headerLargeTitle: false
    }), [screenOptions]);
    return /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_expoRouter.Stack, {
      children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoRouter.Stack.Screen, {
        name: "method",
        options: {
          ...newScreenOptions,
          headerTitle: ""
        }
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoRouter.Stack.Screen, {
        name: "turboself",
        options: {
          ...newScreenOptions,
          headerTitle: ""
        }
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoRouter.Stack.Screen, {
        name: "turboselfHost",
        options: {
          ...newScreenOptions,
          headerTitle: ""
        }
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoRouter.Stack.Screen, {
        name: "ard",
        options: {
          ...newScreenOptions,
          headerTitle: ""
        }
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoRouter.Stack.Screen, {
        name: "alise",
        options: {
          ...newScreenOptions,
          headerTitle: ""
        }
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoRouter.Stack.Screen, {
        name: "izly",
        options: {
          ...newScreenOptions,
          headerTitle: ""
        }
      })]
    });
  }
},885,[6,1023,1244,97]);