'use strict';
class Plugin {


  /**
   *  Constructor
   *  @param {!string} id - Unique identificator
   * */
  constructor(id) {
    this.id = id;
  }


  /**
   *   @protected
   *   Initialize plugin
   *   @param {!Object} manifest - Application manifest
   *   @returns {Plugin}
   * */
  init(manifest) {
    return this;
  }


  /**
   *  Fire event by name
   *  @param {!string} name - Name of event.
   *  @returns {*}
   * */
  fire(name) {


    let fn = this[name || ''];


    if (!fn) {
      throw new Error(`${name} is not a ${this.id} plugin's function.`);
    }


    Array.prototype.shift.call(arguments);


    return fn.apply(this, arguments);

  }


  /**
   *  Check is event exists by name.
   *  @param {!string} name - Name of event.
   *  @returns {boolean} is exists.
   * */
  has(name) {


    return typeof name === 'string' &&
        typeof this[name] === 'function';

  }

}


module.exports = Plugin;