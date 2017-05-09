"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
exports.writeToStream = (source, stream, encoding) => {
    let isPaused = true;
    const pauseToggle = new rxjs_1.Subject();
    const resumeSource = () => {
        pauseToggle.next(true);
    };
    const pauseSource = () => {
        pauseToggle.next(false);
    };
    const completeSource = () => {
        pauseToggle.complete();
    };
    const pausableSource = pauseToggle.switchMap(val => {
        //logger.log('switch: ', val)
        return val ? rxjs_1.Observable.from(source, rxjs_1.Scheduler.async) : rxjs_1.Observable.never();
    });
    const sourceFinished = rxjs_1.Observable.concat(source, rxjs_1.Observable.of(true), rxjs_1.Scheduler.async).takeLast(1).map(v => {
        completeSource();
        return v;
    });
    const pausableSourceFinished = rxjs_1.Observable.concat(pausableSource, rxjs_1.Observable.of(true), rxjs_1.Scheduler.async).takeLast(1).map(v => {
        stream.end();
        return v;
    });
    //logger.logObservable(pausableSource,'\x1b[1;34m[pausable source]\x1b[0m')
    const onEnd = (...args) => {
        //logger.log('stream ended', args)
        completeSource();
    };
    const onClose = (...args) => {
        //logger.log('stream closed', args)
        completeSource();
    };
    stream.on('drain', resumeSource);
    stream.on('close', onClose);
    stream.on('end', onEnd);
    const subscription = pausableSource.subscribe((data) => {
        //logger.log('write data: ', data.length)
        const wrote = stream.write(data, () => {
            //console.log('did write data')
        });
        wrote || pauseSource();
    }, (error) => {
        stream.emit('error', error);
    }, () => {
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