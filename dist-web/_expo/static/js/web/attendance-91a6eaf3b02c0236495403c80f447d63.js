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
      return AttendanceView;
    }
  });
  var _uiComponentsIcon = require(_dependencyMap[0]);
  var Icon = _interopDefault(_uiComponentsIcon);
  var _expoRouter = require(_dependencyMap[1]);
  require(_dependencyMap[2]);
  var _reactNativeWebDistExportsView = require(_dependencyMap[3]);
  var View = _interopDefault(_reactNativeWebDistExportsView);
  var _getpapillonPapicons = require(_dependencyMap[4]);
  var _expoRouterReactNavigation = require(_dependencyMap[5]);
  var _utilsServicesPeriods = require(_dependencyMap[6]);
  var _react = require(_dependencyMap[7]);
  var _uiComponentsStack = require(_dependencyMap[8]);
  var Stack = _interopDefault(_uiComponentsStack);
  var _utilsAdjustColor = require(_dependencyMap[9]);
  var adjust = _interopDefault(_utilsAdjustColor);
  var _utilsLoggerLogger = require(_dependencyMap[10]);
  var _servicesShared = require(_dependencyMap[11]);
  var _i18next = require(_dependencyMap[12]);
  var _utilsI18n = require(_dependencyMap[13]);
  var i18n = _interopDefault(_utilsI18n);
  var _uiComponentsActionMenu = require(_dependencyMap[14]);
  var ActionMenu = _interopDefault(_uiComponentsActionMenu);
  var _uiComponentsTabHeader = require(_dependencyMap[15]);
  var TabHeader = _interopDefault(_uiComponentsTabHeader);
  var _uiComponentsTabHeaderTitle = require(_dependencyMap[16]);
  var TabHeaderTitle = _interopDefault(_uiComponentsTabHeaderTitle);
  var _uiNewList = require(_dependencyMap[17]);
  var List = _interopDefault(_uiNewList);
  var _reactNativeSafeAreaContext = require(_dependencyMap[18]);
  var _uiNewTypography = require(_dependencyMap[19]);
  var Typography = _interopDefault(_uiNewTypography);
  var _dateFns = require(_dependencyMap[20]);
  var _dateFnsLocale = require(_dependencyMap[21]);
  var DateLocale = _interopNamespace(_dateFnsLocale);
  var _reactJsxRuntime = require(_dependencyMap[22]);
  const parseSearchParam = (value, fallback) => {
    const serializedValue = Array.isArray(value) ? value[0] : value;
    if (!serializedValue) {
      return fallback;
    }
    try {
      return JSON.parse(serializedValue);
    } catch {
      return fallback;
    }
  };
  const formatEventTime = (durationData, detailed) => {
    if (detailed) {
      return durationData >= 60 ? (0, _i18next.t)("Attendance_Duration_HoursMinutes_Detailed", {
        hours: Math.floor(durationData / 60),
        minutes: lz(durationData % 60)
      }) : (0, _i18next.t)("Attendance_Duration_Minutes", {
        value: durationData
      });
    }
    return durationData >= 60 ? (0, _i18next.t)("Attendance_Duration_HoursMinutes_Compact", {
      hours: Math.floor(durationData / 60),
      minutes: lz(durationData % 60)
    }) : (0, _i18next.t)("Attendance_Duration_Minutes", {
      value: durationData
    });
  };
  function AttendanceView() {
    try {
      const theme = (0, _expoRouterReactNavigation.useTheme)();
      const {
        colors
      } = theme;
      const header = (0, _expoRouterReactNavigation.useHeaderHeight)();
      const search = (0, _expoRouter.useLocalSearchParams)();
      const periods = parseSearchParam(search.periods, []);
      const currentPeriod = parseSearchParam(search.currentPeriod, periods[0]);
      const attendancesFromSearch = parseSearchParam(search.attendances, []);
      const [attendances, setAttendances] = (0, _react.useState)(attendancesFromSearch);
      const [period, setPeriod] = (0, _react.useState)(currentPeriod);
      const {
        missedTime,
        missedTimeUnjustified,
        unjustifiedAbsenceCount,
        unjustifiedDelayCount,
        absenceCount,
        delayCount
      } = (0, _react.useMemo)(() => {
        let missed = 0;
        let unjustified = 0;
        let unjustifiedAbs = 0;
        let unjustifiedDelays = 0;
        let Abs = 0;
        let Delays = 0;
        for (const attendance of attendances) {
          if (!attendance) {
            continue;
          }
          for (const absence of attendance.absences ?? []) {
            Abs += 1;
            missed += absence.timeMissed;
            if (!absence.justified) {
              unjustified += absence.timeMissed;
              unjustifiedAbs += 1;
            }
          }
          for (const delay of attendance.delays ?? []) {
            Delays += 1;
            if (!delay.justified) {
              unjustifiedDelays += 1;
              unjustified += delay.duration;
            }
            missed += delay.duration;
          }
        }
        return {
          missedTime: missed,
          missedTimeUnjustified: unjustified,
          unjustifiedAbsenceCount: unjustifiedAbs,
          unjustifiedDelayCount: unjustifiedDelays,
          absenceCount: Abs,
          delayCount: Delays
        };
      }, [period, attendances]);
      const [headerHeight, setHeaderHeight] = (0, _react.useState)(0);
      const insets = (0, _reactNativeSafeAreaContext.useSafeAreaInsets)();
      const dangerColor = (0, adjust.default)("#C50000", theme.dark ? 0.4 : -0.1);
      const dangerBg = (0, adjust.default)("#C50000", theme.dark ? -0.65 : 0.85);
      const successColor = (0, adjust.default)("#00C851", theme.dark ? 0.3 : -0.1);
      const successBg = (0, adjust.default)("#00C851", theme.dark ? -0.75 : 0.85);
      return /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_reactJsxRuntime.Fragment, {
        children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(TabHeader.default, {
          showAndroidBackButton: true,
          modal: true,
          onHeightChanged: setHeaderHeight,
          title: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(ActionMenu.default, {
            onPressAction: async ({
              nativeEvent
            }) => {
              const actionId = nativeEvent.event;
              if (actionId.startsWith("period:")) {
                const selectedPeriodId = actionId.replace("period:", "");
                const selectedPeriod = periods.find(item => item.id === selectedPeriodId);
                if (!selectedPeriod) {
                  (0, _utilsLoggerLogger.error)((0, _i18next.t)("Attendance_InvalidPeriod"));
                  return;
                }
                const manager = (0, _servicesShared.getManager)();
                if (!manager) return;
                const attendancesFetched = await manager.getAttendanceForPeriod(selectedPeriod.name);
                setAttendances(attendancesFetched);
                setPeriod(selectedPeriod);
              }
            },
            actions: periods.map(item => ({
              id: "period:" + item.id,
              title: ((0, _utilsServicesPeriods.getPeriodName)(item.name || "") + " " + ((0, _utilsServicesPeriods.isPeriodWithNumber)(item.name || "") ? (0, _utilsServicesPeriods.getPeriodNumber)(item.name || "0") : "")).trim(),
              subtitle: `${new Date(item.start).toLocaleDateString(i18n.default.language, {
                month: "short",
                year: "numeric"
              })} - ${new Date(item.end).toLocaleDateString(i18n.default.language, {
                month: "short",
                year: "numeric"
              })}`,
              state: String(period?.id ?? "") === String(item.id ?? "") ? "on" : "off",
              image: undefined,
              imageColor: colors.text
            })),
            children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(TabHeaderTitle.default, {
              chevron: true,
              leading: (0, _utilsServicesPeriods.getPeriodName)(period?.name ?? ""),
              number: (0, _utilsServicesPeriods.getPeriodNumber)(period?.name ?? "")
            })
          }, String(period?.id ?? ""))
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default, {
          style: {
            flex: 1,
            backgroundColor: colors.overground
          },
          safeHorizontalPadding: 16,
          contentContainerStyle: {
            paddingTop: headerHeight,
            paddingBottom: insets.bottom + 16
          },
          children: [attendances.some(attendance => (attendance?.absences ?? []).length == 0) && attendances.some(attendance => (attendance?.delays ?? []).length == 0) ? /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Item, {
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Leading, {
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Icon.default, {
                children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
                  name: "Ghost"
                })
              })
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "title",
              children: (0, _i18next.t)("Attendance_NoEvent_Title")
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              color: "textSecondary",
              children: (0, _i18next.t)("Attendance_NoEvent_Description")
            })]
          }) : /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Section, {
            children: [missedTimeUnjustified > 0 ? /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Item, {
              style: {
                backgroundColor: dangerBg
              },
              children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Leading, {
                children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Icon.default, {
                  fill: dangerColor,
                  children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
                    name: "AlertTriangle"
                  })
                })
              }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
                variant: "title",
                color: dangerColor,
                children: (0, _i18next.t)("Attendance_Hours_Unjustified_Value", {
                  duration: formatEventTime(missedTimeUnjustified, true)
                })
              }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
                color: "textSecondary",
                color: dangerColor,
                children: (0, _i18next.t)("Attendance_Unjustified_Description")
              })]
            }) : /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Item, {
              style: {
                backgroundColor: successBg
              },
              children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Leading, {
                children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Icon.default, {
                  fill: successColor,
                  children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
                    name: "Check"
                  })
                })
              }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
                variant: "title",
                color: successColor,
                children: (0, _i18next.t)("Attendance_NoUnjustified_Title")
              }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
                color: "textSecondary",
                color: successColor,
                children: (0, _i18next.t)("Attendance_NoUnjustified_Description")
              })]
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Item, {
              children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
                variant: "action",
                children: (0, _i18next.t)("Attendance_Hours_Missed")
              }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Trailing, {
                children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
                  variant: "title",
                  weight: "bold",
                  color: missedTimeUnjustified > 0 ? dangerColor : "textSecondary",
                  children: formatEventTime(missedTime, true)
                })
              })]
            })]
          }), attendances.some(attendance => (attendance?.absences ?? []).length > 0) && /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Section, {
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.SectionTitle, {
              children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Icon.default, {
                opacity: 0.5,
                size: 20,
                children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
                  name: "UserCross"
                })
              }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
                variant: "body1",
                weight: "semibold",
                color: "textSecondary",
                style: {
                  flex: 1
                },
                children: (0, _i18next.t)("Attendance_Missing")
              }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
                variant: "title",
                weight: "medium",
                color: "textSecondary",
                children: absenceCount
              })]
            }), attendances.map((attendance, index) => (attendance?.absences ?? []).map((absence, absenceIndex) => {
              const fromDate = new Date(absence.from);
              const dateString = (0, _dateFns.formatDistanceToNowStrict)(fromDate, {
                locale: DateLocale[i18n.default.language] || DateLocale.enUS,
                addSuffix: true
              });
              const dayString = (0, _dateFns.formatDate)(fromDate, "eeee d MMMM", {
                locale: DateLocale[i18n.default.language] || DateLocale.enUS
              });
              return /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Item, {
                children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
                  variant: "title",
                  children: absence.reason || (0, _i18next.t)("Attendance_NoReason")
                }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(Typography.default, {
                  color: "textSecondary",
                  numberOfLines: 1,
                  children: [dateString, " \xB7 ", dayString]
                }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Trailing, {
                  children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(AttendanceTimer, {
                    evt: absence
                  })
                })]
              });
            }))]
          }), attendances.some(attendance => (attendance?.delays ?? []).length > 0) && /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Section, {
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.SectionTitle, {
              children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Icon.default, {
                opacity: 0.5,
                size: 20,
                children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
                  name: "Clock"
                })
              }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
                variant: "body1",
                weight: "semibold",
                color: "textSecondary",
                style: {
                  flex: 1
                },
                children: (0, _i18next.t)("Attendance_Delays")
              }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
                variant: "title",
                weight: "medium",
                color: "textSecondary",
                children: delayCount
              })]
            }), attendances.map((attendance, index) => (attendance?.delays ?? []).map((delay, absenceIndex) => {
              const fromDate = new Date(delay.givenAt);
              const date = fromDate.getTime();
              const dateString = (0, _dateFns.formatDistanceToNowStrict)(date, {
                locale: DateLocale[i18n.default.language] || DateLocale.enUS,
                addSuffix: true
              });
              const dayFormatted = (0, _dateFns.formatDate)(date, "eeee d MMMM", {
                locale: DateLocale[i18n.default.language] || DateLocale.enUS
              });
              return /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Item, {
                children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
                  variant: "title",
                  children: delay.reason || (0, _i18next.t)("Attendance_NoReason")
                }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(Typography.default, {
                  color: "textSecondary",
                  children: [dateString, " \xB7 ", dayFormatted]
                }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Trailing, {
                  children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(AttendanceTimer, {
                    evt: delay
                  })
                })]
              });
            }))]
          })]
        })]
      });
    } catch (err) {
      (0, _utilsLoggerLogger.error)(err.toString());
      return null;
    }
  }
  const lz = num => num.toString().padStart(2, "0");
  const AttendanceTimer = ({
    evt
  }) => {
    const theme = (0, _expoRouterReactNavigation.useTheme)();
    const {
      colors
    } = theme;
    const dangerColor = (0, adjust.default)("#C50000", theme.dark ? 0.4 : -0.1);
    const dangerBg = dangerColor + "30";
    const durationData = evt.timeMissed || evt.duration || 0;
    const durationText = formatEventTime(durationData);
    return /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(Stack.default, {
      direction: "horizontal",
      hAlign: "center",
      gap: 8,
      children: [!evt.justified && /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Icon.default, {
        papicon: true,
        fill: dangerColor,
        children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
          name: "Minus"
        })
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(View.default, {
        style: {
          padding: 6,
          paddingHorizontal: evt.justified ? 3 : 12,
          backgroundColor: evt.justified ? "transparent" : dangerBg,
          borderRadius: 25,
          overflow: "hidden"
        },
        children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
          variant: "title",
          color: evt.justified ? colors.text : dangerColor,
          children: durationText
        })
      })]
    });
  };
},862,[1013,1023,193,198,1002,1000,1218,6,1005,1114,1116,1118,1140,1127,1219,1025,1026,1007,360,1008,1220,1221,97]);