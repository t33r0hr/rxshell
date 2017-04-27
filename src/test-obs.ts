import { Observable, Scheduler, Subject } from 'rxjs'

const intervalT = 100
const maxT = 3000

const t0 = Date.now()
let lastLog = t0
let cnt = 0

const logSubscribe = <T>( target:Observable<T> ):void => {
  console.time('targetLog')
  const sub = target.subscribe(
      (data:T) => {
        const now = Date.now()
        console.log('%s\t%sms\t%s\t%s',cnt++,(now-t0),now-lastLog,data)
        lastLog = now
      },
      error => {
        console.error(error)
      },
      () => {
        console.timeEnd('targetLog')
        console.log('done')
        if ( sub )
        {
          sub.unsubscribe()
        }
      }
    )

}

const source = Observable.interval(intervalT).takeUntil(Observable.timer(3000,1))

const pauseToggle:Subject<boolean> = new Subject()

const result = pauseToggle.switchMap( val => val ? source : Observable.never() )

setTimeout(()=>pauseToggle.next(true),500)
setTimeout(()=>pauseToggle.next(false),800)
setTimeout(()=>pauseToggle.next(true),1400)
setTimeout(()=>pauseToggle.complete(),1500)

setTimeout(()=>{
  console.log('bye')
  process.exit()
},5000)
logSubscribe(result)
