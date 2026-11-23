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
      return SettingsAbout;
    }
  });
  Object.defineProperty(exports, "Team", {
    enumerable: true,
    get: function () {
      return Team;
    }
  });
  var _getpapillonPapicons = require(_dependencyMap[0]);
  var _expoRouterReactNavigation = require(_dependencyMap[1]);
  var _expoRouter = require(_dependencyMap[2]);
  var _react = require(_dependencyMap[3]);
  var _reactI18next = require(_dependencyMap[4]);
  var _reactNativeWebDistExportsAlert = require(_dependencyMap[5]);
  var Alert = _interopDefault(_reactNativeWebDistExportsAlert);
  var _reactNativeWebDistExportsLinking = require(_dependencyMap[6]);
  var Linking = _interopDefault(_reactNativeWebDistExportsLinking);
  var _componentsSettingsHeader = require(_dependencyMap[7]);
  var SettingsHeader = _interopDefault(_componentsSettingsHeader);
  var _packageJson = require(_dependencyMap[8]);
  var packageJson = _interopDefault(_packageJson);
  var _storesSettings = require(_dependencyMap[9]);
  var _uiComponentsAvatar = require(_dependencyMap[10]);
  var Avatar = _interopDefault(_uiComponentsAvatar);
  var _uiComponentsIcon = require(_dependencyMap[11]);
  var Icon = _interopDefault(_uiComponentsIcon);
  var _uiNewList = require(_dependencyMap[12]);
  var List = _interopDefault(_uiNewList);
  var _uiNewTypography = require(_dependencyMap[13]);
  var Typography = _interopDefault(_uiNewTypography);
  var _utilsChatsInitials = require(_dependencyMap[14]);
  var _reactNativeSafeAreaContext = require(_dependencyMap[15]);
  var _reactJsxRuntime = require(_dependencyMap[16]);
  const Team = [{
    title: "Vince Linise",
    description: "Président",
    login: "ecnivtwelve",
    leading: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Avatar.default, {
      size: 40,
      initials: (0, _utilsChatsInitials.getInitials)("Vince Linise"),
      imageUrl: "https://avatars.githubusercontent.com/u/32978709?v=4"
    }),
    onPress: () => Linking.default.openURL("https://www.linkedin.com/in/vincelinise/")
  }, {
    title: "Lucas Lavajo",
    description: "Vice-Président",
    login: "tryon-dev",
    leading: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Avatar.default, {
      size: 40,
      initials: (0, _utilsChatsInitials.getInitials)("Lucas Lavajo"),
      imageUrl: "https://avatars.githubusercontent.com/u/68423470?v=4"
    }),
    onPress: () => Linking.default.openURL("https://www.linkedin.com/in/lucas-lavajo/")
  }, {
    title: "Raphaël Schröder",
    description: "Développeur back-end",
    login: "raphckrman",
    leading: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Avatar.default, {
      size: 40,
      initials: (0, _utilsChatsInitials.getInitials)("Raphaël Schröder"),
      imageUrl: "https://avatars.githubusercontent.com/u/41128238?v=4"
    }),
    onPress: () => Linking.default.openURL("https://www.linkedin.com/in/raphckrman/")
  }, {
    title: "Tom Hélière",
    login: "tom-things",
    description: "Designer UI/UX",
    leading: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Avatar.default, {
      size: 40,
      initials: (0, _utilsChatsInitials.getInitials)("Tom Hélière"),
      imageUrl: "https://avatars.githubusercontent.com/u/135361669?v=4"
    }),
    onPress: () => Linking.default.openURL("https://www.linkedin.com/in/tom-heliere/")
  }, {
    title: "Rémy Godet",
    description: "Développeur",
    login: "godetremy",
    leading: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Avatar.default, {
      size: 40,
      initials: (0, _utilsChatsInitials.getInitials)("Rémy Godet"),
      imageUrl: "https://avatars.githubusercontent.com/u/77058107?v=4"
    }),
    onPress: () => Linking.default.openURL("https://www.linkedin.com/in/godetremy/")
  }, {
    title: "Mael Duret",
    description: "Développeur",
    login: "ryzenixx",
    leading: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Avatar.default, {
      size: 40,
      initials: (0, _utilsChatsInitials.getInitials)("Mael Duret"),
      imageUrl: "https://avatars.githubusercontent.com/u/96339570?v=4"
    }),
    onPress: () => Linking.default.openURL("https://www.linkedin.com/in/mael-duret/")
  }];
  function SettingsAbout() {
    const theme = (0, _expoRouterReactNavigation.useTheme)();
    const router = (0, _expoRouter.useRouter)();
    const {
      t
    } = (0, _reactI18next.useTranslation)();
    const settingsStore = (0, _storesSettings.useSettingsStore)(state => state.personalization);
    const mutateProperty = (0, _storesSettings.useSettingsStore)(state => state.mutateProperty);
    const CommunityLinks = [{
      title: t("Settings_Donator"),
      description: t("Settings_Donator_Description"),
      leading: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
        name: "PiggyBank"
      }),
      onPress: () => Linking.default.openURL("https://ko-fi.com/thepapillonapp/leaderboard")
    }, {
      title: t("Settings_About_Discord"),
      description: t("Settings_About_Discord_Description"),
      leading: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
        name: "TextBubble"
      }),
      onPress: () => Linking.default.openURL("https://go.papillon.bzh/discord")
    }, {
      title: t("Settings_About_Issue"),
      description: t("Settings_About_Issue_Description"),
      leading: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
        name: "Info"
      }),
      onPress: () => Linking.default.openURL("https://github.com/PapillonApp/Papillon/issues")
    }];
    const DeveloperLinks = [{
      title: t("Settings_About_Crowdin"),
      description: t("Settings_About_Crowdin_Description"),
      leading: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
        name: "Globe"
      }),
      onPress: () => Linking.default.openURL("https://crowdin.com/project/papillonapp")
    }, {
      title: t("Settings_About_Github"),
      description: t("Settings_About_Github_Description"),
      leading: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
        name: "Code"
      }),
      onPress: () => Linking.default.openURL("https://github.com/PapillonApp/Papillon")
    }, {
      title: t("Settings_About_Contributors"),
      description: t("Settings_About_Contributors_Description"),
      leading: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
        name: "User"
      }),
      onPress: () => router.push("/(settings)/contributors")
    }];
    const [tapCount, setTapCount] = (0, _react.useState)(0);
    const handleVersionTap = () => {
      setTapCount(prev => prev + 1);
      if (tapCount + 1 >= 8) {
        setTapCount(0);
        if (settingsStore.showDevMode) {
          Alert.default.alert("Dev Mode", "Dev mode désactivé!");
          mutateProperty("personalization", {
            showDevMode: false
          });
        } else {
          Alert.default.alert("Dev Mode", "Dev mode activé!");
          mutateProperty("personalization", {
            showDevMode: true
          });
        }
      }
    };
    const Infos = [{
      title: t("Settings_App_Version"),
      description: packageJson.default.version,
      leading: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
        name: "Butterfly"
      }),
      onPress: handleVersionTap
    }, {
      title: t("Settings_About_Dependency_Version"),
      description: `Expo: ${packageJson.default.dependencies?.expo || "N/A"} | RN: ${packageJson.default.dependencies?.["react-native"] || "N/A"}`,
      leading: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
        name: "Code"
      })
    }];
    const insets = (0, _reactNativeSafeAreaContext.useSafeAreaInsets)();
    return /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default, {
      style: {
        flex: 1,
        backgroundColor: theme.colors.overground
      },
      safeHorizontalPadding: 20,
      contentContainerStyle: {
        paddingTop: 20,
        paddingBottom: insets.bottom + 20
      },
      contentInsetAdjustmentBehavior: "automatic",
      showsVerticalScrollIndicator: false,
      children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.View, {
        style: {
          marginBottom: 10
        },
        children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(SettingsHeader.default, {
          color: theme.dark ? "#121e2a" : "#dfebf7",
          title: t("Settings_About_Papillion_Behind"),
          description: t("Settings_About_Papillion_Behind_Description"),
          imageSource: require(_dependencyMap[17]),
          disableMargin: true,
          height: 270
        })
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Section, {
        children: Team.map((item, index) => /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Item, {
          onPress: item.onPress,
          children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Leading, {
            children: item.leading
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
            variant: "title",
            children: item.title
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
            variant: "caption",
            color: "textSecondary",
            children: item.description
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Trailing, {
            children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Icon.default, {
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
                name: "ChevronRight"
              })
            })
          })]
        }, index))
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Section, {
        children: CommunityLinks.map((item, index) => /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Item, {
          onPress: item.onPress,
          children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Leading, {
            children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Icon.default, {
              children: item.leading
            })
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
            variant: "title",
            children: item.title
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
            variant: "caption",
            color: "textSecondary",
            children: item.description
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Trailing, {
            children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Icon.default, {
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
                name: "ChevronRight"
              })
            })
          })]
        }, index))
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Section, {
        children: DeveloperLinks.map((item, index) => /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Item, {
          onPress: item.onPress,
          children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Leading, {
            children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Icon.default, {
              children: item.leading
            })
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
            variant: "title",
            children: item.title
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
            variant: "caption",
            color: "textSecondary",
            children: item.description
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Trailing, {
            children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Icon.default, {
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
                name: "ChevronRight"
              })
            })
          })]
        }, index))
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Section, {
        children: Infos.map((item, index) => /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Item, {
          onPress: item.onPress,
          children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Leading, {
            children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Icon.default, {
              children: item.leading
            })
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
            variant: "title",
            children: item.title
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
            variant: "caption",
            color: "textSecondary",
            children: item.description
          })]
        }, index))
      })]
    });
  }
},915,[1002,1000,1023,6,1105,190,310,1361,1362,1012,1135,1013,1007,1008,1139,360,97,1360]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  module.exports = {
    uri: "/assets/assets/images/about_papillon.bf5cb05e3ebcec9db3fe2cce99f7930c.png",
    width: 291,
    height: 220,
    toString() {
      return this.uri;
    }
  };
},1360,[]);