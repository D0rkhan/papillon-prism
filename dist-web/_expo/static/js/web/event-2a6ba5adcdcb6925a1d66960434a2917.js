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
      return NewEventScreen;
    }
  });
  var _reactNativeCommunityDatetimepicker = require(_dependencyMap[0]);
  var _expoRouterReactNavigation = require(_dependencyMap[1]);
  var _expoLocalization = require(_dependencyMap[2]);
  var Localization = _interopNamespace(_expoLocalization);
  var _expoRouter = require(_dependencyMap[3]);
  var _lucideReactNative = require(_dependencyMap[4]);
  var _react = require(_dependencyMap[5]);
  var _reactI18next = require(_dependencyMap[6]);
  require(_dependencyMap[7]);
  require(_dependencyMap[8]);
  var _reactNativeWebDistExportsPressable = require(_dependencyMap[9]);
  var Pressable = _interopDefault(_reactNativeWebDistExportsPressable);
  var _reactNativeWebDistExportsScrollView = require(_dependencyMap[10]);
  var ScrollView = _interopDefault(_reactNativeWebDistExportsScrollView);
  var _reactNativeWebDistExportsStyleSheet = require(_dependencyMap[11]);
  var StyleSheet = _interopDefault(_reactNativeWebDistExportsStyleSheet);
  var _reactNativeWebDistExportsTextInput = require(_dependencyMap[12]);
  var TextInput = _interopDefault(_reactNativeWebDistExportsTextInput);
  var _databaseDatabaseProvider = require(_dependencyMap[13]);
  var _uiComponentsIcon = require(_dependencyMap[14]);
  var Icon = _interopDefault(_uiComponentsIcon);
  var _uiComponentsItem = require(_dependencyMap[15]);
  var Item = _interopDefault(_uiComponentsItem);
  var _uiComponentsList = require(_dependencyMap[16]);
  var List = _interopDefault(_uiComponentsList);
  var _uiComponentsNativeHeader = require(_dependencyMap[17]);
  var _uiComponentsStack = require(_dependencyMap[18]);
  var Stack = _interopDefault(_uiComponentsStack);
  var _uiComponentsTypography = require(_dependencyMap[19]);
  var Typography = _interopDefault(_uiComponentsTypography);
  var _utilsThemeFonts = require(_dependencyMap[20]);
  var _reactJsxRuntime = require(_dependencyMap[21]);
  function NewEventScreen() {
    const router = (0, _expoRouter.useRouter)();
    const {
      colors
    } = (0, _expoRouterReactNavigation.useTheme)();
    const font = (0, _utilsThemeFonts.useFont)();
    const {
      t
    } = (0, _reactI18next.useTranslation)();
    const database = (0, _databaseDatabaseProvider.useDatabase)();
    const [canSave, setCanSave] = (0, _react.useState)(false);
    const [inputTitle, setInputTitle] = (0, _react.useState)("");
    const [inputLocation, setInputLocation] = (0, _react.useState)("");
    const [inputOrganizer, setInputOrganizer] = (0, _react.useState)("");
    const [inputStartDate, setInputStartDate] = (0, _react.useState)(new Date());
    const inHour = new Date();
    inHour.setHours(new Date().getHours() + 1, 0, 0, 0); // Set to one hour later

    const [inputEndDate, setInputEndDate] = (0, _react.useState)(inHour);
    const checkCanSave = () => {
      const titleValid = inputTitle.length > 0;
      const locationValid = inputLocation.length > 0;
      const organizerValid = inputOrganizer.length > 0;
      const startDateValid = inputStartDate instanceof Date && !isNaN(inputStartDate.getTime());
      const endDateValid = inputEndDate instanceof Date && !isNaN(inputEndDate.getTime());
      const endDateAfterStartDate = inputEndDate.getTime() > inputStartDate.getTime();
      setCanSave(titleValid && locationValid && organizerValid && startDateValid && endDateValid && endDateAfterStartDate);
    };
    (0, _react.useEffect)(() => {
      checkCanSave();
    }, [inputTitle, inputLocation, inputOrganizer, inputStartDate, inputEndDate]);

    // Helper to create an event without linking to subject
    async function createEvent(eventData) {
      await database.write(async () => {
        await database.get('events').create(ev => {
          ev.title = eventData.title;
          ev.start = eventData.start;
          ev.end = eventData.end;
          if (eventData.color) {
            ev.color = eventData.color;
          }
          if (eventData.room) {
            ev.room = eventData.room;
          }
          if (eventData.teacher) {
            ev.teacher = eventData.teacher;
          }
          if (eventData.status) {
            ev.status = eventData.status;
          }
          if (typeof eventData.canceled === 'boolean') {
            ev.canceled = eventData.canceled;
          }
        });
      });
    }
    const saveEvent = (0, _react.useCallback)(async () => {
      if (!canSave) {
        return;
      }

      // Create event data
      const eventData = {
        title: inputTitle,
        start: inputStartDate.getTime(),
        end: inputEndDate.getTime(),
        color: "#888888",
        // Default color, can be changed later
        room: inputLocation,
        teacher: inputOrganizer,
        status: null,
        // Default status
        canceled: false // Default not canceled
      };
      createEvent(eventData).then(() => {
        router.back();
      }).catch(error => {
        console.error("Error creating event:", error);
        alert(t("Error_CreatingEvent"));
      });
    }, [canSave, inputTitle, inputLocation, inputOrganizer, inputStartDate, inputEndDate, router, t, database]);
    return /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_reactJsxRuntime.Fragment, {
      children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_uiComponentsNativeHeader.NativeHeaderSide, {
        side: "Left",
        children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_uiComponentsNativeHeader.NativeHeaderPressable, {
          onPress: () => {
            router.back();
          },
          children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Icon.default, {
            children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_lucideReactNative.X, {})
          })
        })
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_uiComponentsNativeHeader.NativeHeaderSide, {
        side: "Right"
        // @ts-expect-error TypeScript doesn't recognize the `key` prop on NativeHeaderSide
        ,
        children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_uiComponentsNativeHeader.NativeHeaderPressable, {
          disabled: !canSave,
          onPress: () => {
            saveEvent();
          },
          children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_lucideReactNative.Check, {
            style: {
              opacity: canSave ? 1 : 0.5
            },
            color: canSave ? colors.primary : colors.text
          })
        })
      }, "saveIcon_save=" + canSave + inputTitle + inputLocation + inputOrganizer + inputStartDate.getTime() + inputEndDate.getTime()), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(ScrollView.default, {
        contentInsetAdjustmentBehavior: "automatic",
        contentContainerStyle: styles.containerContent,
        style: styles.container,
        children: [/*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default, {
          children: [/*#__PURE__*/(0, _reactJsxRuntime.jsxs)(Item.default, {
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Icon.default, {
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_lucideReactNative.TypeIcon, {
                opacity: inputTitle.length > 0 ? 1 : 0.5
              })
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(TextInput.default, {
              placeholder: t("Form_Title"),
              value: inputTitle,
              onChangeText: setInputTitle,
              style: {
                flex: 1,
                paddingVertical: 8,
                fontSize: 16,
                fontFamily: font("medium")
              }
            })]
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(Item.default, {
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Icon.default, {
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_lucideReactNative.MapPinIcon, {
                opacity: inputLocation.length > 0 ? 1 : 0.5
              })
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(TextInput.default, {
              placeholder: t("Form_Location"),
              value: inputLocation,
              onChangeText: setInputLocation,
              style: {
                flex: 1,
                paddingVertical: 8,
                fontSize: 16,
                fontFamily: font("medium")
              }
            })]
          })]
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default, {
          children: /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(Item.default, {
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Icon.default, {
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_lucideReactNative.User2Icon, {
                opacity: inputOrganizer.length > 0 ? 1 : 0.5
              })
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(TextInput.default, {
              placeholder: t("Form_Organizer"),
              autoCorrect: false,
              autoComplete: "off",
              value: inputOrganizer,
              onChangeText: text => {
                setInputOrganizer(text);
              },
              style: {
                flex: 1,
                paddingVertical: 8,
                fontSize: 16,
                fontFamily: font("medium")
              }
            })]
          })
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default, {
          children: [/*#__PURE__*/(0, _reactJsxRuntime.jsxs)(Item.default, {
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Icon.default, {
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_lucideReactNative.CalendarDays, {})
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "body1",
              style: {
                flex: 1,
                paddingVertical: 6
              },
              children: t("Form_Start")
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_uiComponentsItem.Trailing, {
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(Stack.default, {
                direction: "horizontal",
                gap: 8,
                children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Pressable.default, {
                  onPress: () => {
                    _reactNativeCommunityDatetimepicker.DateTimePickerAndroid.open({
                      value: inputStartDate,
                      mode: "date",
                      design: "material",
                      locale: Localization.getLocales()[0].languageTag,
                      onChange: (event, date) => {
                        if (date) {
                          setInputStartDate(date);
                        }
                      }
                    });
                  },
                  children: /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(Typography.default, {
                    variant: "h5",
                    color: "primary",
                    children: [inputStartDate.toLocaleDateString(Localization.getLocales()[0].languageTag, {
                      day: "2-digit",
                      month: "short",
                      year: "numeric"
                    }), " "]
                  })
                }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Pressable.default, {
                  onPress: () => {
                    _reactNativeCommunityDatetimepicker.DateTimePickerAndroid.open({
                      value: inputStartDate,
                      mode: "time",
                      design: "material",
                      locale: Localization.getLocales()[0].languageTag,
                      onChange: (event, date) => {
                        if (date) {
                          setInputStartDate(date);
                        }
                      }
                    });
                  },
                  children: /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(Typography.default, {
                    variant: "h5",
                    color: "primary",
                    children: [inputStartDate.toLocaleTimeString(Localization.getLocales()[0].languageTag, {
                      hour: "2-digit",
                      minute: "2-digit"
                    }), " "]
                  })
                })]
              })
            })]
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(Item.default, {
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Icon.default, {
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_lucideReactNative.Clock4Icon, {})
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "body1",
              style: {
                flex: 1,
                paddingVertical: 6
              },
              children: t("Form_End")
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_uiComponentsItem.Trailing, {
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Stack.default, {
                direction: "horizontal",
                gap: 8,
                children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Pressable.default, {
                  onPress: () => {
                    _reactNativeCommunityDatetimepicker.DateTimePickerAndroid.open({
                      value: inputEndDate,
                      mode: "time",
                      design: "material",
                      locale: Localization.getLocales()[0].languageTag,
                      onChange: (event, date) => {
                        if (date) {
                          setInputEndDate(date);
                        }
                      }
                    });
                  },
                  children: /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(Typography.default, {
                    variant: "h5",
                    color: "primary",
                    children: [inputEndDate.toLocaleTimeString(Localization.getLocales()[0].languageTag, {
                      hour: "2-digit",
                      minute: "2-digit"
                    }), " "]
                  })
                })
              })
            })]
          })]
        })]
      })]
    });
  }
  const styles = StyleSheet.default.create({
    container: {
      flex: 1,
      padding: 16
    },
    containerContent: {
      justifyContent: "center",
      alignItems: "center"
    }
  });
},873,[1229,1000,1245,1023,1010,6,1105,104,193,334,222,117,344,1246,1013,1123,1122,1214,1005,1110,1217,97]);