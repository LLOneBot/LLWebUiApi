export enum WebStateCode {
    BOOT_ERROR, // 启动过程失败
    WAIT_LOGIN, // 等待登录
    WORK_NORMAL, // 正常工作
    EXIT_ERROR // 异常退出
}
export interface WebState {
    IsLogin: WebStateCode, //参考
    BootTime: number //10位时间戳
}
export interface ServerConfig {
    Port: number,
    Password: string
}
export interface WebUiApiConfig {
    Server: ServerConfig,
    AutoLogin: boolean,
    BootMode: number,
    Debug: boolean
}
export enum BootMode { NORMAL, CONTRAL_1, CONTRAL_2, HEADLESS3 }