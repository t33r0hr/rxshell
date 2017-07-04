"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var process_1 = require("../process");
exports.find = function (args, pwd) {
    if (pwd === void 0) { pwd = process.cwd(); }
    if (!path.isAbsolute(pwd)) {
        pwd = path.relative(process.cwd(), path.resolve(pwd));
    }
    var stream = process_1.exec({
        command: {
            commandName: 'find',
            args: ['.'].concat(args)
        },
        cwd: pwd,
        streamSeparator: '\n'
    }).map(function (data) { return data.stdout; });
    return stream;
};
//# sourceMappingURL=find.js.map