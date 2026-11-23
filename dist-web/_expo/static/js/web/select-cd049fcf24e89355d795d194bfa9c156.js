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
      return PronoteLoginSelectEtab;
    }
  });
  var _expoRouterReactNavigation = require(_dependencyMap[0]);
  var _expoRouter = require(_dependencyMap[1]);
  var _blockshubPawnoteLts = require(_dependencyMap[2]);
  var _react = require(_dependencyMap[3]);
  var _reactI18next = require(_dependencyMap[4]);
  var _reactNativeWebDistExportsImage = require(_dependencyMap[5]);
  var Image = _interopDefault(_reactNativeWebDistExportsImage);
  var _reactNativeWebDistExportsKeyboardAvoidingView = require(_dependencyMap[6]);
  var KeyboardAvoidingView = _interopDefault(_reactNativeWebDistExportsKeyboardAvoidingView);
  require(_dependencyMap[7]);
  var _reactNativeSafeAreaContext = require(_dependencyMap[8]);
  var _utilsFormatFormatSchoolName = require(_dependencyMap[9]);
  var _uiComponentsActivityIndicator = require(_dependencyMap[10]);
  var ActivityIndicator = _interopDefault(_uiComponentsActivityIndicator);
  var _uiComponentsDynamic = require(_dependencyMap[11]);
  var _uiComponentsSearch = require(_dependencyMap[12]);
  var Search = _interopDefault(_uiComponentsSearch);
  var _uiComponentsStack = require(_dependencyMap[13]);
  var Stack = _interopDefault(_uiComponentsStack);
  var _uiNewDivider = require(_dependencyMap[14]);
  var Divider = _interopDefault(_uiNewDivider);
  var _uiNewList = require(_dependencyMap[15]);
  var List = _interopDefault(_uiNewList);
  var _uiNewTypography = require(_dependencyMap[16]);
  var Typography = _interopDefault(_uiNewTypography);
  var _uiComponentsSafeHorizontalView = require(_dependencyMap[17]);
  var SafeHorizontalView = _interopDefault(_uiComponentsSafeHorizontalView);
  var _reactJsxRuntime = require(_dependencyMap[18]);
  const PronoteSearchHeader = /*#__PURE__*/(0, _react.memo)(({
    search,
    setSearch,
    loading,
    t
  }) => /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(Stack.default, {
    padding: [4, 0],
    children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
      variant: "h2",
      children: t("ONBOARDING_SELECT_SCHOOL")
    }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
      variant: "action",
      color: "textSecondary",
      children: t("ONBOARDING_PRONOTE_LOCATION_HELP")
    }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Divider.default, {
      height: 6,
      ghost: true
    }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Search.default, {
      placeholder: t("ONBOARDING_SEARCH_SCHOOL_PLACEHOLDER"),
      style: {
        width: "100%"
      },
      value: search,
      setValue: setSearch,
      onTextChange: setSearch
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
  function PronoteLoginSelectEtab() {
    const headerHeight = (0, _expoRouterReactNavigation.useHeaderHeight)();
    const {
      colors
    } = (0, _expoRouterReactNavigation.useTheme)();
    const insets = (0, _reactNativeSafeAreaContext.useSafeAreaInsets)();
    const navigation = (0, _expoRouter.useNavigation)();
    const {
      t
    } = (0, _reactI18next.useTranslation)();
    const {
      params
    } = (0, _expoRouterReactNavigation.useRoute)();
    const {
      city
    } = params;
    const [search, setSearch] = (0, _react.useState)("");
    const [schools, setSchools] = (0, _react.useState)([]);
    const [loading, setLoading] = (0, _react.useState)(true);
    (0, _react.useEffect)(() => {
      if (!city) {
        return;
      }
      navigation.setOptions({
        headerTitle: t("ONBOARDING_SCHOOLS_IN_CITY", {
          city: city.city
        })
      });
      (0, _blockshubPawnoteLts.geolocation)({
        latitude: city?.latitude ?? 0,
        longitude: city?.longitude ?? 0
      }).then(schoolsFound => {
        setSchools(schoolsFound);
        setLoading(false);
      });
    }, [city, navigation, t]);
    const filteredSchools = schools.filter(school => school.name.toLowerCase().includes(search.toLowerCase()));
    const selectSchool = school => {
      navigation.navigate("browser", {
        url: school.url,
        school
      });
    };
    return /*#__PURE__*/(0, _reactJsxRuntime.jsx)(KeyboardAvoidingView.default, {
      style: {
        flex: 1,
        backgroundColor: colors.overground
      },
      behavior: 'height',
      keyboardVerticalOffset: 20,
      children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default, {
        animated: true,
        ListHeaderComponent: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(SafeHorizontalView.default, {
          base: 16,
          children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(PronoteSearchHeader, {
            search: search,
            setSearch: setSearch,
            loading: loading,
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
        children: filteredSchools.map(school => /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Item, {
          animated: true,
          id: school.url,
          onPress: () => selectSchool(school),
          children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Leading, {
            children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Image.default, {
              source: require(_dependencyMap[19]),
              style: {
                width: 32,
                height: 32,
                borderRadius: 8
              }
            })
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
            variant: "title",
            numberOfLines: 2,
            children: (0, _utilsFormatFormatSchoolName.formatSchoolName)(school.name)
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
            variant: "body",
            color: "textSecondary",
            numberOfLines: 1,
            children: school.url
          })]
        }, school.url))
      })
    });
  }
},906,[1000,1023,1315,6,1105,267,326,193,360,1316,1129,1136,1137,1005,1241,1007,1008,1111,97,1343]);