
/**************************************************理财申请的基础数据填充************************************************************/
//填充产品类型
function loadFeProduct(id) {
	//滚动条
	comboboxUtil.setComboboxByUrlWithpanelHeight(id, getContextPath() +"/fund/purchase/find/all/product", 'id', 'fdFundName', '200', true,function(rec){
//	comboboxUtil.setComboboxByUrl(id, getContextPath() + "/fund/purchase/find/all/product", 'id', 'fdFundName', '150', true,function(rec){ 
		isDisplayDeductInfo(-1);
        //封装成另外方法，当修改页面加载数据时也可调用
		changeDataByProduct(rec);
	});
	comboboxUtil.addOnChangeEvent(id,function(newValue, oldValue){
		if(!isEmpty(newValue) && !isEmpty(oldValue) ) {
	//		clearChinessAmount();
		}
	});
}

//填充年化利率
function loadFeInterestRate(id) {
	comboboxUtil.setComboboxByUrl(id, getContextPath() + "/crm/param/findAllByPrType?prType=cdInterestRate", 'prValue', 'prName', '150', true);
	//年化利率选择选择项绑定事件
	$('#' + id).combobox({
		onSelect: function (rec) {
			feInterestRateFeMonthRepay();
		}
	});
}

//填充存续期限  月  数据库字典表中加载
//function loadFeTerm(id) {
//	comboboxUtil.setComboboxByUrl(id, getContextPath() + "/crm/param/findAllByPrType?prType=fdTerm", 'prValue', 'prName', '150', true);
//}

//填充存续期限  基金业务中加载
function loadFeTerm(id,factValue){
	comboboxUtil.setComboboxByUrl(id, factValue=='' ? (getContextPath() + "/crm/param/findAllByPrType?prType=fdTerm") : (getContextPath() + "/crm/param/findAllByPrTypeAndPrValue?prType=fdTerm&prValue="+factValue), 'prValue', 'prName', '150', true);
}

/*//填充汇入行别
function loadFeRemittanceAccount(id) {
	comboboxUtil.setComboboxByUrl(id, getContextPath() + "/crm/param/get/remittance/account", 'id', 'baBankName', '200', true);
}*/

//填充汇入行别    基金  long
function loadFeRemittanceAccountForFund(id,bankId) {
//	bankId==null?0:bankId;
//		if(bankId!=null){
			//根据基金id查询该产品的托管银行id
			comboboxUtil.setComboboxByUrl(id, getContextPath() + "/crm/param/get/remittance/account/fund?bankId="+bankId, 'id', 'baBankName', '200', true);	
//		}
	
}

//填充客户经理
function loadFeManager(id){
	comboboxUtil.setComboboxByUrl(id, getContextPath() + "/crm/param/getStaffList", 'id', 'name', '150', true);
}

//填充单个客户经理
function loadFeManagerOne(id,staffId){
	var managerRs;
	postAjax(false, getContextPath() + "/crm/param/getStaff?id=" + staffId, function(data) { managerRs = data;}, 'json');
	comboboxUtil.setComboboxByData(id, managerRs, 'id', 'name', '150', true);
	return managerRs;
}

//填充协议版本
function loadFeProtocolVersion(id,factValue) {
	comboboxUtil.setComboboxByUrl(id, factValue=='' ? (getContextPath() + "/crm/param/findAllByPrType?prType=fundProtocolVer") : (getContextPath() + "/crm/param/findAllByPrTypeAndPrValue?prType=fundProtocolVer&prValue="+factValue), 'prValue', 'prName', '150', true);
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

//填充管理费折扣  编辑页面
function loadFeManageFee(id,factValue){
	comboboxUtil.setComboboxByUrl(id, factValue=='' ? (getContextPath() + "/crm/param/findAllByPrType?prType=FortuneManageFee") : (getContextPath() + "/crm/param/findAllByPrTypeAndPrValue?prType=FortuneManageFee&prValue="+factValue), 'prValue', 'prName', '150', true);
}
//填充证件类型
function loadIdtype(id,factValue) {
	comboboxUtil.setComboboxByUrl(id, factValue=='' ? (getContextPath() + "/crm/param/findAllByPrType?prType=idtype") : (getContextPath() + "/crm/param/findAllByPrTypeAndPrValue?prType=idtype&prValue="+factValue), 'prValue', 'prName', '150', false);
}

//填充风险等级
function loadRiskLevel(id,factValue) {
	comboboxUtil.setComboboxByUrl(id, factValue=='' ? (getContextPath() + "/crm/param/findAllByPrType?prType=riskLevel") : (getContextPath() + "/crm/param/findAllByPrTypeAndPrValue?prType=riskLevel&prValue="+factValue), 'prValue', 'prName', '150', false);
}
//格式化银行帐号的显示,银行名称+银行帐号
function formatBankAccount(id) {
	comboboxUtil.formatter(id,function(row){return row.baBankName + "  " + row.baAccount});
}

//加载单个客户经理
function loadFeManagerComboboxData(id){
	return loadFeManagerOne('fdManager',id);
}

//显示划扣信息
function showDeductInfo() {
	$(".fdRemittanceAccountLabel").hide();
	comboboxUtil.removeRequiredAttrAndClearVal('fdRemittanceAccount');
	//划扣公司
	$(".fdDeduct").show();
	comboboxUtil.addRequiredAttr('fdDeductAccount');
	comboboxUtil.addRequiredAttr('fdDeductCompany');
}

//隐藏划扣信息
function hideDeductInfo() {
	$(".fdDeduct").hide();
	comboboxUtil.removeRequiredAttrAndClearVal('fdDeductAccount');
	comboboxUtil.removeRequiredAttr('fdDeductCompany');
	//clearElementValueByIds(['fdDeductAccount','fdDeductAccount','fdDeductAccountName','fdDeductBankName','fdDeductBankAccount','fdDeductCompany']);

	$(".fdRemittanceAccountLabel").show();
	comboboxUtil.addRequiredAttr('fdRemittanceAccount');
}

//划扣账户是否同回款账户相同
function isReturnSame(flag) {
	if(checkboxUtil.isChecked('returnSame')){
		$(".fdDeduct").hide();$("#fdDeduct").show();$(".fddeductCompany").show();
		comboboxUtil.setValue('fdDeductAccount', comboboxUtil.getValue('fdReturnAccount'));
		clearElementValueByIds(['fdDeductAccountName','fdDeductBankName','fdDeductBankAccount']);
		//划扣账户下拉框不可下拉
		//$('#fdDeductAccount').combobox('disable');
	}else{
		$(".fdDeduct").show();
		if(flag != true) {
			$('#fdDeductAccount').combobox('clear');
		    $('#fdDeductAccount').combobox('enable');
		}
	}
}

//显示定投信息
function showTimeInvestInfo() {
//	$(".fdTimeInvestLabel").show(); 
	$(".fdAmountLabel").hide();
	//添加定投验证信息,移除出借金额验证
//	addTimeInvestValidation();
}

//隐藏定投信息
function hideTimeInvestInfo() {
	$(".fdAmountLabel").show(); 
	//$(".fdTimeInvestLabel").hide();
	//移除定投验证,添加出借金额验证
//	removeTimeInvestValidation();
}

//加载当前对象里的时间
function loadDateInfo(row) {
	row.fdInvestDate = formatDate(row.fdInvestDate);
	row.fdDivestDate = formatDate(row.fdDivestDate);
//	row.fdTimeInvestStart = formatDate(row.fdTimeInvestStart);
//	row.fdTimeInvestEnd = formatDate(row.fdTimeInvestEnd);
}

//加载客户信息
function loadCustomerInfo(row) {
	postAjax(false, getContextPath() + "/crm/customer/customerById?id=" + row.customerid, function(data) {
		row.name = data.crName;
		row.idnum = data.crIdnum;
		row.idtype = data.crIdtype;
		row.address = getPostalAddr(row.customerid);
		row.mobileNumber=getPhoneNumber(row.customerid);//手机号
		row.sex=dealSex(data.crSex);//性别
		row.birthday=data.crBirthday;//生日
		row.riskLevel=data.crRiskLevel;//风险等级
	}, 'json');
}

//获取产品代码
function getProductCode(productList,id) {
	return getSingleObject(productList,id).fdFundCode;
}

//获取产品代码
function getProductCode(id) {
	var product;
	postAjax(false, getContextPath() + "/fund/purchase/get/product?id=" + id, function(data) { product = data}, 'json');
	return product.fdFundCode;
}

//获取产品托管账户id
function getFdManageAccountId(id) {
	var product;
	postAjax(false, getContextPath() + "/fund/purchase/get/product?id=" + id, function(data) { product = data}, 'json');
	return product.fdManageAccountId;
}
//获取单个理财对象  BusiFundInfo
function getFinance(id) {
	var obj;
	postAjax(false, getContextPath() + "/fund/purchase/get/finance/product?id=" + id, function(data) { obj = data}, 'json');
	return obj;
}

//获取管理费折扣默认率  申请页面
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
//获取客户的手机号
function getPhoneNumber(id) {
	if(null == id || '' == id || typeof(id) == 'undefined' ) return "";
	var phone;
	postAjax(false, getContextPath() + "/crm/customer/get/phone?id=" + id, function(data) { phone = data;});
	return phone;
}

//回款银行选中事件
function feReturnAccountSelectEvent(rec) {
	loadFeReturnAccountDetail(rec);
	//如果此时同回款账户信息 复选框被勾选的话,那么还需要同步划扣账户信息
	if(checkboxUtil.isChecked('returnSame')) {
		comboboxUtil.setValue('fdDeductAccount', comboboxUtil.getValue('fdReturnAccount'));
		clearElementValueByIds(['fdDeductAccountName','fdDeductBankName','fdDeductBankAccount']);
	}
}

//划扣银行选中事件
function feDeductAccountSelectEvent(rec) {
	loadFeDeductAccountDetail(rec); 
	//如果此时选中的划扣账户等于回款账户,那么隐藏划扣账户信息
	comboboxUtil.getValue('fdReturnAccount') == rec.id ? checkboxUtil.checked('returnSame') : checkboxUtil.unChecked('returnSame');
	isReturnSame(true);
}

//加载划扣银行的详细信息
function loadFeDeductAccountDetail(bank) {
	loandBankAccountDetail(['fdDeductAccountName', 'fdDeductBankName', 'fdDeductBankAccount'],bank);
}

//加载回款银行的详细信息
function loadFeReturnAccountDetail(bank) {
	loandBankAccountDetail(['fdReturnAccountName', 'fdReturnBankName', 'fdReturnBankAccount'],bank);
}

//加载回款银行下拉框里的数据
function loadFeReturnAccountComboboxData(banks) {
	comboboxUtil.setComboboxByData('fdReturnAccount', banks, 'id', 'baAccount', '200', true);
	comboboxUtil.addOnSelectEvent('fdReturnAccount',feReturnAccountSelectEvent);
	//格式化银行显示
	formatBankAccount('fdReturnAccount');
}

//加载划扣银行下拉框里的数据
function loadFeDeductAccountComboboxData(banks) {
	comboboxUtil.setComboboxByData('fdDeductAccount', banks, 'id', 'baAccount', '200', false);
	comboboxUtil.addOnSelectEvent('fdDeductAccount',feDeductAccountSelectEvent);
	//格式化银行显示
	formatBankAccount('fdDeductAccount');
}

//加载银行的详细信息
function loandBankAccountDetail(fields,bank) {
	if(bank!=null){
		if(bank.baBranchName==null){bank.baBranchName=""}
		setElementValues(fields,[bank.baAccountName, bank.baBankName + bank.baBranchName, bank.baAccount]);
	}
}

//加载回款银行
function loandFeReturnAccount(row,customerBanks) {
	//下拉框里的数据
	loadFeReturnAccountComboboxData(customerBanks);
	//详细信息
	loadFeReturnAccountDetail(getSingleObject(customerBanks, row.fdReturnAccount));
}

//加载划扣银行
function loandFeDeductAccount(row,customerBanks) {
	//为南京房产项目做过滤
	var banks_=new Array();
	var j=0;
	if(row.name!=null){
		for(var i=customerBanks.length-1;i>=0;i--){
			if(customerBanks[i].baAccountName!='南京证大大拇指商业发展有限公司'){
				//customerBanks.splice(i,1);
				banks_[j]=customerBanks[i];
				j++
			}
		}
	}
	//下拉框里的数据
	loadFeDeductAccountComboboxData(banks_);
	
	//划扣账户不为空的时候才显示
	if(row.fdDeductAccount != null) {
		loadFeDeductAccountDetail(getSingleObject(customerBanks, row.fdDeductAccount));
		//同回款账户信息相同复选按钮是否选中
		row.fdReturnAccount == row.fdDeductAccount ? checkedReturnSame() : unCheckedReturnSame(); 
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
	if(comboboxUtil.getValue('fdPaymentWay') == '2') comboboxUtil.addRequiredAttr('fdDeductAccount');
}

//初始化用户所有银行信息
function initBankInfoForFund(cusId) {
	var customerBanks = getCustomerBankAccounts(cusId);
	//加载回款银行相关信息
	loandFeReturnAccount(row,customerBanks);
}

//获取客户所有的有效银行信息
function getCustomerBankAccounts(id) {
	var customerBanks;
	postAjax(false, getContextPath() + "/fund/purchase/find/customer/bank?id=" + id, function(data) {customerBanks = data}, 'json');
	return customerBanks;
}

//加载理财业务信息  BusiFundInfo
function loadFinance(id){
	$('.carfinance').hide();
	var obj = getFinance(id),productCode = getProductCode(obj.fdProduct);
//	var fdManageAccountId=getFdManageAccountId(obj.fdProduct);//托管账户id
	
	//是否显示定投信息
//	isDisplayTimeInvestInfo(productCode);
	//显示大写金额
//	productCode == 'zddt' ? formatChineseAmount(obj.fdTimeInvestAmount,'chinessAmount') : formatChineseAmount(obj.fdAmount,'chinessAmount');
	formatChineseAmount(obj.fdAmount,'chinessAmount');
	//是否显示划扣信息
	isDisplayDeductInfo(obj.fdPaymentWay);
	//加载客户信息
	loadCustomerInfo(obj);
	//初始化新银行信息
	initBankInfo(obj);
	//加载日期信息
	loadDateInfo(obj);	
	//加载客户经理
	loadFeManagerComboboxData(obj.fdManager);
	
	//加载团队信息和小组信息
	loadTeamAndDepartment(obj);
	return obj;
}

function loadTeamAndDepartment(rec){
	postAjax(false, getContextPath() + "/crm/param/getStaffDepartmentName?staffId=" + rec.fdManager ,function(data){
		rec.salesTeam = data[0];
		rec.salesDepartment = data[1];
	},'json');
}
//初始化加载
function init(obj){
	//控制字体靠右显示
	$(".m_table td").has("label").css("text-align","right");
	//填充产品类型 
	loadFeProduct('fdProduct',obj ? obj.fdProduct : '');
	//填充存续期限
	loadFeTerm('fdTerm',obj ? obj.fdTerm : '');
//	loadFeTerm('fdTerm');
	//填充证件类型
	loadIdtype('idtype',obj ? obj.idtype : '');
	//填充风险等级
	loadRiskLevel('riskLevel',obj ? obj.riskLevel : '');
	//填充协议版本
	loadFeProtocolVersion('fdProtocolVersion',obj ? obj.fdProtocolVersion : '');
	//填充支付方式
	loadFePaymentWay('fdPaymentWay',obj ? obj.fdPaymentWay : '');
	//填充到期处理方式
//	loadFeContinueProduct('fdContinueProduct',obj ? obj.fdContinueProduct : '');
	//填充管理费折扣
	loadFeManageFee('fdManageFee',obj ? obj.fdManageFee : '');
//	loadFeManageFee('fdManageFee');
	//填充客户经理
	//loadFeManager('fdManager');
	
	//填充年化利率
//	loadFeInterestRate('fdInterestRate');
	
}


//添加定投验证信息
function addTimeInvestValidation() {
	$('#fdTimeInvestAmount').numberbox({required: true,validType: 'minamount[1]', precision:2});
	numberboxUtil.removeRequiredAttrAndClearVal('fdAmount');
	numberboxUtil.setValue('fdAmount',"");
	//$('#fdTimeInvestStart').datebox({required: true});   
	//$('#fdTimeInvestEnd').datebox({required: true,validType: "dateGreaterThan['fdTimeInvestStart','定投失效日期必须大于定投生效日期!']"});
	//dateboxUtil.removeRequiredAttrAndClearVal('fdInvestDate');
	//dateboxUtil.removeRequiredAttrAndClearVal('fdDivestDate');	
}

//移除定投验证信息
function removeTimeInvestValidation() {
	numberboxUtil.removeRequiredAttrAndClearVal('fdTimeInvestAmount');
	numberboxUtil.setValue('fdTimeInvestAmount',"");
	$('#fdAmount').numberbox({required: true,validType: 'minamount[1]', precision:2}); 
	//dateboxUtil.removeRequiredAttrAndClearVal('fdTimeInvestStart');
	//dateboxUtil.removeRequiredAttrAndClearVal('fdTimeInvestEnd');
}

//是否显示定投信息
function isDisplayTimeInvestInfo(val) { val == 'zddt' ? showTimeInvestInfo() : hideTimeInvestInfo();}

//是否显示划扣信息
function isDisplayDeductInfo(val) {val == '2' ? showDeductInfo() : hideDeductInfo();}

//是否显示期限类产品到期处理方式
function isDisplayFeContinueProduct(val) {
	if(val == 'zdsy' || val == 'zdjx' || val == 'zdsx' || val == 'zdcd' || val == 'ywy' || val == 'zdsyp' || val == 'zdsxp'|| val == 'zdfx') {
		$(".fdContinueProductLabel").show();
		comboboxUtil.addRequiredAttr('fdContinueProduct');
	}else{
		$(".fdContinueProductLabel").hide();
		comboboxUtil.removeRequiredAttrAndClearVal('fdContinueProduct');
	}
}



//根据不同的产品,验证产品投资的周期
function productTimeValidation (val) {
	val == 'zdjx' ? $('#fdDivestDate').datebox({required: true, validType: "beginDateAddMonthBeforeEndDate['fdInvestDate','3','计划撤资日期与计划投资日期至少为3个月!']"}):
		$('#fdDivestDate').datebox({required: true,validType: "beginDateAddMonthBeforeEndDate['fdInvestDate','12','计划撤资日期与计划投资日期至少为12个月!']"});
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
		val += "<ul class='m_ul'><li><a href='" + getContextPath() + "/crm/customer/complement_lc?id=" + msg[len-1] + "' target='_blank'><font style='font-size:20px;'>点我补全客户必填信息</font></a></li></ul>";
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

//一切特殊产品的处理初始化，以免影响正常使用
function dealProductInit(){
//	$('#fdTerm').combobox({required: false});   //期数变为不用必填
	$('.carfinance').hide();   //影藏贷里淘金的相关页面布局
	$('#returnSame').removeAttr('disabled');
	$('#returnSame').attr('checked',false);//回款账户信息
	$('#fdPaymentWay').combobox('enable');   
	//comboboxUtil.removeRequiredAttr('fdPaymentWay');//支付方式默认可选
//	$('#fdContinueProduct').combobox('enable'); //到期续投处理方式	
}


//一切特殊产品的处理初始化，以免影响正常使用
function dealProductInits(){
///	$('#fdTerm').combobox({required: false});   //期数变为不用必填
	$('.carfinance').hide();   //影藏贷里淘金的相关页面布局
	$('#returnSame').removeAttr('disabled');
	$('#returnSame').attr('checked',false);//回款账户信息
	$('#fdPaymentWay').combobox('enable');   
}

//产品下拉框变更时触发的方法
function changeDataByProduct(rec){
		//默认不显示划扣信息
//		$(".fdDeduct").hide();
		//productTimeValidation(rec.fdFundCode); 
		//是否显示定投
	//	isDisplayTimeInvestInfo(rec.fdFundCode);
		//是否显示期限类产品到期处理方式
	//	isDisplayFeContinueProduct(rec.fdFundCode);
		//一切特殊产品的处理初始化，以免影响正常使用
	//	dealProductInit();
	//加载基金托管账户
	//loadFeRemittanceAccountForFund('fdRemittanceAccount',rec.fdManageAccountId?rec.fdManageAccountId:'');
	
//			$('#fdContractNo').validatebox({required: true, validType: "feContractNo['add']"});
//			comboboxUtil.clearValue('fdContinueProduct');
			$('#returnSame').removeAttr('disabled');
//			isReturnSame(false);
			$('#fdInterestRate').combobox({required: false});
			$('#fdInterestRate').combobox('select','');
//			$('#fdTerm').combobox('select','');
}

//获取南京房产的银行信息
function getHouseBankAccounts() {
	var houseBanks;
	postAjax(false, getContextPath() + "/fund/purchase/find/house/bank", function(data) {houseBanks = data}, 'json');
	return houseBanks;
}

//加载回款银行下拉框里的数据为南京地产公司账户
function loadFeReturnAccountComboboxDataForHouse(reaccountid) {
	var banks=getHouseBankAccounts();
	comboboxUtil.setComboboxByData('fdReturnAccount', banks, 'id', 'baAccount', '200', true);
	comboboxUtil.addOnSelectEvent('fdReturnAccount',feReturnAccountSelectEvent);
	//格式化银行显示
	formatBankAccount('fdReturnAccount');
	if(reaccountid!=null){
		var bank = getBankAccountById(reaccountid);
		for(var i=0;i<banks.length;i++){
			if(banks[i].baAccount==bank.baAccount){
				comboboxUtil.setValue('fdReturnAccount', banks[i].id);
			}
		}
	}
}

//根据id获取银行信息
function getBankAccountById(bankid) {
	var bank;
	postAjax(false, getContextPath() + "/fund/purchase/find/bank_byid?bankid="+bankid, function(data) {bank = data}, 'json');
	return bank;
}

function dealSex(sex){
	if(sex=='0')return '女';
	return '男';
}
