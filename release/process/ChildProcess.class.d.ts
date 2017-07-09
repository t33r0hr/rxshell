/// <reference types="node" />
export * from './interfaces';
import { ChildProcessOptions } from './interfaces';
import { ObservableStream, ProcessWrapper } from './wrapper.class';
export { ObservableStream, ProcessWrapper };
export declare class ChildProcess {
    constructor(options: ChildProcessOptions<Buffer>);
    options: ChildProcessOptions<Buffer>;
    pid: number;
    private ref;
    private stdin;
    /**
     * spawn child process and return pid
     * @return {Promise<number>} [description]
     */
    spawn(): ObservableStream<Buffer>;
    wrap(): ProcessWrapper;
    private __lastError;
}
