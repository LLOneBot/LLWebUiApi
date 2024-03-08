import { contextBridge, ipcRenderer } from 'electron';
import { CHANNE_CORE_LOG, CHANNEL_CORE_GETCONFIG, CHANNEL_CORE_GETSTATE } from './common/channels';
import { WebState, WebUiApiConfig } from './common/types';

const LLWebUiApi = {
	pushLog: (data: any) => {
		ipcRenderer.send(CHANNE_CORE_LOG, data);
	},
	getWebUiState: async (): Promise<WebState> => {
		return ipcRenderer.invoke(CHANNEL_CORE_GETSTATE);
	},
	setWebUiState: (data: WebState) => {
		ipcRenderer.send(CHANNE_CORE_LOG, data);
	},
	getWebUiConfig: async (): Promise<WebUiApiConfig> => {
		return ipcRenderer.invoke(CHANNEL_CORE_GETCONFIG);
	},
	setWebUiConfig: (data: WebUiApiConfig) => {
		ipcRenderer.send(CHANNE_CORE_LOG, data);
	}
};
export type LLWebUiApiType = typeof LLWebUiApi;

// 在window对象下导出只读对象
contextBridge.exposeInMainWorld('LLWebUiApi', LLWebUiApi);