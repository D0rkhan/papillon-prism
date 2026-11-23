__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
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
  function _interopDefault(e) {
    return e && e.__esModule ? e : {
      default: e
    };
  }
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return CourseModal;
    }
  });
  var _getpapillonPapicons = require(_dependencyMap[0]);
  var _expoRouterReactNavigation = require(_dependencyMap[1]);
  var _expoRouter = require(_dependencyMap[2]);
  var _dateFns = require(_dependencyMap[3]);
  var _dateFnsLocale = require(_dependencyMap[4]);
  var DateLocale = _interopNamespace(_dateFnsLocale);
  var _i18next = require(_dependencyMap[5]);
  var i18n = _interopDefault(_i18next);
  var _react = require(_dependencyMap[6]);
  var _reactNativeWebDistExportsAlert = require(_dependencyMap[7]);
  var Alert = _interopDefault(_reactNativeWebDistExportsAlert);
  require(_dependencyMap[8]);
  var _reactNativeWebDistExportsView = require(_dependencyMap[9]);
  var View = _interopDefault(_reactNativeWebDistExportsView);
  var _reactNativeLinearGradient = require(_dependencyMap[10]);
  var LinearGradient = _interopDefault(_reactNativeLinearGradient);
  var _componentsModalOverhead = require(_dependencyMap[11]);
  var ModalOverhead = _interopDefault(_componentsModalOverhead);
  var _databaseUseTimetable = require(_dependencyMap[12]);
  var _uiComponentsActivityIndicator = require(_dependencyMap[13]);
  var ActivityIndicator = _interopDefault(_uiComponentsActivityIndicator);
  var _uiComponentsIcon = require(_dependencyMap[14]);
  var Icon = _interopDefault(_uiComponentsIcon);
  var _uiNewList = require(_dependencyMap[15]);
  var List = _interopDefault(_uiNewList);
  var _uiNewTypography = require(_dependencyMap[16]);
  var Typography = _interopDefault(_uiNewTypography);
  require(_dependencyMap[17]);
  var _utilsSubjectsName = require(_dependencyMap[18]);
  var _utilsSubjectsColors = require(_dependencyMap[19]);
  var _utilsSubjectsEmoji = require(_dependencyMap[20]);
  var _storesSettings = require(_dependencyMap[21]);
  var _uiComponentsSafeHorizontalView = require(_dependencyMap[22]);
  var SafeHorizontalView = _interopDefault(_uiComponentsSafeHorizontalView);
  var _getpapillonPapillonkit = require(_dependencyMap[23]);
  var PapillonKit = _interopNamespace(_getpapillonPapillonkit);
  var _tabsCalendarComponentsCalendarDay = require(_dependencyMap[24]);
  var _reactNativeSafeAreaContext = require(_dependencyMap[25]);
  var _reactJsxRuntime = require(_dependencyMap[26]);
  function CourseModal() {
    const {
      id
    } = (0, _expoRouter.useLocalSearchParams)();
    const {
      colors
    } = (0, _expoRouterReactNavigation.useTheme)();
    const router = (0, _expoRouter.useRouter)();
    const insets = (0, _reactNativeSafeAreaContext.useSafeAreaInsets)();
    const finalHeaderHeight = 0;
    const [course, setCourse] = (0, _react.useState)();
    const [loading, setLoading] = (0, _react.useState)(true);
    const liveActivityTestMode = (0, _storesSettings.useSettingsStore)(state => state.personalization.liveActivityTestMode ?? false);
    const liveActivitiesEnabled = (0, _storesSettings.useSettingsStore)(state => state.personalization.liveActivitiesEnabled ?? true);
    const canTriggerLiveActivity = PapillonKit.features.liveActivities && liveActivityTestMode && liveActivitiesEnabled;
    (0, _react.useEffect)(() => {
      let cancelled = false;
      setLoading(true);
      (0, _databaseUseTimetable.getCourseById)(id).then(result => {
        if (!cancelled) setCourse(result);
      }).finally(() => {
        if (!cancelled) setLoading(false);
      });
      return () => {
        cancelled = true;
      };
    }, [id]);
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
    if (!course) {
      return /*#__PURE__*/(0, _reactJsxRuntime.jsx)(View.default, {
        style: {
          flex: 1,
          alignItems: "center",
          justifyContent: "center"
        },
        children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
          variant: "title",
          children: (0, _i18next.t)("Tab_Calendar")
        })
      });
    }
    const subjectInfo = {
      name: (0, _utilsSubjectsName.getSubjectName)(course.subject),
      originalName: course.subject,
      emoji: (0, _utilsSubjectsEmoji.getSubjectEmoji)(course.subject),
      color: (0, _utilsSubjectsColors.getSubjectColor)(course.subject)
    };
    const triggerLiveActivity = async mode => {
      try {
        await PapillonKit.liveActivities.preview(mode, course.id);
      } catch (cause) {
        Alert.default.alert("Live Activity", `Impossible de la démarrer : ${String(cause)}`);
      }
    };
    const item = course;
    const startTime = Math.floor(course.from.getTime() / 1000);
    const endTime = Math.floor(course.to.getTime() / 1000);
    return /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(View.default, {
      style: {
        flex: 1,
        backgroundColor: colors.overground
      },
      children: [false, /*#__PURE__*/(0, _reactJsxRuntime.jsx)(LinearGradient.default, {
        colors: [subjectInfo.color, `${subjectInfo.color}00`],
        style: {
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 500,
          width: "100%",
          zIndex: 0,
          opacity: 0.6
        }
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default, {
        contentInsetAdjustmentBehavior: "automatic",
        safeHorizontalPadding: 16,
        ListHeaderComponent: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(SafeHorizontalView.default, {
          base: 16,
          children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(ModalOverhead.default, {
            subject: (0, _utilsSubjectsName.getSubjectName)(item.subject),
            title: item.customStatus || (0, _tabsCalendarComponentsCalendarDay.getStatusText)(item.status),
            color: colors.primary,
            emoji: subjectInfo.emoji,
            subjectVariant: "h3",
            date: new Date(startTime * 1000),
            dateFormat: {
              day: "numeric",
              month: "long",
              year: "numeric",
              hour: "numeric",
              minute: "numeric"
            },
            style: {
              marginBottom: 24,
              paddingTop: finalHeaderHeight
            }
          })
        }),
        style: {
          backgroundColor: "transparent",
          zIndex: 2
        },
        contentContainerStyle: {
          paddingVertical: 16
        },
        children: [(0, _tabsCalendarComponentsCalendarDay.getStatusText)(course.status) ? /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Section, {
          children: /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Item, {
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Leading, {
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Icon.default, {
                children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
                  name: "Info"
                })
              })
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "title",
              children: (0, _tabsCalendarComponentsCalendarDay.getStatusText)(course.status)
            })]
          })
        }) : null, /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Section, {
          children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.SectionTitle, {
            children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Label, {
              children: (0, _i18next.t)("Modal_Course_Time")
            })
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Item, {
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Leading, {
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Icon.default, {
                children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
                  name: "Login"
                })
              })
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "title",
              children: (0, _i18next.t)("Modal_Course_Start")
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "body1",
              color: "textSecondary",
              children: (0, _dateFns.formatDistanceToNow)(startTime * 1000, {
                locale: DateLocale[i18n.default.language] || DateLocale.enUS,
                addSuffix: true
              })
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Trailing, {
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
                variant: "title",
                children: new Date(startTime * 1000).toLocaleString(undefined, {
                  hour: "numeric",
                  minute: "numeric"
                })
              })
            })]
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Item, {
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Leading, {
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Icon.default, {
                children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
                  name: "Logout"
                })
              })
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "title",
              children: (0, _i18next.t)("Modal_Course_End")
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Trailing, {
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
                variant: "title",
                children: new Date(endTime * 1000).toLocaleString(undefined, {
                  hour: "numeric",
                  minute: "numeric"
                })
              })
            })]
          })]
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Section, {
          children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.SectionTitle, {
            children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Label, {
              children: (0, _i18next.t)("Modal_Course_Details")
            })
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Item, {
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Leading, {
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Icon.default, {
                children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
                  name: "User"
                })
              })
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "title",
              children: (0, _i18next.t)("Modal_Course_Teacher")
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "body1",
              color: "textSecondary",
              children: item.teacher
            })]
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Item, {
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Leading, {
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Icon.default, {
                children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
                  name: "MapPin"
                })
              })
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "title",
              children: (0, _i18next.t)("Modal_Course_Room")
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "body1",
              color: "textSecondary",
              children: item.room || (0, _i18next.t)("No_Course_Room")
            })]
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Item, {
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Leading, {
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Icon.default, {
                children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
                  name: "Clock"
                })
              })
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "title",
              children: (0, _i18next.t)("Modal_Course_Duration")
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "body1",
              color: "textSecondary",
              children: (0, _dateFns.formatDistanceStrict)(startTime * 1000, endTime * 1000, {
                locale: DateLocale[i18n.default.language] || DateLocale.enUS
              })
            })]
          })]
        }), canTriggerLiveActivity && /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Section, {
          children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.SectionTitle, {
            children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Label, {
              children: "Live Activity (dev)"
            })
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Item, {
            onPress: () => triggerLiveActivity("upcoming"),
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Leading, {
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Icon.default, {
                children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
                  name: "Clock"
                })
              })
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "title",
              children: "Aper\xE7u : commence bient\xF4t"
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "body1",
              color: "textSecondary",
              children: "Ce cours commence dans 15 minutes."
            })]
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Item, {
            onPress: () => triggerLiveActivity("ongoing"),
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Leading, {
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Icon.default, {
                children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
                  name: "Play"
                })
              })
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "title",
              children: "Aper\xE7u : en cours"
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "body1",
              color: "textSecondary",
              children: "Ce cours a commenc\xE9 il y a 5 minutes."
            })]
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Item, {
            onPress: () => triggerLiveActivity("endingSoon"),
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Leading, {
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Icon.default, {
                children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
                  name: "AlertCircle"
                })
              })
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "title",
              children: "Aper\xE7u : se termine bient\xF4t"
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "body1",
              color: "textSecondary",
              children: "Ce cours se termine dans 2 minutes."
            })]
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Item, {
            onPress: () => PapillonKit.liveActivities.stop(),
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Leading, {
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Icon.default, {
                children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
                  name: "Cross"
                })
              })
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "title",
              children: "Arr\xEAter la Live Activity"
            })]
          })]
        })]
      })]
    });
  }
},865,[1002,1000,1023,1220,1221,1140,6,190,193,198,1222,1223,1224,1129,1013,1007,1008,1214,1225,1142,1226,1012,1111,1019,931,360,97]);