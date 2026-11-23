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
      return AppschoWebView;
    }
  });
  var _componentsOnboardingOnboardingWebview = require(_dependencyMap[0]);
  var OnboardingWebview = _interopDefault(_componentsOnboardingOnboardingWebview);
  var _expoRouter = require(_dependencyMap[1]);
  var _blockshubBlockscho = require(_dependencyMap[2]);
  var _reactI18next = require(_dependencyMap[3]);
  var _uiComponentsAlertProvider = require(_dependencyMap[4]);
  var _storesAccount = require(_dependencyMap[5]);
  var _storesAccountTypes = require(_dependencyMap[6]);
  var _utilsUuidUuid = require(_dependencyMap[7]);
  var uuid = _interopDefault(_utilsUuidUuid);
  var _react = require(_dependencyMap[8]);
  var _reactJsxRuntime = require(_dependencyMap[9]);
  function AppschoWebView() {
    const {
      instanceId
    } = (0, _expoRouter.useLocalSearchParams)();
    const {
      t
    } = (0, _reactI18next.useTranslation)();
    const alert = (0, _uiComponentsAlertProvider.useAlert)();
    const [isProcessing, setIsProcessing] = (0, _react.useState)(false);
    const instance = _blockshubBlockscho.INSTANCES.find(inst => inst.id === instanceId);
    const loginURL = (0, _blockshubBlockscho.getCASURL)(instance?.id);
    const handleRequest = async url => {
      const urlObj = new URL(url);
      const code = urlObj.searchParams.get('code');
      if (code && !isProcessing && instance) {
        setIsProcessing(true);
        try {
          const response = await (0, _blockshubBlockscho.loginWithOAuth)(instance.id, code);
          const id = (0, uuid.default)();
          const service = {
            id,
            auth: {
              additionals: {
                instanceId: instance.id,
                code: code,
                refreshToken: response.refreshToken || ""
              }
            },
            serviceId: _storesAccountTypes.Services.APPSCHO,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          };
          const store = _storesAccount.useAccountStore.getState();
          store.addAccount({
            id,
            firstName: response.firstname || t("ONBOARDING_DEFAULT_USER_FIRSTNAME"),
            lastName: response.lastname || instance.name,
            schoolName: response.program || instance.name,
            className: response.department ?? undefined,
            services: [service],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          });
          store.setLastUsedAccount(id);
          _expoRouter.router.dismissAll();
          return _expoRouter.router.push("/");
        } catch (error) {
          Error(`OAuth login error: ${error}`);
          alert.showAlert({
            title: t("Alert_Auth_Error"),
            description: t("ONBOARDING_ALERT_OAUTH_LOGIN_ABORTED"),
            icon: "AlertTriangle",
            color: "#D60046",
            technical: String(error),
            withoutNavbar: true
          });
          setIsProcessing(false);
        }
      }
    };
    return /*#__PURE__*/(0, _reactJsxRuntime.jsx)(OnboardingWebview.default, {
      title: t("ONBOARDING_WEBVIEW_TITLE"),
      color: "#1E3035",
      step: 2,
      totalSteps: 3,
      webviewProps: {
        source: loginURL ? {
          uri: loginURL
        } : {
          html: `<h1>${t("ONBOARDING_LOADING")}</h1>`
        },
        onShouldStartLoadWithRequest: request => {
          handleRequest(request.url);
          return true;
        }
      }
    });
  }
},896,[1311,1023,1265,1105,1125,1022,1109,1249,6,97]);
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
  var _expoRouterReactNavigation = require(_dependencyMap[0]);
  var _i18next = require(_dependencyMap[1]);
  var _react = require(_dependencyMap[2]);
  var React = _interopDefault(_react);
  var _reactNativeWebDistExportsActivityIndicator = require(_dependencyMap[3]);
  var ActivityIndicator = _interopDefault(_reactNativeWebDistExportsActivityIndicator);
  var _reactNativeWebDistExportsKeyboard = require(_dependencyMap[4]);
  var Keyboard = _interopDefault(_reactNativeWebDistExportsKeyboard);
  var _reactNativeWebDistExportsKeyboardAvoidingView = require(_dependencyMap[5]);
  var KeyboardAvoidingView = _interopDefault(_reactNativeWebDistExportsKeyboardAvoidingView);
  var _reactNativeWebDistExportsView = require(_dependencyMap[6]);
  var View = _interopDefault(_reactNativeWebDistExportsView);
  var _reactNativeReanimated = require(_dependencyMap[7]);
  var Animated = _interopDefault(_reactNativeReanimated);
  var _reactNativeSafeAreaContext = require(_dependencyMap[8]);
  var _reactNativeWebview = require(_dependencyMap[9]);
  var _componentsOnboardingOnboardingBackButton = require(_dependencyMap[10]);
  var OnboardingBackButton = _interopDefault(_componentsOnboardingOnboardingBackButton);
  var _uiComponentsStack = require(_dependencyMap[11]);
  var Stack = _interopDefault(_uiComponentsStack);
  var _uiComponentsTypography = require(_dependencyMap[12]);
  var Typography = _interopDefault(_uiComponentsTypography);
  var _uiComponentsViewContainer = require(_dependencyMap[13]);
  var ViewContainer = _interopDefault(_uiComponentsViewContainer);
  var _uiComponentsSafeHorizontalView = require(_dependencyMap[14]);
  var SafeHorizontalView = _interopDefault(_uiComponentsSafeHorizontalView);
  var _reactJsxRuntime = require(_dependencyMap[15]);
  const OnboardingWebview = ({
    title,
    color,
    step,
    totalSteps,
    webviewProps,
    webViewRef
  }) => {
    const insets = (0, _reactNativeSafeAreaContext.useSafeAreaInsets)();
    const {
      colors
    } = (0, _expoRouterReactNavigation.useTheme)();
    const [totallyLoaded, setTotallyLoaded] = React.default.useState(false);
    const titleOpacity = (0, _reactNativeReanimated.useSharedValue)(1);
    const headerHeight = (0, _reactNativeReanimated.useSharedValue)(150 + insets.top);
    (0, _react.useEffect)(() => {
      const showSubscription = Keyboard.default.addListener("keyboardDidShow", onKeyboardShow);
      const hideSubscription = Keyboard.default.addListener("keyboardDidHide", onKeyboardHide);
      return () => {
        showSubscription.remove();
        hideSubscription.remove();
      };
    }, []);
    const onKeyboardShow = () => {
      titleOpacity.value = (0, _reactNativeReanimated.withTiming)(0, {
        duration: 100
      });
      headerHeight.value = (0, _reactNativeReanimated.withTiming)(60 + insets.top, {
        stiffness: 500,
        damping: 50
      });
    };
    const onKeyboardHide = () => {
      titleOpacity.value = (0, _reactNativeReanimated.withSpring)(1, {
        stiffness: 200,
        damping: 20
      });
      headerHeight.value = (0, _reactNativeReanimated.withSpring)(150 + insets.top, {
        stiffness: 500,
        damping: 50
      });
    };
    return /*#__PURE__*/(0, _reactJsxRuntime.jsx)(ViewContainer.default, {
      children: /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(KeyboardAvoidingView.default, {
        style: {
          flex: 1
        },
        behavior: "height",
        keyboardVerticalOffset: -insets.top + 20,
        children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNativeSafeAreaContext.SafeAreaView, {
          mode: "margin",
          edges: {
            left: "additive"
          },
          style: {
            position: "absolute",
            left: 0,
            marginLeft: 75,
            top: insets.top + 7,
            zIndex: 2
          },
          children: /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(Stack.default, {
            direction: "horizontal",
            height: 40,
            hAlign: "center",
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "h5",
              style: {
                color: "white",
                lineHeight: 22,
                fontSize: 18
              },
              children: "Étape " + step
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "h5",
              style: {
                color: "#FFFFFF90",
                lineHeight: 22,
                fontSize: 18
              },
              children: "sur " + totalSteps
            })]
          })
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Animated.default.View, {
          style: {
            paddingVertical: 32,
            backgroundColor: color,
            gap: 20,
            alignItems: "center",
            justifyContent: "flex-end",
            borderBottomLeftRadius: 42,
            borderBottomRightRadius: 42,
            paddingBottom: 25,
            borderCurve: "continuous",
            height: headerHeight,
            paddingTop: insets.top
          },
          children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(SafeHorizontalView.default, {
            base: 32,
            style: {
              alignSelf: "stretch",
              alignItems: "center"
            },
            children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Animated.default.View, {
              style: {
                opacity: titleOpacity
              },
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
                variant: "h3",
                style: {
                  color: "#FFFFFF",
                  lineHeight: 28,
                  fontSize: 28
                },
                children: title
              })
            })
          })
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(SafeHorizontalView.default, {
          base: 20,
          style: {
            flex: 1,
            paddingTop: 20,
            paddingBottom: insets.bottom + 20
          },
          children: /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(View.default, {
            style: {
              width: "100%",
              height: "100%",
              borderWidth: 2,
              borderColor: colors.border,
              backgroundColor: colors.text + "10",
              borderRadius: 20,
              overflow: 'hidden'
            },
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsxs)(View.default, {
              style: {
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                alignItems: 'center',
                justifyContent: 'center',
                padding: 20,
                opacity: totallyLoaded ? 0 : 1
              },
              children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(ActivityIndicator.default, {
                size: "large"
              }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
                variant: "h3",
                align: "center",
                color: colors.text + "90",
                style: {
                  marginTop: 10
                },
                children: (0, _i18next.t)("Webview_Wait")
              }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
                variant: "caption",
                align: "center",
                color: colors.text + "50",
                children: (0, _i18next.t)("Onboarding_Load_Webview_Description")
              })]
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNativeWebview.WebView, {
              ref: webViewRef,
              ...webviewProps,
              style: {
                flex: 1,
                opacity: totallyLoaded ? 1 : 0
              },
              onLoadEnd: e => {
                webviewProps.onLoadEnd?.(e);
                if (e.nativeEvent.url.includes("pronote")) {
                  if (e.nativeEvent.url !== webviewProps.source?.uri) {
                    setTotallyLoaded(true);
                  }
                } else if (e.nativeEvent.url.includes("https://")) {
                  setTotallyLoaded(true);
                }
              }
            })]
          })
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(OnboardingBackButton.default, {})]
      })
    });
  };
  var _default = OnboardingWebview;
},1311,[1000,1140,6,317,307,326,198,1107,360,1312,1108,1005,1110,1264,1111,97]);