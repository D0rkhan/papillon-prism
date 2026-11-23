__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  exports.fetchSchools = fetchSchools;
  var _blockshubPawnoteLts = require(_dependencyMap[0]);
  var _skolengojs = require(_dependencyMap[1]);
  var _i18next = require(_dependencyMap[2]);
  var _storesAccountTypes = require(_dependencyMap[3]);
  var _utilsNativeGeoreverse = require(_dependencyMap[4]);
  var _utilsNativePosition = require(_dependencyMap[5]);
  async function fetchSchools(service, alert, city) {
    let pos = null;
    if (!city) {
      pos = await (0, _utilsNativePosition.getCurrentPosition)();
      if (pos === null) {
        alert.showAlert({
          title: (0, _i18next.t)("Alert_No_Pos"),
          description: (0, _i18next.t)("ONBOARDING_ALERT_NO_POSITION_DESCRIPTION"),
          icon: "AlertTriangle",
          color: "#D60046",
          withoutNavbar: true
        });
      }
    }
    if (city && service !== _storesAccountTypes.Services.SKOLENGO) {
      pos = await (0, _utilsNativeGeoreverse.GeographicQuerying)(city);
    }
    if (service === _storesAccountTypes.Services.PRONOTE) {
      const schools = await (0, _blockshubPawnoteLts.geolocation)({
        latitude: pos?.latitude ?? 0,
        longitude: pos?.longitude ?? 0
      });
      return schools.map(item => ({
        name: item.name,
        distance: item.distance / 10,
        url: item.url
      }));
    }
    if (service === _storesAccountTypes.Services.SKOLENGO) {
      let cityName;
      if (city) {
        cityName = city;
      } else if (pos?.latitude && pos?.longitude) {
        cityName = (await (0, _utilsNativeGeoreverse.GeographicReverse)(pos.latitude, pos.longitude)).city;
      } else {
        return [];
      }
      const schools = await (0, _skolengojs.SearchSchools)(cityName, 50);
      const list = [];
      for (const school of schools) {
        let distance = 0;
        if (pos?.latitude && pos?.longitude) {
          if (school.location.addressLine?.trim() && school.location.city?.trim() && school.location.zipCode?.trim()) {
            const position = await (0, _utilsNativeGeoreverse.GeographicQuerying)(`${school.location.addressLine} ${school.location.city} ${school.location.zipCode}`);
            distance = (0, _utilsNativePosition.calculateDistanceBetweenPositions)(pos.latitude, pos.longitude, position.longitude, position.latitude);
          }
        }
        list.push({
          name: school.name,
          distance: distance / 1000,
          url: "",
          ref: school
        });
      }
      return list;
    }
    return [];
  }
},912,[1315,1213,1140,1109,1322,1344]);
__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
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
  Object.defineProperty(exports, "getCurrentPosition", {
    enumerable: true,
    get: function () {
      return getCurrentPosition;
    }
  });
  Object.defineProperty(exports, "calculateDistanceBetweenPositions", {
    enumerable: true,
    get: function () {
      return calculateDistanceBetweenPositions;
    }
  });
  var _expoLocation = require(_dependencyMap[0]);
  var Location = _interopNamespace(_expoLocation);
  const getCurrentPosition = async () => {
    try {
      const permission = await Location.requestForegroundPermissionsAsync();
      if (!permission.granted) {
        return null;
      }
      const {
        coords
      } = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High
      });
      return {
        longitude: coords.longitude,
        latitude: coords.latitude
      };
    } catch {
      return null;
    }
  };
  const calculateDistanceBetweenPositions = (lat1, lon1, lat2, lon2) => {
    const r = 6371e3; // metres
    const p1 = lat1 * Math.PI / 180;
    const p2 = lat2 * Math.PI / 180;
    const dp = (lat2 - lat1) * Math.PI / 180;
    const da = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dp / 2) * Math.sin(dp / 2) + Math.cos(p1) * Math.cos(p2) * Math.sin(da / 2) * Math.sin(da / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return r * c;
  };
},1344,[1345]);