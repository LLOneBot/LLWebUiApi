import { BrowserWindow, ipcMain } from 'electron';
import { initHeadless3 } from './main/headless';
import { CHANNEL_CORE_ERROR, CHANNE_CORE_LOG, CHANNEL_CORE_GETCONFIG, CHANNEL_CORE_SETCONFIG } from './common/channels';
import { ServerFactory } from './api/factory';
import { ServerConfig } from './common/types';
import { CoreLog, LogLevel } from './common/log';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function onBrowserWindowCreated(_window: BrowserWindow) {
	console.log('onBrowserWindowCreated...');
}
function loadLLWebUiApi() {
	// 开启无头模式
	// eslint-disable-next-line no-constant-condition
	if (false) {
		// 默认关闭 没实现WebApi前不要开启
		initHeadless3();
	}

	// 注册基础事件
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	ipcMain.handle(CHANNEL_CORE_ERROR, async (_event, _arg) => { });
	ipcMain.handle(CHANNE_CORE_LOG, async (_event, arg) => {
		console.log(arg);
		CoreLog.getInstance().pushLog(LogLevel.Debug, arg);
	});
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	ipcMain.handle(CHANNEL_CORE_GETCONFIG, async (_event, _arg) => { });
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	ipcMain.handle(CHANNEL_CORE_SETCONFIG, async (_event, _arg) => { });
	//
	const Config: ServerConfig = {
		Port: 5600,
		AuthCode: '',
		IsRunning: false
	};
	ServerFactory.getServer('http', Config);
}
try {
	loadLLWebUiApi();
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
} catch (e: any) {
	console.log(e.toString());
}
export {
	onBrowserWindowCreated
};