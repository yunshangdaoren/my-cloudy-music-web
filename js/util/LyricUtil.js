/* 歌词相关工具类 */
class LyricUtil{
	
	/**
	 * 获取当前播放进度（时间）对应的歌词行号
	 * @param {Object} data 歌词
	 * @param {number} progress 播放进度（时间）,单位秒
	 */
	static getLineNumber(data, progress){
		//秒转为毫秒
		progress = progress * 1000;
		
		//转为int
		progress = parseInt(progress);
		
		//获取歌词列表
		let datum = data.datum;
		
		//定义一行歌词
		var line = null;
		
		//倒序遍历每一行歌词
		for(let i = datum.length-1; i >= 0; i--){
			line = datum[i];
			
			//如果当前播放进度（时间）>= 当前这行歌词的开始时间，那就是改行歌词
			if(progress >= line.start){
				//返回该行
				return i;
			}
			
		}
		
	}
}