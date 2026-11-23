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
      return TabOneScreen;
    }
  });
  var _expoRouterReactNavigation = require(_dependencyMap[0]);
  var _lucideReactNative = require(_dependencyMap[1]);
  require(_dependencyMap[2]);
  var _reactNativeWebDistExportsScrollView = require(_dependencyMap[3]);
  var ScrollView = _interopDefault(_reactNativeWebDistExportsScrollView);
  var _reactNativeWebDistExportsStyleSheet = require(_dependencyMap[4]);
  var StyleSheet = _interopDefault(_reactNativeWebDistExportsStyleSheet);
  var _reactNativeWebDistExportsView = require(_dependencyMap[5]);
  var View = _interopDefault(_reactNativeWebDistExportsView);
  var _getpapillonPapicons = require(_dependencyMap[6]);
  var _uiComponentsCourse = require(_dependencyMap[7]);
  var Course = _interopDefault(_uiComponentsCourse);
  var _uiComponentsItem = require(_dependencyMap[8]);
  var Item = _interopDefault(_uiComponentsItem);
  var _uiComponentsList = require(_dependencyMap[9]);
  var List = _interopDefault(_uiComponentsList);
  var _uiComponentsTypography = require(_dependencyMap[10]);
  var Typography = _interopDefault(_uiComponentsTypography);
  var _utilsLoggerLogger = require(_dependencyMap[11]);
  var _uiComponentsIcon = require(_dependencyMap[12]);
  var Icon = _interopDefault(_uiComponentsIcon);
  var _uiComponentsSkeletonView = require(_dependencyMap[13]);
  var SkeletonView = _interopDefault(_uiComponentsSkeletonView);
  var _uiComponentsAvatar = require(_dependencyMap[14]);
  var Avatar = _interopDefault(_uiComponentsAvatar);
  var _uiComponentsStack = require(_dependencyMap[15]);
  var Stack = _interopDefault(_uiComponentsStack);
  var _uiComponentsGrade = require(_dependencyMap[16]);
  var Grade = _interopDefault(_uiComponentsGrade);
  var _uiComponentsSubject = require(_dependencyMap[17]);
  var Subject = _interopDefault(_uiComponentsSubject);
  var _uiComponentsCompactGrade = require(_dependencyMap[18]);
  var _reactJsxRuntime = require(_dependencyMap[19]);
  function TabOneScreen() {
    const {
      colors
    } = (0, _expoRouterReactNavigation.useTheme)();
    return /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(ScrollView.default, {
      contentInsetAdjustmentBehavior: "automatic",
      contentContainerStyle: styles.containerContent,
      style: styles.container,
      children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(SectionTitle, {
        title: "Typography",
        colors: colors
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(View.default, {
        style: styles.typographyContainer,
        children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
          variant: "h1",
          children: "Lorem ipsum"
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
          variant: "h2",
          children: "Lorem ipsum"
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
          variant: "h3",
          children: "Lorem ipsum"
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
          variant: "h4",
          children: "Lorem ipsum"
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
          variant: "h5",
          children: "Lorem ipsum"
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
          variant: "h6",
          children: "Lorem ipsum"
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
          variant: "body1",
          children: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sit amet venenatis ipsum. Sed non luctus purus. Fusce vel mollis turpis, non eleifend leo. Praesent id libero tristique, condimentum elit at, condimentum nibh. Curabitur vehicula mauris in turpis mattis, eget posuere erat sagittis."
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
          variant: "body2",
          children: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sit amet venenatis ipsum. Sed non luctus purus. Fusce vel mollis turpis, non eleifend leo. Praesent id libero tristique, condimentum elit at, condimentum nibh. Curabitur vehicula mauris in turpis mattis, eget posuere erat sagittis."
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
          variant: "caption",
          color: "secondary",
          children: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sit amet venenatis ipsum. Sed non luctus purus. Fusce vel mollis turpis, non eleifend leo. Praesent id libero tristique, condimentum elit at, condimentum nibh."
        })]
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(SectionTitle, {
        title: "Timetable",
        colors: colors
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(View.default, {
        style: {
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 12
        },
        children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Course.default, {
          id: "id1",
          name: "Traitement des donn\xE9es",
          teacher: "Baptive V.",
          room: "B\xE2t. 12 amphi 4",
          color: "#0095D6",
          status: {
            label: "Travail dirigé",
            canceled: false
          },
          variant: "primary",
          start: 1750126049,
          end: 1750129649,
          onPress: () => (0, _utilsLoggerLogger.log)("Bât. 12 amphi 4")
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Course.default, {
          id: "id1",
          name: "Pause m\xE9ridienne",
          variant: "separator",
          leading: _lucideReactNative.Hamburger,
          start: 1750126049,
          end: 1750133249,
          onPress: () => (0, _utilsLoggerLogger.log)("Bât. 12 amphi 4")
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Course.default, {
          id: "id",
          name: "Anglais",
          teacher: "Vince Linise",
          room: "B\xE2t. 9 salle 6",
          color: "#6BAE00",
          status: {
            label: "Professeur absent",
            canceled: true
          },
          variant: "primary",
          start: 1750126049,
          end: 1750129649,
          onPress: () => (0, _utilsLoggerLogger.log)("Bât. 12 amphi 4", "Bât. 9 salle 6")
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Course.default, {
          id: "id2",
          name: "D\xE9veloppement web",
          teacher: "Alexandre P.",
          room: "B\xE2t. 10 salle 16",
          color: "#6BAE00",
          status: {
            label: "Cours magistral",
            canceled: false
          },
          variant: "primary",
          start: 1750126049,
          end: 1750130549,
          onPress: () => (0, _utilsLoggerLogger.log)("Bât. 12 amphi 4")
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Course.default, {
          id: "id2",
          name: "D\xE9veloppement web",
          teacher: "Alexandre P.",
          room: "B\xE2t. 10 salle 16",
          color: "#C50066",
          status: {
            label: "Cours magistral",
            canceled: false
          },
          variant: "primary",
          start: 1750126049,
          end: 1750130549,
          onPress: () => (0, _utilsLoggerLogger.log)("Bât. 12 amphi 4"),
          showTimes: false,
          magicInfo: {
            label: "Dans 20 minutes",
            icon: ({
              color
            }) => /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Icon.default, {
              papicon: true,
              size: 24,
              fill: color,
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
                name: "Clock"
              })
            })
          }
        })]
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(SectionTitle, {
        title: "List & Item",
        colors: colors
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default, {
        children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Item.default, {
          children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
            variant: "body1",
            children: "This is a list item with primary text."
          })
        })
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default, {
        children: [/*#__PURE__*/(0, _reactJsxRuntime.jsxs)(Item.default, {
          children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
            variant: "title",
            children: "Title"
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
            variant: "caption",
            children: "Description"
          })]
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(Item.default, {
          children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_uiComponentsItem.Leading, {
            children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_lucideReactNative.Hamburger, {
              size: 24,
              color: colors.primary
            })
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
            variant: "body1",
            color: "primary",
            children: "Item with Leading"
          })]
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(Item.default, {
          children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_uiComponentsItem.Trailing, {
            children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_lucideReactNative.Hamburger, {
              size: 24,
              color: colors.primary
            })
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
            variant: "body1",
            color: "primary",
            children: "Item with Trailing"
          })]
        })]
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(SectionTitle, {
        title: "Skeleton",
        colors: colors
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(SkeletonView.default, {
        style: {
          width: 100,
          height: 20,
          borderRadius: 4
        }
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
        variant: "h1",
        skeleton: true,
        children: "This is a skeleton text"
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
        skeleton: true,
        skeletonLines: 2,
        children: "This is a description with multiple lines"
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Course.default, {
        id: "id1",
        name: "Traitement des donn\xE9es",
        teacher: "Baptive V.",
        room: "B\xE2t. 12 amphi 4",
        color: "#0095D6",
        status: {
          label: "Travail dirigé",
          canceled: false
        },
        variant: "primary",
        start: 1750126049,
        end: 1750129649,
        magicInfo: {
          label: "Dans 20 minutes",
          icon: ({
            color
          }) => /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Icon.default, {
            papicon: true,
            size: 24,
            fill: color,
            children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
              name: "Clock"
            })
          })
        },
        skeleton: true
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Course.default, {
        id: "id1",
        name: "Traitement des donn\xE9es",
        teacher: "Baptive V.",
        room: "B\xE2t. 12 amphi 4",
        color: "#0095D6",
        status: {
          label: "Travail dirigé",
          canceled: false
        },
        variant: "separator",
        start: 1750126049,
        end: 1750129649,
        skeleton: true
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(Stack.default, {
        direction: "horizontal",
        hAlign: "center",
        gap: 10,
        children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Icon.default, {
          skeleton: true,
          children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
            name: "Placeholder"
          })
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Icon.default, {
          skeleton: true,
          size: 64,
          children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
            name: "Placeholder"
          })
        })]
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Subject.default, {
        emoji: "📐",
        name: "Mathématiques",
        color: "#0095D6",
        outOf: 20,
        average: 12.5,
        skeleton: true
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Grade.default, {
        title: "Hello",
        date: Date.now(),
        score: 15,
        outOf: 20,
        skeleton: true,
        isLast: true,
        isFirst: true
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_uiComponentsCompactGrade.CompactGrade, {
        color: "#0095D6",
        emoji: "📐",
        title: "Mathématiques",
        description: "Contrôle continu",
        score: 14,
        outOf: 20,
        date: new Date(),
        skeleton: true
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(SectionTitle, {
        title: "Avatar",
        colors: colors
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(Stack.default, {
        direction: "horizontal",
        gap: 10,
        hAlign: "center",
        children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Avatar.default, {
          size: 80
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Avatar.default, {
          size: 64,
          initials: "VL",
          color: "#009EC5"
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Avatar.default, {
          size: 40,
          initials: "RG",
          color: "#DD0030",
          shape: "square"
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Avatar.default, {
          size: 40,
          imageUrl: "https://avatars.githubusercontent.com/u/114444115"
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Avatar.default, {
          size: 80,
          shape: "square",
          imageUrl: "https://avatars.githubusercontent.com/u/114444115"
        })]
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(Stack.default, {
        direction: "horizontal",
        gap: 10,
        hAlign: "center",
        children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Avatar.default, {
          size: 64,
          imageUrl: "https://avatars.githubusercontent.com/u/-1"
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Avatar.default, {
          size: 64,
          skeleton: true
        })]
      })]
    });
  }
  const SectionTitle = ({
    title,
    colors
  }) => /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(View.default, {
    style: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      gap: 5
    },
    children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
      variant: "h4",
      color: "primary",
      children: title
    }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(View.default, {
      style: {
        width: "100%",
        height: 2,
        borderRadius: 100,
        backgroundColor: colors.primary
      }
    })]
  });
  const styles = StyleSheet.default.create({
    container: {
      flex: 1,
      padding: 16
    },
    containerContent: {
      gap: 16,
      paddingBottom: 30
    },
    typographyContainer: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  });
},997,[1000,1010,104,222,117,198,1002,1482,1123,1122,1110,1116,1013,1483,1135,1005,1480,1481,1367,97]);
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
  var _expoRouterReactNavigation = require(_dependencyMap[0]);
  var _react = require(_dependencyMap[1]);
  var React = _interopDefault(_react);
  var _reactNativeWebDistExportsPressable = require(_dependencyMap[2]);
  var Pressable = _interopDefault(_reactNativeWebDistExportsPressable);
  var _reactNativeWebDistExportsStyleSheet = require(_dependencyMap[3]);
  var StyleSheet = _interopDefault(_reactNativeWebDistExportsStyleSheet);
  var _reactNativeWebDistExportsView = require(_dependencyMap[4]);
  var View = _interopDefault(_reactNativeWebDistExportsView);
  var _reactNativeReanimated = require(_dependencyMap[5]);
  var Reanimated = _interopDefault(_reactNativeReanimated);
  var _Stack = require(_dependencyMap[6]);
  var Stack = _interopDefault(_Stack);
  var _Typography = require(_dependencyMap[7]);
  var Typography = _interopDefault(_Typography);
  var _utilsI18n = require(_dependencyMap[8]);
  var i18n = _interopDefault(_utilsI18n);
  var _reactJsxRuntime = require(_dependencyMap[9]);
  const ListGradesLayoutTransition = _reactNativeReanimated.LinearTransition.easing(_reactNativeReanimated.Easing.inOut(_reactNativeReanimated.Easing.circle)).duration(300);
  const Grade = /*#__PURE__*/React.default.memo(({
    isFirst,
    isLast,
    title,
    date,
    score,
    outOf,
    color,
    disabled,
    status,
    onPress,
    skeleton = false
  }) => {
    const theme = (0, _expoRouterReactNavigation.useTheme)();
    const {
      colors
    } = theme;
    const formattedDate = (0, _react.useMemo)(() => new Date(date).toLocaleDateString(i18n.default.language, {
      day: "2-digit",
      month: "long",
      year: "numeric"
    }), [date]);
    const formattedScore = (0, _react.useMemo)(() => score.toFixed(2), [score]);
    const styles = (0, _react.useMemo)(() => StyleSheet.default.create({
      container: {
        padding: 10,
        borderWidth: 1,
        backgroundColor: colors.card,
        borderColor: colors.border,
        borderTopWidth: 0,
        shadowColor: "rgba(0,0,0,0.1)",
        shadowOffset: {
          width: 0,
          height: 1
        },
        shadowRadius: 3,
        shadowOpacity: 1,
        elevation: 1,
        borderCurve: "continuous"
      },
      lastItem: {
        marginBottom: 16,
        borderBottomLeftRadius: 22,
        borderBottomRightRadius: 22
      },
      firstItem: {
        borderTopLeftRadius: 22,
        borderTopRightRadius: 22
      },
      stackPadding: {
        paddingHorizontal: 4
      },
      flexContainer: {
        flex: 1
      }
    }), [colors]);
    const [isPressed, setIsPressed] = (0, _react.useState)(false);
    return /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Reanimated.default.View, {
      layout: ListGradesLayoutTransition,
      children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Pressable.default, {
        onPress: onPress,
        onPressIn: () => setIsPressed(true),
        onPressOut: () => setIsPressed(false),
        children: /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(Reanimated.default.View, {
          style: [styles.container, isLast && styles.lastItem, isFirst && styles.firstItem],
          children: [isPressed && /*#__PURE__*/(0, _reactJsxRuntime.jsx)(View.default, {
            style: {
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "#00000020",
              zIndex: 1,
              borderTopLeftRadius: isFirst ? 22 : 0,
              borderTopRightRadius: isFirst ? 22 : 0,
              borderBottomLeftRadius: isLast ? 22 : 0,
              borderBottomRightRadius: isLast ? 22 : 0
            }
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(Stack.default, {
            direction: "horizontal",
            hAlign: "center",
            vAlign: "center",
            style: styles.stackPadding,
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsxs)(Stack.default, {
              inline: true,
              style: styles.flexContainer,
              gap: 0,
              children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
                variant: "title",
                skeleton: skeleton,
                skeletonWidth: 150,
                numberOfLines: 2,
                style: {
                  lineHeight: 20
                },
                children: title
              }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
                variant: "body2",
                color: "secondary",
                inline: true,
                style: {
                  marginTop: skeleton ? 0 : 2,
                  marginBottom: skeleton ? 0 : 2
                },
                skeleton: skeleton,
                skeletonWidth: 100,
                nowrap: true,
                children: formattedDate
              })]
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Stack.default, {
              direction: "horizontal",
              hAlign: "end",
              vAlign: "end",
              inline: true,
              gap: 1,
              backgroundColor: color + "33",
              style: {
                marginTop: 2,
                paddingHorizontal: 10,
                paddingVertical: 0,
                borderRadius: 20
              },
              children: skeleton ? /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
                variant: "h5",
                skeleton: true
              }) : /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_reactJsxRuntime.Fragment, {
                children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
                  variant: "h5",
                  color: color,
                  children: disabled ? status : formattedScore
                }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(Typography.default, {
                  variant: "caption",
                  color: color,
                  style: {
                    marginBottom: 4
                  },
                  children: ["/", outOf]
                })]
              })
            })]
          })]
        })
      })
    });
  });
  var _default = Grade;
},1480,[1000,6,334,117,198,1107,1005,1110,1127,97]);
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
  var _expoRouterReactNavigation = require(_dependencyMap[0]);
  var _react = require(_dependencyMap[1]);
  var _reactNativeWebDistExportsStyleSheet = require(_dependencyMap[2]);
  var StyleSheet = _interopDefault(_reactNativeWebDistExportsStyleSheet);
  var _reactNativeWebDistExportsText = require(_dependencyMap[3]);
  var Text = _interopDefault(_reactNativeWebDistExportsText);
  var _reactNativeWebDistExportsView = require(_dependencyMap[4]);
  var View = _interopDefault(_reactNativeWebDistExportsView);
  var _reactNativeReanimated = require(_dependencyMap[5]);
  var Reanimated = _interopDefault(_reactNativeReanimated);
  var _Stack = require(_dependencyMap[6]);
  var Stack = _interopDefault(_Stack);
  var _Typography = require(_dependencyMap[7]);
  var Typography = _interopDefault(_Typography);
  var _uiComponentsSkeletonView = require(_dependencyMap[8]);
  var SkeletonView = _interopDefault(_uiComponentsSkeletonView);
  var _reactJsxRuntime = require(_dependencyMap[9]);
  const ListGradesLayoutTransition = _reactNativeReanimated.LinearTransition.easing(_reactNativeReanimated.Easing.inOut(_reactNativeReanimated.Easing.circle)).duration(300);
  const Subject = ({
    color,
    emoji,
    name,
    average,
    disabled = false,
    status,
    outOf,
    skeleton = false
  }) => {
    const {
      colors
    } = (0, _expoRouterReactNavigation.useTheme)();
    return /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Reanimated.default.View, {
      layout: ListGradesLayoutTransition,
      style: [styles.container, {
        backgroundColor: skeleton ? colors.text + "10" : color + 33
      }],
      children: /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(Stack.default, {
        direction: "horizontal",
        hAlign: "center",
        gap: 12,
        children: [skeleton ? /*#__PURE__*/(0, _reactJsxRuntime.jsx)(SkeletonView.default, {
          style: styles.emojiContainer
        }) : /*#__PURE__*/(0, _reactJsxRuntime.jsx)(View.default, {
          style: [styles.emojiContainer, {
            backgroundColor: color + 50
          }],
          children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Text.default, {
            style: styles.emoji,
            children: emoji
          })
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
          nowrap: true,
          variant: "title",
          color: color,
          style: styles.flex1,
          skeleton: skeleton,
          skeletonWidth: 120,
          children: name
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Stack.default, {
          direction: "horizontal",
          backgroundColor: skeleton ? colors.text + "05" : color + "25",
          inline: true,
          radius: 120,
          gap: 1,
          hAlign: "end",
          style: styles.gradeContainer,
          children: skeleton ? /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
            skeleton: true
          }) : /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_reactJsxRuntime.Fragment, {
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "body1",
              weight: "bold",
              color: color,
              children: disabled ? status : (average ?? 0).toFixed(2)
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "caption",
              weight: "semibold",
              color: color + "DF",
              style: {
                fontSize: 13,
                opacity: 0.8
              },
              children: `/${outOf}`
            })]
          })
        })]
      })
    });
  };
  const styles = StyleSheet.default.create({
    container: {
      borderColor: "#00000022",
      borderWidth: 1,
      borderBottomWidth: 0,
      padding: 7,
      borderTopLeftRadius: 22,
      borderTopRightRadius: 22,
      borderCurve: "continuous",
      shadowColor: "rgba(0,0,0,0.1)",
      shadowOffset: {
        width: 0,
        height: 1
      },
      shadowRadius: 3,
      shadowOpacity: 1,
      elevation: 1,
      paddingBottom: 31,
      marginBottom: -24
    },
    emojiContainer: {
      width: 34,
      aspectRatio: 1,
      borderRadius: 20,
      justifyContent: "center",
      alignItems: "center"
    },
    emoji: {
      fontSize: 20
    },
    flex1: {
      flex: 1
    },
    gradeContainer: {
      paddingHorizontal: 10,
      paddingVertical: 4
    }
  });
  var _default = /*#__PURE__*/(0, _react.memo)(Subject);
},1481,[1000,6,117,277,198,1107,1005,1110,1483,97]);