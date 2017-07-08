
export interface ChildProcessData<T> {
  data:T
}

export interface ChildProcessError extends ChildProcessData<string> {
  code:number;
}

export interface ChildProcessBuffer extends ChildProcessData<Buffer> {}

export interface StdoutData<T> {
  stdout:T
}

export interface StderrData<T> {
  stderr:T
}

export type StreamData<T> = StdoutData<T> | StderrData<T>
