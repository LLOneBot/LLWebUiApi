import { contextBridge, ipcRenderer } from 'electron';
import { CHANNE_CORE_LOG, CHANNEL_CORE_GETSTATE } from './common/channels';
import { WebState } from './common/types';

const LLWebUiApi = {
	pushLog: (data: any) => {
		ipcRenderer.send(CHANNE_CORE_LOG, data);
	},
	getWebUiState: async (): Promise<WebState> => {
		return ipcRenderer.invoke(CHANNEL_CORE_GETSTATE);
	}
};
export type LLWebUiApiType = typeof LLWebUiApi;

// 在window对象下导出只读对象
contextBridge.exposeInMainWorld('LLWebUiApi', LLWebUiApi);