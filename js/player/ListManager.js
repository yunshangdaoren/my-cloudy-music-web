/**
 * 歌曲播放列表管理器
 */
class ListManager{
	
	/**
	 * 构造方法
	 * @param {Object} props
	 */
	constructor(props){
		//定义self，值=this
		self = this;
		
		//定义循环模式为列表循环(0)
		this.model = MODEL_LOOP_LIST;
		
		//初始化播放管理器
		this.musicPlayerManager = new MusicPlayerManager();
		
		//初始化音乐播放列表
		this.initPlayList();
	}
	
	/**
	 * 初始化音乐播放列表
	 */
	initPlayList(){
		//查询播放列表
		this.datum =  StorageUtil.queryPlayList();
		
		//判断播放列表是否为空
		if(this.datum){
			//播放列表不为空
			//获取最后播放的音乐的id
			let id = StorageUtil.getLastPlaySongId();
			
			if(!isEmpty(id)){
				//最后播放音乐id不为空，则获取最后播放的音乐
				this.datum.forEach(function(s, index, array){
					//判断id是否相等
					if(s.id == id){
						//找到最后播放的音乐的id
						self.data = s;
						return false;
					}
				});
				
				if(this.data == null){
					//没有找到最后播放的音乐id，则从第一首音乐开始播放
					this.defaultPlaySong();
				}else{
					//找到了最后播放的音乐的id
					
				}
			}else{
				//id为空，没有找到最后播放的音乐id，则从第一首音乐开始播放
				this.defaultPlaySong();
			}
			
		}
	}
	
	/**
	 * 默认第一首音乐
	 */
	defaultPlaySong(){
		this.data = this.datum[0];
	}
	
	
	/**
	 * 设置音乐的播放列表
	 * @param {Object} data
	 */
	setDatum(data){
		//保存数据
		this.datum = data;
	}
	
	/**
	 * 获取当前音乐的播放列表
	 */
	getDatum(){
		return this.datum;
	}
	
	/**
	 * 获取当前播放的音乐对象
	 */
	getData(){
		return this.data;
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
	
	/**
	 * 上一首
	 */
	previous(){
		//音乐索引
		var index = 0;
		
		//判断当前音乐播放的循环模式
		switch(this.model){
			case MODEL_LOOP_RANDOM:
				//当前为随机循环，则获取随机索引，Math.random():返回0~1之间的随机数，包含0不包含1
				index = parseInt(Math.random()*this.datum.length);
				break;
			default:
				//找到当前索引
				index = this.datum.indexOf(this.data);
				if(index != -1){
					//如果当前播放的音乐是列表的第一首音乐
					if(index == 0){
						//上一首就是列表的最后一首音乐
						index = this.datum.length -1;
					}else{
						index--;
					}
				}else{
					//出现异常错误，没有找到当前音乐的索引，需要抛出异常
				}
				break;
		}
		//返回需要播放的音乐
		return this.datum[index];
	}
	
	/**
	 * 下一首
	 */
	next(){
		//音乐索引
		var index = 0;
		
		//判断当前音乐播放的循环模式
		switch(this.model){
			case MODEL_LOOP_RANDOM:
				//当前为随机循环，则获取随机索引，Math.random():返回0~1之间的随机数，包含0不包含1
				index = parseInt(Math.random()*this.datum.length);
				break;
			default:
				//找到当前播放的音乐索引
				index = this.datum.indexOf(this.data);
				if(index != -1){
					//找到了当前播放的音乐
					//如果当前播放的音乐是列表中最后一个
					if(index == this.datum.length-1){
						//那么当前播放的音乐是列表中最后一个，则从第一首开始播放
						index = 0;
					}else{
						index++;
					}
				}else{
					//出现异常错误，没有找到当前音乐的索引，需要抛出异常
				}
				break;
		}
		//返回需要下一曲播放的音乐
		return this.datum[index];
	}
	
	/**
	 * 跳转到指定位置开始播放音乐
	 * @param {Object} progress
	 */
	seekTo(progress){
		this.musicPlayerManager.seekTo(progress);
		
		if(!this.musicPlayerManager.isPlaying()){
			//如果此时音乐没有播放，则继续播放音乐
			this.resume();
		}
	}
	
}