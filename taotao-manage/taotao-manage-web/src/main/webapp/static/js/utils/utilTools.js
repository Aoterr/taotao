//封装jquery easyui combobox组件
var comboboxUtil = (function() {
	var util = util || {};

	// 根据url填充下拉框
	util.setComboboxByUrl = function(id, url, valueField, textField, width, required, onSelect) {
		$('#' + id).combobox({
			url : url,
			valueField : valueField,
			textField : textField,
			panelHeight : 'auto',
			width : width,
			required : required,
			validType : 'selectValidator["' + id + '"]',			
			filter : function(q, row) {
				return row[$(this).combobox('options').textField].indexOf(q) == 0;
			},
			onSelect : onSelect
		});
		/*
		 * filter : function(q,row){
		 * var selectVal = $(this).combobox('getValue')
		 * var opt = $(this).combobox('getData')
		 * if(opt.prState == '1' || opt.prName == selectVal)
		 * return row[opt.prName].indexOf(9) == 0;
		 * 
		 * }
		 * 
		 * 
		 * 
		 * */
// $('#' + id).combobox('textbox').bind('blur', function() {
// $('#' + id).combobox('hidePanel');
// });
// $('#' + id).combobox('textbox').bind('focus', function() {
// $('#' + id).combobox('showPanel');
// });
		$('#' + id).combobox('textbox').focus(function(){
			$('#' + id).combobox('showPanel');
			});

	},

	// 根据url填充下拉框 高度固定
	util.setComboboxByUrlWithpanelHeight = function(id, url, valueField, textField, width, required, onSelect) {
		$('#' + id).combobox({
			url : url,
			valueField : valueField,
			textField : textField,
			width : width,
			required : required,
			validType : 'selectValidator["' + id + '"]',
			filter : function(q, row) {
				return row[$(this).combobox('options').textField].indexOf(q) == 0;
			},
			onSelect : onSelect
		});
// $('#' + id).combobox('textbox').bind('blur', function() {
// $('#' + id).combobox('hidePanel');
// });
// $('#' + id).combobox('textbox').bind('focus', function() {
// $('#' + id).combobox('showPanel');
// });
	},
	
	// 根据url填充下拉框 高度固定
	util.setComboboxByUrlWithpanelHeight = function(id, url, valueField, textField, width, required, onSelect,onLoadSuccess) {
		$('#' + id).combobox({
			url : url,
			valueField : valueField,
			textField : textField,
			width : width,
			required : required,
			validType : 'selectValidator["' + id + '"]',
			filter : function(q, row) {
				return row[$(this).combobox('options').textField].indexOf(q) == 0;
			},
			onSelect : onSelect,
			onLoadSuccess : onLoadSuccess
		});

	},

	// 根据数据源填充下拉框
	util.setComboboxByData = function(id, data, valueField, textField, width, required, onSelect) {
		$('#' + id).combobox({
			data : data,
			valueField : valueField,
			textField : textField,
			panelHeight : 'auto',
			width : width,
			required : required,
			validType : 'selectValidator["' + id + '"]',
			filter : function(q, row) {
				return row[$(this).combobox('options').textField].indexOf(q) == 0;
			},
			onSelect : onSelect
		});
// $('#' + id).combobox('textbox').bind('blur', function() {
// $('#' + id).combobox('hidePanel');
// });
// $('#' + id).combobox('textbox').bind('focus', function() {
// $('#' + id).combobox('showPanel');
// });
	},
	
	//编辑页面下拉框
	util.editComboboxByUrl = function(id, url,value, valueField, textField, width, required, onSelect) {
		
		var combData = [];
		postAjax(false,url,function(data){
			   for(var i=0;i<data.length;i++){			
				   if(data[i].prState == '1' || data[i].prValue == value){
					   combData.push(data[i]);
				   }
			   }			  
		},'json')
		util.setComboboxByData(id, combData, valueField, textField, width, required, onSelect);
	},

	//编辑页面下拉框
	util.editComboboxByData = function(id, data,value, valueField, textField, width, required, onSelect) {
		
		var combData = [];
			   for(var i=0;i<data.length;i++){			
				   if(data[i].prState == '1' || data[i].prValue == value){
					   combData.push(data[i]);
				   }
			   }			  
		util.setComboboxByData(id, combData, valueField, textField, width, required, onSelect);
	},
	// 根据数据源填充下拉框
	util.setComboboxByDataWithpanelHeight = function(id, data, valueField, textField, width, required, onSelect) {
		$('#' + id).combobox({
			data : data,
			valueField : valueField,
			textField : textField,
			width : width,
			required : required,
			validType : 'selectValidator["' + id + '"]',
			filter : function(q, row) {
				return row[$(this).combobox('options').textField].indexOf(q) == 0;
			},
			onSelect : onSelect
		});
	},
	// 给下拉框添加必填属性
	util.addRequiredAttr = function(id) {
		$('#' + id).combobox({
			'required' : true
		});
	},

	// 移除下拉框必填属性
	util.removeRequiredAttr = function(id) {
		$('#' + id).combobox({
			'required' : false
		});
	},

	// 移除下拉框必填属性并清空当前的value
	util.removeRequiredAttrAndClearVal = function(id) {
		this.removeRequiredAttr(id);
		this.clearVal(id);
	},

	// 清空下拉框当前的value
	util.clearVal = function(id) {
		$('#' + id).combobox('clear');
	},

	// 获得下拉框的值
	util.getValue = function(id) {
		return $("#" + id).combobox('getValue');
	},

	// 给下拉框赋值
	util.setValue = function(id, val) {
		$("#" + id).combobox('setValue', val);
	},

	// 获得下拉框Text
	util.getText = function(id) {
		return $("#" + id).combobox('getText');
	},

	util.formatter = function(id, formatter) {
		$('#' + id).combobox({
			formatter : formatter
		});
	},

	util.addOnSelectEvent = function(id, onSelect) {
		$('#' + id).combobox({
			onSelect : onSelect
		});
	},

	util.addOnChangeEvent = function(id, onChange) {
		$('#' + id).combobox({
			onChange : onChange
		});
	}

	return util;
})()

// 封装jquery easyui validationbox
var validationboxUtil = (function() {
	return {
		// 取值
		getValue : function(id) {
			return getVal(id);
		},

		// 赋值
		setValue : function(id, val) {
			setVal(id, val);
		},

		// 清空
		clearValue : function(id) {
			clearValue(id);
		},

		// 添加必填属性
		addRequiredAttr : function(id) {
			$('#' + id).validatebox({
				'required' : true
			});
		},

		// 移除必填属性
		removeRequiredAttr : function(id) {
			$('#' + id).validatebox({
				'required' : false
			});
		},

		// 移除下拉框必填属性并清空当前的value
		removeRequiredAttrAndClearVal : function(id) {
			this.removeRequiredAttr(id);
			this.clearValue(id);
		}
	}

})()

// 封装jquery easyui numberbox
var numberboxUtil = (function() {
	return {
		// 取值
		getValue : function(id) {
			return $('#' + id).numberbox('getValue');
		},

		// 赋值
		setValue : function(id, val) {
			$('#' + id).numberbox('setValue', val);
		},

		// 清空
		clearValue : function(id) {
			$('#' + id).numberbox('clear');
		},

		// 添加必填属性
		addRequiredAttr : function(id) {
			$('#' + id).numberbox({
				'required' : true
			});
		},

		// 移除必填属性
		removeRequiredAttr : function(id) {
			$('#' + id).numberbox({
				'required' : false
			});
		},

		// 移除下拉框必填属性并清空当前的value
		removeRequiredAttrAndClearVal : function(id) {
			this.removeRequiredAttr(id);
			this.clearValue(id);
		}
	}
})()

// 封装jquery easyui datebox
var dateboxUtil = (function() {
	return {
		// 取值
		getValue : function(id) {
			return $('#' + id).datebox('getValue');
		},

		// 赋值
		setValue : function(id, val) {
			$('#' + id).datebox('setValue', val);
		},

		// 清空
		clearValue : function(id) {
			$('#' + id).datebox('clear');
		},

		// 添加必填属性
		addRequiredAttr : function(id) {
			$('#' + id).datebox({
				'required' : true
			});
		},

		// 移除必填属性
		removeRequiredAttr : function(id) {
			$('#' + id).datebox({
				'required' : false
			});
		},

		// 移除下拉框必填属性并清空当前的value
		removeRequiredAttrAndClearVal : function(id) {
			this.removeRequiredAttr(id);
			this.clearValue(id);
		}
	}
})()

// 封装 jquery easyui checkbox组件
var checkboxUtil = (function() {
	return {
		// 是否选中
		isChecked : function(id) {
			return $("#" + id).is(":checked");
		},

		// 选中
		checked : function(id) {
			$("#" + id).attr('checked', 'true')
		},

		// 不选中
		unChecked : function(id) {
			$("#" + id).removeAttr("checked")
		}
	}
})()

// 时间帮助函数
var dateUtil = (function() {
	var date, util = util || {}, dayMillis = 86400000, hourMillis = 3600000, minuteMillis = 60000;

	// 在一个时间上添加月份
	util.addMonth = function(d, m) {
		date = convertDate(d);
		date.setMonth(parseInt(date.getMonth()) + parseInt(m));
		return date;
	},

	// 在一个时间上添加天数
	util.addDate = function(d, day) {
		date = convertDate(d);
		date.setDate(parseInt(date.getDate()) + parseInt(day));
		return date;
	},

	// 两个时间的相差的天数
	util.diffDay = function(sDate, eDate) {
		var ssDate = convertDate(sDate), eeDate = convertDate(eDate);
		var millis = eeDate.getTime() - ssDate.getTime();
		if (millis < 0) {
			return 0;
		}
		return parseInt(millis / 86400000);
	},

	// 两个时间相差的月数,忽略日期不计算
	util.diffMonth = function(sDate, eDate) {
		var ssDate = convertDate(sDate), eeDate = convertDate(eDate);
		if ((eeDate.getTime() - ssDate.getTime()) < 0) {
			return 0;
		}
		return (parseInt(eeDate.getFullYear() * 12) + parseInt(eeDate.getMonth())) - (parseInt(ssDate.getFullYear() * 12) + parseInt(ssDate.getMonth()));
	}

	return util;
})()

// 字符串转时间
function convertDate(val) {
	if (typeof val == "undefined")
		return new Date();
	if (typeof val == "date")
		return val;
	var date = new Date(Date.parse(val));
	if (isNaN(date)) {
		var arys = val.replace(/:/g, "-").replace(" ", "-").replace(".", "-").split('-');
		switch (arys.length) {
		case 7:
			date = new Date(arys[0], --arys[1], arys[2], arys[3], arys[4], arys[5], arys[6]);
			break;
		case 6:
			date = new Date(arys[0], --arys[1], arys[2], arys[3], arys[4], arys[5]);
			break;
		default:
			date = new Date(arys[0], --arys[1], arys[2]);
			break;
		}
	}
	return date;
}

// 扩展日期对象,判断一个时间是否在另一个时间之后
Date.prototype.after = function(date) {
	return this.getTime() - convertDate(date).getTime() >= 0 ? true : false;
}

// 扩展日期对象,判断一个时间是否在另一个时间之前
Date.prototype.before = function(date) {
	return this.getTime() - convertDate(date).getTime() < 0 ? true : false;
}

// 从集合里获得单个对象
function getSingleObject(objectList, id) {
	var len, object;
	len = objectList.length;
	for ( var i = 0; i < len; i++) {
		if (objectList[i].id == id) {
			object = objectList[i];
			break;
		}
	}
	return object;
}

// post提交ajax
function postAjax(async, url, success, dataType) {
	$.ajax({
		type : 'post',
		async : async,
		url : url,
		success : success,
		dataType : dataType
	});
}

// 提交操作
function submit(formId, url, success) {
	$('#' + formId).form('submit', {
		url : url,
		success : success
	})
}

// 带验证的提交操作
function submit(formId, url, onSubmit, success) {
	$('#' + formId).form('submit', {
		url : url,
		onSubmit : onSubmit,
		success : success
	})
}

// 根据id为单个元素赋值
function setVal(id, val) {
	$("#" + id).val(val);
}

// 根据id获取单个元素的值
function getVal(id) {
	return $("#" + id).val();
}

// 根据id清除单个元素的值
function clearValue(id) {
	$("#" + id).val("");
}

// 清除多个指定id元素的值
function clearElementValueByIds(array) {
	var len = array.length;
	for ( var i = 0; i < len; i++) {
		clearValue(array[i]);
	}
}
// 给多个元素赋值
function setElementValues(labels, vals) {
	var len = labels.length;
	for ( var i = 0; i < len; i++) {
		setVal(labels[i], vals[i]);
	}
}

// 格式化参数
function formatVal(list, val) {
	var valStr = '', len = list.length;
	for ( var i = 0; i < len; i++) {
		if (list[i].prValue == val) {
			valStr = list[i].prName;
			break;
		}
	}
	return valStr;
}

//格式化参数
function formatVal2(list, val) {
	var valStr = '', len = list.length;
	for ( var i = 0; i < len; i++) {
		if (list[i].prValue == val) {
			valStr = list[i].prName;
			break;
		}
	}
	return valStr;
}

// 格式化时间
function formatDate(value) {
	if (value == null) {
		return "";
	}
	var date = new Date(value);
	return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
}

// 跳转
function redirect(url) {
	showWaitBar();
	window.location.href = url;
}

// 字母大写转换
function toCase(id) {
	setVal(id, getVal(id).toUpperCase());
}

// 去空格
function trim(value) {
	return value.replace(/[ ]/g, "");
}

// 字母判断
function isLetter(value) {
	return (/^[a-zA-Z]+$/).test(value);
}

function isEmpty(value) {
	return (value == null || value == "" || value.length == 0 || value == 'undefined') ? true : false;
}

// 根据姓名查询客户
function showCustomerByName(name, choiceCustomer,onLoadSuccess) {

	showCustomerByNameAndUrl(name, getContextPath() + "/crm/customer/find/customer?searchVal=" + name, choiceCustomer,onLoadSuccess);
}

//根据姓名查询联系记录
function showContactReordByName(name, choiceCustomer,onLoadSuccess) {
	showContactReordUrl(name, getContextPath() + "/crm/customer/find/contactReordByValue?searchVal=" + name, choiceCustomer,onLoadSuccess);
}

//根据类型查询客户
function showCustomerByType(type,value, choiceCustomer,onLoadSuccess) {

	showCustomerByNameAndUrl(name, getContextPath() + "/crm/customer/find/customerByTypeAndValue?searchType="+type+"&searchValue="+value, choiceCustomer,onLoadSuccess);
}

//根据姓名查询员工
function showStaffByNameAndUrl(name, url, choiceStaff,onLoadSuccess) {
	$('#dg').datagrid({
		url : encodeURI(url),
		columns : [ [ {
			field : 'code',
			title : '员工编号'
		}, {
			field : 'name',
			title : '姓名'
		}, {
			field : 'level',
			title : '职级'
		}, {
			field : 'department',
			title : '部门'
		} ] ],
		onDblClickRow : choiceStaff,
		onLoadSuccess: onLoadSuccess
	});
}
// 根据姓名查询客户
function showCustomerByNameAndUrl(name, url, choiceCustomer,onLoadSuccess) {
	$('#dg').datagrid({
		url : encodeURI(url),
		columns : [ [ {
			field : 'crCustomerNumber',
			title : '客户编号'
		}, {
			field : 'crName',
			title : '姓名'
		}, {
			field : 'crSex',
			title : '性别',
			formatter : function(value, rec) {
				return value == 1 ? '男' : (value == 0 ? '女' : "")
			}
		}, {
			field : 'crIdnum',
			title : '证件号'
		}, {
			field : 'crBirthday',
			title : '生日'
		}, {
			field : 'crCompany',
			title : '工作单位'
		}, {
			field : 'crReg',
			title : '地址'
		} ] ],
		onDblClickRow : choiceCustomer,
		onLoadSuccess: onLoadSuccess
	});
}

//根据客户姓名、身份证号、客户编号查询客户
function showCustomerByNameAndIdnumAndNumber(name, url, choiceCustomer,onLoadSuccess) {
	$('#dg').datagrid({
		url : encodeURI(url),
		columns : [ [ {
			field : 'crCustomerNumber',
			title : '客户编号'
		}, {
			field : 'crName',
			title : '客户姓名'
		}, {
			field : 'crSex',
			title : '性别',
			formatter : function(value, rec) {
				return value == 1 ? '男' : (value == 0 ? '女' : "")
			}
		}, {
			field : 'crIdnum',
			title : '证件号码',
			formatter : function(value,rec){
				return null==value?'': '******'+value.substring(6,value.length);
			}
		}, {
			field : 'crBirthday',
			title : '出生日期'
		}, {
			field : 'id',
			title : '联系地址',
			formatter : function(value,rec){
				return getPostalAddr(value)
			}
				
		} ] ],
		onDblClickRow : choiceCustomer,
		onLoadSuccess: onLoadSuccess
	});
}

//根据姓名查询联系记录
function showContactReordUrl(name, url, choiceCustomer,onLoadSuccess) {
	$('#dg').datagrid({
		url : encodeURI(url),
		columns : [ [ {
			field : 'crCustomerNumber',
			title : '客户编号'
		}, {
			field : 'crName',
			title : '姓名'
		}, {
			field : 'crSex',
			title : '性别',
			formatter : function(value, rec) {
				return value == 1 ? '男' : (value == 0 ? '女' : "")
			}
		}, {
			field : 'crIdnum',
			title : '证件号'
		}, {
			field : 'crCompany',
			title : '工作单位'
		}, {
			field : 'crReg',
			title : '地址'
		} , {
			field : 'recordType',
			title : '记录来源',
			formatter : function(value, rec) {
				return value == 1 ? '客户' : (value == 2 ? 'APP' : "")
			}
		}] ],
		onDblClickRow : choiceCustomer,
		onLoadSuccess: onLoadSuccess
	});
}

// 根据出借编号查找理财信息(非续投)
function findFinanceByFeLendNo(feLendNo, Callback,onLoadSuccess) {
	var url = getContextPath() + "/finance/find/lendNo?feLendNo=" + feLendNo
	findFinance(url, Callback,onLoadSuccess);
}

//根据出借编号查找理财信息(续投)
function findFinanceByFeLendNo1(feLendNo, Callback,onLoadSuccess) {
	var url = getContextPath() + "/finance/find/lendNo1?feLendNo=" + feLendNo
	findFinance(url, Callback,onLoadSuccess);
}

/********************************民信********************************/
//根据出借编号查找理财信息(续投)
function findFinanceByFeLendNo_MX(feLendNo, Callback,onLoadSuccess) {
	var url = getContextPath() + "/finance/mx/find/feLendNo?feLendNo=" + feLendNo
	findFinance(url, Callback,onLoadSuccess);
}

//根据出借编号查找理财信息(非续投)
function findFinanceByFeLendNoEx_MX(feLendNo, Callback,onLoadSuccess) {
	var url = getContextPath() + "/finance/mx/find/feLendNoEx?feLendNo=" + feLendNo
	findFinance(url, Callback,onLoadSuccess);
}
/********************************民信********************************/

function findFinance(url,Callback,onLoadSuccess){
	$('#dg').datagrid({
		url : url,
		columns : [ [ {
			field : 'feProduct',
			title : '产品名称',
			width : 80,
			align : 'center',
			formatter : function(value, rec) {
				return getProductName(value)
			}
		}, {
			field : 'feAmount',
			title : '出借金额',
			width : 80,
			align : 'right'
		}, {
			field : 'feTimeInvestAmount',
			title : '定投金额',
			width : 80,
			align : 'right'
		}, {
			field : 'feContractNo',
			title : '合同编号',
			width : 150,
			align : 'center'
		}, {
			field : 'feLendNo',
			title : '出借编号',
			width : 150,
			align : 'center'
		}, {
			field : 'feRequestDate',
			title : '申请日期',
			width : 80,
			align : 'center',
			formatter : formatDate
		}, {
			field : 'feState',
			title : '状态',
			width : 80,
			align : 'center',
			formatter : function(value, rec) {
				return formatVal(getStateList(), value)
			}
		} ] ],
		onDblClickRow : Callback,
		onLoadSuccess: onLoadSuccess
	});
	
}

function getStateList() {
	var stateList;
	postAjax(false, getContextPath() + '/crm/param/findAllByPrType?prType=requestState', function success(data) {
		stateList = data;
	}, 'json');
	return stateList;
}
//获取客户的通讯地址
function getPostalAddr(id) {
	var postalAddr;
	postAjax(false, getContextPath() + "/crm/customer/get/postal/address?id=" + id, function(data) { 
		postalAddr = data
		}, 'text');
	return postalAddr;
}
// 获取产品名称
function getProductName(id) {
	var product;
	postAjax(false, getContextPath() + "/product/purchase/get/product?id=" + id, function(data) {
		product = data
	}, 'json');
	return product.ptProductName;
}

// 加载审核日志
function loadAuditLog(id, type, label) {
	$('#' + label).datagrid({
		url : getContextPath() + '/audit/find/audit/log?id=' + id + '&type=' + type + '&checkType=',
		columns : [ [ {
			field : 'atInputTime',
			title : '审核日期',
			align : 'center',
			width : 100,
			formatter : formatDateYYYYMMDDHHMMSS
		}, {
			field : 'atInputId',
			title : '审核人',
			align : 'center',
			width : 100,
			formatter : formatAuditor
		}, {
			field : 'atPrivState',
			title : '审核前状态',
			align : 'center',
			width : 100,
			formatter : function(value, rec) {
				return formatVal(getStateList(), value)
			}
		}, {
			field : 'atNextState',
			title : '审核后状态',
			align : 'center',
			width : 100,
			formatter : function(value, rec) {
				return formatVal(getStateList(), value)
			}
		}, {
			field : 'atContent',
			title : '审核备注',
			align : 'left',
			width : 350
		} ] ]
	});
}

//加载质检日志
function revLoadAuditLog(id, type, label) {
	$('#' + label).datagrid({
		url : getContextPath() + '/audit/find/audit/log?id=' + id + '&type=' + type + '&checkType=2',
		columns : [ [ {
			field : 'atInputTime',
			title : '审核日期',
			align : 'center',
			width : 100,
			formatter : formatDateYYYYMMDDHHMMSS
		}, {
			field : 'atInputId',
			title : '审核人',
			align : 'center',
			width : 100,
			formatter : formatAuditor
		}, {
			field : 'atPrivState',
			title : '审核前状态',
			align : 'center',
			width : 100,
			formatter : function(value, rec) {
				return formatVal(getStateList(), value)
			}
		}, {
			field : 'atNextState',
			title : '审核后状态',
			align : 'center',
			width : 100,
			formatter : function(value, rec) {
				return formatVal2(getStateList(), value)
			}
		}, {
			field : 'atContent',
			title : '审核备注',
			align : 'left',
			width : 350
		} ] ]
	});
}

//加载复审核日志
function cheLoadAuditLog(id, type, label) {
	$('#' + label).datagrid({
		url : getContextPath() + '/audit/find/audit/log?id=' + id + '&type=' + type + '&checkType=1',
		columns : [ [ {
			field : 'atInputTime',
			title : '复核日期',
			align : 'center',
			width : 100,
			formatter : formatDateYYYYMMDDHHMMSS
		}, {
			field : 'atInputId',
			title : '复核人',
			align : 'center',
			width : 100,
			formatter : formatAuditor
		}, {
			field : 'atPrivState',
			title : '复核前状态',
			align : 'center',
			width : 100,
			formatter : function(value, rec) {
				return formatVal2(getStateList(), value)
			}
		}, {
			field : 'atNextState',
			title : '复核后状态',
			align : 'center',
			width : 100,
			formatter : function(value, rec) {
				return formatVal(getStateList(), value)
			}
		}, {
			field : 'atContent',
			title : '复核备注',
			align : 'left',
			width : 350
		} ] ]
	});
}

// 审核页面查看附件
function showPreliminaryReviewAttachment(id, type, title) {
	var dialogId = 'showAttachmentDialog', width = $("#main").width() - 850, height = $("#main").height();
	$("body").append("<div id='" + dialogId + "'></div>");
	$('#' + dialogId).dialog({ title: title, width: width, height: height, top: 0, left:850,resizable:true, closed: true, cache: false,modal: false });  
	$('#' + dialogId).dialog('open').dialog('refresh',getContextPath() + '/attachment/attachment/list?id=' + id + '&type=' + type);
}

// 加载审核状态
function loadAuditState(id) {
	var auditStateList, size = 0;
	postAjax(false, getContextPath() + "/crm/param/findAllByPrType?prType=requestState", function(data) {
		auditStateList = data;
	}, 'json');
	comboboxUtil.setComboboxByData(id, filterStateList(auditStateList), 'prValue', 'prName', '150', true);

}

// 过滤掉不需要的状态
function filterStateList(stateList) {
	var newStateList = new Array(), size = 0, len = stateList.length;
	for ( var i = 0; i < len; i++) {
		if (stateList[i].prName != '新建' && stateList[i].prName != '待质检' /*&& stateList[i].prName != '拒绝'*/ && stateList[i].prName != '撤销' && stateList[i].prName != '复检通过' && stateList[i].prName != '复检回退' && stateList[i].prName != '质检复检提交') {
			newStateList[size] = stateList[i];
			size++;
		}
	}
	return newStateList;
}

//加载复审状态
function checkLoadAuditState(id) {
	var auditStateList, size = 0;
	postAjax(false, getContextPath() + "/crm/param/findAllByPrType?prType=requestState", function(data) {
		auditStateList = data;
	}, 'json');
	comboboxUtil.setComboboxByData(id, checkFilterStateList(auditStateList), 'prValue', 'prName', '150', true);

}

// 过滤掉不需要的状态
function checkFilterStateList(stateList) {
	var newStateList = new Array(), size = 0, len = stateList.length;
	for ( var i = 0; i < len; i++) {
		if (stateList[i].prName != '新建' && stateList[i].prName != '待质检' && stateList[i].prName != '拒绝' && stateList[i].prName != '撤销' && stateList[i].prName != '质检通过' && stateList[i].prName != '质检回退' && stateList[i].prName != '质检复检提交') {
			newStateList[size] = stateList[i];
			size++;
		}
	}
	return newStateList;
}

//加载复审状态
function showLoadAuditState(id) {
	var auditStateList, size = 0;
	postAjax(false, getContextPath() + "/crm/param/findAllByPrType?prType=requestState", function(data) {
		auditStateList = data;
	}, 'json');
	comboboxUtil.setComboboxByData(id, showFilterStateList(auditStateList), 'prValue', 'prName', '150', true);

}

// 过滤掉不需要的状态
function showFilterStateList(stateList) {
	var newStateList = new Array(), size = 0, len = stateList.length;
	for ( var i = 0; i < len; i++) {
		if (stateList[i].prName != '新建' && stateList[i].prName != '待质检' && stateList[i].prName != '拒绝' && stateList[i].prName != '撤销' && stateList[i].prName != '质检通过' && stateList[i].prName != '质检回退' && stateList[i].prName != '复检通过' && stateList[i].prName != '复检回退') {
			newStateList[size] = stateList[i];
			size++;
		}
	}
	return newStateList;
}

// 格式化审核人
function formatAuditor(value, rec) {
	return getStaffName(value);
}

// 从UC取单个用户名
function getStaffName(id) {
	var name;
	postAjax(false, getContextPath() + "/crm/param/getStaffName?staffId=" + id, function(data) {
		name = data
	}, 'json');
	return name == 'undifined' ? "" : name;
}

/**
 * 四舍五入法截取一个小数 
 * @param digit 需要进行格式化的数字 
 * @param length 要保留的小数位数
 * @returns {float}
 */
function roundNumber(digit, length) { 
    length = length ? parseInt(length) : 0; 
    if (length <= 0) return Math.round(digit); 
    digit = Math.round(digit * Math.pow(10, length)) / Math.pow(10, length); 
    return digit; 
};

/**
 * Jinghr,2013-7-18 10:19:33
 *  
 * @param d (timestamp)
 * @returns date
 * example:alert(utcformat(1291656749000))
            returned value: (String) 2010/12/06 05:32:29 am
 */

function utcformat(d){
    d= new Date(d);
    var tail= '',  D= [d.getUTCFullYear(), d.getUTCMonth()+1, d.getUTCDate()],
    T= [d.getUTCHours(), d.getUTCMinutes(), d.getUTCSeconds()];
    if(+T[0]> 12){
        T[0]-= 12;
        tail= ' pm '+tail;
    }
    else tail= ' am '+tail;
    var i= 3;
    while(i){
        --i;
        if(D[i]<10) D[i]= '0'+D[i];
        if(T[i]<10) T[i]= '0'+T[i];
    }
    return D.join('/')+' '+T.join(':')+ tail;
}

//添加对class="easyui-validatype"支持 required
function addValidatebox(){
	$('input').each(function(i,j){
		   if($(this).attr('validType') && $(this).attr('required') 
				  ){
		     $(this).validatebox();
		   }
		})
}

//信息显示
function showMessage(title,msg){
	$.messager.show({
		title: title,
		msg: msg
	});
}

//格式化金额为千分位
function formatNumber(s, n){   
	n = n > 0 && n <= 20 ? n : 2;
	s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
	var l = s.split(".")[0].split("").reverse(), r = s.split(".")[1];
	var t = "";
	for (var i = 0; i < l.length; i++) {
		t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
	}
	return t.split("").reverse().join("") + "." + r;
}

//格式化时间 以 / 号分割
function formatDateWithSlash(value) {
	if (value == null) {
		return "";
	}
	var date = new Date(value);
	return date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate();
}