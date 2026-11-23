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
      return TabLayout;
    }
  });
  var _componentsBottomAccessory = require(_dependencyMap[0]);
  var _storesAccount = require(_dependencyMap[1]);
  var _storesSettings = require(_dependencyMap[2]);
  var _uiUtilsIsLiquidGlass = require(_dependencyMap[3]);
  var _uiUtilsResizable = require(_dependencyMap[4]);
  var useResizable = _interopDefault(_uiUtilsResizable);
  var _expoRouterReactNavigation = require(_dependencyMap[5]);
  var _expoRouterNativeTabs = require(_dependencyMap[6]);
  var _reactI18next = require(_dependencyMap[7]);
  require(_dependencyMap[8]);
  require(_dependencyMap[9]);
  var _utilsThemeFonts = require(_dependencyMap[10]);
  var _uiComponentsMainTabErrorBoundary = require(_dependencyMap[11]);
  var MainTabErrorBoundary = _interopDefault(_uiComponentsMainTabErrorBoundary);
  var _reactJsxRuntime = require(_dependencyMap[12]);
  // Static platform detection - computed once at module load
  const IS_IOS_WITH_PADDING = false;
  const IS_ANDROID = false;
  function TabLayoutContent() {
    const theme = (0, _expoRouterReactNavigation.useTheme)();
    const font = (0, _utilsThemeFonts.useFont)();
    const {
      t
    } = (0, _reactI18next.useTranslation)();
    const {
      isLarge
    } = (0, useResizable.default)();
    const settingsStore = (0, _storesSettings.useSettingsStore)(state => state.personalization);
    const lastUsedAccount = (0, _storesAccount.useAccountStore)(state => state.lastUsedAccount);
    const disabledTabs = (lastUsedAccount ? settingsStore?.disabledTabsByAccount?.[lastUsedAccount] : settingsStore?.disabledTabs) || [];
    const iOSBottomAccessoryEnabled = settingsStore?.iOSBottomAccessoryEnabled ?? true;
    const showTabBarLabels = settingsStore?.showTabBarLabels ?? true;
    const labelsHidden = false;
    const isBottomAccessoryVisible = (0, _componentsBottomAccessory.useBottomAccessoryVisible)();
    const tabLabelStyle = {
      fontFamily: font("medium"),
      fontSize: 13,
      color: undefined
    };
    const shouldRenderBottomAccessory = false;
    return /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_expoRouterNativeTabs.NativeTabs, {
      tintColor: theme.colors.tint,
      labelStyle: tabLabelStyle,
      labelVisibilityMode: showTabBarLabels ? "labeled" : "unlabeled",
      rippleColor: theme.colors.tint + '22',
      backgroundColor: undefined,
      sidebarAdaptable: true,
      minimizeBehavior: "never",
      disableTransparentOnScrollEdge: true,
      titlePositionAdjustment: _uiUtilsIsLiquidGlass.runsIOS26 ? {
        vertical: 0,
        horizontal: 0
      } : undefined,
      children: [shouldRenderBottomAccessory, /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_expoRouterNativeTabs.NativeTabs.Trigger, {
        name: "index",
        hidden: disabledTabs.includes('home'),
        children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoRouterNativeTabs.NativeTabs.Trigger.Label, {
          hidden: labelsHidden,
          children: t("Tab_Home")
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoRouterNativeTabs.NativeTabs.Trigger.Icon, {
          src: require(_dependencyMap[13]),
          renderingMode: "template"
        })]
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_expoRouterNativeTabs.NativeTabs.Trigger, {
        name: "calendar",
        hidden: disabledTabs.includes('calendar'),
        children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoRouterNativeTabs.NativeTabs.Trigger.Label, {
          hidden: labelsHidden,
          children: t("Tab_Calendar")
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoRouterNativeTabs.NativeTabs.Trigger.Icon, {
          src: require(_dependencyMap[14]),
          renderingMode: "template"
        })]
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_expoRouterNativeTabs.NativeTabs.Trigger, {
        name: "tasks",
        hidden: disabledTabs.includes('tasks'),
        children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoRouterNativeTabs.NativeTabs.Trigger.Label, {
          hidden: labelsHidden,
          children: t("Tab_Tasks")
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoRouterNativeTabs.NativeTabs.Trigger.Icon, {
          src: require(_dependencyMap[15]),
          renderingMode: "template"
        })]
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_expoRouterNativeTabs.NativeTabs.Trigger, {
        name: "grades",
        hidden: disabledTabs.includes('grades'),
        children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoRouterNativeTabs.NativeTabs.Trigger.Label, {
          hidden: labelsHidden,
          children: t("Tab_Grades")
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoRouterNativeTabs.NativeTabs.Trigger.Icon, {
          src: require(_dependencyMap[16]),
          renderingMode: "template"
        })]
      })]
    });
  }
  function TabLayout() {
    return /*#__PURE__*/(0, _reactJsxRuntime.jsx)(MainTabErrorBoundary.default, {
      children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(TabLayoutContent, {})
    });
  }
},929,[1378,1022,1012,1215,1409,1000,1379,1105,193,104,1217,1141,97,1405,1406,1407,1408]);
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
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return _default;
    }
  });
  exports.useBottomAccessoryVisible = useBottomAccessoryVisible;
  var _appTabsIndexHooksUseTimetableWidgetData = require(_dependencyMap[0]);
  var _uiComponentsIcon = require(_dependencyMap[1]);
  var Icon = _interopDefault(_uiComponentsIcon);
  var _uiNewTypography = require(_dependencyMap[2]);
  var Typography = _interopDefault(_uiNewTypography);
  var _utilsI18n = require(_dependencyMap[3]);
  var i18n = _interopDefault(_utilsI18n);
  var _utilsSubjectsColors = require(_dependencyMap[4]);
  var _utilsSubjectsEmoji = require(_dependencyMap[5]);
  var _utilsSubjectsName = require(_dependencyMap[6]);
  var _getpapillonPapicons = require(_dependencyMap[7]);
  var _expoRouterReactNavigation = require(_dependencyMap[8]);
  var _dateFns = require(_dependencyMap[9]);
  var _dateFnsLocale = require(_dependencyMap[10]);
  var DateLocale = _interopNamespace(_dateFnsLocale);
  var _expoRouter = require(_dependencyMap[11]);
  var _expoRouterNativeTabs = require(_dependencyMap[12]);
  require(_dependencyMap[13]);
  require(_dependencyMap[14]);
  var _reactNativeWebDistExportsPressable = require(_dependencyMap[15]);
  var Pressable = _interopDefault(_reactNativeWebDistExportsPressable);
  var _reactNativeWebDistExportsView = require(_dependencyMap[16]);
  var View = _interopDefault(_reactNativeWebDistExportsView);
  var _reactNativeLinearGradient = require(_dependencyMap[17]);
  var LinearGradient = _interopDefault(_reactNativeLinearGradient);
  var _uiComponentsErrorBoundary = require(_dependencyMap[18]);
  var _databaseUseTimetable = require(_dependencyMap[19]);
  var _reactJsxRuntime = require(_dependencyMap[20]);
  function NextCourseAccessory({
    placement
  }) {
    {
      return null;
    }
    const theme = (0, _expoRouterReactNavigation.useTheme)();
    const {
      courses,
      loading
    } = (0, _appTabsIndexHooksUseTimetableWidgetData.useTimetableWidgetData)();
    const nextCourse = courses.length > 0 ? courses[0] : null;

    // if (placement === 'inline') {}

    const sbjColor = nextCourse ? (0, _utilsSubjectsColors.getSubjectColor)(nextCourse.subject) : theme.colors.primary;
    const nextCourseDay = nextCourse ? (0, _dateFns.startOfDay)(nextCourse.from) : null;
    const daysUntilNextCourse = nextCourseDay ? (0, _dateFns.differenceInCalendarDays)(nextCourseDay, (0, _dateFns.startOfDay)(new Date())) : 0;
    const getNextCourseDistance = addSuffix => {
      if (!nextCourse) {
        return '';
      }
      if (daysUntilNextCourse >= 1) {
        return (0, _dateFns.formatDistanceToNowStrict)(nextCourseDay, {
          locale: DateLocale[i18n.default.language] || DateLocale.enUS,
          addSuffix,
          unit: 'day',
          roundingMethod: "ceil"
        });
      }
      return (0, _dateFns.formatDistanceToNowStrict)(nextCourse.from, {
        locale: DateLocale[i18n.default.language] || DateLocale.enUS,
        addSuffix
      });
    };
    if (loading) return null;
    if (!nextCourse) return null;
    return /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_reactJsxRuntime.Fragment, {
      children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoRouter.Link, {
        href: {
          pathname: "/(modals)/course/[id]",
          params: {
            id: (0, _databaseUseTimetable.getCourseRouteId)(nextCourse)
          }
        },
        asChild: true,
        children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoRouter.Link.AppleZoom, {
          children: /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(Pressable.default, {
            style: {
              height: "100%",
              paddingVertical: 10,
              paddingHorizontal: 14,
              alignItems: "center",
              justifyContent: "flex-start",
              flexDirection: "row",
              gap: 10
            },
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(View.default, {
              style: {
                backgroundColor: sbjColor,
                height: "100%",
                width: 6,
                borderRadius: 5
              }
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "h4",
              children: (0, _utilsSubjectsEmoji.getSubjectEmoji)(nextCourse.subject)
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(View.default, {
              style: {
                flex: 1,
                gap: 0
              },
              children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
                variant: "title",
                numberOfLines: 1,
                children: (0, _utilsSubjectsName.getSubjectName)(nextCourse?.subject)
              }), placement === 'inline' ? /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(View.default, {
                style: {
                  marginTop: -2,
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 6,
                  width: "100%",
                  overflow: "hidden"
                },
                children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Icon.default, {
                  size: 14,
                  fill: sbjColor,
                  children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
                    name: "Clock"
                  })
                }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
                  variant: "body2",
                  weight: "semibold",
                  color: sbjColor,
                  numberOfLines: 1,
                  children: getNextCourseDistance(true)
                })]
              }) : /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(View.default, {
                style: {
                  marginTop: -2,
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 3,
                  width: "100%",
                  overflow: "hidden"
                },
                children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Icon.default, {
                  size: 14,
                  opacity: 0.5,
                  children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
                    name: "MapPin"
                  })
                }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
                  variant: "body2",
                  weight: "semibold",
                  color: "textSecondary",
                  numberOfLines: 1,
                  children: nextCourse?.room
                }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(View.default, {
                  style: {
                    width: 3,
                    height: 3,
                    borderRadius: 8,
                    backgroundColor: theme.colors.text,
                    opacity: 0.5,
                    marginHorizontal: 6
                  }
                }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Icon.default, {
                  size: 14,
                  opacity: 0.5,
                  children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
                    name: "User"
                  })
                }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
                  variant: "body2",
                  weight: "semibold",
                  color: "textSecondary",
                  numberOfLines: 1,
                  children: nextCourse?.teacher
                })]
              })]
            }), placement !== 'inline' && /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(View.default, {
              style: {
                marginTop: -2,
                flexDirection: "row",
                alignItems: "center",
                gap: 6
              },
              children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Icon.default, {
                size: 14,
                fill: sbjColor,
                children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
                  name: "Clock"
                })
              }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
                variant: "body1",
                weight: "semibold",
                color: sbjColor,
                children: getNextCourseDistance(false)
              })]
            })]
          })
        })
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(LinearGradient.default, {
        colors: [sbjColor, sbjColor + '00'],
        start: {
          x: 1,
          y: 0
        },
        end: {
          x: 0,
          y: 0
        },
        style: {
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: "100%",
          zIndex: -1,
          opacity: 0.3
        }
      })]
    });
  }
  function BottomAccessory() {
    const placement = _expoRouterNativeTabs.NativeTabs.BottomAccessory.usePlacement();
    return /*#__PURE__*/(0, _reactJsxRuntime.jsx)(NextCourseAccessory, {
      placement: placement
    });
  }
  const BottomAccessoryWithBoundary = () => /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_uiComponentsErrorBoundary.ErrorBoundary, {
    fallback: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactJsxRuntime.Fragment, {}),
    children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(BottomAccessory, {})
  });
  var _default = BottomAccessoryWithBoundary;
  function useBottomAccessoryVisible() {
    const {
      courses,
      loading
    } = (0, _appTabsIndexHooksUseTimetableWidgetData.useTimetableWidgetData)();
    {
      return false;
    }
    if (loading) {
      return false;
    }
    return courses.length > 0;
  }
},1378,[970,1013,1008,1127,1142,1226,1225,1002,1000,1220,1221,1023,1379,6,193,334,198,1222,1410,1224,97]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  0;
  function _export(target, all) {
    for (var name in all) Object.defineProperty(target, name, {
      enumerable: true,
      get: Object.getOwnPropertyDescriptor(all, name).get
    });
  }
  _export(exports, {
    get NativeTabTrigger() {
      return _NativeTabTrigger.NativeTabTrigger;
    },
    get NativeTabs() {
      return _NativeTabs.NativeTabs;
    },
    get createNativeTabsProps() {
      return _NativeBottomTabsNavigator.createNativeTabsProps;
    }
  });
  const _NativeTabTrigger = require(_dependencyMap[0]);
  const _NativeTabs = require(_dependencyMap[1]);
  const _NativeBottomTabsNavigator = require(_dependencyMap[2]);
},1379,[786,1380,1381]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  // We need this file to re-export the navigator
  // Otherwise rsc would fail
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, "NativeTabs", {
    enumerable: true,
    get: function () {
      return NativeTabs;
    }
  });
  function _jsxruntime() {
    const data = require(_dependencyMap[0]);
    _jsxruntime = function () {
      return data;
    };
    return data;
  }
  const _NativeBottomTabsNavigator = require(_dependencyMap[1]);
  const _NativeTabTrigger = require(_dependencyMap[2]);
  const _elements = require(_dependencyMap[3]);
  const _hooks = require(_dependencyMap[4]);
  const BottomAccessory = Object.assign(_elements.NativeTabsBottomAccessory, {
    usePlacement: _hooks.usePlacement
  });
  const NativeTabs = Object.assign(props => {
    return /*#__PURE__*/(0, _jsxruntime().jsx)(_NativeBottomTabsNavigator.NativeTabsNavigatorWrapper, {
      ...props
    });
  }, {
    Trigger: _NativeTabTrigger.NativeTabTrigger,
    BottomAccessory
  });
},1380,[97,1381,786,787,1404]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use client';
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  0;
  function _export(target, all) {
    for (var name in all) Object.defineProperty(target, name, {
      enumerable: true,
      get: Object.getOwnPropertyDescriptor(all, name).get
    });
  }
  _export(exports, {
    get NativeTabsContext() {
      return NativeTabsContext;
    },
    get NativeTabsNavigatorWrapper() {
      return NativeTabsNavigatorWrapper;
    },
    get createNativeTabsProps() {
      return createNativeTabsProps;
    }
  });
  function _jsxruntime() {
    const data = require(_dependencyMap[0]);
    _jsxruntime = function () {
      return data;
    };
    return data;
  }
  function _react() {
    const data = /*#__PURE__*/_interop_require_wildcard(require(_dependencyMap[1]));
    _react = function () {
      return data;
    };
    return data;
  }
  const _createBaseTabProps = require(_dependencyMap[2]);
  const _native = require(_dependencyMap[3]);
  const _standardnavigation = require(_dependencyMap[4]);
  const _appendMissingPlaceholderTabRoutes = require(_dependencyMap[5]);
  const _useNonStackAnchorWarning = require(_dependencyMap[6]);
  const _usePreloadPlaceholderRoutes = require(_dependencyMap[7]);
  const _useReconcileTabHistory = require(_dependencyMap[8]);
  const _useVisibleTabsWithRedirect = require(_dependencyMap[9]);
  const _children = require(_dependencyMap[10]);
  const _NativeBottomTabsRouter = require(_dependencyMap[11]);
  const _NativeTabTrigger = require(_dependencyMap[12]);
  const _NativeTabsView = require(_dependencyMap[13]);
  const _utils = require(_dependencyMap[14]);
  function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function (nodeInterop) {
      return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
  }
  function _interop_require_wildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
      return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
      return {
        default: obj
      };
    }
    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) {
      return cache.get(obj);
    }
    var newObj = {
      __proto__: null
    };
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var key in obj) {
      if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
        var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
        if (desc && (desc.get || desc.set)) {
          Object.defineProperty(newObj, key, desc);
        } else {
          newObj[key] = obj[key];
        }
      }
    }
    newObj.default = obj;
    if (cache) {
      cache.set(obj, newObj);
    }
    return newObj;
  }
  // In Jetpack Compose, the default back behavior is to go back to the initial route.
  const defaultBackBehavior = 'initialRoute';
  const NativeTabsContext = /*#__PURE__*/_react().default.createContext(false);
  function createNativeTabsProps(args) {
    const {
      dispatchSync
    } = args;
    return {
      ...(0, _createBaseTabProps.createBaseTabProps)(args),
      navigateSync: name => dispatchSync(_native.CommonActions.navigate(name))
    };
  }
  function NativeTabsContent({
    state,
    routeNames,
    descriptors,
    actions: _actions,
    emitter,
    preload,
    navigateSync,
    isPreloaded: _isPreloaded,
    isRemovalPrevented: _isRemovalPrevented,
    tabConfigurationKey,
    // These per-tab style props are folded into `screenOptions` by `NativeTabsNavigatorWrapper` and
    // read back per-tab from `descriptors`. Pull them out of `rest` so they aren't forwarded to
    // `NativeTabsView` as top-level props.
    labelStyle,
    iconColor,
    backgroundColor,
    badgeBackgroundColor,
    blurEffect,
    indicatorColor,
    badgeTextColor,
    rippleColor,
    disableIndicator,
    labelVisibilityMode,
    ...rest
  }) {
    (0, _useReconcileTabHistory.useReconcileTabHistory)();
    if ((0, _react().use)(NativeTabsContext)) {
      throw new Error('Nesting Native Tabs inside each other is not supported natively. Use JS tabs for nesting instead.');
    }
    (0, _useNonStackAnchorWarning.useNonStackAnchorWarning)(rest.backBehavior);
    const {
      routes
    } = state;
    const {
      visibleRoutes,
      focusedIndex,
      focusedFallbackRoute
    } = (0, _useVisibleTabsWithRedirect.useVisibleTabsWithRedirect)({
      routes,
      routeNames,
      focusedRouteKey: routes[state.index]?.key,
      descriptors
    });
    const visibleTabs = (0, _react().useMemo)(() => visibleRoutes.map(route => ({
      options: descriptors[route.key].options,
      name: route.name,
      routeKey: route.key,
      contentRenderer: () => descriptors[route.key].render()
    })), [descriptors, visibleRoutes]);
    (0, _usePreloadPlaceholderRoutes.usePreloadPlaceholderRoutes)({
      routes: visibleRoutes,
      descriptors,
      preload,
      lazyByDefault: false
    });
    const provenanceRef = (0, _react().useRef)(0);
    const onTabChange = (0, _react().useCallback)(({
      selectedKey,
      provenance,
      isNativeAction,
      isPrevented = false
    }) => {
      if (isPrevented) {
        // The native side blocked selecting a disabled tab. Notify listeners, but
        // don't advance navigation or acknowledge a (non-existent) state transition,
        // so the provenance counter is left untouched.
        emitter.emit({
          type: 'tabPress',
          target: routes.find(route => route.name === selectedKey)?.key ?? selectedKey,
          data: {
            __internalTabsType: 'native',
            isPrevented: true
          }
        });
        return;
      }
      // We should always send the last provenance we got from native side
      provenanceRef.current = provenance;
      if (isNativeAction) {
        const selectedRoute = routes.find(route => route.name === selectedKey);
        if (!selectedRoute) {
          return;
        }
        emitter.emit({
          type: 'tabPress',
          target: selectedRoute.key,
          data: {
            __internalTabsType: 'native',
            isPrevented: false
          }
        });
        navigateSync(selectedRoute.name);
      }
    }, [routes, navigateSync, emitter]);
    // Compile-time guard: everything spread onto `<NativeTabsView>` must be a prop it declares. The
    // `Record<…, never>` turns any prop the view doesn't accept into a type error here instead of
    // letting it leak silently through the spread.
    const nativeTabsViewProps = rest;
    if (focusedFallbackRoute) {
      return descriptors[focusedFallbackRoute.key]?.render() ?? null;
    }
    if (visibleTabs.length === 0 || focusedIndex < 0) {
      return null;
    }
    return /*#__PURE__*/(0, _jsxruntime().jsx)(NativeTabsContext, {
      value: true,
      children: /*#__PURE__*/(0, _react().createElement)(_NativeTabsView.NativeTabsView, {
        ...nativeTabsViewProps,
        key: tabConfigurationKey,
        focusedIndex: focusedIndex,
        // Provenance should only be sent with updates, and updates
        // on JS side are only triggered by rerender, so passing ref
        // here is ok.
        provenance: provenanceRef.current,
        tabs: visibleTabs,
        onTabChange: onTabChange
      })
    });
  }
  const NativeTabsNavigatorWithContext = (0, _standardnavigation.createStandardRouterNavigator)(NativeTabsContent, _NativeBottomTabsRouter.NativeBottomTabsRouter, {
    activityDefaultThreshold: 1,
    processDescriptors: _appendMissingPlaceholderTabRoutes.appendMissingPlaceholderTabDescriptors,
    processState: _appendMissingPlaceholderTabRoutes.appendMissingPlaceholderTabRoutes,
    createProps: createNativeTabsProps
  });
  function NativeTabsNavigatorWrapper(props) {
    const triggerChildren = (0, _react().useMemo)(() => (0, _children.getAllChildrenOfType)(props.children, _NativeTabTrigger.NativeTabTrigger).filter(child => !child.props.hidden), [props.children]);
    const nonTriggerChildren = (0, _react().useMemo)(() => (0, _children.getAllChildrenNotOfType)(props.children, _NativeTabTrigger.NativeTabTrigger), [props.children]);
    const tabConfigurationKey = triggerChildren.map(child => child.props.name).join(';');
    const {
      backBehavior = defaultBackBehavior,
      labelStyle,
      iconColor,
      blurEffect,
      backgroundColor,
      badgeBackgroundColor,
      indicatorColor,
      badgeTextColor,
      shadowColor,
      rippleColor,
      disableIndicator,
      labelVisibilityMode,
      tintColor,
      disableTransparentOnScrollEdge
    } = props;
    const screenOptions = (0, _react().useMemo)(() => {
      const processedLabelStyle = (0, _utils.convertLabelStylePropToObject)(labelStyle);
      const processedIconColor = (0, _utils.convertIconColorPropToObject)(iconColor);
      const selectedLabelStyle = processedLabelStyle.selected ? {
        ...processedLabelStyle.selected,
        color: processedLabelStyle.selected.color ?? tintColor
      } : tintColor ? {
        color: tintColor
      } : undefined;
      return {
        disableTransparentOnScrollEdge,
        labelStyle: processedLabelStyle.default,
        selectedLabelStyle,
        iconColor: processedIconColor.default,
        selectedIconColor: processedIconColor.selected ?? tintColor,
        blurEffect,
        backgroundColor,
        badgeBackgroundColor,
        indicatorColor,
        badgeTextColor,
        shadowColor,
        rippleColor,
        disableIndicator,
        labelVisibilityMode,
        tintColor
      };
    }, [labelStyle, iconColor, blurEffect, backgroundColor, badgeBackgroundColor, indicatorColor, badgeTextColor, shadowColor, rippleColor, disableIndicator, labelVisibilityMode, tintColor, disableTransparentOnScrollEdge]);
    return /*#__PURE__*/(0, _jsxruntime().jsx)(_standardnavigation.IsWithinNativeNavigator, {
      value: true,
      children: /*#__PURE__*/(0, _jsxruntime().jsx)(NativeTabsNavigatorWithContext, {
        ...props,
        children: triggerChildren,
        nonTriggerChildren: nonTriggerChildren,
        tabConfigurationKey: tabConfigurationKey,
        screenOptions: screenOptions,
        // Passed to TabRouter
        backBehavior: backBehavior
      })
    });
  }
},1381,[97,6,1411,501,784,1412,728,730,731,732,593,1382,786,1383,1402]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, "NativeBottomTabsRouter", {
    enumerable: true,
    get: function () {
      return NativeBottomTabsRouter;
    }
  });
  const _navigationParams = require(_dependencyMap[0]);
  const _native = require(_dependencyMap[1]);
  const _utils = require(_dependencyMap[2]);
  const zoomParamNames = [_navigationParams.INTERNAL_EXPO_ROUTER_ZOOM_TRANSITION_SCREEN_ID_PARAM_NAME, _navigationParams.INTERNAL_EXPO_ROUTER_ZOOM_TRANSITION_SOURCE_ID_PARAM_NAME];
  // TODO(@ubax): Simplify this logic, so it is clearer and easier to understand
  // At the moment this is needed to remove zoom params from current level and all nested levels
  // so that there is no zoom transition in tabs. Check if there are any better ways to address this
  // problem
  function removeZoomParamsFromState(state) {
    let changed = false;
    const routes = state.routes.map(route => {
      const hasZoomParams = route.params && zoomParamNames.some(paramName => paramName in route.params);
      const params = hasZoomParams ? (0, _navigationParams.removeParams)(route.params, zoomParamNames) : route.params;
      const childState = route.state ? removeZoomParamsFromState(route.state) : undefined;
      if (!hasZoomParams && childState === route.state) {
        return route;
      }
      changed = true;
      return {
        ...route,
        ...(hasZoomParams ? {
          params
        } : undefined),
        ...(childState ? {
          state: childState
        } : undefined)
      };
    });
    // The mapped routes preserve the input state's full or partial route shape.
    return changed ? {
      ...state,
      routes
    } : state;
  }
  function appendNoAnimationParamToFocusedRoutes(state) {
    const focusedIndex = state.index ?? state.routes.length - 1;
    const focusedRoute = state.routes[focusedIndex];
    if (!focusedRoute) {
      return state;
    }
    const childState = focusedRoute.state ? appendNoAnimationParamToFocusedRoutes(focusedRoute.state) : undefined;
    const routes = state.routes.map((route, index) => index === focusedIndex ? {
      ...route,
      params: (0, _navigationParams.appendInternalExpoRouterParams)(route.params, {
        [_navigationParams.INTERNAL_EXPO_ROUTER_NO_ANIMATION_PARAM_NAME]: true
      }),
      ...(childState ? {
        state: childState
      } : undefined)
    } : route);
    // The mapped routes preserve the input state's full or partial route shape.
    return {
      ...state,
      routes
    };
  }
  const NativeBottomTabsRouter = (0, _native.extendRouterActions)(_native.TabRouter, (state, action, {
    baseRouter
  }) => {
    switch (action.type) {
      case 'PUSH':
      case 'NAVIGATE':
        {
          const actionResult = baseRouter.getStateForAction(state, action);
          if (!(0, _utils.isActionHandled)(actionResult)) {
            return actionResult;
          }
          const newStateFromNavigation = actionResult.state;
          const focusedRouteKey = state.routes[state.index]?.key;
          const nextFocusedRouteKey = newStateFromNavigation.routes[newStateFromNavigation.index]?.key;
          const didTabChange = focusedRouteKey !== undefined && nextFocusedRouteKey !== undefined && focusedRouteKey !== nextFocusedRouteKey;
          const index = newStateFromNavigation.routes.findIndex(route => route.name === action.payload.name);
          if (index === -1) {
            return actionResult;
          }
          const newState = {
            ...newStateFromNavigation,
            routes: newStateFromNavigation.routes.map(route => {
              if (route.name !== action.payload.name) {
                return route;
              }
              const expoParams = (0, _navigationParams.getInternalExpoRouterParams)(action.payload.params);
              // Zoom transition needs to be disabled for navigation inside tabs
              // Otherwise user can end up in a situation where a view is missing on one tab
              // because it was used to perform zoom transition on another tab
              const params = (0, _navigationParams.removeParams)((0, _navigationParams.appendInternalExpoRouterParams)(route.params, expoParams), zoomParamNames);
              let childState = route.state ? removeZoomParamsFromState(route.state) : undefined;
              if (childState && didTabChange && action.payload.state?.__internal__routerActionState === true) {
                childState = appendNoAnimationParamToFocusedRoutes(childState);
              }
              return {
                ...route,
                ...(childState ? {
                  state: childState
                } : undefined),
                params
              };
            })
          };
          return {
            ...actionResult,
            state: newState
          };
        }
    }
    return _native.RouterActionHandling.Delegate;
  });
},1382,[464,501,439]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, "NativeTabsView", {
    enumerable: true,
    get: function () {
      return NativeTabsView;
    }
  });
  function _jsxruntime() {
    const data = require(_dependencyMap[0]);
    _jsxruntime = function () {
      return data;
    };
    return data;
  }
  function _reacttabs() {
    const data = require(_dependencyMap[1]);
    _reacttabs = function () {
      return data;
    };
    return data;
  }
  function _react() {
    const data = require(_dependencyMap[2]);
    _react = function () {
      return data;
    };
    return data;
  }
  const _nativetabsmodulecss = /*#__PURE__*/_interop_require_default(require(_dependencyMap[3]));
  function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
  function NativeTabsView(props) {
    const {
      tabs,
      focusedIndex
    } = props;
    const currentTab = tabs[focusedIndex];
    const defaultTab = (0, _react().useMemo)(() => currentTab,
    // We don't specify currentTab here, as we don't want to change the default tab when focusedIndex changes
    []);
    const value = currentTab.name;
    const items = tabs.map(tab => /*#__PURE__*/(0, _jsxruntime().jsx)(TabItem, {
      name: tab.name,
      title: tab.options.title ?? tab.name,
      badgeValue: tab.options.badgeValue
    }, tab.name));
    const children = tabs.map(tab => {
      return /*#__PURE__*/(0, _jsxruntime().jsx)(_reacttabs().TabsContent, {
        value: tab.name,
        className: _nativetabsmodulecss.default.tabContent,
        forceMount: true,
        children: tab.contentRenderer()
      }, tab.name);
    });
    return /*#__PURE__*/(0, _jsxruntime().jsxs)(_reacttabs().Tabs, {
      className: _nativetabsmodulecss.default.nativeTabsContainer,
      defaultValue: defaultTab.name,
      value: value,
      onValueChange: value => {
        props.onTabChange({
          selectedKey: value,
          provenance: 0,
          isNativeAction: true
        });
      },
      style: convertNativeTabsPropsToStyleVars(props, currentTab.options),
      children: [/*#__PURE__*/(0, _jsxruntime().jsx)(_reacttabs().TabsList, {
        "aria-label": "Main",
        className: _nativetabsmodulecss.default.navigationMenuRoot,
        children: items
      }), children]
    });
  }
  function TabItem(props) {
    const {
      title,
      badgeValue,
      name
    } = props;
    const isBadgeEmpty = badgeValue === ' ';
    return /*#__PURE__*/(0, _jsxruntime().jsxs)(_reacttabs().TabsTrigger, {
      value: name,
      className: _nativetabsmodulecss.default.navigationMenuTrigger,
      children: [/*#__PURE__*/(0, _jsxruntime().jsx)("span", {
        className: _nativetabsmodulecss.default.tabText,
        children: title
      }), badgeValue && /*#__PURE__*/(0, _jsxruntime().jsx)("div", {
        className: `${_nativetabsmodulecss.default.tabBadge} ${isBadgeEmpty ? _nativetabsmodulecss.default.emptyTabBadge : ''}`,
        children: badgeValue
      })]
    });
  }
  function convertNativeTabsPropsToStyleVars(props, currentTabOptions) {
    const vars = {};
    if (!props) {
      return vars;
    }
    const optionsLabelStyle = currentTabOptions?.labelStyle;
    if (optionsLabelStyle?.fontFamily) {
      vars['--expo-router-tabs-font-family'] = String(optionsLabelStyle.fontFamily);
    }
    if (optionsLabelStyle?.fontSize) {
      vars['--expo-router-tabs-font-size'] = String(optionsLabelStyle.fontSize);
    }
    if (optionsLabelStyle?.fontWeight) {
      vars['--expo-router-tabs-font-weight'] = String(optionsLabelStyle.fontWeight);
    }
    if (optionsLabelStyle?.fontStyle) {
      vars['--expo-router-tabs-font-style'] = String(optionsLabelStyle.fontStyle);
    }
    if (optionsLabelStyle?.color) {
      vars['--expo-router-tabs-text-color'] = String(optionsLabelStyle.color);
    }
    if (currentTabOptions?.selectedLabelStyle?.color) {
      vars['--expo-router-tabs-active-text-color'] = String(currentTabOptions?.selectedLabelStyle?.color);
    } else if (props.tintColor) {
      vars['--expo-router-tabs-active-text-color'] = String(props.tintColor);
    }
    if (currentTabOptions?.selectedLabelStyle?.fontSize) {
      vars['--expo-router-tabs-active-font-size'] = String(currentTabOptions?.selectedLabelStyle?.fontSize);
    }
    if (currentTabOptions?.indicatorColor) {
      vars['--expo-router-tabs-active-background-color'] = String(currentTabOptions.indicatorColor);
    }
    if (currentTabOptions?.backgroundColor) {
      vars['--expo-router-tabs-background-color'] = String(currentTabOptions.backgroundColor);
    }
    if (currentTabOptions?.badgeBackgroundColor) {
      vars['--expo-router-tabs-badge-background-color'] = String(currentTabOptions.badgeBackgroundColor);
    }
    if (currentTabOptions?.badgeTextColor) {
      vars['--expo-router-tabs-badge-text-color'] = String(currentTabOptions.badgeTextColor);
    }
    return vars;
  }
},1383,[97,1384,6,1401]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";
  "use client";

  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __name = (target, value) => __defProp(target, "name", {
    value,
    configurable: true
  });
  var __export = (target, all) => {
    for (var name in all) __defProp(target, name, {
      get: all[name],
      enumerable: true
    });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from)) if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
        get: () => from[key],
        enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
      });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
    value: mod,
    enumerable: true
  }) : target, mod));
  var __toCommonJS = mod => __copyProps(__defProp({}, "__esModule", {
    value: true
  }), mod);

  // src/index.ts
  var index_exports = {};
  __export(index_exports, {
    Content: () => TabsContent,
    List: () => TabsList,
    Root: () => Tabs,
    Tabs: () => Tabs,
    TabsContent: () => TabsContent,
    TabsList: () => TabsList,
    TabsTrigger: () => TabsTrigger,
    Trigger: () => TabsTrigger,
    createTabsScope: () => createTabsScope
  });
  module.exports = __toCommonJS(index_exports);

  // src/tabs.tsx
  var React = __toESM(require(_dependencyMap[0]));
  var import_primitive = require(_dependencyMap[1]);
  var import_react_context = require(_dependencyMap[2]);
  var import_react_roving_focus = require(_dependencyMap[3]);
  var import_react_presence = require(_dependencyMap[4]);
  var import_react_primitive = require(_dependencyMap[5]);
  var RovingFocusGroup = __toESM(require(_dependencyMap[3]));
  var import_react_direction = require(_dependencyMap[6]);
  var import_react_use_controllable_state = require(_dependencyMap[7]);
  var import_react_id = require(_dependencyMap[8]);
  var import_jsx_runtime = require(_dependencyMap[9]);
  var ActivationMode = {
    Automatic: "automatic",
    Manual: "manual"
  };
  var TABS_NAME = "Tabs";
  var [createTabsContext, createTabsScope] = (0, import_react_context.createContextScope)(TABS_NAME, [import_react_roving_focus.createRovingFocusGroupScope]);
  var useRovingFocusGroupScope = (0, import_react_roving_focus.createRovingFocusGroupScope)();
  var [TabsProvider, useTabsContext] = createTabsContext(TABS_NAME);
  var Tabs = /* @__PURE__ */React.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */
  __name(function Tabs2(props, forwardedRef) {
    const {
      __scopeTabs,
      value: valueProp,
      onValueChange,
      defaultValue,
      orientation = "horizontal",
      dir,
      activationMode = ActivationMode.Automatic,
      ...tabsProps
    } = props;
    const direction = (0, import_react_direction.useDirection)(dir);
    const [value, setValue] = (0, import_react_use_controllable_state.useControllableState)({
      prop: valueProp,
      onChange: onValueChange,
      defaultProp: defaultValue ?? "",
      caller: TABS_NAME
    });
    return /* @__PURE__ */(0, import_jsx_runtime.jsx)(TabsProvider, {
      scope: __scopeTabs,
      baseId: (0, import_react_id.useId)(),
      value,
      onValueChange: setValue,
      orientation,
      dir: direction,
      activationMode,
      children: /* @__PURE__ */(0, import_jsx_runtime.jsx)(import_react_primitive.Primitive.div, {
        dir: direction,
        "data-orientation": orientation,
        ...tabsProps,
        ref: forwardedRef
      })
    });
  }, "Tabs"));
  var TAB_LIST_NAME = "TabsList";
  var TabsList = /* @__PURE__ */React.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */
  __name(function TabsList2(props, forwardedRef) {
    const {
      __scopeTabs,
      loop = true,
      ...listProps
    } = props;
    const context = useTabsContext(TAB_LIST_NAME, __scopeTabs);
    const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeTabs);
    return /* @__PURE__ */(0, import_jsx_runtime.jsx)(RovingFocusGroup.Root, {
      asChild: true,
      ...rovingFocusGroupScope,
      orientation: context.orientation,
      dir: context.dir,
      loop,
      children: /* @__PURE__ */(0, import_jsx_runtime.jsx)(import_react_primitive.Primitive.div, {
        role: "tablist",
        "aria-orientation": context.orientation,
        ...listProps,
        ref: forwardedRef
      })
    });
  }, "TabsList"));
  var TRIGGER_NAME = "TabsTrigger";
  var TabsTrigger = /* @__PURE__ */React.forwardRef(/* @__PURE__ */__name(function TabsTrigger2(props, forwardedRef) {
    const {
      __scopeTabs,
      value,
      disabled = false,
      ...triggerProps
    } = props;
    const context = useTabsContext(TRIGGER_NAME, __scopeTabs);
    const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeTabs);
    const triggerId = makeTriggerId(context.baseId, value);
    const contentId = makeContentId(context.baseId, value);
    const isSelected = value === context.value;
    return /* @__PURE__ */(0, import_jsx_runtime.jsx)(RovingFocusGroup.Item, {
      asChild: true,
      ...rovingFocusGroupScope,
      focusable: !disabled,
      active: isSelected,
      children: /* @__PURE__ */(0, import_jsx_runtime.jsx)(import_react_primitive.Primitive.button, {
        type: "button",
        role: "tab",
        "aria-selected": isSelected,
        "aria-controls": contentId,
        "data-state": isSelected ? "active" : "inactive",
        "data-disabled": disabled ? "" : undefined,
        disabled,
        id: triggerId,
        ...triggerProps,
        ref: forwardedRef,
        onMouseDown: (0, import_primitive.composeEventHandlers)(props.onMouseDown, event => {
          if (!disabled && event.button === 0 && event.ctrlKey === false) {
            event.currentTarget.focus();
            context.onValueChange(value);
          } else {
            event.preventDefault();
          }
        }),
        onKeyDown: (0, import_primitive.composeEventHandlers)(props.onKeyDown, event => {
          if (disabled || event.target !== event.currentTarget) {
            return;
          }
          if ([" ", "Enter"].includes(event.key)) {
            context.onValueChange(value);
          }
        }),
        onFocus: (0, import_primitive.composeEventHandlers)(props.onFocus, () => {
          const isAutomaticActivation = context.activationMode !== ActivationMode.Manual;
          if (!isSelected && !disabled && isAutomaticActivation) {
            context.onValueChange(value);
          }
        })
      })
    });
  }, "TabsTrigger"));
  var CONTENT_NAME = "TabsContent";
  var TabsContent = /* @__PURE__ */React.forwardRef(/* @__PURE__ */__name(function TabsContent2(props, forwardedRef) {
    const {
      __scopeTabs,
      value,
      forceMount,
      children,
      ...contentProps
    } = props;
    const context = useTabsContext(CONTENT_NAME, __scopeTabs);
    const triggerId = makeTriggerId(context.baseId, value);
    const contentId = makeContentId(context.baseId, value);
    const isSelected = value === context.value;
    const isMountAnimationPreventedRef = React.useRef(isSelected);
    React.useEffect(() => {
      const rAF = requestAnimationFrame(() => isMountAnimationPreventedRef.current = false);
      return () => cancelAnimationFrame(rAF);
    }, []);
    return /* @__PURE__ */(0, import_jsx_runtime.jsx)(import_react_presence.Presence, {
      present: forceMount || isSelected,
      children: ({
        present
      }) => /* @__PURE__ */(0, import_jsx_runtime.jsx)(import_react_primitive.Primitive.div, {
        "data-state": isSelected ? "active" : "inactive",
        "data-orientation": context.orientation,
        role: "tabpanel",
        "aria-labelledby": triggerId,
        hidden: !present,
        id: contentId,
        tabIndex: 0,
        ...contentProps,
        ref: forwardedRef,
        style: {
          ...props.style,
          animationDuration: isMountAnimationPreventedRef.current ? "0s" : undefined
        },
        children: present && children
      })
    });
  }, "TabsContent"));
  function makeTriggerId(baseId, value) {
    return `${baseId}-trigger-${value}`;
  }
  __name(makeTriggerId, "makeTriggerId");
  function makeContentId(baseId, value) {
    return `${baseId}-content-${value}`;
  }
  __name(makeContentId, "makeContentId");
},1384,[6,1385,1386,1387,1400,1393,1398,1395,1392,97]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __name = (target, value) => __defProp(target, "name", {
    value,
    configurable: true
  });
  var __export = (target, all) => {
    for (var name in all) __defProp(target, name, {
      get: all[name],
      enumerable: true
    });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from)) if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
        get: () => from[key],
        enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
      });
    }
    return to;
  };
  var __toCommonJS = mod => __copyProps(__defProp({}, "__esModule", {
    value: true
  }), mod);

  // src/index.ts
  var index_exports = {};
  __export(index_exports, {
    canUseDOM: () => canUseDOM,
    composeEventHandlers: () => composeEventHandlers,
    getActiveElement: () => getActiveElement,
    getOwnerDocument: () => getOwnerDocument,
    getOwnerWindow: () => getOwnerWindow,
    isFrame: () => isFrame
  });
  module.exports = __toCommonJS(index_exports);

  // src/primitive.tsx
  var canUseDOM = !!(typeof window !== "undefined" && window.document && window.document.createElement);
  function composeEventHandlers(originalEventHandler, ourEventHandler, {
    checkForDefaultPrevented = true
  } = {}) {
    return /* @__PURE__ */__name(function handleEvent(event) {
      originalEventHandler?.(event);
      if (checkForDefaultPrevented === false || !event || !event.defaultPrevented) {
        return ourEventHandler?.(event);
      }
    }, "handleEvent");
  }
  __name(composeEventHandlers, "composeEventHandlers");
  function getOwnerWindow(element) {
    if (!canUseDOM) {
      throw new Error("Cannot access window outside of the DOM");
    }
    return element?.ownerDocument?.defaultView ?? window;
  }
  __name(getOwnerWindow, "getOwnerWindow");
  function getOwnerDocument(element) {
    if (!canUseDOM) {
      throw new Error("Cannot access document outside of the DOM");
    }
    return element?.ownerDocument ?? document;
  }
  __name(getOwnerDocument, "getOwnerDocument");
  function getActiveElement(node, activeDescendant = false) {
    const {
      activeElement
    } = getOwnerDocument(node);
    if (!activeElement?.nodeName) {
      return null;
    }
    if (isFrame(activeElement) && activeElement.contentDocument) {
      return getActiveElement(activeElement.contentDocument.body, activeDescendant);
    }
    if (activeDescendant) {
      const id = activeElement.getAttribute("aria-activedescendant");
      if (id) {
        const element = getOwnerDocument(activeElement).getElementById(id);
        if (element) {
          return element;
        }
      }
    }
    return activeElement;
  }
  __name(getActiveElement, "getActiveElement");
  function isFrame(element) {
    return element.tagName === "IFRAME";
  }
  __name(isFrame, "isFrame");
},1385,[]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __name = (target, value) => __defProp(target, "name", {
    value,
    configurable: true
  });
  var __export = (target, all) => {
    for (var name in all) __defProp(target, name, {
      get: all[name],
      enumerable: true
    });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from)) if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
        get: () => from[key],
        enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
      });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
    value: mod,
    enumerable: true
  }) : target, mod));
  var __toCommonJS = mod => __copyProps(__defProp({}, "__esModule", {
    value: true
  }), mod);

  // src/index.ts
  var index_exports = {};
  __export(index_exports, {
    createContext: () => createContext2,
    createContextScope: () => createContextScope
  });
  module.exports = __toCommonJS(index_exports);

  // src/create-context.tsx
  var React = __toESM(require(_dependencyMap[0]));
  var import_jsx_runtime = require(_dependencyMap[1]);
  // @__NO_SIDE_EFFECTS__
  function createContext2(rootComponentName, defaultContext) {
    const Context = React.createContext(defaultContext);
    Context.displayName = rootComponentName + "Context";
    const Provider = /* @__PURE__ */__name(props => {
      const {
        children,
        ...context
      } = props;
      const value = React.useMemo(() => context, Object.values(context));
      return /* @__PURE__ */(0, import_jsx_runtime.jsx)(Context.Provider, {
        value,
        children
      });
    }, "Provider");
    Provider.displayName = rootComponentName + "Provider";
    function useContext2(consumerName, options = {}) {
      const {
        optional = false
      } = options;
      const context = React.useContext(Context);
      if (context) return context;
      if (defaultContext !== undefined) return defaultContext;
      if (optional) return undefined;
      throw new Error(`\`${consumerName}\` must be used within \`${rootComponentName}\``);
    }
    __name(useContext2, "useContext");
    return [Provider, useContext2];
  }
  __name(createContext2, "createContext");
  // @__NO_SIDE_EFFECTS__
  function createContextScope(scopeName, createContextScopeDeps = []) {
    let defaultContexts = [];
    function createContext3(rootComponentName, defaultContext) {
      const BaseContext = React.createContext(defaultContext);
      BaseContext.displayName = rootComponentName + "Context";
      const index = defaultContexts.length;
      defaultContexts = [...defaultContexts, defaultContext];
      const Provider = /* @__PURE__ */__name(props => {
        const {
          scope,
          children,
          ...context
        } = props;
        const Context = scope?.[scopeName]?.[index] || BaseContext;
        const value = React.useMemo(() => context, Object.values(context));
        return /* @__PURE__ */(0, import_jsx_runtime.jsx)(Context.Provider, {
          value,
          children
        });
      }, "Provider");
      Provider.displayName = rootComponentName + "Provider";
      function useContext2(consumerName, scope, options = {}) {
        const {
          optional = false
        } = options;
        const Context = scope?.[scopeName]?.[index] || BaseContext;
        const context = React.useContext(Context);
        if (context) return context;
        if (defaultContext !== undefined) return defaultContext;
        if (optional) return undefined;
        throw new Error(`\`${consumerName}\` must be used within \`${rootComponentName}\``);
      }
      __name(useContext2, "useContext");
      return [Provider, useContext2];
    }
    __name(createContext3, "createContext");
    const createScope = /* @__PURE__ */__name(() => {
      const scopeContexts = defaultContexts.map(defaultContext => {
        return React.createContext(defaultContext);
      });
      return /* @__PURE__ */__name(function useScope(scope) {
        const contexts = scope?.[scopeName] || scopeContexts;
        return React.useMemo(() => ({
          [`__scope${scopeName}`]: {
            ...scope,
            [scopeName]: contexts
          }
        }), [scope, contexts]);
      }, "useScope");
    }, "createScope");
    createScope.scopeName = scopeName;
    return [createContext3, composeContextScopes(createScope, ...createContextScopeDeps)];
  }
  __name(createContextScope, "createContextScope");
  function composeContextScopes(...scopes) {
    const baseScope = scopes[0];
    if (scopes.length === 1) return baseScope;
    const createScope = /* @__PURE__ */__name(() => {
      const scopeHooks = scopes.map(createScope2 => ({
        useScope: createScope2(),
        scopeName: createScope2.scopeName
      }));
      return /* @__PURE__ */__name(function useComposedScopes(overrideScopes) {
        const nextScopes = scopeHooks.reduce((nextScopes2, {
          useScope,
          scopeName
        }) => {
          const scopeProps = useScope(overrideScopes);
          const currentScope = scopeProps[`__scope${scopeName}`];
          return {
            ...nextScopes2,
            ...currentScope
          };
        }, {});
        return React.useMemo(() => ({
          [`__scope${baseScope.scopeName}`]: nextScopes
        }), [nextScopes]);
      }, "useComposedScopes");
    }, "createScope");
    createScope.scopeName = baseScope.scopeName;
    return createScope;
  }
  __name(composeContextScopes, "composeContextScopes");
},1386,[6,97]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";
  "use client";

  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __name = (target, value) => __defProp(target, "name", {
    value,
    configurable: true
  });
  var __export = (target, all) => {
    for (var name in all) __defProp(target, name, {
      get: all[name],
      enumerable: true
    });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from)) if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
        get: () => from[key],
        enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
      });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
    value: mod,
    enumerable: true
  }) : target, mod));
  var __toCommonJS = mod => __copyProps(__defProp({}, "__esModule", {
    value: true
  }), mod);

  // src/index.ts
  var index_exports = {};
  __export(index_exports, {
    Item: () => RovingFocusGroupItem,
    Root: () => RovingFocusGroup,
    RovingFocusGroup: () => RovingFocusGroup,
    RovingFocusGroupItem: () => RovingFocusGroupItem,
    createRovingFocusGroupScope: () => createRovingFocusGroupScope
  });
  module.exports = __toCommonJS(index_exports);

  // src/roving-focus-group.tsx
  var React = __toESM(require(_dependencyMap[0]));
  var import_primitive = require(_dependencyMap[1]);
  var import_react_collection = require(_dependencyMap[2]);
  var import_react_compose_refs = require(_dependencyMap[3]);
  var import_react_context = require(_dependencyMap[4]);
  var import_react_id = require(_dependencyMap[5]);
  var import_react_primitive = require(_dependencyMap[6]);
  var import_react_use_callback_ref = require(_dependencyMap[7]);
  var import_react_use_controllable_state = require(_dependencyMap[8]);
  var import_react_direction = require(_dependencyMap[9]);
  var import_react_use_layout_effect = require(_dependencyMap[10]);
  var import_react_use_is_hydrated = require(_dependencyMap[11]);
  var import_jsx_runtime = require(_dependencyMap[12]);
  var ENTRY_FOCUS = "rovingFocusGroup.onEntryFocus";
  var EVENT_OPTIONS = {
    bubbles: false,
    cancelable: true
  };
  var GROUP_NAME = "RovingFocusGroup";
  var [Collection, useCollection, createCollectionScope] = (0, import_react_collection.createCollection)(GROUP_NAME);
  var [createRovingFocusGroupContext, createRovingFocusGroupScope] = (0, import_react_context.createContextScope)(GROUP_NAME, [createCollectionScope]);
  var Orientation = {
    Vertical: "vertical",
    Horizontal: "horizontal"
  };
  var Direction = {
    LTR: "ltr",
    RTL: "rtl"
  };
  var [RovingFocusProvider, useRovingFocusContext] = createRovingFocusGroupContext(GROUP_NAME);
  var RovingFocusGroup = /* @__PURE__ */React.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */
  __name(function RovingFocusGroup2(props, forwardedRef) {
    return /* @__PURE__ */(0, import_jsx_runtime.jsx)(Collection.Provider, {
      scope: props.__scopeRovingFocusGroup,
      children: /* @__PURE__ */(0, import_jsx_runtime.jsx)(Collection.Slot, {
        scope: props.__scopeRovingFocusGroup,
        children: /* @__PURE__ */(0, import_jsx_runtime.jsx)(RovingFocusGroupImpl, {
          ...props,
          ref: forwardedRef
        })
      })
    });
  }, "RovingFocusGroup"));
  var RovingFocusGroupImpl = /* @__PURE__ */React.forwardRef(/* @__PURE__ */__name(function RovingFocusGroupImpl2(props, forwardedRef) {
    const {
      __scopeRovingFocusGroup,
      orientation,
      loop = false,
      dir,
      currentTabStopId: currentTabStopIdProp,
      defaultCurrentTabStopId,
      onCurrentTabStopIdChange,
      onEntryFocus,
      preventScrollOnEntryFocus = false,
      ...groupProps
    } = props;
    const ref = React.useRef(null);
    const composedRefs = (0, import_react_compose_refs.useComposedRefs)(forwardedRef, ref);
    const direction = (0, import_react_direction.useDirection)(dir);
    const [currentTabStopId, setCurrentTabStopId] = (0, import_react_use_controllable_state.useControllableState)({
      prop: currentTabStopIdProp,
      defaultProp: defaultCurrentTabStopId ?? null,
      onChange: onCurrentTabStopIdChange,
      caller: GROUP_NAME
    });
    const [isTabbingBackOut, setIsTabbingBackOut] = React.useState(false);
    const handleEntryFocus = (0, import_react_use_callback_ref.useCallbackRef)(onEntryFocus);
    const getItems = useCollection(__scopeRovingFocusGroup);
    const isClickFocusRef = React.useRef(false);
    const [focusableItemsCount, setFocusableItemsCount] = React.useState(0);
    React.useEffect(() => {
      const node = ref.current;
      if (node) {
        node.addEventListener(ENTRY_FOCUS, handleEntryFocus);
        return () => node.removeEventListener(ENTRY_FOCUS, handleEntryFocus);
      }
    }, [handleEntryFocus]);
    return /* @__PURE__ */(0, import_jsx_runtime.jsx)(RovingFocusProvider, {
      scope: __scopeRovingFocusGroup,
      orientation,
      dir: direction,
      loop,
      currentTabStopId,
      onItemFocus: React.useCallback(tabStopId => setCurrentTabStopId(tabStopId), [setCurrentTabStopId]),
      onItemShiftTab: React.useCallback(() => setIsTabbingBackOut(true), []),
      onFocusableItemAdd: React.useCallback(() => setFocusableItemsCount(prevCount => prevCount + 1), []),
      onFocusableItemRemove: React.useCallback(() => setFocusableItemsCount(prevCount => prevCount - 1), []),
      children: /* @__PURE__ */(0, import_jsx_runtime.jsx)(import_react_primitive.Primitive.div, {
        tabIndex: isTabbingBackOut || focusableItemsCount === 0 ? -1 : 0,
        "data-orientation": orientation,
        ...groupProps,
        ref: composedRefs,
        style: {
          outline: "none",
          ...props.style
        },
        onMouseDown: (0, import_primitive.composeEventHandlers)(props.onMouseDown, () => {
          isClickFocusRef.current = true;
        }),
        onFocus: (0, import_primitive.composeEventHandlers)(props.onFocus, event => {
          const isKeyboardFocus = !isClickFocusRef.current;
          if (event.target === event.currentTarget && isKeyboardFocus && !isTabbingBackOut) {
            const entryFocusEvent = new CustomEvent(ENTRY_FOCUS, EVENT_OPTIONS);
            event.currentTarget.dispatchEvent(entryFocusEvent);
            if (!entryFocusEvent.defaultPrevented) {
              const items = getItems().filter(item => item.focusable);
              const activeItem = items.find(item => item.active);
              const currentItem = items.find(item => item.id === currentTabStopId);
              const candidateItems = [activeItem, currentItem, ...items].filter(Boolean);
              const candidateNodes = candidateItems.map(item => item.ref.current);
              focusFirst(candidateNodes, preventScrollOnEntryFocus);
            }
          }
          isClickFocusRef.current = false;
        }),
        onBlur: (0, import_primitive.composeEventHandlers)(props.onBlur, () => setIsTabbingBackOut(false))
      })
    });
  }, "RovingFocusGroupImpl"));
  var ITEM_NAME = "RovingFocusGroupItem";
  var RovingFocusGroupItem = /* @__PURE__ */React.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */
  __name(function RovingFocusGroupItem2(props, forwardedRef) {
    const {
      __scopeRovingFocusGroup,
      focusable = true,
      active = false,
      tabStopId,
      children,
      ...itemProps
    } = props;
    const autoId = (0, import_react_id.useId)();
    const id = tabStopId || autoId;
    const context = useRovingFocusContext(ITEM_NAME, __scopeRovingFocusGroup);
    const isCurrentTabStop = context.currentTabStopId === id;
    const getItems = useCollection(__scopeRovingFocusGroup);
    const {
      onFocusableItemAdd,
      onFocusableItemRemove,
      currentTabStopId
    } = context;
    const isHydrated = (0, import_react_use_is_hydrated.useIsHydrated)();
    (0, import_react_use_layout_effect.useLayoutEffect)(() => {
      if (!isHydrated || !focusable) {
        return;
      }
      onFocusableItemAdd();
      return () => onFocusableItemRemove();
    }, [isHydrated, focusable, onFocusableItemAdd, onFocusableItemRemove]);
    React.useEffect(() => {
      if (isHydrated || !focusable) {
        return;
      }
      onFocusableItemAdd();
      return () => onFocusableItemRemove();
    }, [isHydrated, focusable, onFocusableItemAdd, onFocusableItemRemove]);
    return /* @__PURE__ */(0, import_jsx_runtime.jsx)(Collection.ItemSlot, {
      scope: __scopeRovingFocusGroup,
      id,
      focusable,
      active,
      children: /* @__PURE__ */(0, import_jsx_runtime.jsx)(import_react_primitive.Primitive.span, {
        tabIndex: isCurrentTabStop ? 0 : -1,
        "data-orientation": context.orientation,
        ...itemProps,
        ref: forwardedRef,
        onMouseDown: (0, import_primitive.composeEventHandlers)(props.onMouseDown, event => {
          if (!focusable) event.preventDefault();else context.onItemFocus(id);
        }),
        onFocus: (0, import_primitive.composeEventHandlers)(props.onFocus, () => context.onItemFocus(id)),
        onKeyDown: (0, import_primitive.composeEventHandlers)(props.onKeyDown, event => {
          if (event.key === "Tab" && event.shiftKey) {
            context.onItemShiftTab();
            return;
          }
          if (event.target !== event.currentTarget) return;
          const focusIntent = getFocusIntent(event, context.orientation, context.dir);
          if (focusIntent !== undefined) {
            if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
            event.preventDefault();
            const items = getItems().filter(item => item.focusable);
            let candidateNodes = items.map(item => item.ref.current);
            if (focusIntent === "last") candidateNodes.reverse();else if (focusIntent === "prev" || focusIntent === "next") {
              if (focusIntent === "prev") candidateNodes.reverse();
              const currentIndex = candidateNodes.indexOf(event.currentTarget);
              candidateNodes = context.loop ? wrapArray(candidateNodes, currentIndex + 1) : candidateNodes.slice(currentIndex + 1);
            }
            setTimeout(() => focusFirst(candidateNodes));
          }
        }),
        children: typeof children === "function" ? children({
          isCurrentTabStop,
          hasTabStop: currentTabStopId != null
        }) : children
      })
    });
  }, "RovingFocusGroupItem"));
  var MAP_KEY_TO_FOCUS_INTENT = {
    ArrowLeft: "prev",
    ArrowUp: "prev",
    ArrowRight: "next",
    ArrowDown: "next",
    PageUp: "first",
    Home: "first",
    PageDown: "last",
    End: "last"
  };
  function getDirectionAwareKey(key, dir) {
    if (dir !== Direction.RTL) return key;
    return key === "ArrowLeft" ? "ArrowRight" : key === "ArrowRight" ? "ArrowLeft" : key;
  }
  __name(getDirectionAwareKey, "getDirectionAwareKey");
  function getFocusIntent(event, orientation, dir) {
    const key = getDirectionAwareKey(event.key, dir);
    if (orientation === Orientation.Vertical && ["ArrowLeft", "ArrowRight"].includes(key)) {
      return undefined;
    }
    if (orientation === Orientation.Horizontal && ["ArrowUp", "ArrowDown"].includes(key)) {
      return undefined;
    }
    return MAP_KEY_TO_FOCUS_INTENT[key];
  }
  __name(getFocusIntent, "getFocusIntent");
  function focusFirst(candidates, preventScroll = false) {
    const PREVIOUSLY_FOCUSED_ELEMENT = document.activeElement;
    for (const candidate of candidates) {
      if (candidate === PREVIOUSLY_FOCUSED_ELEMENT) return;
      candidate.focus({
        preventScroll
      });
      if (document.activeElement !== PREVIOUSLY_FOCUSED_ELEMENT) return;
    }
  }
  __name(focusFirst, "focusFirst");
  function wrapArray(array, startIndex) {
    return array.map((_, index) => array[(startIndex + index) % array.length]);
  }
  __name(wrapArray, "wrapArray");
},1387,[6,1385,1388,589,1386,1392,1393,1394,1395,1398,1391,1399,97]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";
  "use client";

  var _classPrivateFieldLooseBase = require(_dependencyMap[0]).default;
  var _classPrivateFieldLooseKey = require(_dependencyMap[1]).default;
  var _OrderedDict2, _keys;
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __name = (target, value) => __defProp(target, "name", {
    value,
    configurable: true
  });
  var __export = (target, all) => {
    for (var name in all) __defProp(target, name, {
      get: all[name],
      enumerable: true
    });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from)) if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
        get: () => from[key],
        enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
      });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
    value: mod,
    enumerable: true
  }) : target, mod));
  var __toCommonJS = mod => __copyProps(__defProp({}, "__esModule", {
    value: true
  }), mod);

  // src/index.ts
  var index_exports = {};
  __export(index_exports, {
    createCollection: () => createCollection,
    unstable_createCollection: () => createCollection2
  });
  module.exports = __toCommonJS(index_exports);

  // src/collection-legacy.tsx
  var React = __toESM(require(_dependencyMap[2]));
  var import_react_context = require(_dependencyMap[3]);
  var import_react_compose_refs = require(_dependencyMap[4]);
  var import_react_slot = require(_dependencyMap[5]);
  var import_jsx_runtime = require(_dependencyMap[6]);
  // @__NO_SIDE_EFFECTS__
  function createCollection(name) {
    const PROVIDER_NAME = name + "CollectionProvider";
    const [createCollectionContext, createCollectionScope] = (0, import_react_context.createContextScope)(PROVIDER_NAME);
    const [CollectionProviderImpl, useCollectionContext] = createCollectionContext(PROVIDER_NAME, {
      collectionRef: {
        current: null
      },
      itemMap: /* @__PURE__ */new Map()
    });
    const CollectionProvider = /* @__PURE__ */__name(props => {
      const {
        scope,
        children
      } = props;
      const ref = React.useRef(null);
      const itemMap = React.useRef(/* @__PURE__ */new Map()).current;
      return /* @__PURE__ */(0, import_jsx_runtime.jsx)(CollectionProviderImpl, {
        scope,
        itemMap,
        collectionRef: ref,
        children
      });
    }, "CollectionProvider");
    CollectionProvider.displayName = PROVIDER_NAME;
    const COLLECTION_SLOT_NAME = name + "CollectionSlot";
    const CollectionSlotImpl = (0, import_react_slot.createSlot)(COLLECTION_SLOT_NAME);
    const CollectionSlot = React.forwardRef((props, forwardedRef) => {
      const {
        scope,
        children
      } = props;
      const context = useCollectionContext(COLLECTION_SLOT_NAME, scope);
      const composedRefs = (0, import_react_compose_refs.useComposedRefs)(forwardedRef, context.collectionRef);
      return /* @__PURE__ */(0, import_jsx_runtime.jsx)(CollectionSlotImpl, {
        ref: composedRefs,
        children
      });
    });
    CollectionSlot.displayName = COLLECTION_SLOT_NAME;
    const ITEM_SLOT_NAME = name + "CollectionItemSlot";
    const ITEM_DATA_ATTR = "data-radix-collection-item";
    const CollectionItemSlotImpl = (0, import_react_slot.createSlot)(ITEM_SLOT_NAME);
    const CollectionItemSlot = React.forwardRef((props, forwardedRef) => {
      const {
        scope,
        children,
        ...itemData
      } = props;
      const ref = React.useRef(null);
      const composedRefs = (0, import_react_compose_refs.useComposedRefs)(forwardedRef, ref);
      const context = useCollectionContext(ITEM_SLOT_NAME, scope);
      React.useEffect(() => {
        context.itemMap.set(ref, {
          ref,
          ...itemData
        });
        return () => void context.itemMap.delete(ref);
      });
      return /* @__PURE__ */(0, import_jsx_runtime.jsx)(CollectionItemSlotImpl, {
        ...{
          [ITEM_DATA_ATTR]: ""
        },
        ref: composedRefs,
        children
      });
    });
    CollectionItemSlot.displayName = ITEM_SLOT_NAME;
    function useCollection(scope) {
      const context = useCollectionContext(name + "CollectionConsumer", scope);
      const getItems = React.useCallback(() => {
        const collectionNode = context.collectionRef.current;
        if (!collectionNode) return [];
        const orderedNodes = Array.from(collectionNode.querySelectorAll(`[${ITEM_DATA_ATTR}]`));
        const items = Array.from(context.itemMap.values());
        const orderedItems = items.sort((a, b) => orderedNodes.indexOf(a.ref.current) - orderedNodes.indexOf(b.ref.current));
        return orderedItems;
      }, [context.collectionRef, context.itemMap]);
      return getItems;
    }
    __name(useCollection, "useCollection");
    return [{
      Provider: CollectionProvider,
      Slot: CollectionSlot,
      ItemSlot: CollectionItemSlot
    }, useCollection, createCollectionScope];
  }
  __name(createCollection, "createCollection");

  // src/collection.tsx
  var React2 = __toESM(require(_dependencyMap[2]));
  var import_react_context2 = require(_dependencyMap[3]);
  var import_react_compose_refs2 = require(_dependencyMap[4]);
  var import_react_slot2 = require(_dependencyMap[5]);
  var import_react_use_layout_effect = require(_dependencyMap[7]);

  // src/ordered-dictionary.ts
  var __instanciated = /* @__PURE__ */new WeakMap();
  var OrderedDict = (_keys = /*#__PURE__*/_classPrivateFieldLooseKey("keys"), _OrderedDict2 = class _OrderedDict extends Map {
    constructor(entries) {
      super(entries);
      Object.defineProperty(this, _keys, {
        writable: true,
        value: undefined
      });
      _classPrivateFieldLooseBase(this, _keys)[_keys] = [...super.keys()];
      __instanciated.set(this, true);
    }
    set(key, value) {
      if (__instanciated.get(this) && !this.has(key)) {
        _classPrivateFieldLooseBase(this, _keys)[_keys].push(key);
      }
      super.set(key, value);
      return this;
    }
    /**
     * Sets a key-value pair so that it ends up at the given index.
     * - Existing keys are moved
     * - Negative indices count from the end of the resulting dictionary, so
     *   inserting at -1 makes the item the last one, -2 the second to last, etc.
     * - Out-of-range indices are clamped
     */
    insert(index, key, value) {
      const has = this.has(key);
      const finalSize = has ? this.size : this.size + 1;
      const relativeIndex = toSafeInteger(index);
      const targetIndex = relativeIndex >= 0 ? Math.min(relativeIndex, finalSize - 1) : Math.max(finalSize + relativeIndex, 0);
      if (has ? _classPrivateFieldLooseBase(this, _keys)[_keys].indexOf(key) === targetIndex : targetIndex === this.size) {
        this.set(key, value);
        return this;
      }
      const keys = _classPrivateFieldLooseBase(this, _keys)[_keys].filter(existingKey => existingKey !== key);
      keys.splice(targetIndex, 0, key);
      const entries = keys.map(entryKey => [entryKey, entryKey === key ? value : this.get(entryKey)]);
      this.clear();
      for (const [entryKey, entryValue] of entries) {
        this.set(entryKey, entryValue);
      }
      return this;
    }
    with(index, key, value) {
      const copy = new _OrderedDict(this);
      copy.insert(index, key, value);
      return copy;
    }
    before(key) {
      const index = _classPrivateFieldLooseBase(this, _keys)[_keys].indexOf(key) - 1;
      if (index < 0) {
        return undefined;
      }
      return this.entryAt(index);
    }
    /**
     * Sets a new key-value pair at the position before the given key.
     */
    setBefore(key, newKey, value) {
      const index = _classPrivateFieldLooseBase(this, _keys)[_keys].indexOf(key);
      if (index === -1) {
        return this;
      }
      const currentIndex = _classPrivateFieldLooseBase(this, _keys)[_keys].indexOf(newKey);
      const targetIndex = currentIndex !== -1 && currentIndex < index ? index - 1 : index;
      return this.insert(targetIndex, newKey, value);
    }
    after(key) {
      let index = _classPrivateFieldLooseBase(this, _keys)[_keys].indexOf(key);
      index = index === -1 || index === this.size - 1 ? -1 : index + 1;
      if (index === -1) {
        return undefined;
      }
      return this.entryAt(index);
    }
    /**
     * Sets a new key-value pair at the position after the given key.
     */
    setAfter(key, newKey, value) {
      const index = _classPrivateFieldLooseBase(this, _keys)[_keys].indexOf(key);
      if (index === -1) {
        return this;
      }
      const currentIndex = _classPrivateFieldLooseBase(this, _keys)[_keys].indexOf(newKey);
      const targetIndex = currentIndex !== -1 && currentIndex <= index ? index : index + 1;
      return this.insert(targetIndex, newKey, value);
    }
    first() {
      return this.entryAt(0);
    }
    last() {
      return this.entryAt(-1);
    }
    clear() {
      _classPrivateFieldLooseBase(this, _keys)[_keys] = [];
      return super.clear();
    }
    delete(key) {
      const deleted = super.delete(key);
      if (deleted) {
        _classPrivateFieldLooseBase(this, _keys)[_keys].splice(_classPrivateFieldLooseBase(this, _keys)[_keys].indexOf(key), 1);
      }
      return deleted;
    }
    deleteAt(index) {
      const key = this.keyAt(index);
      if (key !== undefined) {
        return this.delete(key);
      }
      return false;
    }
    at(index) {
      const key = at(_classPrivateFieldLooseBase(this, _keys)[_keys], index);
      if (key !== undefined) {
        return this.get(key);
      }
    }
    entryAt(index) {
      const key = at(_classPrivateFieldLooseBase(this, _keys)[_keys], index);
      if (key !== undefined) {
        return [key, this.get(key)];
      }
    }
    indexOf(key) {
      return _classPrivateFieldLooseBase(this, _keys)[_keys].indexOf(key);
    }
    keyAt(index) {
      return at(_classPrivateFieldLooseBase(this, _keys)[_keys], index);
    }
    from(key, offset) {
      const index = this.indexOf(key);
      if (index === -1) {
        return undefined;
      }
      let dest = index + offset;
      if (dest < 0) dest = 0;
      if (dest >= this.size) dest = this.size - 1;
      return this.at(dest);
    }
    keyFrom(key, offset) {
      const index = this.indexOf(key);
      if (index === -1) {
        return undefined;
      }
      let dest = index + offset;
      if (dest < 0) dest = 0;
      if (dest >= this.size) dest = this.size - 1;
      return this.keyAt(dest);
    }
    find(predicate, thisArg) {
      let index = 0;
      for (const entry of this) {
        if (Reflect.apply(predicate, thisArg, [entry, index, this])) {
          return entry;
        }
        index++;
      }
      return undefined;
    }
    findIndex(predicate, thisArg) {
      let index = 0;
      for (const entry of this) {
        if (Reflect.apply(predicate, thisArg, [entry, index, this])) {
          return index;
        }
        index++;
      }
      return -1;
    }
    filter(predicate, thisArg) {
      const entries = [];
      let index = 0;
      for (const entry of this) {
        if (Reflect.apply(predicate, thisArg, [entry, index, this])) {
          entries.push(entry);
        }
        index++;
      }
      return new _OrderedDict(entries);
    }
    map(callbackfn, thisArg) {
      const entries = [];
      let index = 0;
      for (const entry of this) {
        entries.push([entry[0], Reflect.apply(callbackfn, thisArg, [entry, index, this])]);
        index++;
      }
      return new _OrderedDict(entries);
    }
    reduce(...args) {
      const [callbackfn, initialValue] = args;
      const hasInitialValue = args.length > 1;
      if (!hasInitialValue && this.size === 0) {
        throw new TypeError("Reduce of empty OrderedDict with no initial value");
      }
      let index = 0;
      let accumulator = initialValue;
      for (const entry of this) {
        if (index === 0 && !hasInitialValue) {
          accumulator = entry;
        } else {
          accumulator = Reflect.apply(callbackfn, this, [accumulator, entry, index, this]);
        }
        index++;
      }
      return accumulator;
    }
    reduceRight(...args) {
      const [callbackfn, initialValue] = args;
      const hasInitialValue = args.length > 1;
      if (!hasInitialValue && this.size === 0) {
        throw new TypeError("Reduce of empty OrderedDict with no initial value");
      }
      let accumulator = initialValue;
      for (let index = this.size - 1; index >= 0; index--) {
        const entry = this.entryAt(index);
        if (index === this.size - 1 && !hasInitialValue) {
          accumulator = entry;
        } else {
          accumulator = Reflect.apply(callbackfn, this, [accumulator, entry, index, this]);
        }
      }
      return accumulator;
    }
    /**
     * Sorts the dictionary in place. This method mutates the dictionary and
     * returns a reference to the same object
     *
     * @param compareFn Function used to determine the order of the elements. It
     * is expected to return a negative value if the first argument is less than
     * the second argument, zero if they're equal, and a positive value otherwise.
     */
    sort(compareFn) {
      if (typeof compareFn !== "function") {
        throw new TypeError(`OrderedDict.sort requires a compare function`);
      }
      const entries = [...this.entries()].sort(compareFn);
      this.clear();
      for (const [key, value] of entries) {
        this.set(key, value);
      }
      return this;
    }
    /**
     * Returns a copy of the dictionary with its elements sorted.
     *
     * @param compareFn Function used to determine the order of the elements. It
     * is expected to return a negative value if the first argument is less than
     * the second argument, zero if they're equal, and a positive value otherwise.
     */
    toSorted(compareFn) {
      if (typeof compareFn !== "function") {
        throw new TypeError(`OrderedDict.toSorted requires a compare function`);
      }
      const entries = [...this.entries()].sort(compareFn);
      return new _OrderedDict(entries);
    }
    toReversed() {
      const reversed = new _OrderedDict();
      for (let index = this.size - 1; index >= 0; index--) {
        const key = this.keyAt(index);
        const element = this.get(key);
        reversed.set(key, element);
      }
      return reversed;
    }
    toSpliced(...args) {
      const entries = [...this.entries()];
      entries.splice(...args);
      return new _OrderedDict(entries);
    }
    slice(start, end) {
      const result = new _OrderedDict();
      for (const key of _classPrivateFieldLooseBase(this, _keys)[_keys].slice(start, end)) {
        result.set(key, this.get(key));
      }
      return result;
    }
    every(predicate, thisArg) {
      let index = 0;
      for (const entry of this) {
        if (!Reflect.apply(predicate, thisArg, [entry, index, this])) {
          return false;
        }
        index++;
      }
      return true;
    }
    some(predicate, thisArg) {
      let index = 0;
      for (const entry of this) {
        if (Reflect.apply(predicate, thisArg, [entry, index, this])) {
          return true;
        }
        index++;
      }
      return false;
    }
  }, __name(_OrderedDict2, "OrderedDict"), _OrderedDict2);
  function at(array, index) {
    if ("at" in Array.prototype) {
      return Array.prototype.at.call(array, index);
    }
    const actualIndex = toSafeIndex(array, index);
    return actualIndex === -1 ? undefined : array[actualIndex];
  }
  __name(at, "at");
  function toSafeIndex(array, index) {
    const length = array.length;
    const relativeIndex = toSafeInteger(index);
    const actualIndex = relativeIndex >= 0 ? relativeIndex : length + relativeIndex;
    return actualIndex < 0 || actualIndex >= length ? -1 : actualIndex;
  }
  __name(toSafeIndex, "toSafeIndex");
  function toSafeInteger(number) {
    return number !== number || number === 0 ? 0 : Math.trunc(number);
  }
  __name(toSafeInteger, "toSafeInteger");

  // src/collection.tsx
  var import_jsx_runtime2 = require(_dependencyMap[6]);
  // @__NO_SIDE_EFFECTS__
  function createCollection2(name) {
    const PROVIDER_NAME = name + "CollectionProvider";
    const [createCollectionContext, createCollectionScope] = (0, import_react_context2.createContextScope)(PROVIDER_NAME);
    const [CollectionStableContextProvider, useStableCollectionContext] = createCollectionContext(PROVIDER_NAME);
    CollectionStableContextProvider.displayName = name + "CollectionStableContextProvider";
    const [CollectionStatefulContextProvider, useStatefulCollectionContext] = createCollectionContext(PROVIDER_NAME);
    CollectionStatefulContextProvider.displayName = name + "CollectionStatefulContextProvider";
    const CollectionProvider = /* @__PURE__ */__name(({
      state,
      ...props
    }) => {
      return state ? /* @__PURE__ */(0, import_jsx_runtime2.jsx)(CollectionProviderImpl, {
        ...props,
        state
      }) : /* @__PURE__ */(0, import_jsx_runtime2.jsx)(CollectionInit, {
        ...props
      });
    }, "CollectionProvider");
    CollectionProvider.displayName = PROVIDER_NAME;
    const CollectionInit = /* @__PURE__ */__name(props => {
      const state = useInitCollection();
      return /* @__PURE__ */(0, import_jsx_runtime2.jsx)(CollectionProviderImpl, {
        ...props,
        state
      });
    }, "CollectionInit");
    CollectionInit.displayName = name + "CollectionInit";
    const CollectionProviderImpl = /* @__PURE__ */__name(props => {
      const {
        scope,
        children,
        state
      } = props;
      const ref = React2.useRef(null);
      const [collectionElement, setCollectionElement] = React2.useState(null);
      const composeRefs = (0, import_react_compose_refs2.useComposedRefs)(ref, setCollectionElement);
      const [collection, setCollection] = state;
      const registryRef = React2.useRef(new OrderedDict());
      const getCollection = React2.useCallback(() => {
        const registry = registryRef.current;
        if (!isInDocumentOrder(registry)) {
          registry.sort(sortByDocumentPosition);
        }
        return registry;
      }, []);
      React2.useEffect(() => {
        if (!collectionElement) {
          return;
        }
        const observer = getChildListObserver(() => {
          setCollection(map => {
            const sorted = map.toSorted(sortByDocumentPosition);
            const orderChanged = sorted.some(([key], index) => map.keyAt(index) !== key);
            return orderChanged ? sorted : map;
          });
        });
        observer.observe(collectionElement, {
          childList: true,
          subtree: true
        });
        return () => {
          observer.disconnect();
        };
      }, [collectionElement, setCollection]);
      return /* @__PURE__ */(0, import_jsx_runtime2.jsx)(CollectionStableContextProvider, {
        scope,
        collectionElementRef: composeRefs,
        collectionElementRefObject: ref,
        getCollection,
        setCollection,
        registryRef,
        children: /* @__PURE__ */(0, import_jsx_runtime2.jsx)(CollectionStatefulContextProvider, {
          scope,
          collectionElement,
          collection,
          children
        })
      });
    }, "CollectionProviderImpl");
    CollectionProviderImpl.displayName = name + "CollectionProviderImpl";
    const COLLECTION_SLOT_NAME = name + "CollectionSlot";
    const CollectionSlotImpl = (0, import_react_slot2.createSlot)(COLLECTION_SLOT_NAME);
    const CollectionSlot = React2.forwardRef((props, forwardedRef) => {
      const {
        scope,
        children
      } = props;
      const context = useStableCollectionContext(COLLECTION_SLOT_NAME, scope);
      const composedRefs = (0, import_react_compose_refs2.useComposedRefs)(forwardedRef, context.collectionElementRef);
      return /* @__PURE__ */(0, import_jsx_runtime2.jsx)(CollectionSlotImpl, {
        ref: composedRefs,
        children
      });
    });
    CollectionSlot.displayName = COLLECTION_SLOT_NAME;
    const ITEM_SLOT_NAME = name + "CollectionItemSlot";
    const ITEM_DATA_ATTR = "data-radix-collection-item";
    const CollectionItemSlotImpl = (0, import_react_slot2.createSlot)(ITEM_SLOT_NAME);
    const CollectionItemSlot = React2.forwardRef((props, forwardedRef) => {
      const {
        scope,
        children,
        ...itemData
      } = props;
      const ref = React2.useRef(null);
      const context = useStableCollectionContext(ITEM_SLOT_NAME, scope);
      const {
        setCollection,
        registryRef
      } = context;
      const itemDataRef = React2.useRef(itemData);
      if (!shallowEqual(itemDataRef.current, itemData)) {
        itemDataRef.current = itemData;
      }
      const memoizedItemData = itemDataRef.current;
      const registerElement = React2.useCallback(node => {
        const registry = registryRef.current;
        if (node) {
          registry.set(node, {
            ...itemDataRef.current,
            element: node
          });
        } else if (ref.current) {
          registry.delete(ref.current);
        }
      }, [registryRef]);
      const composedRefs = (0, import_react_compose_refs2.useComposedRefs)(forwardedRef, registerElement, ref);
      (0, import_react_use_layout_effect.useLayoutEffect)(() => {
        const node = ref.current;
        const registry = registryRef.current;
        if (node && registry.has(node)) {
          registry.set(node, {
            ...memoizedItemData,
            element: node
          });
        }
      }, [memoizedItemData, registryRef]);
      const registeredRef = React2.useRef(null);
      React2.useEffect(() => {
        const element = ref.current;
        const registered = registeredRef.current;
        if ((registered?.element ?? null) === element && (!element || registered?.itemData === memoizedItemData)) {
          return;
        }
        registeredRef.current = element ? {
          element,
          itemData: memoizedItemData
        } : null;
        setCollection(map => {
          const next = new OrderedDict(map);
          if (registered && registered.element !== element) {
            next.delete(registered.element);
          }
          if (element) {
            next.set(element, {
              ...memoizedItemData,
              element
            });
          }
          return next.sort(sortByDocumentPosition);
        });
      });
      React2.useEffect(() => {
        return () => {
          const registered = registeredRef.current;
          registeredRef.current = null;
          if (!registered) {
            return;
          }
          setCollection(map => {
            if (!map.has(registered.element)) {
              return map;
            }
            const next = new OrderedDict(map);
            next.delete(registered.element);
            return next;
          });
        };
      }, [setCollection]);
      return /* @__PURE__ */(0, import_jsx_runtime2.jsx)(CollectionItemSlotImpl, {
        ...{
          [ITEM_DATA_ATTR]: ""
        },
        ref: composedRefs,
        children
      });
    });
    CollectionItemSlot.displayName = ITEM_SLOT_NAME;
    function useInitCollection() {
      return React2.useState(new OrderedDict());
    }
    __name(useInitCollection, "useInitCollection");
    function useCollection(scope) {
      const {
        collection
      } = useStatefulCollectionContext(name + "CollectionConsumer", scope);
      return collection;
    }
    __name(useCollection, "useCollection");
    function useGetCollection(scope) {
      const {
        getCollection
      } = useStableCollectionContext(name + "CollectionConsumer", scope);
      return getCollection;
    }
    __name(useGetCollection, "useGetCollection");
    const functions = {
      createCollectionScope,
      useCollection,
      useGetCollection,
      useInitCollection
    };
    return [{
      Provider: CollectionProvider,
      Slot: CollectionSlot,
      ItemSlot: CollectionItemSlot
    }, functions];
  }
  __name(createCollection2, "createCollection");
  function shallowEqual(a, b) {
    if (a === b) return true;
    if (typeof a !== "object" || typeof b !== "object") return false;
    if (a == null || b == null) return false;
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);
    if (keysA.length !== keysB.length) return false;
    for (const key of keysA) {
      if (!Object.prototype.hasOwnProperty.call(b, key)) return false;
      if (a[key] !== b[key]) return false;
    }
    return true;
  }
  __name(shallowEqual, "shallowEqual");
  function isElementPreceding(a, b) {
    return !!(b.compareDocumentPosition(a) & Node.DOCUMENT_POSITION_PRECEDING);
  }
  __name(isElementPreceding, "isElementPreceding");
  function isInDocumentOrder(dict) {
    let previous;
    for (const element of dict.keys()) {
      if (previous) {
        const position = previous.compareDocumentPosition(element);
        if (!(position & Node.DOCUMENT_POSITION_DISCONNECTED) && position & Node.DOCUMENT_POSITION_PRECEDING) {
          return false;
        }
      }
      previous = element;
    }
    return true;
  }
  __name(isInDocumentOrder, "isInDocumentOrder");
  function sortByDocumentPosition(a, b) {
    return !a[1].element || !b[1].element ? 0 : isElementPreceding(a[1].element, b[1].element) ? -1 : 1;
  }
  __name(sortByDocumentPosition, "sortByDocumentPosition");
  function getChildListObserver(callback) {
    const observer = new MutationObserver(mutationsList => {
      for (const mutation of mutationsList) {
        if (mutation.type === "childList") {
          callback();
          return;
        }
      }
    });
    return observer;
  }
  __name(getChildListObserver, "getChildListObserver");
},1388,[1389,1390,6,1386,589,588,97,1391]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  function _classPrivateFieldBase(e, t) {
    if (!{}.hasOwnProperty.call(e, t)) throw new TypeError("attempted to use private field on non-instance");
    return e;
  }
  module.exports = _classPrivateFieldBase, module.exports.__esModule = true, module.exports["default"] = module.exports;
},1389,[]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var id = 0;
  function _classPrivateFieldKey(e) {
    return "__private_" + id++ + "_" + e;
  }
  module.exports = _classPrivateFieldKey, module.exports.__esModule = true, module.exports["default"] = module.exports;
},1390,[]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all) __defProp(target, name, {
      get: all[name],
      enumerable: true
    });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from)) if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
        get: () => from[key],
        enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
      });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
    value: mod,
    enumerable: true
  }) : target, mod));
  var __toCommonJS = mod => __copyProps(__defProp({}, "__esModule", {
    value: true
  }), mod);

  // src/index.ts
  var index_exports = {};
  __export(index_exports, {
    useLayoutEffect: () => useLayoutEffect2
  });
  module.exports = __toCommonJS(index_exports);

  // src/use-layout-effect.tsx
  var React = __toESM(require(_dependencyMap[0]));
  var useLayoutEffect2 = globalThis?.document ? React.useLayoutEffect : () => {};
},1391,[6]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __name = (target, value) => __defProp(target, "name", {
    value,
    configurable: true
  });
  var __export = (target, all) => {
    for (var name in all) __defProp(target, name, {
      get: all[name],
      enumerable: true
    });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from)) if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
        get: () => from[key],
        enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
      });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
    value: mod,
    enumerable: true
  }) : target, mod));
  var __toCommonJS = mod => __copyProps(__defProp({}, "__esModule", {
    value: true
  }), mod);

  // src/index.ts
  var index_exports = {};
  __export(index_exports, {
    useId: () => useId
  });
  module.exports = __toCommonJS(index_exports);

  // src/id.tsx
  var React = __toESM(require(_dependencyMap[0]));
  var import_react_use_layout_effect = require(_dependencyMap[1]);
  var useReactId = React[" useId ".trim().toString()] || (() => undefined);
  var count = 0;
  function useId(deterministicId) {
    const [id, setId] = React.useState(useReactId());
    (0, import_react_use_layout_effect.useLayoutEffect)(() => {
      if (!deterministicId) setId(reactId => reactId ?? String(count++));
    }, [deterministicId]);
    return deterministicId || (id ? `radix-${id}` : "");
  }
  __name(useId, "useId");
},1392,[6,1391]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";
  "use client";

  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __name = (target, value) => __defProp(target, "name", {
    value,
    configurable: true
  });
  var __export = (target, all) => {
    for (var name in all) __defProp(target, name, {
      get: all[name],
      enumerable: true
    });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from)) if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
        get: () => from[key],
        enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
      });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
    value: mod,
    enumerable: true
  }) : target, mod));
  var __toCommonJS = mod => __copyProps(__defProp({}, "__esModule", {
    value: true
  }), mod);

  // src/index.ts
  var index_exports = {};
  __export(index_exports, {
    Primitive: () => Primitive,
    Root: () => Primitive,
    dispatchDiscreteCustomEvent: () => dispatchDiscreteCustomEvent
  });
  module.exports = __toCommonJS(index_exports);

  // src/primitive.tsx
  var React = __toESM(require(_dependencyMap[0]));
  var ReactDOM = __toESM(require(_dependencyMap[1]));
  var import_react_slot = require(_dependencyMap[2]);
  var import_jsx_runtime = require(_dependencyMap[3]);
  var NODES = ["a", "button", "div", "form", "h2", "h3", "img", "input", "label", "li", "nav", "ol", "p", "select", "span", "svg", "ul"];
  var Primitive = NODES.reduce((primitive, node) => {
    const Slot = (0, import_react_slot.createSlot)(`Primitive.${node}`);
    const Node = React.forwardRef((props, forwardedRef) => {
      const {
        asChild,
        ...primitiveProps
      } = props;
      const Comp = asChild ? Slot : node;
      if (typeof window !== "undefined") {
        window[Symbol.for("radix-ui")] = true;
      }
      return /* @__PURE__ */(0, import_jsx_runtime.jsx)(Comp, {
        ...primitiveProps,
        ref: forwardedRef
      });
    });
    Node.displayName = `Primitive.${node}`;
    return {
      ...primitive,
      [node]: Node
    };
  }, {});
  function dispatchDiscreteCustomEvent(target, event) {
    if (target) ReactDOM.flushSync(() => target.dispatchEvent(event));
  }
  __name(dispatchDiscreteCustomEvent, "dispatchDiscreteCustomEvent");
},1393,[6,180,588,97]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __name = (target, value) => __defProp(target, "name", {
    value,
    configurable: true
  });
  var __export = (target, all) => {
    for (var name in all) __defProp(target, name, {
      get: all[name],
      enumerable: true
    });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from)) if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
        get: () => from[key],
        enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
      });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
    value: mod,
    enumerable: true
  }) : target, mod));
  var __toCommonJS = mod => __copyProps(__defProp({}, "__esModule", {
    value: true
  }), mod);

  // src/index.ts
  var index_exports = {};
  __export(index_exports, {
    useCallbackRef: () => useCallbackRef
  });
  module.exports = __toCommonJS(index_exports);

  // src/use-callback-ref.tsx
  var import_react_use_layout_effect = require(_dependencyMap[0]);
  var React = __toESM(require(_dependencyMap[1]));
  var useReactInsertionEffect = React[" useInsertionEffect ".trim().toString()];
  function useCallbackRef(callback) {
    const callbackRef = React.useRef(callback);
    if (typeof useReactInsertionEffect === "function") {
      useReactInsertionEffect(() => {
        callbackRef.current = callback;
      });
    } else {
      (0, import_react_use_layout_effect.useLayoutEffect)(() => {
        callbackRef.current = callback;
      });
    }
    return React.useMemo(() => (...args) => callbackRef.current?.(...args), []);
  }
  __name(useCallbackRef, "useCallbackRef");
},1394,[1391,6]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __name = (target, value) => __defProp(target, "name", {
    value,
    configurable: true
  });
  var __export = (target, all) => {
    for (var name in all) __defProp(target, name, {
      get: all[name],
      enumerable: true
    });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from)) if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
        get: () => from[key],
        enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
      });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
    value: mod,
    enumerable: true
  }) : target, mod));
  var __toCommonJS = mod => __copyProps(__defProp({}, "__esModule", {
    value: true
  }), mod);

  // src/index.ts
  var index_exports = {};
  __export(index_exports, {
    useControllableState: () => useControllableState,
    useControllableStateReducer: () => useControllableStateReducer
  });
  module.exports = __toCommonJS(index_exports);

  // src/use-controllable-state.tsx
  var React = __toESM(require(_dependencyMap[0]));
  var import_is_development = require(_dependencyMap[1]);
  var import_react_use_layout_effect = require(_dependencyMap[2]);
  var useInsertionEffect = React[" useInsertionEffect ".trim().toString()] || import_react_use_layout_effect.useLayoutEffect;
  function useControllableState({
    prop,
    defaultProp,
    onChange = /* @__PURE__ */__name(() => {}, "onChange"),
    caller
  }) {
    const [uncontrolledProp, setUncontrolledProp, onChangeRef] = useUncontrolledState({
      defaultProp,
      onChange
    });
    const isControlled = prop !== undefined;
    const value = isControlled ? prop : uncontrolledProp;
    if (import_is_development.IS_DEVELOPMENT) {
      const isControlledRef = React.useRef(prop !== undefined);
      React.useEffect(() => {
        const wasControlled = isControlledRef.current;
        if (wasControlled !== isControlled) {
          const from = wasControlled ? "controlled" : "uncontrolled";
          const to = isControlled ? "controlled" : "uncontrolled";
          console.warn(`${caller} is changing from ${from} to ${to}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`);
        }
        isControlledRef.current = isControlled;
      }, [isControlled, caller]);
    }
    const setValue = React.useCallback(nextValue => {
      if (isControlled) {
        const value2 = isFunction(nextValue) ? nextValue(prop) : nextValue;
        if (value2 !== prop) {
          onChangeRef.current?.(value2);
        }
      } else {
        setUncontrolledProp(nextValue);
      }
    }, [isControlled, prop, setUncontrolledProp, onChangeRef]);
    return [value, setValue];
  }
  __name(useControllableState, "useControllableState");
  function useUncontrolledState({
    defaultProp,
    onChange
  }) {
    const [value, setValue] = React.useState(defaultProp);
    const prevValueRef = React.useRef(value);
    const onChangeRef = React.useRef(onChange);
    useInsertionEffect(() => {
      onChangeRef.current = onChange;
    }, [onChange]);
    React.useEffect(() => {
      if (prevValueRef.current !== value) {
        onChangeRef.current?.(value);
        prevValueRef.current = value;
      }
    }, [value, prevValueRef]);
    return [value, setValue, onChangeRef];
  }
  __name(useUncontrolledState, "useUncontrolledState");
  function isFunction(value) {
    return typeof value === "function";
  }
  __name(isFunction, "isFunction");

  // src/use-controllable-state-reducer.tsx
  var React2 = __toESM(require(_dependencyMap[0]));
  var import_is_development2 = require(_dependencyMap[1]);
  var import_react_use_effect_event = require(_dependencyMap[3]);
  var SYNC_STATE = Symbol("RADIX:SYNC_STATE");
  function useControllableStateReducer(reducer, userArgs, initialArg, init) {
    const {
      prop: controlledState,
      defaultProp,
      onChange: onChangeProp,
      caller
    } = userArgs;
    const isControlled = controlledState !== undefined;
    const onChange = (0, import_react_use_effect_event.useEffectEvent)(onChangeProp);
    if (import_is_development2.IS_DEVELOPMENT) {
      const isControlledRef = React2.useRef(controlledState !== undefined);
      React2.useEffect(() => {
        const wasControlled = isControlledRef.current;
        if (wasControlled !== isControlled) {
          const from = wasControlled ? "controlled" : "uncontrolled";
          const to = isControlled ? "controlled" : "uncontrolled";
          console.warn(`${caller} is changing from ${from} to ${to}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`);
        }
        isControlledRef.current = isControlled;
      }, [isControlled, caller]);
    }
    const args = [{
      ...initialArg,
      state: defaultProp
    }];
    if (init) {
      args.push(init);
    }
    const [internalState, dispatch] = React2.useReducer((state2, action) => {
      if (action.type === SYNC_STATE) {
        return {
          ...state2,
          state: action.state
        };
      }
      const next = reducer(state2, action);
      if (isControlled && !Object.is(next.state, state2.state)) {
        onChange(next.state);
      }
      return next;
    }, ...args);
    const uncontrolledState = internalState.state;
    const prevValueRef = React2.useRef(uncontrolledState);
    React2.useEffect(() => {
      if (prevValueRef.current !== uncontrolledState) {
        prevValueRef.current = uncontrolledState;
        if (!isControlled) {
          onChange(uncontrolledState);
        }
      }
    }, [uncontrolledState, prevValueRef, isControlled]);
    const state = React2.useMemo(() => {
      const isControlled2 = controlledState !== undefined;
      if (isControlled2) {
        return {
          ...internalState,
          state: controlledState
        };
      }
      return internalState;
    }, [internalState, controlledState]);
    React2.useEffect(() => {
      if (isControlled && !Object.is(controlledState, internalState.state)) {
        dispatch({
          type: SYNC_STATE,
          state: controlledState
        });
      }
    }, [controlledState, internalState.state, isControlled]);
    return [state, dispatch];
  }
  __name(useControllableStateReducer, "useControllableStateReducer");
},1395,[6,1396,1391,1397]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all) __defProp(target, name, {
      get: all[name],
      enumerable: true
    });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from)) if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
        get: () => from[key],
        enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
      });
    }
    return to;
  };
  var __toCommonJS = mod => __copyProps(__defProp({}, "__esModule", {
    value: true
  }), mod);

  // src/internal/is-development.false.ts
  var is_development_false_exports = {};
  __export(is_development_false_exports, {
    IS_DEVELOPMENT: () => IS_DEVELOPMENT
  });
  module.exports = __toCommonJS(is_development_false_exports);
  var IS_DEVELOPMENT = false;
},1396,[]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __name = (target, value) => __defProp(target, "name", {
    value,
    configurable: true
  });
  var __export = (target, all) => {
    for (var name in all) __defProp(target, name, {
      get: all[name],
      enumerable: true
    });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from)) if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
        get: () => from[key],
        enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
      });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
    value: mod,
    enumerable: true
  }) : target, mod));
  var __toCommonJS = mod => __copyProps(__defProp({}, "__esModule", {
    value: true
  }), mod);

  // src/index.ts
  var index_exports = {};
  __export(index_exports, {
    useEffectEvent: () => useEffectEvent
  });
  module.exports = __toCommonJS(index_exports);

  // src/use-effect-event.tsx
  var import_react_use_layout_effect = require(_dependencyMap[0]);
  var React = __toESM(require(_dependencyMap[1]));
  var useReactEffectEvent = React[" useEffectEvent ".trim().toString()];
  var useReactInsertionEffect = React[" useInsertionEffect ".trim().toString()];
  function useEffectEvent(callback) {
    if (typeof useReactEffectEvent === "function") {
      return useReactEffectEvent(callback);
    }
    const ref = React.useRef(() => {
      throw new Error("Cannot call an event handler while rendering.");
    });
    if (typeof useReactInsertionEffect === "function") {
      useReactInsertionEffect(() => {
        ref.current = callback;
      });
    } else {
      (0, import_react_use_layout_effect.useLayoutEffect)(() => {
        ref.current = callback;
      });
    }
    return React.useMemo(() => (...args) => ref.current?.(...args), []);
  }
  __name(useEffectEvent, "useEffectEvent");
},1397,[1391,6]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";
  "use client";

  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __name = (target, value) => __defProp(target, "name", {
    value,
    configurable: true
  });
  var __export = (target, all) => {
    for (var name in all) __defProp(target, name, {
      get: all[name],
      enumerable: true
    });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from)) if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
        get: () => from[key],
        enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
      });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
    value: mod,
    enumerable: true
  }) : target, mod));
  var __toCommonJS = mod => __copyProps(__defProp({}, "__esModule", {
    value: true
  }), mod);

  // src/index.ts
  var index_exports = {};
  __export(index_exports, {
    DirectionProvider: () => DirectionProvider,
    Provider: () => DirectionProvider,
    useDirection: () => useDirection
  });
  module.exports = __toCommonJS(index_exports);

  // src/direction.tsx
  var React = __toESM(require(_dependencyMap[0]));
  var import_jsx_runtime = require(_dependencyMap[1]);
  var Direction = {
    LTR: "ltr",
    RTL: "rtl"
  };
  var DirectionContext = React.createContext(undefined);
  var DirectionProvider = /* @__PURE__ */__name(props => {
    const {
      dir,
      children
    } = props;
    return /* @__PURE__ */(0, import_jsx_runtime.jsx)(DirectionContext.Provider, {
      value: dir,
      children
    });
  }, "DirectionProvider");
  function useDirection(localDir) {
    const globalDir = React.useContext(DirectionContext);
    return localDir || globalDir || Direction.LTR;
  }
  __name(useDirection, "useDirection");
},1398,[6,97]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __name = (target, value) => __defProp(target, "name", {
    value,
    configurable: true
  });
  var __export = (target, all) => {
    for (var name in all) __defProp(target, name, {
      get: all[name],
      enumerable: true
    });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from)) if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
        get: () => from[key],
        enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
      });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
    value: mod,
    enumerable: true
  }) : target, mod));
  var __toCommonJS = mod => __copyProps(__defProp({}, "__esModule", {
    value: true
  }), mod);

  // src/index.ts
  var index_exports = {};
  __export(index_exports, {
    useIsHydrated: () => useIsHydrated2
  });
  module.exports = __toCommonJS(index_exports);

  // src/use-is-hydrated.tsx
  var React2 = __toESM(require(_dependencyMap[0]));

  // src/use-is-hydrated-legacy.ts
  var React = __toESM(require(_dependencyMap[0]));
  var _isHydrated = false;
  function useIsHydrated() {
    const [isHydrated, setIsHydrated] = React.useState(_isHydrated);
    React.useEffect(() => {
      if (!_isHydrated) {
        _isHydrated = true;
        setIsHydrated(true);
      }
    }, []);
    return isHydrated;
  }
  __name(useIsHydrated, "useIsHydrated");

  // src/use-is-hydrated.tsx
  var useReactSyncExternalStore = React2[" useSyncExternalStore ".trim().toString()];
  function subscribe() {
    return () => {};
  }
  __name(subscribe, "subscribe");
  function useIsHydratedModern() {
    return useReactSyncExternalStore(subscribe, () => true, () => false);
  }
  __name(useIsHydratedModern, "useIsHydratedModern");
  var useIsHydrated2 = typeof useReactSyncExternalStore === "function" ? useIsHydratedModern : useIsHydrated;
},1399,[6]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";
  "use client";

  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __name = (target, value) => __defProp(target, "name", {
    value,
    configurable: true
  });
  var __export = (target, all) => {
    for (var name in all) __defProp(target, name, {
      get: all[name],
      enumerable: true
    });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from)) if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
        get: () => from[key],
        enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
      });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
    value: mod,
    enumerable: true
  }) : target, mod));
  var __toCommonJS = mod => __copyProps(__defProp({}, "__esModule", {
    value: true
  }), mod);

  // src/index.ts
  var index_exports = {};
  __export(index_exports, {
    Presence: () => Presence,
    Root: () => Presence
  });
  module.exports = __toCommonJS(index_exports);

  // src/presence.tsx
  var React2 = __toESM(require(_dependencyMap[0]));
  var import_react_use_layout_effect = require(_dependencyMap[1]);

  // src/use-state-machine.tsx
  var React = __toESM(require(_dependencyMap[0]));
  function useStateMachine(initialState, machine) {
    return React.useReducer((state, event) => {
      const nextState = machine[state][event];
      return nextState ?? state;
    }, initialState);
  }
  __name(useStateMachine, "useStateMachine");

  // src/presence.tsx
  var Presence = /* @__PURE__ */__name(props => {
    const {
      present,
      children
    } = props;
    const presence = usePresence(present);
    const child = typeof children === "function" ? children({
      present: presence.isPresent
    }) : React2.Children.only(children);
    const ref = useStableComposedRefs(presence.ref, getElementRef(child));
    const forceMount = typeof children === "function";
    return forceMount || presence.isPresent ? React2.cloneElement(child, {
      ref
    }) : null;
  }, "Presence");
  function usePresence(present) {
    const [node, setNode] = React2.useState();
    const stylesRef = React2.useRef(null);
    const prevPresentRef = React2.useRef(present);
    const prevAnimationNameRef = React2.useRef("none");
    const mountAnimationNameRef = React2.useRef(undefined);
    const initialState = present ? "mounted" : "unmounted";
    const [state, send] = useStateMachine(initialState, {
      mounted: {
        UNMOUNT: "unmounted",
        ANIMATION_OUT: "unmountSuspended"
      },
      unmountSuspended: {
        MOUNT: "mounted",
        ANIMATION_END: "unmounted"
      },
      unmounted: {
        MOUNT: "mounted"
      }
    });
    React2.useEffect(() => {
      if (state === "mounted") {
        prevAnimationNameRef.current = mountAnimationNameRef.current ?? getAnimationName(stylesRef.current);
        mountAnimationNameRef.current = undefined;
      } else {
        prevAnimationNameRef.current = "none";
      }
    }, [state]);
    (0, import_react_use_layout_effect.useLayoutEffect)(() => {
      const styles = stylesRef.current;
      const wasPresent = prevPresentRef.current;
      const hasPresentChanged = wasPresent !== present;
      if (hasPresentChanged) {
        const prevAnimationName = prevAnimationNameRef.current;
        const currentAnimationName = getAnimationName(styles);
        if (present) {
          mountAnimationNameRef.current = currentAnimationName;
          send("MOUNT");
        } else if (currentAnimationName === "none" || styles?.display === "none") {
          send("UNMOUNT");
        } else {
          const isAnimating = prevAnimationName !== currentAnimationName;
          if (wasPresent && isAnimating) {
            send("ANIMATION_OUT");
          } else {
            send("UNMOUNT");
          }
        }
        prevPresentRef.current = present;
      }
    }, [present, send]);
    (0, import_react_use_layout_effect.useLayoutEffect)(() => {
      if (node) {
        let timeoutId;
        const ownerWindow = node.ownerDocument.defaultView ?? window;
        const handleAnimationEnd = /* @__PURE__ */__name(event => {
          const currentAnimationName = getAnimationName(stylesRef.current);
          const isCurrentAnimation = currentAnimationName.includes(CSS.escape(event.animationName));
          if (event.target === node && isCurrentAnimation) {
            send("ANIMATION_END");
            if (!prevPresentRef.current) {
              const currentFillMode = node.style.animationFillMode;
              node.style.animationFillMode = "forwards";
              timeoutId = ownerWindow.setTimeout(() => {
                if (node.style.animationFillMode === "forwards") {
                  node.style.animationFillMode = currentFillMode;
                }
              });
            }
          }
        }, "handleAnimationEnd");
        const handleAnimationStart = /* @__PURE__ */__name(event => {
          if (event.target === node) {
            prevAnimationNameRef.current = getAnimationName(stylesRef.current);
          }
        }, "handleAnimationStart");
        node.addEventListener("animationstart", handleAnimationStart);
        node.addEventListener("animationcancel", handleAnimationEnd);
        node.addEventListener("animationend", handleAnimationEnd);
        return () => {
          ownerWindow.clearTimeout(timeoutId);
          node.removeEventListener("animationstart", handleAnimationStart);
          node.removeEventListener("animationcancel", handleAnimationEnd);
          node.removeEventListener("animationend", handleAnimationEnd);
        };
      } else {
        send("ANIMATION_END");
      }
    }, [node, send]);
    return {
      isPresent: ["mounted", "unmountSuspended"].includes(state),
      ref: React2.useCallback(node2 => {
        if (node2) {
          const styles = getComputedStyle(node2);
          stylesRef.current = styles;
          mountAnimationNameRef.current = getAnimationName(styles);
        } else {
          stylesRef.current = null;
        }
        setNode(node2);
      }, [])
    };
  }
  __name(usePresence, "usePresence");
  function setRef(ref, value) {
    if (typeof ref === "function") {
      return ref(value);
    } else if (ref !== null && ref !== undefined) {
      ref.current = value;
    }
  }
  __name(setRef, "setRef");
  function useStableComposedRefs(...refs) {
    const refsRef = React2.useRef(refs);
    refsRef.current = refs;
    return React2.useCallback(node => {
      const currentRefs = refsRef.current;
      let hasCleanup = false;
      const cleanups = currentRefs.map(ref => {
        const cleanup = setRef(ref, node);
        if (!hasCleanup && typeof cleanup === "function") {
          hasCleanup = true;
        }
        return cleanup;
      });
      if (hasCleanup) {
        return () => {
          for (let i = 0; i < cleanups.length; i++) {
            const cleanup = cleanups[i];
            if (typeof cleanup === "function") {
              cleanup();
            } else {
              setRef(currentRefs[i], null);
            }
          }
        };
      }
    }, []);
  }
  __name(useStableComposedRefs, "useStableComposedRefs");
  function getAnimationName(styles) {
    return styles?.animationName || "none";
  }
  __name(getAnimationName, "getAnimationName");
  function getElementRef(element) {
    let getter = Object.getOwnPropertyDescriptor(element.props, "ref")?.get;
    let mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
    if (mayWarn) {
      return element.ref;
    }
    getter = Object.getOwnPropertyDescriptor(element, "ref")?.get;
    mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
    if (mayWarn) {
      return element.props.ref;
    }
    return element.props.ref || element.ref;
  }
  __name(getElementRef, "getElementRef");
},1400,[6,1391]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, dependencyMap) {
  module.exports = Object.assign({
    "navigationMenuTrigger": "EFtDwW_navigationMenuTrigger",
    "tabBadge": "EFtDwW_tabBadge",
    "tabContent": "EFtDwW_tabContent",
    "emptyTabBadge": "EFtDwW_emptyTabBadge",
    "navigationMenuRoot": "EFtDwW_navigationMenuRoot",
    "tabText": "EFtDwW_tabText",
    "nativeTabsContainer": "EFtDwW_nativeTabsContainer"
  }, {
    unstable_styles: {
      "navigationMenuTrigger": {
        "$$css": true,
        "_": "EFtDwW_navigationMenuTrigger"
      },
      "tabBadge": {
        "$$css": true,
        "_": "EFtDwW_tabBadge"
      },
      "tabContent": {
        "$$css": true,
        "_": "EFtDwW_tabContent"
      },
      "emptyTabBadge": {
        "$$css": true,
        "_": "EFtDwW_emptyTabBadge"
      },
      "navigationMenuRoot": {
        "$$css": true,
        "_": "EFtDwW_navigationMenuRoot"
      },
      "tabText": {
        "$$css": true,
        "_": "EFtDwW_tabText"
      },
      "nativeTabsContainer": {
        "$$css": true,
        "_": "EFtDwW_nativeTabsContainer"
      }
    }
  }, {});
},1401,[]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  0;
  function _export(target, all) {
    for (var name in all) Object.defineProperty(target, name, {
      enumerable: true,
      get: Object.getOwnPropertyDescriptor(all, name).get
    });
  }
  _export(exports, {
    get convertIconColorPropToObject() {
      return _icon.convertIconColorPropToObject;
    },
    get convertLabelStylePropToObject() {
      return _label.convertLabelStylePropToObject;
    }
  });
  const _label = require(_dependencyMap[0]);
  const _icon = require(_dependencyMap[1]);
},1402,[1403,790]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, "convertLabelStylePropToObject", {
    enumerable: true,
    get: function () {
      return convertLabelStylePropToObject;
    }
  });
  function _reactnative() {
    const data = require(_dependencyMap[0]);
    _reactnative = function () {
      return data;
    };
    return data;
  }
  function convertLabelStylePropToObject(labelStyle) {
    if (labelStyle) {
      if (typeof labelStyle === 'object' && ('default' in labelStyle || 'selected' in labelStyle)) {
        return {
          default: labelStyle.default ? _reactnative().StyleSheet.flatten(labelStyle.default) : undefined,
          selected: labelStyle.selected ? _reactnative().StyleSheet.flatten(labelStyle.selected) : undefined
        };
      }
      return {
        default: _reactnative().StyleSheet.flatten(labelStyle)
      };
    }
    return {};
  }
},1403,[104]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use client';
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  0;
  function _export(target, all) {
    for (var name in all) Object.defineProperty(target, name, {
      enumerable: true,
      get: Object.getOwnPropertyDescriptor(all, name).get
    });
  }
  _export(exports, {
    get BottomAccessoryPlacementContext() {
      return BottomAccessoryPlacementContext;
    },
    get usePlacement() {
      return usePlacement;
    }
  });
  function _react() {
    const data = require(_dependencyMap[0]);
    _react = function () {
      return data;
    };
    return data;
  }
  const BottomAccessoryPlacementContext = (0, _react().createContext)(undefined);
  const usePlacement = () => {
    const value = (0, _react().use)(BottomAccessoryPlacementContext);
    if (!value) {
      throw new Error('usePlacement can only be used within a <NativeTabs.BottomAccessory> component.');
    }
    return value;
  };
},1404,[6]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  module.exports = {
    uri: "/assets/assets/icons/home.631e6d0907e1d61c498343ff56ff96de.png",
    width: 28,
    height: 28,
    toString() {
      return this.uri;
    }
  };
},1405,[]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  module.exports = {
    uri: "/assets/assets/icons/calendar.5ebc9fb1eee8fbedeb890c6e7cfc590a.png",
    width: 28,
    height: 28,
    toString() {
      return this.uri;
    }
  };
},1406,[]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  module.exports = {
    uri: "/assets/assets/icons/tasks.f4634747453173bc80a49ce632c00900.png",
    width: 28,
    height: 28,
    toString() {
      return this.uri;
    }
  };
},1407,[]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  module.exports = {
    uri: "/assets/assets/icons/pie.7c09eadde6c260afbf118b86c6bd16ae.png",
    width: 28,
    height: 28,
    toString() {
      return this.uri;
    }
  };
},1408,[]);