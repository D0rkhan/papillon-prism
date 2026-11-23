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
      return Layout;
    }
  });
  var _expoRouter = require(_dependencyMap[0]);
  var _react = require(_dependencyMap[1]);
  var React = _interopDefault(_react);
  var _reactI18next = require(_dependencyMap[2]);
  var _utilsThemeScreenOptions = require(_dependencyMap[3]);
  var _reactJsxRuntime = require(_dependencyMap[4]);
  function Layout() {
    const {
      t
    } = (0, _reactI18next.useTranslation)();
    const screenOptions = (0, _utilsThemeScreenOptions.useScreenOptions)();
    const newScreenOptions = React.default.useMemo(() => ({
      ...screenOptions,
      headerShown: true,
      headerLargeTitle: false
    }), [screenOptions]);
    return /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoRouter.Stack, {
      screenOptions: newScreenOptions,
      children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoRouter.Stack.Screen, {
        name: "event",
        options: {
          headerTitle: t("Tab_New_Event")
        }
      })
    });
  }
},872,[1023,6,1105,1244,97]);