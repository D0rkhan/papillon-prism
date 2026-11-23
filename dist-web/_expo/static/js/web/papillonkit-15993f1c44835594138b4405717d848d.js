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
      return PapillonKitScreen;
    }
  });
  var _react = require(_dependencyMap[0]);
  var _reactNativeWebDistExportsActivityIndicator = require(_dependencyMap[1]);
  var ActivityIndicator = _interopDefault(_reactNativeWebDistExportsActivityIndicator);
  var _reactNativeWebDistExportsPlatform = require(_dependencyMap[2]);
  var Platform = _interopDefault(_reactNativeWebDistExportsPlatform);
  var _reactNativeWebDistExportsView = require(_dependencyMap[3]);
  var View = _interopDefault(_reactNativeWebDistExportsView);
  var _expoRouter = require(_dependencyMap[4]);
  var _expoRouterReactNavigation = require(_dependencyMap[5]);
  var _getpapillonPapicons = require(_dependencyMap[6]);
  var _getpapillonPapillonkit = require(_dependencyMap[7]);
  var PapillonKit = _interopNamespace(_getpapillonPapillonkit);
  var _componentsDevmodeDisclosure = require(_dependencyMap[8]);
  var Disclosure = _interopDefault(_componentsDevmodeDisclosure);
  var _uiComponentsIcon = require(_dependencyMap[9]);
  var Icon = _interopDefault(_uiComponentsIcon);
  var _uiComponentsStack = require(_dependencyMap[10]);
  var Stack = _interopDefault(_uiComponentsStack);
  var _uiNewList = require(_dependencyMap[11]);
  var List = _interopDefault(_uiNewList);
  var _uiNewTypography = require(_dependencyMap[12]);
  var Typography = _interopDefault(_uiNewTypography);
  var _utilsDevmodeActions = require(_dependencyMap[13]);
  var _reactJsxRuntime = require(_dependencyMap[14]);
  const FAILED = "#C50017";
  const INTELLIGENCE_LABELS = {
    available: "Disponible",
    deviceNotEligible: "Appareil non compatible",
    appleIntelligenceNotEnabled: "Désactivée dans Réglages",
    modelNotReady: "Modèle en téléchargement",
    unknown: "État inconnu",
    unsupported: "Non supportée"
  };
  const ACTIVITY_STATES = {
    pending: "Programmée",
    active: "Affichée",
    stale: "À mettre à jour",
    ended: "Terminée",
    dismissed: "Retirée",
    unknown: "Inconnue"
  };
  const WIDGETS = [{
    kind: "Calendar",
    title: "Emploi du temps"
  }, {
    kind: "Tasks",
    title: "Tâches"
  }];
  const courseTitle = course => `${course.emoji} ${course.title}${course.isCanceled ? " (annulé)" : ""}`;
  const courseDetail = course => [(0, _utilsDevmodeActions.formatDate)(course.from), course.room ? `salle ${course.room}` : null, course.teacher].filter(Boolean).join(" · ");
  const homeworkTitle = homework => `${homework.emoji} ${homework.title}${homework.isDone ? " (fait)" : ""}`;
  const homeworkDetail = homework => `Pour le ${(0, _utilsDevmodeActions.formatDate)(homework.dueDate)}`;
  function PapillonKitScreen() {
    const {
      colors
    } = (0, _expoRouterReactNavigation.useTheme)();
    const muted = String(colors.text) + "88";
    const {
      features
    } = PapillonKit;
    const {
      running,
      run
    } = (0, _utilsDevmodeActions.useDevAction)();
    const [snapshot, setSnapshot] = (0, _react.useState)(null);
    const [loadError, setLoadError] = (0, _react.useState)(null);
    const [showIndexable, setShowIndexable] = (0, _react.useState)(false);
    const [clearedAt, setClearedAt] = (0, _react.useState)(null);
    const load = (0, _react.useCallback)(async () => {
      try {
        setSnapshot(await PapillonKit.getDebugSnapshot());
        setLoadError(null);
      } catch (error) {
        setLoadError((0, _utilsDevmodeActions.describeError)(error));
      }
    }, []);
    (0, _expoRouter.useFocusEffect)((0, _react.useCallback)(() => {
      load();
    }, [load]));
    const refresh = () => run("refresh", async () => {
      await PapillonKit.refresh();
      await load();
    });
    const reloadWidgets = () => run("widgets", async () => {
      PapillonKit.widgets.reload();
      await load();
    });
    const syncLiveActivity = () => run("activity-sync", async () => {
      await PapillonKit.liveActivities.sync();
      await load();
    });
    const previewLiveActivity = () => run("activity-preview", async () => {
      await PapillonKit.liveActivities.preview("ongoing");
      await load();
    });
    const stopLiveActivity = () => run("activity-stop", async () => {
      await PapillonKit.liveActivities.stop();
      await load();
    });
    const clearIndex = () => (0, _utilsDevmodeActions.confirmDestructive)("Vider l'index Spotlight", "Siri et Spotlight ne trouveront plus aucun cours ni devoir jusqu'au prochain rafraîchissement.", "Vider", () => run("clear", async () => {
      await PapillonKit.clearIndex();
      setClearedAt(Date.now());
    }));
    const enabledFeatures = [features.siri ? "Siri" : null, features.intelligence ? "Apple Intelligence" : null, features.widgets ? "widgets" : null, features.liveActivities ? "Live Activities" : null].filter(Boolean);
    const lastRefresh = snapshot?.lastRefresh;
    const liveActivity = snapshot?.liveActivity;
    const courses = snapshot?.upcomingCourses ?? [];
    const homework = snapshot?.upcomingHomework ?? [];
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
        children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Section, {
          id: "tests",
          children: /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Item, {
            href: "/(dev)/papillonkit-tests",
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Leading, {
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Icon.default, {
                children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
                  name: "Check"
                })
              })
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "action",
              children: "Tester le module"
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "body2",
              color: "textSecondary",
              children: "V\xE9rifie donn\xE9es, Siri, widgets et Apple Intelligence sur cet appareil."
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Trailing, {
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Disclosure.default, {})
            })]
          })
        }), !snapshot ? /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.View, {
          id: "loading",
          children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Stack.default, {
            gap: 8,
            hAlign: "center",
            style: {
              paddingVertical: 40
            },
            children: loadError ? /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "body1",
              color: FAILED,
              align: "center",
              children: loadError
            }) : /*#__PURE__*/(0, _reactJsxRuntime.jsx)(ActivityIndicator.default, {})
          })
        }) : null, snapshot ? /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Section, {
          id: "device",
          children: [/*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.SectionTitle, {
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
              name: "Apple",
              color: muted
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Label, {
              children: "Appareil"
            })]
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Item, {
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "action",
              children: "Syst\xE8me"
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Trailing, {
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
                variant: "body1",
                color: "textSecondary",
                children: `iOS ${Platform.default.Version}`
              })
            })]
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Item, {
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "action",
              children: "Fonctions actives"
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "body2",
              color: "textSecondary",
              children: enabledFeatures.join(" · ")
            })]
          }), features.intelligence ? /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Item, {
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "action",
              children: "Apple Intelligence"
            }), snapshot.intelligence.status === "available" && !snapshot.intelligence.supportsLocale ? /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "body2",
              color: "textSecondary",
              children: "Langue de l'appareil non support\xE9e"
            }) : null, /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Trailing, {
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
                variant: "body1",
                color: "textSecondary",
                children: INTELLIGENCE_LABELS[snapshot.intelligence.status] ?? snapshot.intelligence.status
              })
            })]
          }) : null]
        }) : null, snapshot ? /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Section, {
          id: "data",
          children: [/*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.SectionTitle, {
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
              name: "Folder",
              color: muted
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Label, {
              children: "Donn\xE9es partag\xE9es"
            })]
          }), ["storage", "database"].map(key => {
            const group = snapshot.appGroups[key];
            return /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Item, {
              id: key,
              children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
                variant: "action",
                children: key === "storage" ? "App Group des comptes" : "App Group de la base"
              }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
                variant: "body2",
                color: "textSecondary",
                numberOfLines: 1,
                children: group.identifier
              }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Trailing, {
                children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
                  variant: "body1",
                  color: group.reachable ? "textSecondary" : FAILED,
                  children: group.reachable ? "Accessible" : "Inaccessible"
                })
              })]
            }, key);
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Item, {
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "action",
              children: "Base partag\xE9e"
            }), snapshot.database.error || !snapshot.database.exists ? /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "body2",
              color: FAILED,
              children: snapshot.database.error ?? "Papillon n'a pas encore créé la base."
            }) : null, /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Trailing, {
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
                variant: "body1",
                color: "textSecondary",
                children: snapshot.database.exists && !snapshot.database.error ? `${snapshot.database.courseCount} cours · ${snapshot.database.homeworkCount} devoirs` : "Illisible"
              })
            })]
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Item, {
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "action",
              children: "Comptes"
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "body2",
              color: snapshot.accountsError ? FAILED : "textSecondary",
              numberOfLines: 2,
              children: snapshot.accountsError ?? ((snapshot.accounts ?? []).map(account => `${account.name}${account.isCurrent ? " (actif)" : ""}`).join(", ") || "Aucun")
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Trailing, {
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
                variant: "body1",
                color: "textSecondary",
                children: snapshot.accounts?.length ?? 0
              })
            })]
          })]
        }) : null, snapshot && features.siri ? /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Section, {
          id: "siri",
          children: [/*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.SectionTitle, {
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
              name: "Search",
              color: muted
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Label, {
              children: "Siri et Spotlight"
            })]
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Item, {
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "action",
              children: "Prochain cours"
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "body2",
              color: "textSecondary",
              numberOfLines: 2,
              children: snapshot.nextCourse ? `${courseTitle(snapshot.nextCourse)}\n${courseDetail(snapshot.nextCourse)}` : "Aucun cours à venir"
            })]
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Item, {
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "action",
              children: "Prochain devoir"
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "body2",
              color: "textSecondary",
              numberOfLines: 2,
              children: snapshot.nextHomework ? `${homeworkTitle(snapshot.nextHomework)}\n${homeworkDetail(snapshot.nextHomework)}` : "Aucun devoir à faire"
            })]
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Item, {
            onPress: () => setShowIndexable(!showIndexable),
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "action",
              children: "Contenu des 7 prochains jours"
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "body2",
              color: "textSecondary",
              children: `${courses.length} cours · ${homework.length} devoirs`
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Trailing, {
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
                name: showIndexable ? "ChevronUp" : "ChevronDown",
                size: 16,
                color: String(colors.text) + "66"
              })
            })]
          }), showIndexable ? courses.map(course => /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Item, {
            id: `course-${course.id}`,
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "body1",
              numberOfLines: 1,
              children: courseTitle(course)
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "caption",
              color: "textSecondary",
              numberOfLines: 1,
              children: courseDetail(course)
            })]
          }, `course-${course.id}`)) : null, showIndexable ? homework.map(item => /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Item, {
            id: `homework-${item.id}`,
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "body1",
              numberOfLines: 1,
              children: homeworkTitle(item)
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "caption",
              color: "textSecondary",
              numberOfLines: 1,
              children: homeworkDetail(item)
            })]
          }, `homework-${item.id}`)) : null]
        }) : null, snapshot && features.widgets ? /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Section, {
          id: "widgets",
          children: [/*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.SectionTitle, {
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
              name: "Grid",
              color: muted
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Label, {
              children: "Widgets"
            })]
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Item, {
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "action",
              children: "Donn\xE9es des widgets"
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Trailing, {
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
                variant: "body1",
                color: "textSecondary",
                children: snapshot.widgets.snapshotDate ? (0, _utilsDevmodeActions.formatDate)(snapshot.widgets.snapshotDate) : "Jamais écrites"
              })
            })]
          }), WIDGETS.map(widget => {
            const entry = snapshot.widgets.diagnostics[widget.kind];
            return /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Item, {
              id: widget.kind,
              children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
                variant: "action",
                children: widget.title
              }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
                variant: "body2",
                color: "textSecondary",
                children: entry ? `Affiché ${(0, _utilsDevmodeActions.formatDate)(entry.date)} · ${entry.itemCount} élément${entry.itemCount > 1 ? "s" : ""}${entry.accountId ? "" : " · aucun compte"}` : "Jamais affiché, pose-le sur l'écran d'accueil."
              }), entry?.error ? /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
                variant: "body2",
                color: FAILED,
                children: entry.error
              }) : null]
            }, widget.kind);
          })]
        }) : null, liveActivity ? /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Section, {
          id: "live-activity",
          children: [/*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.SectionTitle, {
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
              name: "Clock",
              color: muted
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Label, {
              children: "Live Activity"
            })]
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Item, {
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "action",
              children: "Autorisation iOS"
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Trailing, {
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
                variant: "body1",
                color: liveActivity.authorized ? "textSecondary" : FAILED,
                children: liveActivity.authorized ? "Accordée" : "Refusée dans Réglages"
              })
            })]
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Item, {
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "action",
              children: "R\xE9glage dans Papillon"
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "body2",
              color: "textSecondary",
              children: liveActivity.schedulesAhead ? "Les prochains cours sont programmés d'avance." : "Seul le cours en cours ou imminent est affiché."
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Trailing, {
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
                variant: "body1",
                color: "textSecondary",
                children: liveActivity.testMode ? "Mode test" : liveActivity.enabled ? "Activé" : "Désactivé"
              })
            })]
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Item, {
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "action",
              children: "Derni\xE8re synchronisation"
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "body2",
              color: "textSecondary",
              children: liveActivity.lastSync ? `${(0, _utilsDevmodeActions.formatTime)(liveActivity.lastSync)} · ${liveActivity.planned} cours prévu${liveActivity.planned > 1 ? "s" : ""}${liveActivity.nextSync ? ` · prochaine à ${(0, _utilsDevmodeActions.formatTime)(liveActivity.nextSync)}` : ""}` : "Pas encore synchronisée depuis le lancement"
            }), liveActivity.lastError ? /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "body2",
              color: FAILED,
              children: liveActivity.lastError
            }) : null]
          }), liveActivity.activities.map(activity => /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Item, {
            id: activity.id,
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "action",
              numberOfLines: 1,
              children: `${activity.subject}${activity.preview ? " (aperçu)" : ""}`
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "body2",
              color: "textSecondary",
              numberOfLines: 1,
              children: `Affichée dès ${(0, _utilsDevmodeActions.formatTime)(activity.showsAt)} · cours ${(0, _utilsDevmodeActions.formatTime)(activity.startsAt)} à ${(0, _utilsDevmodeActions.formatTime)(activity.endsAt)}`
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Trailing, {
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
                variant: "body1",
                color: "textSecondary",
                children: ACTIVITY_STATES[activity.state] ?? activity.state
              })
            })]
          }, activity.id)), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Item, {
            onPress: syncLiveActivity,
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Leading, {
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Icon.default, {
                children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
                  name: "ArrowDownBox"
                })
              })
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "action",
              children: "Synchroniser maintenant"
            }), running === "activity-sync" ? /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Trailing, {
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(ActivityIndicator.default, {})
            }) : null]
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Item, {
            onPress: previewLiveActivity,
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Leading, {
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Icon.default, {
                children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
                  name: "Play"
                })
              })
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "action",
              children: "Aper\xE7u avec un cours de d\xE9monstration"
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "body2",
              color: "textSecondary",
              children: "Remplac\xE9 \xE0 la prochaine synchronisation, sauf en mode test."
            }), running === "activity-preview" ? /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Trailing, {
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(ActivityIndicator.default, {})
            }) : null]
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Item, {
            onPress: stopLiveActivity,
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Leading, {
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Icon.default, {
                children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
                  name: "Cross"
                })
              })
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "action",
              children: "Arr\xEAter les Live Activities"
            }), running === "activity-stop" ? /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Trailing, {
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(ActivityIndicator.default, {})
            }) : null]
          })]
        }) : null, snapshot ? /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Section, {
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
              children: "Rafra\xEEchir maintenant"
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "body2",
              color: "textSecondary",
              children: lastRefresh ? `Dernier à ${(0, _utilsDevmodeActions.formatTime)(lastRefresh.date)}${lastRefresh.index ? ` · ${lastRefresh.index.indexedCourses} cours et ${lastRefresh.index.indexedHomework} devoirs indexés` : ""}` : "Pas encore rafraîchi depuis le lancement"
            }), lastRefresh?.errors.length ? /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "body2",
              color: FAILED,
              children: lastRefresh.errors.join("\n")
            }) : null, running === "refresh" ? /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Trailing, {
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(ActivityIndicator.default, {})
            }) : null]
          }), features.widgets ? /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Item, {
            onPress: reloadWidgets,
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Leading, {
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Icon.default, {
                children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
                  name: "Grid"
                })
              })
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "action",
              children: "Recharger les widgets"
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "body2",
              color: "textSecondary",
              children: "R\xE9\xE9crit leurs donn\xE9es et demande \xE0 iOS de les redessiner."
            }), running === "widgets" ? /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Trailing, {
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(ActivityIndicator.default, {})
            }) : null]
          }) : null, features.siri ? /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Item, {
            onPress: clearIndex,
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Leading, {
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Icon.default, {
                children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
                  name: "Trash"
                })
              })
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "action",
              children: "Vider l'index Spotlight"
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "body2",
              color: "textSecondary",
              children: clearedAt ? `Vidé à ${(0, _utilsDevmodeActions.formatTime)(clearedAt)}` : "Retire tous les cours et devoirs de Spotlight."
            }), running === "clear" ? /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Trailing, {
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(ActivityIndicator.default, {})
            }) : null]
          }) : null]
        }) : null]
      })
    });
  }
},854,[6,317,193,198,1023,1000,1002,1019,1016,1013,1005,1007,1008,1009,97]);