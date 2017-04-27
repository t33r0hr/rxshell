import { Observable, Scheduler } from 'rxjs'
import { StreamData } from '../data'
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


export const exec = ( commandOptions:ChildProcessOptions<Buffer>|string, opts?:any ):ObservableStream<Buffer> => {
  const cp = createChildProcess(commandOptions)
  return cp.spawn()
}