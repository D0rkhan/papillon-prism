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
      return QRCodePage;
    }
  });
  var _aramirReactNativeBarcode = require(_dependencyMap[0]);
  var Barcode = _interopDefault(_aramirReactNativeBarcode);
  var _getpapillonPapicons = require(_dependencyMap[1]);
  var _expoBlur = require(_dependencyMap[2]);
  var _expoRouter = require(_dependencyMap[3]);
  require(_dependencyMap[4]);
  var _reactI18next = require(_dependencyMap[5]);
  var _reactNativeWebDistExportsDimensions = require(_dependencyMap[6]);
  var Dimensions = _interopDefault(_reactNativeWebDistExportsDimensions);
  require(_dependencyMap[7]);
  var _reactNativeGestureHandler = require(_dependencyMap[8]);
  var _reactNativeQrcodeSvg = require(_dependencyMap[9]);
  var QRCode = _interopDefault(_reactNativeQrcodeSvg);
  var _reactNativeReanimated = require(_dependencyMap[10]);
  var Reanimated = _interopDefault(_reactNativeReanimated);
  var _componentsOnboardingOnboardingBackButton = require(_dependencyMap[11]);
  var OnboardingBackButton = _interopDefault(_componentsOnboardingOnboardingBackButton);
  var _storesAccountTypes = require(_dependencyMap[12]);
  var _uiComponentsStack = require(_dependencyMap[13]);
  var Stack = _interopDefault(_uiComponentsStack);
  var _uiComponentsTypography = require(_dependencyMap[14]);
  var Typography = _interopDefault(_uiComponentsTypography);
  var _uiComponentsSafeHorizontalView = require(_dependencyMap[15]);
  var SafeHorizontalView = _interopDefault(_uiComponentsSafeHorizontalView);
  var _reactJsxRuntime = require(_dependencyMap[16]);
  const _worklet_4465470252397_init_data = {
    code: "(function qrcodeTsx1(e){const[translationY,opacity,scale]=this.__closure;translationY.value=e.translationY<0?e.translationY/10:e.translationY;if(e.translationY<0){return;}opacity.value=1-Math.min(Math.abs(e.translationY)/300,0.7);scale.value=1-Math.min(Math.abs(e.translationY)/600,0.4);})"
  };
  const _worklet_10938537852221_init_data = {
    code: "(function qrcodeTsx2(e){const[translationY,withSpring,finalTranslation,opacity,scale,runOnJS,router]=this.__closure;if(e.translationY>150){translationY.value=withSpring(finalTranslation,{damping:150,stiffness:1500});opacity.value=withSpring(0,{damping:150,stiffness:1500});scale.value=withSpring(0.6,{damping:150,stiffness:1500});setTimeout(function(){runOnJS(router.back)();},200);return;}translationY.value=withSpring(0,{damping:150,stiffness:1500});opacity.value=withSpring(1,{damping:150,stiffness:1500});scale.value=withSpring(1,{damping:150,stiffness:1500});})"
  };
  function QRCodePage() {
    const search = (0, _expoRouter.useLocalSearchParams)();
    const qr = String(search.qrcode);
    const type = String(search.type || "QR");
    const service = Number(search.service || _storesAccountTypes.Services.TURBOSELF);
    const {
      t
    } = (0, _reactI18next.useTranslation)();
    const translationY = (0, _reactNativeReanimated.useSharedValue)(0);
    const opacity = (0, _reactNativeReanimated.useSharedValue)(1);
    const scale = (0, _reactNativeReanimated.useSharedValue)(1);
    const finalTranslation = Dimensions.default.get("window").height / 2;
    const panGesture = _reactNativeGestureHandler.Gesture.Pan().onUpdate(function qrcodeTsx1Factory([_worklet_4465470252397_init_data, translationY, opacity, scale]) {
      const qrcodeTsx1 = function (e) {
        "use no memo";

        translationY.value = e.translationY < 0 ? e.translationY / 10 : e.translationY;
        if (e.translationY < 0) {
          return;
        }
        opacity.value = 1 - Math.min(Math.abs(e.translationY) / 300, 0.7);
        scale.value = 1 - Math.min(Math.abs(e.translationY) / 600, 0.4);
      };
      qrcodeTsx1.__closure = [translationY, opacity, scale];
      qrcodeTsx1.__workletHash = 4465470252397;
      qrcodeTsx1.__initData = _worklet_4465470252397_init_data;
      return qrcodeTsx1;
    }([_worklet_4465470252397_init_data, translationY, opacity, scale])).onEnd(function qrcodeTsx2Factory([_worklet_10938537852221_init_data, translationY, withSpring, finalTranslation, opacity, scale, runOnJS, router]) {
      const qrcodeTsx2 = function (e) {
        "use no memo";

        if (e.translationY > 150) {
          translationY.value = withSpring(finalTranslation, {
            damping: 150,
            stiffness: 1500
          });
          opacity.value = withSpring(0, {
            damping: 150,
            stiffness: 1500
          });
          scale.value = withSpring(0.6, {
            damping: 150,
            stiffness: 1500
          });
          setTimeout(() => {
            runOnJS(router.back)();
          }, 200);
          return;
        }
        translationY.value = withSpring(0, {
          damping: 150,
          stiffness: 1500
        });
        opacity.value = withSpring(1, {
          damping: 150,
          stiffness: 1500
        });
        scale.value = withSpring(1, {
          damping: 150,
          stiffness: 1500
        });
      };
      qrcodeTsx2.__closure = [translationY, withSpring, finalTranslation, opacity, scale, runOnJS, router];
      qrcodeTsx2.__workletHash = 10938537852221;
      qrcodeTsx2.__initData = _worklet_10938537852221_init_data;
      return qrcodeTsx2;
    }([_worklet_10938537852221_init_data, translationY, _reactNativeReanimated.withSpring, finalTranslation, opacity, scale, _reactNativeReanimated.runOnJS, _expoRouter.router]));
    return /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNativeGestureHandler.GestureDetector, {
      gesture: panGesture,
      children: /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_expoBlur.BlurView, {
        style: {
          flex: 1,
          backgroundColor: "#000"
        },
        tint: "dark",
        children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Reanimated.default.View, {
          entering: _reactNativeReanimated.ZoomInDown.springify(),
          style: {
            flex: 1,
            transform: [{
              translateY: translationY
            }, {
              scale: scale
            }],
            opacity: opacity,
            paddingVertical: 20
          },
          children: /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(SafeHorizontalView.default, {
            base: 20,
            style: {
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              gap: 20
            },
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Reanimated.default.View, {
              style: {
                aspectRatio: 1,
                width: "100%",
                backgroundColor: "#FFF",
                position: "relative",
                justifyContent: "center",
                alignItems: "center",
                shadowRadius: 20,
                shadowColor: "#000",
                shadowOpacity: 0.3,
                borderRadius: 25
              },
              entering: _reactNativeReanimated.FlipInEasyX.springify().delay(100),
              children: type === "QR" ? /*#__PURE__*/(0, _reactJsxRuntime.jsx)(QRCode.default, {
                value: qr,
                size: Dimensions.default.get("window").width * 0.8,
                backgroundColor: "transparent",
                color: "#000"
              }) : /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Barcode.default, {
                value: qr,
                format: type,
                background: "transparent"
              })
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(Stack.default, {
              style: {
                width: 240
              },
              hAlign: "center",
              children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Phone, {
                fill: "#FFFFFF"
              }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
                variant: "body2",
                align: "center",
                color: "#FFFFFF",
                children: t("Profile_Cards_Scan_Orientation")
              })]
            })]
          })
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(OnboardingBackButton.default, {
          icon: "Cross",
          position: "right"
        })]
      })
    });
  }
},858,[1027,1002,1067,1023,6,1105,223,193,1106,1071,1107,1108,1109,1005,1110,1111,97]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = {
        enumerable: true,
        get: function () {
          return m[k];
        }
      };
    }
    Object.defineProperty(o, k2, desc);
  } : function (o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
  });
  var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (o, v) {
    Object.defineProperty(o, "default", {
      enumerable: true,
      value: v
    });
  } : function (o, v) {
    o["default"] = v;
  });
  var __importStar = this && this.__importStar || function () {
    var ownKeys = function (o) {
      ownKeys = Object.getOwnPropertyNames || function (o) {
        var ar = [];
        for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
        return ar;
      };
      return ownKeys(o);
    };
    return function (mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
      __setModuleDefault(result, mod);
      return result;
    };
  }();
  var __importDefault = this && this.__importDefault || function (mod) {
    return mod && mod.__esModule ? mod : {
      "default": mod
    };
  };
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Barcode;
  const jsx_runtime_1 = require(_dependencyMap[0]);
  const react_1 = require(_dependencyMap[1]);
  const react_native_1 = require(_dependencyMap[2]);
  const react_native_svg_1 = __importStar(require(_dependencyMap[3]));
  // jsbarcode ships no types for this internal path (undocumented, not its public API)
  // @ts-expect-error
  const barcodes_1 = __importDefault(require(_dependencyMap[4]));
  const barcodes = barcodes_1.default;
  // noinspection JSUnusedGlobalSymbols
  /**
   * Renders `value` as an SVG barcode.
   *
   * @param props - See {@link BarcodeProps}.
   */
  function Barcode({
    value = "",
    width = 2,
    height = 100,
    format = "CODE128",
    lineColor = "#000000",
    background = "#ffffff",
    text,
    textStyle,
    style,
    onError,
    maxWidth
  }) {
    /**
     * Builds an SVG path `d` string for a single filled rectangle.
     */
    const drawRect = (x, y, rectWidth, rectHeight) => {
      return `M${x},${y}h${rectWidth}v${rectHeight}h-${rectWidth}z`;
    };
    /**
     * Converts an encoded barcode's binary string into SVG rectangle paths.
     */
    const drawSvgBarCode = encoded => {
      const rects = [];
      const {
        data: binary
      } = encoded;
      const barCodeWidth = binary.length * width;
      const singleBarWidth = typeof maxWidth === "number" && barCodeWidth > maxWidth ? maxWidth / binary.length : width;
      let barWidth = 0;
      let x = 0;
      let yFrom = 0;
      for (let b = 0; b < binary.length; b++) {
        x = b * singleBarWidth;
        if (binary[b] === "1") {
          barWidth++;
        } else if (barWidth > 0) {
          rects[rects.length] = drawRect(x - singleBarWidth * barWidth, yFrom, singleBarWidth * barWidth, height);
          barWidth = 0;
        }
      }
      if (barWidth > 0) {
        rects[rects.length] = drawRect(x - singleBarWidth * (barWidth - 1), yFrom, singleBarWidth * barWidth, height);
      }
      return rects;
    };
    /**
     * Runs `rawValue` through `Encoder`, validating it first.
     */
    const encode = (rawValue, Encoder) => {
      if (typeof rawValue !== "string" || rawValue.length === 0) {
        throw new Error("Barcode value must be a non-empty string");
      }
      const encoder = new Encoder(rawValue, {
        width,
        format,
        height,
        lineColor,
        background,
        flat: true
      });
      if (!encoder.valid()) {
        throw new Error("Invalid barcode for selected format.");
      }
      return encoder.encode();
    };
    const {
      bars,
      barCodeWidth
    } = (0, react_1.useMemo)(() => {
      const fail = err => {
        const error = err instanceof Error ? err : new Error(String(err));
        if (onError) {
          onError(error);
        }
        return {
          bars: [],
          barCodeWidth: 0
        };
      };
      if (width <= 0 || height <= 0 || typeof maxWidth === "number" && maxWidth <= 0) {
        return fail(new Error("Barcode width, height, and maxWidth must be positive numbers."));
      }
      const encoder = barcodes[format];
      if (!encoder) {
        return fail(new Error("Invalid barcode format."));
      }
      try {
        const encoded = encode(value, encoder);
        const rawBarCodeWidth = encoded.data.length * width;
        return {
          bars: drawSvgBarCode(encoded),
          barCodeWidth: typeof maxWidth === "number" && rawBarCodeWidth > maxWidth ? maxWidth : rawBarCodeWidth
        };
      } catch (err) {
        return fail(err);
      }
    }, [value, width, height, format, maxWidth]);
    return (0, jsx_runtime_1.jsxs)(react_native_1.View, {
      style: [{
        backgroundColor: background,
        alignItems: "center"
      }, style],
      children: [(0, jsx_runtime_1.jsx)(react_native_svg_1.default, {
        height: height,
        width: barCodeWidth,
        fill: lineColor,
        children: (0, jsx_runtime_1.jsx)(react_native_svg_1.Path, {
          d: bars.join(" ")
        })
      }), text && (0, jsx_runtime_1.jsx)(react_native_1.Text, {
        style: [{
          textAlign: "center"
        }, textStyle],
        children: text
      })]
    });
  }
},1027,[97,6,104,1112,1028]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return _default;
    }
  });
  var _CODE = require(_dependencyMap[0]);
  var _CODE2 = require(_dependencyMap[1]);
  var _EAN_UPC = require(_dependencyMap[2]);
  var _ITF = require(_dependencyMap[3]);
  var _MSI = require(_dependencyMap[4]);
  var _pharmacode = require(_dependencyMap[5]);
  var _codabar = require(_dependencyMap[6]);
  var _CODE3 = require(_dependencyMap[7]);
  var _GenericBarcode = require(_dependencyMap[8]);
  var _default = {
    CODE39: _CODE.CODE39,
    CODE128: _CODE2.CODE128,
    CODE128A: _CODE2.CODE128A,
    CODE128B: _CODE2.CODE128B,
    CODE128C: _CODE2.CODE128C,
    EAN13: _EAN_UPC.EAN13,
    EAN8: _EAN_UPC.EAN8,
    EAN5: _EAN_UPC.EAN5,
    EAN2: _EAN_UPC.EAN2,
    UPC: _EAN_UPC.UPC,
    UPCE: _EAN_UPC.UPCE,
    ITF14: _ITF.ITF14,
    ITF: _ITF.ITF,
    MSI: _MSI.MSI,
    MSI10: _MSI.MSI10,
    MSI11: _MSI.MSI11,
    MSI1010: _MSI.MSI1010,
    MSI1110: _MSI.MSI1110,
    pharmacode: _pharmacode.pharmacode,
    codabar: _codabar.codabar,
    CODE93: _CODE3.CODE93,
    CODE93FullASCII: _CODE3.CODE93FullASCII,
    GenericBarcode: _GenericBarcode.GenericBarcode
  };
},1028,[1029,1031,1039,1049,1053,1060,1061,1062,1066]);
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
  Object.defineProperty(exports, "CODE39", {
    enumerable: true,
    get: function () {
      return CODE39;
    }
  });
  var _BarcodeJs = require(_dependencyMap[0]);
  var Barcode = _interopDefault(_BarcodeJs);
  // Encoding documentation:
  // https://en.wikipedia.org/wiki/Code_39#Encoding

  class CODE39 extends Barcode.default {
    constructor(data, options) {
      data = data.toUpperCase();

      // Calculate mod43 checksum if enabled
      if (options.mod43) {
        data += getCharacter(mod43checksum(data));
      }
      super(data, options);
    }
    encode() {
      // First character is always a *
      var result = getEncoding("*");

      // Take every character and add the binary representation to the result
      for (let i = 0; i < this.data.length; i++) {
        result += getEncoding(this.data[i]) + "0";
      }

      // Last character is always a *
      result += getEncoding("*");
      return {
        data: result,
        text: this.text
      };
    }
    valid() {
      return this.data.search(/^[0-9A-Z\-\.\ \$\/\+\%]+$/) !== -1;
    }
  }

  // All characters. The position in the array is the (checksum) value
  var characters = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "-", ".", " ", "$", "/", "+", "%", "*"];

  // The decimal representation of the characters, is converted to the
  // corresponding binary with the getEncoding function
  var encodings = [20957, 29783, 23639, 30485, 20951, 29813, 23669, 20855, 29789, 23645, 29975, 23831, 30533, 22295, 30149, 24005, 21623, 29981, 23837, 22301, 30023, 23879, 30545, 22343, 30161, 24017, 21959, 30065, 23921, 22385, 29015, 18263, 29141, 17879, 29045, 18293, 17783, 29021, 18269, 17477, 17489, 17681, 20753, 35770];

  // Get the binary representation of a character by converting the encodings
  // from decimal to binary
  function getEncoding(character) {
    return getBinary(characterValue(character));
  }
  function getBinary(characterValue) {
    return encodings[characterValue].toString(2);
  }
  function getCharacter(characterValue) {
    return characters[characterValue];
  }
  function characterValue(character) {
    return characters.indexOf(character);
  }
  function mod43checksum(data) {
    var checksum = 0;
    for (let i = 0; i < data.length; i++) {
      checksum += characterValue(data[i]);
    }
    checksum = checksum % 43;
    return checksum;
  }
},1029,[1030]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return _default;
    }
  });
  class Barcode {
    constructor(data, options) {
      this.data = data;
      this.text = options.text || data;
      this.options = options;
    }
  }
  var _default = Barcode;
},1030,[]);
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
  Object.defineProperty(exports, "CODE128", {
    enumerable: true,
    get: function () {
      return CODE128.default;
    }
  });
  Object.defineProperty(exports, "CODE128A", {
    enumerable: true,
    get: function () {
      return CODE128A.default;
    }
  });
  Object.defineProperty(exports, "CODE128B", {
    enumerable: true,
    get: function () {
      return CODE128B.default;
    }
  });
  Object.defineProperty(exports, "CODE128C", {
    enumerable: true,
    get: function () {
      return CODE128C.default;
    }
  });
  var _CODE128_AUTOJs = require(_dependencyMap[0]);
  var CODE128 = _interopDefault(_CODE128_AUTOJs);
  var _CODE128AJs = require(_dependencyMap[1]);
  var CODE128A = _interopDefault(_CODE128AJs);
  var _CODE128BJs = require(_dependencyMap[2]);
  var CODE128B = _interopDefault(_CODE128BJs);
  var _CODE128CJs = require(_dependencyMap[3]);
  var CODE128C = _interopDefault(_CODE128CJs);
},1031,[1032,1036,1037,1038]);
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
  var _CODE = require(_dependencyMap[0]);
  var CODE128 = _interopDefault(_CODE);
  var _auto = require(_dependencyMap[1]);
  var autoSelectModes = _interopDefault(_auto);
  class CODE128AUTO extends CODE128.default {
    constructor(data, options) {
      // ASCII value ranges 0-127, 200-211
      if (/^[\x00-\x7F\xC8-\xD3]+$/.test(data)) {
        super((0, autoSelectModes.default)(data), options);
      } else {
        super(data, options);
      }
    }
  }
  var _default = CODE128AUTO;
},1032,[1033,1035]);
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
  var _BarcodeJs = require(_dependencyMap[0]);
  var Barcode = _interopDefault(_BarcodeJs);
  var _constants = require(_dependencyMap[1]);
  // This is the master class,
  // it does require the start code to be included in the string
  class CODE128 extends Barcode.default {
    constructor(data, options) {
      super(data.substring(1), options);

      // Get array of ascii codes from data
      this.bytes = data.split('').map(char => char.charCodeAt(0));
    }
    valid() {
      // ASCII value ranges 0-127, 200-211
      return /^[\x00-\x7F\xC8-\xD3]+$/.test(this.data);
    }

    // The public encoding function
    encode() {
      const bytes = this.bytes;
      // Remove the start code from the bytes and set its index
      const startIndex = bytes.shift() - 105;
      // Get start set by index
      const startSet = _constants.SET_BY_CODE[startIndex];
      if (startSet === undefined) {
        throw new RangeError('The encoding does not start with a start character.');
      }
      if (this.shouldEncodeAsEan128() === true) {
        bytes.unshift(_constants.FNC1);
      }

      // Start encode with the right type
      const encodingResult = CODE128.next(bytes, 1, startSet);
      return {
        text: this.text === this.data ? this.text.replace(/[^\x20-\x7E]/g, '') : this.text,
        data:
        // Add the start bits
        CODE128.getBar(startIndex) +
        // Add the encoded bits
        encodingResult.result +
        // Add the checksum
        CODE128.getBar((encodingResult.checksum + startIndex) % _constants.MODULO) +
        // Add the end bits
        CODE128.getBar(_constants.STOP)
      };
    }

    // GS1-128/EAN-128
    shouldEncodeAsEan128() {
      let isEAN128 = this.options.ean128 || false;
      if (typeof isEAN128 === 'string') {
        isEAN128 = isEAN128.toLowerCase() === 'true';
      }
      return isEAN128;
    }

    // Get a bar symbol by index
    static getBar(index) {
      return _constants.BARS[index] ? _constants.BARS[index].toString() : '';
    }

    // Correct an index by a set and shift it from the bytes array
    static correctIndex(bytes, set) {
      if (set === _constants.SET_A) {
        const charCode = bytes.shift();
        return charCode < 32 ? charCode + 64 : charCode - 32;
      } else if (set === _constants.SET_B) {
        return bytes.shift() - 32;
      } else {
        return (bytes.shift() - 48) * 10 + bytes.shift() - 48;
      }
    }
    static next(bytes, pos, set) {
      if (!bytes.length) {
        return {
          result: '',
          checksum: 0
        };
      }
      let nextCode, index;

      // Special characters
      if (bytes[0] >= 200) {
        index = bytes.shift() - 105;
        const nextSet = _constants.SWAP[index];

        // Swap to other set
        if (nextSet !== undefined) {
          nextCode = CODE128.next(bytes, pos + 1, nextSet);
        }
        // Continue on current set but encode a special character
        else {
          // Shift
          if ((set === _constants.SET_A || set === _constants.SET_B) && index === _constants.SHIFT) {
            // Convert the next character so that is encoded correctly
            bytes[0] = set === _constants.SET_A ? bytes[0] > 95 ? bytes[0] - 96 : bytes[0] : bytes[0] < 32 ? bytes[0] + 96 : bytes[0];
          }
          nextCode = CODE128.next(bytes, pos + 1, set);
        }
      }
      // Continue encoding
      else {
        index = CODE128.correctIndex(bytes, set);
        nextCode = CODE128.next(bytes, pos + 1, set);
      }

      // Get the correct binary encoding and calculate the weight
      const enc = CODE128.getBar(index);
      const weight = index * pos;
      return {
        result: enc + nextCode.result,
        checksum: weight + nextCode.checksum
      };
    }
  }
  var _default = CODE128;
},1033,[1030,1034]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  Object.defineProperty(exports, "SET_A", {
    enumerable: true,
    get: function () {
      return SET_A;
    }
  });
  Object.defineProperty(exports, "SET_B", {
    enumerable: true,
    get: function () {
      return SET_B;
    }
  });
  Object.defineProperty(exports, "SET_C", {
    enumerable: true,
    get: function () {
      return SET_C;
    }
  });
  Object.defineProperty(exports, "SHIFT", {
    enumerable: true,
    get: function () {
      return SHIFT;
    }
  });
  Object.defineProperty(exports, "START_A", {
    enumerable: true,
    get: function () {
      return START_A;
    }
  });
  Object.defineProperty(exports, "START_B", {
    enumerable: true,
    get: function () {
      return START_B;
    }
  });
  Object.defineProperty(exports, "START_C", {
    enumerable: true,
    get: function () {
      return START_C;
    }
  });
  Object.defineProperty(exports, "MODULO", {
    enumerable: true,
    get: function () {
      return MODULO;
    }
  });
  Object.defineProperty(exports, "STOP", {
    enumerable: true,
    get: function () {
      return STOP;
    }
  });
  Object.defineProperty(exports, "FNC1", {
    enumerable: true,
    get: function () {
      return FNC1;
    }
  });
  Object.defineProperty(exports, "SET_BY_CODE", {
    enumerable: true,
    get: function () {
      return SET_BY_CODE;
    }
  });
  Object.defineProperty(exports, "SWAP", {
    enumerable: true,
    get: function () {
      return SWAP;
    }
  });
  Object.defineProperty(exports, "A_START_CHAR", {
    enumerable: true,
    get: function () {
      return A_START_CHAR;
    }
  });
  Object.defineProperty(exports, "B_START_CHAR", {
    enumerable: true,
    get: function () {
      return B_START_CHAR;
    }
  });
  Object.defineProperty(exports, "C_START_CHAR", {
    enumerable: true,
    get: function () {
      return C_START_CHAR;
    }
  });
  Object.defineProperty(exports, "A_CHARS", {
    enumerable: true,
    get: function () {
      return A_CHARS;
    }
  });
  Object.defineProperty(exports, "B_CHARS", {
    enumerable: true,
    get: function () {
      return B_CHARS;
    }
  });
  Object.defineProperty(exports, "C_CHARS", {
    enumerable: true,
    get: function () {
      return C_CHARS;
    }
  });
  Object.defineProperty(exports, "BARS", {
    enumerable: true,
    get: function () {
      return BARS;
    }
  });
  // constants for internal usage
  const SET_A = 0;
  const SET_B = 1;
  const SET_C = 2;

  // Special characters
  const SHIFT = 98;
  const START_A = 103;
  const START_B = 104;
  const START_C = 105;
  const MODULO = 103;
  const STOP = 106;
  const FNC1 = 207;

  // Get set by start code
  const SET_BY_CODE = {
    [START_A]: SET_A,
    [START_B]: SET_B,
    [START_C]: SET_C
  };

  // Get next set by code
  const SWAP = {
    101: SET_A,
    100: SET_B,
    99: SET_C
  };
  const A_START_CHAR = String.fromCharCode(208); // START_A + 105
  const B_START_CHAR = String.fromCharCode(209); // START_B + 105
  const C_START_CHAR = String.fromCharCode(210); // START_C + 105

  // 128A (Code Set A)
  // ASCII characters 00 to 95 (0–9, A–Z and control codes), special characters, and FNC 1–4
  const A_CHARS = "[\x00-\x5F\xC8-\xCF]";

  // 128B (Code Set B)
  // ASCII characters 32 to 127 (0–9, A–Z, a–z), special characters, and FNC 1–4
  const B_CHARS = "[\x20-\x7F\xC8-\xCF]";

  // 128C (Code Set C)
  // 00–99 (encodes two digits with a single code point) and FNC1
  const C_CHARS = "(\xCF*[0-9]{2}\xCF*)";

  // CODE128 includes 107 symbols:
  // 103 data symbols, 3 start symbols (A, B and C), and 1 stop symbol (the last one)
  // Each symbol consist of three black bars (1) and three white spaces (0).
  const BARS = [11011001100, 11001101100, 11001100110, 10010011000, 10010001100, 10001001100, 10011001000, 10011000100, 10001100100, 11001001000, 11001000100, 11000100100, 10110011100, 10011011100, 10011001110, 10111001100, 10011101100, 10011100110, 11001110010, 11001011100, 11001001110, 11011100100, 11001110100, 11101101110, 11101001100, 11100101100, 11100100110, 11101100100, 11100110100, 11100110010, 11011011000, 11011000110, 11000110110, 10100011000, 10001011000, 10001000110, 10110001000, 10001101000, 10001100010, 11010001000, 11000101000, 11000100010, 10110111000, 10110001110, 10001101110, 10111011000, 10111000110, 10001110110, 11101110110, 11010001110, 11000101110, 11011101000, 11011100010, 11011101110, 11101011000, 11101000110, 11100010110, 11101101000, 11101100010, 11100011010, 11101111010, 11001000010, 11110001010, 10100110000, 10100001100, 10010110000, 10010000110, 10000101100, 10000100110, 10110010000, 10110000100, 10011010000, 10011000010, 10000110100, 10000110010, 11000010010, 11001010000, 11110111010, 11000010100, 10001111010, 10100111100, 10010111100, 10010011110, 10111100100, 10011110100, 10011110010, 11110100100, 11110010100, 11110010010, 11011011110, 11011110110, 11110110110, 10101111000, 10100011110, 10001011110, 10111101000, 10111100010, 11110101000, 11110100010, 10111011110, 10111101110, 11101011110, 11110101110, 11010000100, 11010010000, 11010011100, 1100011101011];
},1034,[]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return _default;
    }
  });
  var _constants = require(_dependencyMap[0]);
  // Match Set functions
  const matchSetALength = string => string.match(new RegExp(`^${_constants.A_CHARS}*`))[0].length;
  const matchSetBLength = string => string.match(new RegExp(`^${_constants.B_CHARS}*`))[0].length;
  const matchSetC = string => string.match(new RegExp(`^${_constants.C_CHARS}*`))[0];

  // CODE128A or CODE128B
  function autoSelectFromAB(string, isA) {
    const ranges = isA ? _constants.A_CHARS : _constants.B_CHARS;
    const untilC = string.match(new RegExp(`^(${ranges}+?)(([0-9]{2}){2,})([^0-9]|$)`));
    if (untilC) {
      return untilC[1] + String.fromCharCode(204) + autoSelectFromC(string.substring(untilC[1].length));
    }
    const chars = string.match(new RegExp(`^${ranges}+`))[0];
    if (chars.length === string.length) {
      return string;
    }
    return chars + String.fromCharCode(isA ? 205 : 206) + autoSelectFromAB(string.substring(chars.length), !isA);
  }

  // CODE128C
  function autoSelectFromC(string) {
    const cMatch = matchSetC(string);
    const length = cMatch.length;
    if (length === string.length) {
      return string;
    }
    string = string.substring(length);

    // Select A/B depending on the longest match
    const isA = matchSetALength(string) >= matchSetBLength(string);
    return cMatch + String.fromCharCode(isA ? 206 : 205) + autoSelectFromAB(string, isA);
  }

  // Detect Code Set (A, B or C) and format the string
  var _default = string => {
    let newString;
    const cLength = matchSetC(string).length;

    // Select 128C if the string start with enough digits
    if (cLength >= 2) {
      newString = _constants.C_START_CHAR + autoSelectFromC(string);
    } else {
      // Select A/B depending on the longest match
      const isA = matchSetALength(string) > matchSetBLength(string);
      newString = (isA ? _constants.A_START_CHAR : _constants.B_START_CHAR) + autoSelectFromAB(string, isA);
    }
    return newString.replace(/[\xCD\xCE]([^])[\xCD\xCE]/,
    // Any sequence between 205 and 206 characters
    (match, char) => String.fromCharCode(203) + char);
  };
},1035,[1034]);
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
  var _CODE128Js = require(_dependencyMap[0]);
  var CODE128 = _interopDefault(_CODE128Js);
  var _constants = require(_dependencyMap[1]);
  class CODE128A extends CODE128.default {
    constructor(string, options) {
      super(_constants.A_START_CHAR + string, options);
    }
    valid() {
      return new RegExp(`^${_constants.A_CHARS}+$`).test(this.data);
    }
  }
  var _default = CODE128A;
},1036,[1033,1034]);
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
  var _CODE128Js = require(_dependencyMap[0]);
  var CODE128 = _interopDefault(_CODE128Js);
  var _constants = require(_dependencyMap[1]);
  class CODE128B extends CODE128.default {
    constructor(string, options) {
      super(_constants.B_START_CHAR + string, options);
    }
    valid() {
      return new RegExp(`^${_constants.B_CHARS}+$`).test(this.data);
    }
  }
  var _default = CODE128B;
},1037,[1033,1034]);
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
  var _CODE128Js = require(_dependencyMap[0]);
  var CODE128 = _interopDefault(_CODE128Js);
  var _constants = require(_dependencyMap[1]);
  class CODE128C extends CODE128.default {
    constructor(string, options) {
      super(_constants.C_START_CHAR + string, options);
    }
    valid() {
      return new RegExp(`^${_constants.C_CHARS}+$`).test(this.data);
    }
  }
  var _default = CODE128C;
},1038,[1033,1034]);
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
  Object.defineProperty(exports, "EAN13", {
    enumerable: true,
    get: function () {
      return EAN13.default;
    }
  });
  Object.defineProperty(exports, "EAN8", {
    enumerable: true,
    get: function () {
      return EAN8.default;
    }
  });
  Object.defineProperty(exports, "EAN5", {
    enumerable: true,
    get: function () {
      return EAN5.default;
    }
  });
  Object.defineProperty(exports, "EAN2", {
    enumerable: true,
    get: function () {
      return EAN2.default;
    }
  });
  Object.defineProperty(exports, "UPC", {
    enumerable: true,
    get: function () {
      return UPC.default;
    }
  });
  Object.defineProperty(exports, "UPCE", {
    enumerable: true,
    get: function () {
      return UPCE.default;
    }
  });
  var _EAN13Js = require(_dependencyMap[0]);
  var EAN13 = _interopDefault(_EAN13Js);
  var _EAN8Js = require(_dependencyMap[1]);
  var EAN8 = _interopDefault(_EAN8Js);
  var _EAN5Js = require(_dependencyMap[2]);
  var EAN5 = _interopDefault(_EAN5Js);
  var _EAN2Js = require(_dependencyMap[3]);
  var EAN2 = _interopDefault(_EAN2Js);
  var _UPCJs = require(_dependencyMap[4]);
  var UPC = _interopDefault(_UPCJs);
  var _UPCEJs = require(_dependencyMap[5]);
  var UPCE = _interopDefault(_UPCEJs);
},1039,[1040,1044,1045,1046,1047,1048]);
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
  var _constants = require(_dependencyMap[0]);
  var _EAN = require(_dependencyMap[1]);
  var EAN = _interopDefault(_EAN);
  // Encoding documentation:
  // https://en.wikipedia.org/wiki/International_Article_Number_(EAN)#Binary_encoding_of_data_digits_into_EAN-13_barcode

  // Calculate the checksum digit
  // https://en.wikipedia.org/wiki/International_Article_Number_(EAN)#Calculation_of_checksum_digit
  const checksum = number => {
    const res = number.substr(0, 12).split('').map(n => +n).reduce((sum, a, idx) => idx % 2 ? sum + a * 3 : sum + a, 0);
    return (10 - res % 10) % 10;
  };
  class EAN13 extends EAN.default {
    constructor(data, options) {
      // Add checksum if it does not exist
      if (data.search(/^[0-9]{12}$/) !== -1) {
        data += checksum(data);
      }
      super(data, options);

      // Adds a last character to the end of the barcode
      this.lastChar = options.lastChar;
    }
    valid() {
      return this.data.search(/^[0-9]{13}$/) !== -1 && +this.data[12] === checksum(this.data);
    }
    leftText() {
      return super.leftText(1, 6);
    }
    leftEncode() {
      const data = this.data.substr(1, 6);
      const structure = _constants.EAN13_STRUCTURE[this.data[0]];
      return super.leftEncode(data, structure);
    }
    rightText() {
      return super.rightText(7, 6);
    }
    rightEncode() {
      const data = this.data.substr(7, 6);
      return super.rightEncode(data, 'RRRRRR');
    }

    // The "standard" way of printing EAN13 barcodes with guard bars
    encodeGuarded() {
      const data = super.encodeGuarded();

      // Extend data with left digit & last character
      if (this.options.displayValue) {
        data.unshift({
          data: '000000000000',
          text: this.text.substr(0, 1),
          options: {
            textAlign: 'left',
            fontSize: this.fontSize
          }
        });
        if (this.options.lastChar) {
          data.push({
            data: '00'
          });
          data.push({
            data: '00000',
            text: this.options.lastChar,
            options: {
              fontSize: this.fontSize
            }
          });
        }
      }
      return data;
    }
  }
  var _default = EAN13;
},1040,[1041,1042]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  Object.defineProperty(exports, "SIDE_BIN", {
    enumerable: true,
    get: function () {
      return SIDE_BIN;
    }
  });
  Object.defineProperty(exports, "MIDDLE_BIN", {
    enumerable: true,
    get: function () {
      return MIDDLE_BIN;
    }
  });
  Object.defineProperty(exports, "BINARIES", {
    enumerable: true,
    get: function () {
      return BINARIES;
    }
  });
  Object.defineProperty(exports, "EAN2_STRUCTURE", {
    enumerable: true,
    get: function () {
      return EAN2_STRUCTURE;
    }
  });
  Object.defineProperty(exports, "EAN5_STRUCTURE", {
    enumerable: true,
    get: function () {
      return EAN5_STRUCTURE;
    }
  });
  Object.defineProperty(exports, "EAN13_STRUCTURE", {
    enumerable: true,
    get: function () {
      return EAN13_STRUCTURE;
    }
  });
  // Standard start end and middle bits
  const SIDE_BIN = '101';
  const MIDDLE_BIN = '01010';
  const BINARIES = {
    'L': [
    // The L (left) type of encoding
    '0001101', '0011001', '0010011', '0111101', '0100011', '0110001', '0101111', '0111011', '0110111', '0001011'],
    'G': [
    // The G type of encoding
    '0100111', '0110011', '0011011', '0100001', '0011101', '0111001', '0000101', '0010001', '0001001', '0010111'],
    'R': [
    // The R (right) type of encoding
    '1110010', '1100110', '1101100', '1000010', '1011100', '1001110', '1010000', '1000100', '1001000', '1110100'],
    'O': [
    // The O (odd) encoding for UPC-E
    '0001101', '0011001', '0010011', '0111101', '0100011', '0110001', '0101111', '0111011', '0110111', '0001011'],
    'E': [
    // The E (even) encoding for UPC-E
    '0100111', '0110011', '0011011', '0100001', '0011101', '0111001', '0000101', '0010001', '0001001', '0010111']
  };

  // Define the EAN-2 structure
  const EAN2_STRUCTURE = ['LL', 'LG', 'GL', 'GG'];

  // Define the EAN-5 structure
  const EAN5_STRUCTURE = ['GGLLL', 'GLGLL', 'GLLGL', 'GLLLG', 'LGGLL', 'LLGGL', 'LLLGG', 'LGLGL', 'LGLLG', 'LLGLG'];

  // Define the EAN-13 structure
  const EAN13_STRUCTURE = ['LLLLLL', 'LLGLGG', 'LLGGLG', 'LLGGGL', 'LGLLGG', 'LGGLLG', 'LGGGLL', 'LGLGLG', 'LGLGGL', 'LGGLGL'];
},1041,[]);
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
  var _constants = require(_dependencyMap[0]);
  var _encoder = require(_dependencyMap[1]);
  var encode = _interopDefault(_encoder);
  var _Barcode = require(_dependencyMap[2]);
  var Barcode = _interopDefault(_Barcode);
  // Base class for EAN8 & EAN13
  class EAN extends Barcode.default {
    constructor(data, options) {
      super(data, options);

      // Make sure the font is not bigger than the space between the guard bars
      this.fontSize = !options.flat && options.fontSize > options.width * 10 ? options.width * 10 : options.fontSize;

      // Make the guard bars go down half the way of the text
      this.guardHeight = options.height + this.fontSize / 2 + options.textMargin;
    }
    encode() {
      return this.options.flat ? this.encodeFlat() : this.encodeGuarded();
    }
    leftText(from, to) {
      return this.text.substr(from, to);
    }
    leftEncode(data, structure) {
      return (0, encode.default)(data, structure);
    }
    rightText(from, to) {
      return this.text.substr(from, to);
    }
    rightEncode(data, structure) {
      return (0, encode.default)(data, structure);
    }
    encodeGuarded() {
      const textOptions = {
        fontSize: this.fontSize
      };
      const guardOptions = {
        height: this.guardHeight
      };
      return [{
        data: _constants.SIDE_BIN,
        options: guardOptions
      }, {
        data: this.leftEncode(),
        text: this.leftText(),
        options: textOptions
      }, {
        data: _constants.MIDDLE_BIN,
        options: guardOptions
      }, {
        data: this.rightEncode(),
        text: this.rightText(),
        options: textOptions
      }, {
        data: _constants.SIDE_BIN,
        options: guardOptions
      }];
    }
    encodeFlat() {
      const data = [_constants.SIDE_BIN, this.leftEncode(), _constants.MIDDLE_BIN, this.rightEncode(), _constants.SIDE_BIN];
      return {
        data: data.join(''),
        text: this.text
      };
    }
  }
  var _default = EAN;
},1042,[1041,1043,1030]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return _default;
    }
  });
  var _constants = require(_dependencyMap[0]);
  // Encode data string
  const encode = (data, structure, separator) => {
    let encoded = data.split('').map((val, idx) => _constants.BINARIES[structure[idx]]).map((val, idx) => val ? val[data[idx]] : '');
    if (separator) {
      const last = data.length - 1;
      encoded = encoded.map((val, idx) => idx < last ? val + separator : val);
    }
    return encoded.join('');
  };
  var _default = encode;
},1043,[1041]);
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
  var _EAN = require(_dependencyMap[0]);
  var EAN = _interopDefault(_EAN);
  // Encoding documentation:
  // http://www.barcodeisland.com/ean8.phtml

  // Calculate the checksum digit
  const checksum = number => {
    const res = number.substr(0, 7).split('').map(n => +n).reduce((sum, a, idx) => idx % 2 ? sum + a : sum + a * 3, 0);
    return (10 - res % 10) % 10;
  };
  class EAN8 extends EAN.default {
    constructor(data, options) {
      // Add checksum if it does not exist
      if (data.search(/^[0-9]{7}$/) !== -1) {
        data += checksum(data);
      }
      super(data, options);
    }
    valid() {
      return this.data.search(/^[0-9]{8}$/) !== -1 && +this.data[7] === checksum(this.data);
    }
    leftText() {
      return super.leftText(0, 4);
    }
    leftEncode() {
      const data = this.data.substr(0, 4);
      return super.leftEncode(data, 'LLLL');
    }
    rightText() {
      return super.rightText(4, 4);
    }
    rightEncode() {
      const data = this.data.substr(4, 4);
      return super.rightEncode(data, 'RRRR');
    }
  }
  var _default = EAN8;
},1044,[1042]);
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
  var _constants = require(_dependencyMap[0]);
  var _encoder = require(_dependencyMap[1]);
  var encode = _interopDefault(_encoder);
  var _Barcode = require(_dependencyMap[2]);
  var Barcode = _interopDefault(_Barcode);
  // Encoding documentation:
  // https://en.wikipedia.org/wiki/EAN_5#Encoding

  const checksum = data => {
    const result = data.split('').map(n => +n).reduce((sum, a, idx) => {
      return idx % 2 ? sum + a * 9 : sum + a * 3;
    }, 0);
    return result % 10;
  };
  class EAN5 extends Barcode.default {
    constructor(data, options) {
      super(data, options);
    }
    valid() {
      return this.data.search(/^[0-9]{5}$/) !== -1;
    }
    encode() {
      const structure = _constants.EAN5_STRUCTURE[checksum(this.data)];
      return {
        data: '1011' + (0, encode.default)(this.data, structure, '01'),
        text: this.text
      };
    }
  }
  var _default = EAN5;
},1045,[1041,1043,1030]);
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
  var _constants = require(_dependencyMap[0]);
  var _encoder = require(_dependencyMap[1]);
  var encode = _interopDefault(_encoder);
  var _Barcode = require(_dependencyMap[2]);
  var Barcode = _interopDefault(_Barcode);
  // Encoding documentation:
  // https://en.wikipedia.org/wiki/EAN_2#Encoding

  class EAN2 extends Barcode.default {
    constructor(data, options) {
      super(data, options);
    }
    valid() {
      return this.data.search(/^[0-9]{2}$/) !== -1;
    }
    encode() {
      // Choose the structure based on the number mod 4
      const structure = _constants.EAN2_STRUCTURE[parseInt(this.data) % 4];
      return {
        // Start bits + Encode the two digits with 01 in between
        data: '1011' + (0, encode.default)(this.data, structure, '01'),
        text: this.text
      };
    }
  }
  var _default = EAN2;
},1046,[1041,1043,1030]);
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
  exports.checksum = checksum;
  var _encoder = require(_dependencyMap[0]);
  var encode = _interopDefault(_encoder);
  var _BarcodeJs = require(_dependencyMap[1]);
  var Barcode = _interopDefault(_BarcodeJs);
  // Encoding documentation:
  // https://en.wikipedia.org/wiki/Universal_Product_Code#Encoding

  class UPC extends Barcode.default {
    constructor(data, options) {
      // Add checksum if it does not exist
      if (data.search(/^[0-9]{11}$/) !== -1) {
        data += checksum(data);
      }
      super(data, options);
      this.displayValue = options.displayValue;

      // Make sure the font is not bigger than the space between the guard bars
      if (options.fontSize > options.width * 10) {
        this.fontSize = options.width * 10;
      } else {
        this.fontSize = options.fontSize;
      }

      // Make the guard bars go down half the way of the text
      this.guardHeight = options.height + this.fontSize / 2 + options.textMargin;
    }
    valid() {
      return this.data.search(/^[0-9]{12}$/) !== -1 && this.data[11] == checksum(this.data);
    }
    encode() {
      if (this.options.flat) {
        return this.flatEncoding();
      } else {
        return this.guardedEncoding();
      }
    }
    flatEncoding() {
      var result = "";
      result += "101";
      result += (0, encode.default)(this.data.substr(0, 6), "LLLLLL");
      result += "01010";
      result += (0, encode.default)(this.data.substr(6, 6), "RRRRRR");
      result += "101";
      return {
        data: result,
        text: this.text
      };
    }
    guardedEncoding() {
      var result = [];

      // Add the first digit
      if (this.displayValue) {
        result.push({
          data: "00000000",
          text: this.text.substr(0, 1),
          options: {
            textAlign: "left",
            fontSize: this.fontSize
          }
        });
      }

      // Add the guard bars
      result.push({
        data: "101" + (0, encode.default)(this.data[0], "L"),
        options: {
          height: this.guardHeight
        }
      });

      // Add the left side
      result.push({
        data: (0, encode.default)(this.data.substr(1, 5), "LLLLL"),
        text: this.text.substr(1, 5),
        options: {
          fontSize: this.fontSize
        }
      });

      // Add the middle bits
      result.push({
        data: "01010",
        options: {
          height: this.guardHeight
        }
      });

      // Add the right side
      result.push({
        data: (0, encode.default)(this.data.substr(6, 5), "RRRRR"),
        text: this.text.substr(6, 5),
        options: {
          fontSize: this.fontSize
        }
      });

      // Add the end bits
      result.push({
        data: (0, encode.default)(this.data[11], "R") + "101",
        options: {
          height: this.guardHeight
        }
      });

      // Add the last digit
      if (this.displayValue) {
        result.push({
          data: "00000000",
          text: this.text.substr(11, 1),
          options: {
            textAlign: "right",
            fontSize: this.fontSize
          }
        });
      }
      return result;
    }
  }

  // Calulate the checksum digit
  // https://en.wikipedia.org/wiki/International_Article_Number_(EAN)#Calculation_of_checksum_digit
  function checksum(number) {
    var result = 0;
    var i;
    for (i = 1; i < 11; i += 2) {
      result += parseInt(number[i]);
    }
    for (i = 0; i < 11; i += 2) {
      result += parseInt(number[i]) * 3;
    }
    return (10 - result % 10) % 10;
  }
  var _default = UPC;
},1047,[1043,1030]);
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
  var _encoder = require(_dependencyMap[0]);
  var encode = _interopDefault(_encoder);
  var _BarcodeJs = require(_dependencyMap[1]);
  var Barcode = _interopDefault(_BarcodeJs);
  var _UPCJs = require(_dependencyMap[2]);
  // Encoding documentation:
  // https://en.wikipedia.org/wiki/Universal_Product_Code#Encoding
  //
  // UPC-E documentation:
  // https://en.wikipedia.org/wiki/Universal_Product_Code#UPC-E

  const EXPANSIONS = ["XX00000XXX", "XX10000XXX", "XX20000XXX", "XXX00000XX", "XXXX00000X", "XXXXX00005", "XXXXX00006", "XXXXX00007", "XXXXX00008", "XXXXX00009"];
  const PARITIES = [["EEEOOO", "OOOEEE"], ["EEOEOO", "OOEOEE"], ["EEOOEO", "OOEEOE"], ["EEOOOE", "OOEEEO"], ["EOEEOO", "OEOOEE"], ["EOOEEO", "OEEOOE"], ["EOOOEE", "OEEEOO"], ["EOEOEO", "OEOEOE"], ["EOEOOE", "OEOEEO"], ["EOOEOE", "OEEOEO"]];
  class UPCE extends Barcode.default {
    constructor(data, options) {
      // Code may be 6 or 8 digits;
      // A 7 digit code is ambiguous as to whether the extra digit
      // is a UPC-A check or number system digit.
      super(data, options);
      this.isValid = false;
      if (data.search(/^[0-9]{6}$/) !== -1) {
        this.middleDigits = data;
        this.upcA = expandToUPCA(data, "0");
        this.text = options.text || `${this.upcA[0]}${data}${this.upcA[this.upcA.length - 1]}`;
        this.isValid = true;
      } else if (data.search(/^[01][0-9]{7}$/) !== -1) {
        this.middleDigits = data.substring(1, data.length - 1);
        this.upcA = expandToUPCA(this.middleDigits, data[0]);
        if (this.upcA[this.upcA.length - 1] === data[data.length - 1]) {
          this.isValid = true;
        } else {
          // checksum mismatch
          return;
        }
      } else {
        return;
      }
      this.displayValue = options.displayValue;

      // Make sure the font is not bigger than the space between the guard bars
      if (options.fontSize > options.width * 10) {
        this.fontSize = options.width * 10;
      } else {
        this.fontSize = options.fontSize;
      }

      // Make the guard bars go down half the way of the text
      this.guardHeight = options.height + this.fontSize / 2 + options.textMargin;
    }
    valid() {
      return this.isValid;
    }
    encode() {
      if (this.options.flat) {
        return this.flatEncoding();
      } else {
        return this.guardedEncoding();
      }
    }
    flatEncoding() {
      var result = "";
      result += "101";
      result += this.encodeMiddleDigits();
      result += "010101";
      return {
        data: result,
        text: this.text
      };
    }
    guardedEncoding() {
      var result = [];

      // Add the UPC-A number system digit beneath the quiet zone
      if (this.displayValue) {
        result.push({
          data: "00000000",
          text: this.text[0],
          options: {
            textAlign: "left",
            fontSize: this.fontSize
          }
        });
      }

      // Add the guard bars
      result.push({
        data: "101",
        options: {
          height: this.guardHeight
        }
      });

      // Add the 6 UPC-E digits
      result.push({
        data: this.encodeMiddleDigits(),
        text: this.text.substring(1, 7),
        options: {
          fontSize: this.fontSize
        }
      });

      // Add the end bits
      result.push({
        data: "010101",
        options: {
          height: this.guardHeight
        }
      });

      // Add the UPC-A check digit beneath the quiet zone
      if (this.displayValue) {
        result.push({
          data: "00000000",
          text: this.text[7],
          options: {
            textAlign: "right",
            fontSize: this.fontSize
          }
        });
      }
      return result;
    }
    encodeMiddleDigits() {
      const numberSystem = this.upcA[0];
      const checkDigit = this.upcA[this.upcA.length - 1];
      const parity = PARITIES[parseInt(checkDigit)][parseInt(numberSystem)];
      return (0, encode.default)(this.middleDigits, parity);
    }
  }
  function expandToUPCA(middleDigits, numberSystem) {
    const lastUpcE = parseInt(middleDigits[middleDigits.length - 1]);
    const expansion = EXPANSIONS[lastUpcE];
    let result = "";
    let digitIndex = 0;
    for (let i = 0; i < expansion.length; i++) {
      let c = expansion[i];
      if (c === 'X') {
        result += middleDigits[digitIndex++];
      } else {
        result += c;
      }
    }
    result = `${numberSystem}${result}`;
    return `${result}${(0, _UPCJs.checksum)(result)}`;
  }
  var _default = UPCE;
},1048,[1043,1030,1047]);
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
  Object.defineProperty(exports, "ITF", {
    enumerable: true,
    get: function () {
      return ITF.default;
    }
  });
  Object.defineProperty(exports, "ITF14", {
    enumerable: true,
    get: function () {
      return ITF14.default;
    }
  });
  var _ITF = require(_dependencyMap[0]);
  var ITF = _interopDefault(_ITF);
  var _ITF2 = require(_dependencyMap[1]);
  var ITF14 = _interopDefault(_ITF2);
},1049,[1050,1052]);
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
  var _constants = require(_dependencyMap[0]);
  var _Barcode = require(_dependencyMap[1]);
  var Barcode = _interopDefault(_Barcode);
  class ITF extends Barcode.default {
    valid() {
      return this.data.search(/^([0-9]{2})+$/) !== -1;
    }
    encode() {
      // Calculate all the digit pairs
      const encoded = this.data.match(/.{2}/g).map(pair => this.encodePair(pair)).join('');
      return {
        data: _constants.START_BIN + encoded + _constants.END_BIN,
        text: this.text
      };
    }

    // Calculate the data of a number pair
    encodePair(pair) {
      const second = _constants.BINARIES[pair[1]];
      return _constants.BINARIES[pair[0]].split('').map((first, idx) => (first === '1' ? '111' : '1') + (second[idx] === '1' ? '000' : '0')).join('');
    }
  }
  var _default = ITF;
},1050,[1051,1030]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  Object.defineProperty(exports, "START_BIN", {
    enumerable: true,
    get: function () {
      return START_BIN;
    }
  });
  Object.defineProperty(exports, "END_BIN", {
    enumerable: true,
    get: function () {
      return END_BIN;
    }
  });
  Object.defineProperty(exports, "BINARIES", {
    enumerable: true,
    get: function () {
      return BINARIES;
    }
  });
  const START_BIN = '1010';
  const END_BIN = '11101';
  const BINARIES = ['00110', '10001', '01001', '11000', '00101', '10100', '01100', '00011', '10010', '01010'];
},1051,[]);
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
  var _ITF = require(_dependencyMap[0]);
  var ITF = _interopDefault(_ITF);
  // Calculate the checksum digit
  const checksum = data => {
    const res = data.substr(0, 13).split('').map(num => parseInt(num, 10)).reduce((sum, n, idx) => sum + n * (3 - idx % 2 * 2), 0);
    return Math.ceil(res / 10) * 10 - res;
  };
  class ITF14 extends ITF.default {
    constructor(data, options) {
      // Add checksum if it does not exist
      if (data.search(/^[0-9]{13}$/) !== -1) {
        data += checksum(data);
      }
      super(data, options);
    }
    valid() {
      return this.data.search(/^[0-9]{14}$/) !== -1 && +this.data[13] === checksum(this.data);
    }
  }
  var _default = ITF14;
},1052,[1050]);
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
  Object.defineProperty(exports, "MSI", {
    enumerable: true,
    get: function () {
      return MSI.default;
    }
  });
  Object.defineProperty(exports, "MSI10", {
    enumerable: true,
    get: function () {
      return MSI10.default;
    }
  });
  Object.defineProperty(exports, "MSI11", {
    enumerable: true,
    get: function () {
      return MSI11.default;
    }
  });
  Object.defineProperty(exports, "MSI1010", {
    enumerable: true,
    get: function () {
      return MSI1010.default;
    }
  });
  Object.defineProperty(exports, "MSI1110", {
    enumerable: true,
    get: function () {
      return MSI1110.default;
    }
  });
  var _MSIJs = require(_dependencyMap[0]);
  var MSI = _interopDefault(_MSIJs);
  var _MSI10Js = require(_dependencyMap[1]);
  var MSI10 = _interopDefault(_MSI10Js);
  var _MSI11Js = require(_dependencyMap[2]);
  var MSI11 = _interopDefault(_MSI11Js);
  var _MSI1010Js = require(_dependencyMap[3]);
  var MSI1010 = _interopDefault(_MSI1010Js);
  var _MSI1110Js = require(_dependencyMap[4]);
  var MSI1110 = _interopDefault(_MSI1110Js);
},1053,[1054,1055,1057,1058,1059]);
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
  var _BarcodeJs = require(_dependencyMap[0]);
  var Barcode = _interopDefault(_BarcodeJs);
  // Encoding documentation
  // https://en.wikipedia.org/wiki/MSI_Barcode#Character_set_and_binary_lookup

  class MSI extends Barcode.default {
    constructor(data, options) {
      super(data, options);
    }
    encode() {
      // Start bits
      var ret = "110";
      for (var i = 0; i < this.data.length; i++) {
        // Convert the character to binary (always 4 binary digits)
        var digit = parseInt(this.data[i]);
        var bin = digit.toString(2);
        bin = addZeroes(bin, 4 - bin.length);

        // Add 100 for every zero and 110 for every 1
        for (var b = 0; b < bin.length; b++) {
          ret += bin[b] == "0" ? "100" : "110";
        }
      }

      // End bits
      ret += "1001";
      return {
        data: ret,
        text: this.text
      };
    }
    valid() {
      return this.data.search(/^[0-9]+$/) !== -1;
    }
  }
  function addZeroes(number, n) {
    for (var i = 0; i < n; i++) {
      number = "0" + number;
    }
    return number;
  }
  var _default = MSI;
},1054,[1030]);
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
  var _MSIJs = require(_dependencyMap[0]);
  var MSI = _interopDefault(_MSIJs);
  var _checksumsJs = require(_dependencyMap[1]);
  class MSI10 extends MSI.default {
    constructor(data, options) {
      super(data + (0, _checksumsJs.mod10)(data), options);
    }
  }
  var _default = MSI10;
},1055,[1054,1056]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  exports.mod10 = mod10;
  exports.mod11 = mod11;
  function mod10(number) {
    var sum = 0;
    for (var i = 0; i < number.length; i++) {
      var n = parseInt(number[i]);
      if ((i + number.length) % 2 === 0) {
        sum += n;
      } else {
        sum += n * 2 % 10 + Math.floor(n * 2 / 10);
      }
    }
    return (10 - sum % 10) % 10;
  }
  function mod11(number) {
    var sum = 0;
    var weights = [2, 3, 4, 5, 6, 7];
    for (var i = 0; i < number.length; i++) {
      var n = parseInt(number[number.length - 1 - i]);
      sum += weights[i % weights.length] * n;
    }
    return (11 - sum % 11) % 11;
  }
},1056,[]);
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
  var _MSIJs = require(_dependencyMap[0]);
  var MSI = _interopDefault(_MSIJs);
  var _checksumsJs = require(_dependencyMap[1]);
  class MSI11 extends MSI.default {
    constructor(data, options) {
      super(data + (0, _checksumsJs.mod11)(data), options);
    }
  }
  var _default = MSI11;
},1057,[1054,1056]);
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
  var _MSIJs = require(_dependencyMap[0]);
  var MSI = _interopDefault(_MSIJs);
  var _checksumsJs = require(_dependencyMap[1]);
  class MSI1010 extends MSI.default {
    constructor(data, options) {
      data += (0, _checksumsJs.mod10)(data);
      data += (0, _checksumsJs.mod10)(data);
      super(data, options);
    }
  }
  var _default = MSI1010;
},1058,[1054,1056]);
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
  var _MSIJs = require(_dependencyMap[0]);
  var MSI = _interopDefault(_MSIJs);
  var _checksumsJs = require(_dependencyMap[1]);
  class MSI1110 extends MSI.default {
    constructor(data, options) {
      data += (0, _checksumsJs.mod11)(data);
      data += (0, _checksumsJs.mod10)(data);
      super(data, options);
    }
  }
  var _default = MSI1110;
},1059,[1054,1056]);
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
  Object.defineProperty(exports, "pharmacode", {
    enumerable: true,
    get: function () {
      return pharmacode;
    }
  });
  var _BarcodeJs = require(_dependencyMap[0]);
  var Barcode = _interopDefault(_BarcodeJs);
  // Encoding documentation
  // http://www.gomaro.ch/ftproot/Laetus_PHARMA-CODE.pdf

  class pharmacode extends Barcode.default {
    constructor(data, options) {
      super(data, options);
      this.number = parseInt(data, 10);
    }
    encode() {
      var z = this.number;
      var result = "";

      // http://i.imgur.com/RMm4UDJ.png
      // (source: http://www.gomaro.ch/ftproot/Laetus_PHARMA-CODE.pdf, page: 34)
      while (!isNaN(z) && z != 0) {
        if (z % 2 === 0) {
          // Even
          result = "11100" + result;
          z = (z - 2) / 2;
        } else {
          // Odd
          result = "100" + result;
          z = (z - 1) / 2;
        }
      }

      // Remove the two last zeroes
      result = result.slice(0, -2);
      return {
        data: result,
        text: this.text
      };
    }
    valid() {
      return this.number >= 3 && this.number <= 131070;
    }
  }
},1060,[1030]);
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
  Object.defineProperty(exports, "codabar", {
    enumerable: true,
    get: function () {
      return codabar;
    }
  });
  var _BarcodeJs = require(_dependencyMap[0]);
  var Barcode = _interopDefault(_BarcodeJs);
  // Encoding specification:
  // http://www.barcodeisland.com/codabar.phtml

  class codabar extends Barcode.default {
    constructor(data, options) {
      if (data.search(/^[0-9\-\$\:\.\+\/]+$/) === 0) {
        data = "A" + data + "A";
      }
      super(data.toUpperCase(), options);
      this.text = this.options.text || this.text.replace(/[A-D]/g, '');
    }
    valid() {
      return this.data.search(/^[A-D][0-9\-\$\:\.\+\/]+[A-D]$/) !== -1;
    }
    encode() {
      var result = [];
      var encodings = this.getEncodings();
      for (var i = 0; i < this.data.length; i++) {
        result.push(encodings[this.data.charAt(i)]);
        // for all characters except the last, append a narrow-space ("0")
        if (i !== this.data.length - 1) {
          result.push("0");
        }
      }
      return {
        text: this.text,
        data: result.join('')
      };
    }
    getEncodings() {
      return {
        "0": "101010011",
        "1": "101011001",
        "2": "101001011",
        "3": "110010101",
        "4": "101101001",
        "5": "110101001",
        "6": "100101011",
        "7": "100101101",
        "8": "100110101",
        "9": "110100101",
        "-": "101001101",
        "$": "101100101",
        ":": "1101011011",
        "/": "1101101011",
        ".": "1101101101",
        "+": "1011011011",
        "A": "1011001001",
        "B": "1001001011",
        "C": "1010010011",
        "D": "1010011001"
      };
    }
  }
},1061,[1030]);
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
  Object.defineProperty(exports, "CODE93", {
    enumerable: true,
    get: function () {
      return CODE93.default;
    }
  });
  Object.defineProperty(exports, "CODE93FullASCII", {
    enumerable: true,
    get: function () {
      return CODE93FullASCII.default;
    }
  });
  var _CODE93Js = require(_dependencyMap[0]);
  var CODE93 = _interopDefault(_CODE93Js);
  var _CODE93FullASCIIJs = require(_dependencyMap[1]);
  var CODE93FullASCII = _interopDefault(_CODE93FullASCIIJs);
},1062,[1063,1065]);
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
  var _constants = require(_dependencyMap[0]);
  var _BarcodeJs = require(_dependencyMap[1]);
  var Barcode = _interopDefault(_BarcodeJs);
  // Encoding documentation:
  // https://en.wikipedia.org/wiki/Code_93#Detailed_outline

  class CODE93 extends Barcode.default {
    constructor(data, options) {
      super(data, options);
    }
    valid() {
      return /^[0-9A-Z\-. $/+%]+$/.test(this.data);
    }
    encode() {
      const symbols = this.data.split('').flatMap(c => _constants.MULTI_SYMBOLS[c] || c);
      const encoded = symbols.map(s => CODE93.getEncoding(s)).join('');

      // Compute checksum symbols
      const csumC = CODE93.checksum(symbols, 20);
      const csumK = CODE93.checksum(symbols.concat(csumC), 15);
      return {
        text: this.text,
        data:
        // Add the start bits
        CODE93.getEncoding('\xff') +
        // Add the encoded bits
        encoded +
        // Add the checksum
        CODE93.getEncoding(csumC) + CODE93.getEncoding(csumK) +
        // Add the stop bits
        CODE93.getEncoding('\xff') +
        // Add the termination bit
        '1'
      };
    }

    // Get the binary encoding of a symbol
    static getEncoding(symbol) {
      return _constants.BINARIES[CODE93.symbolValue(symbol)];
    }

    // Get the symbol for a symbol value
    static getSymbol(symbolValue) {
      return _constants.SYMBOLS[symbolValue];
    }

    // Get the symbol value of a symbol
    static symbolValue(symbol) {
      return _constants.SYMBOLS.indexOf(symbol);
    }

    // Calculate a checksum symbol
    static checksum(symbols, maxWeight) {
      const csum = symbols.slice().reverse().reduce((sum, symbol, idx) => {
        const weight = idx % maxWeight + 1;
        return sum + CODE93.symbolValue(symbol) * weight;
      }, 0);
      return CODE93.getSymbol(csum % 47);
    }
  }
  var _default = CODE93;
},1063,[1064,1030]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  Object.defineProperty(exports, "SYMBOLS", {
    enumerable: true,
    get: function () {
      return SYMBOLS;
    }
  });
  Object.defineProperty(exports, "BINARIES", {
    enumerable: true,
    get: function () {
      return BINARIES;
    }
  });
  Object.defineProperty(exports, "MULTI_SYMBOLS", {
    enumerable: true,
    get: function () {
      return MULTI_SYMBOLS;
    }
  });
  // The position in the array is the (checksum) value
  const SYMBOLS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '-', '.', ' ', '$', '/', '+', '%',
  // Only used for csum and multi-symbols character encodings
  '($)', '(%)', '(/)', '(+)',
  // Start/Stop
  '\xff'];

  // Order matches SYMBOLS array
  const BINARIES = ['100010100', '101001000', '101000100', '101000010', '100101000', '100100100', '100100010', '101010000', '100010010', '100001010', '110101000', '110100100', '110100010', '110010100', '110010010', '110001010', '101101000', '101100100', '101100010', '100110100', '100011010', '101011000', '101001100', '101000110', '100101100', '100010110', '110110100', '110110010', '110101100', '110100110', '110010110', '110011010', '101101100', '101100110', '100110110', '100111010', '100101110', '111010100', '111010010', '111001010', '101101110', '101110110', '110101110', '100100110', '111011010', '111010110', '100110010', '101011110'];

  // Multi-symbol characters (Full ASCII Code 93)
  const MULTI_SYMBOLS = {
    '\x00': ['(%)', 'U'],
    '\x01': ['($)', 'A'],
    '\x02': ['($)', 'B'],
    '\x03': ['($)', 'C'],
    '\x04': ['($)', 'D'],
    '\x05': ['($)', 'E'],
    '\x06': ['($)', 'F'],
    '\x07': ['($)', 'G'],
    '\x08': ['($)', 'H'],
    '\x09': ['($)', 'I'],
    '\x0a': ['($)', 'J'],
    '\x0b': ['($)', 'K'],
    '\x0c': ['($)', 'L'],
    '\x0d': ['($)', 'M'],
    '\x0e': ['($)', 'N'],
    '\x0f': ['($)', 'O'],
    '\x10': ['($)', 'P'],
    '\x11': ['($)', 'Q'],
    '\x12': ['($)', 'R'],
    '\x13': ['($)', 'S'],
    '\x14': ['($)', 'T'],
    '\x15': ['($)', 'U'],
    '\x16': ['($)', 'V'],
    '\x17': ['($)', 'W'],
    '\x18': ['($)', 'X'],
    '\x19': ['($)', 'Y'],
    '\x1a': ['($)', 'Z'],
    '\x1b': ['(%)', 'A'],
    '\x1c': ['(%)', 'B'],
    '\x1d': ['(%)', 'C'],
    '\x1e': ['(%)', 'D'],
    '\x1f': ['(%)', 'E'],
    '!': ['(/)', 'A'],
    '"': ['(/)', 'B'],
    '#': ['(/)', 'C'],
    '&': ['(/)', 'F'],
    '\'': ['(/)', 'G'],
    '(': ['(/)', 'H'],
    ')': ['(/)', 'I'],
    '*': ['(/)', 'J'],
    ',': ['(/)', 'L'],
    ':': ['(/)', 'Z'],
    ';': ['(%)', 'F'],
    '<': ['(%)', 'G'],
    '=': ['(%)', 'H'],
    '>': ['(%)', 'I'],
    '?': ['(%)', 'J'],
    '@': ['(%)', 'V'],
    '[': ['(%)', 'K'],
    '\\': ['(%)', 'L'],
    ']': ['(%)', 'M'],
    '^': ['(%)', 'N'],
    '_': ['(%)', 'O'],
    '`': ['(%)', 'W'],
    'a': ['(+)', 'A'],
    'b': ['(+)', 'B'],
    'c': ['(+)', 'C'],
    'd': ['(+)', 'D'],
    'e': ['(+)', 'E'],
    'f': ['(+)', 'F'],
    'g': ['(+)', 'G'],
    'h': ['(+)', 'H'],
    'i': ['(+)', 'I'],
    'j': ['(+)', 'J'],
    'k': ['(+)', 'K'],
    'l': ['(+)', 'L'],
    'm': ['(+)', 'M'],
    'n': ['(+)', 'N'],
    'o': ['(+)', 'O'],
    'p': ['(+)', 'P'],
    'q': ['(+)', 'Q'],
    'r': ['(+)', 'R'],
    's': ['(+)', 'S'],
    't': ['(+)', 'T'],
    'u': ['(+)', 'U'],
    'v': ['(+)', 'V'],
    'w': ['(+)', 'W'],
    'x': ['(+)', 'X'],
    'y': ['(+)', 'Y'],
    'z': ['(+)', 'Z'],
    '{': ['(%)', 'P'],
    '|': ['(%)', 'Q'],
    '}': ['(%)', 'R'],
    '~': ['(%)', 'S'],
    '\x7f': ['(%)', 'T']
  };
},1064,[]);
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
  var _CODE93Js = require(_dependencyMap[0]);
  var CODE93 = _interopDefault(_CODE93Js);
  // Encoding documentation
  // https://en.wikipedia.org/wiki/Code_93#Full_ASCII_Code_93

  class CODE93FullASCII extends CODE93.default {
    constructor(data, options) {
      super(data, options);
    }
    valid() {
      return /^[\x00-\x7f]+$/.test(this.data);
    }
  }
  var _default = CODE93FullASCII;
},1065,[1063]);
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
  Object.defineProperty(exports, "GenericBarcode", {
    enumerable: true,
    get: function () {
      return GenericBarcode;
    }
  });
  var _BarcodeJs = require(_dependencyMap[0]);
  var Barcode = _interopDefault(_BarcodeJs);
  class GenericBarcode extends Barcode.default {
    constructor(data, options) {
      super(data, options); // Sets this.data and this.text
    }

    // Return the corresponding binary numbers for the data provided
    encode() {
      return {
        data: "10101010101010101010101010101010101010101",
        text: this.text
      };
    }

    // Resturn true/false if the string provided is valid for this encoder
    valid() {
      return true;
    }
  }
},1066,[1030]);
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
  Object.defineProperty(exports, "BlurView", {
    enumerable: true,
    get: function () {
      return _BlurView2.default;
    }
  });
  Object.defineProperty(exports, "BlurTargetView", {
    enumerable: true,
    get: function () {
      return _BlurTargetView2.default;
    }
  });
  var _BlurView = require(_dependencyMap[0]);
  var _BlurView2 = _interopDefault(_BlurView);
  var _BlurTargetView = require(_dependencyMap[1]);
  var _BlurTargetView2 = _interopDefault(_BlurTargetView);
},1067,[1068,1070]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  // Copyright © 2024 650 Industries.
  'use client';
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
  var _react = require(_dependencyMap[1]);
  var _reactNativeWebDistExportsView = require(_dependencyMap[2]);
  var View = _interopDefault(_reactNativeWebDistExportsView);
  var _getBackgroundColor = require(_dependencyMap[3]);
  var getBackgroundColor = _interopDefault(_getBackgroundColor);
  const BlurView = /*#__PURE__*/(0, _react.forwardRef)(({
    tint = 'default',
    intensity = 50,
    style,
    ...props
  }, ref) => {
    const blurViewRef = (0, _react.useRef)(null);
    const blurStyle = getBlurStyle({
      tint,
      intensity
    });
    (0, _react.useImperativeHandle)(ref, () => ({
      setNativeProps: nativeProps => {
        if (!blurViewRef.current?.style) {
          return;
        }
        // @ts-expect-error: `style.intensity` is not defined in the types
        const nextIntensity = nativeProps.style?.intensity ?? intensity;
        const blurStyle = getBlurStyle({
          intensity: nextIntensity,
          tint: tint ?? 'default'
        });
        if (nativeProps.style) {
          for (const key in nativeProps.style) {
            if (key !== 'intensity') {
              // @ts-expect-error: nativeProps.style[key] may not always be a string
              blurViewRef.current.style[key] = nativeProps.style[key];
            }
          }
        }
        if (blurStyle.backgroundColor) {
          blurViewRef.current.style.backgroundColor = blurStyle.backgroundColor;
        }
        if (blurStyle.backdropFilter) {
          blurViewRef.current.style.backdropFilter = blurStyle.backdropFilter;
        }
        // @ts-expect-error: Webkit-specific legacy property (let's not type this, since it's deprecated)
        blurViewRef.current.style['webkitBackdropFilter'] = blurStyle.WebkitBackdropFilter;
      }
    }), [intensity, tint]);
    return /*#__PURE__*/(0, _reactJsxRuntime.jsx)(View.default, {
      ...props,
      style: [style, blurStyle],
      /** @ts-expect-error: mismatch in ref type to support manually setting style props. */ref: blurViewRef
    });
  });
  function getBlurStyle({
    intensity,
    tint
  }) {
    const blur = `saturate(180%) blur(${Math.min(intensity, 100) * 0.2}px)`;
    return {
      backgroundColor: (0, getBackgroundColor.default)(Math.min(intensity, 100), tint),
      backdropFilter: blur,
      WebkitBackdropFilter: blur
    };
  }
  var _default = BlurView;
},1068,[97,6,198,1069]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return getBackgroundColor;
    }
  });
  function getBackgroundColor(intensity, tint) {
    const opacity = intensity / 100;
    switch (tint) {
      // From Apple iOS 14 Sketch Kit - https://developer.apple.com/design/resources/
      case 'dark':
      case 'systemMaterialDark':
        return `rgba(25,25,25,${opacity * 0.78})`;
      case 'light':
      case 'extraLight':
      case 'systemMaterialLight':
      case 'systemUltraThinMaterialLight':
      case 'systemThickMaterialLight':
        return `rgba(249,249,249,${opacity * 0.78})`;
      case 'default':
      case 'prominent':
      case 'systemMaterial':
        return `rgba(255,255,255,${opacity * 0.3})`;
      case 'regular':
        return `rgba(179,179,179,${opacity * 0.82})`;
      case 'systemThinMaterial':
        return `rgba(199,199,199,${opacity * 0.97})`;
      case 'systemChromeMaterial':
        return `rgba(255,255,255,${opacity * 0.75})`;
      case 'systemChromeMaterialLight':
        return `rgba(255,255,255,${opacity * 0.97})`;
      case 'systemUltraThinMaterial':
        return `rgba(191,191,191,${opacity * 0.44})`;
      case 'systemThickMaterial':
        return `rgba(191,191,191,${opacity * 0.44})`;
      case 'systemThickMaterialDark':
        return `rgba(37,37,37,${opacity * 0.9})`;
      case 'systemThinMaterialDark':
        return `rgba(37,37,37,${opacity * 0.7})`;
      case 'systemUltraThinMaterialDark':
        return `rgba(37,37,37,${opacity * 0.55})`;
      case 'systemChromeMaterialDark':
        return `rgba(0,0,0,${opacity * 0.75})`;
      case 'systemThinMaterialLight':
        return `rgba(199,199,199,${opacity * 0.78})`;
    }
  }
},1069,[]);
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
      return BlurTargetView;
    }
  });
  var _reactJsxRuntime = require(_dependencyMap[0]);
  var _reactNativeWebDistExportsView = require(_dependencyMap[1]);
  var View = _interopDefault(_reactNativeWebDistExportsView);
  function BlurTargetView(props) {
    return /*#__PURE__*/(0, _reactJsxRuntime.jsx)(View.default, {
      ...props
    });
  }
},1070,[97,198]);
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
      return _srcIndexJs2.default;
    }
  });
  var _srcIndexJs = require(_dependencyMap[0]);
  var _srcIndexJs2 = _interopDefault(_srcIndexJs);
},1071,[1072]);
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
  var _react = require(_dependencyMap[0]);
  var _reactNativeSvg = require(_dependencyMap[1]);
  var Svg = _interopDefault(_reactNativeSvg);
  var _genMatrix = require(_dependencyMap[2]);
  var genMatrix = _interopDefault(_genMatrix);
  var _transformMatrixIntoPath = require(_dependencyMap[3]);
  var transformMatrixIntoPath = _interopDefault(_transformMatrixIntoPath);
  var _LogoSVG = require(_dependencyMap[4]);
  var LogoSVG = _interopDefault(_LogoSVG);
  var _reactJsxRuntime = require(_dependencyMap[5]);
  const renderLogo = ({
    size,
    backgroundColor,
    logo,
    logoSVG,
    logoSize,
    logoBackgroundColor,
    logoColor,
    logoMargin,
    logoBorderRadius,
    clipPathId
  }) => {
    const logoPosition = (size - logoSize - logoMargin * 2) / 2;
    const logoBackgroundSize = logoSize + logoMargin * 2;
    const logoBackgroundBorderRadius = logoBorderRadius + logoMargin / logoSize * logoBorderRadius;
    const clipLogoBackgroundId = `clip-logo-background-${clipPathId}`;
    const clipLogoId = `clip-logo-${clipPathId}`;
    return /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_reactNativeSvg.G, {
      x: logoPosition,
      y: logoPosition,
      children: [/*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_reactNativeSvg.Defs, {
        children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNativeSvg.ClipPath, {
          id: clipLogoBackgroundId,
          children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNativeSvg.Rect, {
            width: logoBackgroundSize,
            height: logoBackgroundSize,
            rx: logoBackgroundBorderRadius,
            ry: logoBackgroundBorderRadius
          })
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNativeSvg.ClipPath, {
          id: clipLogoId,
          children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNativeSvg.Rect, {
            width: logoSize,
            height: logoSize,
            rx: logoBorderRadius,
            ry: logoBorderRadius
          })
        })]
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNativeSvg.G, {
        children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNativeSvg.Rect, {
          width: logoBackgroundSize,
          height: logoBackgroundSize,
          fill: backgroundColor,
          clipPath: `url(#${clipLogoBackgroundId})`
        })
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_reactNativeSvg.G, {
        x: logoMargin,
        y: logoMargin,
        clipPath: `url(#${clipLogoId})`,
        children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNativeSvg.Rect, {
          width: logoBackgroundSize - logoMargin,
          height: logoBackgroundSize - logoMargin,
          fill: logoBackgroundColor
        }), logoSVG ? /*#__PURE__*/(0, _reactJsxRuntime.jsx)(LogoSVG.default, {
          svg: logoSVG,
          logoSize: logoSize,
          logoColor: logoColor
        }) : /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNativeSvg.Image, {
          width: logoSize,
          height: logoSize,
          preserveAspectRatio: "xMidYMid slice",
          href: logo,
          clipPath: `url(#${clipLogoId})`
        })]
      })]
    });
  };
  const QRCode = ({
    value = 'this is a QR code',
    size = 100,
    color = 'black',
    backgroundColor = 'white',
    logo,
    logoSVG,
    logoSize = size * 0.2,
    logoBackgroundColor = 'transparent',
    logoColor,
    logoMargin = 2,
    logoBorderRadius = 0,
    quietZone = 0,
    enableLinearGradient = false,
    gradientDirection = ['0%', '0%', '100%', '100%'],
    linearGradient = ['rgb(255,0,0)', 'rgb(0,255,255)'],
    ecl = 'M',
    getRef,
    onError,
    testID
  }) => {
    const clipPathId = (0, _react.useId)();
    const result = (0, _react.useMemo)(() => {
      try {
        return (0, transformMatrixIntoPath.default)((0, genMatrix.default)(value, ecl), size);
      } catch (error) {
        if (onError && typeof onError === 'function') {
          onError(error);
        } else {
          // Pass the error when no handler presented
          throw error;
        }
      }
    }, [value, size, ecl]);
    if (!result) {
      return null;
    }
    const {
      path,
      cellSize
    } = result;
    const displayLogo = logo || logoSVG;
    return /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(Svg.default, {
      testID: testID,
      ref: getRef,
      viewBox: [-quietZone, -quietZone, size + quietZone * 2, size + quietZone * 2].join(' '),
      width: size,
      height: size,
      children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNativeSvg.Defs, {
        children: /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_reactNativeSvg.LinearGradient, {
          id: "grad",
          x1: gradientDirection[0],
          y1: gradientDirection[1],
          x2: gradientDirection[2],
          y2: gradientDirection[3],
          children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNativeSvg.Stop, {
            offset: "0",
            stopColor: linearGradient[0],
            stopOpacity: "1"
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNativeSvg.Stop, {
            offset: "1",
            stopColor: linearGradient[1],
            stopOpacity: "1"
          })]
        })
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNativeSvg.G, {
        children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNativeSvg.Rect, {
          x: -quietZone,
          y: -quietZone,
          width: size + quietZone * 2,
          height: size + quietZone * 2,
          fill: backgroundColor
        })
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNativeSvg.G, {
        children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNativeSvg.Path, {
          d: path,
          strokeLinecap: "butt",
          stroke: enableLinearGradient ? 'url(#grad)' : color,
          strokeWidth: cellSize
        })
      }), displayLogo && renderLogo({
        size,
        backgroundColor,
        logo,
        logoSVG,
        logoSize,
        logoBackgroundColor,
        logoColor,
        logoMargin,
        logoBorderRadius,
        clipPathId
      })]
    });
  };
  var _default = QRCode;
},1072,[6,1112,1073,1102,1103,97]);
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
  var _qrcode = require(_dependencyMap[0]);
  var QRCode = _interopDefault(_qrcode);
  var _default = (value, errorCorrectionLevel) => {
    const arr = Array.prototype.slice.call(QRCode.default.create(value, {
      errorCorrectionLevel
    }).modules.data, 0);
    const sqrt = Math.sqrt(arr.length);
    return arr.reduce((rows, key, index) => (index % sqrt === 0 ? rows.push([key]) : rows[rows.length - 1].push(key)) && rows, []);
  };
},1073,[1074]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  const canPromise = require(_dependencyMap[0]);
  const QRCode = require(_dependencyMap[1]);
  const CanvasRenderer = require(_dependencyMap[2]);
  const SvgRenderer = require(_dependencyMap[3]);
  function renderCanvas(renderFunc, canvas, text, opts, cb) {
    const args = [].slice.call(arguments, 1);
    const argsNum = args.length;
    const isLastArgCb = typeof args[argsNum - 1] === 'function';
    if (!isLastArgCb && !canPromise()) {
      throw new Error('Callback required as last argument');
    }
    if (isLastArgCb) {
      if (argsNum < 2) {
        throw new Error('Too few arguments provided');
      }
      if (argsNum === 2) {
        cb = text;
        text = canvas;
        canvas = opts = undefined;
      } else if (argsNum === 3) {
        if (canvas.getContext && typeof cb === 'undefined') {
          cb = opts;
          opts = undefined;
        } else {
          cb = opts;
          opts = text;
          text = canvas;
          canvas = undefined;
        }
      }
    } else {
      if (argsNum < 1) {
        throw new Error('Too few arguments provided');
      }
      if (argsNum === 1) {
        text = canvas;
        canvas = opts = undefined;
      } else if (argsNum === 2 && !canvas.getContext) {
        opts = text;
        text = canvas;
        canvas = undefined;
      }
      return new Promise(function (resolve, reject) {
        try {
          const data = QRCode.create(text, opts);
          resolve(renderFunc(data, canvas, opts));
        } catch (e) {
          reject(e);
        }
      });
    }
    try {
      const data = QRCode.create(text, opts);
      cb(null, renderFunc(data, canvas, opts));
    } catch (e) {
      cb(e);
    }
  }
  exports.create = QRCode.create;
  exports.toCanvas = renderCanvas.bind(null, CanvasRenderer.render);
  exports.toDataURL = renderCanvas.bind(null, CanvasRenderer.renderToDataURL);

  // only svg for now.
  exports.toString = renderCanvas.bind(null, function (data, _, opts) {
    return SvgRenderer.render(data, opts);
  });
},1074,[1075,1076,1099,1101]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  // can-promise has a crash in some versions of react native that dont have
  // standard global objects
  // https://github.com/soldair/node-qrcode/issues/157

  module.exports = function () {
    return typeof Promise === 'function' && Promise.prototype && Promise.prototype.then;
  };
},1075,[]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  const Utils = require(_dependencyMap[0]);
  const ECLevel = require(_dependencyMap[1]);
  const BitBuffer = require(_dependencyMap[2]);
  const BitMatrix = require(_dependencyMap[3]);
  const AlignmentPattern = require(_dependencyMap[4]);
  const FinderPattern = require(_dependencyMap[5]);
  const MaskPattern = require(_dependencyMap[6]);
  const ECCode = require(_dependencyMap[7]);
  const ReedSolomonEncoder = require(_dependencyMap[8]);
  const Version = require(_dependencyMap[9]);
  const FormatInfo = require(_dependencyMap[10]);
  const Mode = require(_dependencyMap[11]);
  const Segments = require(_dependencyMap[12]);

  /**
   * QRCode for JavaScript
   *
   * modified by Ryan Day for nodejs support
   * Copyright (c) 2011 Ryan Day
   *
   * Licensed under the MIT license:
   *   http://www.opensource.org/licenses/mit-license.php
   *
  //---------------------------------------------------------------------
  // QRCode for JavaScript
  //
  // Copyright (c) 2009 Kazuhiko Arase
  //
  // URL: http://www.d-project.com/
  //
  // Licensed under the MIT license:
  //   http://www.opensource.org/licenses/mit-license.php
  //
  // The word "QR Code" is registered trademark of
  // DENSO WAVE INCORPORATED
  //   http://www.denso-wave.com/qrcode/faqpatent-e.html
  //
  //---------------------------------------------------------------------
  */

  /**
   * Add finder patterns bits to matrix
   *
   * @param  {BitMatrix} matrix  Modules matrix
   * @param  {Number}    version QR Code version
   */
  function setupFinderPattern(matrix, version) {
    const size = matrix.size;
    const pos = FinderPattern.getPositions(version);
    for (let i = 0; i < pos.length; i++) {
      const row = pos[i][0];
      const col = pos[i][1];
      for (let r = -1; r <= 7; r++) {
        if (row + r <= -1 || size <= row + r) continue;
        for (let c = -1; c <= 7; c++) {
          if (col + c <= -1 || size <= col + c) continue;
          if (r >= 0 && r <= 6 && (c === 0 || c === 6) || c >= 0 && c <= 6 && (r === 0 || r === 6) || r >= 2 && r <= 4 && c >= 2 && c <= 4) {
            matrix.set(row + r, col + c, true, true);
          } else {
            matrix.set(row + r, col + c, false, true);
          }
        }
      }
    }
  }

  /**
   * Add timing pattern bits to matrix
   *
   * Note: this function must be called before {@link setupAlignmentPattern}
   *
   * @param  {BitMatrix} matrix Modules matrix
   */
  function setupTimingPattern(matrix) {
    const size = matrix.size;
    for (let r = 8; r < size - 8; r++) {
      const value = r % 2 === 0;
      matrix.set(r, 6, value, true);
      matrix.set(6, r, value, true);
    }
  }

  /**
   * Add alignment patterns bits to matrix
   *
   * Note: this function must be called after {@link setupTimingPattern}
   *
   * @param  {BitMatrix} matrix  Modules matrix
   * @param  {Number}    version QR Code version
   */
  function setupAlignmentPattern(matrix, version) {
    const pos = AlignmentPattern.getPositions(version);
    for (let i = 0; i < pos.length; i++) {
      const row = pos[i][0];
      const col = pos[i][1];
      for (let r = -2; r <= 2; r++) {
        for (let c = -2; c <= 2; c++) {
          if (r === -2 || r === 2 || c === -2 || c === 2 || r === 0 && c === 0) {
            matrix.set(row + r, col + c, true, true);
          } else {
            matrix.set(row + r, col + c, false, true);
          }
        }
      }
    }
  }

  /**
   * Add version info bits to matrix
   *
   * @param  {BitMatrix} matrix  Modules matrix
   * @param  {Number}    version QR Code version
   */
  function setupVersionInfo(matrix, version) {
    const size = matrix.size;
    const bits = Version.getEncodedBits(version);
    let row, col, mod;
    for (let i = 0; i < 18; i++) {
      row = Math.floor(i / 3);
      col = i % 3 + size - 8 - 3;
      mod = (bits >> i & 1) === 1;
      matrix.set(row, col, mod, true);
      matrix.set(col, row, mod, true);
    }
  }

  /**
   * Add format info bits to matrix
   *
   * @param  {BitMatrix} matrix               Modules matrix
   * @param  {ErrorCorrectionLevel}    errorCorrectionLevel Error correction level
   * @param  {Number}    maskPattern          Mask pattern reference value
   */
  function setupFormatInfo(matrix, errorCorrectionLevel, maskPattern) {
    const size = matrix.size;
    const bits = FormatInfo.getEncodedBits(errorCorrectionLevel, maskPattern);
    let i, mod;
    for (i = 0; i < 15; i++) {
      mod = (bits >> i & 1) === 1;

      // vertical
      if (i < 6) {
        matrix.set(i, 8, mod, true);
      } else if (i < 8) {
        matrix.set(i + 1, 8, mod, true);
      } else {
        matrix.set(size - 15 + i, 8, mod, true);
      }

      // horizontal
      if (i < 8) {
        matrix.set(8, size - i - 1, mod, true);
      } else if (i < 9) {
        matrix.set(8, 15 - i - 1 + 1, mod, true);
      } else {
        matrix.set(8, 15 - i - 1, mod, true);
      }
    }

    // fixed module
    matrix.set(size - 8, 8, 1, true);
  }

  /**
   * Add encoded data bits to matrix
   *
   * @param  {BitMatrix}  matrix Modules matrix
   * @param  {Uint8Array} data   Data codewords
   */
  function setupData(matrix, data) {
    const size = matrix.size;
    let inc = -1;
    let row = size - 1;
    let bitIndex = 7;
    let byteIndex = 0;
    for (let col = size - 1; col > 0; col -= 2) {
      if (col === 6) col--;
      while (true) {
        for (let c = 0; c < 2; c++) {
          if (!matrix.isReserved(row, col - c)) {
            let dark = false;
            if (byteIndex < data.length) {
              dark = (data[byteIndex] >>> bitIndex & 1) === 1;
            }
            matrix.set(row, col - c, dark);
            bitIndex--;
            if (bitIndex === -1) {
              byteIndex++;
              bitIndex = 7;
            }
          }
        }
        row += inc;
        if (row < 0 || size <= row) {
          row -= inc;
          inc = -inc;
          break;
        }
      }
    }
  }

  /**
   * Create encoded codewords from data input
   *
   * @param  {Number}   version              QR Code version
   * @param  {ErrorCorrectionLevel}   errorCorrectionLevel Error correction level
   * @param  {ByteData} data                 Data input
   * @return {Uint8Array}                    Buffer containing encoded codewords
   */
  function createData(version, errorCorrectionLevel, segments) {
    // Prepare data buffer
    const buffer = new BitBuffer();
    segments.forEach(function (data) {
      // prefix data with mode indicator (4 bits)
      buffer.put(data.mode.bit, 4);

      // Prefix data with character count indicator.
      // The character count indicator is a string of bits that represents the
      // number of characters that are being encoded.
      // The character count indicator must be placed after the mode indicator
      // and must be a certain number of bits long, depending on the QR version
      // and data mode
      // @see {@link Mode.getCharCountIndicator}.
      buffer.put(data.getLength(), Mode.getCharCountIndicator(data.mode, version));

      // add binary data sequence to buffer
      data.write(buffer);
    });

    // Calculate required number of bits
    const totalCodewords = Utils.getSymbolTotalCodewords(version);
    const ecTotalCodewords = ECCode.getTotalCodewordsCount(version, errorCorrectionLevel);
    const dataTotalCodewordsBits = (totalCodewords - ecTotalCodewords) * 8;

    // Add a terminator.
    // If the bit string is shorter than the total number of required bits,
    // a terminator of up to four 0s must be added to the right side of the string.
    // If the bit string is more than four bits shorter than the required number of bits,
    // add four 0s to the end.
    if (buffer.getLengthInBits() + 4 <= dataTotalCodewordsBits) {
      buffer.put(0, 4);
    }

    // If the bit string is fewer than four bits shorter, add only the number of 0s that
    // are needed to reach the required number of bits.

    // After adding the terminator, if the number of bits in the string is not a multiple of 8,
    // pad the string on the right with 0s to make the string's length a multiple of 8.
    while (buffer.getLengthInBits() % 8 !== 0) {
      buffer.putBit(0);
    }

    // Add pad bytes if the string is still shorter than the total number of required bits.
    // Extend the buffer to fill the data capacity of the symbol corresponding to
    // the Version and Error Correction Level by adding the Pad Codewords 11101100 (0xEC)
    // and 00010001 (0x11) alternately.
    const remainingByte = (dataTotalCodewordsBits - buffer.getLengthInBits()) / 8;
    for (let i = 0; i < remainingByte; i++) {
      buffer.put(i % 2 ? 0x11 : 0xEC, 8);
    }
    return createCodewords(buffer, version, errorCorrectionLevel);
  }

  /**
   * Encode input data with Reed-Solomon and return codewords with
   * relative error correction bits
   *
   * @param  {BitBuffer} bitBuffer            Data to encode
   * @param  {Number}    version              QR Code version
   * @param  {ErrorCorrectionLevel} errorCorrectionLevel Error correction level
   * @return {Uint8Array}                     Buffer containing encoded codewords
   */
  function createCodewords(bitBuffer, version, errorCorrectionLevel) {
    // Total codewords for this QR code version (Data + Error correction)
    const totalCodewords = Utils.getSymbolTotalCodewords(version);

    // Total number of error correction codewords
    const ecTotalCodewords = ECCode.getTotalCodewordsCount(version, errorCorrectionLevel);

    // Total number of data codewords
    const dataTotalCodewords = totalCodewords - ecTotalCodewords;

    // Total number of blocks
    const ecTotalBlocks = ECCode.getBlocksCount(version, errorCorrectionLevel);

    // Calculate how many blocks each group should contain
    const blocksInGroup2 = totalCodewords % ecTotalBlocks;
    const blocksInGroup1 = ecTotalBlocks - blocksInGroup2;
    const totalCodewordsInGroup1 = Math.floor(totalCodewords / ecTotalBlocks);
    const dataCodewordsInGroup1 = Math.floor(dataTotalCodewords / ecTotalBlocks);
    const dataCodewordsInGroup2 = dataCodewordsInGroup1 + 1;

    // Number of EC codewords is the same for both groups
    const ecCount = totalCodewordsInGroup1 - dataCodewordsInGroup1;

    // Initialize a Reed-Solomon encoder with a generator polynomial of degree ecCount
    const rs = new ReedSolomonEncoder(ecCount);
    let offset = 0;
    const dcData = new Array(ecTotalBlocks);
    const ecData = new Array(ecTotalBlocks);
    let maxDataSize = 0;
    const buffer = new Uint8Array(bitBuffer.buffer);

    // Divide the buffer into the required number of blocks
    for (let b = 0; b < ecTotalBlocks; b++) {
      const dataSize = b < blocksInGroup1 ? dataCodewordsInGroup1 : dataCodewordsInGroup2;

      // extract a block of data from buffer
      dcData[b] = buffer.slice(offset, offset + dataSize);

      // Calculate EC codewords for this data block
      ecData[b] = rs.encode(dcData[b]);
      offset += dataSize;
      maxDataSize = Math.max(maxDataSize, dataSize);
    }

    // Create final data
    // Interleave the data and error correction codewords from each block
    const data = new Uint8Array(totalCodewords);
    let index = 0;
    let i, r;

    // Add data codewords
    for (i = 0; i < maxDataSize; i++) {
      for (r = 0; r < ecTotalBlocks; r++) {
        if (i < dcData[r].length) {
          data[index++] = dcData[r][i];
        }
      }
    }

    // Apped EC codewords
    for (i = 0; i < ecCount; i++) {
      for (r = 0; r < ecTotalBlocks; r++) {
        data[index++] = ecData[r][i];
      }
    }
    return data;
  }

  /**
   * Build QR Code symbol
   *
   * @param  {String} data                 Input string
   * @param  {Number} version              QR Code version
   * @param  {ErrorCorretionLevel} errorCorrectionLevel Error level
   * @param  {MaskPattern} maskPattern     Mask pattern
   * @return {Object}                      Object containing symbol data
   */
  function createSymbol(data, version, errorCorrectionLevel, maskPattern) {
    let segments;
    if (Array.isArray(data)) {
      segments = Segments.fromArray(data);
    } else if (typeof data === 'string') {
      let estimatedVersion = version;
      if (!estimatedVersion) {
        const rawSegments = Segments.rawSplit(data);

        // Estimate best version that can contain raw splitted segments
        estimatedVersion = Version.getBestVersionForData(rawSegments, errorCorrectionLevel);
      }

      // Build optimized segments
      // If estimated version is undefined, try with the highest version
      segments = Segments.fromString(data, estimatedVersion || 40);
    } else {
      throw new Error('Invalid data');
    }

    // Get the min version that can contain data
    const bestVersion = Version.getBestVersionForData(segments, errorCorrectionLevel);

    // If no version is found, data cannot be stored
    if (!bestVersion) {
      throw new Error('The amount of data is too big to be stored in a QR Code');
    }

    // If not specified, use min version as default
    if (!version) {
      version = bestVersion;

      // Check if the specified version can contain the data
    } else if (version < bestVersion) {
      throw new Error("\nThe chosen QR Code version cannot contain this amount of data.\nMinimum version required to store current data is: " + bestVersion + '.\n');
    }
    const dataBits = createData(version, errorCorrectionLevel, segments);

    // Allocate matrix buffer
    const moduleCount = Utils.getSymbolSize(version);
    const modules = new BitMatrix(moduleCount);

    // Add function modules
    setupFinderPattern(modules, version);
    setupTimingPattern(modules);
    setupAlignmentPattern(modules, version);

    // Add temporary dummy bits for format info just to set them as reserved.
    // This is needed to prevent these bits from being masked by {@link MaskPattern.applyMask}
    // since the masking operation must be performed only on the encoding region.
    // These blocks will be replaced with correct values later in code.
    setupFormatInfo(modules, errorCorrectionLevel, 0);
    if (version >= 7) {
      setupVersionInfo(modules, version);
    }

    // Add data codewords
    setupData(modules, dataBits);
    if (isNaN(maskPattern)) {
      // Find best mask pattern
      maskPattern = MaskPattern.getBestMask(modules, setupFormatInfo.bind(null, modules, errorCorrectionLevel));
    }

    // Apply mask pattern
    MaskPattern.applyMask(maskPattern, modules);

    // Replace format info bits with correct values
    setupFormatInfo(modules, errorCorrectionLevel, maskPattern);
    return {
      modules: modules,
      version: version,
      errorCorrectionLevel: errorCorrectionLevel,
      maskPattern: maskPattern,
      segments: segments
    };
  }

  /**
   * QR Code
   *
   * @param {String | Array} data                 Input data
   * @param {Object} options                      Optional configurations
   * @param {Number} options.version              QR Code version
   * @param {String} options.errorCorrectionLevel Error correction level
   * @param {Function} options.toSJISFunc         Helper func to convert utf8 to sjis
   */
  exports.create = function create(data, options) {
    if (typeof data === 'undefined' || data === '') {
      throw new Error('No input text');
    }
    let errorCorrectionLevel = ECLevel.M;
    let version;
    let mask;
    if (typeof options !== 'undefined') {
      // Use higher error correction level as default
      errorCorrectionLevel = ECLevel.from(options.errorCorrectionLevel, ECLevel.M);
      version = Version.from(options.version);
      mask = MaskPattern.from(options.maskPattern);
      if (options.toSJISFunc) {
        Utils.setToSJISFunction(options.toSJISFunc);
      }
    }
    return createSymbol(data, version, errorCorrectionLevel, mask);
  };
},1076,[1077,1078,1079,1080,1081,1082,1083,1084,1085,1088,1092,1089,1093]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  let toSJISFunction;
  const CODEWORDS_COUNT = [0,
  // Not used
  26, 44, 70, 100, 134, 172, 196, 242, 292, 346, 404, 466, 532, 581, 655, 733, 815, 901, 991, 1085, 1156, 1258, 1364, 1474, 1588, 1706, 1828, 1921, 2051, 2185, 2323, 2465, 2611, 2761, 2876, 3034, 3196, 3362, 3532, 3706];

  /**
   * Returns the QR Code size for the specified version
   *
   * @param  {Number} version QR Code version
   * @return {Number}         size of QR code
   */
  exports.getSymbolSize = function getSymbolSize(version) {
    if (!version) throw new Error('"version" cannot be null or undefined');
    if (version < 1 || version > 40) throw new Error('"version" should be in range from 1 to 40');
    return version * 4 + 17;
  };

  /**
   * Returns the total number of codewords used to store data and EC information.
   *
   * @param  {Number} version QR Code version
   * @return {Number}         Data length in bits
   */
  exports.getSymbolTotalCodewords = function getSymbolTotalCodewords(version) {
    return CODEWORDS_COUNT[version];
  };

  /**
   * Encode data with Bose-Chaudhuri-Hocquenghem
   *
   * @param  {Number} data Value to encode
   * @return {Number}      Encoded value
   */
  exports.getBCHDigit = function (data) {
    let digit = 0;
    while (data !== 0) {
      digit++;
      data >>>= 1;
    }
    return digit;
  };
  exports.setToSJISFunction = function setToSJISFunction(f) {
    if (typeof f !== 'function') {
      throw new Error('"toSJISFunc" is not a valid function.');
    }
    toSJISFunction = f;
  };
  exports.isKanjiModeEnabled = function () {
    return typeof toSJISFunction !== 'undefined';
  };
  exports.toSJIS = function toSJIS(kanji) {
    return toSJISFunction(kanji);
  };
},1077,[]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  exports.L = {
    bit: 1
  };
  exports.M = {
    bit: 0
  };
  exports.Q = {
    bit: 3
  };
  exports.H = {
    bit: 2
  };
  function fromString(string) {
    if (typeof string !== 'string') {
      throw new Error('Param is not a string');
    }
    const lcStr = string.toLowerCase();
    switch (lcStr) {
      case 'l':
      case 'low':
        return exports.L;
      case 'm':
      case 'medium':
        return exports.M;
      case 'q':
      case 'quartile':
        return exports.Q;
      case 'h':
      case 'high':
        return exports.H;
      default:
        throw new Error('Unknown EC Level: ' + string);
    }
  }
  exports.isValid = function isValid(level) {
    return level && typeof level.bit !== 'undefined' && level.bit >= 0 && level.bit < 4;
  };
  exports.from = function from(value, defaultValue) {
    if (exports.isValid(value)) {
      return value;
    }
    try {
      return fromString(value);
    } catch (e) {
      return defaultValue;
    }
  };
},1078,[]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  function BitBuffer() {
    this.buffer = [];
    this.length = 0;
  }
  BitBuffer.prototype = {
    get: function (index) {
      const bufIndex = Math.floor(index / 8);
      return (this.buffer[bufIndex] >>> 7 - index % 8 & 1) === 1;
    },
    put: function (num, length) {
      for (let i = 0; i < length; i++) {
        this.putBit((num >>> length - i - 1 & 1) === 1);
      }
    },
    getLengthInBits: function () {
      return this.length;
    },
    putBit: function (bit) {
      const bufIndex = Math.floor(this.length / 8);
      if (this.buffer.length <= bufIndex) {
        this.buffer.push(0);
      }
      if (bit) {
        this.buffer[bufIndex] |= 0x80 >>> this.length % 8;
      }
      this.length++;
    }
  };
  module.exports = BitBuffer;
},1079,[]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  /**
   * Helper class to handle QR Code symbol modules
   *
   * @param {Number} size Symbol size
   */
  function BitMatrix(size) {
    if (!size || size < 1) {
      throw new Error('BitMatrix size must be defined and greater than 0');
    }
    this.size = size;
    this.data = new Uint8Array(size * size);
    this.reservedBit = new Uint8Array(size * size);
  }

  /**
   * Set bit value at specified location
   * If reserved flag is set, this bit will be ignored during masking process
   *
   * @param {Number}  row
   * @param {Number}  col
   * @param {Boolean} value
   * @param {Boolean} reserved
   */
  BitMatrix.prototype.set = function (row, col, value, reserved) {
    const index = row * this.size + col;
    this.data[index] = value;
    if (reserved) this.reservedBit[index] = true;
  };

  /**
   * Returns bit value at specified location
   *
   * @param  {Number}  row
   * @param  {Number}  col
   * @return {Boolean}
   */
  BitMatrix.prototype.get = function (row, col) {
    return this.data[row * this.size + col];
  };

  /**
   * Applies xor operator at specified location
   * (used during masking process)
   *
   * @param {Number}  row
   * @param {Number}  col
   * @param {Boolean} value
   */
  BitMatrix.prototype.xor = function (row, col, value) {
    this.data[row * this.size + col] ^= value;
  };

  /**
   * Check if bit at specified location is reserved
   *
   * @param {Number}   row
   * @param {Number}   col
   * @return {Boolean}
   */
  BitMatrix.prototype.isReserved = function (row, col) {
    return this.reservedBit[row * this.size + col];
  };
  module.exports = BitMatrix;
},1080,[]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  /**
   * Alignment pattern are fixed reference pattern in defined positions
   * in a matrix symbology, which enables the decode software to re-synchronise
   * the coordinate mapping of the image modules in the event of moderate amounts
   * of distortion of the image.
   *
   * Alignment patterns are present only in QR Code symbols of version 2 or larger
   * and their number depends on the symbol version.
   */

  const getSymbolSize = require(_dependencyMap[0]).getSymbolSize;

  /**
   * Calculate the row/column coordinates of the center module of each alignment pattern
   * for the specified QR Code version.
   *
   * The alignment patterns are positioned symmetrically on either side of the diagonal
   * running from the top left corner of the symbol to the bottom right corner.
   *
   * Since positions are simmetrical only half of the coordinates are returned.
   * Each item of the array will represent in turn the x and y coordinate.
   * @see {@link getPositions}
   *
   * @param  {Number} version QR Code version
   * @return {Array}          Array of coordinate
   */
  exports.getRowColCoords = function getRowColCoords(version) {
    if (version === 1) return [];
    const posCount = Math.floor(version / 7) + 2;
    const size = getSymbolSize(version);
    const intervals = size === 145 ? 26 : Math.ceil((size - 13) / (2 * posCount - 2)) * 2;
    const positions = [size - 7]; // Last coord is always (size - 7)

    for (let i = 1; i < posCount - 1; i++) {
      positions[i] = positions[i - 1] - intervals;
    }
    positions.push(6); // First coord is always 6

    return positions.reverse();
  };

  /**
   * Returns an array containing the positions of each alignment pattern.
   * Each array's element represent the center point of the pattern as (x, y) coordinates
   *
   * Coordinates are calculated expanding the row/column coordinates returned by {@link getRowColCoords}
   * and filtering out the items that overlaps with finder pattern
   *
   * @example
   * For a Version 7 symbol {@link getRowColCoords} returns values 6, 22 and 38.
   * The alignment patterns, therefore, are to be centered on (row, column)
   * positions (6,22), (22,6), (22,22), (22,38), (38,22), (38,38).
   * Note that the coordinates (6,6), (6,38), (38,6) are occupied by finder patterns
   * and are not therefore used for alignment patterns.
   *
   * let pos = getPositions(7)
   * // [[6,22], [22,6], [22,22], [22,38], [38,22], [38,38]]
   *
   * @param  {Number} version QR Code version
   * @return {Array}          Array of coordinates
   */
  exports.getPositions = function getPositions(version) {
    const coords = [];
    const pos = exports.getRowColCoords(version);
    const posLength = pos.length;
    for (let i = 0; i < posLength; i++) {
      for (let j = 0; j < posLength; j++) {
        // Skip if position is occupied by finder patterns
        if (i === 0 && j === 0 ||
        // top-left
        i === 0 && j === posLength - 1 ||
        // bottom-left
        i === posLength - 1 && j === 0) {
          // top-right
          continue;
        }
        coords.push([pos[i], pos[j]]);
      }
    }
    return coords;
  };
},1081,[1077]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  const getSymbolSize = require(_dependencyMap[0]).getSymbolSize;
  const FINDER_PATTERN_SIZE = 7;

  /**
   * Returns an array containing the positions of each finder pattern.
   * Each array's element represent the top-left point of the pattern as (x, y) coordinates
   *
   * @param  {Number} version QR Code version
   * @return {Array}          Array of coordinates
   */
  exports.getPositions = function getPositions(version) {
    const size = getSymbolSize(version);
    return [
    // top-left
    [0, 0],
    // top-right
    [size - FINDER_PATTERN_SIZE, 0],
    // bottom-left
    [0, size - FINDER_PATTERN_SIZE]];
  };
},1082,[1077]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  /**
   * Data mask pattern reference
   * @type {Object}
   */
  exports.Patterns = {
    PATTERN000: 0,
    PATTERN001: 1,
    PATTERN010: 2,
    PATTERN011: 3,
    PATTERN100: 4,
    PATTERN101: 5,
    PATTERN110: 6,
    PATTERN111: 7
  };

  /**
   * Weighted penalty scores for the undesirable features
   * @type {Object}
   */
  const PenaltyScores = {
    N1: 3,
    N2: 3,
    N3: 40,
    N4: 10
  };

  /**
   * Check if mask pattern value is valid
   *
   * @param  {Number}  mask    Mask pattern
   * @return {Boolean}         true if valid, false otherwise
   */
  exports.isValid = function isValid(mask) {
    return mask != null && mask !== '' && !isNaN(mask) && mask >= 0 && mask <= 7;
  };

  /**
   * Returns mask pattern from a value.
   * If value is not valid, returns undefined
   *
   * @param  {Number|String} value        Mask pattern value
   * @return {Number}                     Valid mask pattern or undefined
   */
  exports.from = function from(value) {
    return exports.isValid(value) ? parseInt(value, 10) : undefined;
  };

  /**
  * Find adjacent modules in row/column with the same color
  * and assign a penalty value.
  *
  * Points: N1 + i
  * i is the amount by which the number of adjacent modules of the same color exceeds 5
  */
  exports.getPenaltyN1 = function getPenaltyN1(data) {
    const size = data.size;
    let points = 0;
    let sameCountCol = 0;
    let sameCountRow = 0;
    let lastCol = null;
    let lastRow = null;
    for (let row = 0; row < size; row++) {
      sameCountCol = sameCountRow = 0;
      lastCol = lastRow = null;
      for (let col = 0; col < size; col++) {
        let module = data.get(row, col);
        if (module === lastCol) {
          sameCountCol++;
        } else {
          if (sameCountCol >= 5) points += PenaltyScores.N1 + (sameCountCol - 5);
          lastCol = module;
          sameCountCol = 1;
        }
        module = data.get(col, row);
        if (module === lastRow) {
          sameCountRow++;
        } else {
          if (sameCountRow >= 5) points += PenaltyScores.N1 + (sameCountRow - 5);
          lastRow = module;
          sameCountRow = 1;
        }
      }
      if (sameCountCol >= 5) points += PenaltyScores.N1 + (sameCountCol - 5);
      if (sameCountRow >= 5) points += PenaltyScores.N1 + (sameCountRow - 5);
    }
    return points;
  };

  /**
   * Find 2x2 blocks with the same color and assign a penalty value
   *
   * Points: N2 * (m - 1) * (n - 1)
   */
  exports.getPenaltyN2 = function getPenaltyN2(data) {
    const size = data.size;
    let points = 0;
    for (let row = 0; row < size - 1; row++) {
      for (let col = 0; col < size - 1; col++) {
        const last = data.get(row, col) + data.get(row, col + 1) + data.get(row + 1, col) + data.get(row + 1, col + 1);
        if (last === 4 || last === 0) points++;
      }
    }
    return points * PenaltyScores.N2;
  };

  /**
   * Find 1:1:3:1:1 ratio (dark:light:dark:light:dark) pattern in row/column,
   * preceded or followed by light area 4 modules wide
   *
   * Points: N3 * number of pattern found
   */
  exports.getPenaltyN3 = function getPenaltyN3(data) {
    const size = data.size;
    let points = 0;
    let bitsCol = 0;
    let bitsRow = 0;
    for (let row = 0; row < size; row++) {
      bitsCol = bitsRow = 0;
      for (let col = 0; col < size; col++) {
        bitsCol = bitsCol << 1 & 0x7FF | data.get(row, col);
        if (col >= 10 && (bitsCol === 0x5D0 || bitsCol === 0x05D)) points++;
        bitsRow = bitsRow << 1 & 0x7FF | data.get(col, row);
        if (col >= 10 && (bitsRow === 0x5D0 || bitsRow === 0x05D)) points++;
      }
    }
    return points * PenaltyScores.N3;
  };

  /**
   * Calculate proportion of dark modules in entire symbol
   *
   * Points: N4 * k
   *
   * k is the rating of the deviation of the proportion of dark modules
   * in the symbol from 50% in steps of 5%
   */
  exports.getPenaltyN4 = function getPenaltyN4(data) {
    let darkCount = 0;
    const modulesCount = data.data.length;
    for (let i = 0; i < modulesCount; i++) darkCount += data.data[i];
    const k = Math.abs(Math.ceil(darkCount * 100 / modulesCount / 5) - 10);
    return k * PenaltyScores.N4;
  };

  /**
   * Return mask value at given position
   *
   * @param  {Number} maskPattern Pattern reference value
   * @param  {Number} i           Row
   * @param  {Number} j           Column
   * @return {Boolean}            Mask value
   */
  function getMaskAt(maskPattern, i, j) {
    switch (maskPattern) {
      case exports.Patterns.PATTERN000:
        return (i + j) % 2 === 0;
      case exports.Patterns.PATTERN001:
        return i % 2 === 0;
      case exports.Patterns.PATTERN010:
        return j % 3 === 0;
      case exports.Patterns.PATTERN011:
        return (i + j) % 3 === 0;
      case exports.Patterns.PATTERN100:
        return (Math.floor(i / 2) + Math.floor(j / 3)) % 2 === 0;
      case exports.Patterns.PATTERN101:
        return i * j % 2 + i * j % 3 === 0;
      case exports.Patterns.PATTERN110:
        return (i * j % 2 + i * j % 3) % 2 === 0;
      case exports.Patterns.PATTERN111:
        return (i * j % 3 + (i + j) % 2) % 2 === 0;
      default:
        throw new Error('bad maskPattern:' + maskPattern);
    }
  }

  /**
   * Apply a mask pattern to a BitMatrix
   *
   * @param  {Number}    pattern Pattern reference number
   * @param  {BitMatrix} data    BitMatrix data
   */
  exports.applyMask = function applyMask(pattern, data) {
    const size = data.size;
    for (let col = 0; col < size; col++) {
      for (let row = 0; row < size; row++) {
        if (data.isReserved(row, col)) continue;
        data.xor(row, col, getMaskAt(pattern, row, col));
      }
    }
  };

  /**
   * Returns the best mask pattern for data
   *
   * @param  {BitMatrix} data
   * @return {Number} Mask pattern reference number
   */
  exports.getBestMask = function getBestMask(data, setupFormatFunc) {
    const numPatterns = Object.keys(exports.Patterns).length;
    let bestPattern = 0;
    let lowerPenalty = Infinity;
    for (let p = 0; p < numPatterns; p++) {
      setupFormatFunc(p);
      exports.applyMask(p, data);

      // Calculate penalty
      const penalty = exports.getPenaltyN1(data) + exports.getPenaltyN2(data) + exports.getPenaltyN3(data) + exports.getPenaltyN4(data);

      // Undo previously applied mask
      exports.applyMask(p, data);
      if (penalty < lowerPenalty) {
        lowerPenalty = penalty;
        bestPattern = p;
      }
    }
    return bestPattern;
  };
},1083,[]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  const ECLevel = require(_dependencyMap[0]);
  const EC_BLOCKS_TABLE = [
  // L  M  Q  H
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 2, 2, 4, 1, 2, 4, 4, 2, 4, 4, 4, 2, 4, 6, 5, 2, 4, 6, 6, 2, 5, 8, 8, 4, 5, 8, 8, 4, 5, 8, 11, 4, 8, 10, 11, 4, 9, 12, 16, 4, 9, 16, 16, 6, 10, 12, 18, 6, 10, 17, 16, 6, 11, 16, 19, 6, 13, 18, 21, 7, 14, 21, 25, 8, 16, 20, 25, 8, 17, 23, 25, 9, 17, 23, 34, 9, 18, 25, 30, 10, 20, 27, 32, 12, 21, 29, 35, 12, 23, 34, 37, 12, 25, 34, 40, 13, 26, 35, 42, 14, 28, 38, 45, 15, 29, 40, 48, 16, 31, 43, 51, 17, 33, 45, 54, 18, 35, 48, 57, 19, 37, 51, 60, 19, 38, 53, 63, 20, 40, 56, 66, 21, 43, 59, 70, 22, 45, 62, 74, 24, 47, 65, 77, 25, 49, 68, 81];
  const EC_CODEWORDS_TABLE = [
  // L  M  Q  H
  7, 10, 13, 17, 10, 16, 22, 28, 15, 26, 36, 44, 20, 36, 52, 64, 26, 48, 72, 88, 36, 64, 96, 112, 40, 72, 108, 130, 48, 88, 132, 156, 60, 110, 160, 192, 72, 130, 192, 224, 80, 150, 224, 264, 96, 176, 260, 308, 104, 198, 288, 352, 120, 216, 320, 384, 132, 240, 360, 432, 144, 280, 408, 480, 168, 308, 448, 532, 180, 338, 504, 588, 196, 364, 546, 650, 224, 416, 600, 700, 224, 442, 644, 750, 252, 476, 690, 816, 270, 504, 750, 900, 300, 560, 810, 960, 312, 588, 870, 1050, 336, 644, 952, 1110, 360, 700, 1020, 1200, 390, 728, 1050, 1260, 420, 784, 1140, 1350, 450, 812, 1200, 1440, 480, 868, 1290, 1530, 510, 924, 1350, 1620, 540, 980, 1440, 1710, 570, 1036, 1530, 1800, 570, 1064, 1590, 1890, 600, 1120, 1680, 1980, 630, 1204, 1770, 2100, 660, 1260, 1860, 2220, 720, 1316, 1950, 2310, 750, 1372, 2040, 2430];

  /**
   * Returns the number of error correction block that the QR Code should contain
   * for the specified version and error correction level.
   *
   * @param  {Number} version              QR Code version
   * @param  {Number} errorCorrectionLevel Error correction level
   * @return {Number}                      Number of error correction blocks
   */
  exports.getBlocksCount = function getBlocksCount(version, errorCorrectionLevel) {
    switch (errorCorrectionLevel) {
      case ECLevel.L:
        return EC_BLOCKS_TABLE[(version - 1) * 4 + 0];
      case ECLevel.M:
        return EC_BLOCKS_TABLE[(version - 1) * 4 + 1];
      case ECLevel.Q:
        return EC_BLOCKS_TABLE[(version - 1) * 4 + 2];
      case ECLevel.H:
        return EC_BLOCKS_TABLE[(version - 1) * 4 + 3];
      default:
        return undefined;
    }
  };

  /**
   * Returns the number of error correction codewords to use for the specified
   * version and error correction level.
   *
   * @param  {Number} version              QR Code version
   * @param  {Number} errorCorrectionLevel Error correction level
   * @return {Number}                      Number of error correction codewords
   */
  exports.getTotalCodewordsCount = function getTotalCodewordsCount(version, errorCorrectionLevel) {
    switch (errorCorrectionLevel) {
      case ECLevel.L:
        return EC_CODEWORDS_TABLE[(version - 1) * 4 + 0];
      case ECLevel.M:
        return EC_CODEWORDS_TABLE[(version - 1) * 4 + 1];
      case ECLevel.Q:
        return EC_CODEWORDS_TABLE[(version - 1) * 4 + 2];
      case ECLevel.H:
        return EC_CODEWORDS_TABLE[(version - 1) * 4 + 3];
      default:
        return undefined;
    }
  };
},1084,[1078]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  const Polynomial = require(_dependencyMap[0]);
  function ReedSolomonEncoder(degree) {
    this.genPoly = undefined;
    this.degree = degree;
    if (this.degree) this.initialize(this.degree);
  }

  /**
   * Initialize the encoder.
   * The input param should correspond to the number of error correction codewords.
   *
   * @param  {Number} degree
   */
  ReedSolomonEncoder.prototype.initialize = function initialize(degree) {
    // create an irreducible generator polynomial
    this.degree = degree;
    this.genPoly = Polynomial.generateECPolynomial(this.degree);
  };

  /**
   * Encodes a chunk of data
   *
   * @param  {Uint8Array} data Buffer containing input data
   * @return {Uint8Array}      Buffer containing encoded data
   */
  ReedSolomonEncoder.prototype.encode = function encode(data) {
    if (!this.genPoly) {
      throw new Error('Encoder not initialized');
    }

    // Calculate EC for this data block
    // extends data size to data+genPoly size
    const paddedData = new Uint8Array(data.length + this.degree);
    paddedData.set(data);

    // The error correction codewords are the remainder after dividing the data codewords
    // by a generator polynomial
    const remainder = Polynomial.mod(paddedData, this.genPoly);

    // return EC data blocks (last n byte, where n is the degree of genPoly)
    // If coefficients number in remainder are less than genPoly degree,
    // pad with 0s to the left to reach the needed number of coefficients
    const start = this.degree - remainder.length;
    if (start > 0) {
      const buff = new Uint8Array(this.degree);
      buff.set(remainder, start);
      return buff;
    }
    return remainder;
  };
  module.exports = ReedSolomonEncoder;
},1085,[1086]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  const GF = require(_dependencyMap[0]);

  /**
   * Multiplies two polynomials inside Galois Field
   *
   * @param  {Uint8Array} p1 Polynomial
   * @param  {Uint8Array} p2 Polynomial
   * @return {Uint8Array}    Product of p1 and p2
   */
  exports.mul = function mul(p1, p2) {
    const coeff = new Uint8Array(p1.length + p2.length - 1);
    for (let i = 0; i < p1.length; i++) {
      for (let j = 0; j < p2.length; j++) {
        coeff[i + j] ^= GF.mul(p1[i], p2[j]);
      }
    }
    return coeff;
  };

  /**
   * Calculate the remainder of polynomials division
   *
   * @param  {Uint8Array} divident Polynomial
   * @param  {Uint8Array} divisor  Polynomial
   * @return {Uint8Array}          Remainder
   */
  exports.mod = function mod(divident, divisor) {
    let result = new Uint8Array(divident);
    while (result.length - divisor.length >= 0) {
      const coeff = result[0];
      for (let i = 0; i < divisor.length; i++) {
        result[i] ^= GF.mul(divisor[i], coeff);
      }

      // remove all zeros from buffer head
      let offset = 0;
      while (offset < result.length && result[offset] === 0) offset++;
      result = result.slice(offset);
    }
    return result;
  };

  /**
   * Generate an irreducible generator polynomial of specified degree
   * (used by Reed-Solomon encoder)
   *
   * @param  {Number} degree Degree of the generator polynomial
   * @return {Uint8Array}    Buffer containing polynomial coefficients
   */
  exports.generateECPolynomial = function generateECPolynomial(degree) {
    let poly = new Uint8Array([1]);
    for (let i = 0; i < degree; i++) {
      poly = exports.mul(poly, new Uint8Array([1, GF.exp(i)]));
    }
    return poly;
  };
},1086,[1087]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  const EXP_TABLE = new Uint8Array(512);
  const LOG_TABLE = new Uint8Array(256)
  /**
   * Precompute the log and anti-log tables for faster computation later
   *
   * For each possible value in the galois field 2^8, we will pre-compute
   * the logarithm and anti-logarithm (exponential) of this value
   *
   * ref {@link https://en.wikiversity.org/wiki/Reed%E2%80%93Solomon_codes_for_coders#Introduction_to_mathematical_fields}
   */;
  (function initTables() {
    let x = 1;
    for (let i = 0; i < 255; i++) {
      EXP_TABLE[i] = x;
      LOG_TABLE[x] = i;
      x <<= 1; // multiply by 2

      // The QR code specification says to use byte-wise modulo 100011101 arithmetic.
      // This means that when a number is 256 or larger, it should be XORed with 0x11D.
      if (x & 0x100) {
        // similar to x >= 256, but a lot faster (because 0x100 == 256)
        x ^= 0x11D;
      }
    }

    // Optimization: double the size of the anti-log table so that we don't need to mod 255 to
    // stay inside the bounds (because we will mainly use this table for the multiplication of
    // two GF numbers, no more).
    // @see {@link mul}
    for (let i = 255; i < 512; i++) {
      EXP_TABLE[i] = EXP_TABLE[i - 255];
    }
  })();

  /**
   * Returns log value of n inside Galois Field
   *
   * @param  {Number} n
   * @return {Number}
   */
  exports.log = function log(n) {
    if (n < 1) throw new Error('log(' + n + ')');
    return LOG_TABLE[n];
  };

  /**
   * Returns anti-log value of n inside Galois Field
   *
   * @param  {Number} n
   * @return {Number}
   */
  exports.exp = function exp(n) {
    return EXP_TABLE[n];
  };

  /**
   * Multiplies two number inside Galois Field
   *
   * @param  {Number} x
   * @param  {Number} y
   * @return {Number}
   */
  exports.mul = function mul(x, y) {
    if (x === 0 || y === 0) return 0;

    // should be EXP_TABLE[(LOG_TABLE[x] + LOG_TABLE[y]) % 255] if EXP_TABLE wasn't oversized
    // @see {@link initTables}
    return EXP_TABLE[LOG_TABLE[x] + LOG_TABLE[y]];
  };
},1087,[]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  const Utils = require(_dependencyMap[0]);
  const ECCode = require(_dependencyMap[1]);
  const ECLevel = require(_dependencyMap[2]);
  const Mode = require(_dependencyMap[3]);
  const VersionCheck = require(_dependencyMap[4]);

  // Generator polynomial used to encode version information
  const G18 = 7973;
  const G18_BCH = Utils.getBCHDigit(G18);
  function getBestVersionForDataLength(mode, length, errorCorrectionLevel) {
    for (let currentVersion = 1; currentVersion <= 40; currentVersion++) {
      if (length <= exports.getCapacity(currentVersion, errorCorrectionLevel, mode)) {
        return currentVersion;
      }
    }
    return undefined;
  }
  function getReservedBitsCount(mode, version) {
    // Character count indicator + mode indicator bits
    return Mode.getCharCountIndicator(mode, version) + 4;
  }
  function getTotalBitsFromDataArray(segments, version) {
    let totalBits = 0;
    segments.forEach(function (data) {
      const reservedBits = getReservedBitsCount(data.mode, version);
      totalBits += reservedBits + data.getBitsLength();
    });
    return totalBits;
  }
  function getBestVersionForMixedData(segments, errorCorrectionLevel) {
    for (let currentVersion = 1; currentVersion <= 40; currentVersion++) {
      const length = getTotalBitsFromDataArray(segments, currentVersion);
      if (length <= exports.getCapacity(currentVersion, errorCorrectionLevel, Mode.MIXED)) {
        return currentVersion;
      }
    }
    return undefined;
  }

  /**
   * Returns version number from a value.
   * If value is not a valid version, returns defaultValue
   *
   * @param  {Number|String} value        QR Code version
   * @param  {Number}        defaultValue Fallback value
   * @return {Number}                     QR Code version number
   */
  exports.from = function from(value, defaultValue) {
    if (VersionCheck.isValid(value)) {
      return parseInt(value, 10);
    }
    return defaultValue;
  };

  /**
   * Returns how much data can be stored with the specified QR code version
   * and error correction level
   *
   * @param  {Number} version              QR Code version (1-40)
   * @param  {Number} errorCorrectionLevel Error correction level
   * @param  {Mode}   mode                 Data mode
   * @return {Number}                      Quantity of storable data
   */
  exports.getCapacity = function getCapacity(version, errorCorrectionLevel, mode) {
    if (!VersionCheck.isValid(version)) {
      throw new Error('Invalid QR Code version');
    }

    // Use Byte mode as default
    if (typeof mode === 'undefined') mode = Mode.BYTE;

    // Total codewords for this QR code version (Data + Error correction)
    const totalCodewords = Utils.getSymbolTotalCodewords(version);

    // Total number of error correction codewords
    const ecTotalCodewords = ECCode.getTotalCodewordsCount(version, errorCorrectionLevel);

    // Total number of data codewords
    const dataTotalCodewordsBits = (totalCodewords - ecTotalCodewords) * 8;
    if (mode === Mode.MIXED) return dataTotalCodewordsBits;
    const usableBits = dataTotalCodewordsBits - getReservedBitsCount(mode, version);

    // Return max number of storable codewords
    switch (mode) {
      case Mode.NUMERIC:
        return Math.floor(usableBits / 10 * 3);
      case Mode.ALPHANUMERIC:
        return Math.floor(usableBits / 11 * 2);
      case Mode.KANJI:
        return Math.floor(usableBits / 13);
      case Mode.BYTE:
      default:
        return Math.floor(usableBits / 8);
    }
  };

  /**
   * Returns the minimum version needed to contain the amount of data
   *
   * @param  {Segment} data                    Segment of data
   * @param  {Number} [errorCorrectionLevel=H] Error correction level
   * @param  {Mode} mode                       Data mode
   * @return {Number}                          QR Code version
   */
  exports.getBestVersionForData = function getBestVersionForData(data, errorCorrectionLevel) {
    let seg;
    const ecl = ECLevel.from(errorCorrectionLevel, ECLevel.M);
    if (Array.isArray(data)) {
      if (data.length > 1) {
        return getBestVersionForMixedData(data, ecl);
      }
      if (data.length === 0) {
        return 1;
      }
      seg = data[0];
    } else {
      seg = data;
    }
    return getBestVersionForDataLength(seg.mode, seg.getLength(), ecl);
  };

  /**
   * Returns version information with relative error correction bits
   *
   * The version information is included in QR Code symbols of version 7 or larger.
   * It consists of an 18-bit sequence containing 6 data bits,
   * with 12 error correction bits calculated using the (18, 6) Golay code.
   *
   * @param  {Number} version QR Code version
   * @return {Number}         Encoded version info bits
   */
  exports.getEncodedBits = function getEncodedBits(version) {
    if (!VersionCheck.isValid(version) || version < 7) {
      throw new Error('Invalid QR Code version');
    }
    let d = version << 12;
    while (Utils.getBCHDigit(d) - G18_BCH >= 0) {
      d ^= G18 << Utils.getBCHDigit(d) - G18_BCH;
    }
    return version << 12 | d;
  };
},1088,[1077,1084,1078,1089,1090]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  const VersionCheck = require(_dependencyMap[0]);
  const Regex = require(_dependencyMap[1]);

  /**
   * Numeric mode encodes data from the decimal digit set (0 - 9)
   * (byte values 30HEX to 39HEX).
   * Normally, 3 data characters are represented by 10 bits.
   *
   * @type {Object}
   */
  exports.NUMERIC = {
    id: 'Numeric',
    bit: 1,
    ccBits: [10, 12, 14]
  };

  /**
   * Alphanumeric mode encodes data from a set of 45 characters,
   * i.e. 10 numeric digits (0 - 9),
   *      26 alphabetic characters (A - Z),
   *   and 9 symbols (SP, $, %, *, +, -, ., /, :).
   * Normally, two input characters are represented by 11 bits.
   *
   * @type {Object}
   */
  exports.ALPHANUMERIC = {
    id: 'Alphanumeric',
    bit: 2,
    ccBits: [9, 11, 13]
  };

  /**
   * In byte mode, data is encoded at 8 bits per character.
   *
   * @type {Object}
   */
  exports.BYTE = {
    id: 'Byte',
    bit: 4,
    ccBits: [8, 16, 16]
  };

  /**
   * The Kanji mode efficiently encodes Kanji characters in accordance with
   * the Shift JIS system based on JIS X 0208.
   * The Shift JIS values are shifted from the JIS X 0208 values.
   * JIS X 0208 gives details of the shift coded representation.
   * Each two-byte character value is compacted to a 13-bit binary codeword.
   *
   * @type {Object}
   */
  exports.KANJI = {
    id: 'Kanji',
    bit: 8,
    ccBits: [8, 10, 12]
  };

  /**
   * Mixed mode will contain a sequences of data in a combination of any of
   * the modes described above
   *
   * @type {Object}
   */
  exports.MIXED = {
    bit: -1
  };

  /**
   * Returns the number of bits needed to store the data length
   * according to QR Code specifications.
   *
   * @param  {Mode}   mode    Data mode
   * @param  {Number} version QR Code version
   * @return {Number}         Number of bits
   */
  exports.getCharCountIndicator = function getCharCountIndicator(mode, version) {
    if (!mode.ccBits) throw new Error('Invalid mode: ' + mode);
    if (!VersionCheck.isValid(version)) {
      throw new Error('Invalid version: ' + version);
    }
    if (version >= 1 && version < 10) return mode.ccBits[0];else if (version < 27) return mode.ccBits[1];
    return mode.ccBits[2];
  };

  /**
   * Returns the most efficient mode to store the specified data
   *
   * @param  {String} dataStr Input data string
   * @return {Mode}           Best mode
   */
  exports.getBestModeForData = function getBestModeForData(dataStr) {
    if (Regex.testNumeric(dataStr)) return exports.NUMERIC;else if (Regex.testAlphanumeric(dataStr)) return exports.ALPHANUMERIC;else if (Regex.testKanji(dataStr)) return exports.KANJI;else return exports.BYTE;
  };

  /**
   * Return mode name as string
   *
   * @param {Mode} mode Mode object
   * @returns {String}  Mode name
   */
  exports.toString = function toString(mode) {
    if (mode && mode.id) return mode.id;
    throw new Error('Invalid mode');
  };

  /**
   * Check if input param is a valid mode object
   *
   * @param   {Mode}    mode Mode object
   * @returns {Boolean} True if valid mode, false otherwise
   */
  exports.isValid = function isValid(mode) {
    return mode && mode.bit && mode.ccBits;
  };

  /**
   * Get mode object from its name
   *
   * @param   {String} string Mode name
   * @returns {Mode}          Mode object
   */
  function fromString(string) {
    if (typeof string !== 'string') {
      throw new Error('Param is not a string');
    }
    const lcStr = string.toLowerCase();
    switch (lcStr) {
      case 'numeric':
        return exports.NUMERIC;
      case 'alphanumeric':
        return exports.ALPHANUMERIC;
      case 'kanji':
        return exports.KANJI;
      case 'byte':
        return exports.BYTE;
      default:
        throw new Error('Unknown mode: ' + string);
    }
  }

  /**
   * Returns mode from a value.
   * If value is not a valid mode, returns defaultValue
   *
   * @param  {Mode|String} value        Encoding mode
   * @param  {Mode}        defaultValue Fallback value
   * @return {Mode}                     Encoding mode
   */
  exports.from = function from(value, defaultValue) {
    if (exports.isValid(value)) {
      return value;
    }
    try {
      return fromString(value);
    } catch (e) {
      return defaultValue;
    }
  };
},1089,[1090,1091]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  /**
   * Check if QR Code version is valid
   *
   * @param  {Number}  version QR Code version
   * @return {Boolean}         true if valid version, false otherwise
   */
  exports.isValid = function isValid(version) {
    return !isNaN(version) && version >= 1 && version <= 40;
  };
},1090,[]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  const numeric = '[0-9]+';
  const alphanumeric = '[A-Z $%*+\\-./:]+';
  let kanji = "(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";
  kanji = kanji.replace(/u/g, '\\u');
  const byte = '(?:(?![A-Z0-9 $%*+\\-./:]|' + kanji + ')(?:.|[\r\n]))+';
  exports.KANJI = new RegExp(kanji, 'g');
  exports.BYTE_KANJI = new RegExp('[^A-Z0-9 $%*+\\-./:]+', 'g');
  exports.BYTE = new RegExp(byte, 'g');
  exports.NUMERIC = new RegExp(numeric, 'g');
  exports.ALPHANUMERIC = new RegExp(alphanumeric, 'g');
  const TEST_KANJI = new RegExp('^' + kanji + '$');
  const TEST_NUMERIC = new RegExp("^[0-9]+$");
  const TEST_ALPHANUMERIC = new RegExp('^[A-Z0-9 $%*+\\-./:]+$');
  exports.testKanji = function testKanji(str) {
    return TEST_KANJI.test(str);
  };
  exports.testNumeric = function testNumeric(str) {
    return TEST_NUMERIC.test(str);
  };
  exports.testAlphanumeric = function testAlphanumeric(str) {
    return TEST_ALPHANUMERIC.test(str);
  };
},1091,[]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  const Utils = require(_dependencyMap[0]);
  const G15 = 1335;
  const G15_MASK = 21522;
  const G15_BCH = Utils.getBCHDigit(G15);

  /**
   * Returns format information with relative error correction bits
   *
   * The format information is a 15-bit sequence containing 5 data bits,
   * with 10 error correction bits calculated using the (15, 5) BCH code.
   *
   * @param  {Number} errorCorrectionLevel Error correction level
   * @param  {Number} mask                 Mask pattern
   * @return {Number}                      Encoded format information bits
   */
  exports.getEncodedBits = function getEncodedBits(errorCorrectionLevel, mask) {
    const data = errorCorrectionLevel.bit << 3 | mask;
    let d = data << 10;
    while (Utils.getBCHDigit(d) - G15_BCH >= 0) {
      d ^= G15 << Utils.getBCHDigit(d) - G15_BCH;
    }

    // xor final data with mask pattern in order to ensure that
    // no combination of Error Correction Level and data mask pattern
    // will result in an all-zero data string
    return (data << 10 | d) ^ G15_MASK;
  };
},1092,[1077]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  const Mode = require(_dependencyMap[0]);
  const NumericData = require(_dependencyMap[1]);
  const AlphanumericData = require(_dependencyMap[2]);
  const ByteData = require(_dependencyMap[3]);
  const KanjiData = require(_dependencyMap[4]);
  const Regex = require(_dependencyMap[5]);
  const Utils = require(_dependencyMap[6]);
  const dijkstra = require(_dependencyMap[7]);

  /**
   * Returns UTF8 byte length
   *
   * @param  {String} str Input string
   * @return {Number}     Number of byte
   */
  function getStringByteLength(str) {
    return unescape(encodeURIComponent(str)).length;
  }

  /**
   * Get a list of segments of the specified mode
   * from a string
   *
   * @param  {Mode}   mode Segment mode
   * @param  {String} str  String to process
   * @return {Array}       Array of object with segments data
   */
  function getSegments(regex, mode, str) {
    const segments = [];
    let result;
    while ((result = regex.exec(str)) !== null) {
      segments.push({
        data: result[0],
        index: result.index,
        mode: mode,
        length: result[0].length
      });
    }
    return segments;
  }

  /**
   * Extracts a series of segments with the appropriate
   * modes from a string
   *
   * @param  {String} dataStr Input string
   * @return {Array}          Array of object with segments data
   */
  function getSegmentsFromString(dataStr) {
    const numSegs = getSegments(Regex.NUMERIC, Mode.NUMERIC, dataStr);
    const alphaNumSegs = getSegments(Regex.ALPHANUMERIC, Mode.ALPHANUMERIC, dataStr);
    let byteSegs;
    let kanjiSegs;
    if (Utils.isKanjiModeEnabled()) {
      byteSegs = getSegments(Regex.BYTE, Mode.BYTE, dataStr);
      kanjiSegs = getSegments(Regex.KANJI, Mode.KANJI, dataStr);
    } else {
      byteSegs = getSegments(Regex.BYTE_KANJI, Mode.BYTE, dataStr);
      kanjiSegs = [];
    }
    const segs = numSegs.concat(alphaNumSegs, byteSegs, kanjiSegs);
    return segs.sort(function (s1, s2) {
      return s1.index - s2.index;
    }).map(function (obj) {
      return {
        data: obj.data,
        mode: obj.mode,
        length: obj.length
      };
    });
  }

  /**
   * Returns how many bits are needed to encode a string of
   * specified length with the specified mode
   *
   * @param  {Number} length String length
   * @param  {Mode} mode     Segment mode
   * @return {Number}        Bit length
   */
  function getSegmentBitsLength(length, mode) {
    switch (mode) {
      case Mode.NUMERIC:
        return NumericData.getBitsLength(length);
      case Mode.ALPHANUMERIC:
        return AlphanumericData.getBitsLength(length);
      case Mode.KANJI:
        return KanjiData.getBitsLength(length);
      case Mode.BYTE:
        return ByteData.getBitsLength(length);
    }
  }

  /**
   * Merges adjacent segments which have the same mode
   *
   * @param  {Array} segs Array of object with segments data
   * @return {Array}      Array of object with segments data
   */
  function mergeSegments(segs) {
    return segs.reduce(function (acc, curr) {
      const prevSeg = acc.length - 1 >= 0 ? acc[acc.length - 1] : null;
      if (prevSeg && prevSeg.mode === curr.mode) {
        acc[acc.length - 1].data += curr.data;
        return acc;
      }
      acc.push(curr);
      return acc;
    }, []);
  }

  /**
   * Generates a list of all possible nodes combination which
   * will be used to build a segments graph.
   *
   * Nodes are divided by groups. Each group will contain a list of all the modes
   * in which is possible to encode the given text.
   *
   * For example the text '12345' can be encoded as Numeric, Alphanumeric or Byte.
   * The group for '12345' will contain then 3 objects, one for each
   * possible encoding mode.
   *
   * Each node represents a possible segment.
   *
   * @param  {Array} segs Array of object with segments data
   * @return {Array}      Array of object with segments data
   */
  function buildNodes(segs) {
    const nodes = [];
    for (let i = 0; i < segs.length; i++) {
      const seg = segs[i];
      switch (seg.mode) {
        case Mode.NUMERIC:
          nodes.push([seg, {
            data: seg.data,
            mode: Mode.ALPHANUMERIC,
            length: seg.length
          }, {
            data: seg.data,
            mode: Mode.BYTE,
            length: seg.length
          }]);
          break;
        case Mode.ALPHANUMERIC:
          nodes.push([seg, {
            data: seg.data,
            mode: Mode.BYTE,
            length: seg.length
          }]);
          break;
        case Mode.KANJI:
          nodes.push([seg, {
            data: seg.data,
            mode: Mode.BYTE,
            length: getStringByteLength(seg.data)
          }]);
          break;
        case Mode.BYTE:
          nodes.push([{
            data: seg.data,
            mode: Mode.BYTE,
            length: getStringByteLength(seg.data)
          }]);
      }
    }
    return nodes;
  }

  /**
   * Builds a graph from a list of nodes.
   * All segments in each node group will be connected with all the segments of
   * the next group and so on.
   *
   * At each connection will be assigned a weight depending on the
   * segment's byte length.
   *
   * @param  {Array} nodes    Array of object with segments data
   * @param  {Number} version QR Code version
   * @return {Object}         Graph of all possible segments
   */
  function buildGraph(nodes, version) {
    const table = {};
    const graph = {
      start: {}
    };
    let prevNodeIds = ['start'];
    for (let i = 0; i < nodes.length; i++) {
      const nodeGroup = nodes[i];
      const currentNodeIds = [];
      for (let j = 0; j < nodeGroup.length; j++) {
        const node = nodeGroup[j];
        const key = '' + i + j;
        currentNodeIds.push(key);
        table[key] = {
          node: node,
          lastCount: 0
        };
        graph[key] = {};
        for (let n = 0; n < prevNodeIds.length; n++) {
          const prevNodeId = prevNodeIds[n];
          if (table[prevNodeId] && table[prevNodeId].node.mode === node.mode) {
            graph[prevNodeId][key] = getSegmentBitsLength(table[prevNodeId].lastCount + node.length, node.mode) - getSegmentBitsLength(table[prevNodeId].lastCount, node.mode);
            table[prevNodeId].lastCount += node.length;
          } else {
            if (table[prevNodeId]) table[prevNodeId].lastCount = node.length;
            graph[prevNodeId][key] = getSegmentBitsLength(node.length, node.mode) + 4 + Mode.getCharCountIndicator(node.mode, version); // switch cost
          }
        }
      }
      prevNodeIds = currentNodeIds;
    }
    for (let n = 0; n < prevNodeIds.length; n++) {
      graph[prevNodeIds[n]].end = 0;
    }
    return {
      map: graph,
      table: table
    };
  }

  /**
   * Builds a segment from a specified data and mode.
   * If a mode is not specified, the more suitable will be used.
   *
   * @param  {String} data             Input data
   * @param  {Mode | String} modesHint Data mode
   * @return {Segment}                 Segment
   */
  function buildSingleSegment(data, modesHint) {
    let mode;
    const bestMode = Mode.getBestModeForData(data);
    mode = Mode.from(modesHint, bestMode);

    // Make sure data can be encoded
    if (mode !== Mode.BYTE && mode.bit < bestMode.bit) {
      throw new Error('"' + data + '"' + ' cannot be encoded with mode ' + Mode.toString(mode) + '.\n Suggested mode is: ' + Mode.toString(bestMode));
    }

    // Use Mode.BYTE if Kanji support is disabled
    if (mode === Mode.KANJI && !Utils.isKanjiModeEnabled()) {
      mode = Mode.BYTE;
    }
    switch (mode) {
      case Mode.NUMERIC:
        return new NumericData(data);
      case Mode.ALPHANUMERIC:
        return new AlphanumericData(data);
      case Mode.KANJI:
        return new KanjiData(data);
      case Mode.BYTE:
        return new ByteData(data);
    }
  }

  /**
   * Builds a list of segments from an array.
   * Array can contain Strings or Objects with segment's info.
   *
   * For each item which is a string, will be generated a segment with the given
   * string and the more appropriate encoding mode.
   *
   * For each item which is an object, will be generated a segment with the given
   * data and mode.
   * Objects must contain at least the property "data".
   * If property "mode" is not present, the more suitable mode will be used.
   *
   * @param  {Array} array Array of objects with segments data
   * @return {Array}       Array of Segments
   */
  exports.fromArray = function fromArray(array) {
    return array.reduce(function (acc, seg) {
      if (typeof seg === 'string') {
        acc.push(buildSingleSegment(seg, null));
      } else if (seg.data) {
        acc.push(buildSingleSegment(seg.data, seg.mode));
      }
      return acc;
    }, []);
  };

  /**
   * Builds an optimized sequence of segments from a string,
   * which will produce the shortest possible bitstream.
   *
   * @param  {String} data    Input string
   * @param  {Number} version QR Code version
   * @return {Array}          Array of segments
   */
  exports.fromString = function fromString(data, version) {
    const segs = getSegmentsFromString(data, Utils.isKanjiModeEnabled());
    const nodes = buildNodes(segs);
    const graph = buildGraph(nodes, version);
    const path = dijkstra.find_path(graph.map, 'start', 'end');
    const optimizedSegs = [];
    for (let i = 1; i < path.length - 1; i++) {
      optimizedSegs.push(graph.table[path[i]].node);
    }
    return exports.fromArray(mergeSegments(optimizedSegs));
  };

  /**
   * Splits a string in various segments with the modes which
   * best represent their content.
   * The produced segments are far from being optimized.
   * The output of this function is only used to estimate a QR Code version
   * which may contain the data.
   *
   * @param  {string} data Input string
   * @return {Array}       Array of segments
   */
  exports.rawSplit = function rawSplit(data) {
    return exports.fromArray(getSegmentsFromString(data, Utils.isKanjiModeEnabled()));
  };
},1093,[1089,1094,1095,1096,1097,1091,1077,1098]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  const Mode = require(_dependencyMap[0]);
  function NumericData(data) {
    this.mode = Mode.NUMERIC;
    this.data = data.toString();
  }
  NumericData.getBitsLength = function getBitsLength(length) {
    return 10 * Math.floor(length / 3) + (length % 3 ? length % 3 * 3 + 1 : 0);
  };
  NumericData.prototype.getLength = function getLength() {
    return this.data.length;
  };
  NumericData.prototype.getBitsLength = function getBitsLength() {
    return NumericData.getBitsLength(this.data.length);
  };
  NumericData.prototype.write = function write(bitBuffer) {
    let i, group, value;

    // The input data string is divided into groups of three digits,
    // and each group is converted to its 10-bit binary equivalent.
    for (i = 0; i + 3 <= this.data.length; i += 3) {
      group = this.data.substr(i, 3);
      value = parseInt(group, 10);
      bitBuffer.put(value, 10);
    }

    // If the number of input digits is not an exact multiple of three,
    // the final one or two digits are converted to 4 or 7 bits respectively.
    const remainingNum = this.data.length - i;
    if (remainingNum > 0) {
      group = this.data.substr(i);
      value = parseInt(group, 10);
      bitBuffer.put(value, remainingNum * 3 + 1);
    }
  };
  module.exports = NumericData;
},1094,[1089]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  const Mode = require(_dependencyMap[0]);

  /**
   * Array of characters available in alphanumeric mode
   *
   * As per QR Code specification, to each character
   * is assigned a value from 0 to 44 which in this case coincides
   * with the array index
   *
   * @type {Array}
   */
  const ALPHA_NUM_CHARS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', ' ', '$', '%', '*', '+', '-', '.', '/', ':'];
  function AlphanumericData(data) {
    this.mode = Mode.ALPHANUMERIC;
    this.data = data;
  }
  AlphanumericData.getBitsLength = function getBitsLength(length) {
    return 11 * Math.floor(length / 2) + 6 * (length % 2);
  };
  AlphanumericData.prototype.getLength = function getLength() {
    return this.data.length;
  };
  AlphanumericData.prototype.getBitsLength = function getBitsLength() {
    return AlphanumericData.getBitsLength(this.data.length);
  };
  AlphanumericData.prototype.write = function write(bitBuffer) {
    let i;

    // Input data characters are divided into groups of two characters
    // and encoded as 11-bit binary codes.
    for (i = 0; i + 2 <= this.data.length; i += 2) {
      // The character value of the first character is multiplied by 45
      let value = ALPHA_NUM_CHARS.indexOf(this.data[i]) * 45;

      // The character value of the second digit is added to the product
      value += ALPHA_NUM_CHARS.indexOf(this.data[i + 1]);

      // The sum is then stored as 11-bit binary number
      bitBuffer.put(value, 11);
    }

    // If the number of input data characters is not a multiple of two,
    // the character value of the final character is encoded as a 6-bit binary number.
    if (this.data.length % 2) {
      bitBuffer.put(ALPHA_NUM_CHARS.indexOf(this.data[i]), 6);
    }
  };
  module.exports = AlphanumericData;
},1095,[1089]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  const Mode = require(_dependencyMap[0]);
  function ByteData(data) {
    this.mode = Mode.BYTE;
    if (typeof data === 'string') {
      this.data = new TextEncoder().encode(data);
    } else {
      this.data = new Uint8Array(data);
    }
  }
  ByteData.getBitsLength = function getBitsLength(length) {
    return length * 8;
  };
  ByteData.prototype.getLength = function getLength() {
    return this.data.length;
  };
  ByteData.prototype.getBitsLength = function getBitsLength() {
    return ByteData.getBitsLength(this.data.length);
  };
  ByteData.prototype.write = function (bitBuffer) {
    for (let i = 0, l = this.data.length; i < l; i++) {
      bitBuffer.put(this.data[i], 8);
    }
  };
  module.exports = ByteData;
},1096,[1089]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  const Mode = require(_dependencyMap[0]);
  const Utils = require(_dependencyMap[1]);
  function KanjiData(data) {
    this.mode = Mode.KANJI;
    this.data = data;
  }
  KanjiData.getBitsLength = function getBitsLength(length) {
    return length * 13;
  };
  KanjiData.prototype.getLength = function getLength() {
    return this.data.length;
  };
  KanjiData.prototype.getBitsLength = function getBitsLength() {
    return KanjiData.getBitsLength(this.data.length);
  };
  KanjiData.prototype.write = function (bitBuffer) {
    let i;

    // In the Shift JIS system, Kanji characters are represented by a two byte combination.
    // These byte values are shifted from the JIS X 0208 values.
    // JIS X 0208 gives details of the shift coded representation.
    for (i = 0; i < this.data.length; i++) {
      let value = Utils.toSJIS(this.data[i]);

      // For characters with Shift JIS values from 0x8140 to 0x9FFC:
      if (value >= 0x8140 && value <= 0x9FFC) {
        // Subtract 0x8140 from Shift JIS value
        value -= 0x8140;

        // For characters with Shift JIS values from 0xE040 to 0xEBBF
      } else if (value >= 0xE040 && value <= 0xEBBF) {
        // Subtract 0xC140 from Shift JIS value
        value -= 0xC140;
      } else {
        throw new Error('Invalid SJIS character: ' + this.data[i] + '\n' + 'Make sure your charset is UTF-8');
      }

      // Multiply most significant byte of result by 0xC0
      // and add least significant byte to product
      value = (value >>> 8 & 0xff) * 0xC0 + (value & 0xff);

      // Convert result to a 13-bit binary string
      bitBuffer.put(value, 13);
    }
  };
  module.exports = KanjiData;
},1097,[1089,1077]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  /******************************************************************************
   * Created 2008-08-19.
   *
   * Dijkstra path-finding functions. Adapted from the Dijkstar Python project.
   *
   * Copyright (C) 2008
   *   Wyatt Baldwin <self@wyattbaldwin.com>
   *   All rights reserved
   *
   * Licensed under the MIT license.
   *
   *   http://www.opensource.org/licenses/mit-license.php
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
   * THE SOFTWARE.
   *****************************************************************************/
  var dijkstra = {
    single_source_shortest_paths: function (graph, s, d) {
      // Predecessor map for each node that has been encountered.
      // node ID => predecessor node ID
      var predecessors = {};

      // Costs of shortest paths from s to all nodes encountered.
      // node ID => cost
      var costs = {};
      costs[s] = 0;

      // Costs of shortest paths from s to all nodes encountered; differs from
      // `costs` in that it provides easy access to the node that currently has
      // the known shortest path from s.
      // XXX: Do we actually need both `costs` and `open`?
      var open = dijkstra.PriorityQueue.make();
      open.push(s, 0);
      var closest, u, v, cost_of_s_to_u, adjacent_nodes, cost_of_e, cost_of_s_to_u_plus_cost_of_e, cost_of_s_to_v, first_visit;
      while (!open.empty()) {
        // In the nodes remaining in graph that have a known cost from s,
        // find the node, u, that currently has the shortest path from s.
        closest = open.pop();
        u = closest.value;
        cost_of_s_to_u = closest.cost;

        // Get nodes adjacent to u...
        adjacent_nodes = graph[u] || {};

        // ...and explore the edges that connect u to those nodes, updating
        // the cost of the shortest paths to any or all of those nodes as
        // necessary. v is the node across the current edge from u.
        for (v in adjacent_nodes) {
          if (adjacent_nodes.hasOwnProperty(v)) {
            // Get the cost of the edge running from u to v.
            cost_of_e = adjacent_nodes[v];

            // Cost of s to u plus the cost of u to v across e--this is *a*
            // cost from s to v that may or may not be less than the current
            // known cost to v.
            cost_of_s_to_u_plus_cost_of_e = cost_of_s_to_u + cost_of_e;

            // If we haven't visited v yet OR if the current known cost from s to
            // v is greater than the new cost we just found (cost of s to u plus
            // cost of u to v across e), update v's cost in the cost list and
            // update v's predecessor in the predecessor list (it's now u).
            cost_of_s_to_v = costs[v];
            first_visit = typeof costs[v] === 'undefined';
            if (first_visit || cost_of_s_to_v > cost_of_s_to_u_plus_cost_of_e) {
              costs[v] = cost_of_s_to_u_plus_cost_of_e;
              open.push(v, cost_of_s_to_u_plus_cost_of_e);
              predecessors[v] = u;
            }
          }
        }
      }
      if (typeof d !== 'undefined' && typeof costs[d] === 'undefined') {
        var msg = ['Could not find a path from ', s, ' to ', d, '.'].join('');
        throw new Error(msg);
      }
      return predecessors;
    },
    extract_shortest_path_from_predecessor_list: function (predecessors, d) {
      var nodes = [];
      var u = d;
      var predecessor;
      while (u) {
        nodes.push(u);
        predecessor = predecessors[u];
        u = predecessors[u];
      }
      nodes.reverse();
      return nodes;
    },
    find_path: function (graph, s, d) {
      var predecessors = dijkstra.single_source_shortest_paths(graph, s, d);
      return dijkstra.extract_shortest_path_from_predecessor_list(predecessors, d);
    },
    /**
     * A very naive priority queue implementation.
     */
    PriorityQueue: {
      make: function (opts) {
        var T = dijkstra.PriorityQueue,
          t = {},
          key;
        opts = opts || {};
        for (key in T) {
          if (T.hasOwnProperty(key)) {
            t[key] = T[key];
          }
        }
        t.queue = [];
        t.sorter = opts.sorter || T.default_sorter;
        return t;
      },
      default_sorter: function (a, b) {
        return a.cost - b.cost;
      },
      /**
       * Add a new item to the queue and ensure the highest priority element
       * is at the front of the queue.
       */
      push: function (value, cost) {
        var item = {
          value: value,
          cost: cost
        };
        this.queue.push(item);
        this.queue.sort(this.sorter);
      },
      /**
       * Return the highest priority element in the queue.
       */
      pop: function () {
        return this.queue.shift();
      },
      empty: function () {
        return this.queue.length === 0;
      }
    }
  };

  // node.js module exports
  if (typeof module !== 'undefined') {
    module.exports = dijkstra;
  }
},1098,[]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  const Utils = require(_dependencyMap[0]);
  function clearCanvas(ctx, canvas, size) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (!canvas.style) canvas.style = {};
    canvas.height = size;
    canvas.width = size;
    canvas.style.height = size + 'px';
    canvas.style.width = size + 'px';
  }
  function getCanvasElement() {
    try {
      return document.createElement('canvas');
    } catch (e) {
      throw new Error('You need to specify a canvas element');
    }
  }
  exports.render = function render(qrData, canvas, options) {
    let opts = options;
    let canvasEl = canvas;
    if (typeof opts === 'undefined' && (!canvas || !canvas.getContext)) {
      opts = canvas;
      canvas = undefined;
    }
    if (!canvas) {
      canvasEl = getCanvasElement();
    }
    opts = Utils.getOptions(opts);
    const size = Utils.getImageWidth(qrData.modules.size, opts);
    const ctx = canvasEl.getContext('2d');
    const image = ctx.createImageData(size, size);
    Utils.qrToImageData(image.data, qrData, opts);
    clearCanvas(ctx, canvasEl, size);
    ctx.putImageData(image, 0, 0);
    return canvasEl;
  };
  exports.renderToDataURL = function renderToDataURL(qrData, canvas, options) {
    let opts = options;
    if (typeof opts === 'undefined' && (!canvas || !canvas.getContext)) {
      opts = canvas;
      canvas = undefined;
    }
    if (!opts) opts = {};
    const canvasEl = exports.render(qrData, canvas, opts);
    const type = opts.type || 'image/png';
    const rendererOpts = opts.rendererOpts || {};
    return canvasEl.toDataURL(type, rendererOpts.quality);
  };
},1099,[1100]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  function hex2rgba(hex) {
    if (typeof hex === 'number') {
      hex = hex.toString();
    }
    if (typeof hex !== 'string') {
      throw new Error('Color should be defined as hex string');
    }
    let hexCode = hex.slice().replace('#', '').split('');
    if (hexCode.length < 3 || hexCode.length === 5 || hexCode.length > 8) {
      throw new Error('Invalid hex color: ' + hex);
    }

    // Convert from short to long form (fff -> ffffff)
    if (hexCode.length === 3 || hexCode.length === 4) {
      hexCode = Array.prototype.concat.apply([], hexCode.map(function (c) {
        return [c, c];
      }));
    }

    // Add default alpha value
    if (hexCode.length === 6) hexCode.push('F', 'F');
    const hexValue = parseInt(hexCode.join(''), 16);
    return {
      r: hexValue >> 24 & 255,
      g: hexValue >> 16 & 255,
      b: hexValue >> 8 & 255,
      a: hexValue & 255,
      hex: '#' + hexCode.slice(0, 6).join('')
    };
  }
  exports.getOptions = function getOptions(options) {
    if (!options) options = {};
    if (!options.color) options.color = {};
    const margin = typeof options.margin === 'undefined' || options.margin === null || options.margin < 0 ? 4 : options.margin;
    const width = options.width && options.width >= 21 ? options.width : undefined;
    const scale = options.scale || 4;
    return {
      width: width,
      scale: width ? 4 : scale,
      margin: margin,
      color: {
        dark: hex2rgba(options.color.dark || '#000000ff'),
        light: hex2rgba(options.color.light || '#ffffffff')
      },
      type: options.type,
      rendererOpts: options.rendererOpts || {}
    };
  };
  exports.getScale = function getScale(qrSize, opts) {
    return opts.width && opts.width >= qrSize + opts.margin * 2 ? opts.width / (qrSize + opts.margin * 2) : opts.scale;
  };
  exports.getImageWidth = function getImageWidth(qrSize, opts) {
    const scale = exports.getScale(qrSize, opts);
    return Math.floor((qrSize + opts.margin * 2) * scale);
  };
  exports.qrToImageData = function qrToImageData(imgData, qr, opts) {
    const size = qr.modules.size;
    const data = qr.modules.data;
    const scale = exports.getScale(size, opts);
    const symbolSize = Math.floor((size + opts.margin * 2) * scale);
    const scaledMargin = opts.margin * scale;
    const palette = [opts.color.light, opts.color.dark];
    for (let i = 0; i < symbolSize; i++) {
      for (let j = 0; j < symbolSize; j++) {
        let posDst = (i * symbolSize + j) * 4;
        let pxColor = opts.color.light;
        if (i >= scaledMargin && j >= scaledMargin && i < symbolSize - scaledMargin && j < symbolSize - scaledMargin) {
          const iSrc = Math.floor((i - scaledMargin) / scale);
          const jSrc = Math.floor((j - scaledMargin) / scale);
          pxColor = palette[data[iSrc * size + jSrc] ? 1 : 0];
        }
        imgData[posDst++] = pxColor.r;
        imgData[posDst++] = pxColor.g;
        imgData[posDst++] = pxColor.b;
        imgData[posDst] = pxColor.a;
      }
    }
  };
},1100,[]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  const Utils = require(_dependencyMap[0]);
  function getColorAttrib(color, attrib) {
    const alpha = color.a / 255;
    const str = attrib + '="' + color.hex + '"';
    return alpha < 1 ? str + ' ' + attrib + '-opacity="' + alpha.toFixed(2).slice(1) + '"' : str;
  }
  function svgCmd(cmd, x, y) {
    let str = cmd + x;
    if (typeof y !== 'undefined') str += ' ' + y;
    return str;
  }
  function qrToPath(data, size, margin) {
    let path = '';
    let moveBy = 0;
    let newRow = false;
    let lineLength = 0;
    for (let i = 0; i < data.length; i++) {
      const col = Math.floor(i % size);
      const row = Math.floor(i / size);
      if (!col && !newRow) newRow = true;
      if (data[i]) {
        lineLength++;
        if (!(i > 0 && col > 0 && data[i - 1])) {
          path += newRow ? svgCmd('M', col + margin, 0.5 + row + margin) : svgCmd('m', moveBy, 0);
          moveBy = 0;
          newRow = false;
        }
        if (!(col + 1 < size && data[i + 1])) {
          path += svgCmd('h', lineLength);
          lineLength = 0;
        }
      } else {
        moveBy++;
      }
    }
    return path;
  }
  exports.render = function render(qrData, options, cb) {
    const opts = Utils.getOptions(options);
    const size = qrData.modules.size;
    const data = qrData.modules.data;
    const qrcodesize = size + opts.margin * 2;
    const bg = !opts.color.light.a ? '' : '<path ' + getColorAttrib(opts.color.light, 'fill') + ' d="M0 0h' + qrcodesize + 'v' + qrcodesize + 'H0z"/>';
    const path = '<path ' + getColorAttrib(opts.color.dark, 'stroke') + ' d="' + qrToPath(data, size, opts.margin) + '"/>';
    const viewBox = "viewBox=\"0 0 " + qrcodesize + ' ' + qrcodesize + '"';
    const width = !opts.width ? '' : 'width="' + opts.width + '" height="' + opts.width + '" ';
    const svgTag = '<svg xmlns="http://www.w3.org/2000/svg" ' + width + viewBox + ' shape-rendering="crispEdges">' + bg + path + '</svg>\n';
    if (typeof cb === 'function') {
      cb(null, svgTag);
    }
    return svgTag;
  };
},1101,[1100]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return _default;
    }
  });
  var _default = (matrix, size) => {
    const cellSize = size / matrix.length;
    let path = '';
    matrix.forEach((row, i) => {
      let needDraw = false;
      row.forEach((column, j) => {
        if (column) {
          if (!needDraw) {
            path += `M${cellSize * j} ${cellSize / 2 + cellSize * i} `;
            needDraw = true;
          }
          if (needDraw && j === matrix.length - 1) {
            path += `L${cellSize * (j + 1)} ${cellSize / 2 + cellSize * i} `;
          }
        } else {
          if (needDraw) {
            path += `L${cellSize * j} ${cellSize / 2 + cellSize * i} `;
            needDraw = false;
          }
        }
      });
    });
    return {
      cellSize,
      path
    };
  };
},1102,[]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return _default;
    }
  });
  require(_dependencyMap[0]);
  var _reactNativeSvg = require(_dependencyMap[1]);
  var _utils = require(_dependencyMap[2]);
  var _reactJsxRuntime = require(_dependencyMap[3]);
  const LogoSVG = ({
    svg,
    logoSize,
    logoColor
  }) => {
    if ((0, _utils.isString)(svg)) {
      const href = (0, _utils.isUrlString)(svg) ? svg : `data:image/svg+xml;base64,${window.btoa(svg)}`;
      return /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_reactNativeSvg.Image, {
        href: encodeURI(href),
        width: logoSize,
        height: logoSize
      });
    }

    // if `svg` prop is actually a svg asset wrapped in a React component, then we can just render it
    const LogoSVGComponent = svg;
    return /*#__PURE__*/(0, _reactJsxRuntime.jsx)(LogoSVGComponent, {
      fill: logoColor,
      width: logoSize,
      height: logoSize
    });
  };
  var _default = LogoSVG;
},1103,[6,1112,1104,97]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  exports.isString = isString;
  exports.isUrlString = isUrlString;
  function isString(variable) {
    return typeof variable === 'string';
  }
  function isUrlString(variable) {
    return isString(variable) && variable.startsWith('http');
  }
},1104,[]);