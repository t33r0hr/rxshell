"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var debug = require("../debug");
exports.writeToStream = function (source, stream, encoding) {
    var isPaused = true;
    var pauseToggle = new rxjs_1.Subject();
    var resumeSource = function () {
        pauseToggle.next(true);
    };
    var pauseSource = function () {
        pauseToggle.next(false);
    };
    var completeSource = function () {
        pauseToggle.complete();
    };
    var pausableSource = pauseToggle.asObservable().switchMap(function (val) {
        //logger.log('switch: ', val)
        return val ? rxjs_1.Observable.from(source, rxjs_1.Scheduler.async) : rxjs_1.Observable.never();
    });
    var sourceFinished = rxjs_1.Observable.concat(source, rxjs_1.Observable.of(true), rxjs_1.Scheduler.async).takeLast(1).map(function (v) {
        completeSource();
        return v;
    });
    var pausableSourceFinished = rxjs_1.Observable.concat(pausableSource, rxjs_1.Observable.of(true), rxjs_1.Scheduler.async).takeLast(1).map(function (v) {
        stream.end();
        return v;
    });
    //logger.logObservable(pausableSource,'\x1b[1;34m[pausable source]\x1b[0m')
    var onEnd = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        debug.log('stream ended - args:', args);
        completeSource();
    };
    var onClose = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        debug.log('stream closed - args:', args);
        completeSource();
    };
    stream.on('drain', resumeSource);
    stream.on('close', onClose);
    stream.on('end', onEnd);
    var subscription = pausableSource.subscribe(function (data) {
        debug.log('writing stream data of length: %s', data.length);
        var wrote = stream.write(data, function () {
            //console.log('did write data')
        });
        wrote || pauseSource();
    }, function (error) {
        stream.emit('error', error);
    }, function () {
        //stream.end()
        //logger.log('ended stream')
        stream.removeListener('drain', resumeSource);
        stream.removeListener('close', onClose);
        stream.removeListener('end', onEnd);
    });
    /*logger.logObservable(
      Observable.concat(source.takeLast(1),Observable.of(true),Scheduler.async).skip(1).single().map ( v => {
        completeSource()
        return v
      } ) ,
      'source'
    )*/
    resumeSource();
    return sourceFinished;
    /*const onEnd = Observable.fromEvent(stream,'end',(event)=>true).map ( ends => {
      console.log('write stream ended')
      return ends
    } )*/
    //return onEnd.concat(Scheduler.async)
};
//# sourceMappingURL=toWriteStream.js.map