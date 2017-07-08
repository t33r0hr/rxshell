"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const child_process_1 = require("child_process");
const fromReadable_1 = require("./fromReadable");
const toWriteStream_1 = require("./toWriteStream");
const events_1 = require("../events");
class ProcessWrapper {
    constructor(commandName, args, cwd = process.cwd()) {
        this.childProcess = child_process_1.spawn(commandName, args, {
            cwd
        });
        this.__onBecomeWritable = rxjs_1.Observable.fromEvent(this.childProcess, 'writeable');
        this.bindChildProcess();
    }
    write(value) {
        if (typeof value === 'string') {
            return this.write(new Buffer(value, 'utf8'));
        }
        toWriteStream_1.writeToStream(rxjs_1.Observable.of(value), this.childProcess.stdin, 'utf8');
    }
    get end() {
        return this.__onClose.map(e => e.code);
    }
    get stdout() {
        return rxjs_1.Observable.from(this.__onStdoutData).map(eventData => eventData.data)
            .takeUntil(rxjs_1.Observable.race(this.__onClose, this.__onFail));
    }
    get stderr() {
        return rxjs_1.Observable.from(this.__onStderrData).map(eventData => eventData.data)
            .takeUntil(rxjs_1.Observable.race(this.__onClose, this.__onFail));
    }
    get stream() {
        return rxjs_1.Observable.merge(this.stdout.map((data) => {
            return {
                stdout: data
            };
        }), this.stderr.map((data) => {
            return {
                stderr: data
            };
        }))
            .takeUntil(rxjs_1.Observable.merge(this.__onClose.flatMap(event => event.code
            ? rxjs_1.Observable.throw(Error(`Finished with code ${event.code}. Last Error: ${this.__lastError}`))
            : rxjs_1.Observable.of(true)), this.__onFail.flatMap((error) => rxjs_1.Observable.throw(error))));
    }
    bindChildProcess() {
        this.__onFail = rxjs_1.Observable.fromEvent(this.childProcess, 'error', events_1.createChildProcessFailEvent);
        this.__onClose = rxjs_1.Observable.fromEvent(this.childProcess, 'close', events_1.createChildProcessCloseEvent);
        this.__onStdoutData = fromReadable_1.fromReadable(this.childProcess.stdout).map(data => events_1.createChildProcessDataEvent('stdout', data));
        this.__onStderrData = fromReadable_1.fromReadable(this.childProcess.stderr).map(data => events_1.createChildProcessDataEvent('stderr', data));
        /*this.__onStdoutData = Observable.fromEvent(this.ref.stdout,'data',(data:Buffer)=>({data}))
        this.__onStderrData = Observable.fromEvent(this.ref.stderr,'data',(data:Buffer)=>({data}))*/
    }
}
exports.ProcessWrapper = ProcessWrapper;
//# sourceMappingURL=wrapper.class.js.map