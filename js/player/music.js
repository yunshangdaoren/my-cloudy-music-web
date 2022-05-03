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
	StackBlur.image('img-background', 'canvas-mask', 150, false);
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

/**
 * 页面加载后，判断是否有需要播放的音乐
 * @param {Object} data
 */
if(data){
	//如果要播放的音乐不为空，显示初始化数据
	showInitData();
	
	//显示音乐时长
	showDuration();
	
	//显示播放进度
	showProgress();
	
	//显示音乐音量
	$("#volume").val(musicPlayerManager.getVolume());
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
	
	//显示封面
	$("#image-cover").attr("src", uri);
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
	//将拖拽的进度值，设置到列表管理器
	listManager.seekTo(data);
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
	//将拖拽的音量值，设置到播放管理器
	musicPlayerManager.setVolume(data);
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
	
	//显示音乐时长
	showDuration();
	
	//保存最后播放的音乐的时长
	PreferenceUtil.setLastPlaySongDuration(data.duration);
}

/**
 * 音乐播放了
 * @param {Object} data
 */
listener.onPlaying = function(data){
	//显示暂停状态
	showPausedStatus();
	
	//开始旋转黑胶唱片
	startRecordRotate();
}

/**
 * 音乐暂停了
 * @param {Object} data
 */
listener.onPaused = function(data){
	//显示播放状态
	showPlayingStatus();
	
	//停止旋转黑胶唱片
	stopRecordRotate();
}

/**
 * 音乐播放进度改变了
 * @param {Object} data
 */
listener.onProgress = function(data){
	if(listManager.getData()){
		//如果有要播放的音乐，则显示播放进度
		showProgress();
	}
	
	//保存最后播放的音乐的进度
	PreferenceUtil.setLastPlaySongProgress(data.progress);
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

/**
 * 显示音乐播放时长
 */
function showDuration(){
	//获取当前播放音乐的时长
	let data = listManager.getData().duration;
	
	//格式化显示时长
	$("#end").text(TimeUtil.s2ms(data));
	
	//设置进度条总长度
	$("#progress").attr("max", data);
	
	//alert("时长："+data);
}

/**
 * 显示播放进度
 */
function showProgress(){
	//获取进度
	let progress = listManager.getData().progress;
	
	//格式化并赋值进度值给标签
	$("#start").text(TimeUtil.s2ms(progress));
	
	//设置进度值给进度条
	$("#progress").val(progress);
}

//定义全局变量：旋转黑胶唱片的定时器
var musicTimer = null;

/**
 * 开始旋转黑胶唱片
 */
function startRecordRotate(){
	if(musicTimer){
		//已经启动定时器，黑胶唱片在旋转了
		return;
	}
	
	//启动定时器
	musicTimer =  setInterval(musicTimerTask, MUSIC_TIMER_INTERVAL);
}

//定义全局变量：黑胶唱片旋转的角度
var recordRotation = 0;

/**
 * 旋转黑胶唱片
 */
function musicTimerTask(){
	//判断角度边界
	if(recordRotation >= 360){
		//设置为0
		recordRotation = 0;
	}
	
	//加上要旋转的角度
	recordRotation += ROTATION_PER;
	
	//旋转
	$("#image-cover").rotate(recordRotation);
}

/**
 * 停止旋转黑胶唱片
 */
function stopRecordRotate(){
	if(musicTimer){
		//如果musicTimer不为null，则清除musicTimer
		clearInterval(musicTimer);
		//设置为null
		musicTimer = null;
	}
}
