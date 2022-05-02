/**
 * 本地存储工具类，用于储存和操作音乐播放列表
 */
class StorageUtil{
	
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
}