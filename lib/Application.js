'use strict';
const Uri = require('./utils/Uri');


class Application {


  constructor(manifest) {


    super();


    manifest = manifest || {};


    if (!manifest) {
      throw new Error(`Manifest should be provided`);
    }


    // Set for global access
    Object.app = this;


    this.plugins = new Map();
    this.s = new Store('app', {});


    this.manifest = manifest;


    (this.manifest.plugins || []).forEach(meta => {
      let Constructor = meta.type;
      this.definePlugin(new Constructor(meta.id));
    });

  }


  /*
   *   ==================
   *        Plugins
   *   ==================
   */

  fire(uri) {


    let u;
    let plugin;


    if (!uri) {
      return;
    }


    u = Uri.parse(uri);


    if (!u) {
      throw new Error(`Illegal plugin uri "${uri}"`);
    }


    plugin = this.plugins.get(u.type);


    if (!plugin) {
      throw new Error(`No such plugin: "${u.type}"`);
    }


    arguments[0] = u.host;


    return plugin
        .fire
        .apply(plugin, arguments);

  }


  definePlugin(ev) {


    if (!ev || this.plugins.has(ev.id)) {
      return;
    }


    ev.init(this.manifest);


    this.plugins.set(ev.id, ev);


    return this;

  }


  dropPlugin(id) {
    this.plugins.delete(id);
    return this;
  }


  /**
   *  Check is such plugin exists
   *  @param {!string} name - Plugin name.
   *  @returns {boolean} is exists
   * */
  isPluginExists(name) {
    return this.plugins.has(name);
  }


  /**
   *  Check is such event exists
   *  @param {!string} uri - Event uri (e.g plugin://eventName).
   *  @returns {boolean} is exists
   * */
  isEventExists(uri) {


    let u = Uri.parse(uri);
    let plugin;


    if (!u) {
      throw new Error(`Illegal event uri "${uri}"`);
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
  prop(target, key, value) {


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
  _getProp(obj, key) {


    var result;
    var keys;


    if (!key) {
      return obj;
    }


    keys = key.split('.');
    result = obj;


    for (let k of keys) {


      if (!result) {
        return result;
      }


      result = result[k];

    }


    return result;

  }


  /**
   *  Set property of target object.
   *  @param {!object} target - Target object.
   *  @param {!string} key - Property key
   *  @param {*} value - Property value
   * */
  _setProp(obj, key, value) {


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


    let compositeKey;


    for (let k of keys) {

      let newVal = result[k];

      if (typeof newVal !== 'undefined') {
        result = newVal;
      } else {
        result = result[k] = {};
      }

    }


    result[target] = value;


    keys.push(target);


    if (value && Object.prototype.toString.call(value).slice(-7, -1) === 'Object') {
      keys.push(Object.keys(value).slice());
    }


    // notify watcher by key and global watcher
    for (let k of keys) {


      compositeKey = compositeKey ? `${compositeKey}.${k}` : k;


      let watcher = this.watchers[compositeKey];


      if (watcher) {
        watcher(this._getProp(obj, compositeKey));
      }

    }

  }

}


module.exports = Application;
