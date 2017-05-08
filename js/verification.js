/**
 * Created by ex-dongbo on 2017/4/17.
 */
// 验证贷款金额是否符合要求
function verifyMoney(ele) {
    var v = $(ele).val();
    if(String(v).indexOf(".") > -1) {
        $(ele).addClass("error");
        $(ele).val("");
        $(ele).attr("placeholder","金额只能为整数");
        closeButton();
    } else if(v == "" || v == '金额不能为空') {
        $(ele).addClass("error");
        $(ele).val("");
        $(ele).attr("placeholder","金额不能为空");
        closeButton();
    } else if(v.substr(0, 1) == "0") {
        $(ele).addClass("error");
        $(ele).val("");
        $(ele).attr("placeholder","金额输入有误");
    } else if(parseInt(v) > 5000) {
        $(ele).addClass("error");
        $(ele).val("");
        $(ele).attr("placeholder","数值不超过5000万");
    } else {
        $(ele).val(v);
    }
}
// 手机号验证
function verifyTelphone(ele) {
    var telphone = $(ele).val();
    if(telphone == "" || telphone == "手机号不能为空") {
        $(ele).addClass("error");
        $(ele).val("");
        $(ele).attr("placeholder","手机号不能为空");
        closeButton();
    } else if(!(/^1[34578]\d{9}$/.test(telphone))) {
        $(ele).addClass("error");
        $(ele).val("");
        $(ele).attr("placeholder","手机号输入有误");
        closeButton();
    } else {
        $(ele).val(telphone);
    }
}

//房子面积验证
function verifyHouse(ele){
    var house=$(ele).val();
    if(house==""||house=="面积不能为空"){
        $(ele).addClass("error");
        $(ele).val("");
        $(ele).attr("placeholder","面积不能为空");
        closeButton();
    }else if(house.substr(0, 1) == "0"){
        $(ele).addClass("error");
        $(ele).val("");
        $(ele).attr("placeholder","金额输入有误");
    }else{
        $(ele).val(house.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3'));
    }
}
//详细地址验证
function verifyDetailedAdd(ele){
    var detailed=$(ele).val();
    if(detailed==""||detailed=="地址不能为空"){
        $(ele).addClass("error");
        $(ele).val("");
        $(ele).attr("placeholder","地址不能为空");
        closeButton();
    }else{
        $(ele).val(detailed);
    }
}
//车牌号验证
function verifyLicenseNumber(ele){
    var  licenseNumber= $(ele).val();
    if(licenseNumber == "" || licenseNumber == "车牌号不能为空") {
        $(ele).addClass("error");
        $(ele).val("");
        $(ele).attr("placeholder","车牌号不能为空");
        closeButton();
    } else if(!(/[0-9A-Z]{5}/.test(licenseNumber))) {
        $(ele).addClass("error");
        $(ele).val("");
        $(ele).attr("placeholder","车牌号输入有误");
        closeButton();
    } else {
        $(ele).val(licenseNumber);
    }
}

//字母+数字组合，大于等于8位的密码验证
function checkPass(ele){
    var pass=$(ele).val();
    if(!(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,}$/.test(pass))){
        $(ele).val("");
        $(ele).css("height","3.3rem");
        $(ele).attr("placeholder","您输入的密码格式有误");
        $(ele).css("border","1px solid red");
    }
}
//姓名验证
function verifyName(ele){
	var val=$(ele).val();
	if(val==""){
		$(ele).addClass("error");
        $(ele).val("");
        $(ele).attr("placeholder","姓名不能为空");
        closeButton();
	}else if(!(/[\u4E00-\u9FA5]{2,5}(?:·[\u4E00-\u9FA5]{2,5})*/.test(val))){
		$(ele).addClass("error");                            
		$(ele).val("");                                      
		$(ele).attr("placeholder","姓名输入有误");                 
		closeButton();                                       
	}else{
		$(ele).val(val);
	}
}
//二维码验证
function  verifyInviteCode(ele){
	var val=$(ele).val();
	if(val==""){
		$(ele).addClass("error");
        $(ele).val("");
        $(ele).attr("placeholder","二维码不能为空");
        closeButton();
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
