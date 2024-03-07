export class ApiResponse {
    static ok<T>(data: T) {
        return {
            code: 200,
            data: data,
        }
    }
}