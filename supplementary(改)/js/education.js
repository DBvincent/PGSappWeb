 	var judge;
    var RecommendationDetail={};
    	RecommendationDetail.schoolRequestItem={};
    var recommendId={};
    var supplement={};

    var postUrl = '../../v1/dictionary/schools/new';
    var SchoolName,DiplomaCode,DegreeCode;
    var schoolData=[];

$(function(){
	//获取recommendId
    transfersID=GetQueryString("id");
    //获取storage数据
    find();
    console.log(supplement);
    //获取headers
    var headers={"content-type" : "application/json"}
    headers.Authorization=supplement.token;
    console.log(headers);
    //判断是否是第一次进入
    checkFind(supplement);
    //ajax调取后台数据
    backAjax(postUrl,transfersID,headers);
    //点击事件
    clickView();
});

//点击事件函数
function clickView(){
	//学历写入
    $("#other ul li span").click(function(){
        switch($(this).siblings("p").html()){
            case "学历":
                openButton();
                NativeCall(this,Bridge,"selectEducation","");
                break;
            case "学位":
                openButton();
                NativeCall(this,Bridge,"selectDegree","");
                break;
            case "毕业院校":
                openButton();
                NativeCall(this,Bridge,"selectDraduate",schoolData);
                break;
            case "毕业时间":
                openButton();
                NativeCall(this,Bridge,"selectGraduateTime","");
                break;
        }
    });
        	
    //确认跳转
    $("#sure button").click(function(){
        if($(this).html()=="确认"){
            backDATA();
            console.log(JSON.stringify(RecommendationDetail));
            verification(RecommendationDetail,headers);
            //toAjax(RecommendationDetail,headers);
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
            url:"../../v1/recommends/"+transfersID+"/school",
            data:JSON.stringify(data),
            contentType: 'application/json',
            beforeSend:function(){
                NativeCall(this,Bridge,"showProgressHUD","正在提交");
            },
            success:function(data){
            	console.log("OK");
            	if(data.succeed){
            		console.log("进入");
            		save();
                    localStorage.setItem("Step","1");
                    NativeCall(this,Bridge,"hideProgressHUD","");
                    self.location="supplementary.html?id="+transfersID+"";
            	}
            },
            error:function(error){
            	console.log(error);
                //NativeCall(this,Bridge,"hideProgressHUD","");
            }
        });
    }

    //返回数据方法
    function backDATA(){
        RecommendationDetail.schoolRequestItem.educationDiploma=DiplomaCode;
        RecommendationDetail.schoolRequestItem.educationDegree=DegreeCode;
        RecommendationDetail.schoolRequestItem.graduateDate=checkTime($(".time span").text());
        RecommendationDetail.schoolRequestItem.school=SchoolName;
    }

    // 获取产品ID
    function GetQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
        var r = window.location.search.substr(1).match(reg);
        if (r!=null) return (r[2]); return null;
    }
  //学历信息保存方法
    function save(){
        localStorage.setItem("education",$(".education .right").text());
        localStorage.setItem("degree",$(".degree .right").text());
        localStorage.setItem("academy",$(".academy .right").text());
        localStorage.setItem("time",$(".time .right").text());

        localStorage.setItem("DiplomaCode",DiplomaCode);
        localStorage.setItem("DegreeCode",DegreeCode);
        localStorage.setItem("SchoolName",JSON.stringify(SchoolName));

    }

    //获取web storage 数据
    function find(){
        var storage = window.localStorage;
        for (var i=0, len = storage.length; i  <  len; i++){
            var key = storage.key(i);
            var value = storage.getItem(key);
            supplement[key]=value;
            console.log(key + "=" + value);
        }
        console.log(supplement);
    }

    //判断是否第一次进入后不适用find方法
    function checkFind(supplement){
        if(supplement.Step=="1"){
            //find();
            if(supplement.education){
                $(".education .right").html(supplement.education+"<i></i>");
            }
            if(supplement.degree){
                $(".degree .right").html(supplement.degree+"<i></i>");
            }
            if(supplement.academy){
                $(".academy .right").html(supplement.academy+"<i></i>");
            }
            if(supplement.time){
                $(".time .right").html(supplement.time+"<i></i>");
            }
            if(supplement.DiplomaCode){
                DiplomaCode=supplement.DiplomaCode;
            }
            if(supplement.DegreeCode){
                DegreeCode=supplement.DegreeCode;
            }
            if(supplement.SchoolName){
                SchoolName=JSON.parse(supplement.SchoolName);
            }
        }
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
        	if($(ele).siblings("p").html()=="学历"){
                DiplomaCode=data.code;
        	}
        	if($(ele).siblings("p").html()=="学位"){
                DegreeCode=data.code;
        	}
            if($(ele).siblings("p").html()=="毕业院校"){
                schoolSave=data.school.name;
            	$(ele).html(data.school.name+"<i></i>");
                $(ele).css("color","#666666");
                SchoolName=data.school;
            }
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
            	SchooLData(data);
            }
        });
    }
  
    //时间转化函数
    function checkTime(data){
        var Time = (new Date(data)).getTime();
        return Time;
    }


    //学校数据处理
    function SchooLData(data){
        if(data.succeed){
            schoolData=data;
        }
        console.log(schoolData);
    }
    //验证函数
    function verification(RecommendationDetail,headers){
        if($(".education>div .right").text()=="请选择"){
            $(".education>div .right").html("学历不能为空");
            $(".education>div .right").css("color","#ef6762");
            closeButton()
        }else if($(".degree>div .right").text()=="请选择"){
            $(".degree>div .right").html("学位不能为空");
            $(".degree>div .right").css("color","#ef6762");
            closeButton()
        }else if($(".academy>div .right").text()=="请选择"){
            $(".academy>div .right").html("院校不能为空");
            $(".academy>div .right").css("color","#ef6762");
            closeButton()
        }else if($(".time>div .right").text()=="请选择"){
            $(".time>div .right").html("时间不能为空");
            $(".time>div .right").css("color","#ef6762");
            closeButton()
        }else{
            openButton();
            toAjax(RecommendationDetail,headers);
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
    


