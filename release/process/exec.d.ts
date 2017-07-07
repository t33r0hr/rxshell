/// <reference types="node" />
import { Observable } from 'rxjs';
import { StreamData } from '../data';
import { ChildProcess, ChildProcessOptions } from './ChildProcess.class';
export declare enum StreamSocket {
    stderr = 0,
    stdout = 1,
    stdin = 2,
}
export declare const createChildProcess: (commandOptions: string | ChildProcessOptions<string>, opts?: any) => ChildProcess;
export declare const exec: (commandOptions: string | ChildProcessOptions<string>, opts?: any) => Observable<StreamData<string | Buffer>>;
