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
      return MultiLoginWithCredentials;
    }
  });
  var _expoRouterReactNavigation = require(_dependencyMap[0]);
  var _esupMultiJs = require(_dependencyMap[1]);
  var _expoRouter = require(_dependencyMap[2]);
  var _react = require(_dependencyMap[3]);
  var _reactI18next = require(_dependencyMap[4]);
  var _reactNativeWebDistExportsKeyboard = require(_dependencyMap[5]);
  var Keyboard = _interopDefault(_reactNativeWebDistExportsKeyboard);
  var _reactNativeWebDistExportsKeyboardAvoidingView = require(_dependencyMap[6]);
  var KeyboardAvoidingView = _interopDefault(_reactNativeWebDistExportsKeyboardAvoidingView);
  require(_dependencyMap[7]);
  var _reactNativeWebDistExportsScrollView = require(_dependencyMap[8]);
  var ScrollView = _interopDefault(_reactNativeWebDistExportsScrollView);
  var _reactNativeReanimated = require(_dependencyMap[9]);
  var _reactNativeSafeAreaContext = require(_dependencyMap[10]);
  var _storesAccount = require(_dependencyMap[11]);
  var _storesAccountTypes = require(_dependencyMap[12]);
  var _uiComponentsAlertProvider = require(_dependencyMap[13]);
  var _utilsUuidUuid = require(_dependencyMap[14]);
  var uuid = _interopDefault(_utilsUuidUuid);
  var _componentsLoginView = require(_dependencyMap[15]);
  var LoginView = _interopDefault(_componentsLoginView);
  var _reactJsxRuntime = require(_dependencyMap[16]);
  const ANIMATION_DURATION = 170;
  const _worklet_11666159047958_init_data = {
    code: "(function credentialsTsx1(){const[opacity,withTiming,ANIMATION_DURATION,scale]=this.__closure;opacity.value=withTiming(0,{duration:ANIMATION_DURATION});scale.value=withTiming(0.8,{duration:ANIMATION_DURATION});})"
  };
  const _worklet_13590809988163_init_data = {
    code: "(function credentialsTsx2(){const[opacity,withTiming,ANIMATION_DURATION,scale]=this.__closure;opacity.value=withTiming(1,{duration:ANIMATION_DURATION});scale.value=withTiming(1,{duration:ANIMATION_DURATION});})"
  };
  function MultiLoginWithCredentials() {
    const insets = (0, _reactNativeSafeAreaContext.useSafeAreaInsets)();
    const theme = (0, _expoRouterReactNavigation.useTheme)();
    const alert = (0, _uiComponentsAlertProvider.useAlert)();
    const {
      t
    } = (0, _reactI18next.useTranslation)();
    const [username, setUsername] = (0, _react.useState)("");
    const [password, setPassword] = (0, _react.useState)("");
    const [isLoggingIn, setIsLoggingIn] = (0, _react.useState)(false);
    const opacity = (0, _reactNativeReanimated.useSharedValue)(1);
    const scale = (0, _reactNativeReanimated.useSharedValue)(1);
    const param = (0, _expoRouter.useLocalSearchParams)();
    console.log(param);
    const instanceUrl = String(param.url);
    const university = String(param.university);
    const color = String(param.color);
    const keyboardListeners = (0, _react.useMemo)(() => ({
      show: function credentialsTsx1Factory([_worklet_11666159047958_init_data, opacity, withTiming, ANIMATION_DURATION, scale]) {
        const credentialsTsx1 = function () {
          "use no memo";

          opacity.value = withTiming(0, {
            duration: ANIMATION_DURATION
          });
          scale.value = withTiming(0.8, {
            duration: ANIMATION_DURATION
          });
        };
        credentialsTsx1.__closure = [opacity, withTiming, ANIMATION_DURATION, scale];
        credentialsTsx1.__workletHash = 11666159047958;
        credentialsTsx1.__initData = _worklet_11666159047958_init_data;
        return credentialsTsx1;
      }([_worklet_11666159047958_init_data, opacity, _reactNativeReanimated.withTiming, ANIMATION_DURATION, scale]),
      hide: function credentialsTsx2Factory([_worklet_13590809988163_init_data, opacity, withTiming, ANIMATION_DURATION, scale]) {
        const credentialsTsx2 = function () {
          "use no memo";

          opacity.value = withTiming(1, {
            duration: ANIMATION_DURATION
          });
          scale.value = withTiming(1, {
            duration: ANIMATION_DURATION
          });
        };
        credentialsTsx2.__closure = [opacity, withTiming, ANIMATION_DURATION, scale];
        credentialsTsx2.__workletHash = 13590809988163;
        credentialsTsx2.__initData = _worklet_13590809988163_init_data;
        return credentialsTsx2;
      }([_worklet_13590809988163_init_data, opacity, _reactNativeReanimated.withTiming, ANIMATION_DURATION, scale])
    }), [opacity]);
    (0, _react.useEffect)(() => {
      const showSub = Keyboard.default.addListener("keyboardWillShow", keyboardListeners.show);
      const hideSub = Keyboard.default.addListener("keyboardWillHide", keyboardListeners.hide);
      return () => {
        showSub.remove();
        hideSub.remove();
      };
    }, [keyboardListeners]);
    async function handleLogin(password, username) {
      setIsLoggingIn(true);
      try {
        const store = _storesAccount.useAccountStore.getState();
        const MultiAccount = await (0, _esupMultiJs.authWithCredentials)(instanceUrl, {
          username,
          password
        });
        const accountUUID = String((0, uuid.default)());
        const account = {
          id: accountUUID,
          firstName: MultiAccount?.userData.firstname ?? "",
          lastName: MultiAccount?.userData.name ?? "",
          schoolName: university,
          services: [{
            id: (0, uuid.default)(),
            auth: {
              refreshToken: MultiAccount.userData.refreshAuthToken,
              additionals: {
                instanceUrl: instanceUrl
              }
            },
            serviceId: _storesAccountTypes.Services.MULTI,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        store.addAccount(account);
        store.setLastUsedAccount(accountUUID);
        setIsLoggingIn(false);
        return _expoRouter.router.dismissTo("/");
      } catch (error) {
        if (error instanceof Error) {
          alert.showAlert({
            title: t("Alert_Auth_Error"),
            description: t("Alert_Auth_Bad_Creds"),
            icon: "AlertTriangle",
            color: "#D60046",
            withoutNavbar: true
          });
        }
        setIsLoggingIn(false);
      }
    }
    const headerHeight = (0, _expoRouterReactNavigation.useHeaderHeight)();
    const finalHeaderHeight = insets.top;
    return /*#__PURE__*/(0, _reactJsxRuntime.jsx)(KeyboardAvoidingView.default, {
      style: {
        flex: 1
      },
      behavior: "padding",
      children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(ScrollView.default, {
        keyboardShouldPersistTaps: "handled",
        contentContainerStyle: {
          paddingTop: finalHeaderHeight,
          paddingBottom: insets.bottom
        },
        children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(LoginView.default, {
          color: color ?? theme.colors.primary,
          serviceName: String(param.university),
          loading: isLoggingIn,
          onSubmit: values => {
            if (!isLoggingIn && values.username && values.password) {
              handleLogin(values.password, values.username);
            }
          }
        })
      })
    });
  }
},900,[1000,1313,1023,6,1105,307,326,193,222,1107,360,1022,1109,1125,1249,876,97]);