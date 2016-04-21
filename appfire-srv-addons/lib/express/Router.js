'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var express = require('express');

var Router = function () {
  function Router() {
    _classCallCheck(this, Router);

    this.router = express.Router();
  }

  _createClass(Router, [{
    key: 'get',
    value: function get() {
      this._bind.apply(this, ['get'].concat(Array.prototype.slice.call(arguments)));
      return this;
    }
  }, {
    key: 'post',
    value: function post() {
      this._bind.apply(this, ['post'].concat(Array.prototype.slice.call(arguments)));
      return this;
    }
  }, {
    key: 'put',
    value: function put() {
      this._bind.apply(this, ['put'].concat(Array.prototype.slice.call(arguments)));
      return this;
    }
  }, {
    key: 'del',
    value: function del() {
      this._bind.apply(this, ['delete'].concat(Array.prototype.slice.call(arguments)));
      return this;
    }
  }, {
    key: 'options',
    value: function options() {
      this._bind.apply(this, ['options'].concat(Array.prototype.slice.call(arguments)));
      return this;
    }

    /**
     *  Render view for specified path.
     *  @param {!string} path - Path.
     *  @param {!string} view - View name.
     *  @param {Object} [locals] - Params for rendering.
     *  @returns {Router} middleware.
     * */

  }, {
    key: 'render',
    value: function render(path, view, locals) {
      this.router.get(path, function (req, res) {
        res.render(view, locals);
      });
      return this;
    }
  }, {
    key: 'build',
    value: function build() {
      return this.router;
    }
  }, {
    key: 'use',
    value: function use(middleware) {

      var type = typeof middleware === 'undefined' ? 'undefined' : _typeof(middleware);

      var m = void 0;

      if (type === 'function') {
        m = middleware;
      } else if (type === 'string') {

        if (!Object.app.isEventExists(middleware)) {
          throw new Error('Illegal event ' + middleware + ' provided as middleware');
        }

        m = function m(req, res, next) {
          Object.app.fire(middleware, req, res, next);
        };
      } else {
        throw new Error('Router.use() requires middleware function but got a ' + type);
      }

      this.router.use(m);

      return this;
    }

    /**
     *  Bind middleware to route
     * */

  }, {
    key: '_bind',
    value: function _bind() {
      var _this = this;

      var method = arguments[0];
      var route = arguments[1];
      var args = [route];

      var middlewareChain = Array.prototype.slice.call(arguments, 2);
      middlewareChain.forEach(function (middleware) {

        if (typeof middleware === 'function') {
          return args.push(middleware);
        } else if (typeof middleware === 'string') {

          if (!Object.app.isEventExists(middleware)) {
            throw new Error('Illegal event ' + middleware + ' provided as middleware');
          }

          var fn = function fn(req, res, next) {
            _this._respond(Object.app.fire(middleware, req, res, next), res);
          };

          args.push(fn);
        } else {
          throw new Error('Illegal middleware');
        }
      });

      this.router[method].apply(this.router, args);
    }
  }, {
    key: '_respond',
    value: function _respond(promise, res) {

      if (!promise) {
        throw new Error('Promise is undefined.');
      }

      promise.then(function (data) {
        return res.json(data);
      })['catch'](function (err) {

        var result = { error: err.message || err };
        var status = typeof err.status === 'number' ? err.status : 500;

        res.status(status).json(result);
      });
    }
  }]);

  return Router;
}();

module.exports = Router;