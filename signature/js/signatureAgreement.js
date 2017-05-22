	
var obj={};
$(function(){
	find();
	isSignature(obj);
	clickView();
});

//点击下一步
function clickView(){
	$("#sure button").click(function(){
		localStorage.clear();
		if($("#signature p").get(0)){
			self.location="signature.html";
		}else{
//			self.location="";
		}
	});
}

//判断日否有前面
function isSignature(obj){
	if(obj.image){
		$("#signature").append('<img src='+obj.image+' alt="" hspace="0" vspace="0"/>');
	}else{
		$("#signature").append('<p>请签名</p>');
	}
}
//获取web storage 数据
function find(){
    var storage = window.localStorage;
    for (var i=0, len = storage.length; i  <  len; i++){
        var key = storage.key(i);
        var value = storage.getItem(key);
        obj[key]=value;
        console.log(key + "=" + value);
    }
        console.log(obj);
}
