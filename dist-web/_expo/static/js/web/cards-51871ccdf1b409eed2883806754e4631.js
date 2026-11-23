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
      return CardView;
    }
  });
  var _getpapillonPapicons = require(_dependencyMap[0]);
  var _expoRouterReactNavigation = require(_dependencyMap[1]);
  var _expoRouter = require(_dependencyMap[2]);
  var _reactNativeWebDistExportsAlert = require(_dependencyMap[3]);
  var Alert = _interopDefault(_reactNativeWebDistExportsAlert);
  var _reactNativeWebDistExportsImage = require(_dependencyMap[4]);
  var Image = _interopDefault(_reactNativeWebDistExportsImage);
  var _reactNativeWebDistExportsScrollView = require(_dependencyMap[5]);
  var ScrollView = _interopDefault(_reactNativeWebDistExportsScrollView);
  var _reactNativeWebDistExportsView = require(_dependencyMap[6]);
  var View = _interopDefault(_reactNativeWebDistExportsView);
  var _storesAccount = require(_dependencyMap[7]);
  var _storesAccountTypes = require(_dependencyMap[8]);
  var _uiComponentsButton = require(_dependencyMap[9]);
  var Button = _interopDefault(_uiComponentsButton);
  var _uiComponentsIcon = require(_dependencyMap[10]);
  var Icon = _interopDefault(_uiComponentsIcon);
  var _uiComponentsItem = require(_dependencyMap[11]);
  var Item = _interopDefault(_uiComponentsItem);
  var _uiComponentsList = require(_dependencyMap[12]);
  var List = _interopDefault(_uiComponentsList);
  var _uiComponentsStack = require(_dependencyMap[13]);
  var Stack = _interopDefault(_uiComponentsStack);
  var _uiComponentsTypography = require(_dependencyMap[14]);
  var Typography = _interopDefault(_uiComponentsTypography);
  var _componentsSettingsHeader = require(_dependencyMap[15]);
  var SettingsHeader = _interopDefault(_componentsSettingsHeader);
  var _utilsServicesHelper = require(_dependencyMap[16]);
  var _reactI18next = require(_dependencyMap[17]);
  var _databaseUseBalance = require(_dependencyMap[18]);
  var _servicesShared = require(_dependencyMap[19]);
  var _utilsI18n = require(_dependencyMap[20]);
  var i18n = _interopDefault(_utilsI18n);
  var _uiComponentsSafeHorizontalView = require(_dependencyMap[21]);
  var SafeHorizontalView = _interopDefault(_uiComponentsSafeHorizontalView);
  var _reactJsxRuntime = require(_dependencyMap[22]);
  /* eslint-disable @typescript-eslint/no-require-imports */

  function CardView() {
    const router = (0, _expoRouter.useRouter)();
    const accounts = (0, _storesAccount.useAccountStore)(state => state.accounts);
    const lastUsedAccount = (0, _storesAccount.useAccountStore)(state => state.lastUsedAccount);
    const account = accounts.find(a => a.id === lastUsedAccount);
    const selfCompatible = account?.services.filter(service => {
      if (service.serviceId === _storesAccountTypes.Services.ECOLEDIRECTE) {
        return (0, _utilsServicesHelper.isSelfModuleEnabledED)(service.additionals);
      }
      return [_storesAccountTypes.Services.TURBOSELF, _storesAccountTypes.Services.ARD, _storesAccountTypes.Services.IZLY].includes(service.serviceId);
    });
    const theme = (0, _expoRouterReactNavigation.useTheme)();
    const {
      colors
    } = theme;
    const {
      t
    } = (0, _reactI18next.useTranslation)();
    return /*#__PURE__*/(0, _reactJsxRuntime.jsx)(ScrollView.default, {
      contentContainerStyle: {
        paddingTop: 82,
        paddingBottom: 20
      },
      children: /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(SafeHorizontalView.default, {
        base: 20,
        style: {
          gap: 15
        },
        children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(SettingsHeader.default, {
          color: theme.dark ? "#00153380" : "#D9E6FA",
          title: t("Settings_Cards_Banner_Title"),
          description: t("Settings_Cards_Banner_Description"),
          iconName: "Card",
          imageSource: require(_dependencyMap[23])
        }), (selfCompatible ?? []).length > 0 ? /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_reactJsxRuntime.Fragment, {
          children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
            style: {
              opacity: 0.5
            },
            children: "Mes cartes"
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(View.default, {
            style: {
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 0
              },
              shadowOpacity: 0.15,
              shadowRadius: 3.3,
              elevation: 4
            },
            children: /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(ScrollView.default, {
              scrollEnabled: false,
              children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default, {
                children: selfCompatible?.map(service => {
                  return /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(Item.default, {
                    onPress: () => {
                      if (service.serviceId === _storesAccountTypes.Services.ECOLEDIRECTE) {
                        Alert.default.alert("Tu ne peux pas supprimer cette carte", "Cette carte est liée à ton service scolaire.");
                        return;
                      }
                      Alert.default.alert((0, _utilsServicesHelper.getServiceName)(service.serviceId), "Que souhaitez-vous faire ?", [{
                        text: "Supprimer",
                        style: "destructive",
                        onPress: () => {
                          _storesAccount.useAccountStore.getState().removeServiceFromAccount(service.id);
                          (0, _databaseUseBalance.removeBalanceFromDatabase)(service.id);
                          const manager = (0, _servicesShared.getManager)();
                          if (manager) {
                            manager.removeService(service.id);
                          }
                        }
                      }, {
                        text: "Annuler",
                        style: "cancel"
                      }]);
                    },
                    children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_uiComponentsItem.Leading, {
                      children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Image.default, {
                        source: (0, _utilsServicesHelper.getServiceBackground)(service.serviceId),
                        style: {
                          width: 60,
                          height: 40,
                          borderRadius: 4
                        }
                      })
                    }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_uiComponentsItem.Trailing, {
                      children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
                        name: "ChevronRight",
                        fill: colors.text,
                        opacity: 0.5
                      })
                    }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
                      children: (0, _utilsServicesHelper.getServiceName)(service.serviceId)
                    }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(Typography.default, {
                      style: {
                        opacity: 0.5
                      },
                      children: ["Ajout\xE9e le ", new Date(service.createdAt).toLocaleDateString(i18n.default.language, {
                        day: "2-digit",
                        month: "2-digit"
                      })]
                    })]
                  }, service.id);
                })
              }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Button.default, {
                color: "blue",
                title: "Ajouter",
                icon: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
                  name: "Plus"
                }),
                onPress: () => {
                  router.push({
                    pathname: "/(onboarding)/restaurants/method",
                    params: {
                      action: "addService"
                    }
                  });
                }
              })]
            })
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
            variant: "caption",
            style: {
              opacity: 0.5
            },
            children: t("Feature_Add_Card")
          })]
        }) : /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(Stack.default, {
          hAlign: "center",
          vAlign: "center",
          margin: 16,
          gap: 16,
          children: [/*#__PURE__*/(0, _reactJsxRuntime.jsxs)(View.default, {
            style: {
              alignItems: "center"
            },
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Icon.default, {
              papicon: true,
              opacity: 0.5,
              size: 32,
              style: {
                marginBottom: 3
              },
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
                name: "Card"
              })
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "h4",
              color: "text",
              align: "center",
              children: t("Settings_Cards_None_Title")
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "body2",
              color: "secondary",
              align: "center",
              children: t("Settings_Cards_None_Description")
            })]
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Button.default, {
            color: "blue",
            title: t("Settings_Cards_Add_Button"),
            icon: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
              name: "Plus"
            }),
            onPress: () => {
              router.push({
                pathname: "/(onboarding)/restaurants/method",
                params: {
                  action: "addService"
                }
              });
            }
          })]
        })]
      })
    });
  }
},917,[1002,1000,1023,190,267,222,198,1022,1109,1024,1013,1123,1122,1005,1110,1361,1115,1105,1363,1118,1127,1111,97,1364]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  module.exports = {
    uri: "/assets/assets/images/cards.46639385be4e4c740f04e751a3ba00a5.png",
    width: 159,
    height: 93,
    toString() {
      return this.uri;
    }
  };
},1364,[]);