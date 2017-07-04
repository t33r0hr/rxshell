/// <reference types="node" />
import { Observable } from 'rxjs';
import { StreamData } from '../data';
export declare type ObservableStream<T> = Observable<StreamData<T>>;
export declare class ProcessWrapper {
    constructor(commandName: string, args: string[], cwd?: string);
    private childProcess;
    private __onFail;
    private __onClose;
    private __onStdoutData;
    private __onStderrData;
    private __onBecomeWritable;
    private __lastError;
    private __buffer_out;
    write(value: Buffer | string): any;
    readonly end: Observable<number>;
    readonly stdout: Observable<string>;
    readonly stderr: Observable<string>;
    readonly stream: ObservableStream<string>;
    protected bindChildProcess(): void;
}
