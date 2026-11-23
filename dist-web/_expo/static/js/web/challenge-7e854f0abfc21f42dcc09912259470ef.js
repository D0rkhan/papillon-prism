__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return PronoteChallengeScreen;
    }
  });
  var _expoRouter = require(_dependencyMap[0]);
  var _react = require(_dependencyMap[1]);
  var _utilsPronoteChallenge = require(_dependencyMap[2]);
  var _componentsOnboardingPronote2FAModal = require(_dependencyMap[3]);
  var _reactJsxRuntime = require(_dependencyMap[4]);
  function PronoteChallengeScreen() {
    const [challenge, setChallenge] = (0, _react.useState)(null);
    (0, _react.useEffect)(() => {
      const pending = (0, _utilsPronoteChallenge.consumePendingPronoteChallenge)();
      if (!pending) {
        _expoRouter.router.back();
        return;
      }
      setChallenge(pending);
    }, []);
    if (!challenge) {
      return null;
    }
    return /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_componentsOnboardingPronote2FAModal.Pronote2FAModal, {
      doubleAuthSession: challenge.session,
      doubleAuthError: challenge.error,
      setChallengeModalVisible: visible => {
        if (!visible) {
          _expoRouter.router.back();
        }
      },
      deviceId: challenge.deviceUUID,
      relinkAccountId: challenge.relinkAccountId,
      relinkServiceId: challenge.relinkServiceId
    });
  }
},903,[1023,6,1321,1320,97]);