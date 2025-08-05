(function () {
  'use strict';

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
      partnerName: 'SunuID',
      // Nom du partenaire par défaut
      theme: 'light',
      language: 'fr',
      autoRefresh: true,
      refreshInterval: 30000,
      // 30 secondes
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
      secureInitUrl: 'http://localhost:8081/secure-init.php',
      token: null
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

        // Initialisation asynchrone
        this.initPromise = this.init();
      }

      /**
       * Initialisation du SDK
       */
      return _createClass(SunuID, [{
        key: "init",
        value: (function () {
          var _init = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
            var _t;
            return _regenerator().w(function (_context) {
              while (1) switch (_context.p = _context.n) {
                case 0:
                  _context.p = 0;
                  if (!this.config.secureInit) {
                    _context.n = 2;
                    break;
                  }
                  _context.n = 1;
                  return this.secureInit();
                case 1:
                  _context.n = 3;
                  break;
                case 2:
                  // Validation sécurisée des paramètres
                  if (this.config.validateInputs) {
                    this.validateSecurityParams();
                  }
                case 3:
                  // Log de sécurité pour l'initialisation
                  this.logSecurityEvent('SDK_INIT_START', {
                    apiUrl: this.config.apiUrl,
                    type: this.config.type,
                    partnerName: this.config.partnerName,
                    secureInit: this.config.secureInit
                  });

                  // Obscurcir les credentials dans les logs
                  this.obfuscateCredentials();
                  this.isInitialized = true;
                  console.log('SunuID SDK initialisé avec succès');
                  this.logSecurityEvent('SDK_INIT_SUCCESS');

                  // Initialiser la connexion WebSocket
                  this.initWebSocket();
                  _context.n = 5;
                  break;
                case 4:
                  _context.p = 4;
                  _t = _context.v;
                  this.logSecurityEvent('SDK_INIT_ERROR', {
                    error: _t.message
                  });
                  throw _t;
                case 5:
                  return _context.a(2);
              }
            }, _callee, this, [[0, 4]]);
          }));
          function init() {
            return _init.apply(this, arguments);
          }
          return init;
        }()
        /**
         * Initialisation sécurisée via PHP
         */
        )
      }, {
        key: "secureInit",
        value: (function () {
          var _secureInit = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
            var initData, response, result, decodedToken, _t2;
            return _regenerator().w(function (_context2) {
              while (1) switch (_context2.p = _context2.n) {
                case 0:
                  _context2.p = 0;
                  this.logSecurityEvent('SECURE_INIT_START');
                  initData = {
                    type: this.config.type,
                    partnerName: this.config.partnerName,
                    theme: this.config.theme
                  };
                  _context2.n = 1;
                  return fetch(this.config.secureInitUrl, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      'Accept': 'application/json'
                    },
                    body: JSON.stringify(initData)
                  });
                case 1:
                  response = _context2.v;
                  if (response.ok) {
                    _context2.n = 2;
                    break;
                  }
                  throw new Error("Erreur HTTP: ".concat(response.status));
                case 2:
                  _context2.n = 3;
                  return response.json();
                case 3:
                  result = _context2.v;
                  if (result.success) {
                    _context2.n = 4;
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
                    _context2.n = 5;
                    break;
                  }
                  this.config.clientId = decodedToken.client_id;
                  this.config.secretId = decodedToken.secret_id;
                  _context2.n = 6;
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
                  _context2.n = 8;
                  break;
                case 7:
                  _context2.p = 7;
                  _t2 = _context2.v;
                  this.logSecurityEvent('SECURE_INIT_ERROR', {
                    error: _t2.message
                  });
                  throw new Error("\xC9chec de l'initialisation s\xE9curis\xE9e: ".concat(_t2.message));
                case 8:
                  return _context2.a(2);
              }
            }, _callee2, this, [[0, 7]]);
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
              this.socket = io('wss://samasocket.fayma.sn:9443', {
                query: {
                  token: this.config.clientId,
                  type: 'web',
                  userId: this.config.clientId,
                  username: ip
                }
              });

              // Gestion des événements WebSocket
              this.socket.on('connect', function () {
                console.log('🌐 WebSocket connecté avec succès');
                console.log('📊 Socket ID:', _this.socket.id);
              });
              this.socket.on('disconnect', function (reason) {
                console.log('❌ WebSocket déconnecté:', reason);
              });
              this.socket.on('connect_error', function (error) {
                console.error('❌ Erreur connexion WebSocket:', error);
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
          if (this.config.onSuccess) {
            this.config.onSuccess(data);
          }
        }

        /**
         * Gérer l'expiration du QR
         */
      }, {
        key: "handleQRExpired",
        value: function handleQRExpired(data) {
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
          } else if (typeof io === 'undefined') {
            console.warn('⚠️ Socket.IO non disponible, impossible d\'émettre l\'événement:', event);
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
          var _generateQR = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(containerId) {
            var _this2 = this;
            var options,
              response,
              imageBaseUrl,
              qrImageUrl,
              _waitForSocketId,
              _args3 = arguments,
              _t3;
            return _regenerator().w(function (_context3) {
              while (1) switch (_context3.p = _context3.n) {
                case 0:
                  options = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : {};
                  if (!this.initPromise) {
                    _context3.n = 2;
                    break;
                  }
                  _context3.n = 1;
                  return this.initPromise;
                case 1:
                  this.initPromise = null;
                case 2:
                  if (this.isInitialized) {
                    _context3.n = 3;
                    break;
                  }
                  throw new Error('SunuID: SDK non initialisé');
                case 3:
                  _context3.p = 3;
                  _context3.n = 4;
                  return this.makeRequest('/qr-generate', _objectSpread2({
                    type: this.config.type
                  }, options));
                case 4:
                  response = _context3.v;
                  if (!response.success) {
                    _context3.n = 5;
                    break;
                  }
                  // Construire l'URL complète de l'image QR avec la base URL pour les images
                  imageBaseUrl = 'https://sunuid.fayma.sn';
                  qrImageUrl = "".concat(imageBaseUrl).concat(response.data.qrcode);
                  this.currentQRUrl = qrImageUrl; // Stocker l'URL pour getQRCode()
                  this.displayQRCode(containerId, qrImageUrl, this.config.type, options);

                  // Générer le QR code personnalisé avec le type + code de l'API + socket ID
                  if (this.pendingQRInfo && response.data.code) {
                    // Attendre que le socket ID soit bien défini
                    _waitForSocketId = function waitForSocketId() {
                      if (_this2.socket && _this2.socket.id && _this2.socket.id !== 'unknown') {
                        var socketId = _this2.socket.id;
                        var qrContent = "".concat(_this2.config.type, "-").concat(response.data.code, "-").concat(socketId);

                        // Utiliser le partnerName de la réponse API et le nom du type
                        var partnerName = response.data.partnerName || _this2.config.partnerName || 'SunuID';
                        var typeName = _this2.getTypeName(_this2.config.type);
                        var qrLabel = "".concat(typeName, " - ").concat(partnerName);
                        _this2.generateCustomQRCode(qrContent, qrLabel, _this2.pendingQRInfo.options);
                        _this2.pendingQRInfo = null; // Nettoyer
                      } else {
                        // Réessayer après un délai si le socket ID n'est pas encore disponible
                        setTimeout(_waitForSocketId, 100);
                      }
                    };
                    _waitForSocketId();
                  }
                  this.startAutoRefresh(containerId, this.config.type, options);

                  // Émettre un événement WebSocket pour la génération du QR
                  this.emitWebSocketEvent('qr_generated', {
                    serviceId: response.data.service_id,
                    type: this.config.type,
                    qrCodeUrl: qrImageUrl,
                    code: response.data.code,
                    timestamp: Date.now()
                  });
                  return _context3.a(2, _objectSpread2(_objectSpread2({}, response.data), {}, {
                    qrCodeUrl: qrImageUrl,
                    sessionId: response.data.service_id
                  }));
                case 5:
                  throw new Error(response.message || 'Erreur lors de la génération du QR code');
                case 6:
                  _context3.n = 8;
                  break;
                case 7:
                  _context3.p = 7;
                  _t3 = _context3.v;
                  console.error('Erreur API détectée:', _t3.message);
                  console.error('Stack trace complet:', _t3.stack);
                  console.error('Configuration SDK:', {
                    apiUrl: this.config.apiUrl,
                    type: this.config.type,
                    secureInit: this.config.secureInit,
                    clientId: this.config.clientId ? '***' + this.config.clientId.slice(-4) : 'null',
                    secretId: this.config.secretId ? '***' + this.config.secretId.slice(-4) : 'null'
                  });
                  console.log('Affichage du message "Service non disponible" pour type ' + this.config.type);
                  this.displayServiceUnavailable(containerId, this.config.type);
                  throw new Error('Service non disponible');
                case 8:
                  return _context3.a(2);
              }
            }, _callee3, this, [[3, 7]]);
          }));
          function generateQR(_x) {
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
          var _generateCustomQR = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(containerId, type) {
            var _this3 = this;
            var options,
              _response,
              imageBaseUrl,
              qrImageUrl,
              _waitForSocketId2,
              _args4 = arguments,
              _t4;
            return _regenerator().w(function (_context4) {
              while (1) switch (_context4.p = _context4.n) {
                case 0:
                  options = _args4.length > 2 && _args4[2] !== undefined ? _args4[2] : {};
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
                  _context4.p = 3;
                  _context4.n = 4;
                  return this.makeRequest('/qr-generate', _objectSpread2({
                    type: type
                  }, options));
                case 4:
                  _response = _context4.v;
                  if (!_response.success) {
                    _context4.n = 5;
                    break;
                  }
                  // Construire l'URL complète de l'image QR avec la base URL pour les images
                  imageBaseUrl = 'https://sunuid.fayma.sn';
                  qrImageUrl = "".concat(imageBaseUrl).concat(_response.data.qrcode);
                  this.displayQRCode(containerId, qrImageUrl, type, options);

                  // Générer le QR code personnalisé avec le type + code de l'API + socket ID
                  if (this.pendingQRInfo && _response.data.code) {
                    // Attendre que le socket ID soit bien défini
                    _waitForSocketId2 = function waitForSocketId() {
                      if (_this3.socket && _this3.socket.id && _this3.socket.id !== 'unknown') {
                        var socketId = _this3.socket.id;
                        var qrContent = "".concat(type, "-").concat(_response.data.code, "-").concat(socketId);

                        // Utiliser le partnerName de la réponse API et le nom du type
                        var partnerName = _response.data.partnerName || _this3.config.partnerName || 'SunuID';
                        var typeName = _this3.getTypeName(type);
                        var qrLabel = "".concat(typeName, " - ").concat(partnerName);
                        _this3.generateCustomQRCode(qrContent, qrLabel, _this3.pendingQRInfo.options);
                        _this3.pendingQRInfo = null; // Nettoyer
                      } else {
                        // Réessayer après un délai si le socket ID n'est pas encore disponible
                        setTimeout(_waitForSocketId2, 100);
                      }
                    };
                    _waitForSocketId2();
                  }
                  this.startAutoRefresh(containerId, type, options);
                  return _context4.a(2, _objectSpread2(_objectSpread2({}, _response.data), {}, {
                    qrCodeUrl: qrImageUrl,
                    sessionId: _response.data.service_id
                  }));
                case 5:
                  throw new Error(_response.message || 'Erreur lors de la génération du QR code');
                case 6:
                  _context4.n = 8;
                  break;
                case 7:
                  _context4.p = 7;
                  _t4 = _context4.v;
                  console.error('Erreur API détectée:', _t4.message);
                  console.error('Stack trace complet:', _t4.stack);
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
                  return _context4.a(2);
              }
            }, _callee4, this, [[3, 7]]);
          }));
          function generateCustomQR(_x2, _x3) {
            return _generateCustomQR.apply(this, arguments);
          }
          return generateCustomQR;
        }() // Alias pour maintenir la compatibilité
        )
      }, {
        key: "generateAuthQR",
        value: function () {
          var _generateAuthQR = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(containerId) {
            var options,
              _args5 = arguments;
            return _regenerator().w(function (_context5) {
              while (1) switch (_context5.n) {
                case 0:
                  options = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : {};
                  return _context5.a(2, this.generateQR(containerId, options));
              }
            }, _callee5, this);
          }));
          function generateAuthQR(_x4) {
            return _generateAuthQR.apply(this, arguments);
          }
          return generateAuthQR;
        }()
      }, {
        key: "generateKYCQR",
        value: function () {
          var _generateKYCQR = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(containerId) {
            var options,
              originalType,
              _args6 = arguments;
            return _regenerator().w(function (_context6) {
              while (1) switch (_context6.p = _context6.n) {
                case 0:
                  options = _args6.length > 1 && _args6[1] !== undefined ? _args6[1] : {};
                  // Sauvegarder le type actuel
                  originalType = this.config.type; // Changer temporairement le type pour KYC
                  this.config.type = 1;
                  _context6.p = 1;
                  _context6.n = 2;
                  return this.generateQR(containerId, options);
                case 2:
                  return _context6.a(2, _context6.v);
                case 3:
                  _context6.p = 3;
                  // Restaurer le type original
                  this.config.type = originalType;
                  return _context6.f(3);
                case 4:
                  return _context6.a(2);
              }
            }, _callee6, this, [[1,, 3, 4]]);
          }));
          function generateKYCQR(_x5) {
            return _generateKYCQR.apply(this, arguments);
          }
          return generateKYCQR;
        }()
      }, {
        key: "generateSignatureQR",
        value: function () {
          var _generateSignatureQR = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(containerId) {
            var options,
              originalType,
              _args7 = arguments;
            return _regenerator().w(function (_context7) {
              while (1) switch (_context7.p = _context7.n) {
                case 0:
                  options = _args7.length > 1 && _args7[1] !== undefined ? _args7[1] : {};
                  // Sauvegarder le type actuel
                  originalType = this.config.type; // Changer temporairement le type pour Signature
                  this.config.type = 3;
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
          function generateSignatureQR(_x6) {
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
          var _checkQRStatus = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(sessionId) {
            var _response2, _t5;
            return _regenerator().w(function (_context8) {
              while (1) switch (_context8.p = _context8.n) {
                case 0:
                  if (this.isInitialized) {
                    _context8.n = 1;
                    break;
                  }
                  throw new Error('SunuID: SDK non initialisé');
                case 1:
                  _context8.p = 1;
                  _context8.n = 2;
                  return this.makeRequest('/qr-status', {
                    serviceId: sessionId
                  });
                case 2:
                  _response2 = _context8.v;
                  if (!_response2.success) {
                    _context8.n = 3;
                    break;
                  }
                  return _context8.a(2, _response2.data);
                case 3:
                  throw new Error(_response2.message || 'Erreur lors de la vérification du statut');
                case 4:
                  _context8.n = 6;
                  break;
                case 5:
                  _context8.p = 5;
                  _t5 = _context8.v;
                  this.handleError(_t5);
                  throw _t5;
                case 6:
                  return _context8.a(2);
              }
            }, _callee8, this, [[1, 5]]);
          }));
          function checkQRStatus(_x7) {
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

          // Afficher un loader en attendant la réponse API et la connexion socket
          this.getTypeName(type);
          qrElement.innerHTML = "\n                <div class=\"sunuid-qr-header\">\n                    <h3>".concat(type === 1 ? 'Vérification KYC' : type === 2 ? 'Authentification' : type === 3 ? 'Signature' : 'Service Type ' + type, "</h3>\n                </div>\n                <div class=\"sunuid-qr-image\" id=\"sunuid-qr-container\">\n                    <div style=\"text-align: center; padding: 40px;\">\n                        <div class=\"sunuid-loader\">\n                            <div class=\"sunuid-spinner\"></div>\n                            <p style=\"margin-top: 20px; color: #666;\">Initialisation en cours...</p>\n                            <p style=\"font-size: 12px; color: #999; margin-top: 10px;\">Connexion API et WebSocket</p>\n                            <p style=\"font-size: 11px; color: #ccc; margin-top: 5px;\">Attente du Socket ID...</p>\n                        </div>\n                    </div>\n                </div>\n                <div class=\"sunuid-qr-instructions\" style=\"display: none;\">\n                    <p>Scannez ce QR code avec l'application SunuID pour vous connecter</p>\n                </div>\n                <div class=\"sunuid-qr-status\" id=\"sunuid-status\" style=\"display: none;\">\n                    <p>En attente de scan...</p>\n                </div>\n            ");
          container.appendChild(qrElement);

          // Stocker les informations pour la génération ultérieure
          this.pendingQRInfo = {
            containerId: containerId,
            type: type,
            options: options
          };

          // Appliquer le thème
          this.applyTheme(options.theme || this.config.theme);
        }

        /**
         * Générer un QR code personnalisé avec PHP Endroid
         */
      }, {
        key: "generateCustomQRCode",
        value: (function () {
          var _generateCustomQRCode = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9(content, label) {
            var qrContainer,
              _response3,
              responseData,
              instructionsElement,
              statusElement,
              _t6;
            return _regenerator().w(function (_context9) {
              while (1) switch (_context9.p = _context9.n) {
                case 0:
                  _context9.p = 1;
                  console.log('🎨 Début génération QR personnalisé avec PHP...');
                  console.log('📄 Contenu:', content);
                  console.log('🏷️ Label:', label);
                  qrContainer = document.getElementById('sunuid-qr-container');
                  if (qrContainer) {
                    _context9.n = 2;
                    break;
                  }
                  console.error('❌ QR container not found');
                  this.displayFallbackImage();
                  return _context9.a(2);
                case 2:
                  console.log('✅ QR container trouvé');

                  // Nettoyer le conteneur
                  qrContainer.innerHTML = '<div style="text-align: center; padding: 20px;"><p>Génération QR code avec PHP...</p></div>';

                  // Appeler l'endpoint PHP
                  console.log('🔄 Appel endpoint PHP...');
                  _context9.n = 3;
                  return fetch('http://localhost:8081/qr-generator.php', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                      content: content,
                      label: label,
                      size: 300,
                      margin: 10
                    })
                  });
                case 3:
                  _response3 = _context9.v;
                  console.log('📥 Réponse PHP reçue - Status:', _response3.status);
                  if (_response3.ok) {
                    _context9.n = 4;
                    break;
                  }
                  throw new Error("Erreur HTTP: ".concat(_response3.status));
                case 4:
                  _context9.n = 5;
                  return _response3.json();
                case 5:
                  responseData = _context9.v;
                  if (responseData.success) {
                    _context9.n = 6;
                    break;
                  }
                  throw new Error("Erreur PHP: ".concat(responseData.error));
                case 6:
                  console.log('✅ QR code généré par PHP avec succès');
                  console.log('📊 Taille:', responseData.data.size + 'px');
                  console.log('📊 Longueur base64:', responseData.data.length + ' caractères');

                  // Stocker l'URL du QR code pour getQRCode()
                  this.currentQRUrl = responseData.data.dataUrl;

                  // Créer le conteneur avec le QR code PHP
                  qrContainer.innerHTML = "\n                    <div class=\"sunuid-qr-ready\" style=\"text-align: center; padding: 20px;\">\n                        <img src=\"".concat(responseData.data.dataUrl, "\" alt=\"QR Code SunuID\" style=\"max-width: 300px; border: 2px solid #ddd; border-radius: 10px;\">\n                    </div>\n                ");

                  // Afficher les instructions et le statut maintenant que le QR est prêt
                  instructionsElement = qrContainer.parentElement.querySelector('.sunuid-qr-instructions');
                  statusElement = qrContainer.parentElement.querySelector('.sunuid-qr-status');
                  if (instructionsElement) {
                    instructionsElement.style.display = 'block';
                    instructionsElement.classList.add('sunuid-qr-ready');
                  }
                  if (statusElement) {
                    statusElement.style.display = 'block';
                    statusElement.classList.add('sunuid-qr-ready');
                  }
                  console.log('✅ QR code PHP affiché dans le conteneur');
                  _context9.n = 8;
                  break;
                case 7:
                  _context9.p = 7;
                  _t6 = _context9.v;
                  console.error('❌ Erreur génération QR PHP:', _t6);
                  console.error('Stack trace:', _t6.stack);
                  this.displayFallbackImage();
                case 8:
                  return _context9.a(2);
              }
            }, _callee9, this, [[1, 7]]);
          }));
          function generateCustomQRCode(_x8, _x9) {
            return _generateCustomQRCode.apply(this, arguments);
          }
          return generateCustomQRCode;
        }()
        /**
         * Ajouter le logo au centre du QR code
         */
        )
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
          } else {
            console.error('❌ Container QR non trouvé pour fallback');
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
          var _refreshQR = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0(containerId) {
            var options,
              result,
              _args0 = arguments,
              _t7;
            return _regenerator().w(function (_context0) {
              while (1) switch (_context0.p = _context0.n) {
                case 0:
                  options = _args0.length > 1 && _args0[1] !== undefined ? _args0[1] : {};
                  _context0.p = 1;
                  _context0.n = 2;
                  return this.generateQR(containerId, options);
                case 2:
                  result = _context0.v;
                  return _context0.a(2, result);
                case 3:
                  _context0.p = 3;
                  _t7 = _context0.v;
                  console.error('Erreur lors du rafraîchissement:', _t7.message);
                  this.displayServiceUnavailable(containerId, this.config.type);
                  throw _t7;
                case 4:
                  return _context0.a(2);
              }
            }, _callee0, this, [[1, 3]]);
          }));
          function refreshQR(_x0) {
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
          var _this4 = this;
          if (!this.config.autoRefresh) return;
          this.refreshTimer = setInterval(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1() {
            var _t8;
            return _regenerator().w(function (_context1) {
              while (1) switch (_context1.p = _context1.n) {
                case 0:
                  _context1.p = 0;
                  _context1.n = 1;
                  return _this4.refreshQR(containerId, type, options);
                case 1:
                  _context1.n = 3;
                  break;
                case 2:
                  _context1.p = 2;
                  _t8 = _context1.v;
                  console.warn('Erreur lors du rafraîchissement automatique:', _t8);
                case 3:
                  return _context1.a(2);
              }
            }, _callee1, null, [[0, 2]]);
          })), this.config.refreshInterval);
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
          var _makeRequest = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10(endpoint, data) {
            var _window$SunuIDConfig2,
              _window$SunuIDConfig3,
              _this5 = this;
            var sanitizedData, endpointPath, url, retryCount, maxRetries, _loop, _ret;
            return _regenerator().w(function (_context11) {
              while (1) switch (_context11.n) {
                case 0:
                  if (this.isInitialized) {
                    _context11.n = 1;
                    break;
                  }
                  this.logSecurityEvent('REQUEST_BEFORE_INIT', {
                    endpoint: endpoint
                  });
                  throw new Error('SDK non initialisé');
                case 1:
                  if (!this.config.secureInit) {
                    _context11.n = 2;
                    break;
                  }
                  this.config.requestCount++;
                  if (!(this.config.requestCount > this.config.maxRequests)) {
                    _context11.n = 2;
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
                  endpointPath = ((_window$SunuIDConfig2 = window.SunuIDConfig) === null || _window$SunuIDConfig2 === void 0 || (_window$SunuIDConfig2 = _window$SunuIDConfig2.endpoints) === null || _window$SunuIDConfig2 === void 0 ? void 0 : _window$SunuIDConfig2[endpoint.replace('/', '')]) || endpoint;
                  url = "".concat(this.config.apiUrl).concat(endpointPath); // Debug: Afficher l'URL finale
                  console.log('🔍 URL finale construite:', url);
                  console.log('🔍 EndpointPath:', endpointPath);
                  console.log('🔍 SunuIDConfig endpoints:', JSON.stringify((_window$SunuIDConfig3 = window.SunuIDConfig) === null || _window$SunuIDConfig3 === void 0 ? void 0 : _window$SunuIDConfig3.endpoints));

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
                    var controller, timeoutId, headers, _response4, errorText, errorData, result, _t9;
                    return _regenerator().w(function (_context10) {
                      while (1) switch (_context10.p = _context10.n) {
                        case 0:
                          _context10.p = 0;
                          controller = new AbortController();
                          timeoutId = setTimeout(function () {
                            return controller.abort();
                          }, _this5.config.requestTimeout); // Headers minimaux (API SunuID n'accepte que les headers essentiels)
                          headers = {
                            'Content-Type': 'application/json'
                          }; // Note: En mode sécurisé, les credentials sont dans le body
                          // Pas besoin d'ajouter de header spécial pour éviter les problèmes CORS
                          // if (this.config.secureInit && this.config.token) {
                          //     headers['X-Secure-Token'] = this.config.token;
                          // }
                          _context10.n = 1;
                          return fetch(url, {
                            method: 'POST',
                            headers: headers,
                            body: JSON.stringify(sanitizedData),
                            signal: controller.signal
                          });
                        case 1:
                          _response4 = _context10.v;
                          clearTimeout(timeoutId);
                          if (_response4.ok) {
                            _context10.n = 3;
                            break;
                          }
                          _context10.n = 2;
                          return _response4.text();
                        case 2:
                          errorText = _context10.v;
                          try {
                            errorData = JSON.parse(errorText);
                          } catch (e) {
                            errorData = {
                              message: errorText
                            };
                          }
                          _this5.logSecurityEvent('API_REQUEST_ERROR', {
                            status: _response4.status,
                            statusText: _response4.statusText,
                            error: errorData.message
                          });
                          throw new Error(errorData.message || "Erreur HTTP: ".concat(_response4.status));
                        case 3:
                          _context10.n = 4;
                          return _response4.json();
                        case 4:
                          result = _context10.v;
                          _this5.logSecurityEvent('API_REQUEST_SUCCESS', {
                            endpoint: endpointPath,
                            responseKeys: Object.keys(result)
                          });
                          return _context10.a(2, {
                            v: result
                          });
                        case 5:
                          _context10.p = 5;
                          _t9 = _context10.v;
                          retryCount++;
                          if (!(_t9.name === 'AbortError')) {
                            _context10.n = 7;
                            break;
                          }
                          _this5.logSecurityEvent('API_REQUEST_TIMEOUT', {
                            retryCount: retryCount
                          });
                          if (!(retryCount > maxRetries)) {
                            _context10.n = 6;
                            break;
                          }
                          throw new Error('Timeout de la requête API');
                        case 6:
                          return _context10.a(2, 0);
                        case 7:
                          if (!(retryCount > maxRetries)) {
                            _context10.n = 8;
                            break;
                          }
                          _this5.logSecurityEvent('API_REQUEST_MAX_RETRIES', {
                            retryCount: retryCount,
                            error: _t9.message
                          });
                          throw _t9;
                        case 8:
                          _context10.n = 9;
                          return new Promise(function (resolve) {
                            return setTimeout(resolve, 1000 * retryCount);
                          });
                        case 9:
                          return _context10.a(2);
                      }
                    }, _loop, null, [[0, 5]]);
                  });
                case 3:
                  if (!(retryCount <= maxRetries)) {
                    _context11.n = 7;
                    break;
                  }
                  return _context11.d(_regeneratorValues(_loop()), 4);
                case 4:
                  _ret = _context11.v;
                  if (!(_ret === 0)) {
                    _context11.n = 5;
                    break;
                  }
                  return _context11.a(3, 3);
                case 5:
                  if (!_ret) {
                    _context11.n = 6;
                    break;
                  }
                  return _context11.a(2, _ret.v);
                case 6:
                  _context11.n = 3;
                  break;
                case 7:
                  return _context11.a(2);
              }
            }, _callee10, this);
          }));
          function makeRequest(_x1, _x10) {
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

          // Ajouter les credentials dans le body (API SunuID les attend ici)
          // Utiliser les vraies valeurs (originales) si disponibles, sinon les valeurs directes
          sanitized.client_id = this.config.originalClientId || this.config.clientId;
          sanitized.secret_id = this.config.originalSecretId || this.config.secretId;

          // Debug: Vérifier les credentials
          console.log('🔍 Credentials dans sanitizeRequestData - clientId:', this.config.clientId);
          console.log('🔍 Credentials dans sanitizeRequestData - secretId:', this.config.secretId ? '***' + this.config.secretId.slice(-4) : 'null');
          console.log('🔍 Credentials dans sanitizeRequestData - sanitizedClientId:', sanitized.client_id);
          console.log('🔍 Credentials dans sanitizeRequestData - sanitizedSecretId:', sanitized.secret_id ? '***' + sanitized.secret_id.slice(-4) : 'null');
          console.log('🔍 Credentials dans sanitizeRequestData - data complet:', JSON.stringify(sanitized, null, 2));

          // Debug: Vérifier les credentials
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
         * Appliquer le thème
         */
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
         * Obtenir l'URL du QR code généré
         */
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
          if (this.refreshTimer) {
            clearInterval(this.refreshTimer);
          }

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
