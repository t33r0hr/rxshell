import { Observable, Scheduler } from 'rx'
import { StreamData } from '../data'
import { DataType, ChildProcessOptions, ObservableStream, ExecCallback } from './interfaces'
import { parseCommand  } from '../command'
import { RxWrapper } from './RxWrapper.class'
import { spawn } from './spawn'
import { format, typeMap } from './format'


export enum StreamSocket {
  stderr,
  stdout,
  stdin
}


export const createChildProcess = <T extends DataType>( commandOptions:ChildProcessOptions<T>|string, opts?:any ):RxWrapper => {
  if ( 'string' === typeof commandOptions )
  {
    return createChildProcess<T>({
      command: commandOptions,
      ...opts
    })
  }
  return spawn<T>(commandOptions)
}

const mapError = ( value:DataType ):Error => {
  if ( value instanceof Buffer )
    return mapError ( value.toString('utf8') )
  return new Error(value)
}


export const exec = ( commandOptions:ChildProcessOptions<DataType>|string, linewise:boolean=false ):ObservableStream<DataType|Error> => {
  const cp = createChildProcess(commandOptions)

  if ( linewise )
  {
    const errorSource = cp.stderr.map(mapError)
    return Observable.merge(cp.stdout,errorSource.flatMap(error => Observable.throw(error)))
  }
  return cp.stream
}