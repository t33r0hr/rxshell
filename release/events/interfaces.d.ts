/// <reference types="node" />
/** events */
export declare type ChildProcessEventName = 'fail' | 'close' | 'stdout' | 'stderr';
export interface ChildProcessEvent {
    name: ChildProcessEventName;
}
export interface ChildProcessFailEvent extends ChildProcessEvent {
    error: Error;
}
export interface ChildProcessCloseEvent extends ChildProcessEvent {
    code: number;
    signal: string;
}
export interface ChildProcessDataEvent extends ChildProcessEvent {
    data: Buffer;
}
export interface ChildProcessStderrDataEvent extends ChildProcessDataEvent {
    name: 'stderr';
}
export interface ChildProcessStdoutDataEvent extends ChildProcessDataEvent {
    name: 'stdout';
}
