/**
 * Appfire's <Plugin> for express middleware
 *
 * @author Dzianis_Roi
 * */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _appfire = require('appfire');

var _ServerError = require('../errors/ServerError');

var _ServerError2 = _interopRequireDefault(_ServerError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MiddlewarePlugin = function (_Plugin) {
  _inherits(MiddlewarePlugin, _Plugin);

  function MiddlewarePlugin() {
    _classCallCheck(this, MiddlewarePlugin);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(MiddlewarePlugin).apply(this, arguments));
  }

  _createClass(MiddlewarePlugin, [{
    key: 'badRequestError',


    /*
     *   =================================
     *               Errors
     *   =================================
     * */

    /**
     *  Reject with 400-th status
     *
     *  @param {string} [msg] - Custom message.
     *  @returns {Promise}
     *  @author Dzianis_Roi
     * */
    value: function badRequestError(msg) {
      return this._reject(400, msg);
    }

    /**
     *  Reject with 401-th status
     *
     *  @param {string} [msg] - Custom message.
     *  @returns {Promise}
     *  @author Dzianis_Roi
     * */

  }, {
    key: 'unauthorizedError',
    value: function unauthorizedError(msg) {
      return this._reject(401, msg);
    }

    /**
     *  Reject with 403-th status
     *
     *  @param {string} [msg] - Custom message.
     *  @returns {Promise}
     *  @author Dzianis_Roi
     * */

  }, {
    key: 'forbiddenError',
    value: function forbiddenError(msg) {
      return this._reject(403, msg);
    }

    /**
     *  Reject with 403-th status
     *
     *  @param {string} [msg] - Custom message.
     *  @returns {Promise}
     *  @author Dzianis_Roi
     * */

  }, {
    key: 'notFoundError',
    value: function notFoundError(msg) {
      return this._reject(404, msg);
    }

    /**
     *  Reject with 409-th status
     *
     *  @param {string} [msg] - Custom message.
     *  @returns {Promise}
     *  @author Dzianis_Roi
     * */

  }, {
    key: 'conflictError',
    value: function conflictError(msg) {
      return this._reject(409, msg);
    }

    /**
     *  Reject with 500-th status
     *
     *  @param {string} [msg] - Custom message.
     *  @returns {Promise}
     *  @author Dzianis_Roi
     * */

  }, {
    key: 'internalServerError',
    value: function internalServerError(msg) {
      return this._reject(500, msg);
    }

    /**
     *  Resolve error message
     *
     *  @param {!number} status - Http status
     *  @param {string} [msg] - Custom message
     *  @returns {Promise}
     *  @author Dzianis_Roi
     * */

  }, {
    key: '_reject',
    value: function _reject(status, msg) {
      if (!msg) {
        msg = this.DEFAULT_ERROR_MESSAGE[status] || 'Error';
      }
      return Promise.reject(new _ServerError2['default'](msg, status));
    }
  }]);

  return MiddlewarePlugin;
}(_appfire.Plugin);

exports['default'] = MiddlewarePlugin;


MiddlewarePlugin.prototype.DEFAULT_ERROR_MESSAGE = {
  400: 'Bad Request',
  401: 'Unauthorized',
  404: 'Not found',
  403: 'Forbidden',
  409: 'Conflict',
  500: 'Internal Server Error'
};
module.exports = exports['default'];