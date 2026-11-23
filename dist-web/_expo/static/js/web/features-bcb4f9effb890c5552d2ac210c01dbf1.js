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
      return SettingsFeatures;
    }
  });
  var _getpapillonPapicons = require(_dependencyMap[0]);
  require(_dependencyMap[1]);
  var _reactNativeWebDistExportsView = require(_dependencyMap[2]);
  var View = _interopDefault(_reactNativeWebDistExportsView);
  var _storesSettings = require(_dependencyMap[3]);
  var _uiNewList = require(_dependencyMap[4]);
  var List = _interopDefault(_uiNewList);
  var _uiNewTypography = require(_dependencyMap[5]);
  var Typography = _interopDefault(_uiNewTypography);
  var _uiNativeNativeSwitch = require(_dependencyMap[6]);
  var NativeSwitch = _interopDefault(_uiNativeNativeSwitch);
  var _reactI18next = require(_dependencyMap[7]);
  var _uiComponentsIcon = require(_dependencyMap[8]);
  var Icon = _interopDefault(_uiComponentsIcon);
  var _react = require(_dependencyMap[9]);
  var _utilsGradesScale = require(_dependencyMap[10]);
  var _uiComponentsPicker = require(_dependencyMap[11]);
  var Picker = _interopDefault(_uiComponentsPicker);
  var _expoRouterReactNavigation = require(_dependencyMap[12]);
  var _getpapillonPapillonkit = require(_dependencyMap[13]);
  var PapillonKit = _interopNamespace(_getpapillonPapillonkit);
  var _reactJsxRuntime = require(_dependencyMap[14]);
  function SettingsFeatures() {
    const {
      t
    } = (0, _reactI18next.useTranslation)();
    const {
      colors
    } = (0, _expoRouterReactNavigation.useTheme)();
    const settingsStore = (0, _storesSettings.useSettingsStore)(state => state.personalization);
    const mutateProperty = (0, _storesSettings.useSettingsStore)(state => state.mutateProperty);
    const iOSBottomAccessoryEnabled = settingsStore.iOSBottomAccessoryEnabled ?? true;
    const showTabBarLabels = settingsStore.showTabBarLabels ?? true;
    const liveActivitiesEnabled = settingsStore.liveActivitiesEnabled ?? true;
    const selectedGradeScale = (0, _utilsGradesScale.getGradeDisplayScale)(settingsStore.gradesDisplayScale);
    const gradeScaleOptions = [{
      label: "Note sur 20",
      value: "20"
    }, {
      label: "Note sur 10",
      value: "10"
    }, {
      label: "Note sur 5",
      value: "5"
    }, {
      label: "Pourcentage",
      value: "percentage"
    }];
    const selectedGradeScaleIndex = (0, _react.useMemo)(() => {
      return Math.max(0, gradeScaleOptions.findIndex(option => option.value === selectedGradeScale));
    }, [selectedGradeScale]);
    return /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default, {
      contentInsetAdjustmentBehavior: "automatic",
      safeHorizontalPadding: 16,
      contentContainerStyle: {
        paddingVertical: 16
      },
      style: {
        flex: 1,
        backgroundColor: colors.overground
      },
      children: [/*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Section, {
        children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.SectionTitle, {
          children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Label, {
            children: t("Settings_Features_TabBar")
          })
        }), false, /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Item, {
          children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Leading, {
            children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Icon.default, {
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
                name: "Font"
              })
            })
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
            variant: "title",
            children: t("Settings_Features_ShowTabBarLabels")
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
            color: "textSecondary",
            numberOfLines: 2,
            children: t("Settings_Features_ShowTabBarLabels_Description")
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Trailing, {
            children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(NativeSwitch.default, {
              value: showTabBarLabels,
              onValueChange: value => mutateProperty("personalization", {
                ...settingsStore,
                showTabBarLabels: value
              })
            })
          })]
        })]
      }), PapillonKit.features.liveActivities && /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Section, {
        children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.SectionTitle, {
          children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Label, {
            children: t("Settings_Features_LockScreen")
          })
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Item, {
          children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Leading, {
            children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Icon.default, {
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
                name: "Clock"
              })
            })
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
            variant: "title",
            children: t("Settings_Features_LiveActivities")
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
            color: "textSecondary",
            numberOfLines: 3,
            children: t("Settings_Features_LiveActivities_Description")
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Trailing, {
            children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(NativeSwitch.default, {
              value: liveActivitiesEnabled,
              onValueChange: value => mutateProperty("personalization", {
                ...settingsStore,
                liveActivitiesEnabled: value
              })
            })
          })]
        })]
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Section, {
        children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.SectionTitle, {
          children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Label, {
            children: t("Settings_Features_Grades")
          })
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Item, {
          children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Leading, {
            children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Icon.default, {
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
                name: "Grades"
              })
            })
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
            variant: "body2",
            color: "primary",
            children: t("Global_Experimental")
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
            variant: "title",
            children: t("Settings_Features_GradeScale")
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
            color: "textSecondary",
            numberOfLines: 2,
            children: t("Settings_Features_GradeScale_Description")
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Trailing, {
            children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(View.default, {
              style: {
                width: 120,
                alignItems: "flex-end"
              },
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Picker.default, {
                options: gradeScaleOptions.map(option => option.label),
                selectedIndex: selectedGradeScaleIndex,
                onValueChange: index => mutateProperty("personalization", {
                  gradesDisplayScale: gradeScaleOptions[index].value
                })
              })
            })
          })]
        })]
      })]
    });
  }
},920,[1002,193,198,1012,1007,1008,1130,1105,1013,6,1370,1371,1000,1019,97]);