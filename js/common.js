/* 通用JS */

/**
 * 判断字符串是否为空
 * @param {Object} data
 */
function isEmpty(data){
	if(typeof data == 'undefined' || data == null || data==""){
		return true;
	}
	return false;
}

/**
 * 跳转到播放音乐页面点击事件
 */
function onOpenPlayPageClick(){
	//先打开一个空白播放页面窗口
	win = window.open("", WINDOW_PLAYER_MUSIC_NAME);
	
	if (win.location.href == "about:blank") {
		//播放页面窗口没有打开，则新打开一个播放页面窗口
		win = window.open("../player/music.html", WINDOW_PLAYER_MUSIC_NAME);
	} else {
		//播放页面窗口已经打开，则获取焦点
		win.focus();
	}
}
