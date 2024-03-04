import { CHANNEL_CORE_ERROR, CHANNE_CORE_LOG, CHANNEL_CORE_GETCONFIG, CHANNEL_CORE_SETCONFIG } from '../../common/channels';
import { CoreLog, LogLevel } from '../../common/log';
export function InitIpcHandle(ipcMain: Electron.IpcMain) {
    ipcMain.handle(CHANNEL_CORE_ERROR, async (_event, _arg) => { });
    ipcMain.handle(CHANNE_CORE_LOG, async (_event, arg) => {
        console.log(arg);
        //CoreLog.getInstance().pushLog(LogLevel.Debug, arg);
    });
    ipcMain.handle(CHANNEL_CORE_GETCONFIG, async (_event, _arg) => { });
    ipcMain.handle(CHANNEL_CORE_SETCONFIG, async (_event, _arg) => { });
}
