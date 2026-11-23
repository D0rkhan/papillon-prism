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
      return Soon;
    }
  });
  var _uiComponentsIcon = require(_dependencyMap[0]);
  var Icon = _interopDefault(_uiComponentsIcon);
  var _uiComponentsStack = require(_dependencyMap[1]);
  var Stack = _interopDefault(_uiComponentsStack);
  var _uiComponentsTypography = require(_dependencyMap[2]);
  var Typography = _interopDefault(_uiComponentsTypography);
  require(_dependencyMap[3]);
  var _getpapillonPapicons = require(_dependencyMap[4]);
  var _expoRouter = require(_dependencyMap[5]);
  require(_dependencyMap[6]);
  require(_dependencyMap[7]);
  var _reactNativeWebDistExportsLinking = require(_dependencyMap[8]);
  var Linking = _interopDefault(_reactNativeWebDistExportsLinking);
  require(_dependencyMap[9]);
  var _reactNativeWebDistExportsView = require(_dependencyMap[10]);
  var View = _interopDefault(_reactNativeWebDistExportsView);
  var _reactJsxRuntime = require(_dependencyMap[11]);
  function Soon() {
    const router = (0, _expoRouter.useRouter)();
    return /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(View.default, {
      style: {
        padding: 20,
        paddingBottom: 0
      },
      children: [false, /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(Stack.default, {
        padding: 20,
        gap: 10,
        vAlign: "center",
        hAlign: "center",
        children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Icon.default, {
          size: 42,
          children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
            name: "clock",
            color: "#29947A"
          })
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
          variant: "h2",
          align: "center",
          children: "Promis, \xE7a arrive (vraiment) bient\xF4t !"
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
          variant: "body1",
          color: "secondary",
          align: "center",
          children: "L'onglet est toujours en cours de d\xE9veloppement. Il arrivera prochainement dans une version future de Papillon."
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
          variant: "body1",
          color: "primary",
          align: "center",
          onPress: () => {
            Linking.default.openURL("https://www.instagram.com/thepapillonapp/");
          },
          style: {
            textDecorationLine: "underline"
          },
          children: "Et pour rester au courant, tu peux nous suivre sur les r\xE9seaux sociaux !"
        })]
      })]
    });
  }
},863,[1013,1005,1110,1214,1002,1023,1000,6,310,193,198,97]);