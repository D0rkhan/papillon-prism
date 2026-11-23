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
      return SettingsServices;
    }
  });
  var _lucideReactNative = require(_dependencyMap[0]);
  require(_dependencyMap[1]);
  var _reactNativeWebDistExportsScrollView = require(_dependencyMap[2]);
  var ScrollView = _interopDefault(_reactNativeWebDistExportsScrollView);
  var _reactI18next = require(_dependencyMap[3]);
  var _storesAccount = require(_dependencyMap[4]);
  var _uiComponentsIcon = require(_dependencyMap[5]);
  var Icon = _interopDefault(_uiComponentsIcon);
  var _uiComponentsItem = require(_dependencyMap[6]);
  var Item = _interopDefault(_uiComponentsItem);
  var _uiComponentsList = require(_dependencyMap[7]);
  var List = _interopDefault(_uiComponentsList);
  var _uiComponentsStack = require(_dependencyMap[8]);
  var Stack = _interopDefault(_uiComponentsStack);
  var _uiComponentsTypography = require(_dependencyMap[9]);
  var Typography = _interopDefault(_uiComponentsTypography);
  var _uiComponentsSafeHorizontalView = require(_dependencyMap[10]);
  var SafeHorizontalView = _interopDefault(_uiComponentsSafeHorizontalView);
  var _reactJsxRuntime = require(_dependencyMap[11]);
  function SettingsServices() {
    const accountStore = (0, _storesAccount.useAccountStore)();
    const {
      t
    } = (0, _reactI18next.useTranslation)();
    return /*#__PURE__*/(0, _reactJsxRuntime.jsx)(ScrollView.default, {
      contentContainerStyle: {
        paddingVertical: 16
      },
      contentInsetAdjustmentBehavior: "automatic",
      style: {
        width: '100%',
        height: '100%'
      },
      children: /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(SafeHorizontalView.default, {
        base: 16,
        children: [accountStore.lastUsedAccount && /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default, {
          children: /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(Item.default, {
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "caption",
              color: "secondary",
              children: t('Settings_Services_Title_LastAccountUsed')
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "title",
              children: accountStore.lastUsedAccount
            })]
          })
        }), accountStore.accounts.length === 0 && /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(Stack.default, {
          vAlign: "center",
          hAlign: "center",
          padding: 16,
          gap: 0,
          children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Icon.default, {
            opacity: 0.5,
            style: {
              marginBottom: 8
            },
            children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_lucideReactNative.UserX2Icon, {
              size: 36
            })
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
            variant: "h4",
            align: "center",
            children: "Aucun compte li\xE9"
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
            variant: "body1",
            color: "secondary",
            align: "center",
            children: "Ajoute un compte en appuyant sur le bouton ci-dessus."
          })]
        })]
      })
    });
  }
},924,[1010,6,222,1105,1022,1013,1123,1122,1005,1110,1111,97]);