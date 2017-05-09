"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = require("../command");
const wrapper_class_1 = require("./wrapper.class");
exports.ProcessWrapper = wrapper_class_1.ProcessWrapper;
class ChildProcess {
    constructor(options) {
        this.options = options;
        this.stdin = process.stdin;
    }
    /**
     * spawn child process and return pid
     * @return {Promise<number>} [description]
     */
    spawn() {
        const command = command_1.parseCommand(this.options.command);
        const cwd = this.options.cwd || process.cwd();
        if (/debug/.test(process.env.NODE_ENV || '')) {
            console.log('spawn command:', command, cwd);
        }
        /*const child = cp.spawn(command.commandName,command.args,{
          cwd
        })*/
        this.ref = new wrapper_class_1.ProcessWrapper(command.commandName, command.args, cwd);
        //Observable.interval(300,Scheduler.async).subscribe( val => this.ref.write(`${val}`) )
        return this.ref.stream;
    }
}
exports.ChildProcess = ChildProcess;
//# sourceMappingURL=ChildProcess.class.js.map