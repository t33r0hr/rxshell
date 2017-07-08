import { Observable } from 'rxjs';
export declare const command: (commandName: string, ...defaultArgs: string[]) => (args: string[], cwd?: string) => Observable<string>;
