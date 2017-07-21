
/**************************************************理财申请的基础数据填充************************************************************/
//填充产品类型
function loadFeProduct(id) {
	var combData = [];
	var showYWM_ = true;//是否显示月稳赢产品（只有产品申请和到期续投页面不显示） true:显示
	postAjax(false,getContextPath() + "/product/purchase/find/finance/product",function(data){
		try{
			showYWM_ = showYWY;
		}catch(e){
			showYWM_ = true;
		}
	   for(var i=0;i<data.length;i++){	
		   if(showYWM_ || (data[i].id != '8' && data[i].ptProductCode != 'ywy')){
			   combData.push(data[i]);
		   }
	   }
	},'json');
	comboboxUtil.setComboboxByData(id, combData, 'id', 'ptProductName', '150', true,function(rec){ 
		isDisplayDeductInfo(-1);
        //封装成另外方法，当修改页面加载数据时也可调用
		changeDataByProduct(rec);
	});
	comboboxUtil.addOnChangeEvent(id,function(newValue, oldValue){
		if(!isEmpty(newValue) && !isEmpty(oldValue) && (getProductCode(newValue) == 'zddt' || getProductCode(oldValue) == 'zddt')) {
			clearChinessAmount();
		}
	});
}


//仅仅用来处理定制续投的功能
function loadFeProductForCustomized(id) {
	comboboxUtil.setComboboxByUrl(id, getContextPath() + "/product/purchase/find/customized/product", 'id', 'ptProductName', '150', true,function(rec){ 
		//默认不显示划扣信息
		//是否显示定投
	//	isDisplayTimeInvestInfo(rec.ptProductCode);
		//是否显示期限类产品到期处理方式
	//	isDisplayFeContinueProduct(rec.ptProductCode);
		//一切特殊产品的处理初始化，以免影响正常使用
		dealProductInits();
	});
	
}


//为续投的支付方式选择 新增一个方法，用以月稳投的 支付方式验证
//eidt 修改调用方法为不包含Plus产品的查询方法   Sam.J  15.10.30
function loadFeProductForContinue(id,ifIncludeFX) {
	comboboxUtil.setComboboxByUrl(id, getContextPath() + "/product/purchase/find/finance/product_noPlus?ifIncludeFX="+ifIncludeFX, 'id', 'ptProductName', '150', true,function(rec){ 
		//默认不显示划扣信息
//		$(".feDeduct").hide();
//		isDisplayDeductInfo(-1);
		//productTimeValidation(rec.ptProductCode); 
		//是否显示定投
		isDisplayTimeInvestInfo(rec.ptProductCode);
		//是否显示期限类产品到期处理方式
		isDisplayFeContinueProduct(rec.ptProductCode);
		//一切特殊产品的处理初始化，以免影响正常使用
		dealProductInit();
		//车贷产品
		if (rec.ptProductCode=='zdcd') {
			$('.carfinance').show();
			$('#feInterestRate').combobox({required: true});
			$('#feTerm').combobox({required: true});
			$('#feContractNo').validatebox({required: true, validType: "feContractCD['add']"});
			$('#feFoursName').validatebox({required: true, validType: "fourS[1]"});
		} 
		//月稳盈产品
		
		else if (rec.ptProductCode=='ywy') {
			$('#feContractNo').validatebox({required: true, validType: "zd_ywy_contractno"});
			$('#feAmount').validatebox({required: true, validType: "zd_ywy_money"});
			//$('#fePaymentWay').combobox('disable');
			comboboxUtil.setValue('feContinueProduct', 1);
			$('#feContinueProduct').combobox('disable');
			//isDisplayDeductInfo(2);
			//$('#returnSame').attr('checked','checked');
			//$('#returnSame').attr('disabled','disabled');
			//isReturnSame(true);
			$('#feInterestRate').combobox({required: false});
			$('#feTerm').combobox({required: false});
			$('#feFoursName').validatebox({required: false, validType: "fourS[0]"});
			$('.carfinance').hide();
		} else {
			//Plus产品
			if(rec.ptProductCode=='zdsyp'||rec.feProduct == '10'||rec.ptProductCode=='zdsxp'||rec.feProduct == '9'){
				$('#feContractNo').validatebox({required: true, validType: "feContractNoPLUS['add']"});
			}else{
				$('#feContractNo').validatebox({required: true, validType: "feContractNo['add']"});
			}
	//		$('#feContractNo').validatebox({required: true, validType: "feContractNo['add']"});
			$('#fePaymentWay').combobox('enable');
			$('#feContinueProduct').combobox('enable');
//			comboboxUtil.clearValue('feContinueProduct');
			$('#returnSame').removeAttr('disabled');
//			isReturnSame(false);
			$('#feInterestRate').combobox({required: false});
			$('#feInterestRate').combobox('select','');
			$('#feTerm').combobox({required: false});
			$('#feTerm').combobox('select','');
			$('#feMonthRepay').val('');
	//		$('#feContractNo').validatebox({required: true, validType: "feContractNo['add']"});
			$('#feFoursName').validatebox({required: false, validType: "fourS[0]"});
			$('.carfinance').hide();
		}
	});
	comboboxUtil.addOnChangeEvent(id,function(newValue, oldValue){
		if(!isEmpty(newValue) && !isEmpty(oldValue) && (getProductCode(newValue) == 'zddt' || getProductCode(oldValue) == 'zddt')) {
			clearChinessAmount();
		}
	});
}


//Plus产品的续投产品加载   Sam.J  15.10.30
function loadPlusProductForContinue(id) {
	comboboxUtil.setComboboxByUrl(id, getContextPath() + "/product/purchase/find/finance/product_Plus", 'id', 'ptProductName', '150', true,function(rec){ 
		//默认不显示划扣信息
//		$(".feDeduct").hide();
//		isDisplayDeductInfo(-1);
		//productTimeValidation(rec.ptProductCode); 
		//是否显示定投
		isDisplayTimeInvestInfo(rec.ptProductCode);
		//是否显示期限类产品到期处理方式
		isDisplayFeContinueProduct(rec.ptProductCode);
		//一切特殊产品的处理初始化，以免影响正常使用
		dealProductInit();
		
		$('#feContractNo').validatebox({required: true, validType: "feContractNoPLUS['add']"});//PLUS产品
//		$('#feContractNo').validatebox({required: true, validType: "feContractNo['add']"});
		$('#fePaymentWay').combobox('enable');
		$('#feContinueProduct').combobox('enable');
//		comboboxUtil.clearValue('feContinueProduct');
		$('#returnSame').removeAttr('disabled');
//		isReturnSame(false);
		$('#feInterestRate').combobox({required: false});
		$('#feInterestRate').combobox('select','');
		$('#feTerm').combobox({required: false});
		$('#feTerm').combobox('select','');
		$('#feMonthRepay').val('');
//		$('#feContractNo').validatebox({required: true, validType: "feContractNo['add']"});
		$('#feFoursName').validatebox({required: false, validType: "fourS[0]"});
		$('.carfinance').hide();
	});
	comboboxUtil.addOnChangeEvent(id,function(newValue, oldValue){
		if(!isEmpty(newValue) && !isEmpty(oldValue) && (getProductCode(newValue) == 'zddt' || getProductCode(oldValue) == 'zddt')) {
			clearChinessAmount();
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

//填充车贷期数
function loadFeTerm(id) {
	comboboxUtil.setComboboxByUrl(id, getContextPath() + "/crm/param/findAllByPrType?prType=cdTerm", 'prValue', 'prName', '150', true);
	//车贷期数选择选择项绑定事件
	$('#' + id).combobox({
		onSelect: function (rec) {
			feInterestRateFeMonthRepay();
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
	var managerRs;
	postAjax(false, getContextPath() + "/crm/param/getStaff?id=" + staffId, function(data) { managerRs = data;}, 'json');
	comboboxUtil.setComboboxByData(id, managerRs, 'id', 'name', '150', true);
	return managerRs;
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
	return loadFeManagerOne('feManager',id);
}

//显示划扣信息
function showDeductInfo() {
	$(".feRemittanceAccountLabel").hide();
	comboboxUtil.removeRequiredAttrAndClearVal('feRemittanceAccount');
	
	$(".feDeduct").show();
	comboboxUtil.addRequiredAttr('feDeductAccount');
	comboboxUtil.addRequiredAttr('feDeductCompany');
}

//隐藏划扣信息
function hideDeductInfo() {
	$(".feDeduct").hide();
	comboboxUtil.removeRequiredAttrAndClearVal('feDeductAccount');
	comboboxUtil.removeRequiredAttr('feDeductCompany');
	//clearElementValueByIds(['feDeductAccount','feDeductAccount','feDeductAccountName','feDeductBankName','feDeductBankAccount','feDeductCompany']);

	$(".feRemittanceAccountLabel").show();
	comboboxUtil.addRequiredAttr('feRemittanceAccount');
}

//划扣账户是否同回款账户相同
function isReturnSame(flag) {
	if(checkboxUtil.isChecked('returnSame')){
		$(".feDeduct").hide();$("#feDeduct").show();$(".fedeductCompany").show();
		comboboxUtil.setValue('feDeductAccount', comboboxUtil.getValue('feReturnAccount'));
		clearElementValueByIds(['feDeductAccountName','feDeductBankName','feDeductBankAccount']);
		//划扣账户下拉框不可下拉
		//$('#feDeductAccount').combobox('disable');
	}else{
		$(".feDeduct").show();
		if(flag != true) {
			$('#feDeductAccount').combobox('clear');
		    $('#feDeductAccount').combobox('enable');
		}
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
	postAjax(false, getContextPath() + "/product/purchase/get/product?id=" + id, function(data) { product = data}, 'json');
	return product.ptProductCode;
}

//获取单个理财对象
function getFinance(id) {
	var obj;
	postAjax(false, getContextPath() + "/product/purchase/get/finance/product?id=" + id, function(data) { obj = data}, 'json');
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
	loadFeReturnAccountDetail(getSingleObject(customerBanks, row.feReturnAccount));
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
	postAjax(false, getContextPath() + "/product/purchase/find/customer/bank?id=" + id, function(data) {customerBanks = data}, 'json');
	return customerBanks;
}

//加载理财业务信息
function loadFinance(id){
	$('.carfinance').hide();
	var obj = getFinance(id),productCode = getProductCode(obj.feProduct);
//	if (obj.feProduct == 7) {
//		$('#feInterestRate').combobox({required: true});
//		$('#feTerm').combobox({required: true});
//		$('.carfinance').show();
//	} else {
//		$('#feInterestRate').combobox({required: false});
//		$('#feTerm').combobox({required: false});
//		$('.carfinance').hide();
//	}
	//是否显示定投信息
	isDisplayTimeInvestInfo(productCode);
	//显示大写金额
	productCode == 'zddt' ? formatChineseAmount(obj.feTimeInvestAmount,'chinessAmount') : formatChineseAmount(obj.feAmount,'chinessAmount');
	//是否显示划扣信息
	isDisplayDeductInfo(obj.fePaymentWay);
	//加载客户信息
	loadCustomerInfo(obj);
	//初始化新银行信息
	initBankInfo(obj);
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
	postAjax(false, getContextPath() + "/finance/uc/getFinanceCenterAndGroup?busiId=" + rec.id ,function(data){
		rec.salesTeam = data[0];
		rec.salesDepartment = data[1];
	},'json');
}

function init(obj){
	//控制字体靠右显示
	$(".m_table td").has("label").css("text-align","right");
	//填充产品类型 
	loadFeProduct('feProduct');
	//填充证件类型
	loadIdtype('idtype',obj ? obj.idtype : '');
	//填充协议版本
	loadFeProtocolVersion('feProtocolVersion',obj ? obj.feProtocolVersion : '');
	//填充支付方式
	loadFePaymentWay('fePaymentWay',obj ? obj.fePaymentWay : '');
	//填充到期处理方式
	loadFeContinueProduct('feContinueProduct',obj ? obj.feContinueProduct : '');
	//填充管理费折扣
	loadFeManageFee('feManageFee',obj ? obj.feManageFee : '');
	//填充客户经理
	//loadFeManager('feManager');
	//填充汇入行别
	loadFeRemittanceAccount('feRemittanceAccount');
	//填充年化利率
	loadFeInterestRate('feInterestRate');
	//填充车贷期数
	loadFeTerm('feTerm');
	if(obj && obj.feProduct) {
		if (obj.feProduct == '7') {
			$('#feInterestRate').combobox({required: true});
			$('#feTerm').combobox({required: true});
			$('.carfinance').show();
		} else {
			$('#feInterestRate').combobox({required: false});
			$('#feTerm').combobox({required: false});
			$('.carfinance').hide();
		}
	}
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
function isDisplayTimeInvestInfo(val) { val == 'zddt' ? showTimeInvestInfo() : hideTimeInvestInfo();}

//是否显示划扣信息
function isDisplayDeductInfo(val) {val == '2' ? showDeductInfo() : hideDeductInfo();}

//是否显示期限类产品到期处理方式
function isDisplayFeContinueProduct(val) {
	if(val == 'zdsy' || val == 'zdjx' || val == 'zdsx' || val == 'zdcd' || val == 'ywy' || val == 'zdsyp' || val == 'zdsxp'|| val == 'zdfx') {
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
	$('#feTerm').combobox({required: false});   //期数变为不用必填
	$('.carfinance').hide();   //影藏贷里淘金的相关页面布局
	$('#feFoursName').validatebox({required: false, validType: "fourS[0]"}); //4S门面信息不为必填
	$('#returnSame').removeAttr('disabled');
	$('#returnSame').attr('checked',false);//回款账户信息
	$('#fePaymentWay').combobox('enable');   
	//comboboxUtil.removeRequiredAttr('fePaymentWay');//支付方式默认可选
	$('#feContinueProduct').combobox('enable'); //到期续投处理方式	
}


//一切特殊产品的处理初始化，以免影响正常使用
function dealProductInits(){
	$('#feTerm').combobox({required: false});   //期数变为不用必填
	$('.carfinance').hide();   //影藏贷里淘金的相关页面布局
	$('#feFoursName').validatebox({required: false, validType: "fourS[0]"}); //4S门面信息不为必填
	$('#returnSame').removeAttr('disabled');
	$('#returnSame').attr('checked',false);//回款账户信息
	$('#fePaymentWay').combobox('enable');   
}

//产品下拉框变更时触发的方法
function changeDataByProduct(rec){
		//默认不显示划扣信息
//		$(".feDeduct").hide();
		//productTimeValidation(rec.ptProductCode); 
		//是否显示定投
		isDisplayTimeInvestInfo(rec.ptProductCode);
		//是否显示期限类产品到期处理方式
		isDisplayFeContinueProduct(rec.ptProductCode);
		//一切特殊产品的处理初始化，以免影响正常使用
		dealProductInit();
		//车贷产品（贷里淘金）
		if (rec.ptProductCode=='zdcd'||rec.feProduct == '7') {
			$('.carfinance').show();   //车贷相关页面布局显示
			$('#feInterestRate').combobox({required: true});
			$('#feContractNo').validatebox({required: true, validType: "feContractCD['add']"});
			$('#feFoursName').validatebox({required: true, validType: "fourS[1]"});
			$('#feTerm').combobox({required: true});  //期数必填
		}
		//月稳盈产品
		else if (rec.ptProductCode=='ywy'||rec.feProduct == '8') {
			$('#feContractNo').validatebox({required: true, validType: "zd_ywy_contractno"});
			$('#feAmount').validatebox({required: true, validType: "zd_ywy_money"});
			comboboxUtil.setValue('fePaymentWay', 2);
			$('#fePaymentWay').combobox('disable');
			comboboxUtil.setValue('feContinueProduct', 1);
			$('#feContinueProduct').combobox('disable');
			isDisplayDeductInfo(2);
			$('#returnSame').attr('checked','checked');
			$('#returnSame').attr('disabled','disabled');
			isReturnSame(true);
			$('#feInterestRate').combobox({required: false});			
		} else {
			//Plus产品
			if(rec.ptProductCode=='zdsyp'||rec.feProduct == '10'||rec.ptProductCode=='zdsxp'||rec.feProduct == '9'){
				$('#feContractNo').validatebox({required: true, validType: "feContractNoPLUS['add']"});
			}else{
				$('#feContractNo').validatebox({required: true, validType: "feContractNo['add']"});
			}
			
//			comboboxUtil.clearValue('feContinueProduct');
			$('#returnSame').removeAttr('disabled');
//			isReturnSame(false);
			$('#feInterestRate').combobox({required: false});
			$('#feInterestRate').combobox('select','');
			$('#feTerm').combobox('select','');
			$('#feMonthRepay').val('');		
		}
}

/*----------房产项目新增方法-------------*/

//房产项目专用加载方法
function loadFeProductForHouse(id) {
	comboboxUtil.setComboboxByUrl(id, getContextPath() + "/product/purchase/find/finance/product_forhouse", 'id', 'ptProductName', '150', true,function(rec){ 
		isDisplayDeductInfo(-1);
        //封装成另外方法，当修改页面加载数据时也可调用
		changeDataByProduct(rec);
		if(rec.ptProductCode=='zdjx'){
			$('#feAmount').validatebox({required: true, validType: "zd_house_money"});
			$('#feContinueProduct').combobox('disable'); //到期续投处理方式
			comboboxUtil.setValue('feContinueProduct', 1);
			comboboxUtil.setValue('fePaymentWay', null);
		}
	});
	comboboxUtil.addOnChangeEvent(id,function(newValue, oldValue){
		if(!isEmpty(newValue) && !isEmpty(oldValue) && (getProductCode(newValue) == 'zddt' || getProductCode(oldValue) == 'zddt')) {
			clearChinessAmount();
		}
	});
}


//获取南京房产的银行信息
function getHouseBankAccounts() {
	var houseBanks;
	postAjax(false, getContextPath() + "/product/purchase/find/house/bank", function(data) {houseBanks = data}, 'json');
	return houseBanks;
}

//加载回款银行下拉框里的数据为南京地产公司账户
function loadFeReturnAccountComboboxDataForHouse(reaccountid) {
	var banks=getHouseBankAccounts();
	comboboxUtil.setComboboxByData('feReturnAccount', banks, 'id', 'baAccount', '200', true);
	comboboxUtil.addOnSelectEvent('feReturnAccount',feReturnAccountSelectEvent);
	//格式化银行显示
	formatBankAccount('feReturnAccount');
	if(reaccountid!=null){
		var bank = getBankAccountById(reaccountid);
		for(var i=0;i<banks.length;i++){
			if(banks[i].baAccount==bank.baAccount){
				comboboxUtil.setValue('feReturnAccount', banks[i].id);
			}
		}
	}
}

//根据id获取银行信息
function getBankAccountById(bankid) {
	var bank;
	postAjax(false, getContextPath() + "/product/purchase/find/bank_byid?bankid="+bankid, function(data) {bank = data}, 'json');
	return bank;
}
