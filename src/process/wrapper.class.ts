import { Observable, Scheduler } from 'rxjs'
import { ChildProcess, spawn } from 'child_process'
import { fromReadable } from './fromReadable'
import { writeToStream } from './toWriteStream'

import {
  ChildProcessData, ChildProcessBuffer, ChildProcessError,
  StreamData, StdoutData, StderrData
} from '../data'


import {
  ChildProcessEventName,
  ChildProcessEvent, 
  ChildProcessFailEvent, ChildProcessCloseEvent,
  ChildProcessDataEvent, ChildProcessStderrDataEvent, ChildProcessStdoutDataEvent,
  createChildProcessCloseEvent, createChildProcessDataEvent, createChildProcessFailEvent
} from '../events'

export type ObservableStream<T> = Observable<StreamData<T>>

export class ProcessWrapper {

  constructor(commandName:string,args:string[],cwd:string=process.cwd()){
    this.childProcess = spawn(commandName,args,{
      cwd
    })
    this.__onBecomeWritable = Observable.fromEvent(this.childProcess,'writeable')

    this.bindChildProcess()
  }

  private childProcess:ChildProcess

  private __onFail:Observable<ChildProcessFailEvent>
  private __onClose:Observable<ChildProcessCloseEvent>
  private __onStdoutData:Observable<ChildProcessData<Buffer>>
  private __onStderrData:Observable<ChildProcessData<Buffer>>
  
  private __onBecomeWritable

  private __lastError:string

  private __buffer_out:any[]
  
  write(value:Buffer|string){
    if ( typeof value === 'string' )
    {
      return this.write(new Buffer(value,'utf8'))
    }
    writeToStream(Observable.of(value),this.childProcess.stdin,'utf8')
  }

  get end():Observable<number>{
    return this.__onClose.map(e=>e.code)
  }

  get stdout():Observable<Buffer>{
    return Observable.from(this.__onStdoutData).map( eventData => eventData.data )
      .takeUntil(
          Observable.race(this.__onClose,this.__onFail)
        )
  }
  
  get stderr():Observable<Buffer>{
    return Observable.from(this.__onStderrData).map( eventData => eventData.data )
      .takeUntil(
          Observable.race(this.__onClose,this.__onFail)
        )
  }

  get stream():Observable<StreamData<Buffer>> {
    return Observable.merge(
      this.stdout.map(  (data:Buffer):StdoutData<Buffer> => {
        return {
          stdout: data
        }
      } ),
      this.stderr.map(  (data:Buffer):StderrData<Buffer> => {
        return {
          stderr: data
        }
      } )
    )
    .takeUntil(
      Observable.merge(
        this.__onClose.flatMap(
          event => event.code 
          ? Observable.throw(Error(`Finished with code ${event.code}. Last Error: ${this.__lastError}` )) 
          : Observable.of(true) 
        ),
        this.__onFail.flatMap((error) => Observable.throw(error))
      )
    )
  }

  protected bindChildProcess(){

    this.__onFail = Observable.fromEvent(this.childProcess,'error',createChildProcessFailEvent)
    this.__onClose = Observable.fromEvent(this.childProcess,'close',createChildProcessCloseEvent)

    this.__onStdoutData = fromReadable(this.childProcess.stdout).map(data=>createChildProcessDataEvent('stdout',data))
    this.__onStderrData = fromReadable(this.childProcess.stderr).map(data=>createChildProcessDataEvent('stderr',data))



    /*this.__onStdoutData = Observable.fromEvent(this.ref.stdout,'data',(data:Buffer)=>({data}))
    this.__onStderrData = Observable.fromEvent(this.ref.stderr,'data',(data:Buffer)=>({data}))*/
  }
}