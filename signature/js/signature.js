$(function(){ 
    $("#signature").jqSignature({ width:$(window).width()*0.9, height: $(window).height(), border: '1px solid tranparent', background: '#ffffff', lineColor: '#000000', lineWidth: 3, autoFit: false });
    clickView(); 
});

//点击处理
function clickView(){
	$("#sure button").click(function(){
		switch($(this).html()){
			case "确认":
					var IMG=canvasConversionImage();
					save(IMG);
					self.location="signatureAgreement.html";
					break;
			case "清屏":
					$("#signature").jqSignature('clearCanvas');
				    break;
			case "取消":
					$("#signature").jqSignature('clearCanvas');
					self.location="signatureAgreement.html";
					break;
		}
	});
}
//canvas转化成图片函数
function canvasConversionImage(){
	console.log($("#signature canvas"));
	return  $("#signature canvas")[0].toDataURL("image/png");
}
//客户信息写入方法
function save(img){
    localStorage.setItem("image",img);
} 