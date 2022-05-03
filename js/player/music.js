/**
 * 设置背景图片加载成功后，回调
 * 目的是实现背景高斯模糊
 */
document.getElementById("img-background").onload = function(){
	//显示背景图片
	showBackgroundBlur();
};

/**
 * 显示背景图片
 */
function showBackgroundBlur(){
	StackBlur.image('img-background', 'canvas-mask', 60, false);
}


//创建音乐播放列表管理器
listManager = new ListManager();

//获取音乐播放管理器
musicPlayerManager = listManager.musicPlayerManager;

//创建播放管理器监听器
var listener = new MusicPlayerListener();

//添加监听器到播放管理器
musicPlayerManager.addMusicPlayerListener(listener);

//获取播放列表数据
let datum = listManager.getDatum();

//获取播放的音乐
let data = listManager.getData();

if(data){
	//显示初始化数据
	showInitData();
}

/**
 * 显示初始化数据
 */
function showInitData(){
	//获取当前播放的音乐
	let data =  listManager.getData();
	
	//将封面地址转为绝对地址
	let uri = RESOURCE_ENDPOINT + data.banner;
	
	//将获取到的封面地址，赋值显示为背景图片
	$("#img-background").attr("src", uri);
}

//console.log("音乐列表："+datum);
//console.log("当前播放的音乐："+data);

/**
 * 上一首
 */
function onPreviousClick(){
	listManager.play(listManager.previous());
}

/**
 * 播放
 */
function onPlayClick(){
	if(musicPlayerManager.isPlaying()){
		listManager.pause();
	}else{
		listManager.resume();
	}
}

/**
 * 下一首
 */
function onNextClick(){
	listManager.play(listManager.next());
}

/**
 * 播放进度条改变了
 * @param {Object} data 播放进度
 */
function onProgressChanged(data){
	
}

/**
 * 循环模式点击了
 */
function onLoopModelClick(){
	
}

/**
 * 音量滑块值改变了
 * @param {Object} data
 */
function onVolumeChanged(data){
	
}

/**
 * 播放列表点击了
 */
function onListClick(){
	
}


//设置要关注的事件
//音乐播放准备完毕了
listener.onPrepared = function(data){
	//显示初始化数据
	showInitData();
}

/**
 * 音乐播放了
 * @param {Object} data
 */
listener.onPlaying = function(data){
	//显示暂停状态
	showPausedStatus();
}

/**
 * 音乐暂停了
 * @param {Object} data
 */
listener.onPaused = function(data){
	//显示播放状态
	showPlayingStatus();
}

/**
 * 显示暂停状态
 */
function showPausedStatus(){
	$("#image-play").attr("src", "../assets/player/ic_music_pause.png");
}

/**
 * 显示播放状态
 */
function showPlayingStatus(){
	$("#image-play").attr("src", "../assets/player/ic_music_play.png");
}