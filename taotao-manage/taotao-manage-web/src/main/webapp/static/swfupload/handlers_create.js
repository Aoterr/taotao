/* Demo Note:  This demo uses a FileProgress class that handles the UI for displaying the file name and percent complete.
The FileProgress class is not part of SWFUpload.
*/


/* **********************
   Event Handlers
   These are my custom event handlers to make my
   web application behave the way I went when SWFUpload
   completes different tasks.  These aren't part of the SWFUpload
   package.  They are part of my application.  Without these none
   of the actions SWFUpload makes will show up in my application.
   ********************** */
function preLoad() {
	if (!this.support.loading) {
		alert("使用上传附件功能需要Flash Player 9.028或更高版本的Flash播放器");
		return false;
	}
}
function loadFailed() {
	alert("附件上传插件读取失败，请清除缓存重试！");
}
function fileQueued(file) {
	if(attachmentSizeList) {
		var sizeObj = getAttachmentSizeObj(attachmentSizeList, file.type);
		if(sizeObj) {
			if (sizeObj.prValue <= 0) {
			}
			else if(file.size > sizeObj.prValue) {
				swfu.cancelUpload(file.id,false);
				$.messager.show({title:'提示',msg:'［'+file.name+'］超过文件限制的大小,请处理后重新上传!'});
				return;
			}
		}
	}
//	if (file.type == '.JPG') {
//		//alert(file.type);
//		//throw new Error("文件超过大小限制,请重新选择上选");
//		swfu.cancelUpload(file.id,false);
//		return;
//	}
	this.customSettings.filesQueue.push(file);
//	console.info(this.customSettings.filesQueue);
	try {
//		console.info(file);
    	var size;
    	var byte;
		if((file.size/1024) < 1024){
			size = (file.size/1024).toFixed(2)+'KB';
			byte = (file.size)+'字节';
		}else if( ((file.size/1024) > 1024) && ((file.size/(1024*1024)) < 1024)){
			size = (file.size/(1024*1024)).toFixed(2)+'M';
			byte = (file.size)+ '字节';
		}else{
			size = (file.size/(1024*1024*1024)).toFixed(2)+'G';
			byte = (file.size)+ '字节';
		}
    	var rows = $('#attachment_list').datagrid('getRows');
    	for(var i=0;i<rows.length;i++){
    		if(file.name==rows[i].name){
    			$.messager.show({title:'提示',msg:'［'+file.name+'］在上传队列中存在,请勿重复上传!'});
    			return ;
    		}
    	}
    	var fileIndex = file.index;
    	//alert(fileIndex);
    	var rowNum = $('#attachment_list').datagrid('getRows').length;
    	//alert(rowNum + "######");
    	var datagrid = $('#attachment_list').datagrid('appendRow',{
    		fileIndex:file.index,
    		id: file.id,
			name : file.name,
			size : size,
			//type : file.type,
			pro : '0%',
			state: '等待上传...',
			option: '<a href="javascript:void(0)" onclick="removeFile1(' + fileIndex + ')">删除</a>'
		});

	} catch (ex) {
		this.debug(ex);
	}
	arr1 = this.customSettings.filesQueue;
}

function removeFile1(fileIndex) {
	if(confirm('确认是否删除文件?')){
		//alert("test8888888888888888888888");
		//alert(fileIndex);
		var arr2 = $('#attachment_list').datagrid('getRows');
		//alert(arr2.length + '======================');
		var fileId = "";
		var fileNum;
		for(var i = 0; i < arr1.length; i++) {
			var fileDes = arr1[i];
			if (fileIndex == fileDes.index) {
				fileId = fileDes.id;
				//alert(fileId);
			}
		}
		for(var j = 0; j < arr2.length; j++) {
			var res = arr2[j];
			//alert(res.fileIndex + '----------');
			if (fileIndex == res.fileIndex) {
				fileNum = $('#attachment_list').datagrid('getRowIndex',arr2[j]);
				//alert(fileNum);
			}
		}
		//alert(fileId);
		this.swfu.cancelUpload(fileId,false);
		$('#attachment_list').datagrid('deleteRow',fileNum);
		//alert('删除成功' + fileIndex);
	}
}

function fileQueueError(file, errorCode, message) {
//	console.info(file);
//	console.info(errorCode);
//	console.info(message);
	var state;
	var status;
	try {
		if (errorCode === SWFUpload.QUEUE_ERROR.QUEUE_LIMIT_EXCEEDED) {
			alert("请不要添加太多的文件.\n" + (message === 0 ? "你的上传已经达到了上限." : "您最多可以选择 " + message + "个文件."));
			return;
		}
		
		//var progress = new FileProgress(file, this.customSettings.progressTarget);
		//progress.setError();
		//progress.toggleCancel(false);
		
		switch (errorCode) {
		case SWFUpload.QUEUE_ERROR.FILE_EXCEEDS_SIZE_LIMIT:
			status = '文件超过大小限制.';
			state = '错误代码: 文件超过大小限制, 文件名: ' + file.name + ', 文件大小: ' + file.size + ', 错误消息: ' + message +')';
			break;
		case SWFUpload.QUEUE_ERROR.ZERO_BYTE_FILE:
			status = '文件大小为0.';
			state = '错误代码: 文件大小为0, 文件名: ' + file.name + ', 文件大小: ' + file.size + ', 错误消息: ' + message +')';
			break;
		case SWFUpload.QUEUE_ERROR.INVALID_FILETYPE:
			status = '非法文件类型.';
			state = '错误代码: 非法文件类型, 文件名: ' + file.name + ', 文件大小: ' + file.size + ', 错误消息: ' + message +')';
			break;
		default:
			if (file !== null) {
				status = '未知错误';
			}
			state = '错误代码: ' + errorCode + ', 文件名: ' + file.name + ', 文件大小: ' + file.size + ', 错误消息: ' + message +')';
			break;
		}
		$.messager.show({title:status,msg:state})
		/*datagrid.datagrid('updateRow',{
			index: file.index,
			row: {
				state: state
			}
		});*/
	} catch (ex) {
		//this.debug(ex);
	}
}

function fileDialogComplete(numFilesSelected, numFilesQueued) {
	try {
		if (numFilesSelected > 0) {
			document.getElementById(this.customSettings.cancelButtonId).disabled = false;
		}
		
		/* I want auto start the upload and I can do that here */
		//this.startUpload();
	} catch (ex)  {
        this.debug(ex);
	}
}

function uploadStart(file) {
	try {
		/* I don't want to do any file validation or anything,  I'll just update the UI and
		return true to indicate that the upload should start.
		It's important to update the UI here because in Linux no uploadProgress events are called. The best
		we can do is say we are uploading.
		 */
		var post_params = this.settings.post_params;
		post_params.fileName = encodeURIComponent(file.name);
		this.setPostParams(post_params);
		var progress = new FileProgress(file, this.customSettings.progressTarget);
		progress.setStatus("上传中...");
		progress.toggleCancel(true, this);
	}
	catch (ex) {}
	
	return true;
}

function uploadProgress(file, bytesLoaded, bytesTotal) {
	var state;
	//alert('fdsfsdfdsfsdfsd');
	try {
		var percent = Math.ceil((bytesLoaded / bytesTotal) * 100) + '%';
		
		if (bytesLoaded == bytesTotal) {
			state = '上传完成.';
		} else {
			state = '上传中...';
		}
		var arr3 = $('#attachment_list').datagrid('getRows');
		for(var k = 0; k < arr3.length; k++) {
			var res = arr3[k];
			//alert(res.fileIndex + '----------');
			var fileIndex2;
			if (file.index == res.fileIndex) {
				fileIndex2 = $('#attachment_list').datagrid('getRowIndex',arr3[k]);
				//alert(fileNum);
			}
		}
		//alert(fileIndex2);
		$('#attachment_list').datagrid('updateRow',{
			index:fileIndex2,
			row: {
				pro: '<div style="background-color:#FFCC00;width:'+percent+';border-color: #FFCC33;border-left:2px solid #006600;border-top:2px solid #006600;">'+percent+'</div></div>',
				state: state
			}
		});
	} catch (ex) {
		this.debug(ex);
	}
}

function uploadSuccess(file, serverData) {
	try {
		var result = eval('('+serverData+')').result,message = "";
		if(result.success){
			message = result.sucMsg;
			var businessId = $('#id').val();
			var type = $('#type').val();
			var customerid = $('#customerid').val();
			var atTypeOne = $('#atTypeOne').combobox('getValue');
			var atType = $('#atType').combobox('getValue');
			var atName = encodeURIComponent($('#atName').val());
			var atMemo = $('#atMemo').val();
			var busiFileId = result.sucMsg;
			var resData;
//			alert(customerid);
//			alert(businessId);
			postAjax(false, getContextPath() + "/attachment/save/one?busiId=" + businessId + "&type=" + type + "&customerid=" + customerid + "&atTypeOne=" 
					+ atTypeOne + "&atType=" + atType + "&atName=" + atName + "&atMemo=" + encodeURI(atMemo) + "&busiFileId=" + busiFileId, function(data) { resData = data;});
		}else{
			message = result.errMsg;
		}
		//去掉删除操作项
		var arr1 = $('#attachment_list').datagrid('getRows');
		for(var k = 0; k < arr1.length; k++) {
			var res = arr1[k];
			var fileIndex3;
			if (file.index == res.fileIndex) {
				fileIndex3 = $('#attachment_list').datagrid('getRowIndex',arr1[k]);
			}
		}
		$('#attachment_list').datagrid('updateRow',{
			index:fileIndex3,
			row: {
				option: ''
			}
		});
		
	} catch (ex) {
		this.debug(ex);
	}
}

function getRootPath(){
	var path_name = window.document.location.pathname;
	var project_name = path_name.substring(0,path_name.substr(1).indexOf('/')+1);
	return project_name;
}

function uploadError(file, errorCode, message) {
	try {
		var progress = new FileProgress(file, this.customSettings.progressTarget);
		progress.setError();
		progress.toggleCancel(false);

		switch (errorCode) {
		case SWFUpload.UPLOAD_ERROR.HTTP_ERROR:
			progress.setStatus("上传失败: " + message);
			this.debug("Error Code: HTTP Error, File name: " + file.name + ", Message: " + message);
			break;
		case SWFUpload.UPLOAD_ERROR.UPLOAD_FAILED:
			progress.setStatus("上传失败.");
			this.debug("Error Code: Upload Failed, File name: " + file.name + ", File size: " + file.size + ", Message: " + message);
			break;
		case SWFUpload.UPLOAD_ERROR.IO_ERROR:
			progress.setStatus("服务器 (IO) 错误");
			this.debug("Error Code: IO Error, File name: " + file.name + ", Message: " + message);
			break;
		case SWFUpload.UPLOAD_ERROR.SECURITY_ERROR:
			progress.setStatus("权限错误");
			this.debug("Error Code: Security Error, File name: " + file.name + ", Message: " + message);
			break;
		case SWFUpload.UPLOAD_ERROR.UPLOAD_LIMIT_EXCEEDED:
			progress.setStatus("超过上传限制.");
			this.debug("Error Code: Upload Limit Exceeded, File name: " + file.name + ", File size: " + file.size + ", Message: " + message);
			break;
		case SWFUpload.UPLOAD_ERROR.FILE_VALIDATION_FAILED:
			progress.setStatus("校验失败.  取消上传.");
			this.debug("Error Code: File Validation Failed, File name: " + file.name + ", File size: " + file.size + ", Message: " + message);
			break;
		case SWFUpload.UPLOAD_ERROR.FILE_CANCELLED:
			// If there aren't any files left (they were all cancelled) disable the cancel button
			if (this.getStats().files_queued === 0) {
				document.getElementById(this.customSettings.cancelButtonId).disabled = true;
			}
			progress.setStatus("取消了");
			progress.setCancelled();
			break;
		case SWFUpload.UPLOAD_ERROR.UPLOAD_STOPPED:
			progress.setStatus("停止了");
			break;
		default:
			progress.setStatus("未知错误: " + errorCode);
			this.debug("Error Code: " + errorCode + ", File name: " + file.name + ", File size: " + file.size + ", Message: " + message);
			break;
		}
	} catch (ex) {
        this.debug(ex);
    }
}

function uploadComplete(file) {
	if (this.getStats().files_queued === 0) {
//		document.getElementById(this.customSettings.cancelButtonId).disabled = true;
//		$("#"+this.customSettings.cancelButtonId).show();
	}
}

// This event comes from the Queue Plugin
function queueComplete(numFilesUploaded) {
//	var status = document.getElementById("divStatus");
//	status.innerHTML = "上传了" + numFilesUploaded + "个文件.";
}
//
function deleteAttachment(clickEvent) {
	//询问是否删除
	$.ajax({type: "DELETE", url: getRootPath() + "/file/delete/" + clickEvent.data.fileId, dataType: "json", 
		success:function(data) {
			$("#"+clickEvent.data.divId).remove();
			//提示成功
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			
		}
	});
}

function getAttachmentSizeObj(sizeList,type) {
	var desType = type.slice(1).toLowerCase();
	for(var k = 0; k < sizeList.length; k++) {
		var obj = sizeList[k];
		if(obj.prName == desType) {
			return obj;
		}
	}
	return null;
}


//检查文件是否上传了附件
function isAttachmentListNull(id) {
	var total = $("input[name='files']").length;
//	var str = $('#' + id).html();
//	var total = str.substr(3,1);
	if (total == 0) {
		return false;
	} else {
		return true;
	}
}