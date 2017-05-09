"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const path = require("path");
const ChildProcess_class_1 = require("./ChildProcess.class");
const PROJECT_ROOT = path.resolve(__dirname, '../../');
let colorCnt = 0;
const colors = [32, 32, 33, 34, 35];
const logStream = (name, small = false) => (stream, callback) => {
    const c = colorCnt++ % colors.length;
    const color = ['\x1b[' + colors[c] + 'm', '\x1b[0m'];
    const t = process.hrtime();
    const __log = (f, ...args) => {
        console.log(color[0] + f + color[1], ...args);
    };
    const logT = () => {
        const d = process.hrtime(t);
        __log('%s::%s', name, d);
    };
    __log('stream %s', name);
    const sub = stream.subscribe(buffer => {
        logT();
        __log('buffer size: %s', buffer.length);
        !small && __log('-'.repeat(64));
        !small && __log('%s', buffer);
        !small && __log('-'.repeat(64));
    }, error => {
        logT();
        !small && __log('Error on "%s"', stream);
        console.error(error);
        callback && callback(error);
    }, () => {
        logT();
        __log('stream "%s" finished', name);
        sub && sub.unsubscribe();
        callback && callback();
    });
};
const logStreamData = (name, small = false) => (stream, callback) => {
    return logStream(name, small)(stream.map(item => new Buffer(JSON.stringify({
        stdout: item.stdout ? item.stdout.toString() : false,
        stderr: item.stderr ? item.stderr.toString() : false
    }))), callback);
};
const spawnChild = (options) => {
    const child = new ChildProcess_class_1.ChildProcess(options);
    return child.spawn();
    //return spawn(options)
};
describe('testing child process', () => {
    describe('exec find at ' + PROJECT_ROOT, function () {
        this.timeout(10 * 1000);
        it('finds all files', (done) => {
            spawnChild({
                //command: 'ts-node ./src/sim.proc.ts --exitCode 0',
                command: 'find ./node_modules -type file',
                cwd: path.resolve(PROJECT_ROOT)
            })
                .bufferCount(20).toArray().toPromise().then(data => {
                console.log('result', data);
                done();
            })
                .catch(error => {
                done(error);
                console.log('failed with error');
                console.error(error);
            });
        });
    });
});
//# sourceMappingURL=ChildProcess.spec.js.map