/**
 * 播放管理器事件
 */
let EVENT_PREPARE = 1;

/**
 * 已经播放了事件
 */
let EVENT_PLAY = 10;

/**
 * 已经暂停了事件
 */
let EVENT_PAUSE = 20;

/**
 * 进度事件
 */
let EVENT_PROGRESS = 30;

/**
 * 播放完毕了事件
 */
let EVENT_COMPLETION = 40;

/**
 * 音量改变了事件
 */
let EVENT_VOLUME = 50;

/**
 * 发生错误了事件
 */
let EVENT_ERROR = 60;

/**
 * 播放管理器
 */
class MusicPlayerManager {
	/**
	 * 构造方法
	 * @param {Object} props
	 */
	constructor(props) {
		//初始化播放器
		this.player = new Audio();

		//创建监听器数组
		this.listeners = new Array();

		//初始化设置播放器监听
		this.initListeners();
	}

	/**
	 * 初始化设置播放监听器
	 */
	initListeners() {
		let self = this;

		//添加监听事件
		//准备播放完毕了
		this.player.addEventListener("canplay", function() {
			//设置歌曲播放时长到播放对象
			self.data.duration = self.player.duration;
			
			//console.log("title:"+self.player.title)
			//self.data.title = self.player.title;

			//回调监听器
			self.eachListener(EVENT_PREPARE);
		});

		//音乐已经播放了
		this.player.addEventListener("play", function() {
			//回调监听器
			self.eachListener(EVENT_PLAY);
		});

		//音乐已经暂停了
		this.player.addEventListener("pause", function() {
			//回调监听器
			self.eachListener(EVENT_PAUSE);
		});

		//播放进度改变了
		this.player.addEventListener("timeupdate", function() {
			//设置时长
			self.data.progress = self.player.currentTime;
			//回调监听器
			self.eachListener(EVENT_PROGRESS)
		});

		//播放完毕了
		this.player.addEventListener("ended", function() {
			//回调监听器
			self.eachListener(EVENT_COMPLETION);
		});

		//音量改变了
		this.player.addEventListener("volumechange", function() {
			//设置音量
			self.data.volume = self.player.volume;
			//回调监听器
			self.eachListener(EVENT_VOLUME);
		})

		//发生错误了
		this.player.addEventListener("error", function() {
			// MediaError 对象的 code 属性返回一个数字值，它表示音频/视频的错误状态：
			// 1 = MEDIA_ERR_ABORTED - 取回过程被用户中止
			// 2 = MEDIA_ERR_NETWORK - 当下载时发生错误
			// 3 = MEDIA_ERR_DECODE - 当解码时发生错误
			// 4 = MEDIA_ERR_SRC_NOT_SUPPORTED - 不支持音频/视频
			
			self.eachListener(EVENT_ERROR);
		});
	}

	/**
	 * 回调所有监听器
	 * @param {Object} event 传入回调的事件类型
	 */
	eachListener(event) {
		if (!this.data) {
			//如果没有数据，则return
			return;
		}

		let self = this;

		//循环回调所有监听器
		this.listeners.forEach(function(item, index, array) {
			if (event == EVENT_PREPARE) {
				//播放器准备完毕了
				item.onPrepared(self.data);
			} else if (event == EVENT_PLAY) {
				//音乐已经播放了
				item.onPlaying(self.data);
			} else if (event == EVENT_PAUSE) {
				//音乐已经暂停了
				item.onPaused(self.data);
			} else if (event == EVENT_PROGRESS) {
				//播放进度改变了
				item.onProgress(self.data);
			} else if (event == EVENT_COMPLETION) {
				//播放完毕了
				item.onCompletion(self.data);
			} else if (event == EVENT_VOLUME) {
				//音量改变了
				item.onVolumeChanged(self.data);
			} else if (event == EVENT_ERROR) {
				//发生错误了
				item.onError(self.data, self.player.error);
			}
		});
	}

	/**
	 * 播放音乐
	 * @param {Object} url 音乐播放的绝对地址
	 * @param {Object} data 音乐对象
	 */
	play(uri, data) {
		//保存音乐对象
		this.data = data;

		//保存播放地址
		this.player.src = uri;
		
		//this.player.title = data.title;
		
		//开始播放
		this.player.play();
	}

	/**
	 * 是否在播放
	 */
	isPlaying() {
		return !this.player.paused;
	}

	/**
	 * 暂停
	 */
	pause() {
		if (this.isPlaying()) {
			//如果正在播放音乐，则暂停
			this.player.pause();
		}
	}

	/**
	 * 继续播放
	 */
	resume() {
		if (!this.isPlaying()) {
			//如果没有播放，则继续播放
			this.player.play();
		}
	}

	/**
	 * 获取当前播放的音乐
	 * @return
	 */
	getData() {
		return this.data;
	}

	/**
	 * 从指定位置播放
	 * @param {Object} progress
	 */
	seekTo(progress) {
		this.player.currentTime = progress;
	}

	/**
	 * 设置是否单曲循环
	 * @param {Object} looping
	 */
	setLooping(looping) {
		this.player.loop = looping;
	}

	/**
	 * 获取当前音量
	 * @return number 0~1之间
	 */
	getVolume() {
		return this.player.volume;
	}

	/**
	 * 设置当前音量
	 * @param {number} value
	 */
	setVolume(value) {
		this.player.volume = value;
	}

	/**
	 * 添加播放监听器
	 * @param {Object} listener
	 */
	addMusicPlayerListener(listener) {
		if (!(this.listeners in listener)) {
			this.listeners.push(listener);
		}
	}

	/**
	 * 移除播放监听器
	 * @param {Object} listener
	 */
	removeMusicPlayerListener(listener) {
		this.listeners.remove(listener);
	}
}
