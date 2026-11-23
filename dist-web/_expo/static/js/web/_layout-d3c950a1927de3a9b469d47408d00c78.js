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
      return RootLayout;
    }
  });
  require(_dependencyMap[0]);
  require(_dependencyMap[1]);
  var _buffer = require(_dependencyMap[2]);
  var _react = require(_dependencyMap[3]);
  var _expoRouter = require(_dependencyMap[4]);
  var _expoSplashScreen = require(_dependencyMap[5]);
  var SplashScreen = _interopNamespace(_expoSplashScreen);
  var _componentsAppProviders = require(_dependencyMap[6]);
  var _componentsRootNavigator = require(_dependencyMap[7]);
  var _hooksUseAppInitialization = require(_dependencyMap[8]);
  var _storesAccount = require(_dependencyMap[9]);
  var _storesLogs = require(_dependencyMap[10]);
  var _utilsLoggerConsent = require(_dependencyMap[11]);
  var _utilsLoggerPosthog = require(_dependencyMap[12]);
  var _utilsUuidUuid = require(_dependencyMap[13]);
  var uuid = _interopDefault(_utilsUuidUuid);
  var _utilsWidgetsUseCalendarWidgetFeed = require(_dependencyMap[14]);
  var _utilsWidgetsUsePapillonKitSettingsSync = require(_dependencyMap[15]);
  var _reactNativeWebDistExportsLogBox = require(_dependencyMap[16]);
  var LogBox = _interopDefault(_reactNativeWebDistExportsLogBox);
  var _reactNativeWebDistExportsView = require(_dependencyMap[17]);
  var View = _interopDefault(_reactNativeWebDistExportsView);
  var _reactJsxRuntime = require(_dependencyMap[18]);
  // Polyfill Buffer
  global.Buffer = _buffer.Buffer;
  LogBox.default.ignoreLogs(["Require cycle:", "i18next is made possible by our own product, Locize", 'Route "./', "Linking found multiple possible URI schemes in your Expo config.", "[Layout children]: No route named", "Found screens with the same name nested inside one another.", "Account manager not initialized. Call initializeAccountManager first.", "Manager is null, skipping timetable fetch", "Installing bindings...", "Successfully installed!", "The action 'PRELOAD' with payload", "DrawerLayoutAndroid is deprecated", "cannot calculate shadow efficiently"]);

  // From onLayout, not an effect: hiding earlier shows a blank frame.
  const hideSplashIfSignedIn = () => {
    if (_storesAccount.useAccountStore.getState().accounts.length > 0) {
      SplashScreen.hideAsync();
    }
  };
  function RootLayout() {
    const {
      fontsLoaded
    } = (0, _hooksUseAppInitialization.useAppInitialization)();
    const segments = (0, _expoRouter.useSegments)();
    const lastTrackedView = (0, _react.useRef)(null);
    (0, _utilsWidgetsUseCalendarWidgetFeed.useCalendarWidgetFeed)();
    (0, _utilsWidgetsUsePapillonKitSettingsSync.usePapillonKitSettingsSync)();
    const analyticsView = (0, _react.useMemo)(() => {
      if (segments.length === 0) return null;
      const groupMatch = segments[0].match(/^\((.+)\)$/);
      if (groupMatch) {
        const group = groupMatch[1];
        const rest = segments.slice(1).join('/');
        return rest ? `${group}:${rest}` : group;
      }
      return segments.join('/');
    }, [segments]);
    (0, _react.useEffect)(() => {
      if (!analyticsView || lastTrackedView.current === analyticsView) return;
      const trackView = async () => {
        const consent = await (0, _utilsLoggerConsent.checkConsent)();
        if (!consent.given || consent.level !== "advanced") return;
        _utilsLoggerPosthog.posthog.screen(analyticsView);
        lastTrackedView.current = analyticsView;
      };
      trackView();
    }, [analyticsView]);
    (0, _react.useEffect)(() => {
      const originalFetch = window.fetch;
      window.fetch = async (...args) => {
        const id = (0, uuid.default)();
        let request = null;
        if (args[0] instanceof Request && args[1] === undefined) {
          request = args[0];
        } else {
          request = new Request(...args);
        }
        try {
          _storesLogs.useNetworkStore.getState().addRequest(request, id);
        } catch {}
        const response = await originalFetch(...args);
        try {
          _storesLogs.useNetworkStore.getState().addResponse(response.clone(), id);
        } catch {}
        return response;
      };
      return () => {
        window.fetch = originalFetch;
      };
    }, []);
    if (!fontsLoaded) {
      return null;
    }
    return /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_componentsAppProviders.AppProviders, {
      children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(View.default, {
        style: {
          flex: 1
        },
        onLayout: hideSplashIfSignedIn,
        children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_componentsRootNavigator.RootNavigator, {})
      })
    });
  }
},993,[1107,1127,1472,6,1023,1356,1434,1440,1442,1022,1003,1429,1473,1249,1470,1471,354,198,97]);
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
  exports.AppProviders = AppProviders;
  var _expoRouterReactNavigation = require(_dependencyMap[0]);
  var _expoSystemUi = require(_dependencyMap[1]);
  var SystemUI = _interopNamespace(_expoSystemUi);
  var _posthogReactNative = require(_dependencyMap[2]);
  var _react = require(_dependencyMap[3]);
  var _reactNativeWebDistExportsUseColorScheme = require(_dependencyMap[4]);
  var useColorScheme = _interopDefault(_reactNativeWebDistExportsUseColorScheme);
  var _reactNativeGestureHandler = require(_dependencyMap[5]);
  var _databaseDatabaseProvider = require(_dependencyMap[6]);
  var _storesSettings = require(_dependencyMap[7]);
  var _uiComponentsAlertProvider = require(_dependencyMap[8]);
  var _uiUtilsIsLiquidGlass = require(_dependencyMap[9]);
  var _utilsColors = require(_dependencyMap[10]);
  var _utilsLoggerPosthog = require(_dependencyMap[11]);
  var _utilsThemeTheme = require(_dependencyMap[12]);
  var _reactJsxRuntime = require(_dependencyMap[13]);
  function AppProviders({
    children
  }) {
    const colorScheme = (0, useColorScheme.default)();
    const selectedTheme = (0, _storesSettings.useSettingsStore)(state => state.personalization.theme);
    const selectedColorEnum = (0, _storesSettings.useSettingsStore)(state => state.personalization.colorSelected);
    const useMaterialYou = (0, _storesSettings.useSettingsStore)(state => state.personalization.useMaterialYou) ?? _storesSettings.DEFAULT_MATERIAL_YOU_ENABLED;
    const color = (0, _react.useMemo)(() => {
      const color = selectedColorEnum !== null ? _utilsColors.AppColors.find(appColor => appColor.colorEnum === selectedColorEnum) : null;
      return color || _utilsColors.AppColors[0];
    }, [selectedColorEnum]);

    // Memoize theme selection to prevent unnecessary re-computations
    const theme = (0, _react.useMemo)(() => {
      const defaultTheme = (0, _utilsThemeTheme.createDefaultTheme)(useMaterialYou, color.mainColor);
      const darkTheme = (0, _utilsThemeTheme.createDarkTheme)(useMaterialYou, color.mainColor);
      const newScheme = selectedTheme === 'auto' ? colorScheme === 'dark' ? darkTheme : defaultTheme : selectedTheme === 'dark' ? darkTheme : defaultTheme;
      return newScheme;
    }, [colorScheme, color, selectedTheme, useMaterialYou]);

    // Memoize background color to prevent string recreation
    const backgroundColor = (0, _react.useMemo)(() => {
      return colorScheme === 'dark' ? '#000000' : '#F5F5F5';
    }, [colorScheme]);

    // Combined effect for system UI updates to reduce effect overhead
    (0, _react.useEffect)(() => {
      if (_uiUtilsIsLiquidGlass.runsIOS26) {
        SystemUI.setBackgroundColorAsync(backgroundColor);
      } else {
        SystemUI.setBackgroundColorAsync("#000000");
      }
    }, [backgroundColor]);
    return /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNativeGestureHandler.GestureHandlerRootView, {
      style: {
        flex: 1,
        backgroundColor: "black"
      },
      children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_posthogReactNative.PostHogProvider, {
        client: _utilsLoggerPosthog.posthog,
        autocapture: false,
        children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_databaseDatabaseProvider.DatabaseProvider, {
          children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoRouterReactNavigation.ThemeProvider, {
            value: theme,
            children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_uiComponentsAlertProvider.AlertProvider, {
              children: children
            })
          })
        })
      })
    });
  }
},1434,[1000,1435,1474,6,356,1106,1246,1012,1125,1215,1242,1473,1438,97]);
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
  exports.setBackgroundColorAsync = setBackgroundColorAsync;
  exports.getBackgroundColorAsync = getBackgroundColorAsync;
  require(_dependencyMap[0]);
  require(_dependencyMap[1]);
  var _ExpoSystemUI = require(_dependencyMap[2]);
  var ExpoSystemUI = _interopDefault(_ExpoSystemUI);
  /**
   * Changes the root view background color.
   * Call this function in the root file outside of your component.
   *
   * @example
   * ```ts
   * SystemUI.setBackgroundColorAsync("black");
   * ```
   * @param color Any valid [CSS 3 (SVG) color](http://www.w3.org/TR/css3-color/#svg-color).
   */
  async function setBackgroundColorAsync(color) {
    if (color == null) {
      return await ExpoSystemUI.default.setBackgroundColorAsync(null);
    } else {
      const colorNumber = color;
      return await ExpoSystemUI.default.setBackgroundColorAsync(colorNumber);
    }
  }
  /**
   * Gets the root view background color.
   *
   * @example
   * ```ts
   * const color = await SystemUI.getBackgroundColorAsync();
   * ```
   * @returns Current root view background color in hex format. Returns `null` if the background color is not set.
   */
  async function getBackgroundColorAsync() {
    return await ExpoSystemUI.default.getBackgroundColorAsync();
  }
},1435,[193,124,1436]);
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
    getBackgroundColorAsync() {
      if (typeof window === 'undefined') {
        return null;
      }
      const normalizeColor = require(_dependencyMap[0]);
      return normalizeColor(document.body.style.backgroundColor);
    },
    setBackgroundColorAsync(color) {
      if (typeof window !== 'undefined') {
        document.body.style.backgroundColor = color ?? 'white';
      }
    }
  };
},1436,[1437]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  var _interopRequireDefault = require(_dependencyMap[0]).default;
  exports.__esModule = true;
  exports.default = undefined;
  var _isWebColor = _interopRequireDefault(require(_dependencyMap[1]));
  var _processColor = _interopRequireDefault(require(_dependencyMap[2]));
  /**
   * Copyright (c) Nicolas Gallagher.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *
   * 
   */

  var normalizeColor = function normalizeColor(color, opacity) {
    if (opacity === undefined) {
      opacity = 1;
    }
    if (color == null) return;
    if (typeof color === 'string' && (0, _isWebColor.default)(color)) {
      return color;
    }
    var colorInt = (0, _processColor.default)(color);
    if (colorInt != null) {
      var r = colorInt >> 16 & 255;
      var g = colorInt >> 8 & 255;
      var b = colorInt & 255;
      var a = (colorInt >> 24 & 255) / 255;
      var alpha = (a * opacity).toFixed(2);
      return "rgba(" + r + "," + g + "," + b + "," + alpha + ")";
    }
  };
  var _default = exports.default = normalizeColor;
  module.exports = exports.default;
},1437,[1475,1476,1477]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  exports.createDefaultTheme = createDefaultTheme;
  exports.createDarkTheme = createDarkTheme;
  var _expoRouterReactNavigation = require(_dependencyMap[0]);
  require(_dependencyMap[1]);
  var _reactNativeDynamicTheme = require(_dependencyMap[2]);
  const FALLBACK_COLORS = {
    light: {
      primary: "#29947A",
      tint: "#29947A",
      background: "#FFFFFF",
      overground: "#F3F6F7",
      text: "#000000",
      card: "#FFFFFF",
      item: "#FFFFFF"
    },
    dark: {
      primary: "#29947A",
      tint: "#29947A",
      background: "#000000",
      overground: "#000000",
      text: "#FFFFFF",
      card: "#121212",
      item: "#121212"
    }
  };
  const isMaterialYouAvailable = false;
  function getThemeColors(useMaterialYou) {
    if (useMaterialYou && isMaterialYouAvailable) {
      const scheme = (0, _reactNativeDynamicTheme.getDynamicColorScheme)('#29947A');
      return {
        light: {
          primary: scheme.light.primary,
          tint: scheme.light.primary,
          background: scheme.light.surfaceContainer,
          overground: scheme.light.surfaceContainer,
          text: scheme.light.onBackground,
          card: scheme.light.surfaceDim,
          item: scheme.light.surfaceContainerLowest
        },
        dark: {
          primary: scheme.dark.primaryContainer,
          tint: scheme.dark.primary,
          background: scheme.dark.background,
          overground: scheme.dark.background,
          text: scheme.dark.onBackground,
          card: scheme.dark.surfaceContainer,
          item: scheme.dark.surfaceContainer
        }
      };
    }
    return FALLBACK_COLORS;
  }
  function createDefaultTheme(useMaterialYou, primaryColor) {
    const colors = getThemeColors(useMaterialYou);
    return {
      ..._expoRouterReactNavigation.DefaultTheme,
      colors: {
        ..._expoRouterReactNavigation.DefaultTheme.colors,
        primary: useMaterialYou ? colors.light.primary : primaryColor || colors.light.primary,
        tint: useMaterialYou ? colors.light.tint : primaryColor || colors.light.tint,
        background: colors.light.background,
        overground: colors.light.overground,
        text: colors.light.text,
        card: colors.light.card,
        item: colors.light.item
      }
    };
  }
  function createDarkTheme(useMaterialYou, primaryColor) {
    const colors = getThemeColors(useMaterialYou);
    return {
      ..._expoRouterReactNavigation.DarkTheme,
      colors: {
        ..._expoRouterReactNavigation.DarkTheme.colors,
        primary: useMaterialYou ? colors.dark.primary : primaryColor || colors.dark.primary,
        tint: useMaterialYou ? colors.dark.tint : primaryColor || colors.dark.tint,
        background: colors.dark.background,
        overground: colors.dark.overground,
        text: colors.dark.text,
        card: colors.dark.card,
        item: colors.dark.item
      }
    };
  }
},1438,[1000,193,1439]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  /** Web / desktop: Material You does not exist; Theme.ts never calls this off Android ≥ 12. */
  const scheme = color => ({
    primary: color,
    primaryContainer: color,
    surfaceContainer: "#F3F6F7",
    surfaceDim: "#FFFFFF",
    surfaceContainerLowest: "#FFFFFF",
    onBackground: "#000000",
    background: "#FFFFFF"
  });
  exports.__esModule = true;
  exports.getDynamicColorScheme = (seed = "#29947A") => ({
    light: scheme(seed),
    dark: {
      ...scheme(seed),
      surfaceContainer: "#121212",
      onBackground: "#FFFFFF",
      background: "#000000"
    }
  });
},1439,[]);
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
  exports.RootNavigator = RootNavigator;
  var _expoRouterReactNavigation = require(_dependencyMap[0]);
  var _expoRouter = require(_dependencyMap[1]);
  var _i18next = require(_dependencyMap[2]);
  var _react = require(_dependencyMap[3]);
  require(_dependencyMap[4]);
  require(_dependencyMap[5]);
  var _reactNativeWebDistExportsView = require(_dependencyMap[6]);
  var View = _interopDefault(_reactNativeWebDistExportsView);
  var _constantsLayoutScreenOptions = require(_dependencyMap[7]);
  var _uiUtilsIsLiquidGlass = require(_dependencyMap[8]);
  var _utilsThemeScreenOptions = require(_dependencyMap[9]);
  var _AndroidHeaderBackground = require(_dependencyMap[10]);
  var _uiComponentsMainTabErrorBoundary = require(_dependencyMap[11]);
  var MainTabErrorBoundary = _interopDefault(_uiComponentsMainTabErrorBoundary);
  var _reactJsxRuntime = require(_dependencyMap[12]);
  const DEVMODE_SUBSCREENS = [{
    name: "(dev)/logs",
    title: "Journaux"
  }, {
    name: "(dev)/objectif-demo",
    title: "Objectif EPFL (démo)"
  }, {
    name: "(dev)/network",
    title: "Requêtes réseau"
  }, {
    name: "(dev)/papillonkit",
    title: "PapillonKit"
  }, {
    name: "(dev)/papillonkit-tests",
    title: "Tests PapillonKit"
  }, {
    name: "(dev)/magic",
    title: "Papillon Magic+"
  }];
  function RootNavigatorContent() {
    const theme = (0, _expoRouterReactNavigation.useTheme)();
    const androidHeaderProps = (0, _AndroidHeaderBackground.useAndroidHeaderProps)();

    // Memoize combined screen options to prevent object recreation
    const stackScreenOptions = (0, _react.useMemo)(() => ({
      ..._utilsThemeScreenOptions.screenOptions,
      ..._constantsLayoutScreenOptions.STACK_SCREEN_OPTIONS,
      contentStyle: {
        backgroundColor: theme.colors.background
      }
    }), [theme]);
    return /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(View.default, {
      style: {
        flex: 1,
        backgroundColor: undefined
      },
      children: [false, /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_expoRouter.Stack, {
        initialRouteName: "(tabs)",
        screenOptions: stackScreenOptions,
        children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoRouter.Stack.Screen, {
          name: "(tabs)",
          options: {
            headerShown: false,
            gestureEnabled: false
          }
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoRouter.Stack.Screen, {
          name: "(onboarding)",
          options: {
            headerShown: false
          }
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoRouter.Stack.Screen, {
          name: "(new)",
          options: {
            headerShown: false,
            presentation: "formSheet"
          }
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoRouter.Stack.Screen, {
          name: "(settings)",
          options: {
            headerShown: false,
            presentation: "formSheet"
          }
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoRouter.Stack.Screen, {
          name: "demo",
          options: _constantsLayoutScreenOptions.DEMO_SCREEN_OPTIONS
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoRouter.Stack.Screen, {
          name: "consent",
          options: _constantsLayoutScreenOptions.CONSENT_SCREEN_OPTIONS
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoRouter.Stack.Screen, {
          name: "changelog",
          options: _constantsLayoutScreenOptions.CHANGELOG_SCREEN_OPTIONS
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoRouter.Stack.Screen, {
          name: "devmode",
          options: _constantsLayoutScreenOptions.DEVMODE_SCREEN_OPTIONS
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoRouter.Stack.Screen, {
          name: "(dev)/requests",
          options: _constantsLayoutScreenOptions.DEVMODE_REQUESTS_SCREEN_OPTIONS
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoRouter.Stack.Screen, {
          name: "(dev)/request",
          options: _constantsLayoutScreenOptions.DEVMODE_REQUESTS_SCREEN_OPTIONS
        }), DEVMODE_SUBSCREENS.map(screen => /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoRouter.Stack.Screen, {
          name: screen.name,
          options: {
            ..._constantsLayoutScreenOptions.DEVMODE_SCREEN_OPTIONS,
            headerTitle: screen.title
          }
        }, screen.name)), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoRouter.Stack.Screen, {
          name: "alert",
          options: _constantsLayoutScreenOptions.ALERT_SCREEN_OPTIONS
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoRouter.Stack.Screen, {
          name: "(modals)/wallpaper",
          options: {
            presentation: "formSheet",
            sheetGrabberVisible: false,
            sheetAllowedDetents: [0.5, 1],
            headerLargeTitle: false,
            sheetLargestUndimmedDetentIndex: "none",
            headerTransparent: false,
            headerTitle: (0, _i18next.t)("Modal_Wallpaper_Title"),
            contentStyle: {
              backgroundColor: theme.colors.card
            },
            ...androidHeaderProps
          }
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoRouter.Stack.Screen, {
          name: "(modals)/profile",
          options: {
            presentation: "formSheet",
            headerLargeTitle: false,
            headerTitle: (0, _i18next.t)("Modal_Profile_Title"),
            ...androidHeaderProps
          }
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoRouter.Stack.Screen, {
          name: "(modals)/course/[id]",
          options: {
            headerTitle: (0, _i18next.t)("Modal_Course_Title"),
            headerLargeTitle: false,
            headerTransparent: true,
            ...androidHeaderProps,
            contentStyle: {
              borderRadius: 0,
              overflow: "visible"
            }
          }
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoRouter.Stack.Screen, {
          name: "(modals)/notifications",
          options: {
            headerShown: false,
            headerTitle: "Notifications",
            headerTransparent: _uiUtilsIsLiquidGlass.runsIOS26,
            headerLargeTitle: false,
            presentation: "formSheet",
            sheetGrabberVisible: true,
            sheetAllowedDetents: [0.5, 0.75, 1],
            sheetCornerRadius: _uiUtilsIsLiquidGlass.runsIOS26 ? undefined : 30,
            contentStyle: {
              backgroundColor: _uiUtilsIsLiquidGlass.runsIOS26 ? "transparent" : undefined
            }
          }
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoRouter.Stack.Screen, {
          name: "(modals)/welcome",
          options: {
            headerShown: false,
            headerTitle: "",
            headerLargeTitle: false,
            presentation: "modal",
            gestureEnabled: false,
            ...androidHeaderProps
          }
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoRouter.Stack.Screen, {
          name: "(features)/(news)/news",
          options: {
            headerShown: false,
            headerTitle: (0, _i18next.t)("Tab_News"),
            headerTransparent: _uiUtilsIsLiquidGlass.runsIOS26,
            headerLargeTitle: false,
            presentation: "modal"
          }
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoRouter.Stack.Screen, {
          name: "(features)/(news)/specific",
          options: {
            headerShown: true,
            headerTitle: (0, _i18next.t)("Tab_News"),
            headerTransparent: _uiUtilsIsLiquidGlass.runsIOS26,
            headerLargeTitle: false
          }
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoRouter.Stack.Screen, {
          name: "(modals)/tasks/custom",
          options: {
            headerShown: false,
            presentation: "modal"
          }
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoRouter.Stack.Screen, {
          name: "(modals)/team",
          options: {
            headerShown: false,
            presentation: "formSheet",
            sheetGrabberVisible: true,
            sheetAllowedDetents: "fitToContents"
          }
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoRouter.Stack.Screen, {
          name: "(features)/soon",
          options: {
            headerShown: true,
            presentation: "modal",
            sheetGrabberVisible: true,
            sheetAllowedDetents: "fitToContents",
            headerTitle: (0, _i18next.t)("Modal_Soon"),
            ...androidHeaderProps
          }
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoRouter.Stack.Screen, {
          name: "(features)/(cards)/cards",
          options: {
            headerShown: false,
            presentation: "modal",
            headerTitle: (0, _i18next.t)("Profile_QRCards"),
            headerTransparent: _uiUtilsIsLiquidGlass.runsIOS26
          }
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoRouter.Stack.Screen, {
          name: "(features)/(cards)/specific",
          options: {
            headerShown: false,
            presentation: "modal",
            headerTitle: (0, _i18next.t)("Profile_QRCards"),
            headerTransparent: _uiUtilsIsLiquidGlass.runsIOS26
          }
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoRouter.Stack.Screen, {
          name: "(features)/(cards)/qrcode",
          options: {
            headerShown: false,
            presentation: "transparentModal",
            headerTitle: "QR-Code",
            animation: "fade"
          }
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoRouter.Stack.Screen, {
          name: "(features)/attendance",
          options: {
            headerShown: false,
            headerTitle: (0, _i18next.t)("Tab_Attendance"),
            headerTransparent: _uiUtilsIsLiquidGlass.runsIOS26,
            headerLargeTitle: true,
            presentation: "modal"
          }
        })]
      })]
    });
  }
  function RootNavigator() {
    return /*#__PURE__*/(0, _reactJsxRuntime.jsx)(MainTabErrorBoundary.default, {
      children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(RootNavigatorContent, {})
    });
  }
},1440,[1000,1023,1140,6,193,341,198,1441,1215,1244,1247,1141,97]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  Object.defineProperty(exports, "FONT_CONFIG", {
    enumerable: true,
    get: function () {
      return _utilsThemeFonts.FONT_CONFIG;
    }
  });
  Object.defineProperty(exports, "STACK_SCREEN_OPTIONS", {
    enumerable: true,
    get: function () {
      return STACK_SCREEN_OPTIONS;
    }
  });
  Object.defineProperty(exports, "ALERT_SCREEN_OPTIONS", {
    enumerable: true,
    get: function () {
      return ALERT_SCREEN_OPTIONS;
    }
  });
  Object.defineProperty(exports, "DEVMODE_SCREEN_OPTIONS", {
    enumerable: true,
    get: function () {
      return DEVMODE_SCREEN_OPTIONS;
    }
  });
  Object.defineProperty(exports, "DEVMODE_REQUESTS_SCREEN_OPTIONS", {
    enumerable: true,
    get: function () {
      return DEVMODE_REQUESTS_SCREEN_OPTIONS;
    }
  });
  Object.defineProperty(exports, "DEMO_SCREEN_OPTIONS", {
    enumerable: true,
    get: function () {
      return DEMO_SCREEN_OPTIONS;
    }
  });
  Object.defineProperty(exports, "CONSENT_SCREEN_OPTIONS", {
    enumerable: true,
    get: function () {
      return CONSENT_SCREEN_OPTIONS;
    }
  });
  Object.defineProperty(exports, "CHANGELOG_SCREEN_OPTIONS", {
    enumerable: true,
    get: function () {
      return CHANGELOG_SCREEN_OPTIONS;
    }
  });
  Object.defineProperty(exports, "AI_SCREEN_OPTIONS", {
    enumerable: true,
    get: function () {
      return AI_SCREEN_OPTIONS;
    }
  });
  require(_dependencyMap[0]);
  require(_dependencyMap[1]);
  var _i18next = require(_dependencyMap[2]);
  var _utilsThemeFonts = require(_dependencyMap[3]);
  const STACK_SCREEN_OPTIONS = {
    headerBackButtonDisplayMode: "minimal"
  };
  const ALERT_SCREEN_OPTIONS = {
    headerShown: false,
    presentation: 'formSheet',
    sheetAllowedDetents: [0.9],
    sheetCornerRadius: 32,
    sheetGrabberVisible: false,
    sheetExpandsWhenScrolledToEdge: false,
    sheetInitialDetentIndex: 0
  };
  const DEVMODE_SCREEN_OPTIONS = {
    headerTitle: "Mode développeur",
    headerLargeTitle: false,
    headerShown: true,
    backButtonVisible: true
  };
  const DEVMODE_REQUESTS_SCREEN_OPTIONS = {
    headerLargeTitle: false,
    headerShown: false,
    backButtonVisible: true
  };
  const DEMO_SCREEN_OPTIONS = {
    headerTitle: "Components Demo",
    headerBackButtonDisplayMode: "minimal"
  };
  const CONSENT_SCREEN_OPTIONS = {
    gesturesEnabled: false,
    fullScreenGestureEnabled: false,
    presentation: "fullScreenModal",
    backButtonVisible: false,
    headerLargeTitle: false,
    headerShown: false
  };
  const CHANGELOG_SCREEN_OPTIONS = {
    headerTitle: (0, _i18next.t)("Changelog_Title"),
    headerLargeTitle: false
  };
  const AI_SCREEN_OPTIONS = {
    headerTitle: "AI",
    headerShown: false
  };
},1441,[193,1127,1140,1217]);
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
  exports.useAppInitialization = useAppInitialization;
  var _react = require(_dependencyMap[0]);
  var _reactNativeWebDistExportsAppState = require(_dependencyMap[1]);
  var AppState = _interopDefault(_reactNativeWebDistExportsAppState);
  var _expoSplashScreen = require(_dependencyMap[2]);
  var SplashScreen = _interopNamespace(_expoSplashScreen);
  var _expoFont = require(_dependencyMap[3]);
  var _databaseUtilsInitialization = require(_dependencyMap[4]);
  var _modulesPapillonTips = require(_dependencyMap[5]);
  var _servicesShared = require(_dependencyMap[6]);
  var _storesSettings = require(_dependencyMap[7]);
  var _storesTips = require(_dependencyMap[8]);
  var _utilsI18n = require(_dependencyMap[9]);
  var i18n = _interopDefault(_utilsI18n);
  var _utilsLoggerConsent = require(_dependencyMap[10]);
  var _utilsLoggerLogger = require(_dependencyMap[11]);
  var _utilsLoggerPosthog = require(_dependencyMap[12]);
  var _utilsMagicModelManager = require(_dependencyMap[13]);
  var ModelManager = _interopDefault(_utilsMagicModelManager);
  var _utilsMagicTflite = require(_dependencyMap[14]);
  var _constantsLayoutScreenOptions = require(_dependencyMap[15]);
  // Prevent the splash screen from auto-hiding before asset loading is complete.
  SplashScreen.preventAutoHideAsync();
  SplashScreen.setOptions({
    duration: 350,
    fade: true
  });
  function useAppInitialization() {
    const [fontsLoaded, fontsError] = (0, _expoFont.useFonts)(_constantsLayoutScreenOptions.FONT_CONFIG);

    // Settings
    const customLanguage = (0, _storesSettings.useSettingsStore)(state => state.personalization.language);
    const magicEnabled = (0, _storesSettings.useSettingsStore)(state => state.personalization.magicEnabled);
    const selectedTheme = (0, _storesSettings.useSettingsStore)(state => state.personalization.theme);
    const mutateProperty = (0, _storesSettings.useSettingsStore)(state => state.mutateProperty);
    (0, _react.useEffect)(() => {
      if (!selectedTheme) {
        mutateProperty('personalization', {
          theme: "auto"
        });
      }
    }, [mutateProperty, selectedTheme]);

    // Language Initialization
    (0, _react.useEffect)(() => {
      if (customLanguage && i18n.default.language !== customLanguage) {
        i18n.default.changeLanguage(customLanguage).catch(error => {
          console.error("Error changing language:", error);
        });
      }
    }, [customLanguage]);

    // TipKit Initialization
    // Has to happen before any tip is asked whether it should show, and exactly
    // once per process. `immediate` because our tips point at something on screen
    // right now — holding one back for an hour would point at nothing.
    //
    // A reset asked for from the debug menu is carried out here rather than
    // there: TipKit only lets its datastore be wiped before it is configured, so
    // this launch is the first chance to honour it.
    (0, _react.useEffect)(() => {
      const setUpTips = async () => {
        const {
          pendingDatastoreReset,
          clearPendingDatastoreReset,
          forceAll
        } = _storesTips.useTipsStore.getState();
        if (pendingDatastoreReset) {
          await (0, _modulesPapillonTips.resetTipsDatastore)();
          clearPendingDatastoreReset();
        }
        await (0, _modulesPapillonTips.configureTips)('immediate');
        if (forceAll) {
          await (0, _modulesPapillonTips.showAllTips)();
        }
      };
      setUpTips().catch(err => {
        (0, _utilsLoggerLogger.warn)(`TipKit configuration failed: ${err}`);
      });
    }, []);

    // Database Initialization
    // The WatermelonDB adapter is constructed synchronously at module load
    // (see database/index.ts), so it's already usable before this effect runs.
    // initializeDatabaseOnStartup() only runs diagnostic health checks, so it
    // does not need to gate app readiness / the splash screen.
    (0, _react.useEffect)(() => {
      (0, _databaseUtilsInitialization.initializeDatabaseOnStartup)().catch(err => {
        (0, _utilsLoggerLogger.warn)(`Database initialization failed: ${err}`);
      });
    }, []);

    // AppState Monitoring
    const appState = (0, _react.useRef)(AppState.default.currentState);
    const lastBackgroundRef = (0, _react.useRef)(null);
    (0, _react.useEffect)(() => {
      const subscription = AppState.default.addEventListener("change", nextAppState => {
        if (appState.current.match(/inactive|background/) && nextAppState === "active") {
          if (lastBackgroundRef.current) {
            const now = Date.now();
            const durationMs = now - lastBackgroundRef.current;
            if (durationMs > 300000) {
              (0, _servicesShared.initializeAccountManager)().catch(e => (0, _utilsLoggerLogger.warn)(`Background account refresh failed: ${e}`));
            }
          }
        }
        if (nextAppState === "background") {
          lastBackgroundRef.current = Date.now();
        }
        appState.current = nextAppState;
      });
      return () => {
        subscription.remove();
      };
    }, []);

    // Magic/ModelManager Initialization
    (0, _react.useEffect)(() => {
      if (_utilsMagicTflite.MAGIC_AVAILABLE && magicEnabled) {
        ModelManager.default.safeInit();
      }
    }, [magicEnabled]);

    // PostHog Consent Sync
    (0, _react.useEffect)(() => {
      async function syncPostHogConsent() {
        const consent = await (0, _utilsLoggerConsent.checkConsent)();
        if (consent.given && consent.level !== "none") {
          await _utilsLoggerPosthog.posthog.optIn();
        } else {
          await _utilsLoggerPosthog.posthog.optOut();
        }
      }
      syncPostHogConsent();
    }, []);

    // Error Handling for Fonts
    const handleError = (0, _react.useCallback)(() => {
      if (fontsError) {
        throw fontsError;
      }
    }, [fontsError]);
    (0, _react.useEffect)(handleError, [handleError]);
    return {
      fontsLoaded,
      fontsError
    };
  }
},1442,[6,302,1356,1443,1469,1478,1118,1012,1235,1127,1429,1116,1473,1015,1375,1441]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  Object.defineProperty(exports, "useFonts", {
    enumerable: true,
    get: function () {
      return _FontHooks.useFonts;
    }
  });
  var _Font = require(_dependencyMap[0]);
  Object.keys(_Font).forEach(function (k) {
    if (k !== 'default' && !Object.prototype.hasOwnProperty.call(exports, k)) {
      Object.defineProperty(exports, k, {
        enumerable: true,
        get: function () {
          return _Font[k];
        }
      });
    }
  });
  var _FontUtils = require(_dependencyMap[1]);
  Object.keys(_FontUtils).forEach(function (k) {
    if (k !== 'default' && !Object.prototype.hasOwnProperty.call(exports, k)) {
      Object.defineProperty(exports, k, {
        enumerable: true,
        get: function () {
          return _FontUtils[k];
        }
      });
    }
  });
  var _FontHooks = require(_dependencyMap[2]);
},1443,[1444,1466,1468]);
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
  Object.defineProperty(exports, "FontDisplay", {
    enumerable: true,
    get: function () {
      return _FontTypes.FontDisplay;
    }
  });
  exports.isLoaded = isLoaded;
  exports.getLoadedFonts = getLoadedFonts;
  exports.isLoading = isLoading;
  exports.loadAsync = loadAsync;
  exports.unloadAllAsync = unloadAllAsync;
  exports.unloadAsync = unloadAsync;
  var _expoModulesCore = require(_dependencyMap[0]);
  var _ExpoFontLoader = require(_dependencyMap[1]);
  var ExpoFontLoader = _interopDefault(_ExpoFontLoader);
  var _FontLoader = require(_dependencyMap[2]);
  var _fontFaceValidation = require(_dependencyMap[3]);
  var _fontSourceFromFace = require(_dependencyMap[4]);
  var _memory = require(_dependencyMap[5]);
  var _server = require(_dependencyMap[6]);
  var _FontTypes = require(_dependencyMap[7]);
  // @needsAudit
  /**
   * Synchronously detect if the font for `fontFamily` has finished loading.
   *
   * @param fontFamily The name used to load the `FontResource`.
   * @return Returns `true` if the font has fully loaded.
   */
  function isLoaded(fontFamily) {
    {
      if (typeof ExpoFontLoader.default.isLoaded !== 'function') {
        throw new Error(`expected ExpoFontLoader.isLoaded to be a function, was ${typeof ExpoFontLoader.default.isLoaded}`);
      }
      return (0, _memory.isLoadedInCache)(fontFamily) || ExpoFontLoader.default.isLoaded(fontFamily);
    }
    return (0, _memory.isLoadedNative)(fontFamily);
  }
  /**
   * Synchronously get all the fonts that have been loaded.
   * This includes fonts that were bundled at build time using the config plugin, as well as those loaded at runtime using `loadAsync`.
   *
   * @returns Returns array of strings which you can use as `fontFamily` [style prop](https://reactnative.dev/docs/text#style).
   */
  function getLoadedFonts() {
    return ExpoFontLoader.default.getLoadedFonts();
  }
  // @needsAudit
  /**
   * Synchronously detect if the font for `fontFamily` is still being loaded.
   *
   * @param fontFamily The name used to load the `FontResource`.
   * @returns Returns `true` if the font is still loading.
   */
  function isLoading(fontFamily) {
    return fontFamily in _memory.loadPromises;
  }
  // @needsAudit
  /**
   * An efficient method for loading fonts from static or remote resources which can then be used
   * with the platform's native text elements. In the browser, this generates a `@font-face` block in
   * a shared style sheet for fonts. No CSS is needed to use this method.
   *
   * > **Note**: We recommend using the [config plugin](#configuration-in-app-config) instead whenever possible.
   *
   * > **Note**: When the `fontFamily` is already loaded, this method resolves without replacing it.
   * > This applies across the string and array APIs, and across separate calls: a `fontFamily`
   * > loads once. Declare all of its faces in that one call. A later call for an already-loaded
   * > `fontFamily` adds none of its faces, even if that call lists faces the first call did not.
   *
   * @param fontFamilyOrFontMap String, map of values that can be used as the `fontFamily`
   * [style prop](https://reactnative.dev/docs/text#style) with React Native `Text` elements, or an
   * array of [`FontFamilyDefinition`](#fontfamilydefinition)s for loading multiple faces per family.
   * @param source The font asset that should be loaded into the `fontFamily` namespace.
   *
   * @return Returns a promise that fulfils when the font has loaded. Often you may want to wrap the
   * method in a `try/catch/finally` to ensure the app continues if the font fails to load.
   */
  function loadAsync(fontFamilyOrFontMap, source) {
    // NOTE(EvanBacon): Static render pass on web must be synchronous to collect all fonts.
    // Because of this, `loadAsync` doesn't use the `async` keyword and deviates from the
    // standard Expo SDK style guide.
    const isServer = typeof window === 'undefined';
    if (Array.isArray(fontFamilyOrFontMap)) {
      if (source) {
        return Promise.reject(new _expoModulesCore.CodedError(`ERR_FONT_API`, `No fontFamily can be used for the provided source: ${source}. The second argument of \`loadAsync()\` can only be used with a \`string\` value as the first argument.`));
      }
      const definitions = fontFamilyOrFontMap;
      if (isServer) {
        // Throw, not reject: the static render pass discards this promise, so a rejection would drop the font silently.
        (0, _fontFaceValidation.assertValidFontFamilyDefinitions)(definitions);
        for (const {
          fontFamily,
          fontDefinitions
        } of definitions) {
          (0, _fontFaceValidation.assertValidFontFaces)(fontFamily, fontDefinitions);
          for (const face of fontDefinitions) {
            (0, _server.registerStaticFont)(fontFamily, (0, _fontSourceFromFace.fontSourceFromFace)(face));
          }
        }
        return Promise.resolve();
      }
      try {
        (0, _fontFaceValidation.assertValidFontFamilyDefinitions)(definitions);
      } catch (error) {
        return Promise.reject(error);
      }
      return Promise.all(definitions.map(loadFontFamilyInNamespaceAsync)).then(() => {});
    }
    if (typeof fontFamilyOrFontMap === 'object') {
      if (source) {
        return Promise.reject(new _expoModulesCore.CodedError(`ERR_FONT_API`, `No fontFamily can be used for the provided source: ${source}. The second argument of \`loadAsync()\` can only be used with a \`string\` value as the first argument.`));
      }
      const fontMap = fontFamilyOrFontMap;
      const names = Object.keys(fontMap);
      if (isServer) {
        names.map(name => (0, _server.registerStaticFont)(name, fontMap[name]));
        return Promise.resolve();
      }
      return Promise.all(names.map(name => loadFontInNamespaceAsync(name, fontMap[name]))).then(() => {});
    }
    if (isServer) {
      (0, _server.registerStaticFont)(fontFamilyOrFontMap, source);
      return Promise.resolve();
    }
    return loadFontInNamespaceAsync(fontFamilyOrFontMap, source);
  }
  async function loadFontFamilyInNamespaceAsync(definition) {
    const {
      fontFamily,
      fontDefinitions
    } = definition;
    (0, _fontFaceValidation.assertValidFontFaces)(fontFamily, fontDefinitions);
    if (_memory.loadPromises.hasOwnProperty(fontFamily)) {
      return _memory.loadPromises[fontFamily];
    }
    if (isLoaded(fontFamily)) {
      return;
    }
    _memory.loadPromises[fontFamily] = (async () => {
      try {
        await (0, _FontLoader.loadFontFamilyAsync)(fontFamily, fontDefinitions);
        (0, _memory.markLoaded)(fontFamily);
      } finally {
        delete _memory.loadPromises[fontFamily];
      }
    })();
    await _memory.loadPromises[fontFamily];
  }
  async function loadFontInNamespaceAsync(fontFamily, source) {
    if (!source) {
      throw new _expoModulesCore.CodedError(`ERR_FONT_SOURCE`, `Cannot load null or undefined font source: { "${fontFamily}": ${source} }. Expected asset of type \`FontSource\` for fontFamily of name: "${fontFamily}"`);
    }
    if (_memory.loadPromises.hasOwnProperty(fontFamily)) {
      return _memory.loadPromises[fontFamily];
    }
    // we consult the native module to see if the font is already loaded
    // this is slower than checking the cache but can help avoid loading the same font n times
    if (isLoaded(fontFamily)) {
      return;
    }
    // Important: we want all callers that concurrently try to load the same font to await the same
    // promise. If we're here, we haven't created the promise yet. To ensure we create only one
    // promise in the program, we need to create the promise synchronously without yielding the event
    // loop from this point.
    const asset = (0, _FontLoader.getAssetForSource)(source);
    _memory.loadPromises[fontFamily] = (async () => {
      try {
        await (0, _FontLoader.loadSingleFontAsync)(fontFamily, asset);
        (0, _memory.markLoaded)(fontFamily);
      } finally {
        delete _memory.loadPromises[fontFamily];
      }
    })();
    await _memory.loadPromises[fontFamily];
  }
  // @needsAudit
  /**
   * Unloads all the custom fonts. This is used for testing.
   * @hidden
   */
  async function unloadAllAsync() {
    if (!ExpoFontLoader.default.unloadAllAsync) {
      throw new _expoModulesCore.UnavailabilityError('expo-font', 'unloadAllAsync');
    }
    if (Object.keys(_memory.loadPromises).length) {
      throw new _expoModulesCore.CodedError(`ERR_UNLOAD`, `Cannot unload fonts while they're still loading: ${Object.keys(_memory.loadPromises).join(', ')}`);
    }
    (0, _memory.purgeCache)();
    await ExpoFontLoader.default.unloadAllAsync();
  }
  // @needsAudit
  /**
   * Unload custom fonts matching the `fontFamily`s and display values provided.
   * This is used for testing.
   *
   * @param fontFamilyOrFontMap The name or names of the custom fonts that will be unloaded.
   * @param options When `fontFamilyOrFontMap` is a string, this should be the font source used to load
   * the custom font originally.
   * @hidden
   */
  async function unloadAsync(fontFamilyOrFontMap, options) {
    if (!ExpoFontLoader.default.unloadAsync) {
      throw new _expoModulesCore.UnavailabilityError('expo-font', 'unloadAsync');
    }
    if (typeof fontFamilyOrFontMap === 'object') {
      if (options) {
        throw new _expoModulesCore.CodedError(`ERR_FONT_API`, `No fontFamily can be used for the provided options: ${options}. The second argument of \`unloadAsync()\` can only be used with a \`string\` value as the first argument.`);
      }
      const fontMap = fontFamilyOrFontMap;
      const names = Object.keys(fontMap);
      await Promise.all(names.map(name => unloadFontInNamespaceAsync(name, fontMap[name])));
      return;
    }
    return await unloadFontInNamespaceAsync(fontFamilyOrFontMap, options);
  }
  async function unloadFontInNamespaceAsync(fontFamily, options) {
    if (!isLoaded(fontFamily)) {
      return;
    } else {
      (0, _memory.purgeFontFamilyFromCache)(fontFamily);
    }
    // Important: we want all callers that concurrently try to load the same font to await the same
    // promise. If we're here, we haven't created the promise yet. To ensure we create only one
    // promise in the program, we need to create the promise synchronously without yielding the event
    // loop from this point.
    if (!fontFamily) {
      throw new _expoModulesCore.CodedError(`ERR_FONT_FAMILY`, `Cannot unload an empty name`);
    }
    if (!ExpoFontLoader.default.unloadAsync) {
      throw new _expoModulesCore.UnavailabilityError('expo-font', 'unloadAsync');
    }
    await ExpoFontLoader.default.unloadAsync(fontFamily, options);
  }
},1444,[372,1445,1447,1461,1462,1463,1464,1465]);
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
  exports._matchesFontFaceOptions = _matchesFontFaceOptions;
  exports._fontFaceRuleSrcMatches = _fontFaceRuleSrcMatches;
  exports._createWebFontTemplate = _createWebFontTemplate;
  var _expoModulesCore = require(_dependencyMap[0]);
  var _serverContext = require(_dependencyMap[1]);
  function getFontFaceStyleSheet() {
    if (typeof window === 'undefined') {
      return null;
    }
    const styleSheet = getStyleElement();
    return styleSheet.sheet ? styleSheet.sheet : null;
  }
  function getFontFaceRules() {
    const sheet = getFontFaceStyleSheet();
    if (sheet) {
      // @ts-ignore: rule iterator
      const rules = [...sheet.cssRules];
      const items = [];
      for (let i = 0; i < rules.length; i++) {
        const rule = rules[i];
        if (rule instanceof CSSFontFaceRule) {
          items.push({
            rule,
            index: i
          });
        }
      }
      return items;
    }
    return [];
  }
  // `_createWebFontTemplate` writes the family name quoted, but engines disagree about whether
  // the CSSOM keeps the quotes (Firefox always does), so normalize them away before comparing.
  function normalizeFontFamilyName(fontFamily) {
    // jsdom leaves `style.fontFamily` undefined on the `@font-face` rules it parses.
    const trimmed = fontFamily?.trim();
    if (!trimmed) {
      return '';
    }
    const quote = trimmed[0];
    if (trimmed.length >= 2 && (quote === '"' || quote === "'") && trimmed.endsWith(quote)) {
      return trimmed.slice(1, -1).replace(/\\(.)/g, '$1');
    }
    return trimmed;
  }
  function canonicalCssWeight(weight) {
    if (weight == null || weight === '') {
      return undefined;
    }
    if (typeof weight === 'number') {
      return Number.isFinite(weight) ? weight : undefined;
    }
    const lower = weight.trim().toLowerCase();
    if (lower === 'normal') {
      return 400;
    }
    if (lower === 'bold') {
      return 700;
    }
    const numeric = Number(lower);
    return Number.isFinite(numeric) ? numeric : lower;
  }
  // jsdom doesn't implement `CSSFontFaceRule`, so tests call this directly with plain `{ style }` objects.
  function _matchesFontFaceOptions(rule, fontFamilyName, options) {
    if (normalizeFontFamilyName(rule.style.fontFamily) !== fontFamilyName) {
      return false;
    }
    if (options?.display && options.display !== rule.style.fontDisplay) {
      return false;
    }
    if (options?.weight != null && canonicalCssWeight(options.weight) !== canonicalCssWeight(rule.style.fontWeight)) {
      return false;
    }
    if (options?.style != null && options.style !== rule.style.fontStyle) {
      return false;
    }
    return true;
  }
  function getFontFaceRulesMatchingResource(fontFamilyName, options) {
    return getFontFaceRules().filter(({
      rule
    }) => _matchesFontFaceOptions(rule, fontFamilyName, options));
  }
  function _fontFaceRuleSrcMatches(rule, uri) {
    const src = rule.style.getPropertyValue('src');
    const match = src.match(/url\((['"]?)([^'")]*)\1\)/);
    if (!match) {
      // Every rule carries a `url(...)`; an unreadable `src` means the engine doesn't expose it.
      return true;
    }
    let ruleUri = match[2] ?? '';
    try {
      ruleUri = decodeURIComponent(ruleUri);
    } catch {
      // decodeURIComponent throws on malformed percent-encoding; compare the raw value instead.
    }
    return ruleUri === String(uri);
  }
  const ExpoFontLoader = {
    async unloadAllAsync() {
      if (typeof window === 'undefined') return;
      const element = document.getElementById(ID);
      if (element && element instanceof HTMLStyleElement) {
        document.removeChild(element);
      }
    },
    async unloadAsync(fontFamilyName, options) {
      const sheet = getFontFaceStyleSheet();
      if (!sheet) return;
      const items = getFontFaceRulesMatchingResource(fontFamilyName, options);
      // Descending: `deleteRule` shifts every later index down by one.
      const descending = [...items].sort((a, b) => b.index - a.index);
      for (const item of descending) {
        sheet.deleteRule(item.index);
      }
    },
    getServerResources() {
      const elements = (0, _serverContext.getServerResourceDescriptors)();
      return elements.map(element => {
        switch (element.type) {
          case 'style':
            return `<style id="${element.id}">${element.css}</style>`;
          case 'link':
            return `<link rel="${element.rel}" href="${element.href}" as="${element.as}" crossorigin="${element.crossOrigin}" />`;
          default:
            return '';
        }
      }).filter(Boolean);
    },
    getServerResourceDescriptors() {
      return (0, _serverContext.getServerResourceDescriptors)();
    },
    getLoadedFonts() {
      if (typeof window === 'undefined') {
        return (0, _serverContext.getLoadedServerFonts)();
      }
      const seen = new Set();
      const families = [];
      for (const {
        rule
      } of getFontFaceRules()) {
        const name = normalizeFontFamilyName(rule.style.fontFamily);
        if (!seen.has(name)) {
          seen.add(name);
          families.push(name);
        }
      }
      return families;
    },
    isLoaded(fontFamilyName, resource = {}) {
      if (typeof window === 'undefined') {
        return (0, _serverContext.isServerFontLoaded)(fontFamilyName);
      }
      return getFontFaceRulesMatchingResource(fontFamilyName, resource)?.length > 0;
    },
    // NOTE(vonovak): This is used in RN vector-icons to load fonts dynamically on web. Changing the signature is breaking.
    // NOTE(EvanBacon): No async keyword! This cannot return a promise in Node environments.
    loadAsync(fontFamilyName, resource) {
      if (typeof window === 'undefined') {
        (0, _serverContext.addServerFont)({
          name: fontFamilyName,
          css: _createWebFontTemplate(fontFamilyName, resource),
          // @ts-expect-error: typeof string
          resourceId: resource.uri
        });
        return Promise.resolve();
      }
      const canInjectStyle = document.head && typeof document.head.appendChild === 'function';
      if (!canInjectStyle) {
        throw new _expoModulesCore.CodedError('ERR_WEB_ENVIRONMENT', `The browser's \`document.head\` element doesn't support injecting fonts.`);
      }
      const style = getStyleElement();
      if (!style.isConnected) {
        document.head.appendChild(style);
      }
      const alreadyLoaded = getFontFaceRulesMatchingResource(fontFamilyName, resource).some(({
        rule
      }) => _fontFaceRuleSrcMatches(rule, resource.uri));
      if (!alreadyLoaded) {
        _createWebStyle(fontFamilyName, resource);
      }
      if (typeof document.fonts?.load !== 'function') {
        return Promise.resolve();
      }
      // Resolve when the browser has fetched the file, so text renders with it on resolution. The
      // face is selected with the `font` shorthand syntax; skip a descriptor the CSS sanitization
      // in `_createWebFontTemplate` drops, and a range weight, which the shorthand can't express.
      let shorthand = '';
      if (typeof resource.style === 'string' && CSS_IDENT_RE.test(resource.style)) {
        shorthand += `${resource.style} `;
      }
      if (typeof resource.weight === 'number' && Number.isFinite(resource.weight) || typeof resource.weight === 'string' && (CSS_IDENT_RE.test(resource.weight) || CSS_WEIGHT_NUMERIC_RE.test(resource.weight) && !resource.weight.includes(' '))) {
        shorthand += `${resource.weight} `;
      }
      return withLoadTimeout(document.fonts.load(`${shorthand}1em ${JSON.stringify(fontFamilyName)}`), fontFamilyName);
    }
  };
  const FONT_LOAD_TIMEOUT_MS = 12000;
  function withLoadTimeout(loading, fontFamilyName) {
    let timer;
    const timingOut = new Promise((_resolve, reject) => {
      timer = setTimeout(() => {
        reject(new _expoModulesCore.CodedError('ERR_DOWNLOAD', `Fetching the font family "${fontFamilyName}" timed out after ${FONT_LOAD_TIMEOUT_MS}ms. ` + `Check that the font URL is reachable and served with CORS headers.`));
      }, FONT_LOAD_TIMEOUT_MS);
    });
    return Promise.race([loading, timingOut]).finally(() => clearTimeout(timer)).then(() => undefined);
  }
  const isServer = typeof window === 'undefined';
  function createExpoFontLoader() {
    return ExpoFontLoader;
  }
  const toExport = isServer ? ExpoFontLoader :
  // Normally that'd be a class but that doesn't work on server, so we use a function instead.
  // TS doesn't like that but we don't need it to be a class.
  (0, _expoModulesCore.registerWebModule)(createExpoFontLoader, 'ExpoFontLoader');
  var _default = toExport;
  const ID = 'expo-generated-fonts';
  function getStyleElement() {
    const element = document.getElementById(ID);
    if (element && element instanceof HTMLStyleElement) {
      return element;
    }
    const styleElement = document.createElement('style');
    styleElement.id = ID;
    return styleElement;
  }
  const CSS_IDENT_RE = /^[a-zA-Z_-][\w-]*$/;
  // CSS font weights run from 1 to 1000, alone or as a variable-font range ('100 900').
  // No leading zero: '0400' is not a weight.
  const CSS_WEIGHT_NUMERIC_RE = /^(1000|[1-9]\d{0,2})( (1000|[1-9]\d{0,2}))?$/;
  function _createWebFontTemplate(fontFamily, resource) {
    const declarations = [`font-family:${JSON.stringify(fontFamily)}`, `src:url(${JSON.stringify(resource.uri)})`];
    if (typeof resource.display === 'string' && CSS_IDENT_RE.test(resource.display)) {
      declarations.push(`font-display:${resource.display}`);
    }
    if (typeof resource.weight === 'number' && Number.isFinite(resource.weight)) {
      declarations.push(`font-weight:${resource.weight}`);
    } else if (typeof resource.weight === 'string' && (CSS_IDENT_RE.test(resource.weight) || CSS_WEIGHT_NUMERIC_RE.test(resource.weight))) {
      declarations.push(`font-weight:${resource.weight}`);
    }
    if (typeof resource.style === 'string' && CSS_IDENT_RE.test(resource.style)) {
      declarations.push(`font-style:${resource.style}`);
    }
    return `@font-face{${declarations.join(';')}}`;
  }
  function _createWebStyle(fontFamily, resource) {
    const fontStyle = _createWebFontTemplate(fontFamily, resource);
    const styleElement = getStyleElement();
    // @ts-ignore: TypeScript does not define HTMLStyleElement::styleSheet. This is just for IE and
    // possibly can be removed if it's unnecessary on IE 11.
    if (styleElement.styleSheet) {
      const styleElementIE = styleElement;
      styleElementIE.styleSheet.cssText = styleElementIE.styleSheet.cssText ? styleElementIE.styleSheet.cssText + fontStyle : fontStyle;
    } else if (styleElement.sheet) {
      styleElement.sheet.insertRule(fontStyle, styleElement.sheet.cssRules.length);
    } else {
      const textNode = document.createTextNode(fontStyle);
      styleElement.appendChild(textNode);
    }
    return styleElement;
  }
},1445,[372,1446]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  exports.withServerContext = withServerContext;
  exports.addServerFont = addServerFont;
  exports.getServerResourceDescriptors = getServerResourceDescriptors;
  exports.getLoadedServerFonts = getLoadedServerFonts;
  exports.isServerFontLoaded = isServerFontLoaded;
  var _nodeAsync_hooks = require(_dependencyMap[0]);
  const ID = 'expo-generated-fonts';
  let storage = null;
  function getStorage() {
    if (typeof window !== 'undefined') {
      throw new Error('expo-font server context is server-only and cannot be used in the browser.');
    }
    if (!storage) {
      storage = new _nodeAsync_hooks.AsyncLocalStorage();
    }
    return storage;
  }
  function requireStore() {
    const store = getStorage().getStore();
    if (!store) {
      throw new Error("expo-font server context accessed outside of withServerContext(). Wrap your server-side font usage in withServerContext(() => /* server code */).");
    }
    return store;
  }
  function withServerContext(callback) {
    if (typeof window !== 'undefined') {
      return callback();
    }
    return getStorage().run(new Map(), callback);
  }
  function addServerFont(entry) {
    const store = requireStore();
    if (!store.has(entry.css)) {
      // Key on CSS so the same family with different options stays as separate entries.
      store.set(entry.css, entry);
    }
  }
  function getServerResourceDescriptors() {
    const entries = [...requireStore().values()];
    if (!entries.length) {
      return [];
    }
    const css = entries.map(({
      css
    }) => css).join('\n');
    // One <link rel="preload"> per URI even if multiple @font-face entries share it.
    const links = [...new Set(entries.map(({
      resourceId
    }) => resourceId))];
    return [{
      css,
      id: ID,
      type: 'style'
    }, ...links.map(resourceId => ({
      as: 'font',
      crossOrigin: '',
      href: resourceId,
      rel: 'preload',
      type: 'link'
    }))];
  }
  function getLoadedServerFonts() {
    const store = getStorage().getStore();
    if (!store) {
      return [];
    }
    return [...new Set([...store.values()].map(({
      name
    }) => name))];
  }
  function isServerFontLoaded(name) {
    const store = getStorage().getStore();
    if (!store) {
      return false;
    }
    for (const entry of store.values()) {
      if (entry.name === name) {
        return true;
      }
    }
    return false;
  }
},1446,[4]);
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
  exports.getAssetForSource = getAssetForSource;
  exports.loadFontFamilyAsync = loadFontFamilyAsync;
  exports.loadSingleFontAsync = loadSingleFontAsync;
  var _expoAsset = require(_dependencyMap[0]);
  var _expoModulesCore = require(_dependencyMap[1]);
  var _ExpoFontLoader = require(_dependencyMap[2]);
  var ExpoFontLoader = _interopDefault(_ExpoFontLoader);
  require(_dependencyMap[3]);
  var _fontSourceFromFace = require(_dependencyMap[4]);
  function uriFromFontSource(asset) {
    if (typeof asset === 'string') {
      return asset || null;
    } else if (typeof asset === 'number') {
      return uriFromFontSource(_expoAsset.Asset.fromModule(asset));
    } else if (typeof asset === 'object' && typeof asset.uri === 'number') {
      return uriFromFontSource(asset.uri);
    } else if (typeof asset === 'object') {
      return asset.uri || asset.localUri || asset.default || null;
    }
    return null;
  }
  function displayFromFontSource(asset) {
    if (typeof asset === 'object' && 'display' in asset) {
      return asset.display ?? undefined;
    }
    return undefined;
  }
  function weightFromFontSource(asset) {
    if (typeof asset === 'object' && 'weight' in asset) {
      return asset.weight ?? undefined;
    }
    return undefined;
  }
  function styleFromFontSource(asset) {
    if (typeof asset === 'object' && 'style' in asset) {
      return asset.style ?? undefined;
    }
    return undefined;
  }
  function getAssetForSource(source) {
    const uri = uriFromFontSource(source);
    const display = displayFromFontSource(source);
    const weight = weightFromFontSource(source);
    const style = styleFromFontSource(source);
    if (!uri || typeof uri !== 'string') {
      throwInvalidSourceError(uri);
    }
    return {
      uri,
      display,
      weight,
      style
    };
  }
  function throwInvalidSourceError(source) {
    let type = typeof source;
    if (type === 'object') type = JSON.stringify(source, null, 2);
    throw new _expoModulesCore.CodedError(`ERR_FONT_SOURCE`, `Expected font asset of type \`string | FontResource | Asset\` instead got: ${type}`);
  }
  // The shared declared-value check skips faces with an undeclared weight or style. On web an
  // undeclared descriptor is not read from the font file — CSS defaults it to 'normal'/400 — so
  // two faces can resolve to the same effective descriptors and the last one registered silently
  // shadows the rest. Warn about that; ranges only collide when they are identical.

  async function loadFontFamilyAsync(fontFamily, fontDefinitions) {
    await Promise.all(fontDefinitions.map(face => {
      const asset = getAssetForSource((0, _fontSourceFromFace.fontSourceFromFace)(face));
      return loadSingleFontAsync(fontFamily, asset);
    }));
  }
  // NOTE(EvanBacon): No async keyword!
  function loadSingleFontAsync(name, input) {
    if (typeof input !== 'object' || typeof input.uri !== 'string' || input.downloadAsync) {
      throwInvalidSourceError(input);
    }
    return ExpoFontLoader.default.loadAsync(name, input);
  }
},1447,[1448,372,1445,1461,1462]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  require(_dependencyMap[0]);
  var _Asset = require(_dependencyMap[1]);
  Object.keys(_Asset).forEach(function (k) {
    if (k !== 'default' && !Object.prototype.hasOwnProperty.call(exports, k)) {
      Object.defineProperty(exports, k, {
        enumerable: true,
        get: function () {
          return _Asset[k];
        }
      });
    }
  });
  var _AssetHooks = require(_dependencyMap[2]);
  Object.keys(_AssetHooks).forEach(function (k) {
    if (k !== 'default' && !Object.prototype.hasOwnProperty.call(exports, k)) {
      Object.defineProperty(exports, k, {
        enumerable: true,
        get: function () {
          return _AssetHooks[k];
        }
      });
    }
  });
},1448,[1449,1450,1460]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  function _interopDefault(e) {
    return e && e.__esModule ? e : {
      default: e
    };
  }
  var _Asset = require(_dependencyMap[0]);
  var _PlatformUtils = require(_dependencyMap[1]);
  var _resolveAssetSource = require(_dependencyMap[2]);
  var resolveAssetSource = _interopDefault(_resolveAssetSource);
  // Override React Native's asset resolution for `Image` components in contexts where it matters
  if (_PlatformUtils.IS_ENV_WITH_LOCAL_ASSETS) {
    const setTransformer = resolveAssetSource.default.setCustomSourceTransformer || _resolveAssetSource.setCustomSourceTransformer;
    setTransformer(function expoAssetTransformer(resolver) {
      try {
        // Bundler is using the hashAssetFiles plugin if and only if the fileHashes property exists
        if ('fileHashes' in resolver.asset && resolver.asset.fileHashes) {
          const asset = _Asset.Asset.fromMetadata(resolver.asset);
          if (asset.uri.startsWith(_Asset.ANDROID_EMBEDDED_URL_BASE_RESOURCE)) {
            // TODO(@kitten): See https://github.com/expo/expo/commit/ec940b57a87d99ab4f1d06d87126e662c3f04f04#r155340943
            // It's unclear whether this is sound since this may be our own AssetSourceResolver, which doesn't have this method
            // Please compare `AssetSourceResolver` type from `react-native/unstable-internals-do-not-use` against `./AssetSourceResolver`
            return resolver.resourceIdentifierWithoutScale();
          }
          return resolver.fromSource(asset.downloaded ? asset.localUri : asset.uri);
        } else {
          return resolver.defaultAsset();
        }
      } catch {
        return resolver.defaultAsset();
      }
    });
  }
},1449,[1450,1454,1459]);
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
  Object.defineProperty(exports, "ANDROID_EMBEDDED_URL_BASE_RESOURCE", {
    enumerable: true,
    get: function () {
      return ANDROID_EMBEDDED_URL_BASE_RESOURCE;
    }
  });
  Object.defineProperty(exports, "Asset", {
    enumerable: true,
    get: function () {
      return Asset;
    }
  });
  require(_dependencyMap[0]);
  var _reactNativeWebDistExportsAssetRegistry = require(_dependencyMap[1]);
  var AssetRegistry = _interopDefault(_reactNativeWebDistExportsAssetRegistry);
  var _AssetSources = require(_dependencyMap[2]);
  var _AssetUris = require(_dependencyMap[3]);
  var AssetUris = _interopNamespace(_AssetUris);
  var _ExpoAsset = require(_dependencyMap[4]);
  var _ImageAssets = require(_dependencyMap[5]);
  var ImageAssets = _interopNamespace(_ImageAssets);
  var _LocalAssets = require(_dependencyMap[6]);
  var _PlatformUtils = require(_dependencyMap[7]);
  var _resolveAssetSource = require(_dependencyMap[8]);
  var resolveAssetSource = _interopDefault(_resolveAssetSource);
  function isVirtualAsset(assetModule) {
    return !!assetModule && typeof assetModule === 'object' && 'uri' in assetModule && typeof assetModule.uri === 'string';
  }
  /**
   * Android resource URL prefix.
   * @hidden
   */
  const ANDROID_EMBEDDED_URL_BASE_RESOURCE = 'file:///android_res/';
  /**
   * The `Asset` class represents an asset in your app. It gives metadata about the asset (such as its
   * name and type) and provides facilities to load the asset data.
   */
  class Asset {
    static byHash = {};
    static byUri = {};
    /**
    * The name of the asset file without the extension. Also without the part from `@` onward in the
    * filename (used to specify scale factor for images).
    */
    /**
    * The extension of the asset filename.
    */

    /**
    * The MD5 hash of the asset's data.
    */
    hash = null;
    /**
    * A URI that points to the asset's data on the remote server. When running the published version
    * of your app, this refers to the location on Expo's asset server where Expo has stored your
    * asset. When running the app from Expo CLI during development, this URI points to Expo CLI's
    * server running on your computer and the asset is served directly from your computer. If you
    * are not using Classic Updates (legacy), this field should be ignored as we ensure your assets
    * are on device before running your application logic.
    */

    /**
    * If the asset has been downloaded (by calling [`downloadAsync()`](#downloadasync)), the
    * `file://` URI pointing to the local file on the device that contains the asset data.
    */
    localUri = null;
    /**
    * If the asset is an image, the width of the image data divided by the scale factor. The scale
    * factor is the number after `@` in the filename, or `1` if not present.
    */
    width = null;
    /**
    * If the asset is an image, the height of the image data divided by the scale factor. The scale factor is the number after `@` in the filename, or `1` if not present.
    */
    height = null;
    downloading = false;
    /**
    * Whether the asset has finished downloading from a call to [`downloadAsync()`](#downloadasync).
    */
    downloaded = false;
    _downloadCallbacks = [];
    constructor({
      name,
      type,
      hash = null,
      uri,
      width,
      height
    }) {
      this.name = name;
      this.type = type;
      this.hash = hash;
      this.uri = uri;
      if (typeof width === 'number') {
        this.width = width;
      }
      if (typeof height === 'number') {
        this.height = height;
      }
      if (hash) {
        this.localUri = (0, _LocalAssets.getLocalAssetUri)(hash, type);
        if (this.localUri?.startsWith(ANDROID_EMBEDDED_URL_BASE_RESOURCE)) {
          // Treat Android embedded resources as not downloaded state, because the uri is not direct accessible.
          this.uri = this.localUri;
          this.localUri = null;
        } else if (this.localUri) {
          this.downloaded = true;
        }
      }
      {
        if (!name) {
          this.name = AssetUris.getFilename(uri);
        }
        if (!type) {
          this.type = AssetUris.getFileExtension(uri);
        }
      }
    }
    // @needsAudit
    /**
    * A helper that wraps `Asset.fromModule(module).downloadAsync` for convenience.
    * @param moduleId An array of `require('path/to/file')` or external network URLs. Can also be
    * just one module or URL without an Array.
    * @return Returns a Promise that fulfills with an array of `Asset`s when the asset(s) has been
    * saved to disk.
    * @example
    * ```ts
    * const [{ localUri }] = await Asset.loadAsync(require('./assets/snack-icon.png'));
    * ```
    */
    static loadAsync(moduleId) {
      const moduleIds = Array.isArray(moduleId) ? moduleId : [moduleId];
      return Promise.all(moduleIds.map(moduleId => Asset.fromModule(moduleId).downloadAsync()));
    }
    // @needsAudit
    /**
    * Returns the [`Asset`](#asset) instance representing an asset given its module or URL.
    * @param assetModule The value of `require('path/to/file')` for the asset or external
    * network URL
    * @return The [`Asset`](#asset) instance for the asset.
    */
    static fromModule(assetModule) {
      if (typeof assetModule === 'string') {
        return Asset.fromURI(assetModule);
      }
      if (isVirtualAsset(assetModule)) {
        const extension = AssetUris.getFileExtension(assetModule.uri);
        return new Asset({
          name: '',
          type: extension.startsWith('.') ? extension.substring(1) : extension,
          hash: null,
          uri: assetModule.uri,
          width: assetModule.width,
          height: assetModule.height
        });
      }
      const meta = AssetRegistry.default.getAssetByID(assetModule);
      if (!meta) {
        throw new Error(`Module "${assetModule}" is missing from the asset registry`);
      }
      // Outside of the managed env we need the moduleId to initialize the asset
      // because resolveAssetSource depends on it
      if (!_PlatformUtils.IS_ENV_WITH_LOCAL_ASSETS) {
        // null-check is performed above with `getAssetByID`.
        const {
          uri
        } = (0, resolveAssetSource.default)(assetModule);
        const asset = new Asset({
          name: meta.name,
          type: meta.type,
          hash: meta.hash,
          uri,
          width: meta.width,
          height: meta.height
        });
        // For images backward compatibility,
        // keeps localUri the same as uri for React Native's Image that
        // works fine with drawable resource names.

        Asset.byHash[meta.hash] = asset;
        return asset;
      }
      return Asset.fromMetadata(meta);
    }
    // @docsMissing
    static fromMetadata(meta) {
      // The hash of the whole asset, not to be confused with the hash of a specific file returned
      // from `selectAssetSource`
      const metaHash = meta.hash;
      const assetByHash = Asset.byHash[metaHash];
      if (assetByHash) {
        return assetByHash;
      }
      const {
        uri,
        hash
      } = (0, _AssetSources.selectAssetSource)(meta);
      const asset = new Asset({
        name: meta.name,
        type: meta.type,
        hash,
        uri,
        width: meta.width,
        height: meta.height
      });
      Asset.byHash[metaHash] = asset;
      return asset;
    }
    // @docsMissing
    static fromURI(uri) {
      if (Asset.byUri[uri]) {
        return Asset.byUri[uri];
      }
      // Possibly a Base64-encoded URI
      let type = '';
      if (uri.indexOf(';base64') > -1) {
        type = uri.split(';')[0]?.split('/')[1] ?? '';
      } else {
        const extension = AssetUris.getFileExtension(uri);
        type = extension.startsWith('.') ? extension.substring(1) : extension;
      }
      const asset = new Asset({
        name: '',
        type,
        hash: null,
        uri
      });
      Asset.byUri[uri] = asset;
      return asset;
    }
    // @needsAudit
    /**
    * Downloads the asset data to a local file in the device's cache directory. Once the returned
    * promise is fulfilled without error, the [`localUri`](#localuri) field of this asset points
    * to a local file containing the asset data. The asset is only downloaded if an up-to-date local
    * file for the asset isn't already present due to an earlier download. The downloaded `Asset`
    * will be returned when the promise is resolved.
    *
    * > **Note:** There is no guarantee that files downloaded via `downloadAsync` persist between app sessions.
    * `downloadAsync` stores files in the caches directory, so it's up to the OS to clear this folder at its
    * own discretion or when the user manually purges the caches directory. Downloaded assets are stored as
    * `ExponentAsset-{cacheFileId}.{extension}` within the cache directory.
    * > To manually clear cached assets, you can use [`expo-file-system`](./filesystem/) to
    * delete the cache directory: `Paths.cache.delete()` or use the legacy API `deleteAsync(cacheDirectory)`.
    *
    * @return Returns a Promise which fulfills with an `Asset` instance.
    */
    async downloadAsync() {
      if (this.downloaded) {
        return this;
      }
      if (this.downloading) {
        await new Promise((resolve, reject) => {
          this._downloadCallbacks.push({
            resolve,
            reject
          });
        });
        return this;
      }
      this.downloading = true;
      try {
        {
          if (ImageAssets.isImageType(this.type)) {
            const {
              width,
              height,
              name
            } = await ImageAssets.getImageInfoAsync(this.uri);
            this.width = width;
            this.height = height;
            this.name = name;
          } else {
            this.name = AssetUris.getFilename(this.uri);
          }
        }
        this.localUri = await (0, _ExpoAsset.downloadAsync)(this.uri, this.hash, this.type);
        this.downloaded = true;
        this._downloadCallbacks.forEach(({
          resolve
        }) => resolve());
      } catch (e) {
        this._downloadCallbacks.forEach(({
          reject
        }) => reject(e));
        throw e;
      } finally {
        this.downloading = false;
        this._downloadCallbacks = [];
      }
      return this;
    }
  }
},1450,[372,303,1451,1455,1456,1457,1458,1454,1459]);
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
  exports.selectAssetSource = selectAssetSource;
  exports.resolveUri = resolveUri;
  require(_dependencyMap[0]);
  var _expoInternalBundleOrigin = require(_dependencyMap[1]);
  var _reactNativeWebDistExportsPixelRatio = require(_dependencyMap[2]);
  var PixelRatio = _interopDefault(_reactNativeWebDistExportsPixelRatio);
  var _reactNativeWebDistExportsNativeModules = require(_dependencyMap[3]);
  var NativeModules = _interopDefault(_reactNativeWebDistExportsNativeModules);
  var _AssetSourceResolver = require(_dependencyMap[4]);
  var AssetSourceResolver = _interopDefault(_AssetSourceResolver);
  var _PlatformUtils = require(_dependencyMap[5]);
  function resolveDevServerUrl(manifest2) {
    const bundleOrigin = (0, _expoInternalBundleOrigin.getBundleOrigin)();
    if (bundleOrigin) {
      return bundleOrigin;
    }
    const debuggerHost = manifest2.extra?.expoGo?.debuggerHost;
    if (!debuggerHost) {
      return null;
    }
    const scheme = _PlatformUtils.manifestBaseUrl?.startsWith('https://') ? 'https://' : 'http://';
    return scheme + debuggerHost;
  }
  /**
   * Selects the best file for the given asset (ex: choosing the best scale for images) and returns
   * a { uri, hash } pair for the specific asset file.
   *
   * If the asset isn't an image with multiple scales, the first file is selected.
   */
  function selectAssetSource(meta) {
    // This logic is based on that of AssetSourceResolver, with additional support for file hashes and
    // explicitly provided URIs
    const scale = AssetSourceResolver.default.pickScale(meta.scales, PixelRatio.default.get());
    const index = meta.scales.findIndex(s => s === scale);
    const hash = meta.fileHashes?.[index] ?? meta.fileHashes?.[0] ?? meta.hash;
    // Allow asset processors to directly provide the URL to load
    const uri = meta.fileUris ? meta.fileUris[index] ?? meta.fileUris[0] : meta.uri;
    if (uri) {
      return {
        uri: resolveUri(uri),
        hash
      };
    }
    const fileScale = scale === 1 ? '' : `@${scale}x`;
    const fileExtension = meta.type ? `.${encodeURIComponent(meta.type)}` : '';
    const suffix = `/${encodeURIComponent(meta.name)}${fileScale}${fileExtension}`;
    const params = new URLSearchParams({
      platform: "web",
      hash: meta.hash
    });
    // For assets with a specified absolute URL, we use the existing origin instead of prepending the
    // development server or production CDN URL origin
    if (/^https?:\/\//.test(meta.httpServerLocation)) {
      const uri = meta.httpServerLocation + suffix + '?' + params;
      return {
        uri,
        hash
      };
    }
    // For assets during development using manifest2, we use the development server's URL origin
    const manifest2 = (0, _PlatformUtils.getManifest2)();
    const devServerUrl = manifest2?.extra?.expoGo?.developer ? resolveDevServerUrl(manifest2) : null;
    if (devServerUrl) {
      const baseUrl = new URL(meta.httpServerLocation + suffix, devServerUrl);
      baseUrl.searchParams.set('platform', "web");
      baseUrl.searchParams.set('hash', meta.hash);
      return {
        uri: baseUrl.href,
        hash
      };
    }
    // Temporary fallback for loading assets in Expo Go home
    if (NativeModules.default['ExponentKernel']) {
      return {
        uri: `https://classic-assets.eascdn.net/~assets/${encodeURIComponent(hash)}`,
        hash
      };
    }
    // In correctly configured apps, we arrive here if the asset is locally available on disk due to
    // being managed by expo-updates, and `getLocalAssetUri(hash)` must return a local URI for this
    // hash. Since the asset is local, we don't have a remote URL and specify an invalid URL (an empty
    // string) as a placeholder.
    return {
      uri: '',
      hash
    };
  }
  /**
   * Resolves the given URI to an absolute URI. If the given URI is already an absolute URI, it is
   * simply returned. Otherwise, if it is a relative URI, it is resolved relative to the manifest's
   * base URI.
   */
  function resolveUri(uri) {
    // `manifestBaseUrl` is always an absolute URL or `null`.
    return _PlatformUtils.manifestBaseUrl ? new URL(uri, _PlatformUtils.manifestBaseUrl).href : uri;
  }
},1451,[372,1452,270,183,1453,1454]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  Object.defineProperty(exports, "getBundleUrl", {
    enumerable: true,
    get: function () {
      return _getBundleUrl.getBundleUrl;
    }
  });
  exports.getBundleOrigin = getBundleOrigin;
  var _getBundleUrl = require(_dependencyMap[0]);
  // Copyright 2015-present 650 Industries. All rights reserved.

  /**
   * Origin the running bundle was served from, or `null` when it wasn't served over HTTP.
   *
   * This is the address the runtime actually reached, so it stays correct when a development server is
   * reached through an address it can't observe itself, such as a proxy or a tunnel. It's the value to
   * build other development server requests from, in place of an address the server reports for itself.
   *
   * A bundle loaded from disk has a `file:` URL, which is no address to resolve anything against.
   */
  function getBundleOrigin(bundleUrl = (0, _getBundleUrl.getBundleUrl)()) {
    if (!bundleUrl) {
      return null;
    }
    try {
      const {
        protocol,
        origin
      } = new URL(bundleUrl);
      // e.g. http://localhost:8081
      return protocol === 'http:' || protocol === 'https:' ? origin : null;
    } catch {
      return null;
    }
  }
},1452,[648]);
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
      return AssetSourceResolver;
    }
  });
  require(_dependencyMap[0]);
  var _reactNativeWebDistExportsPixelRatio = require(_dependencyMap[1]);
  var PixelRatio = _interopDefault(_reactNativeWebDistExportsPixelRatio);
  // Returns the Metro dev server-specific asset location.
  function getScaledAssetPath(asset) {
    const scale = AssetSourceResolver.pickScale(asset.scales, PixelRatio.default.get());
    const scaleSuffix = scale === 1 ? '' : '@' + scale + 'x';
    const type = !asset.type ? '' : `.${asset.type}`;
    {
      return asset.httpServerLocation.replace(/\.\.\//g, '_') + '/' + asset.name + scaleSuffix + type;
    }
  }
  class AssetSourceResolver {
    // where the jsbundle is being run from
    // NOTE(EvanBacon): Never defined on web.
    // @ts-expect-error: Never read locally

    // the asset to resolve

    constructor(serverUrl, jsbundleUrl, asset) {
      this.serverUrl = serverUrl || 'https://expo.dev';
      this.jsbundleUrl = null;
      this.asset = asset;
    }
    // Always true for web runtimes
    isLoadedFromServer() {
      return true;
    }
    // Always false for web runtimes
    isLoadedFromFileSystem() {
      return false;
    }
    defaultAsset() {
      return this.assetServerURL();
    }
    /**
    * @returns absolute remote URL for the hosted asset.
    */
    assetServerURL() {
      const fromUrl = new URL(getScaledAssetPath(this.asset), this.serverUrl);
      fromUrl.searchParams.set('platform', "web");
      fromUrl.searchParams.set('hash', this.asset.hash);
      return this.fromSource(
      // Relative on web
      fromUrl.toString().replace(fromUrl.origin, ''));
    }
    fromSource(source) {
      return {
        __packager_asset: true,
        width: this.asset.width ?? undefined,
        height: this.asset.height ?? undefined,
        uri: source,
        scale: AssetSourceResolver.pickScale(this.asset.scales, PixelRatio.default.get())
      };
    }
    static pickScale(scales, deviceScale) {
      for (const scale of scales) {
        if (scale >= deviceScale) {
          return scale;
        }
      }
      return scales[scales.length - 1] || 1;
    }
  }
},1453,[372,270]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  Object.defineProperty(exports, "IS_ENV_WITH_LOCAL_ASSETS", {
    enumerable: true,
    get: function () {
      return IS_ENV_WITH_LOCAL_ASSETS;
    }
  });
  exports.getLocalAssets = getLocalAssets;
  exports.getManifest2 = getManifest2;
  Object.defineProperty(exports, "manifestBaseUrl", {
    enumerable: true,
    get: function () {
      return manifestBaseUrl;
    }
  });
  const IS_ENV_WITH_LOCAL_ASSETS = false;
  function getLocalAssets() {
    return {};
  }
  function getManifest2() {
    return {};
  }
  // Compute manifest base URL if available
  const manifestBaseUrl = null;
},1454,[]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  exports.getFilename = getFilename;
  exports.getFileExtension = getFileExtension;
  exports.getManifestBaseUrl = getManifestBaseUrl;
  function getFilename(url) {
    const {
      pathname,
      searchParams
    } = new URL(url, 'https://e');
    // When attached to a dev server, we use `unstable_path` to represent the file path. This ensures
    // the file name is not canonicalized by the browser.
    // NOTE(EvanBacon): This is technically not tied to `__DEV__` as it's possible to use this while bundling in production
    // mode.

    return getBasename(pathname);
  }
  function getBasename(pathname) {
    return pathname.substring(pathname.lastIndexOf('/') + 1);
  }
  function getFileExtension(url) {
    const filename = getFilename(url);
    const dotIndex = filename.lastIndexOf('.');
    // Ignore leading dots for hidden files
    return dotIndex > 0 ? filename.substring(dotIndex) : '';
  }
  /**
   * Returns the base URL from a manifest's URL. For example, given a manifest hosted at
   * https://example.com/app/manifest.json, the base URL would be https://example.com/app/. Query
   * parameters and fragments also are removed.
   *
   * For an Expo-hosted project with a manifest hosted at https://exp.host/@user/project/index.exp, the
   * base URL would be https://exp.host/@user/project.
   *
   * We also normalize the "exp" protocol to "http" to handle internal URLs with the Expo schemes used
   * to tell the OS to open the URLs in the Expo client.
   */
  function getManifestBaseUrl(manifestUrl) {
    const urlObject = new URL(manifestUrl);
    let nextProtocol = urlObject.protocol;
    // Change the scheme to http(s) if it is exp(s)
    if (nextProtocol === 'exp:') {
      nextProtocol = 'http:';
    } else if (nextProtocol === 'exps:') {
      nextProtocol = 'https:';
    }
    urlObject.protocol = nextProtocol;
    // Trim filename, query parameters, and fragment, if any
    const directory = urlObject.pathname.substring(0, urlObject.pathname.lastIndexOf('/') + 1);
    urlObject.pathname = directory;
    urlObject.search = '';
    urlObject.hash = '';
    // The URL spec doesn't allow for changing the protocol to `http` or `https`
    // without a port set so instead, we'll just swap the protocol manually.
    return urlObject.protocol !== nextProtocol ? urlObject.href.replace(urlObject.protocol, nextProtocol) : urlObject.href;
  }
},1455,[]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  exports.downloadAsync = downloadAsync;
  async function downloadAsync(url, _hash, _type) {
    return url;
  }
},1456,[]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  exports.isImageType = isImageType;
  exports.getImageInfoAsync = getImageInfoAsync;
  var _AssetUris = require(_dependencyMap[0]);
  /* eslint-env browser */
  function isImageType(type) {
    return /^(jpeg|jpg|gif|png|bmp|webp|heic)$/i.test(type);
  }
  function getImageInfoAsync(url) {
    if (typeof window === 'undefined') {
      return Promise.resolve({
        name: (0, _AssetUris.getFilename)(url),
        width: 0,
        height: 0
      });
    }
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onerror = reject;
      img.onload = () => {
        resolve({
          name: (0, _AssetUris.getFilename)(url),
          width: img.naturalWidth,
          height: img.naturalHeight
        });
      };
      img.src = url;
    });
  }
},1457,[1455]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  exports.getLocalAssetUri = getLocalAssetUri;
  function getLocalAssetUri(hash, type) {
    // noop on web
    return null;
  }
},1458,[]);
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
  exports.setCustomSourceTransformer = setCustomSourceTransformer;
  Object.defineProperty(exports, "pickScale", {
    enumerable: true,
    get: function () {
      return pickScale;
    }
  });
  var _reactNativeWebDistExportsAssetRegistry = require(_dependencyMap[0]);
  var AssetRegistry = _interopDefault(_reactNativeWebDistExportsAssetRegistry);
  var _AssetSourceResolver = require(_dependencyMap[1]);
  var AssetSourceResolver = _interopDefault(_AssetSourceResolver);
  let _customSourceTransformer;
  function setCustomSourceTransformer(transformer) {
    _customSourceTransformer = transformer;
  }
  /**
   * `source` is either a number (opaque type returned by require('./foo.png'))
   * or an `ImageSource` like { uri: '<http location || file path>' }
   */
  function resolveAssetSource(source) {
    if (typeof source === 'object') {
      return source;
    }
    const asset = AssetRegistry.default.getAssetByID(source);
    if (!asset) {
      return null;
    }
    const resolver = new AssetSourceResolver.default(
    // Doesn't matter since this is removed on web
    'https://expo.dev', null, asset);
    if (_customSourceTransformer) {
      return _customSourceTransformer(resolver);
    }
    return resolver.defaultAsset();
  }
  Object.defineProperty(resolveAssetSource, 'setCustomSourceTransformer', {
    get() {
      return setCustomSourceTransformer;
    }
  });
  var _default = resolveAssetSource;
  const {
    pickScale
  } = AssetSourceResolver.default;
},1459,[303,1453]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  exports.useAssets = useAssets;
  var _react = require(_dependencyMap[0]);
  var _Asset = require(_dependencyMap[1]);
  // @needsAudit
  /**
   * Downloads and stores one or more assets locally.
   * After the assets are loaded, this hook returns a list of asset instances.
   * If something went wrong when loading the assets, an error is returned.
   *
   * > Note, the assets are not "reloaded" when you dynamically change the asset list.
   *
   * @return Returns an array containing:
   * - on the first position, a list of all loaded assets. If they aren't loaded yet, this value is
   *   `undefined`.
   * - on the second position, an error which encountered when loading the assets. If there was no
   *   error, this value is `undefined`.
   *
   * @example
   * ```tsx
   * const [assets, error] = useAssets([require('path/to/asset.jpg'), require('path/to/other.png')]);
   *
   * return assets ? <Image source={assets[0]} /> : null;
   * ```
   */
  function useAssets(moduleIds) {
    const [assets, setAssets] = (0, _react.useState)();
    const [error, setError] = (0, _react.useState)();
    (0, _react.useEffect)(() => {
      _Asset.Asset.loadAsync(moduleIds).then(setAssets).catch(setError);
    }, []);
    return [assets, error];
  }
},1460,[6,1450]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  exports.normalizeWeight = normalizeWeight;
  exports.normalizeStyle = normalizeStyle;
  exports.resolveFaceWeight = resolveFaceWeight;
  exports.resolveFaceStyle = resolveFaceStyle;
  exports.assertValidFontFaces = assertValidFontFaces;
  exports.assertValidFontFamilyDefinitions = assertValidFontFamilyDefinitions;
  var _expoAsset = require(_dependencyMap[0]);
  var _expoModulesCore = require(_dependencyMap[1]);
  // Converts a declared weight to the single number native face selection needs. A value that
  // doesn't map to one number — a web-only range like '100 900', or garbage — returns undefined,
  // so native resolves the weight from the font file: a static font keeps its embedded weight,
  // and on Android a variable font keeps its whole `wght` axis.
  function normalizeWeight(weight) {
    if (weight == null) {
      return undefined;
    }
    if (typeof weight === 'number') {
      return Number.isFinite(weight) ? weight : undefined;
    }
    const lower = weight.trim().toLowerCase();
    if (lower === 'normal') {
      return 400;
    }
    if (lower === 'bold') {
      return 700;
    }
    const numeric = Number(lower);
    return Number.isFinite(numeric) ? numeric : undefined;
  }
  function normalizeStyle(style) {
    if (style == null) {
      return undefined;
    }
    // Case-insensitive like the CSS keyword web receives, so 'Italic' slants on every platform.
    const lower = style.trim().toLowerCase();
    return lower === 'italic' || lower === 'oblique' ? 'italic' : 'normal';
  }
  function resourceFromPath(path) {
    if (path instanceof _expoAsset.Asset || typeof path === 'string' || typeof path === 'number') {
      return undefined;
    }
    return path;
  }
  // Use this everywhere a face's weight is read, so native and web don't drift.
  function resolveFaceWeight(face) {
    return face.weight ?? resourceFromPath(face.path)?.weight;
  }
  function resolveFaceStyle(face) {
    return face.style ?? resourceFromPath(face.path)?.style;
  }
  function assertValidFontFaces(fontFamily, fontDefinitions) {
    if (typeof fontFamily !== 'string' || fontFamily.length === 0) {
      throw new _expoModulesCore.CodedError(`ERR_FONT_API`, `Expected a non-empty string for \`fontFamily\`, instead got ${JSON.stringify(fontFamily)}. Set \`fontFamily\` to the name to use as the \`fontFamily\` style prop.`);
    }
    if (!Array.isArray(fontDefinitions) || fontDefinitions.length === 0) {
      throw new _expoModulesCore.CodedError(`ERR_FONT_API`, `No font faces were provided for font family "${fontFamily}". Set \`fontDefinitions\` to a non-empty array of \`FontFaceDefinition\`s.`);
    }
    // This check compares declared values only. Native resolves an undeclared value from the font
    // file at load time, and Android rejects resolved duplicates there. Web defaults an undeclared
    // descriptor per CSS, and the web loader warns about effective duplicates in dev.
    const seenFaces = new Set();
    for (const face of fontDefinitions) {
      if (typeof face !== 'object' || face === null || face.path == null) {
        throw new _expoModulesCore.CodedError(`ERR_FONT_API`, `A face of font family "${fontFamily}" has no \`path\`. Set the face's \`path\` to a \`FontSource\`.`);
      }
      const weight = normalizeWeight(resolveFaceWeight(face));
      const style = normalizeStyle(resolveFaceStyle(face));
      if (weight === undefined || style === undefined) {
        continue;
      }
      const key = `${weight}/${style}`;
      if (seenFaces.has(key)) {
        throw new _expoModulesCore.CodedError(`ERR_FONT_API`, `Font family "${fontFamily}" declares two faces with weight ${weight} and style "${style}". Give each face a distinct weight or style so the correct face is selected at render time.`);
      }
      seenFaces.add(key);
    }
  }
  function assertValidFontFamilyDefinitions(definitions) {
    const seenFamilies = new Set();
    for (const definition of definitions) {
      if (typeof definition !== 'object' || definition === null || Array.isArray(definition) || !('fontFamily' in definition) || !('fontDefinitions' in definition)) {
        throw new _expoModulesCore.CodedError(`ERR_FONT_API`, `Expected an object with \`fontFamily\` and \`fontDefinitions\`, instead got ${JSON.stringify(definition)}. Set each array element to \`{ fontFamily, fontDefinitions }\`.`);
      }
      const {
        fontFamily
      } = definition;
      if (seenFamilies.has(fontFamily)) {
        throw new _expoModulesCore.CodedError(`ERR_FONT_API`, `Font family "${fontFamily}" is declared more than once in this \`loadAsync\` call. Declare each \`fontFamily\` once, with all of its faces in one \`fontDefinitions\` array.`);
      }
      seenFamilies.add(fontFamily);
    }
  }
},1461,[1448,372]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  exports.fontSourceFromFace = fontSourceFromFace;
  var _expoAsset = require(_dependencyMap[0]);
  var _fontFaceValidation = require(_dependencyMap[1]);
  function fontSourceFromFace(face) {
    const {
      path,
      display
    } = face;
    const weight = (0, _fontFaceValidation.resolveFaceWeight)(face);
    const style = (0, _fontFaceValidation.resolveFaceStyle)(face);
    if (path instanceof _expoAsset.Asset) {
      return {
        uri: path.uri,
        ...(weight !== undefined ? {
          weight
        } : null),
        ...(style !== undefined ? {
          style
        } : null),
        ...(display !== undefined ? {
          display
        } : null)
      };
    }
    const base = typeof path === 'string' || typeof path === 'number' ? {
      uri: path
    } : path;
    return {
      ...base,
      weight,
      style,
      display: display ?? base.display
    };
  }
},1462,[1448,1461]);
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
  Object.defineProperty(exports, "loadPromises", {
    enumerable: true,
    get: function () {
      return loadPromises;
    }
  });
  exports.markLoaded = markLoaded;
  exports.isLoadedInCache = isLoadedInCache;
  exports.isLoadedNative = isLoadedNative;
  exports.purgeFontFamilyFromCache = purgeFontFamilyFromCache;
  exports.purgeCache = purgeCache;
  var _ExpoFontLoader = require(_dependencyMap[0]);
  var ExpoFontLoader = _interopDefault(_ExpoFontLoader);
  const loadPromises = {};
  // cache the value on the js side for fast access to the fonts that are loaded
  let cache = {};
  function markLoaded(fontFamily) {
    cache[fontFamily] = true;
  }
  function isLoadedInCache(fontFamily) {
    return fontFamily in cache;
  }
  function isLoadedNative(fontFamily) {
    if (isLoadedInCache(fontFamily)) {
      return true;
    } else {
      const loadedNativeFonts = ExpoFontLoader.default.getLoadedFonts();
      // NOTE(brentvatne): Bail out here if there are no loaded fonts. This
      // is functionally equivalent to the behavior below if the returned array
      // is empty, but this handles improper mocking of `getLoadedFonts`.
      if (!loadedNativeFonts?.length) {
        return false;
      }
      loadedNativeFonts.forEach(font => {
        cache[font] = true;
      });
      return fontFamily in cache;
    }
  }
  function purgeFontFamilyFromCache(fontFamily) {
    delete cache[fontFamily];
  }
  function purgeCache() {
    cache = {};
  }
},1463,[1445]);
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
  Object.defineProperty(exports, "withServerContext", {
    enumerable: true,
    get: function () {
      return _serverContext.withServerContext;
    }
  });
  exports.getServerResources = getServerResources;
  exports.getServerResourceDescriptors = getServerResourceDescriptors;
  exports.registerStaticFont = registerStaticFont;
  var _expoModulesCore = require(_dependencyMap[0]);
  var _ExpoFontLoader = require(_dependencyMap[1]);
  var ExpoFontLoader = _interopDefault(_ExpoFontLoader);
  var _FontLoader = require(_dependencyMap[2]);
  var _serverContext = require(_dependencyMap[3]);
  /**
   * @returns the server resources that should be statically extracted.
   * @private
   */
  function getServerResources() {
    if (!ExpoFontLoader.default.getServerResources) {
      throw new _expoModulesCore.UnavailabilityError('expo-font', 'getServerResources');
    }
    return ExpoFontLoader.default.getServerResources();
  }
  function getServerResourceDescriptors() {
    if (!ExpoFontLoader.default.getServerResourceDescriptors) {
      throw new _expoModulesCore.UnavailabilityError('expo-font', 'getServerResourceDescriptors');
    }
    return ExpoFontLoader.default.getServerResourceDescriptors();
  }
  function registerStaticFont(fontFamily, source) {
    // MUST BE A SYNC FUNCTION!
    if (!source) {
      throw new _expoModulesCore.CodedError(`ERR_FONT_SOURCE`, `Cannot load null or undefined font source: { "${fontFamily}": ${source} }. Expected asset of type \`FontSource\` for fontFamily of name: "${fontFamily}"`);
    }
    const asset = (0, _FontLoader.getAssetForSource)(source);
    (0, _FontLoader.loadSingleFontAsync)(fontFamily, asset);
  }
},1464,[372,1445,1447,1446]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  Object.defineProperty(exports, "FontDisplay", {
    enumerable: true,
    get: function () {
      return FontDisplay;
    }
  });
  // @needsAudit
  /**
   * Sets the [font-display](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display)
   * for a given typeface. The default font value on web is `FontDisplay.AUTO`.
   * Even though setting the `fontDisplay` does nothing on native platforms, the default behavior
   * emulates `FontDisplay.SWAP` on flagship devices like iOS, Samsung, Pixel, etc. Default
   * functionality varies on One Plus devices. In the browser this value is set in the generated
   * `@font-face` CSS block and not as a style property meaning you cannot dynamically change this
   * value based on the element it's used in.
   * @platform web
   */
  var FontDisplay = /*#__PURE__*/function (FontDisplay) {
    /**
    * __(Default)__ The font display strategy is defined by the user agent or platform.
    * This generally defaults to the text being invisible until the font is loaded.
    * Good for buttons or banners that require a specific treatment.
    */
    FontDisplay["AUTO"] = "auto";
    /**
    * Fallback text is rendered immediately with a default font while the desired font is loaded.
    * This is good for making the content appear to load instantly and is usually preferred.
    */
    FontDisplay["SWAP"] = "swap";
    /**
    * The text will be invisible until the font has loaded. If the font fails to load then nothing
    * will appear - it's best to turn this off when debugging missing text.
    */
    FontDisplay["BLOCK"] = "block";
    /**
    * Splits the behavior between `SWAP` and `BLOCK`.
    * There will be a [100ms timeout](https://developers.google.com/web/updates/2016/02/font-display?hl=en)
    * where the text with a custom font is invisible, after that the text will either swap to the
    * styled text or it'll show the unstyled text and continue to load the custom font. This is good
    * for buttons that need a custom font but should also be quickly available to screen-readers.
    */
    FontDisplay["FALLBACK"] = "fallback";
    /**
    * This works almost identically to `FALLBACK`, the only difference is that the browser will
    * decide to load the font based on slow connection speed or critical resource demand.
    */
    FontDisplay["OPTIONAL"] = "optional";
    return FontDisplay;
  }({});
},1465,[]);
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
  exports.renderToImageAsync = renderToImageAsync;
  var _expoModulesCore = require(_dependencyMap[0]);
  var _reactNativeWebDistExportsProcessColor = require(_dependencyMap[1]);
  var processColor = _interopDefault(_reactNativeWebDistExportsProcessColor);
  var _ExpoFontUtils = require(_dependencyMap[2]);
  var ExpoFontUtils = _interopDefault(_ExpoFontUtils);
  /**
   * Creates an image with provided text.
   * @param glyphs Text to be exported.
   * @param options RenderToImageOptions.
   * @return Promise which fulfils with image metadata.
   * @platform android
   * @platform ios
   */
  async function renderToImageAsync(glyphs, options) {
    if (!ExpoFontUtils.default) {
      throw new _expoModulesCore.UnavailabilityError('expo-font', 'ExpoFontUtils.renderToImageAsync');
    }
    return await ExpoFontUtils.default.renderToImageAsync(glyphs, {
      ...options,
      color: options?.color ? (0, processColor.default)(options.color) : undefined
    });
  }
},1466,[372,124,1467]);
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
  var _expoModulesCore = require(_dependencyMap[0]);
  class ExpoFontUtils extends _expoModulesCore.NativeModule {
    async renderToImageAsync(glyphs, options) {
      throw new _expoModulesCore.UnavailabilityError('expo-font', 'renderToImageAsync');
    }
  }
  var _default = (0, _expoModulesCore.registerWebModule)(ExpoFontUtils, 'ExpoFontUtils');
},1467,[372]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  Object.defineProperty(exports, "useFonts", {
    enumerable: true,
    get: function () {
      return useFonts;
    }
  });
  var _react = require(_dependencyMap[0]);
  var _Font = require(_dependencyMap[1]);
  function isMapLoaded(map) {
    if (typeof map === 'string') {
      return (0, _Font.isLoaded)(map);
    } else if (Array.isArray(map)) {
      return map.every(definition => {
        const fontFamily = definition?.fontFamily;
        return typeof fontFamily === 'string' && (0, _Font.isLoaded)(fontFamily);
      });
    } else {
      return Object.keys(map).every(fontFamily => (0, _Font.isLoaded)(fontFamily));
    }
  }
  function useRuntimeFonts(map) {
    const [loaded, setLoaded] = (0, _react.useState)(
    // For web rehydration, we need to check if the fonts are already loaded during the static render.
    // Native will also benefit from this optimization.
    isMapLoaded(map));
    const [error, setError] = (0, _react.useState)(null);
    (0, _react.useEffect)(() => {
      let isMounted = true;
      (0, _Font.loadAsync)(map).then(() => {
        if (isMounted) {
          setLoaded(true);
        }
      }).catch(error => {
        if (isMounted) {
          setError(error);
        }
      });
      return () => {
        isMounted = false;
      };
    }, []);
    return [loaded, error];
  }
  function useStaticFonts(map) {
    (0, _Font.loadAsync)(map);
    return [true, null];
  }
  // @needsAudit
  /**
   * Load a map of fonts at runtime with [`loadAsync`](#loadasyncfontfamilyorfontmap-source). This returns `true` if the fonts are
   * loaded and ready to use. It also returns an error if something went wrong, to use in development.
   *
   * > Note, the fonts are not "reloaded" when you dynamically change the font map.
   *
   * > A `fontFamily` loads once. Declare all of its faces in the same `useFonts` call. A later
   * > call for an already-loaded `fontFamily` adds none of its faces, even if that call lists more.
   *
   * @param map A map of `fontFamily`s to [`FontSource`](#fontsource)s, or an array of
   * [`FontFamilyDefinition`](#fontfamilydefinition)s for loading multiple faces (for example
   * different weights or an italic cut) per family. After loading the font you can use the
   * `fontFamily` name in the `fontFamily` style prop of a `Text` element.
   *
   * @return
   * - __loaded__ (`boolean`) - A boolean to detect if the font for `fontFamily` has finished
   * loading.
   * - __error__ (`Error | null`) - An error encountered when loading the fonts.
   *
   * @example
   * ```tsx
   * const [loaded, error] = useFonts({
   *   'Inter-Black': require('./assets/fonts/Inter-Black.otf'),
   * });
   * ```
   *
   * On web, loading multiple weights or styles of the same family lets the browser select the
   * correct face with the CSS `font-weight` and `font-style` properties:
   * ```tsx
   * const [loaded, error] = useFonts([
   *   {
   *     fontFamily: 'Inter',
   *     fontDefinitions: [
   *       { path: require('./assets/fonts/Inter-Regular.otf'), weight: 400 },
   *       { path: require('./assets/fonts/Inter-Italic.otf'), weight: 400, style: 'italic' },
   *       { path: require('./assets/fonts/Inter-Bold.otf'), weight: 700 },
   *     ],
   *   },
   * ]);
   * ```
   */
  const useFonts = typeof window === 'undefined' ? useStaticFonts : useRuntimeFonts;
},1468,[6,1444]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  Object.defineProperty(exports, "DatabaseInitializer", {
    enumerable: true,
    get: function () {
      return DatabaseInitializer;
    }
  });
  exports.initializeDatabaseOnStartup = initializeDatabaseOnStartup;
  var _utilsLoggerLogger = require(_dependencyMap[0]);
  var _DatabaseProvider = require(_dependencyMap[1]);
  class DatabaseInitializer {
    isInitialized = false;
    static getInstance() {
      if (!DatabaseInitializer.instance) {
        DatabaseInitializer.instance = new DatabaseInitializer();
      }
      return DatabaseInitializer.instance;
    }
    async initializeDatabase() {
      if (this.isInitialized) {
        return;
      }
      try {
        const db = (0, _DatabaseProvider.getDatabaseInstance)();
        await this.forceResetDatabaseQueue(db);
        const isResponsive = await this.testInitialDatabaseHealth(db);
        if (!isResponsive) {
          (0, _utilsLoggerLogger.warn)("Database appears to be unresponsive, attempting recovery...");
          await this.attemptDatabaseRecovery(db);
        }
        this.isInitialized = true;
        (0, _utilsLoggerLogger.debug)("🍉 Database initialization completed successfully");
      } catch (err) {
        (0, _utilsLoggerLogger.error)(`Database initialization failed: ${err}`);
        throw err;
      }
    }
    async forceResetDatabaseQueue(db) {
      try {
        (0, _utilsLoggerLogger.debug)("🍉 Force resetting database queue...");
        const resetPromise = db.write(async () => {
          // Empty write operation to flush the queue
        });
        await Promise.race([resetPromise, new Promise((_, reject) => {
          setTimeout(() => {
            reject(new Error("Queue reset timeout"));
          }, 3000);
        })]);
        (0, _utilsLoggerLogger.debug)("🍉 Database queue reset completed");
      } catch (err) {
        (0, _utilsLoggerLogger.warn)(`Database queue reset failed: ${err}`);
        (0, _utilsLoggerLogger.warn)("🍉 Database may start with degraded performance");
      }
    }
    async testInitialDatabaseHealth(db) {
      try {
        const startTime = Date.now();
        const testPromise = db.collections.get('news').query().fetchCount();
        const timeoutPromise = new Promise((_, reject) => {
          setTimeout(() => {
            reject(new Error("Database health check timeout"));
          }, 5000);
        });
        await Promise.race([testPromise, timeoutPromise]);
        const duration = Date.now() - startTime;
        (0, _utilsLoggerLogger.debug)(`🍉 Database health check passed (${duration}ms)`);
        return duration < 3000; // Consider healthy if under 3 seconds
      } catch (err) {
        (0, _utilsLoggerLogger.error)(`Database health check failed: ${err}`);
        return false;
      }
    }
    async attemptDatabaseRecovery(db) {
      try {
        info("🍉 Attempting database recovery...");
        const recoveryPromise = db.write(async () => {
          const collections = ['news', 'homework', 'grades', 'subjects'];
          for (const collectionName of collections) {
            try {
              await db.collections.get(collectionName).query().fetch();
            } catch (err) {
              (0, _utilsLoggerLogger.warn)(`Failed to read from ${collectionName}: ${err}`);
            }
          }
        });
        await Promise.race([recoveryPromise, new Promise((_, reject) => {
          setTimeout(() => {
            reject(new Error("Recovery timeout"));
          }, 10000);
        })]);
        info("🍉 Database recovery completed");
      } catch (err) {
        (0, _utilsLoggerLogger.error)(`Database recovery failed: ${err}`);
      }
    }
    isReady() {
      return this.isInitialized;
    }
  }
  async function initializeDatabaseOnStartup() {
    const initializer = DatabaseInitializer.getInstance();
    await initializer.initializeDatabase();
  }
},1469,[1116,1246]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  Object.defineProperty(exports, "useCalendarWidgetFeed", {
    enumerable: true,
    get: function () {
      return useCalendarWidgetFeed;
    }
  });
  const useCalendarWidgetFeed = () => undefined;
},1470,[]);
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
  Object.defineProperty(exports, "usePapillonKitSettingsSync", {
    enumerable: true,
    get: function () {
      return usePapillonKitSettingsSync;
    }
  });
  var _getpapillonPapillonkit = require(_dependencyMap[0]);
  var PapillonKit = _interopNamespace(_getpapillonPapillonkit);
  var _react = require(_dependencyMap[1]);
  var _storesSettings = require(_dependencyMap[2]);
  var _utilsLoggerLogger = require(_dependencyMap[3]);
  const useSettingsSync = () => {
    const liveActivitiesEnabled = (0, _storesSettings.useSettingsStore)(state => state.personalization.liveActivitiesEnabled);
    const liveActivityTestMode = (0, _storesSettings.useSettingsStore)(state => state.personalization.liveActivityTestMode);
    const fontFamily = (0, _storesSettings.useSettingsStore)(state => state.personalization.fontFamily);
    const language = (0, _storesSettings.useSettingsStore)(state => state.personalization.language);
    const colorSelected = (0, _storesSettings.useSettingsStore)(state => state.personalization.colorSelected);
    const mounted = (0, _react.useRef)(false);
    (0, _react.useEffect)(() => {
      if (!mounted.current) {
        mounted.current = true;
        return;
      }
      PapillonKit.refresh().catch(error => (0, _utilsLoggerLogger.warn)(`PapillonKit refresh failed: ${error}`));
    }, [liveActivitiesEnabled, liveActivityTestMode, fontFamily, language, colorSelected]);
  };
  const usePapillonKitSettingsSync = PapillonKit.isSupported ? useSettingsSync : () => {};
},1471,[1019,6,1012,1116]);