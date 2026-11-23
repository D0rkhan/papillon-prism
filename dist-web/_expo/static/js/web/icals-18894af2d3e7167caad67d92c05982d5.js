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
  var _i18next = require(_dependencyMap[0]);
  var _lucideReactNative = require(_dependencyMap[1]);
  var _react = require(_dependencyMap[2]);
  var _reactNativeWebDistExportsAlert = require(_dependencyMap[3]);
  var Alert = _interopDefault(_reactNativeWebDistExportsAlert);
  require(_dependencyMap[4]);
  var _reactNativeWebDistExportsScrollView = require(_dependencyMap[5]);
  var ScrollView = _interopDefault(_reactNativeWebDistExportsScrollView);
  var _reactNativeWebDistExportsStyleSheet = require(_dependencyMap[6]);
  var StyleSheet = _interopDefault(_reactNativeWebDistExportsStyleSheet);
  var _reactNativeWebDistExportsTextInput = require(_dependencyMap[7]);
  var TextInput = _interopDefault(_reactNativeWebDistExportsTextInput);
  var _databaseUseIcals = require(_dependencyMap[8]);
  var _servicesLocalIcalUtils = require(_dependencyMap[9]);
  var _servicesLocalIcal = require(_dependencyMap[10]);
  var _servicesLocalParsersAdeParser = require(_dependencyMap[11]);
  var _uiComponentsIcon = require(_dependencyMap[12]);
  var Icon = _interopDefault(_uiComponentsIcon);
  var _uiComponentsItem = require(_dependencyMap[13]);
  var Item = _interopDefault(_uiComponentsItem);
  var _uiComponentsList = require(_dependencyMap[14]);
  var List = _interopDefault(_uiComponentsList);
  var _uiComponentsTypography = require(_dependencyMap[15]);
  var Typography = _interopDefault(_uiComponentsTypography);
  var _expoRouterReactNavigation = require(_dependencyMap[16]);
  var _expoRouter = require(_dependencyMap[17]);
  var _getpapillonPapicons = require(_dependencyMap[18]);
  var _uiComponentsAnimatedPressable = require(_dependencyMap[19]);
  var AnimatedPressable = _interopDefault(_uiComponentsAnimatedPressable);
  var _uiNativeNativeSwitch = require(_dependencyMap[20]);
  var NativeSwitch = _interopDefault(_uiNativeNativeSwitch);
  require(_dependencyMap[21]);
  var _utilsThemeFonts = require(_dependencyMap[22]);
  var _reactJsxRuntime = require(_dependencyMap[23]);
  function TabOneScreen() {
    const router = (0, _expoRouter.useRouter)();
    const [icalUrl, setIcalUrl] = (0, _react.useState)("");
    const [icalTitle, setIcalTitle] = (0, _react.useState)("");
    const [intelligentParsing, setIntelligentParsing] = (0, _react.useState)(false);
    const [refresh, setRefresh] = (0, _react.useState)(0);
    const icals = (0, _databaseUseIcals.useIcals)(refresh);
    const addIcal = (0, _databaseUseIcals.useAddIcal)();
    const removeIcal = (0, _databaseUseIcals.useRemoveIcal)();
    const updateIcalParsing = (0, _databaseUseIcals.useUpdateIcalParsing)();
    const handleAdd = async () => {
      if (!icalUrl.trim() || !icalTitle.trim()) {
        Alert.default.alert((0, _i18next.t)("Tab_Calendar_Icals_Add_Title"), (0, _i18next.t)("Tab_Calendar_Icals_Add_Description"));
        return;
      }
      const normalizedUrl = (0, _servicesLocalIcalUtils.normalizeUrl)(icalUrl);
      try {
        const parsedData = await (0, _servicesLocalIcal.fetchAndParseICal)(normalizedUrl);
        const shouldEnableParsing = parsedData.isADE || parsedData.isHyperplanning ? true : intelligentParsing;
        const finalUrl = parsedData.isADE ? (0, _servicesLocalParsersAdeParser.enhanceADEUrl)(normalizedUrl) : normalizedUrl;
        await addIcal(icalTitle, finalUrl, shouldEnableParsing, parsedData.provider);
        setIcalUrl("");
        setIcalTitle("");
        setIntelligentParsing(false);
        setRefresh(r => r + 1);
      } catch (error) {
        Alert.default.alert("Erreur", "Impossible de traiter l'URL iCal. Vérifiez qu'elle est valide.");
      }
    };
    const handleRemove = async id => {
      await removeIcal(id);
      setRefresh(r => r + 1);
    };
    const theme = (0, _expoRouterReactNavigation.useTheme)();
    const font = (0, _utilsThemeFonts.useFont)();
    const {
      colors
    } = theme;
    return /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(ScrollView.default, {
      contentInsetAdjustmentBehavior: "automatic",
      contentContainerStyle: styles.containerContent,
      style: styles.container,
      keyboardShouldPersistTaps: "handled",
      children: [false, /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default, {
        children: [icalUrl.length > 0 && /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(Item.default, {
          children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Icon.default, {
            children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_lucideReactNative.TypeIcon, {
              opacity: icalTitle.length > 0 ? 1 : 0.5
            })
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(TextInput.default, {
            placeholder: (0, _i18next.t)("Form_Title"),
            placeholderTextColor: colors.text + '80',
            value: icalTitle,
            onChangeText: setIcalTitle,
            style: {
              flex: 1,
              paddingVertical: 8,
              fontSize: 16,
              fontFamily: font("medium"),
              color: colors.text
            }
          })]
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(Item.default, {
          children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Icon.default, {
            children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_lucideReactNative.Link2Icon, {
              opacity: icalUrl.length > 0 ? 1 : 0.5
            })
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(TextInput.default, {
            placeholder: (0, _i18next.t)("Tab_Calendar_Icals_Add_URL"),
            placeholderTextColor: colors.text + '80',
            value: icalUrl,
            onChangeText: setIcalUrl,
            style: {
              flex: 1,
              paddingVertical: 8,
              fontSize: 16,
              fontFamily: font("medium"),
              color: colors.text
            }
          }), icalUrl.length > 0 && /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_uiComponentsItem.Trailing, {
            children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(AnimatedPressable.default, {
              onPress: handleAdd,
              disabled: !(0, _servicesLocalIcalUtils.isValidUrl)(icalUrl),
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
                name: 'Add',
                size: 24,
                color: '#D6502B'
              })
            })
          })]
        })]
      }), icals.length > 0 && /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default, {
        children: icals.flatMap((ical, index) => {
          const isADE = ical.provider?.toUpperCase().includes('ADE');
          const isHyperplanning = ical.provider?.toUpperCase().includes('HYPERPLANNING');
          const supportsIntelligentParsing = isADE || isHyperplanning;
          const items = [/*#__PURE__*/(0, _reactJsxRuntime.jsxs)(Item.default, {
            onPress: () => {
              Alert.default.alert((0, _i18next.t)('Tab_Calendar_Icals_Manage_Title', {
                title: ical.title
              }), (0, _i18next.t)('Tab_Calendar_Icals_Manage_Description'), [{
                text: (0, _i18next.t)('Context_Cancel'),
                style: 'cancel'
              }, {
                text: (0, _i18next.t)('Context_Delete'),
                style: 'destructive',
                onPress: () => handleRemove(ical.id)
              }]);
            },
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Icon.default, {
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_lucideReactNative.Calendar, {})
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "title",
              children: ical.title
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "caption",
              color: "secondary",
              children: ical.url
            })]
          }, `${ical.id}-main`)];

          // only ADE and Hyperplanning calendars support intelligent parsing
          if (supportsIntelligentParsing) {
            items.push(/*#__PURE__*/(0, _reactJsxRuntime.jsxs)(Item.default, {
              children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Icon.default, {
                children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_lucideReactNative.Brain, {
                  opacity: ical.intelligentParsing ? 1 : 0.5
                })
              }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
                variant: "title",
                children: "Parsing intelligent (Beta)"
              }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_uiComponentsItem.Trailing, {
                children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(NativeSwitch.default, {
                  value: ical.intelligentParsing || false,
                  onValueChange: async value => {
                    await updateIcalParsing(ical.id, value);
                    setRefresh(r => r + 1);
                  }
                })
              })]
            }, `${ical.id}-parsing`));
          }
          return items;
        })
      }), icals.length === 0 && /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
        variant: "body1",
        style: {
          marginTop: 32
        },
        color: "secondary",
        children: (0, _i18next.t)("Tab_Calendar_Icals_Empty")
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
},942,[1140,1010,6,190,193,222,117,344,1415,1416,1417,1418,1013,1123,1122,1110,1000,1023,1002,1121,1130,1214,1217,97]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  exports.useIcals = useIcals;
  exports.useAddIcal = useAddIcal;
  exports.useRemoveIcal = useRemoveIcal;
  exports.useUpdateIcalParsing = useUpdateIcalParsing;
  var _react = require(_dependencyMap[0]);
  var _DatabaseProvider = require(_dependencyMap[1]);
  var _utilsSafeTransaction = require(_dependencyMap[2]);
  function useIcals(refresh = 0) {
    const database = (0, _DatabaseProvider.useDatabase)();
    const [icals, setIcals] = (0, _react.useState)([]);
    (0, _react.useEffect)(() => {
      const query = database.get('icals').query();
      const subscription = query.observe().subscribe(setIcals);
      return () => subscription.unsubscribe();
    }, [database, refresh]);
    return icals;
  }
  function useAddIcal() {
    const database = (0, _DatabaseProvider.useDatabase)();
    return (0, _react.useCallback)(async (title, url, intelligentParsing = false, provider = 'unknown') => {
      await (0, _utilsSafeTransaction.safeWrite)(database, async () => {
        await database.get('icals').create(ical => {
          ical.title = title;
          ical.url = url;
          ical.lastUpdated = Date.now();
          ical.intelligentParsing = intelligentParsing;
          ical.provider = provider;
        });
      }, 10000, 'useAddIcal');
    }, [database]);
  }
  function useRemoveIcal() {
    const database = (0, _DatabaseProvider.useDatabase)();
    return (0, _react.useCallback)(async id => {
      await (0, _utilsSafeTransaction.safeWrite)(database, async () => {
        const ical = await database.get('icals').find(id);
        await ical.destroyPermanently();
      }, 10000, 'useRemoveIcal');
    }, [database]);
  }
  function useUpdateIcalParsing() {
    const database = (0, _DatabaseProvider.useDatabase)();
    return (0, _react.useCallback)(async (id, intelligentParsing) => {
      await (0, _utilsSafeTransaction.safeWrite)(database, async () => {
        const ical = await database.get('icals').find(id);
        await ical.update(ical => {
          ical.intelligentParsing = intelligentParsing;
        });
      }, 1000, 'useUpdateIcalParsing');
    }, [database]);
  }
},1415,[6,1246,1419]);