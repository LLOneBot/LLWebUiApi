export enum ActionName {
    GetWebState = "GetWebState",
    GetBotLoginQR = "GetBotLoginQR",
    DeleteFile = "DeleteFile",
    GetBasicInfo = "GetBasicInfo",
    GetFileList = "GetFileList",
    GetFileData = "GetFileData",
    WriteFile = "WriteFile",
    RenameFile = "RenameFile",
    GetAllPath = "GetAllPath"
}
export interface ResponseReturn<DataType> {
    code: number,
    data?: DataType,
    message?: string
}
export enum FileType {
    ERROR = -1,
    FILE = 0,
    PATH = 1
}