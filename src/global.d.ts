import { LLWebUiApiType } from './preload';
// 扩展全局对象
declare global {
    var LiteLoader: any;
    interface Window {
        LLWebUiApi: LLWebUiApiType;
        LiteLoader: any;
    }
}
export { };