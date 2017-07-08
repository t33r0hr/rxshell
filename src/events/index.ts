import { 
  ChildProcessEventName, ChildProcessEvent,
  ChildProcessFailEvent, ChildProcessCloseEvent, ChildProcessDataEvent  
} from './interfaces'
export * from './interfaces'


export function createChildProcessFailEvent (error:Error):ChildProcessFailEvent {
  return {
    name: 'fail',
    error
  }
}

export function createChildProcessCloseEvent (code:number,signal:string):ChildProcessCloseEvent {
  return {
    name: 'close',
    code, 
    signal
  }
}

export function createChildProcessDataEvent (type:'stdout'|'stderr', data:Buffer):ChildProcessDataEvent {
  return  {
    name: type,
    data
  }
}
