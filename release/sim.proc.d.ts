/// <reference types="node" />
import * as tty from 'tty';
export interface SimCommand {
    name: string;
    args?: any[];
}
export interface SimOptions {
    stdout?: tty.WriteStream;
    stderr?: tty.WriteStream;
    stdin?: tty.ReadStream;
    exit?: any;
}
export declare const sim: (simOpts?: SimOptions) => void;
