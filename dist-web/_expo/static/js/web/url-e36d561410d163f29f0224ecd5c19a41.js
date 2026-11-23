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
      return PronoteLoginURL;
    }
  });
  var _expoRouterReactNavigation = require(_dependencyMap[0]);
  var _expoRouter = require(_dependencyMap[1]);
  var _react = require(_dependencyMap[2]);
  var React = _interopDefault(_react);
  var _reactI18next = require(_dependencyMap[3]);
  var _reactNativeWebDistExportsKeyboardAvoidingView = require(_dependencyMap[4]);
  var KeyboardAvoidingView = _interopDefault(_reactNativeWebDistExportsKeyboardAvoidingView);
  var _reactNativeSafeAreaContext = require(_dependencyMap[5]);
  var _uiComponentsSearch = require(_dependencyMap[6]);
  var Search = _interopDefault(_uiComponentsSearch);
  var _uiComponentsStack = require(_dependencyMap[7]);
  var Stack = _interopDefault(_uiComponentsStack);
  var _uiNewButton = require(_dependencyMap[8]);
  var Button = _interopDefault(_uiNewButton);
  var _uiNewDivider = require(_dependencyMap[9]);
  var Divider = _interopDefault(_uiNewDivider);
  var _uiNewList = require(_dependencyMap[10]);
  var List = _interopDefault(_uiNewList);
  var _uiNewTypography = require(_dependencyMap[11]);
  var Typography = _interopDefault(_uiNewTypography);
  var _uiComponentsSafeHorizontalView = require(_dependencyMap[12]);
  var SafeHorizontalView = _interopDefault(_uiComponentsSafeHorizontalView);
  var _reactJsxRuntime = require(_dependencyMap[13]);
  const PronoteSearchHeader = /*#__PURE__*/(0, _react.memo)(({}) => {
    const navigation = (0, _expoRouter.useNavigation)();
    const {
      t
    } = (0, _reactI18next.useTranslation)();
    const [url, setUrl] = React.default.useState("");
    const submitURL = () => {
      if (url.trim().length === 0) {
        return;
      }
      navigation.navigate("browser", {
        url
      });
    };
    const urlValid = url.trim().length > 0 && (url.startsWith("http://") || url.startsWith("https://"));
    return /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(Stack.default, {
      padding: [4, 0],
      children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
        variant: "h2",
        children: t("ONBOARDING_URL")
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
        variant: "action",
        color: "textSecondary",
        children: t("ONBOARDING_PRONOTE_LOCATION_HELP")
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Divider.default, {
        height: 6,
        ghost: true
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Search.default, {
        icon: "link",
        placeholder: t("ONBOARDING_URL_PLACEHOLDER"),
        style: {
          width: "100%"
        },
        value: url,
        setValue: setUrl,
        onTextChange: setUrl,
        autoFocus: url.trim().length === 0
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Divider.default, {
        height: 3,
        ghost: true
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Button.default, {
        label: t("CONFIRM_BTN"),
        fullWidth: true,
        height: 44,
        onPress: () => submitURL(),
        disabled: !urlValid
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Divider.default, {
        height: 18,
        ghost: true
      })]
    });
  });
  function PronoteLoginURL() {
    const headerHeight = (0, _expoRouterReactNavigation.useHeaderHeight)();
    const {
      colors
    } = (0, _expoRouterReactNavigation.useTheme)();
    const insets = (0, _reactNativeSafeAreaContext.useSafeAreaInsets)();
    return /*#__PURE__*/(0, _reactJsxRuntime.jsx)(KeyboardAvoidingView.default, {
      style: {
        flex: 1,
        backgroundColor: colors.overground
      },
      behavior: "padding",
      keyboardVerticalOffset: 20,
      children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default, {
        ListHeaderComponent: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(SafeHorizontalView.default, {
          base: 16,
          children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(PronoteSearchHeader, {})
        }),
        safeHorizontalPadding: 16,
        contentContainerStyle: {
          flexGrow: 1,
          gap: 10,
          paddingTop: headerHeight + 20,
          paddingBottom: insets.bottom + 20
        },
        style: {
          flex: 1
        },
        animated: true
      })
    });
  }
},907,[1000,1023,6,1105,326,360,1137,1005,1006,1241,1007,1008,1111,97]);