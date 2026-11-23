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
      return ServiceSelection;
    }
  });
  var _getpapillonPapicons = require(_dependencyMap[0]);
  var _expoRouterReactNavigation = require(_dependencyMap[1]);
  var _expoRouter = require(_dependencyMap[2]);
  var _react = require(_dependencyMap[3]);
  var _reactNativeWebDistExportsImage = require(_dependencyMap[4]);
  var Image = _interopDefault(_reactNativeWebDistExportsImage);
  var _reactNativeWebDistExportsView = require(_dependencyMap[5]);
  var View = _interopDefault(_reactNativeWebDistExportsView);
  var _reactI18next = require(_dependencyMap[6]);
  var _reactNativeSafeAreaContext = require(_dependencyMap[7]);
  var _uiComponentsDynamic = require(_dependencyMap[8]);
  var _uiComponentsIcon = require(_dependencyMap[9]);
  var Icon = _interopDefault(_uiComponentsIcon);
  var _uiComponentsStack = require(_dependencyMap[10]);
  var Stack = _interopDefault(_uiComponentsStack);
  var _uiNewButton = require(_dependencyMap[11]);
  var Button = _interopDefault(_uiNewButton);
  var _uiNewDivider = require(_dependencyMap[12]);
  var Divider = _interopDefault(_uiNewDivider);
  var _uiNewList = require(_dependencyMap[13]);
  var List = _interopDefault(_uiNewList);
  var _uiNewTypography = require(_dependencyMap[14]);
  var Typography = _interopDefault(_uiNewTypography);
  var _uiUtilsTransition = require(_dependencyMap[15]);
  var _utilsAdjustColor = require(_dependencyMap[16]);
  var adjust = _interopDefault(_utilsAdjustColor);
  var _uiComponentsSafeHorizontalView = require(_dependencyMap[17]);
  var SafeHorizontalView = _interopDefault(_uiComponentsSafeHorizontalView);
  var _utilsConstants = require(_dependencyMap[18]);
  var _reactJsxRuntime = require(_dependencyMap[19]);
  function ServiceSelection() {
    const headerHeight = (0, _expoRouterReactNavigation.useHeaderHeight)();
    const theme = (0, _expoRouterReactNavigation.useTheme)();
    const {
      colors
    } = theme;
    const insets = (0, _reactNativeSafeAreaContext.useSafeAreaInsets)();
    const router = (0, _expoRouter.useRouter)();
    const {
      t
    } = (0, _reactI18next.useTranslation)();
    const {
      action
    } = (0, _expoRouter.useLocalSearchParams)();
    const [selectedService, setSelectedService] = (0, _react.useState)(null);
    const services = (0, _utilsConstants.GetSupportedRestaurants)(path => {
      router.push({
        pathname: path.pathname,
        // Forwarded so a card added from an existing account joins it.
        params: {
          ...path.options,
          ...(action ? {
            action
          } : {})
        }
      });
    });
    const filteredServices = services;
    const titleString = t("ONBOARDING_RESTAURANT_SELECTION_TITLE");
    const hasServiceRoute = services.find(service => service.name === selectedService)?.route || services.find(service => service.name === selectedService)?.onPress;
    const loginToService = serviceName => {
      const serviceRoute = services.find(service => service.name === serviceName)?.route;
      if (!serviceRoute) {
        services.find(service => service.name === serviceName)?.onPress();
        return;
      }
      const newRoute = './services/' + serviceRoute;
      router.push(newRoute);
    };
    return /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(View.default, {
      style: {
        flex: 1,
        backgroundColor: colors.overground
      },
      children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default, {
        ListHeaderComponent: () => /*#__PURE__*/(0, _reactJsxRuntime.jsx)(SafeHorizontalView.default, {
          base: 16,
          children: /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(Stack.default, {
            padding: [4, 0],
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "h2",
              children: titleString
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "action",
              color: "textSecondary",
              children: t("ONBOARDING_SERVICE_SELECTION_DESCRIPTION")
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Divider.default, {
              height: 18,
              ghost: true
            })]
          })
        }),
        safeHorizontalPadding: 16,
        contentContainerStyle: {
          paddingBottom: 16,
          flexGrow: 1,
          gap: 10,
          paddingTop: headerHeight + 20,
          width: "100%",
          maxWidth: 600,
          marginHorizontal: "auto"
        },
        style: {
          flex: 1
        },
        children: filteredServices.map(app => /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Item, {
          onPress: () => setSelectedService(app.name),
          style: {
            backgroundColor: selectedService === app.name ? (0, adjust.default)(colors.primary, theme.dark ? -0.8 : 0.9) : colors.card,
            minHeight: 62
          },
          children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Leading, {
            children: /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(Stack.default, {
              animated: true,
              direction: "horizontal",
              hAlign: "center",
              gap: 12,
              children: [selectedService === app.name && /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_uiComponentsDynamic.Dynamic, {
                animated: true,
                entering: _uiUtilsTransition.PapillonZoomIn,
                exiting: _uiUtilsTransition.PapillonZoomOut,
                children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Icon.default, {
                  fill: colors.primary,
                  children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
                    name: "check"
                  })
                })
              }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_uiComponentsDynamic.Dynamic, {
                animated: true,
                children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Image.default, {
                  source: app.image,
                  style: {
                    width: 32,
                    height: 32,
                    borderRadius: 10
                  }
                })
              })]
            })
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_uiComponentsDynamic.Dynamic, {
            animated: true,
            children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "action",
              children: app.title
            })
          })]
        }, app.name))
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(SafeHorizontalView.default, {
        base: 20,
        style: {
          paddingTop: 20,
          paddingBottom: insets.bottom + 20,
          borderTopColor: colors.border,
          borderTopWidth: 1,
          backgroundColor: colors.background,
          flexDirection: "column",
          gap: 8,
          alignItems: "center"
        },
        children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Button.default, {
          fullWidth: true,
          label: t("ONBOARDING_CONTINUE"),
          onPress: () => {
            loginToService(selectedService);
          },
          disabled: !selectedService || !hasServiceRoute
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Button.default, {
          fullWidth: true,
          label: t("ONBOARDING_CANCEL"),
          onPress: () => {
            router.back();
          },
          variant: "secondary"
        })]
      })]
    });
  }
},889,[1002,1000,1023,6,267,198,1105,360,1136,1013,1005,1006,1241,1007,1008,1138,1114,1111,911,97]);