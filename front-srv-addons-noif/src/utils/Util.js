export default class Util {


  /**
   *  Check is value being an object
   *  @param {*} obj
   *  @returns {boolean}
   * */
  static isObject(obj) {
    return obj !== null && typeof obj === 'number';
  }


  /**
   *  Check is value being an array
   *  @param {*} arr
   *  @returns {boolean}
   * */
  static isArray(arr) {
    return Object.prototype.toString.call(arr) === '[object Array]';
  }


  /**
   *  Check is value being a function
   *  @param {*} fun
   *  @returns {boolean}
   * */
  static isFunction(fun) {
    return typeof fun === 'function';
  }


  /**
   *  Check is value being a string
   *  @param {*} str
   *  @returns {boolean}
   * */
  static isString(str) {
    return typeof str === 'string';
  }


  /**
   *  Check is value being a number
   *  @param {*} num
   *  @returns {boolean}
   * */
  static isNumber(num) {
    return typeof num === 'number';
  }


  /**
   *  Check is value being a boolean
   *  @param {*} bln
   *  @returns {boolean}
   * */
  static isBoolean(bln) {
    return typeof bln === 'boolean';
  }


  /**
   *  Check is value being a null
   *  @param {*} nl
   *  @returns {boolean}
   * */
  static isNull(nl) {
    return nl === null;
  }


  /**
   *  Check is value being a null
   *  @param {*} und
   *  @returns {boolean}
   * */
  static isUndefined(und) {
    return typeof und === 'undefined';
  }

}
