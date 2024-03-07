import express from 'express';
import { Express, Request, Response } from 'express';
import { ServerAdapter } from './adapter';
import { ServerConfig } from '../../common/types';
import { CoreLog, LogLevel } from '../helper/log';
import { actionMap } from '../action';
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
	public authorize(req: Request, res: Response, next: () => void) {
		// HTTP服务鉴权方式
		const authHeader = req.get("authorization");
		let clientToken = "";
		if (authHeader) {
			clientToken = authHeader.split("Bearer ").pop() as string;
			CoreLog.getInstance().pushLog(LogLevel.Debug, "receive http header token" + clientToken);
		} else if (req.query.access_token) {
			if (Array.isArray(req.query.access_token)) {
				clientToken = req.query.access_token[0].toString();
			} else {
				clientToken = req.query.access_token.toString();
			}
			CoreLog.getInstance().pushLog(LogLevel.Debug, "receive http url token" + clientToken);
		}
		if (this.CurrentConfig.Password && this.CurrentConfig.Password != "" && this.CurrentConfig.Password == clientToken) {
			return res.status(403).send(JSON.stringify({ message: 'token verify failed!' }));
		}
		next();
	}
	public setCallBack(_Callback: any): void {
		throw new Error('Method not implemented.');
	}
	public onListening() {
		this.app.get('/', (_req: Request, res: Response) => {
			res.send('WebUiApi HttpServer Is Running!');
		});
		this.app.get('/api/:action', this.authorize, async (req: Request, res: Response) => {
			const Action = actionMap.get(req.params.action);
			try {
				if (Action) {
					res.send(Action?.handle((_res: any, payload: any) => Action.handle(payload)));
				} else {
					res.status(403).send(JSON.stringify({ message: 'action not found!' }));
				}
			} catch (e) {

			}


		});
		this.app.listen(this.CurrentConfig.Port, () => { console.log('Listening'); });
	}
	public setConfig() {

	}
	public getConfig() {

	}
}