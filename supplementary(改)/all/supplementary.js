/*** Created by ex-dongbo on 2017/3/20.*/
var Bridge;
var callData={"id":"01"};
var Bearer="Bearer ";
var headers={
	 "content-type" : "application/json"
};
var transfersID;
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
            getID=transfersID.split("_")[1];
            getType=transfersID.substr(0,1);
            //后台获取数据
            getAjax('../../v1/recommends/accreditRecommends',{"id":getID,"type":getType},{"Authorization":headers.Authorization});
        });
    });
}else{
    console.log(3);
    console.log("PC");
}

//获取数据处理函数
function HEADER(response){
    response=JSON.parse(response);
    if(response.result=="01") {
        headers.Authorization = Bearer + response.token;
    }else {
        console.log("result:"+response.result);
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
        }
    });
}
// 获取产品ID
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
    var r = window.location.search.substr(1).match(reg);
    if (r!=null) return (r[2]); return null;
}