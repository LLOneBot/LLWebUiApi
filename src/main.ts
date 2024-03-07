import { BrowserWindow, ipcMain, app } from 'electron';
import { initHeadless3 } from './main/helper/headless3';
import fs from 'fs';
import { DATA_DIR } from './main/helper/utils';
import { InitIpcHandle } from './main/helper/ipcHandler';
import { CoreConfig } from './main/helper/config';

function onBrowserWindowCreated(_window: BrowserWindow) {

}

function loadLLWebUiApi() {
	const bootMode = app.commandLine.getSwitchValue('webui-mode');
	// 创建数据目录
	if (!fs.existsSync(DATA_DIR)) {
		fs.mkdirSync(DATA_DIR, { recursive: true });
	}
	// 读取配置文件
	const WebApiConfig = CoreConfig.getInstance().get();
	// 启动模式选择
	if (bootMode.includes("headless3") || WebApiConfig.BootMode == 1) {
		initHeadless3();
	}
	// 注册IPC基础事件
	InitIpcHandle(ipcMain);
	// 服务端Api初始化
}

try {
	loadLLWebUiApi();
} catch (e: any) {
	console.log(e.toString());
}
export {
	onBrowserWindowCreated
};