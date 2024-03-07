export class ApiResponse {
    static ok<T>(data: T) {
        return {
            code: 200,
            data: data,
        }
    }
    static error(message: string) {
        return {
            code: -1,
            data: message,
        }
    }
}