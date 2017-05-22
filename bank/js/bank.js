var bankData={};
$(function(){
	
	inputView();
	clickView();
	
});

//input 操作
function inputView(){
	$("input").focus(function(){
		openButton();
		if($(this).attr("placeholder")){
			$(this).removeClass("error");
        	$(this).attr("placeholder","必填");
        	$(this).val("");
		}else{
			$(this).css("color", "#666666");	
		}
	});
	
	$("input").blur(function(){
		if($(this).attr("data-verify")){
			switch($(this).attr("data-verify")){
				case "verifyName":
					   verifyName($(this));
					   break;
				case "verifyIdCode":
					   verifyIdCode($(this));
					   break;
				case "verifyTelphone":
					   verifyTelphone($(this));
					   break;
				case "verifyBankNumber":
					   verifyBankNumber($(this));
					   break;
				case "verifyInviteCode":
					  verifyInviteCode($(this));
					  break;
			}
		}
	});
}
//click 操作
function clickView(){
	//点击获取验证码
	$("#verificationCode").click(function(){
		//后台条用ajax
	});
	
	//下一步提交
	$("#sure button").click(function(){
		if(verifyData()){
			console.log(1);
			getData();
			//后台传输ajax
			self.location="../signature/signatureAgreement.html";
		}else{
			verifyName($("#name"));
			verifyIdCode($("#idCode"));
			verifyTelphone($("#tel"));
			verifyBankNumber($("#bankCode"));
			verifyInviteCode($("#verifyCode"));
		}
	});
}

//获取数据
function getData(){
	bankData.name=$("#name").val();
	bankData.idCode=$("#idCode").val();
	bankData.telephone=$("#tel").val();
	bankData.bankCode=$("#bankCode").val();
	bankData.verifyCode=$("#verifyCode").val();
	console.log(bankData);
}

//验证通过函数
function verifyData(){
	if($("#name").val()!=""&$("#tel").val()!=""&$("idCode").val()!=""&$("#bankCode").val()!=""&$("#verifyCode").val()!=""){
		return true;
	}else{
		return false;
	}
}
