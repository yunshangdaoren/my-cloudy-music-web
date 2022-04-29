$(function() {
	//初始化表单验证
	$("#form").formValidation({
		fields: {
			username: {
				validators: {
					notEmpty: {
						message: '用户名不能为空'
					}
				}
			},
			password: {
				validators: {
					notEmpty: {
						message: '密码不能为空'
					},
					stringLength: {
						min: 6,
						max: 15,
						message: '密码长度必须为6~15位'
					}
				}
			},
		}
	});

});
