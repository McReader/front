'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Application = require('./Application');

var _Application2 = _interopRequireDefault(_Application);

var _Plugin = require('./Plugin');

var _Plugin2 = _interopRequireDefault(_Plugin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

exports['default'] = {
  Application: _Application2['default'],
  Plugin: _Plugin2['default']
};
module.exports = exports['default'];