/**
 * Created by ex-dongbo on 2017/4/20.
 */
// 总数据
var counterDATA = {},
    counterImgData={code:"A01",fileName:"同行贷款"};
counterDATA.commendMore="";
// id
var transfersID;
// 是否有车
var carStatus = "N";
// 是否有房
var houseStatus = "N";

// 同行公司下拉框数据
var counterCompanyData;

var counterImg="img/id.svg";


$(function() {
    var allHeight=window.screen.availHeight;
    document.body.style.height=(allHeight-74)+"px";
    // 获取id
    transfersID = GetQueryString("id");
    // 获取该用户所在城市
    clickView();
    checkForm();
});

// 判断填写表单是否有误
function checkForm() {
    $("#money").blur(function(){
        verifyMoney(this);
    });
    $("#money").focus(function() {
        openButton();
        if($(this).attr("placeholder") == "金额不能为空" || $(this).attr("placeholder") == "数值不超过5000万" || $(this).attr("placeholder") == "金额输入有误"||$(this).attr("placeholder") == "金额只能为整数") {
            $(this).removeClass("error");
            $(this).attr("placeholder","必填");
            $(this).val("");
        }
        $(this).attr("type", "number");
        $(this).css("color", "#666666");
    });
    $("#counterMoney").blur(function(){
        verifyMoney(this);
    });
    $("#counterMoney").focus(function() {
        openButton();
        if($(this).attr("placeholder") == "金额不能为空" || $(this).attr("placeholder") == "数值不超过5000万" || $(this).attr("placeholder") == "金额输入有误"||$(this).attr("placeholder") == "金额只能为整数") {
            $(this).removeClass("error");
            $(this).attr("placeholder","必填");
            $(this).val("");
        }
        $(this).attr("type", "number");
        $(this).css("color", "#666666");
    });
    $("#telphone").blur(function() {
        verifyTelphone(this);
    });

    $("#telphone").focus(function() {
        if($(this).attr("placeholder") == "手机号不能为空"||$(this).attr("placeholder") == "手机号输入有误") {
            $(this).removeClass("error");
            $(this).attr("placeholder","必填");
            $(this).val("");
        }
        $(this).attr("type", "tel");
        $(this).css("color", "#666666");
    });
}

function clickView(){
    //同行公司控制
    $("#counterCompany").click(function(){
        openButton();
        if($(this).html()!=""||$(this).html()!="同行放款公司名称"){
            $(this).css("color", "#666666");
        }
    });

    //是否勾选下次跳转次页面
    popChose(counterDATA);

    // 添加图片
    $(".addIcon").click(function(){
        NativeCall(this,Bridge,"selectPhoto","");
    });

    // 预览图片
    $(".uploadImg img").click(function(){
        if($(this).attr("src")!="img/id.svg"){
            var imgdata={imgBase64:counterImg};
            console.log(imgdata.imgBase64);
            NativeCall(this,Bridge,"previewPhoto",imgdata);
        }
    });

    // 删除图片
    $("#deleteImg").click(function(){
        $(".addIcon").show();
        $(".uploadImg img").attr("src","img/id.svg");
        $(this).hide();
    });

    // 是否有车
    $("#has-car img").click(function() {
        console.log(1);
        carStatus=isClick(this,carStatus,"N","Y");
    });

    // 是否有房
    $("#has-house img").click(function() {
        console.log(2);
        houseStatus=isClick(this,houseStatus,"N","Y");
    });

    $("#sure button").click(function() {
        if(verifyData()) {
            Ispopup(ispopup,counterDATA,$(".uploadImg img"),counterImgData,counterImg);
        } else {
            verifyMoney($("#money"));
            verifyMoney($("#counterMoney"));
            verifyCounterCompany();
            verifyTelphone($("#telphone"));
        }
    });

    // 弹出框确认提交按钮
    $("#sumbit").click(function() {
        $("#content-submit").animate({ height: 0 }, 500,"swing");
        $("#layer").fadeOut(1000);
        handleAjax($(".uploadImg img"),counterDATA,counterImgData,counterImg);
    });
    
}
// 获取同行公司下拉框数据
function getCounterCompanyData(data) {
    // 获取所在城市
   var city = data.data.businessCity.name.split("分公司")[0];
   if(city == "重庆") {
   	   console.log("重庆");
       counterCompanyData = chongqingData;
       chooseData("#counterCompany",counterCompanyData,"","code","bank",1,false,['area_company']);
   } else if(city == "深圳") {
   	   console.log("深圳");	
       counterCompanyData = shenzhenData;
       chooseData("#counterCompany",counterCompanyData,"","code","bank",1,false,['area_company']);
   }else{
       $("#counterCompany").html("尚未开通");
   }
}

// 同行公司是否为空
function verifyCounterCompany() {
    var counterCompany = $("#counterCompany").html();
    if(counterCompany == "" || counterCompany == '同行放款公司名称') {
        $("#counterCompany").html("同行放款公司名称");
        $("#counterCompany").css("color", "#ef6762");
        closeButton();
    }
}

// 实时校验数据
function verifyData() {
    console.log("验证");
    if($("#money").val() == ""|| $("#counterMoney").val() == ""||$("#counterCompany").html()=="同行放款公司名称" || $("#telphone").val() == "") {
        closeButton();
        return false;
    } else {
        openButton();
        return true;
    }
}

//nactive相应接受操作函数
function dispose(ele, data) {
    console.log("dispose");
    data=JSON.parse(data);
    if(data.result=="01") {
        console.log("成功进入dispose");
        if(data.name){
            $(ele).hide();
            counterImg=data.name;
            var src="data:image/png;base64,";
            src=src+counterImg;
            $(".uploadImg img").attr("src",src);
            $("#deleteImg").show();
        }
    }
}

function getDATA() {
    counterDATA.notcategoryCode='N';
    counterDATA.money = $("#money").val();
    counterDATA.telephone = $("#telphone").val();
    counterDATA.peerMoney = String($("#counterMoney").val()*10000);
    counterDATA.peerCode = $("#counterCompany").attr("data-code");
    counterDATA.isCar = carStatus||"";
    counterDATA.isHouse = houseStatus||"";
    console.log(counterDATA);
}

//nactive异步交互
function NativeCall(ele, Bridge,funName,data){
    Bridge.callHandler(funName, data, function(response) {
        console.log("进入");
        dispose(ele,response);
    });
}

function TOAjax(URL,DATA,headers){
    console.log("进入请求");
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
                console.log("成功");
                getDATA();
                $.ajax({
                    type:"POST",
                    url:'../../v1/recommends/'+transfersID+'/profile',
                    headers:headers,
                    dataType:"json",
                    data:JSON.stringify(counterDATA),
                    contentType:'application/json',
                    success:function(data){
                        if(data.succeed){
                            console.log("成功,不需要图片");
                            NativeCall(this,Bridge,"hideProgressHUD","");
                            NativeCall(this,Bridge,"applySucess","");
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

