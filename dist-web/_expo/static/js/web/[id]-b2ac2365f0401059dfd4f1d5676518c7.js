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
      return GradesModal;
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
  var _componentsModalOverhead = require(_dependencyMap[8]);
  var ModalOverhead = _interopDefault(_componentsModalOverhead);
  var _uiComponentsActivityIndicator = require(_dependencyMap[9]);
  var ActivityIndicator = _interopDefault(_uiComponentsActivityIndicator);
  var _servicesShared = require(_dependencyMap[10]);
  var _uiComponentsContainedNumber = require(_dependencyMap[11]);
  var ContainedNumber = _interopDefault(_uiComponentsContainedNumber);
  var _uiComponentsIcon = require(_dependencyMap[12]);
  var Icon = _interopDefault(_uiComponentsIcon);
  var _uiComponentsStack = require(_dependencyMap[13]);
  var Stack = _interopDefault(_uiComponentsStack);
  var _uiComponentsTypography = require(_dependencyMap[14]);
  var TypographyLegacy = _interopDefault(_uiComponentsTypography);
  var _utilsAdjustColor = require(_dependencyMap[15]);
  var adjust = _interopDefault(_utilsAdjustColor);
  var _utilsColorCheck = require(_dependencyMap[16]);
  var _reactNativeSafeAreaContext = require(_dependencyMap[17]);
  var _uiNewList = require(_dependencyMap[18]);
  var List = _interopDefault(_uiNewList);
  var _uiNewTypography = require(_dependencyMap[19]);
  var Typography = _interopDefault(_uiNewTypography);
  var _storesSettings = require(_dependencyMap[20]);
  var _utilsGradesScale = require(_dependencyMap[21]);
  var _uiComponentsSkillChip = require(_dependencyMap[22]);
  var _utilsGradesHelperPeriod = require(_dependencyMap[23]);
  var _hooksUseGradeInfluence = require(_dependencyMap[24]);
  var _utilsSubjectsColors = require(_dependencyMap[25]);
  var _utilsSubjectsEmoji = require(_dependencyMap[26]);
  var _utilsSubjectsName = require(_dependencyMap[27]);
  var _utilsLoggerLogger = require(_dependencyMap[28]);
  var _uiComponentsSafeHorizontalView = require(_dependencyMap[29]);
  var SafeHorizontalView = _interopDefault(_uiComponentsSafeHorizontalView);
  var _reactJsxRuntime = require(_dependencyMap[30]);
  const GradeBadge = ({
    icon,
    label,
    color,
    theme,
    is_outlined = false
  }) => {
    const backgroundColor = is_outlined ? "transparent" : (0, adjust.default)(color, theme.dark ? 0.3 : -0.3);
    const textColor = is_outlined ? color : (0, _utilsColorCheck.colorCheck)("#FFFFFF", [backgroundColor]) ? "#FFFFFF" : "#000000";
    const borderStyle = is_outlined ? {
      borderWidth: 1,
      borderColor: color
    } : undefined;
    return /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(Stack.default, {
      direction: "horizontal",
      gap: 8,
      backgroundColor: backgroundColor,
      vAlign: "center",
      hAlign: "center",
      padding: [12, 6],
      radius: 32,
      style: borderStyle,
      children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
        size: 20,
        name: icon,
        color: textColor
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(TypographyLegacy.default, {
        color: textColor,
        variant: "body2",
        children: label
      })]
    });
  };
  function GradesModal() {
    const {
      id
    } = (0, _expoRouter.useLocalSearchParams)();
    const theme = (0, _expoRouterReactNavigation.useTheme)();
    const colors = theme.colors;
    const [grade, setGrade] = (0, _react.useState)();
    const headerHeight = (0, _expoRouterReactNavigation.useHeaderHeight)();
    const [subject, setSubject] = (0, _react.useState)();
    const [subjects, setSubjects] = (0, _react.useState)([]);
    const [loading, setLoading] = (0, _react.useState)(true);
    const displayScale = (0, _utilsGradesScale.getGradeDisplayScale)((0, _storesSettings.useSettingsStore)(state => state.personalization.gradesDisplayScale));
    const displayScaleMax = (0, _utilsGradesScale.getDisplayScaleMax)(displayScale);
    const insets = (0, _reactNativeSafeAreaContext.useSafeAreaInsets)();
    const finalHeaderHeight = 0;
    (0, _react.useEffect)(() => {
      let cancelled = false;
      const fetchGrade = async () => {
        setLoading(true);
        setGrade(undefined);
        setSubject(undefined);
        setSubjects([]);
        try {
          const manager = (0, _servicesShared.getManager)();
          if (!manager || !id) return;
          const periods = await manager.getGradesPeriods();
          const currentPeriod = (0, _utilsGradesHelperPeriod.getCurrentPeriod)(periods);
          const orderedPeriods = currentPeriod ? [currentPeriod, ...periods.filter(period => period.id !== currentPeriod.id)] : periods;
          for (const period of orderedPeriods) {
            try {
              const periodGrades = await manager.getGradesForPeriod(period, period.createdByAccount);
              const periodSubjects = [...(periodGrades.subjects ?? []), ...(periodGrades.modules ?? [])];
              const matchingSubject = periodSubjects.find(candidate => candidate.grades?.some(candidateGrade => candidateGrade.id === id));
              const matchingGrade = matchingSubject?.grades?.find(candidateGrade => candidateGrade.id === id);
              if (matchingGrade) {
                if (!cancelled) {
                  setGrade(matchingGrade);
                  setSubject(matchingSubject);
                  setSubjects(periodSubjects);
                }
                return;
              }
            } catch (error) {
              (0, _utilsLoggerLogger.warn)(`Unable to fetch grades for period ${period.id}: ${String(error)}`);
            }
          }
        } catch (error) {
          (0, _utilsLoggerLogger.warn)(`Unable to fetch grade ${id}: ${String(error)}`);
        } finally {
          if (!cancelled) setLoading(false);
        }
      };
      fetchGrade();
      return () => {
        cancelled = true;
      };
    }, [id]);
    const getSubjectById = (0, _react.useCallback)(subjectId => subjects.find(candidate => candidate.id === subjectId), [subjects]);
    const {
      getAvgInfluence,
      getAvgClassInfluence
    } = (0, _hooksUseGradeInfluence.useGradeInfluence)(subjects, getSubjectById);
    const avgInfluence = grade ? getAvgInfluence(grade) : 0;
    const avgClass = grade ? getAvgClassInfluence(grade) : 0;
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
    if (!grade || !subject) {
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
    const subjectInfo = {
      name: (0, _utilsSubjectsName.getSubjectName)(subject.name),
      originalName: subject.name,
      emoji: (0, _utilsSubjectsEmoji.getSubjectEmoji)(subject.name),
      color: (0, _utilsSubjectsColors.getSubjectColor)(subject.name)
    };
    const adjustedTextColor = (0, adjust.default)(subjectInfo.color, theme.dark ? 0.5 : -0.5);
    return /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_reactJsxRuntime.Fragment, {
      children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(LinearGradient.default, {
        colors: [(0, adjust.default)(subjectInfo.color, theme.dark ? -0.6 : 0.6), theme.colors.overground],
        locations: [0, 0.5],
        style: {
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -9
        }
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default, {
        style: {
          flex: 1
        },
        contentInsetAdjustmentBehavior: "automatic",
        safeHorizontalPadding: 16,
        ListHeaderComponent: /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(SafeHorizontalView.default, {
          base: 16,
          style: {
            alignItems: "center",
            justifyContent: "center",
            gap: 16,
            paddingTop: 16
          },
          children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(ModalOverhead.default, {
            color: colors.primary,
            emoji: subjectInfo.emoji,
            subject: grade.skills?.length ?? false ? grade.description : subjectInfo.name,
            title: grade.skills?.length ?? false ? undefined : grade.description,
            date: new Date(grade.givenAt),
            overhead: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_componentsModalOverhead.ModalOverHeadScore, {
              color: colors.primary,
              score: grade.studentScore?.disabled ? grade.skills?.length ?? false ? subjectInfo.name : String(grade.studentScore?.status) : grade.studentScore ? String(grade.studentScore?.value.toFixed(2)) : undefined,
              outOf: grade.outOf?.value
            }),
            subjectVariant: grade.studentScore ? undefined : "h2"
          }), (grade.studentScore?.value ?? 0) === (grade.maxScore?.value ?? 1) && !grade.studentScore?.disabled && /*#__PURE__*/(0, _reactJsxRuntime.jsx)(GradeBadge, {
            icon: "crown",
            label: (0, _i18next.t)("Modal_Grades_BestGrade"),
            color: subjectInfo.color,
            theme: theme,
            is_outlined: false
          }), grade.optional && /*#__PURE__*/(0, _reactJsxRuntime.jsx)(GradeBadge, {
            icon: "info",
            label: (0, _i18next.t)("Modal_Grades_OptionalGrade"),
            color: subjectInfo.color,
            theme: theme,
            is_outlined: true
          }), grade.bonus && /*#__PURE__*/(0, _reactJsxRuntime.jsx)(GradeBadge, {
            icon: "info",
            label: (0, _i18next.t)("Modal_Grades_BonusGrade"),
            color: subjectInfo.color,
            theme: theme,
            is_outlined: true
          }), grade.studentScore && !grade.studentScore.disabled && /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(Stack.default, {
            card: true,
            direction: "horizontal",
            hAlign: "center",
            gap: 0,
            width: "100%",
            style: {
              marginTop: 8,
              shadowColor: "transparent",
              borderWidth: 0
            },
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsxs)(Stack.default, {
              width: "50%",
              vAlign: "center",
              hAlign: "center",
              padding: 12,
              children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Icon.default, {
                papicon: true,
                opacity: 0.5,
                children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
                  name: "Coefficient"
                })
              }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(TypographyLegacy.default, {
                color: "secondary",
                children: (0, _i18next.t)("Grades_Coefficient")
              }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(ContainedNumber.default, {
                color: adjustedTextColor,
                children: ["x", (grade.coefficient ?? 1).toFixed(2)]
              })]
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(View.default, {
              style: {
                width: 0.5,
                height: "80%",
                backgroundColor: colors.border
              }
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(Stack.default, {
              width: "50%",
              vAlign: "center",
              hAlign: "center",
              padding: 12,
              children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Icon.default, {
                papicon: true,
                opacity: 0.5,
                children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
                  name: "Apple"
                })
              }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(TypographyLegacy.default, {
                color: "secondary",
                children: (0, _i18next.t)("Grades_Avg_Group_Short")
              }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(ContainedNumber.default, {
                color: adjustedTextColor,
                denominator: "/" + grade.outOf?.value,
                children: grade.averageScore?.value.toFixed(2)
              })]
            })]
          })]
        }),
        contentContainerStyle: {
          paddingVertical: 16,
          width: '100%',
          maxWidth: 900,
          alignSelf: 'center'
        },
        children: [grade.skills && grade.skills.length > 0 && /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Section, {
          children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.SectionTitle, {
            children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Label, {
              children: (0, _i18next.t)("Grades_Skills_Title")
            })
          }), grade.skills.map(skill => /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Item, {
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "title",
              children: skill.name
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "body1",
              color: "textSecondary",
              children: skill.description
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Trailing, {
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_uiComponentsSkillChip.SkillChip, {
                level: skill.score
              })
            })]
          }))]
        }), grade.studentScore && !grade.studentScore?.disabled && /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Section, {
          children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.SectionTitle, {
            children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Label, {
              children: (0, _i18next.t)("Grades_Details_Title")
            })
          }), grade.studentScore && grade.outOf && grade.outOf.value !== displayScaleMax ? /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Item, {
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Leading, {
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Icon.default, {
                children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
                  name: "Star"
                })
              })
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "title",
              children: (0, _i18next.t)("Grades_NormalizedGrade_Title")
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "body1",
              color: "textSecondary",
              children: (0, _i18next.t)("Grades_NormalizedGrade_Description")
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Trailing, {
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(ContainedNumber.default, {
                color: subjectInfo.color,
                denominator: (0, _utilsGradesScale.formatAssumed20ForDisplay)(0, displayScale).denominator,
                children: (0, _utilsGradesScale.formatAssumed20ForDisplay)(grade.studentScore.value / grade.outOf.value * 20, displayScale).value.toFixed(2)
              })
            })]
          }) : null, /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Item, {
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Leading, {
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Icon.default, {
                children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
                  name: "Plus"
                })
              })
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "title",
              children: (0, _i18next.t)("Grades_HighestGrade_Title")
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "body1",
              color: "textSecondary",
              children: (0, _i18next.t)("Grades_HighestGrade_Description")
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Trailing, {
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(ContainedNumber.default, {
                color: adjustedTextColor,
                denominator: "/" + grade.outOf?.value,
                children: grade.maxScore?.value.toFixed(2)
              })
            })]
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Item, {
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Leading, {
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Icon.default, {
                children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
                  name: "Minus"
                })
              })
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "title",
              children: (0, _i18next.t)("Grades_LowestGrade_Title")
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "body1",
              color: "textSecondary",
              children: (0, _i18next.t)("Grades_LowestGrade_Description")
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Trailing, {
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(ContainedNumber.default, {
                color: adjustedTextColor,
                denominator: "/" + grade.outOf?.value,
                children: grade.minScore?.value.toFixed(2)
              })
            })]
          })]
        }), grade.studentScore && !grade.studentScore?.disabled && /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Section, {
          children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.SectionTitle, {
            children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Label, {
              children: (0, _i18next.t)("Grades_Influence_Title")
            })
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Item, {
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Leading, {
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Icon.default, {
                children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
                  name: "Grades"
                })
              })
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "title",
              children: (0, _i18next.t)("Grades_Avg_All_Title")
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Trailing, {
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(ContainedNumber.default, {
                color: avgInfluence === 0 ? "#757575" : avgInfluence >= 0 ? "#2e8900" : "#990000",
                denominator: "pts",
                children: avgInfluence >= 0 ? `+${avgInfluence.toFixed(2)}` : avgInfluence.toFixed(2)
              })
            })]
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Item, {
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Leading, {
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Icon.default, {
                children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
                  name: "Apple"
                })
              })
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "title",
              children: (0, _i18next.t)("Grades_Avg_Group_Title")
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Trailing, {
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(ContainedNumber.default, {
                color: avgClass === 0 ? "#757575" : avgClass >= 0 ? "#2e8900" : "#990000",
                denominator: "pts",
                children: avgClass >= 0 ? `+${avgClass.toFixed(2)}` : avgClass.toFixed(2)
              })
            })]
          })]
        })]
      })]
    });
  }
},945,[1002,1000,1023,1140,6,193,198,1222,1223,1129,1118,1120,1013,1005,1110,1114,1420,360,1007,1008,1012,1370,1421,1422,951,1142,1226,1225,1116,1111,97]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  Object.defineProperty(exports, "colorCheck", {
    enumerable: true,
    get: function () {
      return colorCheck;
    }
  });
  const hexToRgb = hex => {
    const cleanHex = hex.startsWith('#') ? hex.slice(1) : hex;
    let r;
    let g;
    let b;
    if (cleanHex.length === 3) {
      r = parseInt(cleanHex[0] + cleanHex[0], 16);
      g = parseInt(cleanHex[1] + cleanHex[1], 16);
      b = parseInt(cleanHex[2] + cleanHex[2], 16);
    } else if (cleanHex.length === 6) {
      r = parseInt(cleanHex.substring(0, 2), 16);
      g = parseInt(cleanHex.substring(2, 4), 16);
      b = parseInt(cleanHex.substring(4, 6), 16);
    } else {
      throw new Error(`Invalid hex color format: ${hex}`);
    }
    if (isNaN(r) || isNaN(g) || isNaN(b)) {
      throw new Error(`Failed to parse hex color: ${hex}`);
    }
    return [r, g, b];
  };
  const calculateLuminance = rgb => {
    const linearize = c => {
      const sRGB = c / 255;
      return sRGB <= 0.03928 ? sRGB / 12.92 : Math.pow((sRGB + 0.055) / 1.055, 2.4);
    };
    const [r, g, b] = rgb.map(linearize);
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };
  const calculateContrastRatio = (l1, l2) => {
    const [L_light, L_dark] = l1 > l2 ? [l1, l2] : [l2, l1];
    return (L_light + 0.05) / (L_dark + 0.05);
  };
  const colorCheck = (foreground, backgrounds) => {
    const MIN_CONTRAST_RATIO = 4.5;
    try {
      const fgRgb = hexToRgb(foreground);
      const fgLuminance = calculateLuminance(fgRgb);

      // Check if ANY background provides sufficient contrast
      return backgrounds.some(bgHex => {
        try {
          const bgRgb = hexToRgb(bgHex);
          const bgLuminance = calculateLuminance(bgRgb);
          const contrastRatio = calculateContrastRatio(fgLuminance, bgLuminance);
          return contrastRatio >= MIN_CONTRAST_RATIO;
        } catch (error) {
          return false;
        }
      });
    } catch (error) {
      return false;
    }
  };
},1420,[]);