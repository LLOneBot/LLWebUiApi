import { FileStateApi } from "../../common/types";
import path from "path";
import fs from "fs";
import * as Path from "path";
import { CoreLog, LogLevel } from "../helper/log";
import { LiteLoaderConfig, WebPluginData } from "./types";
import { LITELOADER_DIR } from "../helper/utils";
import { FileType } from "../express/types";
export class WebPlugin {
    private whiteList: string[] = ["WebUiApi"];
    private PluginList: WebPluginData[] = [];
    static CurrentInstance: WebPlugin;
    static getInstance(): WebPlugin {
        if (!WebPlugin.CurrentInstance) {
            WebPlugin.CurrentInstance = new WebPlugin();
            return WebPlugin.CurrentInstance;
        }
        return WebPlugin.CurrentInstance;
    }
    private listFile(filePath: string) {
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
                let pushdata: FileStateApi = stats;
                pushdata.filename = filename;
                pushdata.filetype = filetype;
                data.push(pushdata);
            });
            return data;
        }
    public setWhiteList(data: string[]) {
        this.whiteList = ["WebUiApi", ...data];
    }
    public loadPluginInfo(path: string) {
        let fileList: FileStateApi[] = this.listFile(path);
        for (let i = 0; i < fileList.length; i++) {
            let manifestPath = Path.resolve(path, `./${fileList[i].filename}/manifest.json`);
            try {
                let { result, data } = this.solveManifest(manifestPath, fileList[i].filename as string);
                if (result as boolean) {
                    this.PluginList.push(data);
                }
            }
            catch (e: any) {
                CoreLog.getInstance().pushLog(LogLevel.Error, e.message);
            }
        }
    }
    public getPluginList() {
        return this.PluginList;
    }
    public solveManifest(file: string, base: string) {
        let manifestJson = JSON.parse(fs.readFileSync(file).toString());
        let Plugin: WebPluginData =
        {
            name: manifestJson?.name,
            slug: manifestJson?.slug,
            description: manifestJson?.description,
            manifest_version: manifestJson?.manifest_version,
            version: manifestJson?.version,
            injects:
            {
                main: Path.resolve(base, manifestJson.injects.main),
                preload: Path.resolve(base, manifestJson.injects.preload),
                renderer: Path.resolve(base, manifestJson.injects.renderer)
            }
        };
        if (this.whiteList.includes(manifestJson?.slug)) {
            return { result: false, data: Plugin };
        }
        return { result: true, data: Plugin };
    }
    public setPluginEnable(plugin: string): boolean {
        let data = JSON.parse(fs.readFileSync(Path.resolve(LITELOADER_DIR, "./config.json")).toString()) as LiteLoaderConfig;

        let index = data.LiteLoader.disabled_plugins.indexOf(plugin);
        if (index !== -1) {
            data.LiteLoader.disabled_plugins.splice(index, 1);
            fs.writeFileSync(Path.resolve(LITELOADER_DIR, "./config.json"), JSON.stringify(data));
            return true;
        }
        return false;
    }
    public setPluginDisable(plugin: string): boolean {
        let data = JSON.parse(fs.readFileSync(Path.resolve(LITELOADER_DIR, "./config.json")).toString()) as LiteLoaderConfig;
        let index = data.LiteLoader.disabled_plugins.indexOf(plugin);
        if (index !== -1) {
            data.LiteLoader.disabled_plugins.push(plugin);
            fs.writeFileSync(Path.resolve(LITELOADER_DIR, "./config.json"), JSON.stringify(data));
            return true;
        }
        return false;
    }
}