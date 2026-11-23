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
  var _getpapillonPapicons = require(_dependencyMap[0]);
  var _expoRouterReactNavigation = require(_dependencyMap[1]);
  var _expoRouter = require(_dependencyMap[2]);
  var _i18next = require(_dependencyMap[3]);
  var _react = require(_dependencyMap[4]);
  var React = _interopDefault(_react);
  var _reactNativeWebDistExportsFlatList = require(_dependencyMap[5]);
  var FlatList = _interopDefault(_reactNativeWebDistExportsFlatList);
  require(_dependencyMap[6]);
  var _reactNativeWebDistExportsRefreshControl = require(_dependencyMap[7]);
  var RefreshControl = _interopDefault(_reactNativeWebDistExportsRefreshControl);
  var _reactNativeWebDistExportsStatusBar = require(_dependencyMap[8]);
  var StatusBar = _interopDefault(_reactNativeWebDistExportsStatusBar);
  var _reactNativeWebDistExportsView = require(_dependencyMap[9]);
  var View = _interopDefault(_reactNativeWebDistExportsView);
  var _reactNativeReanimated = require(_dependencyMap[10]);
  var Reanimated = _interopDefault(_reactNativeReanimated);
  var _reactNativeSafeAreaContext = require(_dependencyMap[11]);
  var _storesAccount = require(_dependencyMap[12]);
  var _storesSettings = require(_dependencyMap[13]);
  var _utilsLoggerConsent = require(_dependencyMap[14]);
  var _uiUtilsAnimation = require(_dependencyMap[15]);
  var _atomsHomeHeader = require(_dependencyMap[16]);
  var HomeHeader = _interopDefault(_atomsHomeHeader);
  var _atomsHomeTopBar = require(_dependencyMap[17]);
  var HomeTopBar = _interopDefault(_atomsHomeTopBar);
  var _atomsWallpaper = require(_dependencyMap[18]);
  var Wallpaper = _interopDefault(_atomsWallpaper);
  var _componentsHomeWidget = require(_dependencyMap[19]);
  var HomeWidget = _interopDefault(_componentsHomeWidget);
  var _hooksUseHomeData = require(_dependencyMap[20]);
  var _hooksUseTimetableWidgetData = require(_dependencyMap[21]);
  var _hooksUseTimetableWidgetTitle = require(_dependencyMap[22]);
  var _widgetsTimetable = require(_dependencyMap[23]);
  var HomeTimeTableWidget = _interopDefault(_widgetsTimetable);
  var _widgetsGrades = require(_dependencyMap[24]);
  var GradesWidget = _interopDefault(_widgetsGrades);
  var _gradesHooksUsePeriodsData = require(_dependencyMap[25]);
  var _gradesHooksUseGradesData = require(_dependencyMap[26]);
  var _reactNativeMaskedViewMaskedView = require(_dependencyMap[27]);
  var MaskedView = _interopDefault(_reactNativeMaskedViewMaskedView);
  var _reactNativeLinearGradient = require(_dependencyMap[28]);
  var LinearGradient = _interopDefault(_reactNativeLinearGradient);
  var _uiComponentsMainTabErrorBoundary = require(_dependencyMap[29]);
  var MainTabErrorBoundary = _interopDefault(_uiComponentsMainTabErrorBoundary);
  var _uiComponentsDynamic = require(_dependencyMap[30]);
  var _uiComponentsStack = require(_dependencyMap[31]);
  var Stack = _interopDefault(_uiComponentsStack);
  var _uiComponentsTypography = require(_dependencyMap[32]);
  var Typography = _interopDefault(_uiComponentsTypography);
  var _uiComponentsIcon = require(_dependencyMap[33]);
  var Icon = _interopDefault(_uiComponentsIcon);
  var _reactJsxRuntime = require(_dependencyMap[34]);
  const HomeScreen = () => {
    const insets = (0, _reactNativeSafeAreaContext.useSafeAreaInsets)();
    const bottomTabBarHeight = insets.bottom + 16;
    const topBarHeight = insets.top + 56 + (insets.right > 10 ? 10 : 0);
    const focused = (0, _expoRouterReactNavigation.useIsFocused)();

    // Account
    const accounts = (0, _storesAccount.useAccountStore)(state => state.accounts);
    const lastUsedAccount = (0, _storesAccount.useAccountStore)(state => state.lastUsedAccount);
    const initializeTransport = (0, _storesAccount.useAccountStore)(state => state.initializeTransport);
    const account = accounts.find(a => a.id === lastUsedAccount);
    const router = (0, _expoRouter.useRouter)();
    const welcomeModalSeen = (0, _storesSettings.useSettingsStore)(state => state.personalization.welcomeModalSeen);
    const mutateSettings = (0, _storesSettings.useSettingsStore)(state => state.mutateProperty);
    React.default.useEffect(() => {
      if (accounts.length === 0) {
        router.replace("/(onboarding)/welcome");
        return;
      }
      if (account && account.transport === undefined) {
        initializeTransport(account.schoolName);
      }
    }, [account, accounts.length, router, initializeTransport]);

    // iOS refuses a modal during a transition: wait for the tabs to be on screen.
    const navigation = (0, _expoRouter.useNavigation)();
    const [tabsAppeared, setTabsAppeared] = React.default.useState(false);
    React.default.useLayoutEffect(() => {
      let rootNavigation = navigation;
      while (!rootNavigation.getState()?.routes.some(route => route.name === "(tabs)")) {
        const parent = rootNavigation.getParent();
        if (!parent) return;
        rootNavigation = parent;
      }
      return rootNavigation.addListener("transitionEnd", event => {
        if (!event.data.closing) setTabsAppeared(true);
      });
    }, [navigation]);
    const consentChecked = React.default.useRef(false);
    React.default.useEffect(() => {
      if (!focused || !tabsAppeared || !account) {
        return;
      }
      let cancelled = false;
      (async () => {
        if (!consentChecked.current) {
          const consent = await (0, _utilsLoggerConsent.checkConsent)();
          if (cancelled) return;
          consentChecked.current = true;
          if (!consent.given) {
            router.push("../consent");
            return;
          }
        }
        if (!welcomeModalSeen) {
          mutateSettings("personalization", {
            welcomeModalSeen: true
          });
          router.navigate("/(modals)/welcome");
        }
      })();
      return () => {
        cancelled = true;
      };
    }, [focused, tabsAppeared, account, welcomeModalSeen, mutateSettings, router]);
    const {
      syncing,
      refresh
    } = (0, _hooksUseHomeData.useHomeData)();
    const {
      courses
    } = (0, _hooksUseTimetableWidgetData.useTimetableWidgetData)();
    const timetableTitle = (0, _hooksUseTimetableWidgetTitle.useTimetableWidgetTitle)(courses);
    const {
      currentPeriod
    } = (0, _gradesHooksUsePeriodsData.usePeriodsData)();
    const {
      grades,
      history,
      averages,
      refresh: refreshGrades
    } = (0, _gradesHooksUseGradesData.useGradesData)(currentPeriod);
    const [refreshing, setRefreshing] = React.default.useState(false);
    const handleRefresh = React.default.useCallback(async () => {
      setRefreshing(true);
      try {
        await refresh();
        // The grades widget keeps its own cache, the timetable reads the database.
        await refreshGrades();
      } finally {
        setRefreshing(false);
      }
    }, [refresh, refreshGrades]);
    const gradesWidgetHidden = grades.length === 0;
    const renderTimeTable = React.default.useCallback(() => /*#__PURE__*/(0, _reactJsxRuntime.jsx)(HomeTimeTableWidget.default, {
      courses: courses
    }), [courses]);
    const renderGrades = React.default.useCallback(() => /*#__PURE__*/(0, _reactJsxRuntime.jsx)(GradesWidget.default, {
      history: history,
      averages: averages
    }), [history, averages]);
    const data = React.default.useMemo(() => [{
      icon: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
        name: "Calendar"
      }),
      title: timetableTitle,
      redirect: "(tabs)/calendar",
      hidden: courses.length === 0,
      render: renderTimeTable
    }, {
      icon: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
        name: "Grades"
      }),
      title: (0, _i18next.t)("Home_Widget_Grades_Average"),
      redirect: "(tabs)/grades",
      hidden: gradesWidgetHidden,
      render: renderGrades
    }], [courses.length, gradesWidgetHidden, renderGrades, renderTimeTable, timetableTitle]);
    const visibleWidgets = React.default.useMemo(() => data.filter(item => !item.hidden && (!item.dev || false)), [data]);
    const allWidgetsHidden = visibleWidgets.length === 0;
    return /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_reactJsxRuntime.Fragment, {
      children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Wallpaper.default, {}), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(HomeTopBar.default, {
        loading: syncing
      }), focused && /*#__PURE__*/(0, _reactJsxRuntime.jsx)(StatusBar.default, {
        animated: true,
        barStyle: 'light-content'
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(HomeViewContainer, {
        children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(FlatList.default, {
          renderItem: ({
            item
          }) => /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Reanimated.default.View, {
            layout: (0, _uiUtilsAnimation.Animation)(_reactNativeReanimated.LinearTransition, "list"),
            children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(HomeWidget.default, {
              item: item
            })
          }),
          keyExtractor: item => item.title,
          ListHeaderComponent: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(HomeHeader.default, {}),
          style: {
            flex: 1
          },
          refreshControl: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(RefreshControl.default, {
            refreshing: refreshing,
            onRefresh: handleRefresh,
            tintColor: "#fff",
            progressViewOffset: topBarHeight
          }),
          contentContainerStyle: {
            paddingBottom: 16,
            flexGrow: 1,
            gap: 12,
            marginTop: 6,
            width: '100%',
            maxWidth: 700,
            marginHorizontal: 'auto',
            paddingHorizontal: 16
          },
          data: visibleWidgets,
          ListFooterComponent: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(View.default, {
            style: {
              gap: 12
            },
            children: allWidgetsHidden && /*#__PURE__*/(0, _reactJsxRuntime.jsx)(HomeEmptyState, {})
          })
        })
      }, "home")]
    });
  };
  const HomeEmptyState = /*#__PURE__*/React.default.memo(() => /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_uiComponentsDynamic.Dynamic, {
    animated: true,
    style: {
      width: "100%"
    },
    children: /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(Stack.default, {
      hAlign: "center",
      vAlign: "center",
      flex: true,
      padding: [22, 16],
      gap: 2,
      style: {
        width: "100%"
      },
      children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Icon.default, {
        papicon: true,
        opacity: 0.5,
        size: 32,
        style: {
          marginBottom: 3
        },
        children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
          name: "Ghost"
        })
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
        variant: "h4",
        color: "text",
        align: "center",
        children: (0, _i18next.t)("Home_Widgets_Empty_Title")
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
        variant: "body2",
        color: "secondary",
        align: "center",
        children: (0, _i18next.t)("Home_Widgets_Empty_Description")
      })]
    })
  }, "home-widgets:empty"));
  HomeEmptyState.displayName = "HomeEmptyState";
  const HomeViewContainer = ({
    children
  }) => {
    const insets = (0, _reactNativeSafeAreaContext.useSafeAreaInsets)();
    return /*#__PURE__*/(0, _reactJsxRuntime.jsx)(MaskedView.default, {
      maskElement: /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(View.default, {
        style: {
          flex: 1,
          backgroundColor: 'transparent'
        },
        children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(LinearGradient.default, {
          colors: ['#ff000022', 'white'],
          locations: [0.5, 1],
          style: {
            height: insets.top + 68
          }
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(View.default, {
          style: {
            flex: 1,
            backgroundColor: 'white'
          }
        })]
      }),
      style: {
        flex: 1
      },
      children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNativeSafeAreaContext.SafeAreaView, {
        style: {
          flex: 1
        },
        edges: ["left", "right"],
        children: children
      })
    });
  };
  const HomeScreenWithBoundary = () => /*#__PURE__*/(0, _reactJsxRuntime.jsx)(MainTabErrorBoundary.default, {
    children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(HomeScreen, {})
  });
  var _default = HomeScreenWithBoundary;
},973,[1002,1000,1023,1140,6,196,193,221,341,198,1107,360,1022,1012,1429,1430,959,960,962,967,968,970,971,975,974,953,952,1337,1222,1141,1136,1005,1110,1013,97]);