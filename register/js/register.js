/**Created by ex-dongbo on 2017/4/10*/
var download="http://a.app.qq.com/o/simple.jsp?pkgname=com.dashuf.disp.v2";
var registerData={"cv":"10"};
var headers={"content-type":"application/json"};
var check="false";
var obj={};
$(function(){
	//获取存储数据
	find();
	//判断是不是第一次进入
	isFrist(obj);
    //获取数据
    getAjax("POST","../../guest/dictionary/businessCities",headers," ",getBusinessCityData);
    //input 处理
    inputView();
    //click处理
    clickView();
});
//input 处理
function inputView(){	
    //tel选择
    $("#tel").focus(function(){
        openButton();
        if($(this).attr("placeholder") == "手机号不能为空"||$(this).attr("placeholder") == "手机号输入有误") {
            $(this).removeClass("error");
            $(this).attr("placeholder","请输入手机号码");
            $(this).val("");
        }
        $(this).attr("type", "tel");
        $(this).css("color", "#666666");
    });
    $("#pass").focus(function(){
        openButton();
        if($(this).attr("placeholder") == "您输入的密码格式有误"||$(this).attr("placeholder") == "密码不能为空") {
            $(this).removeClass("error");
            $(this).attr("placeholder","字母+数字组合，大于等于8位");
            $(this).val("");
        }
        $(this).css("color", "#666666");
    });
    //验证码
    $("#verification").focus(function(){
        openButton();
        if($(this).attr("placeholder") == "错误") {
            $(this).removeClass("error");
            $(this).attr("placeholder","错误,请重新获取");
            $(this).val("");
        }
        $(this).css("color", "#666666");
    });
    //获取input checked 情况
    $("#choose").focus(function(){
        openButton();
        console.log(1);
        if(check=="true"){
        	 check="false";
        }else{
            check="true";
        }
    });
    
    //手机号验证
    $("#tel").blur(function(){
        verifyTelphone(this)
    });
    //密码验证
    $("#pass").blur(function(){
        checkPass(this);
    });
    //验证码验证
    $("#verification").blur(function(){
        verifyNumber(this);
    });
}
//click处理
function clickView(){
    //获取验证码
    $("#news").click(function(){
        getAjax("POST","../../guest/register/passcode",headers,JSON.stringify({"cellphone":$("#tel").val(),"CV":"10"}),getVerificationCode);
    });

    //按钮提交
    $("#btn").click(function(){
        console.log("进入提交");
        if($("#choose").is(':checked')){
        	if(verify()){
         		//获取数据
            	getData();
            	toAjax("POST","../../guest/register/new",headers,registerData,submitRequest);	
        	}	
        }else{
        	$("#layer p").html("请阅读点击用户协议");
    		$("#layer").fadeIn();
    		$("#layer").fadeOut(2000);
        }
    });
	
	//A链接跳转页面
	$("#user").click(function(e){
		e.preventDefault();
		save();
		self.location="https://disp-dashboard.banketech.com/static/files/agreement.html";
	});
	
    //常驻城市验证
    $("#city").click(function(){
        $(this).css("color","#666666");
        openButton();
    });

    //选择城市后页面处理
    $("#city").click(function(){
        $(".footer").hide();
    });

}
//数据处理方法
function getData(){
    registerData.cellphone=$("#tel").val();
    registerData.password=$("#pass").val();
    registerData.businessCityCode=$("#city").attr("data-code");
    registerData.passcode=$("#verification").val();
    registerData.registerCode=GetQueryString("requestId");
}

//选择的同行公司插件调用
function popPeer(data){
    var area = new LArea();
    area.init({
        'trigger': '#city', //触发选择控件的文本框，同时选择完毕后name属性输出到该位置
        'keys': {
            id: 'code',
            name: 'name'
        }, //绑定数据源相关字段 id对应valueTo的value属性输出 name对应trigger的value属性输出
        'type': 1, //数据源类型
        'data': data, //数据源
        'idx': 1
    });
    // area1.value=[0,0,0];//控制初始位置，注意：该方法并不会影响到input的value
    area.className = ['area_company']; // 设置class值
}

//字母+数字组合，大于等于8位的密码验证
function checkPass(ele){
    var pass=$(ele).val();
    if(!(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,}$/.test(pass))){
        $(ele).addClass("error");
        $(ele).val("");
        closeButton();
        $(ele).attr("placeholder","您输入的密码格式有误");
    }else if(pass==""){
        $(ele).addClass("error");
        $(ele).val("");
        $(ele).attr("placeholder","密码不能为空");
        closeButton();
    }else{
        $(ele).val(pass);
    }
}
// 手机号验证
function verifyTelphone(ele) {
    var telphone = $(ele).val();
    if(telphone == "") {
        $(ele).addClass("error");
        $(ele).val("");
        $(ele).attr("placeholder","手机号不能为空");
        closeButton();
    } else if(!(/^1[34578]\d{9}$/.test(telphone))) {
        $(ele).addClass("error");
        $(ele).val("");
        $(ele).attr("placeholder","手机号输入有误");
        closeButton();
    } else {
        $(ele).val(telphone);
    }
}
//验证验证码
function verifyNumber(ele){
    var verify=$(ele).val();
    if(verify==""){
        $(ele).addClass("error");
        $(ele).val("");
        $(ele).attr("placeholder","验证码错误");
        closeButton();
    }else{
        $(ele).val(verify)
    }
}
//常驻城市验证
function verifyCity(ele){
    var city=$(ele).html();
    if(city=="请选择"){
        $(ele).html("业务城市不能为空");
        $(ele).css("color","#ef6762");
        closeButton();
    }else{
        $(ele).html(city);
        $(ele).css("color","#666666");
    }
}
//删除数值中某个特定元素
function removeByValue(arr, val) {
  for(var i=0; i<arr.length; i++) {
    if(arr[i].name== val) {
      arr.splice(i, 1);
      break;
    }
  }
}
//提交验证
function verify(){
    if($("#tel").val() == ""|| $("#pass").val() == ""||$("#verification").val()==""||$("#city").html()=="常驻城市不能为空"){
            verifyTelphone($("#tel"));
            checkPass($("#pass"));
            verifyNumber($("#verification"));
            verifyCity($("#city"));
            closeButton();
            return false;
    }else{
        console.log("填写成功");
         openButton();
          return true;
    }
}
//按钮锁定
function closeButton(){
    $("#btn").attr("disabled","disabled");
    $("#btn").css("background","#d3d3d3");
}
//解锁按钮
function openButton(){
    $("#btn").removeAttr("disabled");
    $("#btn").css("background","#fec43f");
}

//后台报错验证码错误提醒
function errorTip(data,text,timeIn,timeOut){
	closeButton();
    $("#layer p").html(text);
    $("#layer").fadeIn(timeIn);
    $("#layer").fadeOut(timeOut,function(){
    	$("#verification").val("");
    	openButton();
    });
}
//注册成功跳转提醒
function successTip(text){
    $("#layer p").html(text);
    $("#layer").fadeIn();
    $("#layer").fadeOut(1000,function(){
    	localStorage.clear();
    	self.location=download;
    });
}
//常驻城市数据获取函数
function getBusinessCityData(data){
    if(data.succeed){
    	removeByValue(data.data,"客户挖掘中心");
        $.map(data.data,function(v){
        	v.name=v.name.split("分公司")[0];
        });
        //选择的同行公司插件调用
    	popPeer(data.data);
    }else{
        errorTip(data,"服务器开小差，请稍后再试",1000,2000);
    }
}

//短信验证码函数
function getVerificationCode(data){
    if(data.succeed) {
    	$("#news").attr("disabled","disabled");
    	$("#layer p").html("验证码已奔向您的手机，请等待");
    	$("#layer").fadeIn();
    	$("#layer").fadeOut(2000,function(){
    		$("#news").removeAttr("disabled");
    	});
        registerData.requestId=data.data;
    }else{
        errorTip(data,data.message,1000,2000);
    }
}

//提交请求处理函数
function submitRequest(data){
	if(data.succeed) {
        successTip("注册成功，正在跳转下载页面");
   }else{
    	errorTip(data,data.message,1000,2000);
    }
}
//后台ajax获取方法
function getAjax(type,URL,headers,DATA,responseFun){
     $.ajax({
        type:type,
        url:URL,
        headers:headers,
        data:DATA,
        success:function(data){
             responseFun(data);
        },
        error:function(error){
            errorTip(error,"服务器开小差，请稍后再试",1000,300000);
        }
    });
}
//后台ajax方法
function toAjax(type,URL,headers,DATA,responseFun){
    $.ajax({
        type:type,
        url:URL,
        headers:headers,
        data:JSON.stringify(DATA),
        success:function(data){
			responseFun(data);
        },
        error:function(error){
            errorTip(error,"服务器开小差，请稍后再试",1000,300000);
        }
    });
}
// 获取产品邀请码
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
    var r = window.location.search.substr(1).match(reg);
    if (r!=null) return (r[2]); return null;
}
//保存
function save(){
	localStorage.setItem("isFrist","1");
	localStorage.setItem("tel",$("#tel").val());
	localStorage.setItem("pass",$("#pass").val());
	localStorage.setItem("dataCode",$("#city").attr("data-code"));
	localStorage.setItem("city",$("#city").html());
	localStorage.setItem("passcode",$("#verification").val());
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
   
    //判断是不是第一次进入
    function isFrist(obj){
    	if(obj.isFrist=="1"){
    		if(obj.tel){
    			$("#tel").val(obj.tel);
    		}
    		if(obj.pass){
    			$("#pass").val(obj.pass);
    		}
    		if(obj.dataCode){
    			$("#city").attr("data-code",obj.dataCode)
    		}
    		if(obj.city!="请选择"){
    			$("#city").html(obj.city);
    		}
    		if(obj.passcode){
    			$("#verification").val(obj.passcode)
    		}
    		localStorage.clear();
    	}else{
    		return;
    	}
    }
