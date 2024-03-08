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
const WebState = await window.LLWebUiApi.getWebUiState();
if (WebState.WorkState = WebStateCode.WAIT_LOGIN) {
	if (location.pathname === '/renderer/login.html') {
		const Interval = setInterval(() => {
			const loginBtnText = document.querySelector('.auto-login .q-button span');
			if (loginBtnText) {
				// 如果有自动登录 就自动登录
				(loginBtnText as HTMLButtonElement).click();
			}
			clearInterval(Interval);
		}, 5000)
	}
}

function isRendererInit() {
	const hash = location.hash;
	if (hash === '#/blank') {
		return;
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