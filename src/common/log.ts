import { CONFIG_DIR } from "./utils";
import fs from "fs";
import path from "path";
enum LogLevel { All, Debug, Info, Warn, Error, None };
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
    public FilePath: string = "";
    constructor() {
        this.FilePath = path.join(CONFIG_DIR, "log" + getTime() + ".txt")
    }
    PushLog(Level: LogLevel, ...msg: any[]) {
        if (Level < this.CoreLogLevel) {
            return;
        }
        let logMsg = "";
        let currentDateTime = new Date().toLocaleString();
        for (let msgItem of msg) {
            // 判断是否是对象
            if (typeof msgItem === "object") {
                logMsg += JSON.stringify(msgItem) + " ";
                continue;
            }
            logMsg += msgItem + " ";
        }
        let LevelText = Level.toString();
        logMsg = `${currentDateTime} ${LevelText}: ${logMsg}\n\n`;
        fs.writeFileSync(this.FilePath, logMsg, "utf-8");
    }
    SetLevel(Level: LogLevel) {
        this.CoreLogLevel = Level;
    }
    GetLevel() {
        return this.CoreLogLevel;
    }
    ReadFile() {
        return fs.readFileSync(this.FilePath, "utf-8");
    }

}
export { CoreLog }