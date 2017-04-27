import { CommandParams } from './interfaces'

export const parseCommand = ( command:CommandParams|string ):CommandParams => {
  if ( 'string' !== typeof command )
  {
    return command
  }

  const [ commandName, ...args ] = command.split(' ') || ['']
  return {
    commandName,
    args
  }
}
