/**
 * 本地存储localStorage工具类，用于储存和操作音乐播放列表
 */
class PreferenceUtil{
	
	/**
	 * 查询播放列表
	 */
	static queryPlayList(){
		//获取到播放列表数据
		let data = localStorage.getItem(PLAYER_MUSIC_LIST);
		
		//非空判断
		if(!isEmpty(data)){
			//有值，则解析为JSON对象
			return JSON.parse(data);
		}
		
		//没有值，则返回null
		return null;
	}
	
	/**
	 * 获取最后播放的音乐的id
	 */
	static getLastPlaySongId(){
		return localStorage.getItem(PLAYER_MUSIC_ID);
	}
	
	/**
	 * 保存最后播放的音乐的时长
	 * @param {Object} data
	 */
	static setLastPlaySongDuration(data){
		localStorage.setItem(LAST_PLAY_SONG_DURAION, data);
	}
	
	/**
	 * 获取最后播放的音乐的时长
	 */
	static getLastPlaySongDuration(){
		return localStorage.getItem(LAST_PLAY_SONG_DURAION);
	}
	
	/**
	 * 保存最后播放的音乐的进度
	 * @param {Object} data
	 */
	static setLastPlaySongProgress(data){
		localStorage.setItem(LAST_PLAY_SONG_PROGRESS, data);
	}
	
	/**
	 * 获取最后播放的音乐的进度
	 */
	static getLastPlaySongProgress(){
		return localStorage.getItem(LAST_PLAY_SONG_PROGRESS);
	}
}