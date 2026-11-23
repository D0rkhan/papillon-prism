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
      return SettingsIndex;
    }
  });
  var _getpapillonPapicons = require(_dependencyMap[0]);
  var _expoRouterReactNavigation = require(_dependencyMap[1]);
  var _expoLinearGradient = require(_dependencyMap[2]);
  var _expoRouter = require(_dependencyMap[3]);
  var _expoWebBrowser = require(_dependencyMap[4]);
  var WebBrowser = _interopNamespace(_expoWebBrowser);
  var _i18next = require(_dependencyMap[5]);
  var _lucideReactNative = require(_dependencyMap[6]);
  var _react = require(_dependencyMap[7]);
  var _reactNativeWebDistExportsAlert = require(_dependencyMap[8]);
  var Alert = _interopDefault(_reactNativeWebDistExportsAlert);
  var _reactNativeWebDistExportsImage = require(_dependencyMap[9]);
  var Image = _interopDefault(_reactNativeWebDistExportsImage);
  require(_dependencyMap[10]);
  var _reactNativeWebDistExportsView = require(_dependencyMap[11]);
  var View = _interopDefault(_reactNativeWebDistExportsView);
  var _storesAccount = require(_dependencyMap[12]);
  var _storesSettings = require(_dependencyMap[13]);
  var _uiComponentsAvatar = require(_dependencyMap[14]);
  var Avatar = _interopDefault(_uiComponentsAvatar);
  var _uiComponentsIcon = require(_dependencyMap[15]);
  var Icon = _interopDefault(_uiComponentsIcon);
  var _uiComponentsStack = require(_dependencyMap[16]);
  var Stack = _interopDefault(_uiComponentsStack);
  var _uiComponentsTypography = require(_dependencyMap[17]);
  var TypographyLegacy = _interopDefault(_uiComponentsTypography);
  var _utilsAdjustColor = require(_dependencyMap[18]);
  var adjust = _interopDefault(_utilsAdjustColor);
  var _utilsChatsInitials = require(_dependencyMap[19]);
  var _utilsMagicTflite = require(_dependencyMap[20]);
  var _utilsLoggerAnalytics = require(_dependencyMap[21]);
  var _packageJson = require(_dependencyMap[22]);
  var packagejson = _interopDefault(_packageJson);
  var _utilsFormatFormatSchoolName = require(_dependencyMap[23]);
  var _uiNewList = require(_dependencyMap[24]);
  var List = _interopDefault(_uiNewList);
  var _uiNewTypography = require(_dependencyMap[25]);
  var Typography = _interopDefault(_uiNewTypography);
  var _uiComponentsSafeHorizontalView = require(_dependencyMap[26]);
  var SafeHorizontalView = _interopDefault(_uiComponentsSafeHorizontalView);
  var _reactNativeSafeAreaContext = require(_dependencyMap[27]);
  var _reactJsxRuntime = require(_dependencyMap[28]);
  function SettingsIndex() {
    const router = (0, _expoRouter.useRouter)();
    const navigation = (0, _expoRouter.useNavigation)();
    const theme = (0, _expoRouterReactNavigation.useTheme)();
    const {
      colors
    } = theme;
    const accountStore = (0, _storesAccount.useAccountStore)();
    const accounts = (0, _storesAccount.useAccountStore)(state => state.accounts);
    const lastUsedAccount = (0, _storesAccount.useAccountStore)(state => state.lastUsedAccount);
    const settingsStore = (0, _storesSettings.useSettingsStore)(state => state.personalization);
    const currentVersion = packagejson.default.version;
    const releaseNotesUrl = "https://papillon.bzh/blog";
    const account = accounts.find(a => a.id === lastUsedAccount);
    const [firstName, lastName, level, establishment] = (0, _react.useMemo)(() => {
      if (!account) {
        return [null, null, null, null];
      }
      const firstName = account.firstName;
      const lastName = account.lastName;
      const level = account.className;
      const establishment = account.schoolName;
      return [firstName, lastName, level, establishment];
    }, [account]);
    const logout = (0, _react.useCallback)(() => {
      (0, _utilsLoggerAnalytics.trackOptionalEvent)("logged_out_of_account");
      const accounts = _storesAccount.useAccountStore.getState().accounts;
      for (const account of accounts) {
        _storesAccount.useAccountStore.getState().removeAccount(account);
      }
      router.replace("/(onboarding)/welcome");
    }, [account, accountStore, router]);
    const MoreSettingsList = [{
      title: (0, _i18next.t)("Settings_More"),
      content: [
      /*{
        title: t('Settings_Accessibility_Title'),
        description: t('Settings_Accessibility_Description'),
        papicon: <Papicons name={"Accessibility"} />,
        icon: <AccessibilityIcon />,
        color: "#0038A8",
        onPress: () => Alert.alert("Ça arrive... ✨", "Cette fonctionnalité n'est pas encore disponible.")
      },*/
      {
        title: (0, _i18next.t)("Settings_ReleaseNotes_Title"),
        description: (0, _i18next.t)("Settings_ReleaseNotes_Description"),
        papicon: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
          name: "PrivatePapillonApp"
        }),
        icon: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_lucideReactNative.InfoIcon, {}),
        color: "#1F7AFC",
        onPress: () => WebBrowser.openBrowserAsync(releaseNotesUrl, {
          presentationStyle: WebBrowser.WebBrowserPresentationStyle.PAGE_SHEET
        })
      }, {
        title: (0, _i18next.t)("Settings_Donate_Title"),
        description: (0, _i18next.t)("Settings_Donate_Description"),
        papicon: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
          name: "Heart"
        }),
        icon: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_lucideReactNative.HeartIcon, {}),
        color: "#EFA400",
        onPress: () => WebBrowser.openBrowserAsync("https://go.papillon.bzh/donate")
      }, {
        title: (0, _i18next.t)("Settings_About_Title"),
        description: `${(0, _i18next.t)("Settings_About_Description")} ${currentVersion}`,
        icon: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_lucideReactNative.InfoIcon, {}),
        papicon: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
          name: "Info"
        }),
        color: "#797979",
        onPress: () => router.navigate("/(settings)/about")
      }]
    }, {
      title: (0, _i18next.t)("Settings_About"),
      content: [{
        title: (0, _i18next.t)("Settings_Telemetry_Title"),
        description: (0, _i18next.t)("Settings_Telemetry_Description"),
        icon: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_lucideReactNative.InfoIcon, {}),
        papicon: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
          name: "Check"
        }),
        color: "#797979",
        onPress: () => router.navigate("../consent")
      }, {
        title: (0, _i18next.t)("Settings_Logout_Title"),
        description: (0, _i18next.t)("Settings_Logout_Description"),
        papicon: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
          name: "Logout"
        }),
        color: "#a80000",
        onPress: () => {
          Alert.default.alert((0, _i18next.t)("Settings_Logout_Title"), (0, _i18next.t)("Settings_Logout_Description"), [{
            text: (0, _i18next.t)("CANCEL_BTN"),
            style: "cancel"
          }, {
            text: (0, _i18next.t)("Settings_Logout_Title"),
            style: "destructive",
            onPress: () => {
              logout();
            }
          }], {
            cancelable: true
          });
        }
      }]
    }, ...(settingsStore.showDevMode ? [{
      title: (0, _i18next.t)("Settings_Dev"),
      content: [...(settingsStore.showDevMode ? [{
        title: "Mode développeur",
        description: "Options avancées pour les développeurs.",
        papicon: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
          name: "Code"
        }),
        icon: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_lucideReactNative.InfoIcon, {}),
        color: "#FF6B35",
        onPress: () => router.navigate("/devmode")
      }] : [])]
    }] : [])];
    const BigButtons = [{
      icon: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
        name: "Palette"
      }),
      title: (0, _i18next.t)('Settings_Personalization_Title_Card'),
      description: (0, _i18next.t)('Settings_Personalization_Subtitle_Card'),
      color: "#17C300",
      onPress: () => {
        router.navigate("/(settings)/personalization");
      }
    }, {
      icon: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
        name: "Calendar"
      }),
      title: (0, _i18next.t)('Settings_Personalization_Subject_Title_Card'),
      description: (0, _i18next.t)('Settings_Personalization_Subject_Description'),
      color: "#8500dd",
      onPress: () => {
        router.navigate("/(settings)/subject_personalization");
      }
    }, {
      icon: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
        name: "User"
      }),
      title: (0, _i18next.t)("Settings_Accounts_Title"),
      description: (0, _i18next.t)('Settings_Accounts_Description'),
      color: "#0059DD",
      onPress: () => {
        router.navigate("/(settings)/accounts");
      }
    }, {
      icon: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
        name: "Gears"
      }),
      title: (0, _i18next.t)("Settings_Features_Title"),
      description: (0, _i18next.t)("Settings_Features_Description_Card"),
      color: "#E05A00",
      onPress: () => {
        router.navigate("/(settings)/features");
      }
    }, ...(_utilsMagicTflite.MAGIC_AVAILABLE ? [{
      icon: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
        name: "Sparkles"
      }),
      title: "Magic+",
      description: (0, _i18next.t)('Settings_MagicPlus_Description_Card'),
      color: "#DD007D",
      onPress: () => {
        router.navigate("/(settings)/magic");
      }
    }] : [])];
    const RenderBigButtons = (0, _react.useCallback)(() => {
      return /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Stack.default, {
        direction: "vertical",
        gap: 10,
        children: Array.from({
          length: Math.ceil(BigButtons.length / 2)
        }, (_, rowIndex) => /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Stack.default, {
          direction: "horizontal",
          gap: 10,
          children: BigButtons.slice(rowIndex * 2, rowIndex * 2 + 2).map((button, _) => {
            const newButtonColor = (0, adjust.default)(button.color, theme.dark ? 0.2 : -0.2);
            return /*#__PURE__*/(0, _reactJsxRuntime.jsx)(View.default, {
              style: {
                flex: 1,
                borderRadius: 22,
                elevation: 2,
                overflow: "hidden"
              },
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_uiNewList.ListTouchable, {
                onPress: button.onPress,
                children: /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(Stack.default, {
                  flex: true,
                  card: true,
                  direction: "vertical",
                  gap: 8,
                  padding: [14, 14],
                  radius: 23,
                  style: [{
                    backgroundColor: (0, adjust.default)(button.color, theme.dark ? -0.8 : 0.8),
                    shadowOpacity: 0
                  }],
                  children: [false, /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Icon.default, {
                    papicon: true,
                    size: 32,
                    fill: button.disabled ? "#505050" : newButtonColor,
                    children: button.icon
                  }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(Stack.default, {
                    direction: "vertical",
                    hAlign: "start",
                    gap: 0,
                    children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(TypographyLegacy.default, {
                      inline: true,
                      variant: "title",
                      weight: "bold",
                      color: button.disabled ? "#505050" : newButtonColor,
                      children: button.title
                    }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(TypographyLegacy.default, {
                      inline: true,
                      variant: "body2",
                      weight: "medium",
                      color: button.disabled ? "#505050" : newButtonColor,
                      children: button.description
                    })]
                  })]
                })
              })
            }, button.title);
          })
        }, rowIndex))
      });
    }, [theme.dark]);
    const insets = (0, _reactNativeSafeAreaContext.useSafeAreaInsets)();
    const headerHeight = (0, _expoRouterReactNavigation.useHeaderHeight)();
    const finalHeaderHeight = 0;
    const profilePicture = account?.customisation?.profilePicture;
    return /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(View.default, {
      style: {
        flex: 1,
        backgroundColor: colors.overground
      },
      children: [profilePicture && true && /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(View.default, {
        pointerEvents: "none",
        style: {
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "60%"
        },
        children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Image.default, {
          source: {
            uri: `data:image/png;base64,${profilePicture}`
          },
          blurRadius: 40,
          style: {
            width: "100%",
            height: "100%",
            opacity: 0.35
          }
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoLinearGradient.LinearGradient, {
          colors: [colors.overground + "00", colors.overground],
          locations: [0.2, 0.85],
          style: {
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
          }
        })]
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default, {
        style: {
          flex: 1,
          backgroundColor: "transparent"
        },
        contentInsetAdjustmentBehavior: "automatic",
        gap: 12,
        safeHorizontalPadding: 16,
        ListHeaderComponent: /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(SafeHorizontalView.default, {
          base: 16,
          style: {
            marginVertical: 16,
            gap: 4
          },
          children: [/*#__PURE__*/(0, _reactJsxRuntime.jsxs)(Stack.default, {
            flex: true,
            direction: "vertical",
            hAlign: "center",
            vAlign: "center",
            gap: 6,
            padding: [16, 0],
            style: {
              paddingBottom: 24
            },
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Avatar.default, {
              size: 72,
              initials: (0, _utilsChatsInitials.getInitials)(`${account?.firstName} ${account?.lastName}`),
              imageUrl: account && account.customisation && account.customisation.profilePicture ? `data:image/png;base64,${account.customisation.profilePicture}` : undefined,
              style: {
                marginBottom: 8
              }
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(TypographyLegacy.default, {
              variant: "h3",
              align: "center",
              children: firstName || lastName ? `${firstName || ''} ${lastName || ''}`.trim() : (0, _i18next.t)('Settings_NoAccount')
            }), establishment && /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(TypographyLegacy.default, {
              variant: "body1",
              align: "center",
              color: "secondary",
              children: [level, " ", level && establishment && " — ", " ", (0, _utilsFormatFormatSchoolName.formatSchoolName)(establishment)]
            })]
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(RenderBigButtons, {})]
        }),
        contentContainerStyle: {
          paddingBottom: insets.bottom,
          paddingTop: finalHeaderHeight
        },
        children: MoreSettingsList.map(section => /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Section, {
          children: [false, section.content.map(item => /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Item, {
            onPress: item.onPress,
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Leading, {
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Icon.default, {
                papicon: true,
                size: 24,
                fill: theme.colors.text,
                children: item.papicon
              })
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "title",
              children: item.title
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "body1",
              color: "textSecondary",
              children: item.description
            })]
          }, item.title))]
        }, section.title))
      })]
    });
  }
},925,[1002,1000,1113,1023,1355,1140,1010,6,190,267,193,198,1022,1012,1135,1013,1005,1110,1114,1139,1375,1369,1362,1316,1007,1008,1111,360,97]);