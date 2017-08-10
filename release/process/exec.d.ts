/// <reference types="node" />
import { Observable } from 'rxjs';
import { ChildProcess, ChildProcessOptions } from './ChildProcess.class';
export declare enum StreamSocket {
    stderr = 0,
    stdout = 1,
    stdin = 2,
}
export declare const createChildProcess: (commandOptions: string | ChildProcessOptions<Buffer>, opts?: any) => ChildProcess;
export declare const exec: (commandOptions: string | ChildProcessOptions<Buffer>, opts?: any) => Observable<string>;
