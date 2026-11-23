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
  var _storesAccount = require(_dependencyMap[0]);
  var _storesSettings = require(_dependencyMap[1]);
  var _uiComponentsStack = require(_dependencyMap[2]);
  var Stack = _interopDefault(_uiComponentsStack);
  var _uiNewButton = require(_dependencyMap[3]);
  var Button = _interopDefault(_uiNewButton);
  var _uiNewDivider = require(_dependencyMap[4]);
  var Divider = _interopDefault(_uiNewDivider);
  var _uiNewTypography = require(_dependencyMap[5]);
  var Typography = _interopDefault(_uiNewTypography);
  var _getpapillonPapicons = require(_dependencyMap[6]);
  var _expoRouter = require(_dependencyMap[7]);
  var _react = require(_dependencyMap[8]);
  var _reactI18next = require(_dependencyMap[9]);
  var _reactNativeWebDistExportsAlert = require(_dependencyMap[10]);
  var Alert = _interopDefault(_reactNativeWebDistExportsAlert);
  var _reactNativeWebDistExportsImage = require(_dependencyMap[11]);
  var Image = _interopDefault(_reactNativeWebDistExportsImage);
  require(_dependencyMap[12]);
  var _reactNativeWebDistExportsTouchableOpacity = require(_dependencyMap[13]);
  var TouchableOpacity = _interopDefault(_reactNativeWebDistExportsTouchableOpacity);
  var _reactNativeWebDistExportsView = require(_dependencyMap[14]);
  var View = _interopDefault(_reactNativeWebDistExportsView);
  var _reactNativeSafeAreaContext = require(_dependencyMap[15]);
  var _expoImagePicker = require(_dependencyMap[16]);
  var ImagePicker = _interopNamespace(_expoImagePicker);
  var _uiComponentsDynamic = require(_dependencyMap[17]);
  var _uiComponentsActivityIndicator = require(_dependencyMap[18]);
  var ActivityIndicator = _interopDefault(_uiComponentsActivityIndicator);
  var _utilsColors = require(_dependencyMap[19]);
  var _reactNativeReanimated = require(_dependencyMap[20]);
  var _reactJsxRuntime = require(_dependencyMap[21]);
  const WelcomeModal = () => {
    const {
      t
    } = (0, _reactI18next.useTranslation)();
    const theme = (0, _expoRouter.useTheme)();
    const router = (0, _expoRouter.useRouter)();
    const store = _storesAccount.useAccountStore.getState();
    const accounts = (0, _storesAccount.useAccountStore)(state => state.accounts);
    const lastUsedAccount = (0, _storesAccount.useAccountStore)(state => state.lastUsedAccount);
    const settingsStore = (0, _storesSettings.useSettingsStore)(state => state.personalization);
    const mutateProperty = (0, _storesSettings.useSettingsStore)(state => state.mutateProperty);
    const insets = (0, _reactNativeSafeAreaContext.useSafeAreaInsets)();
    const account = accounts.find(a => a.id === lastUsedAccount);
    const [step, setStep] = (0, _react.useState)("photo");
    (0, _react.useEffect)(() => {
      if (!account) {
        router.dismissAll();
      }
    }, [account, router]);
    const goNextStep = () => {
      if (step === "photo") {
        setStep("color");
      } else {
        router.dismissAll();
      }
    };
    const goPrevStep = () => {
      if (step === "color") {
        setStep("photo");
      }
    };
    const ignoreSetup = () => {
      Alert.default.alert(t("Welcome_Setup_Skip_Title"), t("Welcome_Setup_Skip_Description"), [{
        text: t("CANCEL_BTN"),
        style: "cancel"
      }, {
        text: t("Welcome_Setup_Skip_Action"),
        style: "destructive",
        onPress: () => {
          router.dismissAll();
        }
      }]);
    };
    const [isAddingPhoto, setIsAddingPhoto] = (0, _react.useState)(false);
    const profilePictureUrl = (0, _react.useMemo)(() => {
      if (!account) return null;
      return account.customisation?.profilePicture ? `data:image/png;base64,${account.customisation.profilePicture}` : null;
    }, [account]);
    // Must come after the memo: reading it before its declaration throws (temporal dead zone).
    const hasAPhotoBeenAdded = profilePictureUrl !== null;
    const updateProfilePictureFromLibrary = async () => {
      setIsAddingPhoto(true);
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
        base64: true
      });
      setIsAddingPhoto(false);
      if (!result.canceled) {
        const b64 = result.assets[0].base64 ?? "";
        store.setAccountProfilePicture(lastUsedAccount, b64);
      }
    };
    const defaultColorData = _utilsColors.AppColors.find(color => color.colorEnum === settingsStore.colorSelected) || _utilsColors.AppColors[0];
    const [selectedColor, setSelectedColor] = (0, _react.useState)(defaultColorData);
    return /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(View.default, {
      style: {
        flex: 1
      },
      children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoRouter.Stack.Toolbar, {
        placement: "left",
        children: step !== "photo" && /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoRouter.Stack.Toolbar.Button, {
          icon: undefined,
          onPress: () => {
            goPrevStep();
          }
        })
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(View.default, {
        style: {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: 24
        },
        children: [/*#__PURE__*/(0, _reactJsxRuntime.jsxs)(Stack.default, {
          animated: true,
          hAlign: "center",
          children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Image.default, {
            source: profilePictureUrl ? {
              uri: profilePictureUrl
            } : require(_dependencyMap[22]),
            style: {
              width: 92,
              height: 92,
              borderRadius: 64,
              marginBottom: 24,
              borderWidth: 1,
              borderColor: theme.colors.border
            }
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
            variant: "title",
            align: "center",
            weight: "medium",
            color: "textSecondary",
            children: t("Welcome_Greeting", {
              name: account?.firstName || t("ONBOARDING_DEFAULT_USER_FIRSTNAME")
            })
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
            variant: "h3",
            align: "center",
            children: t("Welcome_Title")
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Divider.default, {
            ghost: true,
            height: 16
          })]
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_uiComponentsDynamic.Dynamic, {
          animated: true,
          children: [step === "photo" && /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(Stack.default, {
            entering: _reactNativeReanimated.FadeInRight.springify(),
            exiting: _reactNativeReanimated.FadeOutLeft.springify(),
            animated: true,
            hAlign: "center",
            gap: 12,
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "body",
              align: "center",
              color: "textSecondary",
              children: t("Welcome_ProfilePicture_Description")
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Button.default, {
              label: t("Welcome_ProfilePicture_Action"),
              variant: "outlined",
              height: 42,
              leading: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_uiComponentsDynamic.Dynamic, {
                animated: true,
                children: isAddingPhoto ? /*#__PURE__*/(0, _reactJsxRuntime.jsx)(ActivityIndicator.default, {
                  size: 24
                }) : /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
                  name: hasAPhotoBeenAdded ? "check" : "camera",
                  fill: theme.colors.primary
                })
              }, isAddingPhoto ? "load_lead:btn" : hasAPhotoBeenAdded ? "check_lead:btn" : "camera_lead:btn"),
              onPress: () => {
                updateProfilePictureFromLibrary();
              }
            })]
          }), step === "color" && /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(Stack.default, {
            entering: _reactNativeReanimated.FadeInRight.springify(),
            exiting: _reactNativeReanimated.FadeOutLeft.springify(),
            animated: true,
            hAlign: "center",
            gap: 12,
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "body",
              align: "center",
              color: "textSecondary",
              children: t("Welcome_Color_Description")
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Stack.default, {
              direction: "horizontal",
              hAlign: "center",
              gap: 3,
              children: _utilsColors.AppColors.map(color => /*#__PURE__*/(0, _reactJsxRuntime.jsx)(TouchableOpacity.default, {
                onPress: () => {
                  setSelectedColor(color);
                  requestAnimationFrame(() => {
                    setTimeout(() => {
                      mutateProperty('personalization', {
                        colorSelected: color.colorEnum
                      });
                    }, 50);
                  });
                },
                style: {
                  borderColor: selectedColor.mainColor === color.mainColor ? color.mainColor : "transparent",
                  borderRadius: 48,
                  padding: 4,
                  borderWidth: 3
                },
                children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(View.default, {
                  style: {
                    width: 32,
                    height: 32,
                    borderRadius: 24,
                    backgroundColor: color.mainColor,
                    borderWidth: selectedColor === color.mainColor ? 2 : 0,
                    borderColor: theme.colors.primary
                  }
                })
              }, color.colorEnum))
            })]
          })]
        })]
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(View.default, {
        style: {
          justifyContent: "center",
          alignItems: "center",
          padding: 16,
          paddingBottom: insets.bottom + 24,
          gap: 12
        },
        children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_uiComponentsDynamic.Dynamic, {
          animated: true,
          children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Button.default, {
            disabled: !hasAPhotoBeenAdded,
            label: t("ONBOARDING_CONTINUE"),
            variant: "primary",
            fullWidth: true,
            onPress: goNextStep
          })
        }), (step === "photo" || true) && /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_uiComponentsDynamic.Dynamic, {
          animated: true,
          children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Button.default, {
            label: t("Welcome_Setup_Skip_Title"),
            variant: "secondary",
            fullWidth: true,
            onPress: ignoreSetup
          })
        })]
      })]
    });
  };
  var _default = WelcomeModal;
},871,[1022,1012,1005,1006,1241,1008,1002,1023,6,1105,190,267,193,319,198,360,1227,1136,1129,1242,1107,97,1243]);