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
      return RequestDetails;
    }
  });
  var _react = require(_dependencyMap[0]);
  var _reactNativeWebDistExportsView = require(_dependencyMap[1]);
  var View = _interopDefault(_reactNativeWebDistExportsView);
  var _expoRouter = require(_dependencyMap[2]);
  var _expoClipboard = require(_dependencyMap[3]);
  var Clipboard = _interopNamespace(_expoClipboard);
  var _expoRouterReactNavigation = require(_dependencyMap[4]);
  var _storesLogs = require(_dependencyMap[5]);
  var _uiComponentsButton = require(_dependencyMap[6]);
  var Button = _interopDefault(_uiComponentsButton);
  var _uiComponentsTabHeader = require(_dependencyMap[7]);
  var TabHeader = _interopDefault(_uiComponentsTabHeader);
  var _uiComponentsTabHeaderTitle = require(_dependencyMap[8]);
  var TabHeaderTitle = _interopDefault(_uiComponentsTabHeaderTitle);
  var _uiNewList = require(_dependencyMap[9]);
  var List = _interopDefault(_uiNewList);
  var _uiNewTypography = require(_dependencyMap[10]);
  var Typography = _interopDefault(_uiNewTypography);
  var _reactJsxRuntime = require(_dependencyMap[11]);
  function RequestDetails() {
    const {
      colors
    } = (0, _expoRouterReactNavigation.useTheme)();
    const {
      host,
      uuid
    } = (0, _expoRouter.useLocalSearchParams)();
    const [height, setHeight] = (0, _react.useState)(0);
    const [responseBody, setResponseBody] = (0, _react.useState)(null);
    const requestData = (0, _storesLogs.useNetworkStore)(state => state.hosts.get(host)?.requests.find(item => uuid in item)?.[uuid]);
    const url = (0, _react.useMemo)(() => requestData ? new URL(requestData.url) : null, [requestData]);
    (0, _react.useEffect)(() => {
      if (!requestData) return;
      const parse = async () => {
        try {
          const data = await requestData.clone().json();
          setResponseBody(data);
        } catch {
          const text = await requestData.clone().text().catch(() => "Erreur de lecture");
          setResponseBody(text);
        }
      };
      parse();
    }, [requestData]);
    if (!requestData) return null;
    const handleCopy = async () => {
      const content = `[${requestData.method}] ${requestData.url}\n\nBody:\n${JSON.stringify(responseBody, null, 2)}`;
      await Clipboard.setStringAsync(content);
    };
    const renderItem = (label, value) => /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Item, {
      children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
        children: label
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
        variant: "subtitle",
        color: "textSecondary",
        children: value || "—"
      })]
    });
    return /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(View.default, {
      style: {
        padding: 16,
        paddingTop: height,
        flex: 1,
        backgroundColor: colors.overground
      },
      children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(TabHeader.default, {
        modal: true,
        onHeightChanged: setHeight,
        title: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(TabHeaderTitle.default, {
          color: colors.primary,
          subtitle: url?.pathname,
          chevron: false
        })
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default, {
        showsVerticalScrollIndicator: false,
        contentContainerStyle: {
          padding: 5,
          paddingBottom: 130
        },
        gap: 20,
        children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Button.default, {
          onPress: handleCopy,
          children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
            color: "#FFFFFF",
            children: "Copier les informations"
          })
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Section, {
          children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.SectionTitle, {
            children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              children: "Informations"
            })
          }), renderItem("Méthode", requestData.method), renderItem("Credentials", requestData.credentials), renderItem("URL", requestData.url)]
        }), requestData.headers && /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Section, {
          children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.SectionTitle, {
            children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              children: "En-t\xEAtes Requ\xEAte"
            })
          }), Array.from(requestData.headers.entries()).map(([key, val]) => renderItem(key, val))]
        }), responseBody && /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Section, {
          children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.SectionTitle, {
            children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              children: "Corps de la r\xE9ponse"
            })
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Item, {
            children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "subtitle",
              color: "textSecondary",
              style: {
                fontSize: 11
              },
              children: typeof responseBody === 'object' ? JSON.stringify(responseBody, null, 2) : responseBody
            })
          })]
        })]
      })]
    });
  }
},855,[6,198,1023,1001,1000,1003,1024,1025,1026,1007,1008,97]);