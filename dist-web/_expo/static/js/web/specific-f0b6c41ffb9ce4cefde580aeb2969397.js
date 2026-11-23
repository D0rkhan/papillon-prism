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
      return QRCodeAndCardsPage;
    }
  });
  var _react = require(_dependencyMap[0]);
  require(_dependencyMap[1]);
  var _reactNativeWebDistExportsScrollView = require(_dependencyMap[2]);
  var ScrollView = _interopDefault(_reactNativeWebDistExportsScrollView);
  var _reactNativeWebDistExportsView = require(_dependencyMap[3]);
  var View = _interopDefault(_reactNativeWebDistExportsView);
  var _expoRouterReactNavigation = require(_dependencyMap[4]);
  var _expoLinearGradient = require(_dependencyMap[5]);
  var _expoRouter = require(_dependencyMap[6]);
  var _utilsAdjustColor = require(_dependencyMap[7]);
  var adjust = _interopDefault(_utilsAdjustColor);
  var _utilsServicesHelper = require(_dependencyMap[8]);
  var _utilsLoggerLogger = require(_dependencyMap[9]);
  var _databaseUseHomework = require(_dependencyMap[10]);
  var _servicesShared = require(_dependencyMap[11]);
  var _servicesSharedCanteen = require(_dependencyMap[12]);
  var _uiComponentsContainedNumber = require(_dependencyMap[13]);
  var ContainedNumber = _interopDefault(_uiComponentsContainedNumber);
  var _uiComponentsIcon = require(_dependencyMap[14]);
  var Icon = _interopDefault(_uiComponentsIcon);
  var _uiComponentsStack = require(_dependencyMap[15]);
  var Stack = _interopDefault(_uiComponentsStack);
  var _uiComponentsTypography = require(_dependencyMap[16]);
  var Typography = _interopDefault(_uiComponentsTypography);
  var _uiComponentsAnimatedPressable = require(_dependencyMap[17]);
  var AnimatedPressable = _interopDefault(_uiComponentsAnimatedPressable);
  var _uiComponentsList = require(_dependencyMap[18]);
  var List = _interopDefault(_uiComponentsList);
  var _uiComponentsItem = require(_dependencyMap[19]);
  var Item = _interopDefault(_uiComponentsItem);
  var _uiComponentsCalendar = require(_dependencyMap[20]);
  var Calendar = _interopDefault(_uiComponentsCalendar);
  var _cards = require(_dependencyMap[21]);
  var _getpapillonPapicons = require(_dependencyMap[22]);
  var _uiComponentsAlertProvider = require(_dependencyMap[23]);
  var _reactI18next = require(_dependencyMap[24]);
  var _servicesSharedTypes = require(_dependencyMap[25]);
  var _utilsI18n = require(_dependencyMap[26]);
  var i18n = _interopDefault(_utilsI18n);
  var _uiComponentsTabHeader = require(_dependencyMap[27]);
  var TabHeader = _interopDefault(_uiComponentsTabHeader);
  var _uiComponentsTabHeaderTitle = require(_dependencyMap[28]);
  var TabHeaderTitle = _interopDefault(_uiComponentsTabHeaderTitle);
  var _uiComponentsChipButton = require(_dependencyMap[29]);
  var ChipButton = _interopDefault(_uiComponentsChipButton);
  var _uiComponentsActivityIndicator = require(_dependencyMap[30]);
  var ActivityIndicator = _interopDefault(_uiComponentsActivityIndicator);
  var _uiNativeNativeSwitch = require(_dependencyMap[31]);
  var NativeSwitch = _interopDefault(_uiNativeNativeSwitch);
  var _uiComponentsSafeHorizontalView = require(_dependencyMap[32]);
  var SafeHorizontalView = _interopDefault(_uiComponentsSafeHorizontalView);
  var _reactJsxRuntime = require(_dependencyMap[33]);
  function QRCodeAndCardsPage() {
    const alert = (0, _uiComponentsAlertProvider.useAlert)();
    const search = (0, _expoRouter.useLocalSearchParams)();
    const serviceName = String(search.serviceName);
    const service = Number(search.service);
    const wallet = JSON.parse(String(search.wallet));
    const theme = (0, _expoRouterReactNavigation.useTheme)();
    const {
      colors
    } = theme;
    const manager = (0, _servicesShared.getManager)();
    const hasBookingCapacity = manager?.clientHasCapatibility(_servicesSharedTypes.Capabilities.CANTEEN_BOOKINGS, wallet.createdByAccount);
    const [history, setHistory] = (0, _react.useState)([]);
    const [qrcode, setQR] = (0, _react.useState)("");
    const [accountKind, setAccountKind] = (0, _react.useState)(_servicesSharedCanteen.CanteenKind.ARGENT);
    const [date, setDate] = (0, _react.useState)(new Date());
    const [weekNumber, setWeekNumber] = (0, _react.useState)((0, _databaseUseHomework.getWeekNumberFromDate)(date));
    const [bookingWeek, setBookingWeek] = (0, _react.useState)([]);
    const [showDatePicker, setShowDatePicker] = (0, _react.useState)(false);
    const bookingDay = (0, _react.useMemo)(() => {
      const target = new Date(date);
      target.setUTCHours(0, 0, 0, 0);
      return bookingWeek.find(day => {
        const dayDate = new Date(day.date);
        dayDate.setUTCHours(0, 0, 0, 0);
        return dayDate.getTime() === target.getTime();
      });
    }, [date, bookingWeek]);
    const fetchQRCode = (0, _react.useCallback)(async () => {
      try {
        const {
          data
        } = await manager.getCanteenQRCodes(wallet.createdByAccount);
        setQR(data);
      } catch (error) {
        (0, _utilsLoggerLogger.warn)(String(error));
      }
    }, [manager, wallet.createdByAccount]);
    const [loadingHistory, setLoadingHistory] = (0, _react.useState)(false);
    const fetchHistory = (0, _react.useCallback)(async () => {
      setLoadingHistory(true);
      const history = await manager.getCanteenTransactionsHistory(wallet.createdByAccount);
      setHistory(history);
      setLoadingHistory(false);
    }, [manager, wallet.createdByAccount]);
    const fetchBookingWeek = (0, _react.useCallback)(async () => {
      const bookings = await manager.getCanteenBookingWeek(weekNumber, wallet.createdByAccount);
      setBookingWeek(bookings);
    }, [manager, weekNumber, wallet.createdByAccount]);
    const fetchKind = (0, _react.useCallback)(async () => {
      const kind = await manager.getCanteenKind(wallet.createdByAccount);
      setAccountKind(kind);
    }, [manager, weekNumber, wallet.createdByAccount]);
    (0, _react.useEffect)(() => {
      fetchQRCode();
      fetchHistory();
      fetchKind();
    }, [fetchQRCode, fetchHistory]);
    (0, _react.useEffect)(() => {
      fetchBookingWeek();
    }, [fetchBookingWeek]);
    const handleDateChange = (0, _react.useCallback)(newDate => {
      setDate(newDate);
      const newWeek = (0, _databaseUseHomework.getWeekNumberFromDate)(newDate);
      if (newWeek !== weekNumber) setWeekNumber(newWeek);
    }, [weekNumber]);
    const serviceColor = (0, _react.useMemo)(() => (0, adjust.default)((0, _utilsServicesHelper.getServiceColor)(service), -0.1), [service]);
    const handleToggle = async index => {
      if (!bookingDay) return;
      const updatedBookingDay = {
        ...bookingDay
      };
      const item = updatedBookingDay.available[index];
      const previous = item.booked;
      item.booked = !previous;
      setBookingWeek(prev => prev.map(day => day.date === bookingDay.date ? updatedBookingDay : day));
      try {
        await manager.setMealAsBooked(item);
      } catch (error) {
        alert.showAlert({
          title: "Erreur lors de la réservation",
          description: "Une erreur est survenue lors de la réservation de ton repas, il n'a donc pas été réservé.",
          icon: "AlertTriangle",
          color: "#D60046",
          technical: String(error),
          withoutNavbar: false
        });
        item.booked = previous;
        setBookingWeek(prev => prev.map(day => day.date === bookingDay.date ? updatedBookingDay : day));
      }
    };
    const {
      t
    } = (0, _reactI18next.useTranslation)();
    const [headerHeight, setHeaderHeight] = (0, _react.useState)(0);
    return /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(_reactJsxRuntime.Fragment, {
      children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_expoLinearGradient.LinearGradient, {
        colors: [(0, _utilsServicesHelper.getServiceColor)(service) + 40, colors.background, colors.background, colors.background],
        locations: [0, 0.87],
        start: {
          x: 0.5,
          y: 0
        },
        end: {
          x: 0.5,
          y: 0.6
        },
        style: {
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0
        }
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(TabHeader.default, {
        modal: true,
        onHeightChanged: setHeaderHeight,
        title: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(TabHeaderTitle.default, {
          chevron: false,
          leading: serviceName,
          subtitle: (wallet.amount / 100).toFixed(2) + " " + wallet.currency
        }),
        trailing: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(ChipButton.default, {
          single: true,
          icon: "cross",
          onPress: () => {
            _expoRouter.router.dismiss();
          }
        })
      }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(ScrollView.default, {
        contentInsetAdjustmentBehavior: "automatic",
        contentContainerStyle: {
          paddingTop: headerHeight - 12
        },
        children: /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(SafeHorizontalView.default, {
          base: 15,
          style: {
            paddingVertical: 15,
            flex: 1,
            gap: 20
          },
          children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_cards.Card, {
            index: 0,
            service: service,
            wallet: wallet,
            disabled: true,
            inSpecificView: true
          }), qrcode && /*#__PURE__*/(0, _reactJsxRuntime.jsx)(AnimatedPressable.default, {
            onPress: () => _expoRouter.router.push({
              pathname: "/(features)/(cards)/qrcode",
              params: {
                qrcode,
                type: (0, _utilsServicesHelper.getCodeType)(service),
                service
              }
            }),
            style: {
              width: "100%",
              backgroundColor: colors.background,
              paddingVertical: 18,
              borderRadius: 25,
              borderWidth: 1,
              borderColor: colors.border
            },
            children: /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(Stack.default, {
              direction: "horizontal",
              hAlign: "center",
              vAlign: "center",
              gap: 10,
              children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.QrCode, {
                color: (0, _utilsServicesHelper.getServiceColor)(service)
              }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
                variant: "h6",
                children: "Afficher le QR-Code"
              })]
            })
          }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(Stack.default, {
            card: true,
            direction: "horizontal",
            width: "100%",
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsxs)(Stack.default, {
              width: "50%",
              vAlign: "center",
              hAlign: "center",
              style: {
                borderRightWidth: 1,
                borderRightColor: colors.border
              },
              padding: 12,
              children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Icon.default, {
                papicon: true,
                opacity: 0.5,
                children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
                  name: "PiggyBank"
                })
              }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
                color: "secondary",
                children: "Solde"
              }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(ContainedNumber.default, {
                color: serviceColor,
                children: [(wallet.amount / 100).toFixed(2), " ", wallet.currency]
              })]
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(Stack.default, {
              width: "50%",
              vAlign: "center",
              hAlign: "center",
              padding: 12,
              children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Icon.default, {
                papicon: true,
                opacity: 0.5,
                children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
                  name: "Cutlery"
                })
              }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
                color: "secondary",
                children: "Repas restants"
              }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(ContainedNumber.default, {
                color: serviceColor,
                children: wallet.lunchPrice > 0 ? String(Math.floor(wallet.amount / wallet.lunchPrice)) : "Indéterminé"
              })]
            })]
          }), hasBookingCapacity && /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(View.default, {
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Calendar.default, {
              date: date,
              onDateChange: handleDateChange,
              color: serviceColor,
              visible: showDatePicker,
              onVisibleChange: setShowDatePicker
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(AnimatedPressable.default, {
              onPress: () => setShowDatePicker(prev => !prev),
              children: /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(Stack.default, {
                hAlign: "center",
                vAlign: "center",
                style: {
                  padding: 20
                },
                children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Stack.default, {
                  direction: "horizontal",
                  gap: 5,
                  children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
                    color: "secondary",
                    children: "R\xE9server mon repas"
                  })
                }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(Stack.default, {
                  direction: "horizontal",
                  gap: 5,
                  hAlign: "center",
                  vAlign: "center",
                  children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
                    color: "secondary",
                    children: date.toLocaleDateString(i18n.default.language, {
                      weekday: "long",
                      day: "numeric",
                      month: "long"
                    })
                  }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.ChevronDown, {
                    opacity: 0.5,
                    size: 18
                  })]
                }), bookingDay ? /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default, {
                  style: {
                    marginTop: 10
                  },
                  children: bookingDay.available.map((item, index) => /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(Item.default, {
                    children: [/*#__PURE__*/(0, _reactJsxRuntime.jsxs)(Typography.default, {
                      children: ["Borne ", item.label]
                    }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_uiComponentsItem.Trailing, {
                      children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(NativeSwitch.default, {
                        disabled: accountKind === _servicesSharedCanteen.CanteenKind.FORFAIT ? false : !item.canBook || wallet.lunchRemaining < 1 && wallet.lunchPrice !== 0,
                        value: item.booked,
                        onValueChange: () => handleToggle(index)
                      })
                    })]
                  }, item.label))
                }) : /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Stack.default, {
                  hAlign: "center",
                  vAlign: "center",
                  margin: 16,
                  gap: 16,
                  children: /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(View.default, {
                    style: {
                      alignItems: "center"
                    },
                    children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Icon.default, {
                      papicon: true,
                      opacity: 0.5,
                      size: 32,
                      style: {
                        marginBottom: 3
                      },
                      children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Papicons, {
                        name: "Card"
                      })
                    }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
                      variant: "h4",
                      color: "text",
                      align: "center",
                      children: t("Profile_Cards_No_Reservation")
                    }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
                      variant: "body2",
                      color: "secondary",
                      align: "center",
                      children: t("Profile_Cards_No_Available_Reservation")
                    })]
                  })
                })]
              })
            })]
          }), loadingHistory && history.length === 0 && /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(Stack.default, {
            padding: 20,
            hAlign: "center",
            vAlign: "center",
            gap: 4,
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(ActivityIndicator.default, {
              size: 42
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              align: "center",
              variant: "title",
              color: "text",
              style: {
                marginTop: 8
              },
              children: t("Profile_Cards_Loading_History")
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
              align: "center",
              variant: "body2",
              color: "secondary",
              children: t("Profile_Cards_Loading_History_Description")
            })]
          }), history.length > 0 && /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(View.default, {
            style: {
              display: "flex",
              gap: 13.5
            },
            children: [/*#__PURE__*/(0, _reactJsxRuntime.jsxs)(Stack.default, {
              direction: "horizontal",
              style: {
                flex: 1,
                borderRightWidth: 1,
                borderRightColor: colors.border
              },
              gap: 5,
              children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Icon.default, {
                papicon: true,
                opacity: 0.5,
                children: /*#__PURE__*/(0, _reactJsxRuntime.jsx)(_getpapillonPapicons.Clock, {})
              }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
                color: "secondary",
                children: t("Profile_Cards_History")
              })]
            }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(List.default, {
              children: history.slice(0, 10).map((c, index) => /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(Item.default, {
                children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(_uiComponentsItem.Trailing, {
                  children: /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(ContainedNumber.default, {
                    color: (0, adjust.default)(c.amount < 0 ? "#C50000" : "#42C500", -0.1),
                    children: [c.amount > 0 ? "+" : "", (c.amount / 100).toFixed(2), " ", c.currency]
                  })
                }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
                  children: c.label
                }), /*#__PURE__*/(0, _reactJsxRuntime.jsxs)(Stack.default, {
                  direction: "horizontal",
                  hAlign: "center",
                  children: [/*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
                    color: "secondary",
                    children: c.date.toLocaleDateString(i18n.default.language, {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric"
                    })
                  }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(View.default, {
                    style: {
                      height: 4,
                      width: 4,
                      borderRadius: 2,
                      backgroundColor: colors.text + 80
                    }
                  }), /*#__PURE__*/(0, _reactJsxRuntime.jsx)(Typography.default, {
                    color: "secondary",
                    children: c.date.toLocaleTimeString(i18n.default.language, {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false
                    })
                  })]
                })]
              }, `${c.label}-${c.date.getTime()}-${index}`))
            })]
          })]
        })
      })]
    });
  }
},859,[6,193,222,198,1000,1113,1023,1114,1115,1116,1117,1118,1119,1120,1013,1005,1110,1121,1122,1123,1124,857,1002,1125,1105,1126,1127,1025,1026,1128,1129,1130,1111,97]);