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
const Interval = setInterval(() => {
	if (location.pathname === '/renderer/login.html') {
		const loginBtnText = document.querySelector('.auto-login .q-button span');
		if (loginBtnText) {
			// 如果有自动登录 就自动登录
			(loginBtnText as HTMLButtonElement).click();
		}
		// tx大概率拦截了窗口消息之类的hook实现 前端不可见 也不可输入
		// 如果想实现可能需要 发送窗口消息 但是headless又没有窗口 难崩
		//window.LLWebUiApi.LoginQrCode(getQRcode());
	}
	clearInterval(Interval);
	// #/main/message 已进入主界面
}, 5000);
window.LLWebUiApi.pushLog(await window.LLWebUiApi.getWebUiState());
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