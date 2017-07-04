"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var options = {
    exitCode: 0,
    duration: 1000 * 3,
    errorAfter: 0
};
if (process && process.argv.length > 2) {
    for (var i = 2; i < process.argv.length; i++) {
        var arg = process.argv[i];
        if (arg.startsWith('--')) {
            var opt = arg.slice(2);
            options[opt] = process.argv[++i];
        }
    }
}
var randomInt = function (max, min) {
    if (max === void 0) { max = 100; }
    if (min === void 0) { min = 0; }
    return Math.floor(Math.random() * (max - min)) + min;
};
var chr_a = "a".charCodeAt(0);
var chr_z = "z".charCodeAt(0);
var randomChr = function () { return String.fromCharCode(randomInt(chr_z, chr_a)); };
var randomWord = function (length) {
    if (length === void 0) { length = randomInt(23, 2); }
    var out = [];
    while (out.length < length) {
        out.push(randomChr());
    }
    return out.join('');
};
var text = function (words) {
    if (words === void 0) { words = randomInt(1000, 300); }
    var cnt = 0;
    var currentRow = [];
    var rows = [currentRow];
    while (cnt++ < words) {
        currentRow.push(randomWord());
        if (cnt % 23 === 0) {
            currentRow = [];
            rows.push(currentRow);
        }
    }
    return rows
        .map(function (row) { return row.join(' '); }).join('\n');
};
var simEvents = [
    { stdout: 'This is a normal line of text', delay: 300 },
    { stdout: 'This is a normal line of text', delay: 300 },
    { stdout: 'This is a normal line of text', delay: 300 },
    { stdout: 'This is a delayed line of text', delay: 1300 },
    { stdout: 'This is a normal line of text', delay: 300 },
    { stdout: 'This is a normal line of text', delay: 300 },
    { stdout: 'This is a normal line of text with a line break.\n' },
    { stdout: 'This is a normal line of text', delay: 300 },
    { stdout: 'This is a normal line of text', delay: 300 },
    { stdout: 'This is a normal line of text', delay: 300 },
    { stdout: 'This is a normal line of text', delay: 300 },
    { stdout: 'This is a normal line of text with a line break.\n' },
    { stdout: 'This is a normal line of text', delay: 300 },
    { stdout: 'This is a normal line of text', delay: 300 },
    { stdout: 'This is a normal line of text', delay: 300 },
    { stderr: 'This is a not throwing error' },
    { stderr: 'This is a not throwing error' },
    { stdout: 'This is a normal line of text', delay: 300 },
    { stdout: 'This is a normal line of text', delay: 300 },
    { stdout: 'This is a normal line of text', delay: 300 },
    { stderr: 'This is a throwing error', throws: true },
    { stdout: 'This is a normal line of text' },
    { stdout: 'This is a normal line of text' },
    { stdout: 'This is a normal line of text' },
    { stderr: 'This is a not throwing error' },
    { stdout: 'This is a normal line of text' },
    { stdout: 'This is a normal line of text' },
    { stdout: 'This is a normal line of text' }
];
exports.sim = function (simOpts) {
    var _a = simOpts || {}, _b = _a.stdout, stdout = _b === void 0 ? process.stdout : _b, _c = _a.stderr, stderr = _c === void 0 ? process.stderr : _c, _d = _a.stdin, stdin = _d === void 0 ? process.stdin : _d, _e = _a.exit, exit = _e === void 0 ? process.exit : _e;
    var MAX_GAP = 300;
    var startTs = Date.now();
    var idx = 0;
    /*
      let commandKey
    
      const keyInput = Observable.fromEvent(stdin,"data")
      const t = 300
      
      const keyBegin = keyInput.throttleTime(t)
      const keyEnd = keyInput.debounceTime(t)
    
    
      keyBegin.subscribe(event => {
        console.log('-'.repeat(32))
        console.log('stdin event:', event)
        console.log('-'.repeat(32))
    
      })
    */
    var send = function (data) {
        stdout.write(idx + "/" + simEvents.length + " - " + data);
    };
    var sendError = function (data) {
        stderr.write(data);
    };
    var toError = function (data) {
        if (data instanceof Error) {
            return data;
        }
        return Error(data);
    };
    var spawnError = function (data) {
        if (data.throws) {
            throw toError(data.stderr);
        }
        else {
            var e = toError(data.stderr);
            sendError('Error: ' + e.toString());
            sendError(e.stack);
        }
    };
    var errorSent = false;
    var next = function () {
        var now = Date.now();
        var d = now - startTs;
        var t = Math.min(d, MAX_GAP);
        var simEvent = simEvents[idx++];
        var _a = simEvent.delay, delay = _a === void 0 ? randomInt(t, Math.min(t, 100)) : _a;
        var tNext = delay;
        if (!simEvent) {
            console.log('error with no events left');
            return exit(options.exitCode);
        }
        if (simEvent.stderr) {
            spawnError(simEvent);
        }
        else {
            send(simEvent.stdout);
        }
        setTimeout(next, tNext);
    };
    //stdin.setRawMode(true)
    //stdin.on('data',(key)=>{
    /*if ( key === '\u0003' ) {
      process.exit();
    }*/
    //next()
    //})
    /*  stdin.setEncoding('utf8')
      stdin.resume()
    */
    next();
};
exports.sim();
//# sourceMappingURL=sim.proc.js.map