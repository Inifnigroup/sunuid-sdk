(function () {
  'use strict';

  function asyncGeneratorStep(n, t, e, r, o, a, c) {
    try {
      var i = n[a](c),
        u = i.value;
    } catch (n) {
      return void e(n);
    }
    i.done ? t(u) : Promise.resolve(u).then(r, o);
  }
  function _asyncToGenerator(n) {
    return function () {
      var t = this,
        e = arguments;
      return new Promise(function (r, o) {
        var a = n.apply(t, e);
        function _next(n) {
          asyncGeneratorStep(a, r, o, _next, _throw, "next", n);
        }
        function _throw(n) {
          asyncGeneratorStep(a, r, o, _next, _throw, "throw", n);
        }
        _next(void 0);
      });
    };
  }
  function _classCallCheck(a, n) {
    if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
  }
  function _defineProperties(e, r) {
    for (var t = 0; t < r.length; t++) {
      var o = r[t];
      o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o);
    }
  }
  function _createClass(e, r, t) {
    return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", {
      writable: !1
    }), e;
  }
  function _defineProperty(e, r, t) {
    return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
      value: t,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : e[r] = t, e;
  }
  function ownKeys(e, r) {
    var t = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var o = Object.getOwnPropertySymbols(e);
      r && (o = o.filter(function (r) {
        return Object.getOwnPropertyDescriptor(e, r).enumerable;
      })), t.push.apply(t, o);
    }
    return t;
  }
  function _objectSpread2(e) {
    for (var r = 1; r < arguments.length; r++) {
      var t = null != arguments[r] ? arguments[r] : {};
      r % 2 ? ownKeys(Object(t), !0).forEach(function (r) {
        _defineProperty(e, r, t[r]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) {
        Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
      });
    }
    return e;
  }
  function _regenerator() {
    /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */
    var e,
      t,
      r = "function" == typeof Symbol ? Symbol : {},
      n = r.iterator || "@@iterator",
      o = r.toStringTag || "@@toStringTag";
    function i(r, n, o, i) {
      var c = n && n.prototype instanceof Generator ? n : Generator,
        u = Object.create(c.prototype);
      return _regeneratorDefine(u, "_invoke", function (r, n, o) {
        var i,
          c,
          u,
          f = 0,
          p = o || [],
          y = !1,
          G = {
            p: 0,
            n: 0,
            v: e,
            a: d,
            f: d.bind(e, 4),
            d: function (t, r) {
              return i = t, c = 0, u = e, G.n = r, a;
            }
          };
        function d(r, n) {
          for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) {
            var o,
              i = p[t],
              d = G.p,
              l = i[2];
            r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0));
          }
          if (o || r > 1) return a;
          throw y = !0, n;
        }
        return function (o, p, l) {
          if (f > 1) throw TypeError("Generator is already running");
          for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) {
            i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u);
            try {
              if (f = 2, i) {
                if (c || (o = "next"), t = i[o]) {
                  if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object");
                  if (!t.done) return t;
                  u = t.value, c < 2 && (c = 0);
                } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1);
                i = e;
              } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break;
            } catch (t) {
              i = e, c = 1, u = t;
            } finally {
              f = 1;
            }
          }
          return {
            value: t,
            done: y
          };
        };
      }(r, o, i), !0), u;
    }
    var a = {};
    function Generator() {}
    function GeneratorFunction() {}
    function GeneratorFunctionPrototype() {}
    t = Object.getPrototypeOf;
    var c = [][n] ? t(t([][n]())) : (_regeneratorDefine(t = {}, n, function () {
        return this;
      }), t),
      u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c);
    function f(e) {
      return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e;
    }
    return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine(u), _regeneratorDefine(u, o, "Generator"), _regeneratorDefine(u, n, function () {
      return this;
    }), _regeneratorDefine(u, "toString", function () {
      return "[object Generator]";
    }), (_regenerator = function () {
      return {
        w: i,
        m: f
      };
    })();
  }
  function _regeneratorDefine(e, r, n, t) {
    var i = Object.defineProperty;
    try {
      i({}, "", {});
    } catch (e) {
      i = 0;
    }
    _regeneratorDefine = function (e, r, n, t) {
      function o(r, n) {
        _regeneratorDefine(e, r, function (e) {
          return this._invoke(r, n, e);
        });
      }
      r ? i ? i(e, r, {
        value: n,
        enumerable: !t,
        configurable: !t,
        writable: !t
      }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2));
    }, _regeneratorDefine(e, r, n, t);
  }
  function _toPrimitive(t, r) {
    if ("object" != typeof t || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
      var i = e.call(t, r || "default");
      if ("object" != typeof i) return i;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
  }
  function _toPropertyKey(t) {
    var i = _toPrimitive(t, "string");
    return "symbol" == typeof i ? i : i + "";
  }

  /**
   * SunuID SDK - Package d'intégration pour partenaires
   * 
   * @version 1.0.0
   * @author SunuID Team
   * @license MIT
   */

  (function (window, _window$SunuIDConfig) {

    // Configuration par défaut
    var DEFAULT_CONFIG = {
      apiUrl: ((_window$SunuIDConfig = window.SunuIDConfig) === null || _window$SunuIDConfig === void 0 ? void 0 : _window$SunuIDConfig.apiUrl) || 'https://api.sunuid.fayma.sn',
      clientId: null,
      secretId: null,
      theme: 'light',
      language: 'fr',
      autoRefresh: true,
      refreshInterval: 30000,
      // 30 secondes
      onSuccess: null,
      onError: null,
      onExpired: null
    };

    /**
     * Classe principale SunuID
     */
    var SunuID = /*#__PURE__*/function () {
      function SunuID() {
        var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        _classCallCheck(this, SunuID);
        this.config = _objectSpread2(_objectSpread2({}, DEFAULT_CONFIG), config);
        this.qrCode = null;
        this.refreshTimer = null;
        this.isInitialized = false;
        this.init();
      }

      /**
       * Initialisation du SDK
       */
      return _createClass(SunuID, [{
        key: "init",
        value: function init() {
          if (!this.config.clientId || !this.config.secretId) {
            throw new Error('SunuID: clientId et secretId sont requis');
          }
          this.isInitialized = true;
          console.log('SunuID SDK initialisé avec succès');
        }

        /**
         * Générer un QR code d'authentification
         */
      }, {
        key: "generateAuthQR",
        value: (function () {
          var _generateAuthQR = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(containerId) {
            var options,
              response,
              qrImageUrl,
              _args = arguments,
              _t;
            return _regenerator().w(function (_context) {
              while (1) switch (_context.p = _context.n) {
                case 0:
                  options = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
                  if (this.isInitialized) {
                    _context.n = 1;
                    break;
                  }
                  throw new Error('SunuID: SDK non initialisé');
                case 1:
                  _context.p = 1;
                  _context.n = 2;
                  return this.makeRequest('/qr-generate', _objectSpread2({
                    type: 'auth'
                  }, options));
                case 2:
                  response = _context.v;
                  if (!response.success) {
                    _context.n = 3;
                    break;
                  }
                  // Construire l'URL complète de l'image QR
                  qrImageUrl = "".concat(this.config.apiUrl).concat(response.data.qrcode);
                  this.displayQRCode(containerId, qrImageUrl, 'auth', options);
                  this.startAutoRefresh(containerId, 'auth', options);
                  return _context.a(2, _objectSpread2(_objectSpread2({}, response.data), {}, {
                    qrCodeUrl: qrImageUrl,
                    sessionId: response.data.service_id
                  }));
                case 3:
                  throw new Error(response.message || 'Erreur lors de la génération du QR code');
                case 4:
                  _context.n = 6;
                  break;
                case 5:
                  _context.p = 5;
                  _t = _context.v;
                  console.error('Erreur API détectée:', _t.message);
                  console.log('Affichage du message "Service non disponible" pour auth');
                  this.displayServiceUnavailable(containerId, 'auth');
                  throw new Error('Service non disponible');
                case 6:
                  return _context.a(2);
              }
            }, _callee, this, [[1, 5]]);
          }));
          function generateAuthQR(_x) {
            return _generateAuthQR.apply(this, arguments);
          }
          return generateAuthQR;
        }()
        /**
         * Générer un QR code KYC
         */
        )
      }, {
        key: "generateKYCQR",
        value: (function () {
          var _generateKYCQR = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(containerId) {
            var options,
              response,
              qrImageUrl,
              _args2 = arguments,
              _t2;
            return _regenerator().w(function (_context2) {
              while (1) switch (_context2.p = _context2.n) {
                case 0:
                  options = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : {};
                  if (this.isInitialized) {
                    _context2.n = 1;
                    break;
                  }
                  throw new Error('SunuID: SDK non initialisé');
                case 1:
                  _context2.p = 1;
                  _context2.n = 2;
                  return this.makeRequest('/qr-generate', _objectSpread2({
                    type: 'kyc'
                  }, options));
                case 2:
                  response = _context2.v;
                  if (!response.success) {
                    _context2.n = 3;
                    break;
                  }
                  // Construire l'URL complète de l'image QR
                  qrImageUrl = "".concat(this.config.apiUrl).concat(response.data.qrcode);
                  this.displayQRCode(containerId, qrImageUrl, 'kyc', options);
                  this.startAutoRefresh(containerId, 'kyc', options);
                  return _context2.a(2, _objectSpread2(_objectSpread2({}, response.data), {}, {
                    qrCodeUrl: qrImageUrl,
                    sessionId: response.data.service_id
                  }));
                case 3:
                  throw new Error(response.message || 'Erreur lors de la génération du QR code KYC');
                case 4:
                  _context2.n = 6;
                  break;
                case 5:
                  _context2.p = 5;
                  _t2 = _context2.v;
                  console.error('Erreur API détectée:', _t2.message);
                  console.log('Affichage du message "Service non disponible" pour kyc');
                  this.displayServiceUnavailable(containerId, 'kyc');
                  throw new Error('Service non disponible');
                case 6:
                  return _context2.a(2);
              }
            }, _callee2, this, [[1, 5]]);
          }));
          function generateKYCQR(_x2) {
            return _generateKYCQR.apply(this, arguments);
          }
          return generateKYCQR;
        }()
        /**
         * Vérifier le statut d'un QR code
         */
        )
      }, {
        key: "checkQRStatus",
        value: (function () {
          var _checkQRStatus = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(sessionId) {
            var response, _t3;
            return _regenerator().w(function (_context3) {
              while (1) switch (_context3.p = _context3.n) {
                case 0:
                  if (this.isInitialized) {
                    _context3.n = 1;
                    break;
                  }
                  throw new Error('SunuID: SDK non initialisé');
                case 1:
                  _context3.p = 1;
                  _context3.n = 2;
                  return this.makeRequest('/qr-status', {
                    serviceId: sessionId
                  });
                case 2:
                  response = _context3.v;
                  if (!response.success) {
                    _context3.n = 3;
                    break;
                  }
                  return _context3.a(2, response.data);
                case 3:
                  throw new Error(response.message || 'Erreur lors de la vérification du statut');
                case 4:
                  _context3.n = 6;
                  break;
                case 5:
                  _context3.p = 5;
                  _t3 = _context3.v;
                  this.handleError(_t3);
                  throw _t3;
                case 6:
                  return _context3.a(2);
              }
            }, _callee3, this, [[1, 5]]);
          }));
          function checkQRStatus(_x3) {
            return _checkQRStatus.apply(this, arguments);
          }
          return checkQRStatus;
        }()
        /**
         * Afficher un QR code dans un conteneur
         */
        )
      }, {
        key: "displayQRCode",
        value: function displayQRCode(containerId, qrUrl, type) {
          var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
          var container = document.getElementById(containerId);
          if (!container) {
            throw new Error("Conteneur avec l'ID \"".concat(containerId, "\" non trouv\xE9"));
          }

          // Nettoyer le conteneur
          container.innerHTML = '';

          // Créer l'élément QR code
          var qrElement = document.createElement('div');
          qrElement.className = 'sunuid-qr-code';
          qrElement.innerHTML = "\n                    <div class=\"sunuid-qr-header\">\n                    <h3>".concat(type === 'auth' ? 'Authentification' : 'Vérification KYC', "</h3>\n                    <div class=\"sunuid-timer\">\n                        <span>Expire dans: </span>\n                        <span id=\"sunuid-timer\">30</span>\n                        <span> secondes</span>\n                    </div>\n                        </div>\n                <div class=\"sunuid-qr-image\">\n                    <img src=\"").concat(qrUrl, "\" alt=\"QR Code SunuID\" style=\"max-width: 300px; height: auto;\">\n                    </div>\n                <div class=\"sunuid-qr-instructions\">\n                    <p>Scannez ce QR code avec l'application SunuID pour vous connecter</p>\n                    </div>\n                <div class=\"sunuid-qr-status\" id=\"sunuid-status\">\n                    <p>En attente de scan...</p>\n                </div>\n            ");
          container.appendChild(qrElement);

          // Démarrer le timer
          this.startTimer();

          // Appliquer le thème
          this.applyTheme(options.theme || this.config.theme);
        }

        /**
         * Afficher "Service non disponible"
         */
      }, {
        key: "displayServiceUnavailable",
        value: function displayServiceUnavailable(containerId, type) {
          console.log("displayServiceUnavailable appel\xE9e pour ".concat(containerId, ", type: ").concat(type));
          var container = document.getElementById(containerId);
          if (!container) {
            console.error("Container ".concat(containerId, " non trouv\xE9"));
            return;
          }
          container.innerHTML = "\n                <div class=\"sunuid-service-unavailable\" style=\"\n                    text-align: center;\n                    padding: 40px 20px;\n                    background: #f8f9fa;\n                    border: 2px dashed #dee2e6;\n                    border-radius: 10px;\n                    color: #6c757d;\n                    font-family: Arial, sans-serif;\n                \">\n                    <div style=\"font-size: 48px; margin-bottom: 20px;\">\u26A0\uFE0F</div>\n                    <h3 style=\"margin: 0 0 10px 0; color: #495057;\">Service Non Disponible</h3>\n                    <p style=\"margin: 0; font-size: 14px;\">\n                        Le service d'authentification est temporairement indisponible.<br>\n                        Veuillez r\xE9essayer plus tard.\n                    </p>\n                    <div style=\"margin-top: 20px; font-size: 12px; color: #adb5bd;\">\n                        Type: ".concat(type.toUpperCase(), "\n                    </div>\n                </div>\n            ");
        }

        /**
         * Rafraîchir un QR code
         */
      }, {
        key: "refreshQR",
        value: (function () {
          var _refreshQR = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(containerId, type) {
            var options,
              result,
              _args4 = arguments,
              _t4,
              _t5;
            return _regenerator().w(function (_context4) {
              while (1) switch (_context4.p = _context4.n) {
                case 0:
                  options = _args4.length > 2 && _args4[2] !== undefined ? _args4[2] : {};
                  _context4.p = 1;
                  if (!(type === 'auth')) {
                    _context4.n = 3;
                    break;
                  }
                  _context4.n = 2;
                  return this.generateAuthQR(containerId, options);
                case 2:
                  _t4 = _context4.v;
                  _context4.n = 5;
                  break;
                case 3:
                  _context4.n = 4;
                  return this.generateKYCQR(containerId, options);
                case 4:
                  _t4 = _context4.v;
                case 5:
                  result = _t4;
                  return _context4.a(2, result);
                case 6:
                  _context4.p = 6;
                  _t5 = _context4.v;
                  console.error('Erreur lors du rafraîchissement:', _t5.message);
                  this.displayServiceUnavailable(containerId, type);
                  throw _t5;
                case 7:
                  return _context4.a(2);
              }
            }, _callee4, this, [[1, 6]]);
          }));
          function refreshQR(_x4, _x5) {
            return _refreshQR.apply(this, arguments);
          }
          return refreshQR;
        }()
        /**
         * Démarrer le rafraîchissement automatique
         */
        )
      }, {
        key: "startAutoRefresh",
        value: function startAutoRefresh(containerId, type, options) {
          var _this = this;
          if (!this.config.autoRefresh) return;
          this.refreshTimer = setInterval(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
            var _t6;
            return _regenerator().w(function (_context5) {
              while (1) switch (_context5.p = _context5.n) {
                case 0:
                  _context5.p = 0;
                  _context5.n = 1;
                  return _this.refreshQR(containerId, type, options);
                case 1:
                  _context5.n = 3;
                  break;
                case 2:
                  _context5.p = 2;
                  _t6 = _context5.v;
                  console.warn('Erreur lors du rafraîchissement automatique:', _t6);
                case 3:
                  return _context5.a(2);
              }
            }, _callee5, null, [[0, 2]]);
          })), this.config.refreshInterval);
        }

        /**
         * Démarrer le timer de compte à rebours
         */
      }, {
        key: "startTimer",
        value: function startTimer() {
          var _this2 = this;
          var timeLeft = 30;
          var timerElement = document.getElementById('sunuid-timer');
          var timer = setInterval(function () {
            timeLeft--;
            if (timerElement) {
              timerElement.textContent = timeLeft;
            }
            if (timeLeft <= 0) {
              clearInterval(timer);
              if (_this2.config.onExpired) {
                _this2.config.onExpired();
              }
            }
          }, 1000);
        }

        /**
         * Effectuer une requête API
         */
      }, {
        key: "makeRequest",
        value: (function () {
          var _makeRequest = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(endpoint, data) {
            var _window$SunuIDConfig2;
            var endpointPath, url, response, errorText, errorData, result, _t7;
            return _regenerator().w(function (_context6) {
              while (1) switch (_context6.p = _context6.n) {
                case 0:
                  // Utiliser l'endpoint depuis la configuration si disponible
                  endpointPath = ((_window$SunuIDConfig2 = window.SunuIDConfig) === null || _window$SunuIDConfig2 === void 0 || (_window$SunuIDConfig2 = _window$SunuIDConfig2.endpoints) === null || _window$SunuIDConfig2 === void 0 ? void 0 : _window$SunuIDConfig2[endpoint.replace('/', '')]) || endpoint;
                  url = "".concat(this.config.apiUrl).concat(endpointPath);
                  _context6.p = 1;
                  _context6.n = 2;
                  return fetch(url, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      'Authorization': "Bearer ".concat(this.config.clientId, ":").concat(this.config.secretId),
                      'Accept': 'application/json'
                    },
                    body: JSON.stringify(_objectSpread2(_objectSpread2({}, data), {}, {
                      client_id: this.config.clientId,
                      secret_id: this.config.secretId
                    }))
                  });
                case 2:
                  response = _context6.v;
                  if (response.ok) {
                    _context6.n = 4;
                    break;
                  }
                  _context6.n = 3;
                  return response.text();
                case 3:
                  errorText = _context6.v;
                  try {
                    errorData = JSON.parse(errorText);
                  } catch (e) {
                    errorData = {
                      message: errorText
                    };
                  }
                  throw new Error(errorData.message || "Erreur HTTP: ".concat(response.status));
                case 4:
                  _context6.n = 5;
                  return response.json();
                case 5:
                  result = _context6.v;
                  return _context6.a(2, result);
                case 6:
                  _context6.p = 6;
                  _t7 = _context6.v;
                  console.error('Erreur API SunuID:', _t7);
                  throw _t7;
                case 7:
                  return _context6.a(2);
              }
            }, _callee6, this, [[1, 6]]);
          }));
          function makeRequest(_x6, _x7) {
            return _makeRequest.apply(this, arguments);
          }
          return makeRequest;
        }()
        /**
         * Appliquer le thème
         */
        )
      }, {
        key: "applyTheme",
        value: function applyTheme(theme) {
          var container = document.querySelector('.sunuid-qr-code');
          if (container) {
            container.className = "sunuid-qr-code sunuid-theme-".concat(theme);
          }
        }

        /**
         * Gérer les erreurs
         */
      }, {
        key: "handleError",
        value: function handleError(error) {
          console.error('SunuID SDK Error:', error);
          if (this.config.onError) {
            this.config.onError(error);
          }
        }

        /**
         * Nettoyer les ressources
         */
      }, {
        key: "destroy",
        value: function destroy() {
          if (this.refreshTimer) {
            clearInterval(this.refreshTimer);
          }
          this.isInitialized = false;
          console.log('SunuID SDK détruit');
        }
      }]);
    }(); // Exposer la classe globalement
    window.SunuID = SunuID;
    window.sunuidInstance = null;

    // Fonction d'initialisation globale
    window.initSunuID = function (config) {
      try {
        window.sunuidInstance = new SunuID(config);
        return window.sunuidInstance;
      } catch (error) {
        console.error('Erreur lors de l\'initialisation de SunuID:', error);
        throw error;
      }
    };
  })(window);

})();
//# sourceMappingURL=sunuid-sdk.js.map
