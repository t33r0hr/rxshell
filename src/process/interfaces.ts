import { Observable, Scheduler } from 'rx'
import { StreamData } from '../data'
import { ExecOptions } from 'child_process'
import { CommandParams } from '../command/interfaces'

export type DataType = Buffer|string
export type ObservableStream<T> = Observable<StreamData<T>>

export interface ExecCallback {
  ( exitcode:number, stdout:string, stderr:string ):void
}

export interface ChildProcessOptions<T extends DataType> extends ExecOptions {
  command:CommandParams|string;
  cwd?:string;
  streamSeparator?:T
}
