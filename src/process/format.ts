import { DataType } from './interfaces'

import {
  ChildProcessData, ChildProcessBuffer, ChildProcessError,
  StreamData
} from '../data'


export function isStreamData <T> ( data:any ):data is StreamData<T> {
  return ( 'object' === typeof data ) && ( data.hasOwnProperty('stdout')  ||  data.hasOwnProperty('stderr') )
}

export function isDataType ( data:any ):data is DataType {
  return (
      'string' === typeof data
      ||
      data instanceof Buffer
    )
}

export function toBuffer ( value:DataType ):Buffer {
  if ( value instanceof Buffer )
    return value
  return new Buffer(value)
}

export function toString ( value:DataType ):string {
  if ( value instanceof Buffer )
    return value.toString('utf8')
  return value
}

export const typeMap = {
  string: toString,
  buffer: toBuffer,
  stdout: ( value:DataType ) => ({stdout: value}),
  stderr: ( value:DataType ) => ({stderr: value})
}

export function format ( data:StreamData<DataType>|DataType ) {
  if ( isStreamData<DataType>(data) )
  {
    return format ( data.stdout || data.stderr ) 
  }
  return {
    toString: () => toString(data),
    toBuffer: () => toBuffer(data),
    toStdout: () => {stdout: data},
    toStderr: () => {stderr: data}      
  }
}