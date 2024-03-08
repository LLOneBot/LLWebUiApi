import { CHANNEL_CORE_GETSTATE, CHANNEL_CORE_SETSTATE, CHANNE_CORE_LOG } from '../../common/channels';
import { HandleIPCApiType } from '../../common/types';
import { CoreLog, LogLevel } from '../helper/log';
import { CoreConfig } from './config';
export function InitIpcHandle(ipcMain: Electron.IpcMain,HandleIpcApi:HandleIPCApiType) {
    ipcMain.on(CHANNE_CORE_LOG, (_event, arg) => {
        CoreLog.getInstance().pushLog(LogLevel.Debug, arg);
    });
    ipcMain.handle(CHANNEL_CORE_GETSTATE, async (_event, _arg) => {
        return await HandleIpcApi.getWebUiState();
    });
    ipcMain.on(CHANNEL_CORE_SETSTATE, (_event, arg) => {
        HandleIpcApi.setWebUiState(arg);
    });
    ipcMain.handle(CHANNEL_CORE_GETSTATE, async (_event, _arg) => {
        return CoreConfig.getInstance().get();
    });
}
