import { BrowserWindow, ipcMain } from 'electron';
import { initHeadless3 } from './main/headless';
import { ServerFactory } from './main/server/factory';
import { ServerConfig } from './common/types';
import { CONFIG_DIR } from './common/utils';
import { CHANNEL_CORE_ERROR, CHANNE_CORE_LOG, CHANNEL_CORE_GETCONFIG, CHANNEL_CORE_SETCONFIG } from './common/channels';
import { CoreLog, LogLevel } from './common/log';

function onBrowserWindowCreated(_window: BrowserWindow) {

}
function loadLLWebUiApi() {
	// 开启无头模式
	if (false) {
		// 默认关闭 没实现WebApi前不要开启
		initHeadless3();
	}
	console.log("插件数据目录", CONFIG_DIR);
	// 注册基础事件
	//InitIpcHandle(ipcMain)
	ipcMain.handle(CHANNEL_CORE_ERROR, async (_event, _arg) => { });
	ipcMain.handle(CHANNE_CORE_LOG, async (_event, arg) => {
		console.log(arg);
		//CoreLog.getInstance().pushLog(LogLevel.Debug, arg);
	});
	ipcMain.handle(CHANNEL_CORE_GETCONFIG, async (_event, _arg) => { });
	ipcMain.handle(CHANNEL_CORE_SETCONFIG, async (_event, _arg) => { });
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