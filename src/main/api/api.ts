import { CHANNEL_CORE_ERROR, CHANNE_CORE_LOG, CHANNEL_CORE_GETCONFIG, CHANNEL_CORE_SETCONFIG } from '../../common/channels';
import { CoreLog, LogLevel } from '../../common/log';
export function InitIpcHandle(ipcMain: Electron.IpcMain) {
	ipcMain.on(CHANNE_CORE_LOG, (event, arg) => {
		console.log(arg);
		CoreLog.getInstance().pushLog(LogLevel.Error, arg);
	})
}
