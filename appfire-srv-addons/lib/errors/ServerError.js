'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Server error class
 *
 * @author Dzianis_Roi
 * */

var ServerError = function (_Error) {
  _inherits(ServerError, _Error);

  /**
   * Constructor function
   *
   * @param {!string} message - Error message.
   * @param {number} [status=500] - HTTP-status value.
   * @author Dzianis_Roi
   * */

  function ServerError(status, message) {
    _classCallCheck(this, ServerError);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ServerError).call(this, message));

    _this.statusCode(status || 500);
    _this.message = message;

    Error.captureStackTrace(_this);
    return _this;
  }

  /**
   * Get/set status value. Get if arguments doesn't
   * provided
   *
   * @param {number} [status] - HTTP-status value
   * @returns {number} Status code.
   * @author Dzianis_Roi
   * */


  _createClass(ServerError, [{
    key: 'statusCode',
    value: function statusCode() {
      var status = this.status;

      if (arguments.length === 0) {
        // behave as getter
        return status;
      }

      status = arguments[0];

      if (status && this._validateStatus(status)) {
        // behave as setter
        this.status = status;
        return status;
      } else {
        // notify developer about illegal usage
        throw new Error('Illegal arguments!');
      }
    }

    /**
     * @private
     *
     * Validate status code value
     *
     * @param {number} status - HTTP-status value
     * @returns {boolean}
     * @author Dzianis_Roi
     * */

  }, {
    key: '_validateStatus',
    value: function _validateStatus(status) {
      return typeof status === 'number' && status >= 100 && status < 600;
    }
  }]);

  return ServerError;
}(Error);

exports['default'] = ServerError;


ServerError.prototype.name = 'ServerError';
module.exports = exports['default'];