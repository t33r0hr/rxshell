"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rx_1 = require("rx");
const RxNode = require("rx-node");
const readline_1 = require("readline");
class RxWrapper {
    constructor(childProcess) {
        this.childProcess = childProcess;
        this._stdout = this.childProcess.stdout;
        this._stderr = this.childProcess.stderr;
        this.stdout = RxNode.fromStream(this.childProcess.stdout, 'end');
        this.stderr = RxNode.fromStream(this.childProcess.stderr, 'end');
        this.end = rx_1.Observable.fromEvent(this.childProcess, 'exit', (code, signal) => ({ code, signal })).map(e => e.code);
    }
    get stream() {
        const stdoutSource = this.stdout.map(stdout => ({ stdout }));
        const stderrSource = this.stderr.map(stderr => ({ stderr }));
        return rx_1.Observable.merge(this.stdout, this.stderr);
    }
    createLineInterface(stream) {
        return readline_1.createInterface({
            input: stream
        });
    }
    linewise(stream) {
        if ('string' === typeof stream) {
            return this.linewise(this.childProcess[stream]);
        }
        const lineInterface = this.createLineInterface(stream);
        return rx_1.Observable.fromEvent(lineInterface, 'line', (data) => {
            return data;
        })
            .takeUntil(rx_1.Observable.fromEvent(lineInterface, 'close'));
    }
}
exports.RxWrapper = RxWrapper;
//# sourceMappingURL=RxWrapper.class.js.map