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
  var _getpapillonPapicons = require(_dependencyMap[0]);
  require(_dependencyMap[1]);
  var _expoLinearGradient = require(_dependencyMap[2]);
  var _expoRouter = require(_dependencyMap[3]);
  var _expoRouterReactNavigation = require(_dependencyMap[4]);
  var _react = require(_dependencyMap[5]);
  var _reactI18next = require(_dependencyMap[6]);
  var _reactNativeWebDistExportsKeyboardAvoidingView = require(_dependencyMap[7]);
  var KeyboardAvoidingView = _interopDefault(_reactNativeWebDistExportsKeyboardAvoidingView);
  require(_dependencyMap[8]);
  var _reactNativeWebDistExportsScrollView = require(_dependencyMap[9]);
  var ScrollView = _interopDefault(_reactNativeWebDistExportsScrollView);
  var _reactNativeWebDistExportsText = require(_dependencyMap[10]);
  var Text = _interopDefault(_reactNativeWebDistExportsText);
  var _reactNativeWebDistExportsTextInput = require(_dependencyMap[11]);
  var TextInput = _interopDefault(_reactNativeWebDistExportsTextInput);
  var _reactNativeWebDistExportsView = require(_dependencyMap[12]);
  var View = _interopDefault(_reactNativeWebDistExportsView);
  var _reactNativeReanimated = require(_dependencyMap[13]);
  var Reanimated = _interopDefault(_reactNativeReanimated);
  var _reactNativeSafeAreaContext = require(_dependencyMap[14]);
  var _databaseUseHomework = require(_dependencyMap[15]);
  var _storesAccount = require(_dependencyMap[16]);
  var _uiComponentsActionMenu = require(_dependencyMap[17]);
  var ActionMenu = _interopDefault(_uiComponentsActionMenu);
  var _uiComponentsAlertProvider = require(_dependencyMap[18]);
  var _uiComponentsAnimatedPressable = require(_dependencyMap[19]);
  var AnimatedPressable = _interopDefault(_uiComponentsAnimatedPressable);
  var _uiComponentsStack = require(_dependencyMap[20]);
  var Stack = _interopDefault(_uiComponentsStack);
  var _uiComponentsTask = require(_dependencyMap[21]);
  var Task = _interopDefault(_uiComponentsTask);
  var _uiComponentsTypography = require(_dependencyMap[22]);
  var Typography = _interopDefault(_uiComponentsTypography);
  var _utilsAdjustColor = require(_dependencyMap[23]);
  var adjust = _interopDefault(_utilsAdjustColor);
  var _reactJsxRuntime = require(_dependencyMap[24]);
  const SubjectSelector = ({
    subjects,
    selectedSubject,
    setSelectedSubject
  }) => {
    const {
      colors
    } = (0, _expoRouterReactNavigation.useTheme)();
    // The iOS menu is a SwiftUI host sized to its content, so a percentage width
    // resolves to nothing: the row is given the measured width of the column.
    const [width, setWidth] = (0, _react.useState)();
    return /*#__PURE__*/(0, _reactJsxRuntime.jsx)(View.default, {
      style: {
        width: "100%"
      },
      onLayout: event => setWidth(event.nativeEvent.layout.width),
      children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(ActionMenu.default, {
        onPressAction: ({
          nativeEvent
        }) => {
          const selected = subjects.find(s => s.id === nativeEvent.event);
          if (selected) {
            setSelectedSubject(selected);
          }
        },
        actions: subjects.map(subject => ({
          id: subject.id,
          title: [subject.emoji, subject.name].join(" "),
          state: subject.id === selectedSubject.id ? "on" : "off"
        })),
        children: /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(View.default, {
          style: {
            width: width ?? "100%",
            backgroundColor: colors.card,
            flexDirection: "row",
            gap: 10,
            padding: 10,
            alignItems: "center",
            borderRadius: 30,
            borderWidth: 1,
            borderColor: colors.border,
            shadowRadius: 3,
            shadowColor: "#000",
            shadowOpacity: 0.05,
            shadowOffset: {
              width: 0,
              height: 0
            }
          },
          children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Stack.default, {
            backgroundColor: selectedSubject.color + 40,
            inline: true,
            radius: 80,
            vAlign: "center",
            hAlign: "center",
            style: {
              width: 32,
              height: 32
            },
            children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Text.default, {
              style: {
                fontSize: 20
              },
              children: selectedSubject.emoji
            })
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
            style: {
              flex: 1
            },
            nowrap: true,
            children: selectedSubject.name
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
            name: "ChevronDown",
            size: 24,
            color: String(colors.text) + "7F",
            style: {
              marginRight: 2
            }
          })]
        })
      })
    });
  };
  const DateSelector = ({
    selectedDate,
    setDate,
    accent
  }) => {
    const {
      colors
    } = (0, _expoRouterReactNavigation.useTheme)();
    const {
      t
    } = (0, _reactI18next.useTranslation)();
    const pickerHeight = (0, _reactNativeReanimated.useSharedValue)(50);
    const calendarScale = (0, _reactNativeReanimated.useSharedValue)(0.8);
    const calendarOpacity = (0, _reactNativeReanimated.useSharedValue)(0);
    const showPicker = () => {
      pickerHeight.value = (0, _reactNativeReanimated.withSpring)(370);
      calendarScale.value = (0, _reactNativeReanimated.withSpring)(1);
      calendarOpacity.value = (0, _reactNativeReanimated.withTiming)(1);
    };
    const hidePicker = () => {
      pickerHeight.value = (0, _reactNativeReanimated.withSpring)(50);
      calendarScale.value = (0, _reactNativeReanimated.withTiming)(0.8);
      calendarOpacity.value = (0, _reactNativeReanimated.withTiming)(0);
    };
    const togglePicker = () => {
      // Android has no inline calendar: its picker is a system dialog.

      if (pickerHeight.value > 50) {
        hidePicker();
      } else {
        showPicker();
      }
    };
    return /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(Reanimated.default.View, {
      style: {
        width: "100%",
        height: pickerHeight,
        backgroundColor: colors.card,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: colors.border,
        shadowRadius: 3,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowOffset: {
          width: 0,
          height: 0
        },
        overflow: "hidden"
      },
      children: [/*#__PURE__*/(0, _reactJsxRuntime.jsxs)(View.default, {
        style: {
          height: 50,
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
          padding: 10,
          paddingLeft: 15,
          gap: 10,
          marginTop: -1
        },
        children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
          name: "Calendar",
          size: 24,
          color: String(colors.text) + "7F"
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
          style: {
            flex: 1
          },
          nowrap: true,
          color: "secondary",
          children: (0, _uiComponentsTask.formatDistanceDay)(selectedDate)
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(AnimatedPressable.default, {
          accessibilityRole: "button",
          onPress: togglePicker,
          children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(View.default, {
            style: {
              height: 30,
              backgroundColor: accent,
              borderRadius: 80,
              paddingHorizontal: 12,
              justifyContent: "center",
              alignItems: "center"
            },
            children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              color: "light",
              children: t("Task_New_DueDate_Edit")
            })
          })
        })]
      }), false]
    });
  };
  const NewTaskModal = () => {
    const {
      colors,
      dark
    } = (0, _expoRouterReactNavigation.useTheme)();
    const {
      t
    } = (0, _reactI18next.useTranslation)();
    const insets = (0, _reactNativeSafeAreaContext.useSafeAreaInsets)();
    const alert = (0, _uiComponentsAlertProvider.useAlert)();
    const accounts = (0, _storesAccount.useAccountStore)(state => state.accounts);
    const lastUsedAccount = (0, _storesAccount.useAccountStore)(state => state.lastUsedAccount);
    const account = accounts.find(a => a.id === lastUsedAccount);
    const subjects = (0, _react.useMemo)(() => Object.entries(account?.customisation?.subjects ?? {}).map(([key, value]) => ({
      ...value,
      id: key
    })).filter(item => item.name && item.emoji && item.color), [account?.customisation?.subjects]);

    // Set when editing: `subject` is the subject's customisation key, the same
    // string the task stores, and `replacedId` the id the task is saved under.
    const local = (0, _expoRouter.useLocalSearchParams)();
    const isEditing = Boolean(local.replacedId);
    // Only the id is held: subjects can still be filling in after the first
    // render, and the first one stands in until the user picks.
    const [selectedSubjectId, setSelectedSubjectId] = (0, _react.useState)(local.subject);
    const selectedSubject = subjects.find(s => s.id === selectedSubjectId) ?? subjects[0];
    // Every accent on the screen follows the subject, like the task card itself.
    const accent = selectedSubject?.color ?? String(colors.primary);
    const [selectedDate, setDate] = (0, _react.useState)(local.date ? new Date(parseInt(local.date)) : new Date());
    const [taskDescription, setDescription] = (0, _react.useState)(local.description ?? "");
    const [taskDone, setTaskDone] = (0, _react.useState)(local.done === "1");
    const [saving, setSaving] = (0, _react.useState)(false);
    const disabled = !selectedSubject || taskDescription.trim() === "" || !account || saving;
    const save = async () => {
      if (disabled || !selectedSubject || !account) {
        return;
      }
      const homework = {
        id: "",
        subject: selectedSubject.id,
        content: taskDescription.trim(),
        dueDate: selectedDate,
        isDone: taskDone,
        attachments: [],
        evaluation: false,
        custom: true,
        createdByAccount: account.id
      };
      setSaving(true);
      try {
        await (0, _databaseUseHomework.saveCustomHomework)(homework, local.replacedId);
        _expoRouter.router.back();
      } catch (err) {
        setSaving(false);
        alert.showAlert({
          title: t("Task_New_Error_Title"),
          message: t("Task_New_Error_Message"),
          icon: "AlertTriangle",
          color: "#D60046",
          technical: String(err)
        });
      }
    };
    return /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_reactJsxRuntime.Fragment, {
      children: [/*#__PURE__*/(0, _reactJsxRuntime.jsxs)(Stack.default, {
        padding: 15,
        style: {
          position: "absolute",
          top: insets.top,
          left: 0,
          right: 0,
          zIndex: 10,
          justifyContent: "space-between",
          alignItems: "center"
        },
        direction: "horizontal",
        children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(AnimatedPressable.default, {
          accessibilityRole: "button",
          accessibilityLabel: t("CANCEL_BTN"),
          style: {
            padding: 10,
            backgroundColor: (0, adjust.default)(String(colors.text), dark ? -0.9 : 0.95),
            borderRadius: 100
          },
          onPress: () => {
            _expoRouter.router.back();
          },
          children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
            name: "ChevronLeft",
            size: 25,
            color: (0, adjust.default)(String(colors.text), 0.5 * (dark ? -1 : 1))
          })
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
          variant: "title",
          children: isEditing ? t("Task_Edit_Title") : t("Task_New_Title")
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(AnimatedPressable.default, {
          accessibilityRole: "button",
          accessibilityLabel: t("Task_New_Save"),
          accessibilityState: {
            disabled
          },
          disabled: disabled,
          style: {
            padding: 10,
            backgroundColor: disabled ? (0, adjust.default)(String(colors.text), dark ? -0.9 : 0.95) : accent,
            borderRadius: 100
          },
          onPress: save,
          children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
            name: "Check",
            size: 25,
            color: disabled ? (0, adjust.default)(String(colors.text), 0.5 * (dark ? -1 : 1)) : "#FFF"
          })
        })]
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoLinearGradient.LinearGradient, {
        colors: [String(colors.background), String(colors.background) + "00"],
        style: {
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 80 + insets.top,
          zIndex: 9
        }
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(KeyboardAvoidingView.default, {
        style: {
          flex: 1
        },
        behavior: "padding",
        children: /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(ScrollView.default, {
          style: {
            flex: 1
          },
          automaticallyAdjustKeyboardInsets: true,
          contentContainerStyle: {
            gap: 20,
            paddingTop: 80 + insets.top,
            paddingBottom: 20 + insets.bottom
          },
          contentInsetAdjustmentBehavior: "automatic",
          children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(View.default, {
            style: {
              paddingHorizontal: 16
            },
            children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Task.default, {
              subject: selectedSubject?.name ?? t("Task_New_Subject"),
              emoji: selectedSubject?.emoji ?? "🦋",
              title: "",
              description: taskDescription || t("Task_New_TaskDescription_Placeholder"),
              color: accent,
              date: selectedDate,
              completed: taskDone,
              hasAttachments: false,
              onToggle: () => {
                setTaskDone(!taskDone);
              }
            })
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(Stack.default, {
            gap: 10,
            style: {
              paddingHorizontal: 16
            },
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsxs)(Stack.default, {
              gap: 5,
              direction: "horizontal",
              hAlign: "center",
              children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
                name: "Chair",
                color: String(colors.text) + "7F",
                size: 18
              }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
                color: "secondary",
                children: t("Task_New_Subject")
              })]
            }), selectedSubject ? /*#__PURE__*/(0, _reactJsxRuntime.jsx)(SubjectSelector, {
              subjects: subjects,
              selectedSubject: selectedSubject,
              setSelectedSubject: subject => setSelectedSubjectId(subject.id)
            }) : /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              color: "secondary",
              children: t("Task_New_NoSubject")
            })]
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(Stack.default, {
            gap: 10,
            style: {
              paddingHorizontal: 16
            },
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsxs)(Stack.default, {
              gap: 5,
              direction: "horizontal",
              hAlign: "center",
              children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
                name: "Calendar",
                color: String(colors.text) + "7F",
                size: 18
              }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
                color: "secondary",
                children: t("Task_New_DueDate")
              })]
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(DateSelector, {
              selectedDate: selectedDate,
              setDate: setDate,
              accent: accent
            })]
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(Stack.default, {
            gap: 10,
            style: {
              paddingHorizontal: 16
            },
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsxs)(Stack.default, {
              gap: 5,
              direction: "horizontal",
              hAlign: "center",
              children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
                name: "Menu",
                color: String(colors.text) + "7F",
                size: 18
              }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
                color: "secondary",
                children: t("Task_New_TaskDescription")
              })]
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(TextInput.default, {
              placeholder: t("Task_New_TaskDescription_Placeholder"),
              placeholderTextColor: String(colors.text) + "7F",
              accessibilityLabel: t("Task_New_TaskDescription"),
              style: {
                width: "100%",
                backgroundColor: colors.card,
                borderRadius: 25,
                borderWidth: 1,
                borderColor: colors.border,
                shadowRadius: 3,
                shadowColor: "#000",
                shadowOpacity: 0.05,
                shadowOffset: {
                  width: 0,
                  height: 0
                },
                padding: 15,
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                height: 100,
                fontFamily: "medium",
                fontSize: 16,
                color: colors.text
              },
              multiline: true,
              selectionColor: accent,
              cursorColor: accent,
              textAlignVertical: "top",
              value: taskDescription,
              onChangeText: setDescription
            })]
          })]
        })
      })]
    });
  };
  var _default = NewTaskModal;
},868,[1002,1229,1113,1023,1000,6,1105,326,193,222,277,344,198,1107,360,1117,1022,1219,1125,1121,1005,1230,1110,1114,97]);