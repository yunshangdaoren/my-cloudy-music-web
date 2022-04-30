/**
 * 提示工具类
 * @param {Object} data 提示信息
 */
function shortErrorToast(data){
	swal(data,{
		icon:"error",
		buttons:false,
		timer:10000
	});
}