import { Observable } from 'rxjs'
import * as path from 'path'
import { CommandParams, parseCommand } from '../command'
import { StreamData, typechecks } from '../data'
import { CommandArgument } from '../arguments/interfaces'
import { exec, createChildProcess, ChildProcess } from '../process'


export const find = ( args:string[], pwd:string=process.cwd() ):Observable<string> => {
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
    streamSeparator: new Buffer('\n')
  })

  return stream
}