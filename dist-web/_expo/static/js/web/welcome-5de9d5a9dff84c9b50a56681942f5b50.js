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
      return Welcome;
    }
  });
  var _expoRouterReactNavigation = require(_dependencyMap[0]);
  var _expoRouter = require(_dependencyMap[1]);
  var _expoWebBrowser = require(_dependencyMap[2]);
  var WebBrowser = _interopNamespace(_expoWebBrowser);
  var _react = require(_dependencyMap[3]);
  var React = _interopDefault(_react);
  var _reactNativeWebDistExportsImage = require(_dependencyMap[4]);
  var Image = _interopDefault(_reactNativeWebDistExportsImage);
  var _reactNativeWebDistExportsStatusBar = require(_dependencyMap[5]);
  var StatusBar = _interopDefault(_reactNativeWebDistExportsStatusBar);
  var _reactNativeWebDistExportsView = require(_dependencyMap[6]);
  var View = _interopDefault(_reactNativeWebDistExportsView);
  var _reactNativeSafeAreaContext = require(_dependencyMap[7]);
  var _reactNativeReanimated = require(_dependencyMap[8]);
  var Reanimated = _interopDefault(_reactNativeReanimated);
  var _uiComponentsStack = require(_dependencyMap[9]);
  var Stack = _interopDefault(_uiComponentsStack);
  var _uiNewButton = require(_dependencyMap[10]);
  var Button = _interopDefault(_uiNewButton);
  var _uiNewDivider = require(_dependencyMap[11]);
  var Divider = _interopDefault(_uiNewDivider);
  var _uiNewSymbolsPapillonLogo = require(_dependencyMap[12]);
  var PapillonLogo = _interopDefault(_uiNewSymbolsPapillonLogo);
  var _uiNewTypography = require(_dependencyMap[13]);
  var Typography = _interopDefault(_uiNewTypography);
  var _uiComponentsSafeHorizontalView = require(_dependencyMap[14]);
  var SafeHorizontalView = _interopDefault(_uiComponentsSafeHorizontalView);
  var _expoVideo = require(_dependencyMap[15]);
  var _expoLinearGradient = require(_dependencyMap[16]);
  var _expoSplashScreen = require(_dependencyMap[17]);
  var SplashScreen = _interopNamespace(_expoSplashScreen);
  var _reactI18next = require(_dependencyMap[18]);
  var _storesGlobalEncryption = require(_dependencyMap[19]);
  var _reactJsxRuntime = require(_dependencyMap[20]);
  function Welcome() {
    const insets = (0, _reactNativeSafeAreaContext.useSafeAreaInsets)();
    const {
      colors
    } = (0, _expoRouterReactNavigation.useTheme)();
    const router = (0, _expoRouter.useRouter)();
    const navigation = (0, _expoRouter.useNavigation)();
    const {
      t
    } = (0, _reactI18next.useTranslation)();

    // Without an account, the splash stays up until the redirect from home ends.
    React.default.useLayoutEffect(() => {
      const onboardingNavigation = navigation.getParent();
      return onboardingNavigation?.addListener("transitionEnd", event => {
        if (!event.data.closing) SplashScreen.hideAsync();
      });
    }, [navigation]);
    const openHelpWebPage = () => {
      WebBrowser.openBrowserAsync("https://docs.papillon.bzh/support", {
        presentationStyle: WebBrowser.WebBrowserPresentationStyle.PAGE_SHEET
      });
    };
    const openLegalWebPage = () => {
      WebBrowser.openBrowserAsync("https://docs.papillon.bzh/terms", {
        presentationStyle: WebBrowser.WebBrowserPresentationStyle.PAGE_SHEET
      });
    };
    const openDevMenu = () => {
      router.push("/devmode");
    };
    React.default.useEffect(() => {
      if (!(0, _storesGlobalEncryption.consumeSecurityLogoutNotice)()) {
        return;
      }
      router.navigate({
        pathname: "/alert",
        params: {
          data: JSON.stringify({
            title: t("SecurityLogout_Title"),
            description: t("SecurityLogout_Description"),
            icon: "Lock",
            color: "#0E7CCB",
            customButton: {
              label: t("SecurityLogout_Button")
            }
          })
        }
      });
    }, []);
    const player = (0, _expoVideo.useVideoPlayer)({
      assetId: require(_dependencyMap[21])
    }, player => {
      player.loop = true;
      player.muted = true;
      player.volume = 0;
      player.showNowPlayingNotification = false;
      player.playbackRate = 0.5;
      player.audioMixingMode = "mixWithOthers";
      player.play();
    });
    const isFocused = (0, _expoRouterReactNavigation.useIsFocused)();
    (0, _expoRouterReactNavigation.useFocusEffect)(React.default.useCallback(() => {
      if (isFocused) {
        player.play();
      }
    }, [isFocused]));
    return /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(View.default, {
      style: {
        flex: 1,
        backgroundColor: "black",
        display: "flex",
        alignItems: "center"
      },
      children: [isFocused && /*#__PURE__*/(0, _reactJsxRuntime.jsx)(StatusBar.default, {
        barStyle: "light-content",
        animated: true
      }), isFocused && /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Reanimated.default.View, {
        entering: _reactNativeReanimated.FadeIn.duration(600),
        exiting: _reactNativeReanimated.FadeOut.duration(600),
        style: {
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0
        },
        children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoVideo.VideoView, {
          player: player,
          style: {
            width: "100%",
            height: "100%"
          },
          contentFit: "cover",
          nativeControls: false
        })
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoLinearGradient.LinearGradient, {
        colors: ["rgba(0, 0, 0, 1)", "rgba(0, 0, 0, 0.0)", "rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 1)"],
        locations: [0, 0.2, 0.3, 0.7],
        style: {
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1,
          opacity: 0.8
        }
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(View.default, {
        style: {
          maxWidth: 600
        },
        children: /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(SafeHorizontalView.default, {
          base: 16,
          style: {
            flex: 1,
            justifyContent: "flex-end",
            alignItems: "center",
            paddingTop: 16,
            gap: 10,
            paddingBottom: insets.bottom + 16,
            zIndex: 99,
            maxWidth: 600
          },
          children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(PapillonLogo.default, {
            fill: "#FFFFFF"
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
            color: "#FFFFFF",
            variant: "title",
            align: "center",
            weight: "medium",
            style: {
              marginHorizontal: 10,
              opacity: 0.8
            },
            children: t("ONBOARDING_WELCOME_DESCRIPTION")
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Divider.default, {
            height: 2,
            ghost: true
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Button.default, {
            label: t("ONBOARDING_WELCOME_LOGIN_WITH"),
            gap: 4,
            trailing: /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(Stack.default, {
              direction: "horizontal",
              gap: 0,
              children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Image.default, {
                source: require(_dependencyMap[22]),
                style: {
                  width: 32,
                  height: 32,
                  borderRadius: 32,
                  borderWidth: 3,
                  borderColor: colors.primary,
                  zIndex: 3
                }
              }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Image.default, {
                source: require(_dependencyMap[23]),
                style: {
                  width: 32,
                  height: 32,
                  borderRadius: 32,
                  borderWidth: 3,
                  borderColor: colors.primary,
                  marginLeft: -16,
                  zIndex: 2
                }
              }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Image.default, {
                source: require(_dependencyMap[24]),
                style: {
                  width: 32,
                  height: 32,
                  borderRadius: 32,
                  borderWidth: 3,
                  borderColor: colors.primary,
                  marginLeft: -16,
                  zIndex: 1
                }
              })]
            }),
            onPress: () => {
              router.push("./ageSelection");
            },
            fullWidth: true
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Button.default, {
            label: t("ONBOARDING_HELP_BTN"),
            onPress: () => {
              openHelpWebPage();
            },
            fullWidth: true,
            variant: "secondary",
            color: "#FFFFFF"
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Divider.default, {
            height: 2,
            ghost: true
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
            color: "#FFFFFF88",
            variant: "caption",
            align: "center",
            style: {
              marginHorizontal: 20,
              opacity: 0.7
            },
            onPress: () => {
              openLegalWebPage();
            },
            onLongPress: () => {
              openDevMenu();
            },
            children: t("ONBOARDING_WELCOME_LEGAL")
          })]
        })
      })]
    });
  }
},913,[1000,1023,1355,6,267,341,198,360,1107,1005,1006,1241,1346,1008,1111,1347,1113,1356,1105,1357,97,1354,1343,1358,1359]);
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
  require(_dependencyMap[0]);
  var _reactNativeSvg = require(_dependencyMap[1]);
  var Svg = _interopDefault(_reactNativeSvg);
  var _reactJsxRuntime = require(_dependencyMap[2]);
  const PapillonLogo = props => /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(Svg.default, {
    xmlns: "http://www.w3.org/2000/svg",
    width: 148,
    height: 32,
    fill: "#29947A",
    viewBox: "0 0 148 32",
    ...props,
    children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNativeSvg.Path, {
      fillRule: "evenodd",
      d: "M6.313 7.452c.16.696.38 1.419.66 2.153-.715.072-1.394.183-2.025.334-1.163.276-2.241.702-3.098 1.319-.864.622-1.59 1.511-1.795 2.688s.18 2.265.782 3.15c.598.878 1.468 1.654 2.467 2.317q.28.186.58.365c1.952 1.172 4.528 2.103 7.365 2.611 3.201.574 6.246.267 8.56-.413q.19-.055.375-.115c-.34 1.457-.571 2.848-.68 4.08-.106 1.202-.104 2.344.073 3.28.134.707.469 1.82 1.431 2.381q.192.12.42.204c1.16.43 2.226-.12 2.887-.615.719-.537 1.412-1.33 2.053-2.237 1.297-1.831 2.606-4.441 3.664-7.398s1.706-5.81 1.871-8.06c.082-1.114.053-2.174-.158-3.056-.17-.711-.552-1.66-1.427-2.17a2.5 2.5 0 0 0-.439-.213c-1.039-.385-2.032-.033-2.749.416-.732.459-1.421 1.161-2.054 1.98a18 18 0 0 0-1.32 1.998 21.5 21.5 0 0 0-3.487-5.912c-1.784-2.162-3.78-3.913-5.69-5.05a14 14 0 0 0-.818-.457C12.696.484 11.601.106 10.554.019 9.5-.07 8.38.137 7.48.906l.031.037c-.887.765-1.297 1.87-1.44 2.945-.145 1.093-.042 2.318.243 3.564m6.065-3.525q.293.15.597.332c1.522.915 3.235 2.392 4.827 4.32a18.7 18.7 0 0 1 2.348 3.615c-1.87-1.016-4.22-1.82-6.785-2.28-1.008-.18-2.003-.3-2.967-.36a14 14 0 0 1-1.004-2.83c-.225-.986-.27-1.804-.19-2.406.083-.615.269-.851.353-.923.08-.068.285-.187.784-.145.509.042 1.199.246 2.037.677m-.624 15.27c-2.53-.454-4.712-1.265-6.265-2.19a11 11 0 0 1-.41-.259c-.787-.522-1.306-1.027-1.596-1.454-.285-.418-.287-.658-.268-.763s.1-.33.509-.624c.416-.3 1.074-.594 1.988-.811.81-.193 1.759-.31 2.808-.338.52.861 1.119 1.711 1.793 2.527 1.596 1.935 3.485 3.29 5.36 4.13-1.225.079-2.554.026-3.919-.218m1.106-6.09c2.53.453 4.712 1.264 6.266 2.189q.212.128.41.259c.786.522 1.305 1.027 1.595 1.454q.058.085.1.16a4 4 0 0 1-.46.072c-.65.063-1.472-.004-2.392-.254-1.838-.5-3.934-1.698-5.643-3.768l-.128-.156q.126.02.252.044m14.75-.643c.417-.542.777-.897 1.054-1.109.074.426.101 1.05.04 1.875-.137 1.881-.7 4.44-1.688 7.2-.989 2.76-2.176 5.089-3.26 6.62-.409.577-.773.999-1.074 1.282-.058-.508-.06-1.206.017-2.078.177-2.01.749-4.629 1.659-7.259q.072-.155.125-.325c.08-.173.135-.347.175-.508.944-2.527 2.002-4.466 2.952-5.698",
      clipRule: "evenodd"
    }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNativeSvg.Path, {
      d: "M35.405 25.853V3.536h8.643q2.583 0 4.465.788 1.914.757 2.935 2.46 1.052 1.67 1.052 4.412 0 2.616-1.148 4.382-1.148 1.733-3.158 2.616-1.977.85-4.529.85h-3.987v6.81zm4.273-10.59h3.924q2.105 0 3.38-1.01 1.276-1.008 1.276-3.088 0-1.86-1.084-2.774-1.053-.945-3.317-.946h-4.179zM58.72 26.043a8.1 8.1 0 0 1-2.87-.505q-1.308-.536-2.105-1.607-.797-1.104-.797-2.774 0-1.23.446-2.08a4.4 4.4 0 0 1 1.244-1.45 6.5 6.5 0 0 1 1.818-.946 14 14 0 0 1 2.105-.536 25 25 0 0 1 2.488-.347q1.371-.126 2.934-.284 0-.945-.383-1.607a2.46 2.46 0 0 0-1.084-1.04q-.702-.38-1.722-.379-1.084 0-1.882.379-.798.346-1.212 1.197h-4.242q.318-1.89 1.403-2.994 1.116-1.102 2.711-1.576a10.8 10.8 0 0 1 3.285-.504q2.584 0 4.147.914t2.264 2.679q.702 1.734.702 4.255v9.015h-3.134l-.789-2.017a5.6 5.6 0 0 1-1.69 1.387 6.4 6.4 0 0 1-1.882.63 8.8 8.8 0 0 1-1.755.19m.862-3.342q1.211 0 2.169-.441.989-.442 1.562-1.26.607-.852.67-2.018v-.63q-.702.062-1.403.157-.702.063-1.435.158-.702.063-1.404.189-1.18.157-1.914.662-.733.504-.733 1.387 0 .693.383 1.103.415.377.988.536.574.157 1.117.157M69.992 32V9.242h3.326l.789 2.143q1.02-1.26 2.36-1.828 1.34-.6 2.966-.599 2.488 0 4.115 1.135 1.626 1.134 2.424 3.089.83 1.923.829 4.318 0 2.46-.861 4.413-.83 1.923-2.52 3.058-1.658 1.103-4.178 1.103a8.3 8.3 0 0 1-2.105-.252 7 7 0 0 1-1.722-.694 6.1 6.1 0 0 1-1.244-1.04V32zm8.548-9.645q1.563 0 2.456-.694a3.8 3.8 0 0 0 1.276-1.765 7 7 0 0 0 .383-2.301q0-1.26-.415-2.364a3.7 3.7 0 0 0-1.308-1.828q-.924-.694-2.456-.694-1.403 0-2.392.694a4.3 4.3 0 0 0-1.467 1.765 6 6 0 0 0-.478 2.395q0 1.292.478 2.396a4.1 4.1 0 0 0 1.435 1.734q.99.661 2.488.662M88.602 25.853V9.242h4.178v16.611zm2.105-18.408q-1.18 0-1.914-.693-.702-.726-.702-1.829 0-1.134.734-1.86.765-.724 1.914-.724 1.051 0 1.818.725.797.693.797 1.828 0 1.134-.765 1.86-.735.693-1.882.693M100.406 26.043q-1.85 0-3.094-.63-1.212-.663-1.818-1.955-.574-1.292-.574-3.215V3.536h4.178v15.887q0 .85.16 1.482.19.63.638.977.477.346 1.339.346a3.9 3.9 0 0 0 1.212-.189 4 4 0 0 0 1.053-.599l.977 3.184c-.341.645-.999.925-1.743 1.135a9.2 9.2 0 0 1-2.328.284M110.398 26.043q-1.85 0-3.094-.63-1.212-.663-1.818-1.955-.574-1.292-.574-3.215V3.536h4.178v15.887q0 .85.16 1.482.19.63.638.977.478.346 1.339.346a3.9 3.9 0 0 0 1.212-.189 4 4 0 0 0 1.053-.599l1.371 3.184q-1.02.82-2.137 1.135a9.2 9.2 0 0 1-2.328.284M122.623 26.074q-2.584 0-4.466-1.04a7.4 7.4 0 0 1-2.934-2.932q-1.02-1.922-1.021-4.539 0-2.647 1.053-4.57a7.34 7.34 0 0 1 2.934-2.963q1.882-1.072 4.402-1.072 2.551 0 4.401 1.072a7.3 7.3 0 0 1 2.903 3.026q1.02 1.923 1.02 4.57 0 2.585-1.02 4.508a7.04 7.04 0 0 1-2.839 2.931q-1.85 1.01-4.433 1.009m-.064-3.783q1.53 0 2.456-.662a3.68 3.68 0 0 0 1.371-1.733 6.3 6.3 0 0 0 .415-2.301q0-1.23-.415-2.333a3.9 3.9 0 0 0-1.339-1.796q-.925-.694-2.488-.694-1.5 0-2.456.694a4.14 4.14 0 0 0-1.372 1.796 6.4 6.4 0 0 0-.414 2.333q0 1.23.414 2.332a3.96 3.96 0 0 0 1.372 1.734q.957.63 2.456.63M132.308 25.853V9.242h3.357l.789 2.017a4.76 4.76 0 0 1 1.563-1.355 7.4 7.4 0 0 1 1.882-.725 8 8 0 0 1 1.786-.221q2.392 0 3.763 1.04 1.372 1.04 1.946 2.806.606 1.733.606 3.877v9.172h-4.178V17.28q0-.852-.128-1.64a4.7 4.7 0 0 0-.478-1.481 2.6 2.6 0 0 0-.989-1.04q-.638-.41-1.69-.41-1.34 0-2.265.694-.893.661-1.34 1.796-.446 1.135-.446 2.553v8.101z"
    })]
  });
  var _default = PapillonLogo;
},1346,[6,1112,97]);
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
  Object.defineProperty(exports, "isPictureInPictureSupported", {
    enumerable: true,
    get: function () {
      return _VideoModule.isPictureInPictureSupported;
    }
  });
  Object.defineProperty(exports, "clearVideoCacheAsync", {
    enumerable: true,
    get: function () {
      return _VideoModule.clearVideoCacheAsync;
    }
  });
  Object.defineProperty(exports, "setVideoCacheSizeAsync", {
    enumerable: true,
    get: function () {
      return _VideoModule.setVideoCacheSizeAsync;
    }
  });
  Object.defineProperty(exports, "getCurrentVideoCacheSize", {
    enumerable: true,
    get: function () {
      return _VideoModule.getCurrentVideoCacheSize;
    }
  });
  Object.defineProperty(exports, "VideoView", {
    enumerable: true,
    get: function () {
      return _VideoView.VideoView;
    }
  });
  Object.defineProperty(exports, "useVideoPlayer", {
    enumerable: true,
    get: function () {
      return _VideoPlayer.useVideoPlayer;
    }
  });
  Object.defineProperty(exports, "createVideoPlayer", {
    enumerable: true,
    get: function () {
      return _VideoPlayer.createVideoPlayer;
    }
  });
  Object.defineProperty(exports, "VideoAirPlayButton", {
    enumerable: true,
    get: function () {
      return _VideoAirPlayButton2.default;
    }
  });
  var _VideoModule = require(_dependencyMap[0]);
  var _VideoView = require(_dependencyMap[1]);
  var _VideoPlayer = require(_dependencyMap[2]);
  var _VideoAirPlayButton = require(_dependencyMap[3]);
  var _VideoAirPlayButton2 = _interopDefault(_VideoAirPlayButton);
},1347,[1348,1350,1351,1353]);
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
  exports.isPictureInPictureSupported = isPictureInPictureSupported;
  exports.clearVideoCacheAsync = clearVideoCacheAsync;
  exports.setVideoCacheSizeAsync = setVideoCacheSizeAsync;
  exports.getCurrentVideoCacheSize = getCurrentVideoCacheSize;
  var _ExpoVideo = require(_dependencyMap[0]);
  var NativeVideoModule = _interopDefault(_ExpoVideo);
  /**
   * Returns whether the current device supports Picture in Picture (PiP) mode.
   *
   * @returns A `boolean` which is `true` if the device supports PiP mode, and `false` otherwise.
   * @platform android
   * @platform ios
   */
  function isPictureInPictureSupported() {
    return NativeVideoModule.default.isPictureInPictureSupported();
  }
  /**
   * Clears all video cache.
   * > This function can be called only if there are no existing `VideoPlayer` instances.
   *
   * @returns A promise that fulfills after the cache has been cleaned.
   * @platform android
   * @platform ios
   */
  function clearVideoCacheAsync() {
    return NativeVideoModule.default.clearVideoCacheAsync();
  }
  /**
   * Sets desired video cache size in bytes. The default video cache size is 1GB. Value set by this function is persistent.
   * The cache size is not guaranteed to be exact and the actual cache size may be slightly larger. The cache is evicted on a least-recently-used basis.
   * > This function can be called only if there are no existing `VideoPlayer` instances.
   *
   * @returns A promise that fulfills after the cache size has been set.
   * @platform android
   * @platform ios
   */
  function setVideoCacheSizeAsync(sizeBytes) {
    return NativeVideoModule.default.setVideoCacheSizeAsync(sizeBytes);
  }
  /**
   * Returns the space currently occupied by the video cache in bytes.
   *
   * @platform android
   * @platform ios
   */
  function getCurrentVideoCacheSize() {
    return NativeVideoModule.default.getCurrentVideoCacheSize();
  }
},1348,[1349]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return _default;
    }
  });
  var _default = {
    // Fixes webpack issues with NativeVideoModule.VideoThumbnail not existing on web.
    VideoThumbnail: () => {}
  };
},1349,[]);
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
  exports.isPictureInPictureSupported = isPictureInPictureSupported;
  Object.defineProperty(exports, "VideoView", {
    enumerable: true,
    get: function () {
      return VideoView;
    }
  });
  var _reactJsxRuntime = require(_dependencyMap[0]);
  var _react = require(_dependencyMap[1]);
  var _reactNativeWebDistExportsStyleSheet = require(_dependencyMap[2]);
  var StyleSheet = _interopDefault(_reactNativeWebDistExportsStyleSheet);
  var _VideoPlayerWeb = require(_dependencyMap[3]);
  function createAudioContext() {
    return typeof window !== 'undefined' ? new window.AudioContext() : null;
  }
  function createZeroGainNode(audioContext) {
    const zeroGainNode = audioContext?.createGain() ?? null;
    if (audioContext && zeroGainNode) {
      zeroGainNode.gain.value = 0;
      zeroGainNode.connect(audioContext.destination);
    }
    return zeroGainNode;
  }
  function mapStyles(style) {
    const flattenedStyles = StyleSheet.default.flatten(style);
    // Looking through react-native-web source code they also just pass styles directly without further conversions, so it's just a cast.
    return flattenedStyles;
  }
  function isPictureInPictureSupported() {
    return typeof document === 'object' && typeof document.exitPictureInPicture === 'function';
  }
  const VideoView = /*#__PURE__*/(0, _react.forwardRef)((props, ref) => {
    const videoRef = (0, _react.useRef)(null);
    const mediaNodeRef = (0, _react.useRef)(null);
    const hasToSetupAudioContext = (0, _react.useRef)(false);
    const fullscreenChangeListeners = (0, _react.useRef)(null);
    const isWaitingForFirstFrame = (0, _react.useRef)(false);
    const mountedPlayerRef = (0, _react.useRef)(null);
    /**
    * Audio context is used to mute all but one video when multiple video views are playing from one player simultaneously.
    * Using audio context nodes allows muting videos without displaying the mute icon in the video player.
    * We have to keep the context that called createMediaElementSource(videoRef), as the method can't be called
    * for the second time with another context and there is no way to unbind the video and audio context afterward.
    */
    const audioContextRef = (0, _react.useRef)(null);
    const zeroGainNodeRef = (0, _react.useRef)(null);
    (0, _react.useEffect)(() => {
      if (props.useAudioNodePlayback) {
        maybeSetupAudioContext();
        attachAudioNodes();
      } else {
        detachAudioNodes();
      }
    }, [props.useAudioNodePlayback]);
    (0, _react.useImperativeHandle)(ref, () => ({
      enterFullscreen: async () => {
        // Cast the video to any to avoid ts errors. Methods such as webkitRequestFullscreen,
        // webkitEnterFullScreen, msRequestFullscreen are not typed even though they exist.
        const video = videoRef.current;
        if (video.requestFullscreen) {
          await video.requestFullscreen();
        } else if (video.webkitRequestFullscreen) {
          // @ts-ignore webkitRequestFullscreen can exist on Apple devices
          await video.webkitRequestFullscreen();
        } else if (video.webkitEnterFullScreen) {
          await video.webkitEnterFullScreen();
        } else if (video.msRequestFullscreen) {
          await video.msRequestFullscreen();
        }
      },
      exitFullscreen: async () => {
        await document.exitFullscreen();
      },
      startPictureInPicture: async () => {
        await videoRef.current?.requestPictureInPicture();
      },
      stopPictureInPicture: async () => {
        try {
          await document.exitPictureInPicture();
        } catch (e) {
          if (e instanceof DOMException && e.name === 'InvalidStateError') {
            console.warn('The VideoView is not in Picture-in-Picture mode.');
          } else {
            throw e;
          }
        }
      },
      nativeRef: videoRef
    }));
    (0, _react.useEffect)(() => {
      const onEnter = () => {
        props.onPictureInPictureStart?.();
      };
      const onLeave = () => {
        props.onPictureInPictureStop?.();
      };
      const onLoadStart = () => {
        isWaitingForFirstFrame.current = true;
      };
      const onCanPlay = () => {
        if (isWaitingForFirstFrame.current) {
          props.onFirstFrameRender?.();
        }
        isWaitingForFirstFrame.current = false;
      };
      videoRef.current?.addEventListener('enterpictureinpicture', onEnter);
      videoRef.current?.addEventListener('leavepictureinpicture', onLeave);
      videoRef.current?.addEventListener('loadstart', onLoadStart);
      videoRef.current?.addEventListener('loadeddata', onCanPlay);
      return () => {
        videoRef.current?.removeEventListener('enterpictureinpicture', onEnter);
        videoRef.current?.removeEventListener('leavepictureinpicture', onLeave);
        videoRef.current?.removeEventListener('loadstart', onLoadStart);
        videoRef.current?.removeEventListener('loadeddata', onCanPlay);
      };
    }, [videoRef, props.onPictureInPictureStop, props.onPictureInPictureStart]);
    // Adds the video view as a candidate for being the audio source for the player (when multiple views play from one
    // player only one will emit audio).
    function attachAudioNodes() {
      if (!props.useAudioNodePlayback) {
        return;
      }
      const audioContext = audioContextRef.current;
      const zeroGainNode = zeroGainNodeRef.current;
      const mediaNode = mediaNodeRef.current;
      if (audioContext && zeroGainNode && mediaNode) {
        props.player?.mountAudioNode(audioContext, zeroGainNode, mediaNode);
      } else {
        console.warn("Couldn't mount audio node, this might affect the audio playback when using multiple video views with the same player.");
      }
    }
    function detachAudioNodes() {
      if (!props.useAudioNodePlayback) {
        return;
      }
      const audioContext = audioContextRef.current;
      const mediaNode = mediaNodeRef.current;
      if (audioContext && mediaNode && videoRef.current) {
        props.player?.unmountAudioNode(videoRef.current, audioContext, mediaNode);
      }
    }
    function maybeSetupAudioContext() {
      // Not all browsers support the UserActivation API, so check it exists before we access it.
      // If the API doesn't exist then we'll continue as if the user has been active.
      const userHasNotBeenActive = 'userActivation' in navigator && !navigator.userActivation.hasBeenActive;
      if (!hasToSetupAudioContext.current || userHasNotBeenActive || !videoRef.current || !props.useAudioNodePlayback) {
        return;
      }
      const audioContext = createAudioContext();
      detachAudioNodes();
      audioContextRef.current = audioContext;
      zeroGainNodeRef.current = createZeroGainNode(audioContextRef.current);
      mediaNodeRef.current = audioContext ? audioContext.createMediaElementSource(videoRef.current) : null;
      attachAudioNodes();
      hasToSetupAudioContext.current = false;
    }
    function fullscreenListener() {
      if (document.fullscreenElement === videoRef.current) {
        props.onFullscreenEnter?.();
      } else {
        props.onFullscreenExit?.();
      }
    }
    function setupFullscreenListener() {
      cleanupFullscreenListener();
      const video = videoRef.current;
      if (!video) return;
      const fullscreenListeners = {
        default: fullscreenListener,
        safariEnter: () => props.onFullscreenEnter?.(),
        safariExit: () => props.onFullscreenExit?.(),
        msListener: fullscreenListener
      };
      fullscreenChangeListeners.current = fullscreenListeners;
      // Standard Fullscreen API
      video.addEventListener('fullscreenchange', fullscreenListeners.default);
      // Safari (webkit)
      video.addEventListener('webkitbeginfullscreen', fullscreenListeners.safariEnter);
      video.addEventListener('webkitendfullscreen', fullscreenListeners.safariExit);
      // IE11 (ms)
      document.addEventListener('MSFullscreenChange', fullscreenListeners.msListener);
    }
    function cleanupFullscreenListener() {
      const video = videoRef.current;
      if (!video || !fullscreenChangeListeners.current) return;
      video.removeEventListener('fullscreenchange', fullscreenChangeListeners.current.default);
      video.removeEventListener('webkitbeginfullscreen', fullscreenChangeListeners.current?.safariEnter);
      video.removeEventListener('webkitendfullscreen', fullscreenChangeListeners.current.safariExit);
      document.removeEventListener('MSFullscreenChange', fullscreenChangeListeners.current.msListener);
    }
    (0, _react.useEffect)(() => {
      videoRef.current && mountedPlayerRef.current?.unmountVideoView(videoRef.current);
      if (videoRef.current) {
        props.player?.mountVideoView(videoRef.current);
      }
      setupFullscreenListener();
      attachAudioNodes();
      mountedPlayerRef.current = props.player ?? null;
      if (props.player == null) {
        videoRef.current?.removeAttribute('src');
        videoRef.current?.load();
      }
      return () => {
        if (videoRef.current) {
          props.player?.unmountVideoView(videoRef.current);
        }
        mountedPlayerRef.current = null;
        cleanupFullscreenListener();
        detachAudioNodes();
      };
    }, [props.player]);
    return /*#__PURE__*/(0, _reactJsxRuntime.jsx)("video", {
      controls: props.nativeControls ?? true,
      controlsList: props.fullscreenOptions?.enable ? undefined : 'nofullscreen',
      crossOrigin: props.crossOrigin,
      style: {
        ...mapStyles(props.style),
        objectFit: props.contentFit
      },
      onPlay: () => {
        maybeSetupAudioContext();
      },
      // The player can autoplay when muted, unmuting by a user should create the audio context
      onVolumeChange: () => {
        maybeSetupAudioContext();
      },
      ref: newRef => {
        // This is called with a null value before `player.unmountVideoView` is called,
        // we can't assign null to videoRef if we want to unmount it from the player.
        if (newRef && !newRef.isEqualNode(videoRef.current)) {
          videoRef.current = newRef;
          hasToSetupAudioContext.current = props.useAudioNodePlayback ?? false;
          maybeSetupAudioContext();
        }
      },
      disablePictureInPicture: !props.allowsPictureInPicture,
      playsInline: props.playsInline,
      src: (0, _VideoPlayerWeb.getSourceUri)(props.player?.src) ?? undefined
    });
  });
  var _default = VideoView;
},1350,[97,6,117,1351]);
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
      return VideoPlayerWeb;
    }
  });
  exports.useVideoPlayer = useVideoPlayer;
  exports.getSourceUri = getSourceUri;
  exports.createVideoPlayer = createVideoPlayer;
  var _expoModulesCore = require(_dependencyMap[0]);
  var _react = require(_dependencyMap[1]);
  var _resolveAssetSource = require(_dependencyMap[2]);
  var resolveAssetSource = _interopDefault(_resolveAssetSource);
  function useVideoPlayer(source, setup, _playerBuilderOptions) {
    const parsedSource = typeof source === 'string' ? {
      uri: source
    } : source;
    const [forceRecreateCount, setForceRecreateCount] = (0, _react.useState)(0);
    return (0, _expoModulesCore.useReleasingSharedObjectWithLifecycle)({
      factory: () => {
        const player = new VideoPlayerWeb(parsedSource);
        setup?.(player);
        return player;
      },
      shouldRecreate: (_player, {
        previousDependencies,
        dependencies
      }) => {
        // Recreate if replaceAsync failed ([1]).
        return previousDependencies[1] !== dependencies[1];
      },
      update: player => {
        // Source ([0]) changed — use replaceAsync; fall back to recreate on failure.
        return player.replaceAsync(parsedSource).catch(() => {
          setForceRecreateCount(c => c + 1);
        });
      }
    }, [JSON.stringify(source), forceRecreateCount] // [0] source, [1] recreate counter
    );
  }
  function getSourceUri(source) {
    if (typeof source === 'string') {
      return source;
    }
    if (typeof source === 'number') {
      return (0, resolveAssetSource.default)(source)?.uri ?? null;
    }
    if (typeof source?.assetId === 'number' && !source?.uri) {
      return (0, resolveAssetSource.default)(source.assetId)?.uri ?? null;
    }
    return source?.uri ?? null;
  }
  function createVideoPlayer(source) {
    const parsedSource = typeof source === 'string' ? {
      uri: source
    } : source;
    return new VideoPlayerWeb(parsedSource);
  }
  class VideoPlayerWeb extends globalThis.expo.SharedObject {
    constructor(source) {
      super();
      this.src = source;
    }
    src = null;
    previousSrc = null;
    _mountedVideos = new Set();
    _audioNodes = new Set();
    playing = false;
    _muted = false;
    _volume = 1;
    _loop = false;
    _playbackRate = 1.0;
    _preservesPitch = true;
    _status = 'idle';
    _error = null;
    _timeUpdateLoop = null;
    _timeUpdateEventInterval = 0;
    audioMixingMode = 'auto';
    allowsExternalPlayback = false;
    staysActiveInBackground = false;
    showNowPlayingNotification = false;
    currentLiveTimestamp = null;
    currentOffsetFromLive = null;
    targetOffsetFromLive = 0;
    bufferOptions = {};
    subtitleTrack = null;
    availableSubtitleTracks = [];
    audioTrack = null;
    availableAudioTracks = [];
    videoTrack = null;
    availableVideoTracks = [];
    maxResolution = null;
    isExternalPlaybackActive = false;
    keepScreenOnWhilePlaying = false;
    seekTolerance = {};
    scrubbingModeOptions = {};
    set muted(value) {
      this._mountedVideos.forEach(video => {
        video.muted = value;
      });
      this._muted = value;
    }
    get muted() {
      return this._muted;
    }
    set playbackRate(value) {
      this._mountedVideos.forEach(video => {
        video.playbackRate = value;
      });
      this._playbackRate = value;
    }
    get playbackRate() {
      return this._playbackRate;
    }
    get isLive() {
      return [...this._mountedVideos][0]?.duration === Infinity;
    }
    set volume(value) {
      this._mountedVideos.forEach(video => {
        video.volume = value;
      });
      this._volume = value;
    }
    get volume() {
      return this._volume;
    }
    set loop(value) {
      this._mountedVideos.forEach(video => {
        video.loop = value;
      });
      this._loop = value;
    }
    get loop() {
      return this._loop;
    }
    get currentTime() {
      // All videos should be synchronized, so we return the position of the first video.
      return [...this._mountedVideos][0]?.currentTime ?? 0;
    }
    set currentTime(value) {
      this._mountedVideos.forEach(video => {
        video.currentTime = value;
      });
    }
    get duration() {
      // All videos should have the same duration, so we return the duration of the first video.
      return [...this._mountedVideos][0]?.duration ?? 0;
    }
    get preservesPitch() {
      return this._preservesPitch;
    }
    set preservesPitch(value) {
      this._mountedVideos.forEach(video => {
        video.preservesPitch = value;
      });
      this._preservesPitch = value;
    }
    get timeUpdateEventInterval() {
      return this._timeUpdateEventInterval;
    }
    set timeUpdateEventInterval(value) {
      this._timeUpdateEventInterval = value;
      if (this._timeUpdateLoop) {
        clearInterval(this._timeUpdateLoop);
      }
      if (value > 0) {
        // Emit the first event immediately like on other platforms
        this.emit('timeUpdate', {
          currentTime: this.currentTime,
          currentLiveTimestamp: null,
          currentOffsetFromLive: null,
          bufferedPosition: this.bufferedPosition
        });
        this._timeUpdateLoop = setInterval(() => {
          this.emit('timeUpdate', {
            currentTime: this.currentTime,
            currentLiveTimestamp: null,
            currentOffsetFromLive: null,
            bufferedPosition: this.bufferedPosition
          });
        }, value * 1000);
      }
    }
    get status() {
      return this._status;
    }
    get bufferedPosition() {
      if (this._mountedVideos.size === 0 || this.status === 'error') {
        return -1;
      }
      const buffered = [...this._mountedVideos][0]?.buffered;
      if (buffered != null) {
        for (let i = 0; i < buffered.length; i++) {
          if (buffered.start(i) <= this.currentTime && buffered.end(i) >= this.currentTime) {
            return buffered.end(i);
          }
        }
      }
      return 0;
    }
    set status(value) {
      if (this._status === value) return;
      if (value === 'error' && this._error) {
        this.emit('statusChange', {
          status: value,
          oldStatus: this._status,
          error: this._error
        });
      } else {
        this.emit('statusChange', {
          status: value,
          oldStatus: this._status
        });
        this._error = null;
      }
      this._status = value;
    }
    mountVideoView(video) {
      // The video will be the first video, it should inherit the properties set in the setup() function
      if (this._mountedVideos.size === 0) {
        video.preservesPitch = this._preservesPitch;
        video.loop = this._loop;
        video.volume = this._volume;
        video.muted = this._muted;
        video.playbackRate = this._playbackRate;
      }
      this._mountedVideos.add(video);
      this._addListeners(video);
      this._synchronizeWithFirstVideo(video);
    }
    unmountVideoView(video) {
      this._mountedVideos.delete(video);
    }
    mountAudioNode(audioContext, zeroGainNode, audioSourceNode) {
      if (!audioContext || !zeroGainNode) return;
      this._audioNodes.add(audioSourceNode);
      // First mounted video should be connected to the audio context. All other videos have to be muted.
      if (this._audioNodes.size === 1) {
        audioSourceNode.connect(audioContext.destination);
      } else {
        audioSourceNode.connect(zeroGainNode);
      }
    }
    unmountAudioNode(video, audioContext, audioSourceNode) {
      const mountedVideos = [...this._mountedVideos];
      const videoPlayingAudio = mountedVideos[0];
      this._audioNodes.delete(audioSourceNode);
      audioSourceNode.disconnect();
      // If video playing audio has been removed, select a new video to be the audio player by disconnecting it from the mute node.
      if (videoPlayingAudio === video && this._audioNodes.size > 0 && audioContext) {
        const newMainAudioSource = [...this._audioNodes][0];
        if (newMainAudioSource != null) {
          newMainAudioSource.disconnect();
          newMainAudioSource.connect(audioContext.destination);
        }
      }
    }
    play() {
      this._mountedVideos.forEach(video => {
        video.play();
      });
    }
    pause() {
      this._mountedVideos.forEach(video => {
        video.pause();
      });
    }
    replace(source) {
      this._mountedVideos.forEach(video => {
        const uri = getSourceUri(source);
        video.pause();
        if (uri) {
          video.setAttribute('src', uri);
          video.load();
          video.play();
        } else {
          video.removeAttribute('src');
          video.load();
        }
      });
      // TODO @behenate: this won't work when we add support for playlists
      this.previousSrc = this.src;
      this.src = source;
      this.playing = true;
    }
    // The HTML5 player already offloads loading of the asset onto a different thread so we can keep the same
    // implementation until `replace` is deprecated and removed.
    async replaceAsync(source) {
      return this.replace(source);
    }
    seekBy(seconds) {
      this._mountedVideos.forEach(video => {
        video.currentTime += seconds;
      });
    }
    replay() {
      this._mountedVideos.forEach(video => {
        video.currentTime = 0;
        video.play();
      });
      this.playing = true;
    }
    generateThumbnailsAsync(times) {
      throw new Error('Generating video thumbnails is not supported on Web yet');
    }
    _synchronizeWithFirstVideo(video) {
      const firstVideo = [...this._mountedVideos][0];
      if (!firstVideo) return;
      if (firstVideo.paused) {
        video.pause();
      } else {
        video.play();
      }
      video.currentTime = firstVideo.currentTime;
      video.volume = firstVideo.volume;
      video.muted = firstVideo.muted;
      video.playbackRate = firstVideo.playbackRate;
    }
    /**
    * If there are multiple mounted videos, all of them will emit an event, as they are synchronised.
    * We want to avoid this, so we only emit the event if it came from the first video.
    */
    _emitOnce(eventSource, eventName, ...args) {
      const mountedVideos = [...this._mountedVideos];
      if (mountedVideos[0] === eventSource) {
        this.emit(eventName, ...args);
      }
    }
    _addListeners(video) {
      video.onplay = e => {
        this._emitOnce(video, 'playingChange', {
          isPlaying: true,
          oldIsPlaying: this.playing
        });
        this.playing = true;
        this._mountedVideos.forEach(mountedVideo => {
          if (e.target !== mountedVideo) {
            mountedVideo.play();
          }
        });
      };
      video.onpause = e => {
        this._emitOnce(video, 'playingChange', {
          isPlaying: false,
          oldIsPlaying: this.playing
        });
        this.playing = false;
        this._mountedVideos.forEach(mountedVideo => {
          if (e.target !== mountedVideo) {
            mountedVideo.pause();
          }
        });
      };
      video.onvolumechange = () => {
        this._emitOnce(video, 'volumeChange', {
          volume: video.volume,
          oldVolume: this.volume
        });
        this._emitOnce(video, 'mutedChange', {
          muted: video.muted,
          oldMuted: this.muted
        });
        this.volume = video.volume;
        this.muted = video.muted;
      };
      video.onseeking = () => {
        this._mountedVideos.forEach(mountedVideo => {
          if (mountedVideo === video || mountedVideo.currentTime === video.currentTime) return;
          mountedVideo.currentTime = video.currentTime;
        });
      };
      video.onseeked = () => {
        this._mountedVideos.forEach(mountedVideo => {
          if (mountedVideo === video || mountedVideo.currentTime === video.currentTime) return;
          mountedVideo.currentTime = video.currentTime;
        });
      };
      video.onratechange = () => {
        this._emitOnce(video, 'playbackRateChange', {
          playbackRate: video.playbackRate,
          oldPlaybackRate: this.playbackRate
        });
        this._mountedVideos.forEach(mountedVideo => {
          if (mountedVideo.playbackRate === video.playbackRate) return;
          this._playbackRate = video.playbackRate;
          mountedVideo.playbackRate = video.playbackRate;
        });
        this._playbackRate = video.playbackRate;
      };
      video.onerror = () => {
        this._error = {
          message: video.error?.message ?? 'Unknown player error'
        };
        this.status = 'error';
      };
      video.oncanplay = () => {
        const allCanPlay = [...this._mountedVideos].reduce((previousValue, video) => {
          return previousValue && video.readyState >= 3;
        }, true);
        if (!allCanPlay) return;
        this.status = 'readyToPlay';
      };
      video.onwaiting = () => {
        if (this._status === 'loading') return;
        this.status = 'loading';
      };
      video.onended = () => {
        this._emitOnce(video, 'playToEnd');
      };
      video.onloadstart = () => {
        this._emitOnce(video, 'sourceChange', {
          source: this.src,
          oldSource: this.previousSrc
        });
      };
    }
  }
},1351,[372,6,1352]);
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
      return resolveAssetSource;
    }
  });
  var _reactNativeWebDistExportsAssetRegistry = require(_dependencyMap[0]);
  var AssetRegistry = _interopDefault(_reactNativeWebDistExportsAssetRegistry);
  // Minimal `resolveAssetSource` implementation for video on web, based on the version from `expo-asset`
  function resolveAssetSource(assetId) {
    const asset = AssetRegistry.default.getAssetByID(assetId);
    if (!asset) {
      return null;
    }
    const type = !asset.type ? '' : `.${asset.type}`;
    const assetPath = asset.httpServerLocation.replace(/\.\.\//g, '_') + '/' + asset.name + type;
    // The base has to have a valid syntax but doesn't matter - it's removed below as we use a relative path
    const fromUrl = new URL(assetPath, 'https://expo.dev');
    return {
      uri: fromUrl.toString().replace(fromUrl.origin, '')
    };
  }
},1352,[303]);
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
      return VideoAirPlayButton;
    }
  });
  var _reactJsxRuntime = require(_dependencyMap[0]);
  var _reactNativeWebDistExportsView = require(_dependencyMap[1]);
  var View = _interopDefault(_reactNativeWebDistExportsView);
  /**
   * A view displaying the [`AVRoutePickerView`](https://developer.apple.com/documentation/avkit/avroutepickerview). Shows a button, when pressed, an AirPlay device picker shows up, allowing users to stream the currently playing video
   * to any available AirPlay sink.
   *
   * > When using this view, make sure that the [`allowsExternalPlayback`](#allowsexternalplayback) player property is set to `true`.
   * @platform ios
   */
  function VideoAirPlayButton(props) {
    return /*#__PURE__*/(0, _reactJsxRuntime.jsx)(View.default, {
      ...props,
      style: [{
        minWidth: 30,
        minHeight: 30
      }, props.style]
    });
  }
},1353,[97,198]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  module.exports = "/assets/assets/video/welcome.bfa0ab6233e2d58dc3bd9f6a7fcbe7a8.mp4";
},1354,[]);