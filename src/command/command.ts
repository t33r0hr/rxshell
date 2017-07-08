import { Observable } from 'rxjs'
import { exec } from '../process/exec'
import { StreamData, StderrData, StdoutData, typechecks as DataTypeChecks } from '../data'

export const command = ( commandName:string, ...defaultArgs:string[] ) => {

  const execCommand = ( args:string[], cwd?:string ):Observable<string> => {
    return exec({
      command: {
        commandName,
        args: defaultArgs.concat(args)
      },
      cwd
    }).map ( data => {
      if ( DataTypeChecks.isStdoutData(data) )
      {
        return `${data.stdout}`
      }
      if ( DataTypeChecks.isStderrData(data) )      
        return `${data.stderr}`
    } )
  }

  return execCommand
}