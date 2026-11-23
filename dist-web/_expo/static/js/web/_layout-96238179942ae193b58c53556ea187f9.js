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
  require(_dependencyMap[1]);
  var _reactNativeWebDistExportsPressable = require(_dependencyMap[2]);
  var Pressable = _interopDefault(_reactNativeWebDistExportsPressable);
  var _reactNativeWebDistExportsView = require(_dependencyMap[3]);
  var View = _interopDefault(_reactNativeWebDistExportsView);
  var _expoRouter = require(_dependencyMap[4]);
  var _expoRouterReactNavigation = require(_dependencyMap[5]);
  var _utilsThemeScreenOptions = require(_dependencyMap[6]);
  var _componentsAndroidHeaderBackground = require(_dependencyMap[7]);
  var _i18next = require(_dependencyMap[8]);
  var _uiNewTypography = require(_dependencyMap[9]);
  var Typography = _interopDefault(_uiNewTypography);
  var _reactJsxRuntime = require(_dependencyMap[10]);
  function OnboardingLayout() {
    const router = (0, _expoRouter.useRouter)();
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
        flex: 1,
        backgroundColor: undefined
      },
      children: /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_expoRouter.Stack, {
        children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoRouter.Stack.Screen, {
          name: "welcome",
          options: {
            ...newScreenOptions,
            title: "",
            headerLeft: () => null,
            headerShown: false
          }
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoRouter.Stack.Screen, {
          name: "ageSelection",
          options: ({
            route
          }) => ({
            ...newScreenOptions,
            title: (0, _i18next.t)("ONBOARDING_HEADER_ABOUTYOU"),
            ...(route.params?.action === "addService" && {
              unstable_headerLeftItems: () => [{
                type: "button",
                label: "",
                icon: {
                  type: "sfSymbol",
                  name: "chevron.left"
                },
                onPress: () => router.back()
              }],
              headerLeft: ({
                tintColor
              }) => /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoRouterReactNavigation.HeaderBackButton, {
                tintColor: tintColor,
                onPress: () => router.back()
              })
            }),
            headerRight: () => /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Pressable.default, {
              hitSlop: 12,
              onPress: () => router.push("/(onboarding)/offlineAccount"),
              style: {
                paddingHorizontal: 8
              },
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
                variant: "action",
                children: (0, _i18next.t)("ONBOARDING_SKIP")
              })
            })
          })
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoRouter.Stack.Screen, {
          name: "offlineAccount",
          options: {
            ...newScreenOptions,
            title: (0, _i18next.t)("ONBOARDING_OFFLINE_HEADER")
          }
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoRouter.Stack.Screen, {
          name: "serviceSelection",
          options: {
            ...newScreenOptions,
            title: (0, _i18next.t)("ONBOARDING_HEADER_SCHOOLSERVICE")
          }
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoRouter.Stack.Screen, {
          name: "restaurants",
          options: {
            headerShown: false,
            title: (0, _i18next.t)("ONBOARDING_RESTAURANTS")
          }
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoRouter.Stack.Screen, {
          name: "services/pronote",
          options: {
            headerShown: false,
            title: "",
            presentation: "formSheet"
          }
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoRouter.Stack.Screen, {
          name: "services/ed",
          options: {
            headerShown: false,
            title: "",
            presentation: "formSheet"
          }
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoRouter.Stack.Screen, {
          name: "services/skolengo",
          options: {
            headerShown: false,
            title: "",
            presentation: "formSheet"
          }
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoRouter.Stack.Screen, {
          name: "services/multi",
          options: {
            headerShown: false,
            title: "",
            presentation: "formSheet"
          }
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoRouter.Stack.Screen, {
          name: "services/appscho",
          options: {
            headerShown: false,
            title: ""
          }
        })]
      })
    });
  }
},874,[6,193,334,198,1023,1000,1244,1247,1140,1008,97]);