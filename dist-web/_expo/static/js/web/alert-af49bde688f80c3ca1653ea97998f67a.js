__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = {};
    if (e) Object.keys(e).forEach(function (k) {
      if (k === 'default') return;
      var d = Object.getOwnPropertyDescriptor(e, k);
      Object.defineProperty(n, k, d.get ? d : {
        enumerable: true,
        get: function () {
          return e[k];
        }
      });
    });
    n.default = e;
    return n;
  }
  function _interopDefault(e) {
    return e && e.__esModule ? e : {
      default: e
    };
  }
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return AlertModal;
    }
  });
  var _expoRouterReactNavigation = require(_dependencyMap[0]);
  var _expoRouter = require(_dependencyMap[1]);
  var _lucideReactNative = require(_dependencyMap[2]);
  var LucideIcons = _interopNamespace(_lucideReactNative);
  var _react = require(_dependencyMap[3]);
  var _reactI18next = require(_dependencyMap[4]);
  require(_dependencyMap[5]);
  require(_dependencyMap[6]);
  var _reactNativeWebDistExportsPressable = require(_dependencyMap[7]);
  var Pressable = _interopDefault(_reactNativeWebDistExportsPressable);
  var _reactNativeWebDistExportsText = require(_dependencyMap[8]);
  var Text = _interopDefault(_reactNativeWebDistExportsText);
  var _reactNativeWebDistExportsView = require(_dependencyMap[9]);
  var View = _interopDefault(_reactNativeWebDistExportsView);
  var _reactNativeReanimated = require(_dependencyMap[10]);
  var Reanimated = _interopDefault(_reactNativeReanimated);
  var _uiComponentsAlertProvider = require(_dependencyMap[11]);
  var _uiComponentsButton = require(_dependencyMap[12]);
  var Button = _interopDefault(_uiComponentsButton);
  var _uiComponentsTypography = require(_dependencyMap[13]);
  var Typography = _interopDefault(_uiComponentsTypography);
  var _uiUtilsIsLiquidGlass = require(_dependencyMap[14]);
  var _getpapillonPapicons = require(_dependencyMap[15]);
  var _uiComponentsIcon = require(_dependencyMap[16]);
  var Icon = _interopDefault(_uiComponentsIcon);
  var _reactJsxRuntime = require(_dependencyMap[17]);
  function AlertModal() {
    const {
      t
    } = (0, _reactI18next.useTranslation)();
    const {
      colors
    } = (0, _expoRouterReactNavigation.useTheme)();
    const searchParams = (0, _expoRouter.useLocalSearchParams)();
    const params = JSON.parse(searchParams.data);
    const callbackId = searchParams.callbackId;
    const router = (0, _expoRouter.useRouter)();
    const {
      getCallback,
      cleanupCallback
    } = (0, _uiComponentsAlertProvider.useAlert)();
    const IconComponent = (0, _react.useMemo)(() => {
      if (!params.icon) {
        return null;
      }
      return /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
        name: params.icon
      });
    }, [params.icon]);
    const [showTechnicalDetails, setShowTechnicalDetails] = (0, _react.useState)(false);
    (0, _react.useEffect)(() => {
      return () => {
        if (callbackId) {
          cleanupCallback(callbackId);
        }
      };
    }, [callbackId, cleanupCallback]);
    return /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(View.default, {
      style: {
        padding: 18,
        paddingTop: 20,
        gap: 22,
        marginBottom: _uiUtilsIsLiquidGlass.runsIOS26 ? -32 : 0,
        alignSelf: "center"
      },
      children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(View.default, {
        style: {
          width: "100%",
          minWidth: "100%",
          height: 160,
          backgroundColor: params.color ? params.color + "22" : "#ccc",
          borderRadius: 24,
          borderCurve: "continuous",
          justifyContent: "center",
          alignItems: "center"
        },
        children: IconComponent ? /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Icon.default, {
          size: 96,
          fill: params.color ?? colors.primary,
          children: IconComponent
        }) : null
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(View.default, {
        style: {
          paddingHorizontal: 6,
          gap: 8,
          width: "100%"
        },
        children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
          variant: "h3",
          children: params.title
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
          variant: "body1",
          color: "secondary",
          children: params.description ?? params.message
        })]
      }), params.technical && /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(Reanimated.default.View, {
        style: [{
          paddingHorizontal: 6,
          gap: 0,
          width: "100%",
          borderRadius: 16,
          borderCurve: "continuous",
          marginTop: -8,
          overflow: "hidden",
          zIndex: 1000
        }, showTechnicalDetails && {
          backgroundColor: "#222",
          paddingHorizontal: 16,
          paddingVertical: 12,
          gap: 8
        }],
        layout: undefined,
        children: [/*#__PURE__*/(0, _reactJsxRuntime.jsxs)(Pressable.default, {
          style: {
            flexDirection: "row",
            gap: 6,
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
            marginVertical: -2
          },
          onPress: () => {
            setShowTechnicalDetails(!showTechnicalDetails);
          },
          children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
            variant: "h6",
            color: showTechnicalDetails ? "#FFF" : colors.primary,
            children: t('Alert_TechnicalDetails')
          }), showTechnicalDetails ? /*#__PURE__*/(0, _reactJsxRuntime.jsx)(LucideIcons.ChevronUp, {
            color: showTechnicalDetails ? "#FFF" : colors.primary,
            size: 24,
            strokeWidth: 2.5
          }) : /*#__PURE__*/(0, _reactJsxRuntime.jsx)(LucideIcons.ChevronDown, {
            color: showTechnicalDetails ? "#FFF" : colors.primary,
            size: 24,
            strokeWidth: 2.5
          })]
        }), showTechnicalDetails && /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Reanimated.default.ScrollView, {
          style: {
            maxHeight: 120,
            width: "100%"
          },
          children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Text.default, {
            style: {
              color: "#FFF",
              fontSize: 14,
              lineHeight: 20,
              fontFamily: "monospace",
              textAlign: "left"
            },
            selectable: true,
            children: params.technical ? params.technical.trim() : "Aucune information technique disponible."
          })
        })]
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Reanimated.default.View, {
        style: {
          paddingHorizontal: 6,
          gap: 8,
          marginBottom: 4,
          minWidth: "100%",
          alignSelf: "stretch",
          flex: 1
        },
        layout: _reactNativeReanimated.LinearTransition.duration(200).easing(_reactNativeReanimated.Easing.inOut(_reactNativeReanimated.Easing.quad)),
        children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Button.default, {
          title: params.customButton ? params.customButton.label : "OK",
          onPress: () => {
            const callback = callbackId ? getCallback(callbackId) : null;
            router.back();
            if (callback) {
              callback();
            }
          }
        })
      })]
    });
  }
  ;
},994,[1000,1023,1010,6,1105,104,193,334,277,198,1107,1125,1024,1110,1215,1002,1013,97]);