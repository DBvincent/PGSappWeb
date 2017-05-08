/**
 * Created by ex-dongbo on 2017/3/20.
 */
var headers;
var Bridge;
var transfersID;
var obj={};
var Bearer="Bearer ";


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
    });
}else{
    console.log(3);
    console.log("PC");
}

// 获取产品ID
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
    var r = window.location.search.substr(1).match(reg);
    if (r!=null) return (r[2]); return null;
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



