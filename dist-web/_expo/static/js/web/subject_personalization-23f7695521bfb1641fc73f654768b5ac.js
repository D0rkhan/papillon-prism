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
      return SubjectPersonalization;
    }
  });
  var _getpapillonPapicons = require(_dependencyMap[0]);
  var _expoRouterReactNavigation = require(_dependencyMap[1]);
  var _expoRouter = require(_dependencyMap[2]);
  require(_dependencyMap[3]);
  var _reactI18next = require(_dependencyMap[4]);
  var _reactNativeWebDistExportsAlert = require(_dependencyMap[5]);
  var Alert = _interopDefault(_reactNativeWebDistExportsAlert);
  var _reactNativeWebDistExportsView = require(_dependencyMap[6]);
  var View = _interopDefault(_reactNativeWebDistExportsView);
  var _storesAccount = require(_dependencyMap[7]);
  var _uiComponentsIcon = require(_dependencyMap[8]);
  var Icon = _interopDefault(_uiComponentsIcon);
  var _uiComponentsNativeHeader = require(_dependencyMap[9]);
  var _uiComponentsStack = require(_dependencyMap[10]);
  var Stack = _interopDefault(_uiComponentsStack);
  var _uiNewList = require(_dependencyMap[11]);
  var List = _interopDefault(_uiNewList);
  var _uiNewTypography = require(_dependencyMap[12]);
  var Typography = _interopDefault(_uiNewTypography);
  var _reactJsxRuntime = require(_dependencyMap[13]);
  function SubjectPersonalization() {
    const {
      colors
    } = (0, _expoRouterReactNavigation.useTheme)();
    const accounts = (0, _storesAccount.useAccountStore)(state => state.accounts);
    const lastUsedAccount = (0, _storesAccount.useAccountStore)(state => state.lastUsedAccount);
    const store = _storesAccount.useAccountStore.getState();
    const account = accounts.find(a => a.id === lastUsedAccount);
    const subjects = Object.entries(account?.customisation?.subjects ?? {}).map(([key, value]) => ({
      id: key,
      ...value
    })).filter(item => item.name && item.emoji && item.color);
    const resetAllSubjects = () => {
      Alert.default.alert(t("Settings_Subjects_Reset_Title"), t("Settings_Subjects_Reset_Message"), [{
        text: t("CANCEL_BTN"),
        style: "cancel"
      }, {
        text: t("Settings_Subjects_Reset_Button"),
        style: "destructive",
        onPress: () => {
          store.setSubjects({});
        }
      }]);
    };
    function renderItem(emoji, name, id, color) {
      return /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Item, {
        onPress: () => {
          _expoRouter.router.push({
            pathname: "/(settings)/edit_subject",
            params: {
              id,
              emoji,
              color,
              name
            }
          });
        },
        children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Leading, {
          children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Stack.default, {
            backgroundColor: color + "20",
            style: {
              width: 40,
              height: 40,
              borderRadius: 40,
              alignItems: "center",
              justifyContent: "center"
            },
            children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              style: {
                fontSize: 25,
                lineHeight: 32
              },
              children: emoji
            })
          })
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
          variant: "title",
          children: name
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Trailing, {
          children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Icon.default, {
            children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
              name: "ChevronRight",
              opacity: 0.7
            })
          })
        })]
      }, id);
    }
    const {
      t
    } = (0, _reactI18next.useTranslation)();
    return /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_reactJsxRuntime.Fragment, {
      children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_uiComponentsNativeHeader.NativeHeaderSide, {
        side: "Right",
        children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_uiComponentsNativeHeader.NativeHeaderPressable, {
          onPress: () => resetAllSubjects(),
          children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Icon.default, {
            children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
              name: "Trash"
            })
          })
        })
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default, {
        style: {
          flex: 1,
          backgroundColor: colors.overground
        },
        safeHorizontalPadding: 16,
        contentContainerStyle: {
          paddingVertical: 16
        },
        contentInsetAdjustmentBehavior: "automatic",
        children: subjects.length > 0 ? subjects.map(item => renderItem(item.emoji, item.name, item.id, item.color)) : /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.View, {
          children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Stack.default, {
            hAlign: "center",
            vAlign: "center",
            margin: 16,
            gap: 16,
            children: /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(View.default, {
              style: {
                alignItems: "center"
              },
              children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Icon.default, {
                papicon: true,
                opacity: 0.5,
                size: 32,
                style: {
                  marginBottom: 3
                },
                children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
                  name: "Alert"
                })
              }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
                variant: "h4",
                color: "textPrimary",
                align: "center",
                children: t("Settings_Subjects_None_Title")
              }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
                variant: "body2",
                color: "textSecondary",
                align: "center",
                children: t("Settings_Subjects_None_Description")
              })]
            })
          })
        })
      })]
    });
  }
},926,[1002,1000,1023,6,1105,190,198,1022,1013,1214,1005,1007,1008,97]);