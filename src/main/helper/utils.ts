import path from "path";

const DATA_DIR = global.LiteLoader.plugins['WebUiApi'].path.data;
const PLGIN_DIR = global.LiteLoader.plugins['WebUiApi'].path.plugin;
const ALL_PLGIN_DIR = path.resolve(PLGIN_DIR, '..');
const ALL_DATA_DIR = path.resolve(DATA_DIR, '..');
export {
	DATA_DIR,
	PLGIN_DIR,
	ALL_PLGIN_DIR,
	ALL_DATA_DIR
};