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
  var _react = require(_dependencyMap[2]);
  var _reactI18next = require(_dependencyMap[3]);
  var _reactNativeWebDistExportsAlert = require(_dependencyMap[4]);
  var Alert = _interopDefault(_reactNativeWebDistExportsAlert);
  var _reactNativeWebDistExportsKeyboard = require(_dependencyMap[5]);
  var Keyboard = _interopDefault(_reactNativeWebDistExportsKeyboard);
  var _reactNativeWebDistExportsKeyboardAvoidingView = require(_dependencyMap[6]);
  var KeyboardAvoidingView = _interopDefault(_reactNativeWebDistExportsKeyboardAvoidingView);
  var _reactNativeWebDistExportsScrollView = require(_dependencyMap[7]);
  var ScrollView = _interopDefault(_reactNativeWebDistExportsScrollView);
  var _reactNativeReanimated = require(_dependencyMap[8]);
  var _reactNativeSafeAreaContext = require(_dependencyMap[9]);
  var _turboselfApi = require(_dependencyMap[10]);
  var _servicesShared = require(_dependencyMap[11]);
  var _storesAccount = require(_dependencyMap[12]);
  var _storesAccountTypes = require(_dependencyMap[13]);
  var _uiComponentsAlertProvider = require(_dependencyMap[14]);
  var _utilsUuidUuid = require(_dependencyMap[15]);
  var uuid = _interopDefault(_utilsUuidUuid);
  var _componentsLoginView = require(_dependencyMap[16]);
  var LoginView = _interopDefault(_componentsLoginView);
  var _reactJsxRuntime = require(_dependencyMap[17]);
  /* eslint-disable @typescript-eslint/no-require-imports */

  const ANIMATION_DURATION = 100;
  const _worklet_7272860908012_init_data = {
    code: "(function turboselfTsx1(){const[opacity,withTiming,ANIMATION_DURATION,scale]=this.__closure;opacity.value=withTiming(0,{duration:ANIMATION_DURATION});scale.value=withTiming(0.8,{duration:ANIMATION_DURATION});})"
  };
  const _worklet_3822593479929_init_data = {
    code: "(function turboselfTsx2(){const[opacity,withTiming,ANIMATION_DURATION,scale]=this.__closure;opacity.value=withTiming(1,{duration:ANIMATION_DURATION});scale.value=withTiming(1,{duration:ANIMATION_DURATION});})"
  };
  function TurboSelfLoginWithCredentials() {
    const theme = (0, _expoRouterReactNavigation.useTheme)();
    const insets = (0, _reactNativeSafeAreaContext.useSafeAreaInsets)();
    const {
      t
    } = (0, _reactI18next.useTranslation)();
    const navigation = (0, _expoRouter.useNavigation)();
    const [isLoggingIn, setIsLoggingIn] = (0, _react.useState)(false);
    const params = (0, _expoRouter.useLocalSearchParams)();
    const action = String(params.action);
    const opacity = (0, _reactNativeReanimated.useSharedValue)(1);
    const alert = (0, _uiComponentsAlertProvider.useAlert)();
    const scale = (0, _reactNativeReanimated.useSharedValue)(1);
    const keyboardListeners = (0, _react.useMemo)(() => ({
      show: function turboselfTsx1Factory([_worklet_7272860908012_init_data, opacity, withTiming, ANIMATION_DURATION, scale]) {
        const turboselfTsx1 = function () {
          "use no memo";

          opacity.value = withTiming(0, {
            duration: ANIMATION_DURATION
          });
          scale.value = withTiming(0.8, {
            duration: ANIMATION_DURATION
          });
        };
        turboselfTsx1.__closure = [opacity, withTiming, ANIMATION_DURATION, scale];
        turboselfTsx1.__workletHash = 7272860908012;
        turboselfTsx1.__initData = _worklet_7272860908012_init_data;
        return turboselfTsx1;
      }([_worklet_7272860908012_init_data, opacity, _reactNativeReanimated.withTiming, ANIMATION_DURATION, scale]),
      hide: function turboselfTsx2Factory([_worklet_3822593479929_init_data, opacity, withTiming, ANIMATION_DURATION, scale]) {
        const turboselfTsx2 = function () {
          "use no memo";

          opacity.value = withTiming(1, {
            duration: ANIMATION_DURATION
          });
          scale.value = withTiming(1, {
            duration: ANIMATION_DURATION
          });
        };
        turboselfTsx2.__closure = [opacity, withTiming, ANIMATION_DURATION, scale];
        turboselfTsx2.__workletHash = 3822593479929;
        turboselfTsx2.__initData = _worklet_3822593479929_init_data;
        return turboselfTsx2;
      }([_worklet_3822593479929_init_data, opacity, _reactNativeReanimated.withTiming, ANIMATION_DURATION, scale])
    }), [opacity]);
    (0, _react.useEffect)(() => {
      const showSub = Keyboard.default.addListener("keyboardWillShow", keyboardListeners.show);
      const hideSub = Keyboard.default.addListener("keyboardWillHide", keyboardListeners.hide);
      return () => {
        showSub.remove();
        hideSub.remove();
      };
    }, [keyboardListeners]);
    const loginTurboself = async (submittedUsername, submittedPassword) => {
      try {
        setIsLoggingIn(true);
        const authentification = await (0, _turboselfApi.authenticateWithCredentials)(submittedUsername, submittedPassword, true, false);
        const siblings = await authentification.getSiblings();
        if (siblings.length === 0) {
          const accountId = (0, uuid.default)();
          const store = _storesAccount.useAccountStore.getState();
          const service = {
            id: accountId,
            auth: {
              additionals: {
                username: submittedUsername,
                password: submittedPassword,
                "hoteId": authentification.host?.id ?? "N/A"
              }
            },
            serviceId: _storesAccountTypes.Services.TURBOSELF,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          };
          if (action === "addService") {
            store.addServiceToAccount(store.lastUsedAccount, service);
            await (0, _servicesShared.initializeAccountManager)();
            _expoRouter.router.back();
            _expoRouter.router.back();
            return _expoRouter.router.back();
          }
          store.addAccount({
            id: accountId,
            firstName: authentification.host?.firstName ?? "N/A",
            lastName: authentification.host?.lastName ?? "N/A",
            schoolName: authentification.establishment?.name,
            className: authentification.host?.division,
            services: [service],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          });
          store.setLastUsedAccount(accountId);
          setIsLoggingIn(false);
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
          return;
        }
        setIsLoggingIn(false);
        const global = [authentification.host, ...siblings].flat();
        return _expoRouter.router.push({
          pathname: "/(onboarding)/restaurants/turboselfHost",
          params: {
            siblings: JSON.stringify(global),
            username: submittedUsername,
            password: submittedPassword,
            action
          }
        });
      } catch (error) {
        setIsLoggingIn(false);
        Alert.default.alert(t("Alert_Auth_Error"), t("ONBOARDING_ALERT_BAD_CREDENTIALS_TURBOSELF"));
      }
    };
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
          color: "#cf0000",
          serviceName: "TurboSelf",
          serviceIcon: require(_dependencyMap[18]),
          loading: isLoggingIn,
          onSubmit: values => {
            if (!isLoggingIn && values.username && values.password) {
              loginTurboself(values.username, values.password);
            }
          }
        })
      })
    });
  }
},890,[1000,1023,6,1105,190,307,326,222,1107,360,1261,1118,1022,1109,1125,1249,876,97,1262]);