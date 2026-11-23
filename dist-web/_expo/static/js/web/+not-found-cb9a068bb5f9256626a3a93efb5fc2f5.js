__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return NotFoundScreen;
    }
  });
  var _expoRouter = require(_dependencyMap[0]);
  var _react = require(_dependencyMap[1]);
  function NotFoundScreen() {
    (0, _react.useEffect)(() => {
      // Route inconnue (ex: lien profond invalide) : on ferme tous les modaux
      // ouverts et on repart sur l'accueil, comme si l'app venait d'être relancée.
      _expoRouter.router.dismissAll();
      _expoRouter.router.replace('/');
    }, []);
    return null;
  }
},992,[1023,6]);