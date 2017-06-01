/**Created by ex-dongbo on 2017/3/20.*/
var Bridge;
var callData={"id":"01"};
var Bearer="Bearer ";
var headers={

	 "content-type" : "application/json"
};
var transfersID;
var reponseGenr,reponseLevel;
var genre=[],occupation=[],level=[];
var backstage;
var url = "../../../v1/dictionary/customerCategories";
var SaveSubCategory="",SaveCategorySub="",Savecategory="";
var getID,getType;
var ispopup;
window.onerror = function(err) {
    console.log('window.onerror: '+ err);
};
if(/(Android)/i.test(navigator.userAgent)){
	$("#sure button").css("position","relative");
    document.addEventListener('WebViewJavascriptBridgeReady', onBridgeReady, false);
    function onBridgeReady(event) {
        Bridge = event.bridge;
        Bridge.init(function (message, responseCallback) {
            console.log('JS got a message', message);
            var data = {'Javascript Responds': 'Wee!'};
            console.log('JS responding with', data);
            responseCallback(data);
        });

        Bridge.registerHandler('testJavascriptHandler', function (data, responseCallback) {
            console.log('ObjC called testJavascriptHandler with', data);
            var responseData = {'Javascript Says': 'Right back atcha!'};
            console.log('JS responding with', responseData);
            responseCallback(responseData);
        });
        Bridge.callHandler("getUserToken",callData,function(response) {
            HEADER(response);
            transfersID=GetQueryString("id");
            backAjax(url,transfersID,headers);console.log(transfersID);
            getID=transfersID.split("_")[1];
            getType=transfersID.substr(0,1);
            //后台获取数据
            getAjax('../../v1/recommends/accreditRecommends',{"id":getID,"type":getType},{"Authorization":headers.Authorization});
        });
    }
}else if(/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)){
    function setupWebViewJavascriptBridge(callback) {

        if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
        if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
        window.WVJBCallbacks = [callback];
        var WVJBIframe = document.createElement('iframe');
        WVJBIframe.style.display = 'none';
        WVJBIframe.src = 'https://__bridge_loaded__';
        document.documentElement.appendChild(WVJBIframe);
        setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0)
    }

    setupWebViewJavascriptBridge(function(bridge) {
        Bridge=bridge;
        function log(message, data) {
            var log = document.getElementById('log');
            var el = document.createElement('div');
            el.className = 'logLine';
            el.innerHTML = uniqueId++ + '. ' + message + ':<br/>' + JSON.stringify(data);
            if (log.children.length) { log.insertBefore(el, log.children[0]) }
            else { log.appendChild(el) }
        }

        bridge.registerHandler('testJavascriptHandler', function(data, responseCallback) {
            console.log('ObjC called testJavascriptHandler with', data);
            var responseData = { 'Javascript Says':'Right back atcha!' };
            console.log('JS responding with', responseData);
            responseCallback(responseData);
        });

        document.body.appendChild(document.createElement('br'));

        bridge.callHandler('getUserToken',callData,function(response) {
            HEADER(response);
            transfersID=GetQueryString("id");
            console.log(transfersID);
            getID=transfersID.split("_")[1];
            getType=transfersID.substr(0,1);
            //后台获取数据
            getAjax('../../v1/recommends/accreditRecommends',{"id":getID,"type":getType},{"Authorization":headers.Authorization});
            backAjax(url,transfersID,headers);
        });
    });
}else{
    console.log(3);
    console.log("PC");
}

//window.onload=function(){
//	localStorage.setItem("token",headers.Authorization);
//  $("#other span").click(function(){
//      $("#sure button").removeAttr("disabled");
//      $("#submitSure .BTN  button").removeAttr("disabled");
//      switch($(this).siblings("p").html()){
//          case "客户类型":
//              openButton();
//              NativeCall(this,Bridge,"selectGenre",genre);
//              break;
//          case "职业":
//              openButton();
//              if(obj.supplementary){
//                  if(obj.supplementary=="1"){
//                      pushOccupation($(this),$(".genre").text(),backstage);
//                  }
//              }
//          	console.log(backstage);
//              NativeCall(this,Bridge,"selectOccupation",occupation);
//              break;
//          case "级别":
//              openButton();
//              if(obj.supplementary){
//                  if(obj.supplementary=="1"){
//                      pushOccupation($(this),$(".occupation").text(),backstage);
//                  }
//              }
//              NativeCall(this,Bridge,"selectLevel",level);
//              break;
//      }
//  });
//
//};

//获取数据处理函数
function HEADER(response){
    response=JSON.parse(response);
    if(response.result=="01") {
        headers.Authorization = Bearer + response.token;
    }else {
        console.log("result:"+response.result);
    }
}
// 获取产品ID
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
    var r = window.location.search.substr(1).match(reg);
    if (r!=null) return (r[2]); return null;
}
//nactive异步交互
function NativeCall(ele, Bridge,funName,data){
    Bridge.callHandler(funName, data, function(response) {
        dispose(ele,response);
    });
}
//nactive相应接受操作函数
function dispose(ele,data){
    data=JSON.parse(data);
    if(data.result=="01") {
    	console.log(data.name);
        $(ele).html(data.name+"<i></i>");
        $(ele).css("color","#666666");
        if($(ele).siblings("p").text()=="客户类型"){
        	Savecategory=data.code;
            console.log(Savecategory);
        }
        if($(ele).siblings("p").text()=="职业"){
            SaveSubCategory=data.code;
            console.log(SaveSubCategory);
        }
        if($(ele).siblings("p").text()=="级别"){
            SaveCategorySub=data.code;
            console.log(SaveCategorySub);
        }
        pushOccupation($(ele),data.name,backstage);
    }
}
//后台ajax获取方法
function backAjax(URL,DATA,headers){
	localStorage.setItem("token",headers.Authorization);
    $.ajax({
        type:"GET",
        url:URL,
        headers:headers,
        data:DATA,
        success:function(data){
        	console.log(data);
        	pushGenre(data);
        },
        error:function(error){
            nativeCall(this,Bridge,"hideProgressHUD","");
            nativeCall(this,Bridge,"showToast","服务器开小差了，稍后再试吧");
        }
    });
}

//返给安卓、ios处理
function pushGenre(data){
	backstage=data;
	console.log(backstage);
    genre=[];
    if(data.succeed){
        for(var i=0;i<data.data.length;i++){
            var obj={};
            obj.name=data.data[i].name;
            obj.code=data.data[i].code;
            genre.push(obj);
        }
    }
}

function pushOccupation(ele,reponse,data){
    if(data.succeed){
        for(var i=0;i<data.data.length;i++){
            if(data.data[i].name==reponse){
                if(data.data[i].children){
                    if(reponseGenr!=reponse){
                        ele.parent("div").parent("li").next().children("div").children("span").html("请选择"+"<i></i>");
                        reponseGenr=reponse;
                    }
                    occupation=[];
                    ele.parent("div").parent("li").next().show();
                    for(var c=0;c<data.data[i].children.length;c++){
                        var obj={};
                        obj.name=data.data[i].children[c].name;
                        obj.code=data.data[i].children[c].code;
                        occupation.push(obj);
                    }
                    return;
                }else{
                    ele.parent("div").parent("li").next().hide();
                    ele.parent("div").parent("li").next().children("div").children("span").html("请选择"+"<i></i>");
                    ele.parent("div").parent("li").next().next().hide();
                    ele.parent("div").parent("li").next().next().children("div").children("span").html("请选择"+"<i></i>");
                }
            }
            if(data.data[i].children){
                for(var c=0;c<data.data[i].children.length;c++){
                    if(data.data[i].children[c].name==reponse){
                        if(data.data[i].children[c].children){
                            if(reponseLevel!=reponse){
                                ele.parent("div").parent("li").next().children("div").children("span").html("请选择"+"<i></i>");
                                reponseL=reponse;
                            }
                            level=[];
                            ele.parent("div").parent("li").next().show();
                            for(var l=0;l<data.data[i].children[c].children.length;l++){
                                var Obj={};
                                Obj.name=data.data[i].children[c].children[l].name;
                                Obj.code=data.data[i].children[c].children[l].code;
                                level.push(Obj);
                            }
                        }else{
                            ele.parent("div").parent("li").next().hide();
                            ele.parent("div").parent("li").next().children("div").children("span").html("请选择"+"<i></i>");
                        }
                    }
                }
            }
        }
    }
}
//后台ajax获取方法
function getAjax(URL,DATA,headers){
    $.ajax({
        type:"POST",
        url:URL,
        headers:headers,
        data:DATA,
        success:function(data){
            if(data.succeed){
                ispopup=data.data.data;
            }
        },
        error:function(error){
            nativeCall(this,Bridge,"hideProgressHUD","");
            nativeCall(this,Bridge,"showToast","服务器开小差了，稍后再试吧");
        }
    });
}

