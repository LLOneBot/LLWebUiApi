import { CHANNE_CORE_LOG } from '../../common/channels';
import { CoreLog, LogLevel } from '../helper/log';
export function InitIpcHandle(ipcMain: Electron.IpcMain) {
    ipcMain.on(CHANNE_CORE_LOG, (_event, arg) => {
        CoreLog.getInstance().pushLog(LogLevel.Debug, arg);
    })
}
