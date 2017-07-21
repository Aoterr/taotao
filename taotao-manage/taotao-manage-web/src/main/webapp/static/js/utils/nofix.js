//获取单个续期业务
function findOneModifycation(id) {
	var obj;
	postAjax(false, getContextPath() + "/nofixpro/purchase/find/one?id=" + id, function(data) { obj = data}, 'json');
	return obj;
}

//格式化到期时间
function formatNofixDate(value) {
	if (value == null) {
		return "";
	}
	var date = new Date(value);
	//判断是否为2月29号
	if(date.getMonth()==1&&date.getDate()==29){
		return (date.getFullYear()+1) + '-' + (date.getMonth() + 1) + '-' + (date.getDate()-1);
	}
	return (date.getFullYear()+1) + '-' + (date.getMonth() + 1) + '-' + date.getDate();
}