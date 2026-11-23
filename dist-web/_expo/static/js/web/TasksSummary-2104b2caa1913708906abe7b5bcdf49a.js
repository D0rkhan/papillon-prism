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
  var _reactNativeReanimated = require(_dependencyMap[1]);
  var Reanimated = _interopDefault(_reactNativeReanimated);
  var _expoRouterReactNavigation = require(_dependencyMap[2]);
  var _uiComponentsCircularProgress = require(_dependencyMap[3]);
  var _uiComponentsStack = require(_dependencyMap[4]);
  var Stack = _interopDefault(_uiComponentsStack);
  var _uiComponentsTypography = require(_dependencyMap[5]);
  var Typography = _interopDefault(_uiComponentsTypography);
  var _uiUtilsTransition = require(_dependencyMap[6]);
  require(_dependencyMap[7]);
  require(_dependencyMap[8]);
  var _reactNativeSafeAreaContext = require(_dependencyMap[9]);
  var _uiComponentsDynamic = require(_dependencyMap[10]);
  var _reactJsxRuntime = require(_dependencyMap[11]);
  const TasksSummary = ({
    sections,
    headerHeight
  }) => {
    const theme = (0, _expoRouterReactNavigation.useTheme)();
    const insets = (0, _reactNativeSafeAreaContext.useSafeAreaInsets)();
    const colors = theme.colors;
    if (sections.length === 0) {
      return null;
    }
    return /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(Reanimated.default.View, {
      entering: _uiUtilsTransition.PapillonAppearIn,
      exiting: _uiUtilsTransition.PapillonAppearOut,
      layout: _reactNativeReanimated.LinearTransition,
      style: {
        marginTop: headerHeight + (-insets.top + 10)
      },
      children: [false, /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_uiComponentsDynamic.Dynamic, {
        animated: true,
        children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Stack.default, {
          flex: true,
          width: "100%",
          hAlign: "center",
          children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_uiComponentsDynamic.Dynamic, {
            animated: true,
            children: /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(Stack.default, {
              flex: true,
              gap: 16,
              hAlign: "center",
              vAlign: "center",
              direction: "horizontal",
              style: {
                marginBottom: 16
              },
              children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_uiComponentsCircularProgress.CircularProgress, {
                backgroundColor: colors.tint + "15",
                percentageComplete: sections.reduce((acc, section) => acc + section.data.filter(hw => hw.isDone).length, 0) / Math.max(1, sections.reduce((acc, section) => acc + section.data.length, 0)) * 100,
                radius: 15,
                strokeWidth: 5,
                fill: theme.colors.tint,
                showCheckmark: true
              }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
                variant: "title",
                color: theme.colors.tint,
                children: (() => {
                  const total = sections.reduce((acc, section) => acc + section.data.length, 0);
                  const undone = sections.reduce((acc, section) => acc + section.data.filter(hw => !hw.isDone).length, 0);
                  if (undone === 0) {
                    return "Toutes les tâches sont terminées !";
                  }
                  return `${undone} tâche${undone !== 1 ? "s" : ""} restante${undone !== 1 ? "s" : ""} cette semaine`;
                })()
              })]
            })
          })
        })
      })]
    });
  };
  var _default = TasksSummary;
},981,[6,1107,1000,1432,1005,1110,1138,193,1113,360,1136,97]);
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
  Object.defineProperty(exports, "CircularProgress", {
    enumerable: true,
    get: function () {
      return CircularProgress;
    }
  });
  var _react = require(_dependencyMap[0]);
  var _reactNativeWebDistExportsStyleSheet = require(_dependencyMap[1]);
  var StyleSheet = _interopDefault(_reactNativeWebDistExportsStyleSheet);
  var _reactNativeReanimated = require(_dependencyMap[2]);
  var Animated = _interopDefault(_reactNativeReanimated);
  var _reactNativeSvg = require(_dependencyMap[3]);
  var Svg = _interopDefault(_reactNativeSvg);
  var _utilsTransition = require(_dependencyMap[4]);
  var _getpapillonPapicons = require(_dependencyMap[5]);
  var _reactJsxRuntime = require(_dependencyMap[6]);
  const AnimatedCircle = Animated.default.createAnimatedComponent(_reactNativeSvg.Circle);
  const _worklet_2338198057077_init_data = {
    code: "(function CircularProgressTsx1(){const[circumference,strokeDashoffset,strokeWidthValue,innerRadiusValue]=this.__closure;return{strokeDashoffset:Math.min(circumference-0.01,strokeDashoffset.value),strokeWidth:strokeWidthValue.value,r:innerRadiusValue.value};})"
  };
  const CircularProgress = ({
    radius,
    strokeWidth,
    backgroundColor,
    fill,
    percentageComplete,
    showCheckmark = false
  }) => {
    const percentageCompleteScaled = Math.max(percentageComplete, 0.05);
    const innerRadius = radius - strokeWidth / 2;
    const circumference = 2 * Math.PI * innerRadius;
    const initialOffset = circumference * (1 - percentageCompleteScaled / 100);
    const strokeDashoffset = (0, _reactNativeReanimated.useSharedValue)(initialOffset); // Initialize with correct value
    const strokeWidthValue = (0, _reactNativeReanimated.useSharedValue)(strokeWidth);
    const innerRadiusValue = (0, _reactNativeReanimated.useSharedValue)(innerRadius);
    const fastSpring = {
      stiffness: 400,
      damping: 40
    };
    const slowSpring = {
      stiffness: 300,
      damping: 80
    };
    (0, _react.useEffect)(() => {
      const newOffset = circumference * (1 - percentageCompleteScaled / 100);
      strokeDashoffset.value = (0, _reactNativeReanimated.withSpring)(newOffset, fastSpring);
      if (showCheckmark) {
        if (percentageCompleteScaled >= 100) {
          strokeWidthValue.value = (0, _reactNativeReanimated.withSpring)(radius * 2, slowSpring);
          innerRadiusValue.value = (0, _reactNativeReanimated.withSpring)(0.1, slowSpring);
        } else {
          strokeWidthValue.value = (0, _reactNativeReanimated.withSpring)(strokeWidth, slowSpring);
          innerRadiusValue.value = (0, _reactNativeReanimated.withSpring)(innerRadius, slowSpring);
        }
      }
    }, [percentageComplete, circumference, strokeDashoffset]); // Added dependencies to ensure proper updates

    const animatedProps = (0, _reactNativeReanimated.useAnimatedProps)(function CircularProgressTsx1Factory([_worklet_2338198057077_init_data, circumference, strokeDashoffset, strokeWidthValue, innerRadiusValue]) {
      const CircularProgressTsx1 = function () {
        "use no memo";

        return {
          strokeDashoffset: Math.min(circumference - 0.01, strokeDashoffset.value),
          strokeWidth: strokeWidthValue.value,
          r: innerRadiusValue.value
        };
      };
      CircularProgressTsx1.__closure = [circumference, strokeDashoffset, strokeWidthValue, innerRadiusValue];
      CircularProgressTsx1.__workletHash = 2338198057077;
      CircularProgressTsx1.__initData = _worklet_2338198057077_init_data;
      return CircularProgressTsx1;
    }([_worklet_2338198057077_init_data, circumference, strokeDashoffset, strokeWidthValue, innerRadiusValue]));
    return /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(Animated.default.View, {
      entering: _utilsTransition.PapillonAppearIn,
      exiting: _utilsTransition.PapillonAppearOut,
      style: [styles.container, {
        width: radius * 2,
        height: radius * 2
      }],
      children: [/*#__PURE__*/(0, _reactJsxRuntime.jsxs)(Svg.default, {
        width: radius * 2,
        height: radius * 2,
        children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNativeSvg.Circle, {
          cx: radius,
          cy: radius,
          r: innerRadius,
          stroke: backgroundColor,
          strokeWidth: strokeWidth,
          fill: "transparent"
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(AnimatedCircle, {
          rotation: -90,
          origin: `${radius}, ${radius}`,
          cx: radius,
          cy: radius,
          stroke: fill,
          strokeLinecap: "round",
          strokeDasharray: `${circumference}, ${circumference}`,
          animatedProps: animatedProps,
          fill: "transparent"
        })]
      }), percentageCompleteScaled >= 100 && showCheckmark && /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Animated.default.View, {
        entering: _utilsTransition.PapillonZoomIn,
        exiting: _utilsTransition.PapillonZoomOut,
        style: {
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          alignItems: "center",
          justifyContent: "center"
        },
        children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
          name: "Check",
          width: radius * 1.5,
          height: radius * 1.5,
          color: "#FFF"
        })
      })]
    }, `circular-progress-${radius}`);
  };
  const styles = StyleSheet.default.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center'
    }
  });
},1432,[6,117,1107,1112,1138,1002,97]);