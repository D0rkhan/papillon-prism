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
  var _sbaiahmed1ReactNativeBlur = require(_dependencyMap[2]);
  require(_dependencyMap[3]);
  var _reactNativeWebDistExportsImage = require(_dependencyMap[4]);
  var Image = _interopDefault(_reactNativeWebDistExportsImage);
  var _reactNativeWebDistExportsPressable = require(_dependencyMap[5]);
  var Pressable = _interopDefault(_reactNativeWebDistExportsPressable);
  var _reactNativeWebDistExportsStyleSheet = require(_dependencyMap[6]);
  var StyleSheet = _interopDefault(_reactNativeWebDistExportsStyleSheet);
  var _reactNativeWebDistExportsView = require(_dependencyMap[7]);
  var View = _interopDefault(_reactNativeWebDistExportsView);
  var _utilsAdjustColor = require(_dependencyMap[8]);
  var adjust = _interopDefault(_utilsAdjustColor);
  var _uiComponentsTypography = require(_dependencyMap[9]);
  var Typography = _interopDefault(_uiComponentsTypography);
  var _expoRouter = require(_dependencyMap[10]);
  var _expoLinearGradient = require(_dependencyMap[11]);
  var _reactJsxRuntime = require(_dependencyMap[12]);
  const HomeHeaderButton = ({
    item
  }) => {
    const theme = (0, _expoRouterReactNavigation.useTheme)();
    const {
      colors
    } = theme;
    return /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_sbaiahmed1ReactNativeBlur.LiquidGlassView, {
      glassOpacity: 0.4,
      glassTintColor: (0, adjust.default)(item.color, theme.dark ? -0.8 : 0.9),
      glassType: "regular",
      isInteractive: true,
      style: {
        flex: 1,
        borderRadius: 22
      },
      children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoLinearGradient.LinearGradient, {
        colors: [colors.background + (theme.dark ? "00" : "99"), colors.background + (theme.dark ? "99" : "00")],
        style: {
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: 22
        }
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoRouter.Link, {
        asChild: true,
        href: {
          pathname: item.route ?? "/(features)/soon",
          params: item.params
        },
        children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoRouter.Link.AppleZoom, {
          children: /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(Pressable.default, {
            style: styles.headerBtn,
            children: [item.image ? /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Image.default, {
              source: item.image,
              style: {
                width: 32,
                height: 32
              }
            }) : /*#__PURE__*/(0, _reactJsxRuntime.jsx)(View.default, {
              style: {
                backgroundColor: item.color + 30,
                borderRadius: 50,
                aspectRatio: 1,
                width: 42,
                alignItems: 'center',
                justifyContent: 'center'
              },
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
                name: item.icon,
                color: item.color,
                size: 25
              })
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(View.default, {
              style: {
                flex: 1,
                overflow: 'hidden'
              },
              children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
                nowrap: true,
                variant: "h6",
                color: colors.text + "e5",
                style: {
                  lineHeight: 0
                },
                children: item.title
              }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
                nowrap: true,
                variant: "title",
                color: colors.text + "75",
                style: {
                  lineHeight: 0
                },
                children: item.description
              })]
            })]
          })
        })
      })]
    });
  };
  const styles = StyleSheet.default.create({
    headerBtn: {
      flex: 1,
      width: "100%",
      flexDirection: "row",
      borderCurve: "circular",
      borderRadius: 20,
      padding: 10,
      gap: 8,
      alignItems: "center"
    }
  });
  var _default = HomeHeaderButton;
},963,[1002,1000,1427,6,267,334,117,198,1114,1110,1023,1113,97]);