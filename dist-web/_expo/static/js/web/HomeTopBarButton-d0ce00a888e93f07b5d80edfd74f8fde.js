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
  var _reactNativeWebDistExportsPressable = require(_dependencyMap[1]);
  var Pressable = _interopDefault(_reactNativeWebDistExportsPressable);
  var _sbaiahmed1ReactNativeBlur = require(_dependencyMap[2]);
  var _uiComponentsIcon = require(_dependencyMap[3]);
  var Icon = _interopDefault(_uiComponentsIcon);
  var _getpapillonPapicons = require(_dependencyMap[4]);
  var _expoRouter = require(_dependencyMap[5]);
  var _reactJsxRuntime = require(_dependencyMap[6]);
  const HomeTopBarButton = ({
    icon,
    route
  }) => {
    return /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_sbaiahmed1ReactNativeBlur.LiquidGlassView, {
      glassType: "clear",
      isInteractive: true,
      glassOpacity: 0,
      style: {
        width: 42,
        height: 42,
        borderRadius: 30
      },
      children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoRouter.Link, {
        asChild: true,
        href: route ?? "/(features)/soon",
        children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Pressable.default, {
          style: {
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center'
          },
          children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Icon.default, {
            size: 26,
            fill: "white",
            children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
              name: icon
            })
          })
        })
      })
    });
  };
  var _default = HomeTopBarButton;
},965,[6,334,1427,1013,1002,1023,97]);