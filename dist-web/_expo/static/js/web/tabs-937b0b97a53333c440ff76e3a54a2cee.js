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
  require(_dependencyMap[1]);
  var _reactI18next = require(_dependencyMap[2]);
  var _storesSettings = require(_dependencyMap[3]);
  var _storesAccount = require(_dependencyMap[4]);
  var _uiComponentsIcon = require(_dependencyMap[5]);
  var Icon = _interopDefault(_uiComponentsIcon);
  var _uiNewList = require(_dependencyMap[6]);
  var List = _interopDefault(_uiNewList);
  var _uiNewTypography = require(_dependencyMap[7]);
  var Typography = _interopDefault(_uiNewTypography);
  var _uiNativeNativeSwitch = require(_dependencyMap[8]);
  var NativeSwitch = _interopDefault(_uiNativeNativeSwitch);
  var _expoRouterReactNavigation = require(_dependencyMap[9]);
  var _reactJsxRuntime = require(_dependencyMap[10]);
  const SettingsTabs = () => {
    const {
      t
    } = (0, _reactI18next.useTranslation)();
    const {
      colors
    } = (0, _expoRouterReactNavigation.useTheme)();
    const settingsStore = (0, _storesSettings.useSettingsStore)(state => state.personalization);
    const mutateProperty = (0, _storesSettings.useSettingsStore)(state => state.mutateProperty);
    const lastUsedAccount = (0, _storesAccount.useAccountStore)(state => state.lastUsedAccount);
    const disabledTabsByAccount = settingsStore?.disabledTabsByAccount || {};
    const disabledTabs = (lastUsedAccount ? disabledTabsByAccount[lastUsedAccount] : settingsStore?.disabledTabs) || [];
    const tabs = [{
      id: "calendar",
      name: t("Tab_Calendar"),
      icon: "calendar",
      enabled: !disabledTabs.includes("calendar")
    }, {
      id: "tasks",
      name: t("Tab_Tasks"),
      icon: "tasks",
      enabled: !disabledTabs.includes("tasks")
    }, {
      id: "grades",
      name: t("Tab_Grades"),
      icon: "grades",
      enabled: !disabledTabs.includes("grades")
    }];
    const toggleTab = tabId => {
      const nextDisabledTabs = disabledTabs.includes(tabId) ? disabledTabs.filter(id => id !== tabId) : [...disabledTabs, tabId];
      const nextDisabledTabsByAccount = lastUsedAccount ? {
        ...disabledTabsByAccount,
        [lastUsedAccount]: nextDisabledTabs
      } : disabledTabsByAccount;
      if (disabledTabs.includes(tabId)) {
        mutateProperty("personalization", {
          ...settingsStore,
          disabledTabs: nextDisabledTabs,
          disabledTabsByAccount: nextDisabledTabsByAccount
        });
      } else {
        mutateProperty("personalization", {
          ...settingsStore,
          disabledTabs: nextDisabledTabs,
          disabledTabsByAccount: nextDisabledTabsByAccount
        });
      }
    };
    return /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default, {
      contentInsetAdjustmentBehavior: "automatic",
      safeHorizontalPadding: 16,
      contentContainerStyle: {
        paddingVertical: 16
      },
      style: {
        flex: 1,
        backgroundColor: colors.overground
      },
      children: tabs.map(tab => /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Item, {
        children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Leading, {
          children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Icon.default, {
            children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
              name: tab.icon
            })
          })
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
          variant: "title",
          children: tab.name
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Trailing, {
          children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(NativeSwitch.default, {
            value: tab.enabled,
            onValueChange: () => toggleTab(tab.id)
          })
        })]
      }, tab.id))
    });
  };
  var _default = SettingsTabs;
},927,[1002,6,1105,1012,1022,1013,1007,1008,1130,1000,97]);