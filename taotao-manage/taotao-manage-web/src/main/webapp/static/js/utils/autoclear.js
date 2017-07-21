/*
author:Jing Hao Ran
updateTime:2013-7-9 14:25:47
content:自动清空表单默认值

*/
function defalutClear(){
	var inp = document.getElementsByTagName('input');
	for(var i=0; i< inp.length; i++){
		
		if(inp[i].type == 'text' && inp[i].className==''){
			inp[i].setAttribute('rel',inp[i].defaultValue);
			if(inp[i].value == inp[i].getAttribute('rel')){
				inp[i].value = ' ';
			}
		}
	}
	return inp;
}

function addClass(id){	
	if(id.defaultValue=='街/路' || id.defaultValue=='详细街道地址' || id.value=='市'
		|| id.value=='区/县' || id.value=='省/直辖市')  //默认值样式控制，好的解决办法暂时搁置
		return $(id).css({"color":"#797979","font-family":"Arial"});
	else
		return $(id).css({"color":"#000","font-family":"Arial"});
}

function init(){
	var inp = document.getElementsByTagName('input');
	for(var i = 0; i < inp.length; i++) {
		if(inp[i].type == 'text' && inp[i].className!='Wdate') { //排除时间控件input 文本框
			inp[i].setAttribute('rel',inp[i].defaultValue);
			addClass(inp[i]);
			inp[i].onfocus = function() {
				if(this.value == this.getAttribute('rel')) {
					this.value = '';
				} else {
					return false;
				}
			}
			inp[i].onblur = function() {
				if(this.value == '') {
					this.value = this.getAttribute('rel');
				} else {
					return false;
				}
			}
			inp[i].ondblclick = function() {
				this.value = this.getAttribute('rel')
			}
		}
	}
}
if(document.childNodes) {
	window.onload = init
}