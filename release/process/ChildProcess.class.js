"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var command_1 = require("../command");
var wrapper_class_1 = require("./wrapper.class");
exports.ProcessWrapper = wrapper_class_1.ProcessWrapper;
var ChildProcess = (function () {
    function ChildProcess(options) {
        this.options = options;
        this.stdin = process.stdin;
    }
    /**
     * spawn child process and return pid
     * @return {Promise<number>} [description]
     */
    ChildProcess.prototype.spawn = function () {
        var command = command_1.parseCommand(this.options.command);
        var cwd = this.options.cwd || process.cwd();
        if (/debug/.test(process.env.NODE_ENV || '')) {
            console.log('spawn command:', command, cwd);
        }
        /*const child = cp.spawn(command.commandName,command.args,{
          cwd
        })*/
        this.ref = new wrapper_class_1.ProcessWrapper(command.commandName, command.args, cwd);
        //Observable.interval(300,Scheduler.async).subscribe( val => this.ref.write(`${val}`) )
        return this.ref.stream;
    };
    return ChildProcess;
}());
exports.ChildProcess = ChildProcess;
//# sourceMappingURL=ChildProcess.class.js.map