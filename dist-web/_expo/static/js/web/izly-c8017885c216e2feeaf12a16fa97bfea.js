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
      return TurboSelfLoginWithCredentials;
    }
  });
  var _expoRouterReactNavigation = require(_dependencyMap[0]);
  var _expoRouter = require(_dependencyMap[1]);
  var _ezly = require(_dependencyMap[2]);
  var _react = require(_dependencyMap[3]);
  var _reactI18next = require(_dependencyMap[4]);
  var _reactNativeWebDistExportsAlert = require(_dependencyMap[5]);
  var Alert = _interopDefault(_reactNativeWebDistExportsAlert);
  var _reactNativeWebDistExportsKeyboard = require(_dependencyMap[6]);
  var Keyboard = _interopDefault(_reactNativeWebDistExportsKeyboard);
  var _reactNativeWebDistExportsKeyboardAvoidingView = require(_dependencyMap[7]);
  var KeyboardAvoidingView = _interopDefault(_reactNativeWebDistExportsKeyboardAvoidingView);
  var _reactNativeWebDistExportsLinking = require(_dependencyMap[8]);
  var Linking = _interopDefault(_reactNativeWebDistExportsLinking);
  var _reactNativeWebDistExportsScrollView = require(_dependencyMap[9]);
  var ScrollView = _interopDefault(_reactNativeWebDistExportsScrollView);
  var _reactNativeReanimated = require(_dependencyMap[10]);
  var _reactNativeSafeAreaContext = require(_dependencyMap[11]);
  var _servicesShared = require(_dependencyMap[12]);
  var _storesAccount = require(_dependencyMap[13]);
  var _storesAccountTypes = require(_dependencyMap[14]);
  var _uiComponentsAlertProvider = require(_dependencyMap[15]);
  var _utilsLoggerLogger = require(_dependencyMap[16]);
  var _utilsUuidUuid = require(_dependencyMap[17]);
  var uuid = _interopDefault(_utilsUuidUuid);
  var _componentsLoginView = require(_dependencyMap[18]);
  var LoginView = _interopDefault(_componentsLoginView);
  var _reactJsxRuntime = require(_dependencyMap[19]);
  /* eslint-disable @typescript-eslint/no-require-imports */

  const ANIMATION_DURATION = 100;
  const _worklet_17531836683688_init_data = {
    code: "(function izlyTsx1(){const[opacity,withTiming,ANIMATION_DURATION,scale]=this.__closure;opacity.value=withTiming(0,{duration:ANIMATION_DURATION});scale.value=withTiming(0.8,{duration:ANIMATION_DURATION});})"
  };
  const _worklet_6928953254749_init_data = {
    code: "(function izlyTsx2(){const[opacity,withTiming,ANIMATION_DURATION,scale]=this.__closure;opacity.value=withTiming(1,{duration:ANIMATION_DURATION});scale.value=withTiming(1,{duration:ANIMATION_DURATION});})"
  };
  function TurboSelfLoginWithCredentials() {
    const insets = (0, _reactNativeSafeAreaContext.useSafeAreaInsets)();
    const theme = (0, _expoRouterReactNavigation.useTheme)();
    const navigation = (0, _expoRouter.useNavigation)();
    const [username, setUsername] = (0, _react.useState)("");
    const [password, setPassword] = (0, _react.useState)("");
    const [linkSended, setLinkSended] = (0, _react.useState)(false);
    const [isLoggingIn, setIsLoggingIn] = (0, _react.useState)(false);
    const params = (0, _expoRouter.useLocalSearchParams)();
    const action = String(params.action);
    const opacity = (0, _reactNativeReanimated.useSharedValue)(1);
    const scale = (0, _reactNativeReanimated.useSharedValue)(1);
    const keyboardListeners = (0, _react.useMemo)(() => ({
      show: function izlyTsx1Factory([_worklet_17531836683688_init_data, opacity, withTiming, ANIMATION_DURATION, scale]) {
        const izlyTsx1 = function () {
          "use no memo";

          opacity.value = withTiming(0, {
            duration: ANIMATION_DURATION
          });
          scale.value = withTiming(0.8, {
            duration: ANIMATION_DURATION
          });
        };
        izlyTsx1.__closure = [opacity, withTiming, ANIMATION_DURATION, scale];
        izlyTsx1.__workletHash = 17531836683688;
        izlyTsx1.__initData = _worklet_17531836683688_init_data;
        return izlyTsx1;
      }([_worklet_17531836683688_init_data, opacity, _reactNativeReanimated.withTiming, ANIMATION_DURATION, scale]),
      hide: function izlyTsx2Factory([_worklet_6928953254749_init_data, opacity, withTiming, ANIMATION_DURATION, scale]) {
        const izlyTsx2 = function () {
          "use no memo";

          opacity.value = withTiming(1, {
            duration: ANIMATION_DURATION
          });
          scale.value = withTiming(1, {
            duration: ANIMATION_DURATION
          });
        };
        izlyTsx2.__closure = [opacity, withTiming, ANIMATION_DURATION, scale];
        izlyTsx2.__workletHash = 6928953254749;
        izlyTsx2.__initData = _worklet_6928953254749_init_data;
        return izlyTsx2;
      }([_worklet_6928953254749_init_data, opacity, _reactNativeReanimated.withTiming, ANIMATION_DURATION, scale])
    }), [opacity]);
    (0, _react.useEffect)(() => {
      const showSub = Keyboard.default.addListener("keyboardWillShow", keyboardListeners.show);
      const hideSub = Keyboard.default.addListener("keyboardWillHide", keyboardListeners.hide);
      return () => {
        showSub.remove();
        hideSub.remove();
      };
    }, [keyboardListeners]);
    const {
      t
    } = (0, _reactI18next.useTranslation)();
    const alert = (0, _uiComponentsAlertProvider.useAlert)();
    const handleActivation = (0, _react.useCallback)(async url => {
      try {
        const id = (0, uuid.default)();
        const {
          identification,
          profile
        } = await (0, _ezly.tokenize)(url);
        const service = {
          id,
          auth: {
            session: identification,
            additionals: {
              secret: password
            }
          },
          serviceId: _storesAccountTypes.Services.IZLY,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        const store = _storesAccount.useAccountStore.getState();
        if (action === "addService") {
          store.addServiceToAccount(store.lastUsedAccount, service);
          await (0, _servicesShared.initializeAccountManager)();
          const parent = navigation.getParent();
          if (parent) {
            parent.goBack();
            const parentsParent = parent.getParent();
            if (parentsParent) {
              parentsParent.goBack();
            }
          }
          _expoRouter.router.back();
          _expoRouter.router.dismissAll();
        }
        store.addAccount({
          id,
          firstName: profile.firstName,
          lastName: profile.lastName,
          services: [service],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        });
        store.setLastUsedAccount(id);
        const parent = navigation.getParent();
        if (parent) {
          parent.goBack();
          const parentsParent = parent.getParent();
          if (parentsParent) {
            parentsParent.goBack();
          }
        }
        _expoRouter.router.back();
        _expoRouter.router.dismissAll();
        return _expoRouter.router.push('/');
      } catch (err) {
        (0, _utilsLoggerLogger.error)("Failed to activate Izly account: " + String(err));
      }
    }, [password, action]);
    (0, _react.useEffect)(() => {
      const handleDeepLink = event => {
        const url = event.url;
        const scheme = url.split(":")[0];
        if (scheme === "izly") {
          (0, _utilsLoggerLogger.log)("[IzlyActivation] Activation link received:", url);
          handleActivation(url);
        } else {
          (0, _utilsLoggerLogger.log)("[IzlyActivation] Ignoring link:", url);
        }
      };
      Linking.default.getInitialURL().then(url => {
        if (url) {
          handleDeepLink({
            url
          });
        }
      });
      const listener = Linking.default.addEventListener("url", handleDeepLink);
      return () => {
        listener?.remove();
      };
    }, [handleActivation]);
    async function handleLogin(username, password) {
      try {
        setIsLoggingIn(true);
        await (0, _ezly.login)(username, password);
        setIsLoggingIn(false);
        setLinkSended(true);
        Alert.default.alert(t("ONBOARDING_SMS_SENT_TITLE"), t("ONBOARDING_IZLY_SMS_SENT_DESCRIPTION"));
      } catch (error) {
        setIsLoggingIn(false);
        Alert.default.alert(t("Alert_Auth_Error"), t("ONBOARDING_ALERT_LOGIN_ABORTED"));
      }
    }
    return /*#__PURE__*/(0, _reactJsxRuntime.jsx)(KeyboardAvoidingView.default, {
      style: {
        flex: 1
      },
      behavior: "padding",
      keyboardVerticalOffset: 32,
      children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(ScrollView.default, {
        keyboardShouldPersistTaps: "handled",
        contentContainerStyle: {
          paddingTop: insets.top,
          paddingBottom: insets.bottom
        },
        children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(LoginView.default, {
          color: "#00b7cf",
          serviceName: "Izly",
          fields: [{
            name: "username",
            placeholder: t("INPUT_PHONE_OR_MAIL"),
            secureTextEntry: false,
            textContentType: "username",
            keyboardType: "email-address"
          }, {
            name: "password",
            placeholder: t("INPUT_PASSWORD_CODE"),
            secureTextEntry: true,
            textContentType: "password",
            keyboardType: "number-pad"
          }],
          serviceIcon: require(_dependencyMap[20]),
          loading: isLoggingIn,
          onSubmit: values => {
            if (!isLoggingIn && values.username && values.password) {
              handleLogin(values.username, values.password);
            }
          }
        })
      })
    });
  }
},888,[1000,1023,1259,6,1105,190,307,326,310,222,1107,360,1118,1022,1109,1125,1116,1249,876,97,1260]);