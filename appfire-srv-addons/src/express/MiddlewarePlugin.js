/**
 * Appfire's <Plugin> for express middleware
 *
 * @author Dzianis_Roi
 * */

'use strict';

import {Plugin} from 'appfire';
import ServerError from '../errors/ServerError';

export default class MiddlewarePlugin extends Plugin {

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
  badRequestError(msg) {
    return this._reject(400, msg);
  }

  /**
   *  Reject with 401-th status
   *
   *  @param {string} [msg] - Custom message.
   *  @returns {Promise}
   *  @author Dzianis_Roi
   * */
  unauthorizedError(msg) {
    return this._reject(401, msg);
  }

  /**
   *  Reject with 403-th status
   *
   *  @param {string} [msg] - Custom message.
   *  @returns {Promise}
   *  @author Dzianis_Roi
   * */
  forbiddenError(msg) {
    return this._reject(403, msg);
  }

  /**
   *  Reject with 403-th status
   *
   *  @param {string} [msg] - Custom message.
   *  @returns {Promise}
   *  @author Dzianis_Roi
   * */
  notFoundError(msg) {
    return this._reject(404, msg);
  }

  /**
   *  Reject with 409-th status
   *
   *  @param {string} [msg] - Custom message.
   *  @returns {Promise}
   *  @author Dzianis_Roi
   * */
  conflictError(msg) {
    return this._reject(409, msg);
  }

  /**
   *  Reject with 500-th status
   *
   *  @param {string} [msg] - Custom message.
   *  @returns {Promise}
   *  @author Dzianis_Roi
   * */
  internalServerError(msg) {
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
  _reject(status, msg) {
    if (!msg) {
      msg = this.DEFAULT_ERROR_MESSAGE[status] || 'Error';
    }
    return Promise.reject(new ServerError(msg));
  }

}

MiddlewarePlugin.prototype.DEFAULT_ERROR_MESSAGE = {
  400: 'Bad Request',
  401: 'Unauthorized',
  404: 'Not found',
  403: 'Forbidden',
  409: 'Conflict',
  500: 'Internal Server Error'
};
