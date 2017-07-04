"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
var path = require("path");
var ChildProcess_class_1 = require("./ChildProcess.class");
var PROJECT_ROOT = path.resolve(__dirname, '../../');
var colorCnt = 0;
var colors = [32, 32, 33, 34, 35];
var logStream = function (name, small) {
    if (small === void 0) { small = false; }
    return function (stream, callback) {
        var c = colorCnt++ % colors.length;
        var color = ['\x1b[' + colors[c] + 'm', '\x1b[0m'];
        var t = process.hrtime();
        var __log = function (f) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            console.log.apply(console, [color[0] + f + color[1]].concat(args));
        };
        var logT = function () {
            var d = process.hrtime(t);
            __log('%s::%s', name, d);
        };
        __log('stream %s', name);
        var sub = stream.subscribe(function (buffer) {
            logT();
            __log('buffer size: %s', buffer.length);
            !small && __log('-'.repeat(64));
            !small && __log('%s', buffer);
            !small && __log('-'.repeat(64));
        }, function (error) {
            logT();
            !small && __log('Error on "%s"', stream);
            console.error(error);
            callback && callback(error);
        }, function () {
            logT();
            __log('stream "%s" finished', name);
            sub && sub.unsubscribe();
            callback && callback();
        });
    };
};
var logStreamData = function (name, small) {
    if (small === void 0) { small = false; }
    return function (stream, callback) {
        return logStream(name, small)(stream.map(function (item) { return new Buffer(JSON.stringify({
            stdout: item.stdout ? item.stdout.toString() : false,
            stderr: item.stderr ? item.stderr.toString() : false
        })); }), callback);
    };
};
var spawnChild = function (options) {
    var child = new ChildProcess_class_1.ChildProcess(options);
    return child.spawn();
    //return spawn(options)
};
describe('testing child process', function () {
    describe('exec find at ' + PROJECT_ROOT, function () {
        this.timeout(10 * 1000);
        it('finds all files', function (done) {
            spawnChild({
                //command: 'ts-node ./src/sim.proc.ts --exitCode 0',
                command: 'find ./node_modules -type file',
                cwd: path.resolve(PROJECT_ROOT)
            })
                .bufferCount(20).toArray().toPromise().then(function (data) {
                //console.log('result',data)
                done();
            })
                .catch(function (error) {
                done(error);
                console.log('failed with error');
                console.error(error);
            });
        });
    });
});
//# sourceMappingURL=ChildProcess.spec.js.map