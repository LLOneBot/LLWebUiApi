import { LLWebUiApiType } from './preload';
declare global {
    interface Window {
        LLWebUiApi: LLWebUiApiType;
    }
}
export { };