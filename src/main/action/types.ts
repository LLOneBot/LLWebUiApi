export enum ActionName {
    GetWebState = "GetWebState",
    GetBotLoginQR = "GetBotLoginQR",
    DeleteFile = "DeleteFile",
    GetBasicInfo = "GetBasicInfo",
    GetFileList = "GetFileList",
    GetFileData = "GetFileData",
    WriteFile = "WriteFile",
    RenameFile = "RenameFile",
    GetAllPath = "GetAllPath",
    PluginIPC = "PluginIPC",
    GetWebPlugin = "GetWebPlugin"
};
export enum FileDataType { Text, Base64, Hex };
export interface ResponseReturn<DataType> {
    code: number,
    data?: DataType,
    message?: string
};
export enum FileType {
    ERROR = -1,
    FILE = 0,
    PATH = 1
};
export enum PluginIpcType {
    Listen,
    Send,
    Invoke
}