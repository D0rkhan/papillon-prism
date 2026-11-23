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
      return AppschoInstancesList;
    }
  });
  var _reactNativeWebDistExportsImage = require(_dependencyMap[0]);
  var Image = _interopDefault(_reactNativeWebDistExportsImage);
  var _reactNativeWebDistExportsView = require(_dependencyMap[1]);
  var View = _interopDefault(_reactNativeWebDistExportsView);
  var _expoRouterReactNavigation = require(_dependencyMap[2]);
  var _react = require(_dependencyMap[3]);
  var _reactNativeReanimated = require(_dependencyMap[4]);
  var Reanimated = _interopDefault(_reactNativeReanimated);
  var _uiComponentsTypography = require(_dependencyMap[5]);
  var Typography = _interopDefault(_uiComponentsTypography);
  var _reactI18next = require(_dependencyMap[6]);
  var _uiComponentsAnimatedPressable = require(_dependencyMap[7]);
  var AnimatedPressable = _interopDefault(_uiComponentsAnimatedPressable);
  var _componentsOnboardingOnboardingScrollingFlatList = require(_dependencyMap[8]);
  var OnboardingScrollingFlatList = _interopDefault(_componentsOnboardingOnboardingScrollingFlatList);
  var _componentsOnboardingOnboardingInput = require(_dependencyMap[9]);
  var OnboardingInput = _interopDefault(_componentsOnboardingOnboardingInput);
  var _expoRouter = require(_dependencyMap[10]);
  var _blockshubBlockscho = require(_dependencyMap[11]);
  var _reactJsxRuntime = require(_dependencyMap[12]);
  const UNIVERSITY_LOGOS = {
    alijia: require(_dependencyMap[13]),
    bsb: require(_dependencyMap[14]),
    digitalcampus: require(_dependencyMap[15]),
    edhec: require(_dependencyMap[16]),
    eigsi: require(_dependencyMap[17]),
    emstra: require(_dependencyMap[18]),
    epp: require(_dependencyMap[19]),
    esaip: require(_dependencyMap[20]),
    esarc: require(_dependencyMap[21]),
    esg: require(_dependencyMap[22]),
    esigelec: require(_dependencyMap[23]),
    essca: require(_dependencyMap[24]),
    essec: require(_dependencyMap[25]),
    estp: require(_dependencyMap[26]),
    hec: require(_dependencyMap[27]),
    icp: require(_dependencyMap[28]),
    ieu: require(_dependencyMap[29]),
    iicp: require(_dependencyMap[30]),
    ipp: require(_dependencyMap[31]),
    iseg: require(_dependencyMap[32]),
    lisaa: require(_dependencyMap[33]),
    macromedia: require(_dependencyMap[34]),
    mbs: require(_dependencyMap[35]),
    merkure: require(_dependencyMap[36]),
    psb: require(_dependencyMap[37]),
    pstb: require(_dependencyMap[38]),
    regent: require(_dependencyMap[39]),
    sciencespo: require(_dependencyMap[40]),
    scpoaix: require(_dependencyMap[41]),
    ubmont: require(_dependencyMap[42]),
    uclouvain: require(_dependencyMap[43]),
    ucly: require(_dependencyMap[44]),
    ueve: require(_dependencyMap[45]),
    uniassas: require(_dependencyMap[46]),
    unilyon3: require(_dependencyMap[47]),
    unimes: require(_dependencyMap[48]),
    unimons: require(_dependencyMap[49]),
    unitoulon: require(_dependencyMap[50]),
    univangers: require(_dependencyMap[51]),
    unieiffel: require(_dependencyMap[52]),
    univpoitiers: require(_dependencyMap[53]),
    upjv: require(_dependencyMap[54]),
    wsfactory: require(_dependencyMap[55])
  };
  function AppschoInstancesList() {
    const theme = (0, _expoRouterReactNavigation.useTheme)();
    const {
      colors
    } = theme;
    const [search, setSearch] = (0, _react.useState)("");
    const {
      t
    } = (0, _reactI18next.useTranslation)();
    const filteredInstances = (0, _react.useMemo)(() => {
      if (!search.trim()) return _blockshubBlockscho.INSTANCES;
      return _blockshubBlockscho.INSTANCES.filter(instance => instance.name.toLowerCase().includes(search.toLowerCase()));
    }, [search]);
    return /*#__PURE__*/(0, _reactJsxRuntime.jsx)(OnboardingScrollingFlatList.default, {
      color: '#1E3035',
      lottie: require(_dependencyMap[56]),
      title: t("ONBOARDING_SELECT_UNIVERSITIESERVICE"),
      step: 1,
      totalSteps: 3,
      elements: [{
        isSearchBar: true
      }, ...filteredInstances],
      renderItem: ({
        item,
        index
      }) => {
        if (item.isSearchBar) {
          return /*#__PURE__*/(0, _reactJsxRuntime.jsx)(View.default, {
            style: {
              marginBottom: 15
            },
            children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(OnboardingInput.default, {
              placeholder: t("SEARCH_UNIV_PLACEHOLDER"),
              text: search,
              setText: setSearch,
              icon: "Search",
              inputProps: {}
            })
          });
        }
        return /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Reanimated.default.View, {
          entering: _reactNativeReanimated.FadeInDown.springify().duration(400).delay(index * 80 + 150),
          children: /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(AnimatedPressable.default, {
            onPress: () => {
              requestAnimationFrame(() => {
                if (item.casurl) {
                  _expoRouter.router.push({
                    pathname: '/(onboarding)/services/appscho/webview',
                    params: {
                      instanceId: item.id
                    }
                  });
                } else {
                  _expoRouter.router.push({
                    pathname: '/(onboarding)/services/appscho/credentials',
                    params: {
                      instanceId: item.id
                    }
                  });
                }
              });
            },
            style: {
              paddingHorizontal: 18,
              paddingVertical: 14,
              borderColor: colors.border,
              borderWidth: 1.5,
              borderRadius: 80,
              borderCurve: "continuous",
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
              display: 'flex',
              gap: 16
            },
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(View.default, {
              style: {
                width: 32,
                height: 32,
                alignItems: 'center',
                justifyContent: 'center'
              },
              children: UNIVERSITY_LOGOS[item.id] ? /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Image.default, {
                source: UNIVERSITY_LOGOS[item.id],
                style: {
                  width: 32,
                  height: 32
                },
                resizeMode: "cover"
              }) : /*#__PURE__*/(0, _reactJsxRuntime.jsx)(View.default, {
                style: {
                  width: 32,
                  height: 32,
                  backgroundColor: colors.border,
                  borderRadius: 16
                }
              })
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              style: {
                flex: 1
              },
              nowrap: true,
              variant: "title",
              children: item.name
            })]
          })
        });
      }
    });
  }
},895,[267,198,1000,6,1107,1110,1105,1121,1310,1228,1023,1265,97,1267,1268,1269,1270,1271,1272,1273,1274,1275,1276,1277,1278,1279,1280,1281,1282,1283,1284,1285,1286,1287,1288,1289,1290,1291,1292,1293,1294,1295,1296,1297,1298,1299,1300,1301,1302,1303,1304,1305,1306,1307,1308,1309,1266]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  module.exports = {
    uri: "/assets/assets/images/univ/alijia.0653bdb98619db7f2faa7e8b9391b6fe.webp",
    width: 480,
    height: 480,
    toString() {
      return this.uri;
    }
  };
},1267,[]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  module.exports = {
    uri: "/assets/assets/images/univ/bsb.2fbf3641f26099da953609cf50d4ccec.webp",
    width: 480,
    height: 480,
    toString() {
      return this.uri;
    }
  };
},1268,[]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  module.exports = {
    uri: "/assets/assets/images/univ/digitalcampus.b4ff40fff5a51a241aac77d8dd9aac3f.webp",
    width: 480,
    height: 480,
    toString() {
      return this.uri;
    }
  };
},1269,[]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  module.exports = {
    uri: "/assets/assets/images/univ/edhec.b63748de3c7df18ffa06d90f6c4ca97f.webp",
    width: 480,
    height: 480,
    toString() {
      return this.uri;
    }
  };
},1270,[]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  module.exports = {
    uri: "/assets/assets/images/univ/eigsi.5946bdad4ff24d11a61252dec728cb48.webp",
    width: 480,
    height: 480,
    toString() {
      return this.uri;
    }
  };
},1271,[]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  module.exports = {
    uri: "/assets/assets/images/univ/emstra.4ff7b8b08042744d72452e5fb3b702f5.webp",
    width: 480,
    height: 480,
    toString() {
      return this.uri;
    }
  };
},1272,[]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  module.exports = {
    uri: "/assets/assets/images/univ/epp.4f0798a6b7805837d5d86a0d62a42f58.webp",
    width: 480,
    height: 480,
    toString() {
      return this.uri;
    }
  };
},1273,[]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  module.exports = {
    uri: "/assets/assets/images/univ/esaip.f0b1ed5d7bf1747e16b5f7bf244a97f3.webp",
    width: 480,
    height: 480,
    toString() {
      return this.uri;
    }
  };
},1274,[]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  module.exports = {
    uri: "/assets/assets/images/univ/esarc.d2ad5bdd83c8de034917431a4eb10e3d.webp",
    width: 480,
    height: 480,
    toString() {
      return this.uri;
    }
  };
},1275,[]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  module.exports = {
    uri: "/assets/assets/images/univ/esg.da805fbed731a2938760ad72e2bb1bbb.webp",
    width: 480,
    height: 480,
    toString() {
      return this.uri;
    }
  };
},1276,[]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  module.exports = {
    uri: "/assets/assets/images/univ/esigelec.4531dc84ef594f68b7e5fca2ce363cf2.webp",
    width: 480,
    height: 480,
    toString() {
      return this.uri;
    }
  };
},1277,[]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  module.exports = {
    uri: "/assets/assets/images/univ/essca.994bfd66de0ef5e94bf99276790d8321.webp",
    width: 480,
    height: 480,
    toString() {
      return this.uri;
    }
  };
},1278,[]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  module.exports = {
    uri: "/assets/assets/images/univ/essec.ee53465523338041423761b9f55b30fe.webp",
    width: 480,
    height: 480,
    toString() {
      return this.uri;
    }
  };
},1279,[]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  module.exports = {
    uri: "/assets/assets/images/univ/estp.7c8a7aeffedd2c5d53362cd390f8b955.webp",
    width: 480,
    height: 480,
    toString() {
      return this.uri;
    }
  };
},1280,[]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  module.exports = {
    uri: "/assets/assets/images/univ/hec.85500d20fedd37dcddd0e3b469e3338f.webp",
    width: 480,
    height: 480,
    toString() {
      return this.uri;
    }
  };
},1281,[]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  module.exports = {
    uri: "/assets/assets/images/univ/icp.fa03b3341983a0d1e3ad1079699eab46.png",
    width: 512,
    height: 512,
    toString() {
      return this.uri;
    }
  };
},1282,[]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  module.exports = {
    uri: "/assets/assets/images/univ/ieu.a08fe50d81c0667226de12ab6d39e1e3.webp",
    width: 480,
    height: 480,
    toString() {
      return this.uri;
    }
  };
},1283,[]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  module.exports = {
    uri: "/assets/assets/images/univ/iicp.a78b63157e419635a44e164a1e7df742.webp",
    width: 240,
    height: 240,
    toString() {
      return this.uri;
    }
  };
},1284,[]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  module.exports = {
    uri: "/assets/assets/images/univ/ipp.8b776327bc5a48dca70667a9e6692a2e.webp",
    width: 480,
    height: 480,
    toString() {
      return this.uri;
    }
  };
},1285,[]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  module.exports = {
    uri: "/assets/assets/images/univ/iseg.cd96508b93eb868f6e42ba34b30eb911.webp",
    width: 480,
    height: 480,
    toString() {
      return this.uri;
    }
  };
},1286,[]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  module.exports = {
    uri: "/assets/assets/images/univ/lisaa.4e81a2627dfb6078294114c1748c6d27.webp",
    width: 480,
    height: 480,
    toString() {
      return this.uri;
    }
  };
},1287,[]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  module.exports = {
    uri: "/assets/assets/images/univ/macromedia.00d3a3e22106c166d789be701ed10881.webp",
    width: 480,
    height: 480,
    toString() {
      return this.uri;
    }
  };
},1288,[]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  module.exports = {
    uri: "/assets/assets/images/univ/mbs.1bd9ebf6938ecfb295a20843f8883c94.webp",
    width: 480,
    height: 480,
    toString() {
      return this.uri;
    }
  };
},1289,[]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  module.exports = {
    uri: "/assets/assets/images/univ/merkure.b4b6f649c46ea8a04cb2e23477ba4ede.webp",
    width: 240,
    height: 240,
    toString() {
      return this.uri;
    }
  };
},1290,[]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  module.exports = {
    uri: "/assets/assets/images/univ/psb.a2c8f2806f6d30b140f5852bf9870bc0.jpg",
    width: 512,
    height: 512,
    toString() {
      return this.uri;
    }
  };
},1291,[]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  module.exports = {
    uri: "/assets/assets/images/univ/pstb.05ca839e259d40ebc3b84db6ac1c2178.webp",
    width: 480,
    height: 480,
    toString() {
      return this.uri;
    }
  };
},1292,[]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  module.exports = {
    uri: "/assets/assets/images/univ/regent.15641df0519ad87d71c867f2817a9e73.webp",
    width: 480,
    height: 480,
    toString() {
      return this.uri;
    }
  };
},1293,[]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  module.exports = {
    uri: "/assets/assets/images/univ/sciencepo.8bafc386bb7838c6f4a823ece26d4947.webp",
    width: 480,
    height: 480,
    toString() {
      return this.uri;
    }
  };
},1294,[]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  module.exports = {
    uri: "/assets/assets/images/univ/scpoaix.5a787a5a55f7529768fc747262e0cf6f.webp",
    width: 480,
    height: 480,
    toString() {
      return this.uri;
    }
  };
},1295,[]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  module.exports = {
    uri: "/assets/assets/images/univ/ubmont.7f5e2b9dc4880ddbe747e39228e7f9f3.webp",
    width: 480,
    height: 480,
    toString() {
      return this.uri;
    }
  };
},1296,[]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  module.exports = {
    uri: "/assets/assets/images/univ/uclouvain.bb1000f6cb4f28fe0f71567a0c960389.webp",
    width: 480,
    height: 480,
    toString() {
      return this.uri;
    }
  };
},1297,[]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  module.exports = {
    uri: "/assets/assets/images/univ/ucly.83e7024045868225a8cb99f71253faf1.webp",
    width: 480,
    height: 480,
    toString() {
      return this.uri;
    }
  };
},1298,[]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  module.exports = {
    uri: "/assets/assets/images/univ/ueve.69f084185de8eefb40a3556b0a93c558.webp",
    width: 480,
    height: 480,
    toString() {
      return this.uri;
    }
  };
},1299,[]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  module.exports = {
    uri: "/assets/assets/images/univ/uniassas.197ac70f1fd8af895ae8cdd2d783c071.webp",
    width: 480,
    height: 480,
    toString() {
      return this.uri;
    }
  };
},1300,[]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  module.exports = {
    uri: "/assets/assets/images/univ/unilyon3.0ab09b710548d37160f80756d2820765.webp",
    width: 480,
    height: 480,
    toString() {
      return this.uri;
    }
  };
},1301,[]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  module.exports = {
    uri: "/assets/assets/images/univ/unimes.96a86b138ce0039d03dc57b114831c3f.webp",
    width: 480,
    height: 480,
    toString() {
      return this.uri;
    }
  };
},1302,[]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  module.exports = {
    uri: "/assets/assets/images/univ/unimons.841866432ee90710c8d3152a8c511cf4.webp",
    width: 480,
    height: 480,
    toString() {
      return this.uri;
    }
  };
},1303,[]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  module.exports = {
    uri: "/assets/assets/images/univ/unitoulon.3636190e9dce26c532dc9a99f29b5839.webp",
    width: 480,
    height: 480,
    toString() {
      return this.uri;
    }
  };
},1304,[]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  module.exports = {
    uri: "/assets/assets/images/univ/univangers.b4a360a8c0022d0b03bb924fd6f84682.webp",
    width: 480,
    height: 480,
    toString() {
      return this.uri;
    }
  };
},1305,[]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  module.exports = {
    uri: "/assets/assets/images/univ/univeiffel.1ba4c9094b7574c2407a58c5b24ced3c.webp",
    width: 480,
    height: 480,
    toString() {
      return this.uri;
    }
  };
},1306,[]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  module.exports = {
    uri: "/assets/assets/images/univ/univpoitiers.2c9dc468fa31e485176f28843a27c117.webp",
    width: 480,
    height: 480,
    toString() {
      return this.uri;
    }
  };
},1307,[]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  module.exports = {
    uri: "/assets/assets/images/univ/upjv.465785267256f431a596047bf25f652d.webp",
    width: 480,
    height: 480,
    toString() {
      return this.uri;
    }
  };
},1308,[]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  module.exports = {
    uri: "/assets/assets/images/univ/wsfactory.8e243eadd64c71acdc285ea1bf8935d7.png",
    width: 225,
    height: 225,
    toString() {
      return this.uri;
    }
  };
},1309,[]);