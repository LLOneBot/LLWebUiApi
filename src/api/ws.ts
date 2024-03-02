import { WebSocket as WebSocketClass } from 'ws';
import { ServerAdapterCallback, ServerConfig } from '../common/types';
import { ServerAdapter, defaultServerAdapterCallback } from './adapter';
/**
 * @description Api接口WS实现类
 */
export class HttpAdapter implements ServerAdapter {
	private app: WebSocketClass;
	public CurrentConfig: ServerConfig;
	private DataCallBack: ServerAdapterCallback = defaultServerAdapterCallback;
	constructor(Config: ServerConfig) {
		this.CurrentConfig = Config;
	}
	public setCallBack(Callback: ServerAdapterCallback) {
		this.DataCallBack = Callback;
	}
	public onListening() {
	}
	public setConfig() {

	}
	public getConfig() {

	}
}