"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const options = {
    exitCode: 0,
    duration: 1000 * 3,
    errorAfter: 0
};
if (process && process.argv.length > 2) {
    for (var i = 2; i < process.argv.length; i++) {
        const arg = process.argv[i];
        if (arg.startsWith('--')) {
            const opt = arg.slice(2);
            options[opt] = process.argv[++i];
        }
    }
}
const randomInt = (max = 100, min = 0) => {
    return Math.floor(Math.random() * (max - min)) + min;
};
const chr_a = "a".charCodeAt(0);
const chr_z = "z".charCodeAt(0);
const randomChr = () => String.fromCharCode(randomInt(chr_z, chr_a));
const randomWord = (length = randomInt(23, 2)) => {
    const out = [];
    while (out.length < length) {
        out.push(randomChr());
    }
    return out.join('');
};
const text = (words = randomInt(1000, 300)) => {
    let cnt = 0;
    let currentRow = [];
    const rows = [currentRow];
    while (cnt++ < words) {
        currentRow.push(randomWord());
        if (cnt % 23 === 0) {
            currentRow = [];
            rows.push(currentRow);
        }
    }
    return rows
        .map(row => row.join(' ')).join('\n');
};
const simEvents = [
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
exports.sim = (simOpts) => {
    const { stdout = process.stdout, stderr = process.stderr, stdin = process.stdin, exit = process.exit } = simOpts || {};
    const MAX_GAP = 300;
    const startTs = Date.now();
    let idx = 0;
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
    const send = (data) => {
        stdout.write(`${idx}/${simEvents.length} - ${data}`);
    };
    const sendError = (data) => {
        stderr.write(data);
    };
    const toError = (data) => {
        if (data instanceof Error) {
            return data;
        }
        return Error(data);
    };
    const spawnError = (data) => {
        if (data.throws) {
            throw toError(data.stderr);
        }
        else {
            const e = toError(data.stderr);
            sendError('Error: ' + e.toString());
            sendError(e.stack);
        }
    };
    let errorSent = false;
    const next = () => {
        const now = Date.now();
        const d = now - startTs;
        const t = Math.min(d, MAX_GAP);
        const simEvent = simEvents[idx++];
        const { delay = randomInt(t, Math.min(t, 100)) } = simEvent;
        const tNext = delay;
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