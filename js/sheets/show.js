/**
 * 删除歌单按钮点击
 */
function onDeleteClick(){
	//弹出确认 提示框
	swal({
		title:"是否确认删除歌单？",
		icon:"warning",
		buttons:true,
		dangerMode:true
	}).then(function(willDelete){
		if(willDelete){
			//确认删除，则提交表单
			$("#delete-form").submit();
		}
	});
}