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
      return WebViewScreen;
    }
  });
  var _expoLinking = require(_dependencyMap[0]);
  var Linking = _interopNamespace(_expoLinking);
  var _expoRouter = require(_dependencyMap[1]);
  var _react = require(_dependencyMap[2]);
  var _reactI18next = require(_dependencyMap[3]);
  var _reactNativeWebDistExportsAlert = require(_dependencyMap[4]);
  var Alert = _interopDefault(_reactNativeWebDistExportsAlert);
  var _reactNativeWebDistExportsKeyboardAvoidingView = require(_dependencyMap[5]);
  var KeyboardAvoidingView = _interopDefault(_reactNativeWebDistExportsKeyboardAvoidingView);
  var _skolengojs = require(_dependencyMap[6]);
  var _storesAccount = require(_dependencyMap[7]);
  var _storesAccountTypes = require(_dependencyMap[8]);
  var _utilsLoggerLogger = require(_dependencyMap[9]);
  var _utilsUuidUuid = require(_dependencyMap[10]);
  var uuid = _interopDefault(_utilsUuidUuid);
  var _componentsOnboardingWebView = require(_dependencyMap[11]);
  var OnboardingWebView = _interopDefault(_componentsOnboardingWebView);
  var _reactJsxRuntime = require(_dependencyMap[12]);
  function WebViewScreen() {
    const [loginURL, setLoginURL] = (0, _react.useState)(undefined);
    const {
      ref
    } = (0, _expoRouter.useLocalSearchParams)();
    const parsedRef = typeof ref === "string" ? JSON.parse(ref) : {};
    const school = new _skolengojs.School(parsedRef.id, parsedRef.name, parsedRef.emsCode, parsedRef.OIDCWellKnown, parsedRef.location, parsedRef.homepage);
    const flowRef = (0, _react.useRef)(null);
    const consumedCodeRef = (0, _react.useRef)(null);
    const {
      t
    } = (0, _reactI18next.useTranslation)();
    const initLogin = (0, _react.useCallback)(async () => {
      const flow = await school.initializeLogin(_skolengojs.ChallengeMethod.S256);
      flowRef.current = flow;
      setLoginURL(flow.loginURL);
    }, []);
    (0, _react.useEffect)(() => {
      initLogin();
    }, [initLogin]);
    const handleRequest = (0, _react.useCallback)(async url => {
      if (!url.startsWith("skoapp-prod://")) {
        return true;
      }
      const code = url.match(/code=([^&]*)/)?.[1];
      const state = url.match(/state=([^&]*)/)?.[1];
      if (!code || !state || !flowRef.current) {
        return false;
      }
      if (consumedCodeRef.current === code) {
        return false;
      }
      consumedCodeRef.current = code;
      try {
        const auth = await flowRef.current.finalizeLogin(code, state);
        const store = _storesAccount.useAccountStore.getState();
        const id = (0, uuid.default)();
        const account = {
          id,
          firstName: auth?.firstName ?? "",
          lastName: auth?.lastName ?? "",
          schoolName: auth?.school.name,
          className: auth?.className,
          services: [{
            id: id,
            auth: {
              accessToken: auth.refreshToken,
              refreshToken: auth.refreshToken,
              additionals: {
                refreshUrl: auth.refreshURL,
                wellKnown: flowRef.current.endpoints.wellKnown,
                tokenEndpoint: flowRef.current.endpoints.tokenEndpoint,
                emsCode: flowRef.current.school.emsCode
              }
            },
            serviceId: _storesAccountTypes.Services.SKOLENGO,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        store.addAccount(account);
        store.setLastUsedAccount(id);
        _expoRouter.router.dismissTo("/");
      } catch (err) {
        consumedCodeRef.current = null;
        (0, _utilsLoggerLogger.error)("[Skolengo] Failed to finalize login: " + String(err));
        Alert.default.alert(t("Alert_Auth_Error"), t("ONBOARDING_ALERT_LOGIN_ABORTED"));
      }
      return false;
    }, [t]);
    (0, _react.useEffect)(() => {
      const handleDeepLink = ({
        url
      }) => {
        if (url.split(":")[0] === "skoapp-prod") {
          (0, _utilsLoggerLogger.log)("[Skolengo] Activation link received:", url);
          handleRequest(url);
        }
      };
      const listener = Linking.addEventListener("url", handleDeepLink);
      return () => listener.remove();
    }, [handleRequest]);
    return /*#__PURE__*/(0, _reactJsxRuntime.jsx)(KeyboardAvoidingView.default, {
      style: {
        flex: 1
      },
      behavior: "padding",
      keyboardVerticalOffset: 20,
      children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(OnboardingWebView.default, {
        source: loginURL ? {
          uri: loginURL
        } : {
          html: `<h1>${t("ONBOARDING_LOADING")}</h1>`
        },
        onShouldStartLoadWithRequest: request => {
          if (request.url.startsWith("skoapp-prod://")) {
            handleRequest(request.url);
            return false;
          }
          return true;
        }
      })
    });
  }
},910,[371,1023,6,1105,190,326,1213,1022,1109,1116,1249,878,97]);