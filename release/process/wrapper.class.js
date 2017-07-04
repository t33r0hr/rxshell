"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var child_process_1 = require("child_process");
var fromReadable_1 = require("./fromReadable");
var toWriteStream_1 = require("./toWriteStream");
var ProcessWrapper = (function () {
    function ProcessWrapper(commandName, args, cwd) {
        if (cwd === void 0) { cwd = process.cwd(); }
        this.childProcess = child_process_1.spawn(commandName, args, {
            cwd: cwd
        });
        this.__onBecomeWritable = rxjs_1.Observable.fromEvent(this.childProcess, 'writeable');
        this.bindChildProcess();
    }
    ProcessWrapper.prototype.write = function (value) {
        if (typeof value === 'string') {
            return this.write(new Buffer(value, 'utf8'));
        }
        toWriteStream_1.writeToStream(rxjs_1.Observable.of(value), this.childProcess.stdin, 'utf8');
    };
    Object.defineProperty(ProcessWrapper.prototype, "end", {
        get: function () {
            return this.__onClose.map(function (e) { return e.code; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProcessWrapper.prototype, "stdout", {
        get: function () {
            return rxjs_1.Observable.from(this.__onStdoutData)
                .takeUntil(rxjs_1.Observable.race(this.__onClose, this.__onFail));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProcessWrapper.prototype, "stderr", {
        get: function () {
            return rxjs_1.Observable.from(this.__onStderrData)
                .takeUntil(rxjs_1.Observable.race(this.__onClose, this.__onFail));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProcessWrapper.prototype, "stream", {
        get: function () {
            var _this = this;
            return rxjs_1.Observable.merge(this.__onStdoutData.map(function (event) {
                return { stdout: event };
            }), this.__onStderrData.map(function (event) {
                _this.__lastError = event;
                return { stderr: event };
            }))
                .takeUntil(rxjs_1.Observable.merge(this.__onClose.flatMap(function (event) { return event.code
                ? rxjs_1.Observable.throw(Error("Finished with code " + event.code + ". Last Error: " + _this.__lastError))
                : rxjs_1.Observable.of(true); }), this.__onFail.flatMap(function (error) { return rxjs_1.Observable.throw(error); })));
        },
        enumerable: true,
        configurable: true
    });
    ProcessWrapper.prototype.bindChildProcess = function () {
        this.__onFail = rxjs_1.Observable.fromEvent(this.childProcess, 'error', function (error) { return ({ error: error }); });
        this.__onClose = rxjs_1.Observable.fromEvent(this.childProcess, 'close', function (code, signal) { return ({ code: code, signal: signal }); });
        this.__onStdoutData = fromReadable_1.fromReadable(this.childProcess.stdout);
        this.__onStderrData = fromReadable_1.fromReadable(this.childProcess.stderr);
        /*this.__onStdoutData = Observable.fromEvent(this.ref.stdout,'data',(data:Buffer)=>({data}))
        this.__onStderrData = Observable.fromEvent(this.ref.stderr,'data',(data:Buffer)=>({data}))*/
    };
    return ProcessWrapper;
}());
exports.ProcessWrapper = ProcessWrapper;
//# sourceMappingURL=wrapper.class.js.map