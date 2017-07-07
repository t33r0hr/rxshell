import { Observable } from 'rxjs'
import * as path from 'path'
import { CommandParams, parseCommand } from '../command'
import { StreamData } from '../data'
import { CommandArgument } from '../arguments/interfaces'
import { exec, createChildProcess, ChildProcess } from '../process'


export const find = ( args:string[], pwd:string=process.cwd() ) => {
  if ( !path.isAbsolute(pwd) )
  {
    pwd = path.relative(process.cwd(),path.resolve(pwd))
  }
  const stream = exec({
    command: {
      commandName:'find',
      args: ['.',...args]
    },
    cwd: pwd,
    streamSeparator: '\n'
  })
  .map ( data => {
    if ( 'string' === typeof data.stdout )
      return data.stdout
    return data.stdout.toString('utf8')
  } )

  return stream
}