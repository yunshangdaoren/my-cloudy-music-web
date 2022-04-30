$(function() {
	//表单验证
	$("#form").formValidation({
		fields: {
			phone: {
				validators: {
					notEmpty: {
						message: "请输入手机号！"
					},
					phone: {
						message: '手机号格式不正确！',
						country: "CN"
					}
				}
			},
			code: {
				validators: {
					notEmpty: {
						message: '请输入验证码！'
					},
					stringLength: {
						min: 4,
						max: 4,
						message: "验证码长度必须为4个字符！"
					}
				}
			}
		}
	});
});


//找到短信发送验证码按钮
let buttonSendSMSCode = $("#button-send-sms-code");

/**
 * 发送短信验证码按钮点击了
 */
function onSendSMSCodeClick(){
	//获取手机号
	let phone = $("#phone").val();
	//判断手机号
	if(!phone || phone==''){
		//alert("请输入手机号！");
		
		//使用sweetalert提示框框架
		swal("请输入手机号！",{
			icon:"warning",
			buttons:false,
			timer:1000
		});
		return;
	}
	
	//TODO 判断手机号格式
	
	//发送短信验证码
	sendSMSCode(phone);
}

/**
 * 发送短信验证码
 * @param {Object} data 手机号
 */
function sendSMSCode(data){
	//TODO 发送验证码
	//创建表单对象
	var formData = new FormData();
	
	//添加一个字段
	//name, value
	formData.append("phone", data);
	
	//提交表单
	$.ajax({
		url:'http://rap2api.taobao.org/app/mock/301937/codes/sms.json?phone=15310443790',
		type:'POST',
		data:formData,
		processData:false,//jQuery不要处理data
		contentType:false,//jQuery不要自动设置内容类型
		success:function(data){
			//成功回调，判断是否成功
			if(isSuccess(data)){
				//发送成功
			
				//开始倒计时
				startCountDown();
			}else{
				//TODO 处理错误
			}
			
		}
	});
	
}

/**
 * 请求是否成功
 * @param {Object} data
 */
function isSuccess(data){
	return data.status == 0;
}

/**
 * 开始倒计时
 */
function startCountDown(){
	//倒计时
	var time = 5;
	
	//开启一个定时器
	var timer = setInterval(function(){
		if(time == 0){
			//倒计时完成了
			
			//清楚定时器
			clearInterval(timer);
			
			//启用短信发送验证码按钮
			enableSendSMSCodeButton();
		}else{
			//正在倒计时
			
			//显示倒计时时间
			buttonSendSMSCode.text(time+"秒");
			//时间--
			time--;
		}
	}, 1000);
	
	//禁用短信发送验证码按钮
	buttonSendSMSCode.attr("disabled", true);
}

/**
 * 启用短信发送验证码按钮
 */
function enableSendSMSCodeButton(){
	buttonSendSMSCode.attr("disabled", false);
	buttonSendSMSCode.text("发送验证码");
}