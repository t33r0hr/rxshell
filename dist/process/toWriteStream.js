"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
exports.writeToStream = (source, stream, encoding) => {
    let isPaused = true;
    const pauseToggle = new rxjs_1.Subject();
    const resumeSource = () => { pauseToggle.next(true); };
    const pauseSource = () => { pauseToggle.next(false); };
    const pausableSource = pauseToggle.switchMap(val => val ? source : rxjs_1.Observable.never());
    const resume = () => pauseToggle.next(true);
    const pause = () => pauseToggle.next(false);
    stream.on('drain', resume);
    const subscription = pausableSource.subscribe((data) => {
        if (!stream.write(data, encoding)) {
            pause();
        }
    }, (error) => {
        stream.emit('error', error);
    }, () => {
        stream.end();
        stream.removeListener('drain', resume);
    });
    return subscription;
};
//# sourceMappingURL=toWriteStream.js.map