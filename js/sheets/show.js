/**
 * 删除歌单按钮点击
 */
function onDeleteClick(){
	//弹出确认 提示框
	swal({
		title:"是否确认删除歌单？",
		icon:"warning",
		buttons:true,
		dangerMode:true
	}).then(function(willDelete){
		if(willDelete){
			//确认删除，则提交表单
			$("#delete-form").submit();
		}
	});
}

/**
 * 播放按钮点击事件
 */
$("[data-music-play]").click(function(){
	//下标
	let index = $(this).attr("data-music-play");
	
	//调用播放方法
	musicPlay(index);
});

/**
 * 音乐播放
 * @param {*} index 
 */
function musicPlay(index){
	//测试数据
	let musicListString = "...";
	
	//更新播放列表
	localStorage.setItem(PLAYER_MUSIC_LIST, musicListString);
	
	//删除当前播放音乐索引
	localStorage.removeItem(PLAYER_MUSIC_INDEX);
	
	//重新设置当前播放音乐索引
	localStorage.setItem(PLAYER_MUSIC_INDEX, index);
	
	
	//先打开一个空白播放页面窗口
	win = window.open("", WINDOW_PLAYER_MUSIC_NAME);
	
	if(win.location.href == "about:blank"){
		//播放页面窗口没有打开，则新打开一个播放页面窗口
		win = window.open("../test/simple-player.html", WINDOW_PLAYER_MUSIC_NAME);
	}else{
		//播放页面窗口已经打开，则获取焦点
		win.focus();
	}
}