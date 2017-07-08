/// <reference types="node" />
import { ChildProcessFailEvent, ChildProcessCloseEvent, ChildProcessDataEvent } from './interfaces';
export * from './interfaces';
export declare function createChildProcessFailEvent(error: Error): ChildProcessFailEvent;
export declare function createChildProcessCloseEvent(code: number, signal: string): ChildProcessCloseEvent;
export declare function createChildProcessDataEvent(type: 'stdout' | 'stderr', data: Buffer): ChildProcessDataEvent;
