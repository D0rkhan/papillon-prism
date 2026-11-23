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
      return PronoteLoginMethod;
    }
  });
  var _getpapillonPapicons = require(_dependencyMap[0]);
  var _expoRouterReactNavigation = require(_dependencyMap[1]);
  var _expoRouter = require(_dependencyMap[2]);
  var _react = require(_dependencyMap[3]);
  var _reactI18next = require(_dependencyMap[4]);
  var _reactNativeWebDistExportsKeyboardAvoidingView = require(_dependencyMap[5]);
  var KeyboardAvoidingView = _interopDefault(_reactNativeWebDistExportsKeyboardAvoidingView);
  require(_dependencyMap[6]);
  var _reactNativeSafeAreaContext = require(_dependencyMap[7]);
  var _uiComponentsActivityIndicator = require(_dependencyMap[8]);
  var ActivityIndicator = _interopDefault(_uiComponentsActivityIndicator);
  var _uiComponentsDynamic = require(_dependencyMap[9]);
  var _uiComponentsIcon = require(_dependencyMap[10]);
  var Icon = _interopDefault(_uiComponentsIcon);
  var _uiComponentsSearch = require(_dependencyMap[11]);
  var Search = _interopDefault(_uiComponentsSearch);
  var _uiComponentsStack = require(_dependencyMap[12]);
  var Stack = _interopDefault(_uiComponentsStack);
  var _uiNewDivider = require(_dependencyMap[13]);
  var Divider = _interopDefault(_uiNewDivider);
  var _uiNewList = require(_dependencyMap[14]);
  var List = _interopDefault(_uiNewList);
  var _uiNewTypography = require(_dependencyMap[15]);
  var Typography = _interopDefault(_uiNewTypography);
  var _utilsNativeGeoreverse = require(_dependencyMap[16]);
  var _uiComponentsSafeHorizontalView = require(_dependencyMap[17]);
  var SafeHorizontalView = _interopDefault(_uiComponentsSafeHorizontalView);
  var _reactJsxRuntime = require(_dependencyMap[18]);
  const convertPostalCode = postalCode => {
    if (postalCode.length < 5) {
      return "0" + postalCode;
    }
    return postalCode;
  };
  const PronoteSearchHeader = /*#__PURE__*/(0, _react.memo)(({
    city,
    setCity,
    loading,
    showElse,
    t
  }) => /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(Stack.default, {
    padding: [4, 0],
    children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
      variant: "h2",
      children: t("ONBOARDING_SEARCH_TITLE")
    }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
      variant: "action",
      color: "textSecondary",
      children: t("ONBOARDING_PRONOTE_LOCATION_HELP")
    }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Divider.default, {
      height: 6,
      ghost: true
    }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Search.default, {
      placeholder: t("ONBOARDING_METHOD_SEARCH"),
      style: {
        width: "100%"
      },
      value: city,
      setValue: setCity,
      onTextChange: setCity,
      autoFocus: city.trim().length === 0
    }), loading && /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_uiComponentsDynamic.Dynamic, {
      animated: true,
      children: /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(Stack.default, {
        vAlign: "center",
        hAlign: "center",
        width: "100%",
        gap: 2,
        children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Divider.default, {
          height: 18,
          ghost: true
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(ActivityIndicator.default, {}), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Divider.default, {
          height: 12,
          ghost: true
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
          align: "center",
          variant: "h5",
          children: t("ONBOARDING_SCHOOLS_SEARCHING")
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
          align: "center",
          variant: "body",
          color: "textSecondary",
          children: t("ONBOARDING_SCHOOLS_SEARCHING_HINT")
        })]
      })
    }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Divider.default, {
      height: 18,
      ghost: true
    })]
  }));
  function PronoteLoginMethod() {
    const headerHeight = (0, _expoRouterReactNavigation.useHeaderHeight)();
    const {
      colors
    } = (0, _expoRouterReactNavigation.useTheme)();
    const insets = (0, _reactNativeSafeAreaContext.useSafeAreaInsets)();
    const navigation = (0, _expoRouter.useNavigation)();
    const {
      t
    } = (0, _reactI18next.useTranslation)();
    const [city, setCity] = (0, _react.useState)("");
    const [debouncedCity, setDebouncedCity] = (0, _react.useState)("");
    const [cities, setCities] = (0, _react.useState)([]);
    const [loading, setLoading] = (0, _react.useState)(false);
    (0, _react.useEffect)(() => {
      const timeout = setTimeout(() => {
        setDebouncedCity(city.trim());
      }, 350);
      return () => {
        clearTimeout(timeout);
      };
    }, [city]);
    (0, _react.useEffect)(() => {
      if (!debouncedCity || debouncedCity.length < 3) {
        setCities([]);
        setLoading(false);
      } else {
        let canceled = false;
        setLoading(true);
        (0, _utilsNativeGeoreverse.GeographicSearchCities)(debouncedCity).then(cities => {
          if (canceled) {
            return;
          }
          setCities(cities.sort((a, b) => b.importance - a.importance).splice(0, 10));
        }).finally(() => {
          if (canceled) {
            return;
          }
          setLoading(false);
        });
        return () => {
          canceled = true;
        };
      }
    }, [debouncedCity]);
    const selectCity = city => {
      navigation.navigate(`select`, {
        city: city
      });
    };
    return /*#__PURE__*/(0, _reactJsxRuntime.jsx)(KeyboardAvoidingView.default, {
      style: {
        flex: 1,
        backgroundColor: colors.overground
      },
      behavior: 'height',
      keyboardVerticalOffset: 20,
      children: /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default, {
        ListHeaderComponent: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(SafeHorizontalView.default, {
          base: 16,
          children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(PronoteSearchHeader, {
            city: city,
            setCity: setCity,
            loading: loading && cities.length === 0,
            showElse: cities.length === 0 && !loading,
            t: t
          })
        }),
        safeHorizontalPadding: 16,
        contentContainerStyle: {
          flexGrow: 1,
          gap: 10,
          paddingTop: headerHeight + 20,
          paddingBottom: insets.bottom + 20
        },
        style: {
          flex: 1
        },
        animated: true,
        children: [cities.length === 0 && !loading && /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Item, {
          animated: true,
          onPress: () => navigation.navigate("qrcode"),
          children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Leading, {
            children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Icon.default, {
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
                name: "qrcode"
              })
            })
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
            variant: "title",
            children: t("ONBOARDING_PRONOTE_LOGIN_QRCODE")
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
            variant: "body",
            color: "textSecondary",
            children: t("ONBOARDING_PRONOTE_LOGIN_QRCODE_DESCRIPTION")
          })]
        }), cities.length === 0 && !loading && /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Item, {
          animated: true,
          onPress: () => navigation.navigate("url"),
          children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Leading, {
            children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Icon.default, {
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
                name: "link"
              })
            })
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
            variant: "title",
            children: t("ONBOARDING_PRONOTE_LOGIN_URL")
          })]
        }), cities.map((city, i) => /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Item, {
          animated: true,
          id: city.id,
          onPress: () => {
            selectCity(city);
          },
          children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Leading, {
            children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Icon.default, {
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
                name: "mappin"
              })
            })
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
            variant: "title",
            children: city.city
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
            variant: "body1",
            color: "textSecondary",
            children: city.context
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Trailing, {
            children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "body1",
              color: "textSecondary",
              children: convertPostalCode(city.postalCode.toString())
            })
          })]
        }, city.id))]
      })
    });
  }
},904,[1002,1000,1023,6,1105,326,193,360,1129,1136,1013,1137,1005,1241,1007,1008,1322,1111,97]);