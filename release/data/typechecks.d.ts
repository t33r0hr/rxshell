/// <reference types="node" />
import { StderrData, StdoutData, StreamData } from './interfaces';
export declare function isStdoutData<T extends Buffer | string>(other: any): other is StdoutData<T>;
export declare function isStderrData<T extends Buffer | string>(other: any): other is StderrData<T>;
export declare function isStreamData<T extends Buffer | string>(other: any): other is StreamData<T>;
