import express from 'express';
import { Express, Request, Response } from 'express';
import { ServerAdapter } from './adapter';
import { ServerConfig } from '../../common/types';
import { CoreLog, LogLevel } from '../helper/log';
import { actionMap } from '../action';
import { ALL_PLUGIN_DIR, PLUGIN_DIR } from '../helper/utils';
import path from 'path';
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
		// 安不安全 我不知道 但是好用
		this.app.use("/static", express.static(path.join(PLUGIN_DIR, "./static/")));
		this.app.use("/plugin", express.static(ALL_PLUGIN_DIR));
		this.app.use(express.json());
	}
	public authorize = (req: Request, res: Response, next: () => void) => {
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
		this.app.all('/api/:action', this.authorize, async (req: Request, res: Response) => {
			const Action = actionMap.get(req.params.action);
			try {
				if (Action) {
					let payload = { ...req.body, ...req.query };
					res.send(await Action.handle(payload));
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