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
  var _servicesShared = require(_dependencyMap[0]);
  var _databaseUseNews = require(_dependencyMap[1]);
  var _storesAccount = require(_dependencyMap[2]);
  var _storesAccountTypes = require(_dependencyMap[3]);
  var _uiComponentsStack = require(_dependencyMap[4]);
  var Stack = _interopDefault(_uiComponentsStack);
  var _uiComponentsTypography = require(_dependencyMap[5]);
  var TypographyLegacy = _interopDefault(_uiComponentsTypography);
  var _expoRouter = require(_dependencyMap[6]);
  var _react = require(_dependencyMap[7]);
  var _reactNativeWebDistExportsLinking = require(_dependencyMap[8]);
  var Linking = _interopDefault(_reactNativeWebDistExportsLinking);
  require(_dependencyMap[9]);
  var _reactNativeWebDistExportsScrollView = require(_dependencyMap[10]);
  var ScrollView = _interopDefault(_reactNativeWebDistExportsScrollView);
  var _reactNativeWebDistExportsStyleSheet = require(_dependencyMap[11]);
  var StyleSheet = _interopDefault(_reactNativeWebDistExportsStyleSheet);
  var _reactNativeWebDistExportsView = require(_dependencyMap[12]);
  var View = _interopDefault(_reactNativeWebDistExportsView);
  var _skolengojs = require(_dependencyMap[13]);
  var _reactNativeHtmlview = require(_dependencyMap[14]);
  var HTMLView = _interopDefault(_reactNativeHtmlview);
  var _expoRouterReactNavigation = require(_dependencyMap[15]);
  var _uiComponentsNativeHeader = require(_dependencyMap[16]);
  var _uiComponentsIcon = require(_dependencyMap[17]);
  var Icon = _interopDefault(_uiComponentsIcon);
  var _i18next = require(_dependencyMap[18]);
  var _uiComponentsList = require(_dependencyMap[19]);
  var ListLegacy = _interopDefault(_uiComponentsList);
  var _uiComponentsItem = require(_dependencyMap[20]);
  var Item = _interopDefault(_uiComponentsItem);
  var _reactNativeSafeAreaContext = require(_dependencyMap[21]);
  var _utilsNewsCleanUpHTMLNews = require(_dependencyMap[22]);
  var _uiComponentsAvatar = require(_dependencyMap[23]);
  var Avatar = _interopDefault(_uiComponentsAvatar);
  var _utilsChatsInitials = require(_dependencyMap[24]);
  var _uiUtilsIsLiquidGlass = require(_dependencyMap[25]);
  var _getpapillonPapicons = require(_dependencyMap[26]);
  var _utilsNewsGetAttachmentIcon = require(_dependencyMap[27]);
  var _uiNewList = require(_dependencyMap[28]);
  var List = _interopDefault(_uiNewList);
  var _uiNewTypography = require(_dependencyMap[29]);
  var Typography = _interopDefault(_uiNewTypography);
  var _utilsThemeFonts = require(_dependencyMap[30]);
  var _uiComponentsActivityIndicator = require(_dependencyMap[31]);
  var ActivityIndicator = _interopDefault(_uiComponentsActivityIndicator);
  var _uiComponentsSafeHorizontalView = require(_dependencyMap[32]);
  var SafeHorizontalView = _interopDefault(_uiComponentsSafeHorizontalView);
  var _reactJsxRuntime = require(_dependencyMap[33]);
  const NewsPage = () => {
    const {
      id
    } = (0, _expoRouter.useLocalSearchParams)();
    const [news, setNews] = (0, _react.useState)();
    const [loading, setLoading] = (0, _react.useState)(true);
    const insets = (0, _reactNativeSafeAreaContext.useSafeAreaInsets)();
    const router = (0, _expoRouter.useRouter)();
    const {
      colors
    } = (0, _expoRouterReactNavigation.useTheme)();
    const font = (0, _utilsThemeFonts.useFont)();
    const [HTMLCleanupEnabled, setHTMLCleanupEnabled] = (0, _react.useState)(true);
    (0, _react.useEffect)(() => {
      let cancelled = false;
      setLoading(true);
      (0, _databaseUseNews.getNewsById)(id).then(result => {
        if (!cancelled) setNews(result);
      }).finally(() => {
        if (!cancelled) setLoading(false);
      });
      return () => {
        cancelled = true;
      };
    }, [id]);
    (0, _react.useEffect)(() => {
      if (!news) return;
      const acknowledgeNews = async () => {
        if (!news.acknowledged) {
          const manager = (0, _servicesShared.getManager)();
          const store = _storesAccount.useAccountStore.getState();
          const account = store.accounts.find(account => account.id === store.lastUsedAccount);
          const service = account?.services.find(service => service.id === news.createdByAccount);
          if (service?.serviceId === _storesAccountTypes.Services.SKOLENGO) {
            const attachment = new _skolengojs.Attachment("", "", "");
            news.ref = new _skolengojs.News(news.id, news.createdAt, news.title ?? "", news.content, news.content, {
              id: "",
              name: ""
            }, "", attachment);
          }
          await manager?.setNewsAsDone(news);
        }
      };
      acknowledgeNews();
    }, [news]);
    const stylesheet = StyleSheet.default.create({
      ..._uiComponentsTypography.VARIANTS,
      p: {
        ..._uiComponentsTypography.VARIANTS.body1,
        fontFamily: font("medium"),
        color: colors.text
      },
      div: {
        ..._uiComponentsTypography.VARIANTS.body1,
        fontFamily: font("medium"),
        color: colors.text
      },
      a: {
        color: colors.primary,
        textDecorationLine: 'underline'
      },
      ul: {
        ..._uiComponentsTypography.VARIANTS.body1,
        fontFamily: font("medium"),
        paddingHorizontal: 4,
        color: colors.text
      }
    });
    if (loading) {
      return /*#__PURE__*/(0, _reactJsxRuntime.jsx)(View.default, {
        style: {
          flex: 1,
          alignItems: "center",
          justifyContent: "center"
        },
        children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(ActivityIndicator.default, {})
      });
    }
    if (!news) {
      return /*#__PURE__*/(0, _reactJsxRuntime.jsx)(View.default, {
        style: {
          flex: 1,
          alignItems: "center",
          justifyContent: "center"
        },
        children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
          variant: "title",
          children: (0, _i18next.t)("News_Empty_Title")
        })
      });
    }
    const cleanedContent = HTMLCleanupEnabled ? (0, _utilsNewsCleanUpHTMLNews.cleanHtmlForArticle)(news.content) : news.content;
    return /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(ScrollView.default, {
      contentInsetAdjustmentBehavior: "automatic",
      style: {
        flex: 1
      },
      contentContainerStyle: {
        paddingTop: 20,
        paddingBottom: 20 + insets.bottom
      },
      children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_uiComponentsNativeHeader.NativeHeaderSide, {
        side: "Left",
        children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoRouterReactNavigation.HeaderBackButton, {
          tintColor: _uiUtilsIsLiquidGlass.runsIOS26 ? colors.text : colors.primary,
          onPress: () => router.back(),
          style: {
            marginLeft: 0
          }
        })
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(SafeHorizontalView.default, {
        base: 20,
        style: {
          gap: 24
        },
        children: [/*#__PURE__*/(0, _reactJsxRuntime.jsxs)(Stack.default, {
          gap: 10,
          children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Stack.default, {
            padding: [10, 4],
            radius: 200,
            backgroundColor: colors.text + "16",
            children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(TypographyLegacy.default, {
              variant: "body2",
              children: news.category
            })
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(TypographyLegacy.default, {
            variant: "h3",
            children: news.title
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(Stack.default, {
            direction: "horizontal",
            hAlign: "center",
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsxs)(Stack.default, {
              direction: "horizontal",
              gap: 8,
              inline: true,
              flex: true,
              hAlign: "center",
              children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Avatar.default, {
                initials: (0, _utilsChatsInitials.getInitials)(news.author),
                size: 28
              }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(TypographyLegacy.default, {
                nowrap: true,
                variant: "body2",
                children: news.author
              })]
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(TypographyLegacy.default, {
              nowrap: true,
              variant: "body2",
              color: "secondary",
              children: new Date(news.createdAt).toLocaleDateString(undefined, {
                day: '2-digit',
                month: 'short',
                year: 'numeric'
              })
            })]
          })]
        }), news.question && /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default, {
          scrollEnabled: false,
          children: /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(List.default.Item, {
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default.Leading, {
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Icon.default, {
                children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
                  name: "pie"
                })
              })
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "title",
              children: "Cette actualit\xE9 contient un sondage"
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              variant: "body1",
              color: "textSecondary",
              children: "PRONOTE ne nous permet pas d'afficher les sondages pour le moment."
            })]
          })
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(HTMLView.default, {
          value: cleanedContent,
          stylesheet: stylesheet,
          style: {
            gap: 12
          },
          paragraphBreak: "",
          bullet: "  \u2022  "
        }), news.attachments.length > 0 && /*#__PURE__*/(0, _reactJsxRuntime.jsx)(ListLegacy.default, {
          children: news.attachments.map((attachment, index) => /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(Item.default, {
            onPress: () => Linking.default.openURL(attachment.url),
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_uiComponentsItem.Leading, {
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Icon.default, {
                size: 28,
                children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
                  name: (0, _utilsNewsGetAttachmentIcon.getAttachmentIcon)(attachment)
                })
              })
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(TypographyLegacy.default, {
              variant: "title",
              children: attachment.name
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(TypographyLegacy.default, {
              variant: "body1",
              nowrap: true,
              color: "secondary",
              children: attachment.url
            })]
          }, index))
        }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(Stack.default, {
          gap: 0,
          style: {
            opacity: 0.4
          },
          children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(TypographyLegacy.default, {
            variant: "caption",
            children: "Si cette actualit\xE9 ne s'affiche pas correctement,"
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(TypographyLegacy.default, {
            variant: "caption",
            style: {
              textDecorationLine: 'underline'
            },
            onPress: () => setHTMLCleanupEnabled(!HTMLCleanupEnabled),
            children: [HTMLCleanupEnabled ? "désactiver" : "activer", " le formattage automatique"]
          })]
        })]
      })]
    });
  };
  var _default = NewsPage;
},861,[1118,1133,1022,1109,1005,1110,1023,6,310,193,222,117,198,1213,1143,1000,1214,1013,1140,1122,1123,360,1212,1135,1139,1215,1002,1216,1007,1008,1217,1129,1111,97]);
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
  var _HTMLView = require(_dependencyMap[0]);
  var HTMLView = _interopDefault(_HTMLView);
  var _default = HTMLView.default;
},1143,[1144]);
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
  var _propTypes = require(_dependencyMap[1]);
  var PropTypes = _interopDefault(_propTypes);
  var _htmlToElement = require(_dependencyMap[2]);
  var htmlToElement = _interopDefault(_htmlToElement);
  var _reactNativeWebDistExportsLinking = require(_dependencyMap[3]);
  var Linking = _interopDefault(_reactNativeWebDistExportsLinking);
  require(_dependencyMap[4]);
  var _reactNativeWebDistExportsStyleSheet = require(_dependencyMap[5]);
  var StyleSheet = _interopDefault(_reactNativeWebDistExportsStyleSheet);
  var _reactNativeWebDistExportsView = require(_dependencyMap[6]);
  var View = _interopDefault(_reactNativeWebDistExportsView);
  var _deprecatedReactNativePropTypes = require(_dependencyMap[7]);
  var _reactJsxRuntime = require(_dependencyMap[8]);
  const boldStyle = {
    fontWeight: 'bold'
  };
  const italicStyle = {
    fontStyle: 'italic'
  };
  const underlineStyle = {
    textDecorationLine: 'underline'
  };
  const strikethroughStyle = {
    textDecorationLine: 'line-through'
  };
  const codeStyle = {
    fontFamily: 'monospace'
  };
  const baseStyles = StyleSheet.default.create({
    b: boldStyle,
    strong: boldStyle,
    i: italicStyle,
    em: italicStyle,
    u: underlineStyle,
    s: strikethroughStyle,
    strike: strikethroughStyle,
    pre: codeStyle,
    code: codeStyle,
    a: {
      fontWeight: 'bold',
      color: '#007AFF'
    },
    h1: {
      fontWeight: 'bold',
      fontSize: 36
    },
    h2: {
      fontWeight: 'bold',
      fontSize: 30
    },
    h3: {
      fontWeight: 'bold',
      fontSize: 24
    },
    h4: {
      fontWeight: 'bold',
      fontSize: 18
    },
    h5: {
      fontWeight: 'bold',
      fontSize: 14
    },
    h6: {
      fontWeight: 'bold',
      fontSize: 12
    }
  });
  const htmlToElementOptKeys = ['lineBreak', 'paragraphBreak', 'bullet', 'TextComponent', 'textComponentProps', 'NodeComponent', 'nodeComponentProps'];
  class HtmlView extends _react.PureComponent {
    constructor() {
      super();
      this.state = {
        element: null
      };
    }
    componentDidMount() {
      this.mounted = true;
      this.startHtmlRender(this.props.value);
    }
    componentDidUpdate(prevProps) {
      if (this.props.value !== prevProps.value || this.props.stylesheet !== prevProps.stylesheet || this.props.textComponentProps !== prevProps.textComponentProps || this.props.nodeComponentProps !== prevProps.nodeComponentProps) {
        this.startHtmlRender(this.props.value, this.props.stylesheet, this.props.textComponentProps, this.props.nodeComponentProps);
      }
    }
    componentWillUnmount() {
      this.mounted = false;
    }
    startHtmlRender(value, style, textComponentProps, nodeComponentProps) {
      const {
        addLineBreaks,
        onLinkPress,
        onLinkLongPress,
        stylesheet,
        renderNode,
        onError
      } = this.props;
      if (!value) {
        this.setState({
          element: null
        });
      }
      const opts = {
        addLineBreaks,
        linkHandler: onLinkPress,
        linkLongPressHandler: onLinkLongPress,
        styles: {
          ...baseStyles,
          ...stylesheet,
          ...style
        },
        customRenderer: renderNode
      };
      htmlToElementOptKeys.forEach(key => {
        if (typeof this.props[key] !== 'undefined') {
          opts[key] = this.props[key];
        }
      });
      if (textComponentProps) {
        opts.textComponentProps = textComponentProps;
      }
      if (nodeComponentProps) {
        opts.nodeComponentProps = nodeComponentProps;
      }
      (0, htmlToElement.default)(value, opts, (err, element) => {
        if (err) {
          onError(err);
        }
        if (this.mounted) {
          this.setState({
            element
          });
        }
      });
    }
    render() {
      const {
        RootComponent,
        style
      } = this.props;
      const {
        element
      } = this.state;
      if (element) {
        return /*#__PURE__*/(0, _reactJsxRuntime.jsx)(RootComponent, {
          ...this.props.rootComponentProps,
          style: style,
          children: element
        });
      }
      return /*#__PURE__*/(0, _reactJsxRuntime.jsx)(RootComponent, {
        ...this.props.rootComponentProps,
        style: style
      });
    }
  }
  HtmlView.propTypes = {
    addLineBreaks: PropTypes.default.bool,
    bullet: PropTypes.default.string,
    lineBreak: PropTypes.default.string,
    NodeComponent: PropTypes.default.func,
    nodeComponentProps: PropTypes.default.object,
    onError: PropTypes.default.func,
    onLinkPress: PropTypes.default.func,
    onLinkLongPress: PropTypes.default.func,
    paragraphBreak: PropTypes.default.string,
    renderNode: PropTypes.default.func,
    RootComponent: PropTypes.default.func,
    rootComponentProps: PropTypes.default.object,
    style: _deprecatedReactNativePropTypes.ViewPropTypes.style,
    stylesheet: PropTypes.default.object,
    TextComponent: PropTypes.default.func,
    textComponentProps: PropTypes.default.object,
    value: PropTypes.default.string
  };
  HtmlView.defaultProps = {
    addLineBreaks: true,
    onLinkPress: url => Linking.default.openURL(url),
    onLinkLongPress: null,
    onError: console.error.bind(console),
    RootComponent: element => /*#__PURE__*/(0, _reactJsxRuntime.jsx)(View.default, {
      ...element
    }) // eslint-disable-line react/display-name
  };
  var _default = HtmlView;
},1144,[6,1145,1148,310,193,117,198,1193,97]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  /**
   * Copyright (c) 2013-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  {
    // By explicitly using `prop-types` you are opting into new production behavior.
    // http://fb.me/prop-types-in-prod
    module.exports = require(_dependencyMap[0])();
  }
},1145,[1146]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  /**
   * Copyright (c) 2013-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  'use strict';

  var ReactPropTypesSecret = require(_dependencyMap[0]);
  function emptyFunction() {}
  function emptyFunctionWithReset() {}
  emptyFunctionWithReset.resetWarningCache = emptyFunction;
  module.exports = function () {
    function shim(props, propName, componentName, location, propFullName, secret) {
      if (secret === ReactPropTypesSecret) {
        // It is still safe when called from React.
        return;
      }
      var err = new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");
      err.name = 'Invariant Violation';
      throw err;
    }
    ;
    shim.isRequired = shim;
    function getShim() {
      return shim;
    }
    ;
    // Important!
    // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
    var ReactPropTypes = {
      array: shim,
      bigint: shim,
      bool: shim,
      func: shim,
      number: shim,
      object: shim,
      string: shim,
      symbol: shim,
      any: shim,
      arrayOf: getShim,
      element: shim,
      elementType: shim,
      instanceOf: getShim,
      node: shim,
      objectOf: getShim,
      oneOf: getShim,
      oneOfType: getShim,
      shape: getShim,
      exact: getShim,
      checkPropTypes: emptyFunctionWithReset,
      resetWarningCache: emptyFunction
    };
    ReactPropTypes.PropTypes = ReactPropTypes;
    return ReactPropTypes;
  };
},1146,[1147]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  /**
   * Copyright (c) 2013-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  'use strict';

  var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';
  module.exports = ReactPropTypesSecret;
},1147,[]);
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
      return htmlToElement;
    }
  });
  var _react = require(_dependencyMap[0]);
  var _reactNativeWebDistExportsStyleSheet = require(_dependencyMap[1]);
  var StyleSheet = _interopDefault(_reactNativeWebDistExportsStyleSheet);
  var _reactNativeWebDistExportsText = require(_dependencyMap[2]);
  var Text = _interopDefault(_reactNativeWebDistExportsText);
  var _htmlparser2WithoutNodeNative = require(_dependencyMap[3]);
  var htmlparser = _interopDefault(_htmlparser2WithoutNodeNative);
  var _entities = require(_dependencyMap[4]);
  var entities = _interopDefault(_entities);
  var _AutoSizedImage = require(_dependencyMap[5]);
  var AutoSizedImage = _interopDefault(_AutoSizedImage);
  var _reactJsxRuntime = require(_dependencyMap[6]);
  const defaultOpts = {
    lineBreak: '\n',
    paragraphBreak: '\n\n',
    bullet: '\u2022 ',
    TextComponent: Text.default,
    textComponentProps: null,
    NodeComponent: Text.default,
    nodeComponentProps: null
  };
  const Img = props => {
    const width = parseInt(props.attribs['width'], 10) || parseInt(props.attribs['data-width'], 10) || 0;
    const height = parseInt(props.attribs['height'], 10) || parseInt(props.attribs['data-height'], 10) || 0;
    const imgStyle = {
      width,
      height
    };
    const source = {
      uri: props.attribs.src,
      width,
      height
    };
    return /*#__PURE__*/(0, _reactJsxRuntime.jsx)(AutoSizedImage.default, {
      source: source,
      style: imgStyle
    });
  };
  function htmlToElement(rawHtml, customOpts = {}, done) {
    const opts = {
      ...defaultOpts,
      ...customOpts
    };
    function inheritedStyle(parent) {
      if (!parent) return null;
      const style = StyleSheet.default.flatten(opts.styles[parent.name]) || {};
      const parentStyle = inheritedStyle(parent.parent) || {};
      return {
        ...parentStyle,
        ...style
      };
    }
    function domToElement(dom, parent) {
      if (!dom) return null;
      const renderNode = opts.customRenderer;
      let orderedListCounter = 1;
      return dom.map((node, index, list) => {
        if (renderNode) {
          const rendered = renderNode(node, index, list, parent, domToElement);
          if (rendered || rendered === null) return rendered;
        }
        const {
          TextComponent
        } = opts;
        if (node.type === 'text') {
          const defaultStyle = opts.textComponentProps ? opts.textComponentProps.style : null;
          const customStyle = inheritedStyle(parent);
          return /*#__PURE__*/(0, _react.createElement)(TextComponent, {
            ...opts.textComponentProps,
            key: index,
            style: [defaultStyle, customStyle]
          }, entities.default.decodeHTML(node.data));
        }
        if (node.type === 'tag') {
          if (node.name === 'img') {
            return /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Img, {
              attribs: node.attribs
            }, index);
          }
          let linkPressHandler = null;
          let linkLongPressHandler = null;
          if (node.name === 'a' && node.attribs && node.attribs.href) {
            linkPressHandler = () => opts.linkHandler(entities.default.decodeHTML(node.attribs.href));
            if (opts.linkLongPressHandler) {
              linkLongPressHandler = () => opts.linkLongPressHandler(entities.default.decodeHTML(node.attribs.href));
            }
          }
          let linebreakBefore = null;
          let linebreakAfter = null;
          if (opts.addLineBreaks) {
            switch (node.name) {
              case 'pre':
                linebreakBefore = opts.lineBreak;
                break;
              case 'p':
                if (index < list.length - 1) {
                  linebreakAfter = opts.paragraphBreak;
                }
                break;
              case 'br':
              case 'h1':
              case 'h2':
              case 'h3':
              case 'h4':
              case 'h5':
                linebreakAfter = opts.lineBreak;
                break;
            }
          }
          let listItemPrefix = null;
          if (node.name === 'li') {
            const defaultStyle = opts.textComponentProps ? opts.textComponentProps.style : null;
            const customStyle = inheritedStyle(parent);
            if (!parent) {
              listItemPrefix = null;
            } else if (parent.name === 'ol') {
              listItemPrefix = /*#__PURE__*/(0, _reactJsxRuntime.jsx)(TextComponent, {
                style: [defaultStyle, customStyle],
                children: `${orderedListCounter++}. `
              });
            } else if (parent.name === 'ul') {
              listItemPrefix = /*#__PURE__*/(0, _reactJsxRuntime.jsx)(TextComponent, {
                style: [defaultStyle, customStyle],
                children: opts.bullet
              });
            }
            if (opts.addLineBreaks && index < list.length - 1) {
              linebreakAfter = opts.lineBreak;
            }
          }
          const {
            NodeComponent,
            styles
          } = opts;
          return /*#__PURE__*/(0, _react.createElement)(NodeComponent, {
            ...opts.nodeComponentProps,
            key: index,
            onPress: linkPressHandler,
            style: !node.parent ? styles[node.name] : null,
            onLongPress: linkLongPressHandler
          }, linebreakBefore, listItemPrefix, domToElement(node.children, node), linebreakAfter);
        }
      });
    }
    const handler = new htmlparser.default.DomHandler(function (err, dom) {
      if (err) done(err);
      done(null, domToElement(dom));
    });
    const parser = new htmlparser.default.Parser(handler);
    parser.write(rawHtml);
    parser.done();
  }
},1148,[6,117,277,1149,1184,1192,97]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var Parser = require(_dependencyMap[0]),
    DomHandler = require(_dependencyMap[1]);
  function defineProp(name, value) {
    delete module.exports[name];
    module.exports[name] = value;
    return value;
  }
  module.exports = {
    Parser: Parser,
    Tokenizer: require(_dependencyMap[2]),
    ElementType: require(_dependencyMap[3]),
    DomHandler: DomHandler,
    get FeedHandler() {
      return defineProp("FeedHandler", require(_dependencyMap[4]));
    },
    get ProxyHandler() {
      return defineProp("ProxyHandler", require(_dependencyMap[5]));
    },
    get DomUtils() {
      return defineProp("DomUtils", require(_dependencyMap[6]));
    },
    get CollectingHandler() {
      return defineProp("CollectingHandler", require(_dependencyMap[7]));
    },
    // For legacy support
    DefaultHandler: DomHandler,
    get RssHandler() {
      return defineProp("RssHandler", this.FeedHandler);
    },
    //helper methods
    parseDOM: function (data, options) {
      var handler = new DomHandler(options);
      new Parser(handler, options).end(data);
      return handler.dom;
    },
    parseFeed: function (feed, options) {
      var handler = new module.exports.FeedHandler(options);
      new Parser(handler, options).end(feed);
      return handler.dom;
    },
    createDomStream: function (cb, options, elementCb) {
      var handler = new DomHandler(cb, options, elementCb);
      return new Parser(handler, options);
    },
    // List of all events that the parser emits
    EVENTS: {
      /* Format: eventname: number of arguments */
      attribute: 2,
      cdatastart: 0,
      cdataend: 0,
      text: 1,
      processinginstruction: 2,
      comment: 1,
      commentend: 0,
      closetag: 1,
      opentag: 2,
      opentagname: 1,
      error: 1,
      end: 0
    }
  };
},1149,[1150,1159,1151,1160,1163,1164,1165,1183]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var Tokenizer;

  /*
  	Options:
  
  	xmlMode: Disables the special behavior for script/style tags (false by default)
  	lowerCaseAttributeNames: call .toLowerCase for each attribute name (true if xmlMode is `false`)
  	lowerCaseTags: call .toLowerCase for each tag name (true if xmlMode is `false`)
  */

  /*
  	Callbacks:
  
  	oncdataend,
  	oncdatastart,
  	onclosetag,
  	oncomment,
  	oncommentend,
  	onerror,
  	onopentag,
  	onprocessinginstruction,
  	onreset,
  	ontext
  */

  var formTags = {
    input: true,
    option: true,
    optgroup: true,
    select: true,
    button: true,
    datalist: true,
    textarea: true
  };
  var openImpliesClose = {
    tr: {
      tr: true,
      th: true,
      td: true
    },
    th: {
      th: true
    },
    td: {
      thead: true,
      th: true,
      td: true
    },
    body: {
      head: true,
      link: true,
      script: true
    },
    li: {
      li: true
    },
    p: {
      p: true
    },
    h1: {
      p: true
    },
    h2: {
      p: true
    },
    h3: {
      p: true
    },
    h4: {
      p: true
    },
    h5: {
      p: true
    },
    h6: {
      p: true
    },
    select: formTags,
    input: formTags,
    output: formTags,
    button: formTags,
    datalist: formTags,
    textarea: formTags,
    option: {
      option: true
    },
    optgroup: {
      optgroup: true
    }
  };
  var voidElements = {
    __proto__: null,
    area: true,
    base: true,
    basefont: true,
    br: true,
    col: true,
    command: true,
    embed: true,
    frame: true,
    hr: true,
    img: true,
    input: true,
    isindex: true,
    keygen: true,
    link: true,
    meta: true,
    param: true,
    source: true,
    track: true,
    wbr: true,
    //common self closing svg elements
    path: true,
    circle: true,
    ellipse: true,
    line: true,
    rect: true,
    use: true,
    stop: true,
    polyline: true,
    polygon: true
  };
  var re_nameEnd = /\s|\//;
  function Parser(cbs, options) {
    this._options = options || {};
    this._cbs = cbs || {};
    this._tagname = "";
    this._attribname = "";
    this._attribvalue = "";
    this._attribs = null;
    this._stack = [];
    this.startIndex = 0;
    this.endIndex = null;
    this._lowerCaseTagNames = "lowerCaseTags" in this._options ? !!this._options.lowerCaseTags : !this._options.xmlMode;
    this._lowerCaseAttributeNames = "lowerCaseAttributeNames" in this._options ? !!this._options.lowerCaseAttributeNames : !this._options.xmlMode;
    if (this._options.Tokenizer) {
      Tokenizer = this._options.Tokenizer;
    } else {
      Tokenizer = require(_dependencyMap[0]);
    }
    this._tokenizer = new Tokenizer(this._options, this);
    if (this._cbs.onparserinit) this._cbs.onparserinit(this);
  }
  require(_dependencyMap[1])(Parser, require(_dependencyMap[2]));
  Parser.prototype._updatePosition = function (initialOffset) {
    if (this.endIndex === null) {
      if (this._tokenizer._sectionStart <= initialOffset) {
        this.startIndex = 0;
      } else {
        this.startIndex = this._tokenizer._sectionStart - initialOffset;
      }
    } else this.startIndex = this.endIndex + 1;
    this.endIndex = this._tokenizer.getAbsoluteIndex();
  };

  //Tokenizer event handlers
  Parser.prototype.ontext = function (data) {
    this._updatePosition(1);
    this.endIndex--;
    if (this._cbs.ontext) this._cbs.ontext(data);
  };
  Parser.prototype.onopentagname = function (name) {
    if (this._lowerCaseTagNames) {
      name = name.toLowerCase();
    }
    this._tagname = name;
    if (!this._options.xmlMode && name in openImpliesClose) {
      for (var el; (el = this._stack[this._stack.length - 1]) in openImpliesClose[name]; this.onclosetag(el));
    }
    if (this._options.xmlMode || !(name in voidElements)) {
      this._stack.push(name);
    }
    if (this._cbs.onopentagname) this._cbs.onopentagname(name);
    if (this._cbs.onopentag) this._attribs = {};
  };
  Parser.prototype.onopentagend = function () {
    this._updatePosition(1);
    if (this._attribs) {
      if (this._cbs.onopentag) this._cbs.onopentag(this._tagname, this._attribs);
      this._attribs = null;
    }
    if (!this._options.xmlMode && this._cbs.onclosetag && this._tagname in voidElements) {
      this._cbs.onclosetag(this._tagname);
    }
    this._tagname = "";
  };
  Parser.prototype.onclosetag = function (name) {
    this._updatePosition(1);
    if (this._lowerCaseTagNames) {
      name = name.toLowerCase();
    }
    if (this._stack.length && (!(name in voidElements) || this._options.xmlMode)) {
      var pos = this._stack.lastIndexOf(name);
      if (pos !== -1) {
        if (this._cbs.onclosetag) {
          pos = this._stack.length - pos;
          while (pos--) this._cbs.onclosetag(this._stack.pop());
        } else this._stack.length = pos;
      } else if (name === "p" && !this._options.xmlMode) {
        this.onopentagname(name);
        this._closeCurrentTag();
      }
    } else if (!this._options.xmlMode && (name === "br" || name === "p")) {
      this.onopentagname(name);
      this._closeCurrentTag();
    }
  };
  Parser.prototype.onselfclosingtag = function () {
    if (this._options.xmlMode || this._options.recognizeSelfClosing) {
      this._closeCurrentTag();
    } else {
      this.onopentagend();
    }
  };
  Parser.prototype._closeCurrentTag = function () {
    var name = this._tagname;
    this.onopentagend();

    //self-closing tags will be on the top of the stack
    //(cheaper check than in onclosetag)
    if (this._stack[this._stack.length - 1] === name) {
      if (this._cbs.onclosetag) {
        this._cbs.onclosetag(name);
      }
      this._stack.pop();
    }
  };
  Parser.prototype.onattribname = function (name) {
    if (this._lowerCaseAttributeNames) {
      name = name.toLowerCase();
    }
    this._attribname = name;
  };
  Parser.prototype.onattribdata = function (value) {
    this._attribvalue += value;
  };
  Parser.prototype.onattribend = function () {
    if (this._cbs.onattribute) this._cbs.onattribute(this._attribname, this._attribvalue);
    if (this._attribs && !Object.prototype.hasOwnProperty.call(this._attribs, this._attribname)) {
      this._attribs[this._attribname] = this._attribvalue;
    }
    this._attribname = "";
    this._attribvalue = "";
  };
  Parser.prototype._getInstructionName = function (value) {
    var idx = value.search(re_nameEnd),
      name = idx < 0 ? value : value.substr(0, idx);
    if (this._lowerCaseTagNames) {
      name = name.toLowerCase();
    }
    return name;
  };
  Parser.prototype.ondeclaration = function (value) {
    if (this._cbs.onprocessinginstruction) {
      var name = this._getInstructionName(value);
      this._cbs.onprocessinginstruction("!" + name, "!" + value);
    }
  };
  Parser.prototype.onprocessinginstruction = function (value) {
    if (this._cbs.onprocessinginstruction) {
      var name = this._getInstructionName(value);
      this._cbs.onprocessinginstruction("?" + name, "?" + value);
    }
  };
  Parser.prototype.oncomment = function (value) {
    this._updatePosition(4);
    if (this._cbs.oncomment) this._cbs.oncomment(value);
    if (this._cbs.oncommentend) this._cbs.oncommentend();
  };
  Parser.prototype.oncdata = function (value) {
    this._updatePosition(1);
    if (this._options.xmlMode || this._options.recognizeCDATA) {
      if (this._cbs.oncdatastart) this._cbs.oncdatastart();
      if (this._cbs.ontext) this._cbs.ontext(value);
      if (this._cbs.oncdataend) this._cbs.oncdataend();
    } else {
      this.oncomment("[CDATA[" + value + "]]");
    }
  };
  Parser.prototype.onerror = function (err) {
    if (this._cbs.onerror) this._cbs.onerror(err);
  };
  Parser.prototype.onend = function () {
    if (this._cbs.onclosetag) {
      for (var i = this._stack.length; i > 0; this._cbs.onclosetag(this._stack[--i]));
    }
    if (this._cbs.onend) this._cbs.onend();
  };

  //Resets the parser to a blank state, ready to parse a new HTML document
  Parser.prototype.reset = function () {
    if (this._cbs.onreset) this._cbs.onreset();
    this._tokenizer.reset();
    this._tagname = "";
    this._attribname = "";
    this._attribs = null;
    this._stack = [];
    if (this._cbs.onparserinit) this._cbs.onparserinit(this);
  };

  //Parses a complete HTML document and pushes it to the handler
  Parser.prototype.parseComplete = function (data) {
    this.reset();
    this.end(data);
  };
  Parser.prototype.write = function (chunk) {
    this._tokenizer.write(chunk);
  };
  Parser.prototype.end = function (chunk) {
    this._tokenizer.end(chunk);
  };
  Parser.prototype.pause = function () {
    this._tokenizer.pause();
  };
  Parser.prototype.resume = function () {
    this._tokenizer.resume();
  };

  //alias for backwards compat
  Parser.prototype.parseChunk = Parser.prototype.write;
  Parser.prototype.done = Parser.prototype.end;
  module.exports = Parser;
},1150,[1151,1157,1158]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  module.exports = Tokenizer;
  var decodeCodePoint = require(_dependencyMap[0]),
    entityMap = require(_dependencyMap[1]),
    legacyMap = require(_dependencyMap[2]),
    xmlMap = require(_dependencyMap[3]),
    i = 0,
    TEXT = i++,
    BEFORE_TAG_NAME = i++,
    //after <
    IN_TAG_NAME = i++,
    IN_SELF_CLOSING_TAG = i++,
    BEFORE_CLOSING_TAG_NAME = i++,
    IN_CLOSING_TAG_NAME = i++,
    AFTER_CLOSING_TAG_NAME = i++,
    //attributes
    BEFORE_ATTRIBUTE_NAME = i++,
    IN_ATTRIBUTE_NAME = i++,
    AFTER_ATTRIBUTE_NAME = i++,
    BEFORE_ATTRIBUTE_VALUE = i++,
    IN_ATTRIBUTE_VALUE_DQ = i++,
    // "
    IN_ATTRIBUTE_VALUE_SQ = i++,
    // '
    IN_ATTRIBUTE_VALUE_NQ = i++,
    //declarations
    BEFORE_DECLARATION = i++,
    // !
    IN_DECLARATION = i++,
    //processing instructions
    IN_PROCESSING_INSTRUCTION = i++,
    // ?

    //comments
    BEFORE_COMMENT = i++,
    IN_COMMENT = i++,
    AFTER_COMMENT_1 = i++,
    AFTER_COMMENT_2 = i++,
    //cdata
    BEFORE_CDATA_1 = i++,
    // [
    BEFORE_CDATA_2 = i++,
    // C
    BEFORE_CDATA_3 = i++,
    // D
    BEFORE_CDATA_4 = i++,
    // A
    BEFORE_CDATA_5 = i++,
    // T
    BEFORE_CDATA_6 = i++,
    // A
    IN_CDATA = i++,
    // [
    AFTER_CDATA_1 = i++,
    // ]
    AFTER_CDATA_2 = i++,
    // ]

    //special tags
    BEFORE_SPECIAL = i++,
    //S
    BEFORE_SPECIAL_END = i++,
    //S

    BEFORE_SCRIPT_1 = i++,
    //C
    BEFORE_SCRIPT_2 = i++,
    //R
    BEFORE_SCRIPT_3 = i++,
    //I
    BEFORE_SCRIPT_4 = i++,
    //P
    BEFORE_SCRIPT_5 = i++,
    //T
    AFTER_SCRIPT_1 = i++,
    //C
    AFTER_SCRIPT_2 = i++,
    //R
    AFTER_SCRIPT_3 = i++,
    //I
    AFTER_SCRIPT_4 = i++,
    //P
    AFTER_SCRIPT_5 = i++,
    //T

    BEFORE_STYLE_1 = i++,
    //T
    BEFORE_STYLE_2 = i++,
    //Y
    BEFORE_STYLE_3 = i++,
    //L
    BEFORE_STYLE_4 = i++,
    //E
    AFTER_STYLE_1 = i++,
    //T
    AFTER_STYLE_2 = i++,
    //Y
    AFTER_STYLE_3 = i++,
    //L
    AFTER_STYLE_4 = i++,
    //E

    BEFORE_ENTITY = i++,
    //&
    BEFORE_NUMERIC_ENTITY = i++,
    //#
    IN_NAMED_ENTITY = i++,
    IN_NUMERIC_ENTITY = i++,
    IN_HEX_ENTITY = i++,
    //X

    j = 0,
    SPECIAL_NONE = j++,
    SPECIAL_SCRIPT = j++,
    SPECIAL_STYLE = j++;
  function whitespace(c) {
    return c === " " || c === "\n" || c === "\t" || c === "\f" || c === "\r";
  }
  function characterState(char, SUCCESS) {
    return function (c) {
      if (c === char) this._state = SUCCESS;
    };
  }
  function ifElseState(upper, SUCCESS, FAILURE) {
    var lower = upper.toLowerCase();
    if (upper === lower) {
      return function (c) {
        if (c === lower) {
          this._state = SUCCESS;
        } else {
          this._state = FAILURE;
          this._index--;
        }
      };
    } else {
      return function (c) {
        if (c === lower || c === upper) {
          this._state = SUCCESS;
        } else {
          this._state = FAILURE;
          this._index--;
        }
      };
    }
  }
  function consumeSpecialNameChar(upper, NEXT_STATE) {
    var lower = upper.toLowerCase();
    return function (c) {
      if (c === lower || c === upper) {
        this._state = NEXT_STATE;
      } else {
        this._state = IN_TAG_NAME;
        this._index--; //consume the token again
      }
    };
  }
  function Tokenizer(options, cbs) {
    this._state = TEXT;
    this._buffer = "";
    this._sectionStart = 0;
    this._index = 0;
    this._bufferOffset = 0; //chars removed from _buffer
    this._baseState = TEXT;
    this._special = SPECIAL_NONE;
    this._cbs = cbs;
    this._running = true;
    this._ended = false;
    this._xmlMode = !!(options && options.xmlMode);
    this._decodeEntities = !!(options && options.decodeEntities);
  }
  Tokenizer.prototype._stateText = function (c) {
    if (c === "<") {
      if (this._index > this._sectionStart) {
        this._cbs.ontext(this._getSection());
      }
      this._state = BEFORE_TAG_NAME;
      this._sectionStart = this._index;
    } else if (this._decodeEntities && this._special === SPECIAL_NONE && c === "&") {
      if (this._index > this._sectionStart) {
        this._cbs.ontext(this._getSection());
      }
      this._baseState = TEXT;
      this._state = BEFORE_ENTITY;
      this._sectionStart = this._index;
    }
  };
  Tokenizer.prototype._stateBeforeTagName = function (c) {
    if (c === "/") {
      this._state = BEFORE_CLOSING_TAG_NAME;
    } else if (c === "<") {
      this._cbs.ontext(this._getSection());
      this._sectionStart = this._index;
    } else if (c === ">" || this._special !== SPECIAL_NONE || whitespace(c)) {
      this._state = TEXT;
    } else if (c === "!") {
      this._state = BEFORE_DECLARATION;
      this._sectionStart = this._index + 1;
    } else if (c === "?") {
      this._state = IN_PROCESSING_INSTRUCTION;
      this._sectionStart = this._index + 1;
    } else {
      this._state = !this._xmlMode && (c === "s" || c === "S") ? BEFORE_SPECIAL : IN_TAG_NAME;
      this._sectionStart = this._index;
    }
  };
  Tokenizer.prototype._stateInTagName = function (c) {
    if (c === "/" || c === ">" || whitespace(c)) {
      this._emitToken("onopentagname");
      this._state = BEFORE_ATTRIBUTE_NAME;
      this._index--;
    }
  };
  Tokenizer.prototype._stateBeforeCloseingTagName = function (c) {
    if (whitespace(c)) ;else if (c === ">") {
      this._state = TEXT;
    } else if (this._special !== SPECIAL_NONE) {
      if (c === "s" || c === "S") {
        this._state = BEFORE_SPECIAL_END;
      } else {
        this._state = TEXT;
        this._index--;
      }
    } else {
      this._state = IN_CLOSING_TAG_NAME;
      this._sectionStart = this._index;
    }
  };
  Tokenizer.prototype._stateInCloseingTagName = function (c) {
    if (c === ">" || whitespace(c)) {
      this._emitToken("onclosetag");
      this._state = AFTER_CLOSING_TAG_NAME;
      this._index--;
    }
  };
  Tokenizer.prototype._stateAfterCloseingTagName = function (c) {
    //skip everything until ">"
    if (c === ">") {
      this._state = TEXT;
      this._sectionStart = this._index + 1;
    }
  };
  Tokenizer.prototype._stateBeforeAttributeName = function (c) {
    if (c === ">") {
      this._cbs.onopentagend();
      this._state = TEXT;
      this._sectionStart = this._index + 1;
    } else if (c === "/") {
      this._state = IN_SELF_CLOSING_TAG;
    } else if (!whitespace(c)) {
      this._state = IN_ATTRIBUTE_NAME;
      this._sectionStart = this._index;
    }
  };
  Tokenizer.prototype._stateInSelfClosingTag = function (c) {
    if (c === ">") {
      this._cbs.onselfclosingtag();
      this._state = TEXT;
      this._sectionStart = this._index + 1;
    } else if (!whitespace(c)) {
      this._state = BEFORE_ATTRIBUTE_NAME;
      this._index--;
    }
  };
  Tokenizer.prototype._stateInAttributeName = function (c) {
    if (c === "=" || c === "/" || c === ">" || whitespace(c)) {
      this._cbs.onattribname(this._getSection());
      this._sectionStart = -1;
      this._state = AFTER_ATTRIBUTE_NAME;
      this._index--;
    }
  };
  Tokenizer.prototype._stateAfterAttributeName = function (c) {
    if (c === "=") {
      this._state = BEFORE_ATTRIBUTE_VALUE;
    } else if (c === "/" || c === ">") {
      this._cbs.onattribend();
      this._state = BEFORE_ATTRIBUTE_NAME;
      this._index--;
    } else if (!whitespace(c)) {
      this._cbs.onattribend();
      this._state = IN_ATTRIBUTE_NAME;
      this._sectionStart = this._index;
    }
  };
  Tokenizer.prototype._stateBeforeAttributeValue = function (c) {
    if (c === "\"") {
      this._state = IN_ATTRIBUTE_VALUE_DQ;
      this._sectionStart = this._index + 1;
    } else if (c === "'") {
      this._state = IN_ATTRIBUTE_VALUE_SQ;
      this._sectionStart = this._index + 1;
    } else if (!whitespace(c)) {
      this._state = IN_ATTRIBUTE_VALUE_NQ;
      this._sectionStart = this._index;
      this._index--; //reconsume token
    }
  };
  Tokenizer.prototype._stateInAttributeValueDoubleQuotes = function (c) {
    if (c === "\"") {
      this._emitToken("onattribdata");
      this._cbs.onattribend();
      this._state = BEFORE_ATTRIBUTE_NAME;
    } else if (this._decodeEntities && c === "&") {
      this._emitToken("onattribdata");
      this._baseState = this._state;
      this._state = BEFORE_ENTITY;
      this._sectionStart = this._index;
    }
  };
  Tokenizer.prototype._stateInAttributeValueSingleQuotes = function (c) {
    if (c === "'") {
      this._emitToken("onattribdata");
      this._cbs.onattribend();
      this._state = BEFORE_ATTRIBUTE_NAME;
    } else if (this._decodeEntities && c === "&") {
      this._emitToken("onattribdata");
      this._baseState = this._state;
      this._state = BEFORE_ENTITY;
      this._sectionStart = this._index;
    }
  };
  Tokenizer.prototype._stateInAttributeValueNoQuotes = function (c) {
    if (whitespace(c) || c === ">") {
      this._emitToken("onattribdata");
      this._cbs.onattribend();
      this._state = BEFORE_ATTRIBUTE_NAME;
      this._index--;
    } else if (this._decodeEntities && c === "&") {
      this._emitToken("onattribdata");
      this._baseState = this._state;
      this._state = BEFORE_ENTITY;
      this._sectionStart = this._index;
    }
  };
  Tokenizer.prototype._stateBeforeDeclaration = function (c) {
    this._state = c === "[" ? BEFORE_CDATA_1 : c === "-" ? BEFORE_COMMENT : IN_DECLARATION;
  };
  Tokenizer.prototype._stateInDeclaration = function (c) {
    if (c === ">") {
      this._cbs.ondeclaration(this._getSection());
      this._state = TEXT;
      this._sectionStart = this._index + 1;
    }
  };
  Tokenizer.prototype._stateInProcessingInstruction = function (c) {
    if (c === ">") {
      this._cbs.onprocessinginstruction(this._getSection());
      this._state = TEXT;
      this._sectionStart = this._index + 1;
    }
  };
  Tokenizer.prototype._stateBeforeComment = function (c) {
    if (c === "-") {
      this._state = IN_COMMENT;
      this._sectionStart = this._index + 1;
    } else {
      this._state = IN_DECLARATION;
    }
  };
  Tokenizer.prototype._stateInComment = function (c) {
    if (c === "-") this._state = AFTER_COMMENT_1;
  };
  Tokenizer.prototype._stateAfterComment1 = function (c) {
    if (c === "-") {
      this._state = AFTER_COMMENT_2;
    } else {
      this._state = IN_COMMENT;
    }
  };
  Tokenizer.prototype._stateAfterComment2 = function (c) {
    if (c === ">") {
      //remove 2 trailing chars
      this._cbs.oncomment(this._buffer.substring(this._sectionStart, this._index - 2));
      this._state = TEXT;
      this._sectionStart = this._index + 1;
    } else if (c !== "-") {
      this._state = IN_COMMENT;
    }
    // else: stay in AFTER_COMMENT_2 (`--->`)
  };
  Tokenizer.prototype._stateBeforeCdata1 = ifElseState("C", BEFORE_CDATA_2, IN_DECLARATION);
  Tokenizer.prototype._stateBeforeCdata2 = ifElseState("D", BEFORE_CDATA_3, IN_DECLARATION);
  Tokenizer.prototype._stateBeforeCdata3 = ifElseState("A", BEFORE_CDATA_4, IN_DECLARATION);
  Tokenizer.prototype._stateBeforeCdata4 = ifElseState("T", BEFORE_CDATA_5, IN_DECLARATION);
  Tokenizer.prototype._stateBeforeCdata5 = ifElseState("A", BEFORE_CDATA_6, IN_DECLARATION);
  Tokenizer.prototype._stateBeforeCdata6 = function (c) {
    if (c === "[") {
      this._state = IN_CDATA;
      this._sectionStart = this._index + 1;
    } else {
      this._state = IN_DECLARATION;
      this._index--;
    }
  };
  Tokenizer.prototype._stateInCdata = function (c) {
    if (c === "]") this._state = AFTER_CDATA_1;
  };
  Tokenizer.prototype._stateAfterCdata1 = characterState("]", AFTER_CDATA_2);
  Tokenizer.prototype._stateAfterCdata2 = function (c) {
    if (c === ">") {
      //remove 2 trailing chars
      this._cbs.oncdata(this._buffer.substring(this._sectionStart, this._index - 2));
      this._state = TEXT;
      this._sectionStart = this._index + 1;
    } else if (c !== "]") {
      this._state = IN_CDATA;
    }
    //else: stay in AFTER_CDATA_2 (`]]]>`)
  };
  Tokenizer.prototype._stateBeforeSpecial = function (c) {
    if (c === "c" || c === "C") {
      this._state = BEFORE_SCRIPT_1;
    } else if (c === "t" || c === "T") {
      this._state = BEFORE_STYLE_1;
    } else {
      this._state = IN_TAG_NAME;
      this._index--; //consume the token again
    }
  };
  Tokenizer.prototype._stateBeforeSpecialEnd = function (c) {
    if (this._special === SPECIAL_SCRIPT && (c === "c" || c === "C")) {
      this._state = AFTER_SCRIPT_1;
    } else if (this._special === SPECIAL_STYLE && (c === "t" || c === "T")) {
      this._state = AFTER_STYLE_1;
    } else this._state = TEXT;
  };
  Tokenizer.prototype._stateBeforeScript1 = consumeSpecialNameChar("R", BEFORE_SCRIPT_2);
  Tokenizer.prototype._stateBeforeScript2 = consumeSpecialNameChar("I", BEFORE_SCRIPT_3);
  Tokenizer.prototype._stateBeforeScript3 = consumeSpecialNameChar("P", BEFORE_SCRIPT_4);
  Tokenizer.prototype._stateBeforeScript4 = consumeSpecialNameChar("T", BEFORE_SCRIPT_5);
  Tokenizer.prototype._stateBeforeScript5 = function (c) {
    if (c === "/" || c === ">" || whitespace(c)) {
      this._special = SPECIAL_SCRIPT;
    }
    this._state = IN_TAG_NAME;
    this._index--; //consume the token again
  };
  Tokenizer.prototype._stateAfterScript1 = ifElseState("R", AFTER_SCRIPT_2, TEXT);
  Tokenizer.prototype._stateAfterScript2 = ifElseState("I", AFTER_SCRIPT_3, TEXT);
  Tokenizer.prototype._stateAfterScript3 = ifElseState("P", AFTER_SCRIPT_4, TEXT);
  Tokenizer.prototype._stateAfterScript4 = ifElseState("T", AFTER_SCRIPT_5, TEXT);
  Tokenizer.prototype._stateAfterScript5 = function (c) {
    if (c === ">" || whitespace(c)) {
      this._special = SPECIAL_NONE;
      this._state = IN_CLOSING_TAG_NAME;
      this._sectionStart = this._index - 6;
      this._index--; //reconsume the token
    } else this._state = TEXT;
  };
  Tokenizer.prototype._stateBeforeStyle1 = consumeSpecialNameChar("Y", BEFORE_STYLE_2);
  Tokenizer.prototype._stateBeforeStyle2 = consumeSpecialNameChar("L", BEFORE_STYLE_3);
  Tokenizer.prototype._stateBeforeStyle3 = consumeSpecialNameChar("E", BEFORE_STYLE_4);
  Tokenizer.prototype._stateBeforeStyle4 = function (c) {
    if (c === "/" || c === ">" || whitespace(c)) {
      this._special = SPECIAL_STYLE;
    }
    this._state = IN_TAG_NAME;
    this._index--; //consume the token again
  };
  Tokenizer.prototype._stateAfterStyle1 = ifElseState("Y", AFTER_STYLE_2, TEXT);
  Tokenizer.prototype._stateAfterStyle2 = ifElseState("L", AFTER_STYLE_3, TEXT);
  Tokenizer.prototype._stateAfterStyle3 = ifElseState("E", AFTER_STYLE_4, TEXT);
  Tokenizer.prototype._stateAfterStyle4 = function (c) {
    if (c === ">" || whitespace(c)) {
      this._special = SPECIAL_NONE;
      this._state = IN_CLOSING_TAG_NAME;
      this._sectionStart = this._index - 5;
      this._index--; //reconsume the token
    } else this._state = TEXT;
  };
  Tokenizer.prototype._stateBeforeEntity = ifElseState("#", BEFORE_NUMERIC_ENTITY, IN_NAMED_ENTITY);
  Tokenizer.prototype._stateBeforeNumericEntity = ifElseState("X", IN_HEX_ENTITY, IN_NUMERIC_ENTITY);

  //for entities terminated with a semicolon
  Tokenizer.prototype._parseNamedEntityStrict = function () {
    //offset = 1
    if (this._sectionStart + 1 < this._index) {
      var entity = this._buffer.substring(this._sectionStart + 1, this._index),
        map = this._xmlMode ? xmlMap : entityMap;
      if (map.hasOwnProperty(entity)) {
        this._emitPartial(map[entity]);
        this._sectionStart = this._index + 1;
      }
    }
  };

  //parses legacy entities (without trailing semicolon)
  Tokenizer.prototype._parseLegacyEntity = function () {
    var start = this._sectionStart + 1,
      limit = this._index - start;
    if (limit > 6) limit = 6; //the max length of legacy entities is 6

    while (limit >= 2) {
      //the min length of legacy entities is 2
      var entity = this._buffer.substr(start, limit);
      if (legacyMap.hasOwnProperty(entity)) {
        this._emitPartial(legacyMap[entity]);
        this._sectionStart += limit + 1;
        return;
      } else {
        limit--;
      }
    }
  };
  Tokenizer.prototype._stateInNamedEntity = function (c) {
    if (c === ";") {
      this._parseNamedEntityStrict();
      if (this._sectionStart + 1 < this._index && !this._xmlMode) {
        this._parseLegacyEntity();
      }
      this._state = this._baseState;
    } else if ((c < "a" || c > "z") && (c < "A" || c > "Z") && (c < "0" || c > "9")) {
      if (this._xmlMode) ;else if (this._sectionStart + 1 === this._index) ;else if (this._baseState !== TEXT) {
        if (c !== "=") {
          this._parseNamedEntityStrict();
        }
      } else {
        this._parseLegacyEntity();
      }
      this._state = this._baseState;
      this._index--;
    }
  };
  Tokenizer.prototype._decodeNumericEntity = function (offset, base) {
    var sectionStart = this._sectionStart + offset;
    if (sectionStart !== this._index) {
      //parse entity
      var entity = this._buffer.substring(sectionStart, this._index);
      var parsed = parseInt(entity, base);
      this._emitPartial(decodeCodePoint(parsed));
      this._sectionStart = this._index;
    } else {
      this._sectionStart--;
    }
    this._state = this._baseState;
  };
  Tokenizer.prototype._stateInNumericEntity = function (c) {
    if (c === ";") {
      this._decodeNumericEntity(2, 10);
      this._sectionStart++;
    } else if (c < "0" || c > "9") {
      if (!this._xmlMode) {
        this._decodeNumericEntity(2, 10);
      } else {
        this._state = this._baseState;
      }
      this._index--;
    }
  };
  Tokenizer.prototype._stateInHexEntity = function (c) {
    if (c === ";") {
      this._decodeNumericEntity(3, 16);
      this._sectionStart++;
    } else if ((c < "a" || c > "f") && (c < "A" || c > "F") && (c < "0" || c > "9")) {
      if (!this._xmlMode) {
        this._decodeNumericEntity(3, 16);
      } else {
        this._state = this._baseState;
      }
      this._index--;
    }
  };
  Tokenizer.prototype._cleanup = function () {
    if (this._sectionStart < 0) {
      this._buffer = "";
      this._bufferOffset += this._index;
      this._index = 0;
    } else if (this._running) {
      if (this._state === TEXT) {
        if (this._sectionStart !== this._index) {
          this._cbs.ontext(this._buffer.substr(this._sectionStart));
        }
        this._buffer = "";
        this._bufferOffset += this._index;
        this._index = 0;
      } else if (this._sectionStart === this._index) {
        //the section just started
        this._buffer = "";
        this._bufferOffset += this._index;
        this._index = 0;
      } else {
        //remove everything unnecessary
        this._buffer = this._buffer.substr(this._sectionStart);
        this._index -= this._sectionStart;
        this._bufferOffset += this._sectionStart;
      }
      this._sectionStart = 0;
    }
  };

  //TODO make events conditional
  Tokenizer.prototype.write = function (chunk) {
    if (this._ended) this._cbs.onerror(Error(".write() after done!"));
    this._buffer += chunk;
    this._parse();
  };
  Tokenizer.prototype._parse = function () {
    while (this._index < this._buffer.length && this._running) {
      var c = this._buffer.charAt(this._index);
      if (this._state === TEXT) {
        this._stateText(c);
      } else if (this._state === BEFORE_TAG_NAME) {
        this._stateBeforeTagName(c);
      } else if (this._state === IN_TAG_NAME) {
        this._stateInTagName(c);
      } else if (this._state === BEFORE_CLOSING_TAG_NAME) {
        this._stateBeforeCloseingTagName(c);
      } else if (this._state === IN_CLOSING_TAG_NAME) {
        this._stateInCloseingTagName(c);
      } else if (this._state === AFTER_CLOSING_TAG_NAME) {
        this._stateAfterCloseingTagName(c);
      } else if (this._state === IN_SELF_CLOSING_TAG) {
        this._stateInSelfClosingTag(c);
      }

      /*
      *	attributes
      */else if (this._state === BEFORE_ATTRIBUTE_NAME) {
        this._stateBeforeAttributeName(c);
      } else if (this._state === IN_ATTRIBUTE_NAME) {
        this._stateInAttributeName(c);
      } else if (this._state === AFTER_ATTRIBUTE_NAME) {
        this._stateAfterAttributeName(c);
      } else if (this._state === BEFORE_ATTRIBUTE_VALUE) {
        this._stateBeforeAttributeValue(c);
      } else if (this._state === IN_ATTRIBUTE_VALUE_DQ) {
        this._stateInAttributeValueDoubleQuotes(c);
      } else if (this._state === IN_ATTRIBUTE_VALUE_SQ) {
        this._stateInAttributeValueSingleQuotes(c);
      } else if (this._state === IN_ATTRIBUTE_VALUE_NQ) {
        this._stateInAttributeValueNoQuotes(c);
      }

      /*
      *	declarations
      */else if (this._state === BEFORE_DECLARATION) {
        this._stateBeforeDeclaration(c);
      } else if (this._state === IN_DECLARATION) {
        this._stateInDeclaration(c);
      }

      /*
      *	processing instructions
      */else if (this._state === IN_PROCESSING_INSTRUCTION) {
        this._stateInProcessingInstruction(c);
      }

      /*
      *	comments
      */else if (this._state === BEFORE_COMMENT) {
        this._stateBeforeComment(c);
      } else if (this._state === IN_COMMENT) {
        this._stateInComment(c);
      } else if (this._state === AFTER_COMMENT_1) {
        this._stateAfterComment1(c);
      } else if (this._state === AFTER_COMMENT_2) {
        this._stateAfterComment2(c);
      }

      /*
      *	cdata
      */else if (this._state === BEFORE_CDATA_1) {
        this._stateBeforeCdata1(c);
      } else if (this._state === BEFORE_CDATA_2) {
        this._stateBeforeCdata2(c);
      } else if (this._state === BEFORE_CDATA_3) {
        this._stateBeforeCdata3(c);
      } else if (this._state === BEFORE_CDATA_4) {
        this._stateBeforeCdata4(c);
      } else if (this._state === BEFORE_CDATA_5) {
        this._stateBeforeCdata5(c);
      } else if (this._state === BEFORE_CDATA_6) {
        this._stateBeforeCdata6(c);
      } else if (this._state === IN_CDATA) {
        this._stateInCdata(c);
      } else if (this._state === AFTER_CDATA_1) {
        this._stateAfterCdata1(c);
      } else if (this._state === AFTER_CDATA_2) {
        this._stateAfterCdata2(c);
      }

      /*
      * special tags
      */else if (this._state === BEFORE_SPECIAL) {
        this._stateBeforeSpecial(c);
      } else if (this._state === BEFORE_SPECIAL_END) {
        this._stateBeforeSpecialEnd(c);
      }

      /*
      * script
      */else if (this._state === BEFORE_SCRIPT_1) {
        this._stateBeforeScript1(c);
      } else if (this._state === BEFORE_SCRIPT_2) {
        this._stateBeforeScript2(c);
      } else if (this._state === BEFORE_SCRIPT_3) {
        this._stateBeforeScript3(c);
      } else if (this._state === BEFORE_SCRIPT_4) {
        this._stateBeforeScript4(c);
      } else if (this._state === BEFORE_SCRIPT_5) {
        this._stateBeforeScript5(c);
      } else if (this._state === AFTER_SCRIPT_1) {
        this._stateAfterScript1(c);
      } else if (this._state === AFTER_SCRIPT_2) {
        this._stateAfterScript2(c);
      } else if (this._state === AFTER_SCRIPT_3) {
        this._stateAfterScript3(c);
      } else if (this._state === AFTER_SCRIPT_4) {
        this._stateAfterScript4(c);
      } else if (this._state === AFTER_SCRIPT_5) {
        this._stateAfterScript5(c);
      }

      /*
      * style
      */else if (this._state === BEFORE_STYLE_1) {
        this._stateBeforeStyle1(c);
      } else if (this._state === BEFORE_STYLE_2) {
        this._stateBeforeStyle2(c);
      } else if (this._state === BEFORE_STYLE_3) {
        this._stateBeforeStyle3(c);
      } else if (this._state === BEFORE_STYLE_4) {
        this._stateBeforeStyle4(c);
      } else if (this._state === AFTER_STYLE_1) {
        this._stateAfterStyle1(c);
      } else if (this._state === AFTER_STYLE_2) {
        this._stateAfterStyle2(c);
      } else if (this._state === AFTER_STYLE_3) {
        this._stateAfterStyle3(c);
      } else if (this._state === AFTER_STYLE_4) {
        this._stateAfterStyle4(c);
      }

      /*
      * entities
      */else if (this._state === BEFORE_ENTITY) {
        this._stateBeforeEntity(c);
      } else if (this._state === BEFORE_NUMERIC_ENTITY) {
        this._stateBeforeNumericEntity(c);
      } else if (this._state === IN_NAMED_ENTITY) {
        this._stateInNamedEntity(c);
      } else if (this._state === IN_NUMERIC_ENTITY) {
        this._stateInNumericEntity(c);
      } else if (this._state === IN_HEX_ENTITY) {
        this._stateInHexEntity(c);
      } else {
        this._cbs.onerror(Error("unknown _state"), this._state);
      }
      this._index++;
    }
    this._cleanup();
  };
  Tokenizer.prototype.pause = function () {
    this._running = false;
  };
  Tokenizer.prototype.resume = function () {
    this._running = true;
    if (this._index < this._buffer.length) {
      this._parse();
    }
    if (this._ended) {
      this._finish();
    }
  };
  Tokenizer.prototype.end = function (chunk) {
    if (this._ended) this._cbs.onerror(Error(".end() after done!"));
    if (chunk) this.write(chunk);
    this._ended = true;
    if (this._running) this._finish();
  };
  Tokenizer.prototype._finish = function () {
    //if there is remaining data, emit it in a reasonable way
    if (this._sectionStart < this._index) {
      this._handleTrailingData();
    }
    this._cbs.onend();
  };
  Tokenizer.prototype._handleTrailingData = function () {
    var data = this._buffer.substr(this._sectionStart);
    if (this._state === IN_CDATA || this._state === AFTER_CDATA_1 || this._state === AFTER_CDATA_2) {
      this._cbs.oncdata(data);
    } else if (this._state === IN_COMMENT || this._state === AFTER_COMMENT_1 || this._state === AFTER_COMMENT_2) {
      this._cbs.oncomment(data);
    } else if (this._state === IN_NAMED_ENTITY && !this._xmlMode) {
      this._parseLegacyEntity();
      if (this._sectionStart < this._index) {
        this._state = this._baseState;
        this._handleTrailingData();
      }
    } else if (this._state === IN_NUMERIC_ENTITY && !this._xmlMode) {
      this._decodeNumericEntity(2, 10);
      if (this._sectionStart < this._index) {
        this._state = this._baseState;
        this._handleTrailingData();
      }
    } else if (this._state === IN_HEX_ENTITY && !this._xmlMode) {
      this._decodeNumericEntity(3, 16);
      if (this._sectionStart < this._index) {
        this._state = this._baseState;
        this._handleTrailingData();
      }
    } else if (this._state !== IN_TAG_NAME && this._state !== BEFORE_ATTRIBUTE_NAME && this._state !== BEFORE_ATTRIBUTE_VALUE && this._state !== AFTER_ATTRIBUTE_NAME && this._state !== IN_ATTRIBUTE_NAME && this._state !== IN_ATTRIBUTE_VALUE_SQ && this._state !== IN_ATTRIBUTE_VALUE_DQ && this._state !== IN_ATTRIBUTE_VALUE_NQ && this._state !== IN_CLOSING_TAG_NAME) {
      this._cbs.ontext(data);
    }
    //else, ignore remaining data
    //TODO add a way to remove current tag
  };
  Tokenizer.prototype.reset = function () {
    Tokenizer.call(this, {
      xmlMode: this._xmlMode,
      decodeEntities: this._decodeEntities
    }, this._cbs);
  };
  Tokenizer.prototype.getAbsoluteIndex = function () {
    return this._bufferOffset + this._index;
  };
  Tokenizer.prototype._getSection = function () {
    return this._buffer.substring(this._sectionStart, this._index);
  };
  Tokenizer.prototype._emitToken = function (name) {
    this._cbs[name](this._getSection());
    this._sectionStart = -1;
  };
  Tokenizer.prototype._emitPartial = function (value) {
    if (this._baseState !== TEXT) {
      this._cbs.onattribdata(value); //TODO implement the new event
    } else {
      this._cbs.ontext(value);
    }
  };
},1151,[1152,1154,1155,1156]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var decodeMap = require(_dependencyMap[0]);
  module.exports = decodeCodePoint;

  // modified version of https://github.com/mathiasbynens/he/blob/master/src/he.js#L94-L119
  function decodeCodePoint(codePoint) {
    if (codePoint >= 0xd800 && codePoint <= 0xdfff || codePoint > 0x10ffff) {
      return "\uFFFD";
    }
    if (codePoint in decodeMap) {
      codePoint = decodeMap[codePoint];
    }
    var output = "";
    if (codePoint > 0xffff) {
      codePoint -= 0x10000;
      output += String.fromCharCode(codePoint >>> 10 & 0x3ff | 0xd800);
      codePoint = 0xdc00 | codePoint & 0x3ff;
    }
    output += String.fromCharCode(codePoint);
    return output;
  }
},1152,[1153]);
__d(function(global, require, _importDefaultUnused, _importAllUnused, module, exports, _dependencyMapUnused) {
  module.exports = {"0":65533,"128":8364,"130":8218,"131":402,"132":8222,"133":8230,"134":8224,"135":8225,"136":710,"137":8240,"138":352,"139":8249,"140":338,"142":381,"145":8216,"146":8217,"147":8220,"148":8221,"149":8226,"150":8211,"151":8212,"152":732,"153":8482,"154":353,"155":8250,"156":339,"158":382,"159":376};
},1153,[]);
__d(function(global, require, _importDefaultUnused, _importAllUnused, module, exports, _dependencyMapUnused) {
  module.exports = {"Aacute":"\u00C1","aacute":"\u00E1","Abreve":"\u0102","abreve":"\u0103","ac":"\u223E","acd":"\u223F","acE":"\u223E\u0333","Acirc":"\u00C2","acirc":"\u00E2","acute":"\u00B4","Acy":"\u0410","acy":"\u0430","AElig":"\u00C6","aelig":"\u00E6","af":"\u2061","Afr":"\uD835\uDD04","afr":"\uD835\uDD1E","Agrave":"\u00C0","agrave":"\u00E0","alefsym":"\u2135","aleph":"\u2135","Alpha":"\u0391","alpha":"\u03B1","Amacr":"\u0100","amacr":"\u0101","amalg":"\u2A3F","amp":"&","AMP":"&","andand":"\u2A55","And":"\u2A53","and":"\u2227","andd":"\u2A5C","andslope":"\u2A58","andv":"\u2A5A","ang":"\u2220","ange":"\u29A4","angle":"\u2220","angmsdaa":"\u29A8","angmsdab":"\u29A9","angmsdac":"\u29AA","angmsdad":"\u29AB","angmsdae":"\u29AC","angmsdaf":"\u29AD","angmsdag":"\u29AE","angmsdah":"\u29AF","angmsd":"\u2221","angrt":"\u221F","angrtvb":"\u22BE","angrtvbd":"\u299D","angsph":"\u2222","angst":"\u00C5","angzarr":"\u237C","Aogon":"\u0104","aogon":"\u0105","Aopf":"\uD835\uDD38","aopf":"\uD835\uDD52","apacir":"\u2A6F","ap":"\u2248","apE":"\u2A70","ape":"\u224A","apid":"\u224B","apos":"'","ApplyFunction":"\u2061","approx":"\u2248","approxeq":"\u224A","Aring":"\u00C5","aring":"\u00E5","Ascr":"\uD835\uDC9C","ascr":"\uD835\uDCB6","Assign":"\u2254","ast":"*","asymp":"\u2248","asympeq":"\u224D","Atilde":"\u00C3","atilde":"\u00E3","Auml":"\u00C4","auml":"\u00E4","awconint":"\u2233","awint":"\u2A11","backcong":"\u224C","backepsilon":"\u03F6","backprime":"\u2035","backsim":"\u223D","backsimeq":"\u22CD","Backslash":"\u2216","Barv":"\u2AE7","barvee":"\u22BD","barwed":"\u2305","Barwed":"\u2306","barwedge":"\u2305","bbrk":"\u23B5","bbrktbrk":"\u23B6","bcong":"\u224C","Bcy":"\u0411","bcy":"\u0431","bdquo":"\u201E","becaus":"\u2235","because":"\u2235","Because":"\u2235","bemptyv":"\u29B0","bepsi":"\u03F6","bernou":"\u212C","Bernoullis":"\u212C","Beta":"\u0392","beta":"\u03B2","beth":"\u2136","between":"\u226C","Bfr":"\uD835\uDD05","bfr":"\uD835\uDD1F","bigcap":"\u22C2","bigcirc":"\u25EF","bigcup":"\u22C3","bigodot":"\u2A00","bigoplus":"\u2A01","bigotimes":"\u2A02","bigsqcup":"\u2A06","bigstar":"\u2605","bigtriangledown":"\u25BD","bigtriangleup":"\u25B3","biguplus":"\u2A04","bigvee":"\u22C1","bigwedge":"\u22C0","bkarow":"\u290D","blacklozenge":"\u29EB","blacksquare":"\u25AA","blacktriangle":"\u25B4","blacktriangledown":"\u25BE","blacktriangleleft":"\u25C2","blacktriangleright":"\u25B8","blank":"\u2423","blk12":"\u2592","blk14":"\u2591","blk34":"\u2593","block":"\u2588","bne":"=\u20E5","bnequiv":"\u2261\u20E5","bNot":"\u2AED","bnot":"\u2310","Bopf":"\uD835\uDD39","bopf":"\uD835\uDD53","bot":"\u22A5","bottom":"\u22A5","bowtie":"\u22C8","boxbox":"\u29C9","boxdl":"\u2510","boxdL":"\u2555","boxDl":"\u2556","boxDL":"\u2557","boxdr":"\u250C","boxdR":"\u2552","boxDr":"\u2553","boxDR":"\u2554","boxh":"\u2500","boxH":"\u2550","boxhd":"\u252C","boxHd":"\u2564","boxhD":"\u2565","boxHD":"\u2566","boxhu":"\u2534","boxHu":"\u2567","boxhU":"\u2568","boxHU":"\u2569","boxminus":"\u229F","boxplus":"\u229E","boxtimes":"\u22A0","boxul":"\u2518","boxuL":"\u255B","boxUl":"\u255C","boxUL":"\u255D","boxur":"\u2514","boxuR":"\u2558","boxUr":"\u2559","boxUR":"\u255A","boxv":"\u2502","boxV":"\u2551","boxvh":"\u253C","boxvH":"\u256A","boxVh":"\u256B","boxVH":"\u256C","boxvl":"\u2524","boxvL":"\u2561","boxVl":"\u2562","boxVL":"\u2563","boxvr":"\u251C","boxvR":"\u255E","boxVr":"\u255F","boxVR":"\u2560","bprime":"\u2035","breve":"\u02D8","Breve":"\u02D8","brvbar":"\u00A6","bscr":"\uD835\uDCB7","Bscr":"\u212C","bsemi":"\u204F","bsim":"\u223D","bsime":"\u22CD","bsolb":"\u29C5","bsol":"\\","bsolhsub":"\u27C8","bull":"\u2022","bullet":"\u2022","bump":"\u224E","bumpE":"\u2AAE","bumpe":"\u224F","Bumpeq":"\u224E","bumpeq":"\u224F","Cacute":"\u0106","cacute":"\u0107","capand":"\u2A44","capbrcup":"\u2A49","capcap":"\u2A4B","cap":"\u2229","Cap":"\u22D2","capcup":"\u2A47","capdot":"\u2A40","CapitalDifferentialD":"\u2145","caps":"\u2229\uFE00","caret":"\u2041","caron":"\u02C7","Cayleys":"\u212D","ccaps":"\u2A4D","Ccaron":"\u010C","ccaron":"\u010D","Ccedil":"\u00C7","ccedil":"\u00E7","Ccirc":"\u0108","ccirc":"\u0109","Cconint":"\u2230","ccups":"\u2A4C","ccupssm":"\u2A50","Cdot":"\u010A","cdot":"\u010B","cedil":"\u00B8","Cedilla":"\u00B8","cemptyv":"\u29B2","cent":"\u00A2","centerdot":"\u00B7","CenterDot":"\u00B7","cfr":"\uD835\uDD20","Cfr":"\u212D","CHcy":"\u0427","chcy":"\u0447","check":"\u2713","checkmark":"\u2713","Chi":"\u03A7","chi":"\u03C7","circ":"\u02C6","circeq":"\u2257","circlearrowleft":"\u21BA","circlearrowright":"\u21BB","circledast":"\u229B","circledcirc":"\u229A","circleddash":"\u229D","CircleDot":"\u2299","circledR":"\u00AE","circledS":"\u24C8","CircleMinus":"\u2296","CirclePlus":"\u2295","CircleTimes":"\u2297","cir":"\u25CB","cirE":"\u29C3","cire":"\u2257","cirfnint":"\u2A10","cirmid":"\u2AEF","cirscir":"\u29C2","ClockwiseContourIntegral":"\u2232","CloseCurlyDoubleQuote":"\u201D","CloseCurlyQuote":"\u2019","clubs":"\u2663","clubsuit":"\u2663","colon":":","Colon":"\u2237","Colone":"\u2A74","colone":"\u2254","coloneq":"\u2254","comma":",","commat":"@","comp":"\u2201","compfn":"\u2218","complement":"\u2201","complexes":"\u2102","cong":"\u2245","congdot":"\u2A6D","Congruent":"\u2261","conint":"\u222E","Conint":"\u222F","ContourIntegral":"\u222E","copf":"\uD835\uDD54","Copf":"\u2102","coprod":"\u2210","Coproduct":"\u2210","copy":"\u00A9","COPY":"\u00A9","copysr":"\u2117","CounterClockwiseContourIntegral":"\u2233","crarr":"\u21B5","cross":"\u2717","Cross":"\u2A2F","Cscr":"\uD835\uDC9E","cscr":"\uD835\uDCB8","csub":"\u2ACF","csube":"\u2AD1","csup":"\u2AD0","csupe":"\u2AD2","ctdot":"\u22EF","cudarrl":"\u2938","cudarrr":"\u2935","cuepr":"\u22DE","cuesc":"\u22DF","cularr":"\u21B6","cularrp":"\u293D","cupbrcap":"\u2A48","cupcap":"\u2A46","CupCap":"\u224D","cup":"\u222A","Cup":"\u22D3","cupcup":"\u2A4A","cupdot":"\u228D","cupor":"\u2A45","cups":"\u222A\uFE00","curarr":"\u21B7","curarrm":"\u293C","curlyeqprec":"\u22DE","curlyeqsucc":"\u22DF","curlyvee":"\u22CE","curlywedge":"\u22CF","curren":"\u00A4","curvearrowleft":"\u21B6","curvearrowright":"\u21B7","cuvee":"\u22CE","cuwed":"\u22CF","cwconint":"\u2232","cwint":"\u2231","cylcty":"\u232D","dagger":"\u2020","Dagger":"\u2021","daleth":"\u2138","darr":"\u2193","Darr":"\u21A1","dArr":"\u21D3","dash":"\u2010","Dashv":"\u2AE4","dashv":"\u22A3","dbkarow":"\u290F","dblac":"\u02DD","Dcaron":"\u010E","dcaron":"\u010F","Dcy":"\u0414","dcy":"\u0434","ddagger":"\u2021","ddarr":"\u21CA","DD":"\u2145","dd":"\u2146","DDotrahd":"\u2911","ddotseq":"\u2A77","deg":"\u00B0","Del":"\u2207","Delta":"\u0394","delta":"\u03B4","demptyv":"\u29B1","dfisht":"\u297F","Dfr":"\uD835\uDD07","dfr":"\uD835\uDD21","dHar":"\u2965","dharl":"\u21C3","dharr":"\u21C2","DiacriticalAcute":"\u00B4","DiacriticalDot":"\u02D9","DiacriticalDoubleAcute":"\u02DD","DiacriticalGrave":"`","DiacriticalTilde":"\u02DC","diam":"\u22C4","diamond":"\u22C4","Diamond":"\u22C4","diamondsuit":"\u2666","diams":"\u2666","die":"\u00A8","DifferentialD":"\u2146","digamma":"\u03DD","disin":"\u22F2","div":"\u00F7","divide":"\u00F7","divideontimes":"\u22C7","divonx":"\u22C7","DJcy":"\u0402","djcy":"\u0452","dlcorn":"\u231E","dlcrop":"\u230D","dollar":"$","Dopf":"\uD835\uDD3B","dopf":"\uD835\uDD55","Dot":"\u00A8","dot":"\u02D9","DotDot":"\u20DC","doteq":"\u2250","doteqdot":"\u2251","DotEqual":"\u2250","dotminus":"\u2238","dotplus":"\u2214","dotsquare":"\u22A1","doublebarwedge":"\u2306","DoubleContourIntegral":"\u222F","DoubleDot":"\u00A8","DoubleDownArrow":"\u21D3","DoubleLeftArrow":"\u21D0","DoubleLeftRightArrow":"\u21D4","DoubleLeftTee":"\u2AE4","DoubleLongLeftArrow":"\u27F8","DoubleLongLeftRightArrow":"\u27FA","DoubleLongRightArrow":"\u27F9","DoubleRightArrow":"\u21D2","DoubleRightTee":"\u22A8","DoubleUpArrow":"\u21D1","DoubleUpDownArrow":"\u21D5","DoubleVerticalBar":"\u2225","DownArrowBar":"\u2913","downarrow":"\u2193","DownArrow":"\u2193","Downarrow":"\u21D3","DownArrowUpArrow":"\u21F5","DownBreve":"\u0311","downdownarrows":"\u21CA","downharpoonleft":"\u21C3","downharpoonright":"\u21C2","DownLeftRightVector":"\u2950","DownLeftTeeVector":"\u295E","DownLeftVectorBar":"\u2956","DownLeftVector":"\u21BD","DownRightTeeVector":"\u295F","DownRightVectorBar":"\u2957","DownRightVector":"\u21C1","DownTeeArrow":"\u21A7","DownTee":"\u22A4","drbkarow":"\u2910","drcorn":"\u231F","drcrop":"\u230C","Dscr":"\uD835\uDC9F","dscr":"\uD835\uDCB9","DScy":"\u0405","dscy":"\u0455","dsol":"\u29F6","Dstrok":"\u0110","dstrok":"\u0111","dtdot":"\u22F1","dtri":"\u25BF","dtrif":"\u25BE","duarr":"\u21F5","duhar":"\u296F","dwangle":"\u29A6","DZcy":"\u040F","dzcy":"\u045F","dzigrarr":"\u27FF","Eacute":"\u00C9","eacute":"\u00E9","easter":"\u2A6E","Ecaron":"\u011A","ecaron":"\u011B","Ecirc":"\u00CA","ecirc":"\u00EA","ecir":"\u2256","ecolon":"\u2255","Ecy":"\u042D","ecy":"\u044D","eDDot":"\u2A77","Edot":"\u0116","edot":"\u0117","eDot":"\u2251","ee":"\u2147","efDot":"\u2252","Efr":"\uD835\uDD08","efr":"\uD835\uDD22","eg":"\u2A9A","Egrave":"\u00C8","egrave":"\u00E8","egs":"\u2A96","egsdot":"\u2A98","el":"\u2A99","Element":"\u2208","elinters":"\u23E7","ell":"\u2113","els":"\u2A95","elsdot":"\u2A97","Emacr":"\u0112","emacr":"\u0113","empty":"\u2205","emptyset":"\u2205","EmptySmallSquare":"\u25FB","emptyv":"\u2205","EmptyVerySmallSquare":"\u25AB","emsp13":"\u2004","emsp14":"\u2005","emsp":"\u2003","ENG":"\u014A","eng":"\u014B","ensp":"\u2002","Eogon":"\u0118","eogon":"\u0119","Eopf":"\uD835\uDD3C","eopf":"\uD835\uDD56","epar":"\u22D5","eparsl":"\u29E3","eplus":"\u2A71","epsi":"\u03B5","Epsilon":"\u0395","epsilon":"\u03B5","epsiv":"\u03F5","eqcirc":"\u2256","eqcolon":"\u2255","eqsim":"\u2242","eqslantgtr":"\u2A96","eqslantless":"\u2A95","Equal":"\u2A75","equals":"=","EqualTilde":"\u2242","equest":"\u225F","Equilibrium":"\u21CC","equiv":"\u2261","equivDD":"\u2A78","eqvparsl":"\u29E5","erarr":"\u2971","erDot":"\u2253","escr":"\u212F","Escr":"\u2130","esdot":"\u2250","Esim":"\u2A73","esim":"\u2242","Eta":"\u0397","eta":"\u03B7","ETH":"\u00D0","eth":"\u00F0","Euml":"\u00CB","euml":"\u00EB","euro":"\u20AC","excl":"!","exist":"\u2203","Exists":"\u2203","expectation":"\u2130","exponentiale":"\u2147","ExponentialE":"\u2147","fallingdotseq":"\u2252","Fcy":"\u0424","fcy":"\u0444","female":"\u2640","ffilig":"\uFB03","fflig":"\uFB00","ffllig":"\uFB04","Ffr":"\uD835\uDD09","ffr":"\uD835\uDD23","filig":"\uFB01","FilledSmallSquare":"\u25FC","FilledVerySmallSquare":"\u25AA","fjlig":"fj","flat":"\u266D","fllig":"\uFB02","fltns":"\u25B1","fnof":"\u0192","Fopf":"\uD835\uDD3D","fopf":"\uD835\uDD57","forall":"\u2200","ForAll":"\u2200","fork":"\u22D4","forkv":"\u2AD9","Fouriertrf":"\u2131","fpartint":"\u2A0D","frac12":"\u00BD","frac13":"\u2153","frac14":"\u00BC","frac15":"\u2155","frac16":"\u2159","frac18":"\u215B","frac23":"\u2154","frac25":"\u2156","frac34":"\u00BE","frac35":"\u2157","frac38":"\u215C","frac45":"\u2158","frac56":"\u215A","frac58":"\u215D","frac78":"\u215E","frasl":"\u2044","frown":"\u2322","fscr":"\uD835\uDCBB","Fscr":"\u2131","gacute":"\u01F5","Gamma":"\u0393","gamma":"\u03B3","Gammad":"\u03DC","gammad":"\u03DD","gap":"\u2A86","Gbreve":"\u011E","gbreve":"\u011F","Gcedil":"\u0122","Gcirc":"\u011C","gcirc":"\u011D","Gcy":"\u0413","gcy":"\u0433","Gdot":"\u0120","gdot":"\u0121","ge":"\u2265","gE":"\u2267","gEl":"\u2A8C","gel":"\u22DB","geq":"\u2265","geqq":"\u2267","geqslant":"\u2A7E","gescc":"\u2AA9","ges":"\u2A7E","gesdot":"\u2A80","gesdoto":"\u2A82","gesdotol":"\u2A84","gesl":"\u22DB\uFE00","gesles":"\u2A94","Gfr":"\uD835\uDD0A","gfr":"\uD835\uDD24","gg":"\u226B","Gg":"\u22D9","ggg":"\u22D9","gimel":"\u2137","GJcy":"\u0403","gjcy":"\u0453","gla":"\u2AA5","gl":"\u2277","glE":"\u2A92","glj":"\u2AA4","gnap":"\u2A8A","gnapprox":"\u2A8A","gne":"\u2A88","gnE":"\u2269","gneq":"\u2A88","gneqq":"\u2269","gnsim":"\u22E7","Gopf":"\uD835\uDD3E","gopf":"\uD835\uDD58","grave":"`","GreaterEqual":"\u2265","GreaterEqualLess":"\u22DB","GreaterFullEqual":"\u2267","GreaterGreater":"\u2AA2","GreaterLess":"\u2277","GreaterSlantEqual":"\u2A7E","GreaterTilde":"\u2273","Gscr":"\uD835\uDCA2","gscr":"\u210A","gsim":"\u2273","gsime":"\u2A8E","gsiml":"\u2A90","gtcc":"\u2AA7","gtcir":"\u2A7A","gt":">","GT":">","Gt":"\u226B","gtdot":"\u22D7","gtlPar":"\u2995","gtquest":"\u2A7C","gtrapprox":"\u2A86","gtrarr":"\u2978","gtrdot":"\u22D7","gtreqless":"\u22DB","gtreqqless":"\u2A8C","gtrless":"\u2277","gtrsim":"\u2273","gvertneqq":"\u2269\uFE00","gvnE":"\u2269\uFE00","Hacek":"\u02C7","hairsp":"\u200A","half":"\u00BD","hamilt":"\u210B","HARDcy":"\u042A","hardcy":"\u044A","harrcir":"\u2948","harr":"\u2194","hArr":"\u21D4","harrw":"\u21AD","Hat":"^","hbar":"\u210F","Hcirc":"\u0124","hcirc":"\u0125","hearts":"\u2665","heartsuit":"\u2665","hellip":"\u2026","hercon":"\u22B9","hfr":"\uD835\uDD25","Hfr":"\u210C","HilbertSpace":"\u210B","hksearow":"\u2925","hkswarow":"\u2926","hoarr":"\u21FF","homtht":"\u223B","hookleftarrow":"\u21A9","hookrightarrow":"\u21AA","hopf":"\uD835\uDD59","Hopf":"\u210D","horbar":"\u2015","HorizontalLine":"\u2500","hscr":"\uD835\uDCBD","Hscr":"\u210B","hslash":"\u210F","Hstrok":"\u0126","hstrok":"\u0127","HumpDownHump":"\u224E","HumpEqual":"\u224F","hybull":"\u2043","hyphen":"\u2010","Iacute":"\u00CD","iacute":"\u00ED","ic":"\u2063","Icirc":"\u00CE","icirc":"\u00EE","Icy":"\u0418","icy":"\u0438","Idot":"\u0130","IEcy":"\u0415","iecy":"\u0435","iexcl":"\u00A1","iff":"\u21D4","ifr":"\uD835\uDD26","Ifr":"\u2111","Igrave":"\u00CC","igrave":"\u00EC","ii":"\u2148","iiiint":"\u2A0C","iiint":"\u222D","iinfin":"\u29DC","iiota":"\u2129","IJlig":"\u0132","ijlig":"\u0133","Imacr":"\u012A","imacr":"\u012B","image":"\u2111","ImaginaryI":"\u2148","imagline":"\u2110","imagpart":"\u2111","imath":"\u0131","Im":"\u2111","imof":"\u22B7","imped":"\u01B5","Implies":"\u21D2","incare":"\u2105","in":"\u2208","infin":"\u221E","infintie":"\u29DD","inodot":"\u0131","intcal":"\u22BA","int":"\u222B","Int":"\u222C","integers":"\u2124","Integral":"\u222B","intercal":"\u22BA","Intersection":"\u22C2","intlarhk":"\u2A17","intprod":"\u2A3C","InvisibleComma":"\u2063","InvisibleTimes":"\u2062","IOcy":"\u0401","iocy":"\u0451","Iogon":"\u012E","iogon":"\u012F","Iopf":"\uD835\uDD40","iopf":"\uD835\uDD5A","Iota":"\u0399","iota":"\u03B9","iprod":"\u2A3C","iquest":"\u00BF","iscr":"\uD835\uDCBE","Iscr":"\u2110","isin":"\u2208","isindot":"\u22F5","isinE":"\u22F9","isins":"\u22F4","isinsv":"\u22F3","isinv":"\u2208","it":"\u2062","Itilde":"\u0128","itilde":"\u0129","Iukcy":"\u0406","iukcy":"\u0456","Iuml":"\u00CF","iuml":"\u00EF","Jcirc":"\u0134","jcirc":"\u0135","Jcy":"\u0419","jcy":"\u0439","Jfr":"\uD835\uDD0D","jfr":"\uD835\uDD27","jmath":"\u0237","Jopf":"\uD835\uDD41","jopf":"\uD835\uDD5B","Jscr":"\uD835\uDCA5","jscr":"\uD835\uDCBF","Jsercy":"\u0408","jsercy":"\u0458","Jukcy":"\u0404","jukcy":"\u0454","Kappa":"\u039A","kappa":"\u03BA","kappav":"\u03F0","Kcedil":"\u0136","kcedil":"\u0137","Kcy":"\u041A","kcy":"\u043A","Kfr":"\uD835\uDD0E","kfr":"\uD835\uDD28","kgreen":"\u0138","KHcy":"\u0425","khcy":"\u0445","KJcy":"\u040C","kjcy":"\u045C","Kopf":"\uD835\uDD42","kopf":"\uD835\uDD5C","Kscr":"\uD835\uDCA6","kscr":"\uD835\uDCC0","lAarr":"\u21DA","Lacute":"\u0139","lacute":"\u013A","laemptyv":"\u29B4","lagran":"\u2112","Lambda":"\u039B","lambda":"\u03BB","lang":"\u27E8","Lang":"\u27EA","langd":"\u2991","langle":"\u27E8","lap":"\u2A85","Laplacetrf":"\u2112","laquo":"\u00AB","larrb":"\u21E4","larrbfs":"\u291F","larr":"\u2190","Larr":"\u219E","lArr":"\u21D0","larrfs":"\u291D","larrhk":"\u21A9","larrlp":"\u21AB","larrpl":"\u2939","larrsim":"\u2973","larrtl":"\u21A2","latail":"\u2919","lAtail":"\u291B","lat":"\u2AAB","late":"\u2AAD","lates":"\u2AAD\uFE00","lbarr":"\u290C","lBarr":"\u290E","lbbrk":"\u2772","lbrace":"{","lbrack":"[","lbrke":"\u298B","lbrksld":"\u298F","lbrkslu":"\u298D","Lcaron":"\u013D","lcaron":"\u013E","Lcedil":"\u013B","lcedil":"\u013C","lceil":"\u2308","lcub":"{","Lcy":"\u041B","lcy":"\u043B","ldca":"\u2936","ldquo":"\u201C","ldquor":"\u201E","ldrdhar":"\u2967","ldrushar":"\u294B","ldsh":"\u21B2","le":"\u2264","lE":"\u2266","LeftAngleBracket":"\u27E8","LeftArrowBar":"\u21E4","leftarrow":"\u2190","LeftArrow":"\u2190","Leftarrow":"\u21D0","LeftArrowRightArrow":"\u21C6","leftarrowtail":"\u21A2","LeftCeiling":"\u2308","LeftDoubleBracket":"\u27E6","LeftDownTeeVector":"\u2961","LeftDownVectorBar":"\u2959","LeftDownVector":"\u21C3","LeftFloor":"\u230A","leftharpoondown":"\u21BD","leftharpoonup":"\u21BC","leftleftarrows":"\u21C7","leftrightarrow":"\u2194","LeftRightArrow":"\u2194","Leftrightarrow":"\u21D4","leftrightarrows":"\u21C6","leftrightharpoons":"\u21CB","leftrightsquigarrow":"\u21AD","LeftRightVector":"\u294E","LeftTeeArrow":"\u21A4","LeftTee":"\u22A3","LeftTeeVector":"\u295A","leftthreetimes":"\u22CB","LeftTriangleBar":"\u29CF","LeftTriangle":"\u22B2","LeftTriangleEqual":"\u22B4","LeftUpDownVector":"\u2951","LeftUpTeeVector":"\u2960","LeftUpVectorBar":"\u2958","LeftUpVector":"\u21BF","LeftVectorBar":"\u2952","LeftVector":"\u21BC","lEg":"\u2A8B","leg":"\u22DA","leq":"\u2264","leqq":"\u2266","leqslant":"\u2A7D","lescc":"\u2AA8","les":"\u2A7D","lesdot":"\u2A7F","lesdoto":"\u2A81","lesdotor":"\u2A83","lesg":"\u22DA\uFE00","lesges":"\u2A93","lessapprox":"\u2A85","lessdot":"\u22D6","lesseqgtr":"\u22DA","lesseqqgtr":"\u2A8B","LessEqualGreater":"\u22DA","LessFullEqual":"\u2266","LessGreater":"\u2276","lessgtr":"\u2276","LessLess":"\u2AA1","lesssim":"\u2272","LessSlantEqual":"\u2A7D","LessTilde":"\u2272","lfisht":"\u297C","lfloor":"\u230A","Lfr":"\uD835\uDD0F","lfr":"\uD835\uDD29","lg":"\u2276","lgE":"\u2A91","lHar":"\u2962","lhard":"\u21BD","lharu":"\u21BC","lharul":"\u296A","lhblk":"\u2584","LJcy":"\u0409","ljcy":"\u0459","llarr":"\u21C7","ll":"\u226A","Ll":"\u22D8","llcorner":"\u231E","Lleftarrow":"\u21DA","llhard":"\u296B","lltri":"\u25FA","Lmidot":"\u013F","lmidot":"\u0140","lmoustache":"\u23B0","lmoust":"\u23B0","lnap":"\u2A89","lnapprox":"\u2A89","lne":"\u2A87","lnE":"\u2268","lneq":"\u2A87","lneqq":"\u2268","lnsim":"\u22E6","loang":"\u27EC","loarr":"\u21FD","lobrk":"\u27E6","longleftarrow":"\u27F5","LongLeftArrow":"\u27F5","Longleftarrow":"\u27F8","longleftrightarrow":"\u27F7","LongLeftRightArrow":"\u27F7","Longleftrightarrow":"\u27FA","longmapsto":"\u27FC","longrightarrow":"\u27F6","LongRightArrow":"\u27F6","Longrightarrow":"\u27F9","looparrowleft":"\u21AB","looparrowright":"\u21AC","lopar":"\u2985","Lopf":"\uD835\uDD43","lopf":"\uD835\uDD5D","loplus":"\u2A2D","lotimes":"\u2A34","lowast":"\u2217","lowbar":"_","LowerLeftArrow":"\u2199","LowerRightArrow":"\u2198","loz":"\u25CA","lozenge":"\u25CA","lozf":"\u29EB","lpar":"(","lparlt":"\u2993","lrarr":"\u21C6","lrcorner":"\u231F","lrhar":"\u21CB","lrhard":"\u296D","lrm":"\u200E","lrtri":"\u22BF","lsaquo":"\u2039","lscr":"\uD835\uDCC1","Lscr":"\u2112","lsh":"\u21B0","Lsh":"\u21B0","lsim":"\u2272","lsime":"\u2A8D","lsimg":"\u2A8F","lsqb":"[","lsquo":"\u2018","lsquor":"\u201A","Lstrok":"\u0141","lstrok":"\u0142","ltcc":"\u2AA6","ltcir":"\u2A79","lt":"<","LT":"<","Lt":"\u226A","ltdot":"\u22D6","lthree":"\u22CB","ltimes":"\u22C9","ltlarr":"\u2976","ltquest":"\u2A7B","ltri":"\u25C3","ltrie":"\u22B4","ltrif":"\u25C2","ltrPar":"\u2996","lurdshar":"\u294A","luruhar":"\u2966","lvertneqq":"\u2268\uFE00","lvnE":"\u2268\uFE00","macr":"\u00AF","male":"\u2642","malt":"\u2720","maltese":"\u2720","Map":"\u2905","map":"\u21A6","mapsto":"\u21A6","mapstodown":"\u21A7","mapstoleft":"\u21A4","mapstoup":"\u21A5","marker":"\u25AE","mcomma":"\u2A29","Mcy":"\u041C","mcy":"\u043C","mdash":"\u2014","mDDot":"\u223A","measuredangle":"\u2221","MediumSpace":"\u205F","Mellintrf":"\u2133","Mfr":"\uD835\uDD10","mfr":"\uD835\uDD2A","mho":"\u2127","micro":"\u00B5","midast":"*","midcir":"\u2AF0","mid":"\u2223","middot":"\u00B7","minusb":"\u229F","minus":"\u2212","minusd":"\u2238","minusdu":"\u2A2A","MinusPlus":"\u2213","mlcp":"\u2ADB","mldr":"\u2026","mnplus":"\u2213","models":"\u22A7","Mopf":"\uD835\uDD44","mopf":"\uD835\uDD5E","mp":"\u2213","mscr":"\uD835\uDCC2","Mscr":"\u2133","mstpos":"\u223E","Mu":"\u039C","mu":"\u03BC","multimap":"\u22B8","mumap":"\u22B8","nabla":"\u2207","Nacute":"\u0143","nacute":"\u0144","nang":"\u2220\u20D2","nap":"\u2249","napE":"\u2A70\u0338","napid":"\u224B\u0338","napos":"\u0149","napprox":"\u2249","natural":"\u266E","naturals":"\u2115","natur":"\u266E","nbsp":"\u00A0","nbump":"\u224E\u0338","nbumpe":"\u224F\u0338","ncap":"\u2A43","Ncaron":"\u0147","ncaron":"\u0148","Ncedil":"\u0145","ncedil":"\u0146","ncong":"\u2247","ncongdot":"\u2A6D\u0338","ncup":"\u2A42","Ncy":"\u041D","ncy":"\u043D","ndash":"\u2013","nearhk":"\u2924","nearr":"\u2197","neArr":"\u21D7","nearrow":"\u2197","ne":"\u2260","nedot":"\u2250\u0338","NegativeMediumSpace":"\u200B","NegativeThickSpace":"\u200B","NegativeThinSpace":"\u200B","NegativeVeryThinSpace":"\u200B","nequiv":"\u2262","nesear":"\u2928","nesim":"\u2242\u0338","NestedGreaterGreater":"\u226B","NestedLessLess":"\u226A","NewLine":"\n","nexist":"\u2204","nexists":"\u2204","Nfr":"\uD835\uDD11","nfr":"\uD835\uDD2B","ngE":"\u2267\u0338","nge":"\u2271","ngeq":"\u2271","ngeqq":"\u2267\u0338","ngeqslant":"\u2A7E\u0338","nges":"\u2A7E\u0338","nGg":"\u22D9\u0338","ngsim":"\u2275","nGt":"\u226B\u20D2","ngt":"\u226F","ngtr":"\u226F","nGtv":"\u226B\u0338","nharr":"\u21AE","nhArr":"\u21CE","nhpar":"\u2AF2","ni":"\u220B","nis":"\u22FC","nisd":"\u22FA","niv":"\u220B","NJcy":"\u040A","njcy":"\u045A","nlarr":"\u219A","nlArr":"\u21CD","nldr":"\u2025","nlE":"\u2266\u0338","nle":"\u2270","nleftarrow":"\u219A","nLeftarrow":"\u21CD","nleftrightarrow":"\u21AE","nLeftrightarrow":"\u21CE","nleq":"\u2270","nleqq":"\u2266\u0338","nleqslant":"\u2A7D\u0338","nles":"\u2A7D\u0338","nless":"\u226E","nLl":"\u22D8\u0338","nlsim":"\u2274","nLt":"\u226A\u20D2","nlt":"\u226E","nltri":"\u22EA","nltrie":"\u22EC","nLtv":"\u226A\u0338","nmid":"\u2224","NoBreak":"\u2060","NonBreakingSpace":"\u00A0","nopf":"\uD835\uDD5F","Nopf":"\u2115","Not":"\u2AEC","not":"\u00AC","NotCongruent":"\u2262","NotCupCap":"\u226D","NotDoubleVerticalBar":"\u2226","NotElement":"\u2209","NotEqual":"\u2260","NotEqualTilde":"\u2242\u0338","NotExists":"\u2204","NotGreater":"\u226F","NotGreaterEqual":"\u2271","NotGreaterFullEqual":"\u2267\u0338","NotGreaterGreater":"\u226B\u0338","NotGreaterLess":"\u2279","NotGreaterSlantEqual":"\u2A7E\u0338","NotGreaterTilde":"\u2275","NotHumpDownHump":"\u224E\u0338","NotHumpEqual":"\u224F\u0338","notin":"\u2209","notindot":"\u22F5\u0338","notinE":"\u22F9\u0338","notinva":"\u2209","notinvb":"\u22F7","notinvc":"\u22F6","NotLeftTriangleBar":"\u29CF\u0338","NotLeftTriangle":"\u22EA","NotLeftTriangleEqual":"\u22EC","NotLess":"\u226E","NotLessEqual":"\u2270","NotLessGreater":"\u2278","NotLessLess":"\u226A\u0338","NotLessSlantEqual":"\u2A7D\u0338","NotLessTilde":"\u2274","NotNestedGreaterGreater":"\u2AA2\u0338","NotNestedLessLess":"\u2AA1\u0338","notni":"\u220C","notniva":"\u220C","notnivb":"\u22FE","notnivc":"\u22FD","NotPrecedes":"\u2280","NotPrecedesEqual":"\u2AAF\u0338","NotPrecedesSlantEqual":"\u22E0","NotReverseElement":"\u220C","NotRightTriangleBar":"\u29D0\u0338","NotRightTriangle":"\u22EB","NotRightTriangleEqual":"\u22ED","NotSquareSubset":"\u228F\u0338","NotSquareSubsetEqual":"\u22E2","NotSquareSuperset":"\u2290\u0338","NotSquareSupersetEqual":"\u22E3","NotSubset":"\u2282\u20D2","NotSubsetEqual":"\u2288","NotSucceeds":"\u2281","NotSucceedsEqual":"\u2AB0\u0338","NotSucceedsSlantEqual":"\u22E1","NotSucceedsTilde":"\u227F\u0338","NotSuperset":"\u2283\u20D2","NotSupersetEqual":"\u2289","NotTilde":"\u2241","NotTildeEqual":"\u2244","NotTildeFullEqual":"\u2247","NotTildeTilde":"\u2249","NotVerticalBar":"\u2224","nparallel":"\u2226","npar":"\u2226","nparsl":"\u2AFD\u20E5","npart":"\u2202\u0338","npolint":"\u2A14","npr":"\u2280","nprcue":"\u22E0","nprec":"\u2280","npreceq":"\u2AAF\u0338","npre":"\u2AAF\u0338","nrarrc":"\u2933\u0338","nrarr":"\u219B","nrArr":"\u21CF","nrarrw":"\u219D\u0338","nrightarrow":"\u219B","nRightarrow":"\u21CF","nrtri":"\u22EB","nrtrie":"\u22ED","nsc":"\u2281","nsccue":"\u22E1","nsce":"\u2AB0\u0338","Nscr":"\uD835\uDCA9","nscr":"\uD835\uDCC3","nshortmid":"\u2224","nshortparallel":"\u2226","nsim":"\u2241","nsime":"\u2244","nsimeq":"\u2244","nsmid":"\u2224","nspar":"\u2226","nsqsube":"\u22E2","nsqsupe":"\u22E3","nsub":"\u2284","nsubE":"\u2AC5\u0338","nsube":"\u2288","nsubset":"\u2282\u20D2","nsubseteq":"\u2288","nsubseteqq":"\u2AC5\u0338","nsucc":"\u2281","nsucceq":"\u2AB0\u0338","nsup":"\u2285","nsupE":"\u2AC6\u0338","nsupe":"\u2289","nsupset":"\u2283\u20D2","nsupseteq":"\u2289","nsupseteqq":"\u2AC6\u0338","ntgl":"\u2279","Ntilde":"\u00D1","ntilde":"\u00F1","ntlg":"\u2278","ntriangleleft":"\u22EA","ntrianglelefteq":"\u22EC","ntriangleright":"\u22EB","ntrianglerighteq":"\u22ED","Nu":"\u039D","nu":"\u03BD","num":"#","numero":"\u2116","numsp":"\u2007","nvap":"\u224D\u20D2","nvdash":"\u22AC","nvDash":"\u22AD","nVdash":"\u22AE","nVDash":"\u22AF","nvge":"\u2265\u20D2","nvgt":">\u20D2","nvHarr":"\u2904","nvinfin":"\u29DE","nvlArr":"\u2902","nvle":"\u2264\u20D2","nvlt":"<\u20D2","nvltrie":"\u22B4\u20D2","nvrArr":"\u2903","nvrtrie":"\u22B5\u20D2","nvsim":"\u223C\u20D2","nwarhk":"\u2923","nwarr":"\u2196","nwArr":"\u21D6","nwarrow":"\u2196","nwnear":"\u2927","Oacute":"\u00D3","oacute":"\u00F3","oast":"\u229B","Ocirc":"\u00D4","ocirc":"\u00F4","ocir":"\u229A","Ocy":"\u041E","ocy":"\u043E","odash":"\u229D","Odblac":"\u0150","odblac":"\u0151","odiv":"\u2A38","odot":"\u2299","odsold":"\u29BC","OElig":"\u0152","oelig":"\u0153","ofcir":"\u29BF","Ofr":"\uD835\uDD12","ofr":"\uD835\uDD2C","ogon":"\u02DB","Ograve":"\u00D2","ograve":"\u00F2","ogt":"\u29C1","ohbar":"\u29B5","ohm":"\u03A9","oint":"\u222E","olarr":"\u21BA","olcir":"\u29BE","olcross":"\u29BB","oline":"\u203E","olt":"\u29C0","Omacr":"\u014C","omacr":"\u014D","Omega":"\u03A9","omega":"\u03C9","Omicron":"\u039F","omicron":"\u03BF","omid":"\u29B6","ominus":"\u2296","Oopf":"\uD835\uDD46","oopf":"\uD835\uDD60","opar":"\u29B7","OpenCurlyDoubleQuote":"\u201C","OpenCurlyQuote":"\u2018","operp":"\u29B9","oplus":"\u2295","orarr":"\u21BB","Or":"\u2A54","or":"\u2228","ord":"\u2A5D","order":"\u2134","orderof":"\u2134","ordf":"\u00AA","ordm":"\u00BA","origof":"\u22B6","oror":"\u2A56","orslope":"\u2A57","orv":"\u2A5B","oS":"\u24C8","Oscr":"\uD835\uDCAA","oscr":"\u2134","Oslash":"\u00D8","oslash":"\u00F8","osol":"\u2298","Otilde":"\u00D5","otilde":"\u00F5","otimesas":"\u2A36","Otimes":"\u2A37","otimes":"\u2297","Ouml":"\u00D6","ouml":"\u00F6","ovbar":"\u233D","OverBar":"\u203E","OverBrace":"\u23DE","OverBracket":"\u23B4","OverParenthesis":"\u23DC","para":"\u00B6","parallel":"\u2225","par":"\u2225","parsim":"\u2AF3","parsl":"\u2AFD","part":"\u2202","PartialD":"\u2202","Pcy":"\u041F","pcy":"\u043F","percnt":"%","period":".","permil":"\u2030","perp":"\u22A5","pertenk":"\u2031","Pfr":"\uD835\uDD13","pfr":"\uD835\uDD2D","Phi":"\u03A6","phi":"\u03C6","phiv":"\u03D5","phmmat":"\u2133","phone":"\u260E","Pi":"\u03A0","pi":"\u03C0","pitchfork":"\u22D4","piv":"\u03D6","planck":"\u210F","planckh":"\u210E","plankv":"\u210F","plusacir":"\u2A23","plusb":"\u229E","pluscir":"\u2A22","plus":"+","plusdo":"\u2214","plusdu":"\u2A25","pluse":"\u2A72","PlusMinus":"\u00B1","plusmn":"\u00B1","plussim":"\u2A26","plustwo":"\u2A27","pm":"\u00B1","Poincareplane":"\u210C","pointint":"\u2A15","popf":"\uD835\uDD61","Popf":"\u2119","pound":"\u00A3","prap":"\u2AB7","Pr":"\u2ABB","pr":"\u227A","prcue":"\u227C","precapprox":"\u2AB7","prec":"\u227A","preccurlyeq":"\u227C","Precedes":"\u227A","PrecedesEqual":"\u2AAF","PrecedesSlantEqual":"\u227C","PrecedesTilde":"\u227E","preceq":"\u2AAF","precnapprox":"\u2AB9","precneqq":"\u2AB5","precnsim":"\u22E8","pre":"\u2AAF","prE":"\u2AB3","precsim":"\u227E","prime":"\u2032","Prime":"\u2033","primes":"\u2119","prnap":"\u2AB9","prnE":"\u2AB5","prnsim":"\u22E8","prod":"\u220F","Product":"\u220F","profalar":"\u232E","profline":"\u2312","profsurf":"\u2313","prop":"\u221D","Proportional":"\u221D","Proportion":"\u2237","propto":"\u221D","prsim":"\u227E","prurel":"\u22B0","Pscr":"\uD835\uDCAB","pscr":"\uD835\uDCC5","Psi":"\u03A8","psi":"\u03C8","puncsp":"\u2008","Qfr":"\uD835\uDD14","qfr":"\uD835\uDD2E","qint":"\u2A0C","qopf":"\uD835\uDD62","Qopf":"\u211A","qprime":"\u2057","Qscr":"\uD835\uDCAC","qscr":"\uD835\uDCC6","quaternions":"\u210D","quatint":"\u2A16","quest":"?","questeq":"\u225F","quot":"\"","QUOT":"\"","rAarr":"\u21DB","race":"\u223D\u0331","Racute":"\u0154","racute":"\u0155","radic":"\u221A","raemptyv":"\u29B3","rang":"\u27E9","Rang":"\u27EB","rangd":"\u2992","range":"\u29A5","rangle":"\u27E9","raquo":"\u00BB","rarrap":"\u2975","rarrb":"\u21E5","rarrbfs":"\u2920","rarrc":"\u2933","rarr":"\u2192","Rarr":"\u21A0","rArr":"\u21D2","rarrfs":"\u291E","rarrhk":"\u21AA","rarrlp":"\u21AC","rarrpl":"\u2945","rarrsim":"\u2974","Rarrtl":"\u2916","rarrtl":"\u21A3","rarrw":"\u219D","ratail":"\u291A","rAtail":"\u291C","ratio":"\u2236","rationals":"\u211A","rbarr":"\u290D","rBarr":"\u290F","RBarr":"\u2910","rbbrk":"\u2773","rbrace":"}","rbrack":"]","rbrke":"\u298C","rbrksld":"\u298E","rbrkslu":"\u2990","Rcaron":"\u0158","rcaron":"\u0159","Rcedil":"\u0156","rcedil":"\u0157","rceil":"\u2309","rcub":"}","Rcy":"\u0420","rcy":"\u0440","rdca":"\u2937","rdldhar":"\u2969","rdquo":"\u201D","rdquor":"\u201D","rdsh":"\u21B3","real":"\u211C","realine":"\u211B","realpart":"\u211C","reals":"\u211D","Re":"\u211C","rect":"\u25AD","reg":"\u00AE","REG":"\u00AE","ReverseElement":"\u220B","ReverseEquilibrium":"\u21CB","ReverseUpEquilibrium":"\u296F","rfisht":"\u297D","rfloor":"\u230B","rfr":"\uD835\uDD2F","Rfr":"\u211C","rHar":"\u2964","rhard":"\u21C1","rharu":"\u21C0","rharul":"\u296C","Rho":"\u03A1","rho":"\u03C1","rhov":"\u03F1","RightAngleBracket":"\u27E9","RightArrowBar":"\u21E5","rightarrow":"\u2192","RightArrow":"\u2192","Rightarrow":"\u21D2","RightArrowLeftArrow":"\u21C4","rightarrowtail":"\u21A3","RightCeiling":"\u2309","RightDoubleBracket":"\u27E7","RightDownTeeVector":"\u295D","RightDownVectorBar":"\u2955","RightDownVector":"\u21C2","RightFloor":"\u230B","rightharpoondown":"\u21C1","rightharpoonup":"\u21C0","rightleftarrows":"\u21C4","rightleftharpoons":"\u21CC","rightrightarrows":"\u21C9","rightsquigarrow":"\u219D","RightTeeArrow":"\u21A6","RightTee":"\u22A2","RightTeeVector":"\u295B","rightthreetimes":"\u22CC","RightTriangleBar":"\u29D0","RightTriangle":"\u22B3","RightTriangleEqual":"\u22B5","RightUpDownVector":"\u294F","RightUpTeeVector":"\u295C","RightUpVectorBar":"\u2954","RightUpVector":"\u21BE","RightVectorBar":"\u2953","RightVector":"\u21C0","ring":"\u02DA","risingdotseq":"\u2253","rlarr":"\u21C4","rlhar":"\u21CC","rlm":"\u200F","rmoustache":"\u23B1","rmoust":"\u23B1","rnmid":"\u2AEE","roang":"\u27ED","roarr":"\u21FE","robrk":"\u27E7","ropar":"\u2986","ropf":"\uD835\uDD63","Ropf":"\u211D","roplus":"\u2A2E","rotimes":"\u2A35","RoundImplies":"\u2970","rpar":")","rpargt":"\u2994","rppolint":"\u2A12","rrarr":"\u21C9","Rrightarrow":"\u21DB","rsaquo":"\u203A","rscr":"\uD835\uDCC7","Rscr":"\u211B","rsh":"\u21B1","Rsh":"\u21B1","rsqb":"]","rsquo":"\u2019","rsquor":"\u2019","rthree":"\u22CC","rtimes":"\u22CA","rtri":"\u25B9","rtrie":"\u22B5","rtrif":"\u25B8","rtriltri":"\u29CE","RuleDelayed":"\u29F4","ruluhar":"\u2968","rx":"\u211E","Sacute":"\u015A","sacute":"\u015B","sbquo":"\u201A","scap":"\u2AB8","Scaron":"\u0160","scaron":"\u0161","Sc":"\u2ABC","sc":"\u227B","sccue":"\u227D","sce":"\u2AB0","scE":"\u2AB4","Scedil":"\u015E","scedil":"\u015F","Scirc":"\u015C","scirc":"\u015D","scnap":"\u2ABA","scnE":"\u2AB6","scnsim":"\u22E9","scpolint":"\u2A13","scsim":"\u227F","Scy":"\u0421","scy":"\u0441","sdotb":"\u22A1","sdot":"\u22C5","sdote":"\u2A66","searhk":"\u2925","searr":"\u2198","seArr":"\u21D8","searrow":"\u2198","sect":"\u00A7","semi":";","seswar":"\u2929","setminus":"\u2216","setmn":"\u2216","sext":"\u2736","Sfr":"\uD835\uDD16","sfr":"\uD835\uDD30","sfrown":"\u2322","sharp":"\u266F","SHCHcy":"\u0429","shchcy":"\u0449","SHcy":"\u0428","shcy":"\u0448","ShortDownArrow":"\u2193","ShortLeftArrow":"\u2190","shortmid":"\u2223","shortparallel":"\u2225","ShortRightArrow":"\u2192","ShortUpArrow":"\u2191","shy":"\u00AD","Sigma":"\u03A3","sigma":"\u03C3","sigmaf":"\u03C2","sigmav":"\u03C2","sim":"\u223C","simdot":"\u2A6A","sime":"\u2243","simeq":"\u2243","simg":"\u2A9E","simgE":"\u2AA0","siml":"\u2A9D","simlE":"\u2A9F","simne":"\u2246","simplus":"\u2A24","simrarr":"\u2972","slarr":"\u2190","SmallCircle":"\u2218","smallsetminus":"\u2216","smashp":"\u2A33","smeparsl":"\u29E4","smid":"\u2223","smile":"\u2323","smt":"\u2AAA","smte":"\u2AAC","smtes":"\u2AAC\uFE00","SOFTcy":"\u042C","softcy":"\u044C","solbar":"\u233F","solb":"\u29C4","sol":"/","Sopf":"\uD835\uDD4A","sopf":"\uD835\uDD64","spades":"\u2660","spadesuit":"\u2660","spar":"\u2225","sqcap":"\u2293","sqcaps":"\u2293\uFE00","sqcup":"\u2294","sqcups":"\u2294\uFE00","Sqrt":"\u221A","sqsub":"\u228F","sqsube":"\u2291","sqsubset":"\u228F","sqsubseteq":"\u2291","sqsup":"\u2290","sqsupe":"\u2292","sqsupset":"\u2290","sqsupseteq":"\u2292","square":"\u25A1","Square":"\u25A1","SquareIntersection":"\u2293","SquareSubset":"\u228F","SquareSubsetEqual":"\u2291","SquareSuperset":"\u2290","SquareSupersetEqual":"\u2292","SquareUnion":"\u2294","squarf":"\u25AA","squ":"\u25A1","squf":"\u25AA","srarr":"\u2192","Sscr":"\uD835\uDCAE","sscr":"\uD835\uDCC8","ssetmn":"\u2216","ssmile":"\u2323","sstarf":"\u22C6","Star":"\u22C6","star":"\u2606","starf":"\u2605","straightepsilon":"\u03F5","straightphi":"\u03D5","strns":"\u00AF","sub":"\u2282","Sub":"\u22D0","subdot":"\u2ABD","subE":"\u2AC5","sube":"\u2286","subedot":"\u2AC3","submult":"\u2AC1","subnE":"\u2ACB","subne":"\u228A","subplus":"\u2ABF","subrarr":"\u2979","subset":"\u2282","Subset":"\u22D0","subseteq":"\u2286","subseteqq":"\u2AC5","SubsetEqual":"\u2286","subsetneq":"\u228A","subsetneqq":"\u2ACB","subsim":"\u2AC7","subsub":"\u2AD5","subsup":"\u2AD3","succapprox":"\u2AB8","succ":"\u227B","succcurlyeq":"\u227D","Succeeds":"\u227B","SucceedsEqual":"\u2AB0","SucceedsSlantEqual":"\u227D","SucceedsTilde":"\u227F","succeq":"\u2AB0","succnapprox":"\u2ABA","succneqq":"\u2AB6","succnsim":"\u22E9","succsim":"\u227F","SuchThat":"\u220B","sum":"\u2211","Sum":"\u2211","sung":"\u266A","sup1":"\u00B9","sup2":"\u00B2","sup3":"\u00B3","sup":"\u2283","Sup":"\u22D1","supdot":"\u2ABE","supdsub":"\u2AD8","supE":"\u2AC6","supe":"\u2287","supedot":"\u2AC4","Superset":"\u2283","SupersetEqual":"\u2287","suphsol":"\u27C9","suphsub":"\u2AD7","suplarr":"\u297B","supmult":"\u2AC2","supnE":"\u2ACC","supne":"\u228B","supplus":"\u2AC0","supset":"\u2283","Supset":"\u22D1","supseteq":"\u2287","supseteqq":"\u2AC6","supsetneq":"\u228B","supsetneqq":"\u2ACC","supsim":"\u2AC8","supsub":"\u2AD4","supsup":"\u2AD6","swarhk":"\u2926","swarr":"\u2199","swArr":"\u21D9","swarrow":"\u2199","swnwar":"\u292A","szlig":"\u00DF","Tab":"\t","target":"\u2316","Tau":"\u03A4","tau":"\u03C4","tbrk":"\u23B4","Tcaron":"\u0164","tcaron":"\u0165","Tcedil":"\u0162","tcedil":"\u0163","Tcy":"\u0422","tcy":"\u0442","tdot":"\u20DB","telrec":"\u2315","Tfr":"\uD835\uDD17","tfr":"\uD835\uDD31","there4":"\u2234","therefore":"\u2234","Therefore":"\u2234","Theta":"\u0398","theta":"\u03B8","thetasym":"\u03D1","thetav":"\u03D1","thickapprox":"\u2248","thicksim":"\u223C","ThickSpace":"\u205F\u200A","ThinSpace":"\u2009","thinsp":"\u2009","thkap":"\u2248","thksim":"\u223C","THORN":"\u00DE","thorn":"\u00FE","tilde":"\u02DC","Tilde":"\u223C","TildeEqual":"\u2243","TildeFullEqual":"\u2245","TildeTilde":"\u2248","timesbar":"\u2A31","timesb":"\u22A0","times":"\u00D7","timesd":"\u2A30","tint":"\u222D","toea":"\u2928","topbot":"\u2336","topcir":"\u2AF1","top":"\u22A4","Topf":"\uD835\uDD4B","topf":"\uD835\uDD65","topfork":"\u2ADA","tosa":"\u2929","tprime":"\u2034","trade":"\u2122","TRADE":"\u2122","triangle":"\u25B5","triangledown":"\u25BF","triangleleft":"\u25C3","trianglelefteq":"\u22B4","triangleq":"\u225C","triangleright":"\u25B9","trianglerighteq":"\u22B5","tridot":"\u25EC","trie":"\u225C","triminus":"\u2A3A","TripleDot":"\u20DB","triplus":"\u2A39","trisb":"\u29CD","tritime":"\u2A3B","trpezium":"\u23E2","Tscr":"\uD835\uDCAF","tscr":"\uD835\uDCC9","TScy":"\u0426","tscy":"\u0446","TSHcy":"\u040B","tshcy":"\u045B","Tstrok":"\u0166","tstrok":"\u0167","twixt":"\u226C","twoheadleftarrow":"\u219E","twoheadrightarrow":"\u21A0","Uacute":"\u00DA","uacute":"\u00FA","uarr":"\u2191","Uarr":"\u219F","uArr":"\u21D1","Uarrocir":"\u2949","Ubrcy":"\u040E","ubrcy":"\u045E","Ubreve":"\u016C","ubreve":"\u016D","Ucirc":"\u00DB","ucirc":"\u00FB","Ucy":"\u0423","ucy":"\u0443","udarr":"\u21C5","Udblac":"\u0170","udblac":"\u0171","udhar":"\u296E","ufisht":"\u297E","Ufr":"\uD835\uDD18","ufr":"\uD835\uDD32","Ugrave":"\u00D9","ugrave":"\u00F9","uHar":"\u2963","uharl":"\u21BF","uharr":"\u21BE","uhblk":"\u2580","ulcorn":"\u231C","ulcorner":"\u231C","ulcrop":"\u230F","ultri":"\u25F8","Umacr":"\u016A","umacr":"\u016B","uml":"\u00A8","UnderBar":"_","UnderBrace":"\u23DF","UnderBracket":"\u23B5","UnderParenthesis":"\u23DD","Union":"\u22C3","UnionPlus":"\u228E","Uogon":"\u0172","uogon":"\u0173","Uopf":"\uD835\uDD4C","uopf":"\uD835\uDD66","UpArrowBar":"\u2912","uparrow":"\u2191","UpArrow":"\u2191","Uparrow":"\u21D1","UpArrowDownArrow":"\u21C5","updownarrow":"\u2195","UpDownArrow":"\u2195","Updownarrow":"\u21D5","UpEquilibrium":"\u296E","upharpoonleft":"\u21BF","upharpoonright":"\u21BE","uplus":"\u228E","UpperLeftArrow":"\u2196","UpperRightArrow":"\u2197","upsi":"\u03C5","Upsi":"\u03D2","upsih":"\u03D2","Upsilon":"\u03A5","upsilon":"\u03C5","UpTeeArrow":"\u21A5","UpTee":"\u22A5","upuparrows":"\u21C8","urcorn":"\u231D","urcorner":"\u231D","urcrop":"\u230E","Uring":"\u016E","uring":"\u016F","urtri":"\u25F9","Uscr":"\uD835\uDCB0","uscr":"\uD835\uDCCA","utdot":"\u22F0","Utilde":"\u0168","utilde":"\u0169","utri":"\u25B5","utrif":"\u25B4","uuarr":"\u21C8","Uuml":"\u00DC","uuml":"\u00FC","uwangle":"\u29A7","vangrt":"\u299C","varepsilon":"\u03F5","varkappa":"\u03F0","varnothing":"\u2205","varphi":"\u03D5","varpi":"\u03D6","varpropto":"\u221D","varr":"\u2195","vArr":"\u21D5","varrho":"\u03F1","varsigma":"\u03C2","varsubsetneq":"\u228A\uFE00","varsubsetneqq":"\u2ACB\uFE00","varsupsetneq":"\u228B\uFE00","varsupsetneqq":"\u2ACC\uFE00","vartheta":"\u03D1","vartriangleleft":"\u22B2","vartriangleright":"\u22B3","vBar":"\u2AE8","Vbar":"\u2AEB","vBarv":"\u2AE9","Vcy":"\u0412","vcy":"\u0432","vdash":"\u22A2","vDash":"\u22A8","Vdash":"\u22A9","VDash":"\u22AB","Vdashl":"\u2AE6","veebar":"\u22BB","vee":"\u2228","Vee":"\u22C1","veeeq":"\u225A","vellip":"\u22EE","verbar":"|","Verbar":"\u2016","vert":"|","Vert":"\u2016","VerticalBar":"\u2223","VerticalLine":"|","VerticalSeparator":"\u2758","VerticalTilde":"\u2240","VeryThinSpace":"\u200A","Vfr":"\uD835\uDD19","vfr":"\uD835\uDD33","vltri":"\u22B2","vnsub":"\u2282\u20D2","vnsup":"\u2283\u20D2","Vopf":"\uD835\uDD4D","vopf":"\uD835\uDD67","vprop":"\u221D","vrtri":"\u22B3","Vscr":"\uD835\uDCB1","vscr":"\uD835\uDCCB","vsubnE":"\u2ACB\uFE00","vsubne":"\u228A\uFE00","vsupnE":"\u2ACC\uFE00","vsupne":"\u228B\uFE00","Vvdash":"\u22AA","vzigzag":"\u299A","Wcirc":"\u0174","wcirc":"\u0175","wedbar":"\u2A5F","wedge":"\u2227","Wedge":"\u22C0","wedgeq":"\u2259","weierp":"\u2118","Wfr":"\uD835\uDD1A","wfr":"\uD835\uDD34","Wopf":"\uD835\uDD4E","wopf":"\uD835\uDD68","wp":"\u2118","wr":"\u2240","wreath":"\u2240","Wscr":"\uD835\uDCB2","wscr":"\uD835\uDCCC","xcap":"\u22C2","xcirc":"\u25EF","xcup":"\u22C3","xdtri":"\u25BD","Xfr":"\uD835\uDD1B","xfr":"\uD835\uDD35","xharr":"\u27F7","xhArr":"\u27FA","Xi":"\u039E","xi":"\u03BE","xlarr":"\u27F5","xlArr":"\u27F8","xmap":"\u27FC","xnis":"\u22FB","xodot":"\u2A00","Xopf":"\uD835\uDD4F","xopf":"\uD835\uDD69","xoplus":"\u2A01","xotime":"\u2A02","xrarr":"\u27F6","xrArr":"\u27F9","Xscr":"\uD835\uDCB3","xscr":"\uD835\uDCCD","xsqcup":"\u2A06","xuplus":"\u2A04","xutri":"\u25B3","xvee":"\u22C1","xwedge":"\u22C0","Yacute":"\u00DD","yacute":"\u00FD","YAcy":"\u042F","yacy":"\u044F","Ycirc":"\u0176","ycirc":"\u0177","Ycy":"\u042B","ycy":"\u044B","yen":"\u00A5","Yfr":"\uD835\uDD1C","yfr":"\uD835\uDD36","YIcy":"\u0407","yicy":"\u0457","Yopf":"\uD835\uDD50","yopf":"\uD835\uDD6A","Yscr":"\uD835\uDCB4","yscr":"\uD835\uDCCE","YUcy":"\u042E","yucy":"\u044E","yuml":"\u00FF","Yuml":"\u0178","Zacute":"\u0179","zacute":"\u017A","Zcaron":"\u017D","zcaron":"\u017E","Zcy":"\u0417","zcy":"\u0437","Zdot":"\u017B","zdot":"\u017C","zeetrf":"\u2128","ZeroWidthSpace":"\u200B","Zeta":"\u0396","zeta":"\u03B6","zfr":"\uD835\uDD37","Zfr":"\u2128","ZHcy":"\u0416","zhcy":"\u0436","zigrarr":"\u21DD","zopf":"\uD835\uDD6B","Zopf":"\u2124","Zscr":"\uD835\uDCB5","zscr":"\uD835\uDCCF","zwj":"\u200D","zwnj":"\u200C"};
},1154,[]);
__d(function(global, require, _importDefaultUnused, _importAllUnused, module, exports, _dependencyMapUnused) {
  module.exports = {"Aacute":"\u00C1","aacute":"\u00E1","Acirc":"\u00C2","acirc":"\u00E2","acute":"\u00B4","AElig":"\u00C6","aelig":"\u00E6","Agrave":"\u00C0","agrave":"\u00E0","amp":"&","AMP":"&","Aring":"\u00C5","aring":"\u00E5","Atilde":"\u00C3","atilde":"\u00E3","Auml":"\u00C4","auml":"\u00E4","brvbar":"\u00A6","Ccedil":"\u00C7","ccedil":"\u00E7","cedil":"\u00B8","cent":"\u00A2","copy":"\u00A9","COPY":"\u00A9","curren":"\u00A4","deg":"\u00B0","divide":"\u00F7","Eacute":"\u00C9","eacute":"\u00E9","Ecirc":"\u00CA","ecirc":"\u00EA","Egrave":"\u00C8","egrave":"\u00E8","ETH":"\u00D0","eth":"\u00F0","Euml":"\u00CB","euml":"\u00EB","frac12":"\u00BD","frac14":"\u00BC","frac34":"\u00BE","gt":">","GT":">","Iacute":"\u00CD","iacute":"\u00ED","Icirc":"\u00CE","icirc":"\u00EE","iexcl":"\u00A1","Igrave":"\u00CC","igrave":"\u00EC","iquest":"\u00BF","Iuml":"\u00CF","iuml":"\u00EF","laquo":"\u00AB","lt":"<","LT":"<","macr":"\u00AF","micro":"\u00B5","middot":"\u00B7","nbsp":"\u00A0","not":"\u00AC","Ntilde":"\u00D1","ntilde":"\u00F1","Oacute":"\u00D3","oacute":"\u00F3","Ocirc":"\u00D4","ocirc":"\u00F4","Ograve":"\u00D2","ograve":"\u00F2","ordf":"\u00AA","ordm":"\u00BA","Oslash":"\u00D8","oslash":"\u00F8","Otilde":"\u00D5","otilde":"\u00F5","Ouml":"\u00D6","ouml":"\u00F6","para":"\u00B6","plusmn":"\u00B1","pound":"\u00A3","quot":"\"","QUOT":"\"","raquo":"\u00BB","reg":"\u00AE","REG":"\u00AE","sect":"\u00A7","shy":"\u00AD","sup1":"\u00B9","sup2":"\u00B2","sup3":"\u00B3","szlig":"\u00DF","THORN":"\u00DE","thorn":"\u00FE","times":"\u00D7","Uacute":"\u00DA","uacute":"\u00FA","Ucirc":"\u00DB","ucirc":"\u00FB","Ugrave":"\u00D9","ugrave":"\u00F9","uml":"\u00A8","Uuml":"\u00DC","uuml":"\u00FC","Yacute":"\u00DD","yacute":"\u00FD","yen":"\u00A5","yuml":"\u00FF"};
},1155,[]);
__d(function(global, require, _importDefaultUnused, _importAllUnused, module, exports, _dependencyMapUnused) {
  module.exports = {"amp":"&","apos":"'","gt":">","lt":"<","quot":"\""}
;
},1156,[]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  if (typeof Object.create === 'function') {
    // implementation from standard node.js 'util' module
    module.exports = function inherits(ctor, superCtor) {
      if (superCtor) {
        ctor.super_ = superCtor;
        ctor.prototype = Object.create(superCtor.prototype, {
          constructor: {
            value: ctor,
            enumerable: false,
            writable: true,
            configurable: true
          }
        });
      }
    };
  } else {
    // old school shim for old browsers
    module.exports = function inherits(ctor, superCtor) {
      if (superCtor) {
        ctor.super_ = superCtor;
        var TempCtor = function () {};
        TempCtor.prototype = superCtor.prototype;
        ctor.prototype = new TempCtor();
        ctor.prototype.constructor = ctor;
      }
    };
  }
},1157,[]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  /*!
   * EventEmitter2
   * https://github.com/hij1nx/EventEmitter2
   *
   * Copyright (c) 2013 hij1nx
   * Licensed under the MIT license.
   */
  ;
  !function (undefined) {
    var isArray = Array.isArray ? Array.isArray : function _isArray(obj) {
      return Object.prototype.toString.call(obj) === "[object Array]";
    };
    var defaultMaxListeners = 10;
    function init() {
      this._events = {};
      if (this._conf) {
        configure.call(this, this._conf);
      }
    }
    function configure(conf) {
      if (conf) {
        this._conf = conf;
        conf.delimiter && (this.delimiter = conf.delimiter);
        conf.maxListeners && (this._events.maxListeners = conf.maxListeners);
        conf.wildcard && (this.wildcard = conf.wildcard);
        conf.newListener && (this.newListener = conf.newListener);
        if (this.wildcard) {
          this.listenerTree = {};
        }
      }
    }
    function EventEmitter(conf) {
      this._events = {};
      this.newListener = false;
      configure.call(this, conf);
    }
    EventEmitter.EventEmitter2 = EventEmitter; // backwards compatibility for exporting EventEmitter property

    //
    // Attention, function return type now is array, always !
    // It has zero elements if no any matches found and one or more
    // elements (leafs) if there are matches
    //
    function searchListenerTree(handlers, type, tree, i) {
      if (!tree) {
        return [];
      }
      var listeners = [],
        leaf,
        len,
        branch,
        xTree,
        xxTree,
        isolatedBranch,
        endReached,
        typeLength = type.length,
        currentType = type[i],
        nextType = type[i + 1];
      if (i === typeLength && tree._listeners) {
        //
        // If at the end of the event(s) list and the tree has listeners
        // invoke those listeners.
        //
        if (typeof tree._listeners === 'function') {
          handlers && handlers.push(tree._listeners);
          return [tree];
        } else {
          for (leaf = 0, len = tree._listeners.length; leaf < len; leaf++) {
            handlers && handlers.push(tree._listeners[leaf]);
          }
          return [tree];
        }
      }
      if (currentType === '*' || currentType === '**' || tree[currentType]) {
        //
        // If the event emitted is '*' at this part
        // or there is a concrete match at this patch
        //
        if (currentType === '*') {
          for (branch in tree) {
            if (branch !== '_listeners' && tree.hasOwnProperty(branch)) {
              listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], i + 1));
            }
          }
          return listeners;
        } else if (currentType === '**') {
          endReached = i + 1 === typeLength || i + 2 === typeLength && nextType === '*';
          if (endReached && tree._listeners) {
            // The next element has a _listeners, add it to the handlers.
            listeners = listeners.concat(searchListenerTree(handlers, type, tree, typeLength));
          }
          for (branch in tree) {
            if (branch !== '_listeners' && tree.hasOwnProperty(branch)) {
              if (branch === '*' || branch === '**') {
                if (tree[branch]._listeners && !endReached) {
                  listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], typeLength));
                }
                listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], i));
              } else if (branch === nextType) {
                listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], i + 2));
              } else {
                // No match on this one, shift into the tree but not in the type array.
                listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], i));
              }
            }
          }
          return listeners;
        }
        listeners = listeners.concat(searchListenerTree(handlers, type, tree[currentType], i + 1));
      }
      xTree = tree['*'];
      if (xTree) {
        //
        // If the listener tree will allow any match for this part,
        // then recursively explore all branches of the tree
        //
        searchListenerTree(handlers, type, xTree, i + 1);
      }
      xxTree = tree['**'];
      if (xxTree) {
        if (i < typeLength) {
          if (xxTree._listeners) {
            // If we have a listener on a '**', it will catch all, so add its handler.
            searchListenerTree(handlers, type, xxTree, typeLength);
          }

          // Build arrays of matching next branches and others.
          for (branch in xxTree) {
            if (branch !== '_listeners' && xxTree.hasOwnProperty(branch)) {
              if (branch === nextType) {
                // We know the next element will match, so jump twice.
                searchListenerTree(handlers, type, xxTree[branch], i + 2);
              } else if (branch === currentType) {
                // Current node matches, move into the tree.
                searchListenerTree(handlers, type, xxTree[branch], i + 1);
              } else {
                isolatedBranch = {};
                isolatedBranch[branch] = xxTree[branch];
                searchListenerTree(handlers, type, {
                  '**': isolatedBranch
                }, i + 1);
              }
            }
          }
        } else if (xxTree._listeners) {
          // We have reached the end and still on a '**'
          searchListenerTree(handlers, type, xxTree, typeLength);
        } else if (xxTree['*'] && xxTree['*']._listeners) {
          searchListenerTree(handlers, type, xxTree['*'], typeLength);
        }
      }
      return listeners;
    }
    function growListenerTree(type, listener) {
      type = typeof type === 'string' ? type.split(this.delimiter) : type.slice();

      //
      // Looks for two consecutive '**', if so, don't add the event at all.
      //
      for (var i = 0, len = type.length; i + 1 < len; i++) {
        if (type[i] === '**' && type[i + 1] === '**') {
          return;
        }
      }
      var tree = this.listenerTree;
      var name = type.shift();
      while (name) {
        if (!tree[name]) {
          tree[name] = {};
        }
        tree = tree[name];
        if (type.length === 0) {
          if (!tree._listeners) {
            tree._listeners = listener;
          } else if (typeof tree._listeners === 'function') {
            tree._listeners = [tree._listeners, listener];
          } else if (isArray(tree._listeners)) {
            tree._listeners.push(listener);
            if (!tree._listeners.warned) {
              var m = defaultMaxListeners;
              if (typeof this._events.maxListeners !== 'undefined') {
                m = this._events.maxListeners;
              }
              if (m > 0 && tree._listeners.length > m) {
                tree._listeners.warned = true;
                console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.", tree._listeners.length);
                if (console.trace) {
                  console.trace();
                }
              }
            }
          }
          return true;
        }
        name = type.shift();
      }
      return true;
    }

    // By default EventEmitters will print a warning if more than
    // 10 listeners are added to it. This is a useful default which
    // helps finding memory leaks.
    //
    // Obviously not all Emitters should be limited to 10. This function allows
    // that to be increased. Set to zero for unlimited.

    EventEmitter.prototype.delimiter = '.';
    EventEmitter.prototype.setMaxListeners = function (n) {
      this._events || init.call(this);
      this._events.maxListeners = n;
      if (!this._conf) this._conf = {};
      this._conf.maxListeners = n;
    };
    EventEmitter.prototype.event = '';
    EventEmitter.prototype.once = function (event, fn) {
      this.many(event, 1, fn);
      return this;
    };
    EventEmitter.prototype.many = function (event, ttl, fn) {
      var self = this;
      if (typeof fn !== 'function') {
        throw new Error('many only accepts instances of Function');
      }
      function listener() {
        if (--ttl === 0) {
          self.off(event, listener);
        }
        fn.apply(this, arguments);
      }
      listener._origin = fn;
      this.on(event, listener);
      return self;
    };
    EventEmitter.prototype.emit = function () {
      this._events || init.call(this);
      var type = arguments[0];
      if (type === 'newListener' && !this.newListener) {
        if (!this._events.newListener) {
          return false;
        }
      }
      var al = arguments.length;
      var args, l, i, j;
      var handler;
      if (this._all && this._all.length) {
        handler = this._all.slice();
        if (al > 3) {
          args = new Array(al);
          for (j = 1; j < al; j++) args[j] = arguments[j];
        }
        for (i = 0, l = handler.length; i < l; i++) {
          this.event = type;
          switch (al) {
            case 1:
              handler[i].call(this, type);
              break;
            case 2:
              handler[i].call(this, type, arguments[1]);
              break;
            case 3:
              handler[i].call(this, type, arguments[1], arguments[2]);
              break;
            default:
              handler[i].apply(this, args);
          }
        }
      }
      if (this.wildcard) {
        handler = [];
        var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
        searchListenerTree.call(this, handler, ns, this.listenerTree, 0);
      } else {
        handler = this._events[type];
        if (typeof handler === 'function') {
          this.event = type;
          switch (al) {
            case 1:
              handler.call(this);
              break;
            case 2:
              handler.call(this, arguments[1]);
              break;
            case 3:
              handler.call(this, arguments[1], arguments[2]);
              break;
            default:
              args = new Array(al - 1);
              for (j = 1; j < al; j++) args[j - 1] = arguments[j];
              handler.apply(this, args);
          }
          return true;
        } else if (handler) {
          // need to make copy of handlers because list can change in the middle
          // of emit call
          handler = handler.slice();
        }
      }
      if (handler && handler.length) {
        if (al > 3) {
          args = new Array(al - 1);
          for (j = 1; j < al; j++) args[j - 1] = arguments[j];
        }
        for (i = 0, l = handler.length; i < l; i++) {
          this.event = type;
          switch (al) {
            case 1:
              handler[i].call(this);
              break;
            case 2:
              handler[i].call(this, arguments[1]);
              break;
            case 3:
              handler[i].call(this, arguments[1], arguments[2]);
              break;
            default:
              handler[i].apply(this, args);
          }
        }
        return true;
      } else if (!this._all && type === 'error') {
        if (arguments[1] instanceof Error) {
          throw arguments[1]; // Unhandled 'error' event
        } else {
          throw new Error("Uncaught, unspecified 'error' event.");
        }
        return false;
      }
      return !!this._all;
    };
    EventEmitter.prototype.emitAsync = function () {
      this._events || init.call(this);
      var type = arguments[0];
      if (type === 'newListener' && !this.newListener) {
        if (!this._events.newListener) {
          return Promise.resolve([false]);
        }
      }
      var promises = [];
      var al = arguments.length;
      var args, l, i, j;
      var handler;
      if (this._all) {
        if (al > 3) {
          args = new Array(al);
          for (j = 1; j < al; j++) args[j] = arguments[j];
        }
        for (i = 0, l = this._all.length; i < l; i++) {
          this.event = type;
          switch (al) {
            case 1:
              promises.push(this._all[i].call(this, type));
              break;
            case 2:
              promises.push(this._all[i].call(this, type, arguments[1]));
              break;
            case 3:
              promises.push(this._all[i].call(this, type, arguments[1], arguments[2]));
              break;
            default:
              promises.push(this._all[i].apply(this, args));
          }
        }
      }
      if (this.wildcard) {
        handler = [];
        var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
        searchListenerTree.call(this, handler, ns, this.listenerTree, 0);
      } else {
        handler = this._events[type];
      }
      if (typeof handler === 'function') {
        this.event = type;
        switch (al) {
          case 1:
            promises.push(handler.call(this));
            break;
          case 2:
            promises.push(handler.call(this, arguments[1]));
            break;
          case 3:
            promises.push(handler.call(this, arguments[1], arguments[2]));
            break;
          default:
            args = new Array(al - 1);
            for (j = 1; j < al; j++) args[j - 1] = arguments[j];
            promises.push(handler.apply(this, args));
        }
      } else if (handler && handler.length) {
        if (al > 3) {
          args = new Array(al - 1);
          for (j = 1; j < al; j++) args[j - 1] = arguments[j];
        }
        for (i = 0, l = handler.length; i < l; i++) {
          this.event = type;
          switch (al) {
            case 1:
              promises.push(handler[i].call(this));
              break;
            case 2:
              promises.push(handler[i].call(this, arguments[1]));
              break;
            case 3:
              promises.push(handler[i].call(this, arguments[1], arguments[2]));
              break;
            default:
              promises.push(handler[i].apply(this, args));
          }
        }
      } else if (!this._all && type === 'error') {
        if (arguments[1] instanceof Error) {
          return Promise.reject(arguments[1]); // Unhandled 'error' event
        } else {
          return Promise.reject("Uncaught, unspecified 'error' event.");
        }
      }
      return Promise.all(promises);
    };
    EventEmitter.prototype.on = function (type, listener) {
      if (typeof type === 'function') {
        this.onAny(type);
        return this;
      }
      if (typeof listener !== 'function') {
        throw new Error('on only accepts instances of Function');
      }
      this._events || init.call(this);

      // To avoid recursion in the case that type == "newListeners"! Before
      // adding it to the listeners, first emit "newListeners".
      this.emit('newListener', type, listener);
      if (this.wildcard) {
        growListenerTree.call(this, type, listener);
        return this;
      }
      if (!this._events[type]) {
        // Optimize the case of one listener. Don't need the extra array object.
        this._events[type] = listener;
      } else if (typeof this._events[type] === 'function') {
        // Adding the second element, need to change to array.
        this._events[type] = [this._events[type], listener];
      } else if (isArray(this._events[type])) {
        // If we've already got an array, just append.
        this._events[type].push(listener);

        // Check for listener leak
        if (!this._events[type].warned) {
          var m = defaultMaxListeners;
          if (typeof this._events.maxListeners !== 'undefined') {
            m = this._events.maxListeners;
          }
          if (m > 0 && this._events[type].length > m) {
            this._events[type].warned = true;
            console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.", this._events[type].length);
            if (console.trace) {
              console.trace();
            }
          }
        }
      }
      return this;
    };
    EventEmitter.prototype.onAny = function (fn) {
      if (typeof fn !== 'function') {
        throw new Error('onAny only accepts instances of Function');
      }
      if (!this._all) {
        this._all = [];
      }

      // Add the function to the event listener collection.
      this._all.push(fn);
      return this;
    };
    EventEmitter.prototype.addListener = EventEmitter.prototype.on;
    EventEmitter.prototype.off = function (type, listener) {
      if (typeof listener !== 'function') {
        throw new Error('removeListener only takes instances of Function');
      }
      var handlers,
        leafs = [];
      if (this.wildcard) {
        var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
        leafs = searchListenerTree.call(this, null, ns, this.listenerTree, 0);
      } else {
        // does not use listeners(), so no side effect of creating _events[type]
        if (!this._events[type]) return this;
        handlers = this._events[type];
        leafs.push({
          _listeners: handlers
        });
      }
      for (var iLeaf = 0; iLeaf < leafs.length; iLeaf++) {
        var leaf = leafs[iLeaf];
        handlers = leaf._listeners;
        if (isArray(handlers)) {
          var position = -1;
          for (var i = 0, length = handlers.length; i < length; i++) {
            if (handlers[i] === listener || handlers[i].listener && handlers[i].listener === listener || handlers[i]._origin && handlers[i]._origin === listener) {
              position = i;
              break;
            }
          }
          if (position < 0) {
            continue;
          }
          if (this.wildcard) {
            leaf._listeners.splice(position, 1);
          } else {
            this._events[type].splice(position, 1);
          }
          if (handlers.length === 0) {
            if (this.wildcard) {
              delete leaf._listeners;
            } else {
              delete this._events[type];
            }
          }
          this.emit("removeListener", type, listener);
          return this;
        } else if (handlers === listener || handlers.listener && handlers.listener === listener || handlers._origin && handlers._origin === listener) {
          if (this.wildcard) {
            delete leaf._listeners;
          } else {
            delete this._events[type];
          }
          this.emit("removeListener", type, listener);
        }
      }
      function recursivelyGarbageCollect(root) {
        if (root === undefined) {
          return;
        }
        var keys = Object.keys(root);
        for (var i in keys) {
          var key = keys[i];
          var obj = root[key];
          if (obj instanceof Function || typeof obj !== "object") continue;
          if (Object.keys(obj).length > 0) {
            recursivelyGarbageCollect(root[key]);
          }
          if (Object.keys(obj).length === 0) {
            delete root[key];
          }
        }
      }
      recursivelyGarbageCollect(this.listenerTree);
      return this;
    };
    EventEmitter.prototype.offAny = function (fn) {
      var i = 0,
        l = 0,
        fns;
      if (fn && this._all && this._all.length > 0) {
        fns = this._all;
        for (i = 0, l = fns.length; i < l; i++) {
          if (fn === fns[i]) {
            fns.splice(i, 1);
            this.emit("removeListenerAny", fn);
            return this;
          }
        }
      } else {
        fns = this._all;
        for (i = 0, l = fns.length; i < l; i++) this.emit("removeListenerAny", fns[i]);
        this._all = [];
      }
      return this;
    };
    EventEmitter.prototype.removeListener = EventEmitter.prototype.off;
    EventEmitter.prototype.removeAllListeners = function (type) {
      if (arguments.length === 0) {
        !this._events || init.call(this);
        return this;
      }
      if (this.wildcard) {
        var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
        var leafs = searchListenerTree.call(this, null, ns, this.listenerTree, 0);
        for (var iLeaf = 0; iLeaf < leafs.length; iLeaf++) {
          var leaf = leafs[iLeaf];
          leaf._listeners = null;
        }
      } else {
        if (!this._events || !this._events[type]) return this;
        this._events[type] = null;
      }
      return this;
    };
    EventEmitter.prototype.listeners = function (type) {
      if (this.wildcard) {
        var handlers = [];
        var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
        searchListenerTree.call(this, handlers, ns, this.listenerTree, 0);
        return handlers;
      }
      this._events || init.call(this);
      if (!this._events[type]) this._events[type] = [];
      if (!isArray(this._events[type])) {
        this._events[type] = [this._events[type]];
      }
      return this._events[type];
    };
    EventEmitter.prototype.listenersAny = function () {
      if (this._all) {
        return this._all;
      } else {
        return [];
      }
    };
    if (typeof define === 'function' && define.amd) {
      // AMD. Register as an anonymous module.
      define(function () {
        return EventEmitter;
      });
    } else if (typeof exports === 'object') {
      // CommonJS
      module.exports = EventEmitter;
    } else {
      // Browser global.
      window.EventEmitter2 = EventEmitter;
    }
  }();
},1158,[]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var ElementType = require(_dependencyMap[0]);
  var re_whitespace = /\s+/g;
  var NodePrototype = require(_dependencyMap[1]);
  var ElementPrototype = require(_dependencyMap[2]);
  function DomHandler(callback, options, elementCB) {
    if (typeof callback === "object") {
      elementCB = options;
      options = callback;
      callback = null;
    } else if (typeof options === "function") {
      elementCB = options;
      options = defaultOpts;
    }
    this._callback = callback;
    this._options = options || defaultOpts;
    this._elementCB = elementCB;
    this.dom = [];
    this._done = false;
    this._tagStack = [];
    this._parser = this._parser || null;
  }

  //default options
  var defaultOpts = {
    normalizeWhitespace: false,
    //Replace all whitespace with single spaces
    withStartIndices: false,
    //Add startIndex properties to nodes
    withEndIndices: false //Add endIndex properties to nodes
  };
  DomHandler.prototype.onparserinit = function (parser) {
    this._parser = parser;
  };

  //Resets the handler back to starting state
  DomHandler.prototype.onreset = function () {
    DomHandler.call(this, this._callback, this._options, this._elementCB);
  };

  //Signals the handler that parsing is done
  DomHandler.prototype.onend = function () {
    if (this._done) return;
    this._done = true;
    this._parser = null;
    this._handleCallback(null);
  };
  DomHandler.prototype._handleCallback = DomHandler.prototype.onerror = function (error) {
    if (typeof this._callback === "function") {
      this._callback(error, this.dom);
    } else {
      if (error) throw error;
    }
  };
  DomHandler.prototype.onclosetag = function () {
    //if(this._tagStack.pop().name !== name) this._handleCallback(Error("Tagname didn't match!"));

    var elem = this._tagStack.pop();
    if (this._options.withEndIndices && elem) {
      elem.endIndex = this._parser.endIndex;
    }
    if (this._elementCB) this._elementCB(elem);
  };
  DomHandler.prototype._createDomElement = function (properties) {
    if (!this._options.withDomLvl1) return properties;
    var element;
    if (properties.type === "tag") {
      element = Object.create(ElementPrototype);
    } else {
      element = Object.create(NodePrototype);
    }
    for (var key in properties) {
      if (properties.hasOwnProperty(key)) {
        element[key] = properties[key];
      }
    }
    return element;
  };
  DomHandler.prototype._addDomElement = function (element) {
    var parent = this._tagStack[this._tagStack.length - 1];
    var siblings = parent ? parent.children : this.dom;
    var previousSibling = siblings[siblings.length - 1];
    element.next = null;
    if (this._options.withStartIndices) {
      element.startIndex = this._parser.startIndex;
    }
    if (this._options.withEndIndices) {
      element.endIndex = this._parser.endIndex;
    }
    if (previousSibling) {
      element.prev = previousSibling;
      previousSibling.next = element;
    } else {
      element.prev = null;
    }
    siblings.push(element);
    element.parent = parent || null;
  };
  DomHandler.prototype.onopentag = function (name, attribs) {
    var properties = {
      type: name === "script" ? ElementType.Script : name === "style" ? ElementType.Style : ElementType.Tag,
      name: name,
      attribs: attribs,
      children: []
    };
    var element = this._createDomElement(properties);
    this._addDomElement(element);
    this._tagStack.push(element);
  };
  DomHandler.prototype.ontext = function (data) {
    //the ignoreWhitespace is officially dropped, but for now,
    //it's an alias for normalizeWhitespace
    var normalize = this._options.normalizeWhitespace || this._options.ignoreWhitespace;
    var lastTag;
    if (!this._tagStack.length && this.dom.length && (lastTag = this.dom[this.dom.length - 1]).type === ElementType.Text) {
      if (normalize) {
        lastTag.data = (lastTag.data + data).replace(re_whitespace, " ");
      } else {
        lastTag.data += data;
      }
    } else {
      if (this._tagStack.length && (lastTag = this._tagStack[this._tagStack.length - 1]) && (lastTag = lastTag.children[lastTag.children.length - 1]) && lastTag.type === ElementType.Text) {
        if (normalize) {
          lastTag.data = (lastTag.data + data).replace(re_whitespace, " ");
        } else {
          lastTag.data += data;
        }
      } else {
        if (normalize) {
          data = data.replace(re_whitespace, " ");
        }
        var element = this._createDomElement({
          data: data,
          type: ElementType.Text
        });
        this._addDomElement(element);
      }
    }
  };
  DomHandler.prototype.oncomment = function (data) {
    var lastTag = this._tagStack[this._tagStack.length - 1];
    if (lastTag && lastTag.type === ElementType.Comment) {
      lastTag.data += data;
      return;
    }
    var properties = {
      data: data,
      type: ElementType.Comment
    };
    var element = this._createDomElement(properties);
    this._addDomElement(element);
    this._tagStack.push(element);
  };
  DomHandler.prototype.oncdatastart = function () {
    var properties = {
      children: [{
        data: "",
        type: ElementType.Text
      }],
      type: ElementType.CDATA
    };
    var element = this._createDomElement(properties);
    this._addDomElement(element);
    this._tagStack.push(element);
  };
  DomHandler.prototype.oncommentend = DomHandler.prototype.oncdataend = function () {
    this._tagStack.pop();
  };
  DomHandler.prototype.onprocessinginstruction = function (name, data) {
    var element = this._createDomElement({
      name: name,
      data: data,
      type: ElementType.Directive
    });
    this._addDomElement(element);
  };
  module.exports = DomHandler;
},1159,[1160,1161,1162]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  //Types of elements found in the DOM
  module.exports = {
    Text: "text",
    //Text
    Directive: "directive",
    //<? ... ?>
    Comment: "comment",
    //<!-- ... -->
    Script: "script",
    //<script> tags
    Style: "style",
    //<style> tags
    Tag: "tag",
    //Any tag
    CDATA: "cdata",
    //<![CDATA[ ... ]]>
    Doctype: "doctype",
    isTag: function (elem) {
      return elem.type === "tag" || elem.type === "script" || elem.type === "style";
    }
  };
},1160,[]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  // This object will be used as the prototype for Nodes when creating a
  // DOM-Level-1-compliant structure.
  var NodePrototype = module.exports = {
    get firstChild() {
      var children = this.children;
      return children && children[0] || null;
    },
    get lastChild() {
      var children = this.children;
      return children && children[children.length - 1] || null;
    },
    get nodeType() {
      return nodeTypes[this.type] || nodeTypes.element;
    }
  };
  var domLvl1 = {
    tagName: "name",
    childNodes: "children",
    parentNode: "parent",
    previousSibling: "prev",
    nextSibling: "next",
    nodeValue: "data"
  };
  var nodeTypes = {
    element: 1,
    text: 3,
    cdata: 4,
    comment: 8
  };
  Object.keys(domLvl1).forEach(function (key) {
    var shorthand = domLvl1[key];
    Object.defineProperty(NodePrototype, key, {
      get: function () {
        return this[shorthand] || null;
      },
      set: function (val) {
        this[shorthand] = val;
        return val;
      }
    });
  });
},1161,[]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  // DOM-Level-1-compliant structure
  var NodePrototype = require(_dependencyMap[0]);
  var ElementPrototype = module.exports = Object.create(NodePrototype);
  var domLvl1 = {
    tagName: "name"
  };
  Object.keys(domLvl1).forEach(function (key) {
    var shorthand = domLvl1[key];
    Object.defineProperty(ElementPrototype, key, {
      get: function () {
        return this[shorthand] || null;
      },
      set: function (val) {
        this[shorthand] = val;
        return val;
      }
    });
  });
},1162,[1161]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var index = require(_dependencyMap[0]),
    DomHandler = index.DomHandler,
    DomUtils = index.DomUtils;

  //TODO: make this a streamable handler
  function FeedHandler(callback, options) {
    this.init(callback, options);
  }
  require(_dependencyMap[1])(FeedHandler, DomHandler);
  FeedHandler.prototype.init = DomHandler;
  function getElements(what, where) {
    return DomUtils.getElementsByTagName(what, where, true);
  }
  function getOneElement(what, where) {
    return DomUtils.getElementsByTagName(what, where, true, 1)[0];
  }
  function fetch(what, where, recurse) {
    return DomUtils.getText(DomUtils.getElementsByTagName(what, where, recurse, 1)).trim();
  }
  function addConditionally(obj, prop, what, where, recurse) {
    var tmp = fetch(what, where, recurse);
    if (tmp) obj[prop] = tmp;
  }
  var isValidFeed = function (value) {
    return value === "rss" || value === "feed" || value === "rdf:RDF";
  };
  FeedHandler.prototype.onend = function () {
    var feed = {},
      feedRoot = getOneElement(isValidFeed, this.dom),
      tmp,
      childs;
    if (feedRoot) {
      if (feedRoot.name === "feed") {
        childs = feedRoot.children;
        feed.type = "atom";
        addConditionally(feed, "id", "id", childs);
        addConditionally(feed, "title", "title", childs);
        if ((tmp = getOneElement("link", childs)) && (tmp = tmp.attribs) && (tmp = tmp.href)) feed.link = tmp;
        addConditionally(feed, "description", "subtitle", childs);
        if (tmp = fetch("updated", childs)) feed.updated = new Date(tmp);
        addConditionally(feed, "author", "email", childs, true);
        feed.items = getElements("entry", childs).map(function (item) {
          var entry = {},
            tmp;
          item = item.children;
          addConditionally(entry, "id", "id", item);
          addConditionally(entry, "title", "title", item);
          if ((tmp = getOneElement("link", item)) && (tmp = tmp.attribs) && (tmp = tmp.href)) entry.link = tmp;
          if (tmp = fetch("summary", item) || fetch("content", item)) entry.description = tmp;
          if (tmp = fetch("updated", item)) entry.pubDate = new Date(tmp);
          return entry;
        });
      } else {
        childs = getOneElement("channel", feedRoot.children).children;
        feed.type = feedRoot.name.substr(0, 3);
        feed.id = "";
        addConditionally(feed, "title", "title", childs);
        addConditionally(feed, "link", "link", childs);
        addConditionally(feed, "description", "description", childs);
        if (tmp = fetch("lastBuildDate", childs)) feed.updated = new Date(tmp);
        addConditionally(feed, "author", "managingEditor", childs, true);
        feed.items = getElements("item", feedRoot.children).map(function (item) {
          var entry = {},
            tmp;
          item = item.children;
          addConditionally(entry, "id", "guid", item);
          addConditionally(entry, "title", "title", item);
          addConditionally(entry, "link", "link", item);
          addConditionally(entry, "description", "description", item);
          if (tmp = fetch("pubDate", item)) entry.pubDate = new Date(tmp);
          return entry;
        });
      }
    }
    this.dom = feed;
    DomHandler.prototype._handleCallback.call(this, feedRoot ? null : Error("couldn't find root of feed"));
  };
  module.exports = FeedHandler;
},1163,[1149,1157]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  module.exports = ProxyHandler;
  function ProxyHandler(cbs) {
    this._cbs = cbs || {};
  }
  var EVENTS = require(_dependencyMap[0]).EVENTS;
  Object.keys(EVENTS).forEach(function (name) {
    if (EVENTS[name] === 0) {
      name = "on" + name;
      ProxyHandler.prototype[name] = function () {
        if (this._cbs[name]) this._cbs[name]();
      };
    } else if (EVENTS[name] === 1) {
      name = "on" + name;
      ProxyHandler.prototype[name] = function (a) {
        if (this._cbs[name]) this._cbs[name](a);
      };
    } else if (EVENTS[name] === 2) {
      name = "on" + name;
      ProxyHandler.prototype[name] = function (a, b) {
        if (this._cbs[name]) this._cbs[name](a, b);
      };
    } else {
      throw Error("wrong number of arguments");
    }
  });
},1164,[1149]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var DomUtils = module.exports;
  [require(_dependencyMap[0]), require(_dependencyMap[1]), require(_dependencyMap[2]), require(_dependencyMap[3]), require(_dependencyMap[4]), require(_dependencyMap[5])].forEach(function (ext) {
    Object.keys(ext).forEach(function (key) {
      DomUtils[key] = ext[key].bind(DomUtils);
    });
  });
},1165,[1166,1178,1179,1180,1181,1182]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var ElementType = require(_dependencyMap[0]),
    getOuterHTML = require(_dependencyMap[1]),
    isTag = ElementType.isTag;
  module.exports = {
    getInnerHTML: getInnerHTML,
    getOuterHTML: getOuterHTML,
    getText: getText
  };
  function getInnerHTML(elem, opts) {
    return elem.children ? elem.children.map(function (elem) {
      return getOuterHTML(elem, opts);
    }).join("") : "";
  }
  function getText(elem) {
    if (Array.isArray(elem)) return elem.map(getText).join("");
    if (isTag(elem)) return elem.name === "br" ? "\n" : getText(elem.children);
    if (elem.type === ElementType.CDATA) return getText(elem.children);
    if (elem.type === ElementType.Text) return elem.data;
    return "";
  }
},1166,[1160,1167]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  /*
    Module dependencies
  */
  var ElementType = require(_dependencyMap[0]);
  var entities = require(_dependencyMap[1]);

  /* mixed-case SVG and MathML tags & attributes
     recognized by the HTML parser, see
     https://html.spec.whatwg.org/multipage/parsing.html#parsing-main-inforeign
  */
  var foreignNames = require(_dependencyMap[2]);
  foreignNames.elementNames.__proto__ = null; /* use as a simple dictionary */
  foreignNames.attributeNames.__proto__ = null;
  var unencodedElements = {
    __proto__: null,
    style: true,
    script: true,
    xmp: true,
    iframe: true,
    noembed: true,
    noframes: true,
    plaintext: true,
    noscript: true
  };

  /*
    Format attributes
  */
  function formatAttrs(attributes, opts) {
    if (!attributes) return;
    var output = '';
    var value;

    // Loop through the attributes
    for (var key in attributes) {
      value = attributes[key];
      if (output) {
        output += ' ';
      }
      if (opts.xmlMode === 'foreign') {
        /* fix up mixed-case attribute names */
        key = foreignNames.attributeNames[key] || key;
      }
      output += key;
      if (value !== null && value !== '' || opts.xmlMode) {
        output += '="' + (opts.decodeEntities ? entities.encodeXML(value) : value.replace(/\"/g, '&quot;')) + '"';
      }
    }
    return output;
  }

  /*
    Self-enclosing tags (stolen from node-htmlparser)
  */
  var singleTag = {
    __proto__: null,
    area: true,
    base: true,
    basefont: true,
    br: true,
    col: true,
    command: true,
    embed: true,
    frame: true,
    hr: true,
    img: true,
    input: true,
    isindex: true,
    keygen: true,
    link: true,
    meta: true,
    param: true,
    source: true,
    track: true,
    wbr: true
  };
  var render = module.exports = function (dom, opts) {
    if (!Array.isArray(dom) && !dom.cheerio) dom = [dom];
    opts = opts || {};
    var output = '';
    for (var i = 0; i < dom.length; i++) {
      var elem = dom[i];
      if (elem.type === 'root') output += render(elem.children, opts);else if (ElementType.isTag(elem)) output += renderTag(elem, opts);else if (elem.type === ElementType.Directive) output += renderDirective(elem);else if (elem.type === ElementType.Comment) output += renderComment(elem);else if (elem.type === ElementType.CDATA) output += renderCdata(elem);else output += renderText(elem, opts);
    }
    return output;
  };
  var foreignModeIntegrationPoints = ['mi', 'mo', 'mn', 'ms', 'mtext', 'annotation-xml', 'foreignObject', 'desc', 'title'];
  function renderTag(elem, opts) {
    // Handle SVG / MathML in HTML
    if (opts.xmlMode === 'foreign') {
      /* fix up mixed-case element names */
      elem.name = foreignNames.elementNames[elem.name] || elem.name;
      /* exit foreign mode at integration points */
      if (elem.parent && foreignModeIntegrationPoints.indexOf(elem.parent.name) >= 0) opts = Object.assign({}, opts, {
        xmlMode: false
      });
    }
    if (!opts.xmlMode && ['svg', 'math'].indexOf(elem.name) >= 0) {
      opts = Object.assign({}, opts, {
        xmlMode: 'foreign'
      });
    }
    var tag = '<' + elem.name;
    var attribs = formatAttrs(elem.attribs, opts);
    if (attribs) {
      tag += ' ' + attribs;
    }
    if (opts.xmlMode && (!elem.children || elem.children.length === 0)) {
      tag += '/>';
    } else {
      tag += '>';
      if (elem.children) {
        tag += render(elem.children, opts);
      }
      if (!singleTag[elem.name] || opts.xmlMode) {
        tag += '</' + elem.name + '>';
      }
    }
    return tag;
  }
  function renderDirective(elem) {
    return '<' + elem.data + '>';
  }
  function renderText(elem, opts) {
    var data = elem.data || '';

    // if entities weren't decoded, no need to encode them back
    if (opts.decodeEntities && !(elem.parent && elem.parent.name in unencodedElements)) {
      data = entities.encodeXML(data);
    }
    return data;
  }
  function renderCdata(elem) {
    return '<![CDATA[' + elem.children[0].data + ']]>';
  }
  function renderComment(elem) {
    return '<!--' + elem.data + '-->';
  }
},1167,[1168,1169,1177]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Doctype = exports.CDATA = exports.Tag = exports.Style = exports.Script = exports.Comment = exports.Directive = exports.Text = exports.Root = exports.isTag = exports.ElementType = undefined;
  /** Types of elements found in htmlparser2's DOM */
  var ElementType;
  (function (ElementType) {
    /** Type for the root element of a document */
    ElementType["Root"] = "root";
    /** Type for Text */
    ElementType["Text"] = "text";
    /** Type for <? ... ?> */
    ElementType["Directive"] = "directive";
    /** Type for <!-- ... --> */
    ElementType["Comment"] = "comment";
    /** Type for <script> tags */
    ElementType["Script"] = "script";
    /** Type for <style> tags */
    ElementType["Style"] = "style";
    /** Type for Any tag */
    ElementType["Tag"] = "tag";
    /** Type for <![CDATA[ ... ]]> */
    ElementType["CDATA"] = "cdata";
    /** Type for <!doctype ...> */
    ElementType["Doctype"] = "doctype";
  })(ElementType = exports.ElementType || (exports.ElementType = {}));
  /**
   * Tests whether an element is a tag or not.
   *
   * @param elem Element to test
   */
  function isTag(elem) {
    return elem.type === ElementType.Tag || elem.type === ElementType.Script || elem.type === ElementType.Style;
  }
  exports.isTag = isTag;
  // Exports for backwards compatibility
  /** Type for the root element of a document */
  exports.Root = ElementType.Root;
  /** Type for Text */
  exports.Text = ElementType.Text;
  /** Type for <? ... ?> */
  exports.Directive = ElementType.Directive;
  /** Type for <!-- ... --> */
  exports.Comment = ElementType.Comment;
  /** Type for <script> tags */
  exports.Script = ElementType.Script;
  /** Type for <style> tags */
  exports.Style = ElementType.Style;
  /** Type for Any tag */
  exports.Tag = ElementType.Tag;
  /** Type for <![CDATA[ ... ]]> */
  exports.CDATA = ElementType.CDATA;
  /** Type for <!doctype ...> */
  exports.Doctype = ElementType.Doctype;
},1168,[]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.decodeXMLStrict = exports.decodeHTML5Strict = exports.decodeHTML4Strict = exports.decodeHTML5 = exports.decodeHTML4 = exports.decodeHTMLStrict = exports.decodeHTML = exports.decodeXML = exports.encodeHTML5 = exports.encodeHTML4 = exports.escapeUTF8 = exports.escape = exports.encodeNonAsciiHTML = exports.encodeHTML = exports.encodeXML = exports.encode = exports.decodeStrict = exports.decode = undefined;
  var decode_1 = require(_dependencyMap[0]);
  var encode_1 = require(_dependencyMap[1]);
  /**
   * Decodes a string with entities.
   *
   * @param data String to decode.
   * @param level Optional level to decode at. 0 = XML, 1 = HTML. Default is 0.
   * @deprecated Use `decodeXML` or `decodeHTML` directly.
   */
  function decode(data, level) {
    return (!level || level <= 0 ? decode_1.decodeXML : decode_1.decodeHTML)(data);
  }
  exports.decode = decode;
  /**
   * Decodes a string with entities. Does not allow missing trailing semicolons for entities.
   *
   * @param data String to decode.
   * @param level Optional level to decode at. 0 = XML, 1 = HTML. Default is 0.
   * @deprecated Use `decodeHTMLStrict` or `decodeXML` directly.
   */
  function decodeStrict(data, level) {
    return (!level || level <= 0 ? decode_1.decodeXML : decode_1.decodeHTMLStrict)(data);
  }
  exports.decodeStrict = decodeStrict;
  /**
   * Encodes a string with entities.
   *
   * @param data String to encode.
   * @param level Optional level to encode at. 0 = XML, 1 = HTML. Default is 0.
   * @deprecated Use `encodeHTML`, `encodeXML` or `encodeNonAsciiHTML` directly.
   */
  function encode(data, level) {
    return (!level || level <= 0 ? encode_1.encodeXML : encode_1.encodeHTML)(data);
  }
  exports.encode = encode;
  var encode_2 = require(_dependencyMap[1]);
  Object.defineProperty(exports, "encodeXML", {
    enumerable: true,
    get: function () {
      return encode_2.encodeXML;
    }
  });
  Object.defineProperty(exports, "encodeHTML", {
    enumerable: true,
    get: function () {
      return encode_2.encodeHTML;
    }
  });
  Object.defineProperty(exports, "encodeNonAsciiHTML", {
    enumerable: true,
    get: function () {
      return encode_2.encodeNonAsciiHTML;
    }
  });
  Object.defineProperty(exports, "escape", {
    enumerable: true,
    get: function () {
      return encode_2.escape;
    }
  });
  Object.defineProperty(exports, "escapeUTF8", {
    enumerable: true,
    get: function () {
      return encode_2.escapeUTF8;
    }
  });
  // Legacy aliases (deprecated)
  Object.defineProperty(exports, "encodeHTML4", {
    enumerable: true,
    get: function () {
      return encode_2.encodeHTML;
    }
  });
  Object.defineProperty(exports, "encodeHTML5", {
    enumerable: true,
    get: function () {
      return encode_2.encodeHTML;
    }
  });
  var decode_2 = require(_dependencyMap[0]);
  Object.defineProperty(exports, "decodeXML", {
    enumerable: true,
    get: function () {
      return decode_2.decodeXML;
    }
  });
  Object.defineProperty(exports, "decodeHTML", {
    enumerable: true,
    get: function () {
      return decode_2.decodeHTML;
    }
  });
  Object.defineProperty(exports, "decodeHTMLStrict", {
    enumerable: true,
    get: function () {
      return decode_2.decodeHTMLStrict;
    }
  });
  // Legacy aliases (deprecated)
  Object.defineProperty(exports, "decodeHTML4", {
    enumerable: true,
    get: function () {
      return decode_2.decodeHTML;
    }
  });
  Object.defineProperty(exports, "decodeHTML5", {
    enumerable: true,
    get: function () {
      return decode_2.decodeHTML;
    }
  });
  Object.defineProperty(exports, "decodeHTML4Strict", {
    enumerable: true,
    get: function () {
      return decode_2.decodeHTMLStrict;
    }
  });
  Object.defineProperty(exports, "decodeHTML5Strict", {
    enumerable: true,
    get: function () {
      return decode_2.decodeHTMLStrict;
    }
  });
  Object.defineProperty(exports, "decodeXMLStrict", {
    enumerable: true,
    get: function () {
      return decode_2.decodeXML;
    }
  });
},1169,[1170,1176]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  var __importDefault = this && this.__importDefault || function (mod) {
    return mod && mod.__esModule ? mod : {
      "default": mod
    };
  };
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.decodeHTML = exports.decodeHTMLStrict = exports.decodeXML = undefined;
  var entities_json_1 = __importDefault(require(_dependencyMap[0]));
  var legacy_json_1 = __importDefault(require(_dependencyMap[1]));
  var xml_json_1 = __importDefault(require(_dependencyMap[2]));
  var decode_codepoint_1 = __importDefault(require(_dependencyMap[3]));
  var strictEntityRe = /&(?:[a-zA-Z0-9]+|#[xX][\da-fA-F]+|#\d+);/g;
  exports.decodeXML = getStrictDecoder(xml_json_1.default);
  exports.decodeHTMLStrict = getStrictDecoder(entities_json_1.default);
  function getStrictDecoder(map) {
    var replace = getReplacer(map);
    return function (str) {
      return String(str).replace(strictEntityRe, replace);
    };
  }
  var sorter = function (a, b) {
    return a < b ? 1 : -1;
  };
  exports.decodeHTML = function () {
    var legacy = Object.keys(legacy_json_1.default).sort(sorter);
    var keys = Object.keys(entities_json_1.default).sort(sorter);
    for (var i = 0, j = 0; i < keys.length; i++) {
      if (legacy[j] === keys[i]) {
        keys[i] += ";?";
        j++;
      } else {
        keys[i] += ";";
      }
    }
    var re = new RegExp("&(?:" + keys.join("|") + "|#[xX][\\da-fA-F]+;?|#\\d+;?)", "g");
    var replace = getReplacer(entities_json_1.default);
    function replacer(str) {
      if (str.substr(-1) !== ";") str += ";";
      return replace(str);
    }
    // TODO consider creating a merged map
    return function (str) {
      return String(str).replace(re, replacer);
    };
  }();
  function getReplacer(map) {
    return function replace(str) {
      if (str.charAt(1) === "#") {
        var secondChar = str.charAt(2);
        if (secondChar === "X" || secondChar === "x") {
          return decode_codepoint_1.default(parseInt(str.substr(3), 16));
        }
        return decode_codepoint_1.default(parseInt(str.substr(2), 10));
      }
      // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
      return map[str.slice(1, -1)] || str;
    };
  }
},1170,[1171,1172,1173,1174]);
__d(function(global, require, _importDefaultUnused, _importAllUnused, module, exports, _dependencyMapUnused) {
  module.exports = {"Aacute":"Á","aacute":"á","Abreve":"Ă","abreve":"ă","ac":"∾","acd":"∿","acE":"∾̳","Acirc":"Â","acirc":"â","acute":"´","Acy":"А","acy":"а","AElig":"Æ","aelig":"æ","af":"⁡","Afr":"𝔄","afr":"𝔞","Agrave":"À","agrave":"à","alefsym":"ℵ","aleph":"ℵ","Alpha":"Α","alpha":"α","Amacr":"Ā","amacr":"ā","amalg":"⨿","amp":"&","AMP":"&","andand":"⩕","And":"⩓","and":"∧","andd":"⩜","andslope":"⩘","andv":"⩚","ang":"∠","ange":"⦤","angle":"∠","angmsdaa":"⦨","angmsdab":"⦩","angmsdac":"⦪","angmsdad":"⦫","angmsdae":"⦬","angmsdaf":"⦭","angmsdag":"⦮","angmsdah":"⦯","angmsd":"∡","angrt":"∟","angrtvb":"⊾","angrtvbd":"⦝","angsph":"∢","angst":"Å","angzarr":"⍼","Aogon":"Ą","aogon":"ą","Aopf":"𝔸","aopf":"𝕒","apacir":"⩯","ap":"≈","apE":"⩰","ape":"≊","apid":"≋","apos":"'","ApplyFunction":"⁡","approx":"≈","approxeq":"≊","Aring":"Å","aring":"å","Ascr":"𝒜","ascr":"𝒶","Assign":"≔","ast":"*","asymp":"≈","asympeq":"≍","Atilde":"Ã","atilde":"ã","Auml":"Ä","auml":"ä","awconint":"∳","awint":"⨑","backcong":"≌","backepsilon":"϶","backprime":"‵","backsim":"∽","backsimeq":"⋍","Backslash":"∖","Barv":"⫧","barvee":"⊽","barwed":"⌅","Barwed":"⌆","barwedge":"⌅","bbrk":"⎵","bbrktbrk":"⎶","bcong":"≌","Bcy":"Б","bcy":"б","bdquo":"„","becaus":"∵","because":"∵","Because":"∵","bemptyv":"⦰","bepsi":"϶","bernou":"ℬ","Bernoullis":"ℬ","Beta":"Β","beta":"β","beth":"ℶ","between":"≬","Bfr":"𝔅","bfr":"𝔟","bigcap":"⋂","bigcirc":"◯","bigcup":"⋃","bigodot":"⨀","bigoplus":"⨁","bigotimes":"⨂","bigsqcup":"⨆","bigstar":"★","bigtriangledown":"▽","bigtriangleup":"△","biguplus":"⨄","bigvee":"⋁","bigwedge":"⋀","bkarow":"⤍","blacklozenge":"⧫","blacksquare":"▪","blacktriangle":"▴","blacktriangledown":"▾","blacktriangleleft":"◂","blacktriangleright":"▸","blank":"␣","blk12":"▒","blk14":"░","blk34":"▓","block":"█","bne":"=⃥","bnequiv":"≡⃥","bNot":"⫭","bnot":"⌐","Bopf":"𝔹","bopf":"𝕓","bot":"⊥","bottom":"⊥","bowtie":"⋈","boxbox":"⧉","boxdl":"┐","boxdL":"╕","boxDl":"╖","boxDL":"╗","boxdr":"┌","boxdR":"╒","boxDr":"╓","boxDR":"╔","boxh":"─","boxH":"═","boxhd":"┬","boxHd":"╤","boxhD":"╥","boxHD":"╦","boxhu":"┴","boxHu":"╧","boxhU":"╨","boxHU":"╩","boxminus":"⊟","boxplus":"⊞","boxtimes":"⊠","boxul":"┘","boxuL":"╛","boxUl":"╜","boxUL":"╝","boxur":"└","boxuR":"╘","boxUr":"╙","boxUR":"╚","boxv":"│","boxV":"║","boxvh":"┼","boxvH":"╪","boxVh":"╫","boxVH":"╬","boxvl":"┤","boxvL":"╡","boxVl":"╢","boxVL":"╣","boxvr":"├","boxvR":"╞","boxVr":"╟","boxVR":"╠","bprime":"‵","breve":"˘","Breve":"˘","brvbar":"¦","bscr":"𝒷","Bscr":"ℬ","bsemi":"⁏","bsim":"∽","bsime":"⋍","bsolb":"⧅","bsol":"\\","bsolhsub":"⟈","bull":"•","bullet":"•","bump":"≎","bumpE":"⪮","bumpe":"≏","Bumpeq":"≎","bumpeq":"≏","Cacute":"Ć","cacute":"ć","capand":"⩄","capbrcup":"⩉","capcap":"⩋","cap":"∩","Cap":"⋒","capcup":"⩇","capdot":"⩀","CapitalDifferentialD":"ⅅ","caps":"∩︀","caret":"⁁","caron":"ˇ","Cayleys":"ℭ","ccaps":"⩍","Ccaron":"Č","ccaron":"č","Ccedil":"Ç","ccedil":"ç","Ccirc":"Ĉ","ccirc":"ĉ","Cconint":"∰","ccups":"⩌","ccupssm":"⩐","Cdot":"Ċ","cdot":"ċ","cedil":"¸","Cedilla":"¸","cemptyv":"⦲","cent":"¢","centerdot":"·","CenterDot":"·","cfr":"𝔠","Cfr":"ℭ","CHcy":"Ч","chcy":"ч","check":"✓","checkmark":"✓","Chi":"Χ","chi":"χ","circ":"ˆ","circeq":"≗","circlearrowleft":"↺","circlearrowright":"↻","circledast":"⊛","circledcirc":"⊚","circleddash":"⊝","CircleDot":"⊙","circledR":"®","circledS":"Ⓢ","CircleMinus":"⊖","CirclePlus":"⊕","CircleTimes":"⊗","cir":"○","cirE":"⧃","cire":"≗","cirfnint":"⨐","cirmid":"⫯","cirscir":"⧂","ClockwiseContourIntegral":"∲","CloseCurlyDoubleQuote":"”","CloseCurlyQuote":"’","clubs":"♣","clubsuit":"♣","colon":":","Colon":"∷","Colone":"⩴","colone":"≔","coloneq":"≔","comma":",","commat":"@","comp":"∁","compfn":"∘","complement":"∁","complexes":"ℂ","cong":"≅","congdot":"⩭","Congruent":"≡","conint":"∮","Conint":"∯","ContourIntegral":"∮","copf":"𝕔","Copf":"ℂ","coprod":"∐","Coproduct":"∐","copy":"©","COPY":"©","copysr":"℗","CounterClockwiseContourIntegral":"∳","crarr":"↵","cross":"✗","Cross":"⨯","Cscr":"𝒞","cscr":"𝒸","csub":"⫏","csube":"⫑","csup":"⫐","csupe":"⫒","ctdot":"⋯","cudarrl":"⤸","cudarrr":"⤵","cuepr":"⋞","cuesc":"⋟","cularr":"↶","cularrp":"⤽","cupbrcap":"⩈","cupcap":"⩆","CupCap":"≍","cup":"∪","Cup":"⋓","cupcup":"⩊","cupdot":"⊍","cupor":"⩅","cups":"∪︀","curarr":"↷","curarrm":"⤼","curlyeqprec":"⋞","curlyeqsucc":"⋟","curlyvee":"⋎","curlywedge":"⋏","curren":"¤","curvearrowleft":"↶","curvearrowright":"↷","cuvee":"⋎","cuwed":"⋏","cwconint":"∲","cwint":"∱","cylcty":"⌭","dagger":"†","Dagger":"‡","daleth":"ℸ","darr":"↓","Darr":"↡","dArr":"⇓","dash":"‐","Dashv":"⫤","dashv":"⊣","dbkarow":"⤏","dblac":"˝","Dcaron":"Ď","dcaron":"ď","Dcy":"Д","dcy":"д","ddagger":"‡","ddarr":"⇊","DD":"ⅅ","dd":"ⅆ","DDotrahd":"⤑","ddotseq":"⩷","deg":"°","Del":"∇","Delta":"Δ","delta":"δ","demptyv":"⦱","dfisht":"⥿","Dfr":"𝔇","dfr":"𝔡","dHar":"⥥","dharl":"⇃","dharr":"⇂","DiacriticalAcute":"´","DiacriticalDot":"˙","DiacriticalDoubleAcute":"˝","DiacriticalGrave":"`","DiacriticalTilde":"˜","diam":"⋄","diamond":"⋄","Diamond":"⋄","diamondsuit":"♦","diams":"♦","die":"¨","DifferentialD":"ⅆ","digamma":"ϝ","disin":"⋲","div":"÷","divide":"÷","divideontimes":"⋇","divonx":"⋇","DJcy":"Ђ","djcy":"ђ","dlcorn":"⌞","dlcrop":"⌍","dollar":"$","Dopf":"𝔻","dopf":"𝕕","Dot":"¨","dot":"˙","DotDot":"⃜","doteq":"≐","doteqdot":"≑","DotEqual":"≐","dotminus":"∸","dotplus":"∔","dotsquare":"⊡","doublebarwedge":"⌆","DoubleContourIntegral":"∯","DoubleDot":"¨","DoubleDownArrow":"⇓","DoubleLeftArrow":"⇐","DoubleLeftRightArrow":"⇔","DoubleLeftTee":"⫤","DoubleLongLeftArrow":"⟸","DoubleLongLeftRightArrow":"⟺","DoubleLongRightArrow":"⟹","DoubleRightArrow":"⇒","DoubleRightTee":"⊨","DoubleUpArrow":"⇑","DoubleUpDownArrow":"⇕","DoubleVerticalBar":"∥","DownArrowBar":"⤓","downarrow":"↓","DownArrow":"↓","Downarrow":"⇓","DownArrowUpArrow":"⇵","DownBreve":"̑","downdownarrows":"⇊","downharpoonleft":"⇃","downharpoonright":"⇂","DownLeftRightVector":"⥐","DownLeftTeeVector":"⥞","DownLeftVectorBar":"⥖","DownLeftVector":"↽","DownRightTeeVector":"⥟","DownRightVectorBar":"⥗","DownRightVector":"⇁","DownTeeArrow":"↧","DownTee":"⊤","drbkarow":"⤐","drcorn":"⌟","drcrop":"⌌","Dscr":"𝒟","dscr":"𝒹","DScy":"Ѕ","dscy":"ѕ","dsol":"⧶","Dstrok":"Đ","dstrok":"đ","dtdot":"⋱","dtri":"▿","dtrif":"▾","duarr":"⇵","duhar":"⥯","dwangle":"⦦","DZcy":"Џ","dzcy":"џ","dzigrarr":"⟿","Eacute":"É","eacute":"é","easter":"⩮","Ecaron":"Ě","ecaron":"ě","Ecirc":"Ê","ecirc":"ê","ecir":"≖","ecolon":"≕","Ecy":"Э","ecy":"э","eDDot":"⩷","Edot":"Ė","edot":"ė","eDot":"≑","ee":"ⅇ","efDot":"≒","Efr":"𝔈","efr":"𝔢","eg":"⪚","Egrave":"È","egrave":"è","egs":"⪖","egsdot":"⪘","el":"⪙","Element":"∈","elinters":"⏧","ell":"ℓ","els":"⪕","elsdot":"⪗","Emacr":"Ē","emacr":"ē","empty":"∅","emptyset":"∅","EmptySmallSquare":"◻","emptyv":"∅","EmptyVerySmallSquare":"▫","emsp13":" ","emsp14":" ","emsp":" ","ENG":"Ŋ","eng":"ŋ","ensp":" ","Eogon":"Ę","eogon":"ę","Eopf":"𝔼","eopf":"𝕖","epar":"⋕","eparsl":"⧣","eplus":"⩱","epsi":"ε","Epsilon":"Ε","epsilon":"ε","epsiv":"ϵ","eqcirc":"≖","eqcolon":"≕","eqsim":"≂","eqslantgtr":"⪖","eqslantless":"⪕","Equal":"⩵","equals":"=","EqualTilde":"≂","equest":"≟","Equilibrium":"⇌","equiv":"≡","equivDD":"⩸","eqvparsl":"⧥","erarr":"⥱","erDot":"≓","escr":"ℯ","Escr":"ℰ","esdot":"≐","Esim":"⩳","esim":"≂","Eta":"Η","eta":"η","ETH":"Ð","eth":"ð","Euml":"Ë","euml":"ë","euro":"€","excl":"!","exist":"∃","Exists":"∃","expectation":"ℰ","exponentiale":"ⅇ","ExponentialE":"ⅇ","fallingdotseq":"≒","Fcy":"Ф","fcy":"ф","female":"♀","ffilig":"ﬃ","fflig":"ﬀ","ffllig":"ﬄ","Ffr":"𝔉","ffr":"𝔣","filig":"ﬁ","FilledSmallSquare":"◼","FilledVerySmallSquare":"▪","fjlig":"fj","flat":"♭","fllig":"ﬂ","fltns":"▱","fnof":"ƒ","Fopf":"𝔽","fopf":"𝕗","forall":"∀","ForAll":"∀","fork":"⋔","forkv":"⫙","Fouriertrf":"ℱ","fpartint":"⨍","frac12":"½","frac13":"⅓","frac14":"¼","frac15":"⅕","frac16":"⅙","frac18":"⅛","frac23":"⅔","frac25":"⅖","frac34":"¾","frac35":"⅗","frac38":"⅜","frac45":"⅘","frac56":"⅚","frac58":"⅝","frac78":"⅞","frasl":"⁄","frown":"⌢","fscr":"𝒻","Fscr":"ℱ","gacute":"ǵ","Gamma":"Γ","gamma":"γ","Gammad":"Ϝ","gammad":"ϝ","gap":"⪆","Gbreve":"Ğ","gbreve":"ğ","Gcedil":"Ģ","Gcirc":"Ĝ","gcirc":"ĝ","Gcy":"Г","gcy":"г","Gdot":"Ġ","gdot":"ġ","ge":"≥","gE":"≧","gEl":"⪌","gel":"⋛","geq":"≥","geqq":"≧","geqslant":"⩾","gescc":"⪩","ges":"⩾","gesdot":"⪀","gesdoto":"⪂","gesdotol":"⪄","gesl":"⋛︀","gesles":"⪔","Gfr":"𝔊","gfr":"𝔤","gg":"≫","Gg":"⋙","ggg":"⋙","gimel":"ℷ","GJcy":"Ѓ","gjcy":"ѓ","gla":"⪥","gl":"≷","glE":"⪒","glj":"⪤","gnap":"⪊","gnapprox":"⪊","gne":"⪈","gnE":"≩","gneq":"⪈","gneqq":"≩","gnsim":"⋧","Gopf":"𝔾","gopf":"𝕘","grave":"`","GreaterEqual":"≥","GreaterEqualLess":"⋛","GreaterFullEqual":"≧","GreaterGreater":"⪢","GreaterLess":"≷","GreaterSlantEqual":"⩾","GreaterTilde":"≳","Gscr":"𝒢","gscr":"ℊ","gsim":"≳","gsime":"⪎","gsiml":"⪐","gtcc":"⪧","gtcir":"⩺","gt":">","GT":">","Gt":"≫","gtdot":"⋗","gtlPar":"⦕","gtquest":"⩼","gtrapprox":"⪆","gtrarr":"⥸","gtrdot":"⋗","gtreqless":"⋛","gtreqqless":"⪌","gtrless":"≷","gtrsim":"≳","gvertneqq":"≩︀","gvnE":"≩︀","Hacek":"ˇ","hairsp":" ","half":"½","hamilt":"ℋ","HARDcy":"Ъ","hardcy":"ъ","harrcir":"⥈","harr":"↔","hArr":"⇔","harrw":"↭","Hat":"^","hbar":"ℏ","Hcirc":"Ĥ","hcirc":"ĥ","hearts":"♥","heartsuit":"♥","hellip":"…","hercon":"⊹","hfr":"𝔥","Hfr":"ℌ","HilbertSpace":"ℋ","hksearow":"⤥","hkswarow":"⤦","hoarr":"⇿","homtht":"∻","hookleftarrow":"↩","hookrightarrow":"↪","hopf":"𝕙","Hopf":"ℍ","horbar":"―","HorizontalLine":"─","hscr":"𝒽","Hscr":"ℋ","hslash":"ℏ","Hstrok":"Ħ","hstrok":"ħ","HumpDownHump":"≎","HumpEqual":"≏","hybull":"⁃","hyphen":"‐","Iacute":"Í","iacute":"í","ic":"⁣","Icirc":"Î","icirc":"î","Icy":"И","icy":"и","Idot":"İ","IEcy":"Е","iecy":"е","iexcl":"¡","iff":"⇔","ifr":"𝔦","Ifr":"ℑ","Igrave":"Ì","igrave":"ì","ii":"ⅈ","iiiint":"⨌","iiint":"∭","iinfin":"⧜","iiota":"℩","IJlig":"Ĳ","ijlig":"ĳ","Imacr":"Ī","imacr":"ī","image":"ℑ","ImaginaryI":"ⅈ","imagline":"ℐ","imagpart":"ℑ","imath":"ı","Im":"ℑ","imof":"⊷","imped":"Ƶ","Implies":"⇒","incare":"℅","in":"∈","infin":"∞","infintie":"⧝","inodot":"ı","intcal":"⊺","int":"∫","Int":"∬","integers":"ℤ","Integral":"∫","intercal":"⊺","Intersection":"⋂","intlarhk":"⨗","intprod":"⨼","InvisibleComma":"⁣","InvisibleTimes":"⁢","IOcy":"Ё","iocy":"ё","Iogon":"Į","iogon":"į","Iopf":"𝕀","iopf":"𝕚","Iota":"Ι","iota":"ι","iprod":"⨼","iquest":"¿","iscr":"𝒾","Iscr":"ℐ","isin":"∈","isindot":"⋵","isinE":"⋹","isins":"⋴","isinsv":"⋳","isinv":"∈","it":"⁢","Itilde":"Ĩ","itilde":"ĩ","Iukcy":"І","iukcy":"і","Iuml":"Ï","iuml":"ï","Jcirc":"Ĵ","jcirc":"ĵ","Jcy":"Й","jcy":"й","Jfr":"𝔍","jfr":"𝔧","jmath":"ȷ","Jopf":"𝕁","jopf":"𝕛","Jscr":"𝒥","jscr":"𝒿","Jsercy":"Ј","jsercy":"ј","Jukcy":"Є","jukcy":"є","Kappa":"Κ","kappa":"κ","kappav":"ϰ","Kcedil":"Ķ","kcedil":"ķ","Kcy":"К","kcy":"к","Kfr":"𝔎","kfr":"𝔨","kgreen":"ĸ","KHcy":"Х","khcy":"х","KJcy":"Ќ","kjcy":"ќ","Kopf":"𝕂","kopf":"𝕜","Kscr":"𝒦","kscr":"𝓀","lAarr":"⇚","Lacute":"Ĺ","lacute":"ĺ","laemptyv":"⦴","lagran":"ℒ","Lambda":"Λ","lambda":"λ","lang":"⟨","Lang":"⟪","langd":"⦑","langle":"⟨","lap":"⪅","Laplacetrf":"ℒ","laquo":"«","larrb":"⇤","larrbfs":"⤟","larr":"←","Larr":"↞","lArr":"⇐","larrfs":"⤝","larrhk":"↩","larrlp":"↫","larrpl":"⤹","larrsim":"⥳","larrtl":"↢","latail":"⤙","lAtail":"⤛","lat":"⪫","late":"⪭","lates":"⪭︀","lbarr":"⤌","lBarr":"⤎","lbbrk":"❲","lbrace":"{","lbrack":"[","lbrke":"⦋","lbrksld":"⦏","lbrkslu":"⦍","Lcaron":"Ľ","lcaron":"ľ","Lcedil":"Ļ","lcedil":"ļ","lceil":"⌈","lcub":"{","Lcy":"Л","lcy":"л","ldca":"⤶","ldquo":"“","ldquor":"„","ldrdhar":"⥧","ldrushar":"⥋","ldsh":"↲","le":"≤","lE":"≦","LeftAngleBracket":"⟨","LeftArrowBar":"⇤","leftarrow":"←","LeftArrow":"←","Leftarrow":"⇐","LeftArrowRightArrow":"⇆","leftarrowtail":"↢","LeftCeiling":"⌈","LeftDoubleBracket":"⟦","LeftDownTeeVector":"⥡","LeftDownVectorBar":"⥙","LeftDownVector":"⇃","LeftFloor":"⌊","leftharpoondown":"↽","leftharpoonup":"↼","leftleftarrows":"⇇","leftrightarrow":"↔","LeftRightArrow":"↔","Leftrightarrow":"⇔","leftrightarrows":"⇆","leftrightharpoons":"⇋","leftrightsquigarrow":"↭","LeftRightVector":"⥎","LeftTeeArrow":"↤","LeftTee":"⊣","LeftTeeVector":"⥚","leftthreetimes":"⋋","LeftTriangleBar":"⧏","LeftTriangle":"⊲","LeftTriangleEqual":"⊴","LeftUpDownVector":"⥑","LeftUpTeeVector":"⥠","LeftUpVectorBar":"⥘","LeftUpVector":"↿","LeftVectorBar":"⥒","LeftVector":"↼","lEg":"⪋","leg":"⋚","leq":"≤","leqq":"≦","leqslant":"⩽","lescc":"⪨","les":"⩽","lesdot":"⩿","lesdoto":"⪁","lesdotor":"⪃","lesg":"⋚︀","lesges":"⪓","lessapprox":"⪅","lessdot":"⋖","lesseqgtr":"⋚","lesseqqgtr":"⪋","LessEqualGreater":"⋚","LessFullEqual":"≦","LessGreater":"≶","lessgtr":"≶","LessLess":"⪡","lesssim":"≲","LessSlantEqual":"⩽","LessTilde":"≲","lfisht":"⥼","lfloor":"⌊","Lfr":"𝔏","lfr":"𝔩","lg":"≶","lgE":"⪑","lHar":"⥢","lhard":"↽","lharu":"↼","lharul":"⥪","lhblk":"▄","LJcy":"Љ","ljcy":"љ","llarr":"⇇","ll":"≪","Ll":"⋘","llcorner":"⌞","Lleftarrow":"⇚","llhard":"⥫","lltri":"◺","Lmidot":"Ŀ","lmidot":"ŀ","lmoustache":"⎰","lmoust":"⎰","lnap":"⪉","lnapprox":"⪉","lne":"⪇","lnE":"≨","lneq":"⪇","lneqq":"≨","lnsim":"⋦","loang":"⟬","loarr":"⇽","lobrk":"⟦","longleftarrow":"⟵","LongLeftArrow":"⟵","Longleftarrow":"⟸","longleftrightarrow":"⟷","LongLeftRightArrow":"⟷","Longleftrightarrow":"⟺","longmapsto":"⟼","longrightarrow":"⟶","LongRightArrow":"⟶","Longrightarrow":"⟹","looparrowleft":"↫","looparrowright":"↬","lopar":"⦅","Lopf":"𝕃","lopf":"𝕝","loplus":"⨭","lotimes":"⨴","lowast":"∗","lowbar":"_","LowerLeftArrow":"↙","LowerRightArrow":"↘","loz":"◊","lozenge":"◊","lozf":"⧫","lpar":"(","lparlt":"⦓","lrarr":"⇆","lrcorner":"⌟","lrhar":"⇋","lrhard":"⥭","lrm":"‎","lrtri":"⊿","lsaquo":"‹","lscr":"𝓁","Lscr":"ℒ","lsh":"↰","Lsh":"↰","lsim":"≲","lsime":"⪍","lsimg":"⪏","lsqb":"[","lsquo":"‘","lsquor":"‚","Lstrok":"Ł","lstrok":"ł","ltcc":"⪦","ltcir":"⩹","lt":"<","LT":"<","Lt":"≪","ltdot":"⋖","lthree":"⋋","ltimes":"⋉","ltlarr":"⥶","ltquest":"⩻","ltri":"◃","ltrie":"⊴","ltrif":"◂","ltrPar":"⦖","lurdshar":"⥊","luruhar":"⥦","lvertneqq":"≨︀","lvnE":"≨︀","macr":"¯","male":"♂","malt":"✠","maltese":"✠","Map":"⤅","map":"↦","mapsto":"↦","mapstodown":"↧","mapstoleft":"↤","mapstoup":"↥","marker":"▮","mcomma":"⨩","Mcy":"М","mcy":"м","mdash":"—","mDDot":"∺","measuredangle":"∡","MediumSpace":" ","Mellintrf":"ℳ","Mfr":"𝔐","mfr":"𝔪","mho":"℧","micro":"µ","midast":"*","midcir":"⫰","mid":"∣","middot":"·","minusb":"⊟","minus":"−","minusd":"∸","minusdu":"⨪","MinusPlus":"∓","mlcp":"⫛","mldr":"…","mnplus":"∓","models":"⊧","Mopf":"𝕄","mopf":"𝕞","mp":"∓","mscr":"𝓂","Mscr":"ℳ","mstpos":"∾","Mu":"Μ","mu":"μ","multimap":"⊸","mumap":"⊸","nabla":"∇","Nacute":"Ń","nacute":"ń","nang":"∠⃒","nap":"≉","napE":"⩰̸","napid":"≋̸","napos":"ŉ","napprox":"≉","natural":"♮","naturals":"ℕ","natur":"♮","nbsp":" ","nbump":"≎̸","nbumpe":"≏̸","ncap":"⩃","Ncaron":"Ň","ncaron":"ň","Ncedil":"Ņ","ncedil":"ņ","ncong":"≇","ncongdot":"⩭̸","ncup":"⩂","Ncy":"Н","ncy":"н","ndash":"–","nearhk":"⤤","nearr":"↗","neArr":"⇗","nearrow":"↗","ne":"≠","nedot":"≐̸","NegativeMediumSpace":"​","NegativeThickSpace":"​","NegativeThinSpace":"​","NegativeVeryThinSpace":"​","nequiv":"≢","nesear":"⤨","nesim":"≂̸","NestedGreaterGreater":"≫","NestedLessLess":"≪","NewLine":"\n","nexist":"∄","nexists":"∄","Nfr":"𝔑","nfr":"𝔫","ngE":"≧̸","nge":"≱","ngeq":"≱","ngeqq":"≧̸","ngeqslant":"⩾̸","nges":"⩾̸","nGg":"⋙̸","ngsim":"≵","nGt":"≫⃒","ngt":"≯","ngtr":"≯","nGtv":"≫̸","nharr":"↮","nhArr":"⇎","nhpar":"⫲","ni":"∋","nis":"⋼","nisd":"⋺","niv":"∋","NJcy":"Њ","njcy":"њ","nlarr":"↚","nlArr":"⇍","nldr":"‥","nlE":"≦̸","nle":"≰","nleftarrow":"↚","nLeftarrow":"⇍","nleftrightarrow":"↮","nLeftrightarrow":"⇎","nleq":"≰","nleqq":"≦̸","nleqslant":"⩽̸","nles":"⩽̸","nless":"≮","nLl":"⋘̸","nlsim":"≴","nLt":"≪⃒","nlt":"≮","nltri":"⋪","nltrie":"⋬","nLtv":"≪̸","nmid":"∤","NoBreak":"⁠","NonBreakingSpace":" ","nopf":"𝕟","Nopf":"ℕ","Not":"⫬","not":"¬","NotCongruent":"≢","NotCupCap":"≭","NotDoubleVerticalBar":"∦","NotElement":"∉","NotEqual":"≠","NotEqualTilde":"≂̸","NotExists":"∄","NotGreater":"≯","NotGreaterEqual":"≱","NotGreaterFullEqual":"≧̸","NotGreaterGreater":"≫̸","NotGreaterLess":"≹","NotGreaterSlantEqual":"⩾̸","NotGreaterTilde":"≵","NotHumpDownHump":"≎̸","NotHumpEqual":"≏̸","notin":"∉","notindot":"⋵̸","notinE":"⋹̸","notinva":"∉","notinvb":"⋷","notinvc":"⋶","NotLeftTriangleBar":"⧏̸","NotLeftTriangle":"⋪","NotLeftTriangleEqual":"⋬","NotLess":"≮","NotLessEqual":"≰","NotLessGreater":"≸","NotLessLess":"≪̸","NotLessSlantEqual":"⩽̸","NotLessTilde":"≴","NotNestedGreaterGreater":"⪢̸","NotNestedLessLess":"⪡̸","notni":"∌","notniva":"∌","notnivb":"⋾","notnivc":"⋽","NotPrecedes":"⊀","NotPrecedesEqual":"⪯̸","NotPrecedesSlantEqual":"⋠","NotReverseElement":"∌","NotRightTriangleBar":"⧐̸","NotRightTriangle":"⋫","NotRightTriangleEqual":"⋭","NotSquareSubset":"⊏̸","NotSquareSubsetEqual":"⋢","NotSquareSuperset":"⊐̸","NotSquareSupersetEqual":"⋣","NotSubset":"⊂⃒","NotSubsetEqual":"⊈","NotSucceeds":"⊁","NotSucceedsEqual":"⪰̸","NotSucceedsSlantEqual":"⋡","NotSucceedsTilde":"≿̸","NotSuperset":"⊃⃒","NotSupersetEqual":"⊉","NotTilde":"≁","NotTildeEqual":"≄","NotTildeFullEqual":"≇","NotTildeTilde":"≉","NotVerticalBar":"∤","nparallel":"∦","npar":"∦","nparsl":"⫽⃥","npart":"∂̸","npolint":"⨔","npr":"⊀","nprcue":"⋠","nprec":"⊀","npreceq":"⪯̸","npre":"⪯̸","nrarrc":"⤳̸","nrarr":"↛","nrArr":"⇏","nrarrw":"↝̸","nrightarrow":"↛","nRightarrow":"⇏","nrtri":"⋫","nrtrie":"⋭","nsc":"⊁","nsccue":"⋡","nsce":"⪰̸","Nscr":"𝒩","nscr":"𝓃","nshortmid":"∤","nshortparallel":"∦","nsim":"≁","nsime":"≄","nsimeq":"≄","nsmid":"∤","nspar":"∦","nsqsube":"⋢","nsqsupe":"⋣","nsub":"⊄","nsubE":"⫅̸","nsube":"⊈","nsubset":"⊂⃒","nsubseteq":"⊈","nsubseteqq":"⫅̸","nsucc":"⊁","nsucceq":"⪰̸","nsup":"⊅","nsupE":"⫆̸","nsupe":"⊉","nsupset":"⊃⃒","nsupseteq":"⊉","nsupseteqq":"⫆̸","ntgl":"≹","Ntilde":"Ñ","ntilde":"ñ","ntlg":"≸","ntriangleleft":"⋪","ntrianglelefteq":"⋬","ntriangleright":"⋫","ntrianglerighteq":"⋭","Nu":"Ν","nu":"ν","num":"#","numero":"№","numsp":" ","nvap":"≍⃒","nvdash":"⊬","nvDash":"⊭","nVdash":"⊮","nVDash":"⊯","nvge":"≥⃒","nvgt":">⃒","nvHarr":"⤄","nvinfin":"⧞","nvlArr":"⤂","nvle":"≤⃒","nvlt":"<⃒","nvltrie":"⊴⃒","nvrArr":"⤃","nvrtrie":"⊵⃒","nvsim":"∼⃒","nwarhk":"⤣","nwarr":"↖","nwArr":"⇖","nwarrow":"↖","nwnear":"⤧","Oacute":"Ó","oacute":"ó","oast":"⊛","Ocirc":"Ô","ocirc":"ô","ocir":"⊚","Ocy":"О","ocy":"о","odash":"⊝","Odblac":"Ő","odblac":"ő","odiv":"⨸","odot":"⊙","odsold":"⦼","OElig":"Œ","oelig":"œ","ofcir":"⦿","Ofr":"𝔒","ofr":"𝔬","ogon":"˛","Ograve":"Ò","ograve":"ò","ogt":"⧁","ohbar":"⦵","ohm":"Ω","oint":"∮","olarr":"↺","olcir":"⦾","olcross":"⦻","oline":"‾","olt":"⧀","Omacr":"Ō","omacr":"ō","Omega":"Ω","omega":"ω","Omicron":"Ο","omicron":"ο","omid":"⦶","ominus":"⊖","Oopf":"𝕆","oopf":"𝕠","opar":"⦷","OpenCurlyDoubleQuote":"“","OpenCurlyQuote":"‘","operp":"⦹","oplus":"⊕","orarr":"↻","Or":"⩔","or":"∨","ord":"⩝","order":"ℴ","orderof":"ℴ","ordf":"ª","ordm":"º","origof":"⊶","oror":"⩖","orslope":"⩗","orv":"⩛","oS":"Ⓢ","Oscr":"𝒪","oscr":"ℴ","Oslash":"Ø","oslash":"ø","osol":"⊘","Otilde":"Õ","otilde":"õ","otimesas":"⨶","Otimes":"⨷","otimes":"⊗","Ouml":"Ö","ouml":"ö","ovbar":"⌽","OverBar":"‾","OverBrace":"⏞","OverBracket":"⎴","OverParenthesis":"⏜","para":"¶","parallel":"∥","par":"∥","parsim":"⫳","parsl":"⫽","part":"∂","PartialD":"∂","Pcy":"П","pcy":"п","percnt":"%","period":".","permil":"‰","perp":"⊥","pertenk":"‱","Pfr":"𝔓","pfr":"𝔭","Phi":"Φ","phi":"φ","phiv":"ϕ","phmmat":"ℳ","phone":"☎","Pi":"Π","pi":"π","pitchfork":"⋔","piv":"ϖ","planck":"ℏ","planckh":"ℎ","plankv":"ℏ","plusacir":"⨣","plusb":"⊞","pluscir":"⨢","plus":"+","plusdo":"∔","plusdu":"⨥","pluse":"⩲","PlusMinus":"±","plusmn":"±","plussim":"⨦","plustwo":"⨧","pm":"±","Poincareplane":"ℌ","pointint":"⨕","popf":"𝕡","Popf":"ℙ","pound":"£","prap":"⪷","Pr":"⪻","pr":"≺","prcue":"≼","precapprox":"⪷","prec":"≺","preccurlyeq":"≼","Precedes":"≺","PrecedesEqual":"⪯","PrecedesSlantEqual":"≼","PrecedesTilde":"≾","preceq":"⪯","precnapprox":"⪹","precneqq":"⪵","precnsim":"⋨","pre":"⪯","prE":"⪳","precsim":"≾","prime":"′","Prime":"″","primes":"ℙ","prnap":"⪹","prnE":"⪵","prnsim":"⋨","prod":"∏","Product":"∏","profalar":"⌮","profline":"⌒","profsurf":"⌓","prop":"∝","Proportional":"∝","Proportion":"∷","propto":"∝","prsim":"≾","prurel":"⊰","Pscr":"𝒫","pscr":"𝓅","Psi":"Ψ","psi":"ψ","puncsp":" ","Qfr":"𝔔","qfr":"𝔮","qint":"⨌","qopf":"𝕢","Qopf":"ℚ","qprime":"⁗","Qscr":"𝒬","qscr":"𝓆","quaternions":"ℍ","quatint":"⨖","quest":"?","questeq":"≟","quot":"\"","QUOT":"\"","rAarr":"⇛","race":"∽̱","Racute":"Ŕ","racute":"ŕ","radic":"√","raemptyv":"⦳","rang":"⟩","Rang":"⟫","rangd":"⦒","range":"⦥","rangle":"⟩","raquo":"»","rarrap":"⥵","rarrb":"⇥","rarrbfs":"⤠","rarrc":"⤳","rarr":"→","Rarr":"↠","rArr":"⇒","rarrfs":"⤞","rarrhk":"↪","rarrlp":"↬","rarrpl":"⥅","rarrsim":"⥴","Rarrtl":"⤖","rarrtl":"↣","rarrw":"↝","ratail":"⤚","rAtail":"⤜","ratio":"∶","rationals":"ℚ","rbarr":"⤍","rBarr":"⤏","RBarr":"⤐","rbbrk":"❳","rbrace":"}","rbrack":"]","rbrke":"⦌","rbrksld":"⦎","rbrkslu":"⦐","Rcaron":"Ř","rcaron":"ř","Rcedil":"Ŗ","rcedil":"ŗ","rceil":"⌉","rcub":"}","Rcy":"Р","rcy":"р","rdca":"⤷","rdldhar":"⥩","rdquo":"”","rdquor":"”","rdsh":"↳","real":"ℜ","realine":"ℛ","realpart":"ℜ","reals":"ℝ","Re":"ℜ","rect":"▭","reg":"®","REG":"®","ReverseElement":"∋","ReverseEquilibrium":"⇋","ReverseUpEquilibrium":"⥯","rfisht":"⥽","rfloor":"⌋","rfr":"𝔯","Rfr":"ℜ","rHar":"⥤","rhard":"⇁","rharu":"⇀","rharul":"⥬","Rho":"Ρ","rho":"ρ","rhov":"ϱ","RightAngleBracket":"⟩","RightArrowBar":"⇥","rightarrow":"→","RightArrow":"→","Rightarrow":"⇒","RightArrowLeftArrow":"⇄","rightarrowtail":"↣","RightCeiling":"⌉","RightDoubleBracket":"⟧","RightDownTeeVector":"⥝","RightDownVectorBar":"⥕","RightDownVector":"⇂","RightFloor":"⌋","rightharpoondown":"⇁","rightharpoonup":"⇀","rightleftarrows":"⇄","rightleftharpoons":"⇌","rightrightarrows":"⇉","rightsquigarrow":"↝","RightTeeArrow":"↦","RightTee":"⊢","RightTeeVector":"⥛","rightthreetimes":"⋌","RightTriangleBar":"⧐","RightTriangle":"⊳","RightTriangleEqual":"⊵","RightUpDownVector":"⥏","RightUpTeeVector":"⥜","RightUpVectorBar":"⥔","RightUpVector":"↾","RightVectorBar":"⥓","RightVector":"⇀","ring":"˚","risingdotseq":"≓","rlarr":"⇄","rlhar":"⇌","rlm":"‏","rmoustache":"⎱","rmoust":"⎱","rnmid":"⫮","roang":"⟭","roarr":"⇾","robrk":"⟧","ropar":"⦆","ropf":"𝕣","Ropf":"ℝ","roplus":"⨮","rotimes":"⨵","RoundImplies":"⥰","rpar":")","rpargt":"⦔","rppolint":"⨒","rrarr":"⇉","Rrightarrow":"⇛","rsaquo":"›","rscr":"𝓇","Rscr":"ℛ","rsh":"↱","Rsh":"↱","rsqb":"]","rsquo":"’","rsquor":"’","rthree":"⋌","rtimes":"⋊","rtri":"▹","rtrie":"⊵","rtrif":"▸","rtriltri":"⧎","RuleDelayed":"⧴","ruluhar":"⥨","rx":"℞","Sacute":"Ś","sacute":"ś","sbquo":"‚","scap":"⪸","Scaron":"Š","scaron":"š","Sc":"⪼","sc":"≻","sccue":"≽","sce":"⪰","scE":"⪴","Scedil":"Ş","scedil":"ş","Scirc":"Ŝ","scirc":"ŝ","scnap":"⪺","scnE":"⪶","scnsim":"⋩","scpolint":"⨓","scsim":"≿","Scy":"С","scy":"с","sdotb":"⊡","sdot":"⋅","sdote":"⩦","searhk":"⤥","searr":"↘","seArr":"⇘","searrow":"↘","sect":"§","semi":";","seswar":"⤩","setminus":"∖","setmn":"∖","sext":"✶","Sfr":"𝔖","sfr":"𝔰","sfrown":"⌢","sharp":"♯","SHCHcy":"Щ","shchcy":"щ","SHcy":"Ш","shcy":"ш","ShortDownArrow":"↓","ShortLeftArrow":"←","shortmid":"∣","shortparallel":"∥","ShortRightArrow":"→","ShortUpArrow":"↑","shy":"­","Sigma":"Σ","sigma":"σ","sigmaf":"ς","sigmav":"ς","sim":"∼","simdot":"⩪","sime":"≃","simeq":"≃","simg":"⪞","simgE":"⪠","siml":"⪝","simlE":"⪟","simne":"≆","simplus":"⨤","simrarr":"⥲","slarr":"←","SmallCircle":"∘","smallsetminus":"∖","smashp":"⨳","smeparsl":"⧤","smid":"∣","smile":"⌣","smt":"⪪","smte":"⪬","smtes":"⪬︀","SOFTcy":"Ь","softcy":"ь","solbar":"⌿","solb":"⧄","sol":"/","Sopf":"𝕊","sopf":"𝕤","spades":"♠","spadesuit":"♠","spar":"∥","sqcap":"⊓","sqcaps":"⊓︀","sqcup":"⊔","sqcups":"⊔︀","Sqrt":"√","sqsub":"⊏","sqsube":"⊑","sqsubset":"⊏","sqsubseteq":"⊑","sqsup":"⊐","sqsupe":"⊒","sqsupset":"⊐","sqsupseteq":"⊒","square":"□","Square":"□","SquareIntersection":"⊓","SquareSubset":"⊏","SquareSubsetEqual":"⊑","SquareSuperset":"⊐","SquareSupersetEqual":"⊒","SquareUnion":"⊔","squarf":"▪","squ":"□","squf":"▪","srarr":"→","Sscr":"𝒮","sscr":"𝓈","ssetmn":"∖","ssmile":"⌣","sstarf":"⋆","Star":"⋆","star":"☆","starf":"★","straightepsilon":"ϵ","straightphi":"ϕ","strns":"¯","sub":"⊂","Sub":"⋐","subdot":"⪽","subE":"⫅","sube":"⊆","subedot":"⫃","submult":"⫁","subnE":"⫋","subne":"⊊","subplus":"⪿","subrarr":"⥹","subset":"⊂","Subset":"⋐","subseteq":"⊆","subseteqq":"⫅","SubsetEqual":"⊆","subsetneq":"⊊","subsetneqq":"⫋","subsim":"⫇","subsub":"⫕","subsup":"⫓","succapprox":"⪸","succ":"≻","succcurlyeq":"≽","Succeeds":"≻","SucceedsEqual":"⪰","SucceedsSlantEqual":"≽","SucceedsTilde":"≿","succeq":"⪰","succnapprox":"⪺","succneqq":"⪶","succnsim":"⋩","succsim":"≿","SuchThat":"∋","sum":"∑","Sum":"∑","sung":"♪","sup1":"¹","sup2":"²","sup3":"³","sup":"⊃","Sup":"⋑","supdot":"⪾","supdsub":"⫘","supE":"⫆","supe":"⊇","supedot":"⫄","Superset":"⊃","SupersetEqual":"⊇","suphsol":"⟉","suphsub":"⫗","suplarr":"⥻","supmult":"⫂","supnE":"⫌","supne":"⊋","supplus":"⫀","supset":"⊃","Supset":"⋑","supseteq":"⊇","supseteqq":"⫆","supsetneq":"⊋","supsetneqq":"⫌","supsim":"⫈","supsub":"⫔","supsup":"⫖","swarhk":"⤦","swarr":"↙","swArr":"⇙","swarrow":"↙","swnwar":"⤪","szlig":"ß","Tab":"\t","target":"⌖","Tau":"Τ","tau":"τ","tbrk":"⎴","Tcaron":"Ť","tcaron":"ť","Tcedil":"Ţ","tcedil":"ţ","Tcy":"Т","tcy":"т","tdot":"⃛","telrec":"⌕","Tfr":"𝔗","tfr":"𝔱","there4":"∴","therefore":"∴","Therefore":"∴","Theta":"Θ","theta":"θ","thetasym":"ϑ","thetav":"ϑ","thickapprox":"≈","thicksim":"∼","ThickSpace":"  ","ThinSpace":" ","thinsp":" ","thkap":"≈","thksim":"∼","THORN":"Þ","thorn":"þ","tilde":"˜","Tilde":"∼","TildeEqual":"≃","TildeFullEqual":"≅","TildeTilde":"≈","timesbar":"⨱","timesb":"⊠","times":"×","timesd":"⨰","tint":"∭","toea":"⤨","topbot":"⌶","topcir":"⫱","top":"⊤","Topf":"𝕋","topf":"𝕥","topfork":"⫚","tosa":"⤩","tprime":"‴","trade":"™","TRADE":"™","triangle":"▵","triangledown":"▿","triangleleft":"◃","trianglelefteq":"⊴","triangleq":"≜","triangleright":"▹","trianglerighteq":"⊵","tridot":"◬","trie":"≜","triminus":"⨺","TripleDot":"⃛","triplus":"⨹","trisb":"⧍","tritime":"⨻","trpezium":"⏢","Tscr":"𝒯","tscr":"𝓉","TScy":"Ц","tscy":"ц","TSHcy":"Ћ","tshcy":"ћ","Tstrok":"Ŧ","tstrok":"ŧ","twixt":"≬","twoheadleftarrow":"↞","twoheadrightarrow":"↠","Uacute":"Ú","uacute":"ú","uarr":"↑","Uarr":"↟","uArr":"⇑","Uarrocir":"⥉","Ubrcy":"Ў","ubrcy":"ў","Ubreve":"Ŭ","ubreve":"ŭ","Ucirc":"Û","ucirc":"û","Ucy":"У","ucy":"у","udarr":"⇅","Udblac":"Ű","udblac":"ű","udhar":"⥮","ufisht":"⥾","Ufr":"𝔘","ufr":"𝔲","Ugrave":"Ù","ugrave":"ù","uHar":"⥣","uharl":"↿","uharr":"↾","uhblk":"▀","ulcorn":"⌜","ulcorner":"⌜","ulcrop":"⌏","ultri":"◸","Umacr":"Ū","umacr":"ū","uml":"¨","UnderBar":"_","UnderBrace":"⏟","UnderBracket":"⎵","UnderParenthesis":"⏝","Union":"⋃","UnionPlus":"⊎","Uogon":"Ų","uogon":"ų","Uopf":"𝕌","uopf":"𝕦","UpArrowBar":"⤒","uparrow":"↑","UpArrow":"↑","Uparrow":"⇑","UpArrowDownArrow":"⇅","updownarrow":"↕","UpDownArrow":"↕","Updownarrow":"⇕","UpEquilibrium":"⥮","upharpoonleft":"↿","upharpoonright":"↾","uplus":"⊎","UpperLeftArrow":"↖","UpperRightArrow":"↗","upsi":"υ","Upsi":"ϒ","upsih":"ϒ","Upsilon":"Υ","upsilon":"υ","UpTeeArrow":"↥","UpTee":"⊥","upuparrows":"⇈","urcorn":"⌝","urcorner":"⌝","urcrop":"⌎","Uring":"Ů","uring":"ů","urtri":"◹","Uscr":"𝒰","uscr":"𝓊","utdot":"⋰","Utilde":"Ũ","utilde":"ũ","utri":"▵","utrif":"▴","uuarr":"⇈","Uuml":"Ü","uuml":"ü","uwangle":"⦧","vangrt":"⦜","varepsilon":"ϵ","varkappa":"ϰ","varnothing":"∅","varphi":"ϕ","varpi":"ϖ","varpropto":"∝","varr":"↕","vArr":"⇕","varrho":"ϱ","varsigma":"ς","varsubsetneq":"⊊︀","varsubsetneqq":"⫋︀","varsupsetneq":"⊋︀","varsupsetneqq":"⫌︀","vartheta":"ϑ","vartriangleleft":"⊲","vartriangleright":"⊳","vBar":"⫨","Vbar":"⫫","vBarv":"⫩","Vcy":"В","vcy":"в","vdash":"⊢","vDash":"⊨","Vdash":"⊩","VDash":"⊫","Vdashl":"⫦","veebar":"⊻","vee":"∨","Vee":"⋁","veeeq":"≚","vellip":"⋮","verbar":"|","Verbar":"‖","vert":"|","Vert":"‖","VerticalBar":"∣","VerticalLine":"|","VerticalSeparator":"❘","VerticalTilde":"≀","VeryThinSpace":" ","Vfr":"𝔙","vfr":"𝔳","vltri":"⊲","vnsub":"⊂⃒","vnsup":"⊃⃒","Vopf":"𝕍","vopf":"𝕧","vprop":"∝","vrtri":"⊳","Vscr":"𝒱","vscr":"𝓋","vsubnE":"⫋︀","vsubne":"⊊︀","vsupnE":"⫌︀","vsupne":"⊋︀","Vvdash":"⊪","vzigzag":"⦚","Wcirc":"Ŵ","wcirc":"ŵ","wedbar":"⩟","wedge":"∧","Wedge":"⋀","wedgeq":"≙","weierp":"℘","Wfr":"𝔚","wfr":"𝔴","Wopf":"𝕎","wopf":"𝕨","wp":"℘","wr":"≀","wreath":"≀","Wscr":"𝒲","wscr":"𝓌","xcap":"⋂","xcirc":"◯","xcup":"⋃","xdtri":"▽","Xfr":"𝔛","xfr":"𝔵","xharr":"⟷","xhArr":"⟺","Xi":"Ξ","xi":"ξ","xlarr":"⟵","xlArr":"⟸","xmap":"⟼","xnis":"⋻","xodot":"⨀","Xopf":"𝕏","xopf":"𝕩","xoplus":"⨁","xotime":"⨂","xrarr":"⟶","xrArr":"⟹","Xscr":"𝒳","xscr":"𝓍","xsqcup":"⨆","xuplus":"⨄","xutri":"△","xvee":"⋁","xwedge":"⋀","Yacute":"Ý","yacute":"ý","YAcy":"Я","yacy":"я","Ycirc":"Ŷ","ycirc":"ŷ","Ycy":"Ы","ycy":"ы","yen":"¥","Yfr":"𝔜","yfr":"𝔶","YIcy":"Ї","yicy":"ї","Yopf":"𝕐","yopf":"𝕪","Yscr":"𝒴","yscr":"𝓎","YUcy":"Ю","yucy":"ю","yuml":"ÿ","Yuml":"Ÿ","Zacute":"Ź","zacute":"ź","Zcaron":"Ž","zcaron":"ž","Zcy":"З","zcy":"з","Zdot":"Ż","zdot":"ż","zeetrf":"ℨ","ZeroWidthSpace":"​","Zeta":"Ζ","zeta":"ζ","zfr":"𝔷","Zfr":"ℨ","ZHcy":"Ж","zhcy":"ж","zigrarr":"⇝","zopf":"𝕫","Zopf":"ℤ","Zscr":"𝒵","zscr":"𝓏","zwj":"‍","zwnj":"‌"}
;
},1171,[]);
__d(function(global, require, _importDefaultUnused, _importAllUnused, module, exports, _dependencyMapUnused) {
  module.exports = {"Aacute":"Á","aacute":"á","Acirc":"Â","acirc":"â","acute":"´","AElig":"Æ","aelig":"æ","Agrave":"À","agrave":"à","amp":"&","AMP":"&","Aring":"Å","aring":"å","Atilde":"Ã","atilde":"ã","Auml":"Ä","auml":"ä","brvbar":"¦","Ccedil":"Ç","ccedil":"ç","cedil":"¸","cent":"¢","copy":"©","COPY":"©","curren":"¤","deg":"°","divide":"÷","Eacute":"É","eacute":"é","Ecirc":"Ê","ecirc":"ê","Egrave":"È","egrave":"è","ETH":"Ð","eth":"ð","Euml":"Ë","euml":"ë","frac12":"½","frac14":"¼","frac34":"¾","gt":">","GT":">","Iacute":"Í","iacute":"í","Icirc":"Î","icirc":"î","iexcl":"¡","Igrave":"Ì","igrave":"ì","iquest":"¿","Iuml":"Ï","iuml":"ï","laquo":"«","lt":"<","LT":"<","macr":"¯","micro":"µ","middot":"·","nbsp":" ","not":"¬","Ntilde":"Ñ","ntilde":"ñ","Oacute":"Ó","oacute":"ó","Ocirc":"Ô","ocirc":"ô","Ograve":"Ò","ograve":"ò","ordf":"ª","ordm":"º","Oslash":"Ø","oslash":"ø","Otilde":"Õ","otilde":"õ","Ouml":"Ö","ouml":"ö","para":"¶","plusmn":"±","pound":"£","quot":"\"","QUOT":"\"","raquo":"»","reg":"®","REG":"®","sect":"§","shy":"­","sup1":"¹","sup2":"²","sup3":"³","szlig":"ß","THORN":"Þ","thorn":"þ","times":"×","Uacute":"Ú","uacute":"ú","Ucirc":"Û","ucirc":"û","Ugrave":"Ù","ugrave":"ù","uml":"¨","Uuml":"Ü","uuml":"ü","Yacute":"Ý","yacute":"ý","yen":"¥","yuml":"ÿ"}
;
},1172,[]);
__d(function(global, require, _importDefaultUnused, _importAllUnused, module, exports, _dependencyMapUnused) {
  module.exports = {"amp":"&","apos":"'","gt":">","lt":"<","quot":"\""}
;
},1173,[]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  var __importDefault = this && this.__importDefault || function (mod) {
    return mod && mod.__esModule ? mod : {
      "default": mod
    };
  };
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var decode_json_1 = __importDefault(require(_dependencyMap[0]));
  // Adapted from https://github.com/mathiasbynens/he/blob/master/src/he.js#L94-L119
  var fromCodePoint =
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  String.fromCodePoint || function (codePoint) {
    var output = "";
    if (codePoint > 0xffff) {
      codePoint -= 0x10000;
      output += String.fromCharCode(codePoint >>> 10 & 0x3ff | 0xd800);
      codePoint = 0xdc00 | codePoint & 0x3ff;
    }
    output += String.fromCharCode(codePoint);
    return output;
  };
  function decodeCodePoint(codePoint) {
    if (codePoint >= 0xd800 && codePoint <= 0xdfff || codePoint > 0x10ffff) {
      return "\uFFFD";
    }
    if (codePoint in decode_json_1.default) {
      codePoint = decode_json_1.default[codePoint];
    }
    return fromCodePoint(codePoint);
  }
  exports.default = decodeCodePoint;
},1174,[1175]);
__d(function(global, require, _importDefaultUnused, _importAllUnused, module, exports, _dependencyMapUnused) {
  module.exports = {"0":65533,"128":8364,"130":8218,"131":402,"132":8222,"133":8230,"134":8224,"135":8225,"136":710,"137":8240,"138":352,"139":8249,"140":338,"142":381,"145":8216,"146":8217,"147":8220,"148":8221,"149":8226,"150":8211,"151":8212,"152":732,"153":8482,"154":353,"155":8250,"156":339,"158":382,"159":376}
;
},1175,[]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  var __importDefault = this && this.__importDefault || function (mod) {
    return mod && mod.__esModule ? mod : {
      "default": mod
    };
  };
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.escapeUTF8 = exports.escape = exports.encodeNonAsciiHTML = exports.encodeHTML = exports.encodeXML = undefined;
  var xml_json_1 = __importDefault(require(_dependencyMap[0]));
  var inverseXML = getInverseObj(xml_json_1.default);
  var xmlReplacer = getInverseReplacer(inverseXML);
  /**
   * Encodes all non-ASCII characters, as well as characters not valid in XML
   * documents using XML entities.
   *
   * If a character has no equivalent entity, a
   * numeric hexadecimal reference (eg. `&#xfc;`) will be used.
   */
  exports.encodeXML = getASCIIEncoder(inverseXML);
  var entities_json_1 = __importDefault(require(_dependencyMap[1]));
  var inverseHTML = getInverseObj(entities_json_1.default);
  var htmlReplacer = getInverseReplacer(inverseHTML);
  /**
   * Encodes all entities and non-ASCII characters in the input.
   *
   * This includes characters that are valid ASCII characters in HTML documents.
   * For example `#` will be encoded as `&num;`. To get a more compact output,
   * consider using the `encodeNonAsciiHTML` function.
   *
   * If a character has no equivalent entity, a
   * numeric hexadecimal reference (eg. `&#xfc;`) will be used.
   */
  exports.encodeHTML = getInverse(inverseHTML, htmlReplacer);
  /**
   * Encodes all non-ASCII characters, as well as characters not valid in HTML
   * documents using HTML entities.
   *
   * If a character has no equivalent entity, a
   * numeric hexadecimal reference (eg. `&#xfc;`) will be used.
   */
  exports.encodeNonAsciiHTML = getASCIIEncoder(inverseHTML);
  function getInverseObj(obj) {
    return Object.keys(obj).sort().reduce(function (inverse, name) {
      inverse[obj[name]] = "&" + name + ";";
      return inverse;
    }, {});
  }
  function getInverseReplacer(inverse) {
    var single = [];
    var multiple = [];
    for (var _i = 0, _a = Object.keys(inverse); _i < _a.length; _i++) {
      var k = _a[_i];
      if (k.length === 1) {
        // Add value to single array
        single.push("\\" + k);
      } else {
        // Add value to multiple array
        multiple.push(k);
      }
    }
    // Add ranges to single characters.
    single.sort();
    for (var start = 0; start < single.length - 1; start++) {
      // Find the end of a run of characters
      var end = start;
      while (end < single.length - 1 && single[end].charCodeAt(1) + 1 === single[end + 1].charCodeAt(1)) {
        end += 1;
      }
      var count = 1 + end - start;
      // We want to replace at least three characters
      if (count < 3) continue;
      single.splice(start, count, single[start] + "-" + single[end]);
    }
    multiple.unshift("[" + single.join("") + "]");
    return new RegExp(multiple.join("|"), "g");
  }
  // /[^\0-\x7F]/gu
  var reNonASCII = /(?:[\x80-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/g;
  var getCodePoint =
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  String.prototype.codePointAt != null ?
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  function (str) {
    return str.codePointAt(0);
  } :
  // http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
  function (c) {
    return (c.charCodeAt(0) - 0xd800) * 0x400 + c.charCodeAt(1) - 0xdc00 + 0x10000;
  };
  function singleCharReplacer(c) {
    return "&#x" + (c.length > 1 ? getCodePoint(c) : c.charCodeAt(0)).toString(16).toUpperCase() + ";";
  }
  function getInverse(inverse, re) {
    return function (data) {
      return data.replace(re, function (name) {
        return inverse[name];
      }).replace(reNonASCII, singleCharReplacer);
    };
  }
  var reEscapeChars = new RegExp(xmlReplacer.source + "|" + reNonASCII.source, "g");
  /**
   * Encodes all non-ASCII characters, as well as characters not valid in XML
   * documents using numeric hexadecimal reference (eg. `&#xfc;`).
   *
   * Have a look at `escapeUTF8` if you want a more concise output at the expense
   * of reduced transportability.
   *
   * @param data String to escape.
   */
  function escape(data) {
    return data.replace(reEscapeChars, singleCharReplacer);
  }
  exports.escape = escape;
  /**
   * Encodes all characters not valid in XML documents using numeric hexadecimal
   * reference (eg. `&#xfc;`).
   *
   * Note that the output will be character-set dependent.
   *
   * @param data String to escape.
   */
  function escapeUTF8(data) {
    return data.replace(xmlReplacer, singleCharReplacer);
  }
  exports.escapeUTF8 = escapeUTF8;
  function getASCIIEncoder(obj) {
    return function (data) {
      return data.replace(reEscapeChars, function (c) {
        return obj[c] || singleCharReplacer(c);
      });
    };
  }
},1176,[1173,1171]);
__d(function(global, require, _importDefaultUnused, _importAllUnused, module, exports, _dependencyMapUnused) {
  module.exports = {
  "elementNames" : {
"altglyph" : "altGlyph",
"altglyphdef" : "altGlyphDef",
"altglyphitem" : "altGlyphItem",
"animatecolor" : "animateColor",
"animatemotion" : "animateMotion",
"animatetransform" : "animateTransform",
"clippath" : "clipPath",
"feblend" : "feBlend",
"fecolormatrix" : "feColorMatrix",
"fecomponenttransfer" : "feComponentTransfer",
"fecomposite" : "feComposite",
"feconvolvematrix" : "feConvolveMatrix",
"fediffuselighting" : "feDiffuseLighting",
"fedisplacementmap" : "feDisplacementMap",
"fedistantlight" : "feDistantLight",
"fedropshadow" : "feDropShadow",
"feflood" : "feFlood",
"fefunca" : "feFuncA",
"fefuncb" : "feFuncB",
"fefuncg" : "feFuncG",
"fefuncr" : "feFuncR",
"fegaussianblur" : "feGaussianBlur",
"feimage" : "feImage",
"femerge" : "feMerge",
"femergenode" : "feMergeNode",
"femorphology" : "feMorphology",
"feoffset" : "feOffset",
"fepointlight" : "fePointLight",
"fespecularlighting" : "feSpecularLighting",
"fespotlight" : "feSpotLight",
"fetile" : "feTile",
"feturbulence" : "feTurbulence",
"foreignobject" : "foreignObject",
"glyphref" : "glyphRef",
"lineargradient" : "linearGradient",
"radialgradient" : "radialGradient",
"textpath" : "textPath"
  },
  "attributeNames" : {
"definitionurl" : "definitionURL",
"attributename" : "attributeName",
"attributetype" : "attributeType",
"basefrequency" : "baseFrequency",
"baseprofile" : "baseProfile",
"calcmode" : "calcMode",
"clippathunits" : "clipPathUnits",
"diffuseconstant" : "diffuseConstant",
"edgemode" : "edgeMode",
"filterunits" : "filterUnits",
"glyphref" : "glyphRef",
"gradienttransform" : "gradientTransform",
"gradientunits" : "gradientUnits",
"kernelmatrix" : "kernelMatrix",
"kernelunitlength" : "kernelUnitLength",
"keypoints" : "keyPoints",
"keysplines" : "keySplines",
"keytimes" : "keyTimes",
"lengthadjust" : "lengthAdjust",
"limitingconeangle" : "limitingConeAngle",
"markerheight" : "markerHeight",
"markerunits" : "markerUnits",
"markerwidth" : "markerWidth",
"maskcontentunits" : "maskContentUnits",
"maskunits" : "maskUnits",
"numoctaves" : "numOctaves",
"pathlength" : "pathLength",
"patterncontentunits" : "patternContentUnits",
"patterntransform" : "patternTransform",
"patternunits" : "patternUnits",
"pointsatx" : "pointsAtX",
"pointsaty" : "pointsAtY",
"pointsatz" : "pointsAtZ",
"preservealpha" : "preserveAlpha",
"preserveaspectratio" : "preserveAspectRatio",
"primitiveunits" : "primitiveUnits",
"refx" : "refX",
"refy" : "refY",
"repeatcount" : "repeatCount",
"repeatdur" : "repeatDur",
"requiredextensions" : "requiredExtensions",
"requiredfeatures" : "requiredFeatures",
"specularconstant" : "specularConstant",
"specularexponent" : "specularExponent",
"spreadmethod" : "spreadMethod",
"startoffset" : "startOffset",
"stddeviation" : "stdDeviation",
"stitchtiles" : "stitchTiles",
"surfacescale" : "surfaceScale",
"systemlanguage" : "systemLanguage",
"tablevalues" : "tableValues",
"targetx" : "targetX",
"targety" : "targetY",
"textlength" : "textLength",
"viewbox" : "viewBox",
"viewtarget" : "viewTarget",
"xchannelselector" : "xChannelSelector",
"ychannelselector" : "yChannelSelector",
"zoomandpan" : "zoomAndPan"
  }
}
;
},1177,[]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var getChildren = exports.getChildren = function (elem) {
    return elem.children;
  };
  var getParent = exports.getParent = function (elem) {
    return elem.parent;
  };
  exports.getSiblings = function (elem) {
    var parent = getParent(elem);
    return parent ? getChildren(parent) : [elem];
  };
  exports.getAttributeValue = function (elem, name) {
    return elem.attribs && elem.attribs[name];
  };
  exports.hasAttrib = function (elem, name) {
    return !!elem.attribs && hasOwnProperty.call(elem.attribs, name);
  };
  exports.getName = function (elem) {
    return elem.name;
  };
},1178,[]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  exports.removeElement = function (elem) {
    if (elem.prev) elem.prev.next = elem.next;
    if (elem.next) elem.next.prev = elem.prev;
    if (elem.parent) {
      var childs = elem.parent.children;
      childs.splice(childs.lastIndexOf(elem), 1);
    }
  };
  exports.replaceElement = function (elem, replacement) {
    var prev = replacement.prev = elem.prev;
    if (prev) {
      prev.next = replacement;
    }
    var next = replacement.next = elem.next;
    if (next) {
      next.prev = replacement;
    }
    var parent = replacement.parent = elem.parent;
    if (parent) {
      var childs = parent.children;
      childs[childs.lastIndexOf(elem)] = replacement;
    }
  };
  exports.appendChild = function (elem, child) {
    child.parent = elem;
    if (elem.children.push(child) !== 1) {
      var sibling = elem.children[elem.children.length - 2];
      sibling.next = child;
      child.prev = sibling;
      child.next = null;
    }
  };
  exports.append = function (elem, next) {
    var parent = elem.parent,
      currNext = elem.next;
    next.next = currNext;
    next.prev = elem;
    elem.next = next;
    next.parent = parent;
    if (currNext) {
      currNext.prev = next;
      if (parent) {
        var childs = parent.children;
        childs.splice(childs.lastIndexOf(currNext), 0, next);
      }
    } else if (parent) {
      parent.children.push(next);
    }
  };
  exports.prepend = function (elem, prev) {
    var parent = elem.parent;
    if (parent) {
      var childs = parent.children;
      childs.splice(childs.lastIndexOf(elem), 0, prev);
    }
    if (elem.prev) {
      elem.prev.next = prev;
    }
    prev.parent = parent;
    prev.prev = elem.prev;
    prev.next = elem;
    elem.prev = prev;
  };
},1179,[]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var isTag = require(_dependencyMap[0]).isTag;
  module.exports = {
    filter: filter,
    find: find,
    findOneChild: findOneChild,
    findOne: findOne,
    existsOne: existsOne,
    findAll: findAll
  };
  function filter(test, element, recurse, limit) {
    if (!Array.isArray(element)) element = [element];
    if (typeof limit !== "number" || !isFinite(limit)) {
      limit = Infinity;
    }
    return find(test, element, recurse !== false, limit);
  }
  function find(test, elems, recurse, limit) {
    var result = [],
      childs;
    for (var i = 0, j = elems.length; i < j; i++) {
      if (test(elems[i])) {
        result.push(elems[i]);
        if (--limit <= 0) break;
      }
      childs = elems[i].children;
      if (recurse && childs && childs.length > 0) {
        childs = find(test, childs, recurse, limit);
        result = result.concat(childs);
        limit -= childs.length;
        if (limit <= 0) break;
      }
    }
    return result;
  }
  function findOneChild(test, elems) {
    for (var i = 0, l = elems.length; i < l; i++) {
      if (test(elems[i])) return elems[i];
    }
    return null;
  }
  function findOne(test, elems) {
    var elem = null;
    for (var i = 0, l = elems.length; i < l && !elem; i++) {
      if (!isTag(elems[i])) {
        continue;
      } else if (test(elems[i])) {
        elem = elems[i];
      } else if (elems[i].children.length > 0) {
        elem = findOne(test, elems[i].children);
      }
    }
    return elem;
  }
  function existsOne(test, elems) {
    for (var i = 0, l = elems.length; i < l; i++) {
      if (isTag(elems[i]) && (test(elems[i]) || elems[i].children.length > 0 && existsOne(test, elems[i].children))) {
        return true;
      }
    }
    return false;
  }
  function findAll(test, rootElems) {
    var result = [];
    var stack = rootElems.slice();
    while (stack.length) {
      var elem = stack.shift();
      if (!isTag(elem)) continue;
      if (elem.children && elem.children.length > 0) {
        stack.unshift.apply(stack, elem.children);
      }
      if (test(elem)) result.push(elem);
    }
    return result;
  }
},1180,[1160]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var ElementType = require(_dependencyMap[0]);
  var isTag = exports.isTag = ElementType.isTag;
  exports.testElement = function (options, element) {
    for (var key in options) {
      if (!options.hasOwnProperty(key)) ;else if (key === "tag_name") {
        if (!isTag(element) || !options.tag_name(element.name)) {
          return false;
        }
      } else if (key === "tag_type") {
        if (!options.tag_type(element.type)) return false;
      } else if (key === "tag_contains") {
        if (isTag(element) || !options.tag_contains(element.data)) {
          return false;
        }
      } else if (!element.attribs || !options[key](element.attribs[key])) {
        return false;
      }
    }
    return true;
  };
  var Checks = {
    tag_name: function (name) {
      if (typeof name === "function") {
        return function (elem) {
          return isTag(elem) && name(elem.name);
        };
      } else if (name === "*") {
        return isTag;
      } else {
        return function (elem) {
          return isTag(elem) && elem.name === name;
        };
      }
    },
    tag_type: function (type) {
      if (typeof type === "function") {
        return function (elem) {
          return type(elem.type);
        };
      } else {
        return function (elem) {
          return elem.type === type;
        };
      }
    },
    tag_contains: function (data) {
      if (typeof data === "function") {
        return function (elem) {
          return !isTag(elem) && data(elem.data);
        };
      } else {
        return function (elem) {
          return !isTag(elem) && elem.data === data;
        };
      }
    }
  };
  function getAttribCheck(attrib, value) {
    if (typeof value === "function") {
      return function (elem) {
        return elem.attribs && value(elem.attribs[attrib]);
      };
    } else {
      return function (elem) {
        return elem.attribs && elem.attribs[attrib] === value;
      };
    }
  }
  function combineFuncs(a, b) {
    return function (elem) {
      return a(elem) || b(elem);
    };
  }
  exports.getElements = function (options, element, recurse, limit) {
    var funcs = Object.keys(options).map(function (key) {
      var value = options[key];
      return key in Checks ? Checks[key](value) : getAttribCheck(key, value);
    });
    return funcs.length === 0 ? [] : this.filter(funcs.reduce(combineFuncs), element, recurse, limit);
  };
  exports.getElementById = function (id, element, recurse) {
    if (!Array.isArray(element)) element = [element];
    return this.findOne(getAttribCheck("id", id), element, recurse !== false);
  };
  exports.getElementsByTagName = function (name, element, recurse, limit) {
    return this.filter(Checks.tag_name(name), element, recurse, limit);
  };
  exports.getElementsByTagType = function (type, element, recurse, limit) {
    return this.filter(Checks.tag_type(type), element, recurse, limit);
  };
},1181,[1160]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  // removeSubsets
  // Given an array of nodes, remove any member that is contained by another.
  exports.removeSubsets = function (nodes) {
    var idx = nodes.length,
      node,
      ancestor,
      replace;

    // Check if each node (or one of its ancestors) is already contained in the
    // array.
    while (--idx > -1) {
      node = ancestor = nodes[idx];

      // Temporarily remove the node under consideration
      nodes[idx] = null;
      replace = true;
      while (ancestor) {
        if (nodes.indexOf(ancestor) > -1) {
          replace = false;
          nodes.splice(idx, 1);
          break;
        }
        ancestor = ancestor.parent;
      }

      // If the node has been found to be unique, re-insert it.
      if (replace) {
        nodes[idx] = node;
      }
    }
    return nodes;
  };

  // Source: http://dom.spec.whatwg.org/#dom-node-comparedocumentposition
  var POSITION = {
    DISCONNECTED: 1,
    PRECEDING: 2,
    FOLLOWING: 4,
    CONTAINS: 8,
    CONTAINED_BY: 16
  };

  // Compare the position of one node against another node in any other document.
  // The return value is a bitmask with the following values:
  //
  // document order:
  // > There is an ordering, document order, defined on all the nodes in the
  // > document corresponding to the order in which the first character of the
  // > XML representation of each node occurs in the XML representation of the
  // > document after expansion of general entities. Thus, the document element
  // > node will be the first node. Element nodes occur before their children.
  // > Thus, document order orders element nodes in order of the occurrence of
  // > their start-tag in the XML (after expansion of entities). The attribute
  // > nodes of an element occur after the element and before its children. The
  // > relative order of attribute nodes is implementation-dependent./
  // Source:
  // http://www.w3.org/TR/DOM-Level-3-Core/glossary.html#dt-document-order
  //
  // @argument {Node} nodaA The first node to use in the comparison
  // @argument {Node} nodeB The second node to use in the comparison
  //
  // @return {Number} A bitmask describing the input nodes' relative position.
  //         See http://dom.spec.whatwg.org/#dom-node-comparedocumentposition for
  //         a description of these values.
  var comparePos = exports.compareDocumentPosition = function (nodeA, nodeB) {
    var aParents = [];
    var bParents = [];
    var current, sharedParent, siblings, aSibling, bSibling, idx;
    if (nodeA === nodeB) {
      return 0;
    }
    current = nodeA;
    while (current) {
      aParents.unshift(current);
      current = current.parent;
    }
    current = nodeB;
    while (current) {
      bParents.unshift(current);
      current = current.parent;
    }
    idx = 0;
    while (aParents[idx] === bParents[idx]) {
      idx++;
    }
    if (idx === 0) {
      return POSITION.DISCONNECTED;
    }
    sharedParent = aParents[idx - 1];
    siblings = sharedParent.children;
    aSibling = aParents[idx];
    bSibling = bParents[idx];
    if (siblings.indexOf(aSibling) > siblings.indexOf(bSibling)) {
      if (sharedParent === nodeB) {
        return POSITION.FOLLOWING | POSITION.CONTAINED_BY;
      }
      return POSITION.FOLLOWING;
    } else {
      if (sharedParent === nodeA) {
        return POSITION.PRECEDING | POSITION.CONTAINS;
      }
      return POSITION.PRECEDING;
    }
  };

  // Sort an array of nodes based on their relative position in the document and
  // remove any duplicate nodes. If the array contains nodes that do not belong
  // to the same document, sort order is unspecified.
  //
  // @argument {Array} nodes Array of DOM nodes
  //
  // @returns {Array} collection of unique nodes, sorted in document order
  exports.uniqueSort = function (nodes) {
    var idx = nodes.length,
      node,
      position;
    nodes = nodes.slice();
    while (--idx > -1) {
      node = nodes[idx];
      position = nodes.indexOf(node);
      if (position > -1 && position < idx) {
        nodes.splice(idx, 1);
      }
    }
    nodes.sort(function (a, b) {
      var relative = comparePos(a, b);
      if (relative & POSITION.PRECEDING) {
        return -1;
      } else if (relative & POSITION.FOLLOWING) {
        return 1;
      }
      return 0;
    });
    return nodes;
  };
},1182,[]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  module.exports = CollectingHandler;
  function CollectingHandler(cbs) {
    this._cbs = cbs || {};
    this.events = [];
  }
  var EVENTS = require(_dependencyMap[0]).EVENTS;
  Object.keys(EVENTS).forEach(function (name) {
    if (EVENTS[name] === 0) {
      name = "on" + name;
      CollectingHandler.prototype[name] = function () {
        this.events.push([name]);
        if (this._cbs[name]) this._cbs[name]();
      };
    } else if (EVENTS[name] === 1) {
      name = "on" + name;
      CollectingHandler.prototype[name] = function (a) {
        this.events.push([name, a]);
        if (this._cbs[name]) this._cbs[name](a);
      };
    } else if (EVENTS[name] === 2) {
      name = "on" + name;
      CollectingHandler.prototype[name] = function (a, b) {
        this.events.push([name, a, b]);
        if (this._cbs[name]) this._cbs[name](a, b);
      };
    } else {
      throw Error("wrong number of arguments");
    }
  });
  CollectingHandler.prototype.onreset = function () {
    this.events = [];
    if (this._cbs.onreset) this._cbs.onreset();
  };
  CollectingHandler.prototype.restart = function () {
    if (this._cbs.onreset) this._cbs.onreset();
    for (var i = 0, len = this.events.length; i < len; i++) {
      if (this._cbs[this.events[i][0]]) {
        var num = this.events[i].length;
        if (num === 1) {
          this._cbs[this.events[i][0]]();
        } else if (num === 2) {
          this._cbs[this.events[i][0]](this.events[i][1]);
        } else {
          this._cbs[this.events[i][0]](this.events[i][1], this.events[i][2]);
        }
      }
    }
  };
},1183,[1149]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var encode = require(_dependencyMap[0]),
    decode = require(_dependencyMap[1]);
  exports.decode = function (data, level) {
    return (!level || level <= 0 ? decode.XML : decode.HTML)(data);
  };
  exports.decodeStrict = function (data, level) {
    return (!level || level <= 0 ? decode.XML : decode.HTMLStrict)(data);
  };
  exports.encode = function (data, level) {
    return (!level || level <= 0 ? encode.XML : encode.HTML)(data);
  };
  exports.encodeXML = encode.XML;
  exports.encodeHTML4 = exports.encodeHTML5 = exports.encodeHTML = encode.HTML;
  exports.decodeXML = exports.decodeXMLStrict = decode.XML;
  exports.decodeHTML4 = exports.decodeHTML5 = exports.decodeHTML = decode.HTML;
  exports.decodeHTML4Strict = exports.decodeHTML5Strict = exports.decodeHTMLStrict = decode.HTMLStrict;
  exports.escape = encode.escape;
},1184,[1185,1188]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var inverseXML = getInverseObj(require(_dependencyMap[0])),
    xmlReplacer = getInverseReplacer(inverseXML);
  exports.XML = getInverse(inverseXML, xmlReplacer);
  var inverseHTML = getInverseObj(require(_dependencyMap[1])),
    htmlReplacer = getInverseReplacer(inverseHTML);
  exports.HTML = getInverse(inverseHTML, htmlReplacer);
  function getInverseObj(obj) {
    return Object.keys(obj).sort().reduce(function (inverse, name) {
      inverse[obj[name]] = "&" + name + ";";
      return inverse;
    }, {});
  }
  function getInverseReplacer(inverse) {
    var single = [],
      multiple = [];
    Object.keys(inverse).forEach(function (k) {
      if (k.length === 1) {
        single.push("\\" + k);
      } else {
        multiple.push(k);
      }
    });

    //TODO add ranges
    multiple.unshift("[" + single.join("") + "]");
    return new RegExp(multiple.join("|"), "g");
  }
  var re_nonASCII = /[^\0-\x7F]/g,
    re_astralSymbols = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
  function singleCharReplacer(c) {
    return "&#x" + c.charCodeAt(0).toString(16).toUpperCase() + ";";
  }
  function astralReplacer(c) {
    // http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
    var high = c.charCodeAt(0);
    var low = c.charCodeAt(1);
    var codePoint = (high - 0xd800) * 0x400 + low - 0xdc00 + 0x10000;
    return "&#x" + codePoint.toString(16).toUpperCase() + ";";
  }
  function getInverse(inverse, re) {
    function func(name) {
      return inverse[name];
    }
    return function (data) {
      return data.replace(re, func).replace(re_astralSymbols, astralReplacer).replace(re_nonASCII, singleCharReplacer);
    };
  }
  var re_xmlChars = getInverseReplacer(inverseXML);
  function escapeXML(data) {
    return data.replace(re_xmlChars, singleCharReplacer).replace(re_astralSymbols, astralReplacer).replace(re_nonASCII, singleCharReplacer);
  }
  exports.escape = escapeXML;
},1185,[1186,1187]);
__d(function(global, require, _importDefaultUnused, _importAllUnused, module, exports, _dependencyMapUnused) {
  module.exports = {"amp":"&","apos":"'","gt":">","lt":"<","quot":"\""}
;
},1186,[]);
__d(function(global, require, _importDefaultUnused, _importAllUnused, module, exports, _dependencyMapUnused) {
  module.exports = {"Aacute":"\u00C1","aacute":"\u00E1","Abreve":"\u0102","abreve":"\u0103","ac":"\u223E","acd":"\u223F","acE":"\u223E\u0333","Acirc":"\u00C2","acirc":"\u00E2","acute":"\u00B4","Acy":"\u0410","acy":"\u0430","AElig":"\u00C6","aelig":"\u00E6","af":"\u2061","Afr":"\uD835\uDD04","afr":"\uD835\uDD1E","Agrave":"\u00C0","agrave":"\u00E0","alefsym":"\u2135","aleph":"\u2135","Alpha":"\u0391","alpha":"\u03B1","Amacr":"\u0100","amacr":"\u0101","amalg":"\u2A3F","amp":"&","AMP":"&","andand":"\u2A55","And":"\u2A53","and":"\u2227","andd":"\u2A5C","andslope":"\u2A58","andv":"\u2A5A","ang":"\u2220","ange":"\u29A4","angle":"\u2220","angmsdaa":"\u29A8","angmsdab":"\u29A9","angmsdac":"\u29AA","angmsdad":"\u29AB","angmsdae":"\u29AC","angmsdaf":"\u29AD","angmsdag":"\u29AE","angmsdah":"\u29AF","angmsd":"\u2221","angrt":"\u221F","angrtvb":"\u22BE","angrtvbd":"\u299D","angsph":"\u2222","angst":"\u00C5","angzarr":"\u237C","Aogon":"\u0104","aogon":"\u0105","Aopf":"\uD835\uDD38","aopf":"\uD835\uDD52","apacir":"\u2A6F","ap":"\u2248","apE":"\u2A70","ape":"\u224A","apid":"\u224B","apos":"'","ApplyFunction":"\u2061","approx":"\u2248","approxeq":"\u224A","Aring":"\u00C5","aring":"\u00E5","Ascr":"\uD835\uDC9C","ascr":"\uD835\uDCB6","Assign":"\u2254","ast":"*","asymp":"\u2248","asympeq":"\u224D","Atilde":"\u00C3","atilde":"\u00E3","Auml":"\u00C4","auml":"\u00E4","awconint":"\u2233","awint":"\u2A11","backcong":"\u224C","backepsilon":"\u03F6","backprime":"\u2035","backsim":"\u223D","backsimeq":"\u22CD","Backslash":"\u2216","Barv":"\u2AE7","barvee":"\u22BD","barwed":"\u2305","Barwed":"\u2306","barwedge":"\u2305","bbrk":"\u23B5","bbrktbrk":"\u23B6","bcong":"\u224C","Bcy":"\u0411","bcy":"\u0431","bdquo":"\u201E","becaus":"\u2235","because":"\u2235","Because":"\u2235","bemptyv":"\u29B0","bepsi":"\u03F6","bernou":"\u212C","Bernoullis":"\u212C","Beta":"\u0392","beta":"\u03B2","beth":"\u2136","between":"\u226C","Bfr":"\uD835\uDD05","bfr":"\uD835\uDD1F","bigcap":"\u22C2","bigcirc":"\u25EF","bigcup":"\u22C3","bigodot":"\u2A00","bigoplus":"\u2A01","bigotimes":"\u2A02","bigsqcup":"\u2A06","bigstar":"\u2605","bigtriangledown":"\u25BD","bigtriangleup":"\u25B3","biguplus":"\u2A04","bigvee":"\u22C1","bigwedge":"\u22C0","bkarow":"\u290D","blacklozenge":"\u29EB","blacksquare":"\u25AA","blacktriangle":"\u25B4","blacktriangledown":"\u25BE","blacktriangleleft":"\u25C2","blacktriangleright":"\u25B8","blank":"\u2423","blk12":"\u2592","blk14":"\u2591","blk34":"\u2593","block":"\u2588","bne":"=\u20E5","bnequiv":"\u2261\u20E5","bNot":"\u2AED","bnot":"\u2310","Bopf":"\uD835\uDD39","bopf":"\uD835\uDD53","bot":"\u22A5","bottom":"\u22A5","bowtie":"\u22C8","boxbox":"\u29C9","boxdl":"\u2510","boxdL":"\u2555","boxDl":"\u2556","boxDL":"\u2557","boxdr":"\u250C","boxdR":"\u2552","boxDr":"\u2553","boxDR":"\u2554","boxh":"\u2500","boxH":"\u2550","boxhd":"\u252C","boxHd":"\u2564","boxhD":"\u2565","boxHD":"\u2566","boxhu":"\u2534","boxHu":"\u2567","boxhU":"\u2568","boxHU":"\u2569","boxminus":"\u229F","boxplus":"\u229E","boxtimes":"\u22A0","boxul":"\u2518","boxuL":"\u255B","boxUl":"\u255C","boxUL":"\u255D","boxur":"\u2514","boxuR":"\u2558","boxUr":"\u2559","boxUR":"\u255A","boxv":"\u2502","boxV":"\u2551","boxvh":"\u253C","boxvH":"\u256A","boxVh":"\u256B","boxVH":"\u256C","boxvl":"\u2524","boxvL":"\u2561","boxVl":"\u2562","boxVL":"\u2563","boxvr":"\u251C","boxvR":"\u255E","boxVr":"\u255F","boxVR":"\u2560","bprime":"\u2035","breve":"\u02D8","Breve":"\u02D8","brvbar":"\u00A6","bscr":"\uD835\uDCB7","Bscr":"\u212C","bsemi":"\u204F","bsim":"\u223D","bsime":"\u22CD","bsolb":"\u29C5","bsol":"\\","bsolhsub":"\u27C8","bull":"\u2022","bullet":"\u2022","bump":"\u224E","bumpE":"\u2AAE","bumpe":"\u224F","Bumpeq":"\u224E","bumpeq":"\u224F","Cacute":"\u0106","cacute":"\u0107","capand":"\u2A44","capbrcup":"\u2A49","capcap":"\u2A4B","cap":"\u2229","Cap":"\u22D2","capcup":"\u2A47","capdot":"\u2A40","CapitalDifferentialD":"\u2145","caps":"\u2229\uFE00","caret":"\u2041","caron":"\u02C7","Cayleys":"\u212D","ccaps":"\u2A4D","Ccaron":"\u010C","ccaron":"\u010D","Ccedil":"\u00C7","ccedil":"\u00E7","Ccirc":"\u0108","ccirc":"\u0109","Cconint":"\u2230","ccups":"\u2A4C","ccupssm":"\u2A50","Cdot":"\u010A","cdot":"\u010B","cedil":"\u00B8","Cedilla":"\u00B8","cemptyv":"\u29B2","cent":"\u00A2","centerdot":"\u00B7","CenterDot":"\u00B7","cfr":"\uD835\uDD20","Cfr":"\u212D","CHcy":"\u0427","chcy":"\u0447","check":"\u2713","checkmark":"\u2713","Chi":"\u03A7","chi":"\u03C7","circ":"\u02C6","circeq":"\u2257","circlearrowleft":"\u21BA","circlearrowright":"\u21BB","circledast":"\u229B","circledcirc":"\u229A","circleddash":"\u229D","CircleDot":"\u2299","circledR":"\u00AE","circledS":"\u24C8","CircleMinus":"\u2296","CirclePlus":"\u2295","CircleTimes":"\u2297","cir":"\u25CB","cirE":"\u29C3","cire":"\u2257","cirfnint":"\u2A10","cirmid":"\u2AEF","cirscir":"\u29C2","ClockwiseContourIntegral":"\u2232","CloseCurlyDoubleQuote":"\u201D","CloseCurlyQuote":"\u2019","clubs":"\u2663","clubsuit":"\u2663","colon":":","Colon":"\u2237","Colone":"\u2A74","colone":"\u2254","coloneq":"\u2254","comma":",","commat":"@","comp":"\u2201","compfn":"\u2218","complement":"\u2201","complexes":"\u2102","cong":"\u2245","congdot":"\u2A6D","Congruent":"\u2261","conint":"\u222E","Conint":"\u222F","ContourIntegral":"\u222E","copf":"\uD835\uDD54","Copf":"\u2102","coprod":"\u2210","Coproduct":"\u2210","copy":"\u00A9","COPY":"\u00A9","copysr":"\u2117","CounterClockwiseContourIntegral":"\u2233","crarr":"\u21B5","cross":"\u2717","Cross":"\u2A2F","Cscr":"\uD835\uDC9E","cscr":"\uD835\uDCB8","csub":"\u2ACF","csube":"\u2AD1","csup":"\u2AD0","csupe":"\u2AD2","ctdot":"\u22EF","cudarrl":"\u2938","cudarrr":"\u2935","cuepr":"\u22DE","cuesc":"\u22DF","cularr":"\u21B6","cularrp":"\u293D","cupbrcap":"\u2A48","cupcap":"\u2A46","CupCap":"\u224D","cup":"\u222A","Cup":"\u22D3","cupcup":"\u2A4A","cupdot":"\u228D","cupor":"\u2A45","cups":"\u222A\uFE00","curarr":"\u21B7","curarrm":"\u293C","curlyeqprec":"\u22DE","curlyeqsucc":"\u22DF","curlyvee":"\u22CE","curlywedge":"\u22CF","curren":"\u00A4","curvearrowleft":"\u21B6","curvearrowright":"\u21B7","cuvee":"\u22CE","cuwed":"\u22CF","cwconint":"\u2232","cwint":"\u2231","cylcty":"\u232D","dagger":"\u2020","Dagger":"\u2021","daleth":"\u2138","darr":"\u2193","Darr":"\u21A1","dArr":"\u21D3","dash":"\u2010","Dashv":"\u2AE4","dashv":"\u22A3","dbkarow":"\u290F","dblac":"\u02DD","Dcaron":"\u010E","dcaron":"\u010F","Dcy":"\u0414","dcy":"\u0434","ddagger":"\u2021","ddarr":"\u21CA","DD":"\u2145","dd":"\u2146","DDotrahd":"\u2911","ddotseq":"\u2A77","deg":"\u00B0","Del":"\u2207","Delta":"\u0394","delta":"\u03B4","demptyv":"\u29B1","dfisht":"\u297F","Dfr":"\uD835\uDD07","dfr":"\uD835\uDD21","dHar":"\u2965","dharl":"\u21C3","dharr":"\u21C2","DiacriticalAcute":"\u00B4","DiacriticalDot":"\u02D9","DiacriticalDoubleAcute":"\u02DD","DiacriticalGrave":"`","DiacriticalTilde":"\u02DC","diam":"\u22C4","diamond":"\u22C4","Diamond":"\u22C4","diamondsuit":"\u2666","diams":"\u2666","die":"\u00A8","DifferentialD":"\u2146","digamma":"\u03DD","disin":"\u22F2","div":"\u00F7","divide":"\u00F7","divideontimes":"\u22C7","divonx":"\u22C7","DJcy":"\u0402","djcy":"\u0452","dlcorn":"\u231E","dlcrop":"\u230D","dollar":"$","Dopf":"\uD835\uDD3B","dopf":"\uD835\uDD55","Dot":"\u00A8","dot":"\u02D9","DotDot":"\u20DC","doteq":"\u2250","doteqdot":"\u2251","DotEqual":"\u2250","dotminus":"\u2238","dotplus":"\u2214","dotsquare":"\u22A1","doublebarwedge":"\u2306","DoubleContourIntegral":"\u222F","DoubleDot":"\u00A8","DoubleDownArrow":"\u21D3","DoubleLeftArrow":"\u21D0","DoubleLeftRightArrow":"\u21D4","DoubleLeftTee":"\u2AE4","DoubleLongLeftArrow":"\u27F8","DoubleLongLeftRightArrow":"\u27FA","DoubleLongRightArrow":"\u27F9","DoubleRightArrow":"\u21D2","DoubleRightTee":"\u22A8","DoubleUpArrow":"\u21D1","DoubleUpDownArrow":"\u21D5","DoubleVerticalBar":"\u2225","DownArrowBar":"\u2913","downarrow":"\u2193","DownArrow":"\u2193","Downarrow":"\u21D3","DownArrowUpArrow":"\u21F5","DownBreve":"\u0311","downdownarrows":"\u21CA","downharpoonleft":"\u21C3","downharpoonright":"\u21C2","DownLeftRightVector":"\u2950","DownLeftTeeVector":"\u295E","DownLeftVectorBar":"\u2956","DownLeftVector":"\u21BD","DownRightTeeVector":"\u295F","DownRightVectorBar":"\u2957","DownRightVector":"\u21C1","DownTeeArrow":"\u21A7","DownTee":"\u22A4","drbkarow":"\u2910","drcorn":"\u231F","drcrop":"\u230C","Dscr":"\uD835\uDC9F","dscr":"\uD835\uDCB9","DScy":"\u0405","dscy":"\u0455","dsol":"\u29F6","Dstrok":"\u0110","dstrok":"\u0111","dtdot":"\u22F1","dtri":"\u25BF","dtrif":"\u25BE","duarr":"\u21F5","duhar":"\u296F","dwangle":"\u29A6","DZcy":"\u040F","dzcy":"\u045F","dzigrarr":"\u27FF","Eacute":"\u00C9","eacute":"\u00E9","easter":"\u2A6E","Ecaron":"\u011A","ecaron":"\u011B","Ecirc":"\u00CA","ecirc":"\u00EA","ecir":"\u2256","ecolon":"\u2255","Ecy":"\u042D","ecy":"\u044D","eDDot":"\u2A77","Edot":"\u0116","edot":"\u0117","eDot":"\u2251","ee":"\u2147","efDot":"\u2252","Efr":"\uD835\uDD08","efr":"\uD835\uDD22","eg":"\u2A9A","Egrave":"\u00C8","egrave":"\u00E8","egs":"\u2A96","egsdot":"\u2A98","el":"\u2A99","Element":"\u2208","elinters":"\u23E7","ell":"\u2113","els":"\u2A95","elsdot":"\u2A97","Emacr":"\u0112","emacr":"\u0113","empty":"\u2205","emptyset":"\u2205","EmptySmallSquare":"\u25FB","emptyv":"\u2205","EmptyVerySmallSquare":"\u25AB","emsp13":"\u2004","emsp14":"\u2005","emsp":"\u2003","ENG":"\u014A","eng":"\u014B","ensp":"\u2002","Eogon":"\u0118","eogon":"\u0119","Eopf":"\uD835\uDD3C","eopf":"\uD835\uDD56","epar":"\u22D5","eparsl":"\u29E3","eplus":"\u2A71","epsi":"\u03B5","Epsilon":"\u0395","epsilon":"\u03B5","epsiv":"\u03F5","eqcirc":"\u2256","eqcolon":"\u2255","eqsim":"\u2242","eqslantgtr":"\u2A96","eqslantless":"\u2A95","Equal":"\u2A75","equals":"=","EqualTilde":"\u2242","equest":"\u225F","Equilibrium":"\u21CC","equiv":"\u2261","equivDD":"\u2A78","eqvparsl":"\u29E5","erarr":"\u2971","erDot":"\u2253","escr":"\u212F","Escr":"\u2130","esdot":"\u2250","Esim":"\u2A73","esim":"\u2242","Eta":"\u0397","eta":"\u03B7","ETH":"\u00D0","eth":"\u00F0","Euml":"\u00CB","euml":"\u00EB","euro":"\u20AC","excl":"!","exist":"\u2203","Exists":"\u2203","expectation":"\u2130","exponentiale":"\u2147","ExponentialE":"\u2147","fallingdotseq":"\u2252","Fcy":"\u0424","fcy":"\u0444","female":"\u2640","ffilig":"\uFB03","fflig":"\uFB00","ffllig":"\uFB04","Ffr":"\uD835\uDD09","ffr":"\uD835\uDD23","filig":"\uFB01","FilledSmallSquare":"\u25FC","FilledVerySmallSquare":"\u25AA","fjlig":"fj","flat":"\u266D","fllig":"\uFB02","fltns":"\u25B1","fnof":"\u0192","Fopf":"\uD835\uDD3D","fopf":"\uD835\uDD57","forall":"\u2200","ForAll":"\u2200","fork":"\u22D4","forkv":"\u2AD9","Fouriertrf":"\u2131","fpartint":"\u2A0D","frac12":"\u00BD","frac13":"\u2153","frac14":"\u00BC","frac15":"\u2155","frac16":"\u2159","frac18":"\u215B","frac23":"\u2154","frac25":"\u2156","frac34":"\u00BE","frac35":"\u2157","frac38":"\u215C","frac45":"\u2158","frac56":"\u215A","frac58":"\u215D","frac78":"\u215E","frasl":"\u2044","frown":"\u2322","fscr":"\uD835\uDCBB","Fscr":"\u2131","gacute":"\u01F5","Gamma":"\u0393","gamma":"\u03B3","Gammad":"\u03DC","gammad":"\u03DD","gap":"\u2A86","Gbreve":"\u011E","gbreve":"\u011F","Gcedil":"\u0122","Gcirc":"\u011C","gcirc":"\u011D","Gcy":"\u0413","gcy":"\u0433","Gdot":"\u0120","gdot":"\u0121","ge":"\u2265","gE":"\u2267","gEl":"\u2A8C","gel":"\u22DB","geq":"\u2265","geqq":"\u2267","geqslant":"\u2A7E","gescc":"\u2AA9","ges":"\u2A7E","gesdot":"\u2A80","gesdoto":"\u2A82","gesdotol":"\u2A84","gesl":"\u22DB\uFE00","gesles":"\u2A94","Gfr":"\uD835\uDD0A","gfr":"\uD835\uDD24","gg":"\u226B","Gg":"\u22D9","ggg":"\u22D9","gimel":"\u2137","GJcy":"\u0403","gjcy":"\u0453","gla":"\u2AA5","gl":"\u2277","glE":"\u2A92","glj":"\u2AA4","gnap":"\u2A8A","gnapprox":"\u2A8A","gne":"\u2A88","gnE":"\u2269","gneq":"\u2A88","gneqq":"\u2269","gnsim":"\u22E7","Gopf":"\uD835\uDD3E","gopf":"\uD835\uDD58","grave":"`","GreaterEqual":"\u2265","GreaterEqualLess":"\u22DB","GreaterFullEqual":"\u2267","GreaterGreater":"\u2AA2","GreaterLess":"\u2277","GreaterSlantEqual":"\u2A7E","GreaterTilde":"\u2273","Gscr":"\uD835\uDCA2","gscr":"\u210A","gsim":"\u2273","gsime":"\u2A8E","gsiml":"\u2A90","gtcc":"\u2AA7","gtcir":"\u2A7A","gt":">","GT":">","Gt":"\u226B","gtdot":"\u22D7","gtlPar":"\u2995","gtquest":"\u2A7C","gtrapprox":"\u2A86","gtrarr":"\u2978","gtrdot":"\u22D7","gtreqless":"\u22DB","gtreqqless":"\u2A8C","gtrless":"\u2277","gtrsim":"\u2273","gvertneqq":"\u2269\uFE00","gvnE":"\u2269\uFE00","Hacek":"\u02C7","hairsp":"\u200A","half":"\u00BD","hamilt":"\u210B","HARDcy":"\u042A","hardcy":"\u044A","harrcir":"\u2948","harr":"\u2194","hArr":"\u21D4","harrw":"\u21AD","Hat":"^","hbar":"\u210F","Hcirc":"\u0124","hcirc":"\u0125","hearts":"\u2665","heartsuit":"\u2665","hellip":"\u2026","hercon":"\u22B9","hfr":"\uD835\uDD25","Hfr":"\u210C","HilbertSpace":"\u210B","hksearow":"\u2925","hkswarow":"\u2926","hoarr":"\u21FF","homtht":"\u223B","hookleftarrow":"\u21A9","hookrightarrow":"\u21AA","hopf":"\uD835\uDD59","Hopf":"\u210D","horbar":"\u2015","HorizontalLine":"\u2500","hscr":"\uD835\uDCBD","Hscr":"\u210B","hslash":"\u210F","Hstrok":"\u0126","hstrok":"\u0127","HumpDownHump":"\u224E","HumpEqual":"\u224F","hybull":"\u2043","hyphen":"\u2010","Iacute":"\u00CD","iacute":"\u00ED","ic":"\u2063","Icirc":"\u00CE","icirc":"\u00EE","Icy":"\u0418","icy":"\u0438","Idot":"\u0130","IEcy":"\u0415","iecy":"\u0435","iexcl":"\u00A1","iff":"\u21D4","ifr":"\uD835\uDD26","Ifr":"\u2111","Igrave":"\u00CC","igrave":"\u00EC","ii":"\u2148","iiiint":"\u2A0C","iiint":"\u222D","iinfin":"\u29DC","iiota":"\u2129","IJlig":"\u0132","ijlig":"\u0133","Imacr":"\u012A","imacr":"\u012B","image":"\u2111","ImaginaryI":"\u2148","imagline":"\u2110","imagpart":"\u2111","imath":"\u0131","Im":"\u2111","imof":"\u22B7","imped":"\u01B5","Implies":"\u21D2","incare":"\u2105","in":"\u2208","infin":"\u221E","infintie":"\u29DD","inodot":"\u0131","intcal":"\u22BA","int":"\u222B","Int":"\u222C","integers":"\u2124","Integral":"\u222B","intercal":"\u22BA","Intersection":"\u22C2","intlarhk":"\u2A17","intprod":"\u2A3C","InvisibleComma":"\u2063","InvisibleTimes":"\u2062","IOcy":"\u0401","iocy":"\u0451","Iogon":"\u012E","iogon":"\u012F","Iopf":"\uD835\uDD40","iopf":"\uD835\uDD5A","Iota":"\u0399","iota":"\u03B9","iprod":"\u2A3C","iquest":"\u00BF","iscr":"\uD835\uDCBE","Iscr":"\u2110","isin":"\u2208","isindot":"\u22F5","isinE":"\u22F9","isins":"\u22F4","isinsv":"\u22F3","isinv":"\u2208","it":"\u2062","Itilde":"\u0128","itilde":"\u0129","Iukcy":"\u0406","iukcy":"\u0456","Iuml":"\u00CF","iuml":"\u00EF","Jcirc":"\u0134","jcirc":"\u0135","Jcy":"\u0419","jcy":"\u0439","Jfr":"\uD835\uDD0D","jfr":"\uD835\uDD27","jmath":"\u0237","Jopf":"\uD835\uDD41","jopf":"\uD835\uDD5B","Jscr":"\uD835\uDCA5","jscr":"\uD835\uDCBF","Jsercy":"\u0408","jsercy":"\u0458","Jukcy":"\u0404","jukcy":"\u0454","Kappa":"\u039A","kappa":"\u03BA","kappav":"\u03F0","Kcedil":"\u0136","kcedil":"\u0137","Kcy":"\u041A","kcy":"\u043A","Kfr":"\uD835\uDD0E","kfr":"\uD835\uDD28","kgreen":"\u0138","KHcy":"\u0425","khcy":"\u0445","KJcy":"\u040C","kjcy":"\u045C","Kopf":"\uD835\uDD42","kopf":"\uD835\uDD5C","Kscr":"\uD835\uDCA6","kscr":"\uD835\uDCC0","lAarr":"\u21DA","Lacute":"\u0139","lacute":"\u013A","laemptyv":"\u29B4","lagran":"\u2112","Lambda":"\u039B","lambda":"\u03BB","lang":"\u27E8","Lang":"\u27EA","langd":"\u2991","langle":"\u27E8","lap":"\u2A85","Laplacetrf":"\u2112","laquo":"\u00AB","larrb":"\u21E4","larrbfs":"\u291F","larr":"\u2190","Larr":"\u219E","lArr":"\u21D0","larrfs":"\u291D","larrhk":"\u21A9","larrlp":"\u21AB","larrpl":"\u2939","larrsim":"\u2973","larrtl":"\u21A2","latail":"\u2919","lAtail":"\u291B","lat":"\u2AAB","late":"\u2AAD","lates":"\u2AAD\uFE00","lbarr":"\u290C","lBarr":"\u290E","lbbrk":"\u2772","lbrace":"{","lbrack":"[","lbrke":"\u298B","lbrksld":"\u298F","lbrkslu":"\u298D","Lcaron":"\u013D","lcaron":"\u013E","Lcedil":"\u013B","lcedil":"\u013C","lceil":"\u2308","lcub":"{","Lcy":"\u041B","lcy":"\u043B","ldca":"\u2936","ldquo":"\u201C","ldquor":"\u201E","ldrdhar":"\u2967","ldrushar":"\u294B","ldsh":"\u21B2","le":"\u2264","lE":"\u2266","LeftAngleBracket":"\u27E8","LeftArrowBar":"\u21E4","leftarrow":"\u2190","LeftArrow":"\u2190","Leftarrow":"\u21D0","LeftArrowRightArrow":"\u21C6","leftarrowtail":"\u21A2","LeftCeiling":"\u2308","LeftDoubleBracket":"\u27E6","LeftDownTeeVector":"\u2961","LeftDownVectorBar":"\u2959","LeftDownVector":"\u21C3","LeftFloor":"\u230A","leftharpoondown":"\u21BD","leftharpoonup":"\u21BC","leftleftarrows":"\u21C7","leftrightarrow":"\u2194","LeftRightArrow":"\u2194","Leftrightarrow":"\u21D4","leftrightarrows":"\u21C6","leftrightharpoons":"\u21CB","leftrightsquigarrow":"\u21AD","LeftRightVector":"\u294E","LeftTeeArrow":"\u21A4","LeftTee":"\u22A3","LeftTeeVector":"\u295A","leftthreetimes":"\u22CB","LeftTriangleBar":"\u29CF","LeftTriangle":"\u22B2","LeftTriangleEqual":"\u22B4","LeftUpDownVector":"\u2951","LeftUpTeeVector":"\u2960","LeftUpVectorBar":"\u2958","LeftUpVector":"\u21BF","LeftVectorBar":"\u2952","LeftVector":"\u21BC","lEg":"\u2A8B","leg":"\u22DA","leq":"\u2264","leqq":"\u2266","leqslant":"\u2A7D","lescc":"\u2AA8","les":"\u2A7D","lesdot":"\u2A7F","lesdoto":"\u2A81","lesdotor":"\u2A83","lesg":"\u22DA\uFE00","lesges":"\u2A93","lessapprox":"\u2A85","lessdot":"\u22D6","lesseqgtr":"\u22DA","lesseqqgtr":"\u2A8B","LessEqualGreater":"\u22DA","LessFullEqual":"\u2266","LessGreater":"\u2276","lessgtr":"\u2276","LessLess":"\u2AA1","lesssim":"\u2272","LessSlantEqual":"\u2A7D","LessTilde":"\u2272","lfisht":"\u297C","lfloor":"\u230A","Lfr":"\uD835\uDD0F","lfr":"\uD835\uDD29","lg":"\u2276","lgE":"\u2A91","lHar":"\u2962","lhard":"\u21BD","lharu":"\u21BC","lharul":"\u296A","lhblk":"\u2584","LJcy":"\u0409","ljcy":"\u0459","llarr":"\u21C7","ll":"\u226A","Ll":"\u22D8","llcorner":"\u231E","Lleftarrow":"\u21DA","llhard":"\u296B","lltri":"\u25FA","Lmidot":"\u013F","lmidot":"\u0140","lmoustache":"\u23B0","lmoust":"\u23B0","lnap":"\u2A89","lnapprox":"\u2A89","lne":"\u2A87","lnE":"\u2268","lneq":"\u2A87","lneqq":"\u2268","lnsim":"\u22E6","loang":"\u27EC","loarr":"\u21FD","lobrk":"\u27E6","longleftarrow":"\u27F5","LongLeftArrow":"\u27F5","Longleftarrow":"\u27F8","longleftrightarrow":"\u27F7","LongLeftRightArrow":"\u27F7","Longleftrightarrow":"\u27FA","longmapsto":"\u27FC","longrightarrow":"\u27F6","LongRightArrow":"\u27F6","Longrightarrow":"\u27F9","looparrowleft":"\u21AB","looparrowright":"\u21AC","lopar":"\u2985","Lopf":"\uD835\uDD43","lopf":"\uD835\uDD5D","loplus":"\u2A2D","lotimes":"\u2A34","lowast":"\u2217","lowbar":"_","LowerLeftArrow":"\u2199","LowerRightArrow":"\u2198","loz":"\u25CA","lozenge":"\u25CA","lozf":"\u29EB","lpar":"(","lparlt":"\u2993","lrarr":"\u21C6","lrcorner":"\u231F","lrhar":"\u21CB","lrhard":"\u296D","lrm":"\u200E","lrtri":"\u22BF","lsaquo":"\u2039","lscr":"\uD835\uDCC1","Lscr":"\u2112","lsh":"\u21B0","Lsh":"\u21B0","lsim":"\u2272","lsime":"\u2A8D","lsimg":"\u2A8F","lsqb":"[","lsquo":"\u2018","lsquor":"\u201A","Lstrok":"\u0141","lstrok":"\u0142","ltcc":"\u2AA6","ltcir":"\u2A79","lt":"<","LT":"<","Lt":"\u226A","ltdot":"\u22D6","lthree":"\u22CB","ltimes":"\u22C9","ltlarr":"\u2976","ltquest":"\u2A7B","ltri":"\u25C3","ltrie":"\u22B4","ltrif":"\u25C2","ltrPar":"\u2996","lurdshar":"\u294A","luruhar":"\u2966","lvertneqq":"\u2268\uFE00","lvnE":"\u2268\uFE00","macr":"\u00AF","male":"\u2642","malt":"\u2720","maltese":"\u2720","Map":"\u2905","map":"\u21A6","mapsto":"\u21A6","mapstodown":"\u21A7","mapstoleft":"\u21A4","mapstoup":"\u21A5","marker":"\u25AE","mcomma":"\u2A29","Mcy":"\u041C","mcy":"\u043C","mdash":"\u2014","mDDot":"\u223A","measuredangle":"\u2221","MediumSpace":"\u205F","Mellintrf":"\u2133","Mfr":"\uD835\uDD10","mfr":"\uD835\uDD2A","mho":"\u2127","micro":"\u00B5","midast":"*","midcir":"\u2AF0","mid":"\u2223","middot":"\u00B7","minusb":"\u229F","minus":"\u2212","minusd":"\u2238","minusdu":"\u2A2A","MinusPlus":"\u2213","mlcp":"\u2ADB","mldr":"\u2026","mnplus":"\u2213","models":"\u22A7","Mopf":"\uD835\uDD44","mopf":"\uD835\uDD5E","mp":"\u2213","mscr":"\uD835\uDCC2","Mscr":"\u2133","mstpos":"\u223E","Mu":"\u039C","mu":"\u03BC","multimap":"\u22B8","mumap":"\u22B8","nabla":"\u2207","Nacute":"\u0143","nacute":"\u0144","nang":"\u2220\u20D2","nap":"\u2249","napE":"\u2A70\u0338","napid":"\u224B\u0338","napos":"\u0149","napprox":"\u2249","natural":"\u266E","naturals":"\u2115","natur":"\u266E","nbsp":"\u00A0","nbump":"\u224E\u0338","nbumpe":"\u224F\u0338","ncap":"\u2A43","Ncaron":"\u0147","ncaron":"\u0148","Ncedil":"\u0145","ncedil":"\u0146","ncong":"\u2247","ncongdot":"\u2A6D\u0338","ncup":"\u2A42","Ncy":"\u041D","ncy":"\u043D","ndash":"\u2013","nearhk":"\u2924","nearr":"\u2197","neArr":"\u21D7","nearrow":"\u2197","ne":"\u2260","nedot":"\u2250\u0338","NegativeMediumSpace":"\u200B","NegativeThickSpace":"\u200B","NegativeThinSpace":"\u200B","NegativeVeryThinSpace":"\u200B","nequiv":"\u2262","nesear":"\u2928","nesim":"\u2242\u0338","NestedGreaterGreater":"\u226B","NestedLessLess":"\u226A","NewLine":"\n","nexist":"\u2204","nexists":"\u2204","Nfr":"\uD835\uDD11","nfr":"\uD835\uDD2B","ngE":"\u2267\u0338","nge":"\u2271","ngeq":"\u2271","ngeqq":"\u2267\u0338","ngeqslant":"\u2A7E\u0338","nges":"\u2A7E\u0338","nGg":"\u22D9\u0338","ngsim":"\u2275","nGt":"\u226B\u20D2","ngt":"\u226F","ngtr":"\u226F","nGtv":"\u226B\u0338","nharr":"\u21AE","nhArr":"\u21CE","nhpar":"\u2AF2","ni":"\u220B","nis":"\u22FC","nisd":"\u22FA","niv":"\u220B","NJcy":"\u040A","njcy":"\u045A","nlarr":"\u219A","nlArr":"\u21CD","nldr":"\u2025","nlE":"\u2266\u0338","nle":"\u2270","nleftarrow":"\u219A","nLeftarrow":"\u21CD","nleftrightarrow":"\u21AE","nLeftrightarrow":"\u21CE","nleq":"\u2270","nleqq":"\u2266\u0338","nleqslant":"\u2A7D\u0338","nles":"\u2A7D\u0338","nless":"\u226E","nLl":"\u22D8\u0338","nlsim":"\u2274","nLt":"\u226A\u20D2","nlt":"\u226E","nltri":"\u22EA","nltrie":"\u22EC","nLtv":"\u226A\u0338","nmid":"\u2224","NoBreak":"\u2060","NonBreakingSpace":"\u00A0","nopf":"\uD835\uDD5F","Nopf":"\u2115","Not":"\u2AEC","not":"\u00AC","NotCongruent":"\u2262","NotCupCap":"\u226D","NotDoubleVerticalBar":"\u2226","NotElement":"\u2209","NotEqual":"\u2260","NotEqualTilde":"\u2242\u0338","NotExists":"\u2204","NotGreater":"\u226F","NotGreaterEqual":"\u2271","NotGreaterFullEqual":"\u2267\u0338","NotGreaterGreater":"\u226B\u0338","NotGreaterLess":"\u2279","NotGreaterSlantEqual":"\u2A7E\u0338","NotGreaterTilde":"\u2275","NotHumpDownHump":"\u224E\u0338","NotHumpEqual":"\u224F\u0338","notin":"\u2209","notindot":"\u22F5\u0338","notinE":"\u22F9\u0338","notinva":"\u2209","notinvb":"\u22F7","notinvc":"\u22F6","NotLeftTriangleBar":"\u29CF\u0338","NotLeftTriangle":"\u22EA","NotLeftTriangleEqual":"\u22EC","NotLess":"\u226E","NotLessEqual":"\u2270","NotLessGreater":"\u2278","NotLessLess":"\u226A\u0338","NotLessSlantEqual":"\u2A7D\u0338","NotLessTilde":"\u2274","NotNestedGreaterGreater":"\u2AA2\u0338","NotNestedLessLess":"\u2AA1\u0338","notni":"\u220C","notniva":"\u220C","notnivb":"\u22FE","notnivc":"\u22FD","NotPrecedes":"\u2280","NotPrecedesEqual":"\u2AAF\u0338","NotPrecedesSlantEqual":"\u22E0","NotReverseElement":"\u220C","NotRightTriangleBar":"\u29D0\u0338","NotRightTriangle":"\u22EB","NotRightTriangleEqual":"\u22ED","NotSquareSubset":"\u228F\u0338","NotSquareSubsetEqual":"\u22E2","NotSquareSuperset":"\u2290\u0338","NotSquareSupersetEqual":"\u22E3","NotSubset":"\u2282\u20D2","NotSubsetEqual":"\u2288","NotSucceeds":"\u2281","NotSucceedsEqual":"\u2AB0\u0338","NotSucceedsSlantEqual":"\u22E1","NotSucceedsTilde":"\u227F\u0338","NotSuperset":"\u2283\u20D2","NotSupersetEqual":"\u2289","NotTilde":"\u2241","NotTildeEqual":"\u2244","NotTildeFullEqual":"\u2247","NotTildeTilde":"\u2249","NotVerticalBar":"\u2224","nparallel":"\u2226","npar":"\u2226","nparsl":"\u2AFD\u20E5","npart":"\u2202\u0338","npolint":"\u2A14","npr":"\u2280","nprcue":"\u22E0","nprec":"\u2280","npreceq":"\u2AAF\u0338","npre":"\u2AAF\u0338","nrarrc":"\u2933\u0338","nrarr":"\u219B","nrArr":"\u21CF","nrarrw":"\u219D\u0338","nrightarrow":"\u219B","nRightarrow":"\u21CF","nrtri":"\u22EB","nrtrie":"\u22ED","nsc":"\u2281","nsccue":"\u22E1","nsce":"\u2AB0\u0338","Nscr":"\uD835\uDCA9","nscr":"\uD835\uDCC3","nshortmid":"\u2224","nshortparallel":"\u2226","nsim":"\u2241","nsime":"\u2244","nsimeq":"\u2244","nsmid":"\u2224","nspar":"\u2226","nsqsube":"\u22E2","nsqsupe":"\u22E3","nsub":"\u2284","nsubE":"\u2AC5\u0338","nsube":"\u2288","nsubset":"\u2282\u20D2","nsubseteq":"\u2288","nsubseteqq":"\u2AC5\u0338","nsucc":"\u2281","nsucceq":"\u2AB0\u0338","nsup":"\u2285","nsupE":"\u2AC6\u0338","nsupe":"\u2289","nsupset":"\u2283\u20D2","nsupseteq":"\u2289","nsupseteqq":"\u2AC6\u0338","ntgl":"\u2279","Ntilde":"\u00D1","ntilde":"\u00F1","ntlg":"\u2278","ntriangleleft":"\u22EA","ntrianglelefteq":"\u22EC","ntriangleright":"\u22EB","ntrianglerighteq":"\u22ED","Nu":"\u039D","nu":"\u03BD","num":"#","numero":"\u2116","numsp":"\u2007","nvap":"\u224D\u20D2","nvdash":"\u22AC","nvDash":"\u22AD","nVdash":"\u22AE","nVDash":"\u22AF","nvge":"\u2265\u20D2","nvgt":">\u20D2","nvHarr":"\u2904","nvinfin":"\u29DE","nvlArr":"\u2902","nvle":"\u2264\u20D2","nvlt":"<\u20D2","nvltrie":"\u22B4\u20D2","nvrArr":"\u2903","nvrtrie":"\u22B5\u20D2","nvsim":"\u223C\u20D2","nwarhk":"\u2923","nwarr":"\u2196","nwArr":"\u21D6","nwarrow":"\u2196","nwnear":"\u2927","Oacute":"\u00D3","oacute":"\u00F3","oast":"\u229B","Ocirc":"\u00D4","ocirc":"\u00F4","ocir":"\u229A","Ocy":"\u041E","ocy":"\u043E","odash":"\u229D","Odblac":"\u0150","odblac":"\u0151","odiv":"\u2A38","odot":"\u2299","odsold":"\u29BC","OElig":"\u0152","oelig":"\u0153","ofcir":"\u29BF","Ofr":"\uD835\uDD12","ofr":"\uD835\uDD2C","ogon":"\u02DB","Ograve":"\u00D2","ograve":"\u00F2","ogt":"\u29C1","ohbar":"\u29B5","ohm":"\u03A9","oint":"\u222E","olarr":"\u21BA","olcir":"\u29BE","olcross":"\u29BB","oline":"\u203E","olt":"\u29C0","Omacr":"\u014C","omacr":"\u014D","Omega":"\u03A9","omega":"\u03C9","Omicron":"\u039F","omicron":"\u03BF","omid":"\u29B6","ominus":"\u2296","Oopf":"\uD835\uDD46","oopf":"\uD835\uDD60","opar":"\u29B7","OpenCurlyDoubleQuote":"\u201C","OpenCurlyQuote":"\u2018","operp":"\u29B9","oplus":"\u2295","orarr":"\u21BB","Or":"\u2A54","or":"\u2228","ord":"\u2A5D","order":"\u2134","orderof":"\u2134","ordf":"\u00AA","ordm":"\u00BA","origof":"\u22B6","oror":"\u2A56","orslope":"\u2A57","orv":"\u2A5B","oS":"\u24C8","Oscr":"\uD835\uDCAA","oscr":"\u2134","Oslash":"\u00D8","oslash":"\u00F8","osol":"\u2298","Otilde":"\u00D5","otilde":"\u00F5","otimesas":"\u2A36","Otimes":"\u2A37","otimes":"\u2297","Ouml":"\u00D6","ouml":"\u00F6","ovbar":"\u233D","OverBar":"\u203E","OverBrace":"\u23DE","OverBracket":"\u23B4","OverParenthesis":"\u23DC","para":"\u00B6","parallel":"\u2225","par":"\u2225","parsim":"\u2AF3","parsl":"\u2AFD","part":"\u2202","PartialD":"\u2202","Pcy":"\u041F","pcy":"\u043F","percnt":"%","period":".","permil":"\u2030","perp":"\u22A5","pertenk":"\u2031","Pfr":"\uD835\uDD13","pfr":"\uD835\uDD2D","Phi":"\u03A6","phi":"\u03C6","phiv":"\u03D5","phmmat":"\u2133","phone":"\u260E","Pi":"\u03A0","pi":"\u03C0","pitchfork":"\u22D4","piv":"\u03D6","planck":"\u210F","planckh":"\u210E","plankv":"\u210F","plusacir":"\u2A23","plusb":"\u229E","pluscir":"\u2A22","plus":"+","plusdo":"\u2214","plusdu":"\u2A25","pluse":"\u2A72","PlusMinus":"\u00B1","plusmn":"\u00B1","plussim":"\u2A26","plustwo":"\u2A27","pm":"\u00B1","Poincareplane":"\u210C","pointint":"\u2A15","popf":"\uD835\uDD61","Popf":"\u2119","pound":"\u00A3","prap":"\u2AB7","Pr":"\u2ABB","pr":"\u227A","prcue":"\u227C","precapprox":"\u2AB7","prec":"\u227A","preccurlyeq":"\u227C","Precedes":"\u227A","PrecedesEqual":"\u2AAF","PrecedesSlantEqual":"\u227C","PrecedesTilde":"\u227E","preceq":"\u2AAF","precnapprox":"\u2AB9","precneqq":"\u2AB5","precnsim":"\u22E8","pre":"\u2AAF","prE":"\u2AB3","precsim":"\u227E","prime":"\u2032","Prime":"\u2033","primes":"\u2119","prnap":"\u2AB9","prnE":"\u2AB5","prnsim":"\u22E8","prod":"\u220F","Product":"\u220F","profalar":"\u232E","profline":"\u2312","profsurf":"\u2313","prop":"\u221D","Proportional":"\u221D","Proportion":"\u2237","propto":"\u221D","prsim":"\u227E","prurel":"\u22B0","Pscr":"\uD835\uDCAB","pscr":"\uD835\uDCC5","Psi":"\u03A8","psi":"\u03C8","puncsp":"\u2008","Qfr":"\uD835\uDD14","qfr":"\uD835\uDD2E","qint":"\u2A0C","qopf":"\uD835\uDD62","Qopf":"\u211A","qprime":"\u2057","Qscr":"\uD835\uDCAC","qscr":"\uD835\uDCC6","quaternions":"\u210D","quatint":"\u2A16","quest":"?","questeq":"\u225F","quot":"\"","QUOT":"\"","rAarr":"\u21DB","race":"\u223D\u0331","Racute":"\u0154","racute":"\u0155","radic":"\u221A","raemptyv":"\u29B3","rang":"\u27E9","Rang":"\u27EB","rangd":"\u2992","range":"\u29A5","rangle":"\u27E9","raquo":"\u00BB","rarrap":"\u2975","rarrb":"\u21E5","rarrbfs":"\u2920","rarrc":"\u2933","rarr":"\u2192","Rarr":"\u21A0","rArr":"\u21D2","rarrfs":"\u291E","rarrhk":"\u21AA","rarrlp":"\u21AC","rarrpl":"\u2945","rarrsim":"\u2974","Rarrtl":"\u2916","rarrtl":"\u21A3","rarrw":"\u219D","ratail":"\u291A","rAtail":"\u291C","ratio":"\u2236","rationals":"\u211A","rbarr":"\u290D","rBarr":"\u290F","RBarr":"\u2910","rbbrk":"\u2773","rbrace":"}","rbrack":"]","rbrke":"\u298C","rbrksld":"\u298E","rbrkslu":"\u2990","Rcaron":"\u0158","rcaron":"\u0159","Rcedil":"\u0156","rcedil":"\u0157","rceil":"\u2309","rcub":"}","Rcy":"\u0420","rcy":"\u0440","rdca":"\u2937","rdldhar":"\u2969","rdquo":"\u201D","rdquor":"\u201D","rdsh":"\u21B3","real":"\u211C","realine":"\u211B","realpart":"\u211C","reals":"\u211D","Re":"\u211C","rect":"\u25AD","reg":"\u00AE","REG":"\u00AE","ReverseElement":"\u220B","ReverseEquilibrium":"\u21CB","ReverseUpEquilibrium":"\u296F","rfisht":"\u297D","rfloor":"\u230B","rfr":"\uD835\uDD2F","Rfr":"\u211C","rHar":"\u2964","rhard":"\u21C1","rharu":"\u21C0","rharul":"\u296C","Rho":"\u03A1","rho":"\u03C1","rhov":"\u03F1","RightAngleBracket":"\u27E9","RightArrowBar":"\u21E5","rightarrow":"\u2192","RightArrow":"\u2192","Rightarrow":"\u21D2","RightArrowLeftArrow":"\u21C4","rightarrowtail":"\u21A3","RightCeiling":"\u2309","RightDoubleBracket":"\u27E7","RightDownTeeVector":"\u295D","RightDownVectorBar":"\u2955","RightDownVector":"\u21C2","RightFloor":"\u230B","rightharpoondown":"\u21C1","rightharpoonup":"\u21C0","rightleftarrows":"\u21C4","rightleftharpoons":"\u21CC","rightrightarrows":"\u21C9","rightsquigarrow":"\u219D","RightTeeArrow":"\u21A6","RightTee":"\u22A2","RightTeeVector":"\u295B","rightthreetimes":"\u22CC","RightTriangleBar":"\u29D0","RightTriangle":"\u22B3","RightTriangleEqual":"\u22B5","RightUpDownVector":"\u294F","RightUpTeeVector":"\u295C","RightUpVectorBar":"\u2954","RightUpVector":"\u21BE","RightVectorBar":"\u2953","RightVector":"\u21C0","ring":"\u02DA","risingdotseq":"\u2253","rlarr":"\u21C4","rlhar":"\u21CC","rlm":"\u200F","rmoustache":"\u23B1","rmoust":"\u23B1","rnmid":"\u2AEE","roang":"\u27ED","roarr":"\u21FE","robrk":"\u27E7","ropar":"\u2986","ropf":"\uD835\uDD63","Ropf":"\u211D","roplus":"\u2A2E","rotimes":"\u2A35","RoundImplies":"\u2970","rpar":")","rpargt":"\u2994","rppolint":"\u2A12","rrarr":"\u21C9","Rrightarrow":"\u21DB","rsaquo":"\u203A","rscr":"\uD835\uDCC7","Rscr":"\u211B","rsh":"\u21B1","Rsh":"\u21B1","rsqb":"]","rsquo":"\u2019","rsquor":"\u2019","rthree":"\u22CC","rtimes":"\u22CA","rtri":"\u25B9","rtrie":"\u22B5","rtrif":"\u25B8","rtriltri":"\u29CE","RuleDelayed":"\u29F4","ruluhar":"\u2968","rx":"\u211E","Sacute":"\u015A","sacute":"\u015B","sbquo":"\u201A","scap":"\u2AB8","Scaron":"\u0160","scaron":"\u0161","Sc":"\u2ABC","sc":"\u227B","sccue":"\u227D","sce":"\u2AB0","scE":"\u2AB4","Scedil":"\u015E","scedil":"\u015F","Scirc":"\u015C","scirc":"\u015D","scnap":"\u2ABA","scnE":"\u2AB6","scnsim":"\u22E9","scpolint":"\u2A13","scsim":"\u227F","Scy":"\u0421","scy":"\u0441","sdotb":"\u22A1","sdot":"\u22C5","sdote":"\u2A66","searhk":"\u2925","searr":"\u2198","seArr":"\u21D8","searrow":"\u2198","sect":"\u00A7","semi":";","seswar":"\u2929","setminus":"\u2216","setmn":"\u2216","sext":"\u2736","Sfr":"\uD835\uDD16","sfr":"\uD835\uDD30","sfrown":"\u2322","sharp":"\u266F","SHCHcy":"\u0429","shchcy":"\u0449","SHcy":"\u0428","shcy":"\u0448","ShortDownArrow":"\u2193","ShortLeftArrow":"\u2190","shortmid":"\u2223","shortparallel":"\u2225","ShortRightArrow":"\u2192","ShortUpArrow":"\u2191","shy":"\u00AD","Sigma":"\u03A3","sigma":"\u03C3","sigmaf":"\u03C2","sigmav":"\u03C2","sim":"\u223C","simdot":"\u2A6A","sime":"\u2243","simeq":"\u2243","simg":"\u2A9E","simgE":"\u2AA0","siml":"\u2A9D","simlE":"\u2A9F","simne":"\u2246","simplus":"\u2A24","simrarr":"\u2972","slarr":"\u2190","SmallCircle":"\u2218","smallsetminus":"\u2216","smashp":"\u2A33","smeparsl":"\u29E4","smid":"\u2223","smile":"\u2323","smt":"\u2AAA","smte":"\u2AAC","smtes":"\u2AAC\uFE00","SOFTcy":"\u042C","softcy":"\u044C","solbar":"\u233F","solb":"\u29C4","sol":"/","Sopf":"\uD835\uDD4A","sopf":"\uD835\uDD64","spades":"\u2660","spadesuit":"\u2660","spar":"\u2225","sqcap":"\u2293","sqcaps":"\u2293\uFE00","sqcup":"\u2294","sqcups":"\u2294\uFE00","Sqrt":"\u221A","sqsub":"\u228F","sqsube":"\u2291","sqsubset":"\u228F","sqsubseteq":"\u2291","sqsup":"\u2290","sqsupe":"\u2292","sqsupset":"\u2290","sqsupseteq":"\u2292","square":"\u25A1","Square":"\u25A1","SquareIntersection":"\u2293","SquareSubset":"\u228F","SquareSubsetEqual":"\u2291","SquareSuperset":"\u2290","SquareSupersetEqual":"\u2292","SquareUnion":"\u2294","squarf":"\u25AA","squ":"\u25A1","squf":"\u25AA","srarr":"\u2192","Sscr":"\uD835\uDCAE","sscr":"\uD835\uDCC8","ssetmn":"\u2216","ssmile":"\u2323","sstarf":"\u22C6","Star":"\u22C6","star":"\u2606","starf":"\u2605","straightepsilon":"\u03F5","straightphi":"\u03D5","strns":"\u00AF","sub":"\u2282","Sub":"\u22D0","subdot":"\u2ABD","subE":"\u2AC5","sube":"\u2286","subedot":"\u2AC3","submult":"\u2AC1","subnE":"\u2ACB","subne":"\u228A","subplus":"\u2ABF","subrarr":"\u2979","subset":"\u2282","Subset":"\u22D0","subseteq":"\u2286","subseteqq":"\u2AC5","SubsetEqual":"\u2286","subsetneq":"\u228A","subsetneqq":"\u2ACB","subsim":"\u2AC7","subsub":"\u2AD5","subsup":"\u2AD3","succapprox":"\u2AB8","succ":"\u227B","succcurlyeq":"\u227D","Succeeds":"\u227B","SucceedsEqual":"\u2AB0","SucceedsSlantEqual":"\u227D","SucceedsTilde":"\u227F","succeq":"\u2AB0","succnapprox":"\u2ABA","succneqq":"\u2AB6","succnsim":"\u22E9","succsim":"\u227F","SuchThat":"\u220B","sum":"\u2211","Sum":"\u2211","sung":"\u266A","sup1":"\u00B9","sup2":"\u00B2","sup3":"\u00B3","sup":"\u2283","Sup":"\u22D1","supdot":"\u2ABE","supdsub":"\u2AD8","supE":"\u2AC6","supe":"\u2287","supedot":"\u2AC4","Superset":"\u2283","SupersetEqual":"\u2287","suphsol":"\u27C9","suphsub":"\u2AD7","suplarr":"\u297B","supmult":"\u2AC2","supnE":"\u2ACC","supne":"\u228B","supplus":"\u2AC0","supset":"\u2283","Supset":"\u22D1","supseteq":"\u2287","supseteqq":"\u2AC6","supsetneq":"\u228B","supsetneqq":"\u2ACC","supsim":"\u2AC8","supsub":"\u2AD4","supsup":"\u2AD6","swarhk":"\u2926","swarr":"\u2199","swArr":"\u21D9","swarrow":"\u2199","swnwar":"\u292A","szlig":"\u00DF","Tab":"\t","target":"\u2316","Tau":"\u03A4","tau":"\u03C4","tbrk":"\u23B4","Tcaron":"\u0164","tcaron":"\u0165","Tcedil":"\u0162","tcedil":"\u0163","Tcy":"\u0422","tcy":"\u0442","tdot":"\u20DB","telrec":"\u2315","Tfr":"\uD835\uDD17","tfr":"\uD835\uDD31","there4":"\u2234","therefore":"\u2234","Therefore":"\u2234","Theta":"\u0398","theta":"\u03B8","thetasym":"\u03D1","thetav":"\u03D1","thickapprox":"\u2248","thicksim":"\u223C","ThickSpace":"\u205F\u200A","ThinSpace":"\u2009","thinsp":"\u2009","thkap":"\u2248","thksim":"\u223C","THORN":"\u00DE","thorn":"\u00FE","tilde":"\u02DC","Tilde":"\u223C","TildeEqual":"\u2243","TildeFullEqual":"\u2245","TildeTilde":"\u2248","timesbar":"\u2A31","timesb":"\u22A0","times":"\u00D7","timesd":"\u2A30","tint":"\u222D","toea":"\u2928","topbot":"\u2336","topcir":"\u2AF1","top":"\u22A4","Topf":"\uD835\uDD4B","topf":"\uD835\uDD65","topfork":"\u2ADA","tosa":"\u2929","tprime":"\u2034","trade":"\u2122","TRADE":"\u2122","triangle":"\u25B5","triangledown":"\u25BF","triangleleft":"\u25C3","trianglelefteq":"\u22B4","triangleq":"\u225C","triangleright":"\u25B9","trianglerighteq":"\u22B5","tridot":"\u25EC","trie":"\u225C","triminus":"\u2A3A","TripleDot":"\u20DB","triplus":"\u2A39","trisb":"\u29CD","tritime":"\u2A3B","trpezium":"\u23E2","Tscr":"\uD835\uDCAF","tscr":"\uD835\uDCC9","TScy":"\u0426","tscy":"\u0446","TSHcy":"\u040B","tshcy":"\u045B","Tstrok":"\u0166","tstrok":"\u0167","twixt":"\u226C","twoheadleftarrow":"\u219E","twoheadrightarrow":"\u21A0","Uacute":"\u00DA","uacute":"\u00FA","uarr":"\u2191","Uarr":"\u219F","uArr":"\u21D1","Uarrocir":"\u2949","Ubrcy":"\u040E","ubrcy":"\u045E","Ubreve":"\u016C","ubreve":"\u016D","Ucirc":"\u00DB","ucirc":"\u00FB","Ucy":"\u0423","ucy":"\u0443","udarr":"\u21C5","Udblac":"\u0170","udblac":"\u0171","udhar":"\u296E","ufisht":"\u297E","Ufr":"\uD835\uDD18","ufr":"\uD835\uDD32","Ugrave":"\u00D9","ugrave":"\u00F9","uHar":"\u2963","uharl":"\u21BF","uharr":"\u21BE","uhblk":"\u2580","ulcorn":"\u231C","ulcorner":"\u231C","ulcrop":"\u230F","ultri":"\u25F8","Umacr":"\u016A","umacr":"\u016B","uml":"\u00A8","UnderBar":"_","UnderBrace":"\u23DF","UnderBracket":"\u23B5","UnderParenthesis":"\u23DD","Union":"\u22C3","UnionPlus":"\u228E","Uogon":"\u0172","uogon":"\u0173","Uopf":"\uD835\uDD4C","uopf":"\uD835\uDD66","UpArrowBar":"\u2912","uparrow":"\u2191","UpArrow":"\u2191","Uparrow":"\u21D1","UpArrowDownArrow":"\u21C5","updownarrow":"\u2195","UpDownArrow":"\u2195","Updownarrow":"\u21D5","UpEquilibrium":"\u296E","upharpoonleft":"\u21BF","upharpoonright":"\u21BE","uplus":"\u228E","UpperLeftArrow":"\u2196","UpperRightArrow":"\u2197","upsi":"\u03C5","Upsi":"\u03D2","upsih":"\u03D2","Upsilon":"\u03A5","upsilon":"\u03C5","UpTeeArrow":"\u21A5","UpTee":"\u22A5","upuparrows":"\u21C8","urcorn":"\u231D","urcorner":"\u231D","urcrop":"\u230E","Uring":"\u016E","uring":"\u016F","urtri":"\u25F9","Uscr":"\uD835\uDCB0","uscr":"\uD835\uDCCA","utdot":"\u22F0","Utilde":"\u0168","utilde":"\u0169","utri":"\u25B5","utrif":"\u25B4","uuarr":"\u21C8","Uuml":"\u00DC","uuml":"\u00FC","uwangle":"\u29A7","vangrt":"\u299C","varepsilon":"\u03F5","varkappa":"\u03F0","varnothing":"\u2205","varphi":"\u03D5","varpi":"\u03D6","varpropto":"\u221D","varr":"\u2195","vArr":"\u21D5","varrho":"\u03F1","varsigma":"\u03C2","varsubsetneq":"\u228A\uFE00","varsubsetneqq":"\u2ACB\uFE00","varsupsetneq":"\u228B\uFE00","varsupsetneqq":"\u2ACC\uFE00","vartheta":"\u03D1","vartriangleleft":"\u22B2","vartriangleright":"\u22B3","vBar":"\u2AE8","Vbar":"\u2AEB","vBarv":"\u2AE9","Vcy":"\u0412","vcy":"\u0432","vdash":"\u22A2","vDash":"\u22A8","Vdash":"\u22A9","VDash":"\u22AB","Vdashl":"\u2AE6","veebar":"\u22BB","vee":"\u2228","Vee":"\u22C1","veeeq":"\u225A","vellip":"\u22EE","verbar":"|","Verbar":"\u2016","vert":"|","Vert":"\u2016","VerticalBar":"\u2223","VerticalLine":"|","VerticalSeparator":"\u2758","VerticalTilde":"\u2240","VeryThinSpace":"\u200A","Vfr":"\uD835\uDD19","vfr":"\uD835\uDD33","vltri":"\u22B2","vnsub":"\u2282\u20D2","vnsup":"\u2283\u20D2","Vopf":"\uD835\uDD4D","vopf":"\uD835\uDD67","vprop":"\u221D","vrtri":"\u22B3","Vscr":"\uD835\uDCB1","vscr":"\uD835\uDCCB","vsubnE":"\u2ACB\uFE00","vsubne":"\u228A\uFE00","vsupnE":"\u2ACC\uFE00","vsupne":"\u228B\uFE00","Vvdash":"\u22AA","vzigzag":"\u299A","Wcirc":"\u0174","wcirc":"\u0175","wedbar":"\u2A5F","wedge":"\u2227","Wedge":"\u22C0","wedgeq":"\u2259","weierp":"\u2118","Wfr":"\uD835\uDD1A","wfr":"\uD835\uDD34","Wopf":"\uD835\uDD4E","wopf":"\uD835\uDD68","wp":"\u2118","wr":"\u2240","wreath":"\u2240","Wscr":"\uD835\uDCB2","wscr":"\uD835\uDCCC","xcap":"\u22C2","xcirc":"\u25EF","xcup":"\u22C3","xdtri":"\u25BD","Xfr":"\uD835\uDD1B","xfr":"\uD835\uDD35","xharr":"\u27F7","xhArr":"\u27FA","Xi":"\u039E","xi":"\u03BE","xlarr":"\u27F5","xlArr":"\u27F8","xmap":"\u27FC","xnis":"\u22FB","xodot":"\u2A00","Xopf":"\uD835\uDD4F","xopf":"\uD835\uDD69","xoplus":"\u2A01","xotime":"\u2A02","xrarr":"\u27F6","xrArr":"\u27F9","Xscr":"\uD835\uDCB3","xscr":"\uD835\uDCCD","xsqcup":"\u2A06","xuplus":"\u2A04","xutri":"\u25B3","xvee":"\u22C1","xwedge":"\u22C0","Yacute":"\u00DD","yacute":"\u00FD","YAcy":"\u042F","yacy":"\u044F","Ycirc":"\u0176","ycirc":"\u0177","Ycy":"\u042B","ycy":"\u044B","yen":"\u00A5","Yfr":"\uD835\uDD1C","yfr":"\uD835\uDD36","YIcy":"\u0407","yicy":"\u0457","Yopf":"\uD835\uDD50","yopf":"\uD835\uDD6A","Yscr":"\uD835\uDCB4","yscr":"\uD835\uDCCE","YUcy":"\u042E","yucy":"\u044E","yuml":"\u00FF","Yuml":"\u0178","Zacute":"\u0179","zacute":"\u017A","Zcaron":"\u017D","zcaron":"\u017E","Zcy":"\u0417","zcy":"\u0437","Zdot":"\u017B","zdot":"\u017C","zeetrf":"\u2128","ZeroWidthSpace":"\u200B","Zeta":"\u0396","zeta":"\u03B6","zfr":"\uD835\uDD37","Zfr":"\u2128","ZHcy":"\u0416","zhcy":"\u0436","zigrarr":"\u21DD","zopf":"\uD835\uDD6B","Zopf":"\u2124","Zscr":"\uD835\uDCB5","zscr":"\uD835\uDCCF","zwj":"\u200D","zwnj":"\u200C"};
},1187,[]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var entityMap = require(_dependencyMap[0]),
    legacyMap = require(_dependencyMap[1]),
    xmlMap = require(_dependencyMap[2]),
    decodeCodePoint = require(_dependencyMap[3]);
  var decodeXMLStrict = getStrictDecoder(xmlMap),
    decodeHTMLStrict = getStrictDecoder(entityMap);
  function getStrictDecoder(map) {
    var keys = Object.keys(map).join("|"),
      replace = getReplacer(map);
    keys += "|#[xX][\\da-fA-F]+|#\\d+";
    var re = new RegExp("&(?:" + keys + ");", "g");
    return function (str) {
      return String(str).replace(re, replace);
    };
  }
  var decodeHTML = function () {
    var legacy = Object.keys(legacyMap).sort(sorter);
    var keys = Object.keys(entityMap).sort(sorter);
    for (var i = 0, j = 0; i < keys.length; i++) {
      if (legacy[j] === keys[i]) {
        keys[i] += ";?";
        j++;
      } else {
        keys[i] += ";";
      }
    }
    var re = new RegExp("&(?:" + keys.join("|") + "|#[xX][\\da-fA-F]+;?|#\\d+;?)", "g"),
      replace = getReplacer(entityMap);
    function replacer(str) {
      if (str.substr(-1) !== ";") str += ";";
      return replace(str);
    }

    //TODO consider creating a merged map
    return function (str) {
      return String(str).replace(re, replacer);
    };
  }();
  function sorter(a, b) {
    return a < b ? 1 : -1;
  }
  function getReplacer(map) {
    return function replace(str) {
      if (str.charAt(1) === "#") {
        if (str.charAt(2) === "X" || str.charAt(2) === "x") {
          return decodeCodePoint(parseInt(str.substr(3), 16));
        }
        return decodeCodePoint(parseInt(str.substr(2), 10));
      }
      return map[str.slice(1, -1)];
    };
  }
  module.exports = {
    XML: decodeXMLStrict,
    HTML: decodeHTML,
    HTMLStrict: decodeHTMLStrict
  };
},1188,[1187,1189,1186,1190]);
__d(function(global, require, _importDefaultUnused, _importAllUnused, module, exports, _dependencyMapUnused) {
  module.exports = {"Aacute":"\u00C1","aacute":"\u00E1","Acirc":"\u00C2","acirc":"\u00E2","acute":"\u00B4","AElig":"\u00C6","aelig":"\u00E6","Agrave":"\u00C0","agrave":"\u00E0","amp":"&","AMP":"&","Aring":"\u00C5","aring":"\u00E5","Atilde":"\u00C3","atilde":"\u00E3","Auml":"\u00C4","auml":"\u00E4","brvbar":"\u00A6","Ccedil":"\u00C7","ccedil":"\u00E7","cedil":"\u00B8","cent":"\u00A2","copy":"\u00A9","COPY":"\u00A9","curren":"\u00A4","deg":"\u00B0","divide":"\u00F7","Eacute":"\u00C9","eacute":"\u00E9","Ecirc":"\u00CA","ecirc":"\u00EA","Egrave":"\u00C8","egrave":"\u00E8","ETH":"\u00D0","eth":"\u00F0","Euml":"\u00CB","euml":"\u00EB","frac12":"\u00BD","frac14":"\u00BC","frac34":"\u00BE","gt":">","GT":">","Iacute":"\u00CD","iacute":"\u00ED","Icirc":"\u00CE","icirc":"\u00EE","iexcl":"\u00A1","Igrave":"\u00CC","igrave":"\u00EC","iquest":"\u00BF","Iuml":"\u00CF","iuml":"\u00EF","laquo":"\u00AB","lt":"<","LT":"<","macr":"\u00AF","micro":"\u00B5","middot":"\u00B7","nbsp":"\u00A0","not":"\u00AC","Ntilde":"\u00D1","ntilde":"\u00F1","Oacute":"\u00D3","oacute":"\u00F3","Ocirc":"\u00D4","ocirc":"\u00F4","Ograve":"\u00D2","ograve":"\u00F2","ordf":"\u00AA","ordm":"\u00BA","Oslash":"\u00D8","oslash":"\u00F8","Otilde":"\u00D5","otilde":"\u00F5","Ouml":"\u00D6","ouml":"\u00F6","para":"\u00B6","plusmn":"\u00B1","pound":"\u00A3","quot":"\"","QUOT":"\"","raquo":"\u00BB","reg":"\u00AE","REG":"\u00AE","sect":"\u00A7","shy":"\u00AD","sup1":"\u00B9","sup2":"\u00B2","sup3":"\u00B3","szlig":"\u00DF","THORN":"\u00DE","thorn":"\u00FE","times":"\u00D7","Uacute":"\u00DA","uacute":"\u00FA","Ucirc":"\u00DB","ucirc":"\u00FB","Ugrave":"\u00D9","ugrave":"\u00F9","uml":"\u00A8","Uuml":"\u00DC","uuml":"\u00FC","Yacute":"\u00DD","yacute":"\u00FD","yen":"\u00A5","yuml":"\u00FF"};
},1189,[]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var decodeMap = require(_dependencyMap[0]);
  module.exports = decodeCodePoint;

  // modified version of https://github.com/mathiasbynens/he/blob/master/src/he.js#L94-L119
  function decodeCodePoint(codePoint) {
    if (codePoint >= 0xd800 && codePoint <= 0xdfff || codePoint > 0x10ffff) {
      return "\uFFFD";
    }
    if (codePoint in decodeMap) {
      codePoint = decodeMap[codePoint];
    }
    var output = "";
    if (codePoint > 0xffff) {
      codePoint -= 0x10000;
      output += String.fromCharCode(codePoint >>> 10 & 0x3ff | 0xd800);
      codePoint = 0xdc00 | codePoint & 0x3ff;
    }
    output += String.fromCharCode(codePoint);
    return output;
  }
},1190,[1191]);
__d(function(global, require, _importDefaultUnused, _importAllUnused, module, exports, _dependencyMapUnused) {
  module.exports = {"0":65533,"128":8364,"130":8218,"131":402,"132":8222,"133":8230,"134":8224,"135":8225,"136":710,"137":8240,"138":352,"139":8249,"140":338,"142":381,"145":8216,"146":8217,"147":8220,"148":8221,"149":8226,"150":8211,"151":8212,"152":732,"153":8482,"154":353,"155":8250,"156":339,"158":382,"159":376};
},1191,[]);
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
      return AutoSizedImage;
    }
  });
  var _react = require(_dependencyMap[0]);
  var _reactNativeWebDistExportsImage = require(_dependencyMap[1]);
  var Image = _interopDefault(_reactNativeWebDistExportsImage);
  var _reactNativeWebDistExportsDimensions = require(_dependencyMap[2]);
  var Dimensions = _interopDefault(_reactNativeWebDistExportsDimensions);
  var _reactJsxRuntime = require(_dependencyMap[3]);
  const {
    width
  } = Dimensions.default.get('window');
  const baseStyle = {
    backgroundColor: 'transparent'
  };
  class AutoSizedImage extends _react.PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        // set width 1 is for preventing the warning
        // You must specify a width and height for the image %s
        width: this.props.style.width || 1,
        height: this.props.style.height || 1
      };
    }
    componentDidMount() {
      //avoid repaint if width/height is given
      if (this.props.style.width || this.props.style.height) {
        return;
      }
      Image.default.getSize(this.props.source.uri, (w, h) => {
        this.setState({
          width: w,
          height: h
        });
      });
    }
    render() {
      const finalSize = {};
      if (this.state.width > width) {
        finalSize.width = width;
        const ratio = width / this.state.width;
        finalSize.height = this.state.height * ratio;
      }
      const style = Object.assign(baseStyle, this.props.style, this.state, finalSize);
      let source = {};
      if (!finalSize.width || !finalSize.height) {
        source = Object.assign(source, this.props.source, this.state);
      } else {
        source = Object.assign(source, this.props.source, finalSize);
      }
      return /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Image.default, {
        style: style,
        source: source
      });
    }
  }
},1192,[6,267,223,97]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  module.exports = {
    get ColorPropType() {
      return require(_dependencyMap[0]);
    },
    get EdgeInsetsPropType() {
      return require(_dependencyMap[1]);
    },
    get ImagePropTypes() {
      return require(_dependencyMap[2]);
    },
    get PointPropType() {
      return require(_dependencyMap[3]);
    },
    get TextInputPropTypes() {
      return require(_dependencyMap[4]);
    },
    get TextPropTypes() {
      return require(_dependencyMap[5]);
    },
    get ViewPropTypes() {
      return require(_dependencyMap[6]);
    }
  };
},1193,[1194,1196,1197,1208,1209,1210,1205]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  const normalizeColor = require(_dependencyMap[0]);
  const colorPropType = function (isRequired, props, propName, componentName, location, propFullName) {
    const color = props[propName];
    if (color == null) {
      if (isRequired) {
        return new Error('Required ' + location + ' `' + (propFullName || propName) + '` was not specified in `' + componentName + '`.');
      }
      return;
    }
    if (typeof color === 'number') {
      return;
    }
    if (typeof color === 'string' && normalizeColor(color) === null) {
      return new Error('Invalid ' + location + ' `' + (propFullName || propName) + '` supplied to `' + componentName + '`: ' + color + '\n' + `Valid color formats are
  - '#f0f' (#rgb)
  - '#f0fc' (#rgba)
  - '#ff00ff' (#rrggbb)
  - '#ff00ff00' (#rrggbbaa)
  - 'rgb(255, 255, 255)'
  - 'rgba(255, 255, 255, 1.0)'
  - 'hsl(360, 100%, 100%)'
  - 'hsla(360, 100%, 100%, 1.0)'
  - 'transparent'
  - 'red'
  - 0xff00ff00 (0xrrggbbaa)
`);
    }
  };
  const ColorPropType = colorPropType.bind(null, false);
  ColorPropType.isRequired = colorPropType.bind(null, true);
  module.exports = ColorPropType;
},1194,[1195]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  /**
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *
   * @format
   * 
   */

  /* eslint no-bitwise: 0 */

  'use strict';

  function normalizeColor(color) {
    if (typeof color === 'number') {
      if (color >>> 0 === color && color >= 0 && color <= 0xffffffff) {
        return color;
      }
      return null;
    }
    if (typeof color !== 'string') {
      return null;
    }
    const matchers = getMatchers();
    let match;

    // Ordered based on occurrences on Facebook codebase
    if (match = matchers.hex6.exec(color)) {
      return parseInt(match[1] + 'ff', 16) >>> 0;
    }
    const colorFromKeyword = normalizeKeyword(color);
    if (colorFromKeyword != null) {
      return colorFromKeyword;
    }
    if (match = matchers.rgb.exec(color)) {
      return (parse255(match[1]) << 24 |
      // r
      parse255(match[2]) << 16 |
      // g
      parse255(match[3]) << 8 |
      // b
      0x000000ff) >>>
      // a
      0;
    }
    if (match = matchers.rgba.exec(color)) {
      // rgba(R G B / A) notation
      if (match[6] !== undefined) {
        return (parse255(match[6]) << 24 |
        // r
        parse255(match[7]) << 16 |
        // g
        parse255(match[8]) << 8 |
        // b
        parse1(match[9])) >>>
        // a
        0;
      }

      // rgba(R, G, B, A) notation
      return (parse255(match[2]) << 24 |
      // r
      parse255(match[3]) << 16 |
      // g
      parse255(match[4]) << 8 |
      // b
      parse1(match[5])) >>>
      // a
      0;
    }
    if (match = matchers.hex3.exec(color)) {
      return parseInt(match[1] + match[1] +
      // r
      match[2] + match[2] +
      // g
      match[3] + match[3] +
      // b
      'ff',
      // a
      16) >>> 0;
    }

    // https://drafts.csswg.org/css-color-4/#hex-notation
    if (match = matchers.hex8.exec(color)) {
      return parseInt(match[1], 16) >>> 0;
    }
    if (match = matchers.hex4.exec(color)) {
      return parseInt(match[1] + match[1] +
      // r
      match[2] + match[2] +
      // g
      match[3] + match[3] +
      // b
      match[4] + match[4],
      // a
      16) >>> 0;
    }
    if (match = matchers.hsl.exec(color)) {
      return (hslToRgb(parse360(match[1]),
      // h
      parsePercentage(match[2]),
      // s
      parsePercentage(match[3]) // l
      ) | 0x000000ff) >>>
      // a
      0;
    }
    if (match = matchers.hsla.exec(color)) {
      // hsla(H S L / A) notation
      if (match[6] !== undefined) {
        return (hslToRgb(parse360(match[6]),
        // h
        parsePercentage(match[7]),
        // s
        parsePercentage(match[8]) // l
        ) | parse1(match[9])) >>>
        // a
        0;
      }

      // hsla(H, S, L, A) notation
      return (hslToRgb(parse360(match[2]),
      // h
      parsePercentage(match[3]),
      // s
      parsePercentage(match[4]) // l
      ) | parse1(match[5])) >>>
      // a
      0;
    }
    if (match = matchers.hwb.exec(color)) {
      return (hwbToRgb(parse360(match[1]),
      // h
      parsePercentage(match[2]),
      // w
      parsePercentage(match[3]) // b
      ) | 0x000000ff) >>>
      // a
      0;
    }
    return null;
  }
  function hue2rgb(p, q, t) {
    if (t < 0) {
      t += 1;
    }
    if (t > 1) {
      t -= 1;
    }
    if (t < 0.16666666666666666) {
      return p + (q - p) * 6 * t;
    }
    if (t < 0.5) {
      return q;
    }
    if (t < 0.6666666666666666) {
      return p + (q - p) * (0.6666666666666666 - t) * 6;
    }
    return p;
  }
  function hslToRgb(h, s, l) {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    const r = hue2rgb(p, q, h + 0.3333333333333333);
    const g = hue2rgb(p, q, h);
    const b = hue2rgb(p, q, h - 0.3333333333333333);
    return Math.round(r * 255) << 24 | Math.round(g * 255) << 16 | Math.round(b * 255) << 8;
  }
  function hwbToRgb(h, w, b) {
    if (w + b >= 1) {
      const gray = Math.round(w * 255 / (w + b));
      return gray << 24 | gray << 16 | gray << 8;
    }
    const red = hue2rgb(0, 1, h + 0.3333333333333333) * (1 - w - b) + w;
    const green = hue2rgb(0, 1, h) * (1 - w - b) + w;
    const blue = hue2rgb(0, 1, h - 0.3333333333333333) * (1 - w - b) + w;
    return Math.round(red * 255) << 24 | Math.round(green * 255) << 16 | Math.round(blue * 255) << 8;
  }
  const NUMBER = '[-+]?\\d*\\.?\\d+';
  const PERCENTAGE = "[-+]?\\d*\\.?\\d+%";
  function call(...args) {
    return '\\(\\s*(' + args.join(')\\s*,?\\s*(') + ')\\s*\\)';
  }
  function callWithSlashSeparator(...args) {
    return '\\(\\s*(' + args.slice(0, args.length - 1).join(')\\s*,?\\s*(') + ')\\s*/\\s*(' + args[args.length - 1] + ')\\s*\\)';
  }
  function commaSeparatedCall(...args) {
    return '\\(\\s*(' + args.join(')\\s*,\\s*(') + ')\\s*\\)';
  }
  let cachedMatchers;
  function getMatchers() {
    if (cachedMatchers === undefined) {
      cachedMatchers = {
        rgb: new RegExp('rgb' + call(NUMBER, NUMBER, NUMBER)),
        rgba: new RegExp('rgba(' + commaSeparatedCall(NUMBER, NUMBER, NUMBER, NUMBER) + '|' + callWithSlashSeparator(NUMBER, NUMBER, NUMBER, NUMBER) + ')'),
        hsl: new RegExp('hsl' + call(NUMBER, PERCENTAGE, PERCENTAGE)),
        hsla: new RegExp('hsla(' + commaSeparatedCall(NUMBER, PERCENTAGE, PERCENTAGE, NUMBER) + '|' + callWithSlashSeparator(NUMBER, PERCENTAGE, PERCENTAGE, NUMBER) + ')'),
        hwb: new RegExp('hwb' + call(NUMBER, PERCENTAGE, PERCENTAGE)),
        hex3: /^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
        hex4: /^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
        hex6: /^#([0-9a-fA-F]{6})$/,
        hex8: /^#([0-9a-fA-F]{8})$/
      };
    }
    return cachedMatchers;
  }
  function parse255(str) {
    const int = parseInt(str, 10);
    if (int < 0) {
      return 0;
    }
    if (int > 255) {
      return 255;
    }
    return int;
  }
  function parse360(str) {
    const int = parseFloat(str);
    return (int % 360 + 360) % 360 / 360;
  }
  function parse1(str) {
    const num = parseFloat(str);
    if (num < 0) {
      return 0;
    }
    if (num > 1) {
      return 255;
    }
    return Math.round(num * 255);
  }
  function parsePercentage(str) {
    // parseFloat conveniently ignores the final %
    const int = parseFloat(str);
    if (int < 0) {
      return 0;
    }
    if (int > 100) {
      return 1;
    }
    return int / 100;
  }
  function normalizeKeyword(name) {
    // prettier-ignore
    switch (name) {
      case 'transparent':
        return 0x00000000;
      // http://www.w3.org/TR/css3-color/#svg-color
      case 'aliceblue':
        return 0xf0f8ffff;
      case 'antiquewhite':
        return 0xfaebd7ff;
      case 'aqua':
        return 0x00ffffff;
      case 'aquamarine':
        return 0x7fffd4ff;
      case 'azure':
        return 0xf0ffffff;
      case 'beige':
        return 0xf5f5dcff;
      case 'bisque':
        return 0xffe4c4ff;
      case 'black':
        return 0x000000ff;
      case 'blanchedalmond':
        return 0xffebcdff;
      case 'blue':
        return 0x0000ffff;
      case 'blueviolet':
        return 0x8a2be2ff;
      case 'brown':
        return 0xa52a2aff;
      case 'burlywood':
        return 0xdeb887ff;
      case 'burntsienna':
        return 0xea7e5dff;
      case 'cadetblue':
        return 0x5f9ea0ff;
      case 'chartreuse':
        return 0x7fff00ff;
      case 'chocolate':
        return 0xd2691eff;
      case 'coral':
        return 0xff7f50ff;
      case 'cornflowerblue':
        return 0x6495edff;
      case 'cornsilk':
        return 0xfff8dcff;
      case 'crimson':
        return 0xdc143cff;
      case 'cyan':
        return 0x00ffffff;
      case 'darkblue':
        return 0x00008bff;
      case 'darkcyan':
        return 0x008b8bff;
      case 'darkgoldenrod':
        return 0xb8860bff;
      case 'darkgray':
        return 0xa9a9a9ff;
      case 'darkgreen':
        return 0x006400ff;
      case 'darkgrey':
        return 0xa9a9a9ff;
      case 'darkkhaki':
        return 0xbdb76bff;
      case 'darkmagenta':
        return 0x8b008bff;
      case 'darkolivegreen':
        return 0x556b2fff;
      case 'darkorange':
        return 0xff8c00ff;
      case 'darkorchid':
        return 0x9932ccff;
      case 'darkred':
        return 0x8b0000ff;
      case 'darksalmon':
        return 0xe9967aff;
      case 'darkseagreen':
        return 0x8fbc8fff;
      case 'darkslateblue':
        return 0x483d8bff;
      case 'darkslategray':
        return 0x2f4f4fff;
      case 'darkslategrey':
        return 0x2f4f4fff;
      case 'darkturquoise':
        return 0x00ced1ff;
      case 'darkviolet':
        return 0x9400d3ff;
      case 'deeppink':
        return 0xff1493ff;
      case 'deepskyblue':
        return 0x00bfffff;
      case 'dimgray':
        return 0x696969ff;
      case 'dimgrey':
        return 0x696969ff;
      case 'dodgerblue':
        return 0x1e90ffff;
      case 'firebrick':
        return 0xb22222ff;
      case 'floralwhite':
        return 0xfffaf0ff;
      case 'forestgreen':
        return 0x228b22ff;
      case 'fuchsia':
        return 0xff00ffff;
      case 'gainsboro':
        return 0xdcdcdcff;
      case 'ghostwhite':
        return 0xf8f8ffff;
      case 'gold':
        return 0xffd700ff;
      case 'goldenrod':
        return 0xdaa520ff;
      case 'gray':
        return 0x808080ff;
      case 'green':
        return 0x008000ff;
      case 'greenyellow':
        return 0xadff2fff;
      case 'grey':
        return 0x808080ff;
      case 'honeydew':
        return 0xf0fff0ff;
      case 'hotpink':
        return 0xff69b4ff;
      case 'indianred':
        return 0xcd5c5cff;
      case 'indigo':
        return 0x4b0082ff;
      case 'ivory':
        return 0xfffff0ff;
      case 'khaki':
        return 0xf0e68cff;
      case 'lavender':
        return 0xe6e6faff;
      case 'lavenderblush':
        return 0xfff0f5ff;
      case 'lawngreen':
        return 0x7cfc00ff;
      case 'lemonchiffon':
        return 0xfffacdff;
      case 'lightblue':
        return 0xadd8e6ff;
      case 'lightcoral':
        return 0xf08080ff;
      case 'lightcyan':
        return 0xe0ffffff;
      case 'lightgoldenrodyellow':
        return 0xfafad2ff;
      case 'lightgray':
        return 0xd3d3d3ff;
      case 'lightgreen':
        return 0x90ee90ff;
      case 'lightgrey':
        return 0xd3d3d3ff;
      case 'lightpink':
        return 0xffb6c1ff;
      case 'lightsalmon':
        return 0xffa07aff;
      case 'lightseagreen':
        return 0x20b2aaff;
      case 'lightskyblue':
        return 0x87cefaff;
      case 'lightslategray':
        return 0x778899ff;
      case 'lightslategrey':
        return 0x778899ff;
      case 'lightsteelblue':
        return 0xb0c4deff;
      case 'lightyellow':
        return 0xffffe0ff;
      case 'lime':
        return 0x00ff00ff;
      case 'limegreen':
        return 0x32cd32ff;
      case 'linen':
        return 0xfaf0e6ff;
      case 'magenta':
        return 0xff00ffff;
      case 'maroon':
        return 0x800000ff;
      case 'mediumaquamarine':
        return 0x66cdaaff;
      case 'mediumblue':
        return 0x0000cdff;
      case 'mediumorchid':
        return 0xba55d3ff;
      case 'mediumpurple':
        return 0x9370dbff;
      case 'mediumseagreen':
        return 0x3cb371ff;
      case 'mediumslateblue':
        return 0x7b68eeff;
      case 'mediumspringgreen':
        return 0x00fa9aff;
      case 'mediumturquoise':
        return 0x48d1ccff;
      case 'mediumvioletred':
        return 0xc71585ff;
      case 'midnightblue':
        return 0x191970ff;
      case 'mintcream':
        return 0xf5fffaff;
      case 'mistyrose':
        return 0xffe4e1ff;
      case 'moccasin':
        return 0xffe4b5ff;
      case 'navajowhite':
        return 0xffdeadff;
      case 'navy':
        return 0x000080ff;
      case 'oldlace':
        return 0xfdf5e6ff;
      case 'olive':
        return 0x808000ff;
      case 'olivedrab':
        return 0x6b8e23ff;
      case 'orange':
        return 0xffa500ff;
      case 'orangered':
        return 0xff4500ff;
      case 'orchid':
        return 0xda70d6ff;
      case 'palegoldenrod':
        return 0xeee8aaff;
      case 'palegreen':
        return 0x98fb98ff;
      case 'paleturquoise':
        return 0xafeeeeff;
      case 'palevioletred':
        return 0xdb7093ff;
      case 'papayawhip':
        return 0xffefd5ff;
      case 'peachpuff':
        return 0xffdab9ff;
      case 'peru':
        return 0xcd853fff;
      case 'pink':
        return 0xffc0cbff;
      case 'plum':
        return 0xdda0ddff;
      case 'powderblue':
        return 0xb0e0e6ff;
      case 'purple':
        return 0x800080ff;
      case 'rebeccapurple':
        return 0x663399ff;
      case 'red':
        return 0xff0000ff;
      case 'rosybrown':
        return 0xbc8f8fff;
      case 'royalblue':
        return 0x4169e1ff;
      case 'saddlebrown':
        return 0x8b4513ff;
      case 'salmon':
        return 0xfa8072ff;
      case 'sandybrown':
        return 0xf4a460ff;
      case 'seagreen':
        return 0x2e8b57ff;
      case 'seashell':
        return 0xfff5eeff;
      case 'sienna':
        return 0xa0522dff;
      case 'silver':
        return 0xc0c0c0ff;
      case 'skyblue':
        return 0x87ceebff;
      case 'slateblue':
        return 0x6a5acdff;
      case 'slategray':
        return 0x708090ff;
      case 'slategrey':
        return 0x708090ff;
      case 'snow':
        return 0xfffafaff;
      case 'springgreen':
        return 0x00ff7fff;
      case 'steelblue':
        return 0x4682b4ff;
      case 'tan':
        return 0xd2b48cff;
      case 'teal':
        return 0x008080ff;
      case 'thistle':
        return 0xd8bfd8ff;
      case 'tomato':
        return 0xff6347ff;
      case 'turquoise':
        return 0x40e0d0ff;
      case 'violet':
        return 0xee82eeff;
      case 'wheat':
        return 0xf5deb3ff;
      case 'white':
        return 0xffffffff;
      case 'whitesmoke':
        return 0xf5f5f5ff;
      case 'yellow':
        return 0xffff00ff;
      case 'yellowgreen':
        return 0x9acd32ff;
    }
    return null;
  }
  module.exports = normalizeColor;
},1195,[]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  const PropTypes = require(_dependencyMap[0]);
  const DeprecatedEdgeInsetsPropType = PropTypes.shape({
    bottom: PropTypes.number,
    left: PropTypes.number,
    right: PropTypes.number,
    top: PropTypes.number
  });
  module.exports = DeprecatedEdgeInsetsPropType;
},1196,[1145]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  const DeprecatedColorPropType = require(_dependencyMap[0]);
  const DeprecatedEdgeInsetsPropType = require(_dependencyMap[1]);
  const DeprecatedImageSourcePropType = require(_dependencyMap[2]);
  const DeprecatedImageStylePropTypes = require(_dependencyMap[3]);
  const DeprecatedStyleSheetPropType = require(_dependencyMap[4]);
  const DeprecatedViewPropTypes = require(_dependencyMap[5]);
  const PropTypes = require(_dependencyMap[6]);
  const DeprecatedImagePropType = {
    ...DeprecatedViewPropTypes,
    alt: PropTypes.string,
    blurRadius: PropTypes.number,
    capInsets: DeprecatedEdgeInsetsPropType,
    crossOrigin: PropTypes.oneOf(['anonymous', 'use-credentials']),
    defaultSource: DeprecatedImageSourcePropType,
    fadeDuration: PropTypes.number,
    height: PropTypes.number,
    internal_analyticTag: PropTypes.string,
    loadingIndicatorSource: PropTypes.oneOfType([PropTypes.shape({
      uri: PropTypes.string
    }), PropTypes.number]),
    onError: PropTypes.func,
    onLoad: PropTypes.func,
    onLoadEnd: PropTypes.func,
    onLoadStart: PropTypes.func,
    onPartialLoad: PropTypes.func,
    onProgress: PropTypes.func,
    progressiveRenderingEnabled: PropTypes.bool,
    referrerPolicy: PropTypes.oneOf(['no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', 'unsafe-url']),
    resizeMethod: PropTypes.oneOf(['auto', 'resize', 'scale']),
    resizeMode: PropTypes.oneOf(['cover', 'contain', 'stretch', 'repeat', 'center']),
    source: DeprecatedImageSourcePropType,
    src: PropTypes.string,
    srcSet: PropTypes.string,
    style: DeprecatedStyleSheetPropType(DeprecatedImageStylePropTypes),
    testID: PropTypes.string,
    tintColor: DeprecatedColorPropType,
    width: PropTypes.number
  };
  module.exports = DeprecatedImagePropType;
},1197,[1194,1196,1198,1199,1203,1205,1145]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  const PropTypes = require(_dependencyMap[0]);
  const ImageURISourcePropType = PropTypes.shape({
    body: PropTypes.string,
    bundle: PropTypes.string,
    cache: PropTypes.oneOf(['default', 'force-cache', 'only-if-cached', 'reload']),
    headers: PropTypes.objectOf(PropTypes.string),
    height: PropTypes.number,
    method: PropTypes.string,
    scale: PropTypes.number,
    uri: PropTypes.string,
    width: PropTypes.number
  });
  const ImageSourcePropType = PropTypes.oneOfType([ImageURISourcePropType, PropTypes.number, PropTypes.arrayOf(ImageURISourcePropType)]);
  module.exports = ImageSourcePropType;
},1198,[1145]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  const DeprecatedColorPropType = require(_dependencyMap[0]);
  const DeprecatedLayoutPropTypes = require(_dependencyMap[1]);
  const DeprecatedShadowPropTypesIOS = require(_dependencyMap[2]);
  const DeprecatedTransformPropTypes = require(_dependencyMap[3]);
  const PropTypes = require(_dependencyMap[4]);
  const DeprecatedImageStylePropTypes = {
    ...DeprecatedLayoutPropTypes,
    ...DeprecatedShadowPropTypesIOS,
    ...DeprecatedTransformPropTypes,
    backfaceVisibility: PropTypes.oneOf(['hidden', 'visible']),
    backgroundColor: DeprecatedColorPropType,
    borderBottomLeftRadius: PropTypes.number,
    borderBottomRightRadius: PropTypes.number,
    borderColor: DeprecatedColorPropType,
    borderRadius: PropTypes.number,
    borderTopLeftRadius: PropTypes.number,
    borderTopRightRadius: PropTypes.number,
    borderWidth: PropTypes.number,
    objectFit: PropTypes.oneOf(['contain', 'cover', 'fill', 'scale-down']),
    opacity: PropTypes.number,
    overflow: PropTypes.oneOf(['hidden', 'visible']),
    overlayColor: PropTypes.string,
    tintColor: DeprecatedColorPropType,
    resizeMode: PropTypes.oneOf(['center', 'contain', 'cover', 'repeat', 'stretch'])
  };
  module.exports = DeprecatedImageStylePropTypes;
},1199,[1194,1200,1201,1202,1145]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  const PropTypes = require(_dependencyMap[0]);
  const DimensionValuePropType = PropTypes.oneOfType([PropTypes.number, PropTypes.string]);
  const DeprecatedLayoutPropTypes = {
    alignContent: PropTypes.oneOf(['center', 'flex-end', 'flex-start', 'space-around', 'space-between', 'stretch']),
    alignItems: PropTypes.oneOf(['baseline', 'center', 'flex-end', 'flex-start', 'stretch']),
    alignSelf: PropTypes.oneOf(['auto', 'baseline', 'center', 'flex-end', 'flex-start', 'stretch']),
    aspectRatio: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    borderBottomWidth: PropTypes.number,
    borderEndWidth: PropTypes.number,
    borderLeftWidth: PropTypes.number,
    borderRightWidth: PropTypes.number,
    borderStartWidth: PropTypes.number,
    borderTopWidth: PropTypes.number,
    borderWidth: PropTypes.number,
    bottom: DimensionValuePropType,
    columnGap: PropTypes.number,
    direction: PropTypes.oneOf(['inherit', 'ltr', 'rtl']),
    display: PropTypes.oneOf(['flex', 'none']),
    end: DimensionValuePropType,
    flex: PropTypes.number,
    flexBasis: DimensionValuePropType,
    flexDirection: PropTypes.oneOf(['column', 'column-reverse', 'row', 'row-reverse']),
    flexGrow: PropTypes.number,
    flexShrink: PropTypes.number,
    flexWrap: PropTypes.oneOf(['nowrap', 'wrap', 'wrap-reverse']),
    gap: PropTypes.number,
    height: DimensionValuePropType,
    inset: DimensionValuePropType,
    insetBlock: DimensionValuePropType,
    insetBlockEnd: DimensionValuePropType,
    insetBlockStart: DimensionValuePropType,
    insetInline: DimensionValuePropType,
    insetInlineEnd: DimensionValuePropType,
    insetInlineStart: DimensionValuePropType,
    justifyContent: PropTypes.oneOf(['center', 'flex-end', 'flex-start', 'space-around', 'space-between', 'space-evenly']),
    left: DimensionValuePropType,
    margin: DimensionValuePropType,
    marginBlock: DimensionValuePropType,
    marginBlockEnd: DimensionValuePropType,
    marginBlockStart: DimensionValuePropType,
    marginBottom: DimensionValuePropType,
    marginEnd: DimensionValuePropType,
    marginHorizontal: DimensionValuePropType,
    marginInline: DimensionValuePropType,
    marginInlineEnd: DimensionValuePropType,
    marginInlineStart: DimensionValuePropType,
    marginLeft: DimensionValuePropType,
    marginRight: DimensionValuePropType,
    marginStart: DimensionValuePropType,
    marginTop: DimensionValuePropType,
    marginVertical: DimensionValuePropType,
    maxHeight: DimensionValuePropType,
    maxWidth: DimensionValuePropType,
    minHeight: DimensionValuePropType,
    minWidth: DimensionValuePropType,
    overflow: PropTypes.oneOf(['hidden', 'scroll', 'visible']),
    padding: DimensionValuePropType,
    paddingBlock: DimensionValuePropType,
    paddingBlockEnd: DimensionValuePropType,
    paddingBlockStart: DimensionValuePropType,
    paddingBottom: DimensionValuePropType,
    paddingEnd: DimensionValuePropType,
    paddingHorizontal: DimensionValuePropType,
    paddingInline: DimensionValuePropType,
    paddingInlineEnd: DimensionValuePropType,
    paddingInlineStart: DimensionValuePropType,
    paddingLeft: DimensionValuePropType,
    paddingRight: DimensionValuePropType,
    paddingStart: DimensionValuePropType,
    paddingTop: DimensionValuePropType,
    paddingVertical: DimensionValuePropType,
    position: PropTypes.oneOf(['absolute', 'relative']),
    right: DimensionValuePropType,
    rowGap: PropTypes.number,
    start: DimensionValuePropType,
    top: DimensionValuePropType,
    width: DimensionValuePropType,
    zIndex: PropTypes.number
  };
  module.exports = DeprecatedLayoutPropTypes;
},1200,[1145]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  const DeprecatedColorPropType = require(_dependencyMap[0]);
  const PropTypes = require(_dependencyMap[1]);
  const DeprecatedShadowPropTypesIOS = {
    shadowColor: DeprecatedColorPropType,
    shadowOffset: PropTypes.shape({
      height: PropTypes.number,
      width: PropTypes.number
    }),
    shadowOpacity: PropTypes.number,
    shadowRadius: PropTypes.number
  };
  module.exports = DeprecatedShadowPropTypesIOS;
},1201,[1194,1145]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  const PropTypes = require(_dependencyMap[0]);
  const DeprecatedTransformPropTypes = {
    transform: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.shape({
      perspective: PropTypes.number
    }), PropTypes.shape({
      rotate: PropTypes.string
    }), PropTypes.shape({
      rotateX: PropTypes.string
    }), PropTypes.shape({
      rotateY: PropTypes.string
    }), PropTypes.shape({
      rotateZ: PropTypes.string
    }), PropTypes.shape({
      scale: PropTypes.number
    }), PropTypes.shape({
      scaleX: PropTypes.number
    }), PropTypes.shape({
      scaleY: PropTypes.number
    }), PropTypes.shape({
      skewX: PropTypes.string
    }), PropTypes.shape({
      skewY: PropTypes.string
    }), PropTypes.shape({
      translateX: PropTypes.number
    }), PropTypes.shape({
      translateY: PropTypes.number
    })]))
  };
  module.exports = DeprecatedTransformPropTypes;
},1202,[1145]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  const deprecatedCreateStrictShapeTypeChecker = require(_dependencyMap[0]);
  function DeprecatedStyleSheetPropType(shape) {
    const shapePropType = deprecatedCreateStrictShapeTypeChecker(shape);
    return function (props, propName, componentName, location, ...rest) {
      let newProps = props;
      if (props[propName]) {
        newProps = {};
        newProps[propName] = flattenStyle(props[propName]);
      }
      return shapePropType(newProps, propName, componentName, location, ...rest);
    };
  }
  function flattenStyle(style) {
    if (style === null || typeof style !== 'object') {
      return undefined;
    }
    if (!Array.isArray(style)) {
      return style;
    }
    const result = {};
    for (let i = 0, styleLength = style.length; i < styleLength; ++i) {
      const computedStyle = flattenStyle(style[i]);
      if (computedStyle) {
        for (const key in computedStyle) {
          result[key] = computedStyle[key];
        }
      }
    }
    return result;
  }
  module.exports = DeprecatedStyleSheetPropType;
},1203,[1204]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  const invariant = require(_dependencyMap[0]);
  function deprecatedCreateStrictShapeTypeChecker(shapeTypes) {
    function checkType(isRequired, props, propName, componentName, location, ...rest) {
      if (!props[propName]) {
        if (isRequired) {
          invariant(false, `Required object \`${propName}\` was not specified in ` + `\`${componentName}\`.`);
        }
        return;
      }
      const propValue = props[propName];
      const propType = typeof propValue;
      const locationName = location || '(unknown)';
      if (propType !== 'object') {
        invariant(false, `Invalid ${locationName} \`${propName}\` of type \`${propType}\` ` + `supplied to \`${componentName}\`, expected \`object\`.`);
      }
      const allKeys = {
        ...props[propName],
        ...shapeTypes
      };
      for (const key in allKeys) {
        const checker = shapeTypes[key];
        if (!checker) {
          invariant(false, `Invalid props.${propName} key \`${key}\` supplied to \`${componentName}\`.` + '\nBad object: ' + JSON.stringify(props[propName], null, '  ') + '\nValid keys: ' + JSON.stringify(Object.keys(shapeTypes), null, '  '));
        }
        const error = checker(propValue, key, componentName, location, ...rest);
        if (error) {
          invariant(false, error.message + '\nBad object: ' + JSON.stringify(props[propName], null, '  '));
        }
      }
    }
    function chainedCheckType(props, propName, componentName, location, ...rest) {
      return checkType(false, props, propName, componentName, location, ...rest);
    }
    chainedCheckType.isRequired = checkType.bind(null, true);
    return chainedCheckType;
  }
  module.exports = deprecatedCreateStrictShapeTypeChecker;
},1204,[407]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  const DeprecatedEdgeInsetsPropType = require(_dependencyMap[0]);
  const DeprecatedStyleSheetPropType = require(_dependencyMap[1]);
  const {
    AccessibilityActionInfoPropType,
    AccessibilityRolePropType,
    AccessibilityStatePropType,
    AccessibilityValuePropType,
    RolePropType
  } = require(_dependencyMap[2]);
  const DeprecatedViewStylePropTypes = require(_dependencyMap[3]);
  const PropTypes = require(_dependencyMap[4]);
  const MouseEventPropTypes = {
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func
  };
  const PointerEventPropTypes = {
    onPointerEnter: PropTypes.func,
    onPointerEnterCapture: PropTypes.func,
    onPointerLeave: PropTypes.func,
    onPointerLeaveCapture: PropTypes.func,
    onPointerMove: PropTypes.func,
    onPointerMoveCapture: PropTypes.func,
    onPointerCancel: PropTypes.func,
    onPointerCancelCapture: PropTypes.func,
    onPointerDown: PropTypes.func,
    onPointerDownCapture: PropTypes.func,
    onPointerUp: PropTypes.func,
    onPointerUpCapture: PropTypes.func,
    onPointerOver: PropTypes.func,
    onPointerOverCapture: PropTypes.func,
    onPointerOut: PropTypes.func,
    onPointerOutCapture: PropTypes.func
  };
  const FocusEventPropTypes = {
    onBlur: PropTypes.func,
    onBlurCapture: PropTypes.func,
    onFocus: PropTypes.func,
    onFocusCapture: PropTypes.func
  };
  const TouchEventPropTypes = {
    onTouchCancel: PropTypes.func,
    onTouchCancelCapture: PropTypes.func,
    onTouchEnd: PropTypes.func,
    onTouchEndCapture: PropTypes.func,
    onTouchMove: PropTypes.func,
    onTouchMoveCapture: PropTypes.func,
    onTouchStart: PropTypes.func,
    onTouchStartCapture: PropTypes.func
  };
  const GestureResponderEventPropTypes = {
    onMoveShouldSetResponder: PropTypes.func,
    onMoveShouldSetResponderCapture: PropTypes.func,
    onResponderEnd: PropTypes.func,
    onResponderGrant: PropTypes.func,
    onResponderMove: PropTypes.func,
    onResponderReject: PropTypes.func,
    onResponderRelease: PropTypes.func,
    onResponderStart: PropTypes.func,
    onResponderTerminate: PropTypes.func,
    onResponderTerminationRequest: PropTypes.func,
    onStartShouldSetResponder: PropTypes.func,
    onStartShouldSetResponderCapture: PropTypes.func
  };
  const DeprecatedViewPropTypes = {
    ...MouseEventPropTypes,
    ...PointerEventPropTypes,
    ...FocusEventPropTypes,
    ...TouchEventPropTypes,
    ...GestureResponderEventPropTypes,
    'aria-busy': PropTypes.bool,
    'aria-checked': PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['mixed'])]),
    'aria-disabled': PropTypes.bool,
    'aria-expanded': PropTypes.bool,
    'aria-hidden': PropTypes.bool,
    'aria-label': PropTypes.string,
    'aria-labelledby': PropTypes.string,
    'aria-live': PropTypes.oneOf(['polite', 'assertive', 'off']),
    'aria-modal': PropTypes.bool,
    'aria-selected': PropTypes.bool,
    'aria-valuemax': PropTypes.number,
    'aria-valuemin': PropTypes.number,
    'aria-valuenow': PropTypes.number,
    'aria-valuetext': PropTypes.string,
    accessibilityActions: PropTypes.arrayOf(AccessibilityActionInfoPropType),
    accessibilityElementsHidden: PropTypes.bool,
    accessibilityHint: PropTypes.string,
    accessibilityIgnoresInvertColors: PropTypes.bool,
    accessibilityLabel: PropTypes.node,
    accessibilityLabelledBy: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
    accessibilityLanguage: PropTypes.string,
    accessibilityLiveRegion: PropTypes.oneOf(['assertive', 'none', 'polite']),
    accessibilityRole: AccessibilityRolePropType,
    accessibilityState: AccessibilityStatePropType,
    accessibilityValue: AccessibilityValuePropType,
    accessibilityViewIsModal: PropTypes.bool,
    accessible: PropTypes.bool,
    collapsable: PropTypes.bool,
    focusable: PropTypes.bool,
    hitSlop: PropTypes.oneOfType([DeprecatedEdgeInsetsPropType, PropTypes.number]),
    importantForAccessibility: PropTypes.oneOf(['auto', 'no', 'no-hide-descendants', 'yes']),
    nativeBackgroundAndroid: PropTypes.object,
    nativeForegroundAndroid: PropTypes.object,
    nativeID: PropTypes.string,
    needsOffscreenAlphaCompositing: PropTypes.bool,
    onAccessibilityAction: PropTypes.func,
    onAccessibilityEscape: PropTypes.func,
    onAccessibilityTap: PropTypes.func,
    onClick: PropTypes.func,
    onLayout: PropTypes.func,
    onMagicTap: PropTypes.func,
    pointerEvents: PropTypes.oneOf(['auto', 'box-none', 'box-only', 'none']),
    removeClippedSubviews: PropTypes.bool,
    renderToHardwareTextureAndroid: PropTypes.bool,
    role: RolePropType,
    shouldRasterizeIOS: PropTypes.bool,
    style: DeprecatedStyleSheetPropType(DeprecatedViewStylePropTypes),
    tabIndex: PropTypes.oneOf([0, -1]),
    testID: PropTypes.string
  };
  module.exports = DeprecatedViewPropTypes;
},1205,[1196,1203,1206,1207,1145]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  const PropTypes = require(_dependencyMap[0]);
  const DeprecatedViewAccessibility = {
    AccessibilityRolePropType: PropTypes.oneOf(['adjustable', 'alert', 'button', 'checkbox', 'combobox', 'drawerlayout', 'dropdownlist', 'grid', 'header', 'horizontalscrollview', 'iconmenu', 'image', 'imagebutton', 'keyboardkey', 'link', 'list', 'menu', 'menubar', 'menuitem', 'none', 'pager', 'progressbar', 'radio', 'radiogroup', 'scrollbar', 'scrollview', 'search', 'slidingdrawer', 'spinbutton', 'summary', 'switch', 'tab', 'tabbar', 'tablist', 'text', 'timer', 'togglebutton', 'toolbar', 'viewgroup', 'webview']),
    AccessibilityStatePropType: PropTypes.object,
    AccessibilityActionInfoPropType: PropTypes.object,
    AccessibilityValuePropType: PropTypes.object,
    RolePropType: PropTypes.oneOf(['alert', 'alertdialog', 'application', 'article', 'banner', 'button', 'cell', 'checkbox', 'columnheader', 'combobox', 'complementary', 'contentinfo', 'definition', 'dialog', 'directory', 'document', 'feed', 'figure', 'form', 'grid', 'group', 'heading', 'img', 'link', 'list', 'listitem', 'log', 'main', 'marquee', 'math', 'menu', 'menubar', 'menuitem', 'meter', 'navigation', 'none', 'note', 'option', 'presentation', 'progressbar', 'radio', 'radiogroup', 'region', 'row', 'rowgroup', 'rowheader', 'scrollbar', 'searchbox', 'separator', 'slider', 'spinbutton', 'status', 'summary', 'switch', 'tab', 'table', 'tablist', 'tabpanel', 'term', 'timer', 'toolbar', 'tooltip', 'tree', 'treegrid', 'treeitem'])
  };
  module.exports = DeprecatedViewAccessibility;
},1206,[1145]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  const DeprecatedColorPropType = require(_dependencyMap[0]);
  const DeprecatedLayoutPropTypes = require(_dependencyMap[1]);
  const DeprecatedShadowPropTypesIOS = require(_dependencyMap[2]);
  const DeprecatedTransformPropTypes = require(_dependencyMap[3]);
  const PropTypes = require(_dependencyMap[4]);
  const DeprecatedViewStylePropTypes = {
    ...DeprecatedLayoutPropTypes,
    ...DeprecatedShadowPropTypesIOS,
    ...DeprecatedTransformPropTypes,
    backfaceVisibility: PropTypes.oneOf(['hidden', 'visible']),
    backgroundColor: DeprecatedColorPropType,
    borderBottomColor: DeprecatedColorPropType,
    borderBottomEndRadius: PropTypes.number,
    borderBottomLeftRadius: PropTypes.number,
    borderBottomRightRadius: PropTypes.number,
    borderBottomStartRadius: PropTypes.number,
    borderBottomWidth: PropTypes.number,
    borderColor: DeprecatedColorPropType,
    borderCurve: PropTypes.oneOf(['circular', 'continuous']),
    borderEndColor: DeprecatedColorPropType,
    borderEndEndRadius: PropTypes.number,
    borderEndStartRadius: PropTypes.number,
    borderLeftColor: DeprecatedColorPropType,
    borderLeftWidth: PropTypes.number,
    borderRadius: PropTypes.number,
    borderRightColor: DeprecatedColorPropType,
    borderRightWidth: PropTypes.number,
    borderStartColor: DeprecatedColorPropType,
    borderStartEndRadius: PropTypes.number,
    borderStartStartRadius: PropTypes.number,
    borderStyle: PropTypes.oneOf(['dashed', 'dotted', 'solid']),
    borderTopColor: DeprecatedColorPropType,
    borderTopEndRadius: PropTypes.number,
    borderTopLeftRadius: PropTypes.number,
    borderTopRightRadius: PropTypes.number,
    borderTopStartRadius: PropTypes.number,
    borderTopWidth: PropTypes.number,
    borderWidth: PropTypes.number,
    elevation: PropTypes.number,
    opacity: PropTypes.number,
    pointerEvents: PropTypes.oneOf(['auto', 'box-none', 'box-only', 'none'])
  };
  module.exports = DeprecatedViewStylePropTypes;
},1207,[1194,1200,1201,1202,1145]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  const PropTypes = require(_dependencyMap[0]);
  const PointPropType = PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number
  });
  module.exports = PointPropType;
},1208,[1145]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  const DeprecatedColorPropType = require(_dependencyMap[0]);
  const DeprecatedTextPropTypes = require(_dependencyMap[1]);
  const DeprecatedViewPropTypes = require(_dependencyMap[2]);
  const PropTypes = require(_dependencyMap[3]);
  const DataDetectorTypes = ['address', 'all', 'calendarEvent', 'link', 'none', 'phoneNumber'];
  const DeprecatedTextInputPropTypes = {
    ...DeprecatedViewPropTypes,
    allowFontScaling: PropTypes.bool,
    autoCapitalize: PropTypes.oneOf(['none', 'sentences', 'words', 'characters']),
    autoComplete: PropTypes.oneOf(['additional-name', 'address-line1', 'address-line2', 'bday', 'bday-day', 'bday-month', 'bday-year', 'birthdate-day', 'birthdate-full', 'birthdate-month', 'birthdate-year', 'cc-csc', 'cc-exp', 'cc-exp-day', 'cc-exp-month', 'cc-exp-year', 'cc-family-name', 'cc-given-name', 'cc-middle-name', 'cc-name', 'cc-number', 'cc-type', 'country', 'current-password', 'email', 'family-name', 'gender', 'given-name', 'honorific-prefix', 'honorific-suffix', 'name', 'name-family', 'name-given', 'name-middle', 'name-middle-initial', 'name-prefix', 'name-suffix', 'new-password', 'nickname', 'off', 'one-time-code', 'organization', 'organization-title', 'password', 'password-new', 'postal-address', 'postal-address-country', 'postal-address-extended', 'postal-address-extended-postal-code', 'postal-address-locality', 'postal-address-region', 'postal-code', 'sex', 'sms-otp', 'street-address', 'tel', 'tel-country-code', 'tel-device', 'tel-national', 'url', 'username', 'username-new']),
    autoCorrect: PropTypes.bool,
    autoFocus: PropTypes.bool,
    blurOnSubmit: PropTypes.bool,
    caretHidden: PropTypes.bool,
    clearButtonMode: PropTypes.oneOf(['always', 'never', 'unless-editing', 'while-editing']),
    clearTextOnFocus: PropTypes.bool,
    cursorColor: DeprecatedColorPropType,
    contextMenuHidden: PropTypes.bool,
    dataDetectorTypes: PropTypes.oneOfType([PropTypes.oneOf(DataDetectorTypes), PropTypes.arrayOf(PropTypes.oneOf(DataDetectorTypes))]),
    defaultValue: PropTypes.string,
    disableFullscreenUI: PropTypes.bool,
    editable: PropTypes.bool,
    enablesReturnKeyAutomatically: PropTypes.bool,
    enterKeyHint: PropTypes.oneOf(['done', 'enter', 'go', 'next', 'previous', 'search', 'send']),
    inlineImageLeft: PropTypes.string,
    inlineImagePadding: PropTypes.number,
    inputAccessoryViewID: PropTypes.string,
    inputMode: PropTypes.oneOf(['decimal', 'email', 'none', 'numeric', 'search', 'tel', 'text', 'url']),
    keyboardAppearance: PropTypes.oneOf(['default', 'dark', 'light']),
    keyboardType: PropTypes.oneOf(['ascii-capable', 'ascii-capable-number-pad', 'decimal-pad', 'default', 'email-address', 'name-phone-pad', 'number-pad', 'numbers-and-punctuation', 'numeric', 'phone-pad', 'twitter', 'url', 'visible-password', 'web-search']),
    lineBreakStrategyIOS: PropTypes.oneOf(['hangul-word', 'none', 'push-out', 'standard']),
    maxFontSizeMultiplier: PropTypes.number,
    maxLength: PropTypes.number,
    multiline: PropTypes.bool,
    numberOfLines: PropTypes.number,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onChangeText: PropTypes.func,
    onContentSizeChange: PropTypes.func,
    onEndEditing: PropTypes.func,
    onFocus: PropTypes.func,
    onKeyPress: PropTypes.func,
    onLayout: PropTypes.func,
    onScroll: PropTypes.func,
    onSelectionChange: PropTypes.func,
    onSubmitEditing: PropTypes.func,
    onTextInput: PropTypes.func,
    placeholder: PropTypes.string,
    placeholderTextColor: DeprecatedColorPropType,
    readOnly: PropTypes.bool,
    rejectResponderTermination: PropTypes.bool,
    returnKeyLabel: PropTypes.string,
    returnKeyType: PropTypes.oneOf(['default', 'done', 'emergency-call', 'go', 'google', 'join', 'next', 'none', 'previous', 'route', 'search', 'send', 'yahoo']),
    rows: PropTypes.number,
    scrollEnabled: PropTypes.bool,
    secureTextEntry: PropTypes.bool,
    selection: PropTypes.shape({
      end: PropTypes.number,
      start: PropTypes.number.isRequired
    }),
    selectionColor: DeprecatedColorPropType,
    selectTextOnFocus: PropTypes.bool,
    showSoftInputOnFocus: PropTypes.bool,
    spellCheck: PropTypes.bool,
    style: DeprecatedTextPropTypes.style,
    submitBehavior: PropTypes.oneOf(['blurAndSubmit', 'newline', 'submit']),
    textBreakStrategy: PropTypes.oneOf(['balanced', 'highQuality', 'simple']),
    textContentType: PropTypes.oneOf(['addressCity', 'addressCityAndState', 'addressState', 'birthdate', 'birthdateDay', 'birthdateMonth', 'birthdateYear', 'countryName', 'creditCardExpiration', 'creditCardExpirationMonth', 'creditCardExpirationYear', 'creditCardFamilyName', 'creditCardGivenName', 'creditCardMiddleName', 'creditCardName', 'creditCardNumber', 'creditCardSecurityCode', 'creditCardType', 'emailAddress', 'familyName', 'fullStreetAddress', 'givenName', 'jobTitle', 'location', 'middleName', 'name', 'namePrefix', 'nameSuffix', 'newPassword', 'nickname', 'none', 'oneTimeCode', 'organizationName', 'password', 'postalCode', 'streetAddressLine1', 'streetAddressLine2', 'sublocality', 'telephoneNumber', 'URL', 'username']),
    underlineColorAndroid: DeprecatedColorPropType,
    value: PropTypes.string
  };
  module.exports = DeprecatedTextInputPropTypes;
},1209,[1194,1210,1205,1145]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  const DeprecatedColorPropType = require(_dependencyMap[0]);
  const DeprecatedEdgeInsetsPropType = require(_dependencyMap[1]);
  const DeprecatedStyleSheetPropType = require(_dependencyMap[2]);
  const DeprecatedTextStylePropTypes = require(_dependencyMap[3]);
  const {
    AccessibilityActionInfoPropType,
    AccessibilityRolePropType,
    AccessibilityStatePropType,
    AccessibilityValuePropType,
    RolePropType
  } = require(_dependencyMap[4]);
  const PropTypes = require(_dependencyMap[5]);
  const DeprecatedTextPropTypes = {
    'aria-busy': PropTypes.bool,
    'aria-checked': PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['mixed'])]),
    'aria-disabled': PropTypes.bool,
    'aria-expanded': PropTypes.bool,
    'aria-label': PropTypes.string,
    'aria-labelledby': PropTypes.string,
    'aria-selected': PropTypes.bool,
    accessibilityActions: PropTypes.arrayOf(AccessibilityActionInfoPropType),
    accessibilityHint: PropTypes.string,
    accessibilityLabel: PropTypes.string,
    accessibilityLanguage: PropTypes.string,
    accessibilityRole: AccessibilityRolePropType,
    accessibilityState: AccessibilityStatePropType,
    accessible: PropTypes.bool,
    adjustsFontSizeToFit: PropTypes.bool,
    allowFontScaling: PropTypes.bool,
    dataDetectorType: PropTypes.oneOf(['all', 'email', 'link', 'none', 'phoneNumber']),
    disabled: PropTypes.bool,
    dynamicTypeRamp: PropTypes.oneOf(['body', 'callout', 'caption1', 'caption2', 'footnote', 'headline', 'largeTitle', 'subheadline', 'title1', 'title2', 'title3']),
    ellipsizeMode: PropTypes.oneOf(['clip', 'head', 'middle', 'tail']),
    id: PropTypes.string,
    lineBreakStrategyIOS: PropTypes.oneOf(['hangul-word', 'none', 'push-out', 'standard']),
    maxFontSizeMultiplier: PropTypes.number,
    minimumFontScale: PropTypes.number,
    nativeID: PropTypes.string,
    numberOfLines: PropTypes.number,
    onAccessibilityAction: PropTypes.func,
    onLayout: PropTypes.func,
    onLongPress: PropTypes.func,
    onMoveShouldSetResponder: PropTypes.func,
    onPress: PropTypes.func,
    onPressIn: PropTypes.func,
    onPressOut: PropTypes.func,
    onResponderGrant: PropTypes.func,
    onResponderMove: PropTypes.func,
    onResponderRelease: PropTypes.func,
    onResponderTerminate: PropTypes.func,
    onResponderTerminationRequest: PropTypes.func,
    onStartShouldSetResponder: PropTypes.func,
    onTextLayout: PropTypes.func,
    pressRetentionOffset: DeprecatedEdgeInsetsPropType,
    role: RolePropType,
    selectable: PropTypes.bool,
    selectionColor: DeprecatedColorPropType,
    style: DeprecatedStyleSheetPropType(DeprecatedTextStylePropTypes),
    suppressHighlighting: PropTypes.bool,
    testID: PropTypes.string,
    textBreakStrategy: PropTypes.oneOf(['balanced', 'highQuality', 'simple'])
  };
  module.exports = DeprecatedTextPropTypes;
},1210,[1194,1196,1203,1211,1206,1145]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  const DeprecatedColorPropType = require(_dependencyMap[0]);
  const DeprecatedViewStylePropTypes = require(_dependencyMap[1]);
  const PropTypes = require(_dependencyMap[2]);
  const DeprecatedTextStylePropTypes = {
    ...DeprecatedViewStylePropTypes,
    color: DeprecatedColorPropType,
    fontFamily: PropTypes.string,
    fontSize: PropTypes.number,
    fontStyle: PropTypes.oneOf(['italic', 'normal']),
    fontVariant: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOf(['lining-nums', 'oldstyle-nums', 'proportional-nums', 'small-caps', 'stylistic-eight', 'stylistic-eighteen', 'stylistic-eleven', 'stylistic-fifteen', 'stylistic-five', 'stylistic-four', 'stylistic-fourteen', 'stylistic-nine', 'stylistic-nineteen', 'stylistic-one', 'stylistic-seven', 'stylistic-seventeen', 'stylistic-six', 'stylistic-sixteen', 'stylistic-ten', 'stylistic-thirteen', 'stylistic-three', 'stylistic-twelve', 'stylistic-twenty', 'stylistic-two', 'tabular-nums'])), PropTypes.string]),
    fontWeight: PropTypes.oneOf(['100', '200', '300', '400', '500', '600', '700', '800', '900', 'black', 'bold', 'condensed', 'condensedBold', 'heavy', 'light', 'medium', 'normal', 'regular', 'semibold', 'thin', 'ultralight', 100, 200, 300, 400, 500, 600, 700, 800, 900]),
    includeFontPadding: PropTypes.bool,
    letterSpacing: PropTypes.number,
    lineHeight: PropTypes.number,
    textAlign: PropTypes.oneOf(['auto', 'center', 'justify', 'left', 'right']),
    textAlignVertical: PropTypes.oneOf(['auto', 'bottom', 'center', 'top']),
    textDecorationColor: DeprecatedColorPropType,
    textDecorationLine: PropTypes.oneOf(['line-through', 'none', 'underline line-through', 'underline']),
    textDecorationStyle: PropTypes.oneOf(['dashed', 'dotted', 'double', 'solid']),
    textShadowColor: DeprecatedColorPropType,
    textShadowOffset: PropTypes.shape({
      height: PropTypes.number,
      width: PropTypes.number
    }),
    textShadowRadius: PropTypes.number,
    textTransform: PropTypes.oneOf(['capitalize', 'lowercase', 'none', 'uppercase']),
    userSelect: PropTypes.oneOf(['all', 'auto', 'contain', 'none', 'text']),
    verticalAlign: PropTypes.oneOf(['auto', 'bottom', 'middle', 'top']),
    writingDirection: PropTypes.oneOf(['auto', 'ltr', 'rtl'])
  };
  module.exports = DeprecatedTextStylePropTypes;
},1211,[1194,1207,1145]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  Object.defineProperty(exports, "cleanHtmlForArticle", {
    enumerable: true,
    get: function () {
      return cleanHtmlForArticle;
    }
  });
  const cleanHtmlForArticle = htmlString => {
    // 1. Define the unique block delimiter
    const specialDelimiter = '<br />';

    // 2. Pre-cleanup: Normalize whitespace, remove comments, and common entities
    let cleaned = htmlString.replace(/<!--[\s\S]*?-->/g, '') // Remove HTML comments
    .replace(/&nbsp;/g, ' ') // Replace non-breaking spaces with standard space
    .replace(/\r/g, '') // Remove carriage returns
    .trim();

    // --- Core Cleaning Steps ---

    // 3. Remove all attributes (style, class, id, etc.) except for 'href' on 'a' tags.
    cleaned = cleaned.replace(/<([a-z0-9]+)(\s+[^>]*)*>/ig, (match, tagName) => {
      const lowerTag = tagName.toLowerCase();

      // Custom logic for <a>: keep the href attribute
      if (lowerTag === 'a') {
        const hrefMatch = match.match(/href=["']([^"']+)["']/i);
        const href = hrefMatch ? ` href="${hrefMatch[1]}"` : '';
        return `<a${href}>`;
      }

      // For all other tags, remove all attributes
      return `<${lowerTag}>`;
    });

    // 4. Block Segmentation: Replace structural/unwanted tags (span, div, br) with the block delimiter.
    cleaned = cleaned.replace(/<\/?(?:span|div|br)\b[^>]*>/ig, specialDelimiter);

    // 5. Clean up redundant delimiters and trim.
    cleaned = cleaned.replace(new RegExp(`${specialDelimiter}+`, 'g'), specialDelimiter);
    cleaned = cleaned.replace(new RegExp(`^${specialDelimiter}|${specialDelimiter}$`, 'g'), '');

    // 6. Structural Normalization (Paragraph/List Creation):
    const blocks = cleaned.split(specialDelimiter).map(block => block.trim()).filter(block => block.length > 0);
    let finalHtml = '';
    // Regex to detect blocks starting with a bullet point (• or -) followed by optional space.
    const listMarkerRegex = /^[\•\-]\s*(.*)$/;
    // Updated set of allowed tags for cleanup step a)
    const allowedTagsRegex = 'h[1-4]|p|b|i|a|u|ul|ol|li';
    blocks.forEach(block => {
      // a) Remove remaining disallowed tags from within the block, keeping their content.
      block = block.replace(new RegExp(`<(?!\/?(?:${allowedTagsRegex})\\b)[^>]+>`, 'ig'), '').trim();
      if (block.length === 0) return; // Skip empty blocks after cleanup

      // Prevent nested <p> tags by stripping leading/trailing <p> tags from the block content
      block = block.replace(/^<p>\s*/i, '').replace(/\s*<\/p>$/i, '').trim();
      const listMatch = block.match(listMarkerRegex);
      if (listMatch) {
        // This block looks like a list item
        const listItemContent = listMatch[1].trim();

        // *** USER REQUESTED LOGIC (INVALID HTML BUT REQUIRED) ***
        // Encapsulate each list item in its own <ul> block, followed by the specialDelimiter.
        finalHtml += `<ul><li>${listItemContent}</li></ul>${specialDelimiter}`;
        // *******************************************************
      } else {
        // This block is NOT a list item

        // Treat as a standard paragraph, followed by the specialDelimiter.
        finalHtml += `<p>${block}</p>${specialDelimiter}`;
      }
    });

    // 7. Final cleanup for a **single line**: replace specialDelimiter with an empty string.
    // This removes all delimiters, resulting in a continuous single line of HTML.
    return finalHtml.trim().replace(new RegExp("<br />+$"), '') // Remove trailing delimiters
    .replace(new RegExp(`${specialDelimiter}+`, 'g'), '') // **KEY CHANGE:** Replace all remaining delimiters with an empty string
    .replace(/\s+/g, ' '); // **Optional:** Collapse all remaining whitespace (including spaces between tags) to a single space for maximum compression.
  };
},1212,[]);