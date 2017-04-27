import { Observable, Observer, Subscription, Subject, Scheduler } from 'rxjs'
import { Writable, WritableOptions } from 'stream'

export const writeToStream = ( source:Observable<Buffer>, stream:Writable, encoding:string ) => {

  let isPaused = true

  const pauseToggle:Subject<boolean> = new Subject()
  const resumeSource = () => { pauseToggle.next(true) }
  const pauseSource = () => { pauseToggle.next(false) }
  const pausableSource = pauseToggle.switchMap(val => val ? source : Observable.never() )

  const resume = () => pauseToggle.next(true)
  const pause = () => pauseToggle.next(false)

  stream.on('drain',resume)

  const subscription = pausableSource.subscribe(
    ( data ) => {
      if ( !stream.write(data, encoding) )
      {
        pause()
      }
    },
    ( error ) => {
      stream.emit('error',error)
    },
    () => {
      stream.end()
      stream.removeListener('drain',resume)
    }
  )

  return subscription  
}