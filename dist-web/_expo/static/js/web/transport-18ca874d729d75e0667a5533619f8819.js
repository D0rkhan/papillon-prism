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
      return TransportView;
    }
  });
  var _getpapillonPapicons = require(_dependencyMap[0]);
  var _expoRouterReactNavigation = require(_dependencyMap[1]);
  var _react = require(_dependencyMap[2]);
  var React = _interopNamespace(_react);
  var _reactI18next = require(_dependencyMap[3]);
  var _reactNativeWebDistExportsImage = require(_dependencyMap[4]);
  var Image = _interopDefault(_reactNativeWebDistExportsImage);
  var _reactNativeWebDistExportsModal = require(_dependencyMap[5]);
  var Modal = _interopDefault(_reactNativeWebDistExportsModal);
  var _componentsSettingsHeader = require(_dependencyMap[6]);
  var SettingsHeader = _interopDefault(_componentsSettingsHeader);
  var _constantsAvailableTransportServices = require(_dependencyMap[7]);
  var _storesAccount = require(_dependencyMap[8]);
  var _uiNewList = require(_dependencyMap[9]);
  var List = _interopDefault(_uiNewList);
  var _uiNewTypography = require(_dependencyMap[10]);
  var Typography = _interopDefault(_uiNewTypography);
  var _appModalsAddress = require(_dependencyMap[11]);
  var _reactNativeSafeAreaContext = require(_dependencyMap[12]);
  var _reactJsxRuntime = require(_dependencyMap[13]);
  function TransportView() {
    const accountStore = (0, _storesAccount.useAccountStore)();
    const accounts = (0, _storesAccount.useAccountStore)(state => state.accounts);
    const lastUsedAccount = (0, _storesAccount.useAccountStore)(state => state.lastUsedAccount);
    const {
      transport
    } = accounts.find(a => a.id === lastUsedAccount);
    const theme = (0, _expoRouterReactNavigation.useTheme)();
    const {
      t
    } = (0, _reactI18next.useTranslation)();
    const [transportEnabled, setTransportEnabled] = React.useState(transport?.enabled ?? false);
    const [showAddressSelect, setShowAddressSelect] = React.useState(false);
    const [addressSelectCanBeCurrentLocation, setAddressSelectCanBeCurrentLocation] = React.useState(false);
    const openAddressSelect = currentLocationEnabled => {
      setAddressSelectCanBeCurrentLocation(currentLocationEnabled);
      setShowAddressSelect(true);
    };
    const formatAddress = address => {
      if (address === undefined) {
        return t("Settings_Transport_Address_Not_Set");
      }
      if (address.firstTitle === "current_location") {
        return t("Settings_Transport_Current_Position");
      }
      return `${address.firstTitle}, ${address.secondTitle}`;
    };
    (0, _react.useEffect)(() => accountStore.setTransportEnabled(transportEnabled), [transportEnabled]);
    const insets = (0, _reactNativeSafeAreaContext.useSafeAreaInsets)();
    return /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default, {
      style: {
        flex: 1,
        backgroundColor: theme.colors.overground
      },
      safeHorizontalPadding: 20,
      contentContainerStyle: {
        paddingTop: 16,
        paddingBottom: 20
      },
      contentInsetAdjustmentBehavior: "automatic",
      children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.View, {
        style: {
          marginBottom: 15
        },
        children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(SettingsHeader.default, {
          color: theme.dark ? "#231A0B" : "#FCF3E4",
          title: t("Settings_Transport_Banner_Title"),
          description: t("Settings_Transport_Banner_Description"),
          iconName: "Bus",
          imageSource: require(_dependencyMap[14]),
          showSwitch: true,
          switchColor: "#E8901C",
          switchValue: transportEnabled,
          onSwitchChange: setTransportEnabled
        })
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.SectionTitle, {
        children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Label, {
          children: t("Settings_Transport_Address_Title")
        })
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Section, {
        id: "transport-addresses",
        children: [/*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Item, {
          onPress: () => {
            if (transportEnabled) {
              openAddressSelect(true);
            }
          },
          style: {
            opacity: transportEnabled ? 1 : 0.5
          },
          children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Leading, {
            children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
              name: "Home",
              fill: theme.colors.text,
              opacity: 0.7
            })
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
            numberOfLines: 1,
            children: t("Settings_Transport_Address_Home_Title")
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
            color: "textSecondary",
            numberOfLines: 1,
            children: formatAddress(transport?.homeAddress)
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Trailing, {
            children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
              name: "ChevronRight",
              fill: theme.colors.text,
              opacity: 0.5
            })
          })]
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Item, {
          onPress: () => {
            if (transportEnabled) {
              openAddressSelect(false);
            }
          },
          style: {
            opacity: transportEnabled ? 1 : 0.5
          },
          children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Leading, {
            children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
              name: "Grades",
              fill: theme.colors.text,
              opacity: 0.7
            })
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
            numberOfLines: 1,
            children: t("Settings_Transport_Address_School_Title")
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
            color: "textSecondary",
            numberOfLines: 1,
            children: formatAddress(transport?.schoolAddress)
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Trailing, {
            children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
              name: "ChevronRight",
              fill: theme.colors.text,
              opacity: 0.5
            })
          })]
        })]
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.View, {
        style: {
          marginVertical: 10
        },
        children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
          variant: "caption",
          color: "textSecondary",
          children: t("Settings_Transport_Address_Description")
        })
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.SectionTitle, {
        children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Label, {
          children: t("Settings_Transport_Default_Application_Title")
        })
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Section, {
        children: _constantsAvailableTransportServices.AvailableTransportServices.map(service => /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Item, {
          onPress: () => {
            if (transportEnabled) {
              accountStore.setTransportService(service.id);
            }
          },
          style: {
            opacity: transportEnabled ? 1 : 0.5
          },
          children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Leading, {
            children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Image.default, {
              source: service.icon,
              style: {
                width: 28,
                height: 28,
                borderRadius: 16
              }
            })
          }), (transport?.defaultApp ?? "google_maps") === service.id && /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Trailing, {
            children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
              name: "Check",
              fill: "#E8901C"
            })
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
            numberOfLines: 1,
            variant: "title",
            children: service.name
          })]
        }, service.id))
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.View, {
        children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Modal.default, {
          presentationStyle: "pageSheet",
          visible: showAddressSelect,
          allowSwipeDismissal: true,
          onRequestClose: () => setShowAddressSelect(false),
          animationType: "slide",
          children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_appModalsAddress.AddressModal, {
            canUseCurrentLocation: addressSelectCanBeCurrentLocation,
            onCancel: () => setShowAddressSelect(false),
            onConfirm: item => {
              if (addressSelectCanBeCurrentLocation) {
                // Home
                accountStore.setTransportHomeAddress(item);
              } else {
                // School
                accountStore.setTransportSchoolAddress(item);
              }
              setShowAddressSelect(false);
            }
          })
        })
      })]
    });
  }
},928,[1002,1000,6,1105,267,327,1361,1377,1022,1007,1008,864,360,97,1376]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  module.exports = {
    uri: "/assets/assets/images/transport.2988a2b0f8f997ba7b86158baaaa8f25.png",
    width: 672,
    height: 272,
    toString() {
      return this.uri;
    }
  };
},1376,[]);