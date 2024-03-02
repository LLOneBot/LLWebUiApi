
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function onSettingWindowCreated(_view: Element) {
	window.LLWebUiApi.pushLog('Hello');
}
//window.LLWebUiApi.pushLog("Hello12");
/**
 * 
 * @description 获取QRcode 如果过期会自动刷新
 * @returns  返回data:image/png;base,xxx格式的字符串
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getQRcode(): string {
	if (location.pathname !== '/renderer/login.html') {
		return '';
	}
	if ((document.querySelector('.qrcode-error .expired-label') as HTMLDivElement)?.innerText === '当前二维码已过期') {
		(document.querySelector('.q-button .q-button--secondary .q-button--default') as HTMLButtonElement)?.click();
	}
	return (document.querySelector('.qr-code-img > img') as HTMLImageElement)?.src;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Interval = setInterval(() => {
	if (location.pathname === '/renderer/login.html') {
		const loginBtnText = document.querySelector('.auto-login .q-button span');
		if (loginBtnText) {
			// 如果有自动登录 就自动登录
			(loginBtnText as HTMLButtonElement).click();
		}
		// tx大概率拦截了窗口消息之类的hook实现 前端不可见 也不可输入
		// 如果想实现可能需要 发送窗口消息 但是headless又没有窗口 难崩
		window.LLWebUiApi.LoginQRcode(getQRcode());
	}
	clearInterval(Interval);
},10000);

function isRendererInit() {
	const hash = location.hash;
	if (hash === '#/blank') {
		return;
	}
}


if (location.hash === '#/blank') {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	(window as any).navigation.addEventListener('navigatesuccess', isRendererInit, { once: true });
} else {
	isRendererInit();
}
export {
	onSettingWindowCreated
};