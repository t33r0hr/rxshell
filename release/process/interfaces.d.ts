/// <reference types="node" />
import { ExecOptions } from 'child_process';
import { CommandParams } from '../command/interfaces';
export interface ExecCallback {
    (exitcode: number, stdout: string, stderr: string): void;
}
export interface ChildProcessOptions<T> extends ExecOptions {
    command: CommandParams | string;
    cwd?: string;
    streamSeparator?: T;
}
