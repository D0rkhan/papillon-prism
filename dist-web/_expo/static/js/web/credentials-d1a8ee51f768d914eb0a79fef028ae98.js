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
      return AppSchoCredentials;
    }
  });
  var _expoRouter = require(_dependencyMap[0]);
  var _lottieReactNative = require(_dependencyMap[1]);
  var LottieView = _interopDefault(_lottieReactNative);
  var _react = require(_dependencyMap[2]);
  var _reactNativeWebDistExportsActivityIndicator = require(_dependencyMap[3]);
  var ActivityIndicator = _interopDefault(_reactNativeWebDistExportsActivityIndicator);
  var _reactNativeWebDistExportsKeyboard = require(_dependencyMap[4]);
  var Keyboard = _interopDefault(_reactNativeWebDistExportsKeyboard);
  var _reactNativeWebDistExportsKeyboardAvoidingView = require(_dependencyMap[5]);
  var KeyboardAvoidingView = _interopDefault(_reactNativeWebDistExportsKeyboardAvoidingView);
  var _reactNativeWebDistExportsView = require(_dependencyMap[6]);
  var View = _interopDefault(_reactNativeWebDistExportsView);
  var _reactNativeReanimated = require(_dependencyMap[7]);
  var Reanimated = _interopDefault(_reactNativeReanimated);
  var _uiComponentsButton = require(_dependencyMap[8]);
  var Button = _interopDefault(_uiComponentsButton);
  var _uiComponentsStack = require(_dependencyMap[9]);
  var Stack = _interopDefault(_uiComponentsStack);
  var _uiComponentsTypography = require(_dependencyMap[10]);
  var Typography = _interopDefault(_uiComponentsTypography);
  var _componentsOnboardingOnboardingBackButton = require(_dependencyMap[11]);
  var OnboardingBackButton = _interopDefault(_componentsOnboardingOnboardingBackButton);
  var _uiComponentsAlertProvider = require(_dependencyMap[12]);
  var _storesAccount = require(_dependencyMap[13]);
  var _storesAccountTypes = require(_dependencyMap[14]);
  var _utilsUuidUuid = require(_dependencyMap[15]);
  var uuid = _interopDefault(_utilsUuidUuid);
  var _reactI18next = require(_dependencyMap[16]);
  var _componentsOnboardingOnboardingInput = require(_dependencyMap[17]);
  var OnboardingInput = _interopDefault(_componentsOnboardingOnboardingInput);
  var _uiComponentsSafeHorizontalView = require(_dependencyMap[18]);
  var SafeHorizontalView = _interopDefault(_uiComponentsSafeHorizontalView);
  var _reactNativeSafeAreaContext = require(_dependencyMap[19]);
  var _expoRouterReactNavigation = require(_dependencyMap[20]);
  var _blockshubBlockscho = require(_dependencyMap[21]);
  var _reactJsxRuntime = require(_dependencyMap[22]);
  const ANIMATION_DURATION = 100;
  const _worklet_11666159047958_init_data = {
    code: "(function credentialsTsx1(){const[opacity,withTiming,ANIMATION_DURATION,scale]=this.__closure;opacity.value=withTiming(0,{duration:ANIMATION_DURATION});scale.value=withTiming(0.8,{duration:ANIMATION_DURATION});})"
  };
  const _worklet_13590809988163_init_data = {
    code: "(function credentialsTsx2(){const[opacity,withTiming,ANIMATION_DURATION,scale]=this.__closure;opacity.value=withTiming(1,{duration:ANIMATION_DURATION});scale.value=withTiming(1,{duration:ANIMATION_DURATION});})"
  };
  function AppSchoCredentials() {
    const insets = (0, _reactNativeSafeAreaContext.useSafeAreaInsets)();
    const theme = (0, _expoRouterReactNavigation.useTheme)();
    const {
      instanceId
    } = (0, _expoRouter.useLocalSearchParams)();
    const [username, setUsername] = (0, _react.useState)("");
    const [password, setPassword] = (0, _react.useState)("");
    const [isLoading, setIsLoading] = (0, _react.useState)(false);
    const instance = _blockshubBlockscho.INSTANCES.find(inst => inst.id === instanceId);
    const opacity = (0, _reactNativeReanimated.useSharedValue)(1);
    const scale = (0, _reactNativeReanimated.useSharedValue)(1);
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
    const {
      t
    } = (0, _reactI18next.useTranslation)();
    const alert = (0, _uiComponentsAlertProvider.useAlert)();
    async function handleLogin(username, password) {
      if (!instance) {
        alert.showAlert({
          title: t("ONBOARDING_ERROR"),
          description: t("ONBOARDING_APPSCHO_INSTANCE_NOT_FOUND"),
          icon: "AlertTriangle",
          color: "#D60046",
          withoutNavbar: true
        });
        return;
      }
      if (!username.trim() || !password.trim()) {
        alert.showAlert({
          title: t("ONBOARDING_REQUIRED_FIELDS"),
          description: t("ONBOARDING_FILL_ALL_FIELDS"),
          icon: "AlertTriangle",
          color: "#D60046",
          withoutNavbar: true
        });
        return;
      }
      setIsLoading(true);
      try {
        const response = await (0, _blockshubBlockscho.loginWithCredentials)(instance.id, username, password);
        const id = (0, uuid.default)();
        const service = {
          id,
          auth: {
            additionals: {
              instanceId: instance.id,
              username: username,
              password: password
            }
          },
          serviceId: _storesAccountTypes.Services.APPSCHO,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        const store = _storesAccount.useAccountStore.getState();
        store.addAccount({
          id,
          firstName: response.firstname,
          lastName: response.lastname,
          schoolName: instance.name,
          className: response.program ?? undefined,
          services: [service],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        });
        store.setLastUsedAccount(id);
        _expoRouter.router.dismissAll();
        return _expoRouter.router.push("/");
      } catch (error) {
        alert.showAlert({
          title: t("Alert_Auth_Error"),
          description: t("ONBOARDING_ALERT_LOGIN_ABORTED"),
          icon: "AlertTriangle",
          color: "#D60046",
          technical: String(error),
          withoutNavbar: true
        });
      } finally {
        setIsLoading(false);
      }
    }
    return /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(KeyboardAvoidingView.default, {
      style: {
        flex: 1,
        marginBottom: insets.bottom
      },
      behavior: "padding",
      children: [/*#__PURE__*/(0, _reactJsxRuntime.jsxs)(SafeHorizontalView.default, {
        base: 20,
        style: {
          alignItems: "center",
          justifyContent: "flex-end",
          borderBottomLeftRadius: 42,
          borderBottomRightRadius: 42,
          paddingTop: insets.top + 20,
          paddingBottom: 34,
          borderCurve: "continuous",
          flex: 1,
          backgroundColor: "#1E3035"
        },
        children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Reanimated.default.View, {
          style: {
            flex: 1,
            marginBottom: 16,
            alignItems: "center",
            justifyContent: "center",
            opacity: opacity,
            transform: [{
              scale: scale
            }]
          },
          children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(LottieView.default, {
            source: require(_dependencyMap[23]),
            autoPlay: true,
            loop: false,
            style: {
              aspectRatio: 1,
              height: "100%",
              maxHeight: 250
            }
          })
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(Stack.default, {
          vAlign: "start",
          hAlign: "start",
          width: "100%",
          gap: 12,
          children: [/*#__PURE__*/(0, _reactJsxRuntime.jsxs)(Stack.default, {
            direction: "horizontal",
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsxs)(Typography.default, {
              variant: "h5",
              style: {
                color: "#FFF",
                lineHeight: 22,
                fontSize: 18
              },
              children: [t("STEP"), " 2"]
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(Typography.default, {
              variant: "h5",
              style: {
                color: "#FFFFFF90",
                lineHeight: 22,
                fontSize: 18
              },
              children: [t("STEP_OUTOF"), " 3"]
            })]
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(Typography.default, {
            variant: "h1",
            style: {
              color: "#FFF",
              fontSize: 32,
              lineHeight: 34
            },
            children: [t("ONBOARDING_LOGIN_CREDENTIALS"), " ", instance?.name || "AppScho"]
          })]
        })]
      }), isLoading ? /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(View.default, {
        style: {
          alignItems: "center",
          gap: 10,
          padding: 20,
          height: 200,
          justifyContent: "center"
        },
        children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(ActivityIndicator.default, {}), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(View.default, {
          children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
            variant: "h4",
            color: "text",
            align: "center",
            children: t("WAITING")
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
            variant: "body2",
            color: "secondary",
            align: "center",
            children: t("ONBOARDING_LOADING_LOGIN")
          })]
        })]
      }) : /*#__PURE__*/(0, _reactJsxRuntime.jsx)(SafeHorizontalView.default, {
        base: 20,
        children: /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(Stack.default, {
          padding: [0, 20],
          gap: 10,
          children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(OnboardingInput.default, {
            icon: "User",
            placeholder: t("INPUT_USERNAME"),
            text: username,
            setText: setUsername,
            isPassword: false,
            inputProps: {
              autoCapitalize: "none",
              autoCorrect: false,
              spellCheck: false,
              textContentType: "username"
            }
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(OnboardingInput.default, {
            icon: "Lock",
            placeholder: t("INPUT_PASSWORD"),
            text: password,
            setText: setPassword,
            isPassword: true,
            inputProps: {
              autoCapitalize: "none",
              autoCorrect: false,
              spellCheck: false,
              textContentType: "password",
              onSubmitEditing: () => {
                Keyboard.default.dismiss();
                handleLogin(username, password);
              },
              returnKeyType: "done"
            }
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Button.default, {
            title: t("LOGIN_BTN"),
            style: {
              backgroundColor: theme.dark ? theme.colors.border : "black"
            },
            size: "large",
            disableAnimation: true,
            onPress: () => handleLogin(username, password)
          })]
        })
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(OnboardingBackButton.default, {})]
    });
  }
},894,[1023,1251,6,317,307,326,198,1107,1024,1005,1110,1108,1125,1022,1109,1249,1105,1228,1111,360,1000,1265,97,1266]);