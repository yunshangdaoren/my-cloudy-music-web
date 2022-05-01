/**
 * 歌曲播放列表管理器
 */
class ListManager{
	
	/**
	 * 构造方法
	 * @param {Object} props
	 */
	constructor(props){
		self = this;
		
		//初始化播放管理器
		this.musicPlayerManager = new MusicPlayerManager();
		//this.musicPlayerManager = new MusicPlayerManager();
	}
	
	
	/**
	 * 设置播放列表
	 * @param {Object} data
	 */
	setDatum(data){
		//保存数据
		this.datum = data;
	}
	
	
	/**
	 * 播放歌曲
	 * @param {Object} data
	 */
	play(data){
		//保存播放对象
		this.data = data;
		
		//标记已经播放了
		this.isPlay = true;
		
		//将相对地址改为绝对地址
		let uri = RESOURCE_ENDPOINT + data.uri;
		
		//播放
		musicPlayerManager.play(uri, data);
	}
	
	/**
	 * 暂停
	 */
	pause(){
		musicPlayerManager.pause();
	}
	
	/**
	 * 继续播放
	 */
	resume(){
		if(this.isPlay){
			//播放器已经初始化了，原来已经播放了，则继续播放
			this.musicPlayerManager.resume();
		}else{
			//播放器还没有初始化，点击继续播放按钮是不能播放的，需要调用play(data)方法
			this.play(this.data);
		}
	}
	
	
	
	
	
}