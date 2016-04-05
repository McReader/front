'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Uri = require('./utils/Uri');

var Application = function () {
  function Application(manifest) {
    var _this = this;

    _classCallCheck(this, Application);

    manifest = manifest || {};

    if (!manifest) {
      throw new Error('Manifest should be provided');
    }

    // Set for global access
    Object.app = this;

    this.plugins = new Map();
    this.s = new Store('app', {});

    this.manifest = manifest;

    (this.manifest.plugins || []).forEach(function (meta) {
      var Constructor = meta.type;
      _this.definePlugin(new Constructor(meta.id));
    });
  }

  /*
   *   ==================
   *        Plugins
   *   ==================
   */

  _createClass(Application, [{
    key: 'fire',
    value: function fire(uri) {

      var u = void 0;
      var plugin = void 0;

      if (!uri) {
        return;
      }

      u = Uri.parse(uri);

      if (!u) {
        throw new Error('Illegal plugin uri "' + uri + '"');
      }

      plugin = this.plugins.get(u.type);

      if (!plugin) {
        throw new Error('No such plugin: "' + u.type + '"');
      }

      arguments[0] = u.host;

      return plugin.fire.apply(plugin, arguments);
    }
  }, {
    key: 'definePlugin',
    value: function definePlugin(ev) {

      if (!ev || this.plugins.has(ev.id)) {
        return;
      }

      ev.init(this.manifest);

      this.plugins.set(ev.id, ev);

      return this;
    }
  }, {
    key: 'dropPlugin',
    value: function dropPlugin(id) {
      this.plugins['delete'](id);
      return this;
    }

    /**
     *  Check is such plugin exists
     *  @param {!string} name - Plugin name.
     *  @returns {boolean} is exists
     * */

  }, {
    key: 'isPluginExists',
    value: function isPluginExists(name) {
      return this.plugins.has(name);
    }

    /**
     *  Check is such event exists
     *  @param {!string} uri - Event uri (e.g plugin://eventName).
     *  @returns {boolean} is exists
     * */

  }, {
    key: 'isEventExists',
    value: function isEventExists(uri) {

      var u = Uri.parse(uri);
      var plugin = void 0;

      if (!u) {
        throw new Error('Illegal event uri "' + uri + '"');
      }

      plugin = this.plugins.get(u.type);

      if (!plugin) {
        return false;
      }

      return plugin.has(u.host);
    }

    /*
     *   ==================
     *        Property
     *   ==================
     */

    /**
     *  Set (third argument provided), or get (first, second argument provided) property of target object.
     *  @param {!object} target - Target object.
     *  @param {!string} key - Property key
     *  @param {*} [value] - Property value
     * */

  }, {
    key: 'prop',
    value: function prop(target, key, value) {

      if (arguments.length > 2) {
        return this._setProp(target, key, value);
      } else {
        return this._getProp(target, key);
      }
    }

    /**
     *  Get property of target object.
     *  @param {!object} obj - Target object.
     *  @param {!string} key - Property key
     * */

  }, {
    key: '_getProp',
    value: function _getProp(obj, key) {

      var result;
      var keys;

      if (!key) {
        return obj;
      }

      keys = key.split('.');
      result = obj;

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = keys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var k = _step.value;


          if (!result) {
            return result;
          }

          result = result[k];
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator['return']) {
            _iterator['return']();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return result;
    }

    /**
     *  Set property of target object.
     *  @param {!object} target - Target object.
     *  @param {!string} key - Property key
     *  @param {*} value - Property value
     * */

  }, {
    key: '_setProp',
    value: function _setProp(obj, key, value) {

      var keys;
      var result;
      var target;

      if (!key) {
        return;
      }

      if (!obj) {
        obj = {};
      }

      keys = key.split('.');
      result = obj;
      target = keys.pop();

      var compositeKey = void 0;

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = keys[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var k = _step2.value;


          var newVal = result[k];

          if (typeof newVal !== 'undefined') {
            result = newVal;
          } else {
            result = result[k] = {};
          }
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2['return']) {
            _iterator2['return']();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      result[target] = value;

      keys.push(target);

      if (value && Object.prototype.toString.call(value).slice(-7, -1) === 'Object') {
        keys.push(Object.keys(value).slice());
      }

      // notify watcher by key and global watcher
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = keys[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var _k = _step3.value;


          compositeKey = compositeKey ? compositeKey + '.' + _k : _k;

          var watcher = this.watchers[compositeKey];

          if (watcher) {
            watcher(this._getProp(obj, compositeKey));
          }
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3['return']) {
            _iterator3['return']();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }
    }
  }]);

  return Application;
}();

module.exports = Application;