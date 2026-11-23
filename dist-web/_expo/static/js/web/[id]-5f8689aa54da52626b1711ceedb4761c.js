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
  var _expoRouter = require(_dependencyMap[1]);
  var _i18next = require(_dependencyMap[2]);
  var _lucideReactNative = require(_dependencyMap[3]);
  var _react = require(_dependencyMap[4]);
  require(_dependencyMap[5]);
  var _reactNativeWebDistExportsAlert = require(_dependencyMap[6]);
  var Alert = _interopDefault(_reactNativeWebDistExportsAlert);
  require(_dependencyMap[7]);
  var _reactNativeWebDistExportsScrollView = require(_dependencyMap[8]);
  var ScrollView = _interopDefault(_reactNativeWebDistExportsScrollView);
  var _reactNativeWebDistExportsStyleSheet = require(_dependencyMap[9]);
  var StyleSheet = _interopDefault(_reactNativeWebDistExportsStyleSheet);
  var _componentsUnderConstructionNotice = require(_dependencyMap[10]);
  var UnderConstructionNotice = _interopDefault(_componentsUnderConstructionNotice);
  var _databaseDatabaseProvider = require(_dependencyMap[11]);
  var _databaseUseEventsById = require(_dependencyMap[12]);
  var _uiComponentsNativeHeader = require(_dependencyMap[13]);
  var _uiComponentsActionMenu = require(_dependencyMap[14]);
  var ActionMenu = _interopDefault(_uiComponentsActionMenu);
  var _reactJsxRuntime = require(_dependencyMap[15]);
  function TabOneScreen() {
    const {
      id,
      title
    } = (0, _expoRouter.useLocalSearchParams)();
    const database = (0, _databaseDatabaseProvider.useDatabase)();
    const router = (0, _expoRouter.useRouter)();
    const navigation = (0, _expoRouter.useNavigation)();
    const [isLoading, setIsLoading] = (0, _react.useState)(true);
    const {
      colors
    } = (0, _expoRouterReactNavigation.useTheme)();

    // Ensure id is a string or number, not an array
    const eventId = Array.isArray(id) ? id[0] : id;
    const event = (0, _databaseUseEventsById.useEventById)(eventId);
    (0, _react.useEffect)(() => {
      if (event && event.id) {
        setIsLoading(false);
      }
    }, [event]);
    (0, _react.useLayoutEffect)(() => {
      navigation.setOptions({
        headerTitle: event ? event.title : title ?? (0, _i18next.t)("Event_EventDetails")
      });
    }, [event, navigation]);
    return /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_reactJsxRuntime.Fragment, {
      children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_uiComponentsNativeHeader.NativeHeaderSide, {
        side: "Right",
        children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(ActionMenu.default, {
          actions: [{
            id: 'delete',
            title: (0, _i18next.t)("Event_DeleteEvent"),
            attributes: {
              destructive: true
            },
            imageColor: "#ff0000",
            image: undefined
          }],
          onPressAction: ({
            nativeEvent
          }) => {
            if (nativeEvent.event === 'delete') {
              Alert.default.alert((0, _i18next.t)("Event_DeleteEvent"), (0, _i18next.t)("Event_Confirm_DeleteEvent"), [{
                text: (0, _i18next.t)("Context_Cancel"),
                style: "cancel"
              }, {
                text: (0, _i18next.t)("Event_DeleteEvent"),
                style: "destructive",
                onPress: async () => {
                  try {
                    await database.write(async () => {
                      const eventToDelete = await database.get('events').find(eventId);
                      await eventToDelete.destroyPermanently();
                    });
                    router.back();
                  } catch (error) {
                    console.error("Error deleting event:", error);
                    Alert.default.alert("Erreur", "Une erreur est survenue lors de la suppression de l’événement.", [{
                      text: "OK"
                    }]);
                  }
                }
              }]);
            }
          },
          children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_uiComponentsNativeHeader.NativeHeaderPressable, {
            children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_lucideReactNative.MoreVertical, {
              color: colors.text
            })
          })
        })
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(ScrollView.default, {
        contentInsetAdjustmentBehavior: "automatic",
        contentContainerStyle: styles.containerContent,
        style: styles.container,
        children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(UnderConstructionNotice.default, {})
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
},937,[1000,1023,1140,1010,6,104,190,193,222,117,1413,1246,1414,1214,1219,97]);
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
  var _lucideReactNative = require(_dependencyMap[0]);
  require(_dependencyMap[1]);
  var _reactI18next = require(_dependencyMap[2]);
  var _uiComponentsList = require(_dependencyMap[3]);
  var List = _interopDefault(_uiComponentsList);
  var _uiComponentsStack = require(_dependencyMap[4]);
  var Stack = _interopDefault(_uiComponentsStack);
  var _uiComponentsTypography = require(_dependencyMap[5]);
  var Typography = _interopDefault(_uiComponentsTypography);
  var _reactJsxRuntime = require(_dependencyMap[6]);
  function UnderConstructionNotice() {
    const {
      t
    } = (0, _reactI18next.useTranslation)();
    return /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default, {
      disablePadding: true,
      children: /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(Stack.default, {
        gap: 12,
        vAlign: "center",
        hAlign: "center",
        padding: 20,
        children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Stack.default, {
          vAlign: "center",
          hAlign: "center",
          padding: 10,
          inline: true,
          backgroundColor: "#EFA40035",
          radius: 30,
          children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_lucideReactNative.AlertTriangle, {
            strokeWidth: 2,
            size: 24,
            color: "#c28500"
          })
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(Stack.default, {
          gap: 2,
          vAlign: "center",
          hAlign: "center",
          children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
            align: "center",
            variant: "h4",
            children: t("TabUnderConstruction_Title")
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
            align: "center",
            variant: "body1",
            color: "secondary",
            children: t("TabUnderConstruction_Details")
          })]
        })]
      })
    });
  }
  var _default = UnderConstructionNotice;
},1413,[1010,6,1105,1122,1005,1110,97]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  exports.useEventById = useEventById;
  var _nozbeWatermelondb = require(_dependencyMap[0]);
  var _react = require(_dependencyMap[1]);
  var _DatabaseProvider = require(_dependencyMap[2]);
  function useEventById(id) {
    const database = (0, _DatabaseProvider.useDatabase)();
    const [event, setEvent] = (0, _react.useState)(null);
    (0, _react.useEffect)(() => {
      if (!id) {
        setEvent(null);
        return;
      }
      const query = database.get('events').query(_nozbeWatermelondb.Q.where('id', id));
      const subscription = query.observe().subscribe(events => {
        setEvent(events[0] || null);
      });
      return () => subscription.unsubscribe();
    }, [id, database]);
    return event;
  }
},1414,[1018,6,1246]);