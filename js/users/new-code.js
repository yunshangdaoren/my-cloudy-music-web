//腾讯滑动验证码回调
//官方文档：https://cloud.tencent.com/document/product/1110/36841
window.tencentCaptchaCallback=function(res){
	console.info("tencentCaptchaCallback",res);
	
	// res（用户主动关闭验证码）= {ret: 2, ticket: null}
	// res（验证成功） = {ret: 0, ticket: "String", randstr: "String"}
	if (res.ret==0) {
		//验证成功
		
		//保存数据
		$("#ticket").val(res.ticket);
		$("#randstr").val(res.randstr);
		
		//提交表单
		$("#form").submit();
	} else{
		//验证失败，清除内容
		$("#ticket").val("");
		$("#randstr").val("");
	}
}

//Validation的表单验证
$("#form").formValidation({
	fields: {
		nickname: {
			validators: {
				notEmpty: {
					message: "请输入昵称！"
				},
				stringLength: {
					min: 2,
					max: 15,
					message: "昵称必须在2~15个字符之间！"
				}
			}
		},
		phone: {
			validators: {
				notEmpty: {
					message: "请输入手机号！"
				},
				phone: {
					message: "手机号格式不正确！",
					country: "CN"
				}
			}
		},
		email: {
			validators: {
				notEmpty: {
					message: "请输入邮箱地址！"

				},
				regexp: {
					regexp: /^^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
					message: "邮箱格式不正确！"
				}
			}
		},
		password: {
			validators: {
				notEmpty: {
					message: "密码不能为空！"
				},
				stringLength: {
					min: 6,
					max: 15,
					message: "密码长度必须为6~15位！"
				}
			}
		},
		confirmPassword: {
			validators: {
				notEmpty: {
					message: '确认密码不能为空！'
				},
				identical: {
					field: 'password',
					message: '确认密码和密码不一致！'
				}
			}
		},
		accept: {
			validators: {
				notEmpty: {
					message: "，必须同意用户协议，才能注册！"
				}
			}
		}

	}
});

// //监听所有input输入框输入事件
// $(".form-content input").bind("input propertychange", function(){
// 	//处理提交表单按钮状态
// 	computerButtonStatus();
// });

// /**
//  * 处理提交表单按钮状态
//  */
// function computerButtonStatus(){
// 	//定义disable
// 	var disable = false;
	
// 	//遍历所有input输入框
// 	$(".form-content input").each(function(){
// 		//获取input输入框的值
// 		let data = $(this).val();
		
// 		if(!data){
// 			//如果值为空
// 			disable = true;
			
// 			//终止循环
// 			return false;
// 		}
// 	});
	
// 	//设置注册按钮状态
// 	$("#TencentCaptcha").attr("disabled", disable);
// }


