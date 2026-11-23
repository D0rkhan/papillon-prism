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
      return Requests;
    }
  });
  var _storesLogs = require(_dependencyMap[0]);
  var _uiComponentsStack = require(_dependencyMap[1]);
  var Stack = _interopDefault(_uiComponentsStack);
  var _uiComponentsTabHeader = require(_dependencyMap[2]);
  var TabHeader = _interopDefault(_uiComponentsTabHeader);
  var _uiComponentsTabHeaderTitle = require(_dependencyMap[3]);
  var TabHeaderTitle = _interopDefault(_uiComponentsTabHeaderTitle);
  var _uiNewList = require(_dependencyMap[4]);
  var List = _interopDefault(_uiNewList);
  var _uiNewTypography = require(_dependencyMap[5]);
  var Typography = _interopDefault(_uiNewTypography);
  var _getpapillonPapicons = require(_dependencyMap[6]);
  var _expoRouterReactNavigation = require(_dependencyMap[7]);
  var _expoRouter = require(_dependencyMap[8]);
  var _react = require(_dependencyMap[9]);
  var _reactNativeWebDistExportsView = require(_dependencyMap[10]);
  var View = _interopDefault(_reactNativeWebDistExportsView);
  var _reactJsxRuntime = require(_dependencyMap[11]);
  function Requests() {
    const theme = (0, _expoRouterReactNavigation.useTheme)();
    const {
      colors
    } = theme;
    const local = (0, _expoRouter.useLocalSearchParams)();
    const requests = (0, _storesLogs.useNetworkStore)(state => state.hosts.get(local.host)?.requests ?? []);
    const responses = (0, _storesLogs.useNetworkStore)(state => state.hosts.get(local.host)?.responses ?? []);
    const [height, setHeight] = (0, _react.useState)(0);
    function getMethodColor(method) {
      switch (method) {
        case "POST":
          return "#E8901C";
        case "PUT":
          return "#009EC5";
        case "PATCH":
          return "#7600CA";
        case "DELETE":
          return "#C50017";
        default:
          return "#37BB12";
      }
    }
    return /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(View.default, {
      style: {
        padding: 16,
        gap: 20,
        flex: 1,
        backgroundColor: colors.overground
      },
      children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(TabHeader.default, {
        modal: true,
        onHeightChanged: setHeight,
        backgroundColor: "#37BB12",
        title: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(TabHeaderTitle.default, {
          color: colors.primary,
          leading: "Liste des requ\xEAtes",
          subtitle: local.host,
          chevron: false,
          loading: false
        })
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default, {
        showsVerticalScrollIndicator: false,
        contentInsetAdjustmentBehavior: "always",
        contentContainerStyle: {
          padding: 5,
          paddingTop: height,
          paddingBottom: 130
        },
        children: requests.map(item => Object.entries(item).map(([key, request]) => /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Item, {
          onPress: () => {
            _expoRouter.router.push({
              pathname: "/(dev)/request",
              params: {
                host: local.host,
                uuid: key
              }
            });
          },
          children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Leading, {
            children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              style: {
                width: 45
              },
              color: getMethodColor(request.method),
              weight: "bold",
              children: request.method
            })
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
            numberOfLines: 2,
            children: request.url
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Trailing, {
            children: /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(Stack.default, {
              direction: "horizontal",
              vAlign: "center",
              hAlign: "center",
              children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(View.default, {
                style: {
                  paddingVertical: 3,
                  paddingHorizontal: 7,
                  borderWidth: 2,
                  borderColor: "#37BB12",
                  borderRadius: 100
                },
                children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
                  color: "#37BB12",
                  weight: "bold",
                  children: responses.find(item => key in item)?.[key]?.status ?? "—"
                })
              }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
                name: "ChevronRight",
                opacity: 0.8,
                color: colors.text
              })]
            })
          })]
        }, key)))
      })]
    });
  }
},856,[1003,1005,1025,1026,1007,1008,1002,1000,1023,6,198,97]);