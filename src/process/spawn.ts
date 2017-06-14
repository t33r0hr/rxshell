import { Observable, Scheduler } from 'rx'

import { 
  ChildProcessOptions, DataType
} from './interfaces'

import { CommandParams, parseCommand } from '../command'
import * as cp from 'child_process'
import { RxWrapper } from './RxWrapper.class'

export function spawn <T extends DataType>( options:ChildProcessOptions<T> ):RxWrapper {

  const command = parseCommand(options.command)
  const cwd = options.cwd || process.cwd()
  if ( /debug/.test(process.env.NODE_ENV||'') )
  {
    console.log('spawn command:', command, cwd )  
  }
  
  const child = cp.spawn(command.commandName,command.args,{
    cwd
  })
  /*child.on('error',(error)=>{
    console.log( 'child process error', error )
    console.error(error)
  })
  child.stderr.on('data',console.error)
  child.stdout.on('data',data => console.log('stdout: %s', data))
  child.on('close',(code)=>{
    console.log('process closed', code)
  })*/
  return new RxWrapper(child)
}

