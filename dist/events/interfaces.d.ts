/// <reference types="node" />
/** events */
export declare type ChildProcessEventName = 'fail' | 'close' | 'stdout' | 'stderr';
export interface ChildProcessEvent<ChildProcessEventName> {
    name: ChildProcessEventName;
}
export interface ChildProcessFailEvent extends ChildProcessEvent<'fail'> {
    error: Error;
}
export interface ChildProcessCloseEvent extends ChildProcessEvent<'close'> {
    code: number;
    signal: string;
}
export interface ChildProcessDataEvent<ChildProcessEventName> extends ChildProcessEvent<ChildProcessEventName> {
    data: Buffer;
}
export interface ChildProcessStderrDataEvent extends ChildProcessDataEvent<'stderr'> {
}
export interface ChildProcessStdoutDataEvent extends ChildProcessDataEvent<'stdout'> {
}
