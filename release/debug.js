"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prefix = 'rxshell';
exports.log = function (format) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    if (process.env.NODE_ENV && process.env.NODE_ENV === 'debug') {
        console.log.apply(console, ["%s " + format, prefix].concat(args));
    }
};
//# sourceMappingURL=debug.js.map