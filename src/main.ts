import { BrowserWindow, ipcMain } from 'electron';
import { initHeadless3 } from './main/headless';
import { ServerFactory } from './main/server/factory';
import { ServerConfig } from './common/types';
import { CONFIG_DIR } from './common/utils';
import { InitIpcHandle } from './main/api/api';

function onBrowserWindowCreated(_window: BrowserWindow) {
	console.log('onBrowserWindowCreated...');
}
function loadLLWebUiApi() {
	// 开启无头模式
	if (false) {
		// 默认关闭 没实现WebApi前不要开启
		initHeadless3();
	}
	console.log("插件数据目录", CONFIG_DIR);
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
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
} catch (e: any) {
	console.log(e.toString());
}
export {
	onBrowserWindowCreated
};