function ccBoxMes(objname,num,str){
	var obj = document.getElementsByName(objname);
	var len = 0;
	for(var i=0;i<obj.length;i++){
		if(obj[i].checked==true){len=len+1;}
	}
	switch(num){
		case 0:if(len<=1){return true;}else{
		$.messager.alert("提示",'至多选择一条记录！', 'warning');
		return false;}
		case 'n':if(len>=1){return true;}else{
			$.messager.alert("提示",'至少选择一条记录！', 'warning');
		return false;}
		case 1:if(len==1){return true;}else{
			$.messager.alert("提示",'选择一条记录！', 'warning');return false;}
	}
}

function commonOp(url){
	jQuery("form:first").attr("action",url);
	jQuery("form:first").submit();
}

function commonClear(){
	jQuery("form:first")[0].reset();
	
}

function selectOper(checkIdName,oper,allOrNo){
	if(oper=='all'){
		selectAll(checkIdName);
	}
	if(oper=='no'){
		selectNo(checkIdName);
	}
	if(oper=='reverse'){
		selectReverse(checkIdName);
	}
	if(oper=='an'){
		if(allOrNo.checked){
			
			selectAll(checkIdName);
		}else{
			selectNo(checkIdName);
		}
	}
		
}
function selectAll(checkIdName){
	jQuery("input[name="+checkIdName+"]").each(function() {  
		jQuery(this).attr("checked", true);  
	 });  
}
function selectNo(checkIdName){
	jQuery("input[name="+checkIdName+"]").each(function() {  
		jQuery(this).attr("checked", false);  
	 });  
}
function selectReverse(checkIdName){
	jQuery("input[name="+checkIdName+"]").each(function() {  
		if(jQuery(this).attr("checked"))  
		{  
			jQuery(this).attr("checked", false);  
		 }  
		 else  
		 {  
			 jQuery(this).attr("checked", true);  
		 }  
		 });  
}



