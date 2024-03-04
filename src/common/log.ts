import { CONFIG_DIR } from './utils';
import fs from 'fs';
import path from 'path';
export enum LogLevel { All, Debug, Info, Warn, Error, None }
function getTime() {
	const date = new Date();
	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate();
	const currentDate = `${year}-${month}-${day}`;
	return currentDate;
}
class CoreLog {
	private CoreLogLevel: LogLevel = LogLevel.Warn;
	private ConsoleLog: boolean = false;
	public FilePath: string = '';
	static CurrentInstance: CoreLog;
	constructor() {
		this.FilePath = path.join(CONFIG_DIR, 'log-' + getTime() + '.txt');
	}
	static getInstance(): CoreLog {
		if (!CoreLog.CurrentInstance) {
			CoreLog.CurrentInstance = new CoreLog();
			return CoreLog.CurrentInstance;
		}
		return CoreLog.CurrentInstance;
	}
	pushLog(Level: LogLevel, ...msg: any[]) {
		if (Level < this.CoreLogLevel) {
			return;
		}
		let logMsg = '';
		const currentDateTime = new Date().toLocaleString();
		for (const msgItem of msg) {
			// 判断是否是对象
			if (typeof msgItem === 'object') {
				logMsg += JSON.stringify(msgItem) + ' ';
				continue;
			}
			logMsg += msgItem + ' ';
		}
		const LevelText = Level.toString();
		logMsg = `${currentDateTime} ${LevelText}: ${logMsg}\n\n`;
		if (this.ConsoleLog === true) {
			console.log(logMsg);
		}
		fs.writeFileSync(this.FilePath, logMsg, 'utf-8');
	}
	setLevel(Level: LogLevel) {
		this.CoreLogLevel = Level;
	}
	getLevel() {
		return this.CoreLogLevel;
	}
	readFile() {
		return fs.readFileSync(this.FilePath, 'utf-8');
	}
	setConsole(Open: boolean) {
		this.ConsoleLog = Open;
	}

}
// 仅Main使用
export { CoreLog };