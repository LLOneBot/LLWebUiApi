import { BrowserWindow } from 'electron';

function onBrowserWindowCreated(window: BrowserWindow) {
  console.log(window);
  console.log("onBrowserWindowCreated...");
}
export {
  onBrowserWindowCreated
}