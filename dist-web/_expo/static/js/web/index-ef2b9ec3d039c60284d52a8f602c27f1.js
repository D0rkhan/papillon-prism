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
  var _reactNativeGestureHandler = require(_dependencyMap[8]);
  var _reactNativeReanimated = require(_dependencyMap[9]);
  var Reanimated = _interopDefault(_reactNativeReanimated);
  var _constantsTips = require(_dependencyMap[10]);
  var _databaseUseHomework = require(_dependencyMap[11]);
  var _storesTips = require(_dependencyMap[12]);
  var _uiComponentsAlertProvider = require(_dependencyMap[13]);
  var _uiComponentsTip = require(_dependencyMap[14]);
  var Tip = _interopDefault(_uiComponentsTip);
  var _uiComponentsMainTabErrorBoundary = require(_dependencyMap[15]);
  var MainTabErrorBoundary = _interopDefault(_uiComponentsMainTabErrorBoundary);
  var _uiNewTypography = require(_dependencyMap[16]);
  var Typography = _interopDefault(_uiNewTypography);
  var _uiUtilsIsLiquidGlass = require(_dependencyMap[17]);
  var _utilsI18n = require(_dependencyMap[18]);
  var i18n = _interopDefault(_utilsI18n);
  require(_dependencyMap[19]);
  var _componentsTasksWeekPage = require(_dependencyMap[20]);
  var TasksWeekPage = _interopDefault(_componentsTasksWeekPage);
  var _componentsWeekPicker = require(_dependencyMap[21]);
  var WeekPicker = _interopDefault(_componentsWeekPicker);
  var _hooksUseHomeworkData = require(_dependencyMap[22]);
  var _hooksUseTaskFilters = require(_dependencyMap[23]);
  var _hooksUseWeekSelection = require(_dependencyMap[24]);
  var _reactJsxRuntime = require(_dependencyMap[25]);
  const isAndroid = false;
  const TITLE_SLIDE_RATIO = 0.4; // Slide this share of the screen width when changing titles

  // Geometry of the leading toolbar button, which the week popover points at. The
  // button is native and cannot host a SwiftUI anchor, so the popover hangs off an
  // invisible strip centered on this box instead, and the box has to be restated
  // here rather than measured.
  const TOOLBAR_BUTTON_INSET = 40;
  const TOOLBAR_BUTTON_SIZE = 40;

  // Width of the invisible strip the week-scrolling tip attaches to. Centered in
  // the screen and about as wide as the title it points at, so the popover's
  // arrow lands under the title rather than off to one side.
  const TIP_ANCHOR_WIDTH = 160;

  // One title per week around the settled one. Keyed by absolute week index, so a
  // layer is never remounted while it is on screen.
  const TITLE_LAYER_OFFSETS = [-2, -1, 0, 1, 2];

  // Weeks mounted around the visible one — and the order they are rendered in.
  // The settled week comes first on purpose: UIKit binds the header (search bar
  // collapse, scroll-edge material) to the first scroll view it finds walking
  // down first children, so the list the user is actually scrolling has to be it.
  // Two weeks on each side also cover a fast flick without landing on an empty
  // page, and they are the weeks the data layer keeps warm.
  const PAGE_OFFSETS = [0, -1, 1, -2, 2];
  // Opening the screen only needs the week on screen and the one on either side;
  // the outer two are mounted once the app is idle, well before a swipe can reach
  // them. The first three entries match PAGE_OFFSETS so nothing is reordered.
  const INITIAL_PAGE_OFFSETS = PAGE_OFFSETS.slice(0, 3);

  // Carries the finger's velocity into the settle, so a flick keeps its momentum
  // instead of restarting as a timed slide. Kept just under critical damping:
  // overdamping is what makes a pager feel like it is dragging its feet.
  const PAGE_SPRING = {
    damping: 24,
    stiffness: 320,
    mass: 0.6,
    overshootClamping: true,
    restDisplacementThreshold: 1,
    restSpeedThreshold: 10
  };
  // How far a flick is projected past the finger when picking the target page.
  const VELOCITY_PROJECTION = 0.12;
  // Horizontal travel that claims the touch for the pager, and the vertical
  // travel that hands it back to the list. Deciding the axis by hand instead
  // would mean holding the touch until the finger moves — which makes every tap
  // on a task wait for a gesture that is never coming.
  // Roughly two to one, so a swipe can drift off the horizontal and still page,
  // while anything meant as a scroll gets out well before it pages.
  const PAN_ACTIVATE_X = 14;
  const PAN_FAIL_Y = 30;
  const getSortings = () => [{
    value: 'date',
    label: (0, _i18next.t)('Tasks_Sorting_Methods_DueDate'),
    sf: 'calendar',
    papicon: 'Calendar'
  }, {
    value: 'subject',
    label: (0, _i18next.t)('Tasks_Sorting_Methods_Subject'),
    sf: 'character',
    papicon: 'List'
  }, {
    value: 'done',
    label: (0, _i18next.t)('Tasks_Sorting_Methods_Done'),
    sf: 'checkmark.circle',
    papicon: 'Check'
  }];

  // The pager addresses weeks as an offset from the week the screen opened in;
  // this is the number a human reads on the calendar.
  const getDisplayedWeekNumber = week => (0, _databaseUseHomework.getWeekNumberFromDate)((0, _databaseUseHomework.getDateRangeOfWeek)(week, new Date().getFullYear()).start);
  function getWeekLabels(week, currentWeek) {
    return {
      main: `${(0, _i18next.t)('Tasks_Week')} ${getDisplayedWeekNumber(week)}`,
      relative: week === currentWeek ? (0, _i18next.t)('Tasks_ThisWeek') : undefined
    };
  }

  // `pageOffset` is the week this layer renders, in pages away from the pager's
  // origin. `offset` is the pager's live position in pixels, so the layer is
  // centered when the two line up and slides/fades away as they drift apart.
  const _worklet_2320930763168_init_data = {
    code: "(function indexTsx1(){const[pageOffset,offset,pageWidth,slideDistance]=this.__closure;const distance=pageOffset-offset.value/pageWidth;return{opacity:Math.max(0,1-Math.abs(distance)),transform:[{translateX:distance*slideDistance}]};})"
  };
  function TitleLayer({
    offset,
    pageOffset,
    pageWidth,
    labels,
    slideDistance
  }) {
    const style = (0, _reactNativeReanimated.useAnimatedStyle)(function indexTsx1Factory([_worklet_2320930763168_init_data, pageOffset, offset, pageWidth, slideDistance]) {
      const indexTsx1 = function () {
        "use no memo";

        const distance = pageOffset - offset.value / pageWidth;
        return {
          opacity: Math.max(0, 1 - Math.abs(distance)),
          transform: [{
            translateX: distance * slideDistance
          }]
        };
      };
      indexTsx1.__closure = [pageOffset, offset, pageWidth, slideDistance];
      indexTsx1.__workletHash = 2320930763168;
      indexTsx1.__initData = _worklet_2320930763168_init_data;
      return indexTsx1;
    }([_worklet_2320930763168_init_data, pageOffset, offset, pageWidth, slideDistance]));
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
  const _worklet_1494665353730_init_data = {
    code: "(function indexTsx2(event){const[runOnJS,retireTip,TipIds,cancelAnimation,offsetX,pendingPage,commitPage,gestureStartOffset,activationTranslation]=this.__closure;runOnJS(retireTip)(TipIds.tasksWeekScroll);cancelAnimation(offsetX);if(pendingPage.value!==null){const page=pendingPage.value;pendingPage.value=null;runOnJS(commitPage)(page);}gestureStartOffset.value=offsetX.value;activationTranslation.value=event.translationX;})"
  };
  const _worklet_900047154962_init_data = {
    code: "(function indexTsx3(event){const[offsetX,gestureStartOffset,activationTranslation]=this.__closure;offsetX.value=gestureStartOffset.value-(event.translationX-activationTranslation.value);})"
  };
  const _worklet_15400596011176_init_data = {
    code: "(function indexTsx4(finished){const[pendingPage,target,runOnJS,commitPage]=this.__closure;if(finished&&pendingPage.value===target){pendingPage.value=null;runOnJS(commitPage)(target);}})"
  };
  const _worklet_3321116834889_init_data = {
    code: "(function indexTsx5(event){const[gestureStartOffset,windowWidth,offsetX,VELOCITY_PROJECTION,pendingPage,withSpring,PAGE_SPRING,_worklet_15400596011176_init_data,runOnJS,commitPage]=this.__closure;const startPage=Math.round(gestureStartOffset.value/windowWidth);const projected=(offsetX.value-event.velocityX*VELOCITY_PROJECTION)/windowWidth;const target=Math.min(startPage+1,Math.max(startPage-1,Math.round(projected)));pendingPage.value=target;offsetX.value=withSpring(target*windowWidth,{...PAGE_SPRING,velocity:-event.velocityX},function indexTsx4Factory([_worklet_15400596011176_init_data,pendingPage,target,runOnJS,commitPage]){const indexTsx4=function(finished){if(finished&&pendingPage.value===target){pendingPage.value=null;runOnJS(commitPage)(target);}};indexTsx4.__closure=[pendingPage,target,runOnJS,commitPage];indexTsx4.__workletHash=15400596011176;indexTsx4.__initData=_worklet_15400596011176_init_data;return indexTsx4;}([_worklet_15400596011176_init_data,pendingPage,target,runOnJS,commitPage]));})"
  };
  const _worklet_1638611515717_init_data = {
    code: "(function indexTsx6(){const[offsetX]=this.__closure;return{transform:[{translateX:-offsetX.value}]};})"
  };
  const TasksView = () => {
    const alert = (0, _uiComponentsAlertProvider.useAlert)();
    const {
      width: screenWidth
    } = (0, useWindowDimensions.default)();
    const headerHeight = (0, _expoRouterReactNavigation.useHeaderHeight)();
    const {
      defaultWeek,
      selectedWeek,
      showWeekPicker,
      toggleWeekPicker,
      onSelectWeek,
      setShowWeekPicker,
      getWeekFromIndex,
      getIndexFromWeek,
      windowWidth,
      INITIAL_INDEX
    } = (0, _hooksUseWeekSelection.useWeekSelection)();
    const {
      colors
    } = (0, _expoRouterReactNavigation.useTheme)();
    const weeksToLoad = (0, _react.useMemo)(() => PAGE_OFFSETS.map(offset => selectedWeek + offset), [selectedWeek]);
    const {
      homeworkByWeek,
      refreshingWeek,
      handleRefresh,
      setAsDone,
      error: homeworkError,
      failures: homeworkFailures
    } = (0, _hooksUseHomeworkData.useHomeworkData)(weeksToLoad, alert);
    const hasHomeworkError = Boolean(homeworkError) || homeworkFailures.length > 0;
    const {
      searchTerm,
      setSearchTerm,
      sortMethod,
      setSortMethod,
      collapsedGroups,
      toggleGroup
    } = (0, _hooksUseTaskFilters.useTaskFilters)();
    const sortings = (0, _react.useMemo)(() => getSortings(), [i18n.default.language]);
    const [pageOffsets, setPageOffsets] = (0, _react.useState)(INITIAL_PAGE_OFFSETS);
    (0, _react.useEffect)(() => {
      const handle = setTimeout(() => setPageOffsets(PAGE_OFFSETS), 0);
      return () => clearTimeout(handle);
    }, []);

    // The header is rebuilt natively whenever its options change, so the toolbar
    // label is anchored to the last *settled* week instead of the live one:
    // nothing in the header changes while a swipe is in flight.
    const [settledIndex, setSettledIndex] = (0, _react.useState)(INITIAL_INDEX);
    const settledLabels = getWeekLabels(getWeekFromIndex(settledIndex), defaultWeek);
    const weekLabel = settledLabels.relative ?? settledLabels.main;

    // The pager's live position, in pixels away from the origin page. Pages are
    // laid out at their own fixed offsets and the row is translated by this, so
    // mounting or dropping a page never disturbs what is on screen.
    const offsetX = (0, _reactNativeReanimated.useSharedValue)(0);
    const gestureStartOffset = (0, _reactNativeReanimated.useSharedValue)(0);
    // How far the finger had already travelled when the pager took over:
    // subtracting it keeps the page from jumping by the activation slop.
    const activationTranslation = (0, _reactNativeReanimated.useSharedValue)(0);
    // The page a settle animation is heading for, until it lands.
    const pendingPage = (0, _reactNativeReanimated.useSharedValue)(null);

    // A window resize changes the page width under the pager, so the translation
    // has to be recomputed for the new geometry. Page offsets follow from the
    // render, so there is nothing else to correct.
    const previousWidth = (0, _react.useRef)(windowWidth);
    (0, _react.useLayoutEffect)(() => {
      if (previousWidth.current === windowWidth) {
        return;
      }
      previousWidth.current = windowWidth;
      (0, _reactNativeReanimated.cancelAnimation)(offsetX);
      pendingPage.value = null;
      offsetX.value = (settledIndex - INITIAL_INDEX) * windowWidth;
    }, [windowWidth, settledIndex, INITIAL_INDEX, offsetX, pendingPage]);

    // Everything that costs React work — mounting the next page, moving the data
    // window, rebuilding the native header — is held back until the settle
    // animation has come to rest, so none of it competes with the motion. The
    // weeks on either side are already mounted and loaded, so there is nothing to
    // wait for mid-swipe.
    const commitPage = (0, _react.useCallback)(page => {
      const index = INITIAL_INDEX + page;
      setSettledIndex(previous => previous === index ? previous : index);
      onSelectWeek(getWeekFromIndex(index));
    }, [INITIAL_INDEX, onSelectWeek, getWeekFromIndex]);

    // A pan rather than a horizontal scroll view: a scroll view here would be the
    // first one in the screen, and the native header would follow it instead of
    // the week the user is reading.
    const panGesture = (0, _react.useMemo)(() => _reactNativeGestureHandler.Gesture.Pan().activeOffsetX([-14, PAN_ACTIVATE_X]).failOffsetY([-30, PAN_FAIL_Y]).onStart(function indexTsx2Factory([_worklet_1494665353730_init_data, runOnJS, retireTip, TipIds, cancelAnimation, offsetX, pendingPage, commitPage, gestureStartOffset, activationTranslation]) {
      const indexTsx2 = function (event) {
        "use no memo";

        // The swipe *is* the thing the tip was teaching, so it goes now —
        // waiting for the settle would let it flash back mid-gesture.
        runOnJS(retireTip)(TipIds.tasksWeekScroll);
        cancelAnimation(offsetX);
        // Swiping again before the last settle came to rest: commit it now,
        // otherwise the page being swiped towards may not be mounted.
        if (pendingPage.value !== null) {
          const page = pendingPage.value;
          pendingPage.value = null;
          runOnJS(commitPage)(page);
        }
        gestureStartOffset.value = offsetX.value;
        activationTranslation.value = event.translationX;
      };
      indexTsx2.__closure = [runOnJS, retireTip, TipIds, cancelAnimation, offsetX, pendingPage, commitPage, gestureStartOffset, activationTranslation];
      indexTsx2.__workletHash = 1494665353730;
      indexTsx2.__initData = _worklet_1494665353730_init_data;
      return indexTsx2;
    }([_worklet_1494665353730_init_data, _reactNativeReanimated.runOnJS, _storesTips.retireTip, _constantsTips.TipIds, _reactNativeReanimated.cancelAnimation, offsetX, pendingPage, commitPage, gestureStartOffset, activationTranslation])).onUpdate(function indexTsx3Factory([_worklet_900047154962_init_data, offsetX, gestureStartOffset, activationTranslation]) {
      const indexTsx3 = function (event) {
        "use no memo";

        offsetX.value = gestureStartOffset.value - (event.translationX - activationTranslation.value);
      };
      indexTsx3.__closure = [offsetX, gestureStartOffset, activationTranslation];
      indexTsx3.__workletHash = 900047154962;
      indexTsx3.__initData = _worklet_900047154962_init_data;
      return indexTsx3;
    }([_worklet_900047154962_init_data, offsetX, gestureStartOffset, activationTranslation])).onEnd(function indexTsx5Factory([_worklet_3321116834889_init_data, gestureStartOffset, windowWidth, offsetX, VELOCITY_PROJECTION, pendingPage, withSpring, PAGE_SPRING, _worklet_15400596011176_init_data, runOnJS, commitPage]) {
      const indexTsx5 = function (event) {
        "use no memo";

        const startPage = Math.round(gestureStartOffset.value / windowWidth);
        const projected = (offsetX.value - event.velocityX * VELOCITY_PROJECTION) / windowWidth;
        // One page per gesture, however hard the flick.
        const target = Math.min(startPage + 1, Math.max(startPage - 1, Math.round(projected)));
        pendingPage.value = target;
        offsetX.value = withSpring(target * windowWidth, {
          ...PAGE_SPRING,
          velocity: -event.velocityX
        }, function indexTsx4Factory([_worklet_15400596011176_init_data, pendingPage, target, runOnJS, commitPage]) {
          const indexTsx4 = function (finished) {
            "use no memo";

            if (finished && pendingPage.value === target) {
              pendingPage.value = null;
              runOnJS(commitPage)(target);
            }
          };
          indexTsx4.__closure = [pendingPage, target, runOnJS, commitPage];
          indexTsx4.__workletHash = 15400596011176;
          indexTsx4.__initData = _worklet_15400596011176_init_data;
          return indexTsx4;
        }([_worklet_15400596011176_init_data, pendingPage, target, runOnJS, commitPage]));
      };
      indexTsx5.__closure = [gestureStartOffset, windowWidth, offsetX, VELOCITY_PROJECTION, pendingPage, withSpring, PAGE_SPRING, _worklet_15400596011176_init_data, runOnJS, commitPage];
      indexTsx5.__workletHash = 3321116834889;
      indexTsx5.__initData = _worklet_3321116834889_init_data;
      return indexTsx5;
    }([_worklet_3321116834889_init_data, gestureStartOffset, windowWidth, offsetX, VELOCITY_PROJECTION, pendingPage, _reactNativeReanimated.withSpring, PAGE_SPRING, _worklet_15400596011176_init_data, _reactNativeReanimated.runOnJS, commitPage])), [windowWidth, offsetX, gestureStartOffset, activationTranslation, pendingPage, commitPage]);
    const rowStyle = (0, _reactNativeReanimated.useAnimatedStyle)(function indexTsx6Factory([_worklet_1638611515717_init_data, offsetX]) {
      const indexTsx6 = function () {
        "use no memo";

        return {
          transform: [{
            translateX: -offsetX.value
          }]
        };
      };
      indexTsx6.__closure = [offsetX];
      indexTsx6.__workletHash = 1638611515717;
      indexTsx6.__initData = _worklet_1638611515717_init_data;
      return indexTsx6;
    }([_worklet_1638611515717_init_data, offsetX]));

    // Kept referentially stable so the memoized picker is not re-rendered, and
    // its SwiftUI host not re-fed props, on every week crossing.
    const weekPickerAnchor = (0, _react.useMemo)(() => ({
      top: _uiUtilsIsLiquidGlass.runsIOS26 ? headerHeight : 0,
      left: TOOLBAR_BUTTON_INSET,
      width: TOOLBAR_BUTTON_SIZE
    }), [headerHeight]);

    // Stable across week crossings, so the tip's SwiftUI host is not re-fed props
    // every time the pager settles.
    const weekTipStyle = (0, _react.useMemo)(() => ({
      top: weekPickerAnchor.top,
      left: 0,
      right: 0
    }), [weekPickerAnchor.top]);
    const openNewTask = (0, _react.useCallback)(() => _expoRouter.router.push("/(modals)/tasks/custom"), []);
    const closeWeekPicker = (0, _react.useCallback)(() => setShowWeekPicker(false), [setShowWeekPicker]);
    const handlePickWeek = (0, _react.useCallback)(week => {
      const index = getIndexFromWeek(week);
      (0, _reactNativeReanimated.cancelAnimation)(offsetX);
      pendingPage.value = null;
      offsetX.value = (index - INITIAL_INDEX) * windowWidth;
      setSettledIndex(index);
      onSelectWeek(week);
    }, [getIndexFromWeek, onSelectWeek, INITIAL_INDEX, windowWidth, offsetX, pendingPage]);
    return /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_reactJsxRuntime.Fragment, {
      children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoRouter.Stack.SearchBar, {
        placeholder: (0, _i18next.t)('Tasks_Search_Placeholder'),
        onChangeText: e => setSearchTerm(e.nativeEvent.text),
        autoCapitalize: "none"
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoRouter.Stack.Toolbar, {
        placement: "left",
        children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoRouter.Stack.Toolbar.Button, {
          icon: "calendar",
          onPress: toggleWeekPicker,
          children: weekLabel
        })
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoRouter.Stack.Title, {
        asChild: true,
        children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(View.default, {
          style: [styles.titleContainer, {
            width: screenWidth - 140
          }],
          children: TITLE_LAYER_OFFSETS.map(offset => {
            const pageIndex = settledIndex + offset;
            return /*#__PURE__*/(0, _reactJsxRuntime.jsx)(TitleLayer, {
              offset: offsetX,
              pageOffset: pageIndex - INITIAL_INDEX,
              pageWidth: windowWidth,
              labels: getWeekLabels(getWeekFromIndex(pageIndex), defaultWeek),
              slideDistance: screenWidth * TITLE_SLIDE_RATIO
            }, pageIndex);
          })
        })
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_expoRouter.Stack.Toolbar, {
        placement: "right",
        children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoRouter.Stack.Toolbar.Button, {
          icon: "plus",
          accessibilityLabel: (0, _i18next.t)('Task_New_Title'),
          onPress: openNewTask
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_expoRouter.Stack.Toolbar.Menu, {
          children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoRouter.Stack.Toolbar.Icon, {
            sf: "line.3.horizontal.decrease"
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoRouter.Stack.Toolbar.Label, {
            children: (0, _i18next.t)('Task_Sorting_Title')
          }), sortings.map(sorting => /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoRouter.Stack.Toolbar.MenuAction, {
            isOn: sortMethod === sorting.value,
            icon: sorting.sf,
            onPress: () => setSortMethod(sorting.value),
            children: sorting.label
          }, sorting.value))]
        })]
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(View.default, {
        style: styles.container,
        children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNativeGestureHandler.GestureDetector, {
          gesture: panGesture,
          children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Reanimated.default.View, {
            style: [styles.pager, rowStyle],
            children: pageOffsets.map(offset => {
              const index = settledIndex + offset;
              const week = getWeekFromIndex(index);
              return /*#__PURE__*/(0, _reactJsxRuntime.jsx)(View.default, {
                style: [styles.page, {
                  width: windowWidth,
                  left: (index - INITIAL_INDEX) * windowWidth
                }],
                children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(View.default, {
                  style: {
                    flex: 1,
                    backgroundColor: colors.overground
                  },
                  children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(TasksWeekPage.default, {
                    week: week,
                    homeworks: homeworkByWeek[week],
                    animateItems: index === INITIAL_INDEX,
                    searchTerm: searchTerm,
                    sortMethod: sortMethod,
                    collapsedGroups: collapsedGroups,
                    toggleGroup: toggleGroup,
                    isRefreshing: refreshingWeek === week,
                    onRefresh: handleRefresh,
                    setAsDone: setAsDone,
                    hasError: hasHomeworkError
                  })
                })
              }, index);
            })
          })
        })
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(WeekPicker.default, {
        visible: showWeekPicker,
        selectedWeek: selectedWeek,
        onSelectWeek: handlePickWeek,
        onClose: closeWeekPicker,
        anchor: weekPickerAnchor
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Tip.default, {
        tipId: _constantsTips.TipIds.tasksWeekScroll,
        title: (0, _i18next.t)('Tasks_Tip_Weeks_Title'),
        message: (0, _i18next.t)('Tasks_Tip_Weeks_Message'),
        systemImage: "hand.draw",
        width: TIP_ANCHOR_WIDTH,
        style: weekTipStyle
      })]
    });
  };
  const styles = StyleSheet.default.create({
    container: {
      flex: 1,
      overflow: "hidden"
    },
    pager: {
      flex: 1
    },
    page: {
      position: "absolute",
      top: 0,
      bottom: 0
    },
    // Fixed size, so the header title view never re-measures when the labels swap
    // or the subtitle comes and goes. Every layer fills this same box.
    titleContainer: {
      height: 44
    },
    titleLayer: {
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      // Android headers align their title to the leading edge; iOS centers it.
      alignItems: "center",
      paddingHorizontal: 0,
      justifyContent: "center"
    },
    titleSubtitle: {
      marginTop: -2
    },
    toolbarRow: {
      flexDirection: "row"
    }
  });
  const TasksViewWithBoundary = () => /*#__PURE__*/(0, _reactJsxRuntime.jsx)(MainTabErrorBoundary.default, {
    children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(TasksView, {})
  });
  var _default = TasksViewWithBoundary;
},990,[1023,1000,1140,6,193,117,358,198,1106,1107,1234,1117,1235,1125,1433,1141,1008,1215,1127,1237,984,985,986,988,989,97]);