"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = require("../command");
const cp = require("child_process");
const RxWrapper_class_1 = require("./RxWrapper.class");
function spawn(options) {
    const command = command_1.parseCommand(options.command);
    const cwd = options.cwd || process.cwd();
    if (/debug/.test(process.env.NODE_ENV || '')) {
        console.log('spawn command:', command, cwd);
    }
    const child = cp.spawn(command.commandName, command.args, {
        cwd
    });
    /*child.on('error',(error)=>{
      console.log( 'child process error', error )
      console.error(error)
    })
    child.stderr.on('data',console.error)
    child.stdout.on('data',data => console.log('stdout: %s', data))
    child.on('close',(code)=>{
      console.log('process closed', code)
    })*/
    return new RxWrapper_class_1.RxWrapper(child);
}
exports.spawn = spawn;
//# sourceMappingURL=spawn.js.map