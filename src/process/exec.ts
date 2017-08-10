import { Observable, Scheduler } from 'rxjs'
import { StreamData, typechecks } from '../data'
import { parseCommand  } from '../command'
import { ChildProcess, ChildProcessOptions, ObservableStream, ExecCallback } from './ChildProcess.class'


export enum StreamSocket {
  stderr,
  stdout,
  stdin
}


export const createChildProcess = ( commandOptions:ChildProcessOptions<Buffer>|string, opts?:any ):ChildProcess => {
  if ( 'string' === typeof commandOptions )
  {
    return createChildProcess({
      command: parseCommand(commandOptions),
      ...opts
    })
  }
  return new ChildProcess(commandOptions)
}


export const exec = ( commandOptions:ChildProcessOptions<Buffer>|string, opts?:any ):Observable<string> => {
  const cp = createChildProcess(commandOptions)
  return cp.spawn().concatMap ( data => {
    if ( typechecks.isStdoutData(data) ) {
      return Observable.of(data.stdout.toString('utf8'))
    } else {
      return Observable.throw ( new Error(`Error: ${data.stderr}`) )
    }
  } )
}