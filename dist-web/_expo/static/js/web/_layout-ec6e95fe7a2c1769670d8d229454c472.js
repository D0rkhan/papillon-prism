__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return Layout;
    }
  });
  var _expoRouter = require(_dependencyMap[0]);
  require(_dependencyMap[1]);
  var _reactI18next = require(_dependencyMap[2]);
  var _utilsThemeScreenOptions = require(_dependencyMap[3]);
  var _reactJsxRuntime = require(_dependencyMap[4]);
  function Layout() {
    const {
      t
    } = (0, _reactI18next.useTranslation)();
    const screenOptions = (0, _utilsThemeScreenOptions.useScreenOptions)();
    return /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoRouter.Stack, {
      screenOptions: screenOptions,
      children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoRouter.Stack.Screen, {
        name: "index",
        options: {
          headerShown: false,
          headerTitle: t("Tab_Home"),
          headerLargeTitle: false,
          headerTransparent: true
        }
      })
    });
  }
},958,[1023,6,1105,1244,97]);