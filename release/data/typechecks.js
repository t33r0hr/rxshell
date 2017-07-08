"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isStdoutData(other) {
    return ('stdout' in other);
}
exports.isStdoutData = isStdoutData;
function isStderrData(other) {
    return ('stderr' in other);
}
exports.isStderrData = isStderrData;
function isStreamData(other) {
    return isStdoutData(other) || isStderrData(other);
}
exports.isStreamData = isStreamData;
//# sourceMappingURL=typechecks.js.map