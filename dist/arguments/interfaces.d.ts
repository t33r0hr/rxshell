export interface CommandArgument<T> {
    name: string;
    defaultValue?: T;
    options?: T[] | boolean;
    description?: string;
    required?: boolean;
}
