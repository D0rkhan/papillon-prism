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
  var _constantsTips = require(_dependencyMap[0]);
  var _storesTips = require(_dependencyMap[1]);
  var _storesSettings = require(_dependencyMap[2]);
  var _uiComponentsStack = require(_dependencyMap[3]);
  var Stack = _interopDefault(_uiComponentsStack);
  var _expoRouter = require(_dependencyMap[4]);
  var _uiComponentsTypography = require(_dependencyMap[5]);
  var Typography = _interopDefault(_uiComponentsTypography);
  var _expoRouterReactNavigation = require(_dependencyMap[6]);
  var _react = require(_dependencyMap[7]);
  var React = _interopDefault(_react);
  var _reactNativeWebDistExportsDimensions = require(_dependencyMap[8]);
  var Dimensions = _interopDefault(_reactNativeWebDistExportsDimensions);
  var _reactNativeWebDistExportsFlatList = require(_dependencyMap[9]);
  var FlatList = _interopDefault(_reactNativeWebDistExportsFlatList);
  var _reactNativeWebDistExportsImage = require(_dependencyMap[10]);
  var Image = _interopDefault(_reactNativeWebDistExportsImage);
  require(_dependencyMap[11]);
  var _reactNativeWebDistExportsPressable = require(_dependencyMap[12]);
  var Pressable = _interopDefault(_reactNativeWebDistExportsPressable);
  var _reactNativeWebDistExportsView = require(_dependencyMap[13]);
  var View = _interopDefault(_reactNativeWebDistExportsView);
  var _expoFileSystem = require(_dependencyMap[14]);
  var _componentsActivityIndicator = require(_dependencyMap[15]);
  var ActivityIndicator = _interopDefault(_componentsActivityIndicator);
  require(_dependencyMap[16]);
  require(_dependencyMap[17]);
  var _i18next = require(_dependencyMap[18]);
  var _expoImagePicker = require(_dependencyMap[19]);
  var ImagePicker = _interopNamespace(_expoImagePicker);
  var _reactNativeSafeAreaContext = require(_dependencyMap[20]);
  var _uiNativeNativeSegmentedControl = require(_dependencyMap[21]);
  var NativeSegmentedControl = _interopDefault(_uiNativeNativeSegmentedControl);
  var _utilsGenerative = require(_dependencyMap[22]);
  var _utilsGradientWallpaper = require(_dependencyMap[23]);
  var _reactJsxRuntime = require(_dependencyMap[24]);
  const COLLECTIONS_SOURCE = "https://raw.githubusercontent.com/PapillonApp/datasets/refs/heads/main/wallpapers/index.json";
  const WallpaperModal = () => {
    const {
      colors
    } = (0, _expoRouterReactNavigation.useTheme)();
    const headerHeight = (0, _expoRouterReactNavigation.useHeaderHeight)();
    const insets = (0, _reactNativeSafeAreaContext.useSafeAreaInsets)();
    const [collections, setCollections] = (0, _react.useState)([]);
    const [refreshing, setRefreshing] = (0, _react.useState)(false);
    const [error, setError] = (0, _react.useState)(null);
    const fetchCollections = async (isRefresh = false) => {
      try {
        if (isRefresh) setRefreshing(true);
        const response = await fetch(COLLECTIONS_SOURCE);
        const data = await response.json();
        setCollections(data);
      } catch (error) {
        setError(error);
      } finally {
        setRefreshing(false);
      }
    };
    (0, _react.useEffect)(() => {
      fetchCollections();
    }, []);

    // Getting here is the whole point of the home tip pointing at the palette
    // button, however the user got here. Retire it rather than leave it waiting
    // to be closed by hand.
    (0, _react.useEffect)(() => {
      (0, _storesTips.retireTip)(_constantsTips.TipIds.homeWallpaper);
    }, []);
    const [currentlyDownloading, setCurrentlyDownloading] = (0, _react.useState)([]);
    const mutateProperty = (0, _storesSettings.useSettingsStore)(state => state.mutateProperty);
    const accountWallpaper = (0, _utilsGradientWallpaper.useAccountWallpaper)();
    const currentWallpaper = accountWallpaper.wallpaper;
    const selectedId = currentWallpaper?.id;
    const hasCustomWallpaper = selectedId?.startsWith("custom:") ?? false;
    const flatListRef = React.default.useRef(null);
    const [tab, setTab] = (0, _react.useState)(currentWallpaper && !(0, _utilsGradientWallpaper.isGradient)(currentWallpaper) ? "images" : "gradient");
    const [listHeight, setListHeight] = (0, _react.useState)(0);
    // Automatic insets break when toggling scrolling between tabs: clear the transparent iOS header ourselves
    const listTopPadding = 20;

    // Bring the selected collection into view when the list appears, not on every selection:
    // a tapped row is already visible, and the first row never needs scrolling
    (0, _react.useEffect)(() => {
      if (tab === "images" && collections.length > 0 && currentWallpaper) {
        const collectionIndex = collections.findIndex(collection => collection.images.find(image => image.id === currentWallpaper.id));
        if (collectionIndex > 0) {
          setTimeout(() => {
            flatListRef.current?.scrollToIndex({
              index: collectionIndex,
              animated: true,
              viewOffset: 0
            });
          }, 10);
        }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tab, collections]);
    const wallpaperDirectory = new _expoFileSystem.Directory(_expoFileSystem.Paths.document, "wallpapers");
    const downloadAndSelect = wallpaper => {
      const fileName = `${wallpaper.id}.jpg`;
      const wallpaperFile = new _expoFileSystem.File(wallpaperDirectory, fileName);
      if (wallpaperFile.exists) {
        (0, _utilsGradientWallpaper.setAccountWallpaper)({
          wallpaper: {
            id: wallpaper.id,
            path: {
              directory: wallpaperDirectory.name,
              name: wallpaperFile.name
            }
          }
        });
        return;
      }
      setCurrentlyDownloading(prev => [...prev, wallpaper.id]);
      if (!wallpaperDirectory.exists) {
        wallpaperDirectory.create();
      }
      _expoFileSystem.File.downloadFileAsync(wallpaper.url, wallpaperFile).then(result => {
        (0, _utilsGradientWallpaper.setAccountWallpaper)({
          wallpaper: {
            id: wallpaper.id,
            path: {
              directory: wallpaperDirectory.name,
              name: result.name
            }
          }
        });
      }).finally(() => {
        setCurrentlyDownloading(prev => prev.filter(id => id !== wallpaper.id));
      });
    };
    const uploadCustomWallpaper = () => {
      try {
        ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1
        }).then(result => {
          if (result.canceled) return;
          const asset = result.assets[0];
          const sourceFile = new _expoFileSystem.File(asset.uri);
          if (!wallpaperDirectory.exists) {
            wallpaperDirectory.create();
          }
          const newFileName = `custom:${Date.now()}.jpg`;
          const destFile = new _expoFileSystem.File(wallpaperDirectory, newFileName);
          sourceFile.copy(destFile);
          (0, _utilsGradientWallpaper.setAccountWallpaper)({
            wallpaper: {
              id: `custom:${Date.now()}`,
              path: {
                directory: wallpaperDirectory.name,
                name: destFile.name
              }
            }
          });
        });
      } catch (error) {
        console.log(error);
      }
    };
    const [gradient, setGradient] = (0, _react.useState)(() => accountWallpaper.wallpaperGradient ?? (0, _utilsGradientWallpaper.randomGradient)());
    const applyTimeout = (0, _react.useRef)(undefined);
    const pendingGradient = (0, _react.useRef)(null);
    const flushGradient = () => {
      clearTimeout(applyTimeout.current);
      if (pendingGradient.current) (0, _utilsGradientWallpaper.applyGradientWallpaper)(pendingGradient.current);
      pendingGradient.current = null;
    };

    // Closing the modal mid-debounce must still apply what the preview shows
    (0, _react.useEffect)(() => () => flushGradient(), []);
    const updateGradient = next => {
      setGradient(next);
      // Home renders gradients from these params: update them now, the PNG on disk can follow
      (0, _utilsGradientWallpaper.setAccountWallpaper)({
        wallpaperGradient: next
      });
      pendingGradient.current = next;
      clearTimeout(applyTimeout.current);
      applyTimeout.current = setTimeout(flushGradient, 250);
    };
    const randomizeGradient = () => updateGradient((0, _utilsGradientWallpaper.randomGradient)());
    const shuffleGradient = () => updateGradient({
      ...gradient,
      seed: (0, _utilsGradientWallpaper.randomSeed)()
    });
    const changeTab = next => {
      setTab(next);
      if (next === "gradient" && !(0, _utilsGradientWallpaper.isGradient)(currentWallpaper)) {
        (0, _utilsGradientWallpaper.applyGradientWallpaper)(gradient);
      }
      if (next === "images" && (0, _utilsGradientWallpaper.isGradient)(currentWallpaper)) {
        clearTimeout(applyTimeout.current);
        pendingGradient.current = null;
        if (accountWallpaper.lastImageWallpaper) {
          (0, _utilsGradientWallpaper.setAccountWallpaper)({
            wallpaper: accountWallpaper.lastImageWallpaper
          });
          const gradientFile = currentWallpaper?.path?.name && new _expoFileSystem.File(wallpaperDirectory, currentWallpaper.path.name);
          if (gradientFile && gradientFile.exists) gradientFile.delete();
        }
      }
    };
    const downloadsSize = (wallpaperDirectory.info().size / 1048576).toFixed(2) + " MB";
    const clearWallpaper = () => {
      (0, _utilsGradientWallpaper.setAccountWallpaper)({
        wallpaper: undefined
      });
    };
    const clearDownloads = () => {
      wallpaperDirectory.delete();
      // Downloads are shared by every account: drop all references to them
      mutateProperty("personalization", {
        wallpaper: undefined,
        lastImageWallpaper: undefined,
        wallpapersByAccount: {}
      });
    };
    return /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_reactJsxRuntime.Fragment, {
      children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoRouter.Stack.Title, {
        asChild: true,
        children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(View.default, {
          style: {
            width: Math.min(Dimensions.default.get("window").width - 140, 280)
          },
          children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(NativeSegmentedControl.default, {
            options: [(0, _i18next.t)("Modal_Wallpaper_Tab_Gradient"), (0, _i18next.t)("Modal_Wallpaper_Tab_Images")],
            selectedIndex: tab === "gradient" ? 0 : 1,
            onChange: index => changeTab(index === 0 ? "gradient" : "images")
          })
        })
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(FlatList.default, {
        ref: flatListRef,
        data: tab === "images" ? collections : [],
        onLayout: e => setListHeight(e.nativeEvent.layout.height)
        // The gradient editor fills the visible sheet (the preview stretches), so there's nothing to scroll
        ,
        scrollEnabled: tab === "images",
        ListHeaderComponent: tab === "gradient" ? /*#__PURE__*/(0, _reactJsxRuntime.jsx)(View.default, {
          style: {
            paddingHorizontal: 16,
            height: listHeight > 0 ? listHeight - listTopPadding - insets.bottom : undefined
          },
          children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(GradientEditor, {
            value: gradient,
            onChange: updateGradient
          })
        }) : null,
        style: {
          flex: 1
        },
        contentContainerStyle: {
          gap: 16,
          paddingTop: listTopPadding,
          paddingBottom: insets.bottom
        },
        renderItem: ({
          item,
          index
        }) => /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(View.default, {
          children: [/*#__PURE__*/(0, _reactJsxRuntime.jsxs)(Stack.default, {
            direction: "horizontal",
            alignItems: "center",
            gap: 8,
            padding: [16, 10],
            children: [item.icon && /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Image.default, {
              source: {
                uri: item.icon
              },
              style: {
                width: 24,
                height: 24,
                borderRadius: 6
              }
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              style: {
                flex: 1
              },
              variant: "body1",
              color: "text",
              children: item.name
            }), item.images.find(image => image.id === currentWallpaper?.id) && item.images.find(image => image.id === currentWallpaper?.id)?.credit && /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "caption",
              color: "secondary",
              children: item.images.find(image => image.id === currentWallpaper?.id)?.credit
            })]
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(FlatList.default, {
            data: item.images,
            horizontal: true,
            style: {
              width: "100%",
              paddingHorizontal: 12
            },
            contentContainerStyle: {
              gap: 6,
              paddingRight: 12
            },
            showsHorizontalScrollIndicator: false,
            renderItem: ({
              item
            }) => /*#__PURE__*/(0, _reactJsxRuntime.jsx)(WallpaperImage, {
              item: item,
              onPress: () => downloadAndSelect(item),
              selectedId: currentWallpaper?.id,
              isDownloading: currentlyDownloading.includes(item.id)
            }),
            getItemLayout: (data, index) => ({
              length: 166,
              offset: 166 * index,
              index
            }),
            initialScrollIndex: item.images.findIndex(image => image.id === currentWallpaper?.id) !== -1 ? item.images.findIndex(image => image.id === currentWallpaper?.id) : undefined
          })]
        }),
        contentInsetAdjustmentBehavior: "never"
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_reactJsxRuntime.Fragment, {
        children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoRouter.Stack.Toolbar, {
          placement: "left",
          children: tab === "gradient" ? /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoRouter.Stack.Toolbar.Button, {
            icon: "dice",
            onPress: randomizeGradient
          }) : /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoRouter.Stack.Toolbar.Button, {
            icon: "photo",
            tintColor: hasCustomWallpaper ? colors.primary : undefined,
            onPress: uploadCustomWallpaper
          })
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoRouter.Stack.Toolbar, {
          placement: "right",
          children: tab === "gradient" ? /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoRouter.Stack.Toolbar.Button, {
            icon: "arrow.triangle.2.circlepath",
            onPress: shuffleGradient,
            children: (0, _i18next.t)("Modal_Wallpaper_Gradient_Shuffle")
          }) : /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_expoRouter.Stack.Toolbar.Menu, {
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoRouter.Stack.Toolbar.Icon, {
              sf: "ellipsis"
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoRouter.Stack.Toolbar.MenuAction, {
              icon: "trash.fill",
              destructive: true,
              disabled: !currentWallpaper,
              onPress: clearWallpaper,
              children: (0, _i18next.t)("Modal_Wallpaper_Clear")
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_expoRouter.Stack.Toolbar.Menu, {
              title: (0, _i18next.t)("Modal_Wallpaper_Downloads"),
              icon: "square.and.arrow.down",
              children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoRouter.Stack.Toolbar.MenuAction, {
                disabled: true,
                subtitle: downloadsSize,
                children: (0, _i18next.t)("Modal_Wallpaper_Downloads_Size")
              }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoRouter.Stack.Toolbar.MenuAction, {
                icon: "trash.fill",
                destructive: true,
                disabled: !wallpaperDirectory.exists,
                onPress: clearDownloads,
                children: (0, _i18next.t)("Modal_Wallpaper_ClearDownloads")
              })]
            })]
          })
        })]
      })]
    });
  };
  const GradientEditor = ({
    value,
    onChange
  }) => {
    const {
      colors
    } = (0, _expoRouterReactNavigation.useTheme)();

    // Same seed and aspect ratio as the full-size render, so the preview matches the result
    const preview = (0, _react.useMemo)(() => {
      const image = (0, _utilsGenerative.generateMeshGradient)(value.colors, value.seed, Math.round(_utilsGradientWallpaper.GRADIENT_WIDTH / 4), _utilsGradientWallpaper.GRADIENT_HEIGHT / 4);
      return image ? `data:image/png;base64,${image.encodeToBase64()}` : undefined;
    }, [value]);
    const toggleColor = color => {
      const current = value.colors;
      if (current.includes(color)) {
        if (current.length > 1) onChange({
          ...value,
          colors: current.filter(c => c !== color)
        });
      } else if (current.length < 4) {
        onChange({
          ...value,
          colors: [...current, color]
        });
      }
    };
    return /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(View.default, {
      style: {
        flex: 1,
        gap: 16
      },
      children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Image.default, {
        source: {
          uri: preview
        },
        resizeMode: "cover",
        style: {
          width: "100%",
          flex: 1,
          minHeight: 120,
          borderRadius: 16,
          borderCurve: "continuous"
        }
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(View.default, {
        style: {
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 10,
          justifyContent: "center"
        },
        children: _utilsGradientWallpaper.GRADIENT_PALETTE.map(color => {
          const selected = value.colors.includes(color);
          return /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Pressable.default, {
            onPress: () => toggleColor(color),
            accessibilityRole: "checkbox",
            accessibilityState: {
              checked: selected
            },
            accessibilityLabel: color,
            style: {
              width: 40,
              height: 40,
              borderRadius: 20,
              padding: 3,
              borderWidth: 2,
              borderColor: selected ? colors.primary : "transparent"
            },
            children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(View.default, {
              style: {
                flex: 1,
                borderRadius: 20,
                backgroundColor: color,
                borderWidth: 1,
                borderColor: colors.border
              }
            })
          }, color);
        })
      })]
    });
  };
  const WallpaperImage = ({
    item,
    onPress,
    selectedId,
    isDownloading
  }) => {
    const [imageLoaded, setImageLoaded] = (0, _react.useState)(false);
    const {
      colors
    } = (0, _expoRouterReactNavigation.useTheme)();
    return /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Pressable.default, {
      onPress: onPress,
      children: /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(View.default, {
        style: {
          width: 160,
          height: 100,
          padding: 2,
          borderRadius: 16,
          borderCurve: "continuous",
          borderWidth: selectedId === item.id ? 2 : 0,
          borderColor: selectedId === item.id ? colors.primary : "transparent"
        },
        children: [(!imageLoaded || isDownloading) && /*#__PURE__*/(0, _reactJsxRuntime.jsx)(View.default, {
          style: {
            position: "absolute",
            top: 2,
            left: 2,
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1,
            borderRadius: 12,
            backgroundColor: "rgba(0, 0, 0, 0.5)"
          },
          children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(ActivityIndicator.default, {
            color: "#ffffff"
          })
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Image.default, {
          source: {
            uri: item.thumbnail || item.url
          },
          style: {
            width: "100%",
            height: "100%",
            borderRadius: 12
          },
          onLoad: () => setImageLoaded(true)
        })]
      }, item.id)
    });
  };
  var _default = WallpaperModal;
},870,[1234,1235,1012,1005,1023,1110,1000,6,223,196,267,193,334,198,1236,1232,1237,1010,1140,1227,360,1233,1238,1239,97]);
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
  var _reactNativeReanimated = require(_dependencyMap[1]);
  var Animated = _interopDefault(_reactNativeReanimated);
  var _reactNativeSvg = require(_dependencyMap[2]);
  var Svg = _interopDefault(_reactNativeSvg);
  var _reactJsxRuntime = require(_dependencyMap[3]);
  const _worklet_164447341709_init_data = {
    code: "(function ActivityIndicatorTsx1(){const[rotation]=this.__closure;return{transform:[{rotateZ:rotation.value+\"deg\"}]};})"
  };
  const ActivityIndicator = ({
    size = 32,
    color = '#000000',
    style
  }) => {
    const rotation = (0, _reactNativeReanimated.useSharedValue)(0);
    (0, _react.useEffect)(() => {
      rotation.value = (0, _reactNativeReanimated.withRepeat)((0, _reactNativeReanimated.withTiming)(360, {
        duration: 1000,
        easing: _reactNativeReanimated.Easing.linear
      }), -1 // Infinite repeat
      );
      return () => (0, _reactNativeReanimated.cancelAnimation)(rotation);
    }, [rotation]);
    const animatedStyle = (0, _reactNativeReanimated.useAnimatedStyle)(function ActivityIndicatorTsx1Factory([_worklet_164447341709_init_data, rotation]) {
      const ActivityIndicatorTsx1 = function () {
        "use no memo";

        return {
          transform: [{
            rotateZ: `${rotation.value}deg`
          }]
        };
      };
      ActivityIndicatorTsx1.__closure = [rotation];
      ActivityIndicatorTsx1.__workletHash = 164447341709;
      ActivityIndicatorTsx1.__initData = _worklet_164447341709_init_data;
      return ActivityIndicatorTsx1;
    }([_worklet_164447341709_init_data, rotation]));
    const strokeWidth = Math.max(2, size * 0.1);
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    // 75% filled means 0.75 * circumference is drawn, the rest is gap
    const strokeDasharray = [circumference * 0.75, circumference];
    return /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Animated.default.View, {
      style: [{
        width: size,
        height: size,
        justifyContent: 'center',
        alignItems: 'center'
      }, animatedStyle, style],
      children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Svg.default, {
        width: size,
        height: size,
        children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNativeSvg.Circle, {
          cx: size / 2,
          cy: size / 2,
          r: radius,
          stroke: color,
          strokeWidth: strokeWidth,
          strokeDasharray: strokeDasharray,
          strokeLinecap: "round",
          fill: "transparent"
        })
      })
    });
  };
  var _default = ActivityIndicator;
},1232,[6,1107,1112,97]);
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
  require(_dependencyMap[0]);
  require(_dependencyMap[1]);
  var _expoUiSwiftUi = require(_dependencyMap[2]);
  var _expoUiSwiftUiModifiers = require(_dependencyMap[3]);
  var _reactJsxRuntime = require(_dependencyMap[4]);
  const NativeSegmentedControl = ({
    options,
    selectedIndex,
    onChange
  }) => {
    return /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoUiSwiftUi.Host, {
      matchContents: {
        vertical: true
      },
      children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoUiSwiftUi.Picker, {
        selection: selectedIndex,
        onSelectionChange: onChange,
        modifiers: [(0, _expoUiSwiftUiModifiers.pickerStyle)("segmented")],
        children: options.map((option, index) => /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoUiSwiftUi.Text, {
          modifiers: [(0, _expoUiSwiftUiModifiers.tag)(index)],
          children: option
        }, option))
      })
    });
  };
  var _default = NativeSegmentedControl;
},1233,[193,1240,1240,1240,97]);