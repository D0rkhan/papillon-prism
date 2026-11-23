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
      return DevMode;
    }
  });
  require(_dependencyMap[0]);
  var _reactNativeWebDistExportsActivityIndicator = require(_dependencyMap[1]);
  var ActivityIndicator = _interopDefault(_reactNativeWebDistExportsActivityIndicator);
  var _reactNativeWebDistExportsAlert = require(_dependencyMap[2]);
  var Alert = _interopDefault(_reactNativeWebDistExportsAlert);
  var _reactNativeWebDistExportsPlatform = require(_dependencyMap[3]);
  var Platform = _interopDefault(_reactNativeWebDistExportsPlatform);
  var _reactNativeWebDistExportsSwitch = require(_dependencyMap[4]);
  var Switch = _interopDefault(_reactNativeWebDistExportsSwitch);
  var _reactNativeWebDistExportsView = require(_dependencyMap[5]);
  var View = _interopDefault(_reactNativeWebDistExportsView);
  var _expoRouter = require(_dependencyMap[6]);
  var _expoRouterReactNavigation = require(_dependencyMap[7]);
  var _getpapillonPapicons = require(_dependencyMap[8]);
  var _getpapillonPapillonkit = require(_dependencyMap[9]);
  var PapillonKit = _interopNamespace(_getpapillonPapillonkit);
  var _packageJson = require(_dependencyMap[10]);
  var packageJson = _interopDefault(_packageJson);
  var _componentsDevmodeAuthStateDetails = require(_dependencyMap[11]);
  var AuthStateDetails = _interopDefault(_componentsDevmodeAuthStateDetails);
  var _componentsDevmodeDisclosure = require(_dependencyMap[12]);
  var Disclosure = _interopDefault(_componentsDevmodeDisclosure);
  var _database = require(_dependencyMap[13]);
  var _databaseDatabaseProvider = require(_dependencyMap[14]);
  var _modulesPapillonTips = require(_dependencyMap[15]);
  var _servicesAuthCoordinator = require(_dependencyMap[16]);
  var _servicesMockAccount = require(_dependencyMap[17]);
  var _servicesShared = require(_dependencyMap[18]);
  var _storesAccount = require(_dependencyMap[19]);
  var _storesAccountTypes = require(_dependencyMap[20]);
  var _storesLogs = require(_dependencyMap[21]);
  var _storesLogsTypes = require(_dependencyMap[22]);
  var _storesMagic = require(_dependencyMap[23]);
  var _storesSettings = require(_dependencyMap[24]);
  var _storesTips = require(_dependencyMap[25]);
  var _uiComponentsIcon = require(_dependencyMap[26]);
  var Icon = _interopDefault(_uiComponentsIcon);
  var _uiNewList = require(_dependencyMap[27]);
  var List = _interopDefault(_uiNewList);
  var _uiNewTypography = require(_dependencyMap[28]);
  var Typography = _interopDefault(_uiNewTypography);
  var _utilsDevmodeActions = require(_dependencyMap[29]);
  var _utilsDevmodeFillStore = require(_dependencyMap[30]);
  var _utilsLoggerLogger = require(_dependencyMap[31]);
  var _utilsMagicTflite = require(_dependencyMap[32]);
  var _utilsServicesHelper = require(_dependencyMap[33]);
  var _utilsTransport = require(_dependencyMap[34]);
  var _reactJsxRuntime = require(_dependencyMap[35]);
  const SCHOOL_ADDRESS = "106 Rue de la Pompe, 75016 Paris";
  const plural = (count, word) => `${count} ${word}${count > 1 ? "s" : ""}`;
  function DevMode() {
    const {
      colors
    } = (0, _expoRouterReactNavigation.useTheme)();
    const muted = String(colors.text) + "88";
    const {
      running,
      run
    } = (0, _utilsDevmodeActions.useDevAction)();
    const mockDataEnabled = (0, _storesSettings.useSettingsStore)(state => state.personalization.mockDataEnabled ?? false);
    const account = (0, _storesAccount.useAccountStore)(state => state.accounts.find(item => item.id === state.lastUsedAccount));
    const logCount = (0, _storesLogs.useLogStore)(state => state.logs.length);
    const errorCount = (0, _storesLogs.useLogStore)(state => state.logs.filter(log => log.type === _storesLogsTypes.LogType.ERROR).length);
    const requestCount = (0, _storesLogs.useNetworkStore)(state => Array.from(state.hosts.values()).reduce((total, host) => total + host.requests.length, 0));
    const hostCount = (0, _storesLogs.useNetworkStore)(state => state.hosts.size);
    const magicCount = (0, _storesMagic.useMagicStore)(state => state.processHomeworks.length);
    const forceAllTips = (0, _storesTips.useTipsStore)(state => state.forceAll);
    const liveActivityTestMode = (0, _storesSettings.useSettingsStore)(state => state.personalization.liveActivityTestMode ?? false);
    const attachMockData = () => {
      if (!account) {
        Alert.default.alert("Aucun compte actif", "Crée d'abord un compte, puis reviens attacher Mock Data.");
        return;
      }
      if (account.services.some(service => service.serviceId === _storesAccountTypes.Services.MOCK_DATA)) {
        Alert.default.alert("Mock Data déjà attaché", "Utilise « Remplir la base » pour récupérer ses données.");
        return;
      }
      Alert.default.alert("Attacher Mock Data", `Ajoute le service fictif à ${account.firstName} ${account.lastName}.`, [{
        text: "Annuler",
        style: "cancel"
      }, {
        text: "Attacher",
        onPress: () => run("attach", _servicesMockAccount.attachMockDataToCurrentAccount)
      }]);
    };
    const fillStore = () => run("fill", async () => {
      const report = await (0, _utilsDevmodeFillStore.fillStoreFromServices)();
      Alert.default.alert(report.failures.length > 0 ? "Remplissage incomplet" : "Base remplie", [report.account ? `${report.account.name} · ${plural(report.account.serviceCount, "service")}` : null, report.lines.join("\n") || null, report.skipped.length ? `Non fourni par le service :\n${report.skipped.join(", ")}` : null, report.failures.length ? `Échecs :\n${report.failures.join("\n")}` : null].filter(Boolean).join("\n\n") || "Rien à récupérer.");
    });
    const disableMockData = async () => {
      const mockServices = _storesAccount.useAccountStore.getState().accounts.flatMap(item => item.services.filter(service => service.serviceId === _storesAccountTypes.Services.MOCK_DATA));
      for (const service of mockServices) {
        await (0, _databaseDatabaseProvider.ClearDatabaseForAccount)(service.id);
        (0, _servicesShared.getManager)()?.removeService(service.id);
        _storesAccount.useAccountStore.getState().removeServiceFromAccount(service.id);
      }
      _storesSettings.useSettingsStore.getState().mutateProperty("personalization", {
        mockDataEnabled: false
      });
      const activeAccountId = _storesAccount.useAccountStore.getState().lastUsedAccount;
      if (activeAccountId) {
        try {
          await (0, _servicesShared.initializeAccountManager)(activeAccountId);
        } catch (cause) {
          (0, _utilsLoggerLogger.warn)(`Mock Data was disabled, but the account manager could not refresh: ${String(cause)}`);
        }
      }
    };
    const setMockDataEnabled = enabled => {
      if (enabled) {
        _storesSettings.useSettingsStore.getState().mutateProperty("personalization", {
          mockDataEnabled: true
        });
        return;
      }
      (0, _utilsDevmodeActions.confirmDestructive)("Désactiver Mock Data", "Les services Mock Data seront retirés de tous les comptes et leurs données locales supprimées.", "Désactiver", disableMockData);
    };
    const setLiveActivityTestMode = enabled => _storesSettings.useSettingsStore.getState().mutateProperty("personalization", {
      liveActivityTestMode: enabled
    });
    const toggleForcedTips = async () => {
      if (forceAllTips) {
        _storesTips.useTipsStore.getState().setForceAll(false);
        return;
      }
      _storesTips.useTipsStore.getState().setForceAll(true);
      await (0, _modulesPapillonTips.showAllTips)();
    };
    const resetTips = () => (0, _utilsDevmodeActions.confirmDestructive)("Réinitialiser les astuces", "Les compteurs repartent de zéro. Les astuces déjà fermées reviendront au prochain lancement de l'app.", "Réinitialiser", () => {
      const tips = _storesTips.useTipsStore.getState();
      tips.reset();
      tips.requestDatastoreReset();
    });
    const resetAuthState = (serviceId, serviceName) => (0, _utilsDevmodeActions.confirmDestructive)("Réinitialiser l'état d'auth", `L'état enregistré de ${serviceName} est effacé, y compris une attente ou un blocage en cours, puis une reconnexion est lancée. Le compte reste lié.`, "Réinitialiser", () => run(`auth-${serviceId}`, async () => {
      (0, _servicesAuthCoordinator.clearAuthState)(serviceId);
      if (account) {
        await (0, _servicesShared.initializeAccountManager)(account.id, {
          force: true
        });
      }
    }));
    const testTransport = address => run(address ? "transport-address" : "transport", async () => {
      const transport = await (0, _utilsTransport.initializeTransport)(address);
      Alert.default.alert("Transport initialisé", JSON.stringify(transport, null, 2));
    });
    const clearDatabase = () => _database.database.write(async () => {
      await _database.database.unsafeResetDatabase();
    });
    const resetPapillon = async () => {
      await clearDatabase();
      _storesSettings.useSettingsStore.getState().reset();
      _storesAccount.useAccountStore.getState().reset();
      _expoRouter.router.dismissAll();
      _expoRouter.router.reload();
    };
    return /*#__PURE__*/(0, _reactJsxRuntime.jsx)(View.default, {
      style: {
        flex: 1,
        backgroundColor: colors.overground
      },
      children: /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default, {
        showsVerticalScrollIndicator: false,
        animated: true,
        contentInsetAdjustmentBehavior: "always",
        contentContainerStyle: {
          padding: 16,
          paddingBottom: 60
        },
        children: [/*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Section, {
          children: [/*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.SectionTitle, {
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
              name: "Info",
              color: muted
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Label, {
              children: "Cette installation"
            })]
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Item, {
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "action",
              children: "Papillon"
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Trailing, {
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
                variant: "body1",
                color: "textSecondary",
                children: packageJson.default.version
              })
            })]
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Item, {
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "action",
              children: "Syst\xE8me"
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Trailing, {
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
                variant: "body1",
                color: "textSecondary",
                children: `${"Android"} ${Platform.default.Version}`
              })
            })]
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Item, {
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "action",
              children: "Compte actif"
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "body2",
              color: "textSecondary",
              numberOfLines: 1,
              children: account ? `${account.firstName} ${account.lastName} · ${plural(account.services.length, "service")}` : "Aucun"
            })]
          })]
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Section, {
          children: [/*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.SectionTitle, {
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
              name: "ArrowDownBox",
              color: muted
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Label, {
              children: "Donn\xE9es"
            })]
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Item, {
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "action",
              children: "Service fictif"
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "body2",
              color: "textSecondary",
              children: "Propose Mock Data dans l'ajout de compte."
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Trailing, {
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Switch.default, {
                value: mockDataEnabled,
                onValueChange: setMockDataEnabled
              })
            })]
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Item, {
            onPress: attachMockData,
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Leading, {
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Icon.default, {
                children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
                  name: "Plus"
                })
              })
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "action",
              children: "Attacher Mock Data au compte actif"
            }), running === "attach" ? /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Trailing, {
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(ActivityIndicator.default, {})
            }) : null]
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Item, {
            onPress: fillStore,
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Leading, {
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Icon.default, {
                children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
                  name: "ArrowDownBox"
                })
              })
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "action",
              children: "Remplir la base"
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "body2",
              color: "textSecondary",
              children: "R\xE9cup\xE8re d'un coup toutes les donn\xE9es du compte actif."
            }), running === "fill" ? /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Trailing, {
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(ActivityIndicator.default, {})
            }) : null]
          })]
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Section, {
          children: [/*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.SectionTitle, {
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
              name: "Code",
              color: muted
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Label, {
              children: "Diagnostic"
            })]
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Item, {
            href: "/(dev)/logs",
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Leading, {
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Icon.default, {
                children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
                  name: "List"
                })
              })
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "action",
              children: "Journaux"
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "body2",
              color: "textSecondary",
              children: errorCount > 0 ? plural(errorCount, "erreur") : "Aucune erreur"
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Trailing, {
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Disclosure.default, {
                value: logCount
              })
            })]
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Item, {
            href: "/(dev)/network",
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Leading, {
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Icon.default, {
                children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
                  name: "Globe"
                })
              })
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "action",
              children: "Requ\xEAtes r\xE9seau"
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "body2",
              color: "textSecondary",
              children: hostCount > 0 ? plural(hostCount, "serveur") : "Aucune requête"
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Trailing, {
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Disclosure.default, {
                value: requestCount
              })
            })]
          })]
        }), account && account.services.length > 0 ? /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Section, {
          children: [/*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.SectionTitle, {
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
              name: "User",
              color: muted
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Label, {
              children: "\xC9tat d'auth"
            })]
          }), account.services.map(service => /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Item, {
            onPress: () => resetAuthState(service.id, (0, _utilsServicesHelper.getServiceName)(service.serviceId)),
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "action",
              children: (0, _utilsServicesHelper.getServiceName)(service.serviceId)
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(AuthStateDetails.default, {
              serviceId: service.id
            }), running === `auth-${service.id}` ? /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Trailing, {
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(ActivityIndicator.default, {})
            }) : null]
          }, service.id))]
        }) : null, /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Section, {
          children: [/*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.SectionTitle, {
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
              name: "Sparkles",
              color: muted
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Label, {
              children: "Modules"
            })]
          }), null, _utilsMagicTflite.MAGIC_AVAILABLE ? /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Item, {
            href: "/(dev)/magic",
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Leading, {
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Icon.default, {
                children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
                  name: "Sparkles"
                })
              })
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "action",
              children: "Papillon Magic+"
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "body2",
              color: "textSecondary",
              children: "Mod\xE8le de classement des devoirs"
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Trailing, {
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Disclosure.default, {
                value: magicCount > 0 ? plural(magicCount, "devoir") : undefined
              })
            })]
          }) : null]
        }), _modulesPapillonTips.tipsAreSupported ? /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Section, {
          children: [/*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.SectionTitle, {
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
              name: "InfoBox",
              color: muted
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Label, {
              children: "Astuces"
            })]
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Item, {
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "action",
              children: "Forcer toutes les astuces"
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "body2",
              color: "textSecondary",
              children: "Chaque astuce appara\xEEt d\xE8s le prochain passage sur son \xE9cran."
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Trailing, {
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Switch.default, {
                value: forceAllTips,
                onValueChange: () => run("tips", toggleForcedTips)
              })
            })]
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Item, {
            onPress: resetTips,
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Leading, {
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Icon.default, {
                children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
                  name: "Trash"
                })
              })
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "action",
              children: "R\xE9initialiser les astuces"
            })]
          })]
        }) : null, PapillonKit.features.liveActivities ? /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Section, {
          children: [/*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.SectionTitle, {
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
              name: "Clock",
              color: muted
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Label, {
              children: "Live Activities"
            })]
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Item, {
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "action",
              children: "Mode test des Live Activities"
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "body2",
              color: "textSecondary",
              children: "Ajoute un d\xE9clencheur sur la fiche d'un cours et met en pause la mise \xE0 jour automatique depuis l'emploi du temps."
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Trailing, {
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Switch.default, {
                value: liveActivityTestMode,
                onValueChange: setLiveActivityTestMode
              })
            })]
          })]
        }) : null, /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Section, {
          children: [/*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.SectionTitle, {
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
              name: "Bus",
              color: muted
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Label, {
              children: "Transport"
            })]
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Item, {
            onPress: () => testTransport(),
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Leading, {
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Icon.default, {
                children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
                  name: "Play"
                })
              })
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "action",
              children: "Initialiser sans adresse"
            }), running === "transport" ? /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Trailing, {
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(ActivityIndicator.default, {})
            }) : null]
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Item, {
            onPress: () => testTransport(SCHOOL_ADDRESS),
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Leading, {
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Icon.default, {
                children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
                  name: "MapPin"
                })
              })
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "action",
              children: "Initialiser avec une adresse"
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "body2",
              color: "textSecondary",
              children: SCHOOL_ADDRESS
            }), running === "transport-address" ? /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Trailing, {
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(ActivityIndicator.default, {})
            }) : null]
          })]
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Section, {
          children: [/*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.SectionTitle, {
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
              name: "Phone",
              color: muted
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Label, {
              children: "\xC9crans"
            })]
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Item, {
            href: "/(modals)/welcome",
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Leading, {
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Icon.default, {
                children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
                  name: "Butterfly"
                })
              })
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "action",
              children: "Modal de bienvenue"
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Trailing, {
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Disclosure.default, {})
            })]
          })]
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Section, {
          children: [/*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.SectionTitle, {
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
              name: "AlertTriangle",
              color: muted
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Label, {
              children: "Zone de danger"
            })]
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Item, {
            onPress: () => (0, _utilsDevmodeActions.confirmDestructive)("Supprimer la base de données", "Toutes les données enregistrées sur cet appareil seront effacées. Celles des services reviendront à la prochaine synchronisation, pas celles ajoutées à la main.", "Supprimer", async () => {
              await clearDatabase();
              Alert.default.alert("Base de données supprimée");
            }),
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Leading, {
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Icon.default, {
                children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
                  name: "Trash"
                })
              })
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "action",
              children: "Supprimer la base de donn\xE9es"
            })]
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Item, {
            onPress: () => (0, _utilsDevmodeActions.confirmDestructive)("Réinitialiser les paramètres", "Tous les réglages de Papillon reviennent à leur valeur par défaut.", "Réinitialiser", () => {
              _storesSettings.useSettingsStore.getState().reset();
              Alert.default.alert("Paramètres réinitialisés");
            }),
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Leading, {
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Icon.default, {
                children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
                  name: "Gears"
                })
              })
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "action",
              children: "R\xE9initialiser les param\xE8tres"
            })]
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Item, {
            onPress: () => (0, _utilsDevmodeActions.confirmDestructive)("Supprimer les comptes", "Tous les comptes seront déconnectés de cet appareil.", "Supprimer", () => {
              _storesAccount.useAccountStore.getState().reset();
              Alert.default.alert("Comptes supprimés");
            }),
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Leading, {
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Icon.default, {
                children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
                  name: "UserCross"
                })
              })
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "action",
              children: "Supprimer les comptes"
            })]
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Item, {
            style: {
              backgroundColor: "#C50017"
            },
            onPress: () => (0, _utilsDevmodeActions.confirmDestructive)("Réinitialiser Papillon", "Comptes, paramètres et données locales seront définitivement effacés, puis l'app redémarrera.", "Tout effacer", resetPapillon),
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Leading, {
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Icon.default, {
                fill: "#FFFFFF",
                opacity: 1,
                children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
                  name: "Trash"
                })
              })
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "title",
              color: "white",
              children: "R\xE9initialiser Papillon"
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "body2",
              color: "white",
              children: "Efface comptes, param\xE8tres et donn\xE9es locales."
            })]
          })]
        })]
      })
    });
  }
},998,[6,317,190,193,342,198,1023,1000,1002,1019,1362,1484,1016,1020,1246,1478,1134,1486,1118,1022,1109,1003,1004,1011,1012,1235,1013,1007,1008,1009,1485,1116,1375,1115,1487,97]);
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
      return AuthStateDetails;
    }
  });
  var _react = require(_dependencyMap[0]);
  var React = _interopDefault(_react);
  var _servicesAuthTypes = require(_dependencyMap[1]);
  var _storesAuthState = require(_dependencyMap[2]);
  var _uiNewTypography = require(_dependencyMap[3]);
  var Typography = _interopDefault(_uiNewTypography);
  var _reactJsxRuntime = require(_dependencyMap[4]);
  const CLOCK_INTERVAL_MS = 5000;
  const formatDelay = ms => {
    const seconds = Math.round(Math.abs(ms) / 1000);
    return seconds < 120 ? `${seconds} s` : `${Math.round(seconds / 60)} min`;
  };
  const describeAuthState = (state, now) => {
    if (!state) {
      return "Aucune connexion enregistrée";
    }
    const parts = [`${state.step}, il y a ${formatDelay(now - state.updatedAt)}`];
    if (state.step === _servicesAuthTypes.AuthStep.Failed && state.failure) {
      parts.push(`${state.failure.reason} à l'étape ${state.failure.step}`);
      if (state.failure.step === _servicesAuthTypes.AuthStep.AwaitingNewCredential) {
        parts.push("jeton peut-être consommé");
      }
    }
    if (state.nextRetryAt && state.nextRetryAt > now) {
      parts.push(`nouvel essai dans ${formatDelay(state.nextRetryAt - now)}`);
    }
    return parts.join(" · ");
  };

  // Its own component so the clock re-renders these lines, not the whole devmode screen.
  function AuthStateDetails({
    serviceId
  }) {
    const state = (0, _storesAuthState.useAuthStateStore)(store => store.services[serviceId]);
    const [now, setNow] = React.default.useState(Date.now());
    React.default.useEffect(() => {
      const timer = setInterval(() => setNow(Date.now()), CLOCK_INTERVAL_MS);
      return () => clearInterval(timer);
    }, []);
    return /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_reactJsxRuntime.Fragment, {
      children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
        variant: "body2",
        color: "textSecondary",
        children: describeAuthState(state, now)
      }), state?.failure ? /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
        variant: "caption",
        color: "textSecondary",
        numberOfLines: 3,
        children: state.failure.message
      }) : null, /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
        variant: "caption",
        color: "textSecondary",
        children: "Toucher pour r\xE9initialiser et se reconnecter"
      })]
    });
  }
},1484,[6,1488,1489,1008,97]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  exports.fillStoreFromServices = fillStoreFromServices;
  var _databaseUseHomework = require(_dependencyMap[0]);
  var _servicesShared = require(_dependencyMap[1]);
  var _servicesSharedTypes = require(_dependencyMap[2]);
  var _storesAccount = require(_dependencyMap[3]);
  var _utilsGradesHelperPeriod = require(_dependencyMap[4]);
  var _utilsLoggerLogger = require(_dependencyMap[5]);
  const WEEKS_BEFORE = 1;
  const WEEKS_AFTER = 3;
  async function fillStoreFromServices() {
    const report = {
      lines: [],
      skipped: [],
      failures: []
    };
    const {
      accounts,
      lastUsedAccount
    } = _storesAccount.useAccountStore.getState();
    if (!lastUsedAccount) {
      report.failures.push("Aucun compte actif.");
      return report;
    }
    const account = accounts.find(item => item.id === lastUsedAccount);
    report.account = {
      name: account ? `${account.firstName} ${account.lastName}` : lastUsedAccount,
      serviceCount: account?.services.length ?? 0
    };
    if (report.account.serviceCount === 0) {
      report.failures.push("Le compte actif n'a aucun service attaché, il n'y a donc rien à récupérer.");
      return report;
    }
    await (0, _servicesShared.initializeAccountManager)(lastUsedAccount);
    const manager = (0, _servicesShared.getManager)();
    if (!manager) {
      report.failures.push("Le manager n'a pas pu être initialisé.");
      return report;
    }
    const supports = capability => manager.getAvailableClients(capability).length > 0;
    const run = async (label, capability, task) => {
      if (!supports(capability)) {
        report.skipped.push(label);
        return;
      }
      try {
        report.lines.push(`${label} : ${await task()}`);
      } catch (cause) {
        report.failures.push(`${label} : ${String(cause)}`);
        (0, _utilsLoggerLogger.warn)(`fillStore — ${label} a échoué : ${String(cause)}`, "devmode");
      }
    };
    const today = new Date();
    const weeks = [];
    for (let offset = -1; offset <= WEEKS_AFTER; offset++) {
      const date = new Date(today);
      date.setDate(date.getDate() + offset * 7);
      weeks.push({
        week: (0, _databaseUseHomework.getWeekNumberFromDate)(date),
        date
      });
    }
    await run("Emploi du temps", _servicesSharedTypes.Capabilities.TIMETABLE, async () => {
      let days = 0;
      for (const {
        week,
        date
      } of weeks) {
        days += (await manager.getWeeklyTimetable(week, date)).length;
      }
      return `${days} jour(s) sur ${weeks.length} semaine(s)`;
    });
    await run("Devoirs", _servicesSharedTypes.Capabilities.HOMEWORK, async () => {
      let homeworks = 0;
      for (const {
        week
      } of weeks) {
        homeworks += (await manager.getHomeworks(week)).length;
      }
      return `${homeworks} devoir(s)`;
    });
    await run("Actualités", _servicesSharedTypes.Capabilities.NEWS, async () => `${(await manager.getNews()).length} actualité(s)`);
    await run("Notes", _servicesSharedTypes.Capabilities.GRADES, async () => {
      const periods = await manager.getGradesPeriods();
      if (periods.length === 0) return "aucune période";
      const period = (0, _utilsGradesHelperPeriod.getCurrentPeriod)(periods) ?? periods[0];
      const grades = await manager.getGradesForPeriod(period, period.createdByAccount);
      return `${periods.length} période(s), « ${period.name} » : ${grades?.subjects?.length ?? 0} matière(s)`;
    });
    await run("Vie scolaire", _servicesSharedTypes.Capabilities.ATTENDANCE_PERIODS, async () => {
      const periods = await manager.getAttendancePeriods();
      if (periods.length === 0) return "aucune période";
      if (!supports(_servicesSharedTypes.Capabilities.ATTENDANCE)) return `${periods.length} période(s), relevé non exposé`;
      const period = (0, _utilsGradesHelperPeriod.getCurrentPeriod)(periods) ?? periods[0];
      const attendance = await manager.getAttendanceForPeriod(period.name);
      const absences = attendance.reduce((total, item) => total + (item.absences?.length ?? 0), 0);
      const delays = attendance.reduce((total, item) => total + (item.delays?.length ?? 0), 0);
      return `« ${period.name} » : ${absences} absence(s), ${delays} retard(s)`;
    });
    await run("Menus du self", _servicesSharedTypes.Capabilities.CANTEEN_MENU, async () => `${(await manager.getWeeklyCanteenMenu(today)).length} menu(s)`);
    await run("Messagerie", _servicesSharedTypes.Capabilities.CHAT_READ, async () => `${(await manager.getChats()).length} conversation(s)`);
    (0, _utilsLoggerLogger.log)(`fillStore terminé — ${report.lines.length} remplie(s), ${report.skipped.length} ignorée(s), ${report.failures.length} en échec`, "devmode");
    return report;
  }
},1485,[1117,1118,1126,1022,1422,1116]);