import { BrowserWindow, ipcMain } from 'electron';
import { initHeadless3 } from './main/helper/headless3';
import fs from 'fs';
import { DATA_DIR } from './main/helper/utils';
import { InitIpcHandle } from './main/helper/ipcHandler';

function onBrowserWindowCreated(_window: BrowserWindow) {

}
function loadLLWebUiApi() {
	// 开启无头模式
	if (false) {
		// 默认关闭 没实现WebApi前不要开启
		initHeadless3();
	}
	if (!fs.existsSync(DATA_DIR)) {
		fs.mkdirSync(DATA_DIR, { recursive: true });
	}
	// 读取配置文件
	// 注册基础事件
	InitIpcHandle(ipcMain);
}

try {
	loadLLWebUiApi();
} catch (e: any) {
	console.log(e.toString());
}
export {
	onBrowserWindowCreated
};