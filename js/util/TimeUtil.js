/**
 * 日期时间工具类
 */
class TimeUtil{
	
	/**
	 * 将秒格式化为：分:秒
	 * @param {Object} data 秒
	 */
	static s2ms(data){
		if(!data){
			//如果data为null，则返回00:00
			return "00:00"
		}
		
		//计算分钟
		let minute = parseInt(data/60);
		
		//计算秒
		let second = parseInt(data - (minute * 60));
		
		//返回分:秒
		return this.paddingInt(minute, 2) + ":" + this.paddingInt(second, 2);
	}
	
	/**
	 * 对整数进行补位。如：6变成06
	 * 如输入：paddingInt(1, 2)，则返回01
	 * @param {Object} data 要补位的数据
	 * @param {Object} length 补几位
	 */
	static paddingInt(data, length){
		return (Array(length).join('0') + data).slice(-length);
	}
	
	/**
	 * 将分:秒:毫秒转换为毫秒
	 * @param {Object} data 时间，格式为:04:03.200
	 */
	static parseToInt(data){
		//将:替换为.
		data = data.replace(":", ".");
		
		//使用.进行拆分
		let strings = data.split("\.");
		
		//分别取出分、秒、毫秒
		let m = parseInt(strings[0]);
		let s = parseInt(strings[1]);
		let ms = parseInt(strings[2]);
		//转换为毫秒
		return (m * 60 + s) * 1000 + ms;
	}
	
}