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
      return CustomProfileScreen;
    }
  });
  var _getpapillonPapicons = require(_dependencyMap[0]);
  var _expoRouterReactNavigation = require(_dependencyMap[1]);
  var _expoImagePicker = require(_dependencyMap[2]);
  var ImagePicker = _interopNamespace(_expoImagePicker);
  var _expoRouter = require(_dependencyMap[3]);
  var _react = require(_dependencyMap[4]);
  var _reactI18next = require(_dependencyMap[5]);
  var _reactNativeWebDistExportsAlert = require(_dependencyMap[6]);
  var Alert = _interopDefault(_reactNativeWebDistExportsAlert);
  var _reactNativeWebDistExportsKeyboardAvoidingView = require(_dependencyMap[7]);
  var KeyboardAvoidingView = _interopDefault(_reactNativeWebDistExportsKeyboardAvoidingView);
  require(_dependencyMap[8]);
  var _reactNativeWebDistExportsScrollView = require(_dependencyMap[9]);
  var ScrollView = _interopDefault(_reactNativeWebDistExportsScrollView);
  var _reactNativeWebDistExportsView = require(_dependencyMap[10]);
  var View = _interopDefault(_reactNativeWebDistExportsView);
  var _reactNativeSafeAreaContext = require(_dependencyMap[11]);
  var _componentsOnboardingOnboardingInput = require(_dependencyMap[12]);
  var OnboardingInput = _interopDefault(_componentsOnboardingOnboardingInput);
  var _storesAccount = require(_dependencyMap[13]);
  var _uiComponentsAvatar = require(_dependencyMap[14]);
  var Avatar = _interopDefault(_uiComponentsAvatar);
  var _uiComponentsButton = require(_dependencyMap[15]);
  var Button = _interopDefault(_uiComponentsButton);
  var _uiComponentsIcon = require(_dependencyMap[16]);
  var Icon = _interopDefault(_uiComponentsIcon);
  var _uiComponentsNativeHeader = require(_dependencyMap[17]);
  var _uiComponentsTypography = require(_dependencyMap[18]);
  var Typography = _interopDefault(_uiComponentsTypography);
  var _utilsChatsInitials = require(_dependencyMap[19]);
  var _uiComponentsActionMenu = require(_dependencyMap[20]);
  var ActionMenu = _interopDefault(_uiComponentsActionMenu);
  var _reactJsxRuntime = require(_dependencyMap[21]);
  function CustomProfileScreen() {
    const {
      t
    } = (0, _reactI18next.useTranslation)();
    const store = _storesAccount.useAccountStore.getState();
    const accounts = (0, _storesAccount.useAccountStore)(state => state.accounts);
    const lastUsedAccount = (0, _storesAccount.useAccountStore)(state => state.lastUsedAccount);
    const account = accounts.find(a => a.id === lastUsedAccount);
    const [firstName, setFirstName] = (0, _react.useState)(account?.firstName ?? "");
    const [lastName, setLastName] = (0, _react.useState)(account?.lastName ?? "");
    const [profilePictureUrl, setProfilePictureUrl] = (0, _react.useState)(account?.customisation?.profilePicture ? `data:image/png;base64,${account.customisation.profilePicture}` : null);
    (0, _react.useEffect)(() => {
      if (account) {
        setFirstName(account.firstName);
        setLastName(account.lastName);
        setProfilePictureUrl(account.customisation?.profilePicture ? `data:image/png;base64,${account.customisation.profilePicture}` : null);
      }
    }, [account]);

    // Saved however the screen is left: the header button, the Android system
    // back or a swipe-to-dismiss, which skip any button handler.
    const nameRef = (0, _react.useRef)({
      firstName,
      lastName
    });
    nameRef.current = {
      firstName,
      lastName
    };
    (0, _react.useEffect)(() => () => {
      _storesAccount.useAccountStore.getState().setAccountName(lastUsedAccount, nameRef.current.firstName, nameRef.current.lastName);
    }, [lastUsedAccount]);
    const insets = (0, _reactNativeSafeAreaContext.useSafeAreaInsets)();
    const updateProfilePictureFromLibrary = async () => {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        base64: true
      });
      if (!result.canceled) {
        const b64 = result.assets[0].base64 ?? "";
        store.setAccountProfilePicture(lastUsedAccount, b64);
      }
    };
    const updateProfilePictureFromService = async () => {
      Alert.default.alert(t("Feature_Soon"), "Cette fonctionnalité n'est pas encore disponible, mais elle le sera dans une prochaine mise à jour.", [{
        text: "OK"
      }]);
    };
    const {
      colors
    } = (0, _expoRouterReactNavigation.useTheme)();
    const height = (0, _expoRouterReactNavigation.useHeaderHeight)();
    return /*#__PURE__*/(0, _reactJsxRuntime.jsx)(KeyboardAvoidingView.default, {
      behavior: "position",
      keyboardVerticalOffset: -insets.top * 3.2,
      style: {
        flex: 1
      },
      children: /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(ScrollView.default, {
        contentInsetAdjustmentBehavior: "automatic",
        style: {
          height: "100%"
        },
        children: [/*#__PURE__*/(0, _reactJsxRuntime.jsxs)(View.default, {
          style: {
            paddingHorizontal: 50,
            alignItems: "center",
            gap: 15,
            paddingTop: 20
          },
          children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Avatar.default, {
            size: 117,
            initials: (0, _utilsChatsInitials.getInitials)(`${firstName} ${lastName}`),
            imageUrl: profilePictureUrl || undefined
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(ActionMenu.default, {
            actions: [{
              id: 'photo_library',
              title: t("Button_Change_ProfilePicture_FromLibrary"),
              papicon: 'gallery',
              image: undefined,
              imageColor: colors.text
            }, {
              id: 'from_service',
              title: t("Button_Change_ProfilePicture_FromService"),
              papicon: 'crown',
              image: undefined,
              imageColor: colors.text
            }, {
              id: 'remove_photo',
              title: t("Button_Change_ProfilePicture_Remove"),
              attributes: {
                destructive: true
              },
              papicon: 'trash',
              image: undefined,
              imageColor: "#FF0000"
            }],
            onPressAction: e => {
              switch (e.nativeEvent.event) {
                case 'photo_library':
                  updateProfilePictureFromLibrary();
                  break;
                case 'from_service':
                  updateProfilePictureFromService();
                  break;
                case 'remove_photo':
                  store.setAccountProfilePicture(lastUsedAccount, "");
                  break;
              }
            },
            children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Button.default, {
              inline: true,
              size: "small",
              icon: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
                name: "Camera"
              }),
              title: t("Button_Change_ProfilePicture")
            })
          })]
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(View.default, {
          style: {
            paddingHorizontal: 20,
            paddingTop: 30,
            gap: 15
          },
          children: /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(View.default, {
            style: {
              gap: 10
            },
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              color: "secondary",
              children: "Pr\xE9nom"
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(OnboardingInput.default, {
              placeholder: "Prénom",
              text: firstName,
              setText: setFirstName,
              icon: "Font",
              inputProps: {}
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              color: "secondary",
              children: "Nom"
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(OnboardingInput.default, {
              placeholder: "Nom",
              text: lastName,
              setText: setLastName,
              icon: "Bold",
              inputProps: {}
            })]
          })
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_uiComponentsNativeHeader.NativeHeaderSide, {
          side: "Left",
          children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_uiComponentsNativeHeader.NativeHeaderPressable, {
            onPressIn: () => _expoRouter.router.back(),
            children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Icon.default, {
              papicon: true,
              size: 26,
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
                name: "ArrowLeft"
              })
            })
          })
        })]
      })
    });
  }
},867,[1002,1000,1227,1023,6,1105,190,326,193,222,198,360,1228,1022,1135,1024,1013,1214,1110,1139,1219,97]);