interface ErrorResponse {
    status: 'ERROR';
    code: number;
    message: string;
}

interface OkResponse<T> {
    status: 'OK';
    data?: T;
}

export const errorResponse = (code: number, message: string): ErrorResponse => ({
    status: 'ERROR',
    code,
    message,
});

export const okResponse = <T>(data?: T): OkResponse<T> => ({
    status: 'OK',
    data,
});