/**
 * Server error class
 *
 * @author Dzianis_Roi
 * */

export default class ServerError extends Error {

  /**
   * Constructor function
   *
   * @param {!string} message - Error message.
   * @param {number} [status=500] - HTTP-status value.
   * @author Dzianis_Roi
   * */
  constructor(message, status) {
    super(message);

    this.status = status || 500;
    this.message = message;

    Error.captureStackTrace(this);
  }

  /**
   * Get/set status value. Get if arguments doesn't
   * provided
   *
   * @param {number} [status] - HTTP-status value
   * @returns {number} Status code.
   * @author Dzianis_Roi
   * */
  statusCode() {
    let status = this.status;

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
  _validateStatus(status) {
    return typeof status === 'number' && status >= 100 && status < 600;
  }

}

ServerError.prototype.name = 'ServerError';
