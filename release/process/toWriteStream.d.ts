/// <reference types="node" />
import { Observable } from 'rxjs';
import { Writable } from 'stream';
export declare const writeToStream: (source: Observable<Buffer>, stream: Writable, encoding: string) => Observable<boolean | Buffer>;
