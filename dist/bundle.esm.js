/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */


function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

/* eslint-disable no-else-return */
/* eslint-disable semi */
// npm i @types/node
var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var monthsShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var daysShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
function padWithZero(n) {
    if (n < 10) {
        return "0".concat(n);
    }
    return n.toString();
}
var D = /** @class */ (function () {
    // Constructor
    function D() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        // this._date = new Date(...args)
        this._date = new (Date.bind.apply(Date, __spreadArray([void 0], args, false)))();
    }
    Object.defineProperty(D.prototype, "year", {
        // Getters
        get: function () {
            return this._date.getFullYear();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(D.prototype, "yr", {
        get: function () {
            return parseInt(this._date.getFullYear().toString().slice(-2));
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(D.prototype, "month", {
        get: function () {
            return months[this._date.getMonth()];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(D.prototype, "mon", {
        get: function () {
            return monthsShort[this._date.getMonth()];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(D.prototype, "day", {
        get: function () {
            return days[this._date.getDay()];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(D.prototype, "dy", {
        get: function () {
            return daysShort[this._date.getDay()];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(D.prototype, "date", {
        get: function () {
            return this._date.getDate();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(D.prototype, "hours", {
        get: function () {
            return padWithZero(this._date.getHours());
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(D.prototype, "hrs", {
        get: function () {
            return this._date.getHours();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(D.prototype, "minutes", {
        get: function () {
            return padWithZero(this._date.getMinutes());
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(D.prototype, "mins", {
        get: function () {
            return this._date.getMinutes();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(D.prototype, "seconds", {
        get: function () {
            return padWithZero(this._date.getSeconds());
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(D.prototype, "secs", {
        get: function () {
            return this._date.getSeconds();
        },
        enumerable: false,
        configurable: true
    });
    // Setters
    // TODO: Create Setters
    // set year(newYear) {
    //   this._date.setFullYear(newYear)
    // }
    // Format
    D.prototype.format = function (mask) {
        var _this = this;
        if (mask === void 0) { mask = 'M D, Y'; }
        var maskArray = mask.split('');
        var dateStr = '';
        maskArray.forEach(function (char) {
            switch (char) {
                case 'Y':
                    dateStr += _this.year;
                    break;
                case 'y':
                    dateStr += _this.yr;
                    break;
                case 'M':
                    dateStr += _this.month;
                    break;
                case 'm':
                    dateStr += _this.mon;
                    break;
                case 'D':
                    dateStr += padWithZero(_this._date.getDate());
                    break;
                case 'd':
                    dateStr += _this._date.getDate();
                    break;
                case 'H':
                    dateStr += padWithZero(_this._date.getHours());
                    break;
                case 'h':
                    dateStr += _this._date.getHours();
                    break;
                case 'I':
                    dateStr += padWithZero(_this._date.getMinutes());
                    break;
                case 'i':
                    dateStr += _this._date.getMinutes();
                    break;
                case 'S':
                    dateStr += padWithZero(_this._date.getSeconds());
                    break;
                case 's':
                    dateStr += _this._date.getSeconds();
                    break;
                default:
                    dateStr += char;
            }
        });
        return dateStr;
    };
    // When
    D.prototype.when = function () {
        var now = new D();
        var dy = this.year - now.year;
        var dm = this._date.getMonth() - now._date.getMonth() + dy * 12;
        var dd = this.date - now.date;
        // FIXME: When months would roll back to previous year
        // For example: the difference between  Feb 2020 and
        // Oct 2019 is 4 Months but there is also 1 year diff
        // dy = 1 = 2021 - 2020
        // dm = 5 = 4 - 11 + dy * 12
        // monthsdiff = 5
        if (dm > 11) {
            return "".concat(Math.abs(dy), " year").concat(dy > 1 ? 's' : '', " from now");
        }
        else if (dm < -11) {
            return "".concat(Math.abs(dy), " year").concat(dy < -1 ? 's' : '', " ago");
        }
        else if (dm > 0) {
            return "".concat(dm, " month").concat(dm > 1 ? 's' : '', " from now");
        }
        else if (dm < 0) {
            return "".concat(Math.abs(dm), " month").concat(dm < -1 ? 's' : '', " ago");
        }
        else if (dd > 0) {
            return "".concat(dd, " days ago");
        }
        else if (dd < 0) {
            return "".concat(Math.abs(dd), " days from now");
        }
        else {
            return 'today';
        }
    };
    return D;
}());
// const d = new D()
// console.log(d)
// const date = new Date()
// console.log(date.getFullYear())
// const d = new D(date.getFullYear() - 1, 2)
// console.log(d.year)

export { D as default };
//# sourceMappingURL=bundle.esm.js.map
