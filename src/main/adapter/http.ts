import express from 'express';
import { Express, Request, Response } from 'express';
import { ServerAdapter } from './adapter';
import { ServerConfig } from '../../common/types';
/**
 * @description Api接口Http实现类
 */
export class HttpAdapter implements ServerAdapter {
	private app: Express;
	public CurrentConfig: ServerConfig;
	constructor(Config: ServerConfig) {
		this.CurrentConfig = Config;
		this.app = express();
		this.app.use(express.urlencoded({ extended: true, limit: '500mb' }));
		this.app.use(express.json());
	}
	public authorize(_req: Request, _res: Response, next: () => void) {
		
		next();
	}
	public setCallBack(_Callback: any): void {
		throw new Error('Method not implemented.');
	}
	public onListening() {
		this.app.get('/', (_req: Request, res: Response) => {
			res.send('WebUiApi HttpServer Is Running!');
		});
		this.app.get('/api/:action', (_req: Request, _res: Response) => {

		});
		this.app.listen(this.CurrentConfig.Port, () => { console.log('Listening'); });
	}
	public setConfig() {

	}
	public getConfig() {

	}
}