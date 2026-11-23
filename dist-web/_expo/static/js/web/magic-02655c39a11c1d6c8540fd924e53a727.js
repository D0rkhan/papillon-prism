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
      return SettingsMagic;
    }
  });
  var _getpapillonPapicons = require(_dependencyMap[0]);
  var _expoRouterReactNavigation = require(_dependencyMap[1]);
  var _i18next = require(_dependencyMap[2]);
  var _react = require(_dependencyMap[3]);
  var _reactNativeWebDistExportsAlert = require(_dependencyMap[4]);
  var Alert = _interopDefault(_reactNativeWebDistExportsAlert);
  var _componentsSettingsHeader = require(_dependencyMap[5]);
  var SettingsHeader = _interopDefault(_componentsSettingsHeader);
  var _packageJson = require(_dependencyMap[6]);
  var packageJson = _interopDefault(_packageJson);
  var _storesSettings = require(_dependencyMap[7]);
  var _uiComponentsIcon = require(_dependencyMap[8]);
  var Icon = _interopDefault(_uiComponentsIcon);
  var _uiNewList = require(_dependencyMap[9]);
  var List = _interopDefault(_uiNewList);
  var _uiNewTypography = require(_dependencyMap[10]);
  var Typography = _interopDefault(_uiNewTypography);
  var _utilsEndpoints = require(_dependencyMap[11]);
  var _utilsLoggerLogger = require(_dependencyMap[12]);
  var _utilsMagicModelManager = require(_dependencyMap[13]);
  var ModelManager = _interopDefault(_utilsMagicModelManager);
  var _utilsMagicUpdater = require(_dependencyMap[14]);
  var _reactJsxRuntime = require(_dependencyMap[15]);
  function getMagicURL() {
    return _storesSettings.useSettingsStore.getState().personalization.magicModelURL || _utilsEndpoints.MAGIC_URL;
  }
  function SettingsMagic() {
    const theme = (0, _expoRouterReactNavigation.useTheme)();
    const {
      colors
    } = theme;
    const settingsStore = (0, _storesSettings.useSettingsStore)(state => state.personalization);
    const mutateProperty = (0, _storesSettings.useSettingsStore)(state => state.mutateProperty);
    const [modelStatus, setModelStatus] = (0, _react.useState)(null);
    const [currentPtr, setCurrentPtr] = (0, _react.useState)(null);
    const [isUpdating, setIsUpdating] = (0, _react.useState)(false);
    const [lastUpdateCheck, setLastUpdateCheck] = (0, _react.useState)(null);
    (0, _react.useEffect)(() => {
      const updateStatus = async () => {
        const status = ModelManager.default.getStatus();
        setModelStatus(status);
        try {
          const ptr = await (0, _utilsMagicUpdater.getCurrentPtr)();
          setCurrentPtr(ptr);
        } catch (error) {
          (0, _utilsLoggerLogger.log)("Erreur lors de la récupération du pointeur: " + error);
        }
      };
      updateStatus();
    }, []);
    const refreshStatus = async () => {
      const status = ModelManager.default.getStatus();
      setModelStatus(status);
      try {
        const ptr = await (0, _utilsMagicUpdater.getCurrentPtr)();
        setCurrentPtr(ptr);
      } catch (error) {
        (0, _utilsLoggerLogger.log)("Erreur lors de la récupération du pointeur: " + error);
      }
    };
    const showDetailedStatus = () => {
      if (!modelStatus) {
        return;
      }
      (0, _utilsLoggerLogger.log)("Statut détaillé du modèle:" + JSON.stringify({
        hasModel: modelStatus.hasModel,
        modelType: modelStatus.modelType,
        hasInitialized: modelStatus.hasInitialized,
        isInitializing: modelStatus.isInitializing,
        maxLen: modelStatus.maxLen,
        batchSize: modelStatus.batchSize,
        labelsCount: modelStatus.labelsCount,
        wordIndexSize: modelStatus.wordIndexSize,
        oovIndex: modelStatus.oovIndex,
        tokenizerInfo: modelStatus.tokenizerInfo
      }));
    };
    const checkForUpdates = async () => {
      if (isUpdating) {
        return;
      }
      setIsUpdating(true);
      setLastUpdateCheck(new Date());
      try {
        const result = await (0, _utilsMagicUpdater.checkAndUpdateModel)(packageJson.default.version, getMagicURL());
        if (result.updated) {
          await ModelManager.default.safeInit();
          refreshStatus();
        }
      } catch (error) {
        (0, _utilsLoggerLogger.log)("Erreur lors de la vérification:" + error);
      } finally {
        setIsUpdating(false);
      }
    };
    const resetModel = async () => {
      try {
        const result = await ModelManager.default.reset();
        if (result.success) {
          refreshStatus();
        }
      } catch (error) {
        (0, _utilsLoggerLogger.log)("Erreur lors de la réinitialisation:" + error);
      }
    };
    return /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default, {
      style: {
        flex: 1,
        backgroundColor: colors.overground
      },
      safeHorizontalPadding: 20,
      contentContainerStyle: {
        paddingVertical: 20
      },
      contentInsetAdjustmentBehavior: "automatic",
      children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.View, {
        style: {
          marginBottom: 20
        },
        children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(SettingsHeader.default, {
          color: theme.dark ? "#1a0b14ff" : "#FAD9EC",
          title: "Activer Magic+",
          description: "Optimise automatiquement l'organisation de tes t\xE2ches pour am\xE9liorer ta productivit\xE9"
          // eslint-disable-next-line @typescript-eslint/no-require-imports
          ,
          imageSource: require(_dependencyMap[16]),
          onSwitchChange: isSwitchOn => {
            if (settingsStore.magicEnabled && !isSwitchOn) {
              Alert.default.alert("Désactivation de Magic+", "Papillon Magic+ sera désactivé au prochain redémarrage", [{
                text: "OK",
                style: "default"
              }]);
            }
            mutateProperty("personalization", {
              magicEnabled: !settingsStore.magicEnabled
            });
            setTimeout(refreshStatus, 100);
          },
          switchValue: settingsStore.magicEnabled,
          showSwitch: true,
          switchColor: "#DD007D"
        })
      }), settingsStore.magicEnabled && /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Section, {
        children: [/*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Item, {
          onPress: showDetailedStatus,
          children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Leading, {
            children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Icon.default, {
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
                name: "sparkles",
                size: 20,
                color: colors.primary
              })
            })
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
            variant: "title",
            children: "Statut du mod\xE8le"
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Trailing, {
            children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              color: "textSecondary",
              children: modelStatus?.hasModel ? "Chargé" : "Non chargé"
            })
          })]
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Item, {
          children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Leading, {
            children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Icon.default, {
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
                name: "butterfly",
                size: 20,
                color: colors.primary
              })
            })
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
            variant: "title",
            children: "Mod\xE8le actuel"
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Trailing, {
            children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              color: "textPrimary",
              weight: "semibold",
              children: currentPtr ? `${currentPtr.name} v${currentPtr.version}` : "Aucun"
            })
          })]
        })]
      }), settingsStore.magicEnabled && /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Section, {
        children: [/*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Item, {
          onPress: checkForUpdates,
          children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Leading, {
            children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Icon.default, {
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
                name: "search",
                size: 20,
                color: isUpdating ? "#FF8C00" : "#007BFF"
              })
            })
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
            variant: "action",
            children: "V\xE9rifier les mises \xE0 jour"
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Trailing, {
            children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Icon.default, {
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
                name: "chevronRight",
                size: 20,
                color: colors.text + "50"
              })
            })
          })]
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Item, {
          onPress: resetModel,
          children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Leading, {
            children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Icon.default, {
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
                name: "archive",
                color: "#FF4444"
              })
            })
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
            variant: "action",
            children: "R\xE9initialiser le mod\xE8le"
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Trailing, {
            children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Icon.default, {
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
                name: "chevronRight",
                size: 20,
                color: colors.text + "50"
              })
            })
          })]
        })]
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.View, {
        style: {
          marginTop: 20
        },
        children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
          variant: "caption",
          color: "textSecondary",
          children: (0, _i18next.t)("Settings_MagicPlus_ExplanationLocal")
        })
      })]
    });
  }
},922,[1002,1000,1140,6,190,1361,1362,1012,1013,1007,1008,1014,1116,1015,1373,97,1372]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  module.exports = {
    uri: "/assets/assets/images/magic.b80e60409c752285aec3e5f06bb5ce2e.png",
    width: 1344,
    height: 544,
    toString() {
      return this.uri;
    }
  };
},1372,[]);