window.LArea = (function() {
    var MobileArea = function() {
        this.gearArea;
        this.data;
        this.index = 0;
        this.value = [0, 0, 0];
        this.allData;
    }
    MobileArea.prototype = {
        init: function(params) {
        	console.log(params);
            this.params = params;
            this.trigger = document.querySelector(params.trigger);
            if(params.valueTo){
              this.valueTo=document.querySelector(params.valueTo);
            }
            this.keys = params.keys;
            this.type = params.type||1;
            switch (this.type) {
                case 1:
                case 2:
                    break;
                default:
                    throw new Error('错误提示: 没有这种数据源类型');
                    break;
            }
            this.allData=params.data;
            this.idx = params.idx;
            this.combine = params.combine;
            this.bindEvent(this.idx);
        },
        getData: function(callback) {
            var _self = this;
            if (typeof _self.params.data == "object") {
                _self.data = _self.params.data;
                callback();
            } else {
                var xhr = new XMLHttpRequest();
                xhr.open('get', _self.params.data);
                xhr.onload = function(e) {
                    if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 0) {
                        var responseData = JSON.parse(xhr.responseText);
                        _self.data = responseData.data;
                        if (callback) {
                            callback()
                        };
                    }
                }
                xhr.send();
            }
        },
        bindEvent: function() {
            var _self = this;
            //呼出插件
            function popupArea(e) {
            	if(this.parentElement.previousElementSibling.innerHTML=="客户类型"){
            		 sure.children[0].removeAttribute("disabled");
            		 sure.children[0].style.backgroundColor="#d3d3d3";
                	 document.getElementsByClassName("occuPation")[0].style.display="block";
            	}
            	if(this.parentElement.previousElementSibling.innerHTML=="职业"){
            		var value=this.parentElement.parentElement.previousElementSibling.children[1].children[0].innerHTML;
            		var saveData=_self.chose(this,value,_self.allData);
            		if(saveData!=undefined){
            			_self.data=saveData;
            		}	
            		document.getElementsByClassName("leveL")[0].style.display="bolck";
            		document.getElementsByClassName("leveL")[0].setAttribute("class","occuPation liline");
            	}
            	if(this.parentElement.previousElementSibling.innerHTML=="级别"){
            		var value=this.parentElement.parentElement.previousElementSibling.children[1].children[0].innerHTML;
            		var saveData=_self.chose(this,value,_self.allData);
            		if(saveData!=undefined){
            			_self.data=saveData;
            		}	
            	}
            	var idx = _self.idx;
            	_self.gearArea = document.createElement("div");
                _self.gearArea.className = "gearArea";
                var html = '<div class="area_ctrl slideInUp">' +
                    '<div class="area_btn_box">' +
                    '<div class="area_btn larea_cancel">取消</div>' +
                    '<div class="area_btn larea_finish">确定</div>' +
                    '</div>' +
                    '<div class="area_roll_mask">' +
                    '<div class="area_roll">';
                 
            	for(var i = 0; i < idx; i++) {
            		html += '<div>' + '<div class="gear ' + _self.className[i] + '" data-areatype="' + _self.className[i] + '"></div>' +
                    '<div class="area_grid">' +
                    '</div>' +
                    '</div>';
            	}
            	html +=  '</div>' + '</div>' +
                    '</div>';
                 _self.gearArea.innerHTML = html;
                document.body.appendChild(_self.gearArea);
                areaCtrlInit();
                var larea_cancel = _self.gearArea.querySelector(".larea_cancel");
                larea_cancel.addEventListener('touchstart', function(e) {
                    _self.close(e);
                });
                var larea_finish = _self.gearArea.querySelector(".larea_finish");
                larea_finish.addEventListener('touchstart', function(e) {
                    _self.finish(e);
                });
                var idx = _self.idx;
                for(var i = 0; i < idx; i++) {
                	var sdiv = _self.gearArea.querySelector("." + _self.className[i]);
                	sdiv.addEventListener('touchstart', gearTouchStart);
                	sdiv.addEventListener('touchmove', gearTouchMove);
                	sdiv.addEventListener('touchend', gearTouchEnd);
                }
            }
            //初始化插件默认值
            function areaCtrlInit() {
            	var inx = _self.idx;
            	for(var i = 0; i < inx; i++) {
            		var className = "." + _self.className[i];
            		_self.gearArea.querySelector("." + _self.className[i]).setAttribute("val", _self.value[i]);
            	}

                switch (_self.type) {
                    case 1:
                        _self.setGearTooth(_self.data);
                        break;
                    case 2:
                        _self.setGearTooth(_self.data[0]);
                        break;
                }
            }
            //触摸开始
            function gearTouchStart(e) {
                e.preventDefault();
                var target = e.target;
                while (true) {
                    if (!target.classList.contains("gear")) {
                        target = target.parentElement;
                    } else {
                        break
                    }
                }
                clearInterval(target["int_" + target.id]);
                target["old_" + target.id] = e.targetTouches[0].screenY;
                target["o_t_" + target.id] = (new Date()).getTime();
                var top = target.getAttribute('top');
                if (top) {
                    target["o_d_" + target.id] = parseFloat(top.replace(/em/g, ""));
                } else {
                    target["o_d_" + target.id] = 0;
                }
                target.style.webkitTransitionDuration = target.style.transitionDuration = '0ms';
            }
            //手指移动
            function gearTouchMove(e) {
                e.preventDefault();
                var target = e.target;
                while (true) {
                    if (!target.classList.contains("gear")) {
                        target = target.parentElement;
                    } else {
                        break
                    }
                }
                target["new_" + target.id] = e.targetTouches[0].screenY;
                target["n_t_" + target.id] = (new Date()).getTime();
                var f = (target["new_" + target.id] - target["old_" + target.id]) * 30 / window.innerHeight;
                target["pos_" + target.id] = target["o_d_" + target.id] + f;
                target.style["-webkit-transform"] = 'translate3d(0,' + target["pos_" + target.id] + 'em,0)';
                target.setAttribute('top', target["pos_" + target.id] + 'em');
                if(e.targetTouches[0].screenY<1){
                    gearTouchEnd(e);
                };
            }
            //离开屏幕
            function gearTouchEnd(e) {
                e.preventDefault();
                var target = e.target;
                while (true) {
                    if (!target.classList.contains("gear")) {
                        target = target.parentElement;
                    } else {
                        break;
                    }
                }
                var flag = (target["new_" + target.id] - target["old_" + target.id]) / (target["n_t_" + target.id] - target["o_t_" + target.id]);
                if (Math.abs(flag) <= 0.2) {
                    target["spd_" + target.id] = (flag < 0 ? -0.08 : 0.08);
                } else {
                    if (Math.abs(flag) <= 0.5) {
                        target["spd_" + target.id] = (flag < 0 ? -0.16 : 0.16);
                    } else {
                        target["spd_" + target.id] = flag / 2;
                    }
                }
                if (!target["pos_" + target.id]) {
                    target["pos_" + target.id] = 0;
                }
                rollGear(target);
            }
            //缓动效果
            function rollGear(target) {
                var d = 0;
                var stopGear = false;
                function setDuration() {
                    target.style.webkitTransitionDuration = target.style.transitionDuration = '200ms';
                    stopGear = true;
                }
                clearInterval(target["int_" + target.id]);
                target["int_" + target.id] = setInterval(function() {
                    var pos = target["pos_" + target.id];
                    var speed = target["spd_" + target.id] * Math.exp(-0.03 * d);
                    pos += speed;
                    if (Math.abs(speed) > 0.1) {} else {
                        var b = Math.round(pos / 2) * 2;
                        pos = b;
                        setDuration();
                    }
                    if (pos > 0) {
                        pos = 0;
                        setDuration();
                    }
                    var minTop = -(target.dataset.len - 1) * 2;
                    if (pos < minTop) {
                        pos = minTop;
                        setDuration();
                    }
                    if (stopGear) {
                        var gearVal = Math.abs(pos) / 2;
                        setGear(target, gearVal);
                        clearInterval(target["int_" + target.id]);
                    }
                    target["pos_" + target.id] = pos;
                    target.style["-webkit-transform"] = 'translate3d(0,' + pos + 'em,0)';
                    target.setAttribute('top', pos + 'em');
                    d++;
                }, 30);
            }
            //控制插件滚动后停留的值
            function setGear(target, val) {
                val = Math.round(val);
                target.setAttribute("val", val);
                switch (_self.type) {
                    case 1:
                         _self.setGearTooth(_self.data);
                        break;
                    case 2:
                     switch(target.dataset['areatype']){
                         case 'area_province':
                         _self.setGearTooth(_self.data[0]);
                             break;
                         case 'area_city':
                             var ref = target.childNodes[val].getAttribute('ref');
                             var childData=[];
                             var nextData= _self.data[2];
                             for (var i in nextData) {
                                 if(i==ref){
                                    childData = nextData[i];
                                    break;
                                 }
                             };
                        _self.index=2;
                        _self.setGearTooth(childData);
                             break;
                     }
                }
                
            }
            _self.getData(function() {
                _self.trigger.addEventListener('click', popupArea);
            });
        },
        //重置节点个数
        setGearTooth: function(data) {
            var _self = this;
            var item = data || [];
            var l = item.length;
            var gearChild = _self.gearArea.querySelectorAll(".gear");
            var gearVal = gearChild[_self.index].getAttribute('val');
            var maxVal = l - 1;
            if (gearVal > maxVal) {
                gearVal = maxVal;
            }
            gearChild[_self.index].setAttribute('data-len', l);
            if (l > 0) {
                var id = item[gearVal][this.keys['id']];
                var childData;
                switch (_self.type) {
                    case 1:
                    childData = item[gearVal].child
                        break;
                    case 2:
                     var nextData= _self.data[_self.index+1] 
                     for (var i in nextData) {
                         if(i==id){
                            childData = nextData[i];
                            break;
                         }
                     };
                        break;
                }
                var itemStr = "";
                for (var i = 0; i < l; i++) {
                    itemStr += "<div class='tooth'  ref='" + item[i][this.keys['code']] + "'>" + item[i][this.keys['name']] + "</div>";
                }
                gearChild[_self.index].innerHTML = itemStr;
                gearChild[_self.index].style["-webkit-transform"] = 'translate3d(0,' + (-gearVal * 2) + 'em,0)';
                gearChild[_self.index].setAttribute('top', -gearVal * 2 + 'em');
                gearChild[_self.index].setAttribute('val', gearVal);
                _self.index++;
                if (_self.index > (_self.idx - 1)) {
                    _self.index = 0;
                    return;
                }
                _self.setGearTooth(childData);
            } else {
                gearChild[_self.index].innerHTML = "<div class='tooth'></div>";
                gearChild[_self.index].setAttribute('val', 0);
//              if(_self.index==1){
//                  gearChild[2].innerHTML = "<div class='tooth'></div>";
//                  gearChild[2].setAttribute('val', 0);
//              }
                _self.index = 0;
            }
        },
        finish: function(e) {
            var _self = this;
            var combine = _self.combine;
            _self.trigger.value = "";
            _self.trigger.innerText = "";
            for(var i = 0; i < _self.idx; i++) {
            	var classname = _self.gearArea.querySelector("." + _self.className[i]);
            	var sVal = parseInt(classname.getAttribute("val")); 
            	var sText = classname.childNodes[sVal].textContent;
            	var sCode = classname.childNodes[sVal].getAttribute('ref');
            	if(combine) {
            		_self.trigger.innerText += sText;
            	} else {
            		_self.trigger.innerText = sText;
            	}
            	_self.trigger.value += sText;
            	_self.trigger.setAttribute("data-code", sCode);
	            if(this.valueTo){
	                this.valueTo.value= sText;
	            }
//	            _self.chose(_self.trigger,sText,_self.data);
            }
            _self.value = [0, 0, 0];
            _self.close(e,sText);
        },
        chose:function(trigger,value,data){
        	for(var i=0;i<data.length;i++){
            	if(data[i].name==value){
                	if(data[i].children){
                		var SaveData=[];
                		trigger.parentElement.parentElement.nextElementSibling.style.display="block";
                		trigger.parentElement.parentElement.nextElementSibling.children[1].children[0].innerHTML="请选择";
                    	for(var c=0;c<data[i].children.length;c++){
                        	var obj={};
                        	obj.name=data[i].children[c].name;
                        	obj.code=data[i].children[c].code;
                        	if(data[i].children[c].children){
                        		obj.children=data[i].children[c].children;
                        	}
                        	SaveData.push(obj);
                    	}
	                 	return SaveData;
 	             	}
            	} 
            	if(data[i].children){
                	for(var c=0;c<data[i].children.length;c++){
                    	if(data[i].children[c].name==value){
                        	if(data[i].children[c].children){
                     			var SaveData=[];
                           		for(var l=0;l<data[i].children[c].children.length;l++){
                                	var obj={};
                                	obj.name=data[i].children[c].children[l].name;
                               	 	obj.code=data[i].children[c].children[l].code;
                                	SaveData.push(obj);
                            	}
                           		return SaveData;
                        	}
                    	}
                	}
            	}
        	}
        },
        verifyShow:function(text){
        	if(text=="企业主"){
        		document.getElementsByClassName("occuPation")[0].style.display="none";
 	            occupation.innerHTML="请选择";
 	            document.getElementsByClassName("leveL")[0].style.display="none";
 	            level.innerHTML="请选择";
        	}else{
        		document.getElementsByClassName("occuPation")[0].style.display="block";
        	}
        	if(text=="标准受薪"){
        		document.getElementsByClassName("leveL")[0].style.display="none";
 	            level.innerHTML="请选择";
        	}else{
        		document.getElementsByClassName("leveL")[0].style.display="bolck";
        	}
        },
        close: function(e,sText) {
            e.preventDefault();
            var _self = this;
            var evt = new CustomEvent('input');
            _self.trigger.dispatchEvent(evt);
            document.body.removeChild(_self.gearArea);
            _self.verifyShow(sText);
            _self.gearArea=null;
        } 
    }
    return MobileArea;
})();