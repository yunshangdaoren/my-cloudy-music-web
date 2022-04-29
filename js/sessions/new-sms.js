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