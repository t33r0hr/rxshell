"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var sep = new Buffer("\n");
var toBuffer = function (source) {
    if (source instanceof Buffer)
        return source;
    return new Buffer(source);
};
var join = function (leftBuffer, rightBuffer) {
    leftBuffer = toBuffer(leftBuffer || '');
    rightBuffer = toBuffer(rightBuffer || '');
    var leftSize = leftBuffer.length;
    var rightSize = rightBuffer.length;
    var out = new Buffer(leftSize + rightSize);
    leftSize && leftBuffer.copy(out);
    rightSize && rightBuffer.copy(out, leftSize);
    return out;
};
var total = function (buffers) {
    var size = 0;
    buffers.forEach(function (b) { return size += b.length; });
    return size;
};
var concatBuffers = function () {
    var sources = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        sources[_i] = arguments[_i];
    }
    return sources.reduce(join);
};
var splitBuffer = function (source, separator) {
    var chunks = [];
    var offset = 0;
    do {
        var pos = source.slice(offset).indexOf(separator) + offset;
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
        var tmp = new Buffer('');
        var emit = function () {
            var buffers = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                buffers[_i] = arguments[_i];
            }
            rxjs_1.Observable.from(buffers).subscribe(nextFn, throwFn);
        };
        var onData = function (data) {
            var chunks = splitBuffer(data, sep);
            var first = concatBuffers(tmp, chunks.shift());
            tmp = chunks.pop();
            emit.apply(void 0, [first].concat(chunks));
            //chunks.forEach( chunk => nextFn(chunk) )
        };
        var nextFn = observer.next ? observer.next.bind(observer) : nop;
        var returnFnCallback = observer.complete ? observer.complete.bind(observer) : nop;
        var returnFn = function () {
            if (tmp && tmp.length > 0) {
                nextFn(tmp);
            }
            returnFnCallback();
        };
        var throwFn = observer.error ? observer.error.bind(observer) : nop;
        readable.on('data', function (data) {
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