/**
 * $(function(){ $('#form_editMainInfo input').each(function () { if
 * ($(this).attr('required') || $(this).attr('validType'))
 * $(this).validatebox(); }) });
 */

$.extend($.fn.validatebox.defaults.rules, {
    EHS: {
        validator: function (value, param) {
            return /^\w+[\w\s]+\w+$/.test(value);
        },
        message: '请输入英文姓名'
    },
    CHS: {
        validator: function (value, param) {
            return /^[\u0391-\uFFE5]+$/.test(value);
        },
        message: '请输入汉字'
    },
    ZIP: {
        validator: function (value, param) {
            return /^[0-9]\d{5}$/.test(value);
        },
        message: '邮政编码不存在'
    },
    QQ: {
        validator: function (value, param) {
            return /^[1-9]\d{4,10}$/.test(value);
        },
        message: 'QQ号码不正确'
    },
    mobile: {
        validator: function (value, param) {
        	return /^(13|15|18|14|17)\d{9}$/i.test(value); 
            // return /^((\(\d{2,3}\))|(\d{3}\-))?13\d{9}$/.test(value);
        },
        message: '手机号码不正确'
    },
    email: {
        validator: function (value, param) {
        	return  /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value); 
        },
        message: '请输入有效的电子邮件地址'
    },
    loginName: {
        validator: function (value, param) {
            return /^[\u0391-\uFFE5\w]+$/.test(value);
        },
        message: '登录名称只允许汉字、英文字母、数字及下划线。'
    },
    safepass: {
        validator: function (value, param) {
            return safePassword(value);
        },
        message: '密码由字母和数字组成，至少6位'
    },
    equalTo: {
        validator: function (value, param) {
            return value == $(param[0]).val();
        },
        message: '两次输入的字符不一至'
    },
    number: {
        validator: function (value, param) {
            return /^\d+$/.test(value);
        },
        message: '请输入数字'
    },
    doubleNumber:{ /*Jinghr,double数值校验*/
    	validator: function(value,param){
               return  /^[0-9]{0,15}(\.[0-9]{0,2})?$/.test(value) && value > 0
    	},
    	message: '请输入正确数值'
    },
    numberL: {
        validator: function (value, param) {
            if(/^\d+$/.test(value)){
            	 if(value.length >= param[0]){
            		return  value.length <= param[1];
            	 }else{
            		 return false;
            	 }
            }else{
            	 return false;
            }
        },
        message: '请输入{0}到{1}位的数字'
    },
    idcard: {
        validator: function (value, param) {
            return idCard(value);
        },
        message:'请输入正确的身份证号码'
    },
    minlength: {
    	validator: function (value, param) {
            return value.length >= param[0];
        },
        message:'最少输入{0}字符'
    },
    maxlength: {
    	validator: function (value, param) {
            return value.length < param[0];
        },
        message:'最多输入{0}字符'
    },
    minamount: {
    	validator: function (value, param) {
            return value >= param[0];
        },
        message:'最小金额不能小于{0}'
    },
    maxamount: {
    	validator: function (value, param) {
            return value < param[0];
        },
        message:'最大金额不能大于{0}'
    },

    validnum: {
    	validator: function (value, param) {
            return /^\d+$/.test(value) && value <= param[0]&&value >= 0;
        },
        message:'输入值不能大于{0}或者小于0,且是整数!'
    },
    // 理财合同编号判断
    feContractNo: {
    	validator: function (value, param) {
    		/*
    		if(value.substring(0,3) != 'ZDL') {
    			param[0] = '合同编号前三位只能为ZDL!';
    		}
    		else if (trim(value).length != 16) {
    			param[0] = '合同编号长度为16位!';
    		}
    		else if (!isNumber(value.substring(3,value.length))) {
    			param[0] = '合同编号后13位只能为数字!';
    		}*/
    		var flag = false;
    		if(feContractNoCheck(value)){
    			flag = true;
    			/*if(feContractNoUnique(value,param[0])){ 
    				flag = true;
    			}else{
    				param[0] = '合同编号已经存在!';
    				flag = false;
    			}*/
    			var version = value.substring(7,10);
    			if(!versionCheck(version,value)){
    				param[0] = '所选出借方式与合同版本不匹配';
    				flag = false;
    			}
    		}else{
    			param[0] = '合同编号不合法!';
    			flag = false;
    		}
    		return flag;
        },
        message:'{0}'
    },
   // 贷里淘金合同验证（车贷）
    feContractCD: {
    	validator: function (value, param) {
    		var flag = false;
    		if(feContractNoCheck2(value)){
    			flag = true;
    		}else{
    			param[0] = '合同编号不合法!';
    			flag = false;
    		}

    		return flag;
        },
        message:'{0}'
    },
 // PLUS产品合同编号
    feContractNoPLUS: {
    	validator: function (value, param) {
    		return /^ZDLP\d{12}$/.test(value);
    	},
    	message:'请输入正确的PLUS产品合同编号(如:ZDLP201401300001)'
    },
    //非固续期合同编号验证
    fxContractNo: {
    	validator: function (value, param) {
    		return noFixContractNoCheck(value);
    	},
    	message:'请输入正确的合同编号'
    },
//    feContractNoPLUS: {
//    	validator: function (value, param) {
//    		var flag = false;
//    		if(feContractNoCheck4(value)){
//    			flag = true;
//    		}else{
//    			param[0] = 'PLUS产品合同编号不合法!';
//    			flag = false;
//    		}
//
//    		return flag;
//        },
//        message:'{0}'
//    },
 // 4S必填（贷里淘金）
    fourS: {
    	validator: function (value, param) {
    		var flag = true;
    		if(value.length <param[0]){
    			param[0] = '4S合作门店为必填选项';
    			flag = false;
    		}	
    		return flag;
        },
        message:'4S合作门店为必填选项'
    },
   // 月稳盈起投金额5万元，上限300万元
    zd_ywy_money: {
    	validator: function (value, param) {
    		var flag = false;
    		if(value>=50000&&value<=3000000&&value%50000==0){
    			flag = true;
    		}else{
    			flag = false;
    		}
    		return flag;
        },
        message:'月稳盈起投金额5万元，上限300万元，并且金额必须是5万的倍数!'
    },
 // 南京房产项目  只能投1W或者10W
    zd_house_money: {
    	validator: function (value, param) {
    		var flag = false;
    		if(value==100000||value==10000){
    			flag = true;
    		}else{
    			flag = false;
    		}
    		return flag;
        },
        message:'房产项目理财投入金额只能为1万或10万整!'
    },
    // 当前控件的时间是否大于传递来的时间
    dateGreaterThan: {
    	validator: function (value, param) {
            return convertDate(value).getTime() > convertDate(dateboxUtil.getValue(param[0])).getTime();
        },
        message: "{1}"
    },
    // 当前控件的时间加上指定月份是否大于传递的时间
    beginDateAddMonthBeforeEndDate: {
    	validator: function (value, param) {
    		var sDate = dateboxUtil.getValue(param[0]);
    		if(sDate != "") {
    			return convertDate(value).after(dateUtil.addMonth(sDate,param[1]));
    		}
    		return false;
        },
        message: "{2}"
    },
    //年化利率申请期数验证
    feTerm: {
    	validator: function (value, param) {
    		if (value < 12)
    			return false;
    		return true;
    	},
    	message: "期数必须大于或者等于12,请正确填写."
    },
    mx_contractno: {
    	validator: function (value, param) {
    		return /^MX-\d{4}-\d{2}-C-\d{10}$/.test(value);
    	},
    	message:'请输入正确的合同号码（如：MX-0010-01-C-2013000001）'
    },
    bankAccount:{
    	validator: function (value, param) {
    		return /^(\d|[ ]){5,23}$/.test(value);
    	},
    	message:'请输入正确的银行账号'   	
    },
    zd_ywy_contractno: {
    	validator: function (value, param) {
    		return /^ZDLD\d{12}$/.test(value);
    	},
    	message:'请输入正确的月稳盈合同编号(如:ZDLD201401300001)'
    },
    crApplicationNo: {
    	validator: function (value, param) {
    		var flag = false;
    		if(crApplicationNoCheck(value)){
    			flag = true;
    		}else{
    			flag = false;
    		}

    		return flag;
        },
        message:'请输入正确的客户申请书编号(如:ZDA011400001)'
    }
});

//合同号版本校验-版本在016之下只允许年丰和月收
var versionCheck = function(version,value){
	var product = $('#feProduct').combobox('getValue');
	if("016">version &&product !='3' && product !='4'){
		return false;
	}
	return true;
}

//验证PLUS理财合同的规则
var feContractNoCheck4 = function (value) {//16位以ZDLP开头
	return trim(value).length == 16 && value.substring(0,4) == 'ZDLP' && isNumber(value.substring(4,value.length));
}
//验证理财合同的规则
var feContractNoCheck = function (value) {
	return trim(value).length == 16 && value.substring(0,3) == 'ZDL' && isNumber(value.substring(3,value.length));
}
//验证货里淘金（车贷）理财合同的规则
var feContractNoCheck2 = function (value) {
	return trim(value).length == 16 && value.substring(0,4) == 'ZDLC' && isNumber(value.substring(4,value.length));
}
//验证非固续期合同的规则
var noFixContractNoCheck = function (value) {
	return trim(value).length == 17 && value.substring(0,4) == 'ZDLA' && isNumber(value.substring(4,value.length));
}
//验证理财合同的唯一
var feContractNoUnique = function (value, type) {
	var flag = false;
	postAjax(false, getContextPath() + "/product/purchase/check/feContractNo/unique?feContractNo=" + value + "&type=" + type, function(data) { flag = data}, 'json');
	return flag;
}

//验证货里淘金（车贷）理财合同的规则
var crApplicationNoCheck = function (value) {
	if(value=='')return true;
	return trim(value).length == 12 && value.substring(0,3) == 'ZDA' && isNumber(value.substring(3,value.length));
}

/* 密码由字母和数字组成，至少6位 */
var safePassword = function (value) {
    return !(/^(([A-Z]*|[a-z]*|\d*|[-_\~!@#\$%\^&\*\.\(\)\[\]\{\}<>\?\\\/\'\"]*)|.{0,5})$|\s/.test(value));
}

var isNumber = function (value) {
	return /^\d+$/.test(value);
}

var idCard = function (value) {
    if (value.length != 18 && 18 != value.length) return false;
    var number = value.toLowerCase();
    var d, sum = 0, v = '10x98765432', w = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2], a = '11,12,13,14,15,21,22,23,31,32,33,34,35,36,37,41,42,43,44,45,46,50,51,52,53,54,61,62,63,64,65,71,81,82,91';
    var re = number.match(/^(\d{2})\d{4}(((\d{2})(\d{2})(\d{2})(\d{3}))|((\d{4})(\d{2})(\d{2})(\d{3}[x\d])))$/);
    if (re == null || a.indexOf(re[1]) < 0) return false;
    if (re[2].length == 9) {
        number = number.substr(0, 6) + '19' + number.substr(6);
        d = ['19' + re[4], re[5], re[6]].join('-');
    } else d = [re[9], re[10], re[11]].join('-');
    if (!isDateTime.call(d, 'yyyy-MM-dd')) return false;
    for (var i = 0; i < 17; i++) sum += number.charAt(i) * w[i];
    return (re[2].length == 9 || number.charAt(17) == v.charAt(sum % 11));
}

var isDateTime = function (format, reObj) {
    format = format || 'yyyy-MM-dd';
    var input = this, o = {}, d = new Date();
    var f1 = format.split(/[^a-z]+/gi), f2 = input.split(/\D+/g), f3 = format.split(/[a-z]+/gi), f4 = input.split(/\d+/g);
    var len = f1.length, len1 = f3.length;
    if (len != f2.length || len1 != f4.length) return false;
    for (var i = 0; i < len1; i++) if (f3[i] != f4[i]) return false;
    for (var i = 0; i < len; i++) o[f1[i]] = f2[i];
    o.yyyy = s(o.yyyy, o.yy, d.getFullYear(), 9999, 4);
    o.MM = s(o.MM, o.M, d.getMonth() + 1, 12);
    o.dd = s(o.dd, o.d, d.getDate(), 31);
    o.hh = s(o.hh, o.h, d.getHours(), 24);
    o.mm = s(o.mm, o.m, d.getMinutes());
    o.ss = s(o.ss, o.s, d.getSeconds());
    o.ms = s(o.ms, o.ms, d.getMilliseconds(), 999, 3);
    if (o.yyyy + o.MM + o.dd + o.hh + o.mm + o.ss + o.ms < 0) return false;
    if (o.yyyy < 100) o.yyyy += (o.yyyy > 30 ? 1900 : 2000);
    d = new Date(o.yyyy, o.MM - 1, o.dd, o.hh, o.mm, o.ss, o.ms);
    var reVal = d.getFullYear() == o.yyyy && d.getMonth() + 1 == o.MM && d.getDate() == o.dd && d.getHours() == o.hh && d.getMinutes() == o.mm && d.getSeconds() == o.ss && d.getMilliseconds() == o.ms;
    return reVal && reObj ? d : reVal;
    function s(s1, s2, s3, s4, s5) {
        s4 = s4 || 60, s5 = s5 || 2;
        var reVal = s3;
        if (s1 != undefined && s1 != '' || !isNaN(s1)) reVal = s1 * 1;
        if (s2 != undefined && s2 != '' && !isNaN(s2)) reVal = s2 * 1;
        return (reVal == s1 && s1.length != s5 || reVal > s4) ? -10000 : reVal;
    }
};
