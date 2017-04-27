"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseCommand = (command) => {
    if ('string' !== typeof command) {
        return command;
    }
    const [commandName, ...args] = command.split(' ') || [''];
    return {
        commandName,
        args
    };
};
//# sourceMappingURL=parse.js.map