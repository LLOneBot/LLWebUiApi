import { BrowserWindow, ipcMain } from 'electron';
import { initHeadless3 } from './main/headless';
import { ServerFactory } from './main/server/factory';
import { ServerConfig } from './common/types';
import { CONFIG_DIR } from './common/utils';
import { CHANNEL_CORE_ERROR, CHANNE_CORE_LOG, CHANNEL_CORE_GETCONFIG, CHANNEL_CORE_SETCONFIG } from './common/channels';
import { CoreLog, LogLevel } from './common/log';
import { InitIpcHandle } from './main/ipcHandle';
import fs from 'fs';
function onBrowserWindowCreated(_window: BrowserWindow) {

}
function loadLLWebUiApi() {
	// 开启无头模式
	if (false) {
		// 默认关闭 没实现WebApi前不要开启
		initHeadless3();
	}
	if (!fs.existsSync(CONFIG_DIR)) {
		fs.mkdirSync(CONFIG_DIR, { recursive: true });
	}
	// CoreLog.getInstance().pushLog(LogLevel.Error, "Test");
	// 注册基础事件
	InitIpcHandle(ipcMain)
	const Config: ServerConfig = {
		Port: 5600,
		AuthCode: '',
		IsRunning: false
	};
	ServerFactory.getServer('HTTP', Config).onListening();
}
try {
	loadLLWebUiApi();
} catch (e: any) {
	console.log(e.toString());
}
export {
	onBrowserWindowCreated
};