/// <reference types="node" />
import { Observable } from 'rxjs';
import { StreamData } from '../data';
export declare const find: (args: string[], pwd?: string) => Observable<StreamData<Buffer>>;
