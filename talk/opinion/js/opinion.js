/**
 * Created by ex-dongbo on 2017/3/29.
 */
var Bridge;
var callData={"id":"01"};
var Bearer="Bearer ";
//var Headers={"Authorization":"Bearer UEBkak52M3ZUM1M0UDB6UWFjNWw5OTU5"};
var headers={
    "contentType" : "application/json"
};
var ID;
var reponseGenr,reponseLevel;
var genre=[],occupation=[],level=[];
var backstage;
var hostName = window.location.host;
var currentNamespace =  hashMap.get(hostName);
var recommendId={};
window.onerror = function(err) {
    console.log('window.onerror: '+ err);
};
if(/(Android)/i.test(navigator.userAgent)){
    document.addEventListener('WebViewJavascriptBridgeReady', onBridgeReady, false);
    function onBridgeReady(event) {
        Bridge = event.bridge;
        Bridge.init(function (message, responseCallback) {
            console.log('JS got a message', message);
            var data = {'Javascript Responds': 'Wee!'};
            console.log('JS responding with', data);
            responseCallback(data);
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
function backAjax(URL,DATA,headers){
    $.ajax({
		raw:true,
		contentType:'application/json',
		dataType:"JSON",
        type:"POST",
        url:URL,
        headers:headers,
        data:JSON.stringify(DATA),
        success:function(data){
        	Bridge.callHandler("showToast","槽点已提交，谢谢您的反馈！");
        	$(".suggest .content .suggestCon").html("");
        }
    });
}