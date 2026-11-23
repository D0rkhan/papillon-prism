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
      return _default;
    }
  });
  var _uiComponentsIcon = require(_dependencyMap[0]);
  var Icon = _interopDefault(_uiComponentsIcon);
  var _uiNewButton = require(_dependencyMap[1]);
  var Button = _interopDefault(_uiNewButton);
  var _uiNewTypography = require(_dependencyMap[2]);
  var Typography = _interopDefault(_uiNewTypography);
  var _getpapillonPapicons = require(_dependencyMap[3]);
  var _expoRouter = require(_dependencyMap[4]);
  require(_dependencyMap[5]);
  var _reactNativeWebDistExportsView = require(_dependencyMap[6]);
  var View = _interopDefault(_reactNativeWebDistExportsView);
  var _reactNativeWebDistExportsImage = require(_dependencyMap[7]);
  var Image = _interopDefault(_reactNativeWebDistExportsImage);
  var _reactNativeWebDistExportsLinking = require(_dependencyMap[8]);
  var Linking = _interopDefault(_reactNativeWebDistExportsLinking);
  var _reactNativeSafeAreaContext = require(_dependencyMap[9]);
  var _reactJsxRuntime = require(_dependencyMap[10]);
  const TeamModal = () => {
    const insets = (0, _reactNativeSafeAreaContext.useSafeAreaInsets)();
    const {
      colors
    } = (0, _expoRouter.useTheme)();
    const router = (0, _expoRouter.useRouter)();
    return /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(View.default, {
      style: {
        gap: 0
      },
      children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Image.default, {
        source: require(_dependencyMap[11]),
        style: {
          width: "100%",
          height: 200,
          resizeMode: "cover"
        }
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(View.default, {
        style: {
          padding: 22,
          gap: 8
        },
        children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
          variant: "h3",
          children: "Salut, nous sommes les \xE9tudiants derri\xE8re Papillon ! \uD83D\uDC4B"
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
          variant: "body1",
          color: "textSecondary",
          children: "Merci beaucoup d'utiliser Papillon ! Nous savons que parfois, certaines choses ne fonctionnent pas comme pr\xE9vu, mais nous travaillons au quotidien a am\xE9liorer l'application pour vous offrir la meilleure exp\xE9rience possible."
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(View.default, {
          style: {
            height: 8
          }
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
          variant: "body1",
          weight: "semibold",
          color: "textPrimary",
          children: "Pour rester \xE0 jour sur les nouveaut\xE9s, n'h\xE9sitez pas a nous suivre sur Instagram, on y partage tout !"
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(View.default, {
          style: {
            paddingTop: 12,
            flexDirection: "row",
            gap: 8
          },
          children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Button.default, {
            label: "Nos r\xE9seaux",
            onPress: () => {
              Linking.default.openURL("https://papillon.bzh/links");
            },
            variant: "primary",
            style: {
              flex: 1
            },
            leading: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
              color: "white",
              name: "link"
            })
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Button.default, {
            label: "Ignorer",
            variant: "secondary",
            onPress: () => {
              router.back();
            },
            style: {
              flex: 1
            },
            leading: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Icon.default, {
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
                name: "minus"
              })
            })
          })]
        })]
      })]
    });
  };
  var _default = TeamModal;
},869,[1013,1006,1008,1002,1023,6,198,267,310,360,97,1231]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  module.exports = {
    uri: "/assets/assets/images/team.0fb1aaaa82895229bdb7a13e466d2063.jpg",
    width: 1584,
    height: 590,
    toString() {
      return this.uri;
    }
  };
},1231,[]);