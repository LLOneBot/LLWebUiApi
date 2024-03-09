export enum ActionName {
    GetWebState = "GetWebState",
    GetBotLoginQR = "GetBotLoginQR",
    DeleteFile = "DeleteFile",
    GetBasicInfo = "GetBasicInfo",
    GetFileList = "GetFileList",
    GetFileData = "GetFileData",
    WriteFile = "WriteFile",
    RenameFile = "RenameFile"
}
export interface ResponseReturn<DataType> {
    code: number,
    data?: DataType,
    message?: string
}