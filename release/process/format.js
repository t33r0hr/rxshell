"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isStreamData(data) {
    return ('object' === typeof data) && (data.hasOwnProperty('stdout') || data.hasOwnProperty('stderr'));
}
exports.isStreamData = isStreamData;
function isDataType(data) {
    return ('string' === typeof data
        ||
            data instanceof Buffer);
}
exports.isDataType = isDataType;
function toBuffer(value) {
    if (value instanceof Buffer)
        return value;
    return new Buffer(value);
}
exports.toBuffer = toBuffer;
function toString(value) {
    if (value instanceof Buffer)
        return value.toString('utf8');
    return value;
}
exports.toString = toString;
exports.typeMap = {
    string: toString,
    buffer: toBuffer,
    stdout: (value) => ({ stdout: value }),
    stderr: (value) => ({ stderr: value })
};
function format(data) {
    if (isStreamData(data)) {
        return format(data.stdout || data.stderr);
    }
    return {
        toString: () => toString(data),
        toBuffer: () => toBuffer(data),
        toStdout: () => { stdout: data; },
        toStderr: () => { stderr: data; }
    };
}
exports.format = format;
//# sourceMappingURL=format.js.map