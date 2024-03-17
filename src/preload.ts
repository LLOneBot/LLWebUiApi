import { contextBridge, ipcRenderer } from 'electron';
import { CHANNE_CORE_LOG, CHANNEL_BROWSER_LOGINPAGE, CHANNEL_BROWSER_SETLOGINPAGE, CHANNEL_CORE_GETCONFIG, CHANNEL_CORE_GETSTATE, CHANNEL_CORE_SETCONFIG, CHANNEL_CORE_SETSTATE, CHANNEL_REMOTE_QRCODE } from './common/channels';
import { WebState, WebUiApiConfig } from './common/types';

const LLWebUiApi = {
	pushLog: (data: any) => {
		ipcRenderer.send(CHANNE_CORE_LOG, data);
	},
	getWebUiState: async (): Promise<WebState> => {
		return ipcRenderer.invoke(CHANNEL_CORE_GETSTATE);
	},
	setWebUiState: (data: WebState) => {
		ipcRenderer.send(CHANNEL_CORE_SETSTATE, data);
	},
	getWebUiConfig: async (): Promise<WebUiApiConfig> => {
		return ipcRenderer.invoke(CHANNEL_CORE_GETCONFIG);
	},
	setWebUiConfig: (data: WebUiApiConfig) => {
		ipcRenderer.send(CHANNEL_CORE_SETCONFIG, data);
	},
	pushLoginQrcode: (data: string) => {
		ipcRenderer.send(CHANNEL_REMOTE_QRCODE, data);
	},
	onLoginPage: (callback: any) => {
		ipcRenderer.on(CHANNEL_BROWSER_LOGINPAGE, (_event, value) => callback(value));
	},
	setLoginPage: (data: number) => {
		ipcRenderer.send(CHANNEL_BROWSER_SETLOGINPAGE, data);
	}
};
export type LLWebUiApiType = typeof LLWebUiApi;

// 在window对象下导出只读对象
contextBridge.exposeInMainWorld('LLWebUiApi', LLWebUiApi);

