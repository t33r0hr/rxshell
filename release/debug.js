"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prefix = 'rxshell';
exports.log = (format, ...args) => {
    if (process.env.NODE_ENV && process.env.NODE_ENV === 'debug') {
        console.log(`%s ${format}`, prefix, ...args);
    }
};
//# sourceMappingURL=debug.js.map