'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Uri = function () {
    function Uri(params) {
        _classCallCheck(this, Uri);

        this.params = params || {};
    }

    _createClass(Uri, [{
        key: 'setParams',
        value: function setParams(all) {
            this.params = all;
            return this;
        }
    }, {
        key: 'updateParams',
        value: function updateParams(delta) {
            Object.assign(this.params, delta);
            return this;
        }
    }, {
        key: 'clearParams',
        value: function clearParams() {
            this.params = {};
        }
    }, {
        key: 'toString',
        value: function toString() {
            var n, r, sep, v, _ref;
            r = (this.host ? this.type ? '' + this.type + '://' + this.host + '/' : '//' + this.host + '/' : '') + this.path.join('/');
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
    }], [{
        key: 'parse',
        value: function parse(s, params) {

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

                var p = result.query.split('&');

                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = p[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var pair = _step.value;


                        if ((index = pair.split('=')).length > 1) {
                            result.params[index[0]] = decodeURIComponent(index[1]);
                        }
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
    }]);

    return Uri;
}();

module.exports = Uri;