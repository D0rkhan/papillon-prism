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
      return SettingsContributors;
    }
  });
  var _getpapillonPapicons = require(_dependencyMap[0]);
  var _react = require(_dependencyMap[1]);
  var _reactNativeWebDistExportsLinking = require(_dependencyMap[2]);
  var Linking = _interopDefault(_reactNativeWebDistExportsLinking);
  var _uiComponentsActivityIndicator = require(_dependencyMap[3]);
  var ActivityIndicator = _interopDefault(_uiComponentsActivityIndicator);
  var _uiComponentsAvatar = require(_dependencyMap[4]);
  var Avatar = _interopDefault(_uiComponentsAvatar);
  var _uiComponentsIcon = require(_dependencyMap[5]);
  var Icon = _interopDefault(_uiComponentsIcon);
  var _uiNewList = require(_dependencyMap[6]);
  var List = _interopDefault(_uiNewList);
  var _uiNewTypography = require(_dependencyMap[7]);
  var Typography = _interopDefault(_uiNewTypography);
  var _utilsChatsInitials = require(_dependencyMap[8]);
  var _utilsGithubContributors = require(_dependencyMap[9]);
  var _expoRouterReactNavigation = require(_dependencyMap[10]);
  var _reactJsxRuntime = require(_dependencyMap[11]);
  const TEAM_LOGINS = ["ecnivtwelve", "tryon-dev", "raphckrman", "tom-things", "godetremy", "ryzenixx"];
  function SettingsContributors() {
    const {
      colors
    } = (0, _expoRouterReactNavigation.useTheme)();
    const [contributors, setContributors] = (0, _react.useState)([]);
    const [isLoading, setIsLoading] = (0, _react.useState)(true);
    (0, _react.useEffect)(() => {
      (0, _utilsGithubContributors.getContributors)().then(allContributors => {
        setContributors(allContributors.filter(contributor => !TEAM_LOGINS.includes(contributor.login)));
      }).finally(() => {
        setIsLoading(false);
      });
    }, []);
    const contributorItems = (0, _react.useMemo)(() => contributors.map(item => /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Item, {
      id: item.login,
      onPress: () => Linking.default.openURL(item.html_url),
      children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Leading, {
        children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Avatar.default, {
          size: 40,
          shape: "square",
          initials: (0, _utilsChatsInitials.getInitials)(item.login),
          imageUrl: item.avatar_url
        })
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
        variant: "title",
        children: item.login
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(Typography.default, {
        variant: "body2",
        color: "textSecondary",
        children: [item.contributions, " ", item.contributions > 1 ? "contributions" : "contribution"]
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Trailing, {
        children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Icon.default, {
          children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
            name: "ChevronRight"
          })
        })
      })]
    }, item.login)), [contributors]);
    return /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default, {
      contentInsetAdjustmentBehavior: "automatic",
      safeHorizontalPadding: 16,
      contentContainerStyle: {
        paddingVertical: 16,
        gap: 12
      },
      style: {
        flex: 1,
        backgroundColor: colors.overground
      },
      children: [isLoading && /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.View, {
        style: {
          alignItems: "center",
          justifyContent: "center",
          paddingVertical: 24,
          gap: 10
        },
        children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(ActivityIndicator.default, {
          size: 42
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
          variant: "caption",
          color: "textSecondary",
          align: "center",
          children: "Chargement des contributeurs..."
        })]
      }), !isLoading && contributorItems]
    });
  }
},918,[1002,6,310,1129,1135,1013,1007,1008,1139,1365,1000,97]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  exports.getContributors = getContributors;
  async function getContributors() {
    try {
      const response = await fetch("https://api.github.com/repos/PapillonApp/Papillon/contributors");
      const allContributors = await response.json();
      return allContributors;
    } catch (error) {
      console.error("Erreur lors de la récupération des contributeurs:", error);
      return [];
    }
  }
},1365,[]);