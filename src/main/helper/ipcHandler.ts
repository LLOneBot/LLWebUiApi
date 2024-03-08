import { CHANNEL_BROWSER_SETLOGINPAGE, CHANNEL_CORE_GETCONFIG, CHANNEL_CORE_GETSTATE, CHANNEL_CORE_SETCONFIG, CHANNEL_CORE_SETSTATE, CHANNEL_LOGIN_QRCODE, CHANNE_CORE_LOG } from '../../common/channels';
import { HandleIPCApiType } from '../../common/types';
import { CoreLog, LogLevel } from '../helper/log';
import { CoreConfig } from './config';
export function InitIpcHandle(ipcMain: Electron.IpcMain, HandleIpcApi: HandleIPCApiType) {
    ipcMain.on(CHANNE_CORE_LOG, (_event, arg) => {
        CoreLog.getInstance().pushLog(LogLevel.Debug, arg);
    });
    ipcMain.handle(CHANNEL_CORE_GETSTATE, async (_event, _arg) => {
        // 获取状态
        return await HandleIpcApi.getWebUiState();
    });
    ipcMain.on(CHANNEL_CORE_SETSTATE, (_event, arg) => {
        // 设置状态
        HandleIpcApi.setWebUiState(arg);
    });
    ipcMain.handle(CHANNEL_CORE_GETCONFIG, async (_event, _arg) => {
        // 获取配置
        return CoreConfig.getInstance().get();
    });
    ipcMain.handle(CHANNEL_CORE_SETCONFIG, (_event, arg) => {
        // 设置配置
        CoreConfig.getInstance().set(arg);
    });
    ipcMain.handle(CHANNEL_LOGIN_QRCODE, (_event, _arg) => {
        // 接收二维码内容

    });
    ipcMain.handle(CHANNEL_BROWSER_SETLOGINPAGE,(_event, _arg) => {
        // 设置 Login-Window
    })
}
