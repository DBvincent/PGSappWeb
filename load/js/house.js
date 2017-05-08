 var installStep=0;
 var transfersID;
 var houseStep=0;
 //房屋图片
 var houseImg="img/id.svg";
 //总数据
 var houseDATA={},houseImgData={code:"999",fileName:"房产贷款"};
 houseDATA.commendMore="";
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
 //房屋产权
 var houseState=[
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
        transfersID=GetQueryString("id");
        inputView();
        clickView();
    });

    function inputView(){
        //是否有按揭//是否有抵押
        (function(){
            //贷款输入限制
            $(".money").blur(function(){
                verifyMoney(this);
            });
            //房屋面积验证
            $(".area").blur(function(){
                verifyHouse(this);
            });
            //手机验证
            $(".tel").blur(function(){
                verifyTelphone(this);
            });
            //详细地址验证
            $(".detailedAddress").blur(function(){
                verifyDetailedAdd(this);
            });

            $("input").focus(function(){
                openButton();
                if($(this).attr("placeholder") == "金额不能为空" || $(this).attr("placeholder") == "数值不超过5000万" || $(this).attr("placeholder") == "金额输入有误"||$(this).attr("placeholder") == "金额只能为整数"||$(this).attr("placeholder") == "手机号不能为空"||$(this).attr("placeholder") == "手机号输入有误"||$(this).attr("placeholder") == "面积不能为空"||$(this).attr("placeholder") == "地址不能为空") {
                    $(this).removeClass("error");
                    $(this).attr("placeholder","必填");
                    $(this).val("");
                }
                $(this).css("color", "#666666");
            });
        })();
    }

    function clickView(){
        //地址点击事件
        chooseData("#location",addressData,"id","code","name",3,true,['area_province', 'area_province2', 'area_province3']);
        $("#location").click(function(){
            openButton();
            $(this).css("color","#666666");
        });

        //按揭点击事件
        chooseData("#mortgage",installmentState,"","code","name",1,false,['area_province']);
        //房屋产权
        chooseData("#houseEquity",houseState,"","code","name",1,false,['area_province']);
        $("#other span").click(function(){
            openButton();
            $(this).css("color","#666666");
        });

        //图片添加
        (function(){
            $("#datum .addIcon").click(function(){
                console.log("OK");
                NativeCall(this,Bridge,"selectPhoto","");
            });
        })();

        //点击图片预览
        (function(){
            $("#datum .datumImg .IMG img").click(function(){
                if($(this).attr("src")!="img/id.svg"){
                    var imgdata={imgBase64:houseImg};
                    console.log(imgdata.imgBase64);
                    NativeCall(this,Bridge,"previewPhoto",imgdata);
                }
            });
        })();

        //点击删除
        (function(){
            $("#closeImg").click(function(){
                $("#datum .addIcon").show();
                $("#datum .datumImg .IMG img").attr("src","img/id.svg");
                $(this).hide();
            });
        })();

        //是否有按揭
        $("#installment img").click(function(){
            if(installStep==0){
                $(this).attr('src','img/on.svg');
                $(".installment").show();
                installStep=1;
            }else if(installStep==1){
                $(this).attr('src','img/off.svg');
                $(".installment").hide();
                installStep=0;
            }
        });

        //是否有抵押
        $("#property img").click(function(){
            if(houseStep==0){
                $(this).attr('src','img/on.svg');
                houseStep=1;
            }else if(houseStep==1){
                $(this).attr('src','img/off.svg');
                houseStep=0;
            }
        });

        //是否勾选下次跳转次页面
        popChose(houseDATA);

        //点击弹出
        $("#sure button").click(function () {
            if(verifyData()) {
                Ispopup(ispopup,houseDATA,$(".datumImg .IMG img"),houseImgData,houseImg);
            } else {
                verifyMoney($(".money"));
                verifyTelphone($(".tel"));
                verifyDetailedAdd($(".detailedAddress"));
                verifyChose($("#location"));
                verifyHouse($(".area "));
                verifyChose($("#houseEquity"));
                if($(".installment").css("display")!="none"){
                    verifyChose($("#mortgage"));
                }
            }
        });

        // 弹出框确认提交按钮
        $("#sumbit").click(function() {
            $("#content-submit").animate({ height: 0 }, 500,"swing");
            $("#layer").fadeOut(1000);
            handleAjax($(".datumImg .IMG img"),houseDATA,houseImgData,houseImg);
        });
        
       	//点击关闭 关闭弹框
    	$("#box-close").click(function(){
    	 	$("#content-submit").animate({ height: 0 }, 500,"swing");
         	$("#layer").fadeOut(1000);
    	});
    }

    //nactive异步交互
    function NativeCall(ele, Bridge,funName,data){
        Bridge.callHandler(funName, data, function(response) {
            console.log("进入");
            dispose(ele,response);
        });
    }
    //nactive相应接受操作函数
    function dispose(ele,data){
        console.log("0");
        data=JSON.parse(data);
        console.log(data);
        if(data.result=="01") {
            if(data.name){
                $(ele).hide();
                houseImg=data.name;
                var src="data:image/png;base64,";
                src=src+data.name;
                console.log(1);
                $("#datum .datumImg .IMG img").attr("src",src);
                $("#closeImg").show();
            }
        }
    }

    //总数据收集函数
    function getDATA(){
        houseDATA.notcategoryCode='N';
        houseDATA.money=$(".money").val();
        houseDATA.telephone=$(".tel").val();
        houseDATA.houseArea=$("#other .area").val();
        houseDATA.houseAddress=$("#location").html();
        houseDATA.houseDetailedAddress=$(".detailedAddress").val();
        houseDATA.proId=getID;
        houseDATA.type=getType;
        houseDATA.houseInstallment=$("#mortgage").attr("data-code");
        houseDATA.houseProperty=$("#houseEquity").attr("data-code");
        if(houseStep==0){
            houseDATA.houseLoan="N";
        }else if(houseStep==1){
            houseDATA.houseLoan="Y";
        }
        console.log(houseDATA);
    }

    //后台ajax方法
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
                        data:JSON.stringify(houseDATA),
                        contentType:'application/json',
                        success:function(){
                            NativeCall(this,Bridge,"hideProgressHUD","");
                            NativeCall(this,Bridge,"applySucess","");
                        }
                    });
                }
            },
            error:function(error){
                nativeCall(this,Bridge,"hideProgressHUD","");
                nativeCall(this,Bridge,"showToast","服务器开小差了，稍后再试吧");
            }
        });
    }

    // 实时校验数据
    function verifyData() {
        console.log("验证");
        if($(".money").val() == ""||$(".area").val()==""||$(".tel").val() == ""||$(".detailedAddress").val()==""||$("#location").html()=="请选择"||$("#location").html()=="不能为空"||$("#houseEquity").html()=="请选择"||$("#houseEquity").html()=="不能为空") {
            closeButton();
            return false;
        }else if($(".installment").css("display")!="none"){
            if($("#mortgage").html()=="请选择"||$("#mortgage").html()=="不能为空"){
                closeButton();
                return false;
            }else {
                openButton();
                return true;
            }
        }else{
            openButton();
            return true;
        }
    }