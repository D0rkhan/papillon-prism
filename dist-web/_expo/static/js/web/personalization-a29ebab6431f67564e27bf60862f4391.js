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
  require(_dependencyMap[0]);
  var _uiComponentsStack = require(_dependencyMap[1]);
  var Stack = _interopDefault(_uiComponentsStack);
  var _react = require(_dependencyMap[2]);
  var React = _interopDefault(_react);
  var _uiNewTypography = require(_dependencyMap[3]);
  var Typography = _interopDefault(_uiNewTypography);
  var _uiComponentsIcon = require(_dependencyMap[4]);
  var Icon = _interopDefault(_uiComponentsIcon);
  var _getpapillonPapicons = require(_dependencyMap[5]);
  var _uiComponentsAnimatedPressable = require(_dependencyMap[6]);
  var AnimatedPressable = _interopDefault(_uiComponentsAnimatedPressable);
  var _expoRouterReactNavigation = require(_dependencyMap[7]);
  var _componentsAppColorsSelector = require(_dependencyMap[8]);
  var AppColorsSelector = _interopDefault(_componentsAppColorsSelector);
  var _utilsColors = require(_dependencyMap[9]);
  var _reactNativeLinearGradient = require(_dependencyMap[10]);
  var LinearGradient = _interopDefault(_reactNativeLinearGradient);
  var _storesAccount = require(_dependencyMap[11]);
  var _storesSettings = require(_dependencyMap[12]);
  var _reactI18next = require(_dependencyMap[13]);
  var _expoRouter = require(_dependencyMap[14]);
  var _uiComponentsDynamic = require(_dependencyMap[15]);
  var _reactNativeReanimated = require(_dependencyMap[16]);
  var _uiNewList = require(_dependencyMap[17]);
  var List = _interopDefault(_uiNewList);
  require(_dependencyMap[18]);
  var _uiComponentsPicker = require(_dependencyMap[19]);
  var Picker = _interopDefault(_uiComponentsPicker);
  var _utilsLoggerAnalytics = require(_dependencyMap[20]);
  var _reactJsxRuntime = require(_dependencyMap[21]);
  const FONT_OPTIONS = [{
    label: "SN Pro",
    value: "sn-pro"
  }, {
    label: "Fixel Text",
    value: "fixel-text"
  }, {
    label: "Oxanium",
    value: "oxanium"
  }, {
    label: "Courgette",
    value: "courgette"
  }, {
    label: "IBM Plex Serif",
    value: "ibm-plex-serif"
  }];
  const PersonalizationSettings = () => {
    const theme = (0, _expoRouterReactNavigation.useTheme)();
    const {
      t
    } = (0, _reactI18next.useTranslation)();
    const store = _storesAccount.useAccountStore.getState();
    const settingsStore = (0, _storesSettings.useSettingsStore)(state => state.personalization);
    const mutateProperty = (0, _storesSettings.useSettingsStore)(state => state.mutateProperty);
    const useMaterialYou = settingsStore.useMaterialYou ?? _storesSettings.DEFAULT_MATERIAL_YOU_ENABLED;
    const selectedFontFamily = settingsStore.fontFamily ?? "sn-pro";
    const selectedFontIndex = Math.max(FONT_OPTIONS.findIndex(option => option.value === selectedFontFamily), 0);
    const defaultColorData = _utilsColors.AppColors.find(color => color.colorEnum === settingsStore.colorSelected) || _utilsColors.AppColors[0];
    const [selectedColor, setSelectedColor] = React.default.useState(defaultColorData.mainColor);
    const [selectedTheme, setSelectedTheme] = React.default.useState("auto");
    const height = (0, _expoRouterReactNavigation.useHeaderHeight)();
    (0, _react.useEffect)(() => {
      if (settingsStore.theme) {
        setSelectedTheme(settingsStore.theme);
      }
    }, []);
    (0, _react.useEffect)(() => {
      mutateProperty('personalization', {
        theme: selectedTheme
      });
    }, [selectedTheme]);
    return /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_reactJsxRuntime.Fragment, {
      children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_uiComponentsDynamic.Dynamic, {
        animated: true,
        entering: _reactNativeReanimated.FadeIn,
        exiting: _reactNativeReanimated.FadeOut,
        children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(LinearGradient.default, {
          colors: [theme.colors.primary, theme.colors.primary + "00"],
          style: {
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 400,
            opacity: useMaterialYou ? 0.4 : 1
          }
        })
      }, 'color-grad-stgs:' + theme.colors.primary), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default, {
        safeHorizontalPadding: 16,
        contentContainerStyle: {
          paddingVertical: 16
        },
        contentInsetAdjustmentBehavior: "automatic",
        style: {
          flex: 1,
          paddingTop: 0,
          backgroundColor: theme.colors.overground
        },
        children: [!useMaterialYou && /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Section, {
          children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.SectionTitle, {
            children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Label, {
              children: "Choix de la couleur"
            })
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.View, {
            children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(AppColorsSelector.default, {
              onChangeColor: color => {
                setSelectedColor(color);
                setTimeout(() => {
                  const colorData = _utilsColors.AppColors.find(appColor => appColor.mainColor === color);
                  if (colorData) {
                    mutateProperty('personalization', {
                      colorSelected: colorData.colorEnum
                    });
                  }
                }, 50);
              },
              accountId: store.lastUsedAccount
            })
          })]
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Section, {
          children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.SectionTitle, {
            children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Label, {
              children: "Options du th\xE8me"
            })
          }), false, /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Item, {
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Leading, {
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Icon.default, {
                children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
                  name: "ColorTheme"
                })
              })
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "title",
              children: t("Settings_Personalization_Theme")
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Trailing, {
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(Stack.default, {
                bordered: true,
                direction: "horizontal",
                height: 40,
                hAlign: "center",
                vAlign: "center",
                children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(AnimatedPressable.default, {
                  onPress: () => {
                    if (selectedTheme !== "light") {
                      (0, _utilsLoggerAnalytics.trackOptionalEvent)("color_theme_changed", {
                        theme: "light"
                      });
                    }
                    setSelectedTheme("light");
                  },
                  style: {
                    overflow: "hidden",
                    height: "100%"
                  },
                  children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Stack.default, {
                    style: {
                      overflow: "hidden",
                      paddingHorizontal: 15,
                      height: "100%"
                    },
                    hAlign: "center",
                    vAlign: "center",
                    backgroundColor: selectedTheme === "light" ? theme.colors.primary : "transparent",
                    radius: 20,
                    children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
                      name: "Sun",
                      opacity: selectedTheme === "light" ? 1 : 0.7,
                      color: selectedTheme === "light" ? "#FFF" : theme.colors.text
                    })
                  })
                }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(AnimatedPressable.default, {
                  onPress: () => {
                    if (selectedTheme !== "dark") {
                      (0, _utilsLoggerAnalytics.trackOptionalEvent)("color_theme_changed", {
                        theme: "dark"
                      });
                    }
                    setSelectedTheme("dark");
                  },
                  style: {
                    overflow: "hidden",
                    height: "100%"
                  },
                  children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Stack.default, {
                    style: {
                      overflow: "hidden",
                      paddingHorizontal: 15,
                      height: "100%"
                    },
                    hAlign: "center",
                    vAlign: "center",
                    backgroundColor: selectedTheme === "dark" ? theme.colors.primary : "transparent",
                    radius: 20,
                    children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
                      name: "Moon",
                      opacity: selectedTheme === "dark" ? 1 : 0.7,
                      color: selectedTheme === "dark" ? "#FFF" : theme.colors.text
                    })
                  })
                }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(AnimatedPressable.default, {
                  onPress: () => {
                    if (selectedTheme !== "auto") {
                      (0, _utilsLoggerAnalytics.trackOptionalEvent)("color_theme_changed", {
                        theme: "auto"
                      });
                    }
                    setSelectedTheme("auto");
                  },
                  style: {
                    overflow: "hidden",
                    height: "100%"
                  },
                  children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Stack.default, {
                    style: {
                      overflow: "hidden",
                      paddingHorizontal: 15,
                      height: "100%"
                    },
                    hAlign: "center",
                    vAlign: "center",
                    backgroundColor: selectedTheme === "auto" ? theme.colors.primary : "transparent",
                    radius: 20,
                    children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
                      color: selectedTheme === "auto" ? "#FFF" : theme.colors.text + "7F",
                      children: "Auto"
                    })
                  })
                })]
              })
            })]
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Item, {
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Leading, {
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Icon.default, {
                children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
                  name: "Palette"
                })
              })
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "title",
              children: "Police"
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "body1",
              color: "textSecondary",
              children: "Modifier la police de caract\xE8res"
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Trailing, {
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Picker.default, {
                options: FONT_OPTIONS.map(option => option.label),
                selectedIndex: selectedFontIndex,
                onValueChange: index => {
                  const option = FONT_OPTIONS[index];
                  if (!option) return;
                  mutateProperty("personalization", {
                    fontFamily: option.value
                  });
                }
              })
            })]
          })]
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Section, {
          children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.SectionTitle, {
            children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Label, {
              children: "Options des mati\xE8res"
            })
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Item, {
            onPress: () => {
              _expoRouter.router.push("/(settings)/subject_personalization");
            },
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Leading, {
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Icon.default, {
                children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
                  name: "PenAlt"
                })
              })
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "title",
              children: t("Settings_Personalization_Subject_Title")
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "body1",
              color: "textSecondary",
              children: t("Settings_Personalization_Subject_Description")
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Trailing, {
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Icon.default, {
                children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
                  name: "ChevronRight",
                  opacity: 0.7
                })
              })
            })]
          })]
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Section, {
          children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.SectionTitle, {
            children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Label, {
              children: "Options de l'application"
            })
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Item, {
            onPress: () => {
              _expoRouter.router.push("/(settings)/tabs");
            },
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Leading, {
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Icon.default, {
                children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
                  name: "PapillonApp"
                })
              })
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "title",
              children: t("Settings_Tabs_Title")
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "body1",
              color: "textSecondary",
              children: t("Settings_Tabs_Description")
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Trailing, {
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Icon.default, {
                children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
                  name: "ChevronRight",
                  opacity: 0.7
                })
              })
            })]
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Item, {
            onPress: () => {
              _expoRouter.router.push("/(settings)/language");
            },
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Leading, {
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Icon.default, {
                children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
                  name: "MapPin"
                })
              })
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "title",
              children: t("Settings_Language_Title")
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "body1",
              color: "textSecondary",
              children: t("Settings_Language_Description")
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Trailing, {
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Icon.default, {
                children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
                  name: "ChevronRight",
                  opacity: 0.7
                })
              })
            })]
          })]
        })]
      })]
    });
  };
  var _default = PersonalizationSettings;
},923,[193,1005,6,1008,1013,1002,1121,1000,1374,1242,1222,1022,1012,1105,1023,1136,1107,1007,1130,1371,1369,97]);
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
  Object.defineProperty(exports, "Colors", {
    enumerable: true,
    get: function () {
      return _utilsColors.Colors;
    }
  });
  Object.defineProperty(exports, "AppColors", {
    enumerable: true,
    get: function () {
      return _utilsColors.AppColors;
    }
  });
  var _react = require(_dependencyMap[0]);
  var React = _interopDefault(_react);
  var _reactNativeWebDistExportsFlatList = require(_dependencyMap[1]);
  var FlatList = _interopDefault(_reactNativeWebDistExportsFlatList);
  var _reactNativeWebDistExportsView = require(_dependencyMap[2]);
  var View = _interopDefault(_reactNativeWebDistExportsView);
  var _expoRouterReactNavigation = require(_dependencyMap[3]);
  var _i18next = require(_dependencyMap[4]);
  var _uiComponentsTypography = require(_dependencyMap[5]);
  var Typography = _interopDefault(_uiComponentsTypography);
  var _uiComponentsAnimatedPressable = require(_dependencyMap[6]);
  var AnimatedPressable = _interopDefault(_uiComponentsAnimatedPressable);
  var _storesSettings = require(_dependencyMap[7]);
  var _utilsColors = require(_dependencyMap[8]);
  var _utilsAdjustColor = require(_dependencyMap[9]);
  var adjust = _interopDefault(_utilsAdjustColor);
  var _expoHaptics = require(_dependencyMap[10]);
  var _reactJsxRuntime = require(_dependencyMap[11]);
  const ColorSelector = /*#__PURE__*/React.default.memo(function ColorSelector({
    mainColor,
    backgroundColor,
    name,
    onPress,
    selected,
    itemWidth
  }) {
    const theme = (0, _expoRouterReactNavigation.useTheme)();
    const handlePress = (0, _react.useCallback)(() => {
      onPress?.();
    }, [onPress]);
    const containerStyle = (0, _react.useMemo)(() => ({
      width: itemWidth,
      height: itemWidth * 0.95,
      margin: 6,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor,
      borderColor: selected ? mainColor : mainColor + "50",
      borderWidth: selected ? 4 : 2,
      borderRadius: 25,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 0
      },
      shadowOpacity: 0.07,
      shadowRadius: 5
    }), [selected, backgroundColor, mainColor, theme.colors.text, itemWidth]);
    const circleStyle = (0, _react.useMemo)(() => {
      const circleSize = Math.min(itemWidth * 0.4, 50);
      return {
        width: circleSize,
        height: circleSize,
        backgroundColor: mainColor,
        borderRadius: circleSize / 2,
        borderWidth: 3,
        borderColor: "#FFFFFF",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 0
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.615,
        marginBottom: 6
      };
    }, [mainColor, itemWidth]);
    return /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(AnimatedPressable.default, {
      onPress: handlePress,
      style: containerStyle,
      hapticFeedback: _expoHaptics.ImpactFeedbackStyle.Light,
      children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(View.default, {
        style: circleStyle
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
        variant: "h6",
        color: mainColor,
        children: name
      })]
    });
  });
  const AppColorsSelector = /*#__PURE__*/React.default.memo(function AppColorsSelector({
    onChangeColor
  }) {
    const settingsStore = (0, _storesSettings.useSettingsStore)(state => state.personalization);
    const theme = (0, _expoRouterReactNavigation.useTheme)();
    const [containerWidth, setContainerWidth] = (0, _react.useState)(0);
    const defaultColorData = (0, _react.useMemo)(() => _utilsColors.AppColors.find(color => color.colorEnum === settingsStore.colorSelected) || _utilsColors.AppColors[0], [settingsStore.colorSelected]);
    const [selectedColor, setSelectedColor] = (0, _react.useState)(defaultColorData.mainColor);
    const [color, setColor] = (0, _react.useState)(settingsStore.colorSelected || _utilsColors.Colors.PINK);
    const itemWidth = (0, _react.useMemo)(() => {
      if (containerWidth === 0) return 100;
      return (containerWidth - 36) / 3;
    }, [containerWidth]);
    (0, _react.useEffect)(() => {
      const colorData = _utilsColors.AppColors.find(color => color.colorEnum === settingsStore.colorSelected) || _utilsColors.AppColors[0];
      setSelectedColor(colorData.mainColor);
      setColor(colorData.colorEnum);
    }, [settingsStore.colorSelected]);
    const handleColorPress = (0, _react.useCallback)(item => {
      setSelectedColor(item.mainColor);
      setColor(item.colorEnum);
      onChangeColor?.(item.mainColor);
    }, [onChangeColor]);
    const renderItem = (0, _react.useCallback)(({
      item
    }) => /*#__PURE__*/(0, _reactJsxRuntime.jsx)(ColorSelector, {
      selected: selectedColor === item.mainColor,
      mainColor: item.mainColor,
      backgroundColor: (0, adjust.default)(item.mainColor, theme.dark ? -0.8 : 0.8),
      name: (0, _i18next.t)(item.nameKey),
      onPress: () => handleColorPress(item),
      itemWidth: itemWidth
    }), [selectedColor, theme.dark, handleColorPress, itemWidth]);
    return /*#__PURE__*/(0, _reactJsxRuntime.jsx)(FlatList.default, {
      scrollEnabled: false,
      data: _utilsColors.AppColors,
      numColumns: 3,
      renderItem: renderItem,
      keyExtractor: item => item.colorEnum.toString(),
      showsHorizontalScrollIndicator: false,
      onLayout: event => {
        const {
          width
        } = event.nativeEvent.layout;
        setContainerWidth(width);
      },
      contentContainerStyle: {
        justifyContent: "center",
        alignItems: "center"
      },
      columnWrapperStyle: {
        justifyContent: "space-between",
        alignItems: "center"
      },
      style: {
        width: "100%",
        overflow: "hidden"
      },
      removeClippedSubviews: true,
      maxToRenderPerBatch: 6,
      windowSize: 1
    });
  });
  var _default = AppColorsSelector;
},1374,[6,196,198,1000,1140,1110,1121,1012,1242,1114,1338,97]);