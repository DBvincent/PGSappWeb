/**Created by ex-dongbo on 2017/4/17.**/
var totalVerify={
	"verifyMoney":function(ele){// 验证贷款金额是否符合要求
		var v = $(ele).val();
   		if(String(v).indexOf(".") > -1) {
        	$(ele).addClass("error");
        	$(ele).val("");
        	$(ele).attr("placeholder","金额只能为整数");
        	this.closeButton();
   		}else if(v == "" || v == '金额不能为空') {
        	$(ele).addClass("error");
       	 	$(ele).val("");
        	$(ele).attr("placeholder","金额不能为空");
        	this.closeButton();
    	}else if(v.substr(0, 1) == "0") {
        	$(ele).addClass("error");
        	$(ele).val("");
        	$(ele).attr("placeholder","金额输入有误");
        	this.closeButton();
    	}else if(parseInt(v) > 5000) {
        	$(ele).addClass("error");
        	$(ele).val("");
        	$(ele).attr("placeholder","不能超过5000万");
        	this.closeButton();
    	}else{
        	$(ele).val(v);
    	}
	},
	"premiumMoney":function(ele){
		var v = $(ele).val();
   		if(String(v).indexOf(".") > -1) {
        	$(ele).addClass("error");
        	$(ele).val("");
        	$(ele).attr("placeholder","金额只能为整数");
        	this.closeButton();
   		}else if(v == "" || v == '金额不能为空') {
        	$(ele).addClass("error");
       	 	$(ele).val("");
        	$(ele).attr("placeholder","金额不能为空");
        	this.closeButton();
    	}else if(v.substr(0, 1) == "0") {
        	$(ele).addClass("error");
        	$(ele).val("");
        	$(ele).attr("placeholder","金额输入有误");
        	this.closeButton();
    	}else{
        	$(ele).val(v);
    	}
	},
	"verifyTelphone":function(ele){// 手机号验证
		var telphone = $(ele).val();
    	if(telphone == "" || telphone == "手机号不能为空") {
        	$(ele).addClass("error");
        	$(ele).val("");
        	$(ele).attr("placeholder","手机号不能为空");
        	this.closeButton();
    	}else if(!(/^1[34578]\d{9}$/.test(telphone))) {
        	$(ele).addClass("error");
        	$(ele).val("");
       	 	$(ele).attr("placeholder","手机号输入有误");
        	this.closeButton();
    	}else {
        	$(ele).val(telphone);
    	}
	},
	"verifyHouse":function(ele){//房子面积验证
		var house=$(ele).val();
    	if(house==""||house=="面积不能为空"){
        	$(ele).addClass("error");
        	$(ele).val("");
        	$(ele).attr("placeholder","面积不能为空");
        	this.closeButton();
    	}else if(house.substr(0, 1) == "0"){
        	$(ele).addClass("error");
        	$(ele).val("");
        	$(ele).attr("placeholder","金额输入有误");
        	this.closeButton();
    	}else{
        	$(ele).val(house.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3'));
    	}
	},
	"verifyDetailedAdd":function(ele){//详细地址验证
		var detailed=$(ele).val();
    	if(detailed==""||detailed=="地址不能为空"){
        	$(ele).addClass("error");
        	$(ele).val("");
        	$(ele).attr("placeholder","地址不能为空");
        	this.closeButton();
    	}else{
        	$(ele).val(detailed);
    	}
	},
	"verifyLicenseNumber":function(ele){//车牌号验证
		var  licenseNumber= $(ele).val();
    	if(licenseNumber == "" || licenseNumber == "车牌号不能为空") {
        	$(ele).addClass("error");
        	$(ele).val("");
        	$(ele).attr("placeholder","车牌号不能为空");
        	this.closeButton();
    	}else if(!(/[0-9A-Z]{5}/.test(licenseNumber))) {
        	$(ele).addClass("error");
       	 	$(ele).val("");
        	$(ele).attr("placeholder","车牌号输入有误");
        	this.closeButton();
    	}else {
        	$(ele).val(licenseNumber);
    	}
	},
	"checkPass":function(ele){//字母+数字组合，大于等于8位的密码验证
		var pass=$(ele).val();
    	if(!(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,}$/.test(pass))){
        	$(ele).val("");
        	$(ele).css("height","3.3rem");
        	$(ele).attr("placeholder","您输入的密码格式有误");
        	$(ele).css("border","1px solid red");
    	}
	},
	"verifyName":function(ele){//姓名验证
		var val=$(ele).val();
		if(val==""){
			$(ele).addClass("error");
        	$(ele).val("");
        	$(ele).attr("placeholder","姓名不能为空");
        	this.closeButton();
		}else if(!(/[\u4E00-\u9FA5]{2,5}(?:·[\u4E00-\u9FA5]{2,5})*/.test(val))){
			$(ele).addClass("error");                            
			$(ele).val("");                                      
			$(ele).attr("placeholder","姓名输入有误");                 
			this.closeButton();                                     
		}else{
			$(ele).val(val);
		}
	},
	"verifyInviteCode":function(ele){//二维码验证
		var val=$(ele).val();
		if(val==""){
			$(ele).addClass("error");
        	$(ele).val("");
        	$(ele).attr("placeholder","二维码不能为空");
        	this.closeButton();
		}
	},
	"verifyIdCode":function(ele){//身份证验证
		var val=$(ele).val();
		if(val==""){
			$(ele).addClass("error");
        	$(ele).val("");
        	$(ele).attr("placeholder","身份证不能为空");
        	this.closeButton();
		}else if(!(/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(val))){
			$(ele).addClass("error");                            
			$(ele).val("");                                      
			$(ele).attr("placeholder","身份证输入有误");                 
			this.closeButton();                                      
		}else{
			$(ele).val(val);
		}
	},
	"verifyBankNumber":function(ele){//银行卡号验证
		var val=$(ele).val();
		if(val==""){
			$(ele).addClass("error");
        	$(ele).val("");
        	$(ele).attr("placeholder","银行卡不能为空");
        	this.closeButton();
		}else if(!(/^(\d{16}|\d{19})$/.test(val))){
			$(ele).addClass("error");                            
			$(ele).val("");                                      
			$(ele).attr("placeholder","银行卡输入有误");                 
			this.closeButton();                                      
		}else{
			$(ele).val(val);
		}
	},
	"verifyHtml":function(ele){
		if($(ele).attr("display")!="none"){
			var val=$(ele).html();
			if(val=="请选择"){
				$(ele).html($(ele).parent().prev("p").html()+"不能为空");
				$(ele).css("color","#ef6762");
				this.closeButton();
			}
		}else{
			$(ele).css("color","#666666");
		}
	},
	"init":function(ele){
		var val=$(ele).attr("data-verify");
		switch(val){
			case "verifyMoney":
				this.verifyMoney($(ele));
				break;
			case "premiumMoney":
				this.premiumMoney($(ele));
				break;
			case "verifyTelphone":
				this.verifyTelphone($(ele));
				break;
			case "verifyHouse":
				this.verifyHouse($(ele));
				break;
			case "verifyDetailedAdd":
				this.verifyDetailedAdd($(ele));
				break;
			case "verifyLicenseNumber":
				this.verifyLicenseNumber($(ele));
				break;
			case "checkPass":
				this.checkPass($(ele));
				break;
			case "verifyName":
				this.verifyName($(ele));
				break;	
			case "verifyInviteCode":
				this.verifyInviteCode($(ele));
				break;
			case "verifyIdCode":
				this.verifyIdCode($(ele));
				break;	
			case "verifyBankNumber":
				this.verifyBankNumber($(ele));
				break;	
		}
	},
	"closeButton":function(){// 锁按钮函数
		$("#sure button").attr("disabled","disabled");
    	$("#sure button").css("background","#d3d3d3");
	},
	"openButton":function(){
		$("#sure button").removeAttr("disabled");
    	$("#sure button").css("background","#fec43f");
	}
}

