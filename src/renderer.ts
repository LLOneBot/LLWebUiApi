import { BootMode, WebStateCode, WebUiApiConfig } from "./common/types";

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
	// 扫码之后一直不登
	if (document.querySelector(".q-button__slot-warp")) {
		(document.querySelector(".q-button__slot-warp") as HTMLButtonElement).click();
	}
	if ((document.querySelector('.qrcode-error.expired-label') as HTMLDivElement)?.innerText === '当前二维码已过期') {
		(document.querySelector('.q-button.q-button--secondary.q-button--default') as HTMLButtonElement)?.click();
	}
	return (document.querySelector('.qr-code-img > img') as HTMLImageElement)?.src;
}
let WebState = await window.LLWebUiApi.getWebUiState();
let WebUiConfig: WebUiApiConfig = await window.LLWebUiApi.getWebUiConfig();

function isRendererInit() {
	const hash = location.hash;
	if (hash === '#/blank') {
		return;
	}
	if (location.hash == "#/main/message") {
		// 到达登录界面
		WebState.WorkState = WebStateCode.WORK_NORMAL;
		window.LLWebUiApi.setWebUiState(WebState);
		// 设置后台 为Headless3
		if (WebState.BootMode == BootMode.HEADLESS3) {
			// 最小化方案
			/*
			const minbutton = document.querySelector(".window-control-area > div:nth-of-type(2)");
			if (minbutton) {
				(minbutton as HTMLButtonElement).click()
			}*/
			// 关闭进行托盘方案
			const closebutton = document.querySelector("div.close");
			if (closebutton) {
				(closebutton as HTMLButtonElement).click()
			}
		}
	}
}
CheckQrLogin();
function CheckQrLogin() {
	if (WebState.WorkState == WebStateCode.WAIT_LOGIN || WebState.WorkState == WebStateCode.NET_ERROR) {
		if (location.pathname === '/renderer/login.html') {
			const disconnect = document.querySelector('.process-txt .disconnect');
			if (disconnect && WebState.WorkState != WebStateCode.NET_ERROR) {
				// 通知Main 设置断网状态
				WebState.WorkState = WebStateCode.NET_ERROR;
				window.LLWebUiApi.setWebUiState(WebState);
				return;
			} else if (!disconnect || WebState.WorkState == WebStateCode.NET_ERROR) {
				WebState.WorkState = WebStateCode.WAIT_LOGIN;
				window.LLWebUiApi.setWebUiState(WebState);
			}
			const Interval = setInterval(() => {
				const loginBtnText = document.querySelector('.auto-login .q-button span');
				if (loginBtnText) {
					// 如果有自动登录 就自动登录
					if (WebUiConfig.AutoLogin) {
						(loginBtnText as HTMLButtonElement).click();
					}
					clearInterval(Interval);
				}
				window.LLWebUiApi.pushLoginQrcode(getQRcode());
			}, 5000)
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