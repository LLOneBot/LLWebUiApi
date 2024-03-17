import fs from "fs";
import path from "path";
import { FileStateApi } from "../../common/types";
import { FileType } from "../express/types";
// 仅允许操作整个 QQ 与 LiteLoader所在目录（太麻烦了 干脆放开） 实现限制与辅助
export class FileSystemApi {
    static listFile(filePath: string) {
        let data = new Array<FileStateApi>();
        // 获取文件列表
        const files = fs.readdirSync(filePath);
        // 遍历文件列表
        files.forEach((filename) => {
            const filedir = path.resolve(filePath, filename);
            const stats = fs.statSync(filedir);
            const isFile = stats.isFile();
            const isDir = stats.isDirectory(); // 是文件夹
            let filetype: FileType = FileType.ERROR;
            if (isFile) {
                filetype = FileType.FILE;
            }
            else if (isDir) {
                filetype = FileType.PATH;
            }
            let pushdata:FileStateApi = stats;
            pushdata.filename = filename;
            pushdata.filetype = filetype;
            data.push(pushdata);
        });
        return data;
    }
    static searchFile() {
        // 未实现预留
    }
}
