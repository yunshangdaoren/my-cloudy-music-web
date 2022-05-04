/**
 * 自定义JS
 * 用于输入框字数统计和限制
 * source：统计要输入内容字数的输入框
 * count：要显示统计字数结果的标签
 * max：限制输入的的最大字数
 * 传入的option案例：
 * 		inputLimit({
 *			source:$("#comment-content"),
 *			count:$("#comment-content-count"),
 *			max:140
 *		});
 * 
 */
function inputLimit(option){
	//监听输入框输入内容
	option.source.on("input propertychange", function(){
		//输入的内容对象
		let data = $(this).val();
		//获取字数
		let length = data.length;
		
		if(length > option.max){
			//输入内容字数大于限制输入的的最大字数，
			//截取只保留0-max字数的内容
			data = data.substr(0, option.max);
			
			//设置新的内容到输入框
			$(this).val(data);
			
			//length超出max后，设置为max
			length = option.max;
		}
		
		//字数显示到要统计结果的标签上
		option.count.text(length);
	});
}