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
  require(_dependencyMap[2]);
  require(_dependencyMap[3]);
  var _uiUtilsIsLiquidGlass = require(_dependencyMap[4]);
  var _utilsThemeScreenOptions = require(_dependencyMap[5]);
  var _i18next = require(_dependencyMap[6]);
  var _componentsAndroidHeaderBackground = require(_dependencyMap[7]);
  var _reactJsxRuntime = require(_dependencyMap[8]);
  function Layout() {
    const screenOptions = (0, _utilsThemeScreenOptions.useScreenOptions)();
    const androidHeaderProps = (0, _componentsAndroidHeaderBackground.useAndroidHeaderProps)();
    const newScreenOptions = React.default.useMemo(() => ({
      ...screenOptions,
      headerShown: true,
      headerLargeTitle: false,
      headerTransparent: _uiUtilsIsLiquidGlass.runsIOS26,
      headerShadowVisible: false,
      ...androidHeaderProps,
      headerBackVisible: false
    }), [screenOptions, androidHeaderProps]);
    return /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_reactJsxRuntime.Fragment, {
      children: [false, /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_expoRouter.Stack, {
        screenOptions: newScreenOptions,
        children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoRouter.Stack.Screen, {
          name: "settings",
          options: {
            headerTitle: (0, _i18next.t)("Tab_Settings"),
            headerTransparent: true
          }
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoRouter.Stack.Screen, {
          name: "services",
          options: {
            headerTitle: (0, _i18next.t)("Settings_Services_Title"),
            headerShown: true
          }
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoRouter.Stack.Screen, {
          name: "accounts",
          options: {
            headerTitle: (0, _i18next.t)("Settings_Accounts_Title"),
            headerShown: true
          }
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoRouter.Stack.Screen, {
          name: "personalization",
          options: {
            headerTitle: (0, _i18next.t)("Settings_Personalization_Title"),
            headerBackButtonDisplayMode: "minimal",
            headerTransparent: true,
            headerLargeTitle: false,
            headerStyle: {
              backgroundColor: "transparent"
            }
          }
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoRouter.Stack.Screen, {
          name: "cards",
          options: {
            headerShown: true,
            headerTitle: (0, _i18next.t)("Settings_Cards_Title"),
            headerLargeTitle: false,
            headerBackButtonDisplayMode: "minimal",
            gestureEnabled: true
          }
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoRouter.Stack.Screen, {
          name: "about",
          options: {
            headerTitle: (0, _i18next.t)("Settings_About_Title"),
            headerBackButtonDisplayMode: "minimal",
            headerTransparent: false,
            headerLargeTitle: false
          }
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoRouter.Stack.Screen, {
          name: "contributors",
          options: {
            headerTitle: "Contributors",
            headerBackButtonDisplayMode: "minimal",
            headerLargeTitle: false
          }
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoRouter.Stack.Screen, {
          name: "magic",
          options: {
            headerTitle: (0, _i18next.t)("Settings_MagicPlus_Title"),
            headerBackButtonDisplayMode: "minimal",
            headerLargeTitle: false
          }
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoRouter.Stack.Screen, {
          name: "subject_personalization",
          options: {
            headerTitle: (0, _i18next.t)("Settings_SubjectPersonalization_Title"),
            headerBackButtonDisplayMode: "minimal",
            headerLargeTitle: false
          }
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoRouter.Stack.Screen, {
          name: "tabs",
          options: {
            headerTitle: (0, _i18next.t)("Settings_Tabs_Title"),
            headerBackButtonDisplayMode: "minimal",
            headerLargeTitle: false
          }
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoRouter.Stack.Screen, {
          name: "edit_subject",
          options: {
            headerTitle: (0, _i18next.t)("Settings_SubjectEdit_Title"),
            headerBackButtonDisplayMode: "minimal",
            headerShown: false,
            presentation: "modal",
            contentStyle: {
              borderRadius: 0
            }
          }
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoRouter.Stack.Screen, {
          name: "language",
          options: {
            headerTitle: (0, _i18next.t)("Settings_Language_Title"),
            headerBackButtonDisplayMode: "minimal",
            headerLargeTitle: false
          }
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoRouter.Stack.Screen, {
          name: "features",
          options: {
            headerTitle: (0, _i18next.t)("Settings_Features_Title"),
            headerBackButtonDisplayMode: "minimal",
            headerLargeTitle: false
          }
        })]
      })]
    });
  }
},914,[1023,6,193,341,1215,1244,1140,1247,97]);