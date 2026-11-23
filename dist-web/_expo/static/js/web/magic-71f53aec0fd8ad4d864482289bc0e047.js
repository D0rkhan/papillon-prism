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
      return Magic;
    }
  });
  var _react = require(_dependencyMap[0]);
  var _reactNativeWebDistExportsActivityIndicator = require(_dependencyMap[1]);
  var ActivityIndicator = _interopDefault(_reactNativeWebDistExportsActivityIndicator);
  require(_dependencyMap[2]);
  require(_dependencyMap[3]);
  var _reactNativeWebDistExportsView = require(_dependencyMap[4]);
  var View = _interopDefault(_reactNativeWebDistExportsView);
  var _expoRouterReactNavigation = require(_dependencyMap[5]);
  var _getpapillonPapicons = require(_dependencyMap[6]);
  var _storesMagic = require(_dependencyMap[7]);
  var _storesSettings = require(_dependencyMap[8]);
  var _uiComponentsIcon = require(_dependencyMap[9]);
  var Icon = _interopDefault(_uiComponentsIcon);
  var _uiNewList = require(_dependencyMap[10]);
  var List = _interopDefault(_uiNewList);
  var _uiNewTypography = require(_dependencyMap[11]);
  var Typography = _interopDefault(_uiNewTypography);
  var _utilsDevmodeActions = require(_dependencyMap[12]);
  var _utilsEndpoints = require(_dependencyMap[13]);
  var _utilsMagicModelManager = require(_dependencyMap[14]);
  var ModelManager = _interopDefault(_utilsMagicModelManager);
  var _reactJsxRuntime = require(_dependencyMap[15]);
  const FAILED = "#C50017";
  const SAMPLE = "ds analyse de doc";
  function Magic() {
    const {
      colors
    } = (0, _expoRouterReactNavigation.useTheme)();
    const muted = String(colors.text) + "88";
    const {
      running,
      run
    } = (0, _utilsDevmodeActions.useDevAction)();
    const [status, setStatus] = (0, _react.useState)(() => ModelManager.default.getStatus());
    const [refreshResult, setRefreshResult] = (0, _react.useState)(null);
    const [prediction, setPrediction] = (0, _react.useState)(null);
    const [resetResult, setResetResult] = (0, _react.useState)(null);
    const cached = (0, _storesMagic.useMagicStore)(state => state.processHomeworks.length);
    const customURL = (0, _storesSettings.useSettingsStore)(state => state.personalization.magicModelURL);
    const sourceURL = customURL || _utilsEndpoints.MAGIC_URL;
    const modelState = status.isInitializing ? "Chargement…" : status.hasModel ? "Chargé" : "Absent";
    const details = [["Type", status.modelType || "—"], ["Longueur maximale", status.maxLen], ["Catégories", status.labelsCount], ["Vocabulaire", status.wordIndexSize], ["Index hors vocabulaire", status.oovIndex]];
    const refresh = () => run("refresh", async () => {
      const result = await ModelManager.default.refresh();
      setRefreshResult(result.success ? {
        text: result.updated ? "Nouvelle version chargée" : "Déjà à jour",
        failed: false
      } : {
        text: result.error ?? "Échec du rafraîchissement",
        failed: true
      });
      setStatus(ModelManager.default.getStatus());
    });
    const predict = () => run("predict", async () => {
      const result = await ModelManager.default.predict(SAMPLE, true);
      if ("error" in result) {
        setPrediction({
          text: result.error,
          failed: true
        });
        return;
      }
      const score = result.labelScores[result.predicted];
      setPrediction({
        text: `${result.predicted}${score != null ? ` · ${score.toFixed(3)}` : ""}`,
        failed: false
      });
    });
    const reset = () => (0, _utilsDevmodeActions.confirmDestructive)("Réinitialiser le modèle", "Le modèle est supprimé de l'appareil et retéléchargé au prochain démarrage.", "Réinitialiser", () => run("reset", async () => {
      const result = await ModelManager.default.reset();
      setResetResult(result.success ? {
        text: "Supprimé, retéléchargé au prochain démarrage",
        failed: false
      } : {
        text: result.error ?? "Échec de la réinitialisation",
        failed: true
      });
      setStatus(ModelManager.default.getStatus());
    }));
    const resetSource = () => _storesSettings.useSettingsStore.getState().mutateProperty("personalization", {
      magicModelURL: _utilsEndpoints.MAGIC_URL
    });
    const resultLine = (result, fallback) => /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
      variant: "body2",
      color: result?.failed ? FAILED : "textSecondary",
      numberOfLines: 3,
      children: result?.text ?? fallback
    });
    return /*#__PURE__*/(0, _reactJsxRuntime.jsx)(View.default, {
      style: {
        flex: 1,
        backgroundColor: colors.overground
      },
      children: /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default, {
        showsVerticalScrollIndicator: false,
        contentInsetAdjustmentBehavior: "always",
        contentContainerStyle: {
          padding: 16,
          paddingBottom: 60
        },
        children: [/*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Section, {
          id: "model",
          children: [/*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.SectionTitle, {
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
              name: "Sparkles",
              color: muted
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Label, {
              children: "Mod\xE8le"
            })]
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Item, {
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "action",
              children: "\xC9tat"
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Trailing, {
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
                variant: "body1",
                color: status.hasModel ? "textSecondary" : FAILED,
                children: modelState
              })
            })]
          }), details.map(([label, value]) => /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Item, {
            id: label,
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "action",
              children: label
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Trailing, {
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
                variant: "body1",
                color: "textSecondary",
                children: value
              })
            })]
          }, label))]
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Section, {
          id: "actions",
          children: [/*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.SectionTitle, {
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
              name: "Play",
              color: muted
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Label, {
              children: "Actions"
            })]
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Item, {
            onPress: refresh,
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Leading, {
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Icon.default, {
                children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
                  name: "ArrowDownBox"
                })
              })
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "action",
              children: "Rafra\xEEchir le mod\xE8le"
            }), resultLine(refreshResult, "Cherche une nouvelle version sur la source."), running === "refresh" ? /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Trailing, {
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(ActivityIndicator.default, {})
            }) : null]
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Item, {
            onPress: predict,
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Leading, {
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Icon.default, {
                children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
                  name: "Play"
                })
              })
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "action",
              children: "Tester une pr\xE9diction"
            }), resultLine(prediction, `Classe « ${SAMPLE} ».`), running === "predict" ? /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Trailing, {
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(ActivityIndicator.default, {})
            }) : null]
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Item, {
            onPress: reset,
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Leading, {
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Icon.default, {
                children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
                  name: "Trash"
                })
              })
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "action",
              children: "R\xE9initialiser le mod\xE8le"
            }), resultLine(resetResult, "Supprime le modèle téléchargé."), running === "reset" ? /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Trailing, {
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(ActivityIndicator.default, {})
            }) : null]
          })]
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Section, {
          id: "cache",
          children: [/*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.SectionTitle, {
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
              name: "Archive",
              color: muted
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Label, {
              children: "Cache"
            })]
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Item, {
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "action",
              children: "Devoirs analys\xE9s"
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Trailing, {
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
                variant: "body1",
                color: "textSecondary",
                children: cached
              })
            })]
          }), cached > 0 ? /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Item, {
            onPress: () => _storesMagic.useMagicStore.getState().clear(),
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Leading, {
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Icon.default, {
                children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
                  name: "Trash"
                })
              })
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "action",
              children: "Vider le cache"
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "body2",
              color: "textSecondary",
              children: "Les devoirs seront analys\xE9s \xE0 nouveau."
            })]
          }) : null]
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Section, {
          id: "source",
          children: [/*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.SectionTitle, {
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
              name: "Link",
              color: muted
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Label, {
              children: "Source"
            })]
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Item, {
            onPress: undefined,
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "action",
              children: customURL && customURL !== _utilsEndpoints.MAGIC_URL ? "Source personnalisée" : "Source par défaut"
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "body2",
              color: "textSecondary",
              numberOfLines: 3,
              children: sourceURL
            }), null]
          }), customURL && customURL !== _utilsEndpoints.MAGIC_URL ? /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Item, {
            onPress: resetSource,
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Leading, {
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Icon.default, {
                children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
                  name: "ArrowLeft"
                })
              })
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "action",
              children: "Revenir \xE0 la source par d\xE9faut"
            })]
          }) : null]
        })]
      })
    });
  }
},850,[6,317,190,193,198,1000,1002,1011,1012,1013,1007,1008,1009,1014,1015,97]);