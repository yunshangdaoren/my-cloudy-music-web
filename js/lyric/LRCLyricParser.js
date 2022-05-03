/**
 * LRC歌词解析
 */
class LRCLyricParser{
	
	/**
	 * 解析LRC歌词
	 * 例: [00:00.00]《红尘痴笑一场梦》
	 *     [00:04.00]演唱：暴林
	 * 	   [00:08.00]作词/作曲：刘宏杰
	 *       
	 * @param {Object} data
	 */
	static parse(data){
		//创建解析后的歌词对象
		let result = {};
		
		//初始化一个列表
		var datum = Array();
		
		//使用\n拆分歌词，拆分返回一个歌词数组
		var strings = data.split("\n");
		
		//循环遍历每一行歌词
		strings.forEach(item =>{
			//定义一行歌词
			let line = this.parseLine(item);
			
			if(line){
				//过滤歌词内容为空的歌词
				//将歌词添加进去
				datum.push(line);
			}
		});
		
		//将歌词行列表添加到结果对象
		result.datum = datum;
		
		return result;
	}
	
	/**
	 * 解析一行歌词
	 * 如：[00:04.00]演唱：暴林
	 * 需要将时间和歌词内容分别解析出来，并返回
	 * @param {Object} data 一行歌词，里面有两个数据：时间和歌词内容
	 */
	static parseLine(data){
		//过滤元数据(如[ti:红尘痴笑一场梦])
		if(data.startsWith("[0")){
			//如果歌词超过10分钟，如11分钟后，就变成了了[11，这种需要另外处理
			//创建歌词行
			let line = {};
			
			//去除前面的[
			data = data.slice(1);
			
			//使用]进行拆分
			let strings = data.split("]");
			
			//获取该行歌词的开始时间
			line.start = TimeUtil.parseToInt(strings[0]);
			
			//获取改行歌词的内容
			line.data = strings[1];
			
			if(line.data){
				//返回解析的歌词
				return line;
			}
		}
		return null;
	}
	
	
}