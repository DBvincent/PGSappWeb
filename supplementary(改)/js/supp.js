
var carStep=0;
var houseStep=0;
var step=0;
var obj={};
var DATA={
	"isCar":"N",
  "isHouse":"N",
  "commendMore":""
};
var first="1";
var time=new Date().getMinutes();

	backAjax("http://disp-api-sit1.banketech.com/v1/dictionary/customerCategories",transfersID,headers);
	
	find();
	isFrist();
	//写入storage值
  Write(obj);
	inputView();
	clickView();
	
//input 操作
function inputView(){
	
	$("input").focus(function(){
			totalVerify.openButton();
	});
	
	$("input").blur(function(){
		 totalVerify.init(this);
	});
}
//clickView 操作
function clickView(){
	
	$("#other span").click(function(){
	 		$(this).css("color","#666666");
    	totalVerify.openButton();
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
		if(verifyData()){
				getData();
				Ispopup(ispopup,DATA);
				totalVerify.closeButton();
				//提交
		}else{
			  totalVerify.verifyMoney($("#money"));
			  totalVerify.verifyTelphone($("#tel"));
			  totalVerify.verifyHtml($("#genre"));
			  if($(".occuPation").css("display")!="none"){
			 		 totalVerify.verifyHtml($("#occupation"));
			 		 if($(".leveL").css("display")!="none"){
			 			 totalVerify.verifyHtml($("#level"));
			 		 }
			  } 
		}
	});
	
	//弹框选择
	popChose(DATA);
	
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
        $("#genre").html(data.genre).css("color","#666666");
        
    }
    if(data.occupation){
        if(data.genre!="企业主"){
            $("#occupation").html(data.occupation).css("color","#666666");
            $("#occupation").parent().parent().show();
        }
    }
    if(data.level){
    	if($("#occupation").css("display")!="none"){
    		if(data.occupation!="标准受薪"&&data.occupation!="请选择"){
            $("#level").html(data.level).css("color","#666666");
            $("#level").parent().parent().show();
        }
    	} 
    }
    if(data.Savecategory){
    	if(data.Savecategory!=undefined){
    	  $("#genre").attr("data-code",data.Savecategory);
    	}
    }
    if(data.SaveSubCategory){
    	if(data.SaveSubCategory!=undefined){
    		$("#occupation").attr("data-code",data.SaveSubCategory);
    	}	
    }
    if(data.SaveCategorySub){
    	if(data.SaveCategorySub!=undefined){
    		$("#level").attr("data-code",data.SaveCategorySub);
    	}	
    }
}
//验证通过函数
function verifyData(){
	if($("#money").val()!=""&&$("#tel").val()!=""&&$("#genre").html()!="请选择"&&$("#genre").html()!="客户类型不能为空"){
		if($(".occuPation").css("display")!="none"){
			if($("#occupation").html()!="请选择"&&$("#occupation").html()!="职业不能为空"){
				if($(".leveL").css("display")!="none"){
					if($("#level").html()!="请选择"&&$("#level").html()!="级别不能为空"){
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
    localStorage.setItem("money",$("#money").val());
    localStorage.setItem("tel",$("#tel").val());
    localStorage.setItem("genre",$("#genre").html());
    localStorage.setItem("occupation",$("#occupation").html());
    localStorage.setItem("level",$("#level").html());
    localStorage.setItem("Savecategory",$("#genre").attr("data-code"));
    localStorage.setItem("SaveSubCategory",$("#occupation").attr("data-code")?$("#occupation").attr("data-code"):"");
    localStorage.setItem("SaveCategorySub",$("#level").attr("data-code")?$("#level").attr("data-code"):"");
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
	DATA.categoryCod=obj.Savecategory?($("#genre").attr("data-code")?$("#genre").attr("data-code"):""):"";
	DATA.subCategoryCode=obj.SaveSubCategory!=undefined?($("#occupation").attr("data-code")?$("#occupation").attr("data-code"):""):"";
	DATA.subCategorySubCode=obj.SaveCategorySub!=undefined?($("#level").attr("data-code")?$("#level").attr("data-code"):""):"";
	DATA.proId=getID;
  DATA.type=getType;
  console.log(DATA);
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
//判断时候弹出框
function Ispopup(ispopup,data,ele){
    if(ispopup=="Y"){
        handlePopup($("#content-submit"));
    }
    if(ispopup=="N") {
        data.commendMore="forever";
        console.log(DATA);
        TOAjax('../../v1/recommends/'+transfersID+'/profile',DATA,headers);
    }
}
//弹框函数
function handlePopup(ele) {
    $("#layer").fadeIn(1000);
    $(ele).css("width", window.screen.width);
    $(ele).stop(true, true).animate({ height:570}, 500,"swing");
    $("#close").click(function() {
        $("#layer").hide();
        $(ele).animate({ height:-290}, 800,"swing");
    });
    $("#layer").click(function(){
        $("#layer").hide();
        $(ele).animate({ height:-290}, 800,"swing");
    });
    //弹框点击提交
	$("#sumbit").click(function(){
		$("#layer").hide();
        $(ele).animate({ height:-290}, 800,"swing",function(){
        	console.log(DATA);
        	TOAjax('../../v1/recommends/'+transfersID+'/profile',DATA,headers);
        });
	});
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
        		if(data.succeed){
        				//客户类型
						choose("#genre",data.data,"","code","name",1,false,['area_province']);
						//职业
						choose("#occupation",data.data,"","code","name",1,false,['area_province']);
						//级别
						choose("#level",data.data,"","code","name",1,false,['area_province']);
        		}
        }
    });
}