import { Observable, Scheduler } from 'rxjs'
import * as tty from 'tty'
export * from './interfaces'


import { 
  ChildProcessOptions, ExecCallback
} from './interfaces'

import {
  ChildProcessData, ChildProcessBuffer, ChildProcessError,
  StreamData
} from '../data'

import { CommandParams, parseCommand } from '../command'

import {
  ChildProcessEventName,
  ChildProcessEvent, 
  ChildProcessFailEvent, ChildProcessCloseEvent,
  ChildProcessDataEvent, ChildProcessStderrDataEvent, ChildProcessStdoutDataEvent
} from '../events'

import * as cp from 'child_process'
import { fromReadable } from './fromReadable'

import { ObservableStream, ProcessWrapper } from './wrapper.class'

export { ObservableStream, ProcessWrapper }


export class ChildProcess {

  constructor(options:ChildProcessOptions<Buffer>)
  {
    this.options = options
    this.stdin = (<any>process.stdin)
  }

  options:ChildProcessOptions<Buffer>
  pid:number

  private ref:ProcessWrapper

  private stdin:tty.ReadStream

  /**
   * spawn child process and return pid
   * @return {Promise<number>} [description]
   */
  spawn():ObservableStream<Buffer>{

    const command = parseCommand(this.options.command)
    const cwd = this.options.cwd || process.cwd()
    //console.log('spawn command:', command, cwd )
    /*const child = cp.spawn(command.commandName,command.args,{
      cwd
    })*/
    this.ref = new ProcessWrapper(command.commandName,command.args,cwd)
    //Observable.interval(300,Scheduler.async).subscribe( val => this.ref.write(`${val}`) )
    return this.ref.stream
  }

  private __lastError:string

  

}
