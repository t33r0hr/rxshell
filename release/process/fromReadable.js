"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const sep = new Buffer("\n");
const toBuffer = (source) => {
    if (source instanceof Buffer)
        return source;
    return new Buffer(source);
};
const join = (leftBuffer, rightBuffer) => {
    leftBuffer = toBuffer(leftBuffer || '');
    rightBuffer = toBuffer(rightBuffer || '');
    const leftSize = leftBuffer.length;
    const rightSize = rightBuffer.length;
    const out = new Buffer(leftSize + rightSize);
    leftSize && leftBuffer.copy(out);
    rightSize && rightBuffer.copy(out, leftSize);
    return out;
};
const total = (buffers) => {
    let size = 0;
    buffers.forEach(b => size += b.length);
    return size;
};
const concatBuffers = (...sources) => {
    return sources.reduce(join);
};
const splitBuffer = (source, separator) => {
    const chunks = [];
    let offset = 0;
    do {
        const pos = source.slice(offset).indexOf(separator) + offset;
        if (pos > offset) {
            chunks.push(source.slice(offset, pos));
            offset = pos + 1;
        }
        else {
            chunks.push(source.slice(offset));
            offset = source.length + 1;
        }
    } while (offset < source.length);
    return chunks;
};
exports.fromReadable = function (readable) {
    return rxjs_1.Observable.create(function (observer) {
        function nop() { }
        ;
        let tmp = new Buffer('');
        const emit = (...buffers) => {
            rxjs_1.Observable.from(buffers).subscribe(nextFn, throwFn);
        };
        const onData = (data) => {
            const chunks = splitBuffer(data, sep);
            const first = concatBuffers(tmp, chunks.shift());
            tmp = chunks.pop();
            emit(first, ...chunks);
            //chunks.forEach( chunk => nextFn(chunk) )
        };
        var nextFn = observer.next ? observer.next.bind(observer) : nop;
        var returnFnCallback = observer.complete ? observer.complete.bind(observer) : nop;
        const returnFn = () => {
            if (tmp && tmp.length > 0) {
                nextFn(tmp);
            }
            returnFnCallback();
        };
        var throwFn = observer.error ? observer.error.bind(observer) : nop;
        readable.on('data', (data) => {
            onData(data);
        });
        readable.on('close', returnFn);
        readable.on('end', returnFn);
        readable.on('error', throwFn);
        return new rxjs_1.Subscription(function () {
            readable.removeListener('data', nextFn);
            readable.removeListener('end', returnFn);
            readable.removeListener('close', returnFn);
            readable.removeListener('error', throwFn);
        });
    }, rxjs_1.Scheduler.asap);
};
//# sourceMappingURL=fromReadable.js.map