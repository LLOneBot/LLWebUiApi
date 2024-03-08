import { WebStateCode } from "./common/types";

async function onSettingWindowCreated(_view: Element) {
}
/**
 * 
 * @description 获取QRcode 如果过期会自动刷新
 * @returns  返回data:image/png;base,xxx格式的字符串
 */
function getQRcode(): string {
	if (location.pathname !== '/renderer/login.html') {
		return '';
	}
	if ((document.querySelector('.qrcode-error .expired-label') as HTMLDivElement)?.innerText === '当前二维码已过期') {
		(document.querySelector('.q-button .q-button--secondary .q-button--default') as HTMLButtonElement)?.click();
	}
	return (document.querySelector('.qr-code-img > img') as HTMLImageElement)?.src;
}
function isRendererInit() {
	const hash = location.hash;
	if (hash === '#/blank') {
		return;
	}
}
const WebState = await window.LLWebUiApi.getWebUiState();
CheckQrLogin();
function CheckQrLogin() {
	if (WebState.WorkState == WebStateCode.WAIT_LOGIN) {
		if (location.pathname === '/renderer/login.html') {
			const disconnect = document.querySelector('.process-txt .disconnect');
			if (disconnect) return;
			const Interval = setInterval(() => {
				const loginBtnText = document.querySelector('.auto-login .q-button span');
				if (loginBtnText) {
					// 如果有自动登录 就自动登录
					(loginBtnText as HTMLButtonElement).click();
					clearInterval(Interval);
				}
				window.LLWebUiApi.pushLog("持续获取中...");
				window.LLWebUiApi.pushLoginQrcode("1235548");
			}, 5000)
		} else if (location.hash == "#/main/message") {
			// 到达登录界面
			WebState.WorkState = WebStateCode.WORK_NORMAL;
			window.LLWebUiApi.setWebUiState(WebState);
		}
	}
}

if (location.hash === '#/blank') {
	(window as any).navigation.addEventListener('navigatesuccess', isRendererInit, { once: true });
} else {
	isRendererInit();
}

export {
	onSettingWindowCreated
};