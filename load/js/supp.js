
var carStep=0;
var houseStep=0;
var step=0;
var obj={};
var DATA={};
var first="1";
DATA.isCar="N";
DATA.isHouse="N";
DATA.commendMore="";
var time=new Date().getMinutes();

//获取ID并处理
transfersID=GetQueryString("id");
//获取storage
find();
//判断是否第一次进入
isFrist();
//写入storage值
Write(obj);
//input事件
inputView();
//点击事件
clickView();
//input事件
function inputView(){
	$("input").focus(function(){
			totalVerify.openButton();
	});
	$("input").blur(function(){
		 totalVerify.init(this);
	});
}
//点击事件
function clickView(){
	//是否有车
	$("#car").click(function(){
		DATA.isCar=isClick($(this),DATA.isCar,"N","Y");
	});
	//是否有房
	$("#house").click(function(){
		DATA.isHouse=isClick($(this),DATA.isHouse,"N","Y");
	});
	//类型选择
	$("#other span").click(function(){
        $("#sure button").removeAttr("disabled");
        $("#submitSure .BTN  button").removeAttr("disabled");
        switch($(this).siblings("p").html()){
            case "客户类型":
                totalVerify.openButton();
                NativeCall(this,Bridge,"selectGenre",genre);
                break;
            case "职业":
                totalVerify.openButton();
                if(obj.supplementary){
                    if(obj.supplementary=="1"){
                        pushOccupation($(this),$(".genre").text(),backstage);
                    }
                }
            	console.log(backstage);
                NativeCall(this,Bridge,"selectOccupation",occupation);
                break;
            case "级别":
                totalVerify.openButton();
                if(obj.supplementary){
                    if(obj.supplementary=="1"){
                        pushOccupation($(this),$(".occupation").text(),backstage);
                    }
                }
                NativeCall(this,Bridge,"selectLevel",level);
                break;
        }
    });
	//客户类型判断
	$("#other span").click(function(){
	 	$(this).css("color","#666666");
    	totalVerify.openButton();
  	});
	//点击补充信息跳转
	$("#supplement ul li").click(function(){
		save();
		skipPage(this);
	});
	//点击提交
	$("#sure button").click(function(){
		if(verifyData()){
			getData();
			Ispopup(ispopup,DATA);
//			totalVerify.closeButton();
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
	
   //后台ajax方法
   function TOAjax(URL,DATA,headers){
        $.ajax({
            type:"POST",
            url:URL,
            headers:headers,
            dataType:"json",
            data:JSON.stringify(DATA),
            contentType: 'application/json',
            beforeSend:function(){
                nativeCall(this,Bridge,"showProgressHUD","正在提交");
            },
        	success:function(data){
        		console.log(data);
        		if(data.succeed){
                    nativeCall(this,Bridge,"hideProgressHUD","");
                    localStorage.clear( );
                    openButton();
                    nativeCall(this,Bridge,"applySucess","");
        		}else{
                    closeButton();
                    nativeCall(this, Bridge, "showToast", "服务器开小差了，稍后再试吧");
                }
        	},
            error:function(error){
            	closeButton();
                nativeCall(this,Bridge,"hideProgressHUD","");
                nativeCall(this,Bridge,"showToast","服务器开小差了，稍后再试吧");
            }
        });
    }

   //客户信息写入方法
   function Write(data){
        if(data.money){
            $("#information ul li .money").val(data.money);
        }
        if(data.tel){
            $("#other .tel").val(data.tel);
        }
        if(data.genre){
            $("#other .genre").html(data.genre+"<i></i>");
        }
        if(data.occupation){
            if(data.occupation!="请选择"){
                $("#other .occupation").html(data.occupation+"<i></i>");
                $(".occupation").parent().parent().show();
            }
        }
        if(data.level){
            if(data.level!="请选择"){
                $("#other .level").html(data.level+"<i></i>");
                $(".level").parent().parent().show();
            }
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


// //客户信息写入方法
// function save(){
//     localStorage.setItem("supplementary","1");
//      localStorage.setItem("money",$("#information .money").val());
//      localStorage.setItem("tel",$("#other .tel").val());
//      localStorage.setItem("genre",$("#other .genre").text());
//      localStorage.setItem("occupation",$("#other .occupation").text());
//      localStorage.setItem("level",$("#other .level").text());
//     if(Savecategory==""){
//         Savecategory=obj.Savecategory;
//     }
//      localStorage.setItem("Savecategory",Savecategory);
//     if(SaveSubCategory==""){
//         if(obj.SaveSubCategory==="undefined"){
//             SaveSubCategory="";
//         }
//         SaveSubCategory=obj.SaveSubCategory;
//     }
//      localStorage.setItem("SaveSubCategory",SaveSubCategory);
//     if(SaveCategorySub==""){
//         if(obj.SaveCategorySub==="undefined"){
//             SaveCategorySub="";
//         }
//         SaveCategorySub=obj.SaveCategorySub;
//     }
//      localStorage.setItem("SaveCategorySub",SaveCategorySub);
//  }

    // 获取产品ID
   function GetQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
        var r = window.location.search.substr(1).match(reg);
        if (r!=null) return (r[2]); return null;
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
//  //获取页面内容
// function acquireData(){
//      DATA.money=$("#information ul li input").val();
//      $("#other ul li").each(function(){
//          if($(this).children("div").children("p").text()=="客户手机"){
//                  DATA.telephone=$(this).children("div").children("div").children("input").val();
//          }
//          if($(this).children("div").children("p").text()=="客户类型"){
//              if(Savecategory==""){
//                  Savecategory=obj.Savecategory;
//              }
//                  DATA.categoryCode=Savecategory;
//          }
//          if($(this).children("div").children("p").text()=="职业"){
//              if(SaveSubCategory==""){
//                  if(obj.SaveSubCategory=="undefined"){
//                      SaveSubCategory="";
//                  }else{
//                      SaveSubCategory=obj.SaveSubCategory;
//                  }
//              }
//              DATA.subCategoryCode=SaveSubCategory;
//          }
//          if($(this).children("div").children("p").text()=="级别"){
//              if(SaveCategorySub==""){
//                  if(obj.SaveCategorySub=="undefined"){
//                      SaveCategorySub="";
//                  }else{
//                      SaveCategorySub=obj.SaveCategorySub;
//                  }
//              }
//              DATA.subCategorySubCode=SaveCategorySub;
//          }
//      });
//     DATA.proId=getID;
//     DATA.type=getType;
//     console.log(DATA);
//  }

    //nactive异步交互
   function NativeCall(ele, Bridge,funName,data){
        Bridge.callHandler(funName, data, function(response) {
            dispose(ele,response);
        });
   }

  //nactive异步交互(后台数据)
   function nativeCall(ele, Bridge,funName,data){
        Bridge.callHandler(funName, data, function(response) {
            console.log("success");
        });
   }

//  //弹出框方法
// function animation(ele){
//     $(ele).css("display","block");
//      var n=-24;
//      var timer=setInterval(function(){
//          n+=0.5;
//          ele.css("bottom",n+"rem");
//          if(n==0){
//              clearInterval(timer);
//              timer=null;
//              n=0;
//          }
//      },2);
//  }
//
//  //收起弹出框方法
// function Animation(ele){
//      var n=0;
//      var timer=setInterval(function(){
//          n-=0.5;
//          ele.css("bottom",n+"rem");
//          if(n==-24){
//              $(ele).css("display","none");
//              clearInterval(timer);
//              timer=null;
//              n=0;
//          }
//      },2)
//  }

// //收起弹出框并提交方法
// function AnimaTion(ele){
//      var n=0;
//      var timer=setInterval(function(){
//          n-=0.5;
//          ele.css("bottom",n+"rem");
//          if(n==-24){
//              $(ele).css("display","none");
//              clearInterval(timer);
//              timer=null;
//              n=0;
//              acquireData();
//              console.log(DATA);
//              TOAjax('../../v1/recommends/'+transfersID+'/profile',DATA,headers);
//          }
//      },2)
//  }


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

 //判断时候弹出框
function Ispopup(ispopup,data,ele){
    if(ispopup=="Y"){
        handlePopup($("#content-submit"));
    }
    if(ispopup=="N") {
        data.commendMore="forever";
    }
}


//学历保险跳转函数
function  skipPage(ele){
    if ($(ele).html() == "补充学历信息") {
       self.location = "education.html?id=" + transfersID +"&time="+time+"";
    } else if ($(ele).html() == "补充保单信息") {
       self.location = "guarantee.html?id=" + transfersID +"&time="+time+"";
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
//弹框内容选择
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
        	TOAjax('../../v1/recommends/'+transfersID+'/profile',DATA,headers);
        });
	});
}