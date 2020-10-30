export interface ResposseData<T> {
    success: boolean;
    data: T;
    error?: {
        code: number,
        message: string
    };
}
