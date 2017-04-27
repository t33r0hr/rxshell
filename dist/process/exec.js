"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = require("../command");
const ChildProcess_class_1 = require("./ChildProcess.class");
var StreamSocket;
(function (StreamSocket) {
    StreamSocket[StreamSocket["stderr"] = 0] = "stderr";
    StreamSocket[StreamSocket["stdout"] = 1] = "stdout";
    StreamSocket[StreamSocket["stdin"] = 2] = "stdin";
})(StreamSocket = exports.StreamSocket || (exports.StreamSocket = {}));
exports.createChildProcess = (commandOptions, opts) => {
    if ('string' === typeof commandOptions) {
        return exports.createChildProcess(Object.assign({ command: command_1.parseCommand(commandOptions) }, opts));
    }
    return new ChildProcess_class_1.ChildProcess(commandOptions);
};
exports.exec = (commandOptions, opts) => {
    const cp = exports.createChildProcess(commandOptions);
    return cp.spawn();
};
//# sourceMappingURL=exec.js.map