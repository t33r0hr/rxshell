
export interface ChildProcessData<T> {
  data:T
}

export interface ChildProcessError extends ChildProcessData<string> {
  code:number;
}

export interface ChildProcessBuffer extends ChildProcessData<Buffer> {}

export interface StreamData<T> {
  stdout:T
  stderr:T
}