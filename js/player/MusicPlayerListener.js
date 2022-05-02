/**
 * 定义音乐播放管理器监听器
 *    播放管理器：负责音乐的播放
 *    列表管理器：主要实现上一曲、下一曲、切换循环模式
 *    监听器：主要由于播放页面的监听事件
 */
class MusicPlayerListener{
	/**
	 * 音乐已经暂停了
	 * @param {Object} data
	 */
	onPaused(data){
		
	}
	
	/**
	 * 音乐已经播放了
	 * @param {Object} data
	 */
	onPlaying(data){
		
	}
	
	/**
	 * 播放器准备完毕了
	 * @param {Object} data
	 */
	onPrepared(data){
		
	}
	
	/**
	 * 播放进度改变了
	 * @param {Object} data
	 */
	onProgress(data){
		
	}
	
	/**
	 * 播放完毕了
	 */
	onCompletion(){
		
	}
	
	/**
	 * 音量改变了
	 * @param {Object} data
	 */
	onVolumeChanged(data, player){
		
	}
	
	/**
	 * 播放发生错误了
	 * @param {Object} data
	 * @param {Object} error
	 */
	onError(data, error){
		
	}
}