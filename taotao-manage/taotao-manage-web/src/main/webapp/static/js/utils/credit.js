/****************************************以下为编辑页面用到的函数*****************************************/
function init(productId) {
	// 控制Label标签的字体靠右显示
	$(".m_table td").has("label").css("text-align","right");
	//填充产品类型 
	loadCProduct('cProduct');
	//填充证件类型
	loadIdtype('idtype');
	//填充申请期限
	//loadCTerm('cTerm');
	//填充客户经理
	//setFeManager();
}

//填充产品类型
function loadCProduct(id) {
	//comboboxUtil.setComboboxByUrl(id, getContextPath() + '/product/purchase/find/credit/product', 'id', 'ptProductName', '205', true);
	comboboxUtil.setComboboxByUrl('cProduct', '${namespacePath}/find/mx_credit/product_type', 'code', 'loanType', '205', true);
}

//填充产品期数
//function onCProductTypeSelect(rec) {
//	comboboxUtil.setComboboxByData('cTerm', '${namespacePath}/find/mx_credit/term_type?code=' + rec.code, 'id', 'term', '205', true);
//	//$('#cTerm').css('display','');
//}

//填充证件类型
function loadIdtype(id) {
	comboboxUtil.setComboboxByUrl(id, getContextPath() + '/crm/param/findAllByPrType?prType=idtype', 'prValue', 'prName', '205', false);
}

//填充申请期限
//function loadCTerm(id) {
//	var cTermData = [{ "id":1, "text":'6'},{"id":2,"text":'12'},{"id":3,"text":'18'},{"id":4, "text":'24'},{"id":5,"text":'30'},{"id":6,"text":'36' }]
//	comboboxUtil.setComboboxByData('cTerm', cTermData, 'id', 'text', '205', true);
//}

//填充用户银行信息
//function loadBankInfo(customerBanks) {
//	//放款银行下拉框里的数据
//	loadCLoanAccountComboboxData(customerBanks);
//	comboboxUtil.setComboboxByData('cLoanAccount', customerBanks, 'id', 'baAccount', '205', true,function(rec){ 
//		$("#cLoanName").val(rec.baBankName);
//	});
//	//还款银行下拉框里的数据
//	loadCRepaymentAccountComboboxData(customerBanks);
//	comboboxUtil.setComboboxByData('cRepaymentAccount', customerBanks, 'id', 'baAccount', '205', true,function(rec){ 
//		$("#cRepaymentName").val(rec.baBankName);
//	});
//}

//填充客户经理
function setFeManager(){
	comboboxUtil.setComboboxByUrl('cManager', getContextPath() + '/crm/param/getStaffList', 'id', 'name', '205', true);
}

function loadCredit(id) {
	var obj;
	var customerBanks;
	postAjax(false, getContextPath() + "/product/purchase/get/credit/product?id=" + id, function(data) {
		obj = data;
		var validateNum = obj.btValidate;
		//alert(obj.btValidate);
		//alert(validateNum.toString(2));
		var validateArr = null;
		if (validateNum != null) {
			var validateArr = validateNum.toString(2).split("");
		}
		var validateResult = convertValidate(validateArr);
		obj.btValidate = validateResult;
		//alert(obj.btValidate);
		//customerBanks = getCustomerBankAccounts(obj.customerid)
	}, 'json');
	
//	loadBankInfo(customerBanks);
//	loadBankAccount(obj.cLoanAccount,customerBanks,['cLoanAccount', 'cLoanName']);
//	loadBankAccount(obj.cRepaymentAccount,customerBanks,['cRepaymentAccount', 'cRepaymentName']);
	loadCustomerInfo(obj);
	return obj;
}

function setBtValidateElementVal(validateArr) {
	if (validateArr == null) {
		return;
	} else {
		//alert(validateArr);
		for ( var i = 0; i < validateArr.length; i++) {
			$('#action' + validateArr[i]).attr('checked',true);
		}
	}
}

function convertValidate(validateArr) {
	if (validateArr != null && validateArr.length != 0) {
		validateArr.reverse();
		for ( var i = 0; i < validateArr.length; i++) {
			if (validateArr[i] != 0) {
				validateArr[i] = Math.pow(2,i);
			}
		}
	}
	return validateArr;
}

//加载银行详细信息
//function loadBankAccount(account,customerBanks,ids) {
//	var bank = getSingleObject(customerBanks, account);
//	setElementValues(ids,[bank.baAccount, bank.baBankName]);
//}

//加载客户信息
function loadCustomerInfo(row) {
	postAjax(false,  getContextPath() + '/crm/customer/customerById?id=' + row.customerid,function(data){
		row.customer = data.crName;
		row.idnum = data.crIdnum;
		row.idtype = data.crIdtype
	}, 'json');
}

/**********************************************以下为信贷申请页面用到的函数*********************************************************/
//获取客户所有的有效银行信息
//function getCustomerBankAccounts(id) {
//	var customerBanks;
//	postAjax(false, getContextPath() + "/product/purchase/find/customer/bank?id=" + id, function(data) {customerBanks = data}, 'json');
//	return customerBanks;
//}

//加载放款银行下拉框里的数据
//function loadCLoanAccountComboboxData(banks) {
//	comboboxUtil.setComboboxByData('cLoanAccount', banks, 'id', 'baAccount', '205', true);
//	//格式化银行显示
//	formatBankAccount('cLoanAccount');
//}


//加载还款银行下拉框里的数据
//function loadCRepaymentAccountComboboxData(banks) {
//	comboboxUtil.setComboboxByData('cRepaymentAccount', banks, 'id', 'baAccount', '205', false);
//	//格式化银行显示
//	formatBankAccount('cRepaymentAccount');
//}

//格式化银行帐号的显示,银行名称+银行帐号
//function formatBankAccount(id) {
//	comboboxUtil.formatter(id,function(row){return row.baBankName + "  " + row.baAccount});
//}
