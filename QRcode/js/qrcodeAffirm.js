var obj={};
$(function(){
	find();
	writeIn();
	clickView();
});

//查找邀请码
function eacheCode(data){
	for(var i=0;i<data.length;i++){
		if(obj.name==data[i].name){
			obj.InviteCode=data[i].code;
			return true;
		}
	}
	return false;	
}

//写入内容
function writeIn(){
	console.log("进入写入");
	if(eacheCode(DATA)){
		$("#InviteCode").val(obj.InviteCode);
	}else{
		$("#InviteCode").addClass("error");
		$("#InviteCode").val("");
		$("#InviteCode").attr("placeholder","未找到您的邀请码");
		closeButton();
	}
	$("#name").val(obj.name);
	$("#tel").val(obj.tel);
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
//客户信息写入方法
   function save(){
        localStorage.setItem("InviteCode",$("#InviteCode").val());
   } 
   
//获取web storage 数据
   	function find(){
        var storage = window.localStorage;
        for(var i=0; i < storage.length; i++){
            var key = storage.key(i);
            var value = storage.getItem(key);
            obj[key]=value;
        }
        console.log(obj);
    }