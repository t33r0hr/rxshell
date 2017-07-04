"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var intervalT = 100;
var maxT = 3000;
var t0 = Date.now();
var lastLog = t0;
var cnt = 0;
var logSubscribe = function (target) {
    console.time('targetLog');
    var sub = target.subscribe(function (data) {
        var now = Date.now();
        console.log('%s\t%sms\t%s\t%s', cnt++, (now - t0), now - lastLog, data);
        lastLog = now;
    }, function (error) {
        console.error(error);
    }, function () {
        console.timeEnd('targetLog');
        console.log('done');
        if (sub) {
            sub.unsubscribe();
        }
    });
};
var source = rxjs_1.Observable.interval(intervalT).takeUntil(rxjs_1.Observable.timer(3000, 1));
var pauseToggle = new rxjs_1.Subject();
var result = pauseToggle.switchMap(function (val) { return val ? source : rxjs_1.Observable.never(); });
setTimeout(function () { return pauseToggle.next(true); }, 500);
setTimeout(function () { return pauseToggle.next(false); }, 800);
setTimeout(function () { return pauseToggle.next(true); }, 1400);
setTimeout(function () { return pauseToggle.complete(); }, 1500);
setTimeout(function () {
    console.log('bye');
    process.exit();
}, 5000);
logSubscribe(result);
//# sourceMappingURL=test-obs.js.map