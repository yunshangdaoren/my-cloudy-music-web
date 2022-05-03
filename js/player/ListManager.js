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
		
		//创建播放管理器监听器
		var listener = new MusicPlayerListener();
		
		//设置需要监听关注的事件
		//监听准备播放音乐完成了
		listener.onPrepared = function(data){
			//保存最后播放的音乐的进度
			PreferenceUtil.setLastPlaySongDuration(data.duration);
		};
		
		//监听播放进度改变了
		listener.onProgress = function(data){
			//保存最后播放的音乐的进度
			PreferenceUtil.setLastPlaySongProgress(data.progress);
		};
		
		//监听音乐播放完毕了
		listener.onCompletion = function(){
			//判断循环模式
			if(MODEL_LOOP_ONE == self.getLoopModel()){
				//如果为单曲循环，则继续播放当前音乐
				self.play(self.data);
			}else{
				//如果为随机循环或列表循环，则播放下一首音乐
				//获取下一首音乐
				let data = self.next();
				
				if(data){
					//如果下首有音乐，则播放
					self.play(data);
				}else{
					//没有找到下首音乐，出错了
				}
			}
		};
		
		//将监听器添加到播放管理器中
		this.musicPlayerManager.addMusicPlayerListener(listener);
		
		//初始化音乐播放列表
		this.initPlayList();
		
		//初始化本地存储监听器
		this.initLocalStorageListener();
	}
	
	/**
	 * 初始化音乐播放列表
	 */
	initPlayList(){
		//查询播放列表
		this.datum =  PreferenceUtil.queryPlayList();
		
		//判断播放列表是否为空
		if(this.datum){
			//播放列表不为空
			//获取最后播放的音乐的id
			let id = PreferenceUtil.getLastPlaySongId();
			
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
					//获取最后播放的音乐的时长
					this.data.duration = PreferenceUtil.getLastPlaySongDuration();
					
					//获取最后播放的音乐的进度
					this.data.progress = PreferenceUtil.getLastPlaySongProgress();
				}
			}else{
				//id为空，没有找到最后播放的音乐id，则从第一首音乐开始播放
				this.defaultPlaySong();
			}
			
		}
	}
	
	//初始化本地存储监听器
	initLocalStorageListener(){
		//添加本地存储监听器
		window.addEventListener("storage", function(data){
			//判断事件类型
			if(data.key == PLAYER_MUSIC_LIST){
				//如果为播放列表数据改变了
				
				//判断是否有新的音乐播放列表
				if(data.newValue){
					//有值，则将新的播放列表解析为JSON对象，并赋值
					self.datum = JSON.parse(data.newValue);
				}else{
					//没有值，则表示需要清空播放列表数据
					//先尝试暂停音乐
					self.pause();
					
					//清空播放列表数据
					self.datum = null;
					
					//清空当前播放音乐
					self.data = null;
				}
			}
			
			if(data.key == PLAYER_MUSIC_ID && data.newValue){
				//如果是播放新的音乐，且新的音乐不为空，则开始播放新的音乐
				self.playById(data.newValue);
			}
		});
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
	 * 根据指定音乐id播放音乐
	 * @param {Object} id
	 */
	playById(id){
		//定义要播放的音乐对象
		var data = null;
		
		//遍历音乐播放列表，根据该音乐id查询到要播放的音乐
		this.datum.forEach(function(s, index, array){
			if(s.id == id){
				//找到要播放的音乐，则赋值
				data = s;
				//终止遍历
				return false;
			}
		});
		
		if(data){
			//要播放的音乐不为null，则开始播放这个音乐
			this.play(data);
		}else{
			//要播放的音乐为null，则表示没有找到，抛出错误
			console.log("没有找到要播放的音乐！id:"+id+"   datum:"+this.datum);
		}
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
		
		//console.log("uri:"+uri);
		//播放 
		musicPlayerManager.play(uri, data);
		
		//保存最后播放音乐的Id
		PreferenceUtil.setLastPlaySongId(data.id);
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
			//console.log("resume() title:"+this.data.title);
			this.play(this.data);
			
			//判断是否有最后一次播放的音乐的进度
			if(this.data.progress > 0){
				//有播放进度，则从该进度开始播放
				this.musicPlayerManager.seekTo(this.data.progress);
			}
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