/// <reference types="node" />
/// <reference types="rx-core" />
/// <reference types="rx-core-binding" />
/// <reference types="rx-lite" />
/// <reference types="rx-lite-aggregates" />
/// <reference types="rx-lite-backpressure" />
/// <reference types="rx-lite-coincidence" />
/// <reference types="rx-lite-experimental" />
/// <reference types="rx-lite-joinpatterns" />
/// <reference types="rx-lite-time" />
import { Observable } from 'rx';
import { ChildProcess } from 'child_process';
import { DataType } from './interfaces';
import { StreamData } from '../data';
export declare class RxWrapper {
    readonly childProcess: ChildProcess;
    constructor(childProcess: ChildProcess);
    private _stdout;
    private _stderr;
    readonly stdout: Observable<DataType>;
    readonly stderr: Observable<DataType>;
    readonly end: Observable<number>;
    readonly stream: Observable<StreamData<DataType>>;
    private createLineInterface(stream);
    linewise(stream: 'stdout' | 'stderr' | NodeJS.ReadableStream): Observable<DataType>;
}
