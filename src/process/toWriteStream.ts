import { Observable, Observer, Subscription, Subject, Scheduler } from 'rxjs'
import { Writable, WritableOptions } from 'stream'

export const writeToStream = ( source:Observable<Buffer>, stream:Writable, encoding:string ) => {

  let isPaused = true

  const pauseToggle:Subject<boolean> = new Subject()
  const resumeSource = () => { //logger.log('resume source'); 
    pauseToggle.next(true) 
  }
  const pauseSource = () => { //logger.log('pause source'); 
    pauseToggle.next(false) 
  }
  const completeSource = () => { //logger.log('complete source'); 
    pauseToggle.complete() 
  }


  const pausableSource = pauseToggle.switchMap(val => {
    //logger.log('switch: ', val)
    return val ? Observable.from(source,Scheduler.async) : Observable.never()
  } )

  const sourceFinished = Observable.concat(source,Observable.of(true),Scheduler.async).takeLast(1).map ( v => {
    completeSource()
    return v
  } )

  const pausableSourceFinished = Observable.concat(pausableSource,Observable.of(true),Scheduler.async).takeLast(1).map ( v => {
    stream.end()
    return v
  } )

  //logger.logObservable(pausableSource,'\x1b[1;34m[pausable source]\x1b[0m')

  const onEnd = ( ...args:any[] ) => {
    //logger.log('stream ended', args)
    completeSource()
  }

  const onClose = ( ...args:any[] ) => {
    //logger.log('stream closed', args)
    completeSource()
  }

  stream.on('drain',resumeSource)
  stream.on('close',onClose)
  stream.on('end',onEnd)

  const subscription = pausableSource.subscribe(
    ( data ) => {
      //logger.log('write data: ', data.length)
      const wrote = stream.write(data,()=>{
        //console.log('did write data')
      })    
      wrote || pauseSource()
    },
    ( error ) => {
      stream.emit('error',error)
    },
    () => {
      //stream.end()
      //logger.log('ended stream')
      stream.removeListener('drain',resumeSource)
      stream.removeListener('close',onClose)
      stream.removeListener('end',onEnd)
    }
  )

  /*logger.logObservable(
    Observable.concat(source.takeLast(1),Observable.of(true),Scheduler.async).skip(1).single().map ( v => {
      completeSource()
      return v
    } ) ,
    'source'
  )*/

  resumeSource()
  return sourceFinished

  /*const onEnd = Observable.fromEvent(stream,'end',(event)=>true).map ( ends => {
    console.log('write stream ended')
    return ends
  } )*/

  //return onEnd.concat(Scheduler.async)
}