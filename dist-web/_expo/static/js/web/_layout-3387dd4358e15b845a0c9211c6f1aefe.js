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
  var _reactI18next = require(_dependencyMap[1]);
  var _expoRouter = require(_dependencyMap[2]);
  var _utilsThemeScreenOptions = require(_dependencyMap[3]);
  var _componentsAndroidHeaderBackground = require(_dependencyMap[4]);
  var _reactJsxRuntime = require(_dependencyMap[5]);
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
    return /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoRouter.Stack, {
      children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoRouter.Stack.Screen, {
        name: "credentials",
        options: {
          ...newScreenOptions,
          headerTitle: t("ONBOARDING_HEADER_ED_LOGIN")
        }
      })
    });
  }
},897,[6,1105,1023,1244,1247,97]);