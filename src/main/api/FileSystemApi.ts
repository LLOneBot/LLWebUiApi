import fs from "fs";
import path from "path";
import { FileStateApi } from "../../common/types";
// 仅允许操作整个 QQ 与 LiteLoader所在目录 Class实现限制与辅助
export class FileSystemApi {
    static LLbasePath: string;
    static QQbasePath: string;
    static init(LLbase: string, QQbase: string) {
        FileSystemApi.LLbasePath = LLbase;
        FileSystemApi.QQbasePath = QQbase;
    }
    static listFile(filePath: string) {
        let data = new Array<FileStateApi>();
        // 获取文件列表
        const files = fs.readdirSync(filePath);
        // 遍历文件列表
        files.forEach((filename) => {
            const filedir = path.join(filePath, filename);
            const stats = fs.statSync(filedir);
            const isFile = stats.isFile();
            const isDir = stats.isDirectory(); // 是文件夹
            let filetype = -1;
            if (isFile) {
                filetype = 0;
            }
            else if (isDir) {
                filetype = 1;
            }
            let pushdata = stats as FileStateApi;
            pushdata.filename = filename;
            pushdata.filetype = filetype;
            data.push(pushdata);
        });
        return data;
    }
    static isInWhiteList(){
        // 检查目录是否在白名单
    }
    static searchFile() {
        // 未实现预留
    }
}
