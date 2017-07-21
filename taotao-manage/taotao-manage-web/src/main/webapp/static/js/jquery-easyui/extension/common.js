function showBirthday(val) {
    var birthdayValue,sex,sr;
    if (15 == val.length) { //15位身份证号码
        birthdayValue = val.charAt(6) + val.charAt(7);
        if (parseInt(birthdayValue) < 10) {
            birthdayValue = '20' + birthdayValue;
        }
        else {
            birthdayValue = '19' + birthdayValue;
        }
        birthdayValue = birthdayValue + '-' + val.charAt(8) + val.charAt(9) + '-' + val.charAt(10) + val.charAt(11);
        if (parseInt(val.charAt(14) / 2) * 2 != val.charAt(14))
            sex = '1';//男
        else
            sex = '0';//女
        sr = birthdayValue;
    }
    if (18 == val.length) { //18位身份证号码
        birthdayValue = val.charAt(6) + val.charAt(7) + val.charAt(8) + val.charAt(9) + '-' + val.charAt(10) + val.charAt(11)

   + '-' + val.charAt(12) + val.charAt(13);
        if (parseInt(val.charAt(16) / 2) * 2 != val.charAt(16))
            sex = '1';
        else
            sex = '0';

        sr = birthdayValue;
    }
    var list = [];
    list.push(sr);list.push(sex);
    return list;
}

	function addrChanVal(topChannel,midChannel,divChannelMid,dataId){
		var getMidChannel = filterChannel(getChannels,dataId);
		$('#'+midChannel).combobox({
			data:getMidChannel,
			valueField : 'id',
			textField : 'keyName',
			validType : 'selectValidator["'+midChannel+'"]',
			filter : function(q, row) {
				if (row.name.indexOf(q) != -1) {
					return true;
				}
			} 
		});
	}
//渠道通路选择 2014-9-9
	function addrChannel(topChannel,midChannel,divChannelMid,lowChannel,divChannelLow){
		$('#'+topChannel).combobox({//加载省下拉菜单
			data:getChannelTop,
			valueField : 'id',
			textField : 'keyName',
			validType : 'selectValidator["'+topChannel+'"]',
			filter : function(q, row) {
				if (row.name.indexOf(q) != -1) {
					return true;
				}
			} ,
			onSelect:function(record){
				var getMidChannel = filterChannel(getChannels,record.id);
				//alert(getMidChannel);
				if(getMidChannel == ""){
					$('#'+divChannelMid).hide();
					$('#'+midChannel).combobox('clear');
					$('#'+midChannel).combobox('loadData',[{}]);
				}else{
					$('#'+divChannelMid).show();
					$('#'+midChannel).combobox('showPanel');
					$('#'+midChannel).combobox({//加载下拉菜单
					    data:getMidChannel,
					    valueField:'id',
					    textField:'keyName',
					    validType : 'selectValidator["'+midChannel+'"]',
						filter : function(q, row) {
							if (row.name.indexOf(q) != -1) {
								return true;
							}
						}
				     }).combobox('clear');
				}

				},
			onChange:function(newValue,oldValue){
				if(newValue==null||newValue==''){
					$('#'+midChannel).combobox('clear');
					$('#'+midChannel).combobox('loadData',[{}]);
				}
			}
		});
	}
	//渠道过滤
	function filterChannel(getChannels,parentId){
		var list = new Array();
		var len = getChannels.length;
		for(var i=0;i<len;i++){
			if(getChannels[i].parentId==parentId){
					list.push(getChannels[i]);
				}
			}
		return list;
	}
	//渠道通路选择
	function saveChannel(){
		var res = $('#divChannelMid').css('display');
		var channel ='';
		if(res=='none')
			channel= $("input[name='top_channel']").val();
		else if (res=='block')
			channel= $("input[name='mid_channel']").val();
		$('#custCrChannel').attr("value",channel);
		//alert("channel :"+channel);
	}
//地址格式化
	function addrProvice(provice,city,county,street,detail){
		$('#'+provice).combobox({//加载省下拉菜单
			data:getProvinces,
			valueField : 'id',
			textField : 'name',
			validType : 'selectValidator["'+provice+'"]',
			filter : function(q, row) {
				if (row.name.indexOf(q) != -1) {
					return true;
				}
			} ,
			onSelect:function(record){
				
				var getcity = filterArea(getArea,record.id);
				$('#'+city).combobox('showPanel');
				$('#'+city).combobox({//加载市下拉菜单
				    data:getcity,
				    valueField:'id',
				    textField:'name',
				    validType : 'selectValidator["'+city+'"]',
					filter : function(q, row) {
						if (row.name.indexOf(q) != -1) {
							return true;
						}
					},
					onSelect:function(record){
						var getcounty = filterArea(getArea,record.id);
						$('#'+county).combobox('showPanel');
						$('#'+county).combobox({//加载省下拉菜单
							data:getcounty,
							valueField:'id',
							textField:'name',
							validType : 'selectValidator["'+county+'"]',
							filter : function(q, row) {
								if (row.name.indexOf(q) != -1) {
									return true;
								}
							}
						}).combobox('clear');						
						},
					onChange:function(newValue,oldValue){//市清空时清空县
						if(newValue==null||newValue==''){
							$('#'+county).combobox('clear');
							$('#'+county).combobox('loadData',[{}]);
						}
					}
			     }).combobox('clear');
				$('#'+county).combobox('clear');
				$('#'+county).combobox('loadData',[{}]);
				},
			onChange:function(newValue,oldValue){//省清空时清空市县
				if(newValue==null||newValue==''){
					$('#'+city).combobox('clear');
					$('#'+city).combobox('loadData',[{}]);
					$('#'+county).combobox('clear');
					$('#'+county).combobox('loadData',[{}]);
				}
			}
		});
	}
	function addrCity(provice,city,county,street,detail,dataid){
		var getCity = filterArea(getArea,dataid);
		$('#'+city).combobox({//加载市下拉菜单
		    data:getCity,
		    valueField:'id',
		    textField:'name',
		    validType : 'selectValidator["'+city+'"]',
			filter : function(q, row) {
				if (row.name.indexOf(q) != -1) {
					return true;
				}
			},
			onSelect:function(record){
				var getcounty = filterArea(getArea,record.id);
				$('#'+county).combobox({
					data:getcounty,
					valueField:'id',
					textField:'name',
					validType : 'selectValidator["'+county+'"]',
					filter : function(q, row) {
						if (row.name.indexOf(q) != -1) {
							return true;
						}
					}
				}).combobox('clear');
				},
			onChange:function(newValue,oldValue){
				if(newValue==null||newValue==''){
					$('#'+county).combobox('clear');
					$('#'+county).combobox('loadData',[{id:'',name:''}]);
				}
			}
	     });
	}
	function addrCounty(provice,city,county,street,detail,dataid){
		var getCounty = filterArea(getArea,dataid);
		$('#'+county).combobox({
			data:getCounty,
		    valueField:'id',
		    textField:'name',
			validType : 'selectValidator["'+county+'"]',
			filter : function(q, row) {
				if (row.name.indexOf(q) != -1) {
					return true;
				}
			} 
		});
	}
		
	function filterTel(telList,custType,customerid,tlValid){
				var list = new Array(),len = telList.length;
				if(tlValid==true){
					for(i=0;i<len;i++){
						if(telList[i].tlCustType==custType&&telList[i].customerid==customerid&&telList[i].tlValid=="1"){
								list.push(telList[i]);
							}
						}
					}else{
						for(i=0;i<len;i++){
							if(telList[i].tlCustType==custType&&telList[i].customerid==customerid){
									list.push(telList[i]);
								}
							}
						}
				return list;
			}
		//地址过滤
		function filterAddr(addrList,custType,customerid,arValid){
			var list = new Array(),len = addrList.length;
			if(arValid==true){
				for(i=0;i<len;i++){
					if(addrList[i].arCustType==custType&&addrList[i].customerid==customerid&&addrList[i].arValid=="1"){
							list.push(addrList[i]);
						}
					}
				}else{
					for(i=0;i<len;i++){
						if(addrList[i].arCustType==custType&&addrList[i].customerid==customerid){
								list.push(addrList[i]);
							}
						}
					}
			return list;
		}
		//地区过滤
		function filterArea(getArea,fatherid){
			var list = new Array(),len = getArea.length;
			for(i=0;i<len;i++){
				if(getArea[i].fatherId==fatherid){
						list.push(getArea[i]);
					}
				}
			return list;
			}	
		//地区过滤
		function filterAreaById(getArea,id){
			var len = getArea.length;
			for(i=0;i<len;i++){
				if(getArea[i].id==id){
						return getArea[i];
					}
				}
			}
		//多选变单选
		function checkedThis(obj){
			 	obj.siblings().attr('checked',false);
			};
		
		//时间格式化
		function formatDateYYYYMMDDHHMMSS(value){ 
			var date = new Date(value);
			return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()+ ' ' + date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
		}

	$(function() { 
		//文本框长度限制
		$("text[maxlength]").bind('input propertychange', function() {  
	        var maxLength = $(this).attr('maxlength');  
	        if ($(this).val().length > maxLength) {  
	            $(this).val($(this).val().substring(0, maxLength));  
	        }  
	    })  
		//文本框长度限制
		$("textarea[maxlength]").bind('input propertychange', function() {  
	        var maxLength = $(this).attr('maxlength');  
	        if ($(this).val().length > maxLength) {  
	            $(this).val($(this).val().substring(0, maxLength));  
	        }  
	    })

	    //必填项红色星号
		$(".bitian").each(function(){
			$(this).html("<span style='color:red; font-size:13px;font-weight:bold;'>※</span>"+$(this).html())	
		});
		//必填项但页面不作验证蓝色星号
		$(".bitian1").each(function(){
			$(this).html("<span style='color:blue; font-size:13px;font-weight:bold;'>※</span>"+$(this).html())	
		});
		
		//下拉列表输入验证
		$.extend($.fn.validatebox.defaults.rules, {   
		    selectValidator: {   
		        validator: function(value,param){ 
		        	var i =$('#'+param).combobox('getText') ;
		        	var ii =$('#'+param).combobox('getValue') ;
		        	if(i!=ii){return true;}
		        },   
		        message: '请选择!'  
		    }   
		});  
	});

//解决form提交验证disabled无法获取焦点
$(function() {
	$.extend($.fn.form.methods, {  
		validate: function(jq){  
			return validateExtension(jq[0]);  
		},
		load : function(jq, _29) {
			return jq.each(function() {
				_b(this, _29);
			});
		}
	});
});

function _b(_c, _d) {
	if (!$.data(_c, "form")) {
		$.data(_c, "form", {
			options : $.extend({}, $.fn.form.defaults)
		});
	}
	var _e = $.data(_c, "form").options;
	if (typeof _d == "string") {
		var _f = {};
		if (_e.onBeforeLoad.call(_c, _f) == false) {
			return;
		}
		$.ajax({
			url : _d,
			data : _f,
			dataType : "json",
			success : function(_10) {
				_11(_10);
			},
			error : function() {
				_e.onLoadError.apply(_c, arguments);
			}
		});
	} else {
		_11(_d);
	}
	function _11(_12) {
		var _13 = $(_c);
		for ( var _14 in _12) {
			var val = _12[_14];
			var rr = _15(_14, val);
			if (!rr.length) {
				var f = _13.find("input[numberboxName=\"" + _14 + "\"]");
				if (f.length) {
					f.numberbox("setValue", val);
				} else {
					$("input[name=\"" + _14 + "\"]", _13).val(val);
					$("textarea[name=\"" + _14 + "\"]", _13).val(val);
					$("select[name=\"" + _14 + "\"]", _13).val(val);
				}
			}
			_16(_14, val);
		}
		_e.onLoadSuccess.call(_c, _12);
		validateExtension(_c);
	}
	;
	function _15(_17, val) {
		var _18 = $(_c);
		var rr = $("input[name=\"" + _17 + "\"][type=radio], input[name=\""
				+ _17 + "\"][type=checkbox]", _18);
		$.fn.prop ? rr.prop("checked", false) : rr.attr("checked", false);
		rr.each(function() {
			var f = $(this);
			if (f.val() == String(val)) {
				$.fn.prop ? f.prop("checked", true) : f.attr("checked",
						true);
			}
		});
		return rr;
	}
	;
	function _16(_19, val) {
		var _1a = $(_c);
		var cc = [ "combobox", "combotree", "combogrid", "datetimebox",
				"datebox", "combo" ];
		var c = _1a.find("[comboName=\"" + _19 + "\"]");
		if (c.length) {
			for ( var i = 0; i < cc.length; i++) {
				var _1b = cc[i];
				if (c.hasClass(_1b + "-f")) {
					if (c[_1b]("options").multiple) {
						c[_1b]("setValues", val);
					} else {
						c[_1b]("setValue", val);
					}
					return;
				}
			}
		}
	}
	;
}

function showTip(target){  
	var box = $(target);  
	var msg = $.data(target, "validatebox").message;  
	var tip = $.data(target, "validatebox").tip;  
	if (!tip) {  
	    tip = $("<div class=\"validatebox-tip\">" + "<span class=\"validatebox-tip-content\">" + "</span>" + "<span class=\"validatebox-tip-pointer\">" + "</span>" + "</div>").appendTo("body");  
	    $.data(target, "validatebox").tip = tip;  
	}  
	tip.find(".validatebox-tip-content").html(msg);  
	tip.css({  
	    display: "block",  
	    left: box.offset().left + box.outerWidth(),  
	    top: box.offset().top  
	});  
	$('.validatebox-tip').bind('mouseover', function(){  
	    var tip = $.data(target, "validatebox").tip;  
	    if (tip) {  tip.remove();$.data(target, "validatebox").tip = null; }  
	});  
};  

function validateExtension(target){  
	if ($.fn.validatebox) {  
		var box = $(".validatebox-text", target);  
		if (box.length) {  
			box.validatebox("validate");  
			box.trigger("blur");  
			var valid = $(".validatebox-invalid:first", target);
			valid.prop('disabled') ? showTip(valid[0]) : valid.focus();   
			return valid.length == 0;  
		}  
	}  
	return true;  
};
/*
            mergeCellsByField        ：根据字段列表合并jquery--easyui--datagrid中的相应列
            参数1 tableID    ：要操作的table的id;
            参数2 colList    ：要合并的列的列表,用逗号分隔（例如："name,addr,code"）;
            注意事项：
		.用来合并只用于数据呈现的datagrid；
		.该函数在onLoadSuccess中调用，在调用前判断rows的length大于0，可根据实际情况选择是否延时调用。

  onLoadSuccess:function(data){
        if (data.rows.length>0)
        {
            //mergeCellsByField("test","name,addr,code",data);
            setTimeout("mergeCellsByField(\"test\",\"name,code,addr\")",2000); 
        }
    }
               
*/
function mergeCellsByField(tableID,colList){
    var ColArray = colList.split(",");//prName
    var tTable = $('#'+tableID);
    var TableRowCnts=tTable.datagrid("getRows").length;//多少行
    var tmpA;
    var tmpB;
    var PerTxt = "";
    var CurTxt = "";
    var alertStr = "";
    //for (j=0;j<=ColArray.length-1 ;j++ )
    for (j=ColArray.length-1;j>=0 ;j-- )
    {
        //当循环至某新的列时，变量复位。
        PerTxt="";
        tmpA=1;
        tmpB=0;
        
        //从第一行（表头为第0行）开始循环，循环至行尾(溢出一位)
                for (i=0;i<=TableRowCnts ;i++ )
            	{
                    if (i==TableRowCnts)
                    {
                        CurTxt="";
                    }
                    else
                    {
                    	CurTxt=tTable.datagrid("getRows")[i][ColArray[j]];
                    }
                    if (PerTxt==CurTxt)
                    {
                    	tmpA+=1;
                    }
                    else
                    {
	                    tmpB+=tmpA;
	                    tTable.datagrid('mergeCells',{
	                    index:i-tmpA,
	                    field:ColArray[j],
	                    rowspan:tmpA,
	                    colspan:null
	                });
	                tmpA=1;
                    }
                    PerTxt=CurTxt;
            	}
    }
}

function getContextPath() {
	var paths = location.pathname.split("/");
	return "/" + paths[1].toString();
}

function showCommonDialog(id,url,title,width,height){ 
	var dlg = $('#'+id);
	if (!dlg.length){  
		dlg = $('<div id="'+id+'"></div>').appendTo('body');
		dlg.dialog({
	        title: title,
	        iconCls:'icon-tab',
	        loadingMessage:'数据装载中......',
	        modal: true,
	        resizable: false,
	        minimizable: false,
	        maximizable: true,
	        shadow: true,
	        closed: true,
	        collapsible:true,
	        width: width,
	        height: height
	        //buttons:crud_winButtons,
	        //toolbar:crud_winToolbar
	    });
	}
	dlg.dialog('open').dialog('refresh',url );
}

function initTabs(tabsId){
			tabClose(tabsId);
			tabCloseEven(tabsId);
			tabBindOnSelect(tabsId);
		}
		
		function tabBindOnSelect(tabsId){
			$('#'+tabsId).tabs({
		           onSelect: function (title) {
		        	   if(title=='我的桌面')
		        	   tabRefresh(tabsId,title);
		           }
		           
		    });
		}
		
		function createTabsIframe(tabsId,text,url){ 
			
			if(!$('#'+tabsId).tabs('exists',text)){
				 $('#'+tabsId).tabs('add',{
						title:text, 
						closable:true,
						loadingMessage:'数据装载中......'
				});
				 var currTab= $('#'+tabsId).tabs('getTab', text);
				 $('#'+tabsId).tabs('update', { tab: currTab, options: { content: createFrame(url)} });
			}else{
				$('#'+tabsId).tabs('select',text);
				$('#mm-tabupdate').click();
			}
		
			 tabClose(tabsId);
		}
		function createTabsNoIframe(tabsId,text,url){ 
			 if(!$('#'+tabsId).tabs('exists',text)){ 
				 $('#'+tabsId).tabs('add',{
						title:text, 
						href:url,
						closable:true,
						loadingMessage:'数据装载中......'
				});
				 //var currTab= $('#'+tabsId).tabs('getTab', text);
				//$('#'+tabsId).tabs('update', { tab: currTab, options: { href: url} }); 
			}else{
				$('#'+tabsId).tabs('select',text);
				//$('#mm-tabupdate').click();
			} 
			 tabClose(tabsId);
		}
		function createTabsIframeCommon(tabsId,text,url){
			if(!$('#'+tabsId).tabs('exists',text)){
				 $('#'+tabsId).tabs('add',{
						title:text, 
						closable:true,
						loadingMessage:'数据装载中......'
				});
				 var currTab= $('#'+tabsId).tabs('getTab', text);
				 $('#'+tabsId).tabs('update', { tab: currTab, options: { content: createFrame(url)} });
			}else{
				$('#'+tabsId).tabs('select',text);
			}
		}
		function createTabsNoIframeCommon(tabsId,text,url){ 
			if(!$('#'+tabsId).tabs('exists',text)){ 
				 $('#'+tabsId).tabs('add',{
						title:text, 
						href:url,
						closable:true,
						loadingMessage:'数据装载中......'
				});
				/* var currTab= $('#'+tabsId).tabs('getTab', text);
				 $('#'+tabsId).tabs('update', { tab: currTab, options: { href: url} });*/
			}else{
				$('#'+tabsId).tabs('select',text);
			} 
		}
		function tabRefresh(tabsId,title){
			var currTab;
			if(title){ 
				currTab = $('#'+tabsId).tabs('getTab', title);
			}else{
			 	currTab = $('#'+tabsId).tabs('getSelected');
			}
             var iframe = $(currTab.panel('options').content);
 			 var src = iframe.attr('src');
 			 var url = currTab.panel('options').href;
 			 if(url){ 
				currTab.panel('refresh');
 	 		 }
 			 if(src){ 
 				$('#'+tabsId).tabs('update', { tab: currTab, options: { content: createFrame(src)} });
	 			 //var _refresh_ifram = currTab.find('iframe')[0];  
	      	     //_refresh_ifram.contentWindow.location.href=src; 
 			 }
		}
		function clearDom() {
			$("div.window-mask ~ div").remove();
		}
		function refreshLeftMenu(){
			$("#contents").panel("refresh");
		}
		
		
		
		function tabClose(tabsId)
		{
			/*双击关闭TAB选项卡*/
			$("."+tabsId+"-inner").dblclick(function(){
				var subtitle = $(this).children("."+tabsId+"-closable").text();
				$('#'+tabsId).tabs('close',subtitle);
			})
			/*单击关闭选项卡*/
			$("."+tabsId+"-inner").next().click(function(){
				var subtitle = $(this).prev().children("."+tabsId+"-closable").text();
				$('#'+tabsId).tabs('close',subtitle);
			})
			/*为选项卡绑定右键*/
			$("."+tabsId+"-inner").bind('contextmenu',function(e){
				$('#mm').menu('show', {
					left: e.pageX,
					top: e.pageY
				});
				var subtitle =$(this).children("."+tabsId+"-closable").text();
				$('#mm').data("currtab",subtitle);
				//$('#'+tabsId).tabs('select',subtitle);
				return false;
			});
		}
		
		//绑定右键菜单事件
		function tabCloseEven(tabsId)
		{
			//刷新
			$('#mm-tabupdate').click(function(){
				var currtab_title = $('#mm').data("currtab");
				$('#'+tabsId).tabs('select',currtab_title);
				
				var currTab = $('#'+tabsId).tabs('getSelected');
				if(currTab.panel('options').href)
				{
						currTab.panel('refresh');
				}
				if($(currTab.panel('options').content).attr('src'))
				{
						var url=$(currTab.panel('options').content).attr('src');
						$('#'+tabsId).tabs('update',{
							tab:currTab,
							options:{
								content:createFrame(url)
							}
						})
						 tabClose(tabsId);
				}
				
				
				
			})
			//关闭当前
			$('#mm-tabclose').click(function(){
				var currtab_title = $('#mm').data("currtab");
				$('#'+tabsId).tabs('close',currtab_title);
			})
			//全部关闭
			$('#mm-tabcloseall').click(function(){
				$('.'+tabsId+'-inner span').each(function(i,n){
					var t = $(n).text();
					if(t!='我的桌面')
					$('#'+tabsId).tabs('close',t);
				});
			});
			//关闭除当前之外的TAB
			$('#mm-tabcloseother').click(function(){
				$('#mm-tabcloseright').click();
				$('#mm-tabcloseleft').click();
			});
			//关闭当前右侧的TAB
			$('#mm-tabcloseright').click(function(){ 
				var currTab = $('#'+tabsId).tabs('getSelected');
				var seltab_title=currTab.panel('options').title;
				var currtab_title = $('#mm').data("currtab");
				if(seltab_title!=currtab_title)
				$('#'+tabsId).tabs('select',currtab_title);
				var nextall = $('.'+tabsId+'-selected').nextAll();
				if(nextall.length==0){
					$.messager.show({
						title:'提示',
						msg:'后边没有了！'
					});
					//$.messager.alert("提示","后边没有了！","info");
					return false;
				}
				nextall.each(function(i,n){
					var t=$('a:eq(0) span',$(n)).text();
					if(t!='我的桌面')
					$('#'+tabsId).tabs('close',t);
				});
				return false;
			});
			//关闭当前左侧的TAB
			$('#mm-tabcloseleft').click(function(){
				var currTab = $('#'+tabsId).tabs('getSelected');
				var seltab_title=currTab.panel('options').title;
				var currtab_title = $('#mm').data("currtab");
				if(seltab_title!=currtab_title)
				$('#'+tabsId).tabs('select',currtab_title);
				var prevall = $('.'+tabsId+'-selected').prevAll();
				if(prevall.length==0){
					$.messager.show({
						title:'提示',
						msg:'前边没有了！'
					});
					//$.messager.alert("提示","前边没有了！","info");
					return false;
				}
				prevall.each(function(i,n){
					var t=$('a:eq(0) span',$(n)).text();
					if(t!='我的桌面')
					$('#'+tabsId).tabs('close',t);
				});
				return false;
			});

			//退出
			$("#mm-exit").click(function(){
				$('#mm').menu('hide');
			});
		}
		
		function createFrame(url)
		{ 
			var s = '<iframe scrolling="auto" frameborder="0" name="'+url+'" src="'+url+'" style="width:100%;height:100%;padding:0px"></iframe>';
			return s;
		}
		
		function fixWidth(percent)  
		{  
		    return document.body.clientWidth * percent ; 
		}  
		
		
		//表格查询  
		function searchFormCommon(tableId,queryFormId){  
		    var params = $('#'+tableId).datagrid('options').queryParams; //先取得 datagrid 的查询参数  
		    var fields =$('#'+queryFormId).serializeArray(); //自动序列化表单元素为JSON对象  
		    
		    $.each( fields, function(i, field){ 
		        params[field.name] = field.value; //设置查询参数  
		    });   
		    $('#'+tableId).datagrid('reload'); //设置好查询参数 reload 一下就可以了  
		}  
		//清空查询条件  
		function clearFormCommon(tableId,queryFormId){  
		    $('#'+queryFormId).form('clear');  
		    searchForm(tableId,queryFormId);  
		}  
		
		function normalQueryCommon(tableId,field,value){
			 var params = $('#'+tableId).datagrid('options').queryParams;
			 params[field] = value;
			 $('#'+tableId).datagrid('reload'); 
		}
		
		 function clearForm(formId){
			 $('#'+formId).form('clear');  
		 }
//防止panel,dialog,window超出边界
		 function easyuiPanelOnMove(left, top) {
			var parentObj = $(this).panel('panel').parent();
		    if (left < 0) {
		        $(this).window('move', {
		            left : 1
		        });
		    }
		    if (top < 0) {
		        $(this).window('move', {
		            top : 1
		        });
		    }
		    var width = $(this).panel('options').width;
		    var height = $(this).panel('options').height;
		    var right = left + width;
		    var buttom = top + height;
		    var parentWidth = parentObj.width();
		    var parentHeight = parentObj.height();
		    if(parentObj.css("overflow")=="hidden"){
		        if(left > parentWidth-width){
		            $(this).window('move', {
		                "left":parentWidth-width
		            });
		        }
		        if(top > parentHeight-$(this).parent().height()){
		            $(this).window('move', {
		                "top":parentHeight-$(this).parent().height()
		            });
		        }
		    }
		 }

		 

//重写jquery easyui panel的move方法,防止panel,dialog,window超出父元素边界		 
$(function() {
 	$.extend($.fn.panel.methods, {  
 		move : function(jq, _63) {
 			return jq.each(function() {
 				_a(this, _63);
 			});
 		}
 	});
});		 

 function _a(_b, _c) {
		var _d = $.data(_b, "panel").options;
		var _e = $.data(_b, "panel").panel;
		var mainWidth = $("#main").width(),mainHeight = $("#main").height()
		if (_c) {
			if (_c.left != null) {
				_d.left = _c.left;
			}
			
			if(_c.left < 0) {
				_d.left = 1;
			}
			
			if(_c.left > (mainWidth - _c.width)){
				_d.left = mainWidth - _c.width;
			}
			
			
			if (_c.top != null) {
				_d.top = _c.top;
			}
			
			if(_c.top < 0){
				_d.top = 1
			}
			
			if(_c.top > (mainHeight - _c.height)){
				_d.top = mainHeight - _c.height;
			}
		}
		_e.css({
			left : _d.left,
			top : _d.top
		});
		_d.onMove.apply(_b, [ _d.left, _d.top ]);
	}

 /*
  * (父级URL与当前URL比较)
  * return true:false
  * Jinghr,2013-8-27 11:48:15
  * 
  */

 function isTopUrl(){
	 return  top.document.URL == document.URL?false:true;
 }
 
 var parentTabs='tabs'; //主页tabs列表id
 
 //tab页内创建新的tab页的方法      Sam.J  2014.8.13
 function createTabsInframePage(text,url){ 
	 
	 if(!parent.$('#'+parentTabs).tabs('exists',text)){
		 parent.$('#'+parentTabs).tabs('add',{
				title:text, 
				closable:true,
				loadingMessage:'数据装载中......'
		});
		 var currTab=parent.$('#tabs').tabs('getTab', text);
	}else{
		parent.$('#'+parentTabs).tabs('select',text);
	}
	 var currTab =  parent.$('#'+parentTabs).tabs('getSelected'); //获得当前tab
	 parent.$('#'+parentTabs).tabs('update', { tab: currTab, options: { content: createFrame(url)} });
	 tabInframeClose();
	}
 
//tab页内创建新的tab页的绑定方法     Sam.J  2014.8.13
function tabInframeClose(){
	/*双击关闭TAB选项卡*/
	parent.$("."+parentTabs+"-inner").dblclick(function(){
		var subtitle = $(this).children("."+parentTabs+"-closable").text();
		parent.$('#'+parentTabs).tabs('close',subtitle);
	})
	/*单击关闭选项卡*/
	parent.$("."+parentTabs+"-inner").next().click(function(){
		var subtitle = $(this).prev().children("."+parentTabs+"-closable").text();
		parent.$('#'+parentTabs).tabs('close',subtitle);
	})
	/*为选项卡绑定右键*/
	parent.$("."+parentTabs+"-inner").bind('contextmenu',function(e){
		parent.$('#mm').menu('show', {
			left: e.pageX,
			top: e.pageY
		});
		var subtitle =$(this).children("."+parentTabs+"-closable").text();
		parent.$('#mm').data("currtab",subtitle);
		//$('#'+tabsId).tabs('select',subtitle);
		return false;
	});
}
//关闭当前tab页
function closeCurPage(title){
	parent.$('#'+parentTabs).tabs('close',title);
}
//关闭当前tab页刷新Datagrid
function closeCurPageUpdateDatagrid(titlee,title,top){
	parent.reloadTabGrid(titlee,top);
	parent.$('#'+parentTabs).tabs('close',title);
}

//判断数组中包含element元素       by  Sam.J 14.09.09
Array.prototype.contains = function (element) {

  for (var i = 0; i < this.length; i++) {
      if (this[i] == element) {
          return true;
      }
  }
  return false;
}

//加载爱好选项选中值
function initHobbies(data){
	$("input[name='customer_hobby']").each(function(){
	     if(data.contains($(this).val())){
	    	 $(this).attr("checked",'true');
	     }  
	    }) 
}
//更新tab页title
function upTabTitle(title,url){
	closeCurPage(title);
	var currTab = parent.$('#tabs').tabs('getSelected');
	parent.$('#tabs').tabs('update',{tab:currTab,options:{title:title,content:createFrame(url)}});
}

//刷新父Datagrid 创建tab 关闭本页面
function createUpdateTabsInframePage(text,url,titlee,title,top){ 
	parent.reloadTabGrid(titlee,top);
	 if(!parent.$('#'+parentTabs).tabs('exists',text)){
		 parent.$('#'+parentTabs).tabs('add',{
				title:text, 
				closable:true,
				loadingMessage:'数据装载中......'
		});
		 var currTab=parent.$('#tabs').tabs('getTab', text);
	}else{
		parent.$('#'+parentTabs).tabs('select',text);
	}
	 var currTab =  parent.$('#'+parentTabs).tabs('getSelected'); //获得当前tab
	 parent.$('#'+parentTabs).tabs('update', { tab: currTab, options: { content: createFrame(url)} });
	 tabInframeClose();
	 parent.$('#'+parentTabs).tabs('close',title);
}

//绝对定位
function getPos(obj){
    this.Left=0;
    this.Top=0;
    this.Height=obj.offsetHeight;
    this.Width=obj.offsetWidth;
    var tempObj=obj;
    while (tempObj.tagName.toLowerCase()!="body" && tempObj.tagName.toLowerCase()!="html"){
    	this.Left+=tempObj.offsetLeft;
        this.Top+=tempObj.offsetTop;
        tempObj=tempObj.offsetParent;
    }
}