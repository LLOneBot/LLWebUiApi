// Json 应答生成
export class JsonResponse {
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