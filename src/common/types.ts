export enum WebStateCode {
    BOOT_ERROR, // 启动过程失败
    WAIT_LOGIN, // 等待登录
    WORK_NORMAL, // 正常工作
    EXIT_ERROR // 异常退出
}
export interface WebState {
    WorkState: WebStateCode, //参考
    BootTime: number //10位时间戳
}
export interface ServerConfig {
    Port: number,
    Password?: string
}
export interface WebUiApiConfig {
    Server: ServerConfig,
    AutoLogin: boolean,
    BootMode: number,
    Debug: boolean
}
export enum BootMode { NORMAL, CONTRAL_1, CONTRAL_2, HEADLESS3 }
export interface HandleIPCApiType {
    getWebUiState?: any,
    setWebUiState?: any
}
export interface FileStateApi {
    filename?: string,
    filetype?: number,//0文件 1文件夹 -1未知
    dev: number;
    ino: number;
    mode: number;
    nlink: number;
    uid: number;
    gid: number;
    rdev: number;
    size: number;
    blksize: number;
    blocks: number;
    atimeMs: number;
    mtimeMs: number;
    ctimeMs: number;
    birthtimeMs: number;
    atime: Date;
    mtime: Date;
    ctime: Date;
    birthtime: Date;
}
