'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Plugin = function () {

  /**
   *  Constructor
   *  @param {!string} id - Unique identificator
   * */

  function Plugin(id) {
    _classCallCheck(this, Plugin);

    this.id = id;
  }

  /**
   *   @protected
   *   Initialize plugin
   *   @param {!Object} manifest - Application manifest
   *   @returns {Plugin}
   * */


  _createClass(Plugin, [{
    key: 'init',
    value: function init(manifest, meta) {
      return this;
    }

    /**
     *  Fire event by name
     *  @param {!string} name - Name of event.
     *  @returns {*}
     * */

  }, {
    key: 'fire',
    value: function fire(name) {

      var fn = this[name || ''];

      if (!fn) {
        throw new Error(name + ' is not a ' + this.id + ' plugin\'s function.');
      }

      Array.prototype.shift.call(arguments);

      return fn.apply(this, arguments);
    }

    /**
     *  Check is event exists by name.
     *  @param {!string} name - Name of event.
     *  @returns {boolean} is exists.
     * */

  }, {
    key: 'has',
    value: function has(name) {

      return typeof name === 'string' && typeof this[name] === 'function';
    }
  }]);

  return Plugin;
}();

exports['default'] = Plugin;
module.exports = exports['default'];