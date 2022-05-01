/**
 * 播放管理器
 */
class MusicPlayerManager{
	/**
	 * 构造方法
	 * @param {Object} props
	 */
	 constructor(props){
		//初始化播放器
		this.player = new Audio();
		
		//设置播放器监听
		//this.initListeners();
	}
	
	/**
	 * 播放音乐
	 * @param {Object} url 音乐播放的绝对地址
	 * @param {Object} data 音乐对象
	 */
	play(url, data){
		//保存音乐对象
		this.data = data;
		
		//保存播放地址
		this.player.src = url;
		
		//开始播放
		this.player.play();
	}
	
	/**
	 * 是否在播放
	 */
	isPlaying(){
		return !this.player.paused;
	}
	
	/**
	 * 暂停
	 */
	pause(){
		if(this.isPlaying()){
			//如果正在播放音乐，则暂停
			this.player.pause();
		}
	}
	
	/**
	 * 继续播放
	 */
	resume(){
		if(!this.isPlaying()){
			//如果没有播放，则继续播放
			this.player.play();
			
			//
		}
	}
	
	/**
	 * 获取当前播放的音乐
	 * @return
	 */
	getData(){
		return this.data;
	}
	
	/**
	 * 从指定位置播放
	 * @param {Object} progress
	 */
	seekTo(progress){
		this.player.currentTime = progress;
	}
	
	/**
	 * 设置是否单曲循环
	 * @param {Object} looping
	 */
	setLooping(looping){
		this.player.loop = looping;
	}
	
	/**
	 * 获取当前音量
	 * @return number 0~1之间
	 */
	getVolume(){
		return this.player.volume;
	}
	
	/**
	 * 设置当前音量
	 * @param {number} value
	 */
	setVolume(value){
		this.player.volume = value;
	}
	
}