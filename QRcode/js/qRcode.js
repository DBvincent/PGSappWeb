$(function(){
	inputView();
	clickView();
});
//客户信息写入方法
   function save(){
        localStorage.setItem("tel",$(".tel").val());
        localStorage.setItem("name",$(".name").val());
   } 
   //click操作
function clickView(){
	//按钮提交
	$("button").click(function(){
		save();
		if(verify()){
			judgeButton(this);
		}else{
			verifyInviteCode($(".InviteCode"));
			verifyName($(".name"));
			verifyTelphone($(".tel"));
		}
		
	});
}