import { BrowserWindow, ipcMain } from 'electron';
import { initHeadless3 } from "./main/headless";
import { CHANNEL_CORE_ERROR, CHANNE_CORE_LOG, CHANNEL_CORE_GETCONFIG, CHANNEL_CORE_SETCONFIG } from './common/channels';
import { ServerFactory } from './api/factory';

function onBrowserWindowCreated(_window: BrowserWindow) {
  console.log("onBrowserWindowCreated...");
}
function loadLLWebUiApi() {
  // 开启无头模式
  //initHeadless3();
  // 注册基础事件
  ipcMain.handle(CHANNEL_CORE_ERROR, async (_event, _arg) => { });
  ipcMain.handle(CHANNE_CORE_LOG, async (_event, _arg) => { });
  ipcMain.handle(CHANNEL_CORE_GETCONFIG, async (_event, _arg) => { });
  ipcMain.handle(CHANNEL_CORE_SETCONFIG, async (_event, _arg) => { });
  //
  new ServerFactory("http", 4557);
}
try {
  loadLLWebUiApi();
} catch (e: any) {
  console.log(e.toString())
}
export {
  onBrowserWindowCreated
}