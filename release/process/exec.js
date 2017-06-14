"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rx_1 = require("rx");
const spawn_1 = require("./spawn");
var StreamSocket;
(function (StreamSocket) {
    StreamSocket[StreamSocket["stderr"] = 0] = "stderr";
    StreamSocket[StreamSocket["stdout"] = 1] = "stdout";
    StreamSocket[StreamSocket["stdin"] = 2] = "stdin";
})(StreamSocket = exports.StreamSocket || (exports.StreamSocket = {}));
exports.createChildProcess = (commandOptions, opts) => {
    if ('string' === typeof commandOptions) {
        return exports.createChildProcess(Object.assign({ command: commandOptions }, opts));
    }
    return spawn_1.spawn(commandOptions);
};
const mapError = (value) => {
    if (value instanceof Buffer)
        return mapError(value.toString('utf8'));
    return new Error(value);
};
exports.exec = (commandOptions, linewise = false) => {
    const cp = exports.createChildProcess(commandOptions);
    if (linewise) {
        const errorSource = cp.stderr.map(mapError);
        return rx_1.Observable.merge(cp.stdout, errorSource.flatMap(error => rx_1.Observable.throw(error)));
    }
    return cp.stream;
};
//# sourceMappingURL=exec.js.map