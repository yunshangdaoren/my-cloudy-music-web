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
		code: {
			alidators: {
				notEmpty: {
					message: "验证码不能为空！"
				},
				stringLength: {
					min: 4,
					max: 4,
					message: "验证码长度必须为4个字符！"
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
