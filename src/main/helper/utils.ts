import path from "path";

const DATA_DIR = global.LiteLoader.plugins['WebUiApi'].path.data;
const PLUGIN_DIR = global.LiteLoader.plugins['WebUiApi'].path.plugin;
const ALL_PLUGIN_DIR = path.resolve(PLUGIN_DIR, '..');
const ALL_DATA_DIR = path.resolve(DATA_DIR, '..');
const LITELOADER_DIR = path.resolve(PLUGIN_DIR, '..');
export {
	DATA_DIR,
	PLUGIN_DIR,
	ALL_PLUGIN_DIR,
	ALL_DATA_DIR,
	LITELOADER_DIR
};