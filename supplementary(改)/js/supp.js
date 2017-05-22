
var carStep=0;
var houseStep=0;
var step=0;
var obj={};
var DATA={};
var first="1";
DATA.isCar="N";
DATA.isHouse="N";
DATA.commendMore="";
var transfersID;
var SaveSubCategory="",SaveCategorySub="",Savecategory="";
var time=new Date().getMinutes();
var occupation=[]; 

var manData={
  "data": [
    {
      "id": "010",
      "code": "010",
      "name": "上班族",
      "children": [
        {
          "code": "01010",
          "name": "公务员",
          "children": [
            {
              "code": "0101010",
              "name": "员工",
              "children": null
            },
            {
              "code": "0101020",
              "name": "副科",
              "children": null
            },
            {
              "code": "0101030",
              "name": "科级",
              "children": null
            },
            {
              "code": "0101040",
              "name": "副处",
              "children": null
            },
            {
              "code": "0101050",
              "name": "处级",
              "children": null
            },
            {
              "code": "0101060",
              "name": "副局",
              "children": null
            },
            {
              "code": "0101070",
              "name": "局级",
              "children": null
            }
          ]
        },
        {
          "code": "01020",
          "name": "优良职业",
          "children": [
            {
              "code": "0102010",
              "name": "世界500强",
              "children": null
            },
            {
              "code": "0102020",
              "name": "金融机构",
              "children": null
            },
            {
              "code": "0102030",
              "name": "垄断性企业",
              "children": null
            },
            {
              "code": "0102040",
              "name": "事业/机关",
              "children": null
            }
          ]
        },
        {
          "code": "01030",
          "name": "标准受薪",
          "children": null
        }
      ]
    },
    {
      "id": "020",
      "code": "020",
      "name": "企业主",
      "children": null
    }
  ],
  "succeed": true
};

$(function(){
	find();
	isFrist();
	//写入storage值
    Write(obj);
    
	inputView();
	clickView();
});

//input 操作
function inputView(){
	
	$("input").blur(function(){
		var val=$(this).attr("data-verify");
		switch(val){
			case "verifyMoney":
				verifyMoney($(this));
				break;
			case "verifyTelphone":
				verifyTelphone($(this));
				break;
		}
	});
}
//clickView 操作
function clickView(){
	
	//客户类型
	choose("#genre",manData.data,"","code","name",1,false,['area_province']);
	//职业
	//chooseOther("#occupation",manData.data,"","code","name",1,false,['area_province']);
	//级别
	//chooseOther("#level",manData.data,"","code","name",1,false,['area_province']);
	
	$("#other span").click(function(){
	 	$(this).css("color","#666666");
      	$("#sure button").removeAttr("disabled");
      	$("#submitSure .BTN  button").removeAttr("disabled");
    });
	
	//点击补充信息跳转
	$("#supplement ul li").click(function(){
		save();
		skipPage(this);
	});
	//是否有车
	$("#car").click(function(){
		DATA.isCar=isClick($(this),DATA.isCar,"N","Y");
	});
	//是否有房
	$("#house").click(function(){
		DATA.isHouse=isClick($(this),DATA.isHouse,"N","Y");
	});
	//点击提交
	$("#sure button").click(function(){
		self.location = "education.html?id=" + transfersID +"&time="+time+"";
//		if(verifyData()){
//			//提交
//		}
	});
}

//按揭状况函数
function choose(id,data,dataId,dataCode,dataName,idx,combine,arr){
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
//  $(id).css("color")
}
function chooseOther(id,data,dataId,dataCode,dataName,idx,combine,arr){
		judgeChose(id,data)
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
//  $(id).css("color")
}
function judgeChose(id,data){
	var value=$(id).parent().parent().prev().children("div").children("div").children("span").html();
	for(var i=0;i<data.length;i++){
      if(data[i].name==value){
          if(data[i].children){
            occupation=[];
            if($(id).parent().parent().next("li")){
            	$(id).parent().parent().next("li").show();
            }
            for(var c=0;c<data[i].children.length;c++){
              var obj={};
              obj.name=data[i].children[c].name;
              obj.code=data[i].children[c].code;
              if(data[i].children[c].children){
               		obj.children=data[i].children[c].children;
              }
              occupation.push(obj);
            }
          }else{
            if($(id).parent().parent().next("li")){
            	$(id).parent().parent().next("li").hide();
            	$(id).parent().parent().next("li").children("div").children("span")="请选择"; 
          	}
          }
      }      	
  }
}
//判断时候第一次进入
function isFrist(){
	if(obj.supplementary=="undefined"){
        localStorage.clear();
    }else if(obj.supplementary){
        if(obj.supplementary!="1"){
             localStorage.setItem("supplementary","1");
        }
    }
}
 //客户信息写入方法
function Write(data){
    if(data.money){
        $("#money").val(data.money);
    }
    if(data.tel){
        $("#tel").val(data.tel);
    }
    if(data.genre){
        $("#other .genre").html(data.genre);
    }
    if(data.occupation){
        if(data.occupation!="请选择"){
            $("#other .occupation").html(data.occupation);
            $(".occupation").parent().parent().show();
        }
    }
    if(data.level){
        if(data.level!="请选择"){
            $("#other .level").html(data.level);
            $(".level").parent().parent().show();
        }
    }
}
//验证通过函数
function verifyData(){
	if($("#money").val==""&$("#tel").val()!=""&$("#other .genre").html()!="请选择"){
		if($("#other .occupation").css("display")!="none"){
			if($("#other .occupation").html()!="请选择"){
				if($("#other .level").css("display")!="none"){
					if($("#other .level").html()!="请选择"){
						return true;
					}else{
						return false;
					}
				}else{
					return true;
				}
			}else{
				return false;
			}
		}else{
			return true;
		}
	}else{
		return false;
	}
}

//客户信息写入方法
function save(){
	localStorage.setItem("token",headers.Authorization);
    localStorage.setItem("supplementary","1");
    localStorage.setItem("money",$("#information .money").val());
    localStorage.setItem("tel",$("#other .tel").val());
    localStorage.setItem("genre",$("#other .genre").text());
    localStorage.setItem("occupation",$("#other .occupation").text());
    localStorage.setItem("level",$("#other .level").text());
    if(Savecategory==""){
        Savecategory=obj.Savecategory;
    }
    localStorage.setItem("Savecategory",Savecategory);
    if(SaveSubCategory==""){
        if(obj.SaveSubCategory==="undefined"){
            SaveSubCategory="";
        }
	    SaveSubCategory=obj.SaveSubCategory;
    }
    localStorage.setItem("SaveSubCategory",SaveSubCategory);
    if(SaveCategorySub==""){
        if(obj.SaveCategorySub==="undefined"){
            SaveCategorySub="";
        }
        SaveCategorySub=obj.SaveCategorySub;
    }
    localStorage.setItem("SaveCategorySub",SaveCategorySub);
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

//  学历保险跳转函数
function  skipPage(ele){
    if ($(ele).html() == "补充学历信息") {
       self.location = "education.html?id=" + transfersID +"&time="+time+"";
    } else if ($(ele).html() == "补充保单信息") {
       self.location = "guarantee.html?id=" + transfersID +"&time="+time+"";
    }
}
//获取数据
function getData(){
	DATA.money=$("#money").val();
	DATA.telephone=$("#tel").val();
	DATA.categoryCod=(Savecategory==undefined)?obj.Savecategory:Savecategory;
	DATA.subCategoryCode=(SaveSubCategor == undefined)?((obj.SaveSubCategory == "undefined")?"":obj.SaveSubCategory):SaveSubCategory;
	DATA.subCategorySubCode=(SaveCategorySub == undefined)?((obj.SaveCategorySub == "undefined")?"":obj.SaveCategorySub):SaveCategorySub;
	DATA.proId=getID;
    DATA.type=getType;
    console.log(DATA);
}



window.onload=function(){
	localStorage.setItem("token",headers.Authorization);
    $("#other span").click(function(){
        $("#sure button").removeAttr("disabled");
        $("#submitSure .BTN  button").removeAttr("disabled");
        switch($(this).siblings("p").html()){
            case "客户类型":
                openButton();
                NativeCall(this,Bridge,"selectGenre",genre);
                break;
            case "职业":
                openButton();
                if(obj.supplementary){
                    if(obj.supplementary=="1"){
                        pushOccupation($(this),$(".genre").text(),backstage);
                    }
                }
            	console.log(backstage);
                NativeCall(this,Bridge,"selectOccupation",occupation);
                break;
            case "级别":
                openButton();
                if(obj.supplementary){
                    if(obj.supplementary=="1"){
                        pushOccupation($(this),$(".occupation").text(),backstage);
                    }
                }
                NativeCall(this,Bridge,"selectLevel",level);
                break;
        }
    });

};

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
    	console.log(data.name);
        $(ele).html(data.name+"<i></i>");
        $(ele).css("color","#666666");
        if($(ele).siblings("p").text()=="客户类型"){
        	Savecategory=data.code;
            console.log(Savecategory);
        }
        if($(ele).siblings("p").text()=="职业"){
            SaveSubCategory=data.code;
            console.log(SaveSubCategory);
        }
        if($(ele).siblings("p").text()=="级别"){
            SaveCategorySub=data.code;
            console.log(SaveCategorySub);
        }
        pushOccupation($(ele),data.name,backstage);
    }
}
//后台ajax获取方法
function backAjax(URL,DATA,headers){
	localStorage.setItem("token",headers.Authorization);
    $.ajax({
        type:"GET",
        url:URL,
        headers:headers,
        data:DATA,
        success:function(data){
        	console.log(data);
        	pushGenre(data);
        },
        error:function(error){
            nativeCall(this,Bridge,"hideProgressHUD","");
            nativeCall(this,Bridge,"showToast","服务器开小差了，稍后再试吧");
        }
    });
}

//返给安卓、ios处理
function pushGenre(data){
	backstage=data;
	console.log(backstage);
    genre=[];
    if(data.succeed){
        for(var i=0;i<data.data.length;i++){
            var obj={};
            obj.name=data.data[i].name;
            obj.code=data.data[i].code;
            genre.push(obj);
        }
    }
}

function pushOccupation(ele,reponse,data){
    if(data.succeed){
        for(var i=0;i<data.data.length;i++){
            if(data.data[i].name==reponse){
                if(data.data[i].children){
                    if(reponseGenr!=reponse){
                        ele.parent("div").parent("li").next().children("div").children("span").html("请选择"+"<i></i>");
                        reponseGenr=reponse;
                    }
                    occupation=[];
                    ele.parent("div").parent("li").next().show();
                    for(var c=0;c<data.data[i].children.length;c++){
                        var obj={};
                        obj.name=data.data[i].children[c].name;
                        obj.code=data.data[i].children[c].code;
                        occupation.push(obj);
                    }
                    return;
                }else{
                    ele.parent("div").parent("li").next().hide();
                    ele.parent("div").parent("li").next().children("div").children("span").html("请选择"+"<i></i>");
                    ele.parent("div").parent("li").next().next().hide();
                    ele.parent("div").parent("li").next().next().children("div").children("span").html("请选择"+"<i></i>");
                }
            }
            if(data.data[i].children){
                for(var c=0;c<data.data[i].children.length;c++){
                    if(data.data[i].children[c].name==reponse){
                        if(data.data[i].children[c].children){
                            if(reponseLevel!=reponse){
                                ele.parent("div").parent("li").next().children("div").children("span").html("请选择"+"<i></i>");
                                reponseL=reponse;
                            }
                            level=[];
                            ele.parent("div").parent("li").next().show();
                            for(var l=0;l<data.data[i].children[c].children.length;l++){
                                var Obj={};
                                Obj.name=data.data[i].children[c].children[l].name;
                                Obj.code=data.data[i].children[c].children[l].code;
                                level.push(Obj);
                            }
                        }else{
                            ele.parent("div").parent("li").next().hide();
                            ele.parent("div").parent("li").next().children("div").children("span").html("请选择"+"<i></i>");
                        }
                    }
                }
            }
        }
    }
}
//后台ajax获取方法
function getAjax(URL,DATA,headers){
    $.ajax({
        type:"POST",
        url:URL,
        headers:headers,
        data:DATA,
        success:function(data){
            if(data.succeed){
                ispopup=data.data.data;
            }
        },
        error:function(error){
            nativeCall(this,Bridge,"hideProgressHUD","");
            nativeCall(this,Bridge,"showToast","服务器开小差了，稍后再试吧");
        }
    });
}
