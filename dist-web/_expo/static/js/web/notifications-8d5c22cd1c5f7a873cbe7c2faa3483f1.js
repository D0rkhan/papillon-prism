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
      return NotificationsModal;
    }
  });
  var _getpapillonPapicons = require(_dependencyMap[0]);
  var _expoRouterReactNavigation = require(_dependencyMap[1]);
  var _reactI18next = require(_dependencyMap[2]);
  var _uiComponentsStack = require(_dependencyMap[3]);
  var Stack = _interopDefault(_uiComponentsStack);
  var _uiComponentsTypography = require(_dependencyMap[4]);
  var Typography = _interopDefault(_uiComponentsTypography);
  var _reactJsxRuntime = require(_dependencyMap[5]);
  function NotificationsModal() {
    const {
      colors
    } = (0, _expoRouterReactNavigation.useTheme)();
    const {
      t
    } = (0, _reactI18next.useTranslation)();
    return /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(Stack.default, {
      hAlign: "center",
      vAlign: "top",
      paddingTop: 150,
      paddingHorizontal: 20,
      paddingBottom: 20,
      style: {
        width: "100%",
        height: "100%",
        backgroundColor: colors.background
      },
      children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
        name: "Clock",
        size: 80,
        style: {
          marginBottom: 10
        },
        opacity: 0.5,
        color: colors.text
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
        variant: "h2",
        align: "center",
        children: t("Feature_Soon")
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
        variant: "caption",
        align: "center",
        color: "secondary",
        children: t("Feature_Soon_Notification")
      })]
    });
  }
},866,[1002,1000,1105,1005,1110,97]);