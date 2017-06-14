/// <reference types="rx-core" />
/// <reference types="rx-core-binding" />
/// <reference types="rx-lite" />
/// <reference types="rx-lite-aggregates" />
/// <reference types="rx-lite-backpressure" />
/// <reference types="rx-lite-coincidence" />
/// <reference types="rx-lite-experimental" />
/// <reference types="rx-lite-joinpatterns" />
/// <reference types="rx-lite-time" />
/// <reference types="node" />
import { Observable } from 'rx';
import { StreamData } from '../data';
import { DataType, ChildProcessOptions } from './interfaces';
import { RxWrapper } from './RxWrapper.class';
export declare enum StreamSocket {
    stderr = 0,
    stdout = 1,
    stdin = 2,
}
export declare const createChildProcess: <T extends DataType>(commandOptions: string | ChildProcessOptions<T>, opts?: any) => RxWrapper;
export declare const exec: (commandOptions: string | ChildProcessOptions<DataType>, linewise?: boolean) => Observable<StreamData<string | Buffer | Error>>;
