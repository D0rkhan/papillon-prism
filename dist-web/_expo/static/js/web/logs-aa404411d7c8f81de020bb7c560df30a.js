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
      return Logs;
    }
  });
  var _react = require(_dependencyMap[0]);
  var _reactNativeWebDistExportsView = require(_dependencyMap[1]);
  var View = _interopDefault(_reactNativeWebDistExportsView);
  var _expoRouterReactNavigation = require(_dependencyMap[2]);
  var _expoClipboard = require(_dependencyMap[3]);
  var Clipboard = _interopNamespace(_expoClipboard);
  var _getpapillonPapicons = require(_dependencyMap[4]);
  var _componentsLogLogIcon = require(_dependencyMap[5]);
  var LogIcon = _interopDefault(_componentsLogLogIcon);
  var _storesLogs = require(_dependencyMap[6]);
  var _storesLogsTypes = require(_dependencyMap[7]);
  var _uiComponentsStack = require(_dependencyMap[8]);
  var Stack = _interopDefault(_uiComponentsStack);
  var _uiNewButton = require(_dependencyMap[9]);
  var Button = _interopDefault(_uiNewButton);
  var _uiNewList = require(_dependencyMap[10]);
  var List = _interopDefault(_uiNewList);
  var _uiNewTypography = require(_dependencyMap[11]);
  var Typography = _interopDefault(_uiNewTypography);
  var _utilsDevmodeActions = require(_dependencyMap[12]);
  var _reactJsxRuntime = require(_dependencyMap[13]);
  const FILTERS = [{
    value: "all",
    label: "Tout"
  }, {
    value: _storesLogsTypes.LogType.ERROR,
    label: "Erreurs"
  }, {
    value: _storesLogsTypes.LogType.WARN,
    label: "Alertes"
  }];
  const PAGE = 50;
  function Logs() {
    const {
      colors
    } = (0, _expoRouterReactNavigation.useTheme)();
    const logs = (0, _storesLogs.useLogStore)(state => state.logs);
    const [filter, setFilter] = (0, _react.useState)("all");
    const [limit, setLimit] = (0, _react.useState)(PAGE);
    const [copied, setCopied] = (0, _react.useState)(false);
    const filtered = (0, _react.useMemo)(() => logs.filter(log => filter === "all" || log.type === filter).reverse(), [logs, filter]);
    const visible = filtered.slice(0, limit);
    const count = value => value === "all" ? logs.length : logs.filter(log => log.type === value).length;
    const selectFilter = value => {
      setFilter(value);
      setLimit(PAGE);
      setCopied(false);
    };
    const copyLogs = async () => {
      await Clipboard.setStringAsync(filtered.map(log => `[${log.date}] ${log.type} ${log.from ?? "?"} · ${log.message}`).join("\n"));
      setCopied(true);
    };
    return /*#__PURE__*/(0, _reactJsxRuntime.jsx)(View.default, {
      style: {
        flex: 1,
        backgroundColor: colors.overground
      },
      children: /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default, {
        showsVerticalScrollIndicator: false,
        contentInsetAdjustmentBehavior: "always",
        contentContainerStyle: {
          padding: 16,
          paddingBottom: 60
        },
        children: [/*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.View, {
          id: "filters",
          children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Stack.default, {
            direction: "horizontal",
            gap: 8,
            style: {
              marginBottom: 8
            },
            children: FILTERS.map(item => /*#__PURE__*/(0, _reactJsxRuntime.jsx)(View.default, {
              style: {
                flex: 1
              },
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Button.default, {
                label: `${item.label} ${count(item.value)}`,
                variant: filter === item.value ? "primary" : "secondary",
                height: 40,
                fullWidth: true,
                onPress: () => selectFilter(item.value)
              })
            }, item.value))
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Button.default, {
            label: copied ? "Journaux copiés" : `Copier ${filtered.length} journaux`,
            variant: "ghost",
            height: 40,
            fullWidth: true,
            disabled: filtered.length === 0,
            onPress: copyLogs,
            style: {
              marginBottom: 16
            }
          })]
        }), filtered.length === 0 ? /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.View, {
          id: "empty",
          children: /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(Stack.default, {
            gap: 6,
            hAlign: "center",
            style: {
              paddingVertical: 40
            },
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
              name: "Check",
              color: String(colors.text) + "66"
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "body1",
              color: "textSecondary",
              align: "center",
              children: filter === "all" ? "Aucun journal depuis le lancement." : "Rien dans cette catégorie."
            })]
          })
        }) : /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Section, {
          id: "entries",
          children: [visible.map((log, index) => /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Item, {
            id: `${log.date}-${index}`,
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Leading, {
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(LogIcon.default, {
                type: log.type
              })
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "body2",
              numberOfLines: 8,
              children: log.message
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "caption",
              color: "textSecondary",
              children: `${(0, _utilsDevmodeActions.formatTime)(new Date(log.date).getTime())} · ${log.from ?? "origine inconnue"}`
            })]
          }, `${log.date}-${index}`)), filtered.length > limit ? /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Item, {
            id: "more",
            onPress: () => setLimit(limit + PAGE),
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Leading, {
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
                name: "Plus",
                color: String(colors.text)
              })
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "action",
              children: `Afficher ${Math.min(PAGE, filtered.length - limit)} de plus`
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "body2",
              color: "textSecondary",
              children: `${filtered.length - limit} restants`
            })]
          }) : null]
        })]
      })
    });
  }
},849,[6,198,1000,1001,1002,999,1003,1004,1005,1006,1007,1008,1009,97]);
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
  var _lucideReactNative = require(_dependencyMap[0]);
  require(_dependencyMap[1]);
  var _reactNativeWebDistExportsView = require(_dependencyMap[2]);
  var View = _interopDefault(_reactNativeWebDistExportsView);
  var _reactJsxRuntime = require(_dependencyMap[3]);
  const ICON_COLORS = {
    ERROR: '#BE0B00',
    WARN: '#CF6B0F',
    INFO: '#0E7CCB',
    LOG: '#AAA'
  };
  const ICON_COMPONENTS = {
    ERROR: _lucideReactNative.AlertCircle,
    WARN: _lucideReactNative.TriangleAlert,
    INFO: _lucideReactNative.Info,
    LOG: _lucideReactNative.Info
  };
  const LogIcon = ({
    type
  }) => {
    const backgroundColor = ICON_COLORS[type] || ICON_COLORS.LOG;
    const Icon = ICON_COMPONENTS[type] || ICON_COMPONENTS.LOG;
    return /*#__PURE__*/(0, _reactJsxRuntime.jsx)(View.default, {
      style: {
        width: 35,
        height: 35,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor
      },
      children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Icon, {
        color: "#fff",
        size: 24
      })
    });
  };
  var _default = LogIcon;
},999,[1010,6,198,97]);