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
 */
function sendSMSCode(data){
	//TODO 发送验证码
	
	//开始倒计时
	startCountDown();
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