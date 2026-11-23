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
      return AccountsView;
    }
  });
  var _getpapillonPapicons = require(_dependencyMap[0]);
  var _expoRouter = require(_dependencyMap[1]);
  require(_dependencyMap[2]);
  var _reactNativeWebDistExportsAlert = require(_dependencyMap[3]);
  var Alert = _interopDefault(_reactNativeWebDistExportsAlert);
  var _reactNativeWebDistExportsImage = require(_dependencyMap[4]);
  var Image = _interopDefault(_reactNativeWebDistExportsImage);
  var _databaseUseBalance = require(_dependencyMap[5]);
  var _servicesShared = require(_dependencyMap[6]);
  var _storesAccount = require(_dependencyMap[7]);
  var _uiComponentsAvatar = require(_dependencyMap[8]);
  var Avatar = _interopDefault(_uiComponentsAvatar);
  var _uiComponentsIcon = require(_dependencyMap[9]);
  var Icon = _interopDefault(_uiComponentsIcon);
  var _uiNewList = require(_dependencyMap[10]);
  var List = _interopDefault(_uiNewList);
  var _uiNewTypography = require(_dependencyMap[11]);
  var Typography = _interopDefault(_uiNewTypography);
  var _utilsChatsInitials = require(_dependencyMap[12]);
  var _utilsFormatFormatSchoolName = require(_dependencyMap[13]);
  var _utilsServicesHelper = require(_dependencyMap[14]);
  var _uiComponentsActionMenu = require(_dependencyMap[15]);
  var ActionMenu = _interopDefault(_uiComponentsActionMenu);
  var _expoRouterReactNavigation = require(_dependencyMap[16]);
  var _reactJsxRuntime = require(_dependencyMap[17]);
  function AccountsView() {
    const {
      colors
    } = (0, _expoRouterReactNavigation.useTheme)();
    const accounts = (0, _storesAccount.useAccountStore)(state => state.accounts);
    const lastUsedAccount = (0, _storesAccount.useAccountStore)(state => state.lastUsedAccount);
    const account = accounts.find(a => a.id === lastUsedAccount);
    const store = _storesAccount.useAccountStore.getState();
    const services = account?.services;
    const askDeleteAccount = targetAccount => {
      Alert.default.alert("Supprimer le compte", `${targetAccount.firstName} ${targetAccount.lastName}`, [{
        text: "Annuler",
        style: "cancel"
      }, {
        text: "Supprimer",
        style: "destructive",
        onPress: () => {
          store.removeAccount(targetAccount);
        }
      }]);
    };
    const askDeleteService = (serviceId, serviceName) => {
      Alert.default.alert(serviceName, "Supprimer ce service ?", [{
        text: "Annuler",
        style: "cancel"
      }, {
        text: "Supprimer",
        style: "destructive",
        onPress: () => {
          store.removeServiceFromAccount(serviceId);
          (0, _databaseUseBalance.removeBalanceFromDatabase)(serviceId);
          const manager = (0, _servicesShared.getManager)();
          if (manager) {
            manager.removeService(serviceId);
          }
        }
      }]);
    };
    return /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default, {
      style: {
        flex: 1,
        backgroundColor: colors.overground
      },
      contentInsetAdjustmentBehavior: "automatic",
      safeHorizontalPadding: 16,
      contentContainerStyle: {
        paddingVertical: 16,
        gap: 16
      },
      children: [/*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Section, {
        children: [/*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.SectionTitle, {
          children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Icon.default, {
            size: 20,
            opacity: 0.6,
            children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
              name: "User"
            })
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Label, {
            children: "Profils utilisateur"
          })]
        }), accounts.map(account => /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Item, {
          children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Leading, {
            children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Avatar.default, {
              initials: (0, _utilsChatsInitials.getInitials)(account.firstName + " " + account.lastName),
              imageUrl: account.customisation?.profilePicture ? "data:image/png;base64," + account.customisation?.profilePicture : undefined,
              size: 38
            })
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(Typography.default, {
            variant: "title",
            children: [account.firstName, " ", account.lastName]
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(Typography.default, {
            variant: "body2",
            color: "textSecondary",
            children: [account.className ? account.className + " " : "", (0, _utilsFormatFormatSchoolName.formatSchoolName)(account.schoolName ?? "")]
          }), account.id === lastUsedAccount && /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
            color: "primary",
            variant: "body2",
            children: "Compte actuellement utilis\xE9"
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Trailing, {
            children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(ActionMenu.default, {
              actions: [{
                id: "delete",
                title: "Supprimer",
                attributes: {
                  destructive: true
                }
              }],
              onPressAction: event => {
                if (event.nativeEvent.event === "delete") {
                  askDeleteAccount(account);
                }
              },
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Icon.default, {
                opacity: 0.7,
                children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
                  name: "Dots"
                })
              })
            })
          })]
        }, account.id)), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Item, {
          onPress: () => _expoRouter.router.push({
            pathname: "/(onboarding)/ageSelection",
            params: {
              action: "addService"
            }
          }),
          children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Leading, {
            children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Icon.default, {
              opacity: 0.5,
              style: {
                marginHorizontal: 7
              },
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
                name: "add"
              })
            })
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
            variant: "title",
            color: "textSecondary",
            children: "Nouveau compte"
          })]
        })]
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Section, {
        children: [/*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.SectionTitle, {
          children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Icon.default, {
            size: 20,
            opacity: 0.6,
            children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
              name: "Card"
            })
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Label, {
            children: "Services et cartes"
          })]
        }), services?.map(service => /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Item, {
          children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Leading, {
            children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Image.default, {
              source: (0, _utilsServicesHelper.getServiceLogo)(service.serviceId),
              style: {
                width: 38,
                height: 38,
                borderRadius: 4
              }
            })
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
            variant: "title",
            children: (0, _utilsServicesHelper.getServiceName)(service.serviceId)
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(Typography.default, {
            variant: "body2",
            color: "textSecondary",
            children: ["Connect\xE9 le", " ", new Date(service.createdAt).toLocaleDateString(undefined, {
              day: "2-digit",
              month: "short",
              year: "numeric"
            })]
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Trailing, {
            children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(ActionMenu.default, {
              actions: [{
                id: "delete",
                title: "Supprimer",
                attributes: {
                  destructive: true
                }
              }],
              onPressAction: event => {
                if (event.nativeEvent.event === "delete") {
                  askDeleteService(service.id, (0, _utilsServicesHelper.getServiceName)(service.serviceId));
                }
              },
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Icon.default, {
                opacity: 0.7,
                children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
                  name: "Dots"
                })
              })
            })
          })]
        }, service.id)), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Item, {
          onPress: () => _expoRouter.router.navigate({
            pathname: "/(onboarding)/restaurants/method",
            params: {
              action: "addService"
            }
          }),
          children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Leading, {
            children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Icon.default, {
              opacity: 0.5,
              style: {
                marginHorizontal: 7
              },
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
                name: "add"
              })
            })
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
            variant: "title",
            color: "textSecondary",
            children: "Ajouter un nouveau service"
          })]
        })]
      })]
    });
  }
},916,[1002,1023,6,190,267,1363,1118,1022,1135,1013,1007,1008,1139,1316,1115,1219,1000,97]);