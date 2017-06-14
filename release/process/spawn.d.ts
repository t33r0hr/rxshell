import { ChildProcessOptions, DataType } from './interfaces';
import { RxWrapper } from './RxWrapper.class';
export declare function spawn<T extends DataType>(options: ChildProcessOptions<T>): RxWrapper;
