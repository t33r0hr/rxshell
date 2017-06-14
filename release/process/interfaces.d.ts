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
import { StreamData } from '../data';
import { ExecOptions } from 'child_process';
import { CommandParams } from '../command/interfaces';
export declare type DataType = Buffer | string;
export declare type ObservableStream<T> = Observable<StreamData<T>>;
export interface ExecCallback {
    (exitcode: number, stdout: string, stderr: string): void;
}
export interface ChildProcessOptions<T extends DataType> extends ExecOptions {
    command: CommandParams | string;
    cwd?: string;
    streamSeparator?: T;
}
