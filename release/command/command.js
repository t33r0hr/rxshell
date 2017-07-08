"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const exec_1 = require("../process/exec");
const data_1 = require("../data");
exports.command = (commandName, ...defaultArgs) => {
    const execCommand = (args, cwd) => {
        return exec_1.exec({
            command: {
                commandName,
                args: defaultArgs.concat(args)
            },
            cwd
        }).map(data => {
            if (data_1.typechecks.isStdoutData(data)) {
                return `${data.stdout}`;
            }
            if (data_1.typechecks.isStderrData(data))
                return `${data.stderr}`;
        });
    };
    return execCommand;
};
//# sourceMappingURL=command.js.map