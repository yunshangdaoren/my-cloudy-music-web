//封装JS网络请求处理工具类

/**
 * post请求
 * @param {String} url 请求地址
 * @param {Object} data 数据
 * @param {Function()} onSuccess 成功回调，可以不传递 
 * @param {Function()} onFailed  失败回调，可以不传递
 */
function httpPost(url, data, onSuccess=null, onFailed=null){
	//发送ajax请求
	ajax('post', url, data, onSuccess, onFailed);
}

/**
 * 发送ajax请求
 * @param {string} type 
 * @param {string} url 
 * @param {object} data 
 * @param {Function()} onSuccess 
 * @param {Function()} onFailed 
 */
function ajax(type, url, data, onSuccess=null, onFailed=null){
	
	$.ajax({
		url:url,
		type:type,
		data:data ? data : {}, //判断是否为空
		cache:false, //不缓存
		processData:false,//jQuery不要处理data
		contentType:false,//jQuery不要自动设置内容类型
		success:function(data){
			//判断是否成功
			if(isSuccess(data)){
				//请求正常
				onSuccess && onSuccess(data);
			}else{
				//请求出错了
				prepareHandleRequest(data, null, onFailed);
			}
		},
		error:function(error){
			prepareHandleRequest(null, data, onFailed);
		}
	});
}

/**
 * 预处理请求响应
 * @param {Object} data 
 * @param {*} error 
 * @param {Function()} onFalied 
 */
function prepareHandleRequest(data=null, error=null, onFalied=null){
	if(onFalied && onFalied(data, error)){
		//回调了请求失败方法，并且该方法返回了true
		
		//返回true表示外部手动处理错误，那么框架内部就不用做任何事情了
	}else{
		handleRequest(data, error);
	}
}

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