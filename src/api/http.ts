import express from 'express';
import { Express, Request, Response } from 'express';
import { ServerAdapter, defaultServerAdapterCallback } from './adapter';
import { ServerAdapterCallback, ServerConfig } from '../common/types';
/**
 * @description Api接口Http实现类
 */
export class HttpAdapter implements ServerAdapter {
	private app: Express;
	public CurrentConfig: ServerConfig;
	private DataCallBack: ServerAdapterCallback = defaultServerAdapterCallback;
	constructor(Config: ServerConfig) {
		this.CurrentConfig = Config;
		this.app = express();
		this.app.use(express.urlencoded({extended: true, limit: '500mb'}));
		this.app.use(express.json());
	}
	public setCallBack(Callback: ServerAdapterCallback) {
		this.DataCallBack = Callback;
	}
	public onListening() {
		this.app.get('/', (_req: Request, res: Response) => {
			res.send('WebUiApi HttpServer Is Running!');
		});
		this.app.listen(this.CurrentConfig.Port);
		this.DataCallBack('boot', 'ok!');
	}
	public setConfig() {

	}
	public getConfig() {

	}
}