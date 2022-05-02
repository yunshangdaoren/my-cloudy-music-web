/**
 * 设置背景图片加载成功后，回调
 * 目的是实现背景高斯模糊
 */
window.onload = function(){
	//获取当前正在轮播的图片
	var src = $(".carousel-inner .active img").attr("src");
	//将轮播图背景设置为当前正在轮播的图片
	$(".img-background").attr("src", src);
	
	StackBlur.image('img-background', 'canvas-mask', 100, false);
};

/**
 * 监听轮播滚动
 */
$('#banner').on('slide.bs.carousel', function(event) {
	var hoder = $('#banner').find('.carousel-item');
	var	items = $(event.relatedTarget);
	
	//getIndex就是轮播到当前位置的索引
	var index = hoder.index(items);
	if(index == 0){
		$(".img-background").attr("src", "./assets/download/6.jpg");
	}else if(index == 1){
		$(".img-background").attr("src", "./assets/download/5.jpg");
	}else{
		$(".img-background").attr("src", "./assets/download/7.jpg");
	}
	StackBlur.image('img-background', 'canvas-mask', 100, false);
	
})
