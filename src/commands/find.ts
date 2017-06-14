import { Observable } from 'rx'
import * as path from 'path'
import { CommandParams, parseCommand } from '../command'
import { StreamData } from '../data'
import { CommandArgument } from '../arguments/interfaces'
import { spawn } from '../process/spawn'

import { format } from '../process/format'


export const find = ( args:string[], pwd:string=process.cwd() ) => {
  if ( !path.isAbsolute(pwd) )
  {
    pwd = path.relative(process.cwd(),path.resolve(pwd))
  }
  const stream = spawn({
    command: `find . ${args.join(' ')}`,
    cwd: pwd,
    streamSeparator: new Buffer('\n')
  })

  const output = stream.linewise('stdout')

  return output.map ( row => {
    return format(row).toString()
  } )
}