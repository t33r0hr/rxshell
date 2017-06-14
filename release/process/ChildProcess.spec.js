"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const ceylon_1 = require("ceylon");
const path = require("path");
const spawn_1 = require("./spawn");
const exec_1 = require("./exec");
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
    const child = spawn_1.spawn(options);
    return child;
    //return spawn(options)
};
describe('testing child process', () => {
    describe('exec find at ' + PROJECT_ROOT, function () {
        this.timeout(10 * 1000);
        it('runs with no errors', (done) => {
            let cnt = 0;
            const child = exec_1.exec({
                //command: 'ts-node ./src/sim.proc.ts --exitCode 0',
                command: 'npm run sim:ok',
                cwd: path.resolve(PROJECT_ROOT)
            })
                .subscribe(line => {
                //console.log('line %s:\n----\n%s\n----\n', cnt++, line )
                cnt++;
            }, done, done);
        });
        it('runs with errors', (done) => {
            let cnt = 0;
            const child = exec_1.exec({
                //command: 'ts-node ./src/sim.proc.ts --exitCode 0',
                command: 'npm run sim:fail',
                cwd: path.resolve(PROJECT_ROOT)
            }, true)
                .subscribe(line => {
                //console.log('line %s:\n----\n%s\n----\n', cnt++, line )
            }, error => {
                ceylon_1.default(error).toExist();
                done();
            }, () => {
                done('Should have caught an error.');
            });
        });
    });
});
//# sourceMappingURL=ChildProcess.spec.js.map