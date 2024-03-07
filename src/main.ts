import { BrowserWindow, ipcMain, app } from 'electron';
import { initHeadless3 } from './main/helper/headless3';
import { DATA_DIR } from './main/helper/utils';
import { InitIpcHandle } from './main/helper/ipcHandler';
import { CoreConfig } from './main/helper/config';
import { BootMode } from './common/types';
import fs from 'fs';
import { CoreLog, LogLevel } from './main/helper/log';
import { ServerFactory } from './main/adapter/factory';
import { HttpAdapter } from './main/adapter/http';

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
	// 调试阶段输出所有日志 并输出命令行 发布时注释
	if (WebApiConfig.Debug) {
		// Debug逻辑
	}
	CoreLog.getInstance().setLevel(LogLevel.All);
	CoreLog.getInstance().setConsole(true);
	CoreLog.getInstance().pushLog(LogLevel.Info, "WebUi Is Running");
	// 启动模式选择
	if (bootMode.includes("headless3") || WebApiConfig.BootMode == BootMode.HEADLESS3) {
		initHeadless3();
	}
	// 注册IPC基础事件
	InitIpcHandle(ipcMain);
	// 服务端Api初始化
	let HttpServer = ServerFactory.getServer("HTTP", CoreConfig.getInstance().get().Server);
	HttpServer.onListening();
}

try {
	loadLLWebUiApi();
} catch (e: any) {
	console.log(e.toString());
}
export {
	onBrowserWindowCreated
};