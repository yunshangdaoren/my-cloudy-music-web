//封装JS网络请求错误处理工具类

/**
 * 判断请求是否成功
 * @param {Object} data
 */
function isSuccess(data){
	return data.status == 0;
}

/**
 * 处理HTTP请求错误
 * @param {*} data 服务端返回的数据
 * @param {*} erroe 客户端抛出的异常
 */
function handleRequest(data, error){
	if(error != null){
		//先处理本地错误
		if(error.status == 400){
			//服务端返回的参数格式错误
			
			shortErrorToast("参数格式错误！");
		}else if(error.status == 401){
			//用户未登录，跳转到登录页面
			window.location.href = "../../sessions/new.html";
		}else if(error.status == 403){
			//没有权限
			shortErrorToast("您没有权限访问！");
		}else if(error.status == 404){
			//资源不存在
			shortErrorToast("您访问的资源不存在！");
		}else if(error.status == 500){
			//服务器错误
			shortErrorToast("服务器错误，请稍后再试！");
		}else if(error.readyState == 0){
			//请求没有发生出去就错误了，一般是本地没有网络，或者无法连接到服务器
			shortErrorToast("无法连接到服务器，请稍后再试！");
		}else{
			shortErrorToast("发生未知错误，请稍后再试！");
		}
	}else{
		//处理服务端错误
		shortErrorToast(data.message ? data.message : "服务端发生未知错误，请稍后再试！");
	}
}