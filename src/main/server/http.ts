import express from 'express';
import { Express, Request, Response } from 'express';
import { ServerAdapter, defaultServerAdapterCallback } from './adapter';
import { ServerAdapterCallback, ServerConfig } from '../../common/types';
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
		this.app.use(express.urlencoded({ extended: true, limit: '500mb' }));
		this.app.use(express.json());
		this.app.use(this.authCode);
	}
	public setCallBack(Callback: ServerAdapterCallback) {
		this.DataCallBack = Callback;
	}
	public onListening() {
		this.app.get('/', (_req: Request, res: Response) => {
			res.send('WebUiApi HttpServer Is Running!');
		});
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		this.app.get('/api/:action', (req: Request, res: Response) => {
			res.send(this.DataCallBack(req.params.action, JSON.stringify(req.params)));
		});
		this.app.listen(this.CurrentConfig.Port, () => { console.log('Listening'); });
		this.DataCallBack('boot', 'ok!');
	}
	public setConfig() {

	}
	public authCode(req, res, next) {
		// 拦截处理
		next();
	}
	public getConfig() {

	}
}