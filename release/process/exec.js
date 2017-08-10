"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const data_1 = require("../data");
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
    return cp.spawn().concatMap(data => {
        if (data_1.typechecks.isStdoutData(data)) {
            return rxjs_1.Observable.of(data.stdout.toString('utf8'));
        }
        else {
            return rxjs_1.Observable.throw(new Error(`Error: ${data.stderr}`));
        }
    });
};
//# sourceMappingURL=exec.js.map