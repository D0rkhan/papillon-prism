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
      return OfflineAccount;
    }
  });
  var _expoRouterReactNavigation = require(_dependencyMap[0]);
  var _expoRouter = require(_dependencyMap[1]);
  var _react = require(_dependencyMap[2]);
  var _reactNativeWebDistExportsKeyboardAvoidingView = require(_dependencyMap[3]);
  var KeyboardAvoidingView = _interopDefault(_reactNativeWebDistExportsKeyboardAvoidingView);
  require(_dependencyMap[4]);
  var _reactNativeWebDistExportsScrollView = require(_dependencyMap[5]);
  var ScrollView = _interopDefault(_reactNativeWebDistExportsScrollView);
  var _reactNativeWebDistExportsStatusBar = require(_dependencyMap[6]);
  var StatusBar = _interopDefault(_reactNativeWebDistExportsStatusBar);
  var _reactNativeWebDistExportsView = require(_dependencyMap[7]);
  var View = _interopDefault(_reactNativeWebDistExportsView);
  var _reactI18next = require(_dependencyMap[8]);
  var _reactNativeSafeAreaContext = require(_dependencyMap[9]);
  var _storesAccount = require(_dependencyMap[10]);
  var _uiComponentsStack = require(_dependencyMap[11]);
  var Stack = _interopDefault(_uiComponentsStack);
  var _uiNewButton = require(_dependencyMap[12]);
  var Button = _interopDefault(_uiNewButton);
  var _uiNewTextInput = require(_dependencyMap[13]);
  var TextInput = _interopDefault(_uiNewTextInput);
  var _uiNewTypography = require(_dependencyMap[14]);
  var Typography = _interopDefault(_uiNewTypography);
  var _utilsUuidUuid = require(_dependencyMap[15]);
  var uuid = _interopDefault(_utilsUuidUuid);
  var _uiComponentsSafeHorizontalView = require(_dependencyMap[16]);
  var SafeHorizontalView = _interopDefault(_uiComponentsSafeHorizontalView);
  var _reactJsxRuntime = require(_dependencyMap[17]);
  function OfflineAccount() {
    const headerHeight = (0, _expoRouterReactNavigation.useHeaderHeight)();
    const insets = (0, _reactNativeSafeAreaContext.useSafeAreaInsets)();
    const router = (0, _expoRouter.useRouter)();
    const theme = (0, _expoRouterReactNavigation.useTheme)();
    const {
      t
    } = (0, _reactI18next.useTranslation)();
    const [firstName, setFirstName] = (0, _react.useState)("");
    const [lastName, setLastName] = (0, _react.useState)("");
    const canSubmit = firstName.trim().length > 0 && lastName.trim().length > 0;
    const createAccount = () => {
      if (!canSubmit) {
        return;
      }
      const id = (0, uuid.default)();
      const now = new Date().toISOString();
      const store = _storesAccount.useAccountStore.getState();
      store.addAccount({
        id,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        custom: true,
        customisation: {
          profilePicture: "",
          subjects: {}
        },
        services: [],
        createdAt: now,
        updatedAt: now
      });
      store.setLastUsedAccount(id);
      router.dismissAll();
      router.push("/");
    };
    return /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(KeyboardAvoidingView.default, {
      behavior: undefined,
      style: {
        flex: 1
      },
      children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(StatusBar.default, {
        barStyle: theme.dark ? "light-content" : "dark-content",
        translucent: true
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(ScrollView.default, {
        contentContainerStyle: {
          flexGrow: 1,
          paddingTop: headerHeight + 32,
          paddingBottom: 20
        },
        keyboardShouldPersistTaps: "handled",
        children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(SafeHorizontalView.default, {
          base: 20,
          style: {
            flexGrow: 1
          },
          children: /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(Stack.default, {
            gap: 8,
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "h2",
              children: t("ONBOARDING_OFFLINE_TITLE")
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "action",
              color: "textSecondary",
              children: t("ONBOARDING_OFFLINE_DESCRIPTION")
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(View.default, {
              style: {
                height: 20
              }
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(TextInput.default, {
              color: String(theme.colors.primary),
              autoCapitalize: "words",
              autoComplete: "name-given",
              placeholder: t("ONBOARDING_FIRST_NAME"),
              returnKeyType: "next",
              textContentType: "givenName",
              value: firstName,
              onChangeText: setFirstName
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(TextInput.default, {
              color: String(theme.colors.primary),
              autoCapitalize: "words",
              autoComplete: "name-family",
              placeholder: t("ONBOARDING_LAST_NAME"),
              returnKeyType: "done",
              textContentType: "familyName",
              value: lastName,
              onChangeText: setLastName,
              onSubmitEditing: createAccount
            })]
          })
        })
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(SafeHorizontalView.default, {
        base: 20,
        style: {
          paddingTop: 20,
          paddingBottom: insets.bottom + 20,
          borderTopColor: theme.colors.border,
          borderTopWidth: 1,
          backgroundColor: theme.colors.background
        },
        children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Button.default, {
          label: t("ONBOARDING_CREATE_ACCOUNT"),
          onPress: createAccount,
          disabled: !canSubmit,
          fullWidth: true
        })
      })]
    });
  }
},884,[1000,1023,6,326,193,222,341,198,1105,360,1022,1005,1006,1248,1008,1249,1111,97]);