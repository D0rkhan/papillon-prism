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
      return AgeSelection;
    }
  });
  var _expoRouterReactNavigation = require(_dependencyMap[0]);
  var _expoRouter = require(_dependencyMap[1]);
  var _react = require(_dependencyMap[2]);
  var _reactNativeWebDistExportsFlatList = require(_dependencyMap[3]);
  var FlatList = _interopDefault(_reactNativeWebDistExportsFlatList);
  var _reactNativeWebDistExportsStatusBar = require(_dependencyMap[4]);
  var StatusBar = _interopDefault(_reactNativeWebDistExportsStatusBar);
  var _reactNativeWebDistExportsView = require(_dependencyMap[5]);
  var View = _interopDefault(_reactNativeWebDistExportsView);
  var _reactI18next = require(_dependencyMap[6]);
  var _reactNativeSafeAreaContext = require(_dependencyMap[7]);
  var _uiComponentsStack = require(_dependencyMap[8]);
  var Stack = _interopDefault(_uiComponentsStack);
  var _uiNewButton = require(_dependencyMap[9]);
  var Button = _interopDefault(_uiNewButton);
  var _uiNewDivider = require(_dependencyMap[10]);
  var Divider = _interopDefault(_uiNewDivider);
  var _uiNewTypography = require(_dependencyMap[11]);
  var Typography = _interopDefault(_uiNewTypography);
  var _uiComponentsSafeHorizontalView = require(_dependencyMap[12]);
  var SafeHorizontalView = _interopDefault(_uiComponentsSafeHorizontalView);
  var _componentsAgeSelectionIllustrationsHighSchool = require(_dependencyMap[13]);
  var HighSchoolIllustration = _interopDefault(_componentsAgeSelectionIllustrationsHighSchool);
  var _componentsAgeSelectionIllustrationsMiddleSchool = require(_dependencyMap[14]);
  var MiddleSchoolIllustration = _interopDefault(_componentsAgeSelectionIllustrationsMiddleSchool);
  var _componentsAgeSelectionIllustrationsParents = require(_dependencyMap[15]);
  var ParentsIllustration = _interopDefault(_componentsAgeSelectionIllustrationsParents);
  var _componentsAgeSelectionIllustrationsSupSchool = require(_dependencyMap[16]);
  var SupSchoolIllustration = _interopDefault(_componentsAgeSelectionIllustrationsSupSchool);
  var _componentsAgeSelectionIllustrationsTeacher = require(_dependencyMap[17]);
  var TeacherIllustration = _interopDefault(_componentsAgeSelectionIllustrationsTeacher);
  var _componentsOnboardingSelector = require(_dependencyMap[18]);
  var OnboardingSelector = _interopDefault(_componentsOnboardingSelector);
  var _reactJsxRuntime = require(_dependencyMap[19]);
  const LEVELS = [{
    key: "middle-school",
    labelKey: "ONBOARDING_LEVEL_MIDDLE_SCHOOL",
    color: "#008CFF",
    icon: MiddleSchoolIllustration.default,
    type: "school"
  }, {
    key: "high-school",
    labelKey: "ONBOARDING_LEVEL_HIGH_SCHOOL",
    color: "#FFC800",
    icon: HighSchoolIllustration.default,
    type: "school"
  }, {
    key: "sup-school",
    labelKey: "ONBOARDING_LEVEL_UNIVERSITY",
    color: "#68F000",
    icon: SupSchoolIllustration.default,
    type: "univ"
  }, {
    type: 'separator'
  }, {
    key: "parents",
    labelKey: "ONBOARDING_LEVEL_PARENT",
    color: "#ff4d4d",
    icon: ParentsIllustration.default,
    type: "parents"
  }, {
    key: "teacher",
    labelKey: "ONBOARDING_LEVEL_TEACHER",
    color: "#FF0084",
    icon: TeacherIllustration.default,
    type: "teacher"
  }];
  function AgeSelection() {
    const headerHeight = (0, _expoRouterReactNavigation.useHeaderHeight)();
    const theme = (0, _expoRouterReactNavigation.useTheme)();
    const {
      colors
    } = theme;
    const insets = (0, _reactNativeSafeAreaContext.useSafeAreaInsets)();
    const navigation = (0, _expoRouter.useNavigation)();
    const {
      t
    } = (0, _reactI18next.useTranslation)();
    const [selectedLevel, setSelectedLevel] = (0, _react.useState)(null);
    return /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(View.default, {
      style: {
        flex: 1
      },
      children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(StatusBar.default, {
        barStyle: theme.dark ? "light-content" : "dark-content",
        translucent: true
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(FlatList.default, {
        ListHeaderComponent: () => /*#__PURE__*/(0, _reactJsxRuntime.jsx)(SafeHorizontalView.default, {
          base: 20,
          children: /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(Stack.default, {
            style: {
              alignSelf: "center",
              width: "100%",
              maxWidth: 500
            },
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "h2",
              children: t("ONBOARDING_AGE_TITLE")
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "action",
              color: "textSecondary",
              children: t("ONBOARDING_AGE_DESCRIPTION")
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Divider.default, {
              height: 6,
              ghost: true
            })]
          })
        }),
        data: LEVELS.map(level => "labelKey" in level ? {
          ...level,
          label: t(level.labelKey)
        } : level),
        renderItem: ({
          item
        }) => /*#__PURE__*/(0, _reactJsxRuntime.jsx)(SafeHorizontalView.default, {
          base: 20,
          children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(OnboardingSelector.default, {
            item: item,
            selected: selectedLevel,
            setSelected: setSelectedLevel
          })
        }),
        contentContainerStyle: {
          flexGrow: 1,
          gap: 10,
          paddingTop: headerHeight + 20,
          paddingBottom: 20,
          width: "100%",
          maxWidth: 500,
          marginHorizontal: 'auto'
        },
        initialNumToRender: 2,
        maxToRenderPerBatch: 2,
        windowSize: 3,
        style: {
          flex: 1
        }
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(SafeHorizontalView.default, {
        base: 20,
        style: {
          paddingTop: 20,
          paddingBottom: insets.bottom + 20,
          borderTopColor: colors.border,
          borderTopWidth: 1,
          alignItems: 'center'
        },
        children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Button.default, {
          label: t("ONBOARDING_CONTINUE"),
          onPress: () => {
            navigation.navigate("serviceSelection", {
              type: LEVELS.find(level => level.key === selectedLevel)?.type
            });
          },
          disabled: !selectedLevel,
          fullWidth: true,
          maxWidth: 500
        })
      })]
    });
  }
},875,[1000,1023,6,196,341,198,1105,360,1005,1006,1241,1008,1111,879,880,881,882,883,877,97]);