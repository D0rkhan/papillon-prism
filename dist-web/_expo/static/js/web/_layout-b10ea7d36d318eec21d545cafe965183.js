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
  require(_dependencyMap[1]);
  var _reactI18next = require(_dependencyMap[2]);
  var _componentsAndroidHeaderBackground = require(_dependencyMap[3]);
  var _utilsThemeScreenOptions = require(_dependencyMap[4]);
  var _componentsProgressiveHeaderBackground = require(_dependencyMap[5]);
  var ProgressiveHeaderBackground = _interopDefault(_componentsProgressiveHeaderBackground);
  var _uiUtilsIsLiquidGlass = require(_dependencyMap[6]);
  var _reactJsxRuntime = require(_dependencyMap[7]);
  function Layout() {
    const {
      t
    } = (0, _reactI18next.useTranslation)();
    const screenOptions = (0, _utilsThemeScreenOptions.useScreenOptions)();
    const androidHeaderProps = (0, _componentsAndroidHeaderBackground.useAndroidHeaderProps)();
    return /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_expoRouter.Stack, {
      screenOptions: screenOptions,
      children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoRouter.Stack.Screen, {
        name: "index",
        options: {
          ...androidHeaderProps,
          // The custom title on this screen suppresses the bar's own scroll-edge
          // material, so iOS 26 gets our progressive blur instead.
          ...(_uiUtilsIsLiquidGlass.runsIOS26 ? {
            headerTransparent: true,
            headerBackground: () => /*#__PURE__*/(0, _reactJsxRuntime.jsx)(ProgressiveHeaderBackground.default, {})
          } : {
            headerTransparent: false
          })
        }
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoRouter.Stack.Screen, {
        name: "[id]",
        options: {
          headerShown: true,
          headerTitle: t('Modal_Grades_Title'),
          headerLargeTitle: false,
          headerTransparent: true,
          presentation: 'card',
          sheetGrabberVisible: true,
          sheetAllowedDetents: [1],
          ...androidHeaderProps
        }
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoRouter.Stack.Screen, {
        name: "objectif",
        options: {
          headerShown: true,
          headerTitle: '',
          headerTransparent: true,
          headerLargeTitle: false,
          presentation: 'card',
          ...androidHeaderProps,
          headerStyle: {
            backgroundColor: 'transparent'
          }
        }
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoRouter.Stack.Screen, {
        name: "subject/[id]",
        options: {
          headerShown: true,
          headerTitle: t('Grades_SubjectInfo'),
          headerLargeTitle: false,
          headerTransparent: true,
          presentation: 'card',
          ...androidHeaderProps
        }
      })]
    });
  }
},946,[1023,6,1105,1247,1244,1423,1215,97]);