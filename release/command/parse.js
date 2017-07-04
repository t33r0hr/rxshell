"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseCommand = function (command) {
    if ('string' !== typeof command) {
        return command;
    }
    var _a = command.split(' ') || [''], commandName = _a[0], args = _a.slice(1);
    return {
        commandName: commandName,
        args: args
    };
};
//# sourceMappingURL=parse.js.map