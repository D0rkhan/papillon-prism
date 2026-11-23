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
  var _getpapillonPapicons = require(_dependencyMap[0]);
  var _expoRouterReactNavigation = require(_dependencyMap[1]);
  require(_dependencyMap[2]);
  var _reactI18next = require(_dependencyMap[3]);
  var _reactNativeWebDistExportsAlert = require(_dependencyMap[4]);
  var Alert = _interopDefault(_reactNativeWebDistExportsAlert);
  require(_dependencyMap[5]);
  var _storesSettings = require(_dependencyMap[6]);
  var _uiComponentsIcon = require(_dependencyMap[7]);
  var Icon = _interopDefault(_uiComponentsIcon);
  var _uiNewList = require(_dependencyMap[8]);
  var List = _interopDefault(_uiNewList);
  var _uiNewTypography = require(_dependencyMap[9]);
  var Typography = _interopDefault(_uiNewTypography);
  var _utilsI18n = require(_dependencyMap[10]);
  var _reactJsxRuntime = require(_dependencyMap[11]);
  const LanguagePersonalization = () => {
    const {
      i18n
    } = (0, _reactI18next.useTranslation)();
    const {
      colors
    } = (0, _expoRouterReactNavigation.useTheme)();
    const settingStore = (0, _storesSettings.useSettingsStore)(state => state.personalization);
    const mutateProperty = (0, _storesSettings.useSettingsStore)(state => state.mutateProperty);
    const languages = Object.keys(_utilsI18n.resources).map(key => ({
      id: key,
      name: _utilsI18n.resources[key].label,
      emoji: _utilsI18n.resources[key].emoji
    }));
    const rtlLanguages = ["ar", "he", "fa", "ur"];
    const setLanguage = lang => {
      requestAnimationFrame(() => {
        if (rtlLanguages.includes(lang)) {
          Alert.default.alert("Inverted layout is not supported yet", "The selected language may not be displayed correctly.");
        }
        setTimeout(() => {
          i18n.changeLanguage(lang);
          mutateProperty("personalization", {
            ...settingStore,
            language: lang
          });
        }, 90);
      });
    };
    return /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default, {
      style: {
        flex: 1,
        backgroundColor: colors.overground
      },
      safeHorizontalPadding: 16,
      contentContainerStyle: {
        paddingVertical: 16
      },
      contentInsetAdjustmentBehavior: "automatic",
      children: languages.map(lang => {
        const isSelected = i18n.language === lang.id;
        return /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Item, {
          onPress: () => {
            setLanguage(lang.id);
          },
          children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Leading, {
            children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              children: lang.emoji
            })
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
            variant: "title",
            weight: isSelected ? "bold" : "medium",
            style: {
              paddingVertical: 2
            },
            children: lang.name
          }), isSelected && /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Trailing, {
            children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Icon.default, {
              size: 22,
              papicon: true,
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
                name: "Check",
                color: colors.primary
              })
            })
          })]
        }, lang.id);
      })
    });
  };
  var _default = LanguagePersonalization;
},921,[1002,1000,6,1105,190,193,1012,1013,1007,1008,1127,97]);