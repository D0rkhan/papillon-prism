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
      return ConsentScreen;
    }
  });
  var _react = require(_dependencyMap[0]);
  var _reactNativeWebDistExportsImage = require(_dependencyMap[1]);
  var Image = _interopDefault(_reactNativeWebDistExportsImage);
  var _reactNativeWebDistExportsLinking = require(_dependencyMap[2]);
  var Linking = _interopDefault(_reactNativeWebDistExportsLinking);
  var _reactNativeWebDistExportsScrollView = require(_dependencyMap[3]);
  var ScrollView = _interopDefault(_reactNativeWebDistExportsScrollView);
  var _reactNativeWebDistExportsStyleSheet = require(_dependencyMap[4]);
  var StyleSheet = _interopDefault(_reactNativeWebDistExportsStyleSheet);
  var _reactNativeWebDistExportsView = require(_dependencyMap[5]);
  var View = _interopDefault(_reactNativeWebDistExportsView);
  var _uiComponentsStack = require(_dependencyMap[6]);
  var Stack = _interopDefault(_uiComponentsStack);
  var _uiComponentsTypography = require(_dependencyMap[7]);
  var Typography = _interopDefault(_uiComponentsTypography);
  var _utilsI18n = require(_dependencyMap[8]);
  var i18n = _interopDefault(_utilsI18n);
  var _getpapillonPapicons = require(_dependencyMap[9]);
  var _expoRouterReactNavigation = require(_dependencyMap[10]);
  var _expoLinearGradient = require(_dependencyMap[11]);
  var _expoRouter = require(_dependencyMap[12]);
  var _reactNativeSafeAreaContext = require(_dependencyMap[13]);
  var _uiComponentsButton = require(_dependencyMap[14]);
  var Button = _interopDefault(_uiComponentsButton);
  var _uiComponentsIcon = require(_dependencyMap[15]);
  var Icon = _interopDefault(_uiComponentsIcon);
  var _utilsLoggerConsent = require(_dependencyMap[16]);
  var _uiNewList = require(_dependencyMap[17]);
  var _reactJsxRuntime = require(_dependencyMap[18]);
  const t = i18n.default.t.bind(i18n.default);
  function ConsentScreen() {
    const insets = (0, _reactNativeSafeAreaContext.useSafeAreaInsets)();
    const router = (0, _expoRouter.useRouter)();
    const [currentConsent, setCurrentConsent] = (0, _react.useState)(null);
    const theme = (0, _expoRouterReactNavigation.useTheme)();
    const {
      colors
    } = theme;
    (0, _react.useEffect)(() => {
      (0, _utilsLoggerConsent.checkConsent)().then(consent => {
        if (consent.given) {
          setCurrentConsent(consent.level);
        }
      });
    }, []);
    const consents = [{
      key: "advanced",
      title: t("Consent_Advanced_Title"),
      description: t("Consent_Advanced_Description"),
      icon: "emoji",
      color: "#C50083"
    }, {
      key: "essentials",
      title: t("Consent_Required_Title"),
      description: t("Consent_Required_Description"),
      icon: "ghost",
      color: "#0080C5"
    }, {
      key: "none",
      title: t("Consent_None_Title"),
      description: t("Consent_None_Description"),
      icon: "cross",
      color: "#5A5A5A"
    }];
    const accent = (0, _react.useMemo)(() => {
      return consents.find(c => c.key === currentConsent)?.color || theme.colors.primary;
    }, [currentConsent, theme]);
    const saveConsentState = async consent => {
      await (0, _utilsLoggerConsent.setConsent)(consent);
      router.back();
    };
    return /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(View.default, {
      style: {
        flex: 1
      },
      children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoLinearGradient.LinearGradient, {
        colors: [accent, colors.background],
        style: {
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 400,
          zIndex: -1,
          opacity: 0.2
        }
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(ScrollView.default, {
        style: {
          flex: 1
        },
        contentContainerStyle: {
          padding: 16,
          paddingTop: insets.top + 40,
          gap: 16
        },
        showsVerticalScrollIndicator: false,
        children: [/*#__PURE__*/(0, _reactJsxRuntime.jsxs)(Stack.default, {
          gap: 16,
          style: {
            marginBottom: 8
          },
          children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Image.default, {
            source: require(_dependencyMap[19]),
            style: {
              width: 98,
              height: 72,
              alignSelf: "center"
            }
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
            variant: "h2",
            color: "text",
            align: "center",
            style: {
              width: "100%"
            },
            children: t("Consent_Title")
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
            variant: "body1",
            color: "secondary",
            align: "center",
            children: t("Consent_Intro1")
          })]
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(View.default, {
          style: {
            gap: 12
          },
          children: consents.map(consent => /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_uiNewList.ListTouchable, {
            style: {
              width: "100%"
            },
            onPress: () => {
              setCurrentConsent(consent.key);
            },
            children: /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(View.default, {
              style: {
                paddingHorizontal: 16,
                paddingVertical: 13,
                flexDirection: "row",
                alignItems: "center",
                overflow: "hidden",
                gap: 16,
                borderColor: currentConsent === consent.key ? consent.color : colors.border,
                borderWidth: 1,
                borderRadius: 25,
                borderCurve: 'continuous',
                backgroundColor: currentConsent === consent.key ? consent.color + "20" : colors.background
              },
              children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
                name: consent.icon,
                size: 32,
                color: currentConsent !== consent.key ? colors.text + "50" : consent.color
              }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(View.default, {
                style: {
                  gap: 1,
                  flex: 1,
                  width: "100%"
                },
                children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
                  variant: "title",
                  color: "text",
                  children: consent.title
                }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
                  variant: "caption",
                  color: "secondary",
                  children: consent.description
                })]
              })]
            })
          }, consent.key))
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(Stack.default, {
          style: {
            paddingLeft: 10,
            marginTop: 10
          },
          gap: 15,
          children: [/*#__PURE__*/(0, _reactJsxRuntime.jsxs)(Stack.default, {
            direction: "horizontal",
            gap: 10,
            vAlign: "center",
            hAlign: "center",
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Icon.default, {
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
                name: "check",
                color: colors.text + "80"
              })
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "body1",
              style: {
                flex: 1
              },
              color: "secondary",
              children: t("Consent_Arg1")
            })]
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(Stack.default, {
            direction: "horizontal",
            gap: 10,
            vAlign: "center",
            hAlign: "center",
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Icon.default, {
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
                name: "link",
                size: 24,
                color: colors.text + "80"
              })
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "body1",
              style: {
                flex: 1
              },
              color: "secondary",
              children: t("Consent_Arg2")
            })]
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(Stack.default, {
            direction: "horizontal",
            gap: 10,
            vAlign: "center",
            hAlign: "center",
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Icon.default, {
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
                name: "lock",
                size: 24,
                color: colors.text + "80"
              })
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "body1",
              style: {
                flex: 1
              },
              color: "secondary",
              children: t("Consent_Arg3")
            })]
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
            onPress: () => Linking.default.openURL("https://docs.papillon.bzh/privacy-policy"),
            variant: "caption",
            color: accent,
            align: "center",
            style: {
              textDecorationLine: "underline",
              marginTop: 10
            },
            children: t("Consent_PrivacyPolicy")
          })]
        })]
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(View.default, {
        style: {
          padding: 16,
          paddingBottom: insets.bottom + 12,
          borderTopWidth: StyleSheet.default.hairlineWidth,
          borderColor: "#888888",
          gap: 12
        },
        children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Button.default, {
          disabled: currentConsent === null,
          onPress: () => {
            if (currentConsent) {
              saveConsentState(currentConsent);
            }
          },
          inline: true,
          style: {
            backgroundColor: currentConsent === null ? colors.text + "50" : accent
          },
          icon: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
            name: currentConsent === "none" ? "cross" : "check",
            color: "#FFFFFF"
          }),
          title: currentConsent === "none" ? t("Consent_Refuse") : t("Consent_Accept")
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
          variant: "caption",
          color: "secondary",
          align: "center",
          children: t("Consent_ChangeMind")
        })]
      })]
    });
  }
  ;
},996,[6,267,310,222,117,198,1005,1110,1127,1002,1000,1113,1023,360,1024,1013,1429,1007,97,1479]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  module.exports = {
    uri: "/assets/assets/images/papillon_heart.cc313579430420ddbe4cb314603cc08a.png",
    width: 298,
    height: 214,
    toString() {
      return this.uri;
    }
  };
},1479,[]);