"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var command_1 = require("../command");
var ChildProcess_class_1 = require("./ChildProcess.class");
var StreamSocket;
(function (StreamSocket) {
    StreamSocket[StreamSocket["stderr"] = 0] = "stderr";
    StreamSocket[StreamSocket["stdout"] = 1] = "stdout";
    StreamSocket[StreamSocket["stdin"] = 2] = "stdin";
})(StreamSocket = exports.StreamSocket || (exports.StreamSocket = {}));
exports.createChildProcess = function (commandOptions, opts) {
    if ('string' === typeof commandOptions) {
        return exports.createChildProcess(__assign({ command: command_1.parseCommand(commandOptions) }, opts));
    }
    return new ChildProcess_class_1.ChildProcess(commandOptions);
};
exports.exec = function (commandOptions, opts) {
    var cp = exports.createChildProcess(commandOptions);
    return cp.spawn();
};
//# sourceMappingURL=exec.js.map