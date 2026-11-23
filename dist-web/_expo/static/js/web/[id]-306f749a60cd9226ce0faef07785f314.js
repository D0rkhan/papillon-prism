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
      return _default;
    }
  });
  var _getpapillonPapicons = require(_dependencyMap[0]);
  var _expoRouterReactNavigation = require(_dependencyMap[1]);
  var _expoRouter = require(_dependencyMap[2]);
  var _expoLinearGradient = require(_dependencyMap[3]);
  var _expoWebBrowser = require(_dependencyMap[4]);
  var WebBrowser = _interopNamespace(_expoWebBrowser);
  var _i18next = require(_dependencyMap[5]);
  var _react = require(_dependencyMap[6]);
  require(_dependencyMap[7]);
  var _componentsModalOverhead = require(_dependencyMap[8]);
  var ModalOverhead = _interopDefault(_componentsModalOverhead);
  var _databaseUseHomework = require(_dependencyMap[9]);
  var _servicesShared = require(_dependencyMap[10]);
  var _uiComponentsAnimatedPressable = require(_dependencyMap[11]);
  var AnimatedPressable = _interopDefault(_uiComponentsAnimatedPressable);
  var _uiComponentsIcon = require(_dependencyMap[12]);
  var Icon = _interopDefault(_uiComponentsIcon);
  var _uiComponentsStack = require(_dependencyMap[13]);
  var Stack = _interopDefault(_uiComponentsStack);
  require(_dependencyMap[14]);
  var _utilsFormatHtml = require(_dependencyMap[15]);
  var _utilsNewsGetAttachmentIcon = require(_dependencyMap[16]);
  var _utilsSubjectsColors = require(_dependencyMap[17]);
  var _utilsSubjectsEmoji = require(_dependencyMap[18]);
  var _utilsSubjectsName = require(_dependencyMap[19]);
  require(_dependencyMap[20]);
  var _reactNativeSafeAreaContext = require(_dependencyMap[21]);
  var _uiNewList = require(_dependencyMap[22]);
  var List = _interopDefault(_uiNewList);
  var _uiNewTypography = require(_dependencyMap[23]);
  var Typography = _interopDefault(_uiNewTypography);
  var _uiComponentsActivityIndicator = require(_dependencyMap[24]);
  var ActivityIndicator = _interopDefault(_uiComponentsActivityIndicator);
  var _uiComponentsSafeHorizontalView = require(_dependencyMap[25]);
  var SafeHorizontalView = _interopDefault(_uiComponentsSafeHorizontalView);
  var _reactNativeWebDistExportsView = require(_dependencyMap[26]);
  var View = _interopDefault(_reactNativeWebDistExportsView);
  var _reactJsxRuntime = require(_dependencyMap[27]);
  const Task = () => {
    const {
      id
    } = (0, _expoRouter.useLocalSearchParams)();
    const router = (0, _expoRouter.useRouter)();
    const theme = (0, _expoRouterReactNavigation.useTheme)();
    const colors = theme.colors;
    const [task, setTask] = (0, _react.useState)();
    const [loading, setLoading] = (0, _react.useState)(true);
    const [isDone, setIsDone] = (0, _react.useState)(false);
    const taskRef = (0, _react.useRef)(undefined);

    // Read on every focus rather than once: a custom task can be edited or
    // deleted from its modal while this screen sits underneath. Service tasks
    // cannot change from here, so they are not fetched again.
    (0, _expoRouter.useFocusEffect)((0, _react.useCallback)(() => {
      if (taskRef.current && !taskRef.current.custom) {
        return;
      }
      let cancelled = false;
      (0, _databaseUseHomework.getHomeworkById)(id).then(result => {
        if (cancelled) {
          return;
        }
        // Editing a custom task moves it to a new id, so this one is gone.
        if (!result && taskRef.current) {
          router.back();
          return;
        }
        taskRef.current = result;
        setTask(result);
        setIsDone(result?.isDone ?? false);
      }).finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });
      return () => {
        cancelled = true;
      };
    }, [id, router]));
    const formatedTask = (0, _utilsFormatHtml.formatHTML)(task?.content ?? "");
    const subjectInfo = {
      color: (0, _utilsSubjectsColors.getSubjectColor)(task?.subject ?? ""),
      emoji: (0, _utilsSubjectsEmoji.getSubjectEmoji)(task?.subject ?? ""),
      name: (0, _utilsSubjectsName.getSubjectName)(task?.subject ?? "")
    };
    const setAsDone = async done => {
      if (!task) return;
      // A custom task has no service to sync its state with.
      if (!task.custom) {
        const manager = (0, _servicesShared.getManager)();
        await manager?.setHomeworkCompletion(task, done);
      }
      await (0, _databaseUseHomework.updateHomeworkIsDone)(id, done);
      setIsDone(done);
    };
    const editTask = () => {
      if (!task) {
        return;
      }
      router.push({
        pathname: "/(modals)/tasks/custom",
        params: {
          replacedId: id,
          subject: task.subject,
          date: String(new Date(task.dueDate).getTime()),
          description: task.content,
          done: isDone ? "1" : "0"
        }
      });
    };
    const deleteTask = async () => {
      await (0, _databaseUseHomework.deleteHomeworkFromDatabase)(id);
      router.back();
    };
    const insets = (0, _reactNativeSafeAreaContext.useSafeAreaInsets)();
    const finalHeaderHeight = 0;
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
    if (!task) {
      return /*#__PURE__*/(0, _reactJsxRuntime.jsx)(View.default, {
        style: {
          flex: 1,
          alignItems: "center",
          justifyContent: "center"
        },
        children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
          variant: "title",
          children: (0, _i18next.t)("Tab_Tasks")
        })
      });
    }
    return /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_reactJsxRuntime.Fragment, {
      children: [false, task.custom && /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoRouter.Stack.Toolbar, {
        placement: "right",
        children: /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_expoRouter.Stack.Toolbar.Menu, {
          children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoRouter.Stack.Toolbar.Icon, {
            sf: "ellipsis"
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoRouter.Stack.Toolbar.Label, {
            children: (0, _i18next.t)("Task_Custom_Actions")
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoRouter.Stack.Toolbar.MenuAction, {
            icon: "pencil",
            onPress: editTask,
            children: (0, _i18next.t)("Task_Custom_Edit")
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoRouter.Stack.Toolbar.MenuAction, {
            icon: "trash",
            destructive: true,
            onPress: deleteTask,
            children: (0, _i18next.t)("Task_Custom_Delete")
          })]
        })
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(View.default, {
        style: {
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: theme.colors.overground,
          zIndex: -10
        },
        children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoLinearGradient.LinearGradient, {
          colors: [subjectInfo.color, theme.colors.overground],
          style: {
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 300,
            width: "100%",
            zIndex: -9,
            opacity: 0.4
          }
        })
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default, {
        contentInsetAdjustmentBehavior: "automatic",
        safeHorizontalPadding: 16,
        ListHeaderComponent: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(SafeHorizontalView.default, {
          base: 16,
          children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(ModalOverhead.default, {
            emoji: subjectInfo.emoji,
            subject: subjectInfo.name,
            subjectVariant: "header",
            color: colors.primary,
            custom: task.custom,
            date: new Date(task.dueDate),
            style: {
              marginVertical: 0,
              paddingTop: finalHeaderHeight
            }
          })
        }),
        style: {
          backgroundColor: "transparent"
        },
        contentContainerStyle: {
          paddingVertical: 16
        },
        children: [/*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Section, {
          children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.SectionTitle, {
            children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Label, {
              children: (0, _i18next.t)("Modal_Task_Status")
            })
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Item, {
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Leading, {
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(AnimatedPressable.default, {
                onPress: () => setAsDone(!isDone),
                children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Stack.default, {
                  backgroundColor: isDone ? theme.colors.primary : theme.colors.card,
                  card: true,
                  radius: 100,
                  width: 28,
                  height: 28,
                  vAlign: "center",
                  hAlign: "center",
                  children: isDone && /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
                    name: "check",
                    size: 22,
                    color: "white"
                  })
                })
              })
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "title",
              children: isDone ? (0, _i18next.t)("Task_Done") : (0, _i18next.t)("Task_Undone")
            })]
          })]
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Section, {
          children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.SectionTitle, {
            children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Label, {
              children: (0, _i18next.t)("Modal_Task_Description")
            })
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Item, {
            children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              children: formatedTask
            })
          })]
        }), task.attachments.length > 0 && /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Section, {
          children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.SectionTitle, {
            children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Label, {
              children: (0, _i18next.t)("Modal_Task_Attachments")
            })
          }), task.attachments.map(attachment => /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Item, {
            onPress: () => WebBrowser.openBrowserAsync(attachment.url, {
              presentationStyle: "formSheet"
            }),
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Leading, {
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Icon.default, {
                children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
                  name: (0, _utilsNewsGetAttachmentIcon.getAttachmentIcon)(attachment)
                })
              })
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "title",
              numberOfLines: 1,
              children: attachment.name || attachment.url
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "body1",
              color: "textSecondary",
              numberOfLines: 1,
              children: attachment.url
            })]
          }))]
        })]
      })]
    });
  };
  var _default = Task;
},977,[1002,1000,1023,1113,1355,1140,6,1237,1223,1117,1118,1121,1013,1005,1214,1431,1216,1142,1226,1225,193,360,1007,1008,1129,1111,198,97]);