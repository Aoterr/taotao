
/**************************************************理财申请的基础数据填充************************************************************/
//填充产品类型
function loadFeProduct(id) {
	comboboxUtil.setComboboxByUrl(id, getContextPath() + "/finance/mx/find/finance/product", 'id', 'ptProductName', '150', true,function(rec){ 
		//productTimeValidation(rec.ptProductCode); 
		//是否显示定投
		isDisplayTimeInvestInfo(rec.ptProductCode);
		//是否显示期限类产品到期处理方式
		isDisplayFeContinueProduct(rec.ptProductCode);
	});
	comboboxUtil.addOnChangeEvent(id,function(newValue, oldValue){
		if(!isEmpty(newValue) && !isEmpty(oldValue) && (getProductCode(newValue) == 'zddt' || getProductCode(oldValue) == 'zddt')) {
			clearChinessAmount();
		}
	});
}

//填充汇入行别
function loadFeRemittanceAccount(id) {
	comboboxUtil.setComboboxByUrl(id, getContextPath() + "/crm/param/get/remittance/account", 'id', 'baBankName', '200', true);
}

//填充客户经理
function loadFeManager(id){
	comboboxUtil.setComboboxByUrl(id, getContextPath() + "/crm/param/getStaffList", 'id', 'name', '150', true);
}

//填充单个客户经理
function loadFeManagerOne(id,staffId){
	comboboxUtil.setComboboxByUrl(id, getContextPath() + "/crm/param/getStaffNameAndId?id=" + staffId, 'id', 'name', '150', true);
}

//填充协议版本
function loadFeProtocolVersion(id,factValue) {
	comboboxUtil.setComboboxByUrl(id, factValue=='' ? (getContextPath() + "/crm/param/findAllByPrType?prType=FortuneProtocolVer") : (getContextPath() + "/crm/param/findAllByPrTypeAndPrValue?prType=FortuneProtocolVer&prValue="+factValue), 'prValue', 'prName', '150', true);
}

//填充支付方式
function loadFePaymentWay(id,factValue) {
	var fePaymentWayList;
	postAjax(false, factValue=='' ? getContextPath() + "/crm/param/findAllByPrType?prType=FortunePayment" : getContextPath() + "/crm/param/findAllByPrTypeAndPrValue?prType=FortunePayment&prValue="+factValue, function(data) { fePaymentWayList = data;}, 'json');
	comboboxUtil.setComboboxByData(id, filterFePaymentWayList(fePaymentWayList,'内部结算'), 'prValue', 'prName', '150', true, function(rec){
		isDisplayDeductInfo(rec.prValue);
	});
}

//续投支付方式
function loadContinueInvestFePaymentWay(id){
	var fePaymentWayList;
	postAjax(false, getContextPath() + "/crm/param/findAllByPrType?prType=FortunePayment", function(data) { fePaymentWayList = data;}, 'json');
	comboboxUtil.setComboboxByData(id, filterFePaymentWayList1(fePaymentWayList,'自行转账'), 'prValue', 'prName', '150', true, function(rec){
		isDisplayDeductInfo(rec.prValue);
	});
}

//过滤掉不需要的支付方式
function filterFePaymentWayList(fePaymentWayList, fePaymentWay) {
	var newList = new Array(), size = 0, len = fePaymentWayList.length;
	for ( var i = 0; i < len; i++) {
		if (fePaymentWayList[i].prName != fePaymentWay) {
			newList[size] = fePaymentWayList[i];
			size++;
		}
	}
	return newList;
}

//只留续投支付方式
function filterFePaymentWayList1(fePaymentWayList, fePaymentWay) {
	var newList = new Array(), size = 0, len = fePaymentWayList.length;
	for ( var i = 0; i < len; i++) {
		if (fePaymentWayList[i].prName == fePaymentWay) {
			newList[size] = fePaymentWayList[i];
			size++;
		}
	}
	return newList;
}


//填充到期处理方式
function loadFeContinueProduct(id,factValue){
	comboboxUtil.setComboboxByUrl(id, factValue=='' ? (getContextPath() + "/crm/param/findAllByPrType?prType=ContinueProduct") : (getContextPath() + "/crm/param/findAllByPrTypeAndPrValue?prType=ContinueProduct&prValue="+factValue), 'prValue', 'prName', '150', true);
}

//填充管理费折扣
function loadFeManageFee(id,factValue){
	comboboxUtil.setComboboxByUrl(id, factValue=='' ? (getContextPath() + "/crm/param/findAllByPrType?prType=FortuneManageFee") : (getContextPath() + "/crm/param/findAllByPrTypeAndPrValue?prType=FortuneManageFee&prValue="+factValue), 'prValue', 'prName', '150', true);
}
//填充证件类型
function loadIdtype(id,factValue) {
	comboboxUtil.setComboboxByUrl(id, factValue=='' ? (getContextPath() + "/crm/param/findAllByPrType?prType=idtype") : (getContextPath() + "/crm/param/findAllByPrTypeAndPrValue?prType=idtype&prValue="+factValue), 'prValue', 'prName', '150', false);
}

//格式化银行帐号的显示,银行名称+银行帐号
function formatBankAccount(id) {
	comboboxUtil.formatter(id,function(row){return row.baBankName + "  " + row.baAccount});
}

//加载单个客户经理
function loadFeManagerComboboxData(id){
	loadFeManagerOne('feManager',id);
}

//显示划扣信息
function showDeductInfo() {
	$(".feRemittanceAccountLabel").hide();
	comboboxUtil.removeRequiredAttrAndClearVal('feRemittanceAccount');
	
	$(".feDeduct").show();
	comboboxUtil.addRequiredAttr('feDeductAccount');
}

//隐藏划扣信息
function hideDeductInfo() {
	$(".feDeduct").hide();
	comboboxUtil.removeRequiredAttrAndClearVal('feDeductAccount');
	clearElementValueByIds(['feDeductAccount','feDeductAccount','feDeductAccountName','feDeductBankName','feDeductBankAccount']);

	$(".feRemittanceAccountLabel").show();
	comboboxUtil.addRequiredAttr('feRemittanceAccount');
}

//划扣账户是否同回款账户相同
function isReturnSame(flag) {
	if(checkboxUtil.isChecked('returnSame')){
		$(".feDeduct").hide();$("#feDeduct").show();
		comboboxUtil.setValue('feDeductAccount', comboboxUtil.getValue('feReturnAccount'));
		clearElementValueByIds(['feDeductAccountName','feDeductBankName','feDeductBankAccount']);
	}else{
		$(".feDeduct").show();
		if(flag != true) { $('#feDeductAccount').combobox('clear');}
	}
}

//显示定投信息
function showTimeInvestInfo() {
	$(".feTimeInvestLabel").show(); $(".feAmountLabel").hide();
	//添加定投验证信息,移除出借金额验证
	addTimeInvestValidation();
}

//隐藏定投信息
function hideTimeInvestInfo() {
	$(".feAmountLabel").show(); $(".feTimeInvestLabel").hide();
	//移除定投验证,添加出借金额验证
	removeTimeInvestValidation();
}

//加载当前对象里的时间
function loadDateInfo(row) {
	row.feInvestDate = formatDate(row.feInvestDate);
	row.feDivestDate = formatDate(row.feDivestDate);
	row.feTimeInvestStart = formatDate(row.feTimeInvestStart);
	row.feTimeInvestEnd = formatDate(row.feTimeInvestEnd);
}

//加载客户信息
function loadCustomerInfo(row) {
	postAjax(false, getContextPath() + "/crm/customer/customerById?id=" + row.customerid, function(data) {
		row.name = data.crName;
		row.idnum = data.crIdnum;
		row.idtype = data.crIdtype
		row.address = getPostalAddr(row.customerid);
	}, 'json');
}

//获取产品代码
function getProductCode(productList,id) {
	return getSingleObject(productList,id).ptProductCode;
}

//获取产品代码
function getProductCode(id) {
	var product;
	postAjax(false, getContextPath() + "/finance/mx/get/product?id=" + id, function(data) { product = data}, 'json');
	return product.ptProductCode;
}

//获取单个理财对象
function getFinance(id) {
	var obj;
	postAjax(false, getContextPath() + "/finance/mx/get/finance/product?id=" + id, function(data) { obj = data}, 'json');
	return obj;
}

//获取管理费折扣默认率
function getManageFeeDefault() {
	var obj;
	postAjax(false, getContextPath() + "/crm/param/findAllByPrType?prType=ManageFeeDefault", function(data) { obj = data[0].prValue}, 'json');
	return obj;
}

//获取客户的通讯地址
function getPostalAddr(id) {
	if(null == id || '' == id || typeof(id) == 'undefined' ) return "";
	var postalAddr;
	postAjax(false, getContextPath() + "/crm/customer/get/postal/address?id=" + id, function(data) { postalAddr = data;});
	return postalAddr;
}

//回款银行选中事件
function feReturnAccountSelectEvent(rec) {
	loadFeReturnAccountDetail(rec); 
	//如果此时同回款账户信息 复选框被勾选的话,那么还需要同步划扣账户信息
	if(checkboxUtil.isChecked('returnSame')) {
		comboboxUtil.setValue('feDeductAccount', comboboxUtil.getValue('feReturnAccount'));
		clearElementValueByIds(['feDeductAccountName','feDeductBankName','feDeductBankAccount']);
	}
}

//划扣银行选中事件
function feDeductAccountSelectEvent(rec) {
	loadFeDeductAccountDetail(rec); 
	//如果此时选中的划扣账户等于回款账户,那么隐藏划扣账户信息
	comboboxUtil.getValue('feReturnAccount') == rec.id ? checkboxUtil.checked('returnSame') : checkboxUtil.unChecked('returnSame');
	isReturnSame(true);
}

//加载划扣银行的详细信息
function loadFeDeductAccountDetail(bank) {
	loandBankAccountDetail(['feDeductAccountName', 'feDeductBankName', 'feDeductBankAccount'],bank);
}

//加载回款银行的详细信息
function loadFeReturnAccountDetail(bank) {
	loandBankAccountDetail(['feReturnAccountName', 'feReturnBankName', 'feReturnBankAccount'],bank);
}

//加载回款银行下拉框里的数据
function loadFeReturnAccountComboboxData(banks) {
	comboboxUtil.setComboboxByData('feReturnAccount', banks, 'id', 'baAccount', '200', true);
	comboboxUtil.addOnSelectEvent('feReturnAccount',feReturnAccountSelectEvent);
	//格式化银行显示
	formatBankAccount('feReturnAccount');
}

//加载划扣银行下拉框里的数据
function loadFeDeductAccountComboboxData(banks) {
	comboboxUtil.setComboboxByData('feDeductAccount', banks, 'id', 'baAccount', '200', false);
	comboboxUtil.addOnSelectEvent('feDeductAccount',feDeductAccountSelectEvent);
	//格式化银行显示
	formatBankAccount('feDeductAccount');
}

//加载银行的详细信息
function loandBankAccountDetail(fields,bank) {
	setElementValues(fields,[bank.baAccountName, bank.baBankName + bank.baBranchName, bank.baAccount]);
}

//加载回款银行
function loandFeReturnAccount(row,customerBanks) {
	//下拉框里的数据
	loadFeReturnAccountComboboxData(customerBanks);
	//详细信息
	loadFeReturnAccountDetail(getSingleObject(customerBanks, row.feReturnAccount));
}

//加载划扣银行
function loandFeDeductAccount(row,customerBanks) {
	//下拉框里的数据
	loadFeDeductAccountComboboxData(customerBanks);
	
	//划扣账户不为空的时候才显示
	if(row.feDeductAccount != null) {
		loadFeDeductAccountDetail(getSingleObject(customerBanks, row.feDeductAccount));
		//同回款账户信息相同复选按钮是否选中
		row.feReturnAccount == row.feDeductAccount ? checkedReturnSame() : unCheckedReturnSame(); 
	}
}

//选中同回款账户信息相同复选框
function checkedReturnSame() {
	checkboxUtil.checked('returnSame');
	isReturnSame(true);
}

//不选中同回款账户信息相同复选框
function unCheckedReturnSame() {
	checkboxUtil.unChecked('returnSame');
}


//初始化用户所有银行信息
function initBankInfo(row) {
	var customerBanks = getCustomerBankAccounts(row.customerid);
	//加载回款银行相关信息
	loandFeReturnAccount(row,customerBanks);
	//加载划扣银行相关信息
	loandFeDeductAccount(row,customerBanks);
	
	//如果此时的支付方式为划扣,那么则还需要添加划扣账户的必填信息
	if(comboboxUtil.getValue('fePaymentWay') == '2') comboboxUtil.addRequiredAttr('feDeductAccount');
}

//获取客户所有的有效银行信息
function getCustomerBankAccounts(id) {
	var customerBanks;
	postAjax(false, getContextPath() + "/finance/mx/find/customer/bank?id=" + id, function(data) {customerBanks = data}, 'json');
	return customerBanks;
}

//加载理财业务信息
function loadFinance(id){
	var obj = getFinance(id),productCode = getProductCode(obj.feProduct);
	//是否显示定投信息
	isDisplayTimeInvestInfo(productCode);
	//显示大写金额
	productCode == 'ydt' ? formatChineseAmount(obj.feTimeInvestAmount,'chinessAmount') : formatChineseAmount(obj.feAmount,'chinessAmount');
	//是否显示划扣信息
	isDisplayDeductInfo(obj.fePaymentWay);
	//初始化新银行信息
	initBankInfo(obj);
	//加载客户信息
	loadCustomerInfo(obj);
	//加载日期信息
	loadDateInfo(obj);	
	//加载客户经理
	loadFeManagerComboboxData(obj.feManager);
	//是否显示期限类产品到期处理方式
	isDisplayFeContinueProduct(productCode);
	
	//加载团队信息和小组信息
	loadTeamAndDepartment(obj);
	
	return obj;
}

function loadTeamAndDepartment(rec){
	postAjax(false, getContextPath() + "/crm/param/getStaffDepartmentName?staffId=" + rec.feManager ,function(data){
		rec.salesTeam = data[0];
		rec.salesDepartment = data[1];
	},'json');
}

function init(obj){
	//控制字体靠右显示
	$(".m_table td").has("label").css("text-align","right");
	//填充产品类型 
	loadFeProduct('feProduct');
	//
	//填充证件类型
	loadIdtype('idtype',obj ? obj.idtype : '');
	//console.info(obj.idtype);
	//填充协议版本
	loadFeProtocolVersion('feProtocolVersion',obj ? obj.feProtocolVersion : '');
	//console.info(obj.feProtocolVersion);
	//填充支付方式
	loadFePaymentWay('fePaymentWay',obj ? obj.fePaymentWay : '');
	//console.info(obj.fePaymentWay);
	//填充到期处理方式
	loadFeContinueProduct('feContinueProduct',obj ? obj.feContinueProduct : '');
	//console.info(obj.feContinueProduct);
	//填充管理费折扣
	loadFeManageFee('feManageFee',obj ? obj.feManageFee : '');
	//console.info(obj.feManageFee);
	//填充客户经理
	//loadFeManager('feManager');
	//填充汇入行别
	loadFeRemittanceAccount('feRemittanceAccount');
}


//添加定投验证信息
function addTimeInvestValidation() {
	$('#feTimeInvestAmount').numberbox({required: true,validType: 'minamount[1]', precision:2});
	numberboxUtil.removeRequiredAttrAndClearVal('feAmount');
	numberboxUtil.setValue('feAmount',"");
	//$('#feTimeInvestStart').datebox({required: true});   
	//$('#feTimeInvestEnd').datebox({required: true,validType: "dateGreaterThan['feTimeInvestStart','定投失效日期必须大于定投生效日期!']"});
	//dateboxUtil.removeRequiredAttrAndClearVal('feInvestDate');
	//dateboxUtil.removeRequiredAttrAndClearVal('feDivestDate');	
}

//移除定投验证信息
function removeTimeInvestValidation() {
	numberboxUtil.removeRequiredAttrAndClearVal('feTimeInvestAmount');
	numberboxUtil.setValue('feTimeInvestAmount',"");
	$('#feAmount').numberbox({required: true,validType: 'minamount[1]', precision:2}); 
	//dateboxUtil.removeRequiredAttrAndClearVal('feTimeInvestStart');
	//dateboxUtil.removeRequiredAttrAndClearVal('feTimeInvestEnd');
}

//是否显示定投信息
function isDisplayTimeInvestInfo(val) { (val == 'zddt' || val == 'ydt') ? showTimeInvestInfo() : hideTimeInvestInfo();}

//是否显示划扣信息
function isDisplayDeductInfo(val) {val == '2' ? showDeductInfo() : hideDeductInfo();}

//是否显示期限类产品到期处理方式
function isDisplayFeContinueProduct(val) {
	if(val == 'zdsy' || val == 'zdjx' || val == 'zdsx' || val == 'syh' || val == 'djx' || val == 'sjf' || val == 'jjx'|| val == 'zdfx') {
		$(".feContinueProductLabel").show();
		comboboxUtil.addRequiredAttr('feContinueProduct');
	}else{
		$(".feContinueProductLabel").hide();
		comboboxUtil.removeRequiredAttrAndClearVal('feContinueProduct');
	}
}



//根据不同的产品,验证产品投资的周期
function productTimeValidation (val) {
	val == 'zdjx' ? $('#feDivestDate').datebox({required: true, validType: "beginDateAddMonthBeforeEndDate['feInvestDate','3','计划撤资日期与计划投资日期至少为3个月!']"}):
		$('#feDivestDate').datebox({required: true,validType: "beginDateAddMonthBeforeEndDate['feInvestDate','12','计划撤资日期与计划投资日期至少为12个月!']"});
}

//格式化金额大写
function formatChineseAmount(value,id) {
	setVal(id,amountToChinese(value));
}

//清空金额大写文本框
function clearChinessAmount() {
	clearValue('chinessAmount');
}

//显示不能为空的字段信息
function showBlankMessage(msg){
	var val = '',len = msg.length,index = 1;
	val += "<ul class='m_ul'><li>&nbsp;</li></ul>"
	if(msg[len - 2] == '1') {
		val += "<ul class='m_ul'><li><a href='" + getContextPath() + "/crm/customer/edit_mxlc?id=" + msg[len-1] + "' target='_blank'><font style='font-size:20px;'>点我补全客户必填信息</font></a></li></ul>";
	}
	else {
		val += "<ul class='m_ul'><li><font style='font-size:20px;'>请去信息变更里补全客户必填信息</font></li></ul>";
	}
	for(var i = 0; i < len - 2; i++) {
		val += "<ul class='m_ul'><li>"+ index + ".&nbsp" + msg[i] + "</li></ul>";
		index++;
	}
	
	$('#blankTable').html(val); 
	$('#blankDiv').dialog('open');
}

