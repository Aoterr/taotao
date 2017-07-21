var modificationItem = {};
var products;
var deductComId;
var dataOrigin;
var superFlag=0;
var baseVersion = "016";
//初始化变更明细表头信息
function initModificationDetailTitle(id) {
	$('#' + id).datagrid({
		columns:[[   
	        {field:'field',title:'信息项名', align:'center',width:200,formatter : function(value,rec){return value.fdFieldCn;}},   
	        {field:'mlFieldOldValue',title:'原值', align:'center',width:150,hidden:true},   
	        {field:'mlFieldOldText',title:'原值', align:'center',width:150,formatter:formatOldFieldText}, 
	        {field:'mlFieldNewValue',title:'新值', align:'center',width:150,hidden:true}, 
	        {field:'mlFieldNewText',title:'新值', align:'center',width:150}, 
	        {field:'opt',title:'操作', align:'center',width:100,formatter : function(value,rec,rowIndex){return '<a href="javascript:void(0)"  onclick="remove('+ rowIndex+')">删除</span>';}}  
	    ]]   
	}); 
}

//加载变更信息
function loadModificationDetailData(id,label) {
	$("#" + label).datagrid({  
		url: getContextPath() + '/modification/ModificationDetail/find/all?id=' + id,
	    columns:[[   
	        {field:'field',title:'信息项名', align:'center',width:200,formatter : function(value,rec){return value ? value.fdFieldCn : '';}},   
	        {field:'mlFieldOldValue',title:'原值', align:'center',width:150,hidden:true},   
	        {field:'mlFieldOldText',title:'原值', align:'center',width:250,formatter:formatOldFieldText}, 
	        {field:'mlFieldNewValue',title:'新值', align:'center',width:150,hidden:true}, 
	        {field:'mlFieldNewText',title:'新值', align:'center',width:250,formatter : formatNewFieldText},
	        {field:'opt',title:'操作', align:'center',width:100,formatter : function(value,rec,rowIndex){return '<a href="javascript:void(0)"  onclick="remove('+ rowIndex+')">删除</span>';}}
	    ]]   
	}); 
}

//加载变更信息
function loadModificationDetailData1(id,label) {
	$("#" + label).datagrid({  
		url: getContextPath() + '/modification/ModificationDetail/find/all?id=' + id,
	    columns:[[   
	        {field:'field',title:'信息项名', align:'center',width:200,formatter : function(value,rec){return value ? value.fdFieldCn : '';}},   
	        {field:'mlFieldOldValue',title:'原值', align:'center',width:150,hidden:true},   
	        {field:'mlFieldOldText',title:'原值', align:'center',width:250,formatter:formatOldFieldText}, 
	        {field:'mlFieldNewValue',title:'新值', align:'center',width:150,hidden:true}, 
	        {field:'mlFieldNewText',title:'新值', align:'center',width:250,formatter : formatNewFieldText}
	    ]]   
	}); 
}

//查找理财信息 一般变更查询
function search(value,name) {
	findFinanceByFeLendNoEx_MX(value,function(rowIndex, rowData){
		searchLoad(rowData);
	},function(data){
		if(data.total == 0){
			$.messager.show({title: '提示',msg: "没有查询到客户信息!"})
			return;
		}
		if(data.total!=1)
			$('#dd').dialog('open');
		else
			searchLoad(data.rows[0]);
	});
}

//查找理财信息  高级变更
function searchNew(value,name) {
	findFinanceByFeLendNoNew(value,function(rowIndex, rowData){
		searchLoadNew(rowData);
	},function(data){
		if(data.total == 0){
			$.messager.show({title: '提示',msg: "没有查询到客户信息!"})
			return;
		}
		if(data.total!=1)
			$('#dd').dialog('open');
		else
			searchLoadNew(data.rows[0]);
	});
}

//根据出借编号查找理财信息(去除APP订单)
function findFinanceByFeLendNoNew(feLendNo, Callback,onLoadSuccess) {
	var url = getContextPath() + "/product/purchase/find/feLendNoWithoutApp?feLendNo=" + feLendNo
	findFinance(url, Callback,onLoadSuccess);
}

//一般查询
function searchLoad(rowData){
	//判断是否鸿金宝业务 
	if(rowData.feProduct == '101'){
		alert("鸿金宝业务暂时不提供变更功能!");
		return;
	}
//	if(rowData.feProduct == '9'||rowData.feProduct == '10'){
//		alert("证大岁悦+或者证大双鑫+业务暂时不提供变更功能!");
//		return;
//	}
	//判断是否只存在多笔未提交的变更单
	var flag = unSubmitModificationSl(rowData.id,'2');
	if(flag == 'true'){
		alert("当前业务已经存在未提交的变更单,请先处理!");
	}else{
		loadCustomerInfo(rowData);//加载客户信息
		if(rowData.feProduct == '109' && rowData.fePreviousId != null){//福享产品的续投
			loadFinanceModificationItemNewFx('modificationItem');//排除合同编号+理财产品
		}else
			loadFinanceModificationItemNew('modificationItem');//排除合同编号
		$('#dd').dialog('close');
	}
}

//加载客户相关信息,用于显示
function loadCustomerInfo(finance) {
	setVal('mnSourceId',finance.id);
	postAjax(false, getContextPath() + "/crm/customer/customerById?id=" + finance.customerid, function(data) {
		setElementValues(['name', 'idnum', 'number','customerManager'],[data.crName, data.crIdnum, data.crCustomerNumber,getStaffName(data.crGather)]);
	}, 'json');
	setVal('feLendNo',finance.feLendNo);
	setVal('tempVar',finance.customerid);
	products =finance.feProduct;
	deductComId = finance.feDeductCompany;
	dataOrigin =finance.feDataOrigin;
}

//加载理财变更项  排除合同编号  一般变更
function loadFinanceModificationItemNew(id) {
	comboboxUtil.setComboboxByUrl(id, getContextPath() + "/modification/find/field/item/by/tableNew?fdTable=finance", 'id', 'fdFieldCn', '150', true,function(rec){ 
		loadModificationItemValue(rec);
	});
	
}

//加载理财变更项  +合同编号  高级查询
function loadFinanceModificationItem(id) {
	comboboxUtil.setComboboxByUrl(id, getContextPath() + "/modification/find/field/item/by/table?fdTable=finance", 'id', 'fdFieldCn', '150', true,function(rec){ 
		loadModificationItemValue(rec);
	});
}

//加载理财变更项  +合同编号  排除理财产品  高级查询
function loadFinanceModificationItemFx(id){
	comboboxUtil.setComboboxByUrl(id, getContextPath() + "/modification/find/field/item/by/tableFx?fdTable=finance", 'id', 'fdFieldCn', '150', true,function(rec){ 
		loadModificationItemValue(rec);
	});
}

//加载理财变更项  排除合同编号  排除理财产品  一般变更  
function loadFinanceModificationItemNewFx(id){
	comboboxUtil.setComboboxByUrl(id, getContextPath() + "/modification/find/field/item/by/tableNewFx?fdTable=finance", 'id', 'fdFieldCn', '150', true,function(rec){ 
		loadModificationItemValue(rec);
	});
}

//加载变更项的原始值
function loadModificationItemValue(rec) {
	modificationItem.field = rec;
	postAjax(false, getContextPath() + "/crm/fieldform?fieldId=" + rec.id + "&objectId=" + getVal('mnSourceId'), function(data) {$("#formId").html(data);})
	var temp = getItemValueAndText(modificationItem.field);
	modificationItem.mlFieldOldValue = temp.value;
	modificationItem.mlFieldOldText = temp.text;
    if(rec.fdFieldEn=='fePaymentWay'&&temp.value=="2"){
    	loadPayMentWay(temp.value);
    	$("#feDeductCompanyBox"+(deductComId-1)).attr("checked",'true');
    }
}

//月稳盈合同编号
var feContractNoCheck3 = function (value) {//16位以ZDLD开头
	return /^ZDLD\d{12}$/.test(value);
}

//验证货里淘金（车贷）理财合同的规则
var feContractNoCheck2 = function (value) {//16位以ZDLC开头
	return trim(value).length == 16 && value.substring(0,4) == 'ZDLC' && isNumber(value.substring(4,value.length));
}

//验证PLUS理财合同的规则
var feContractNoCheck4 = function (value) {//16位以ZDLP开头
	return trim(value).length == 16 && value.substring(0,4) == 'ZDLP' && isNumber(value.substring(4,value.length));
}

//验证APP理财合同的规则
var crApplicationNoCheck = function (value) {//12位以ZDA开头
	
	return trim(value).length == 12 && value.substring(0,3) == 'ZDA' && isNumber(value.substring(3,value.length));
}

//1.验证理财合同的规则
var feContractNoCheck = function (value) {//16位以ZDL开头
	return trim(value).length == 16 && value.substring(0,3) == 'ZDL' && isNumber(value.substring(3,value.length));
}

//2.验证理财合同的唯一
var feContractNoUnique = function (value) {
	var list;
	postAjax(false, getContextPath() + "/finance/mx/find/feContractNo?feContractNo=" + value, function(data) { list = data}, 'json');
	if(list.length>=1){//有重复合同编号
		return false;
	}
	return true;
}

//3.判断合同编号是否重复
function checkContractNo1(rec1,rec2){
	//不同客户无论同、不同理财产品合同编号也不能重复
	var list1;
	postAjax(false, getContextPath() + "/finance/mx/find/query2?feContractNo=" + rec1+"&customerid="+rec2, function(data) { list1 = data;}, 'json');
	if(list1.length>=1){//有重复合同编号
		return false;
	}
	return true;
}

//4.判断合同编号是否重复
function checkContractNo2(rec1,rec2,rec3,rec4){
	//同客户同理财产品合同编号也不能重复
	var list2;
	postAjax(false, getContextPath() + "/finance/mx/find/query1?feContractNo=" + rec1+"&feProduct="+rec2+"&customerid="+rec3+"&id="+rec4, function(data) { list2 = data;}, 'json');
	if(list2.length>=1){//有重复合同编号
		return false;
	}
	return true;
}
//添加变更项 type:1-普通 0-高级
function add(type){
	if($("detailForm").form('validate')) {
		
		var feLendNo=$('#feLendNo').val();
		var busiFinance;
		postAjax(false, getContextPath() + "/finance/mx/find/feLendNoNew?feLendNo=" + feLendNo, function(data) { busiFinance = data;}, 'json');
		var financeId=busiFinance.id;
		var feProduct=busiFinance.feProduct;//理财产品
		var customerid=busiFinance.customerid;
		
		//若变更合同编号，判断是否合同编号重复
		var temp1 = getItemValueAndText(modificationItem.field);//获得修改的合同编号
		if(modificationItem.field.fdFieldEn=='feContractNo'){
			//合同编号校验
			//若原产品是9/10 PLUS
			if(products=='9'||products=='10'){
				if(feContractNoCheck4(temp1.value)){
					
				}else{
					alert("请输入正确的PLUS理财产品的合同编号(如:ZDLP201401300001)！");
					return;
				}
			}else{//其他产品合同编号验证规则
				if(feContractNoCheck(temp1.value)||crApplicationNoCheck(temp1.value)||feContractNoCheck2(temp1.value)||feContractNoCheck3(temp1.value)){//有效性
			  
				}else{//若没有一个满足，
					alert("请输入正确的理财合同编号！");
					return;
				}
			}
			//判断是否重复
			if((!checkContractNo2(temp1.value,feProduct,customerid,financeId))||(!checkContractNo1(temp1.value,customerid))){//唯一性
						alert("合同编号重复!");
						return;
				}
		}
	
		// 证大岁悦+或者证大双鑫+业务只允许互相变更 
		var temp2 = getItemValueAndText(modificationItem.field);//获得修改的理财产品
		if(modificationItem.field.fdFieldEn =='feProduct'){//判断变更项是否为理财产品
			//若原产品是9/10 只能互相变更   9--10   10--9
			if(products=='9'||products=='10'){
				if(temp2.value==9||temp2.value==10){//如果即将变更成的目标为  证大岁悦+或者证大双鑫+业务
					
	    		}else{
	    			alert("只能选择证大岁悦+/证大双鑫+的理财产品!");
	    			return;
	    		}
			}else{//若原产品不是9/10
				if(temp2.value==9||temp2.value==10){//如果即将变更成的目标为  证大岁悦+或者证大双鑫+业务
					alert("请选择其它非证大岁悦+/证大双鑫+的理财产品!");
	    			return;
	    		}
				//普通变更 016以下的老合同业务，不能变更成非年丰、月收
				if(type==1 && temp2.value!=3 && temp2.value!=4){
					var contractNo = busiFinance.feContractNo;
					if(feContractNoCheck(contractNo)){
						var version = contractNo.substring(7,10);
						if(baseVersion > version){
							alert("所选出借方式与合同版本不匹配");
							return;
						}
					}
				}
			}
			
			if(busiFinance.fePreviousId!=null){//判断是续投的单子
				if(temp2.value==109){////如果即将变更成的目标为  证大福享
					alert("请选择其它非证大福享的理财产品!");
	    			return;
				}
			}
		}
			
		var temp = getItemValueAndText(modificationItem.field);
		//APP线上订单只允许修改管理费折扣
		if(dataOrigin=='1'&&superFlag=='0'){
			if(modificationItem.field.fdFieldEn !='feManageFee'){
				alert("APP线上订单目前只允许修改管理费折扣!");
    			return;
			}
		}	
		if(modificationItem.field.fdFieldEn =='feAmount'){//判断金额
			if(products=='8'){//月稳盈
				if(temp.value>=50000&&temp.value<=3000000&&temp.value%50000==0){
	    		}else{
	    			alert("月稳盈起投金额5万元，上限300万元，并且金额必须是5万的倍数!");
	    			return;
	    		}
			}
		}
		var addText = "";
		var addValue = "";
		// 增加支付方式 中划扣公司变更    Sam.J  14.12.24
		if(modificationItem.field.fdFieldEn =='fePaymentWay'){ //判断变更项是否为支付方式
			if(temp.value==2){ //如果即将变更成的目标为  委托划扣  
				var deductcom=$("input:checkbox[name='feDeductCompanyBox']:checked").val();  //取变更中勾选的 划扣公司
				if(deductcom==''||deductcom==null){
					alert("请选择划扣公司!");
					return;
				}
				var comName=getDeductComName(deductcom);
				addText="--"+comName;
				addValue="&@&"+deductcom;
			}
			if(modificationItem.mlFieldOldValue==2){
				var comName=getDeductComName(deductComId);
				modificationItem.mlFieldOldValue=modificationItem.mlFieldOldValue+"&@&"+deductComId;
				modificationItem.mlFieldOldText=modificationItem.mlFieldOldText+"--"+comName;
			}
		}
		modificationItem.mlFieldNewValue = temp.value+addValue;
		modificationItem.mlFieldNewText = temp.text+addText;
		if(isAdd('modificationDetail', modificationItem.field, modificationItem.mlFieldOldValue, modificationItem.mlFieldNewValue)){
			$('#modificationDetail').datagrid('appendRow',{ 
				field:modificationItem.field,
				mlFieldOldValue:modificationItem.mlFieldOldValue,
				mlFieldOldText:modificationItem.mlFieldOldText,
				mlFieldNewValue:modificationItem.mlFieldNewValue,
				mlFieldNewText:modificationItem.mlFieldNewText
			});
		}
	}
}

////删除变更项
//function remove(id){
//	$('#modificationDetail').datagrid('deleteRow', id);
//	alert(id);
//	//重新加载次,防止删除时候的id错乱
//	$('#modificationDetail').datagrid('loadData',$('#modificationDetail').datagrid('getData'));
//}

//格式化更改前字段的显示
function formatOldFieldText(value,rec) {
	if (rec.field.fdFieldEn == 'fePaymentWay') {
		var str='';
		var newValue=rec.mlFieldOldValue.split("&@&");;
		var str=formatParamValue(getContextPath() + rec.field.fdUrl, newValue[0]);
		if(newValue[1]!=null&&newValue[1]!=''){
			var comName=getDeductComName(newValue[1]);
			str+="--"+comName;
		}
		return str;
	}
	if (rec.field.fdFieldOption == 'text' || rec.field.fdFieldOption == 'date' || rec.field.fdFieldOption == 'numberbox') {
 	 	return rec.mlFieldOldValue;
	}
	else if (rec.field.fdFieldEn == 'feDeductCompany') {
		return formatDeductCompany(getContextPath() + rec.field.fdUrl, rec.mlFieldOldValue);
	}
	else if (rec.field.fdFieldOption == 'select' || rec.field.fdFieldOption == 'checkbox') {
		if(rec.field.fdReserve != 'product') {
			return formatParamValue(getContextPath() + rec.field.fdUrl, rec.mlFieldOldValue);
		}
		else{
			return formatProductName(getContextPath() + rec.field.fdUrl, rec.mlFieldOldValue);
		}
	}
	else if (rec.field.fdFieldOption == 'select1') {
		if(rec.field.fdFieldType == 'bank') {
			return isEmpty(rec.mlFieldOldValue) ? "" : formatBank(getContextPath() + "/" + rec.field.fdUrl + getVal('tempVar'), rec.mlFieldOldValue);
		}
	}
	else if (rec.field.fdFieldOption == 'radio') {
		return rec.mlFieldOldValue == '0' ? '否' : '是';
	}
}

//格式化划扣公司显示
function formatDeductCompany (url,val) {
	var list;
	postAjax(false, url, function(data) {list = data },'json');
	var value = '',len = list.length;
	//alert(val);
	if (!val || val == 0) {
		return '';
	}
	for(var i = 0; i < len; i++){
		//alert(list[i].prValue & val);
		if((list[i].prValue & val) == list[i].prValue) {
			value  += list[i].prName + ",";
		}
	};
	value = value.slice(0,-1);
	return value;
}

//格式化字段更改后的显示
function formatNewFieldText(value,rec) {
	if (rec.field.fdFieldEn == 'fePaymentWay') {
		if(value==null||value==''){
			var newValue=rec.mlFieldNewValue.split("&@&");;
			var str=formatParamValue(getContextPath() + rec.field.fdUrl, newValue[0]);
			if(newValue[1]!=null&&newValue[1]!=''){
				var comName=getDeductComName(newValue[1]);
				str+="--"+comName;
			}return str;
		}
		return value;
	}
	if (rec.field.fdFieldOption == 'text' || rec.field.fdFieldOption == 'date' || rec.field.fdFieldOption == 'numberbox') {
 	 	return rec.mlFieldNewValue;
	}
	else if (rec.field.fdFieldEn == 'feDeductCompany') {
		return formatDeductCompany(getContextPath() + rec.field.fdUrl, rec.mlFieldNewValue);
	}
	else if (rec.field.fdFieldOption == 'select' || rec.field.fdFieldOption == 'checkbox') {
		if(rec.field.fdReserve != 'product') {
			return formatParamValue(getContextPath() + rec.field.fdUrl, rec.mlFieldNewValue);
		}
		else{
			return formatProductName(getContextPath() + rec.field.fdUrl, rec.mlFieldNewValue);
		}
	}
	else if (rec.field.fdFieldOption == 'select1') {
		if(rec.field.fdFieldType == 'bank') {
			return isEmpty(rec.mlFieldNewValue) ? "" : formatBank(getContextPath() + "/" + rec.field.fdUrl + getVal('tempVar'), rec.mlFieldNewValue);
		}
	}
	else if (rec.field.fdFieldOption == 'radio') {
		return rec.mlFieldNewValue == '0' ? '否' : '是';
	}
}

//格式化产品名称
function formatProductName(url,val) {
	var list;
	postAjax(false, url, function(data) {list = data },'json');
	var value = '',len = list.length;
	for(var i = 0; i < len; i++){
		if(list[i].id == val) {
			value = list[i].ptProductName;
			break;
		}
	};
	return value;
}

//格式化银行
function formatBank(url,val) {
	var list;
	postAjax(false, url, function(data) {list = data },'json');
	var value = '',len = list.length;
	for(var i = 0; i < len; i++){
		if(list[i].id == val) {
			value = list[i].baAccount;
			break;
		}
	};
	return value;
}

//格式化参数值
function formatParamValue(url,prValue) {
	var list;
	postAjax(false, url, function(data) {list = data },'json');
	return formatVal(list,prValue);;
}


//根绝字段类型,获取字段的Value和Text
function getItemValueAndText(field) {
	var item = item || {};
	//获取文本框的值和显示内容
	if(field.fdFieldOption == 'text'){
		item.value = getVal(field.fdFieldEn);
		item.text = getVal(field.fdFieldEn);
	}
	//获取下拉框的值和显示内容 
	else if(field.fdFieldOption == 'select' || field.fdFieldOption == 'select1'){
		item.value = comboboxUtil.getValue(field.fdFieldEn);
		item.text = comboboxUtil.getText(field.fdFieldEn);
	}
	//获取复选框的值和显示内容
	else if(field.fdFieldOption == 'checkbox'){
		//获取划扣公司的值
		if (field.fdFieldEn == 'feDeductCompany') {
			//alert(field.fdFieldEn);
			//alert($("input:checkbox[name='"+field.fdFieldEn+"']:checked").length);
			item.value = 0;
			item.text = '';
			$("input:checkbox[name='"+field.fdFieldEn+"']:checked").each(function() {
				item.value += parseInt($(this).val() ? $(this).val() : '0');
				item.text += $(this).attr('disp') + ",";
			});
			//alert(item.value);
			item.text = item.text.slice(0,-1);
			//alert(item.text);
		} else {
			item.value = $("input:checkbox[name='"+field.fdFieldEn+"']:checked").val();
			item.text = $("input:checkbox[name='"+field.fdFieldEn+"']:checked").attr('disp');
		}
	}
	//获取数字框的值和显示内容
	else if(field.fdFieldOption == 'numberbox'){
		item.value = numberboxUtil.getValue(field.fdFieldEn);
		item.text = numberboxUtil.getValue(field.fdFieldEn);
	}
	//获取单选按钮的值和显示内容
	else if(field.fdFieldOption == 'radio'){
		item.value = $("input:radio[name='"+field.fdFieldEn+"']:checked").val();
		item.text = $("input:radio[name='"+field.fdFieldEn+"']:checked").attr('disp');
	}
	return item;
}

//是否可以往dataGrid里添加数据
function isAdd(id, field, oldValue, newValue) {
	if(oldValue == newValue) {
		alert("变更后的值不能与变更之前的值相同!");
		return false;
	}
	if(field.fdFieldIsnull == 1 && isEmpty(newValue)) {
		alert(field.fdFieldCn + "不能为空!");
		return false;
	}
	if(!isEmpty(field.fdFieldLength)) {
		alert(field.fdFieldCn + "长度不能大于" + field.fdFieldLength + "!");
		return false;
	}
	var data = getDataGridRows(id),len = data.length;
	//表示当前dataGrid里没有数据,那么可以直接添加
	if(len == 0) return true;
	if(isexist(field.id, data)) {
		alert("当前变更项已经存在!");
		return false;
	}
	return true;
}

//验证数据是否在变更项里存在
function isexist(fieldId, dataList) {
	var flag = false, len = dataList.length;
	for(var i = 0; i < len; i++) { 
		if(dataList[i].field.id == fieldId) {
			flag = true; 
			break;
		} 
	}
	return flag;
}

//获取dataGrid里的所有数据,对象格式
function getDataGridRows(id) {
	return $('#' + id).datagrid('getRows');
}

//获取dataGrid里的所有数据,JSON格式
function getDataGridRowsJson(id) {
	var data = $('#' + id).datagrid('getRows');
	return data.length == 0 ? data : JSON.stringify(data);
}

//获取未提交的变更单数量
function unSubmitModificationSl(id,type) {
	var flag;
	postAjax(false, getContextPath() + "/modification/get/unsubmit/count?id=" + id + "&type=" + type, function(data) { flag = data;});
	return flag;
}

//获取单个变更对象
function findOneModifycation(id) {
	var obj;
	postAjax(false, getContextPath() + "/modification/modification/find/one?id=" + id, function(data) { obj = data}, 'json');
	return obj;
}

//获取单个理财对象
function getFinance(id) {
	var obj;
	postAjax(false, getContextPath() + "/product/purchase/get/finance/product?id=" + id, function(data) { obj = data}, 'json');
	return obj;
}

//根据划扣公司id返回划扣公司名字
function getDeductComName(code){
	var comName;
	postAjax(false, getContextPath() +"/crm/param/findAllPrType?prType=deductCompany", function(data){ //将支付方式和划扣公司一起拼成新值
		$(data).each(function(index) {
			var data1 = data[index]; 
			if(data1.prValue==code){
			   comName=data1.prName;
			}
		 });
	}, 'json');
	return comName;
}

//填充支付方式变更时的划扣公司变更项展示
function loadPayMentWay(value){
	if(value==1){$('#deductId').html("");}
	if(value==2){var boxStr='划扣公司   &nbsp;&nbsp;&nbsp;&nbsp;';
	   if(superFlag==0){
		   postAjax(false, getContextPath()+"/crm/param/findAllByPrType?prType=deductCompany", function(data1) {
				 $(data1).each(function(index) {
					var data = data1[index]; 
					//if(data.prValue!=4){
					boxStr+='<input type="checkbox" onchange="deductCompanyChange(this)" name="feDeductCompanyBox" id="feDeductCompanyBox' + index + '" value="'+data.prValue+'" disp="'+data.prName+'">&nbsp;'+data.prName+'&nbsp;&nbsp;';
					$('#deductId').html(boxStr);
					//}
					//if(data.prValue==4&&superFlag==1){
						//boxStr+='<input type="checkbox" onchange="deductCompanyChange(this)" name="feDeductCompanyBox" id="feDeductCompanyBox' + index + '" value="'+data.prValue+'" disp="'+data.prName+'">&nbsp;'+data.prName+'&nbsp;&nbsp;';
						//$('#deductId').html(boxStr);
					//}
					$("#feDeductCompanyBox"+(deductComId-1)).attr("checked",'true');
				 })
			}, 'json');
	   }else if(superFlag==1){ //高级变更  查询所有的划扣公司
		   postAjax(false, getContextPath()+"/crm/param/findAllPrType?prType=deductCompany", function(data1) {
				 $(data1).each(function(index) {
					var data = data1[index]; 
					boxStr+='<input type="checkbox" onchange="deductCompanyChange(this)" name="feDeductCompanyBox" id="feDeductCompanyBox' + index + '" value="'+data.prValue+'" disp="'+data.prName+'">&nbsp;'+data.prName+'&nbsp;&nbsp;';
					$('#deductId').html(boxStr);
					$("#feDeductCompanyBox"+(deductComId-1)).attr("checked",'true');
				 })
			}, 'json');
	   }
	}
}

//验证当支付方式从自行转账变为委托划扣时，是否有新增   划扣账户
function checkDeductAccount(data){
	var flag1=false; //用于判断是否有变更 划扣公司
	var flag2=false; //用于判断是否有划扣账号
	var jsondata=eval(data);
	$(jsondata).each(function(index) {
		var dataObj = jsondata[index]; 
		if(dataObj.field.fdTable=='finance'&&dataObj.field.fdFieldEn=='fePaymentWay'&&dataObj.mlFieldNewValue.substring(0,1)=='2'&&dataObj.mlFieldOldValue.substring(0,1)=='1'){//当变更项为 支付方式 且  新变更项为委托划扣 且 原方式为自行转账时
			flag1=true;
		}
		if(dataObj.field.fdTable=='finance'&&dataObj.field.fdFieldEn=='feDeductAccount'){//当变更项中有 划扣账号
			flag2=true;
		}
	 })
	 if(flag1&&!flag2){return false}
	return true;
}


//查找理财信息  --高级变更
function searchSuper(value,name) {
	findFinanceByFeLendNoEx_MX(value,function(rowIndex, rowData){
		searchLoadNew(rowData);
	},function(data){
		if(data.total == 0){
			$.messager.show({title: '提示',msg: "没有查询到客户信息!"})
			return;
		}
		if(data.total!=1){
			$('#dd').dialog('open');
		}
		else{
			superFlag=1;
			searchLoadNew(data.rows[0]);	
		}
	});
}

//查找理财信息 一般变更查询
function search(value,name) { //排除合同编号
	findFinanceByFeLendNoEx_MX(value,function(rowIndex, rowData){
		searchLoad(rowData);
	},function(data){
		if(data.total == 0){
			$.messager.show({title: '提示',msg: "没有查询到客户信息!"})
			return;
		}
		if(data.total!=1)
			$('#dd').dialog('open');
		else
			searchLoad(data.rows[0]);
	});
}

//高级
function searchLoadNew(rowData){
	//判断是否鸿金宝业务 
	if(rowData.feProduct == '101'){
		alert("鸿金宝业务暂时不提供变更功能!");
		return;
	}
//	if(rowData.feProduct == '9'||rowData.feProduct == '10'){
//		alert("证大岁悦+或者证大双鑫+业务暂时不提供变更功能!");
//		return;
//	}
	//判断是否只存在多笔未提交的变更单
	var flag = unSubmitModificationSl(rowData.id,'2');
	if(flag == 'true'){
		alert("当前业务已经存在未提交的变更单,请先处理!");
	}else{
		loadCustomerInfo(rowData);//加载客户信息
		if(rowData.feProduct == '109' && rowData.fePreviousId != null){//福享产品的续投
			loadFinanceModificationItemFx('modificationItem');//增加合同编号 排除理财产品
		}else
			loadFinanceModificationItem('modificationItem');//增加合同编号
		$('#dd').dialog('close');
	}
}
