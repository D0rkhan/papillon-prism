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
      return ChangelogScreen;
    }
  });
  var _uiComponentsTypography = require(_dependencyMap[0]);
  var Typography = _interopDefault(_uiComponentsTypography);
  require(_dependencyMap[1]);
  var _reactNativeWebDistExportsView = require(_dependencyMap[2]);
  var View = _interopDefault(_reactNativeWebDistExportsView);
  var _reactNativeWebDistExportsScrollView = require(_dependencyMap[3]);
  var ScrollView = _interopDefault(_reactNativeWebDistExportsScrollView);
  var _reactNativeWebDistExportsImage = require(_dependencyMap[4]);
  var Image = _interopDefault(_reactNativeWebDistExportsImage);
  var _getpapillonPapicons = require(_dependencyMap[5]);
  var _expoRouterReactNavigation = require(_dependencyMap[6]);
  var _reactJsxRuntime = require(_dependencyMap[7]);
  function ChangelogScreen() {
    const theme = (0, _expoRouterReactNavigation.useTheme)();
    const {
      colors
    } = theme;
    return /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(ScrollView.default, {
      style: {
        flex: 1
      },
      contentContainerStyle: {
        padding: 20,
        gap: 12,
        justifyContent: "center"
      },
      showsVerticalScrollIndicator: false,
      contentInsetAdjustmentBehavior: "automatic",
      children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Image.default, {
        source: require(_dependencyMap[8]),
        style: {
          width: 72,
          height: 72,
          alignSelf: "center",
          borderRadius: 20,
          marginBottom: 8
        }
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
        variant: "h3",
        align: "center",
        children: "Bienvenue sur Papillon v8"
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
        variant: "body1",
        color: "secondary",
        align: "center",
        children: "Cette mise \xE0 jour a \xE9t\xE9 repens\xE9e de fond en comble pour am\xE9liorer votre exp\xE9rience. Mais cela prend du temps, nous faisons de notre mieux pour faire de cette version la meilleure possible."
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(View.default, {
        style: {
          height: 16
        }
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
        name: "clock",
        size: 32,
        color: colors.text,
        style: {
          alignSelf: "center"
        }
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
        variant: "h4",
        align: "center",
        children: "Pourquoi tout changer ?"
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
        variant: "body1",
        color: "secondary",
        align: "center",
        children: "Vous \xE9voluez, nous aussi ! Papillon n'a jamais cess\xE9 de grandir depuis des ann\xE9es, et nous nous devons d'utiliser une application modernis\xE9e afin d'offrir la meilleure exp\xE9rience et de garantir le futur de l'application."
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
        variant: "body1",
        color: "primary",
        align: "center",
        children: "Ce processus prend \xE9norm\xE9ment de temps, et en tant qu'\xE9tudiants et lyc\xE9ens, on doit aussi aller en cours, donc on fait ce qu'on peut avec ce qu'on \xE0 !"
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
        variant: "caption",
        color: "secondary",
        align: "center",
        children: "(Si vous aimez ce qu'on fait, n'h\xE9sitez pas \xE0 nous soutenir depuis les param\xE8tres !)"
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(View.default, {
        style: {
          height: 16
        }
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
        name: "ghost",
        size: 32,
        color: colors.text,
        style: {
          alignSelf: "center"
        }
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
        variant: "h4",
        align: "center",
        children: "Il manque (telle ou telle) fonctionnalit\xE9 ?"
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
        variant: "body1",
        color: "secondary",
        align: "center",
        children: "Pour vous permettre d'utiliser Papillon d\xE8s la rentr\xE9e, l'application est sortie plus l\xE8gere en fonctionnalit\xE9s que pr\xE9vu. Nous travaillons d'arrache-pied pour r\xE9int\xE9grer les fonctionnalit\xE9s manquantes au plus vite."
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(View.default, {
        style: {
          height: 16
        }
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
        name: "unlock",
        size: 32,
        color: colors.text,
        style: {
          alignSelf: "center"
        }
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
        variant: "h4",
        align: "center",
        children: "J'ai un bug avec (quelque chose) !"
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(Typography.default, {
        variant: "body1",
        color: "secondary",
        align: "center",
        children: ["Il est possible que certaines choses ne fonctionnent pas. Si la t\xE9l\xE9m\xE9trie est activ\xE9e, vos bugs nous seront automatiquement parvenus, sinon, n'h\xE9sitez pas \xE0 nous contacter (Param\xE8tres ", ">", " \xC0 propos)"]
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(View.default, {
        style: {
          height: 16
        }
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
        name: "heart",
        size: 32,
        color: colors.text,
        style: {
          alignSelf: "center"
        }
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
        variant: "h4",
        align: "center",
        children: "Merci d'\xEAtre l\xE0 depuis le d\xE9but !"
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
        variant: "body1",
        color: "secondary",
        align: "center",
        children: "Nous appr\xE9cions votre soutien et vos retours. N'h\xE9sitez pas \xE0 nous faire part de vos suggestions ou de vos probl\xE8mes sur les r\xE9seaux sociaux ou par email."
      })]
    });
  }
  ;
},995,[1110,6,198,222,267,1002,1000,97,1243]);