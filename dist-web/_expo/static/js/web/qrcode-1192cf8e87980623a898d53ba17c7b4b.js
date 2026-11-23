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
      return PronoteLoginWithQR;
    }
  });
  var _getpapillonPapicons = require(_dependencyMap[0]);
  var _reactNativeMaskedViewMaskedView = require(_dependencyMap[1]);
  var MaskedView = _interopDefault(_reactNativeMaskedViewMaskedView);
  var _expoRouterReactNavigation = require(_dependencyMap[2]);
  var _expoCamera = require(_dependencyMap[3]);
  var _expoHaptics = require(_dependencyMap[4]);
  var Haptics = _interopNamespace(_expoHaptics);
  var _expoRouter = require(_dependencyMap[5]);
  var _blockshubPawnoteLts = require(_dependencyMap[6]);
  var _react = require(_dependencyMap[7]);
  var React = _interopDefault(_react);
  var _reactI18next = require(_dependencyMap[8]);
  var _reactNativeWebDistExportsActivityIndicator = require(_dependencyMap[9]);
  var ActivityIndicator = _interopDefault(_reactNativeWebDistExportsActivityIndicator);
  var _reactNativeWebDistExportsKeyboard = require(_dependencyMap[10]);
  var Keyboard = _interopDefault(_reactNativeWebDistExportsKeyboard);
  var _reactNativeWebDistExportsKeyboardAvoidingView = require(_dependencyMap[11]);
  var KeyboardAvoidingView = _interopDefault(_reactNativeWebDistExportsKeyboardAvoidingView);
  var _reactNativeWebDistExportsModal = require(_dependencyMap[12]);
  var Modal = _interopDefault(_reactNativeWebDistExportsModal);
  var _reactNativeWebDistExportsStyleSheet = require(_dependencyMap[13]);
  var StyleSheet = _interopDefault(_reactNativeWebDistExportsStyleSheet);
  var _reactNativeWebDistExportsTextInput = require(_dependencyMap[14]);
  var TextInput = _interopDefault(_reactNativeWebDistExportsTextInput);
  var _reactNativeWebDistExportsView = require(_dependencyMap[15]);
  var View = _interopDefault(_reactNativeWebDistExportsView);
  var _reactNativeReanimated = require(_dependencyMap[16]);
  var Reanimated = _interopDefault(_reactNativeReanimated);
  var _reactNativeSafeAreaContext = require(_dependencyMap[17]);
  var _storesAccount = require(_dependencyMap[18]);
  var _storesAccountTypes = require(_dependencyMap[19]);
  var _uiComponentsButton = require(_dependencyMap[20]);
  var Button = _interopDefault(_uiComponentsButton);
  var _uiComponentsIcon = require(_dependencyMap[21]);
  var Icon = _interopDefault(_uiComponentsIcon);
  var _uiComponentsTypography = require(_dependencyMap[22]);
  var Typography = _interopDefault(_uiComponentsTypography);
  var _utilsAttachmentsHelper = require(_dependencyMap[23]);
  var _utilsPronoteChallenge = require(_dependencyMap[24]);
  var _utilsPronoteFetcher = require(_dependencyMap[25]);
  var _utilsPronoteName = require(_dependencyMap[26]);
  var _utilsUuidUuid = require(_dependencyMap[27]);
  var uuid = _interopDefault(_utilsUuidUuid);
  var _uiComponentsSafeHorizontalView = require(_dependencyMap[28]);
  var SafeHorizontalView = _interopDefault(_uiComponentsSafeHorizontalView);
  var _expoDevice = require(_dependencyMap[29]);
  var Device = _interopNamespace(_expoDevice);
  var _reactJsxRuntime = require(_dependencyMap[30]);
  function PronoteLoginWithQR() {
    const theme = (0, _expoRouterReactNavigation.useTheme)();
    const insets = (0, _reactNativeSafeAreaContext.useSafeAreaInsets)();
    const {
      colors
    } = theme;
    const [permission, requestPermission] = (0, _expoCamera.useCameraPermissions)();
    const [scanned, setScanned] = (0, _react.useState)(false);
    const [keyboardOpen, setKeyboardOpen] = (0, _react.useState)(false);
    const [QRValidationCode, setQRValidationCode] = (0, _react.useState)("");
    const [pinModalVisible, setPinModalVisible] = (0, _react.useState)(false);
    const [loadingModalVisible, setLoadingModalVisible] = (0, _react.useState)(false);
    const codeInput = /*#__PURE__*/React.default.createRef();
    const [QRData, setQRData] = (0, _react.useState)(null);
    const deviceName = Device.deviceName ?? "Pronote";
    async function loginQR() {
      setScanned(false);
      setLoadingModalVisible(true);
      if (QRValidationCode === "" || QRValidationCode.length !== 4) {
        // Handle error
        return;
      }
      const accountID = (0, uuid.default)();
      try {
        const decodedJSON = JSON.parse(QRData);
        const data = {
          jeton: decodedJSON.jeton,
          login: decodedJSON.login,
          url: decodedJSON.url
        };
        const session = (0, _blockshubPawnoteLts.createSessionHandle)(_utilsPronoteFetcher.customFetcher);
        let refresh;
        try {
          refresh = await (0, _blockshubPawnoteLts.loginQrCode)(session, {
            qr: data,
            pin: QRValidationCode,
            deviceUUID: accountID
          });
        } catch (error) {
          if (error instanceof _blockshubPawnoteLts.SecurityError && !error.handle.shouldCustomPassword && !error.handle.shouldCustomDoubleAuth) {
            if (error.handle.shouldEnterSource && !error.handle.shouldEnterPIN) {
              const mode = _blockshubPawnoteLts.DoubleAuthMode.MGDA_NotificationSeulement;
              const source = deviceName.length > 30 ? "Pronote" : deviceName;
              await (0, _blockshubPawnoteLts.securitySource)(session, source);
              await (0, _blockshubPawnoteLts.securitySave)(session, error.handle, {
                mode,
                deviceName: source
              });
              const context = error.handle.context;
              refresh = await (0, _blockshubPawnoteLts.finishLoginManually)(session, context.authentication, context.identity, context.initialUsername);
            } else {
              (0, _utilsPronoteChallenge.setPendingPronoteChallenge)({
                session,
                error,
                deviceUUID: accountID
              });
              _expoRouter.router.push("/(onboarding)/services/pronote/challenge");
            }
          }
        }
        if (!refresh) {
          throw _blockshubPawnoteLts.AuthenticateError;
        }
        const user = session.user.resources[0];
        const schoolName = user.establishmentName;
        const className = user.className;
        const {
          firstName,
          lastName
        } = (0, _utilsPronoteName.GetIdentityFromPronoteUsername)(session.user.name);
        let pp = "";
        if (session.user.resources[0].profilePicture?.url) {
          pp = await (0, _utilsAttachmentsHelper.URLToBase64)(session.user.resources[0].profilePicture?.url);
        }
        _storesAccount.useAccountStore.getState().addAccount({
          id: accountID,
          firstName,
          lastName,
          schoolName,
          className,
          customisation: {
            profilePicture: pp,
            subjects: {}
          },
          services: [{
            id: accountID,
            auth: {
              accessToken: refresh.token,
              refreshToken: refresh.token,
              additionals: {
                ...refresh,
                instanceURL: refresh.url,
                kind: refresh.kind,
                username: refresh.username,
                deviceUUID: accountID
              }
            },
            serviceId: _storesAccountTypes.Services.PRONOTE,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        });
        _storesAccount.useAccountStore.getState().setLastUsedAccount(accountID);
        setTimeout(() => {
          setLoadingModalVisible(false);
          return _expoRouter.router.dismissTo("/");
        }, 1000);
      } catch (error) {
        console.error(error);
        // Handle error
      }
    }
    (0, _react.useEffect)(() => {
      if (!permission?.granted) {
        requestPermission();
      }
    }, [permission?.granted, requestPermission]);
    const handleBarCodeScanned = ({
      data
    }) => {
      setScanned(true);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      setQRData(data);
      setPinModalVisible(true);
    };
    (0, _react.useEffect)(() => {
      if (!pinModalVisible) {
        setScanned(false);
        setQRData(null);
      }
    }, [pinModalVisible]);
    const keyboardDidShow = () => setKeyboardOpen(true);
    const keyboardDidHide = () => setKeyboardOpen(false);
    (0, _react.useEffect)(() => {
      const keyboardDidShowListener = Keyboard.default.addListener("keyboardDidShow", keyboardDidShow);
      const keyboardDidHideListener = Keyboard.default.addListener("keyboardDidHide", keyboardDidHide);
      return () => {
        keyboardDidShowListener?.remove();
        keyboardDidHideListener?.remove();
      };
    }, []);
    const {
      t
    } = (0, _reactI18next.useTranslation)();
    return /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_reactNativeSafeAreaContext.SafeAreaView, {
      style: styles.container,
      children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Modal.default, {
        visible: loadingModalVisible,
        animationType: "slide",
        presentationStyle: "pageSheet",
        children: /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(View.default, {
          style: {
            flex: 1,
            backgroundColor: colors.background,
            justifyContent: "center",
            alignItems: "center"
          },
          children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(View.default, {
            style: {
              flex: 1
            }
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(ActivityIndicator.default, {
            size: "large"
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
            style: {
              fontSize: 18,
              fontWeight: "600",
              color: colors.text,
              marginTop: 16
            },
            children: t("ONBOARDING_LOADING_LOGIN")
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
            style: {
              fontSize: 16,
              fontWeight: "400",
              color: colors.text + "80",
              marginTop: 4
            },
            children: t("ONBOARDING_QRCODE_WAIT")
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(View.default, {
            style: {
              flex: 1
            }
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(SafeHorizontalView.default, {
            base: 16,
            style: {
              width: "100%",
              paddingBottom: insets.bottom,
              gap: 8
            },
            children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Button.default, {
              title: t("CANCEL_BTN"),
              onPress: () => {
                setLoadingModalVisible(false);
                _expoRouter.router.back();
              }
            })
          })]
        })
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Modal.default, {
        visible: pinModalVisible,
        animationType: "slide",
        presentationStyle: "pageSheet",
        onRequestClose: () => {
          setPinModalVisible(!pinModalVisible);
        },
        children: /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(KeyboardAvoidingView.default, {
          style: {
            flex: 1,
            backgroundColor: colors.background
          },
          behavior: "padding",
          keyboardVerticalOffset: insets.top,
          children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(SafeHorizontalView.default, {
            base: 20,
            style: {
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 24,
              paddingVertical: 16,
              borderBottomColor: colors.border,
              borderBottomWidth: 0.5
            },
            children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              style: {
                fontSize: 17,
                fontWeight: "600",
                color: colors.text,
                textAlign: "center"
              },
              children: t("ONBOARDING_QRCODE_VALIDATION")
            })
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Reanimated.default.View, {
            entering: _reactNativeReanimated.FadeInUp.duration(250),
            exiting: _reactNativeReanimated.FadeOutUp.duration(150),
            style: {
              zIndex: 9999,
              paddingTop: keyboardOpen ? 20 : 100,
              alignItems: "center"
            },
            layout: _reactNativeReanimated.LinearTransition,
            children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              style: {
                color: colors.text,
                fontSize: 16,
                textAlign: "center",
                marginHorizontal: 24,
                fontWeight: "400",
                width: 300,
                marginBottom: 12
              },
              children: t("ONBOARDING_PRONOTE_PIN")
            })
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(View.default, {
            style: {
              flex: 1,
              alignItems: "center",
              marginBottom: "7%"
            },
            children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(TextInput.default, {
              style: {
                width: "90%",
                paddingHorizontal: 20,
                paddingVertical: 15,
                backgroundColor: colors.card,
                borderRadius: 12,
                fontSize: 24,
                color: colors.text,
                textAlign: "center",
                borderColor: colors.border,
                borderWidth: 2,
                fontWeight: "500"
              },
              placeholderTextColor: colors.text + "80",
              placeholder: "\u2022\u2022\u2022\u2022",
              keyboardType: "number-pad",
              maxLength: 4,
              secureTextEntry: true,
              value: QRValidationCode,
              onChangeText: text => setQRValidationCode(text),
              ref: codeInput,
              autoFocus: true
            })
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(SafeHorizontalView.default, {
            base: 16,
            style: {
              width: "100%",
              paddingBottom: insets.bottom + 16,
              gap: 8
            },
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Button.default, {
              title: t("CONFIRM_BTN"),
              onPress: () => {
                setPinModalVisible(false);
                loginQR();
              }
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Button.default, {
              title: t("CANCEL_BTN"),
              variant: "outline",
              onPress: () => {
                setPinModalVisible(false);
              }
            })]
          })]
        })
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(View.default, {
        style: [styles.explainations, {
          top: insets.top + 48 + 10
        }],
        children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Icon.default, {
          size: 40,
          fill: "white",
          papicon: true,
          children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
            name: "QrCode"
          })
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(Typography.default, {
          style: styles.title,
          children: [t("ONBOARDING_LOGIN_TO"), " PRONOTE"]
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
          style: styles.text,
          children: t("ONBOARDING_SCAN_QRCODE")
        })]
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(MaskedView.default, {
        style: StyleSheet.default.absoluteFillObject,
        maskElement: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(View.default, {
          style: styles.maskContainer,
          children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(View.default, {
            style: styles.transparentSquare
          })
        }),
        children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(View.default, {
          style: styles.maskContainer
        }), permission?.granted && /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoCamera.CameraView, {
          facing: "back",
          barcodeScannerSettings: {
            barcodeTypes: ["qr"]
          },
          onBarcodeScanned: scanned ? undefined : handleBarCodeScanned,
          style: StyleSheet.default.absoluteFillObject
        }), permission?.granted && /*#__PURE__*/(0, _reactJsxRuntime.jsx)(View.default, {
          style: styles.transparentSquareBorder
        })]
      })]
    });
  }
  const styles = StyleSheet.default.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "black"
    },
    maskContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.3)"
    },
    transparentSquare: {
      position: "absolute",
      width: 300,
      height: 300,
      backgroundColor: "black",
      borderWidth: 2,
      borderColor: "#fff",
      borderRadius: 30,
      borderCurve: "continuous",
      alignSelf: "center",
      top: "35%"
    },
    backButton: {
      position: 'absolute',
      left: 16,
      zIndex: 200,
      backgroundColor: '#ffffff42',
      padding: 10,
      borderRadius: 100
    },
    transparentSquareBorder: {
      position: "absolute",
      width: 300,
      height: 300,
      backgroundColor: "transparent",
      borderWidth: 2,
      borderColor: "#fff",
      borderRadius: 30,
      borderCurve: "continuous",
      alignSelf: "center",
      top: "35%"
    },
    explainations: {
      position: "absolute",
      alignItems: "center",
      justifyContent: "center",
      marginHorizontal: 24,
      gap: 4,
      zIndex: 9999
    },
    title: {
      fontSize: 18,
      fontWeight: "600",
      color: "white",
      textAlign: "center"
    },
    text: {
      fontSize: 16,
      fontWeight: "400",
      color: "white",
      textAlign: "center",
      opacity: 0.8
    }
  });
},905,[1002,1337,1000,1323,1338,1023,1315,6,1105,317,307,326,327,117,344,198,1107,360,1022,1109,1024,1013,1110,1317,1321,1318,1319,1249,1111,1314,97]);
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
  Object.defineProperty(exports, "CameraView", {
    enumerable: true,
    get: function () {
      return _CameraView2.default;
    }
  });
  Object.defineProperty(exports, "useCameraPermissions", {
    enumerable: true,
    get: function () {
      return useCameraPermissions;
    }
  });
  Object.defineProperty(exports, "useMicrophonePermissions", {
    enumerable: true,
    get: function () {
      return useMicrophonePermissions;
    }
  });
  exports.scanFromURLAsync = scanFromURLAsync;
  Object.defineProperty(exports, "Camera", {
    enumerable: true,
    get: function () {
      return Camera;
    }
  });
  var _expo = require(_dependencyMap[0]);
  var _ExpoCameraManager = require(_dependencyMap[1]);
  var CameraManager = _interopDefault(_ExpoCameraManager);
  var _CameraView = require(_dependencyMap[2]);
  var _CameraView2 = _interopDefault(_CameraView);
  var _CameraTypes = require(_dependencyMap[3]);
  Object.keys(_CameraTypes).forEach(function (k) {
    if (k !== 'default' && !Object.prototype.hasOwnProperty.call(exports, k)) {
      Object.defineProperty(exports, k, {
        enumerable: true,
        get: function () {
          return _CameraTypes[k];
        }
      });
    }
  });
  var _PictureRef = require(_dependencyMap[4]);
  Object.keys(_PictureRef).forEach(function (k) {
    if (k !== 'default' && !Object.prototype.hasOwnProperty.call(exports, k)) {
      Object.defineProperty(exports, k, {
        enumerable: true,
        get: function () {
          return _PictureRef[k];
        }
      });
    }
  });
  // @needsAudit
  /**
   * Checks user's permissions for accessing camera.
   * @return A promise that resolves to an object of type [PermissionResponse](#permissionresponse).
   */
  async function getCameraPermissionsAsync() {
    return CameraManager.default.getCameraPermissionsAsync();
  }
  // @needsAudit
  /**
   * Asks the user to grant permissions for accessing camera.
   * On iOS this will require apps to specify an `NSCameraUsageDescription` entry in the **Info.plist**.
   * @return A promise that resolves to an object of type [PermissionResponse](#permissionresponse).
   */
  async function requestCameraPermissionsAsync() {
    return CameraManager.default.requestCameraPermissionsAsync();
  }
  // @needsAudit
  /**
   * Check or request permissions to access the camera.
   * This uses both `requestCameraPermissionsAsync` and `getCameraPermissionsAsync` to interact with the permissions.
   *
   * @example
   * ```ts
   * const [status, requestPermission] = useCameraPermissions();
   * ```
   */
  const useCameraPermissions = (0, _expo.createPermissionHook)({
    getMethod: getCameraPermissionsAsync,
    requestMethod: requestCameraPermissionsAsync
  });
  // @needsAudit
  /**
   * Checks user's permissions for accessing microphone.
   * @return A promise that resolves to an object of type [PermissionResponse](#permissionresponse).
   */
  async function getMicrophonePermissionsAsync() {
    return CameraManager.default.getMicrophonePermissionsAsync();
  }
  // @needsAudit
  /**
   * Asks the user to grant permissions for accessing the microphone.
   * On iOS this will require apps to specify an `NSMicrophoneUsageDescription` entry in the **Info.plist**.
   * @return A promise that resolves to an object of type [PermissionResponse](#permissionresponse).
   */
  async function requestMicrophonePermissionsAsync() {
    return CameraManager.default.requestMicrophonePermissionsAsync();
  }
  // @needsAudit
  /**
   * Check or request permissions to access the microphone.
   * This uses both `requestMicrophonePermissionsAsync` and `getMicrophonePermissionsAsync` to interact with the permissions.
   *
   * @example
   * ```ts
   * const [status, requestPermission] = Camera.useMicrophonePermissions();
   * ```
   */
  const useMicrophonePermissions = (0, _expo.createPermissionHook)({
    getMethod: getMicrophonePermissionsAsync,
    requestMethod: requestMicrophonePermissionsAsync
  });
  /**
   * Scan bar codes from the image at the given URL.
   * @param url URL to get the image from.
   * @param barcodeTypes An array of bar code types. Defaults to all supported bar code types on
   * the platform.
   * > __Note:__ Only QR codes are supported on iOS.
   * On android, the barcode should take up the majority of the image for best results.
   * @return A possibly empty array of objects of the `BarcodeScanningResult` shape, where the type
   * refers to the barcode type that was scanned and the data is the information encoded in the barcode.
   */
  async function scanFromURLAsync(url, barcodeTypes = ['qr']) {
    return CameraManager.default.scanFromURLAsync(url, barcodeTypes);
  }
  /**
   * @hidden
   */
  const Camera = {
    getCameraPermissionsAsync,
    requestCameraPermissionsAsync,
    getMicrophonePermissionsAsync,
    requestMicrophonePermissionsAsync,
    scanFromURLAsync
  };
},1323,[643,1324,1328,1325,1336]);
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
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return _default;
    }
  });
  var _expo = require(_dependencyMap[0]);
  var _CameraTypes = require(_dependencyMap[1]);
  var _webWebBarcodeScanner = require(_dependencyMap[2]);
  var WebBarcodeScanner = _interopNamespace(_webWebBarcodeScanner);
  var _webWebUserMediaManager = require(_dependencyMap[3]);
  function getUserMedia(constraints) {
    return navigator.mediaDevices.getUserMedia(constraints);
  }
  function permissionResponse(status) {
    return {
      status,
      expires: 'never',
      canAskAgain: true,
      granted: status === _CameraTypes.PermissionStatus.GRANTED
    };
  }
  function handleGetUserMediaError(message) {
    if (message === 'Permission dismissed') {
      return permissionResponse(_CameraTypes.PermissionStatus.UNDETERMINED);
    }
    return permissionResponse(_CameraTypes.PermissionStatus.DENIED);
  }
  async function handleRequestPermissionsAsync() {
    try {
      const streams = await getUserMedia({
        video: true
      });
      // We need to close the media stream returned by getUserMedia
      // to avoid using the camera since we won't use these streams now
      // https://developer.mozilla.org/fr/docs/Web/API/MediaDevices/getUserMedia
      streams.getTracks().forEach(track => {
        track.stop();
        streams.removeTrack(track);
      });
      return permissionResponse(_CameraTypes.PermissionStatus.GRANTED);
    } catch (error) {
      return handleGetUserMediaError(error.message);
    }
  }
  async function handlePermissionsQueryAsync(query) {
    if (!navigator?.permissions?.query) {
      throw new _expo.UnavailabilityError('expo-camera', 'navigator.permissions API is not available');
    }
    try {
      const {
        state
      } = await navigator.permissions.query({
        name: query
      });
      switch (state) {
        case 'prompt':
          return permissionResponse(_CameraTypes.PermissionStatus.UNDETERMINED);
        case 'granted':
          return permissionResponse(_CameraTypes.PermissionStatus.GRANTED);
        case 'denied':
          return permissionResponse(_CameraTypes.PermissionStatus.DENIED);
      }
    } catch (e) {
      // Firefox doesn't support querying for the camera permission, so return undetermined status
      if (e instanceof TypeError) {
        return permissionResponse(_CameraTypes.PermissionStatus.UNDETERMINED);
      }
      throw e;
    }
  }
  var _default = {
    isModernBarcodeScannerAvailable: false,
    isDocumentScannerAvailable: false,
    async scanDocumentAsync() {
      return null;
    },
    toggleRecordingAsyncAvailable: false,
    addListener(_eventName, _listener) {
      return {
        remove: () => {}
      };
    },
    get Type() {
      return {
        back: 'back',
        front: 'front'
      };
    },
    get FlashMode() {
      return {
        on: 'on',
        off: 'off',
        auto: 'auto',
        torch: 'torch',
        screen: 'on'
      };
    },
    get AutoFocus() {
      return {
        on: 'on',
        off: 'off',
        auto: 'auto',
        singleShot: 'singleShot'
      };
    },
    get WhiteBalance() {
      return {
        auto: 'auto',
        continuous: 'continuous',
        manual: 'manual'
      };
    },
    get VideoQuality() {
      return {};
    },
    get VideoStabilization() {
      return {};
    },
    async isAvailableAsync() {
      if (!(0, _webWebUserMediaManager.canGetUserMedia)() || !navigator.mediaDevices.enumerateDevices) {
        return false;
      }
      const devices = await navigator.mediaDevices.enumerateDevices();
      return devices.some(device => device.kind === 'videoinput');
    },
    async takePicture(options, camera) {
      return camera.takePicture(options);
    },
    async pausePreview(camera) {
      return camera.pausePreview();
    },
    async resumePreview(camera) {
      return camera.resumePreview();
    },
    async getAvailableCameraTypesAsync() {
      if (!(0, _webWebUserMediaManager.canGetUserMedia)() || !navigator.mediaDevices.enumerateDevices) return [];
      const devices = await navigator.mediaDevices.enumerateDevices();
      const types = await Promise.all([(await (0, _webWebUserMediaManager.isFrontCameraAvailableAsync)(devices)) && 'front', (await (0, _webWebUserMediaManager.isBackCameraAvailableAsync)()) && 'back']);
      return types.filter(Boolean);
    },
    async getAvailablePictureSizes(ratio, camera) {
      return camera.getAvailablePictureSizes(ratio);
    },
    async getPermissionsAsync() {
      return handlePermissionsQueryAsync('camera');
    },
    async requestPermissionsAsync() {
      return handleRequestPermissionsAsync();
    },
    async getCameraPermissionsAsync() {
      return handlePermissionsQueryAsync('camera');
    },
    async requestCameraPermissionsAsync() {
      return handleRequestPermissionsAsync();
    },
    async getMicrophonePermissionsAsync() {
      return handlePermissionsQueryAsync('microphone');
    },
    async requestMicrophonePermissionsAsync() {
      try {
        await getUserMedia({
          audio: true
        });
        return permissionResponse(_CameraTypes.PermissionStatus.GRANTED);
      } catch (error) {
        return handleGetUserMediaError(error.message);
      }
    },
    async scanFromURLAsync(url, barcodeTypes) {
      const response = await fetch(url);
      const blob = await response.blob();
      const bitmap = await createImageBitmap(blob);
      const types = barcodeTypes && barcodeTypes.length > 0 ? barcodeTypes : WebBarcodeScanner.ALL_BARCODE_TYPES;
      const results = await WebBarcodeScanner.detect(bitmap, types);
      bitmap.close();
      return results;
    }
  };
},1324,[643,1325,1326,1327]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  Object.defineProperty(exports, "PermissionStatus", {
    enumerable: true,
    get: function () {
      return _expo.PermissionStatus;
    }
  });
  var _expo = require(_dependencyMap[0]);
},1325,[643]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  Object.defineProperty(exports, "ALL_BARCODE_TYPES", {
    enumerable: true,
    get: function () {
      return ALL_BARCODE_TYPES;
    }
  });
  exports.detect = detect;
  /**
   * Mapping from expo BarcodeType to BarcodeDetector format string.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Barcode_Detection_API#supported_barcode_formats
   */
  const EXPO_TO_WEB_FORMAT = {
    aztec: 'aztec',
    codabar: 'codabar',
    code39: 'code_39',
    code93: 'code_93',
    code128: 'code_128',
    datamatrix: 'data_matrix',
    ean8: 'ean_8',
    ean13: 'ean_13',
    itf14: 'itf',
    pdf417: 'pdf417',
    qr: 'qr_code',
    upc_a: 'upc_a',
    upc_e: 'upc_e'
  };
  const WEB_TO_EXPO_FORMAT = Object.fromEntries(Object.entries(EXPO_TO_WEB_FORMAT).map(([expo, web]) => [web, expo]));
  const ALL_BARCODE_TYPES = Object.keys(EXPO_TO_WEB_FORMAT);
  let cachedDetector = null;
  let cachedFormats = null;
  function formatsChanged(barcodeTypes) {
    const webFormats = barcodeTypes.map(t => EXPO_TO_WEB_FORMAT[t]).sort();
    if (!cachedFormats) {
      return true;
    }
    if (cachedFormats.length !== webFormats.length) {
      return true;
    }
    return webFormats.some((f, i) => f !== cachedFormats[i]);
  }
  async function getDetector(barcodeTypes) {
    if (cachedDetector && !formatsChanged(barcodeTypes)) {
      return cachedDetector;
    }
    const webFormats = barcodeTypes.map(t => EXPO_TO_WEB_FORMAT[t]);
    cachedFormats = [...webFormats].sort();
    const NativeBarcodeDetector = globalThis.BarcodeDetector;
    if (typeof NativeBarcodeDetector !== 'undefined') {
      const detector = new NativeBarcodeDetector({
        formats: webFormats
      });
      cachedDetector = detector;
      return detector;
    }
    const {
      BarcodeDetector
    } = await require(_dependencyMap[1])(_dependencyMap[0], _dependencyMap.paths);
    const detector = new BarcodeDetector({
      formats: webFormats
    });
    cachedDetector = detector;
    return detector;
  }
  async function detect(source, barcodeTypes) {
    const detector = await getDetector(barcodeTypes);
    const barcodes = await detector.detect(source);
    return barcodes.map(barcode => {
      const {
        x,
        y,
        width,
        height
      } = barcode.boundingBox;
      return {
        type: WEB_TO_EXPO_FORMAT[barcode.format] ?? barcode.format,
        data: barcode.rawValue,
        bounds: {
          origin: {
            x,
            y
          },
          size: {
            width,
            height
          }
        },
        cornerPoints: barcode.cornerPoints?.map(p => ({
          x: p.x,
          y: p.y
        })) ?? []
      };
    });
  }
},1326,{"0":1339,"1":101,"paths":{"1339":"/_expo/static/js/web/index-6c1bc86d48e34596d094abb5eeff310a.js"}});
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  exports.requestUserMediaAsync = requestUserMediaAsync;
  exports.getAnyUserMediaAsync = getAnyUserMediaAsync;
  exports.canGetUserMedia = canGetUserMedia;
  exports.isFrontCameraAvailableAsync = isFrontCameraAvailableAsync;
  exports.isBackCameraAvailableAsync = isBackCameraAvailableAsync;
  var _expo = require(_dependencyMap[0]);
  /* eslint-env browser */
  async function sourceSelectedAsync(isMuted, audioConstraints, videoConstraints) {
    const constraints = {
      video: typeof videoConstraints !== 'undefined' ? videoConstraints : true
    };
    if (!isMuted) {
      constraints.audio = typeof audioConstraints !== 'undefined' ? audioConstraints : true;
    }
    return await getAnyUserMediaAsync(constraints);
  }
  async function requestUserMediaAsync(props, isMuted = true) {
    return await sourceSelectedAsync(isMuted, props.audio, props.video);
  }
  async function getAnyUserMediaAsync(constraints, ignoreConstraints = false) {
    try {
      return await navigator.mediaDevices.getUserMedia({
        ...constraints,
        video: ignoreConstraints || constraints.video
      });
    } catch (error) {
      if (!ignoreConstraints && typeof error === 'object' && error?.name === 'ConstraintNotSatisfiedError') {
        return await getAnyUserMediaAsync(constraints, true);
      }
      throw error;
    }
  }
  function canGetUserMedia() {
    return _expo.Platform.isDOMAvailable && !!navigator.mediaDevices?.getUserMedia;
  }
  async function isFrontCameraAvailableAsync(devices) {
    return await supportsCameraType(['front', 'user', 'facetime'], 'user', devices);
  }
  async function isBackCameraAvailableAsync(devices) {
    return await supportsCameraType(['back', 'rear'], 'environment', devices);
  }
  async function supportsCameraType(labels, type, devices) {
    if (!devices) {
      if (!navigator.mediaDevices.enumerateDevices) {
        return null;
      }
      devices = await navigator.mediaDevices.enumerateDevices();
    }
    const cameras = devices.filter(t => t.kind === 'videoinput');
    const [hasCamera] = cameras.filter(camera => labels.some(label => camera.label.toLowerCase().includes(label)));
    const [isCapable] = cameras.filter(camera => {
      if (!('getCapabilities' in camera)) {
        return null;
      }
      const capabilities = camera.getCapabilities();
      if (!capabilities.facingMode) {
        return null;
      }
      return capabilities.facingMode.find(_ => type);
    });
    return isCapable?.deviceId || hasCamera?.deviceId || null;
  }
},1327,[643]);
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
      return CameraView;
    }
  });
  var _reactJsxRuntime = require(_dependencyMap[0]);
  var _expo = require(_dependencyMap[1]);
  var _react = require(_dependencyMap[2]);
  var _ExpoCamera = require(_dependencyMap[3]);
  var ExpoCamera = _interopDefault(_ExpoCamera);
  var _ExpoCameraManager = require(_dependencyMap[4]);
  var CameraManager = _interopDefault(_ExpoCameraManager);
  var _utilsProps = require(_dependencyMap[5]);
  const EventThrottleMs = 500;
  const _PICTURE_SAVED_CALLBACKS = {};
  let loggedRenderingChildrenWarning = false;
  let _GLOBAL_PICTURE_ID = 1;
  function ensurePictureOptions(options) {
    if (!options || typeof options !== 'object') {
      return {};
    }
    if (options.quality === undefined) {
      options.quality = 1;
    }
    if (options.mirror) {
      console.warn('The `mirror` option is deprecated. Please use the `mirror` prop on the `CameraView` instead.');
    }
    if (options.onPictureSaved) {
      const id = _GLOBAL_PICTURE_ID++;
      _PICTURE_SAVED_CALLBACKS[id] = options.onPictureSaved;
      options.id = id;
      options.fastMode = true;
    }
    return options;
  }
  function ensureRecordingOptions(options = {}) {
    if (options.mirror) {
      console.warn('The `mirror` option is deprecated. Please use the `mirror` prop on the `CameraView` instead.');
    }
    return options;
  }
  function _onPictureSaved({
    nativeEvent
  }) {
    const {
      id,
      data
    } = nativeEvent;
    const callback = _PICTURE_SAVED_CALLBACKS[id];
    if (callback) {
      callback(data);
      delete _PICTURE_SAVED_CALLBACKS[id];
    }
  }
  class CameraView extends _react.Component {
    /**
    * Property that determines if the current device has the ability to use `DataScannerViewController` (iOS 16+) or the Google code scanner (Android).
    */
    static isModernBarcodeScannerAvailable = CameraManager.default.isModernBarcodeScannerAvailable;
    /**
    * Property that determines whether the current device can present the system document scanner through
    * [`scanDocumentAsync`](#scandocumentasyncoptions) —
    * ML Kit document scanner on Android, which requires Google Play Services or the
    * VisionKit's `VNDocumentCameraViewController` on iOS.
    */
    static isDocumentScannerAvailable = CameraManager.default.isDocumentScannerAvailable;
    /**
    * Check whether the current device has a camera. This is useful for web and simulators cases.
    * This isn't influenced by the Permissions API (all platforms), or HTTP usage (in the browser).
    * You will still need to check if the native permission has been accepted.
    * @platform web
    */
    static async isAvailableAsync() {
      if (!CameraManager.default.isAvailableAsync) {
        throw new _expo.UnavailabilityError('expo-camera', 'isAvailableAsync');
      }
      return CameraManager.default.isAvailableAsync();
    }
    // @needsAudit
    /**
    * Queries the device for the available video codecs that can be used in video recording.
    * @return A promise that resolves to a list of strings that represents available codecs.
    * @platform ios
    */
    static async getAvailableVideoCodecsAsync() {
      if (!CameraManager.default.getAvailableVideoCodecsAsync) {
        throw new _expo.UnavailabilityError('Camera', 'getAvailableVideoCodecsAsync');
      }
      return CameraManager.default.getAvailableVideoCodecsAsync();
    }
    /**
    * Get picture sizes that are supported by the device.
    * @return Returns a Promise that resolves to an array of strings representing picture sizes that can be passed to `pictureSize` prop.
    * The list varies across Android devices but is the same for every iOS.
    */
    async getAvailablePictureSizesAsync() {
      return (await this._cameraRef.current?.getAvailablePictureSizes()) ?? [];
    }
    /**
    * Returns the available lenses for the currently selected camera.
    *
    * @return An array of `LensInfo` objects containing both the stable `deviceType` identifier and the `localizedName` for display purposes. The `deviceType` can be passed to the `selectedLens` prop.
    * @platform ios
    */
    async getAvailableLensesAsync() {
      return (await this._cameraRef.current?.getAvailableLenses()) ?? [];
    }
    /**
    * Returns an object with the supported features of the camera on the current device.
    */
    getSupportedFeatures() {
      return {
        isModernBarcodeScannerAvailable: CameraManager.default.isModernBarcodeScannerAvailable,
        toggleRecordingAsyncAvailable: CameraManager.default.toggleRecordingAsyncAvailable
      };
    }
    /**
    * Resumes the camera preview.
    */
    async resumePreview() {
      return this._cameraRef.current?.resumePreview();
    }
    /**
    * Pauses the camera preview. It is not recommended to use `takePictureAsync` when preview is paused.
    */
    async pausePreview() {
      return this._cameraRef.current?.pausePreview();
    }
    // Values under keys from this object will be transformed to native options
    static ConversionTables = _utilsProps.ConversionTables;
    static defaultProps = {
      zoom: 0,
      facing: 'back',
      enableTorch: false,
      mode: 'picture',
      flash: 'off'
    };
    _cameraRef = /*#__PURE__*/(0, _react.createRef)();
    _lastEvents = {};
    _lastEventsTimes = {};
    async takePictureAsync(options) {
      const pictureOptions = ensurePictureOptions(options);
      return this._cameraRef.current?.takePicture(pictureOptions);
    }
    /**
    * On Android, we will use the [Google code scanner](https://developers.google.com/ml-kit/vision/barcode-scanning/code-scanner).
    * On iOS, presents a modal view controller that uses the [`DataScannerViewController`](https://developer.apple.com/documentation/visionkit/scanning_data_with_the_camera) available on iOS 16+.
    * @platform android
    * @platform ios
    */
    static async launchScanner(options = {
      barcodeTypes: []
    }) {}
    /**
    * Dismiss the scanner presented by `launchScanner`.
    * > **info** On Android, the scanner is dismissed automatically when a barcode is scanned.
    * @platform ios
    */
    static async dismissScanner() {}
    /**
    * Presents the system document scanner and returns the captured pages once the user saves. On iOS, this uses
    * VisionKit's [`VNDocumentCameraViewController`](https://developer.apple.com/documentation/visionkit/vndocumentcameraviewcontroller);
    * on Android it uses the [ML Kit document scanner](https://developers.google.com/ml-kit/vision/doc-scanner).
    *
    * The page images and the optional PDF are written to the app's cache directory, so copy them to a permanent
    * location with [`expo-file-system`](/versions/latest/sdk/filesystem/) if you need to keep them.
    *
    * @param options A map of `DocumentScanningOptions`.
    * @return A promise that resolves to a [`DocumentScanningResult`](#documentscanningresult), or `null` if the user
    * cancels the scan or the scanner is unavailable on the device.
    *
    * @example
    * ```ts
    * const result = await CameraView.scanDocumentAsync({ requestPdf: true });
    * if (result) {
    *   console.log(result.pages); // ['file:///.../DocumentScanner/<uuid>.jpg', ...]
    *   console.log(result.pdfUri); // 'file:///.../DocumentScanner/<uuid>.pdf'
    * }
    * ```
    *
    * @platform android
    * @platform ios
    */
    static async scanDocumentAsync(options) {
      {
        return null;
      }
      return (await CameraManager.default.scanDocumentAsync(options ?? {})) ?? null;
    }
    /**
    * Invokes the `listener` function when a bar code has been successfully scanned. The callback is provided with
    * an object of the `ScanningResult` shape, where the `type` refers to the bar code type that was scanned and the `data` is the information encoded in the bar code
    * (in this case of QR codes, this is often a URL). See [`BarcodeType`](#barcodetype) for supported values.
    * @param listener Invoked with the [ScanningResult](#scanningresult) when a bar code has been successfully scanned.
    *
    * @platform ios
    * @platform android
    */
    static onModernBarcodeScanned(listener) {
      return CameraManager.default.addListener('onModernBarcodeScanned', listener);
    }
    /**
    * Starts recording a video that will be saved to cache directory. Videos are rotated to match device's orientation.
    * Flipping camera during a recording results in stopping it.
    * @param options A map of `CameraRecordingOptions` type.
    * @return Returns a Promise that resolves to an object containing video file `uri` property and a `codec` property on iOS.
    * The Promise is returned if `stopRecording` was invoked, one of `maxDuration` and `maxFileSize` is reached or camera preview is stopped.
    * @platform android
    * @platform ios
    */
    async recordAsync(options) {
      const recordingOptions = ensureRecordingOptions(options);
      return this._cameraRef.current?.record(recordingOptions);
    }
    /**
    * Pauses or resumes the video recording. Only has an effect if there is an active recording. On `iOS`, this method only supported on `iOS` 18.
    *
    * @example
    * ```ts
    * const { toggleRecordingAsyncAvailable } = getSupportedFeatures()
    *
    * return (
    *  {toggleRecordingAsyncAvailable && (
    *    <Button title="Toggle Recording" onPress={toggleRecordingAsync} />
    *  )}
    * )
    * ```
    */
    async toggleRecordingAsync() {
      return this._cameraRef.current?.toggleRecording();
    }
    /**
    * Stops recording if any is in progress.
    * @platform android
    * @platform ios
    */
    stopRecording() {
      this._cameraRef.current?.stopRecording();
    }
    _onCameraReady = () => {
      this.props.onCameraReady?.();
    };
    _onAvailableLensesChanged = ({
      nativeEvent
    }) => {
      this.props.onAvailableLensesChanged?.(nativeEvent);
    };
    _onMountError = ({
      nativeEvent
    }) => {
      this.props.onMountError?.(nativeEvent);
    };
    _onResponsiveOrientationChanged = ({
      nativeEvent
    }) => {
      this.props.onResponsiveOrientationChanged?.(nativeEvent);
    };
    _onRecordingProgress = ({
      nativeEvent
    }) => {
      const {
        duration,
        fileSize,
        maxDuration
      } = nativeEvent;
      this.props.onRecordingProgress?.({
        duration,
        fileSize,
        maxDuration: maxDuration ?? undefined
      });
    };
    _onObjectDetected = callback => ({
      nativeEvent
    }) => {
      const {
        type
      } = nativeEvent;
      if (this._lastEvents[type] && this._lastEventsTimes[type] && JSON.stringify(nativeEvent) === this._lastEvents[type] && new Date().getTime() - this._lastEventsTimes[type].getTime() < EventThrottleMs) {
        return;
      }
      if (callback) {
        callback(nativeEvent);
        this._lastEventsTimes[type] = new Date();
        this._lastEvents[type] = JSON.stringify(nativeEvent);
      }
    };
    render() {
      const nativeProps = (0, _utilsProps.ensureNativeProps)(this.props);
      const onBarcodeScanned = this.props.onBarcodeScanned ? this._onObjectDetected(this.props.onBarcodeScanned) : undefined;
      // @ts-expect-error
      if (nativeProps.children && !loggedRenderingChildrenWarning) {
        console.warn('The <CameraView> component does not support children. This may lead to inconsistent behaviour or crashes. If you want to render content on top of the Camera, consider using absolute positioning.');
        loggedRenderingChildrenWarning = true;
      }
      return /*#__PURE__*/(0, _reactJsxRuntime.jsx)(ExpoCamera.default, {
        ...nativeProps,
        ref: this._cameraRef,
        onCameraReady: this._onCameraReady,
        onMountError: this._onMountError,
        onBarcodeScanned: onBarcodeScanned,
        onAvailableLensesChanged: this._onAvailableLensesChanged,
        onPictureSaved: _onPictureSaved,
        onResponsiveOrientationChanged: this._onResponsiveOrientationChanged,
        onRecordingProgress: this._onRecordingProgress
      });
    }
  }
},1328,[97,643,6,1329,1324,1335]);
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
  var _reactJsxRuntime = require(_dependencyMap[0]);
  var _expo = require(_dependencyMap[1]);
  var _react = require(_dependencyMap[2]);
  var _reactNativeWebDistExportsStyleSheet = require(_dependencyMap[3]);
  var StyleSheet = _interopDefault(_reactNativeWebDistExportsStyleSheet);
  var _reactNativeWebDistExportsView = require(_dependencyMap[4]);
  var View = _interopDefault(_reactNativeWebDistExportsView);
  var _reactNativeWebDistExportsCreateElement = require(_dependencyMap[5]);
  var createElement = _interopDefault(_reactNativeWebDistExportsCreateElement);
  var _ExpoCameraManagerWeb = require(_dependencyMap[6]);
  var CameraManager = _interopDefault(_ExpoCameraManagerWeb);
  var _webWebCameraUtils = require(_dependencyMap[7]);
  var _webWebConstants = require(_dependencyMap[8]);
  var _webUseWebBarcodeScanner = require(_dependencyMap[9]);
  var _webUseWebCameraStream = require(_dependencyMap[10]);
  const ExponentCamera = ({
    facing,
    poster,
    ref,
    ...props
  }) => {
    const video = (0, _react.useRef)(null);
    const cameraSettings = (0, _react.useMemo)(() => ({
      ...props,
      flashMode: props.enableTorch ? 'torch' : props.flashMode
    }), [props.enableTorch, props.flashMode, props.zoom, props.autoFocus]);
    const native = (0, _webUseWebCameraStream.useWebCameraStream)(video, facing, cameraSettings, {
      onCameraReady: props.onCameraReady,
      onMountError: props.onMountError
    });
    const barcodeTypes = props.barcodeScannerSettings?.barcodeTypes;
    const isScannerEnabled = (0, _react.useMemo)(() => {
      return !!barcodeTypes?.length && !!props.onBarcodeScanned;
    }, [barcodeTypes, props.onBarcodeScanned]);
    (0, _webUseWebBarcodeScanner.useWebBarcodeScanner)(video, {
      interval: 300,
      isEnabled: isScannerEnabled,
      barcodeTypes: barcodeTypes ?? [],
      isMirrored: native.type === 'front',
      onScanned: props.onBarcodeScanned
    });
    (0, _react.useImperativeHandle)(ref, () => ({
      async getAvailablePictureSizes() {
        return _webWebConstants.PictureSizes;
      },
      async takePicture(options) {
        if (!video.current || !(0, _webWebCameraUtils.isVideoReadyForCapture)(video.current)) {
          throw new _expo.CodedError('ERR_CAMERA_NOT_READY', 'HTMLVideoElement does not have enough camera data to construct an image yet.');
        }
        const settings = native.mediaTrackSettings;
        if (!settings) {
          throw new _expo.CodedError('ERR_CAMERA_NOT_READY', 'MediaStream is not ready yet.');
        }
        return (0, _webWebCameraUtils.capture)(video.current, settings, {
          ...options,
          onPictureSaved(picture) {
            options.onPictureSaved?.(picture);
            props.onPictureSaved?.({
              nativeEvent: {
                data: picture,
                id: -1
              }
            });
          }
        });
      },
      async resumePreview() {
        if (video.current) {
          video.current.play();
        }
      },
      async pausePreview() {
        if (video.current) {
          video.current.pause();
        }
      },
      async stopRecording() {
        console.warn('stopRecording is not supported on web.');
      },
      async record() {
        console.warn('record is not supported on web.');
        return {
          uri: ''
        };
      },
      async toggleRecording() {
        console.warn('toggleRecording is not supported on web.');
      },
      async launchModernScanner() {
        console.warn('launchModernScanner is not supported on web.');
      },
      async getAvailableLenses() {
        console.warn('getAvailableLenses is not supported on web.');
        return [];
      }
    }), [native.mediaTrackSettings, props.onPictureSaved]);
    const style = (0, _react.useMemo)(() => {
      const isFrontFacingCamera = native.type === CameraManager.default.Type.front;
      return [StyleSheet.default.absoluteFill, styles.video, {
        pointerEvents: props.pointerEvents,
        // Flip the camera
        transform: isFrontFacingCamera ? [{
          scaleX: -1
        }] : undefined
      }];
    }, [props.pointerEvents, native.type]);
    return /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(View.default, {
      style: [styles.videoWrapper, props.style],
      children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Video, {
        autoPlay: true,
        playsInline: true,
        muted: true,
        poster: poster,
        ref: video,
        style: style
      }), props.children]
    });
  };
  var _default = ExponentCamera;
  const Video = props => (0, createElement.default)('video', {
    ...props
  });
  const styles = StyleSheet.default.create({
    videoWrapper: {
      flex: 1,
      alignItems: 'stretch',
      pointerEvents: 'box-none'
    },
    video: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  });
},1329,[97,643,6,117,198,105,1324,1330,1332,1333,1334]);
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
  exports.getImageSize = getImageSize;
  exports.toDataURL = toDataURL;
  exports.hasValidConstraints = hasValidConstraints;
  exports.isVideoReadyForCapture = isVideoReadyForCapture;
  exports.captureImageContext = captureImageContext;
  exports.captureImage = captureImage;
  exports.getIdealConstraints = getIdealConstraints;
  exports.getPreferredStreamDevice = getPreferredStreamDevice;
  exports.getStreamDevice = getStreamDevice;
  exports.isWebKit = isWebKit;
  exports.compareStreams = compareStreams;
  exports.capture = capture;
  exports.syncTrackCapabilities = syncTrackCapabilities;
  exports.stopMediaStream = stopMediaStream;
  exports.setVideoSource = setVideoSource;
  exports.isCapabilityAvailable = isCapabilityAvailable;
  var _WebCapabilityUtils = require(_dependencyMap[0]);
  var CapabilityUtils = _interopNamespace(_WebCapabilityUtils);
  var _WebConstants = require(_dependencyMap[1]);
  var _WebUserMediaManager = require(_dependencyMap[2]);
  /* eslint-env browser */

  function getImageSize(videoWidth, videoHeight, scale) {
    const width = videoWidth * scale;
    const ratio = videoWidth / width;
    const height = videoHeight / ratio;
    return {
      width,
      height
    };
  }
  function toDataURL(canvas, imageType, quality) {
    const format = _WebConstants.ImageTypeFormat[imageType];
    if (imageType === 'jpg') {
      return canvas.toDataURL(format, quality);
    } else {
      return canvas.toDataURL(format);
    }
  }
  function hasValidConstraints(preferredCameraType, width, height) {
    return preferredCameraType !== undefined && width !== undefined && height !== undefined;
  }
  function ensureCameraPictureOptions(config) {
    return {
      ...config,
      scale: config.scale ?? 1,
      imageType: config.imageType ?? 'png',
      isImageMirror: config.isImageMirror ?? false
    };
  }
  const DEFAULT_QUALITY = 0.92;
  /**
   * Whether the video has a decoded frame that can be drawn to a canvas.
   * Live streams may never reach `HAVE_ENOUGH_DATA` in some browsers (WebKit stays at `HAVE_FUTURE_DATA`),
   * so a current frame with known dimensions is all that is required to capture a picture.
   */
  function isVideoReadyForCapture(video) {
    return video.readyState >= video.HAVE_CURRENT_DATA && video.videoWidth > 0;
  }
  function captureImageContext(video, {
    scale = 1,
    isImageMirror = false
  }) {
    const {
      videoWidth,
      videoHeight
    } = video;
    const {
      width,
      height
    } = getImageSize(videoWidth, videoHeight, scale);
    // Build the canvas size and draw the camera image to the context from video
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext('2d', {
      alpha: false
    });
    if (!context) {
      // Should never be called
      throw new Error('Context is not defined');
    }
    // sharp image details
    // context.imageSmoothingEnabled = false;
    // Flip horizontally (as css transform: rotateY(180deg))
    if (isImageMirror) {
      context.setTransform(-1, 0, 0, 1, canvas.width, 0);
    }
    context.drawImage(video, 0, 0, width, height);
    return canvas;
  }
  function captureImage(video, pictureOptions) {
    const config = ensureCameraPictureOptions(pictureOptions);
    const canvas = captureImageContext(video, config);
    const {
      imageType,
      quality = DEFAULT_QUALITY
    } = config;
    return toDataURL(canvas, imageType, quality);
  }
  function getSupportedConstraints() {
    if (navigator.mediaDevices && navigator.mediaDevices.getSupportedConstraints) {
      return navigator.mediaDevices.getSupportedConstraints();
    }
    return null;
  }
  function getIdealConstraints(preferredCameraType, width, height) {
    const preferredConstraints = {
      audio: false,
      video: {}
    };
    if (hasValidConstraints(preferredCameraType, width, height)) {
      return _WebConstants.MinimumConstraints;
    }
    const supports = getSupportedConstraints();
    // TODO(Bacon): Test this
    if (!supports || !supports.facingMode || !supports.width || !supports.height) {
      return _WebConstants.MinimumConstraints;
    }
    const types = ['front', 'back'];
    if (preferredCameraType && types.includes(preferredCameraType)) {
      const facingMode = _WebConstants.CameraTypeToFacingMode[preferredCameraType];
      if (isWebKit()) {
        const key = facingMode === 'user' ? 'exact' : 'ideal';
        preferredConstraints.video.facingMode = {
          [key]: facingMode
        };
      } else {
        preferredConstraints.video.facingMode = {
          ideal: _WebConstants.CameraTypeToFacingMode[preferredCameraType]
        };
      }
    }
    if (isMediaTrackConstraints(preferredConstraints.video)) {
      preferredConstraints.video.width = width;
      preferredConstraints.video.height = height;
    }
    return preferredConstraints;
  }
  function isMediaTrackConstraints(input) {
    return input && typeof input.video !== 'boolean';
  }
  /**
   * Invoke getStreamDevice a second time with the opposing camera type if the preferred type cannot be retrieved.
   *
   * @param preferredCameraType
   * @param preferredWidth
   * @param preferredHeight
   */
  async function getPreferredStreamDevice(preferredCameraType, preferredWidth, preferredHeight) {
    try {
      return await getStreamDevice(preferredCameraType, preferredWidth, preferredHeight);
    } catch (error) {
      // A hack on desktop browsers to ensure any camera is used.
      // eslint-disable-next-line no-undef
      if (error instanceof OverconstrainedError && error.constraint === 'facingMode') {
        const nextCameraType = preferredCameraType === 'back' ? 'front' : 'back';
        return await getStreamDevice(nextCameraType, preferredWidth, preferredHeight);
      }
      throw error;
    }
  }
  async function getStreamDevice(preferredCameraType, preferredWidth, preferredHeight) {
    const constraints = getIdealConstraints(preferredCameraType, preferredWidth, preferredHeight);
    return (0, _WebUserMediaManager.requestUserMediaAsync)(constraints);
  }
  function isWebKit() {
    return /WebKit/.test(navigator.userAgent) && !/Edg/.test(navigator.userAgent);
  }
  function compareStreams(a, b) {
    const settingsA = a?.getTracks()[0]?.getSettings();
    const settingsB = b?.getTracks()[0]?.getSettings();
    if (!settingsA || !settingsB) {
      return false;
    }
    return settingsA.deviceId === settingsB.deviceId;
  }
  function capture(video, settings, config) {
    const base64 = captureImage(video, config);
    const {
      width = 0,
      height = 0
    } = settings;
    const capturedPicture = {
      uri: base64,
      base64,
      width,
      height,
      format: config.imageType ?? 'jpg',
      exif: settings
    };
    config.onPictureSaved?.(capturedPicture);
    return capturedPicture;
  }
  async function syncTrackCapabilities(cameraType, stream, settings = {}) {
    if (stream?.getVideoTracks) {
      await Promise.all(stream.getVideoTracks().map(track => onCapabilitiesReady(cameraType, track, settings)));
    }
  }
  // https://developer.mozilla.org/en-US/docs/Web/API/MediaTrackConstraints
  async function onCapabilitiesReady(cameraType, track, settings = {}) {
    if (typeof track.getCapabilities !== 'function') {
      return;
    }
    const capabilities = track.getCapabilities();
    // Create an empty object because if you set a constraint that isn't available an error will be thrown.
    const constraints = {};
    // TODO(Bacon): Add `pointsOfInterest` support
    const clampedValues = ['exposureCompensation', 'colorTemperature', 'iso', 'brightness', 'contrast', 'saturation', 'sharpness', 'focusDistance', 'zoom'];
    for (const property of clampedValues) {
      if (capabilities[property]) {
        constraints[property] = convertNormalizedSetting(capabilities[property], settings[property]);
      }
    }
    function validatedInternalConstrainedValue(constraintKey, settingsKey, converter) {
      const convertedSetting = converter(settings[settingsKey]);
      return validatedConstrainedValue({
        constraintKey,
        settingsKey,
        convertedSetting,
        capabilities,
        settings,
        cameraType
      });
    }
    if (capabilities.focusMode && settings.autoFocus !== undefined) {
      constraints.focusMode = validatedInternalConstrainedValue('focusMode', 'autoFocus', CapabilityUtils.convertAutoFocusJSONToNative);
    }
    if (capabilities.torch && settings.flashMode !== undefined) {
      constraints.torch = validatedInternalConstrainedValue('torch', 'flashMode', CapabilityUtils.convertFlashModeJSONToNative);
    }
    if (capabilities.whiteBalanceMode && settings.whiteBalance !== undefined) {
      constraints.whiteBalanceMode = validatedInternalConstrainedValue('whiteBalanceMode', 'whiteBalance', CapabilityUtils.convertWhiteBalanceJSONToNative);
    }
    try {
      await track.applyConstraints({
        advanced: [constraints]
      });
    } catch (error) {}
  }
  function stopMediaStream(stream) {
    if (!stream) {
      return;
    }
    stream.getAudioTracks().forEach(track => track.stop());
    stream.getVideoTracks().forEach(track => track.stop());
  }
  function setVideoSource(video, stream) {
    video.srcObject = stream;
  }
  function isCapabilityAvailable(video, keyName) {
    const stream = video.srcObject;
    if (stream instanceof MediaStream) {
      const capability = stream.getVideoTracks()[0]?.getCapabilities()[keyName];
      return !!capability;
    }
    return false;
  }
  function convertNormalizedSetting(range, value) {
    if (!value) {
      return;
    }
    // TODO(@kitten): Handle undefined values / normalize explicitly
    // convert the normalized incoming setting to the native camera zoom range
    const converted = convertRange(value, [range.min, range.max]);
    // clamp value so we don't get an error
    return Math.min(range.max, Math.max(range.min, converted));
  }
  function convertRange(value, r2, r1 = [0, 1]) {
    return (value - r1[0]) * (r2[1] - r2[0]) / (r1[1] - r1[0]) + r2[0];
  }
  function validatedConstrainedValue(props) {
    const {
      constraintKey,
      settingsKey,
      convertedSetting,
      capabilities,
      settings,
      cameraType
    } = props;
    const setting = settings[settingsKey];
    if (Array.isArray(capabilities[constraintKey]) && convertedSetting && !capabilities[constraintKey].includes(convertedSetting)) {
      return undefined;
    }
    return convertedSetting;
  }
},1330,[1331,1332,1327]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  exports.convertFlashModeJSONToNative = convertFlashModeJSONToNative;
  exports.convertWhiteBalanceJSONToNative = convertWhiteBalanceJSONToNative;
  exports.convertAutoFocusJSONToNative = convertAutoFocusJSONToNative;
  /*
   * Native web camera (Android) has a torch: boolean
   */
  function convertFlashModeJSONToNative(input) {
    switch (input) {
      case 'torch':
        return true;
      case 'on':
      case 'off':
      case 'auto':
      default:
        return false;
    }
  }
  function convertWhiteBalanceJSONToNative(input) {
    switch (input) {
      case 'on':
      case 'auto':
        return 'continuous';
      case 'off':
        return 'none';
      case 'singleShot':
        return 'single-shot';
      default:
        return undefined;
    }
  }
  function convertAutoFocusJSONToNative(input) {
    switch (input) {
      case 'on':
      case 'auto':
        return 'continuous';
      case 'off':
        return 'manual';
      case 'singleShot':
        return 'single-shot';
      default:
        return undefined;
    }
  }
},1331,[]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  Object.defineProperty(exports, "VIDEO_ASPECT_RATIOS", {
    enumerable: true,
    get: function () {
      return VIDEO_ASPECT_RATIOS;
    }
  });
  Object.defineProperty(exports, "PictureSizes", {
    enumerable: true,
    get: function () {
      return PictureSizes;
    }
  });
  Object.defineProperty(exports, "ImageTypeFormat", {
    enumerable: true,
    get: function () {
      return ImageTypeFormat;
    }
  });
  Object.defineProperty(exports, "MinimumConstraints", {
    enumerable: true,
    get: function () {
      return MinimumConstraints;
    }
  });
  Object.defineProperty(exports, "CameraTypeToFacingMode", {
    enumerable: true,
    get: function () {
      return CameraTypeToFacingMode;
    }
  });
  Object.defineProperty(exports, "FacingModeToCameraType", {
    enumerable: true,
    get: function () {
      return FacingModeToCameraType;
    }
  });
  // https://developer.mozilla.org/en-US/docs/Web/API/MediaTrackConstraints/aspectRatio
  const VIDEO_ASPECT_RATIOS = {
    '3840x2160': 1.7777777777777777,
    '1920x1080': 1.7777777777777777,
    '1280x720': 1.7777777777777777,
    '640x480': 1.3333333333333333,
    '352x288': 1.2222222222222223
  };
  const PictureSizes = Object.keys(VIDEO_ASPECT_RATIOS);
  const ImageTypeFormat = {
    jpg: 'image/jpeg',
    png: 'image/png'
  };
  const MinimumConstraints = {
    audio: false,
    video: true
  };
  const CameraTypeToFacingMode = {
    front: 'user',
    back: 'environment'
  };
  const FacingModeToCameraType = {
    user: 'front',
    environment: 'back'
  };
},1332,[]);
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
  exports.useWebBarcodeScanner = useWebBarcodeScanner;
  var _react = require(_dependencyMap[0]);
  var React = _interopNamespace(_react);
  var _WebBarcodeScanner = require(_dependencyMap[1]);
  var WebBarcodeScanner = _interopNamespace(_WebBarcodeScanner);
  function mapToViewCoordinates(result, videoWidth, viewHeight, height, width, isMirrored) {
    const scaleX = width / videoWidth;
    const scaleY = viewHeight / height;
    const mapPoint = p => {
      const x = isMirrored ? width - p.x * scaleX : p.x * scaleX;
      const y = p.y * scaleY;
      return {
        x,
        y
      };
    };
    const origin = mapPoint(result.bounds.origin);
    const size = {
      width: result.bounds.size.width * scaleX,
      height: result.bounds.size.height * scaleY
    };
    if (isMirrored) {
      origin.x -= size.width;
    }
    return {
      ...result,
      bounds: {
        origin,
        size
      },
      cornerPoints: result.cornerPoints.map(mapPoint)
    };
  }
  function useWebBarcodeScanner(video, {
    isEnabled,
    barcodeTypes,
    interval,
    isMirrored = false,
    onScanned,
    onError
  }) {
    const isRunning = React.useRef(false);
    const timeout = React.useRef(undefined);
    async function scanAsync() {
      if (!isRunning.current || !onScanned) {
        stop();
        return;
      }
      try {
        const videoEl = video.current;
        if (!videoEl || videoEl.readyState !== videoEl.HAVE_ENOUGH_DATA) {
          return;
        }
        const {
          videoWidth,
          videoHeight
        } = videoEl;
        if (!videoWidth || !videoHeight) {
          return;
        }
        const bitmap = await createImageBitmap(videoEl);
        const results = await WebBarcodeScanner.detect(bitmap, barcodeTypes);
        bitmap.close();
        const viewWidth = videoEl.clientWidth || videoWidth;
        const viewHeight = videoEl.clientHeight || videoHeight;
        for (const raw of results) {
          const nativeEvent = mapToViewCoordinates(raw, videoWidth, videoHeight, viewWidth, viewHeight, isMirrored);
          onScanned({
            nativeEvent
          });
        }
      } catch (error) {
        onError?.({
          nativeEvent: error
        });
      } finally {
        if (interval === 0) {
          stop();
        } else {
          const intervalToUse = !interval || interval < 0 ? 16 : interval;
          timeout.current = setTimeout(() => {
            scanAsync();
          }, intervalToUse);
        }
      }
    }
    function stop() {
      isRunning.current = false;
      clearTimeout(timeout.current);
    }
    React.useEffect(() => {
      if (isEnabled) {
        isRunning.current = true;
        scanAsync();
      }
      return stop;
    }, [isEnabled]);
  }
},1333,[6,1326]);
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
  exports.useWebCameraStream = useWebCameraStream;
  var _react = require(_dependencyMap[0]);
  var React = _interopNamespace(_react);
  var _WebCameraUtils = require(_dependencyMap[1]);
  var Utils = _interopNamespace(_WebCameraUtils);
  var _WebConstants = require(_dependencyMap[2]);
  /* eslint-env browser */

  const VALID_SETTINGS_KEYS = ['autoFocus', 'flashMode', 'exposureCompensation', 'colorTemperature', 'iso', 'brightness', 'contrast', 'saturation', 'sharpness', 'focusDistance', 'whiteBalance', 'zoom'];
  function useLoadedVideo(video, onLoaded) {
    React.useEffect(() => {
      if (video) {
        video.addEventListener('loadedmetadata', () => {
          // without this async block the constraints aren't properly applied to the camera,
          // this means that if you were to turn on the torch and swap to the front camera,
          // then swap back to the rear camera the torch setting wouldn't be applied.
          requestAnimationFrame(() => {
            onLoaded();
          });
        });
      }
    }, [video]);
  }
  function useWebCameraStream(video, preferredType, settings, {
    onCameraReady,
    onMountError
  }) {
    const isStartingCamera = React.useRef(false);
    const activeStreams = React.useRef([]);
    const capabilities = React.useRef({
      autoFocus: 'continuous',
      flashMode: 'off',
      whiteBalance: 'continuous',
      zoom: 0
    });
    const [stream, setStream] = React.useState(null);
    const mediaTrackSettings = React.useMemo(() => {
      return stream?.getTracks()[0]?.getSettings() ?? null;
    }, [stream]);
    // The actual camera type - this can be different from the incoming camera type.
    const type = React.useMemo(() => {
      if (!mediaTrackSettings) {
        return null;
      }
      // On desktop no value will be returned, in this case we should assume the cameraType is 'front'
      const {
        facingMode = 'user'
      } = mediaTrackSettings;
      return _WebConstants.FacingModeToCameraType[facingMode] ?? null;
    }, [mediaTrackSettings]);
    const getStreamDeviceAsync = React.useCallback(async () => {
      try {
        return await Utils.getPreferredStreamDevice(preferredType);
      } catch (nativeEvent) {
        onMountError?.({
          nativeEvent
        });
        return null;
      }
    }, [preferredType, onMountError]);
    const resumeAsync = React.useCallback(async () => {
      const nextStream = await getStreamDeviceAsync();
      if (Utils.compareStreams(nextStream, stream)) {
        // Do nothing if the streams are the same.
        // This happens when the device only supports one camera (i.e. desktop) and the mode was toggled between front/back while already active.
        // Without this check there is a screen flash while the video switches.
        return false;
      }
      // Save a history of all active streams (usually 2+) so we can close them later.
      // Keeping them open makes swapping camera types much faster.
      if (!activeStreams.current.some(value => value.id === nextStream?.id)) {
        activeStreams.current.push(nextStream);
      }
      setStream(nextStream);
      return false;
    }, [getStreamDeviceAsync, setStream, stream, activeStreams.current]);
    React.useEffect(() => {
      // Restart the camera and guard concurrent actions.
      if (isStartingCamera.current) {
        return;
      }
      isStartingCamera.current = true;
      resumeAsync().then(isStarting => {
        isStartingCamera.current = isStarting;
      }).catch(() => {
        // ensure the camera can be started again.
        isStartingCamera.current = false;
      });
    }, [preferredType]);
    // Update the native camera with any custom capabilities.
    React.useEffect(() => {
      const changes = {};
      for (const key of VALID_SETTINGS_KEYS) {
        if (key in settings) {
          const nextValue = settings[key];
          if (nextValue !== capabilities.current[key]) {
            changes[key] = nextValue;
          }
        }
      }
      const hasChanges = Object.keys(changes).length > 0;
      if (hasChanges) {
        Utils.syncTrackCapabilities(preferredType, stream, changes);
      }
      capabilities.current = {
        ...capabilities.current,
        ...changes
      };
    }, [settings.autoFocus, settings.flashMode, settings.exposureCompensation, settings.colorTemperature, settings.iso, settings.brightness, settings.contrast, settings.saturation, settings.sharpness, settings.focusDistance, settings.whiteBalance, settings.zoom]);
    const onCameraReadyRef = React.useRef(onCameraReady);
    onCameraReadyRef.current = onCameraReady;
    React.useEffect(() => {
      // set or unset the video source.
      const element = video.current;
      if (!element) {
        return;
      }
      Utils.setVideoSource(element, stream);
      if (!stream) {
        return;
      }
      // Only report the camera as ready once the video has a frame to capture,
      // otherwise `takePictureAsync` would throw `ERR_CAMERA_NOT_READY`.
      const readyEvents = ['loadeddata', 'canplay', 'canplaythrough', 'playing'];
      const onVideoReady = () => {
        if (!Utils.isVideoReadyForCapture(element)) {
          return;
        }
        removeListeners();
        onCameraReadyRef.current?.();
      };
      const removeListeners = () => {
        for (const event of readyEvents) {
          element.removeEventListener(event, onVideoReady);
        }
      };
      for (const event of readyEvents) {
        element.addEventListener(event, onVideoReady);
      }
      onVideoReady();
      return removeListeners;
    }, [video.current, stream]);
    React.useEffect(() => {
      return () => {
        // Clean up on dismount, this is important for making sure the camera light goes off when the component is removed.
        for (const stream of activeStreams.current) {
          // Close all open streams.
          Utils.stopMediaStream(stream);
        }
        if (video.current) {
          // Invalidate the video source.
          Utils.setVideoSource(video.current, stream);
        }
      };
    }, []);
    // Update props when the video loads.
    useLoadedVideo(video.current, () => {
      Utils.syncTrackCapabilities(preferredType, stream, capabilities.current);
    });
    return {
      type,
      mediaTrackSettings
    };
  }
},1334,[6,1330,1332]);
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
  Object.defineProperty(exports, "ConversionTables", {
    enumerable: true,
    get: function () {
      return ConversionTables;
    }
  });
  exports.convertNativeProps = convertNativeProps;
  exports.ensureNativeProps = ensureNativeProps;
  require(_dependencyMap[0]);
  var _ExpoCameraManager = require(_dependencyMap[1]);
  var CameraManager = _interopDefault(_ExpoCameraManager);
  // Values under keys from this object will be transformed to native options
  const ConversionTables = {
    type: CameraManager.default.Type,
    flash: CameraManager.default.FlashMode
  };
  function convertNativeProps(props) {
    if (!props || typeof props !== 'object') {
      return {};
    }
    const nativeProps = {};
    for (const [key, value] of Object.entries(props)) {
      const prop = key;
      if (typeof value === 'string' && ConversionTables[prop]) {
        nativeProps[key] = ConversionTables[prop][value];
      } else {
        nativeProps[key] = value;
      }
    }
    return nativeProps;
  }
  function ensureNativeProps(props) {
    const newProps = convertNativeProps(props);
    newProps.barcodeScannerEnabled = !!props?.onBarcodeScanned;
    newProps.flashMode = props?.flash ?? 'off';
    newProps.mute = props?.mute ?? false;
    newProps.autoFocus = props?.autofocus ?? 'off';
    return newProps;
  }
},1335,[643,1324]);
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
  require(_dependencyMap[0]);
  var _ExpoCameraManager = require(_dependencyMap[1]);
  var CameraManager = _interopDefault(_ExpoCameraManager);
  var _default = CameraManager.default.Picture;
},1336,[643,1324]);