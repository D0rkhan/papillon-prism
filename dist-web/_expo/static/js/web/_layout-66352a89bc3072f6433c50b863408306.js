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
  Object.defineProperty(exports, "unstable_settings", {
    enumerable: true,
    get: function () {
      return unstable_settings;
    }
  });
  var _react = require(_dependencyMap[0]);
  var React = _interopDefault(_react);
  var _reactNativeWebDistExportsView = require(_dependencyMap[1]);
  var View = _interopDefault(_reactNativeWebDistExportsView);
  var _reactI18next = require(_dependencyMap[2]);
  var _expoRouter = require(_dependencyMap[3]);
  var _utilsThemeScreenOptions = require(_dependencyMap[4]);
  var _componentsAndroidHeaderBackground = require(_dependencyMap[5]);
  var _reactJsxRuntime = require(_dependencyMap[6]);
  const unstable_settings = {
    anchor: "locate"
  };
  function OnboardingLayout() {
    const {
      t
    } = (0, _reactI18next.useTranslation)();
    const screenOptions = (0, _utilsThemeScreenOptions.useScreenOptions)();
    const androidHeaderProps = (0, _componentsAndroidHeaderBackground.useAndroidHeaderProps)();
    const newScreenOptions = React.default.useMemo(() => ({
      ...screenOptions,
      headerShown: true,
      ...androidHeaderProps,
      headerBackVisible: true,
      headerTransparent: true,
      headerBackButtonDisplayMode: "minimal",
      headerLargeTitle: false
    }), [screenOptions, androidHeaderProps]);
    return /*#__PURE__*/(0, _reactJsxRuntime.jsx)(View.default, {
      style: {
        flex: 1
      },
      children: /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_expoRouter.Stack, {
        children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoRouter.Stack.Screen, {
          name: "locate",
          options: {
            ...newScreenOptions,
            title: t("ONBOARDING_HEADER_LOCATION_SEARCH")
          }
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoRouter.Stack.Screen, {
          name: "select",
          options: {
            ...newScreenOptions,
            title: t("ONBOARDING_HEADER_SCHOOLS")
          }
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoRouter.Stack.Screen, {
          name: "url",
          options: {
            ...newScreenOptions,
            title: t("ONBOARDING_HEADER_SCHOOL_URL")
          }
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoRouter.Stack.Screen, {
          name: "browser",
          options: {
            ...newScreenOptions,
            title: t("ONBOARDING_HEADER_ENT_LOGIN"),
            presentation: "modal",
            headerStyle: {
              backgroundColor: "transparent"
            }
          }
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoRouter.Stack.Screen, {
          name: "qrcode",
          options: {
            ...newScreenOptions,
            title: t("ONBOARDING_HEADER_QRCODE_LOGIN")
          }
        })]
      })
    });
  }
},901,[6,198,1105,1023,1244,1247,97]);