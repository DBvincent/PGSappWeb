/** Created by ex-dongbo on 2017/3/20.*/

var insurance;
	var InsuranceData=[];
	var obj={};
    //var RecommendationDetail={};
    //返回数据保存
    var toBackData={};
    toBackData.insuranceRequestItems=[];
    var SaveCompany=[];

    var postUrl ='../../v1/dictionary/insuranceCompanies';
    
$(function(){
	//获取Id
    transfersID=GetQueryString("id");

    //获取数据
    find();
       
    //获取headers
    var headers={"content-type" : "application/json"};
    headers.Authorization=obj.token;
    console.log(headers);
        	
    //客户消息写入
    Write(obj);

    //判断是否第一次进入
    backPage(obj);
        	
	//获取后台数据
    backAjax(postUrl,transfersID,headers);  
        	
	
	
});

function clickView(){
	//保险列表加入
    $("#supplement ul li").click(function(){
        var DIV='<div>'+
				'<div class="close">'+
            		'<p>保单</p>'+
            		'<button type="button">X</button>'+
        		'</div>'+
        		'<ul>'+
	        		'<li class="line">'+
		         		'<p>保险公司</p>'+
		                '<div>'+
		                	'<span class="insurance">请选择</span>'+
		                    '<i></i>'+
		                '</div>'+
	            	'</li>'+
	            	'<li>'+
	                	'<p class="left">年缴保费</p>'+
	                	'<div>'+
		            		'<input class="premium" type="number">'+
		            		'<i>元</i>'+
	                	'</div>'+
	            	'</li>'+
        		'</ul>'+
				'</div>';
        $("#guarantee").append(DIV);
    });


    //保险公司选择
            guarantee.addEventListener("click",function(e){
                e.stopPropagation();
                var target= e.target;
                if(target.nodeName=="SPAN"){
                    console.log(target.previousElementSibling.innerHTML);
                	if(target.previousElementSibling.innerHTML=="保险公司"){
                		target.style.backgroundColor="#dddddd";
                        var timer=setTimeout(function(){
                            target.style.backgroundColor="#ffffff";
                        },200);
                        console.log(InsuranceData);
                        openButton();
                        NativeCall(target,Bridge,"selectInsurance",InsuranceData);	
                	}
                }
                if(target.nodeName=="BUTTON"){
                    $(target).parent("div").parent("div").remove();
                }
            });
          	
            //确认跳转
            $("#sure button").click(function(){
                 if($(this).html()=="确认"){
                     acquireInsurance();
                     save();
                     console.log(toBackData);
                     if( $("#sure button").attr("disabled")!="disabled"){
                         toAjax(toBackData,headers);
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


    //向后台提交所有数据ajax方法
    function toAjax(data,headers){
        $.ajax({
            type: 'POST',
            headers:headers,
            url:"../../v1/recommends/"+transfersID+"/insurance",
            data:JSON.stringify(data),
            contentType: 'application/json',
            beforeSend:function(){
                NativeCall(this,Bridge,"showProgressHUD","正在提交");
            },
            success:function(data){
            	if(data.succeed){
                    NativeCall(this,Bridge,"hideProgressHUD","");
            		self.location="supplementary.html?id="+transfersID+"";
            	}
            },
            error:function(error){
                nativeCall(this,Bridge,"hideProgressHUD","");
                nativeCall(this,Bridge,"showToast","服务器开小差了，稍后再试吧");
            }
        });
    }

    //保单信息获取方法
    function acquireInsurance(){
        toBackData.insuranceRequestItems=[];
        console.log(SaveCompany);
        $("#guarantee>div").each(function (i, v) {
            console.log(i);
                var obj = {};
                $(v).children("ul").children("li").children("div").each(function (i, v) {
                    if ($(v).children("p").text() == "保险公司") {
                        if($(v).children("span").text()=="请选择"){
                                $(v).children("span").html("保险公司不能为空"+"<i></i>");
                                $(v).children("span").css("color","#ef6762");
                                closeButton();
                        }else{
                            obj.insuranceCompany = checkCompany($(v).children("span").text());
                        }
                    }
                    if ($(v).children("p").text() == "年缴保费") {
                        if($(v).children("div").children("input").val()==""||$(v).children("div").children("input").val()=="金额不能为空"||$(v).children("div").children("input").val()=="金额只能为整数"){
                            $(v).children("div").children("input").attr("type","text");
                            $(v).children("div").children("input").val("金额不能为空");
                            $(v).children("div").children("input").css("color","#ef6762");
                            closeButton();
                        }else{
                            obj.amount = $(v).children("div").children("input").val();
                        }
                    }
                });
                toBackData.insuranceRequestItems.push(obj);
        });
    }

    //获取web storage 数据
    function find(){
        var storage = window.localStorage;
        for (var i=0, len = storage.length; i  <  len; i++){
            var key = storage.key(i);
            var value = storage.getItem(key);
            obj[key]=value;
        }
    }

    //客户信息写入方法
    function Write(data){
        $("#information ul li .money").html(obj.money);
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
            $(ele).html(data.name+"<i></i>");
            $(ele).css("color","#666666");
            if($(ele).siblings("p").html()=="保险公司"){
                var SaveInsData={};
            	SaveInsData.name=data.name;
            	SaveInsData.code=data.code;
                SaveInsData.id=data.id;
                SaveInsData.sortNO=data.sortNO;
                SaveCompany.push(SaveInsData);
          }
        }
    }

    // 获取产品ID
    function GetQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
        var r = window.location.search.substr(1).match(reg);
        if (r!=null) return (r[2]); return null;
    }
    
    //保险个数信息保存方法
    function save(){
    	var IN="";
        $("#guarantee>div").each(function(i,v){
        	IN=i;
       })
       localStorage.setItem("insurance",IN);
        $("#guarantee>div").children("ul").each(function(b,v){
        	$(v).children("li").children("div").children("p").each(function(){
        		if($(this).text()=="保险公司"){
                	console.log("Insurance"+b);
                	localStorage.setItem("Insurance"+b,$(this).siblings("span").text());
                    console.log("添加了"+b+"个存储");
                    localStorage.setItem("InsuranceCompany"+b,JSON.stringify(checkCompany($(this).siblings("span").text())));
                }
                if($(this).text()=="年缴保费"){
                	console.log("InsuranceMoney"+b);
                	localStorage.setItem("InsuranceMoney"+b,$(this).siblings("div").children("input").val());
                }
        	});
        });
    }

    function backPage(obj){
        if(obj.insurance){
            var DIV="";
            $("#guarantee").empty();
            for(var i=0;i<=obj.insurance;i++){
                var div='<div>'+
							'<div class="close">'+
            					'<p>保单</p>'+
            					'<button type="button">X</button>'+
        					'</div>'+
        					'<ul>'+
	            				'<li class="line">'+
		                			'<p>保险公司</p>'+
		                			'<div>'+
		                    			'<span class="insurance">请选择</span>'+
		                    			'<i></i>'+
		                			'</div>'+
	            				'</li>'+
	            				'<li>'+
	                				'<p class="left">年缴保费</p>'+
	                				'<div>'+
		                    			'<input class="premium" type="number">'+
		            					'<i>元</i>'+
	                				'</div>'+
	            				'</li>'+
        					'</ul>'+
						'</div>';
                DIV+=div;
            }
            $("#guarantee").append(DIV);
            for(var r=0;r<=obj.SaveCompany;r++){
                console.log("存储保存数据");
                if(obj["InsuranceCompany"+r]){
                    SaveCompany.push(JSON.parse(obj["InsuranceCompany"+r]));
                }
            }
        }else{
            $("#guarantee").empty();
            var Div='<div>'+
							'<div class="close">'+
            					'<p>保单</p>'+
            					'<button type="button">X</button>'+
        					'</div>'+
        					'<ul>'+
	            				'<li class="line">'+
		                			'<p>保险公司</p>'+
		                			'<div>'+
		                    			'<span class="insurance">请选择</span>'+
		                    			'<i></i>'+
		                			'</div>'+
	            				'</li>'+
	            				'<li>'+
	                				'<p class="left">年缴保费</p>'+
	                				'<div>'+
		                    			'<input class="premium" type="number">'+
		            					'<i>元</i>'+
	                				'</div>'+
	            				'</li>'+
        					'</ul>'+
						'</div>';
            $("#guarantee").append(Div);
        }
    }
    
    //后台ajax获取方法
    function backAjax(URL,DATA,headers){
        $.ajax({
            type:"GET",
            url:URL,
            headers:headers,
            data:DATA,
            success:function(data){
            	insuranceData(data)
            }
        });
    }
    
  //保险数据处理
    function insuranceData(data){
        if(data.succeed){
            for(var i=0;i<data.data.length;i++){
                var obj={};
                obj.name=data.data[i].name;
                obj.code=data.data[i].code;
                obj.id=data.data[i].id;
                obj.sortNO=data.data[i].sortNO;
                InsuranceData.push(obj);
            }
        }
        console.log(InsuranceData);
    }
   
    //保险公司处理函数
    function checkCompany(name){
        localStorage.setItem("SaveCompany",SaveCompany.length);
        for(var i=0;i<SaveCompany.length;i++){
            if(name==SaveCompany[i].name){
                return SaveCompany[i];
            }
        }
    }

    //验证
    function keyUp(ele) {
        var v=$(ele).val();
        if(String(v).indexOf(".")>-1){
            $(ele).attr("type","text");
            $(ele).val("金额只能为整数");
            $(ele).css("color","#ef6762");
            closeButton();
        }else{
            $(ele).val(v);
        }
    }

    // 锁按钮函数
    function closeButton(){
        $("#sure button").attr("disabled","disabled");
        $("#sure button").css("background","#d3d3d3");
    }
    // 解锁按钮函数
    function openButton(){
        $("#sure button").removeAttr("disabled");
        $("#sure button").css("background","#fec43f");
    }
    
// 验证贷款金额是否符合要求
function verifyMoney(ele) {
    var v = $(ele).val();
    if(String(v).indexOf(".") > -1) {
        $(ele).addClass("error");
        $(ele).val("");
        $(ele).attr("placeholder","金额只能为整数");
        closeButton();
    } else if(v == "" || v == '金额不能为空') {
        $(ele).addClass("error");
        $(ele).val("");
        $(ele).attr("placeholder","金额不能为空");
        closeButton();
    } else if(v.substr(0, 1) == "0") {
        $(ele).addClass("error");
        $(ele).val("");
        $(ele).attr("placeholder","金额输入有误");
    } else if(parseInt(v) > 5000) {
        $(ele).addClass("error");
        $(ele).val("");
        $(ele).attr("placeholder","数值不超过5000万");
    } else {
        $(ele).val(v);
    }
}