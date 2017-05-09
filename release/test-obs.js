"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const intervalT = 100;
const maxT = 3000;
const t0 = Date.now();
let lastLog = t0;
let cnt = 0;
const logSubscribe = (target) => {
    console.time('targetLog');
    const sub = target.subscribe((data) => {
        const now = Date.now();
        console.log('%s\t%sms\t%s\t%s', cnt++, (now - t0), now - lastLog, data);
        lastLog = now;
    }, error => {
        console.error(error);
    }, () => {
        console.timeEnd('targetLog');
        console.log('done');
        if (sub) {
            sub.unsubscribe();
        }
    });
};
const source = rxjs_1.Observable.interval(intervalT).takeUntil(rxjs_1.Observable.timer(3000, 1));
const pauseToggle = new rxjs_1.Subject();
const result = pauseToggle.switchMap(val => val ? source : rxjs_1.Observable.never());
setTimeout(() => pauseToggle.next(true), 500);
setTimeout(() => pauseToggle.next(false), 800);
setTimeout(() => pauseToggle.next(true), 1400);
setTimeout(() => pauseToggle.complete(), 1500);
setTimeout(() => {
    console.log('bye');
    process.exit();
}, 5000);
logSubscribe(result);
//# sourceMappingURL=test-obs.js.map