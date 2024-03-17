import { BootMode, HandleIPCApiType, WebState, WebStateCode } from './common/types';
import { HookIpcCallHandle, HookIpcReceiveHandle } from './main/helper/ipcHook';
import { ALL_PLUGIN_DIR, DATA_DIR } from './main/helper/utils';
import { InitIpcHandle } from './main/helper/ipcHandler';
import { initHeadless3 } from './main/helper/headless3';
import { BrowserWindow, ipcMain, app } from 'electron';
import { CoreLog, LogLevel } from './main/helper/log';
import { CoreConfig } from './main/helper/config';
import { WebPlugin } from './main/plugin/plugin';
import express from './main/express';

import { DataClass } from './main/helper/data';
import fs from 'fs';
function onBrowserWindowCreated(window: BrowserWindow) {
	try {
		HookIpcReceiveHandle(window);
		HookIpcCallHandle(window);
	} catch (e: any) {
		CoreLog.getInstance().pushLog(LogLevel.Error, e.toString())
	}
	/**
	 * setTimeout(() => {
		window.webContents.send("message-main","test");
		window.webContents.send("message-main","test");
	}, 2000);
	*/
}

function loadLLWebUiApi() {
	// 初始化状态信息
	DataClass.getInstance().set("WebUiApiState", {
		WorkState: WebStateCode.WAIT_LOGIN,
		BootMode: BootMode.NORMAL,
		BootTime: Math.floor(Date.now() / 1000)
	});
	let HandleIpcApi = {} as HandleIPCApiType;
	// IPC 辅助函数绑定与实现
	HandleIpcApi.getWebUiState = async () => {
		return DataClass.getInstance().get("WebUiApiState");
	}
	HandleIpcApi.setWebUiState = async (value: WebState) => {
		return DataClass.getInstance().set("WebUiApiState", value);
	}
	// 获取WebUi启动模式
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
		CoreLog.getInstance().pushLog(LogLevel.Info, "DebugMode Is Opening");
	}
	CoreLog.getInstance().setLevel(LogLevel.All); // 启用所有等级日志
	CoreLog.getInstance().setConsole(true); // 开启Console输出
	CoreLog.getInstance().pushLog(LogLevel.Info, "Application Is Running");
	// 启动模式选择
	if (bootMode.includes("headless3") || WebApiConfig.BootMode == BootMode.HEADLESS3) {
		//WebApiConfig.BootMode = BootMode.HEADLESS3; 现在在 RUNTIME DATA 而不是Config
		let BootMode_WebState = DataClass.getInstance().get("WebUiApiState") as WebState;
		BootMode_WebState.BootMode = BootMode.HEADLESS3;
		DataClass.getInstance().set("WebUiApiState", BootMode_WebState);
		initHeadless3();
	}
	// 注册IPC基础事件
	InitIpcHandle(ipcMain, HandleIpcApi);
	// Web Plugin Loading
	WebPlugin.getInstance().loadPluginInfo(ALL_PLUGIN_DIR);
	// 服务端Api初始化
	// let HttpServer = ServerFactory.getServer("HTTP", CoreConfig.getInstance().get().Server) as HttpAdapter;
	// HttpServer.onListening();
	express.listen(CoreConfig.getInstance().get().Server.Port, () => {
		console.log('Express server is now started!');
	});
}

try {
	loadLLWebUiApi();
} catch (e: any) {
	CoreLog.getInstance().pushLog(LogLevel.Error, e.toString());
}
export {
	onBrowserWindowCreated
};