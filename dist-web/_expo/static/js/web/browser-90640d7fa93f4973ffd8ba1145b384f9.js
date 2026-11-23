__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = {};
    if (e) Object.keys(e).forEach(function (k) {
      if (k === 'default') return;
      var d = Object.getOwnPropertyDescriptor(e, k);
      Object.defineProperty(n, k, d.get ? d : {
        enumerable: true,
        get: function () {
          return e[k];
        }
      });
    });
    n.default = e;
    return n;
  }
  function _interopDefault(e) {
    return e && e.__esModule ? e : {
      default: e
    };
  }
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return PronoteENTLogin;
    }
  });
  var _expoRouterReactNavigation = require(_dependencyMap[0]);
  var _expoRouter = require(_dependencyMap[1]);
  var _expoDevice = require(_dependencyMap[2]);
  var Device = _interopNamespace(_expoDevice);
  var _blockshubPawnoteLts = require(_dependencyMap[3]);
  var _react = require(_dependencyMap[4]);
  var React = _interopDefault(_react);
  var _reactI18next = require(_dependencyMap[5]);
  var _reactNativeWebDistExportsAlert = require(_dependencyMap[6]);
  var Alert = _interopDefault(_reactNativeWebDistExportsAlert);
  var _reactNativeWebDistExportsKeyboardAvoidingView = require(_dependencyMap[7]);
  var KeyboardAvoidingView = _interopDefault(_reactNativeWebDistExportsKeyboardAvoidingView);
  var _reactNativeWebDistExportsModal = require(_dependencyMap[8]);
  var Modal = _interopDefault(_reactNativeWebDistExportsModal);
  var _reactNativeReanimated = require(_dependencyMap[9]);
  var Reanimated = _interopDefault(_reactNativeReanimated);
  var _utilsFormatFormatSchoolName = require(_dependencyMap[10]);
  var _storesAccount = require(_dependencyMap[11]);
  var _storesAccountTypes = require(_dependencyMap[12]);
  var _uiComponentsActivityIndicator = require(_dependencyMap[13]);
  var ActivityIndicator = _interopDefault(_uiComponentsActivityIndicator);
  var _uiComponentsStack = require(_dependencyMap[14]);
  var Stack = _interopDefault(_uiComponentsStack);
  var _uiNewDivider = require(_dependencyMap[15]);
  var Divider = _interopDefault(_uiNewDivider);
  var _uiNewTypography = require(_dependencyMap[16]);
  var Typography = _interopDefault(_uiNewTypography);
  var _utilsAttachmentsHelper = require(_dependencyMap[17]);
  var _utilsPronoteFetcher = require(_dependencyMap[18]);
  var _utilsPronoteName = require(_dependencyMap[19]);
  var _utilsUuidUuid = require(_dependencyMap[20]);
  var uuid = _interopDefault(_utilsUuidUuid);
  var _componentsOnboardingWebView = require(_dependencyMap[21]);
  var OnboardingWebView = _interopDefault(_componentsOnboardingWebView);
  var _componentsOnboardingPronote2FAModal = require(_dependencyMap[22]);
  var _uiNewButton = require(_dependencyMap[23]);
  var Button = _interopDefault(_uiNewButton);
  var _uiComponentsSafeHorizontalView = require(_dependencyMap[24]);
  var SafeHorizontalView = _interopDefault(_uiComponentsSafeHorizontalView);
  var _reactJsxRuntime = require(_dependencyMap[25]);
  function PronoteENTLogin() {
    const {
      colors
    } = (0, _expoRouterReactNavigation.useTheme)();
    const {
      t
    } = (0, _reactI18next.useTranslation)();
    const navigation = (0, _expoRouter.useNavigation)();
    const {
      params
    } = (0, _expoRouterReactNavigation.useRoute)();
    const {
      url,
      school,
      relinkAccountId,
      relinkServiceId,
      relinkDeviceUUID
    } = params ?? {};
    const baseURL = url.split("/pronote")[0];

    // UI Logic
    const [browserVisible, setBrowserVisible] = React.default.useState(false);
    const [hasLoadingBeenTooLong, setHasLoadingBeenTooLong] = (0, _react.useState)(false);
    const [loadingHidden, setLoadingHidden] = (0, _react.useState)(false);
    (0, _react.useEffect)(() => {
      navigation.setOptions({
        headerShown: false
      });
    }, []);
    (0, _react.useEffect)(() => {
      if (browserVisible) {
        setHasLoadingBeenTooLong(false);
        return;
      }
      const timeout = setTimeout(() => {
        setHasLoadingBeenTooLong(true);
      }, 15000);
      return () => clearTimeout(timeout);
    }, [browserVisible]);
    const webViewRef = /*#__PURE__*/(0, _react.createRef)();

    // Login logic
    const infoMobileURL = url + "/InfoMobileApp.json?id=0D264427-EEFC-4810-A9E9-346942A862A4";
    const [deviceUUID] = (0, _react.useState)(() => relinkDeviceUUID || (0, uuid.default)());
    const [received, setReceived] = (0, _react.useState)(false);
    const deviceName = Device.deviceName ?? "Pronote";
    console.log("WebViewScreen initialized with URL:", url);
    const [challengeModalVisible, setChallengeModalVisible] = (0, _react.useState)(false);
    const [doubleAuthError, setDoubleAuthError] = (0, _react.useState)(null);
    const [doubleAuthSession, setDoubleAuthSession] = (0, _react.useState)(null);
    const [deviceId, setDeviceId] = (0, _react.useState)("");
    const [hasShownConnectionErrorAlert, setHasShownConnectionErrorAlert] = (0, _react.useState)(false);
    const PRONOTE_COOKIE_EXPIRED = new Date(0).toUTCString();
    const PRONOTE_COOKIE_VALIDATION_EXPIRES = new Date(new Date().getTime() + 300000).toUTCString();
    const PRONOTE_COOKIE_LANGUAGE_EXPIRES = new Date(new Date().getTime() + 31536000000).toUTCString();
    const INJECT_PRONOTE_HOOK_DEFINITION = `
    window.hookAccesDepuisAppli = function() {
      this.passerEnModeValidationAppliMobile('', '${deviceUUID}');
    };
    true;
    `.trim();
    const INJECT_PRONOTE_INITIAL_LOGIN_HOOK = `
    window.hookAccesDepuisAppli = function() {
      this.passerEnModeValidationAppliMobile('', '${deviceUUID}');
    };
    try {
          window.GInterface.passerEnModeValidationAppliMobile('', '${deviceUUID}', '', '', '{"model": "random", "platform": "android"}');
    } catch (e) {
    }
    `.trim();
    const INJECT_PRONOTE_JSON = `
      (function () {
        try {
          const json = JSON.parse(document.body.innerText);
          const lJetonCas = !!json && !!json.CAS && json.CAS.jetonCAS;
          
          if (!!lJetonCas) {
            document.cookie = "appliMobile=; expires=${PRONOTE_COOKIE_EXPIRED}";
            document.cookie = "validationAppliMobile=" + lJetonCas + "; expires=${PRONOTE_COOKIE_VALIDATION_EXPIRES}";
            document.cookie = "uuidAppliMobile=${deviceUUID}; expires=${PRONOTE_COOKIE_VALIDATION_EXPIRES}";
            // 1036 = French
            document.cookie = "ielang=1036; expires=${PRONOTE_COOKIE_LANGUAGE_EXPIRES}";
          } else {
            document.cookie = "appliMobile=1; expires=${PRONOTE_COOKIE_VALIDATION_EXPIRES}";
            document.cookie = "ielang=1036; expires=${PRONOTE_COOKIE_LANGUAGE_EXPIRES}";
          }

          window.location.assign("${url}/mobile.eleve.html?fd=1");
        }
        catch (error) {

        }
      })();
    `.trim();
    const INJECT_PRONOTE_CURRENT_LOGIN_STATE = `
    (function () {
      setInterval(function() {
        const state = window && window.loginState ? window.loginState : void 0;

        if (!state) {
          window.ReactNativeWebView.postMessage(JSON.stringify({
            type: 'debug.state',
            data: {
              url: window.location.href,
              cookie: document.cookie,
              hasGInterface: typeof window.GInterface,
              candidates: Object.keys(window).filter(function (k) {
                return /login|GInterface|Etat|Mobile|Appli/i.test(k);
              }).slice(0, 40)
            }
          }));
        }

        window.ReactNativeWebView.postMessage(JSON.stringify({
          type: 'pronote.loginState',
          data: state
        }));
      }, 1000);
    })();
    `.trim();
    const INJECT_PRONOTE_CONNECTION_ERROR_WATCHER = `
    (function () {
      if (window.__pronoteConnImpossibleWatcherInstalled) return;
      window.__pronoteConnImpossibleWatcherInstalled = true;

      function hasConnectionError() {
        const nodes = document.querySelectorAll('div');
        for (let i = 0; i < nodes.length; i += 1) {
          const node = nodes[i];
          const raw = node && node.textContent ? node.textContent : "";
          const text = raw
            .normalize("NFD")
            .replace(/[\\u0300-\\u036f]/g, "")
            .toLowerCase()
            .trim();

          if (!text) continue;
          if (text.includes("connexion impossible") || text.includes("erreur")) {
            return true;
          }
        }

        return false;
      }

      function notifyIfNeeded() {
        if (window.__pronoteConnImpossibleSent) return;
        if (!hasConnectionError()) return;
        window.__pronoteConnImpossibleSent = true;
        window.ReactNativeWebView.postMessage(JSON.stringify({
          type: 'pronote.connectionError'
        }));
      }

      notifyIfNeeded();
      setInterval(notifyIfNeeded, 1000);

      const observer = new MutationObserver(notifyIfNeeded);
      observer.observe(document.documentElement || document.body, { childList: true, subtree: true, characterData: true });
    })();
    `.trim();
    const onWebviewMessage = async ({
      nativeEvent
    }) => {
      let message;
      try {
        message = JSON.parse(nativeEvent.data);
      } catch {
        return;
      }
      console.log("Message received from WebView:", message);
      if (message.type === "pronote.connectionError") {
        setBrowserVisible(true);
        if (!hasShownConnectionErrorAlert) {
          setHasShownConnectionErrorAlert(true);
          Alert.default.alert("Connexion impossible", "La connexion à Pronote est impossible. Cele vient probablement de votre établissement ou d'une erreur de configuration.");
        }
        return;
      }
      if (received) {
        return;
      }
      if (message.type === "pronote.loginState") {
        console.log("Login state message received:", message.data);
        if (!message.data) {
          console.warn("No login data in message");
          return;
        }
        if (message.data.status !== 0) {
          console.warn("Login status is not valid:", message.data.status);
          return;
        }
        setReceived(true);
        console.log("Creating session handle...");
        const session = (0, _blockshubPawnoteLts.createSessionHandle)(_utilsPronoteFetcher.customFetcher);
        let refresh;
        try {
          refresh = await (0, _blockshubPawnoteLts.loginToken)(session, {
            url: url,
            kind: _blockshubPawnoteLts.AccountKind.STUDENT,
            username: message.data.login,
            token: message.data.mdp,
            deviceUUID
          });
        } catch (error) {
          if (error instanceof _blockshubPawnoteLts.SecurityError && !error.handle.shouldCustomPassword && !error.handle.shouldCustomDoubleAuth) {
            if (error.handle.shouldEnterSource && !error.handle.shouldEnterPIN) {
              const mode = _blockshubPawnoteLts.DoubleAuthMode.MGDA_NotificationSeulement;
              const source = deviceName.length > 30 ? "Pronote" : deviceName;
              await (0, _blockshubPawnoteLts.securitySource)(session, source);
              await (0, _blockshubPawnoteLts.securitySave)(session, error.handle, {
                mode,
                deviceName: source
              });
              const context = error.handle.context;
              refresh = await (0, _blockshubPawnoteLts.finishLoginManually)(session, context.authentication, context.identity, context.initialUsername);
            } else {
              setDoubleAuthError(error);
              setDoubleAuthSession(session);
              setDeviceId(deviceUUID);
              setChallengeModalVisible(true);
              return;
            }
          } else {
            console.error("Error during login:", error);
            setReceived(false);
            Alert.default.alert("Erreur", "Une erreur est survenue lors de la connexion à Pronote. Veuillez réessayer.");
            return;
          }
        }
        if (!refresh) {
          console.error("No refresh information after login");
          setReceived(false);
          Alert.default.alert("Erreur", "Une erreur est survenue lors de la connexion à Pronote. Veuillez réessayer.");
          return;
        }
        try {
          console.log("Login successful, adding account to store...");
          const schoolName = session.user.resources[0].establishmentName;
          const className = session.user.resources[0].className;
          const {
            firstName,
            lastName
          } = (0, _utilsPronoteName.GetIdentityFromPronoteUsername)(session.user.name);
          let pp = "";
          if (session.user.resources[0].profilePicture?.url) {
            pp = await (0, _utilsAttachmentsHelper.URLToBase64)(session.user.resources[0].profilePicture?.url);
          }
          const auth = {
            accessToken: refresh.token,
            refreshToken: refresh.token,
            additionals: {
              ...refresh,
              instanceURL: refresh.url,
              deviceUUID
            }
          };
          const store = _storesAccount.useAccountStore.getState();
          if (relinkServiceId && relinkAccountId) {
            store.updateServiceAuthData(relinkServiceId, auth);
            store.setLastUsedAccount(relinkAccountId);
          } else {
            store.addAccount({
              id: deviceUUID,
              firstName,
              lastName,
              schoolName,
              className,
              customisation: {
                profilePicture: pp,
                subjects: {}
              },
              services: [{
                id: deviceUUID,
                auth,
                serviceId: _storesAccountTypes.Services.PRONOTE,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
              }],
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString()
            });
            store.setLastUsedAccount(deviceUUID);
          }
          return _expoRouter.router.dismissTo("/");
        } catch (error) {
          console.error("Error while creating account:", error);
          setReceived(false);
          Alert.default.alert("Erreur", "Une erreur est survenue lors de la création du compte. Veuillez réessayer.");
          return;
        }
      }
    };
    const onWebviewLoadEnd = e => {
      const {
        url
      } = e.nativeEvent;
      console.log("WebView finished loading URL:", url);
      if (url === infoMobileURL) {
        setBrowserVisible(false);
      } else {
        setBrowserVisible(true);
      }
      webViewRef.current?.injectJavaScript(INJECT_PRONOTE_INITIAL_LOGIN_HOOK);
      if (url.startsWith(baseURL)) {
        webViewRef.current?.injectJavaScript(INJECT_PRONOTE_CONNECTION_ERROR_WATCHER);
      }
      if (url === infoMobileURL) {
        console.log("Injecting JSON script for InfoMobileURL");
        webViewRef.current?.injectJavaScript(INJECT_PRONOTE_JSON);
      } else if (url.includes("mobile.eleve.html")) {
        console.log("Injecting login state scripts for student account");
        webViewRef.current?.injectJavaScript(INJECT_PRONOTE_INITIAL_LOGIN_HOOK);
        webViewRef.current?.injectJavaScript(INJECT_PRONOTE_CURRENT_LOGIN_STATE);
      }
    };
    return /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(KeyboardAvoidingView.default, {
      style: {
        flex: 1
      },
      behavior: "padding",
      keyboardVerticalOffset: 20,
      children: [!browserVisible && !loadingHidden && /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Reanimated.default.View, {
        style: {
          height: "100%",
          width: "100%",
          position: "absolute",
          backgroundColor: colors.card,
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000
        },
        entering: _reactNativeReanimated.FadeIn.duration(130),
        exiting: _reactNativeReanimated.FadeOut.duration(130),
        children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(SafeHorizontalView.default, {
          base: 20,
          style: {
            width: "100%"
          },
          children: /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(Stack.default, {
            vAlign: "center",
            hAlign: "center",
            width: "100%",
            gap: 3,
            padding: [0, 20],
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(ActivityIndicator.default, {}), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Divider.default, {
              height: 12,
              ghost: true
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(Typography.default, {
              align: "center",
              variant: "h4",
              children: [t("ONBOARDING_LOGIN_TO"), " ", school && school.name ? (0, _utilsFormatFormatSchoolName.formatSchoolName)(school.name) : t("ONBOARDING_YOUR_SCHOOL")]
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              align: "center",
              variant: "body",
              color: "textSecondary",
              children: t("ONBOARDING_SCHOOLS_SEARCHING_HINT")
            }), hasLoadingBeenTooLong && /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Button.default, {
              label: "Masquer",
              variant: "text",
              onPress: () => setLoadingHidden(true)
            })]
          })
        })
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(OnboardingWebView.default, {
        source: {
          uri: infoMobileURL
        },
        webViewRef: webViewRef,
        incognito: true,
        userAgent: "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Mobile Safari/537.36",
        onMessage: onWebviewMessage,
        onLoadEnd: onWebviewLoadEnd,
        injectedJavaScriptBeforeContentLoaded: INJECT_PRONOTE_HOOK_DEFINITION,
        startInLoadingState: true,
        onOpenWindow: evt => {
          webViewRef.current?.stopLoading();
          webViewRef.current?.injectJavaScript(`window.location.assign("${evt.nativeEvent.targetUrl}");`); // Yes, this is tricky, but it's in official documentation
        },
        injectedJavaScript: `
        var meta = document.createElement('meta');
        meta.setAttribute('name', 'viewport');
        meta.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
        document.getElementsByTagName('head')[0].appendChild(meta);
        `
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Modal.default, {
        visible: challengeModalVisible,
        animationType: "slide",
        presentationStyle: "pageSheet",
        onRequestClose: () => setChallengeModalVisible(false),
        children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_componentsOnboardingPronote2FAModal.Pronote2FAModal, {
          doubleAuthSession: doubleAuthSession,
          doubleAuthError: doubleAuthError,
          setChallengeModalVisible: setChallengeModalVisible,
          deviceId: deviceId,
          relinkAccountId: relinkAccountId,
          relinkServiceId: relinkServiceId
        })
      })]
    });
  }
},902,[1000,1023,1314,1315,6,1105,190,326,327,1107,1316,1022,1109,1129,1005,1241,1008,1317,1318,1319,1249,878,1320,1006,1111,97]);