var nowid;
var totalid;
var can1press = false;
var emailafter;
var emailbefor;
var scrolltop;
var pos;
var count = 0;
function emails(id, bodyid) {
    $("#"+id).focus(function(){ //文本框获得焦点，插入Email提示层
    	$("#myemail").remove();
    	//定位
        pos = new getPos(this);
        //滚动条滚动的高度
        scrolltop = document.getElementById(bodyid).scrollTop;
        $(this).after("<div id='myemail' style='width:150px; height:auto; background:#fff; color:#6B6B6B; position:absolute; left:"+pos.Left+"px; top:"+(pos.Top+$("#"+id).height()-(scrolltop)+2)+"px; border:1px solid #ccc;z-index:5px; '></div>");
        if($("#myemail").html()){
             $("#myemail").css("display","block");
             $(".newemail").css("width",$("#myemail").width());
             can1press = true;
        } else {
             $("#myemail").css("display","none");
             can1press = false;
        }		
    }).keyup(function(){ //文本框输入文字时，显示Email提示层和常用Email
		var press = $("#"+id).val();	//文本框的值
		if (press!="" || press!=null){
			var emailtxt = "";	
			//常用邮箱数组
			var emailvar = new Array("@qq.com","@163.com","@126.com","@yahoo.com","@sina.com","@gmail.com","@hotmail.com","@foxmail.com");
			totalid = emailvar.length;
			//自己填写的连带出来
			//var emailmy = "<div class='newemail' style='width:150px; color:#6B6B6B; overflow:hidden;'><font color='#D33022'>" + press + "</font></div>";
			if(!(isEmail(press))){
			    for(var i=0; i<emailvar.length; i++) {
				    emailtxt = emailtxt + "<div class='newemail' style='width:150px; color:#6B6B6B; overflow:hidden;'><font color='#D33022'>" + press + "</font>" + emailvar[i] + "</div>"
			    }
			} else {
			    emailbefor = press.split("@")[0];
			    emailafter = "@" + press.split("@")[1];
			    for(var i=0; i<emailvar.length; i++) {
			         var theemail = emailvar[i];
			         if(theemail.indexOf(emailafter) == 0)
			         {
				         emailtxt = emailtxt + "<div class='newemail' style='width:150px; color:#6B6B6B; overflow:hidden;'><font color='#D33022'>" + emailbefor + "</font>" + emailvar[i] + "</div>"
				     }
			    }
			}
			$("#myemail").html(emailtxt);
			if($("#myemail").html()){
				 $("#myemail").css("display","block");
				 $(".newemail").css("width",$("#myemail").width());
				 can1press = true;
			} else {
				 $("#myemail").css("display","none");
				 can1press = false;
			}
		}
		if (press=="" || press==null){
			$("#myemail").html("");		
			$("#myemail").css("display","none");    
		}	
    })
	$(document).click(function(){ //文本框失焦时删除层
        if(can1press){
			$("#myemail").remove();
			can1press = false;	
			if($("#"+id).focus()){
			    can1press = false;
			}
		}
    })
    $(".newemail").live("mouseover",function(){ //鼠标经过提示Email时，高亮该条Email
        $(".newemail").css("background","#FFF");
        $(this).css("background","#CACACA");
		$(this).focus();
		nowid = $(this).index();
    }).live("click",function(){ //鼠标点击Email时，文本框内容替换成该条Email，并删除提示层
    	var newhtml = $(this).html();
        newhtml = newhtml.replace(/<.*?>/g,"");
        $("#"+id).val(newhtml); 
        $("#myemail").remove();
    })
    if (count == 0) {
    	$(document).bind("keyup",function(e) {
    		if(can1press){
    			switch(e.which) {
    				case 38:	//上移
    				if (nowid > 0){		
    					$(".newemail").css("background","#FFF");
    					$(".newemail").eq(nowid).prev().css("background","#CACACA").focus();
    					nowid = nowid-1;		
    				}
    				if(!nowid){
    					nowid = 0;
    					$(".newemail").css("background","#FFF");
    					$(".newemail").eq(nowid).css("background","#CACACA");		
    					$(".newemail").eq(nowid).focus();				
    				}
    				break;
    		
    				case 40:	//下移
    				if (nowid < (totalid-1)){				
    					$(".newemail").css("background","#FFF");
    					$(".newemail").eq(nowid).next().css("background","#CACACA").focus();
    					nowid = nowid+1;			
    				}
    				if(!nowid){
    					nowid = 0;
    					$(".newemail").css("background","#FFF");
    					$(".newemail").eq(nowid).css("background","#CACACA");		
    					$(".newemail").eq(nowid).focus();				
    				}
    				break;  
    		
    				case 13:
    				var newhtml = $(".newemail").eq(nowid).html();
    				newhtml = newhtml.replace(/<.*?>/g,"");
    				$("#"+id).val(newhtml); 
    				$("#myemail").remove();
    				break;
    			}
    		}   
    	})
    }
    count++;
	//滚动事件
	document.getElementById(bodyid).onscroll = function() {
		$("#myemail").css("top", pos.Top+$("#"+id).height()-(document.getElementById(bodyid).scrollTop)+8);
	}
}
//检查email邮箱
function isEmail(str){
    if(str.indexOf("@") > 0) {
        return true;
    } else {
        return false;
    }
}
