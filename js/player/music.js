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

// //页面加载完成了
// $(function(){
// 	alert("页面加载完成了");
// });
// alert(2);

//创建音乐播放列表管理器
listManager = new ListManager();

//获取音乐播放管理器
musicPlayerManager = ListManager.musicPlayerManager;

//获取播放列表数据
let datum = listManager.getDatum();

//获取播放的音乐
let data = listManager.getData();

console.log("音乐列表："+datum);
console.log("当前播放的音乐："+data);

