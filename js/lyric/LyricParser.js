/**
 * KSC歌词
 */
let KSC = 10;



/**
 * 歌词解析器
 */
class LyricParser {

	/**
	 * 解析歌词
	 * @param {number} style 歌词类型
	 * @param {string} data 
	 */
	static parse(style, data) {
		switch (style) {
			case KSC:
				break;
			default:
				//默认解析LRC歌词
				return LRCLyricParser.parse(data);
				break;
		}
	}
}
