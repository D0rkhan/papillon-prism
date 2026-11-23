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
      return Network;
    }
  });
  var _react = require(_dependencyMap[0]);
  var _reactNativeWebDistExportsView = require(_dependencyMap[1]);
  var View = _interopDefault(_reactNativeWebDistExportsView);
  var _expoRouterReactNavigation = require(_dependencyMap[2]);
  var _getpapillonPapicons = require(_dependencyMap[3]);
  var _componentsDevmodeDisclosure = require(_dependencyMap[4]);
  var Disclosure = _interopDefault(_componentsDevmodeDisclosure);
  var _storesLogs = require(_dependencyMap[5]);
  var _uiComponentsStack = require(_dependencyMap[6]);
  var Stack = _interopDefault(_uiComponentsStack);
  var _uiNewList = require(_dependencyMap[7]);
  var List = _interopDefault(_uiNewList);
  var _uiNewTypography = require(_dependencyMap[8]);
  var Typography = _interopDefault(_uiNewTypography);
  var _reactJsxRuntime = require(_dependencyMap[9]);
  const HOSTS = {
    "index-education": {
      title: "PRONOTE",
      icon: "Pronote"
    },
    "ecoledirecte.com": {
      title: "École Directe",
      icon: "Ecoledirecte"
    },
    "api.skolengo.com": {
      title: "Skolengo",
      icon: "Skolengo"
    },
    "analytics.papillon.bzh": {
      title: "Télémétrie",
      icon: "PapillonIcon"
    },
    "github.com": {
      title: "Ressources",
      icon: "Code"
    },
    "geopf.fr": {
      title: "Localisation",
      icon: "MapPin"
    },
    "raw.githubusercontent.com": {
      title: "GitHub",
      icon: "Code"
    }
  };
  function Network() {
    const {
      colors
    } = (0, _expoRouterReactNavigation.useTheme)();
    const hosts = (0, _storesLogs.useNetworkStore)(state => state.hosts);
    const entries = (0, _react.useMemo)(() => Array.from(hosts.entries()).map(([origin, host]) => {
      const url = new URL(origin);
      const match = Object.entries(HOSTS).find(([key]) => url.host.toLowerCase().includes(key));
      return {
        origin,
        url,
        count: host.requests.length,
        title: match?.[1].title ?? url.host,
        icon: match?.[1].icon ?? "Globe"
      };
    }).sort((a, b) => b.count - a.count), [hosts]);
    return /*#__PURE__*/(0, _reactJsxRuntime.jsx)(View.default, {
      style: {
        flex: 1,
        backgroundColor: colors.overground
      },
      children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default, {
        showsVerticalScrollIndicator: false,
        contentInsetAdjustmentBehavior: "always",
        contentContainerStyle: {
          padding: 16,
          paddingBottom: 60
        },
        children: entries.length === 0 ? /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.View, {
          id: "empty",
          children: /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(Stack.default, {
            gap: 6,
            hAlign: "center",
            style: {
              paddingVertical: 40
            },
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
              name: "Globe",
              color: String(colors.text) + "66"
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "body1",
              color: "textSecondary",
              align: "center",
              children: "Aucune requ\xEAte depuis le lancement."
            })]
          })
        }) : /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Section, {
          id: "hosts",
          children: [/*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.SectionTitle, {
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
              name: "Globe",
              color: String(colors.text) + "88"
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Label, {
              children: `${entries.length} serveur${entries.length > 1 ? "s" : ""}`
            })]
          }), entries.map(entry => {
            const secure = entry.url.protocol === "https:";
            return /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Item, {
              id: entry.origin,
              href: {
                pathname: "/(dev)/requests",
                params: {
                  host: entry.origin
                }
              },
              children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Leading, {
                children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
                  name: entry.icon,
                  color: String(colors.text),
                  opacity: 0.8
                })
              }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
                variant: "action",
                numberOfLines: 1,
                children: entry.title
              }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(Stack.default, {
                direction: "horizontal",
                hAlign: "center",
                gap: 4,
                children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
                  name: secure ? "Lock" : "Unlock",
                  size: 14,
                  color: secure ? "#6BAE00" : "#C50017"
                }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
                  variant: "body2",
                  color: "textSecondary",
                  numberOfLines: 1,
                  children: secure ? entry.url.host : `${entry.url.host} · non chiffré`
                })]
              }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Trailing, {
                children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Disclosure.default, {
                  value: entry.count
                })
              })]
            }, entry.origin);
          })]
        })
      })
    });
  }
},851,[6,198,1000,1002,1016,1003,1005,1007,1008,97]);