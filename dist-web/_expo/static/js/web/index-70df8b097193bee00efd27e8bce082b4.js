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
  exports.getStatusText = getStatusText;
  var _expoRouter = require(_dependencyMap[0]);
  var _expoRouterReactNavigation = require(_dependencyMap[1]);
  var _i18next = require(_dependencyMap[2]);
  var _react = require(_dependencyMap[3]);
  require(_dependencyMap[4]);
  var _reactNativeWebDistExportsStyleSheet = require(_dependencyMap[5]);
  var StyleSheet = _interopDefault(_reactNativeWebDistExportsStyleSheet);
  var _reactNativeWebDistExportsUseWindowDimensions = require(_dependencyMap[6]);
  var useWindowDimensions = _interopDefault(_reactNativeWebDistExportsUseWindowDimensions);
  var _reactNativeWebDistExportsView = require(_dependencyMap[7]);
  var View = _interopDefault(_reactNativeWebDistExportsView);
  var _reactNativeSafeAreaContext = require(_dependencyMap[8]);
  var _servicesSharedTimetable = require(_dependencyMap[9]);
  var _storesAccount = require(_dependencyMap[10]);
  var _storesSettings = require(_dependencyMap[11]);
  var _uiComponentsCalendar = require(_dependencyMap[12]);
  var Calendar = _interopDefault(_uiComponentsCalendar);
  var _uiComponentsMainTabErrorBoundary = require(_dependencyMap[13]);
  var MainTabErrorBoundary = _interopDefault(_uiComponentsMainTabErrorBoundary);
  var _uiNewTypography = require(_dependencyMap[14]);
  var Typography = _interopDefault(_uiNewTypography);
  var _uiUtilsIsLiquidGlass = require(_dependencyMap[15]);
  var _uiUtilsResizable = require(_dependencyMap[16]);
  var useResizable = _interopDefault(_uiUtilsResizable);
  var _utilsI18n = require(_dependencyMap[17]);
  var i18n = _interopDefault(_utilsI18n);
  var _reactNativeReanimated = require(_dependencyMap[18]);
  var Reanimated = _interopDefault(_reactNativeReanimated);
  require(_dependencyMap[19]);
  var _componentsDayPager = require(_dependencyMap[20]);
  var _componentsWeekView = require(_dependencyMap[21]);
  var _hooksUseCalendarState = require(_dependencyMap[22]);
  var _hooksUseTimetableData = require(_dependencyMap[23]);
  var _hooksUseWeekGeometry = require(_dependencyMap[24]);
  var _hooksUseWeekendVisibility = require(_dependencyMap[25]);
  var _reactJsxRuntime = require(_dependencyMap[26]);
  const isAndroid = false;
  const TITLE_SLIDE_RATIO = 0.4;
  const TOOLBAR_BUTTON_INSET = 40;
  const TOOLBAR_BUTTON_SIZE = 40;
  function capitalize(value) {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
  function getDayLabels(day) {
    const isSameDay = (a, b) => a.toDateString() === b.toDateString();
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    const relative = isSameDay(day, today) ? (0, _i18next.t)("Today") : isSameDay(day, yesterday) ? (0, _i18next.t)("Yesterday") : isSameDay(day, tomorrow) ? (0, _i18next.t)("Tomorrow") : undefined;
    return {
      main: day.toLocaleDateString(i18n.default.language, {
        weekday: "long",
        day: "numeric",
        month: "long"
      }),
      relative
    };
  }
  function getWeekLabels(geometry, pageIndex) {
    const firstDayIndex = geometry.dayIndexOfPage(pageIndex);
    const first = geometry.dateOfDayIndex(firstDayIndex);
    const last = geometry.dateOfDayIndex(firstDayIndex + geometry.columns - 1);
    if (first.getMonth() === last.getMonth() && first.getFullYear() === last.getFullYear()) {
      return {
        main: capitalize(first.toLocaleDateString(i18n.default.language, {
          month: "long",
          year: "numeric"
        }))
      };
    }
    const sameYear = first.getFullYear() === last.getFullYear();
    const firstPart = first.toLocaleDateString(i18n.default.language, sameYear ? {
      month: "short"
    } : {
      month: "short",
      year: "numeric"
    });
    const lastPart = last.toLocaleDateString(i18n.default.language, {
      month: "short",
      year: "numeric"
    });
    return {
      main: `${capitalize(firstPart)} – ${capitalize(lastPart)}`
    };
  }
  function getToolbarLabel(day, compact) {
    const labels = getDayLabels(day);
    if (labels.relative) {
      return labels.relative;
    }
    if (compact) {
      return day.toLocaleDateString(i18n.default.language, {
        day: "numeric",
        month: "short"
      });
    }
    return labels.main;
  }
  const TITLE_LAYER_OFFSETS = [-2, -1, 0, 1, 2];
  const _worklet_9176126874115_init_data = {
    code: "(function indexTsx1(){const[pageIndex,page,slideDistance]=this.__closure;const distance=pageIndex-page.value;return{opacity:Math.max(0,1-Math.abs(distance)),transform:[{translateX:distance*slideDistance}]};})"
  };
  function TitleLayer({
    page,
    pageIndex,
    labels,
    slideDistance
  }) {
    const style = (0, _reactNativeReanimated.useAnimatedStyle)(function indexTsx1Factory([_worklet_9176126874115_init_data, pageIndex, page, slideDistance]) {
      const indexTsx1 = function () {
        "use no memo";

        const distance = pageIndex - page.value;
        return {
          opacity: Math.max(0, 1 - Math.abs(distance)),
          transform: [{
            translateX: distance * slideDistance
          }]
        };
      };
      indexTsx1.__closure = [pageIndex, page, slideDistance];
      indexTsx1.__workletHash = 9176126874115;
      indexTsx1.__initData = _worklet_9176126874115_init_data;
      return indexTsx1;
    }([_worklet_9176126874115_init_data, pageIndex, page, slideDistance]));
    return /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(Reanimated.default.View, {
      pointerEvents: "none",
      style: [styles.titleLayer, style],
      children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
        variant: "header",
        weight: "semibold",
        numberOfLines: 1,
        children: labels.main
      }), labels.relative && /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
        variant: "body2",
        color: "textSecondary",
        weight: "semibold",
        numberOfLines: 1,
        style: styles.titleSubtitle,
        children: labels.relative
      })]
    });
  }
  function TabOneScreen() {
    const {
      colors
    } = (0, _expoRouterReactNavigation.useTheme)();
    const router = (0, _expoRouter.useRouter)();
    const calendarRef = (0, _react.useRef)(null);
    const insets = (0, _reactNativeSafeAreaContext.useSafeAreaInsets)();
    const headerHeight = (0, _expoRouterReactNavigation.useHeaderHeight)();
    const {
      width: screenWidth
    } = (0, useWindowDimensions.default)();
    const accounts = (0, _storesAccount.useAccountStore)(state => state.accounts);
    const lastUsedAccount = (0, _storesAccount.useAccountStore)(state => state.lastUsedAccount);
    const account = accounts.find(a => a.id === lastUsedAccount);
    const {
      isTablet
    } = (0, useResizable.default)();
    const storedViewMode = (0, _storesSettings.useSettingsStore)(state => state.personalization.calendarViewMode);
    const mutateProperty = (0, _storesSettings.useSettingsStore)(state => state.mutateProperty);
    const viewMode = storedViewMode ?? (isTablet ? "week" : "list");
    const isWeekMode = viewMode === "week";
    const setViewMode = (0, _react.useCallback)(mode => {
      mutateProperty("personalization", {
        calendarViewMode: mode
      });
    }, [mutateProperty]);
    (0, _react.useEffect)(() => {
      if (storedViewMode === undefined) {
        setViewMode(viewMode);
      }
    }, [storedViewMode, viewMode, setViewMode]);
    const [contentWidth, setContentWidth] = (0, _react.useState)(null);
    const handleContentLayout = (0, _react.useCallback)(event => {
      const measured = Math.round(event.nativeEvent.layout.width);
      setContentWidth(previous => previous === measured || measured <= 0 ? previous : measured);
    }, []);
    const calendar = (0, _hooksUseCalendarState.useCalendarState)(contentWidth ?? screenWidth);
    const {
      date,
      weekNumber,
      getDateFromIndex,
      getIndexFromDate,
      handleDateChange
    } = calendar;
    const {
      timetable,
      manualRefreshing,
      handleRefresh,
      error: timetableError,
      failures: timetableFailures
    } = (0, _hooksUseTimetableData.useTimetableData)(weekNumber, date);
    const weekend = (0, _hooksUseWeekendVisibility.useWeekendVisibility)(timetable);
    const weekGeometry = (0, _hooksUseWeekGeometry.useWeekGeometry)(weekend, contentWidth ?? screenWidth);
    const hasTimetableError = Boolean(timetableError) || timetableFailures.length > 0;
    const pageIndexOfDate = (0, _react.useCallback)(day => isWeekMode ? weekGeometry.pageOfDate(day) : getIndexFromDate(day), [isWeekMode, weekGeometry, getIndexFromDate]);
    const dateOfPageIndex = (0, _react.useCallback)(pageIndex => isWeekMode ? weekGeometry.dateOfDayIndex(weekGeometry.dayIndexOfPage(pageIndex)) : getDateFromIndex(pageIndex), [isWeekMode, weekGeometry, getDateFromIndex]);
    const [settledIndex, setSettledIndex] = (0, _react.useState)(() => pageIndexOfDate(date));
    const scrollPage = (0, _reactNativeReanimated.useSharedValue)(settledIndex);
    const pageSpace = isWeekMode ? `week:${weekGeometry.columns}:${weekGeometry.daysPerWeek}:${Math.round(weekGeometry.pageWidth)}` : "list";
    const previousPageSpace = (0, _react.useRef)(pageSpace);
    (0, _react.useLayoutEffect)(() => {
      if (previousPageSpace.current === pageSpace) {
        return;
      }
      previousPageSpace.current = pageSpace;
      const index = pageIndexOfDate(date);
      setSettledIndex(index);
      scrollPage.value = index;
    }, [pageSpace, pageIndexOfDate, date, scrollPage]);
    const toolbarLabel = getToolbarLabel(dateOfPageIndex(settledIndex), isWeekMode);
    const calendarAnchor = (0, _react.useMemo)(() => ({
      top: _uiUtilsIsLiquidGlass.runsIOS26 ? headerHeight : 0,
      left: TOOLBAR_BUTTON_INSET,
      width: TOOLBAR_BUTTON_SIZE
    }), [headerHeight]);
    const handlePickDate = (0, _react.useCallback)(picked => {
      handleDateChange(picked);
      setSettledIndex(pageIndexOfDate(picked));
    }, [handleDateChange, pageIndexOfDate]);
    const anchorWeekOnPage = (0, _react.useCallback)(page => {
      if (weekGeometry.pageContainsDate(page, date)) {
        return;
      }
      handleDateChange(weekGeometry.dateOfDayIndex(weekGeometry.dayIndexOfPage(page)));
    }, [weekGeometry, handleDateChange, date]);
    const handleWeekPageSettled = (0, _react.useCallback)(page => {
      setSettledIndex(previous => previous === page ? previous : page);
      anchorWeekOnPage(page);
    }, [anchorWeekOnPage]);
    const handleListSettle = (0, _react.useCallback)(index => {
      setSettledIndex(previous => previous === index ? previous : index);
    }, []);
    const labelsOfPage = (0, _react.useCallback)(pageIndex => isWeekMode ? getWeekLabels(weekGeometry, pageIndex) : getDayLabels(getDateFromIndex(pageIndex)), [isWeekMode, weekGeometry, getDateFromIndex]);
    const openIcals = (0, _react.useCallback)(() => {
      router.push({
        pathname: "./calendar/icals",
        params: {}
      });
    }, [router]);
    return /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_reactJsxRuntime.Fragment, {
      children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Calendar.default, {
        ref: calendarRef,
        date: date,
        onDateChange: handlePickDate,
        color: "#D6502B",
        anchor: calendarAnchor
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoRouter.Stack.Toolbar, {
        placement: "left",
        children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoRouter.Stack.Toolbar.Button, {
          icon: "calendar",
          onPress: () => calendarRef.current?.toggle(),
          children: toolbarLabel
        })
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoRouter.Stack.Title, {
        asChild: true,
        children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(View.default, {
          style: [styles.titleContainer, {
            width: (contentWidth ?? screenWidth) - 140
          }],
          children: TITLE_LAYER_OFFSETS.map(offset => {
            const pageIndex = settledIndex + offset;
            return /*#__PURE__*/(0, _reactJsxRuntime.jsx)(TitleLayer, {
              page: scrollPage,
              pageIndex: pageIndex,
              labels: labelsOfPage(pageIndex),
              slideDistance: (contentWidth ?? screenWidth) * TITLE_SLIDE_RATIO
            }, pageIndex);
          })
        })
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoRouter.Stack.Toolbar, {
        placement: "right",
        children: /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_expoRouter.Stack.Toolbar.Menu, {
          children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoRouter.Stack.Toolbar.Icon, {
            sf: "ellipsis"
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoRouter.Stack.Toolbar.Label, {
            children: (0, _i18next.t)('Tab_Calendar_View_Mode')
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_expoRouter.Stack.Toolbar.Menu, {
            inline: true,
            title: (0, _i18next.t)('Tab_Calendar_View_Mode'),
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoRouter.Stack.Toolbar.MenuAction, {
              icon: "list.bullet",
              isOn: !isWeekMode,
              onPress: () => setViewMode("list"),
              children: (0, _i18next.t)('Tab_Calendar_View_List')
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoRouter.Stack.Toolbar.MenuAction, {
              icon: "calendar.day.timeline.left",
              isOn: isWeekMode,
              subtitle: (0, _i18next.t)('Tab_Calendar_View_Beta'),
              onPress: () => setViewMode("week"),
              children: (0, _i18next.t)('Tab_Calendar_View_Week')
            })]
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoRouter.Stack.Toolbar.MenuAction, {
            icon: "calendar",
            onPress: openIcals,
            children: (0, _i18next.t)('Tab_Calendar_Icals')
          })]
        })
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(View.default, {
        style: styles.content,
        onLayout: handleContentLayout,
        children: contentWidth === null ? null : isWeekMode ? /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_componentsWeekView.WeekView // Both the page width and the days a page holds define the pager's
        // scroll space. Remounting on either re-anchors it on the day on
        // screen instead of reading a stale offset back as a page years away.
        , {
          date: date,
          timetable: timetable,
          geometry: weekGeometry,
          isRefreshing: manualRefreshing,
          onRefresh: handleRefresh,
          hasError: hasTimetableError,
          scrollPage: scrollPage,
          onPageCrossed: anchorWeekOnPage,
          onPageSettled: handleWeekPageSettled,
          topInset: _uiUtilsIsLiquidGlass.runsIOS26 ? headerHeight : 0,
          bottomInset: insets.bottom
        }, `${weekGeometry.columns}:${Math.round(weekGeometry.pageWidth)}`) : /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_componentsDayPager.DayPager, {
          calendar: calendar,
          timetable: timetable,
          isRefreshing: manualRefreshing,
          onRefresh: handleRefresh,
          hasError: hasTimetableError,
          transportInfo: account?.transport ?? undefined,
          settledIndex: settledIndex,
          onSettle: handleListSettle,
          scrollPage: scrollPage
        })
      })]
    });
  }
  const CalendarScreenWithBoundary = () => /*#__PURE__*/(0, _reactJsxRuntime.jsx)(MainTabErrorBoundary.default, {
    children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(TabOneScreen, {})
  });
  var _default = CalendarScreenWithBoundary;
  const styles = StyleSheet.default.create({
    content: {
      flex: 1
    },
    titleContainer: {
      height: 44
    },
    titleLayer: {
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      alignItems: "center",
      paddingHorizontal: 0,
      justifyContent: "center"
    },
    titleSubtitle: {
      marginTop: -2
    }
  });
  function getStatusText(status) {
    switch (status) {
      case _servicesSharedTimetable.CourseStatus.ONLINE:
        return (0, _i18next.t)("Online_Course");
      case _servicesSharedTimetable.CourseStatus.EDITED:
        return (0, _i18next.t)("Edited_Course");
      case _servicesSharedTimetable.CourseStatus.CANCELED:
        return (0, _i18next.t)("Canceled_Course");
      case _servicesSharedTimetable.CourseStatus.EVALUATED:
        return (0, _i18next.t)("Evaluated_Course");
      default:
        return "";
    }
  }
},943,[1023,1000,1140,6,193,117,358,198,360,1021,1022,1012,1124,1141,1008,1215,1409,1127,1107,1237,933,936,938,939,940,941,97]);