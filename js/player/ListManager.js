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
		
		//定义循环模式为列表循环(0)
		this.model = MODEL_LOOP_LIST;
		
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
	
	
	/**
	 * 更改循环模式
	 */
	changeLoopModel(){
		//循环模式+1
		this.model++;
		
		//判断循环模式边界(是否超过2)
		if(this.model > MODEL_LOOP_RANDOM){
			//如果当前循环模式大于随机循环，则超出边界
			//设置循环模式为列表循环(0)
			this.model = MODEL_LOOP_LIST;
		}
		
		//设置单曲循环
		this.musicPlayerManager.setLooping(this.model == MODEL_LOOP_ONE)
		
		//返回循环模式
		return this.model;
	}
	
	/**
	 * 获取当前循环模式
	 */
	getLoopModel(){
		return this.model;
	}
	
}