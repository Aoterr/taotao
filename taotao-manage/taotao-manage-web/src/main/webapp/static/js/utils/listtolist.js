/**
fromid:源list的id.
toid:目标list的id.
moveOrAppend参数("move"或者是"append"):
move -- 源list中选中的option会删除.源list中选中的option移动到目标list中,若目标list中已存在则该option不添加.
append -- 源list中选中的option不会删除.源list中选中的option添加到目标list的后面,若目标list中已存在则该option不添加.

isAll参数(true或者false):是否全部移动或添加
*/
jQuery.listTolist = function(fromid,toid,moveOrAppend,isAll) {
	if(moveOrAppend.toLowerCase() == "move") {	//移动
		if(isAll == true) {	//全部移动
			jQuery("#"+fromid+" option").each(function() {
				//将源list中的option添加到目标list,当目标list中已有该option时不做任何操作.
				jQuery(this).appendTo(jQuery("#"+toid+":not(:has(option[value="+jQuery(this).val()+"]))"));
			});
			jQuery("#"+fromid).empty();	//清空源list
		}
		else if(isAll == false) {
			jQuery("#"+fromid+" option:selected").each(function() {
				//将源list中的option添加到目标list,当目标list中已有该option时不做任何操作.
				jQuery(this).appendTo(jQuery("#"+toid+":not(:has(option[value="+jQuery(this).val()+"]))"));
				//目标list中已经存在的option并没有移动,仍旧在源list中,将其清空.
				if(jQuery("#"+fromid+" option[value="+jQuery(this).val()+"]").length > 0) {
					jQuery("#"+fromid).get(0)
					.removeChild(jQuery("#"+fromid+" option[value="+jQuery(this).val()+"]").get(0));
				}
			});
		}
	}
	else if(moveOrAppend.toLowerCase() == "append") {
		if(isAll == true) {
			jQuery("#"+fromid+" option").each(function() {
				jQuery("<option></option>")
				.val(jQuery(this).val())
				.text(jQuery(this).text())
				.appendTo(jQuery("#"+toid+":not(:has(option[value="+jQuery(this).val()+"]))"));
			});
		}
		else if(isAll == false) {
			jQuery("#"+fromid+" option:selected").each(function() {
				jQuery("<option></option>")
				.val(jQuery(this).val())
				.text(jQuery(this).text())
				.appendTo(jQuery("#"+toid+":not(:has(option[value="+jQuery(this).val()+"]))"));
			});
		}
	}
};
/**
功能大体同上("move").
不同之处在于当源list中的选中option在目标list中存在时,源list中的option不会删除.

isAll参数(true或者false):是否全部移动或添加
*/
jQuery.list2list = function(fromid,toid,isAll) {
	if(isAll == true) {
		jQuery("#"+fromid+" option").each(function() {
			jQuery(this).appendTo(jQuery("#"+toid+":not(:has(option[value="+jQuery(this).val()+"]))"));
		});
	}
	else if(isAll == false) {
		jQuery("#"+fromid+" option:selected").each(function() {
			jQuery(this).appendTo(jQuery("#"+toid+":not(:has(option[value="+jQuery(this).val()+"]))"));
		});
	}
};