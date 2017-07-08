"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createChildProcessFailEvent(error) {
    return {
        name: 'fail',
        error
    };
}
exports.createChildProcessFailEvent = createChildProcessFailEvent;
function createChildProcessCloseEvent(code, signal) {
    return {
        name: 'close',
        code,
        signal
    };
}
exports.createChildProcessCloseEvent = createChildProcessCloseEvent;
function createChildProcessDataEvent(type, data) {
    return {
        name: type,
        data
    };
}
exports.createChildProcessDataEvent = createChildProcessDataEvent;
//# sourceMappingURL=index.js.map