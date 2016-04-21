'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _MiddlewarePlugin = require('./MiddlewarePlugin');

var _MiddlewarePlugin2 = _interopRequireDefault(_MiddlewarePlugin);

var _Router = require('./Router');

var _Router2 = _interopRequireDefault(_Router);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

exports['default'] = {
  MiddlewarePlugin: _MiddlewarePlugin2['default'],
  Router: _Router2['default']
};
module.exports = exports['default'];