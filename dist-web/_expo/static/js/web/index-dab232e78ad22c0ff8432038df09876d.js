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
  var _expoRouter = require(_dependencyMap[0]);
  require(_dependencyMap[1]);
  var _reactNativeWebDistExportsScrollView = require(_dependencyMap[2]);
  var ScrollView = _interopDefault(_reactNativeWebDistExportsScrollView);
  var _reactJsxRuntime = require(_dependencyMap[3]);
  const SearchView = () => {
    return /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_reactJsxRuntime.Fragment, {
      children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoRouter.Stack.Title, {
        children: "Search"
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoRouter.Stack.SearchBar, {
        placement: "automatic",
        placeholder: "Search",
        onChangeText: () => {}
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(ScrollView.default, {})]
    });
  };
  var _default = SearchView;
},976,[1023,6,222,97]);