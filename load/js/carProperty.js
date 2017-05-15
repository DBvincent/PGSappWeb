/** Created by ex-dongbo on 2017/3/20.**/
var callData={"id":"01"};
//var ispopup="Y";
var installStep=0;
var houseStep=0;
//总数据获取
var carDATA={},carImgData={code:"888",fileName:"车产贷款"};
carDATA.commendMore="";
var carImg="img/id.svg";
//按揭状态
var installmentState=[
    {
        "name":"按揭中",
        "code":"01"
    },
    {
        "name":"已还清",
        "code":"02"
    },
    {
        "name":"全款",
        "code":"03"
    }
];
//汽车产权
var carState=[
    {
        "name":"自有",
        "code":"01"
    },
    {
        "name":"共有",
        "code":"02"
    }
];


$(function(){
     //ispopup="Y";
    //获取ID
    transfersID = GetQueryString("id");
    inputView();
    clickView();
});

function clickView(){
    //是否有按揭
    $("#installment img").click(function () {
        if (installStep == 0) {
            $(this).attr('src', 'img/on.svg');
            $(".installment").show();
            installStep = 1;
        } else if (installStep == 1) {
            $(this).attr('src', 'img/off.svg');
            $(".installment").hide();
            installStep = 0;
        }
    });

    //是否有抵押
    $("#property img").click(function () {
        if (houseStep == 0) {
            $(this).attr('src', 'img/on.svg');
            $(".property").show();
            houseStep = 1;
        } else if (houseStep == 1) {
            $(this).attr('src', 'img/off.svg');
            $(".property").hide();
            houseStep = 0;
        }
    });

    //车牌号码
    chooseData("#carNumberTop",carNumberProvinceData,"","code","name",2,true,['area_province']);
    //按揭点击事件
    chooseData("#install",installmentState,"","code","name",1,false,['area_province']);
    //房屋产权
    chooseData("#carProperty",carState,"","code","name",1,false,['area_province']);
    $("#other span").click(function(){
        openButton();
        $(this).css("color","#666666");
    });

    //图片添加
    (function () {
        $("#datum .addIcon").click(function () {
            NativeCall(this, Bridge, "selectPhoto", "");
        });
    })();

    //点击图片预览
    $("#datum .datumImg .IMG img").click(function () {
        if($(this).attr("src")!="img/id.svg"){
            var imgdata = {imgBase64: carImg};
            NativeCall(this, Bridge, "previewPhoto", imgdata);
        }
    });

 	// 删除图片
    $("#close").click(function(){
        $(".addIcon").show();
        $(".datumImg .IMG img").attr("src","img/id.svg");
        $(this).hide();
    });
    
    //摊款选择
    popChose(carDATA);

    //点击弹出
    $("#sure button").click(function () {
        if(verifyData()) {
            Ispopup(ispopup,carDATA,$(".datumImg .IMG img"),carImgData,carImg);
        } else {
            verifyMoney($("#money"));
            verifyTelphone($("#tel"));
            verifyLicenseNumber($("#carNumber"));
            verifyChose($("#carNumberTop"));
            verifyChose($("#carProperty"));
            if($(".installment").css("display")!="none"){
                verifyChose($("#install"));
            }
        }
    });

    // 弹出框确认提交按钮
    $("#sumbit").click(function() {
        $("#content-submit").animate({ height: 0 }, 500,"swing");
        $("#layer").fadeOut(1000);
        handleAjax($(".datumImg .IMG img"),carDATA,carImgData,carImg);
    });
    
    //点击关闭 关闭弹框
    $("#box-close").click(function(){
    	 $("#content-submit").animate({ height: 0 }, 500,"swing");
         $("#layer").fadeOut(1000);
    });
	
}

function  inputView(){
    (function () {
        //贷款输入限制
        $("#money").blur(function () {
            verifyMoney(this);
        });

        //手机验证
        $("#tel").blur(function () {
            verifyTelphone(this);
        });

        //车牌号验证
        $("#carNumber").blur(function(){
            verifyLicenseNumber(this);
        });

        $("input").focus(function(){
            openButton();
            if($(this).attr("placeholder") == "金额不能为空" || $(this).attr("placeholder") == "数值不超过5000万" || $(this).attr("placeholder") == "金额输入有误"||$(this).attr("placeholder") == "金额只能为整数"||$(this).attr("placeholder") == "手机号不能为空"||$(this).attr("placeholder") == "手机号输入有误"||$(this).attr("placeholder") == "车牌号不能为空") {
                $(this).removeClass("error");
                $(this).attr("placeholder","必填");
                $(this).val("");
            }
            $(this).css("color", "#666666");
        });

    })();
}

//nactive异步交互
function NativeCall(ele, Bridge, funName, data) {
    if(Bridge){
        Bridge.callHandler(funName, data, function (response) {
            //console.log(1);
            dispose(ele, response);
        });
    }
}

//nactive相应接受操作函数
function dispose(ele, data) {
    data = JSON.parse(data);
    $(ele).css("color", "#666666");
    if (data.result == "01") {
        if (data.name) {
            $(ele).hide();
            carImg = data.name;
            var src = "data:image/png;base64,";
            src = src + data.name;
            $("#datum .datumImg .IMG img").attr("src", src);
            $("#close").show();
        }
    }
}


//总数据收集函数
function getDATA() {
    carDATA.money = $("#money").val();
    carDATA.telephone = $("#tel").val();
    carDATA.carNumber = $("#carNumberTop").html() + $("#carNumber").val();
    carDATA.carInstallment = $("#install").attr("data-code")||"";
    carDATA.carProperty = $("#carProperty").attr("data-code")||"";
    if (houseStep == 0) {
        carDATA.carLoan = "N";
    } else if (houseStep == 1) {
        carDATA.carLoan = "Y";
    }
    carDATA.notcategoryCode = 'N';
    //console.log(carDATA);
}

function TOAjax(URL,DATA,headers){
    //console.log("进入请求");
    $.ajax({
        type:"POST",
        url:URL,
        headers:{"Authorization":headers.Authorization},
        dataType:"json",
        data:DATA,
        beforeSend:function(){
            NativeCall(this,Bridge,"showProgressHUD","正在提交");
        },
        success:function(data){
            if(data.succeed){
                //console.log("成功");
                getDATA();
                $.ajax({
                    type:"POST",
                    url:'../../v1/recommends/'+transfersID+'/profile',
                    headers:headers,
                    dataType:"json",
                    data:JSON.stringify(carDATA),
                    contentType:'application/json',
                    success:function(data){
                        if(data.succeed){
                            //console.log("成功,不需要图片");
                            NativeCall(this,Bridge,"hideProgressHUD","");
                            NativeCall(this,Bridge,"applySucess","");
                        }else{
                        	//console.log(data.message);
                        	NativeCall(this,Bridge,"hideProgressHUD","");
            				NativeCall(this,Bridge,"showToast","服务器开小差了，稍后再试吧");
                        }
                    }
                });
            }
        },
        error:function(error){
            NativeCall(this,Bridge,"hideProgressHUD","");
            NativeCall(this,Bridge,"showToast","服务器开小差了，稍后再试吧");
        }
    });
}

// 实时校验数据
function verifyData() {
    //console.log("验证");
    if($("#money").val() == ""||$("#carNumber").val()==""||$("#tel").val() == ""||$("#carNumberTop").html()=="请选择"||$("#carNumberTop").html()=="不能为空"||$("#carProperty").html()=="请选择"||$("#carProperty").html()=="不能为空") {
        closeButton();
        return false;
    }else if($(".installment").css("display")!="none"){
        if($("#install").html()=="请选择"||$("#install").html()=="不能为空"){
            closeButton();
            return false;
        }else {
            openButton();
            return true;
        }
    } else {
        openButton();
        return true;
    }
}
