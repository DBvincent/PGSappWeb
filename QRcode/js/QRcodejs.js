
//input操作
function inputView(){
	
	//input验证
	$("input").blur(function(){
		verifyInput(this);
	});
	
	//input获取焦点
	$("input").focus(function(){
		openButton();
		$(this).removeClass("error");
		$(this).attr("placeholder","必填");
	});
}

//input验证函数
function verifyInput(ele){
	var val=$(ele).attr("data-validation");
	if(val=="verifyInviteCode"){
		verifyInviteCode(ele);
	}else if(val=="verifyName"){
		verifyName(ele);
	}else if(val=="verifyTelphone"){
		verifyTelphone(ele);
	}
}
//总体验证
 function verify(){
 	if($(".InviteCode").val()==""||$(".name").val()==""||$(".tel").val()=="姓名输入有误"||$(".tel").val()==""||$(".tel").val()=="手机号输入有误"){
 		closeButton();
 		return false;
 	}else{
 		openButton();
 		return true;
 	}
 }
//按钮判断
function judgeButton(ele){
	var html=$(ele).html();
	if(html=="点击确认获取邀请码"){
		self.location="qrcodeAffirm.html";		
	}else if(html=="确认生成二维码"){
		self.location="generateQrcode.html";
	}else if(html=="返回"){
		self.location="qRcode.html";
	}
}
  