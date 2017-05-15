
var carStep=0;
var houseStep=0;
var step=0;
var obj={};
var DATA={};
var first="1";
DATA.isCar="N";
DATA.isHouse="N";
DATA.commendMore="";
var SaveSubCategory="",SaveCategorySub="",Savecategory="";

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
	
	
	//点击补充信息跳转
	$("#supplement ul li").click(function(){
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
			//提交
		}
	});
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

//客户信息写入方法
function save(){
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
// 获取产品ID
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
    var r = window.location.search.substr(1).match(reg);
    if (r!=null) return (r[2]); return null;
}
//  学历保险跳转函数
function  skipPage(ele){
    if ($(ele).html() == "补充学历信息") {
       self.location = "education.html?id=" + transfersID + "";
    } else if ($(ele).html() == "补充保单信息") {
        self.location = "guarantee.html?id=" + transfersID + "";
    }
}
//获取数据
function getData(){
	DATA.money=$("#money").val();
	DATA.telephone=$("#tel").val();
	
	DATA.proId=getID;
    DATA.type=getType;
    console.log(DATA);
}
