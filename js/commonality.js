/**
 * Created by ex-dongbo on 2017/4/10.
 */
//获取ispopup 的值
function getIspopup(data){
    if(data.succeed){
        ispopup=data.data.data;
        console.log(ispopup);
    }
}
//获取数据处理函数
function HEADER(response){
    response=JSON.parse(response);
    if(response.result=="01") {
        headers.Authorization = Bearer + response.token;
        console.log(headers);
    }
}
// 获取产品ID
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
    var r = window.location.search.substr(1).match(reg);
    if (r!=null) return (r[2]); return null;
}

//判断span是否有值
function verifyChose(ele){
    var html=$(ele).html();
    if(html=="请选择"||html=="不能为空"){
        $(ele).html("不能为空");
        $(ele).css("color","#ef6762");
    }else{
        $(ele).html(html);
        $(ele).css("color","666666");
    }
}

//弹框函数
function handlePopup(ele) {
    $("#layer").fadeIn(1000);
    $(ele).css("width", window.screen.width);
    $(ele).css("display", "block");
    $(ele).stop(true, true).animate({ height: $(ele).children("div").css("height") }, 500,"swing");
    $("#close").click(function() {
        $("#layer").hide();
        $(ele).animate({ height: 0 }, 500,"swing");
    });
    $("#layer").click(function(){
        $("#layer").hide();
        $(ele).animate({ height: 0 }, 500,"swing");
    });
}
//是否有车有房
function isClick(ele,step,compare1,compare2){
    if(step==compare1){
        $(ele).attr('src','img/on.svg');
        return "Y";
    }else if(step==compare2){
        $(ele).attr('src','img/off.svg');
        return "N";
    }
}
//摊款内容选择
function popChose(data){
    $("#box-content ul li").click(function () {
        $(this).children(".right-content").children("img").attr("src", "img/checkSure.svg");
        $(this).siblings("li").children(".right-content").children("img").attr("src", "img/check.svg");
        console.log($(this).children("div").children("p").text());
        if ($(this).children("div").children("p").text() == "始终同意更高通过率") {
            console.log("forever");
            data.commendMore = "forever";
        } else if ($(this).children("div").children("p").text() == "仅同意本客户") {
            console.log("noe");
            data.commendMore = "one";
        } else if ($(this).children("div").children("p").text() == "不同意") {
            console.log("no");
            data.commendMore = "no";
        }
    });
}

//按揭状况函数
function chooseData(id,data,dataId,dataCode,dataName,idx,combine,arr){
    var area = new LArea();
    area.init({
        'trigger': id, //触发选择控件的文本框，同时选择完毕后name属性输出到该位置
        'keys': {
            'id': dataId,
            'code':dataCode,
            'name':dataName,
        }, //绑定数据源相关字段 id对应valueTo的value属性输出 name对应trigger的value属性输出
        'type': 1, //数据源类型
        'data': data, //数据源
        'idx': idx,
        'combine':combine
    });
    // area1.value=[0,0,0];//控制初始位置，注意：该方法并不会影响到input的value
    area.className =arr; // 设置class值
    $(id).css("color")
}
//后台ajax获取方法
function getAjax(URL,DATA,headers,responseFun,type){
    $.ajax({
        type:type,
        url:URL,
        headers:headers,
        data:DATA,
        beforeSend:function(){

        },
        success:function(data){
            if(data.succeed){
                if(responseFun){
                    responseFun(data);
                }
            }
        },
        error:function(error){
            NativeCall(this,Bridge,"showToast","服务器开小差了，稍后再试吧");
        }
    });
}
//后台ajax方法
function toAjax(URL,DATA,headers,type){
    $.ajax({
        type:type,
        url:URL,
        headers:headers,
        dataType:"json",
        data:DATA,
        contentType: 'application/json',
        beforeSend:function(){
 
        },
        success:function(data){

        },
        error:function(error){
            NativeCall(this,Bridge,"showToast","服务器开小差了，稍后再试吧");
        }
    });
}
//判断时候弹出框
function Ispopup(ispopup,data,ele,ImgData,img){
    if(ispopup=="Y"){
        handlePopup($("#content-submit"));
    }
    if(ispopup=="N") {
        data.commendMore = "forever";
        handleAjax(ele,data,ImgData,img);
    }
}
//弹框提交函数
function handleAjax(ele,data,ImgData,img) {
    console.log("进入请求,不需要图片");
    if($(ele).attr("src")=="img/id.svg"){
        getDATA();
        $.ajax({
            type:"POST",
            url:'../../v1/recommends/'+transfersID+'/profile',
            headers:headers,
            dataType:"json",
            data:JSON.stringify(data),
            contentType:'application/json',
            beforeSend:function(){
                NativeCall(this,Bridge,"showProgressHUD","正在提交");
            },
            success:function(data){
                if(data.succeed){
                    console.log("成功,不需要图片");
                    NativeCall(this,Bridge,"hideProgressHUD","");
                    NativeCall(this,Bridge,"applySucess","","");
                }
            },
            error:function(error){
                NativeCall(this,Bridge,"hideProgressHUD","");
                NativeCall(this,Bridge,"showToast","服务器开小差了，稍后再试吧");
            }
        });
    }else{
        console.log("进入，需要图片");
        ImgData.bizId = transfersID;
        ImgData.fileDate =img ;
        TOAjax('../../v1/attachments/uploadBaseImage',ImgData,headers);
    }
}