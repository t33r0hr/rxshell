import { ChildProcessData, ChildProcessBuffer, ChildProcessError, StderrData, StdoutData, StreamData } from './interfaces'


export function isStdoutData<T extends Buffer|string> ( other:any ):other is StdoutData<T> {
  return ( 'stdout' in other )
}

export function isStderrData<T extends Buffer|string> ( other:any ):other is StderrData<T> {
  return ( 'stderr' in other )
}

export function isStreamData<T extends Buffer|string> ( other:any ):other is StreamData<T> {
  return isStdoutData(other) || isStderrData(other)
} 