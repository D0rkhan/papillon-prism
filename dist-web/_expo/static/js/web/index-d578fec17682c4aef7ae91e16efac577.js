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
  var _react = require(_dependencyMap[0]);
  var _expoRouter = require(_dependencyMap[1]);
  var _i18next = require(_dependencyMap[2]);
  var _reactNativeWebDistExportsFlatList = require(_dependencyMap[3]);
  var FlatList = _interopDefault(_reactNativeWebDistExportsFlatList);
  require(_dependencyMap[4]);
  var _reactNativeWebDistExportsPressable = require(_dependencyMap[5]);
  var Pressable = _interopDefault(_reactNativeWebDistExportsPressable);
  var _reactNativeWebDistExportsRefreshControl = require(_dependencyMap[6]);
  var RefreshControl = _interopDefault(_reactNativeWebDistExportsRefreshControl);
  var _reactNativeWebDistExportsStyleSheet = require(_dependencyMap[7]);
  var StyleSheet = _interopDefault(_reactNativeWebDistExportsStyleSheet);
  var _reactNativeWebDistExportsView = require(_dependencyMap[8]);
  var View = _interopDefault(_reactNativeWebDistExportsView);
  var _reactNativeWebDistExportsUseWindowDimensions = require(_dependencyMap[9]);
  var useWindowDimensions = _interopDefault(_reactNativeWebDistExportsUseWindowDimensions);
  var _utilsI18n = require(_dependencyMap[10]);
  var i18n = _interopDefault(_utilsI18n);
  var _hooksUseLoadErrorAlert = require(_dependencyMap[11]);
  var _storesSettings = require(_dependencyMap[12]);
  var _servicesAuthCoordinator = require(_dependencyMap[13]);
  var _utilsGradesScale = require(_dependencyMap[14]);
  var _utilsServicesPeriods = require(_dependencyMap[15]);
  var _utilsSubjectsName = require(_dependencyMap[16]);
  var _utilsSubjectsEmoji = require(_dependencyMap[17]);
  var _hooksUsePeriodsData = require(_dependencyMap[18]);
  var _hooksUseGradesData = require(_dependencyMap[19]);
  var _uiNewTypography = require(_dependencyMap[20]);
  var Typography = _interopDefault(_uiNewTypography);
  var _atomsAverages = require(_dependencyMap[21]);
  var Averages = _interopDefault(_atomsAverages);
  var _atomsEpflEntryCard = require(_dependencyMap[22]);
  var EpflEntryCard = _interopDefault(_atomsEpflEntryCard);
  var _atomsGradesEmptyState = require(_dependencyMap[23]);
  var GradesEmptyState = _interopDefault(_atomsGradesEmptyState);
  var _atomsGradesLoading = require(_dependencyMap[24]);
  var GradesLoading = _interopDefault(_atomsGradesLoading);
  var _uiNewList = require(_dependencyMap[25]);
  var List = _interopDefault(_uiNewList);
  var _uiUtilsResizable = require(_dependencyMap[26]);
  var useResizable = _interopDefault(_uiUtilsResizable);
  var _uiNewCompactGrade = require(_dependencyMap[27]);
  var CompactGrade = _interopDefault(_uiNewCompactGrade);
  require(_dependencyMap[28]);
  var _reactNativeSafeAreaContext = require(_dependencyMap[29]);
  var _uiComponentsSafeHorizontalView = require(_dependencyMap[30]);
  var SafeHorizontalView = _interopDefault(_uiComponentsSafeHorizontalView);
  var _reactJsxRuntime = require(_dependencyMap[31]);
  const isAndroid = false;
  const getSortings = () => [{
    value: 'date',
    label: (0, _i18next.t)('Grades_Sorting_Date'),
    sf: 'calendar',
    papicon: 'Calendar'
  }, {
    value: 'averages',
    label: (0, _i18next.t)('Grades_Sorting_Averages'),
    sf: 'chart.xyaxis.line',
    papicon: 'Grades'
  }, {
    value: 'alphabetical',
    label: (0, _i18next.t)('Grades_Sorting_Alphabetical'),
    sf: 'character',
    papicon: 'List'
  }];
  const periodTitle = period => {
    const name = (0, _utilsServicesPeriods.getPeriodName)(period.name || '');
    return (0, _utilsServicesPeriods.isPeriodWithNumber)(period.name || '') ? `${name} ${(0, _utilsServicesPeriods.getPeriodNumber)(period.name || '')}` : name;
  };
  const periodSubtitle = period => `${period.start.toLocaleDateString(i18n.default.language, {
    month: 'short',
    year: 'numeric'
  })} - ${period.end.toLocaleDateString(i18n.default.language, {
    month: 'short',
    year: 'numeric'
  })}`;
  const sortSubjects = (subjects, method) => {
    const copy = [...subjects];
    switch (method) {
      case 'alphabetical':
        copy.sort((a, b) => (0, _utilsSubjectsName.getSubjectName)(a.name).localeCompare((0, _utilsSubjectsName.getSubjectName)(b.name)));
        break;
      case 'averages':
        copy.sort((a, b) => (b.studentAverage?.value ?? -1) - (a.studentAverage?.value ?? -1));
        break;
      default:
        copy.sort((a, b) => {
          const aDate = a.grades?.[0]?.givenAt?.getTime() ?? 0;
          const bDate = b.grades?.[0]?.givenAt?.getTime() ?? 0;
          return bDate - aDate;
        });
    }
    return copy;
  };
  const GradesView = () => {
    const displayScale = (0, _utilsGradesScale.getGradeDisplayScale)((0, _storesSettings.useSettingsStore)(state => state.personalization.gradesDisplayScale));
    const theme = (0, _expoRouter.useTheme)();
    const resize = (0, useResizable.default)();
    const {
      width: screenWidth
    } = (0, useWindowDimensions.default)();
    const {
      periods,
      currentPeriod,
      setCurrentPeriod,
      refresh: refreshPeriods,
      loading: loadingPeriods,
      error: periodsError,
      failures: periodsFailures
    } = (0, _hooksUsePeriodsData.usePeriodsData)();
    const {
      subjects,
      history,
      averages,
      isAverageServiceProvided,
      refresh: refreshGrades,
      loading: loadingGrades,
      error: gradesError,
      failures: gradesFailures
    } = (0, _hooksUseGradesData.useGradesData)(currentPeriod);
    const loading = loadingPeriods || loadingGrades;
    const failure = gradesFailures[0] ?? periodsFailures[0];
    const hasError = Boolean(gradesError || periodsError || failure);
    (0, _hooksUseLoadErrorAlert.useLoadErrorAlert)({
      subject: "tes notes",
      error: gradesError ?? periodsError,
      failures: gradesFailures.length > 0 ? gradesFailures : periodsFailures,
      hasData: subjects.length > 0
    });
    const [sortMethod, setSortMethod] = (0, _react.useState)('date');
    const [searchText, setSearchText] = (0, _react.useState)('');
    const handleRefresh = (0, _react.useCallback)(async () => {
      (0, _servicesAuthCoordinator.allowAllAuthRetries)();
      // Refresh periods first (a new one may have appeared), then the current period's grades.
      await refreshPeriods();
      await refreshGrades();
    }, [refreshPeriods, refreshGrades]);
    const sortedSubjects = (0, _react.useMemo)(() => sortSubjects(subjects, sortMethod), [subjects, sortMethod]);
    const filteredSubjects = (0, _react.useMemo)(() => {
      if (searchText.trim() === '') {
        return sortedSubjects;
      }
      const query = searchText.toLowerCase();
      return sortedSubjects.reduce((acc, subject) => {
        const subjectMatches = (0, _utilsSubjectsName.getSubjectName)(subject.name).toLowerCase().includes(query);
        if (subjectMatches) {
          acc.push(subject);
          return acc;
        }
        const matchingGrades = (subject.grades ?? []).filter(grade => grade.description?.toLowerCase().includes(query));
        if (matchingGrades.length > 0) {
          acc.push({
            ...subject,
            grades: matchingGrades
          });
        }
        return acc;
      }, []);
    }, [sortedSubjects, searchText]);
    const sortings = (0, _react.useMemo)(() => getSortings(), [i18n.default.language]);

    // 10 last grades (with subject in them (without grades))
    const recentGrades = (0, _react.useMemo)(() => {
      const allGrades = subjects.flatMap(subject => (subject.grades ?? []).map(grade => ({
        ...grade,
        subject
      })));
      allGrades.sort((a, b) => (b.givenAt?.getTime() ?? 0) - (a.givenAt?.getTime() ?? 0));
      return allGrades.slice(0, 10);
    }, [subjects]);
    const [isSearchbarFocused, setIsSearchbarFocused] = (0, _react.useState)(false);
    return /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_reactJsxRuntime.Fragment, {
      children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoRouter.Stack.SearchBar, {
        onChangeText: e => setSearchText(e.nativeEvent.text),
        placeholder: "Rechercher une matière ou une note...",
        onFocus: () => setIsSearchbarFocused(true),
        onBlur: () => setIsSearchbarFocused(false),
        autoCapitalize: "none",
        hideWhenScrolling: true
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoRouter.Stack.Toolbar, {
        placement: "left",
        children: /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_expoRouter.Stack.Toolbar.Menu, {
          children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoRouter.Stack.Toolbar.Icon, {
            sf: "calendar"
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoRouter.Stack.Toolbar.Label, {
            children: currentPeriod ? periodTitle(currentPeriod) : (0, _i18next.t)('Grades_Periods_None')
          }), periods.map(period => /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoRouter.Stack.Toolbar.MenuAction, {
            isOn: currentPeriod?.id === period.id,
            icon: (0, _utilsServicesPeriods.isPeriodWithNumber)(period.name || '') ? `${(0, _utilsServicesPeriods.getPeriodNumber)(period.name || '')}.calendar` : 'calendar',
            subtitle: periodSubtitle(period),
            onPress: () => setCurrentPeriod(period),
            children: periodTitle(period)
          }, period.id))]
        })
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoRouter.Stack.Title, {
        asChild: true,
        children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(View.default, {
          style: [styles.titleContainer, {
            width: screenWidth - 140
          }],
          children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
            variant: "header",
            weight: "semibold",
            numberOfLines: 1,
            children: currentPeriod ? periodTitle(currentPeriod) : (0, _i18next.t)('Tab_Grades')
          })
        })
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoRouter.Stack.Toolbar, {
        placement: "right",
        children: /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_expoRouter.Stack.Toolbar.Menu, {
          children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoRouter.Stack.Toolbar.Icon, {
            sf: "line.3.horizontal.decrease"
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoRouter.Stack.Toolbar.Label, {
            children: "Sort by"
          }), sortings.map(sorting => /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoRouter.Stack.Toolbar.MenuAction, {
            isOn: sortMethod === sorting.value,
            icon: sorting.sf,
            onPress: () => setSortMethod(sorting.value),
            children: sorting.label
          }, sorting.value))]
        })
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(View.default, {
        style: {
          flex: 1,
          backgroundColor: theme.colors.background
        },
        children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default, {
          style: {
            flex: 1
          },
          safeHorizontalPadding: 16,
          contentInsetAdjustmentBehavior: "automatic",
          refreshControl: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(RefreshControl.default, {
            refreshing: false,
            onRefresh: handleRefresh
          }),
          numColumns: resize.isLarge ? 2 : 1,
          ListEmptyComponent: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(SafeHorizontalView.default, {
            base: 16,
            children: loading ? /*#__PURE__*/(0, _reactJsxRuntime.jsx)(GradesLoading.default, {}) : /*#__PURE__*/(0, _reactJsxRuntime.jsx)(GradesEmptyState.default, {
              hasError: hasError,
              serviceName: failure?.displayName,
              isSearching: searchText.trim() !== '' && subjects.length > 0
            })
          }),
          ListHeaderComponent: isSearchbarFocused ? /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactJsxRuntime.Fragment, {}) : /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(View.default, {
            style: {
              paddingVertical: 16,
              gap: 12
            },
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(SafeHorizontalView.default, {
              base: 16,
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(EpflEntryCard.default, {})
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(SafeHorizontalView.default, {
              base: 16,
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Averages.default, {
                history: history,
                realAverage: isAverageServiceProvided ? averages.student?.value : undefined,
                color: theme.colors.primary,
                displayScale: displayScale
              })
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(FlatList.default, {
              data: recentGrades,
              renderItem: ({
                item: grade
              }) => /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_expoRouter.Link, {
                href: {
                  pathname: "/(tabs)/grades/[id]",
                  params: {
                    id: grade.id
                  }
                },
                asChild: true,
                children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoRouter.Link.Preview, {}), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoRouter.Link.Trigger, {
                  children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoRouter.Link.AppleZoom, {
                    children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Pressable.default, {
                      style: {
                        overflow: 'visible',
                        margin: -24,
                        padding: 24
                      },
                      children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(CompactGrade.default, {
                        grade: grade,
                        subject: grade.subject
                      })
                    })
                  })
                })]
              }),
              showsHorizontalScrollIndicator: false,
              ItemSeparatorComponent: () => /*#__PURE__*/(0, _reactJsxRuntime.jsx)(View.default, {
                style: {
                  width: 12
                }
              }),
              horizontal: true
              // Edge spacers sized natively by the safe area, so the carousel stays full-bleed.
              ,
              ListHeaderComponent: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNativeSafeAreaContext.SafeAreaView, {
                edges: {
                  left: _uiComponentsSafeHorizontalView.SAFE_HORIZONTAL_EDGES.left
                },
                style: {
                  paddingLeft: 16
                }
              }),
              ListFooterComponent: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNativeSafeAreaContext.SafeAreaView, {
                edges: {
                  right: _uiComponentsSafeHorizontalView.SAFE_HORIZONTAL_EDGES.right
                },
                style: {
                  paddingRight: 16
                }
              }),
              contentContainerStyle: {
                paddingVertical: 24,
                overflow: 'visible'
              },
              style: {
                overflow: 'visible',
                marginVertical: -24
              }
            })]
          }),
          children: filteredSubjects.map(subject => {
            const subjectAverage = (0, _utilsGradesScale.formatGradeScoreForDisplay)(subject.studentAverage, subject.outOf, displayScale);
            return /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Section, {
              id: subject.id,
              children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.SectionTitle, {
                id: `${subject.id}-title`,
                children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoRouter.Link, {
                  href: {
                    pathname: "/(tabs)/grades/subject/[id]",
                    params: {
                      id: subject.id,
                      period: currentPeriod?.id
                    }
                  },
                  asChild: true,
                  children: /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(Pressable.default, {
                    style: {
                      flex: 1,
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 10,
                      paddingVertical: 2
                    },
                    children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
                      variant: "h4",
                      style: {
                        marginTop: 0
                      },
                      inset: true,
                      children: (0, _utilsSubjectsEmoji.getSubjectEmoji)(subject.name)
                    }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
                      style: {
                        flex: 1
                      },
                      variant: "title",
                      numberOfLines: 1,
                      weight: "semibold",
                      color: "textPrimary",
                      children: (0, _utilsSubjectsName.getSubjectName)(subject.name)
                    }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(View.default, {
                      style: {
                        alignItems: 'flex-end',
                        flexDirection: 'row',
                        gap: 1
                      },
                      children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
                        variant: "h5",
                        weight: "semibold",
                        color: "textSecondary",
                        children: subjectAverage.value
                      }), subjectAverage.denominator !== '' && /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
                        variant: "caption",
                        color: "textSecondary",
                        children: subjectAverage.denominator
                      })]
                    })]
                  })
                })
              }), (subject.grades ?? []).map(grade => {
                const score = grade.studentScore;
                const isUsable = score && !score.disabled && typeof score.value === 'number';
                const formattedScore = isUsable ? (0, _utilsGradesScale.formatScoreForDisplay)(score.value, grade.outOf?.value ?? 20, displayScale) : undefined;
                return /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Item, {
                  id: grade.id,
                  href: {
                    pathname: "/(tabs)/grades/[id]",
                    params: {
                      id: grade.id
                    }
                  },
                  children: [/*#__PURE__*/(0, _reactJsxRuntime.jsxs)(View.default, {
                    style: {
                      flex: 1,
                      flexDirection: 'column',
                      gap: 1
                    },
                    children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
                      numberOfLines: 1,
                      weight: "semibold",
                      variant: "title",
                      children: grade.description || (0, _i18next.t)("Grade_NoDescription", {
                        subject: (0, _utilsSubjectsName.getSubjectName)(subject.name)
                      })
                    }), grade.givenAt && /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
                      numberOfLines: 1,
                      variant: "subtitle",
                      color: "textSecondary",
                      children: grade.givenAt.toLocaleDateString(i18n.default.language, {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })
                    })]
                  }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Trailing, {
                    children: /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(View.default, {
                      style: {
                        alignItems: 'flex-end',
                        flexDirection: 'row',
                        gap: 1
                      },
                      children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
                        weight: "semibold",
                        variant: "h4",
                        children: formattedScore ? formattedScore.value.toFixed(2) : score?.status ?? 'N/A'
                      }), formattedScore && formattedScore.denominator && /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
                        variant: "subtitle",
                        color: "textSecondary",
                        children: formattedScore.denominator
                      })]
                    })
                  })]
                }, grade.id);
              })]
            }, subject.id);
          })
        })
      })]
    });
  };
  const styles = StyleSheet.default.create({
    titleContainer: {
      height: 44,
      // Android headers align their title to the leading edge; iOS centers it.
      alignItems: 'center',
      paddingHorizontal: 0,
      justifyContent: 'center'
    },
    titleSubtitle: {
      marginTop: -2
    }
  });
  var _default = GradesView;
},954,[6,1023,1140,196,193,334,221,117,198,358,1127,1426,1012,1134,1370,1218,1225,1226,953,952,1008,947,948,949,950,1007,1409,1424,1237,360,1111,97]);
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
      return _default;
    }
  });
  var _react = require(_dependencyMap[0]);
  require(_dependencyMap[1]);
  var _reactNativeWebDistExportsView = require(_dependencyMap[2]);
  var View = _interopDefault(_reactNativeWebDistExportsView);
  var _uiNewGlassContainer = require(_dependencyMap[3]);
  var GlassContainer = _interopDefault(_uiNewGlassContainer);
  var _expoRouterReactNavigation = require(_dependencyMap[4]);
  var _dateFns = require(_dependencyMap[5]);
  var _dateFnsLocale = require(_dependencyMap[6]);
  var DateLocale = _interopNamespace(_dateFnsLocale);
  var _i18next = require(_dependencyMap[7]);
  var _Typography = require(_dependencyMap[8]);
  var Typography = _interopDefault(_Typography);
  var _utilsSubjectsName = require(_dependencyMap[9]);
  var _utilsSubjectsEmoji = require(_dependencyMap[10]);
  var _utilsSubjectsColors = require(_dependencyMap[11]);
  require(_dependencyMap[12]);
  var _utilsAdjustColor = require(_dependencyMap[13]);
  var adjust = _interopDefault(_utilsAdjustColor);
  var _utilsI18n = require(_dependencyMap[14]);
  var i18n = _interopDefault(_utilsI18n);
  var _storesSettings = require(_dependencyMap[15]);
  var _utilsGradesScale = require(_dependencyMap[16]);
  var _reactJsxRuntime = require(_dependencyMap[17]);
  const CompactGrade = ({
    grade,
    subject
  }) => {
    const theme = (0, _expoRouterReactNavigation.useTheme)();
    const displayScale = (0, _utilsGradesScale.getGradeDisplayScale)((0, _storesSettings.useSettingsStore)(state => state.personalization.gradesDisplayScale));
    const score = (0, _react.useMemo)(() => (0, _utilsGradesScale.formatGradeScoreForDisplay)(grade.studentScore, grade.outOf, displayScale), [grade.studentScore, grade.outOf, displayScale]);
    const subjectName = (0, _react.useMemo)(() => {
      if (subject?.name) {
        return (0, _utilsSubjectsName.getSubjectName)(subject.name);
      }
      return 'Unknown Subject';
    }, [subject?.name]);
    const subjectEmoji = (0, _react.useMemo)(() => {
      if (subject?.name) {
        return (0, _utilsSubjectsEmoji.getSubjectEmoji)(subject.name);
      }
      return '❓';
    }, [subject?.name]);
    const subjectColor = (0, _react.useMemo)(() => {
      if (subject?.name) {
        return (0, _utilsSubjectsColors.getSubjectColor)(subject.name);
      }
      return theme.colors.primary;
    }, [subject?.name, theme.colors.primary]);
    const tintedTextColor = (0, _react.useMemo)(() => {
      return (0, adjust.default)(subjectColor, theme.dark ? 0.5 : -0.5);
    }, [subjectColor, theme.dark]);
    const tintedTextColorSecondary = (0, _react.useMemo)(() => {
      return (0, adjust.default)(subjectColor, theme.dark ? 0.5 : -0.5) + '99';
    }, [subjectColor, theme.dark]);
    return /*#__PURE__*/(0, _reactJsxRuntime.jsx)(GlassContainer.default, {
      isInteractive: true,
      glassType: "regular",
      glassOpacity: 0,
      style: {
        borderRadius: 24
      },
      children: /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(View.default, {
        style: {
          width: 200,
          gap: 8,
          paddingVertical: 12,
          borderRadius: 24,
          overflow: 'hidden',
          backgroundColor: subjectColor + '15'
        },
        children: [false, /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(View.default, {
          style: {
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 14,
            gap: 8
          },
          children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
            style: {
              fontSize: 18,
              lineHeight: 25
            },
            children: subjectEmoji
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
            variant: "body1",
            color: tintedTextColorSecondary,
            numberOfLines: 1,
            style: {
              flex: 1
            },
            children: subjectName
          })]
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(View.default, {
          style: {
            paddingHorizontal: 14
          },
          children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
            color: tintedTextColor,
            variant: "title",
            numberOfLines: 1,
            children: grade.description || (0, _i18next.t)("Grade_NoDescription", {
              subject: (0, _utilsSubjectsName.getSubjectName)(subject.name)
            })
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
            variant: "body1",
            color: tintedTextColorSecondary,
            numberOfLines: 1,
            children: grade.givenAt ? (0, _dateFns.formatDistanceToNowStrict)(new Date(grade.givenAt), {
              addSuffix: true,
              locale: DateLocale[i18n.default.language]
            }) : 'No date'
          })]
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(View.default, {
          style: {
            paddingHorizontal: 14,
            flexDirection: 'row',
            alignItems: 'flex-end'
          },
          children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
            variant: "h3",
            numberOfLines: 2,
            color: tintedTextColor,
            children: score.value
          }), score.denominator !== '' && /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
            variant: "body1",
            color: tintedTextColorSecondary,
            numberOfLines: 1,
            children: score.denominator
          })]
        })]
      })
    });
  };
  var _default = CompactGrade;
},1424,[6,193,198,1425,1000,1220,1221,1140,1008,1225,1226,1142,1113,1114,1127,1012,1370,97]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return _default;
    }
  });
  var _sbaiahmed1ReactNativeBlur = require(_dependencyMap[0]);
  require(_dependencyMap[1]);
  require(_dependencyMap[2]);
  var _List = require(_dependencyMap[3]);
  var _reactJsxRuntime = require(_dependencyMap[4]);
  const GlassContainer = props => {
    {
      return /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_List.ListTouchable, {
        ...props,
        children: props.children
      });
    }
    return /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_sbaiahmed1ReactNativeBlur.LiquidGlassView, {
      ...props,
      children: props.children
    });
  };
  var _default = GlassContainer;
},1425,[1427,6,193,1007,97]);