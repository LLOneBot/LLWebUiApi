import { FileStateApi } from "../../common/types";
import { FileSystemApi } from "../api/FileSystemApi";
import fs from "fs";
import * as Path from "path";
import { CoreLog, LogLevel } from "../helper/log";
import { LiteLoaderConfig, WebPluginData } from "./types";
import { LITELOADER_DIR } from "../helper/utils";
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
    public setWhiteList(data: string[]) {
        this.whiteList = ["WebUiApi", ...data];
    }
    public loadPluginInfo(path: string) {
        let fileList: FileStateApi[] = FileSystemApi.listFile(path);
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
    // 生成Config页面
    public getConfigPage(_base: string, _slug: string) {
        
    }
    //
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