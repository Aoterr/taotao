/**
 * author bianxiaojin
 * mail bianxiaojin@gmail.com
 */

/**
 * $('#dg').buildGridByJs({
 *   createUrl:'',
 *   editUrl:'',
 *   destroyUrl:''
 * });
 */
function showQueryDialog(options){
	var opts = options || {};
	$("div").remove("#"+opts.windowId);
	var dlg = $('#'+opts.windowId);
	if (!dlg.length){  
		dlg = $('<div id="'+opts.windowId+'"></div>').appendTo('body');
		dlg.dialog({
			title:opts.title||'高级查询',
			width:opts.width||400,
			height:opts.height||300,
			iconCls:'icon-adsearch',
			closed:true,
			modal:true,
			href:opts.form,
			buttons:[{
				text:'查询',
				iconCls:'icon-search',
				handler:function(){
					dlg.dialog('close');
					var param = {};
					dlg.find('.query').each(function(){
						var name = $(this).attr('name');
						var val = $(this).val();
						if($(this).attr('type')=='radio'){
							 val = $('input[name="'+name+'"]:checked').val();
						}
						
						if ($(this).hasClass('datebox-f')){
							name = $(this).attr('comboname');
							val = $(this).datebox('getValue');//alert(name+'00'+val);
						} else if ($(this).hasClass('combogrid-f')){
							name = $(this).attr('comboname');
							val = $(this).combogrid('getValue');
						} else if ($(this).hasClass('combobox-f')){
							name = $(this).attr('comboname');
							val = $(this).combobox('getValue');
						} 
						param[name] = val;
					});
					opts.callback(param);
				}
			},{
				text:'重置',
				iconCls:'icon-undo',
				handler:function(){ $('#'+opts.formId).form('clear');}
			},{
				text:'取消',
				iconCls:'icon-cancel',
				handler:function(){dlg.dialog('close');}
			}]
		});
	}
	dlg.dialog('open');
}
function showCrudDialog(opts,url){
	var dlg = $('#'+opts.crud_windowId);
	if (!dlg.length){  
		dlg = $('<div id="'+opts.crud_windowId+'"></div>').appendTo('body');
		dlg.dialog({
			loadingMessage:'数据装载中......',
	        title: opts.crud_winTitle,
	        iconCls:opts.crud_winIco,
	        modal: true,
	        resizable: opts.crud_winResizable,
	        minimizable: opts.crud_winMinimizable,
	        maximizable: opts.crud_winMaximizable,
	        shadow: true,
	        closed: true,
	        collapsible:true,
	        width: opts.crud_winWidth,
	        height: opts.crud_winHeight,
	        buttons:opts.crud_winButtons,
	        toolbar:opts.crud_winToolbar
	    });
	}
	dlg.dialog('open').dialog('refresh',url );
}
(function($){
	function buildGrid(target, options){
		var opts = $.extend({}, $.fn.buildGridByJs.defaults, options);
		
		var crud_windowId = opts.crud_windowId;//添加window,div的页面的名称  1
	    var crud_formId = opts.crud_formId;//要操作的form的名称 1
	    var crud_listUrl = opts.crud_listUrl;//请求的List url的地址 1
	    var crud_inputUrl = opts.crud_inputUrl;//显示load的链接 1
	    var crud_editUrl = opts.crud_editUrl;//显示load的链接 1
	    var crud_viewUrl = opts.crud_viewUrl;//显示load的链接 1
	    var crud_saveUrl = opts.crud_saveUrl;//保存是用的链接 1
	    var crud_deleteUrl = opts.crud_deleteUrl;//要删除使用的链接 1
	    var crud_searchUrl = opts.crud_searchUrl;//要查询的链接
	    var crud_winTitle = opts.crud_winTitle;//标题 
	    var crud_winWidth = opts.crud_winWidth;//宽
	    var crud_winHeight = opts.crud_winHeight;//高
	    
	    var crud_gridToolBar = opts.crud_gridToolBar;//
	    var crud_winButtons = opts.crud_winButtons;//
	    var crud_winToolbar= opts.crud_winToolbar;
	    
	    
	    var crud_gridTitle = opts.crud_gridTitle;//标题
	    var crud_gridWidth = opts.crud_gridWidth;//宽
	    var crud_gridHeight = opts.crud_gridHeight;//高
	    var crud_gridIco = opts.crud_gridIco;//表格标题图标 icon-save  
	   
	    var crud_winIco = opts.crud_winIco;//
	    var crud_winResizable= opts.crud_winResizable;
	    var crud_winMinimizable= opts.crud_winMinimizable;
	    var crud_winMaximizable= opts.crud_winMaximizable;
	    
	    var crud_sortName = opts.crud_sortName;//要排序的列名称
	    var crud_sortOrder = opts.crud_sortOrder;//排序的方式
	    var crud_remoteSort = opts.crud_remoteSort;//是否远程排序
	    var crud_frozenColumns = opts.crud_frozenColumns;//合并列，显示列
	    var crud_columns = opts.crud_columns;//列显示1
	    var crud_pagination = opts.crud_pagination;//是否分页
	    var crud_idField = opts.crud_idField;//
	    var crud_pageSize = opts.crud_pageSize;//
	    var crud_pageList = opts.crud_pageList;
	    
	    var crud_view = opts.crud_view;
	    var crud_detailFormatter = opts.crud_detailFormatter;
	    var crud_onExpandRow =  opts.crud_onExpandRow;
	    
	    var crud_singleSelect = opts.crud_singleSelect;//
	    
	    var crud_query = opts.crud_query;
	    
	    var crud_onLoadSuccess = opts.crud_onLoadSuccess;
		
		$(target).datagrid({
			crud_windowId:crud_windowId,
			crud_winTitle:crud_winTitle,
			crud_winWidth:crud_winWidth,
			crud_winHeight:crud_winHeight,
			crud_winButtons:crud_winButtons,
			crud_winIco:crud_winIco,
			crud_winResizable:crud_winResizable,
			crud_winMinimizable:crud_winMinimizable,
			crud_winMaximizable:crud_winMaximizable,
			crud_winToolbar:crud_winToolbar,
			
			crud_inputUrl:crud_inputUrl,
			crud_editUrl:crud_editUrl,
			crud_viewUrl:crud_viewUrl,
			crud_deleteUrl:crud_deleteUrl,
			crud_formId:crud_formId,
			crud_saveUrl:crud_saveUrl,
			crud_searchUrl:crud_searchUrl,
			crud_query:crud_query,
			
			title:crud_gridTitle,
	        iconCls: crud_gridIco,
	        width:crud_gridWidth,
	        height: crud_gridHeight,
	        nowrap: false,
	        url:crud_listUrl,
	        striped: true,
	        autoFit: true, 
	        sortName: crud_sortName,
	        sortOrder: crud_sortOrder,
	        remoteSort:crud_remoteSort,
	        idField: crud_idField,
	        pageSize:crud_pageSize,
	        pageList:crud_pageList,
	        frozenColumns: crud_frozenColumns,
	        columns: crud_columns,
	        
	        view:crud_view,
	        detailFormatter: crud_detailFormatter,
	        onExpandRow: crud_onExpandRow,
	        
	        onLoadSuccess:crud_onLoadSuccess,
	        //fitColumns:true,
	        //onDblClickRow:function(){ 
			//	$(target).buildGridByJs('input');
			//},
	        pagination: crud_pagination,
	        rownumbers: true,
	        fit:true,
	        singleSelect: crud_singleSelect,
	        toolbar: crud_gridToolBar
	    });
		
		
	}
	
	var methods = {
			openDg: function(jq,param1){
				return jq.each(function(){
					var opts = $(this).datagrid('options');
					showCrudDialog(opts,param1);
				});
			},
		input: function(jq,id,param2){
			return jq.each(function(){
				var opts = $(this).datagrid('options');
				var url = id?(opts.crud_editUrl+'?'+(param2?param2:'id')+'='+id):opts.crud_inputUrl;
				showCrudDialog(opts,url);
			});
		},
		
		view: function(jq,id,param2){
			return jq.each(function(){
				var opts = $(this).datagrid('options');
				var url =opts.crud_viewUrl+(opts.crud_viewUrl.indexOf('?')!=-1?'&':'?')+(param2?param2:'id')+'='+id;
				showCrudDialog(opts,url);
			});
		},
		
		del: function(jq,delId){ 
			return jq.each(function(){
				var dg = $(this);
				var opts = dg.datagrid('options');
				$.ajaxSetup({cache:false,traditional: true});
				if(delId && delId != ""){
					$.messager.confirm('警告', '确认删除吗？',function(a){
			     		if(a)$.post(opts.crud_deleteUrl,{"id":delId},function(data){
			     				var data = eval('('+data+')');
			     				if(data.result.success){
			     					dg.datagrid('reload');
					   			} else {
					   				$.messager.show({
										title:'警告',
										msg:data.result.errMsg
									});
					   			}
			     		});
			     	});
				}else{
			 		var selected = dg.datagrid('getSelections');
			        if (selected == null || selected.length < 1) {
			        	$.messager.show({
							title:'警告',
							msg:'请选择数据！'
						});
			        } else {
			        	$.messager.confirm('警告', '确认删除吗？',function(a){
			        		if(a){
			            		var delIds = new Array();
			            		for(var i=0;i<selected.length;i++){
			            			delIds[i]=selected[i]['id'];
			                	}
			                	$.post(opts.crud_deleteUrl,{"id":delIds},function(data){
			                		var data = eval('('+data+')');
			                		if(data.result.success){
				     					dg.datagrid('reload');
						   			} else {
						   				$.messager.show({
											title:'警告',
											msg:data.result.errMsg
										});
						   			}
			                	});
			            	}
			        	});	               
			        }
			    }
			});
		},
		
		submit: function(jq,param,param2){
			return jq.each(function(){ 
			var dg = $(this);
			var opts = dg.datagrid('options');  
			var subFormId = param?param:opts.crud_formId; 
			var formUrl=param2?param2:opts.crud_saveUrl; 
			$('#'+subFormId).form('submit',{ 
				url:formUrl, 
				onSubmit:function(){ 
					if($(this).form('validate') == false){
						return false;
					}
					return true; 	
				}, 
				success:function(data){ 
					var data = eval('('+data+')');
					if(data.result.success) {
						if(data.result.reload == 'redirect'){
							showCrudDialog(opts,data.url); 
							dg.datagrid('reload');
							$.messager.show({
								title:'提示',
								msg:data.result.sucMsg
							});
						}else if(!data.result.reload){
							$.messager.show({
								title:'提示',
								msg:data.result.sucMsg
							});
						}else if(data.result.reload){
							parent.$('#'+opts.crud_windowId).dialog('close');
							dg.datagrid('reload');
						}
					} else { 
						$.messager.show({
							title:'警告',
							msg:data.result.errMsg
						});
					}
				} 
			}); 
			});
		},
		submitNoVal: function(jq,param,param2){
			return jq.each(function(){ 
			var dg = $(this);
			var opts = dg.datagrid('options');  
			var subFormId = param?param:opts.crud_formId; 
			var formUrl=param2?param2:opts.crud_saveUrl; 
			$('#'+subFormId).form('submit',{ 
				url:formUrl, 
				onSubmit:function(){ 
					return true; 	
				}, 
				success:function(data){ 
					var data = eval('('+data+')');
					if(data.result.success) {
						if(data.result.reload == 'redirect'){
							showCrudDialog(opts,data.result.url);
							$.messager.show({
								title:'提示',
								msg:data.result.sucMsg
							});
						}else if(!data.result.reload){
							$.messager.show({
								title:'提示',
								msg:data.result.sucMsg
							});
						}else if(data.result.reload){
							parent.$('#'+opts.crud_windowId).dialog('close');
							dg.datagrid('reload');
						}
					} else { 
						$.messager.show({
							title:'警告',
							msg:data.result.errMsg
						});
					}
				} 
			}); 
			});
		},
		query: function(jq){
			return jq.each(function(){
				var opts = $(this).datagrid('options');
				var dg = $(this); 
				showQueryDialog({
					title:opts.crud_query.title,
					windowId:opts.crud_query.windowId,
					width:opts.crud_query.width,
					height:opts.crud_query.height,
					form:opts.crud_query.form,
					formId:opts.crud_query.formId,
					callback:function(data){
						dg.datagrid('load', data);
						if (opts.crud_query.callback){
							opts.crud_query.callback();
						}
					}
				});
			});
		},
		//变更单里的特殊查询
		query1 : function (jquery,data) {
			return jquery.each(function () {
				var opts = $(this).datagrid('options'),len = data.length;
				opts.crud_listUrl = opts.crud_searchUrl;
				data.pageNumber = 1;
				opts.queryParams = data;
				buildGrid(this, opts);
			});
		}
		
		
	};
	$.fn.buildGridByJs = function(options, param,param2){
		if (typeof options == 'string'){
			var method = methods[options];
			if (method){
				return method(this, param,param2);
			} else { 
				return this.datagrid(options, param,param2);
			}
		}
		
		options = options || {};
		return this.each(function(){
			buildGrid(this, options);
		});
	};
	
	$.fn.buildGridByJs.defaults = {
			crud_winIco : 'icon-group-add',
			crud_remoteSort : true,
		    crud_pagination : true,
		    crud_singleSelect : false,
		    crud_winResizable: false,
		    crud_winMinimizable: false,
		    crud_winMaximizable: false,
		    crud_onLoadSuccess:function(){
				$(this).datagrid('clearSelections');
	        }
		    
		    
		    /*
		    crud_idField : 'id',
		    crud_sortName : 'id',
		    crud_sortOrder : 'desc',
		    crud_pageSize : 10
		    
		    crud_frozenColumns : opts.crud_frozenColumns;//合并列，显示列
		    crud_columns : opts.crud_columns;
		    crud_gridTitle : ,
		    crud_gridWidth : opts.crud_gridWidth;//宽
		    crud_gridHeight : opts.crud_gridHeight;//高
		    crud_gridIco : opts.crud_gridIco;//表格标题图标 icon-save  
		   
		    crud_onLoadSuccess:function(data){
				$(target).datagrid('clearSelections');
	        }

				crud_winToolbar:[{
								text:'临时保存',
								iconCls:'icon-add',
								handler:function(){
									alert('add')
								}
							},'-',{
								text:'下一步',
								iconCls:'icon-save',
								handler:function(){
									alert('save')
								}
							}],
							
				crud_winButtons : [{
					text:'保存',
					iconCls:'icon-ok',
					handler:function(){
						$('#flowRoleDefinelist_table').buildGridByJs('submit');
					}
				},{
					text:'关闭',
					iconCls:'icon-cancel',
					handler:function(){
						$('#flowRoleDefine_add').dialog('close');
					}
				}],
		   
				crud_gridToolBar:['-',{
					text:'添加',
					iconCls:'icon-add' ,
					handler:function(){
						$('#flowRoleDefinelist_table').buildGridByJs('input');
					}
				}, '-', {
					text:'删除',
					iconCls:'icon-remove' ,
					handler:function(){
						$('#flowRoleDefinelist_table').buildGridByJs('del');
					}
				},'-']
		    
		   		crud_query : {
								title : '高级查询',
								windowId:'flowRoleDefine_query',
								form : 'bpm/flowrole/flowroledefine-query.jsp',
								formId:'flowRoleDefine_queryForm',
								width : 450,
								height : 230,
								callback : function() {
									$('#flowRoleDefine_normalQuery').searchbox('setValue', '');
								}
							}
		    */
		    
		    
								
	};
})(jQuery);