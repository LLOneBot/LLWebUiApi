export enum ActionName {
    GetWebState = "GetWebState",
    GetBotLoginQR = "GetBotLoginQR",
}
export interface ResponseReturn<DataType> {
    code: number,
    data: DataType,
}