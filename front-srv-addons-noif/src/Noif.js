import Util from './utils/Util';


export default class Noif {


  constructor(data) {
    this.data = data;
  }


  /**
   *  Create Noif instance with target data
   *  @param {!Object} data
   *  @returns {Noif}
   * */
  static from(data) {
    if (!data) {
      throw new Error('Data is undefined');
    }
    return new Noif(data);
  }


  /**
   *  Choose property for inspection by name
   *  @param {!string} name - Property name
   *  @returns {Noif}
   * */
  prop(name) {
    if (!Util.isString(name)) {
      throw new Error('Property name should be a "string"');
    }
    this.propName = name;
    this.propValue = this._value.call(this);
    return this;
  }


  /**
   *  Check is current property being a string
   *  @returns {Noif}
   * */
  isString() {
    const valid = Util.isString(this.propValue);
    if (!valid) {
      throw new Error(`${this.propName} should be a string`);
    }
    return this;
  }


  /**
   *  Check is current property being a number
   *  @returns {Noif}
   * */
  isNumber() {
    const valid = Util.isNumber(this.propValue);
    if (!valid) {
      throw new Error(`${this.propName} should be a number`);
    }
    return this;
  }


  /**
   *  Check is current property being a boolean
   *  @returns {Noif}
   * */
  isBoolean() {
    const valid = Util.isBoolean(this.propValue);
    if (!valid) {
      throw new Error(`${this.propName} should be a boolean`);
    }
    return this;
  }


  /**
   *  Check is current property has a value
   *  @returns {Noif}
   * */
  required() {
    const prop = this.propValue;
    if (Util.isUndefined(prop) || Util.isNull(prop === null)) {
      throw new Error(`"${this.propName}" is required.`);
    }
    return this;
  }


  /**
   *  Check is current property equals to provided value
   *  @param {!*} equalTo - Param for comparison
   *  @returns {Noif}
   * */
  eql(equalTo) {
    if (this.propValue !== equalTo) {
      throw new Error(`${this.propName} should be equal to "${equalTo}"`);
    }
    return this;
  }


  /**
   *  Check is current property contains in provided array
   *  @param {!*} arr
   *  @returns {Noif}
   * */
  contains(arr) {
    if (!Util.isArray(arr)) {
      throw new Error(`this function accepts only parameter of Array type`);
    }
    return arr.includes(this.propValue);
  }


  _value() {


    const data = Object.assign({}, this.data);
    const propName = this.propName;


    let result;
    let keys;


    if (!propName) {
      throw new Error('Property name is undefined');
    }


    result = data;
    keys = propName.split('.');


    for (let k of keys) {


      if (!result) {
        return result;
      }


      if (!result.hasOwnProperty(propName)) {
        throw new Error(`Data has no own property ${propName}`);
      }


      result = result[k];

    }


    return result;

  }

}
