/* 通用JS */

/**
 * 判断字符串是否为空
 * @param {Object} data
 */
function isEmpty(data){
	if(typeof data == 'undefined' || data == null || data==""){
		return true;
	}
	return false;
}
