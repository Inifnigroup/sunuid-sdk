function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _arrayWithHoles(r) {
  if (Array.isArray(r)) return r;
}
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
function _iterableToArrayLimit(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e,
      n,
      i,
      u,
      a = [],
      f = !0,
      o = !1;
    try {
      if (i = (t = t.call(r)).next, 0 === l) {
        if (Object(t) !== t) return;
        f = !1;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
    } catch (r) {
      o = !0, n = r;
    } finally {
      try {
        if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
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
function _regeneratorValues(e) {
  if (null != e) {
    var t = e["function" == typeof Symbol && Symbol.iterator || "@@iterator"],
      r = 0;
    if (t) return t.call(e);
    if ("function" == typeof e.next) return e;
    if (!isNaN(e.length)) return {
      next: function () {
        return e && r >= e.length && (e = void 0), {
          value: e && e[r++],
          done: !e
        };
      }
    };
  }
  throw new TypeError(typeof e + " is not iterable");
}
function _slicedToArray(r, e) {
  return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
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
function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}
function _unsupportedIterableToArray(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
  }
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
    type: 2,
    // Type par défaut (2 = authentification)
    partnerName: null,
    // Nom du partenaire récupéré depuis l'API
    theme: 'light',
    language: 'fr',
    autoRefresh: false,
    // Désactivé par défaut pour éviter les appels répétitifs
    refreshInterval: 30000,
    // 30 secondes
    autoInit: false,
    // Désactivé par défaut pour éviter les boucles
    onSuccess: null,
    onError: null,
    onStatusUpdate: null,
    onExpired: null,
    // Nouvelles options de sécurité
    enableSecurityLogs: true,
    validateInputs: true,
    maxRetries: 3,
    requestTimeout: 10000,
    // 10 secondes
    // Options d'initialisation sécurisée
    secureInit: false,
    secureInitUrl: function (_window$SunuIDConfig2, _window$SunuIDConfig3) {
      if ((_window$SunuIDConfig2 = window.SunuIDConfig) !== null && _window$SunuIDConfig2 !== void 0 && (_window$SunuIDConfig2 = _window$SunuIDConfig2.apiUrl) !== null && _window$SunuIDConfig2 !== void 0 && _window$SunuIDConfig2.includes('api.sunuid.fayma.sn')) {
        return 'https://api.sunuid.fayma.sn/secure-init.php';
      }
      return ((_window$SunuIDConfig3 = window.SunuIDConfig) === null || _window$SunuIDConfig3 === void 0 || (_window$SunuIDConfig3 = _window$SunuIDConfig3.apiUrl) === null || _window$SunuIDConfig3 === void 0 ? void 0 : _window$SunuIDConfig3.replace('/api', '')) + '/secure-init.php' || 'https://api.sunuid.fayma.sn/secure-init.php';
    }(),
    token: null,
    // Configuration pour forcer l'utilisation du serveur distant
    forceRemoteServer: true,
    useLocalFallback: false,
    // Nouvelles options pour les callbacks
    redirectAfterSuccess: null,
    verifySignature: false,
    tokenMaxAge: 300,
    // 5 minutes par défaut
    onAuthenticationSuccess: null,
    onAuthenticationError: null,
    state: null
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
      this.socket = null;
      this.initPromise = null;

      // DÉSACTIVÉ : Initialisation automatique pour éviter les boucles
      // L'utilisateur doit appeler init() manuellement
      console.log('🔧 SDK SunuID créé - Appelez init() manuellement');
    }

    /**
     * Initialisation du SDK
     */
    return _createClass(SunuID, [{
      key: "init",
      value: (function () {
        var _init = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
          return _regenerator().w(function (_context) {
            while (1) switch (_context.p = _context.n) {
              case 0:
                if (!this.isInitialized) {
                  _context.n = 1;
                  break;
                }
                console.log('⚠️ SDK déjà initialisé, ignoré');
                return _context.a(2);
              case 1:
                if (!this.initPromise) {
                  _context.n = 2;
                  break;
                }
                console.log('⚠️ Initialisation déjà en cours, attente...');
                return _context.a(2, this.initPromise);
              case 2:
                if (!this._initInProgress) {
                  _context.n = 3;
                  break;
                }
                console.log('⚠️ Initialisation en cours, ignoré');
                return _context.a(2);
              case 3:
                this._initInProgress = true;
                this.initPromise = this._doInit();
                _context.p = 4;
                _context.n = 5;
                return this.initPromise;
              case 5:
                _context.p = 5;
                this._initInProgress = false;
                return _context.f(5);
              case 6:
                return _context.a(2, this.initPromise);
            }
          }, _callee, this, [[4,, 5, 6]]);
        }));
        function init() {
          return _init.apply(this, arguments);
        }
        return init;
      }()
      /**
       * Initialisation interne du SDK
       */
      )
    }, {
      key: "_doInit",
      value: (function () {
        var _doInit2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
          var _t;
          return _regenerator().w(function (_context2) {
            while (1) switch (_context2.p = _context2.n) {
              case 0:
                _context2.p = 0;
                if (!this.handleCallback()) {
                  _context2.n = 1;
                  break;
                }
                console.log('✅ Callback traité, initialisation terminée');
                return _context2.a(2);
              case 1:
                if (!this.config.secureInit) {
                  _context2.n = 3;
                  break;
                }
                _context2.n = 2;
                return this.secureInit();
              case 2:
                _context2.n = 4;
                break;
              case 3:
                // Validation sécurisée des paramètres
                if (this.config.validateInputs) {
                  this.validateSecurityParams();
                }
              case 4:
                // Log de sécurité pour l'initialisation
                this.logSecurityEvent('SDK_INIT_START', {
                  apiUrl: this.config.apiUrl,
                  type: this.config.type,
                  secureInit: this.config.secureInit
                });

                // Récupérer les informations du partenaire depuis l'API
                _context2.n = 5;
                return this.fetchPartnerInfo();
              case 5:
                // Obscurcir les credentials dans les logs
                this.obfuscateCredentials();
                this.isInitialized = true;
                console.log('SunuID SDK initialisé avec succès');
                console.log('📋 Configuration SDK:', {
                  apiUrl: this.config.apiUrl,
                  type: this.config.type,
                  partnerName: this.config.partnerName,
                  clientId: this.config.clientId ? '***' + this.config.clientId.slice(-4) : 'null',
                  secretId: this.config.secretId ? '***' + this.config.secretId.slice(-4) : 'null',
                  secureInit: this.config.secureInit,
                  theme: this.config.theme
                });
                this.logSecurityEvent('SDK_INIT_SUCCESS');

                // Initialiser la connexion WebSocket
                this.initWebSocket();
                _context2.n = 7;
                break;
              case 6:
                _context2.p = 6;
                _t = _context2.v;
                this.logSecurityEvent('SDK_INIT_ERROR', {
                  error: _t.message
                });
                throw _t;
              case 7:
                return _context2.a(2);
            }
          }, _callee2, this, [[0, 6]]);
        }));
        function _doInit() {
          return _doInit2.apply(this, arguments);
        }
        return _doInit;
      }()
      /**
       * Initialisation sécurisée via PHP
       */
      )
    }, {
      key: "secureInit",
      value: (function () {
        var _secureInit = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
          var initData, response, result, decodedToken, _t2;
          return _regenerator().w(function (_context3) {
            while (1) switch (_context3.p = _context3.n) {
              case 0:
                _context3.p = 0;
                this.logSecurityEvent('SECURE_INIT_START');
                initData = {
                  type: this.config.type,
                  partnerName: this.config.partnerName,
                  theme: this.config.theme
                };
                _context3.n = 1;
                return fetch(this.config.secureInitUrl, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                  },
                  body: JSON.stringify(initData)
                });
              case 1:
                response = _context3.v;
                if (response.ok) {
                  _context3.n = 2;
                  break;
                }
                throw new Error("Erreur HTTP: ".concat(response.status));
              case 2:
                _context3.n = 3;
                return response.json();
              case 3:
                result = _context3.v;
                console.log('📋 Réponse initialisation sécurisée:', result);
                if (result.success) {
                  _context3.n = 4;
                  break;
                }
                throw new Error(result.error || 'Erreur lors de l\'initialisation sécurisée');
              case 4:
                // Stocker le token et les données sécurisées
                this.config.token = result.data.token;
                this.config.apiUrl = result.data.api_url;

                // Décoder le token pour récupérer les credentials
                decodedToken = this.decodeSecureToken(result.data.token);
                if (!decodedToken) {
                  _context3.n = 5;
                  break;
                }
                this.config.clientId = decodedToken.client_id;
                this.config.secretId = decodedToken.secret_id;
                _context3.n = 6;
                break;
              case 5:
                throw new Error('Impossible de décoder le token sécurisé');
              case 6:
                this.config.expiresIn = result.data.expires_in;
                this.config.maxRequests = result.data.max_requests;
                this.config.requestCount = 0;
                this.logSecurityEvent('SECURE_INIT_SUCCESS', {
                  expiresIn: result.data.expires_in,
                  maxRequests: result.data.max_requests
                });
                console.log('✅ Initialisation sécurisée réussie');
                _context3.n = 8;
                break;
              case 7:
                _context3.p = 7;
                _t2 = _context3.v;
                this.logSecurityEvent('SECURE_INIT_ERROR', {
                  error: _t2.message
                });
                throw new Error("\xC9chec de l'initialisation s\xE9curis\xE9e: ".concat(_t2.message));
              case 8:
                return _context3.a(2);
            }
          }, _callee3, this, [[0, 7]]);
        }));
        function secureInit() {
          return _secureInit.apply(this, arguments);
        }
        return secureInit;
      }()
      /**
       * Décoder le token sécurisé
       */
      )
    }, {
      key: "decodeSecureToken",
      value: function decodeSecureToken(token) {
        try {
          var parts = token.split('.');
          if (parts.length !== 2) {
            console.error('❌ Format de token invalide');
            return null;
          }
          var _parts = _slicedToArray(parts, 2),
            payload = _parts[0],
            signature = _parts[1];

          // Décoder le payload (base64)
          var decodedPayload = atob(payload);
          var tokenData = JSON.parse(decodedPayload);

          // Vérifier l'expiration
          if (tokenData.exp && tokenData.exp < Date.now() / 1000) {
            console.error('❌ Token expiré');
            return null;
          }
          console.log('✅ Token décodé avec succès');
          return tokenData;
        } catch (error) {
          console.error('❌ Erreur décodage token:', error);
          return null;
        }
      }

      /**
       * Initialiser la connexion WebSocket
       */
    }, {
      key: "initWebSocket",
      value: function initWebSocket() {
        var _this = this;
        try {
          // Vérifier si Socket.IO est disponible
          if (typeof io === 'undefined') {
            console.warn('⚠️ Socket.IO non disponible, WebSocket sera initialisé plus tard');
            // Réessayer après un délai
            setTimeout(function () {
              return _this.initWebSocket();
            }, 1000);
            return;
          }

          // Obtenir l'IP du client (simulation)
          var ip = this.getClientIP();

          // Initialiser la connexion WebSocket si elle n'existe pas
          if (!this.socket) {
            console.log('🌐 Initialisation Socket.IO...');
            this.socket = io('wss://samasocket.fayma.sn:9443', {
              query: {
                token: this.config.clientId,
                type: 'web',
                userId: this.config.clientId,
                username: ip
              },
              transports: ['websocket', 'polling']
            });

            // Gestion des événements WebSocket
            this.socket.on('connect', function () {
              console.log('🌐 WebSocket connecté avec succès');
              console.log('📊 Socket ID:', _this.socket.id);
              _this.socket.connected = true;
            });
            this.socket.on('disconnect', function (reason) {
              console.log('❌ WebSocket déconnecté:', reason);
              _this.socket.connected = false;
            });
            this.socket.on('connect_error', function (error) {
              console.error('❌ Erreur connexion WebSocket:', error);
              _this.socket.connected = false;
            });

            // Écouter les événements spécifiques
            this.socket.on('qr_status_update', function (data) {
              console.log('📱 Mise à jour statut QR reçue:', data);
              _this.handleQRStatusUpdate(data);
            });
            this.socket.on('qr_scan_success', function (data) {
              console.log('✅ Scan QR réussi reçu:', data);
              _this.handleQRScanSuccess(data);
            });
            this.socket.on('qr_expired', function (data) {
              console.log('⏰ QR expiré reçu:', data);
              _this.handleQRExpired(data);
            });

            // Écouter l'événement qr_scan_initiated spécifiquement
            this.socket.on('qr_scan_initiated', function (data) {
              console.log('🔍 QR Scan Initiated reçu:', data);
              _this.showQRLoader();
            });

            // Écouter l'événement message générique (fallback)
            this.socket.on('message', function (data) {
              console.log('📨 Message socket reçu:', data);
              if (data && data.type === 'qr_scan_initiated') {
                console.log('🔍 QR Scan Initiated détecté dans message:', data);
                _this.showQRLoader();
              }
            });

            // Écouter tous les événements socket pour le debugging
            this.socket.onAny = this.socket.onAny || function (eventName, callback) {
              // Fallback pour les versions de Socket.IO qui n'ont pas onAny
              console.log("\uD83C\uDF10 Socket Event [".concat(eventName, "]:"), callback);
            };

            // Logger tous les événements reçus
            this.socket.onAny(function (eventName) {
              for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                args[_key - 1] = arguments[_key];
              }
              console.log("\uD83C\uDF10 Socket Event [".concat(eventName, "]:"), args);
            });
          } else {
            console.log('🌐 WebSocket déjà connecté');
          }
        } catch (error) {
          console.error('❌ Erreur initialisation WebSocket:', error);
        }
      }

      /**
       * Obtenir l'IP du client (simulation)
       */
    }, {
      key: "getClientIP",
      value: function getClientIP() {
        // Simulation - en production, vous pourriez utiliser un service d'IP
        return '127.0.0.1';
      }

      /**
       * Obtenir le nom du type à partir du numéro
       */
    }, {
      key: "getTypeName",
      value: function getTypeName(type) {
        switch (type) {
          case 1:
            return 'KYC';
          case 2:
            return 'AUTH';
          case 3:
            return 'SIGNATURE';
          default:
            return "TYPE-".concat(type);
        }
      }

      /**
       * Validation sécurisée des paramètres
       */
    }, {
      key: "validateSecurityParams",
      value: function validateSecurityParams() {
        var errors = [];

        // Validation du clientId
        if (!this.config.clientId || typeof this.config.clientId !== 'string') {
          errors.push('clientId invalide ou manquant');
        } else if (this.config.clientId.length < 10) {
          errors.push('clientId trop court');
        }

        // Validation du secretId
        if (!this.config.secretId || typeof this.config.secretId !== 'string') {
          errors.push('secretId invalide ou manquant');
        } else if (this.config.secretId.length < 32) {
          errors.push('secretId trop court (minimum 32 caractères)');
        }

        // Validation de l'URL API
        if (!this.config.apiUrl || !this.isValidUrl(this.config.apiUrl)) {
          errors.push('apiUrl invalide');
        }

        // Validation du type
        if (![1, 2, 3].includes(this.config.type)) {
          errors.push('type invalide (doit être 1, 2 ou 3)');
        }
        if (errors.length > 0) {
          this.logSecurityEvent('VALIDATION_ERROR', {
            errors: errors
          });
          throw new Error("Param\xE8tres de s\xE9curit\xE9 invalides: ".concat(errors.join(', ')));
        }
        this.logSecurityEvent('VALIDATION_SUCCESS');
      }

      /**
       * Validation d'URL sécurisée
       */
    }, {
      key: "isValidUrl",
      value: function isValidUrl(string) {
        try {
          var url = new URL(string);
          return url.protocol === 'https:' || url.protocol === 'http:';
        } catch (_) {
          return false;
        }
      }

      /**
       * Logs de sécurité
       */
    }, {
      key: "logSecurityEvent",
      value: function logSecurityEvent(event) {
        var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        if (!this.config.enableSecurityLogs) return;
        var securityLog = {
          timestamp: new Date().toISOString(),
          event: event,
          data: data,
          userAgent: navigator.userAgent,
          url: window.location.href
        };
        console.warn('🔒 [SECURITY]', securityLog);

        // Stocker les logs de sécurité (optionnel)
        if (!window.SunuIDSecurityLogs) {
          window.SunuIDSecurityLogs = [];
        }
        window.SunuIDSecurityLogs.push(securityLog);
      }

      /**
       * Chiffrement simple des credentials (pour éviter l'exposition en clair)
       */
    }, {
      key: "obfuscateCredentials",
      value: function obfuscateCredentials() {
        // Stocker les vraies valeurs pour les logs de sécurité
        this.config.originalClientId = this.config.clientId;
        this.config.originalSecretId = this.config.secretId;

        // Créer des versions obfusquées pour l'affichage uniquement
        if (this.config.clientId) {
          this.config.clientIdDisplay = this.config.clientId.replace(/(.{3}).*(.{3})/, '$1***$2');
        }
        if (this.config.secretId) {
          this.config.secretIdDisplay = this.config.secretId.replace(/(.{4}).*(.{4})/, '$1***$2');
        }
      }

      /**
       * Validation des entrées utilisateur
       */
    }, {
      key: "sanitizeInput",
      value: function sanitizeInput(input) {
        if (typeof input !== 'string') return input;

        // Protection contre les injections XSS basiques
        return input.replace(/[<>]/g, '') // Supprimer les balises HTML
        .replace(/javascript:/gi, '') // Supprimer les protocoles dangereux
        .trim();
      }

      /**
       * Gérer la mise à jour du statut QR
       */
    }, {
      key: "handleQRStatusUpdate",
      value: function handleQRStatusUpdate(data) {
        console.log('📱 QR Status Update:', data);
        if (this.config.onStatusUpdate) {
          this.config.onStatusUpdate(data);
        }
      }

      /**
       * Gérer le succès du scan QR
       */
    }, {
      key: "handleQRScanSuccess",
      value: function handleQRScanSuccess(data) {
        console.log('✅ QR Scan Success reçu:', data);
        try {
          // Extraire les données d'authentification du format WebSocket
          var authData = this.extractAuthDataFromWebSocket(data);

          // Traiter l'authentification comme un callback
          this.processAuthentication(authData);

          // Afficher un message de succès
          this.showSuccessMessage(authData);

          // Appeler le callback de succès (pour compatibilité)
          if (this.config.onSuccess) {
            this.config.onSuccess(authData);
          }
          console.log('✅ Authentification WebSocket traitée avec succès');
        } catch (error) {
          console.error('❌ Erreur lors du traitement WebSocket:', error);

          // Appeler le callback d'erreur
          if (this.config.onAuthenticationError) {
            this.config.onAuthenticationError(error, data);
          }
        }
      }

      /**
       * Gérer l'expiration du QR
       */
    }, {
      key: "handleQRExpired",
      value: function handleQRExpired(data) {
        console.log('⏰ QR Expired:', data);
        if (this.config.onExpired) {
          this.config.onExpired(data);
        }
      }

      /**
       * Émettre un événement WebSocket
       */
    }, {
      key: "emitWebSocketEvent",
      value: function emitWebSocketEvent(event, data) {
        if (this.socket && this.socket.connected) {
          this.socket.emit(event, data);
          console.log("\uD83D\uDCE4 \xC9v\xE9nement WebSocket \xE9mis: ".concat(event), data);
        } else {
          console.warn('⚠️ WebSocket non connecté, impossible d\'émettre l\'événement:', event);
        }
      }

      /**
       * Obtenir le statut de la connexion WebSocket
       */
    }, {
      key: "getWebSocketStatus",
      value: function getWebSocketStatus() {
        if (!this.socket) {
          return 'not_initialized';
        }
        return this.socket.connected ? 'connected' : 'disconnected';
      }

      /**
       * Forcer l'initialisation WebSocket (si Socket.IO devient disponible plus tard)
       */
    }, {
      key: "forceWebSocketInit",
      value: function forceWebSocketInit() {
        if (typeof io !== 'undefined' && !this.socket) {
          console.log('🔄 Forçage de l\'initialisation WebSocket...');
          this.initWebSocket();
        }
      }

      /**
       * Générer un QR code avec le type configuré
       */
    }, {
      key: "generateQR",
      value: (function () {
        var _generateQR = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
          var containerId,
            options,
            connectionStatus,
            socketId,
            qrContent,
            partnerName,
            response,
            qrImageUrl,
            isLocal,
            _args4 = arguments,
            _t3,
            _t4;
          return _regenerator().w(function (_context4) {
            while (1) switch (_context4.p = _context4.n) {
              case 0:
                containerId = _args4.length > 0 && _args4[0] !== undefined ? _args4[0] : 'sunuid-qr-container';
                options = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : {};
                if (!this.initPromise) {
                  _context4.n = 2;
                  break;
                }
                _context4.n = 1;
                return this.initPromise;
              case 1:
                this.initPromise = null;
              case 2:
                if (this.isInitialized) {
                  _context4.n = 3;
                  break;
                }
                throw new Error('SunuID: SDK non initialisé');
              case 3:
                console.log('🎯 generateQR appelé avec containerId:', containerId);

                // Attendre que les connexions soient prêtes
                console.log('🔍 Attente connexions API et WebSocket...');
                _context4.p = 4;
                _context4.n = 5;
                return this.waitForConnections(5000);
              case 5:
                connectionStatus = _context4.v;
                // 5 secondes max
                console.log('✅ Connexions prêtes:', connectionStatus);
                _context4.n = 7;
                break;
              case 6:
                _context4.p = 6;
                _t3 = _context4.v;
                console.error('❌ Erreur connexions:', _t3.message);
                throw new Error('Connexions non disponibles - Impossible de générer le QR code');
              case 7:
                _context4.p = 7;
                // Utiliser uniquement le socketID comme contenu du QR
                socketId = this.socket ? this.socket.id : 'timeout-socket-id';
                qrContent = socketId;
                console.log('📄 Contenu QR préparé:', qrContent);
                console.log('🔌 Socket ID:', socketId);

                // Générer le QR avec le contenu complet
                partnerName = this.config.partnerName || 'Partner_unknown';
                _context4.n = 8;
                return this.makeRequest('/qr-generate', _objectSpread2({
                  type: this.config.type,
                  data: qrContent,
                  // Essayer data au lieu de content
                  label: "".concat(this.getTypeName(this.config.type), " ").concat(partnerName)
                }, options));
              case 8:
                response = _context4.v;
                if (!response.success) {
                  _context4.n = 11;
                  break;
                }
                // Debug: Afficher la structure complète de la réponse
                console.log('📋 Réponse QR API complète:', response);
                console.log('📋 Structure response.data:', response.data);

                // Construire l'URL complète du QR code
                qrImageUrl = response.data.qrCodeUrl; // Si l'URL est relative, la rendre absolue
                if (qrImageUrl && qrImageUrl.startsWith('/')) {
                  qrImageUrl = "".concat(this.config.apiUrl).concat(qrImageUrl);
                }

                // Vérifier si l'URL du QR code existe
                if (qrImageUrl) {
                  _context4.n = 10;
                  break;
                }
                console.warn('⚠️ qrCodeUrl non trouvé dans la réponse, recherche d\'alternatives...');

                // Essayer d'autres champs possibles
                qrImageUrl = response.data.qr_url || response.data.qrUrl || response.data.url || response.data.image_url || response.data.imageUrl;
                if (!qrImageUrl) {
                  _context4.n = 9;
                  break;
                }
                console.log('✅ URL QR trouvée dans un champ alternatif:', qrImageUrl);
                _context4.n = 10;
                break;
              case 9:
                console.error('❌ Aucune URL QR trouvée dans la réponse');
                throw new Error('URL du QR code non trouvée dans la réponse API');
              case 10:
                this.currentQRUrl = qrImageUrl;
                console.log('✅ QR code généré par API principale:', qrImageUrl);
                console.log('📄 Contenu QR final:', qrContent);
                console.log('🏷️ Label QR:', response.data.label || 'N/A');
                console.log('🆔 Session ID:', response.data.sessionId || 'N/A');

                // Afficher le QR code
                this.displayQRCode(containerId, qrImageUrl, this.config.type, options);
                this.startAutoRefresh(containerId, this.config.type, options);

                // Émettre un événement WebSocket pour la génération du QR
                this.emitWebSocketEvent('qr_generated', {
                  type: this.config.type,
                  qrCodeUrl: qrImageUrl,
                  socketId: socketId,
                  qrContent: qrContent,
                  label: response.data.label,
                  sessionId: response.data.sessionId,
                  timestamp: Date.now()
                });
                return _context4.a(2, _objectSpread2(_objectSpread2({}, response.data), {}, {
                  qrCodeUrl: qrImageUrl,
                  qrContent: qrContent,
                  label: response.data.label,
                  sessionId: response.data.sessionId
                }));
              case 11:
                throw new Error(response.message || 'Erreur lors de la génération du QR code');
              case 12:
                _context4.n = 14;
                break;
              case 13:
                _context4.p = 13;
                _t4 = _context4.v;
                console.error('Erreur API détectée:', _t4.message);
                console.error('Stack trace complet:', _t4.stack);
                console.error('Configuration SDK:', {
                  apiUrl: this.config.apiUrl,
                  type: this.config.type,
                  secureInit: this.config.secureInit,
                  clientId: this.config.clientId ? '***' + this.config.clientId.slice(-4) : 'null',
                  secretId: this.config.secretId ? '***' + this.config.secretId.slice(-4) : 'null'
                });

                // Fallback vers le service local seulement si activé
                if (this.config.useLocalFallback) {
                  console.log('🔍 Vérification fallback local...');
                  console.log('🔍 Hostname:', window.location.hostname);
                  console.log('🔍 Protocol:', window.location.protocol);
                  console.log('🔍 URL complète:', window.location.href);
                  isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.protocol === 'file:';
                  console.log('🔍 Est local:', isLocal);
                  if (isLocal) {
                    console.log('🔄 Tentative fallback vers service QR local...');
                    console.log('❌ Fallback local non implémenté - utilisation serveur distant uniquement');
                  } else {
                    console.log('❌ Pas en local, pas de fallback');
                  }
                } else {
                  console.log('🔒 Fallback local désactivé, utilisation serveur distant uniquement');
                }
                console.log('Affichage du message "Service non disponible" pour type ' + this.config.type);
                this.displayServiceUnavailable(containerId, this.config.type);
                throw new Error('Service non disponible');
              case 14:
                return _context4.a(2);
            }
          }, _callee4, this, [[7, 13], [4, 6]]);
        }));
        function generateQR() {
          return _generateQR.apply(this, arguments);
        }
        return generateQR;
      }()
      /**
       * Générer un QR code avec un type personnalisé
       */
      )
    }, {
      key: "generateCustomQR",
      value: (function () {
        var _generateCustomQR = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(containerId, type) {
          var options,
            response,
            imageBaseUrl,
            qrImageUrl,
            _args5 = arguments,
            _t5;
          return _regenerator().w(function (_context5) {
            while (1) switch (_context5.p = _context5.n) {
              case 0:
                options = _args5.length > 2 && _args5[2] !== undefined ? _args5[2] : {};
                if (!this.initPromise) {
                  _context5.n = 2;
                  break;
                }
                _context5.n = 1;
                return this.initPromise;
              case 1:
                this.initPromise = null;
              case 2:
                if (this.isInitialized) {
                  _context5.n = 3;
                  break;
                }
                throw new Error('SunuID: SDK non initialisé');
              case 3:
                _context5.p = 3;
                _context5.n = 4;
                return this.makeRequest('/qr-generate', _objectSpread2({
                  type: type
                }, options));
              case 4:
                response = _context5.v;
                if (!response.success) {
                  _context5.n = 5;
                  break;
                }
                // Construire l'URL complète de l'image QR avec la base URL pour les images
                imageBaseUrl = 'https://sunuid.fayma.sn';
                qrImageUrl = "".concat(imageBaseUrl).concat(response.data.qrcode);
                this.displayQRCode(containerId, qrImageUrl, type, options);

                // Le QR code est déjà généré par l'API principale
                console.log('✅ QR code personnalisé généré par API principale:', qrImageUrl);
                console.log('📄 Code de session:', response.data.code);
                console.log('🆔 Service ID:', response.data.service_id);
                this.startAutoRefresh(containerId, type, options);
                return _context5.a(2, _objectSpread2(_objectSpread2({}, response.data), {}, {
                  qrCodeUrl: qrImageUrl,
                  sessionId: response.data.service_id
                }));
              case 5:
                throw new Error(response.message || 'Erreur lors de la génération du QR code');
              case 6:
                _context5.n = 8;
                break;
              case 7:
                _context5.p = 7;
                _t5 = _context5.v;
                console.error('Erreur API détectée:', _t5.message);
                console.error('Stack trace complet:', _t5.stack);
                console.error('Configuration SDK (Custom):', {
                  apiUrl: this.config.apiUrl,
                  type: type,
                  secureInit: this.config.secureInit,
                  clientId: this.config.clientId ? '***' + this.config.clientId.slice(-4) : 'null',
                  secretId: this.config.secretId ? '***' + this.config.secretId.slice(-4) : 'null'
                });
                console.log('Affichage du message "Service non disponible" pour type ' + type);
                this.displayServiceUnavailable(containerId, type);
                throw new Error('Service non disponible');
              case 8:
                return _context5.a(2);
            }
          }, _callee5, this, [[3, 7]]);
        }));
        function generateCustomQR(_x, _x2) {
          return _generateCustomQR.apply(this, arguments);
        }
        return generateCustomQR;
      }() // Alias pour maintenir la compatibilité
      )
    }, {
      key: "generateAuthQR",
      value: function () {
        var _generateAuthQR = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(containerId) {
          var options,
            _args6 = arguments;
          return _regenerator().w(function (_context6) {
            while (1) switch (_context6.n) {
              case 0:
                options = _args6.length > 1 && _args6[1] !== undefined ? _args6[1] : {};
                return _context6.a(2, this.generateQR(containerId, options));
            }
          }, _callee6, this);
        }));
        function generateAuthQR(_x3) {
          return _generateAuthQR.apply(this, arguments);
        }
        return generateAuthQR;
      }()
    }, {
      key: "generateKYCQR",
      value: function () {
        var _generateKYCQR = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(containerId) {
          var options,
            originalType,
            _args7 = arguments;
          return _regenerator().w(function (_context7) {
            while (1) switch (_context7.p = _context7.n) {
              case 0:
                options = _args7.length > 1 && _args7[1] !== undefined ? _args7[1] : {};
                // Sauvegarder le type actuel
                originalType = this.config.type; // Changer temporairement le type pour KYC
                this.config.type = 1;
                _context7.p = 1;
                _context7.n = 2;
                return this.generateQR(containerId, options);
              case 2:
                return _context7.a(2, _context7.v);
              case 3:
                _context7.p = 3;
                // Restaurer le type original
                this.config.type = originalType;
                return _context7.f(3);
              case 4:
                return _context7.a(2);
            }
          }, _callee7, this, [[1,, 3, 4]]);
        }));
        function generateKYCQR(_x4) {
          return _generateKYCQR.apply(this, arguments);
        }
        return generateKYCQR;
      }()
    }, {
      key: "generateSignatureQR",
      value: function () {
        var _generateSignatureQR = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(containerId) {
          var options,
            originalType,
            _args8 = arguments;
          return _regenerator().w(function (_context8) {
            while (1) switch (_context8.p = _context8.n) {
              case 0:
                options = _args8.length > 1 && _args8[1] !== undefined ? _args8[1] : {};
                // Sauvegarder le type actuel
                originalType = this.config.type; // Changer temporairement le type pour Signature
                this.config.type = 3;
                _context8.p = 1;
                _context8.n = 2;
                return this.generateQR(containerId, options);
              case 2:
                return _context8.a(2, _context8.v);
              case 3:
                _context8.p = 3;
                // Restaurer le type original
                this.config.type = originalType;
                return _context8.f(3);
              case 4:
                return _context8.a(2);
            }
          }, _callee8, this, [[1,, 3, 4]]);
        }));
        function generateSignatureQR(_x5) {
          return _generateSignatureQR.apply(this, arguments);
        }
        return generateSignatureQR;
      }()
      /**
       * Vérifier le statut d'un QR code
       */
    }, {
      key: "checkQRStatus",
      value: (function () {
        var _checkQRStatus = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9(sessionId) {
          var response, _t6;
          return _regenerator().w(function (_context9) {
            while (1) switch (_context9.p = _context9.n) {
              case 0:
                if (this.isInitialized) {
                  _context9.n = 1;
                  break;
                }
                throw new Error('SunuID: SDK non initialisé');
              case 1:
                _context9.p = 1;
                _context9.n = 2;
                return this.makeRequest('/qr-status', {
                  serviceId: sessionId
                });
              case 2:
                response = _context9.v;
                if (!response.success) {
                  _context9.n = 3;
                  break;
                }
                return _context9.a(2, response.data);
              case 3:
                throw new Error(response.message || 'Erreur lors de la vérification du statut');
              case 4:
                _context9.n = 6;
                break;
              case 5:
                _context9.p = 5;
                _t6 = _context9.v;
                this.handleError(_t6);
                throw _t6;
              case 6:
                return _context9.a(2);
            }
          }, _callee9, this, [[1, 5]]);
        }));
        function checkQRStatus(_x6) {
          return _checkQRStatus.apply(this, arguments);
        }
        return checkQRStatus;
      }()
      /**
       * Générer un QR code avec un contenu spécifique
       */
      )
    }, {
      key: "generateQRWithContent",
      value: (function () {
        var _generateQRWithContent = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0(content, containerId, type) {
          var options,
            localQRUrl,
            _args0 = arguments,
            _t7;
          return _regenerator().w(function (_context0) {
            while (1) switch (_context0.p = _context0.n) {
              case 0:
                options = _args0.length > 3 && _args0[3] !== undefined ? _args0[3] : {};
                console.log('🎨 Génération QR avec contenu:', content);
                _context0.p = 1;
                if (!(window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.protocol === 'file:')) {
                  _context0.n = 3;
                  break;
                }
                console.log('🏠 Utilisation service QR local...');
                _context0.n = 2;
                return this.generateQRLocal(content, containerId, type, options);
              case 2:
                localQRUrl = _context0.v;
                if (!localQRUrl) {
                  _context0.n = 3;
                  break;
                }
                return _context0.a(2, localQRUrl);
              case 3:
                // Fallback vers le service QR distant
                console.log('🌐 Utilisation service QR distant...');
                _context0.n = 4;
                return this.generateQRRemote(content, containerId, type, options);
              case 4:
                return _context0.a(2, _context0.v);
              case 5:
                _context0.p = 5;
                _t7 = _context0.v;
                console.error('❌ Erreur génération QR:', _t7);
                // Fallback vers affichage simple du contenu
                this.displayQRContent(containerId, content, type, options);
                return _context0.a(2, null);
            }
          }, _callee0, this, [[1, 5]]);
        }));
        function generateQRWithContent(_x7, _x8, _x9) {
          return _generateQRWithContent.apply(this, arguments);
        }
        return generateQRWithContent;
      }()
      /**
       * Générer QR code avec service local
       */
      )
    }, {
      key: "generateQRLocal",
      value: (function () {
        var _generateQRLocal = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1(content, containerId, type) {
          var options,
            response,
            data,
            qrUrl,
            _args1 = arguments,
            _t8;
          return _regenerator().w(function (_context1) {
            while (1) switch (_context1.p = _context1.n) {
              case 0:
                options = _args1.length > 3 && _args1[3] !== undefined ? _args1[3] : {};
                _context1.p = 1;
                _context1.n = 2;
                return fetch('http://localhost:8000/api/generate/text', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                  },
                  body: "text=".concat(encodeURIComponent(content), "&size=300")
                });
              case 2:
                response = _context1.v;
                if (!response.ok) {
                  _context1.n = 4;
                  break;
                }
                _context1.n = 3;
                return response.json();
              case 3:
                data = _context1.v;
                qrUrl = "data:image/png;base64,".concat(data.qrcode);
                this.displayQRCode(containerId, qrUrl, type, options);
                return _context1.a(2, qrUrl);
              case 4:
                _context1.n = 6;
                break;
              case 5:
                _context1.p = 5;
                _t8 = _context1.v;
                console.log('❌ Service QR local non disponible:', _t8.message);
              case 6:
                return _context1.a(2, null);
            }
          }, _callee1, this, [[1, 5]]);
        }));
        function generateQRLocal(_x0, _x1, _x10) {
          return _generateQRLocal.apply(this, arguments);
        }
        return generateQRLocal;
      }()
      /**
       * Générer QR code avec service distant
       */
      )
    }, {
      key: "generateQRRemote",
      value: (function () {
        var _generateQRRemote = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10(content, containerId, type) {
          var options,
            response,
            data,
            qrUrl,
            _args10 = arguments,
            _t9;
          return _regenerator().w(function (_context10) {
            while (1) switch (_context10.p = _context10.n) {
              case 0:
                options = _args10.length > 3 && _args10[3] !== undefined ? _args10[3] : {};
                _context10.p = 1;
                _context10.n = 2;
                return fetch('https://api.sunuid.fayma.sn/qr-generate', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    text: content,
                    size: 300,
                    type: type
                  })
                });
              case 2:
                response = _context10.v;
                if (!response.ok) {
                  _context10.n = 4;
                  break;
                }
                _context10.n = 3;
                return response.json();
              case 3:
                data = _context10.v;
                qrUrl = "data:image/png;base64,".concat(data.qrcode);
                this.displayQRCode(containerId, qrUrl, type, options);
                return _context10.a(2, qrUrl);
              case 4:
                _context10.n = 6;
                break;
              case 5:
                _context10.p = 5;
                _t9 = _context10.v;
                console.error('❌ Erreur service QR distant:', _t9);
              case 6:
                // Fallback vers affichage du contenu
                this.displayQRContent(containerId, content, type, options);
                return _context10.a(2, null);
            }
          }, _callee10, this, [[1, 5]]);
        }));
        function generateQRRemote(_x11, _x12, _x13) {
          return _generateQRRemote.apply(this, arguments);
        }
        return generateQRRemote;
      }()
      /**
       * Afficher le contenu QR en texte (fallback)
       */
      )
    }, {
      key: "displayQRContent",
      value: function displayQRContent(containerId, content, type) {
        var container = document.getElementById(containerId);
        if (!container) {
          throw new Error("Conteneur avec l'ID \"".concat(containerId, "\" non trouv\xE9"));
        }
        var typeName = this.getTypeName(type);
        container.innerHTML = "\n                <div class=\"sunuid-qr-code\">\n                    <div class=\"sunuid-qr-header\">\n                        <h3>".concat(typeName, "</h3>\n                    </div>\n                    <div class=\"sunuid-qr-content\" style=\"text-align: center; padding: 20px; background: #f8f9fa; border: 1px solid #dee2e6; border-radius: 5px; margin: 10px 0;\">\n                        <p><strong>Contenu QR Code:</strong></p>\n                        <p style=\"font-family: monospace; font-size: 14px; word-break: break-all;\">").concat(content, "</p>\n                    </div>\n                    <div class=\"sunuid-qr-instructions\">\n                        <p>Contenu QR g\xE9n\xE9r\xE9 avec le format: {type}-{code}-{socketid}</p>\n                    </div>\n                </div>\n            ");
        console.log('✅ Contenu QR affiché:', content);
      }

      /**
       * Afficher un QR code dans un conteneur
       */
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

        // Afficher l'image QR avec les informations
        var typeName = this.getTypeName(type);
        qrElement.innerHTML = "\n                <div class=\"sunuid-qr-header\">\n                    <h3>".concat(type === 1 ? 'Vérification KYC' : type === 2 ? 'Authentification' : type === 3 ? 'Signature' : 'Service Type ' + type, "</h3>\n                </div>\n                <div class=\"sunuid-qr-image\">\n                    <img src=\"").concat(qrUrl, "\" alt=\"QR Code ").concat(typeName, "\" style=\"max-width: 300px; border: 1px solid #ddd; border-radius: 5px;\" />\n                </div>\n               \n            ");
        container.appendChild(qrElement);

        // Appliquer le thème
        this.applyTheme(options.theme || this.config.theme);
        console.log('✅ QR code affiché:', qrUrl);
      }

      /**
       * Générer un QR code personnalisé avec PHP Endroid
       */
    }, {
      key: "generateCustomQRCode",
      value: (function () {
        var _generateCustomQRCode = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee11(content, label) {
          var qrContainer,
            _t0;
          return _regenerator().w(function (_context11) {
            while (1) switch (_context11.p = _context11.n) {
              case 0:
                console.log('🎨 Début génération QR personnalisé...');
                console.log('📄 Contenu:', content);
                console.log('🏷️ Label:', label);

                // Chercher le conteneur QR
                qrContainer = document.getElementById('sunuid-qr-container');
                if (!qrContainer) {
                  qrContainer = document.getElementById('qr-container');
                }
                if (qrContainer) {
                  _context11.n = 1;
                  break;
                }
                console.error('❌ QR container not found');
                return _context11.a(2);
              case 1:
                console.log('✅ QR container trouvé');

                // Nettoyer le conteneur
                qrContainer.innerHTML = '<div style="text-align: center; padding: 20px;"><p>Génération QR code...</p></div>';
                _context11.p = 2;
                // Utiliser directement l'API principale (plus fiable)
                console.log('🎨 Tentative génération via API principale...');
                _context11.n = 3;
                return this.generateQRPHP(content, label, qrContainer);
              case 3:
                console.log('✅ QR code généré avec succès');
                _context11.n = 5;
                break;
              case 4:
                _context11.p = 4;
                _t0 = _context11.v;
                console.error('❌ Erreur génération API:', _t0);

                // Fallback final : image par défaut
                console.log('⚠️ Affichage image par défaut');
                this.displayDefaultQR(qrContainer, content, label);
              case 5:
                return _context11.a(2);
            }
          }, _callee11, this, [[2, 4]]);
        }));
        function generateCustomQRCode(_x14, _x15) {
          return _generateCustomQRCode.apply(this, arguments);
        }
        return generateCustomQRCode;
      }()
      /**
       * Générer un QR code côté client (méthode principale)
       */
      )
    }, {
      key: "generateQRClientSide",
      value: (function () {
        var _generateQRClientSide = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee12(content, label, qrContainer) {
          var _this2 = this;
          var canvas, ctx;
          return _regenerator().w(function (_context12) {
            while (1) switch (_context12.n) {
              case 0:
                _context12.n = 1;
                return this.ensureQRCodeLibrary();
              case 1:
                if (!(typeof QRCode === 'undefined')) {
                  _context12.n = 2;
                  break;
                }
                throw new Error('QRCode library non disponible');
              case 2:
                // Créer un canvas
                canvas = document.createElement('canvas');
                canvas.width = 300;
                canvas.height = 320;
                ctx = canvas.getContext('2d'); // Fond blanc
                ctx.fillStyle = '#FFFFFF';
                ctx.fillRect(0, 0, 300, 320);

                // Générer le QR code
                return _context12.a(2, new Promise(function (resolve, reject) {
                  QRCode.toCanvas(canvas, content, {
                    width: 280,
                    margin: 10,
                    color: {
                      dark: '#000000',
                      light: '#FFFFFF'
                    }
                  }, function (error) {
                    if (error) {
                      reject(error);
                      return;
                    }

                    // Ajouter le label
                    ctx.fillStyle = '#333333';
                    ctx.font = 'bold 14px Arial';
                    ctx.textAlign = 'center';
                    ctx.fillText(label, 150, 305);

                    // Convertir en data URL
                    var dataUrl = canvas.toDataURL('image/png');

                    // Stocker l'URL
                    _this2.currentQRUrl = dataUrl;

                    // Afficher le QR code
                    qrContainer.innerHTML = "\n                        <div style=\"text-align: center; padding: 20px;\">\n                            <img src=\"".concat(dataUrl, "\" alt=\"QR Code\" style=\"max-width: 300px; border: 2px solid #ddd; border-radius: 10px;\">\n                        </div>\n                    ");

                    // Afficher les instructions
                    _this2.showQRInstructions(qrContainer);
                    resolve();
                  });
                }));
            }
          }, _callee12, this);
        }));
        function generateQRClientSide(_x16, _x17, _x18) {
          return _generateQRClientSide.apply(this, arguments);
        }
        return generateQRClientSide;
      }()
      /**
       * Générer un QR code via endpoint PHP (fallback)
       */
      )
    }, {
      key: "generateQRPHP",
      value: (function () {
        var _generateQRPHP = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee13(content, label, qrContainer) {
          var qrGeneratorUrl, requestBody, contentType, response, responseData, qrImageUrl, imageBaseUrl;
          return _regenerator().w(function (_context13) {
            while (1) switch (_context13.n) {
              case 0:
                // Construire l'URL - Utiliser l'API principale qui fonctionne

                if (this.config.forceRemoteServer) {
                  qrGeneratorUrl = 'https://api.sunuid.fayma.sn/qr-generate';
                } else if (this.config.apiUrl.includes('api.sunuid.fayma.sn')) {
                  qrGeneratorUrl = 'https://api.sunuid.fayma.sn/qr-generate';
                } else if (this.config.apiUrl.includes('localhost') || this.config.apiUrl.includes('127.0.0.1')) {
                  qrGeneratorUrl = 'http://localhost:8000/api/generate/text';
                } else {
                  qrGeneratorUrl = this.config.apiUrl + '/qr-generate';
                }
                console.log('🔗 URL QR Generator:', qrGeneratorUrl);

                // Adapter le format selon l'URL

                if (qrGeneratorUrl.includes('localhost:8000')) {
                  // Service local - format form-data
                  contentType = 'application/x-www-form-urlencoded';
                  requestBody = new URLSearchParams({
                    text: content,
                    size: 300,
                    margin: 10,
                    foreground_color: '000000',
                    background_color: 'FFFFFF'
                  });
                } else {
                  // Service distant - format JSON avec les paramètres de l'API principale
                  contentType = 'application/json';
                  requestBody = JSON.stringify({
                    type: this.config.type,
                    client_id: this.config.clientId,
                    secret_id: this.config.secretId,
                    content: content,
                    label: label
                  });
                }
                _context13.n = 1;
                return fetch(qrGeneratorUrl, {
                  method: 'POST',
                  headers: {
                    'Content-Type': contentType,
                    'Accept': 'application/json'
                  },
                  body: requestBody
                });
              case 1:
                response = _context13.v;
                if (response.ok) {
                  _context13.n = 2;
                  break;
                }
                throw new Error("Erreur HTTP: ".concat(response.status));
              case 2:
                _context13.n = 3;
                return response.json();
              case 3:
                responseData = _context13.v;
                if (responseData.success) {
                  _context13.n = 4;
                  break;
                }
                throw new Error("Erreur QR: ".concat(responseData.error));
              case 4:
                if (qrGeneratorUrl.includes('localhost:8000')) {
                  // Service local
                  qrImageUrl = responseData.data_uri;
                } else {
                  // Service distant - utiliser le format de l'API principale
                  imageBaseUrl = 'https://sunuid.fayma.sn';
                  qrImageUrl = "".concat(imageBaseUrl).concat(responseData.data.qrcode);
                }

                // Stocker l'URL
                this.currentQRUrl = qrImageUrl;

                // Afficher le QR code
                qrContainer.innerHTML = "\n                 <div style=\"text-align: center; padding: 20px;\">\n                     <img src=\"".concat(qrImageUrl, "\" alt=\"QR Code\" style=\"max-width: 300px; border: 2px solid #ddd; border-radius: 10px;\">\n                 </div>\n             ");

                // Afficher les instructions
                this.showQRInstructions(qrContainer);
              case 5:
                return _context13.a(2);
            }
          }, _callee13, this);
        }));
        function generateQRPHP(_x19, _x20, _x21) {
          return _generateQRPHP.apply(this, arguments);
        }
        return generateQRPHP;
      }()
      /**
       * Afficher une image QR par défaut (fallback final)
       */
      )
    }, {
      key: "displayDefaultQR",
      value: function displayDefaultQR(qrContainer, content, label) {
        qrContainer.innerHTML = "\n                <div style=\"text-align: center; padding: 20px; color: #666;\">\n                    <div style=\"width: 300px; height: 300px; background: #f0f0f0; border: 2px solid #ddd; border-radius: 10px; display: flex; align-items: center; justify-content: center; margin: 0 auto;\">\n                        <div>\n                            <p style=\"font-size: 24px; margin: 0;\">\uD83D\uDCF1</p>\n                            <p style=\"font-size: 14px; margin: 10px 0 0 0;\">QR Code</p>\n                        </div>\n                    </div>\n                    <p style=\"margin-top: 10px; font-size: 12px;\">".concat(label, "</p>\n                    <p style=\"font-size: 10px; color: #999; margin-top: 5px;\">Contenu: ").concat(content, "</p>\n                </div>\n            ");
      }

      /**
       * S'assurer que la bibliothèque QRCode est disponible
       */
    }, {
      key: "ensureQRCodeLibrary",
      value: (function () {
        var _ensureQRCodeLibrary = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee14() {
          return _regenerator().w(function (_context14) {
            while (1) switch (_context14.n) {
              case 0:
                if (!(typeof QRCode !== 'undefined')) {
                  _context14.n = 1;
                  break;
                }
                console.log('✅ QRCode library déjà disponible');
                return _context14.a(2, true);
              case 1:
                console.log('📦 Chargement QRCode library...');
                return _context14.a(2, new Promise(function (resolve, reject) {
                  var script = document.createElement('script');
                  script.src = 'https://cdn.jsdelivr.net/npm/qrcode@1.5.3/lib/browser.min.js';
                  script.onload = function () {
                    setTimeout(function () {
                      if (typeof QRCode !== 'undefined') {
                        console.log('✅ QRCode library chargée');
                        resolve(true);
                      } else {
                        console.error('❌ QRCode non disponible après chargement');
                        reject(new Error('QRCode library non disponible après chargement'));
                      }
                    }, 200);
                  };
                  script.onerror = function () {
                    console.error('❌ Erreur chargement QRCode library');
                    reject(new Error('Erreur chargement QRCode library'));
                  };
                  document.head.appendChild(script);
                }));
            }
          }, _callee14);
        }));
        function ensureQRCodeLibrary() {
          return _ensureQRCodeLibrary.apply(this, arguments);
        }
        return ensureQRCodeLibrary;
      }()
      /**
       * Afficher les instructions pour le QR code
       */
      )
    }, {
      key: "showQRInstructions",
      value: function showQRInstructions(qrContainer) {
        var instructionsElement = qrContainer.parentElement.querySelector('.sunuid-qr-instructions');
        var statusElement = qrContainer.parentElement.querySelector('.sunuid-qr-status');
        if (instructionsElement) {
          instructionsElement.style.display = 'block';
          instructionsElement.classList.add('sunuid-qr-ready');
        }
        if (statusElement) {
          statusElement.style.display = 'block';
          statusElement.classList.add('sunuid-qr-ready');
        }
      }

      /**
       * Ajouter le logo au centre du QR code
       */
    }, {
      key: "addLogoToCenter",
      value: function addLogoToCenter(ctx, x, y, width, height) {
        try {
          // Créer une image pour le logo
          var logo = new Image();
          logo.onload = function () {
            var logoSize = 40;
            var logoX = x + (width - logoSize) / 2;
            var logoY = y + (width - logoSize) / 2;

            // Dessiner un fond blanc pour le logo
            ctx.fillStyle = 'white';
            ctx.fillRect(logoX - 2, logoY - 2, logoSize + 4, logoSize + 4);

            // Dessiner le logo
            ctx.drawImage(logo, logoX, logoY, logoSize, logoSize);
          };
          logo.src = 'src/logoqr.png';
        } catch (error) {
          console.warn('Logo non disponible:', error);
        }
      }

      /**
       * Afficher l'image de fallback
       */
    }, {
      key: "displayFallbackImage",
      value: function displayFallbackImage() {
        console.log('⚠️ Affichage de l\'image de fallback');
        var qrContainer = document.getElementById('sunuid-qr-container');
        if (qrContainer) {
          qrContainer.innerHTML = "\n                    <div style=\"text-align: center; padding: 20px; color: #666;\">\n                        <p>\u26A0\uFE0F G\xE9n\xE9ration QR personnalis\xE9 non disponible</p>\n                        <p>Utilisation de l'image par d\xE9faut</p>\n                        <p><strong>Debug:</strong> QRCode disponible: ".concat(typeof QRCode !== 'undefined', "</p>\n                        <p><strong>Debug:</strong> Container trouv\xE9: ").concat(qrContainer !== null, "</p>\n                    </div>\n                ");
        }
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
        container.innerHTML = "\n                <div class=\"sunuid-service-unavailable\" style=\"\n                    text-align: center;\n                    padding: 40px 20px;\n                    background: #f8f9fa;\n                    border: 2px dashed #dee2e6;\n                    border-radius: 10px;\n                    color: #6c757d;\n                    font-family: Arial, sans-serif;\n                \">\n                    <div style=\"font-size: 48px; margin-bottom: 20px;\">\u26A0\uFE0F</div>\n                    <h3 style=\"margin: 0 0 10px 0; color: #495057;\">Service Non Disponible</h3>\n                    <p style=\"margin: 0; font-size: 14px;\">\n                        Le service d'authentification est temporairement indisponible.<br>\n                        Veuillez r\xE9essayer plus tard.\n                    </p>\n                    <div style=\"margin-top: 20px; font-size: 12px; color: #adb5bd;\">\n                        Type: ".concat(String(type).toUpperCase(), "\n                    </div>\n                </div>\n            ");
      }

      /**
       * Rafraîchir un QR code
       */
    }, {
      key: "refreshQR",
      value: (function () {
        var _refreshQR = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee15(containerId) {
          var options,
            result,
            _result,
            _args15 = arguments,
            _t1;
          return _regenerator().w(function (_context15) {
            while (1) switch (_context15.p = _context15.n) {
              case 0:
                options = _args15.length > 1 && _args15[1] !== undefined ? _args15[1] : {};
                _context15.p = 1;
                if (!this.currentQRUrl) {
                  _context15.n = 3;
                  break;
                }
                console.log('🔄 Vérification du statut du QR code existant...');

                // Option 1: Vérifier le statut du QR code via l'API
                // (à implémenter si l'API le supporte)

                // Option 2: Régénérer le QR code seulement si nécessaire
                // Pour l'instant, on régénère pour s'assurer qu'il est à jour
                _context15.n = 2;
                return this.generateQR(containerId, options);
              case 2:
                result = _context15.v;
                return _context15.a(2, result);
              case 3:
                console.log('🔄 Pas de QR code existant, génération d\'un nouveau...');
                _context15.n = 4;
                return this.generateQR(containerId, options);
              case 4:
                _result = _context15.v;
                return _context15.a(2, _result);
              case 5:
                _context15.n = 7;
                break;
              case 6:
                _context15.p = 6;
                _t1 = _context15.v;
                console.error('Erreur lors du rafraîchissement:', _t1.message);
                this.displayServiceUnavailable(containerId, this.config.type);
                throw _t1;
              case 7:
                return _context15.a(2);
            }
          }, _callee15, this, [[1, 6]]);
        }));
        function refreshQR(_x22) {
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
        var _this3 = this;
        if (!this.config.autoRefresh) return;

        // Arrêter le timer existant s'il y en a un
        if (this.refreshTimer) {
          clearInterval(this.refreshTimer);
          console.log('🔄 Timer de rafraîchissement précédent arrêté');
        }
        this.refreshTimer = setInterval(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee16() {
          var _t10;
          return _regenerator().w(function (_context16) {
            while (1) switch (_context16.p = _context16.n) {
              case 0:
                _context16.p = 0;
                console.log('🔄 Rafraîchissement automatique du QR code...');
                _context16.n = 1;
                return _this3.refreshQR(containerId, type, options);
              case 1:
                _context16.n = 3;
                break;
              case 2:
                _context16.p = 2;
                _t10 = _context16.v;
                console.warn('Erreur lors du rafraîchissement automatique:', _t10);
              case 3:
                return _context16.a(2);
            }
          }, _callee16, null, [[0, 2]]);
        })), this.config.refreshInterval);
        console.log("\uD83D\uDD04 Timer de rafra\xEEchissement d\xE9marr\xE9 (".concat(this.config.refreshInterval, "ms)"));
      }

      /**
       * Démarrer le timer de compte à rebours
       */

      /**
       * Effectuer une requête API sécurisée
       */
    }, {
      key: "makeRequest",
      value: (function () {
        var _makeRequest = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee17(endpoint, data) {
          var _window$SunuIDConfig4,
            _window$SunuIDConfig5,
            _this4 = this;
          var sanitizedData, endpointPath, url, retryCount, maxRetries, _loop, _ret;
          return _regenerator().w(function (_context18) {
            while (1) switch (_context18.n) {
              case 0:
                if (this.isInitialized) {
                  _context18.n = 1;
                  break;
                }
                this.logSecurityEvent('REQUEST_BEFORE_INIT', {
                  endpoint: endpoint
                });
                throw new Error('SDK non initialisé');
              case 1:
                if (!this.config.secureInit) {
                  _context18.n = 2;
                  break;
                }
                this.config.requestCount++;
                if (!(this.config.requestCount > this.config.maxRequests)) {
                  _context18.n = 2;
                  break;
                }
                this.logSecurityEvent('API_REQUEST_LIMIT_EXCEEDED', {
                  requestCount: this.config.requestCount,
                  maxRequests: this.config.maxRequests
                });
                throw new Error('Limite de requêtes dépassée');
              case 2:
                // Sanitisation des données
                sanitizedData = this.sanitizeRequestData(data); // Debug: Afficher les données envoyées
                console.log('🔍 Debug makeRequest - endpoint:', endpoint);
                console.log('🔍 Debug makeRequest - apiUrl:', this.config.apiUrl);
                console.log('🔍 Debug makeRequest - url:', "".concat(this.config.apiUrl).concat(endpoint));
                console.log('🔍 Debug makeRequest - data:', JSON.stringify(sanitizedData, null, 2));
                console.log('🔍 Debug makeRequest - secureInit:', this.config.secureInit);
                console.log('🔍 Debug makeRequest - isInitialized:', this.isInitialized);

                // Utiliser l'endpoint depuis la configuration si disponible
                endpointPath = ((_window$SunuIDConfig4 = window.SunuIDConfig) === null || _window$SunuIDConfig4 === void 0 || (_window$SunuIDConfig4 = _window$SunuIDConfig4.endpoints) === null || _window$SunuIDConfig4 === void 0 ? void 0 : _window$SunuIDConfig4[endpoint.replace('/', '')]) || endpoint;
                url = "".concat(this.config.apiUrl).concat(endpointPath); // Debug: Afficher l'URL finale
                console.log('🔍 URL finale construite:', url);
                console.log('🔍 EndpointPath:', endpointPath);
                console.log('🔍 SunuIDConfig endpoints:', JSON.stringify((_window$SunuIDConfig5 = window.SunuIDConfig) === null || _window$SunuIDConfig5 === void 0 ? void 0 : _window$SunuIDConfig5.endpoints));

                // Log de sécurité pour la requête
                this.logSecurityEvent('API_REQUEST_START', {
                  endpoint: endpointPath,
                  url: url,
                  dataKeys: Object.keys(sanitizedData),
                  secureInit: this.config.secureInit
                });
                retryCount = 0;
                maxRetries = this.config.maxRetries;
                _loop = /*#__PURE__*/_regenerator().m(function _loop() {
                  var controller, timeoutId, headers, response, errorText, errorData, result, _t11;
                  return _regenerator().w(function (_context17) {
                    while (1) switch (_context17.p = _context17.n) {
                      case 0:
                        _context17.p = 0;
                        controller = new AbortController();
                        timeoutId = setTimeout(function () {
                          return controller.abort();
                        }, _this4.config.requestTimeout); // Headers minimaux (API SunuID n'accepte que les headers essentiels)
                        headers = {
                          'Content-Type': 'application/json'
                        }; // Note: En mode sécurisé, les credentials sont dans le body
                        // Pas besoin d'ajouter de header spécial pour éviter les problèmes CORS
                        // if (this.config.secureInit && this.config.token) {
                        //     headers['X-Secure-Token'] = this.config.token;
                        // }
                        _context17.n = 1;
                        return fetch(url, {
                          method: 'POST',
                          headers: headers,
                          body: JSON.stringify(sanitizedData),
                          signal: controller.signal
                        });
                      case 1:
                        response = _context17.v;
                        clearTimeout(timeoutId);
                        if (response.ok) {
                          _context17.n = 3;
                          break;
                        }
                        _context17.n = 2;
                        return response.text();
                      case 2:
                        errorText = _context17.v;
                        try {
                          errorData = JSON.parse(errorText);
                        } catch (e) {
                          errorData = {
                            message: errorText
                          };
                        }
                        _this4.logSecurityEvent('API_REQUEST_ERROR', {
                          status: response.status,
                          statusText: response.statusText,
                          error: errorData.message
                        });
                        throw new Error(errorData.message || "Erreur HTTP: ".concat(response.status));
                      case 3:
                        _context17.n = 4;
                        return response.json();
                      case 4:
                        result = _context17.v;
                        _this4.logSecurityEvent('API_REQUEST_SUCCESS', {
                          endpoint: endpointPath,
                          responseKeys: Object.keys(result)
                        });
                        return _context17.a(2, {
                          v: result
                        });
                      case 5:
                        _context17.p = 5;
                        _t11 = _context17.v;
                        retryCount++;
                        if (!(_t11.name === 'AbortError')) {
                          _context17.n = 7;
                          break;
                        }
                        _this4.logSecurityEvent('API_REQUEST_TIMEOUT', {
                          retryCount: retryCount
                        });
                        if (!(retryCount > maxRetries)) {
                          _context17.n = 6;
                          break;
                        }
                        throw new Error('Timeout de la requête API');
                      case 6:
                        return _context17.a(2, 0);
                      case 7:
                        if (!(retryCount > maxRetries)) {
                          _context17.n = 8;
                          break;
                        }
                        _this4.logSecurityEvent('API_REQUEST_MAX_RETRIES', {
                          retryCount: retryCount,
                          error: _t11.message
                        });
                        throw _t11;
                      case 8:
                        _context17.n = 9;
                        return new Promise(function (resolve) {
                          return setTimeout(resolve, 1000 * retryCount);
                        });
                      case 9:
                        return _context17.a(2);
                    }
                  }, _loop, null, [[0, 5]]);
                });
              case 3:
                if (!(retryCount <= maxRetries)) {
                  _context18.n = 7;
                  break;
                }
                return _context18.d(_regeneratorValues(_loop()), 4);
              case 4:
                _ret = _context18.v;
                if (!(_ret === 0)) {
                  _context18.n = 5;
                  break;
                }
                return _context18.a(3, 3);
              case 5:
                if (!_ret) {
                  _context18.n = 6;
                  break;
                }
                return _context18.a(2, _ret.v);
              case 6:
                _context18.n = 3;
                break;
              case 7:
                return _context18.a(2);
            }
          }, _callee17, this);
        }));
        function makeRequest(_x23, _x24) {
          return _makeRequest.apply(this, arguments);
        }
        return makeRequest;
      }()
      /**
       * Sanitisation des données de requête
       */
      )
    }, {
      key: "sanitizeRequestData",
      value: function sanitizeRequestData(data) {
        var sanitized = {};

        // D'abord, copier tous les champs de data
        for (var _i = 0, _Object$entries = Object.entries(data); _i < _Object$entries.length; _i++) {
          var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
            key = _Object$entries$_i[0],
            value = _Object$entries$_i[1];
          if (typeof value === 'string') {
            sanitized[key] = this.sanitizeInput(value);
          } else if (_typeof(value) === 'object' && value !== null) {
            sanitized[key] = this.sanitizeRequestData(value);
          } else {
            sanitized[key] = value;
          }
        }

        // Ensuite, ajouter/écraser les credentials (API SunuID les attend ici)
        // Utiliser les vraies valeurs (originales) si disponibles, sinon les valeurs directes
        sanitized.client_id = this.config.originalClientId || this.config.clientId;
        sanitized.secret_id = this.config.originalSecretId || this.config.secretId;

        // Debug: Vérifier les credentials et les données
        console.log('🔍 Credentials dans sanitizeRequestData - clientId:', this.config.clientId);
        console.log('🔍 Credentials dans sanitizeRequestData - secretId:', this.config.secretId ? '***' + this.config.secretId.slice(-4) : 'null');
        console.log('🔍 Credentials dans sanitizeRequestData - sanitizedClientId:', sanitized.client_id);
        console.log('🔍 Credentials dans sanitizeRequestData - sanitizedSecretId:', sanitized.secret_id ? '***' + sanitized.secret_id.slice(-4) : 'null');
        console.log('🔍 Credentials dans sanitizeRequestData - data complet:', JSON.stringify(sanitized, null, 2));
        return sanitized;
      }

      /**
       * Générer un ID de requête unique
       */
    }, {
      key: "generateRequestId",
      value: function generateRequestId() {
        return 'req_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      }

      /**
       * Générer un code de session unique
       */
    }, {
      key: "generateSessionCode",
      value: function generateSessionCode() {
        var timestamp = Date.now();
        var random = Math.random().toString(36).substr(2, 9);
        var code = "".concat(timestamp, "_").concat(random);
        return btoa(code); // Encoder en base64
      }

      /**
       * Récupérer les informations du partenaire depuis l'API
       */
    }, {
      key: "fetchPartnerInfo",
      value: (function () {
        var _fetchPartnerInfo = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee18() {
          var response, data, partnerId, _t12;
          return _regenerator().w(function (_context19) {
            while (1) switch (_context19.p = _context19.n) {
              case 0:
                _context19.p = 0;
                _context19.n = 1;
                return this.makeRequest('/debug', {
                  type: this.config.type,
                  client_id: this.config.clientId,
                  secret_id: this.config.secretId
                });
              case 1:
                response = _context19.v;
                console.log('📋 Réponse debug API:', response);

                // Vérifier la structure de la réponse
                if (response.success && response.data) {
                  data = response.data; // Essayer de récupérer le partner_id depuis différentes structures possibles
                  partnerId = null;
                  if (data.partner_id) {
                    partnerId = data.partner_id;
                  } else if (data.authentication && data.authentication.auth_test && data.authentication.auth_test.partner_id) {
                    partnerId = data.authentication.auth_test.partner_id;
                  } else if (data.auth_test && data.auth_test.partner_id) {
                    partnerId = data.auth_test.partner_id;
                  }
                  if (partnerId) {
                    this.config.partnerId = partnerId;

                    // Récupérer le service_id depuis la réponse
                    if (data.service_id) {
                      this.config.serviceId = data.service_id;
                    } else {
                      // Fallback: utiliser le partner_id comme service_id
                      this.config.serviceId = partnerId;
                    }

                    // Utiliser le partner_id pour déterminer le nom du partenaire
                    if (partnerId === 21) {
                      this.config.partnerName = 'Fayma';
                    } else {
                      this.config.partnerName = "Partner_".concat(partnerId);
                    }
                    console.log('✅ Informations partenaire récupérées:', {
                      partnerName: this.config.partnerName,
                      partnerId: this.config.partnerId,
                      serviceId: this.config.serviceId
                    });
                  } else {
                    console.warn('⚠️ Partner ID non trouvé dans la réponse, utilisation du partner_id par défaut');
                    this.config.partnerName = "Partner_".concat(this.config.partnerId || 'unknown');
                  }
                } else {
                  console.warn('⚠️ Structure de réponse invalide, utilisation du partner_id par défaut');
                  this.config.partnerName = "Partner_".concat(this.config.partnerId || 'unknown');
                }
                _context19.n = 3;
                break;
              case 2:
                _context19.p = 2;
                _t12 = _context19.v;
                console.warn('⚠️ Erreur lors de la récupération des informations du partenaire:', _t12.message);
                this.config.partnerName = 'Partner_unknown';
              case 3:
                return _context19.a(2);
            }
          }, _callee18, this, [[0, 2]]);
        }));
        function fetchPartnerInfo() {
          return _fetchPartnerInfo.apply(this, arguments);
        }
        return fetchPartnerInfo;
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
       * Vérifier le statut des connexions
       */
    }, {
      key: "checkConnections",
      value: (function () {
        var _checkConnections = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee19() {
          var status, testResponse, debugData, _t13;
          return _regenerator().w(function (_context20) {
            while (1) switch (_context20.p = _context20.n) {
              case 0:
                status = {
                  api: false,
                  websocket: false,
                  ready: false
                }; // Vérifier l'API en utilisant l'endpoint debug avec les credentials
                _context20.p = 1;
                _context20.n = 2;
                return fetch(this.config.apiUrl + '/debug', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    type: this.config.type,
                    client_id: this.config.clientId,
                    secret_id: this.config.secretId
                  })
                });
              case 2:
                testResponse = _context20.v;
                if (!testResponse.ok) {
                  _context20.n = 4;
                  break;
                }
                _context20.n = 3;
                return testResponse.json();
              case 3:
                debugData = _context20.v;
                // L'API est accessible si on reçoit une réponse avec success: true
                status.api = debugData.success === true;
                console.log('🔍 API Status:', status.api ? 'accessible' : 'inaccessible');
                _context20.n = 5;
                break;
              case 4:
                status.api = false;
                console.log('🔍 API Status: HTTP', testResponse.status);
              case 5:
                _context20.n = 7;
                break;
              case 6:
                _context20.p = 6;
                _t13 = _context20.v;
                console.log('🔍 Test API échoué:', _t13.message);
                status.api = false;
              case 7:
                // Vérifier le WebSocket
                status.websocket = this.socket && this.socket.connected;

                // Connexions prêtes si API est accessible
                status.ready = status.api;
                return _context20.a(2, status);
            }
          }, _callee19, this, [[1, 6]]);
        }));
        function checkConnections() {
          return _checkConnections.apply(this, arguments);
        }
        return checkConnections;
      }()
      /**
       * Attendre que les connexions soient prêtes
       */
      )
    }, {
      key: "waitForConnections",
      value: (function () {
        var _waitForConnections = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee20() {
          var timeout,
            startTime,
            status,
            _args21 = arguments;
          return _regenerator().w(function (_context21) {
            while (1) switch (_context21.n) {
              case 0:
                timeout = _args21.length > 0 && _args21[0] !== undefined ? _args21[0] : 5000;
                startTime = Date.now();
              case 1:
                if (!(Date.now() - startTime < timeout)) {
                  _context21.n = 5;
                  break;
                }
                _context21.n = 2;
                return this.checkConnections();
              case 2:
                status = _context21.v;
                if (!status.ready) {
                  _context21.n = 3;
                  break;
                }
                console.log('✅ Connexions prêtes');
                return _context21.a(2, status);
              case 3:
                console.log('⏳ Attente connexions...', status);
                _context21.n = 4;
                return new Promise(function (resolve) {
                  return setTimeout(resolve, 1000);
                });
              case 4:
                _context21.n = 1;
                break;
              case 5:
                throw new Error('Timeout connexions - Impossible de générer le QR code');
              case 6:
                return _context21.a(2);
            }
          }, _callee20, this);
        }));
        function waitForConnections() {
          return _waitForConnections.apply(this, arguments);
        }
        return waitForConnections;
      }()
      /**
       * Obtenir l'URL du QR code généré
       */
      )
    }, {
      key: "getQRCode",
      value: function getQRCode() {
        // Retourner l'URL du QR code si disponible
        if (this.currentQRUrl) {
          return this.currentQRUrl;
        }

        // Sinon, retourner une URL par défaut ou null
        return null;
      }

      /**
       * Nettoyer les ressources
       */
    }, {
      key: "destroy",
      value: function destroy() {
        this.stopAutoRefresh();

        // Fermer la connexion WebSocket
        if (this.socket) {
          this.socket.disconnect();
          this.socket = null;
          console.log('🌐 WebSocket déconnecté');
        }
        this.isInitialized = false;
        this.logSecurityEvent('SDK_DESTROY');
        console.log('SunuID SDK détruit');
      }

      /**
       * Arrêter le rafraîchissement automatique
       */
    }, {
      key: "stopAutoRefresh",
      value: function stopAutoRefresh() {
        if (this.refreshTimer) {
          clearInterval(this.refreshTimer);
          this.refreshTimer = null;
          console.log('🔄 Timer de rafraîchissement arrêté');
        }
      }

      /**
       * Obtenir les logs de sécurité
       */
    }, {
      key: "getSecurityLogs",
      value: function getSecurityLogs() {
        return window.SunuIDSecurityLogs || [];
      }

      /**
       * Nettoyer les logs de sécurité
       */
    }, {
      key: "clearSecurityLogs",
      value: function clearSecurityLogs() {
        window.SunuIDSecurityLogs = [];
        this.logSecurityEvent('SECURITY_LOGS_CLEARED');
      }

      /**
       * Afficher un loader pendant le scan du QR code
       */
    }, {
      key: "showQRLoader",
      value: function showQRLoader() {
        console.log('🔄 Affichage du loader - Scan QR initié');

        // Chercher le conteneur QR dans différents IDs possibles
        var containerIds = ['qr-area', 'qr-container', 'sunuid-qr-container'];
        var container = null;
        for (var _i2 = 0, _containerIds = containerIds; _i2 < _containerIds.length; _i2++) {
          var id = _containerIds[_i2];
          container = document.getElementById(id);
          if (container) break;
        }
        if (!container) {
          console.warn('⚠️ Conteneur QR non trouvé pour afficher le loader');
          return;
        }

        // Remplacer le contenu par un loader animé
        container.innerHTML = "\n                <div style=\"\n                    text-align: center;\n                    padding: 40px 20px;\n                    background: #f8f9fa;\n                    border: 2px solid #007bff;\n                    border-radius: 10px;\n                    color: #007bff;\n                    font-family: Arial, sans-serif;\n                \">\n                    <div style=\"\n                        width: 60px;\n                        height: 60px;\n                        border: 4px solid #e3f2fd;\n                        border-top: 4px solid #007bff;\n                        border-radius: 50%;\n                        animation: spin 1s linear infinite;\n                        margin: 0 auto 20px auto;\n                    \"></div>\n                    <h3 style=\"margin: 0 0 10px 0; color: #007bff;\">\uD83D\uDD0D Scan en cours...</h3>\n                    <p style=\"margin: 0; font-size: 14px;\">\n                        Veuillez patienter pendant la v\xE9rification de votre identit\xE9.\n                    </p>\n                    <div style=\"margin-top: 15px; font-size: 12px; color: #6c757d;\">\n                        \u23F1\uFE0F Traitement en cours...\n                    </div>\n                </div>\n                <style>\n                    @keyframes spin {\n                        0% { transform: rotate(0deg); }\n                        100% { transform: rotate(360deg); }\n                    }\n                </style>\n            ";
        console.log('✅ Loader affiché avec succès');
      }

      /**
       * Extraire les données d'authentification du format WebSocket
       */
    }, {
      key: "extractAuthDataFromWebSocket",
      value: function extractAuthDataFromWebSocket(websocketData) {
        console.log('🔍 Extraction des données d\'authentification du WebSocket:', websocketData);

        // Si les données sont déjà dans le bon format (callback), les retourner directement
        if (websocketData.token && websocketData.session_id) {
          console.log('✅ Données déjà au bon format (callback)');
          return websocketData;
        }

        // Si c'est un format WebSocket, extraire les données de responseData
        if (websocketData.responseData) {
          console.log('✅ Format WebSocket détecté, extraction de responseData');
          var authData = {
            token: websocketData.responseData.token || websocketData.responseData.auth_token,
            session_id: websocketData.responseData.session_id || websocketData.responseData.sessionId,
            user_id: websocketData.responseData.user_id || websocketData.responseData.userId,
            partner_id: websocketData.responseData.partner_id || websocketData.responseData.partnerId,
            type: websocketData.responseData.type,
            timestamp: websocketData.responseData.timestamp || websocketData.timestamp,
            signature: websocketData.responseData.signature,
            user_info: websocketData.responseData.user_info || websocketData.responseData.userInfo,
            redirect_url: websocketData.responseData.redirect_url || websocketData.responseData.redirectUrl
          };
          console.log('📋 Données d\'authentification extraites:', authData);
          return authData;
        }

        // Fallback : essayer d'extraire directement des champs principaux
        console.log('⚠️ Format non reconnu, tentative d\'extraction directe');
        return {
          token: websocketData.token || websocketData.auth_token,
          session_id: websocketData.session_id || websocketData.sessionId,
          user_id: websocketData.user_id || websocketData.userId,
          partner_id: websocketData.partner_id || websocketData.partnerId,
          type: websocketData.type,
          timestamp: websocketData.timestamp,
          signature: websocketData.signature,
          user_info: websocketData.user_info || websocketData.userInfo,
          redirect_url: websocketData.redirect_url || websocketData.redirectUrl
        };
      }

      /**
       * Afficher un message de succès après authentification
       */
    }, {
      key: "showSuccessMessage",
      value: function showSuccessMessage(data) {
        console.log('✅ Affichage du message de succès');

        // Chercher le conteneur QR dans différents IDs possibles
        var containerIds = ['qr-area', 'qr-container', 'sunuid-qr-container'];
        var container = null;
        for (var _i3 = 0, _containerIds2 = containerIds; _i3 < _containerIds2.length; _i3++) {
          var id = _containerIds2[_i3];
          container = document.getElementById(id);
          if (container) break;
        }
        if (!container) {
          console.warn('⚠️ Conteneur QR non trouvé pour afficher le message de succès');
          return;
        }

        // Extraire les informations utilisateur
        var userInfo = data.user_info || {};
        var userName = userInfo.name || userInfo.username || 'Utilisateur';
        var userEmail = userInfo.email || '';

        // Remplacer le contenu par un message de succès
        container.innerHTML = "\n                <div style=\"\n                    text-align: center;\n                    padding: 40px 20px;\n                    background: #d4edda;\n                    border: 2px solid #28a745;\n                    border-radius: 10px;\n                    color: #155724;\n                    font-family: Arial, sans-serif;\n                \">\n                    <div style=\"\n                        width: 60px;\n                        height: 60px;\n                        background: #28a745;\n                        border-radius: 50%;\n                        display: flex;\n                        align-items: center;\n                        justify-content: center;\n                        margin: 0 auto 20px auto;\n                        font-size: 30px;\n                        color: white;\n                    \">\u2705</div>\n                    <h3 style=\"margin: 0 0 10px 0; color: #155724;\">\uD83C\uDF89 Authentification r\xE9ussie !</h3>\n                    <p style=\"margin: 0 0 15px 0; font-size: 16px; font-weight: bold;\">\n                        Bienvenue, ".concat(userName, " !\n                    </p>\n                    ").concat(userEmail ? "<p style=\"margin: 0 0 15px 0; font-size: 14px; color: #6c757d;\">".concat(userEmail, "</p>") : '', "\n                    <p style=\"margin: 0; font-size: 14px;\">\n                        Votre identit\xE9 a \xE9t\xE9 v\xE9rifi\xE9e avec succ\xE8s.\n                    </p>\n                    <div style=\"margin-top: 20px; font-size: 12px; color: #6c757d;\">\n                        \uD83D\uDD04 Redirection en cours...\n                    </div>\n                </div>\n            ");
        console.log('✅ Message de succès affiché');
      }

      /**
       * Gérer le callback SunuID
       */
    }, {
      key: "handleCallback",
      value: function handleCallback() {
        var urlParams = new URLSearchParams(window.location.search);

        // Vérifier si c'est un callback SunuID
        if (urlParams.has('token') && urlParams.has('session_id')) {
          console.log('🔗 Callback SunuID détecté');

          // Récupérer les paramètres
          var callbackData = {
            token: urlParams.get('token'),
            state: urlParams.get('state'),
            session_id: urlParams.get('session_id'),
            user_id: urlParams.get('user_id'),
            partner_id: urlParams.get('partner_id'),
            type: urlParams.get('type'),
            timestamp: urlParams.get('timestamp'),
            signature: urlParams.get('signature')
          };
          console.log('📋 Données callback:', callbackData);

          // Valider le callback
          this.validateCallback(callbackData);

          // Traiter l'authentification
          this.processAuthentication(callbackData);
          return true;
        }
        return false;
      }

      /**
       * Valider le callback
       */
    }, {
      key: "validateCallback",
      value: function validateCallback(data) {
        console.log('🔒 Validation du callback...');

        // Vérifier l'état de sécurité
        if (data.state && data.state !== this.config.state) {
          console.error('❌ État de sécurité invalide');
          throw new Error('État de sécurité invalide');
        }

        // Vérifier la signature (si configurée)
        if (data.signature && this.config.verifySignature) {
          if (!this.verifySignature(data)) {
            console.error('❌ Signature invalide');
            throw new Error('Signature invalide');
          }
        }

        // Vérifier l'expiration
        if (data.timestamp && this.isExpired(data.timestamp)) {
          console.error('❌ Token expiré');
          throw new Error('Token expiré');
        }
        console.log('✅ Callback validé avec succès');
      }

      /**
       * Traiter l'authentification
       */
    }, {
      key: "processAuthentication",
      value: function processAuthentication(data) {
        console.log('🔐 Traitement de l\'authentification...');
        try {
          // Décoder le JWT token
          var decodedToken = this.decodeJWT(data.token);

          // Vérifier les données utilisateur
          var userData = {
            user_id: decodedToken.user_id || data.user_id,
            session_id: decodedToken.session_id || data.session_id,
            partner_id: decodedToken.partner_id || data.partner_id,
            type: decodedToken.type || data.type,
            iat: decodedToken.iat,
            exp: decodedToken.exp
          };
          console.log('👤 Données utilisateur:', userData);

          // Émettre l'événement de succès
          this.emitWebSocketEvent('authentication_success', {
            userData: userData,
            callbackData: data,
            timestamp: Date.now()
          });

          // Appeler le callback de succès
          if (this.config.onAuthenticationSuccess) {
            this.config.onAuthenticationSuccess(userData, data);
          }

          // Rediriger si configuré
          if (this.config.redirectAfterSuccess) {
            this.redirectAfterSuccess(userData);
          }
          console.log('✅ Authentification traitée avec succès');
        } catch (error) {
          console.error('❌ Erreur lors du traitement:', error);

          // Appeler le callback d'erreur
          if (this.config.onAuthenticationError) {
            this.config.onAuthenticationError(error, data);
          }
          throw error;
        }
      }

      /**
       * Décoder un JWT token
       */
    }, {
      key: "decodeJWT",
      value: function decodeJWT(token) {
        try {
          // Décodage simple du JWT (sans vérification de signature)
          var parts = token.split('.');
          if (parts.length !== 3) {
            throw new Error('Format JWT invalide');
          }
          var payload = parts[1];
          var decoded = JSON.parse(atob(payload));
          return decoded;
        } catch (error) {
          console.error('❌ Erreur décodage JWT:', error);
          throw new Error('Token JWT invalide');
        }
      }

      /**
       * Vérifier la signature
       */
    }, {
      key: "verifySignature",
      value: function verifySignature(data) {
        // Implémentation basique - à adapter selon vos besoins
        var expectedSignature = this.generateSignature(data);
        return data.signature === expectedSignature;
      }

      /**
       * Générer une signature
       */
    }, {
      key: "generateSignature",
      value: function generateSignature(data) {
        // Implémentation basique - à adapter selon vos besoins
        var payload = "".concat(data.token, ".").concat(data.state, ".").concat(data.session_id, ".").concat(data.timestamp);
        return btoa(payload).slice(0, 12); // Signature simplifiée
      }

      /**
       * Vérifier l'expiration
       */
    }, {
      key: "isExpired",
      value: function isExpired(timestamp) {
        var currentTime = Math.floor(Date.now() / 1000);
        var tokenTime = parseInt(timestamp);
        var maxAge = this.config.tokenMaxAge || 300; // 5 minutes par défaut

        return currentTime - tokenTime > maxAge;
      }

      /**
       * Rediriger après succès
       */
    }, {
      key: "redirectAfterSuccess",
      value: function redirectAfterSuccess(userData) {
        var redirectUrl = this.config.redirectAfterSuccess;

        // Remplacer les variables dans l'URL
        redirectUrl = redirectUrl.replace('{user_id}', userData.user_id).replace('{session_id}', userData.session_id).replace('{partner_id}', userData.partner_id).replace('{type}', userData.type);
        console.log('🔄 Redirection vers:', redirectUrl);

        // Redirection avec délai pour permettre les callbacks
        setTimeout(function () {
          window.location.href = redirectUrl;
        }, 100);
      }

      /**
       * Générer un état de sécurité
       */
    }, {
      key: "generateState",
      value: function generateState() {
        var state = 'sunuid_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        this.config.state = state;
        return state;
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
//# sourceMappingURL=sunuid-sdk.esm.js.map
