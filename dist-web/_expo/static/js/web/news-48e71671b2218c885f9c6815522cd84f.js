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
  var _databaseUseNews = require(_dependencyMap[0]);
  var _servicesAuthCoordinator = require(_dependencyMap[1]);
  var _servicesShared = require(_dependencyMap[2]);
  var _uiComponentsAvatar = require(_dependencyMap[3]);
  var Avatar = _interopDefault(_uiComponentsAvatar);
  require(_dependencyMap[4]);
  var _uiComponentsDynamic = require(_dependencyMap[5]);
  var _uiComponentsIcon = require(_dependencyMap[6]);
  var Icon = _interopDefault(_uiComponentsIcon);
  var _uiComponentsSearch = require(_dependencyMap[7]);
  var Search = _interopDefault(_uiComponentsSearch);
  var _uiComponentsStack = require(_dependencyMap[8]);
  var Stack = _interopDefault(_uiComponentsStack);
  var _uiComponentsTabHeader = require(_dependencyMap[9]);
  var TabHeader = _interopDefault(_uiComponentsTabHeader);
  var _uiComponentsTabHeaderTitle = require(_dependencyMap[10]);
  var TabHeaderTitle = _interopDefault(_uiComponentsTabHeaderTitle);
  var _uiHooksUseKeyboardHeight = require(_dependencyMap[11]);
  var _uiNewList = require(_dependencyMap[12]);
  var List = _interopDefault(_uiNewList);
  var _uiNewTypography = require(_dependencyMap[13]);
  var Typography = _interopDefault(_uiNewTypography);
  var _uiUtilsTransition = require(_dependencyMap[14]);
  var _utilsChatsColors = require(_dependencyMap[15]);
  var _utilsChatsInitials = require(_dependencyMap[16]);
  var _utilsLoggerLogger = require(_dependencyMap[17]);
  var _getpapillonPapicons = require(_dependencyMap[18]);
  var _expoRouterReactNavigation = require(_dependencyMap[19]);
  require(_dependencyMap[20]);
  var _i18next = require(_dependencyMap[21]);
  var _react = require(_dependencyMap[22]);
  require(_dependencyMap[23]);
  var _reactNativeWebDistExportsRefreshControl = require(_dependencyMap[24]);
  var RefreshControl = _interopDefault(_reactNativeWebDistExportsRefreshControl);
  var _reactNativeReanimated = require(_dependencyMap[25]);
  var Reanimated = _interopDefault(_reactNativeReanimated);
  var _reactNativeSafeAreaContext = require(_dependencyMap[26]);
  var _uiComponentsMainTabErrorBoundary = require(_dependencyMap[27]);
  var MainTabErrorBoundary = _interopDefault(_uiComponentsMainTabErrorBoundary);
  var _uiComponentsSafeHorizontalView = require(_dependencyMap[28]);
  var SafeHorizontalView = _interopDefault(_uiComponentsSafeHorizontalView);
  var _reactJsxRuntime = require(_dependencyMap[29]);
  const _worklet_2530606195720_init_data = {
    code: "(function newsTsx1(){const[keyboardHeight,bottomTabBarHeight]=this.__closure;return{height:keyboardHeight.value-bottomTabBarHeight};})"
  };
  const NewsView = () => {
    const theme = (0, _expoRouterReactNavigation.useTheme)();
    const colors = theme.colors;
    const insets = (0, _reactNativeSafeAreaContext.useSafeAreaInsets)();
    const [headerHeight, setHeaderHeight] = (0, _react.useState)(0);
    const bottomTabBarHeight = insets.bottom + 16;
    const [isLoading, setIsLoading] = (0, _react.useState)(false);
    const [isManuallyLoading, setIsManuallyLoading] = (0, _react.useState)(false);
    const keyboardHeight = (0, _uiHooksUseKeyboardHeight.useKeyboardHeight)();
    const footerStyle = (0, _reactNativeReanimated.useAnimatedStyle)(function newsTsx1Factory([_worklet_2530606195720_init_data, keyboardHeight, bottomTabBarHeight]) {
      const newsTsx1 = function () {
        "use no memo";

        return {
          height: keyboardHeight.value - bottomTabBarHeight
        };
      };
      newsTsx1.__closure = [keyboardHeight, bottomTabBarHeight];
      newsTsx1.__workletHash = 2530606195720;
      newsTsx1.__initData = _worklet_2530606195720_init_data;
      return newsTsx1;
    }([_worklet_2530606195720_init_data, keyboardHeight, bottomTabBarHeight]));
    const news = (0, _databaseUseNews.useNews)();
    const sortedNews = (0, _react.useMemo)(() => {
      return [...news].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    }, [news]);
    const fetchNews = (0, _react.useCallback)(async () => {
      try {
        setIsLoading(true);
        const manager = (0, _servicesShared.getManager)();
        if (!manager) {
          (0, _utilsLoggerLogger.warn)('Manager is null, skipping news fetch');
          return;
        }
        await manager.getNews();
      } catch (error) {
        (0, _utilsLoggerLogger.warn)(`Error fetching news: ${String(error)}`);
      } finally {
        setIsLoading(false);
        setIsManuallyLoading(false);
      }
    }, []);
    (0, _react.useEffect)(() => {
      const unsubscribe = (0, _servicesShared.subscribeManagerUpdate)(() => {
        void fetchNews();
      });
      return () => unsubscribe();
    }, []);
    const [searchText, setSearchText] = (0, _react.useState)('');
    const filteredNews = (0, _react.useMemo)(() => {
      return sortedNews.filter(item => (item.title ?? '').toLowerCase().includes(searchText.toLowerCase()));
    }, [sortedNews, searchText]);
    return /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_reactJsxRuntime.Fragment, {
      children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(TabHeader.default, {
        showAndroidBackButton: true,
        modal: true,
        onHeightChanged: setHeaderHeight,
        title: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(TabHeaderTitle.default, {
          color: colors.primary,
          leading: (0, _i18next.t)('Tab_News'),
          chevron: false,
          loading: isLoading
        }),
        bottom: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Search.default, {
          placeholder: (0, _i18next.t)('News_Search_Placeholder'),
          color: "#2B7ED6",
          onTextChange: text => setSearchText(text)
        }),
        trailing: undefined
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default, {
        style: {
          flex: 1,
          backgroundColor: colors.overground
        },
        safeHorizontalPadding: 16,
        contentContainerStyle: {
          paddingTop: headerHeight,
          paddingBottom: bottomTabBarHeight + 16
        },
        refreshControl: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(RefreshControl.default, {
          refreshing: isManuallyLoading,
          onRefresh: () => {
            setIsManuallyLoading(true);
            (0, _servicesAuthCoordinator.allowAllAuthRetries)();
            void fetchNews();
          },
          progressViewOffset: headerHeight
        }),
        ListFooterComponent: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Reanimated.default.View, {
          style: footerStyle
        }),
        scrollIndicatorInsets: {
          top: headerHeight - insets.top
        },
        ListEmptyComponent: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_uiComponentsDynamic.Dynamic, {
          animated: true,
          entering: _uiUtilsTransition.PapillonAppearIn,
          exiting: _uiUtilsTransition.PapillonAppearOut,
          children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(SafeHorizontalView.default, {
            base: 16,
            style: {
              width: "100%"
            },
            children: /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(Stack.default, {
              hAlign: "center",
              vAlign: "center",
              flex: true,
              style: {
                width: '100%',
                marginTop: 16
              },
              children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Icon.default, {
                opacity: 0.5,
                size: 32,
                style: {
                  marginBottom: 3
                },
                children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
                  name: searchText ? 'Search' : 'Newspaper'
                })
              }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
                variant: "h4",
                color: "textPrimary",
                align: "center",
                children: searchText ? (0, _i18next.t)('News_Search_NoResults') : (0, _i18next.t)('News_Empty_Title')
              }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
                variant: "body2",
                color: "textSecondary",
                align: "center",
                children: searchText ? (0, _i18next.t)('News_Search_NoResults_Description') : (0, _i18next.t)('News_Empty_Description')
              })]
            })
          })
        }, 'empty-list:warn'),
        children: filteredNews.length > 0 && /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Section, {
          children: filteredNews.map(item => {
            const profileColor = (0, _utilsChatsColors.getProfileColorByName)(item.author);
            const profileInitials = (0, _utilsChatsInitials.getInitials)(item.author);
            return /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Item, {
              id: item.id,
              href: {
                pathname: "/(features)/(news)/specific",
                params: {
                  id: item.id
                }
              },
              children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Leading, {
                children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Avatar.default, {
                  size: 40,
                  color: profileColor,
                  initials: profileInitials
                })
              }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
                variant: "title",
                numberOfLines: 2,
                children: item.title
              }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
                variant: "body1",
                color: "textSecondary",
                numberOfLines: 3,
                children: item.content ? truncateString(cleanContent(item.content), 100) : ''
              }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(Stack.default, {
                direction: "horizontal",
                gap: 4,
                style: {
                  marginTop: 4
                },
                hAlign: "center",
                children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
                  numberOfLines: 1,
                  weight: "medium",
                  style: {
                    flex: 1
                  },
                  variant: "caption",
                  color: "textSecondary",
                  children: item.author
                }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
                  nowrap: true,
                  weight: "medium",
                  variant: "caption",
                  color: "textSecondary",
                  children: item.createdAt.toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })
                })]
              }), item.attachments.length > 0 && /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Trailing, {
                children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Icon.default, {
                  size: 18,
                  opacity: 0.4,
                  children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
                    name: "link"
                  })
                })
              })]
            }, item.id);
          })
        })
      })]
    });
  };
  function cleanContent(html) {
    html = html.replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&apos;/g, "'");
    html = html.replace(/\n/g, ' ');
    return html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
  }
  function truncateString(str, maxLength) {
    if (str.length <= maxLength) {
      return str;
    }
    return str.slice(0, maxLength) + '...';
  }
  const NewsViewWithBoundary = () => /*#__PURE__*/(0, _reactJsxRuntime.jsx)(MainTabErrorBoundary.default, {
    children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(NewsView, {})
  });
  var _default = NewsViewWithBoundary;
},860,[1133,1134,1118,1135,1128,1136,1013,1137,1005,1025,1026,1131,1007,1008,1138,1132,1139,1116,1002,1000,1023,1140,6,193,221,1107,360,1141,1111,97]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  Object.defineProperty(exports, "useKeyboardHeight", {
    enumerable: true,
    get: function () {
      return useKeyboardHeight;
    }
  });
  var _reactNativeReanimated = require(_dependencyMap[0]);
  const useKeyboardHeight = () => {
    const keyboard = (0, _reactNativeReanimated.useAnimatedKeyboard)();
    return keyboard.height;
  };
},1131,[1107]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  exports.getProfileColorByName = getProfileColorByName;
  var _subjectsColors = require(_dependencyMap[0]);
  function getProfileColorByName(name) {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash % _subjectsColors.Colors.length);
    return _subjectsColors.Colors[index];
  }
},1132,[1142]);