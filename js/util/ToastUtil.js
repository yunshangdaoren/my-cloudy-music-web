/* sweetalert弹出提示框框架，封装的提示工具类 */

/**
 * 短时间失败提示
 * @param {Object} data 提示信息
 */
function shortErrorToast(data){
	swal(data,{
		icon:"error",
		buttons:false, //false则弹出框会自动关闭
		timer:2000
	});
}

/**
 * 短时间成功提示
 * @param {Object} data 提示信息
 */
function shortSuccessToast(data){
	swal(data,{
		icon:"success",
		buttons:false,
		timer:2000
	});
}