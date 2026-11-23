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
      return SubjectModal;
    }
  });
  var _getpapillonPapicons = require(_dependencyMap[0]);
  var _expoRouterReactNavigation = require(_dependencyMap[1]);
  var _expoRouter = require(_dependencyMap[2]);
  var _i18next = require(_dependencyMap[3]);
  var _react = require(_dependencyMap[4]);
  require(_dependencyMap[5]);
  var _reactNativeWebDistExportsView = require(_dependencyMap[6]);
  var View = _interopDefault(_reactNativeWebDistExportsView);
  var _reactNativeLinearGradient = require(_dependencyMap[7]);
  var LinearGradient = _interopDefault(_reactNativeLinearGradient);
  var _reactNativeSafeAreaContext = require(_dependencyMap[8]);
  var _componentsModalOverhead = require(_dependencyMap[9]);
  var ModalOverhead = _interopDefault(_componentsModalOverhead);
  var _uiComponentsActivityIndicator = require(_dependencyMap[10]);
  var ActivityIndicator = _interopDefault(_uiComponentsActivityIndicator);
  var _servicesShared = require(_dependencyMap[11]);
  var _uiComponentsContainedNumber = require(_dependencyMap[12]);
  var ContainedNumber = _interopDefault(_uiComponentsContainedNumber);
  var _uiComponentsIcon = require(_dependencyMap[13]);
  var Icon = _interopDefault(_uiComponentsIcon);
  var _uiNewList = require(_dependencyMap[14]);
  var List = _interopDefault(_uiNewList);
  var _uiNewTypography = require(_dependencyMap[15]);
  var Typography = _interopDefault(_uiNewTypography);
  var _uiComponentsSafeHorizontalView = require(_dependencyMap[16]);
  var SafeHorizontalView = _interopDefault(_uiComponentsSafeHorizontalView);
  var _storesSettings = require(_dependencyMap[17]);
  var _utilsGradesScale = require(_dependencyMap[18]);
  var _utilsGradesAlgorithmsSubject = require(_dependencyMap[19]);
  var _utilsGradesHelperPeriod = require(_dependencyMap[20]);
  var _utilsAdjustColor = require(_dependencyMap[21]);
  var adjust = _interopDefault(_utilsAdjustColor);
  var _utilsSubjectsColors = require(_dependencyMap[22]);
  var _utilsSubjectsEmoji = require(_dependencyMap[23]);
  var _utilsSubjectsName = require(_dependencyMap[24]);
  var _utilsLoggerLogger = require(_dependencyMap[25]);
  var _reactJsxRuntime = require(_dependencyMap[26]);
  function SubjectModal() {
    const {
      id,
      period: periodId
    } = (0, _expoRouter.useLocalSearchParams)();
    const theme = (0, _expoRouterReactNavigation.useTheme)();
    const colors = theme.colors;
    const insets = (0, _reactNativeSafeAreaContext.useSafeAreaInsets)();
    const displayScale = (0, _utilsGradesScale.getGradeDisplayScale)((0, _storesSettings.useSettingsStore)(state => state.personalization.gradesDisplayScale));
    const [subject, setSubject] = (0, _react.useState)();
    const [loading, setLoading] = (0, _react.useState)(true);
    (0, _react.useEffect)(() => {
      let cancelled = false;
      (async () => {
        try {
          const manager = (0, _servicesShared.getManager)();
          if (!manager || !id) return;
          const periods = await manager.getGradesPeriods();
          const period = periods.find(candidate => candidate.id === periodId) ?? (0, _utilsGradesHelperPeriod.getCurrentPeriod)(periods);
          if (!period) return;
          const periodGrades = await manager.getGradesForPeriod(period, period.createdByAccount);
          const match = [...(periodGrades.subjects ?? []), ...(periodGrades.modules ?? [])].find(candidate => candidate.id === id);
          if (!cancelled) setSubject(match);
        } catch (error) {
          (0, _utilsLoggerLogger.warn)(`Unable to fetch subject ${id}: ${String(error)}`);
        } finally {
          if (!cancelled) setLoading(false);
        }
      })();
      return () => {
        cancelled = true;
      };
    }, [id, periodId]);
    if (loading) {
      return /*#__PURE__*/(0, _reactJsxRuntime.jsx)(View.default, {
        style: {
          flex: 1,
          alignItems: "center",
          justifyContent: "center"
        },
        children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(ActivityIndicator.default, {})
      });
    }
    if (!subject) {
      return /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(View.default, {
        style: {
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          padding: 24
        },
        children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
          variant: "title",
          children: (0, _i18next.t)("Grades_Empty_Title")
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
          variant: "body1",
          color: "textSecondary",
          children: (0, _i18next.t)("Grades_Empty_Description")
        })]
      });
    }
    const color = (0, _utilsSubjectsColors.getSubjectColor)(subject.name);
    const tint = (0, adjust.default)(color, theme.dark ? 0.5 : -0.5);
    const outOf = subject.outOf?.value ?? 20;
    const denominator = (0, _utilsGradesScale.formatScoreForDisplay)(0, outOf, displayScale).denominator;
    const format = score => !score || score.disabled ? String(score?.status ?? "N/A") : (0, _utilsGradesScale.formatScoreForDisplay)(score.value, outOf, displayScale).value.toFixed(2);

    // Some services don't provide the subject average, compute it from the grades instead.
    const computedAverage = (0, _utilsGradesAlgorithmsSubject.getSubjectAverage)(subject.grades ?? []);
    const studentScore = subject.studentAverage && !subject.studentAverage.disabled ? format(subject.studentAverage) : computedAverage !== -1 ? (0, _utilsGradesScale.formatScoreForDisplay)(computedAverage, outOf, displayScale).value.toFixed(2) : format(subject.studentAverage);
    const averages = [{
      title: "SubjectInfo_ClassAverage_Label",
      description: "SubjectInfo_ClassAverage_Description",
      score: subject.classAverage,
      icon: "GraduationHat"
    }, {
      title: "SubjectInfo_MaxAverage_Label",
      description: "SubjectInfo_MaxAverage_Description",
      score: subject.maximum,
      icon: "Plus"
    }, {
      title: "SubjectInfo_MinAverage_Label",
      description: "SubjectInfo_MinAverage_Description",
      score: subject.minimum,
      icon: "Minus"
    }];
    return /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_reactJsxRuntime.Fragment, {
      children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(LinearGradient.default, {
        colors: [(0, adjust.default)(color, theme.dark ? -0.6 : 0.6), colors.overground],
        locations: [0, 0.5],
        style: {
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -9
        }
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default, {
        style: {
          flex: 1
        },
        contentInsetAdjustmentBehavior: "automatic",
        safeHorizontalPadding: 16,
        ListHeaderComponent: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(SafeHorizontalView.default, {
          base: 16,
          style: {
            alignItems: "center",
            justifyContent: "center",
            gap: 16,
            paddingTop: 0
          },
          children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(ModalOverhead.default, {
            color: colors.primary,
            emoji: (0, _utilsSubjectsEmoji.getSubjectEmoji)(subject.name),
            subject: (0, _utilsSubjectsName.getSubjectName)(subject.name),
            overtitle: (0, _i18next.t)("Grades_SubjectInfo_NbGrades", {
              number: subject.grades?.length ?? 0
            }),
            overhead: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_componentsModalOverhead.ModalOverHeadScore, {
              color: colors.primary,
              score: studentScore,
              outOf: denominator.replace("/", "")
            })
          })
        }),
        contentContainerStyle: {
          paddingVertical: 16,
          width: '100%',
          maxWidth: 900,
          alignSelf: 'center'
        },
        children: /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Section, {
          children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.SectionTitle, {
            children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Label, {
              children: (0, _i18next.t)("SubjectInfo_Stats_Header")
            })
          }), averages.map(average => /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Item, {
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Leading, {
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Icon.default, {
                children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
                  name: average.icon
                })
              })
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "title",
              children: (0, _i18next.t)(average.title)
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "body1",
              color: "textSecondary",
              children: (0, _i18next.t)(average.description)
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Trailing, {
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(ContainedNumber.default, {
                color: tint,
                denominator: denominator,
                children: format(average.score)
              })
            })]
          }, average.title))]
        })
      })]
    });
  }
},956,[1002,1000,1023,1140,6,193,198,1222,360,1223,1129,1118,1120,1013,1007,1008,1111,1012,1370,1428,1422,1114,1142,1226,1225,1116,97]);