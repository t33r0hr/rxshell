import { Observable, Scheduler } from 'rx'
import * as RxNode from 'rx-node'
import { ChildProcess } from 'child_process'
import { Readable } from 'stream'
import { ReadStream } from 'fs'
import { createInterface } from 'readline'

import { DataType } from './interfaces'

import {
  ChildProcessData, ChildProcessBuffer, ChildProcessError,
  StreamData
} from '../data'
 

export class RxWrapper {
  
  constructor(readonly childProcess:ChildProcess){}

  private _stdout=<NodeJS.ReadableStream>this.childProcess.stdout
  private _stderr=<NodeJS.ReadableStream>this.childProcess.stderr

  readonly stdout:Observable<DataType>=RxNode.fromStream<DataType>(this.childProcess.stdout,'end')
  readonly stderr:Observable<DataType>=RxNode.fromStream<DataType>(this.childProcess.stderr,'end')
  readonly end=Observable.fromEvent(this.childProcess,'exit',(code:number,signal)=>({code,signal})).map( e => e.code )

  get stream():Observable<StreamData<DataType>> {
    const stdoutSource = this.stdout.map ( stdout => ({stdout}) )
    const stderrSource = this.stderr.map ( stderr => ({stderr}) )
    return Observable.merge(this.stdout,this.stderr)
  }

  private createLineInterface ( stream:NodeJS.ReadableStream ) {
    return createInterface({
      input: stream
    })
  }

  linewise ( stream:'stdout'|'stderr'|NodeJS.ReadableStream ):Observable<DataType> {

    if ( 'string' === typeof stream )
    {
      return this.linewise(this.childProcess[stream])
    }
    const lineInterface = this.createLineInterface(stream)
    return Observable.fromEvent(lineInterface,'line',(data:DataType)=>{
      return data
    })
    .takeUntil(Observable.fromEvent(lineInterface,'close'))

  }
}