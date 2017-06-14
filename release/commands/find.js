"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const spawn_1 = require("../process/spawn");
const format_1 = require("../process/format");
exports.find = (args, pwd = process.cwd()) => {
    if (!path.isAbsolute(pwd)) {
        pwd = path.relative(process.cwd(), path.resolve(pwd));
    }
    const stream = spawn_1.spawn({
        command: `find . ${args.join(' ')}`,
        cwd: pwd,
        streamSeparator: new Buffer('\n')
    });
    const output = stream.linewise('stdout');
    return output.map(row => {
        return format_1.format(row).toString();
    });
};
//# sourceMappingURL=find.js.map