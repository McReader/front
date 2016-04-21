'use strict';

class Uri {


    constructor(params) {
        this.params = params || {};
    }


    setParams(all) {
        this.params = all;
        return this;
    }


    updateParams(delta) {
        Object.assign(this.params, delta);
        return this;
    }


    clearParams() {
        this.params = {};
    }


    toString() {
        var n, r, sep, v, _ref;
        r = (this.host ? (this.type ? '' + this.type + '://' + this.host + '/' : '//' + this.host + '/') : '') + this.path.join('/');
        sep = '?';
        _ref = this.params;
        for (n in _ref) {
            v = _ref[n];
            r += sep + n + '=' + encodeURIComponent(v);
            if (sep === '?') {
                sep = '&';
            }
        }
        if (this.hash) {
            r += '#' + this.hash;
        }
        return r;
    }


    static parse(s, params) {


        var index;


        if (s && s instanceof Uri) {
            return s;
        }


        var result = new Uri(params);


        if (!s) {
            return result;
        }


        if (!s.split) {
            s = '' + s;
        }


        if ((index = s.indexOf('://')) > -1) {
            result.type = s.slice(0, +(index - 1) + 1 || 9e9);
            s = s.slice(index + 1);
        }


        if ((index = s.indexOf('#')) > -1) {
            result.hash = s.slice(index + 1);
            s = s.slice(0, +(index - 1) + 1 || 9e9);
        }


        var parts = s.split('?');
        var origin = parts[0];
        result.query = parts[1];


        if (result.query) {

            let p = result.query.split('&');

            for (let pair of p) {

                if ((index = pair.split('=')).length > 1) {
                    result.params[index[0]] = decodeURIComponent(index[1]);
                }

            }

        }


        result.id = origin;


        index = origin.split('/');


        if (index[0] === '') {
            index.shift();
            if (index[0] === '') {
                index.shift();
                result.host = index.shift();
            }
        }


        result.path = index;


        result.host = result.host || '*';


        return result;

    }

}


module.exports = Uri;