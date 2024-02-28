import { BrowserWindow } from 'electron';
import { initHeadless3 } from "./main/headless";


function onBrowserWindowCreated(_window: BrowserWindow) {
  console.log("onBrowserWindowCreated...");
}
function loadLLWebUiApi() {
  initHeadless3();
  // 开始启动Api
  // 流程 读取Config 是否以headless模式启动 启动后 让接口适配器 启动对应接口
  // 全局Login状态需要保存
}
try {
  loadLLWebUiApi();
} catch (e: any) {
  console.log(e.toString())
}
export {
  onBrowserWindowCreated
}