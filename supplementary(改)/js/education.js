 	var judge;
    var RecommendationDetail={};
    	RecommendationDetail.schoolRequestItem={};
    var recommendId={};
    var supplement={};

    var postUrl = '../../v1/dictionary/schools/new';
    var SchoolName,DiplomaCode,DegreeCode;
    var schoolData=[];
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
$(function(){
	//获取recommendId
    transfersID=GetQueryString("id");
    //获取storage数据
    find();
  
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
    $("#other span").click(function(){
        switch($(this).parent().siblings("p").html()){
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
            getData();
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
            	if(data.succeed){
            		console.log("进入");
            		save();
                    localStorage.setItem("Step","1");
                    NativeCall(this,Bridge,"hideProgressHUD","");
                    self.location="supplementary.html?id="+transfersID+"";
            	}else{
            		NativeCall(this,Bridge,"hideProgressHUD","");
            		NativeCall(this,Bridge,"showToast","服务器开小差了，稍后再试吧");
            	}
            },
            error:function(error){
            	NativeCall(this,Bridge,"hideProgressHUD","");
            	NativeCall(this,Bridge,"showToast","服务器开小差了，稍后再试吧");
            }
        });
    }

    //返回数据方法
    function getData(){
        RecommendationDetail.schoolRequestItem.educationDiploma=DiplomaCode;
        RecommendationDetail.schoolRequestItem.educationDegree=DegreeCode;
        RecommendationDetail.schoolRequestItem.graduateDate=checkTime($("#time").html());
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
        localStorage.setItem("education",$("#education .right").html());
        localStorage.setItem("degree",$("#degree .right").html());
        localStorage.setItem("academy",$("#academy .right").html());
        localStorage.setItem("time",$("#time .right").html());

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
                $("#education").html(supplement.education);
            }
            if(supplement.degree){
                $("#degree").html(supplement.degree);
            }
            if(supplement.academy){
                $("#academy").html(supplement.academy);
            }
            if(supplement.time){
                $("#time").html(supplement.time);
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

    
    


