"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const data_1 = require("../data");
const process_1 = require("../process");
exports.find = (args, pwd = process.cwd()) => {
    if (!path.isAbsolute(pwd)) {
        pwd = path.relative(process.cwd(), path.resolve(pwd));
    }
    const stream = process_1.exec({
        command: {
            commandName: 'find',
            args: ['.', ...args]
        },
        cwd: pwd,
        streamSeparator: new Buffer('\n')
    })
        .map(data => {
        if (data_1.typechecks.isStdoutData(data))
            return data.stdout.toString('utf8');
        return '';
    });
    return stream;
};
//# sourceMappingURL=find.js.map