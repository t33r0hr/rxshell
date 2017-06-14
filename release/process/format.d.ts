/// <reference types="node" />
import { DataType } from './interfaces';
import { StreamData } from '../data';
export declare function isStreamData<T>(data: any): data is StreamData<T>;
export declare function isDataType(data: any): data is DataType;
export declare function toBuffer(value: DataType): Buffer;
export declare function toString(value: DataType): string;
export declare const typeMap: {
    string: (value: DataType) => string;
    buffer: (value: DataType) => Buffer;
    stdout: (value: DataType) => {
        stdout: DataType;
    };
    stderr: (value: DataType) => {
        stderr: DataType;
    };
};
export declare function format(data: StreamData<DataType> | DataType): any;
