/**
 * Created by ex-dongbo on 2017/3/29.
 */
var Bridge;
var callData={"id":"01"};
var Bearer="Bearer ";
//var Headers={"Authorization":"Bearer UEBkZTFUWHhNMUdpeTNJcU5WOUJpa1hq"};
var headers={
    "content-type" : "application/json"
};
var ID;
var reponseGenr,reponseLevel;
var genre=[],occupation=[],level=[];
var backstage;
var hostName = window.location.host;
var currentNamespace =  hashMap.get(hostName);
var url = currentNamespace+"v1/dictionary/customerCategories";
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

        Bridge.registerHandler('testJavascriptHandler', function (data, responseCallback) {
            console.log('ObjC called testJavascriptHandler with', data);
            var responseData = {'Javascript Says': 'Right back atcha!'};
            console.log('JS responding with', responseData);
            responseCallback(responseData);
        });
        Bridge.callHandler("getUserToken",callData,function(response) {
            HEADER(response);
            ID=GetQueryString("id");
            recommendId.recommendId=ID;
            backAjax(url,recommendId,headers);
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
            ID=GetQueryString("id");
            recommendId.recommendId=ID;
            backAjax(url,recommendId,headers);
        });
    });
}else{
    console.log(3);
    console.log("PC");
}