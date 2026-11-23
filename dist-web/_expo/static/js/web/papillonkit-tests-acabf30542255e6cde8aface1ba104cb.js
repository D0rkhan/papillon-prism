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
      return PapillonKitChecks;
    }
  });
  var _react = require(_dependencyMap[0]);
  var _reactNativeWebDistExportsActivityIndicator = require(_dependencyMap[1]);
  var ActivityIndicator = _interopDefault(_reactNativeWebDistExportsActivityIndicator);
  var _reactNativeWebDistExportsView = require(_dependencyMap[2]);
  var View = _interopDefault(_reactNativeWebDistExportsView);
  var _expoRouterReactNavigation = require(_dependencyMap[3]);
  var _expoClipboard = require(_dependencyMap[4]);
  var Clipboard = _interopNamespace(_expoClipboard);
  var _getpapillonPapicons = require(_dependencyMap[5]);
  var _uiComponentsStack = require(_dependencyMap[6]);
  var Stack = _interopDefault(_uiComponentsStack);
  var _uiNewButton = require(_dependencyMap[7]);
  var Button = _interopDefault(_uiNewButton);
  var _uiNewList = require(_dependencyMap[8]);
  var List = _interopDefault(_uiNewList);
  var _uiNewTypography = require(_dependencyMap[9]);
  var Typography = _interopDefault(_uiNewTypography);
  var _utilsDevmodePapillonKitChecks = require(_dependencyMap[10]);
  var _reactJsxRuntime = require(_dependencyMap[11]);
  const SECTION_ICONS = {
    Module: "Gears",
    Données: "User",
    "Siri et Spotlight": "Search",
    Widgets: "Grid",
    "Live Activity": "Clock",
    "Apple Intelligence": "Sparkles"
  };
  const PASSED = "#37BB12";
  const FAILED = "#C50017";
  function PapillonKitChecks() {
    const {
      colors
    } = (0, _expoRouterReactNavigation.useTheme)();
    const checks = (0, _react.useMemo)(_utilsDevmodePapillonKitChecks.buildChecks, []);
    const [results, setResults] = (0, _react.useState)({});
    const [running, setRunning] = (0, _react.useState)(false);
    const [copied, setCopied] = (0, _react.useState)(false);
    const active = (0, _react.useRef)(true);
    const run = (0, _react.useCallback)(async () => {
      setRunning(true);
      setCopied(false);
      setResults({});
      const context = {};
      for (const check of checks) {
        if (!active.current) {
          return;
        }
        setResults(current => ({
          ...current,
          [check.id]: {
            status: "running"
          }
        }));
        const result = await (0, _utilsDevmodePapillonKitChecks.runCheck)(check, context);
        setResults(current => ({
          ...current,
          [check.id]: result
        }));
      }
      setRunning(false);
    }, [checks]);
    (0, _react.useEffect)(() => {
      active.current = true;
      run();
      return () => {
        active.current = false;
      };
    }, [run]);
    const done = Object.values(results).filter(result => result.status !== "running");
    const passed = done.filter(result => result.status === "passed").length;
    const failed = done.filter(result => result.status === "failed").length;
    const skipped = done.filter(result => result.status === "skipped").length;
    const elapsed = done.reduce((total, result) => total + (result.duration ?? 0), 0);
    const title = running ? `Tests en cours… ${done.length}/${checks.length}` : failed > 0 ? `${failed} échec${failed > 1 ? "s" : ""} sur ${checks.length} tests` : `${passed} test${passed > 1 ? "s" : ""} réussi${passed > 1 ? "s" : ""}`;
    const subtitle = [`${passed} réussi${passed > 1 ? "s" : ""}`, `${failed} échec${failed > 1 ? "s" : ""}`, `${skipped} ignoré${skipped > 1 ? "s" : ""}`, (0, _utilsDevmodePapillonKitChecks.formatDuration)(elapsed)].join(" · ");
    const copyReport = async () => {
      await Clipboard.setStringAsync((0, _utilsDevmodePapillonKitChecks.formatReport)(checks, results));
      setCopied(true);
    };
    const statusIcon = result => {
      switch (result?.status) {
        case "running":
          return /*#__PURE__*/(0, _reactJsxRuntime.jsx)(ActivityIndicator.default, {});
        case "passed":
          return /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
            name: "Check",
            color: PASSED
          });
        case "failed":
          return /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
            name: "Cross",
            color: FAILED
          });
        case "skipped":
          return /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
            name: "Minus",
            color: String(colors.text) + "66"
          });
        default:
          return /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
            name: "Clock",
            color: String(colors.text) + "44"
          });
      }
    };
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
        children: [/*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.View, {
          id: "summary",
          children: [/*#__PURE__*/(0, _reactJsxRuntime.jsxs)(Stack.default, {
            gap: 4,
            style: {
              marginBottom: 16
            },
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "h5",
              color: !running && failed > 0 ? FAILED : "textPrimary",
              children: title
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "body2",
              color: "textSecondary",
              children: subtitle
            })]
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(Stack.default, {
            direction: "horizontal",
            gap: 10,
            style: {
              marginBottom: 8
            },
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(View.default, {
              style: {
                flex: 1
              },
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Button.default, {
                label: "Relancer",
                onPress: run,
                disabled: running,
                fullWidth: true
              })
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(View.default, {
              style: {
                flex: 1
              },
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Button.default, {
                label: copied ? "Rapport copié" : "Copier le rapport",
                onPress: copyReport,
                disabled: running,
                variant: "secondary",
                fullWidth: true
              })
            })]
          })]
        }), _utilsDevmodePapillonKitChecks.CHECK_SECTIONS.filter(section => checks.some(check => check.section === section)).map(section => /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Section, {
          id: section,
          children: [/*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.SectionTitle, {
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
              name: SECTION_ICONS[section],
              color: String(colors.text) + "88"
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Label, {
              children: section
            })]
          }), checks.filter(check => check.section === section).map(check => {
            const result = results[check.id];
            return /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Item, {
              id: check.id,
              children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Leading, {
                children: statusIcon(result)
              }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
                variant: "action",
                children: check.title
              }), result?.detail ? /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
                variant: "body2",
                color: result.status === "failed" ? FAILED : "textSecondary",
                children: result.detail
              }) : null, result?.duration != null ? /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Trailing, {
                children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
                  variant: "body2",
                  color: "textSecondary",
                  children: (0, _utilsDevmodePapillonKitChecks.formatDuration)(result.duration)
                })
              }) : null]
            }, check.id);
          })]
        }, section))]
      })
    });
  }
},853,[6,317,198,1000,1001,1002,1005,1006,1007,1008,1017,97]);
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
  Object.defineProperty(exports, "CHECK_SECTIONS", {
    enumerable: true,
    get: function () {
      return CHECK_SECTIONS;
    }
  });
  exports.buildChecks = buildChecks;
  exports.runCheck = runCheck;
  exports.formatDuration = formatDuration;
  exports.formatReport = formatReport;
  var _reactNativeWebDistExportsPlatform = require(_dependencyMap[0]);
  var Platform = _interopDefault(_reactNativeWebDistExportsPlatform);
  var _nozbeWatermelondb = require(_dependencyMap[1]);
  var _getpapillonPapillonkit = require(_dependencyMap[2]);
  var PapillonKit = _interopNamespace(_getpapillonPapillonkit);
  var _database = require(_dependencyMap[3]);
  var _servicesSharedTimetable = require(_dependencyMap[4]);
  var _storesAccount = require(_dependencyMap[5]);
  const CHECK_SECTIONS = ["Module", "Données", "Siri et Spotlight", "Widgets", "Live Activity", "Apple Intelligence"];
  class Skip extends Error {
    skipped = true;
  }
  const skip = reason => {
    throw new Skip(reason);
  };
  function ensure(condition, message) {
    if (!condition) {
      throw new Error(message);
    }
  }
  const iosMajor = () => Number.parseInt(String(Platform.default.Version), 10);
  const yesNo = value => value ? "oui" : "non";
  const formatDate = value => new Date(value).toLocaleString("fr-FR", {
    weekday: "short",
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  });
  const formatTime = value => new Date(value).toLocaleTimeString("fr-FR");
  const markWidgetsReloaded = (context, at) => {
    context.widgetsReloadedAt = Math.min(context.widgetsReloadedAt ?? at, at);
  };
  const wait = milliseconds => new Promise(resolve => setTimeout(resolve, milliseconds));
  const loadSnapshot = async context => {
    const snapshot = await PapillonKit.getDebugSnapshot();
    ensure(snapshot, "getDebugSnapshot() a renvoyé null.");
    context.snapshot = snapshot;
    return snapshot;
  };
  const accounts = () => _storesAccount.useAccountStore.getState().accounts;
  const currentAccount = () => {
    const {
      accounts: all,
      lastUsedAccount
    } = _storesAccount.useAccountStore.getState();
    return all.find(account => account.id === lastUsedAccount);
  };
  const allServiceIds = () => accounts().flatMap(account => account.services.map(service => service.id));
  const errorCode = async body => {
    try {
      await body();
    } catch (error) {
      ensure(error instanceof PapillonKit.IntelligenceError, `Erreur reçue sans le type IntelligenceError : ${String(error)}`);
      return error.code;
    }
    throw new Error("L'appel a réussi alors qu'il devait échouer.");
  };
  const INTELLIGENCE_LABELS = {
    available: "disponible",
    deviceNotEligible: "appareil non compatible",
    appleIntelligenceNotEnabled: "désactivée dans Réglages",
    modelNotReady: "modèle en téléchargement",
    unknown: "état inconnu",
    unsupported: "non supportée"
  };
  const PLAN_SCHEMA = {
    type: "object",
    properties: {
      title: {
        type: "string",
        description: "Titre court de la tâche"
      },
      priority: {
        type: "string",
        enum: ["basse", "moyenne", "haute"]
      },
      steps: {
        type: "array",
        items: {
          type: "string"
        },
        minItems: 1,
        maxItems: 4
      },
      minutes: {
        type: "integer",
        minimum: 5,
        maximum: 180
      }
    },
    required: ["title", "priority", "steps", "minutes"]
  };
  const DAYS = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"];
  const WEEK_SCHEMA = {
    type: "object",
    properties: {
      subject: {
        type: "string"
      },
      sessions: {
        type: "array",
        items: {
          $ref: "#/$defs/Session"
        },
        minItems: 2,
        maxItems: 3
      },
      advice: {
        type: "string",
        nullable: true
      }
    },
    required: ["subject", "sessions"],
    $defs: {
      Session: {
        type: "object",
        properties: {
          day: {
            type: "string",
            enum: DAYS
          },
          minutes: {
            type: "integer",
            minimum: 10,
            maximum: 90
          },
          focus: {
            type: "string"
          }
        },
        required: ["day", "minutes", "focus"]
      }
    }
  };
  const requireModel = () => {
    const availability = PapillonKit.intelligence.getAvailability();
    if (availability.status !== "available") {
      skip(`Apple Intelligence ${INTELLIGENCE_LABELS[availability.status] ?? availability.status}.`);
    }
  };
  const isText = value => typeof value === "string" && value.trim().length > 0;
  const inRange = (value, minimum, maximum) => typeof value === "number" && Number.isInteger(value) && value >= minimum && value <= maximum;
  const moduleChecks = [{
    id: "module",
    section: "Module",
    title: "Module natif chargé",
    run: async () => {
      ensure(PapillonKit.isSupported, "Le module natif n'est pas lié à cette build.");
      return `iOS ${Platform.default.Version}`;
    }
  }, {
    id: "features",
    section: "Module",
    title: "Fonctions activées selon la version d'iOS",
    run: async context => {
      const major = iosMajor();
      const expected = {
        siri: major >= 27,
        intelligence: major >= 26,
        widgets: true
      };
      const {
        features
      } = PapillonKit;
      const wrong = Object.keys(expected).filter(key => features[key] !== expected[key]);
      ensure(wrong.length === 0, `Attendu pour iOS ${major} : ${JSON.stringify(expected)}, reçu ${JSON.stringify(features)}.`);
      const snapshot = await loadSnapshot(context);
      ensure(Object.keys(expected).every(key => snapshot.features[key] === features[key]), `debugSnapshot() annonce ${JSON.stringify(snapshot.features)}.`);
      return `Siri ${yesNo(features.siri)} · Apple Intelligence ${yesNo(features.intelligence)} · widgets ${yesNo(features.widgets)}`;
    }
  }];
  const dataChecks = [{
    id: "app-groups",
    section: "Données",
    title: "App Groups accessibles",
    run: async context => {
      const {
        appGroups
      } = context.snapshot ?? (await loadSnapshot(context));
      ensure(appGroups.storage.reachable, `${appGroups.storage.identifier} inaccessible (stockage des comptes).`);
      ensure(appGroups.database.reachable, `${appGroups.database.identifier} inaccessible (base).`);
      return `${appGroups.storage.identifier} · ${appGroups.database.identifier}`;
    }
  }, {
    id: "database",
    section: "Données",
    title: "Base partagée lisible",
    run: async context => {
      const {
        database: shared
      } = context.snapshot ?? (await loadSnapshot(context));
      ensure(shared.exists, `Aucune base à ${shared.path ?? "(chemin inconnu)"}.`);
      ensure(!shared.error, shared.error ?? "");
      return `${shared.courseCount} cours · ${shared.homeworkCount} devoirs`;
    }
  }, {
    id: "course-count",
    section: "Données",
    title: "Même nombre de cours que l'app",
    run: async context => {
      const snapshot = await loadSnapshot(context);
      const expected = await _database.database.get("courses").query().fetchCount();
      ensure(snapshot.database.courseCount === expected, `App : ${expected}, PapillonKit : ${snapshot.database.courseCount}.`);
      return `${expected} cours`;
    }
  }, {
    id: "homework-count",
    section: "Données",
    title: "Même nombre de devoirs que l'app",
    run: async context => {
      const snapshot = context.snapshot ?? (await loadSnapshot(context));
      const expected = await _database.database.get("homework").query().fetchCount();
      ensure(snapshot.database.homeworkCount === expected, `App : ${expected}, PapillonKit : ${snapshot.database.homeworkCount}.`);
      return `${expected} devoirs`;
    }
  }, {
    id: "accounts",
    section: "Données",
    title: "Mêmes comptes que l'app",
    run: async context => {
      const snapshot = context.snapshot ?? (await loadSnapshot(context));
      ensure(!snapshot.accountsError, `Lecture des comptes : ${snapshot.accountsError}`);
      const native = (snapshot.accounts ?? []).map(account => account.id).sort();
      const expected = accounts().map(account => account.id).sort();
      ensure(JSON.stringify(native) === JSON.stringify(expected), `App : ${expected.length} compte(s), PapillonKit : ${native.length}.`);
      const current = snapshot.accounts?.find(account => account.isCurrent);
      const lastUsed = _storesAccount.useAccountStore.getState().lastUsedAccount;
      ensure((current?.id ?? null) === (lastUsed || null), "Le compte actif n'est pas le même.");
      return current ? `${native.length} compte(s), actif : ${current.name}` : `${native.length} compte(s), aucun actif`;
    }
  }, {
    id: "next-course",
    section: "Données",
    title: "Même prochain cours que l'app",
    run: async context => {
      const account = currentAccount() ?? skip("Aucun compte actif.");
      const snapshot = await loadSnapshot(context);
      const rows = await _database.database.get("courses").query(_nozbeWatermelondb.Q.where("createdByAccount", _nozbeWatermelondb.Q.oneOf(account.services.map(service => service.id))), _nozbeWatermelondb.Q.where("to", _nozbeWatermelondb.Q.gt(Date.now()))).fetch();
      const upcoming = rows.filter(course => course.status !== _servicesSharedTimetable.CourseStatus.CANCELED).sort((a, b) => a.from - b.from);
      const native = snapshot.nextCourse ?? null;
      const first = upcoming[0];
      if (!first) {
        ensure(!native, `PapillonKit propose ${native?.title} alors que l'app n'a aucun cours à venir.`);
        return "Aucun cours à venir, des deux côtés";
      }
      ensure(native, `L'app a ${first.subject} le ${formatDate(first.from)}, PapillonKit ne trouve rien.`);
      const tied = upcoming.filter(course => course.from === first.from).map(course => course.courseId);
      ensure(native.from === first.from && tied.includes(native.id), `App : ${first.subject} (${formatDate(first.from)}), PapillonKit : ${native.title} (${formatDate(native.from)}).`);
      return `${native.emoji} ${native.title}, ${formatDate(native.from)}`;
    }
  }, {
    id: "next-homework",
    section: "Données",
    title: "Même prochain devoir que l'app",
    run: async context => {
      const account = currentAccount() ?? skip("Aucun compte actif.");
      const snapshot = context.snapshot ?? (await loadSnapshot(context));
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const rows = await _database.database.get("homework").query(_nozbeWatermelondb.Q.where("createdByAccount", _nozbeWatermelondb.Q.oneOf(account.services.map(service => service.id))), _nozbeWatermelondb.Q.where("dueDate", _nozbeWatermelondb.Q.gte(today.getTime()))).fetch();
      const pending = rows.filter(homework => !homework.isDone).sort((a, b) => a.dueDate - b.dueDate);
      const native = snapshot.nextHomework ?? null;
      const first = pending[0];
      if (!first) {
        ensure(!native, `PapillonKit propose ${native?.title} alors que l'app n'a aucun devoir à faire.`);
        return "Aucun devoir à faire, des deux côtés";
      }
      ensure(native, `L'app a un devoir de ${first.subject} pour le ${formatDate(first.dueDate)}, PapillonKit ne trouve rien.`);
      const tied = pending.filter(homework => homework.dueDate === first.dueDate).map(homework => homework.homeworkId);
      ensure(native.dueDate === first.dueDate && tied.includes(native.id), `App : ${first.subject} (${formatDate(first.dueDate)}), PapillonKit : ${native.title} (${formatDate(native.dueDate)}).`);
      return `${native.emoji} ${native.title}, pour le ${formatDate(native.dueDate)}`;
    }
  }, {
    id: "refresh",
    section: "Données",
    title: "refresh()",
    run: async context => {
      const before = Date.now();
      const report = await PapillonKit.refresh();
      ensure(report, "refresh() a renvoyé null.");
      markWidgetsReloaded(context, before);
      ensure(report.errors.length === 0, report.errors.join("\n"));
      ensure(report.date >= before - 1000, `Rapport daté du ${formatDate(report.date)}, avant l'appel.`);
      if (PapillonKit.features.siri) {
        ensure(report.index, "L'index Spotlight n'a pas été reconstruit.");
      } else {
        ensure(report.index === null, "L'index ne devrait pas être touché avant iOS 27.");
      }
      const snapshot = await loadSnapshot(context);
      ensure(snapshot.lastRefresh?.date === report.date, "debugSnapshot() ne voit pas ce rafraîchissement.");
      return report.index ? `${report.index.indexedCourses} cours et ${report.index.indexedHomework} devoirs indexés, widgets rechargés` : "Widgets rechargés";
    }
  }];
  const siriChecks = [{
    id: "reindex",
    section: "Siri et Spotlight",
    title: "reindex()",
    run: async context => {
      const report = await PapillonKit.reindex();
      ensure(report, "reindex() a renvoyé null.");
      ensure(report.windowStart < report.windowEnd, "La fenêtre d'indexation est vide.");
      ensure(report.indexedAccounts === accounts().length, `${report.indexedAccounts} compte(s) indexé(s), l'app en a ${accounts().length}.`);
      context.index = report;
      return `${report.indexedCourses} cours, ${report.indexedHomework} devoirs, du ${formatDate(report.windowStart)} au ${formatDate(report.windowEnd)}`;
    }
  }, {
    id: "index-parity",
    section: "Siri et Spotlight",
    title: "L'index contient tout ce que l'app affiche",
    run: async context => {
      const report = context.index ?? skip("reindex() a échoué.");
      const services = allServiceIds();
      const courses = await _database.database.get("courses").query(_nozbeWatermelondb.Q.where("createdByAccount", _nozbeWatermelondb.Q.oneOf(services)), _nozbeWatermelondb.Q.where("to", _nozbeWatermelondb.Q.gte(report.windowStart)), _nozbeWatermelondb.Q.where("from", _nozbeWatermelondb.Q.lte(report.windowEnd))).fetchCount();
      const homework = await _database.database.get("homework").query(_nozbeWatermelondb.Q.where("createdByAccount", _nozbeWatermelondb.Q.oneOf(services)), _nozbeWatermelondb.Q.where("dueDate", _nozbeWatermelondb.Q.between(report.windowStart, report.windowEnd))).fetchCount();
      ensure(report.indexedCourses === courses, `Cours : ${courses} dans l'app, ${report.indexedCourses} indexés.`);
      ensure(report.indexedHomework === homework, `Devoirs : ${homework} dans l'app, ${report.indexedHomework} indexés.`);
      return `${courses} cours et ${homework} devoirs, des deux côtés`;
    }
  }, {
    id: "reindex-stable",
    section: "Siri et Spotlight",
    title: "Réindexer sans changement ne retire rien",
    run: async context => {
      const first = context.index ?? skip("reindex() a échoué.");
      const second = await PapillonKit.reindex();
      ensure(second, "reindex() a renvoyé null.");
      ensure(second.removed === 0, `${second.removed} élément(s) retiré(s) alors que rien n'a changé.`);
      ensure(second.indexedCourses === first.indexedCourses && second.indexedHomework === first.indexedHomework, "Les nombres ont changé entre deux indexations. Une synchro tournait peut-être en même temps.");
      return "0 retiré";
    }
  }, {
    id: "clear-index",
    section: "Siri et Spotlight",
    title: "clearIndex()",
    timeout: 40000,
    run: async context => {
      await PapillonKit.clearIndex();
      context.indexCleared = true;
      return "Index vidé";
    }
  }, {
    id: "reindex-after-clear",
    section: "Siri et Spotlight",
    title: "reindex() reconstruit l'index vidé",
    timeout: 40000,
    run: async context => {
      const first = context.index ?? skip("reindex() a échoué.");
      if (!context.indexCleared) skip("clearIndex() a échoué.");
      const rebuilt = await PapillonKit.reindex();
      ensure(rebuilt, "reindex() a renvoyé null après clearIndex().");
      ensure(rebuilt.removed === 0, `${rebuilt.removed} élément(s) retiré(s) d'un index censé être vide.`);
      ensure(rebuilt.indexedCourses === first.indexedCourses && rebuilt.indexedHomework === first.indexedHomework, "L'index reconstruit n'a pas le même contenu.");
      return `${rebuilt.indexedCourses} cours et ${rebuilt.indexedHomework} devoirs remis dans Spotlight`;
    }
  }];
  const siriFallbackChecks = [{
    id: "siri-fallback",
    section: "Siri et Spotlight",
    title: "Désactivé proprement avant iOS 27",
    run: async () => {
      ensure((await PapillonKit.reindex()) === null, "reindex() devrait renvoyer null.");
      await PapillonKit.clearIndex();
      return "reindex() renvoie null, clearIndex() ne fait rien";
    }
  }];
  const widgetDiagnosticsCheck = (kind, title) => ({
    id: `widget-${kind}`,
    section: "Widgets",
    title,
    timeout: 15000,
    run: async context => {
      const reloadedAt = context.widgetsReloadedAt ?? skip("Le rechargement des widgets a échoué.");
      let entry = (await loadSnapshot(context)).widgets.diagnostics[kind];
      if (!entry) {
        skip("Jamais affiché. Pose-le sur l'écran d'accueil pour le tester.");
      }
      for (let attempt = 0; attempt < 16 && entry && entry.date < reloadedAt; attempt++) {
        await wait(500);
        entry = (await loadSnapshot(context)).widgets.diagnostics[kind];
      }
      ensure(entry, "Diagnostic disparu pendant le test.");
      ensure(!entry.error, entry.error ?? "");
      if (currentAccount()) {
        ensure(entry.accountId, "Le widget ne trouve aucun compte.");
      }
      const when = entry.date >= reloadedAt ? `redessiné à ${formatTime(entry.date)}` : `pas redessiné depuis le rechargement de ${formatTime(reloadedAt)}, dernier rendu à ${formatTime(entry.date)}`;
      return `${entry.itemCount} élément(s), ${when}`;
    }
  });
  const widgetChecks = [{
    id: "widget-snapshot",
    section: "Widgets",
    title: "widgets.reload() écrit le snapshot",
    run: async context => {
      const before = Date.now();
      PapillonKit.widgets.reload();
      const snapshot = await loadSnapshot(context);
      const written = snapshot.widgets.snapshotDate;
      ensure(written && written >= before - 1000, `Snapshot pas mis à jour (dernier : ${written ? formatDate(written) : "jamais"}).`);
      markWidgetsReloaded(context, before);
      return `Écrit à ${formatTime(written)}`;
    }
  }, widgetDiagnosticsCheck("Calendar", "Widget Emploi du temps"), widgetDiagnosticsCheck("Tasks", "Widget Tâches")];
  const LIVE_ACTIVITY_LEAD_MS = 900000;
  const liveActivityChecks = [{
    id: "live-activity-sync",
    section: "Live Activity",
    title: "liveActivities.sync()",
    run: async () => {
      const status = await PapillonKit.liveActivities.sync();
      ensure(status, "sync() a renvoyé null.");
      ensure(!status.lastError, status.lastError ?? "");
      if (status.testMode) skip("Mode test actif : la synchronisation automatique est en pause.");
      if (!status.enabled) skip("Désactivées dans les réglages de Papillon.");
      if (!status.authorized) skip("Refusées dans Réglages > Papillon.");
      return `${status.planned} cours prévu${status.planned > 1 ? "s" : ""}, ${status.activities.length} activité${status.activities.length > 1 ? "s" : ""}${status.schedulesAhead ? ", programmées d'avance" : ""}`;
    }
  }, {
    id: "live-activity-current",
    section: "Live Activity",
    title: "Le cours en cours ou imminent est affiché",
    run: async () => {
      const status = await PapillonKit.liveActivities.getStatus();
      ensure(status, "getStatus() a renvoyé null.");
      if (status.testMode || !status.enabled || !status.authorized) skip("Live Activities inactives sur cet appareil.");
      const account = currentAccount() ?? skip("Aucun compte actif.");
      const now = Date.now();
      const rows = await _database.database.get("courses").query(_nozbeWatermelondb.Q.where("createdByAccount", _nozbeWatermelondb.Q.oneOf(account.services.map(service => service.id))), _nozbeWatermelondb.Q.where("to", _nozbeWatermelondb.Q.gt(now)), _nozbeWatermelondb.Q.where("from", _nozbeWatermelondb.Q.lte(now + LIVE_ACTIVITY_LEAD_MS))).fetch();
      const current = rows.filter(course => course.status !== _servicesSharedTimetable.CourseStatus.CANCELED);
      if (current.length === 0) skip("Aucun cours en cours ni dans les 15 prochaines minutes.");
      const ids = current.map(course => course.courseId);
      const shown = status.activities.find(activity => !activity.preview && ids.includes(activity.courseId) && activity.state !== "pending");
      ensure(shown, `Aucune Live Activity pour ${current.map(course => course.subject).join(", ")}.`);
      return `${shown.subject}, affichée depuis ${new Date(shown.showsAt).toLocaleTimeString("fr-FR")}`;
    }
  }];
  const intelligenceChecks = [{
    id: "availability",
    section: "Apple Intelligence",
    title: "Disponibilité du modèle",
    run: async context => {
      const availability = PapillonKit.intelligence.getAvailability();
      const snapshot = context.snapshot ?? (await loadSnapshot(context));
      ensure(snapshot.intelligence.status === availability.status, "debugSnapshot() et getAvailability() ne sont pas d'accord.");
      const label = INTELLIGENCE_LABELS[availability.status] ?? availability.status;
      if (availability.status === "available") {
        return `Disponible · langue de l'appareil supportée : ${yesNo(availability.supportsLocale)}`;
      }
      const code = await errorCode(() => PapillonKit.intelligence.generateText("Bonjour"));
      ensure(code === "ERR_INTELLIGENCE_UNAVAILABLE", `Code reçu : ${code}.`);
      return `Indisponible (${label}), generateText() renvoie bien ERR_INTELLIGENCE_UNAVAILABLE`;
    }
  }, {
    id: "invalid-schema",
    section: "Apple Intelligence",
    title: "Schéma invalide refusé",
    run: async () => {
      requireModel();
      const code = await errorCode(() => PapillonKit.intelligence.generateObject("x", {
        schema: {
          type: "object",
          properties: {}
        }
      }));
      ensure(code === "ERR_INTELLIGENCE_INVALID_SCHEMA", `Code reçu : ${code}.`);
      return "ERR_INTELLIGENCE_INVALID_SCHEMA";
    }
  }, {
    id: "generate-text",
    section: "Apple Intelligence",
    title: "generateText()",
    timeout: 60000,
    run: async () => {
      requireModel();
      const text = await PapillonKit.intelligence.generateText("Réponds uniquement par le mot bonjour.", {
        temperature: 0,
        maximumResponseTokens: 20
      });
      ensure(text.toLowerCase().includes("bonjour"), `Réponse : « ${text} »`);
      return `« ${text.trim().slice(0, 60)} »`;
    }
  }, {
    id: "generate-object",
    section: "Apple Intelligence",
    title: "generateObject() respecte le schéma",
    timeout: 60000,
    run: async () => {
      requireModel();
      const plan = await PapillonKit.intelligence.generateObject("Je dois réviser le chapitre 4 de physique sur l'électricité pour un contrôle vendredi.", {
        instructions: "Tu aides un élève à organiser son travail.",
        schema: PLAN_SCHEMA,
        temperature: 0
      });
      ensure(isText(plan.title), `title invalide : ${JSON.stringify(plan.title)}`);
      ensure(["basse", "moyenne", "haute"].includes(plan.priority), `priority hors enum : ${JSON.stringify(plan.priority)}`);
      ensure(Array.isArray(plan.steps) && plan.steps.length >= 1 && plan.steps.length <= 4 && plan.steps.every(isText), `steps invalide : ${JSON.stringify(plan.steps)}`);
      ensure(inRange(plan.minutes, 5, 180), `minutes hors bornes : ${JSON.stringify(plan.minutes)}`);
      return `${plan.title} · ${plan.priority} · ${plan.steps.length} étape(s) · ${plan.minutes} min`;
    }
  }, {
    id: "generate-nested",
    section: "Apple Intelligence",
    title: "generateObject() avec $ref et tableau d'objets",
    timeout: 60000,
    run: async () => {
      requireModel();
      const week = await PapillonKit.intelligence.generateObject("Prévois mes séances de révision de maths pour cette semaine, j'ai un contrôle sur les fonctions.", {
        instructions: "Tu aides un élève à organiser son travail.",
        schema: WEEK_SCHEMA,
        temperature: 0
      });
      ensure(isText(week.subject), `subject invalide : ${JSON.stringify(week.subject)}`);
      const sessions = week.sessions;
      ensure(Array.isArray(sessions) && sessions.length >= 2 && sessions.length <= 3, `sessions : ${JSON.stringify(sessions)}`);
      for (const session of sessions) {
        ensure(DAYS.includes(session.day), `day hors enum : ${JSON.stringify(session.day)}`);
        ensure(inRange(session.minutes, 10, 90), `minutes hors bornes : ${JSON.stringify(session.minutes)}`);
        ensure(isText(session.focus), `focus invalide : ${JSON.stringify(session.focus)}`);
      }
      ensure(week.advice == null || typeof week.advice === "string", `advice invalide : ${JSON.stringify(week.advice)}`);
      return sessions.map(session => `${session.day} ${session.minutes} min`).join(" · ");
    }
  }];
  const intelligenceFallbackChecks = [{
    id: "intelligence-fallback",
    section: "Apple Intelligence",
    title: "Désactivée proprement avant iOS 26",
    run: async () => {
      const availability = PapillonKit.intelligence.getAvailability();
      ensure(availability.status === "unsupported", `Statut : ${availability.status}.`);
      const code = await errorCode(() => PapillonKit.intelligence.generateText("Bonjour"));
      ensure(code === "ERR_INTELLIGENCE_UNAVAILABLE", `Code reçu : ${code}.`);
      return "unsupported, generateText() renvoie ERR_INTELLIGENCE_UNAVAILABLE";
    }
  }];
  function buildChecks() {
    if (!PapillonKit.isSupported) {
      return [moduleChecks[0]];
    }
    return [...moduleChecks, ...dataChecks, ...(PapillonKit.features.siri ? siriChecks : siriFallbackChecks), ...(PapillonKit.features.widgets ? widgetChecks : []), ...(PapillonKit.features.liveActivities ? liveActivityChecks : []), ...(PapillonKit.features.intelligence ? intelligenceChecks : intelligenceFallbackChecks)];
  }
  async function runCheck(check, context) {
    const start = Date.now();
    const limit = check.timeout ?? 20000;
    let timer;
    try {
      const detail = await Promise.race([check.run(context), new Promise((_, reject) => {
        timer = setTimeout(() => reject(new Error(`Pas de réponse après ${limit / 1000} s.`)), limit);
      })]);
      return {
        status: "passed",
        detail: detail || undefined,
        duration: Date.now() - start
      };
    } catch (error) {
      const duration = Date.now() - start;
      if (error.skipped) {
        return {
          status: "skipped",
          detail: error.message,
          duration
        };
      }
      const code = error.code;
      const message = error.message ?? String(error);
      return {
        status: "failed",
        detail: code ? `${code} : ${message}` : message,
        duration
      };
    } finally {
      clearTimeout(timer);
    }
  }
  const SYMBOLS = {
    pending: "·",
    running: "…",
    passed: "✓",
    failed: "✗",
    skipped: "–"
  };
  function formatDuration(milliseconds) {
    return milliseconds < 1000 ? `${milliseconds} ms` : `${(milliseconds / 1000).toFixed(1).replace(".", ",")} s`;
  }
  function formatReport(checks, results) {
    const {
      features
    } = PapillonKit;
    const lines = [`PapillonKit · iOS ${Platform.default.Version} · ${new Date().toLocaleString("fr-FR")}`, `Siri ${yesNo(features.siri)} · Apple Intelligence ${yesNo(features.intelligence)} · widgets ${yesNo(features.widgets)}`];
    for (const section of CHECK_SECTIONS) {
      const inSection = checks.filter(check => check.section === section);
      if (inSection.length === 0) continue;
      lines.push("", section);
      for (const check of inSection) {
        const result = results[check.id] ?? {
          status: "pending"
        };
        const duration = result.duration != null ? ` (${formatDuration(result.duration)})` : "";
        lines.push(`${SYMBOLS[result.status]} ${check.title}${duration}`);
        if (result.detail) lines.push(`    ${result.detail}`);
      }
    }
    return lines.join("\n");
  }
},1017,[193,1018,1019,1020,1021,1022]);