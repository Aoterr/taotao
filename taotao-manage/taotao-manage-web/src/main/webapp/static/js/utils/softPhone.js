 //获取工号
function getStaffCode(){
	var staffCode="";
	postAjax(false,getContextPath() +'/crm/visit/getStaffCode',function (data){staffCode=data;}, 'text');
	return staffCode;
}

function csSoftPhone_evtStateChange(State){
	
	if(19==State){
		finishWrapup_onclick();
	}
}

//提示框
function LogP(eventname, msg)
{
    alert( eventname + ": " + msg );
}

function csSoftPhone_evtDialFailed(ErrNum){
	if(ErrNum==''){
		LogP("拨打失败", "登录后，请重试！");
	}
}

function csSoftPhone_evtLogonFailed(ErrNum){
	if(ErrNum=='11004'){
		LogP("登录失败", "工号已存在！");
	}else{
		LogP("登录失败", ErrNum);
	}
}

function csSoftPhone_evtLogonSucc(){
	 //alert("登录成功！");
	 showMessage("提示","话务系统登录成功！");
}

//初次加载
function softphoneOnload() {
	//如果需要加载时自动连接Server
	parent.cmdSetParam_onclick();  
}


//============parent======
//拨号
function cmdDial_onclick(txtPhoneNum) {
	
	var phoneNum ="9"+txtPhoneNum;
	CSSPHONE.Dial(phoneNum,"");
}

//结束通话	、取消外拨	cancelDial
function dropCall_onclick() {
	CSSPHONE.dropCall();
}
//取消登录
function softphoneOnunload() {
    if(CSSPHONE.GetAgentState != 0)
    {
    	CSSPHONE.logOff();
    }
}

function finishWrapup_onclick(){
	
	CSSPHONE.finishWrapup();
}

function cmdSetParam_onclick() {
	
    //可设定软电话的配色  0-银灰风格 1-淡蓝风格
	CSSPHONE.SetInitParam("PHONECOLORPLAN","0");
    //根据业务系统的登录情况，设置工号 999  8002
     var agentID =getStaffCode();
     CSSPHONE.AgentID = agentID;
    //LOGONMODE取值说明：
    //0，则代表座席已经通过认证，由业务将工号及姓名设置进来即可；
     CSSPHONE.setInitParam("LOGONMODE","0");
     CSSPHONE.setInitParam("GETLOCALSETTING","1");
     CSSPHONE.setInitParam("AGENTMSGMODE",2);  //坐席消息弹屏
     
  /*   alert(CSSPHONE.connectServer());
    CSSPHONE.logon();*/
    
    //多租户设置
    //CSSPHONE.ClearTenantsInfo();

    //自动连接Server
    //CSSPHONE.connectServer();
    
    //连接后自动登录
    if(   ! CSSPHONE.connectServer() )
    	LogP("登录失败", "工号"+agentID+",不存在话务系统！");
    else
    	CSSPHONE.logon();//自动登录
}
//==软电话的配色  0-银灰风格 1-淡蓝风格
function cmdSetStyle1_onclick() {
	CSSPHONE.SetInitParam("PHONECOLORPLAN","0");
}
function cmdSetStyle2_onclick() {
	CSSPHONE.SetInitParam("PHONECOLORPLAN","1");
}

function verifyBrowser(){
	 var browserName=navigator.userAgent.toLowerCase();  
	 if(/msie/i.test(browserName) && !/opera/.test(browserName)){  
	    return true;//IE
	 }else{//非IE
		 $.messager.show({
				title: '提示',
				msg: '若要使用话务系统拨号请先打开<br />话务设备,并确保使用 IE浏览器！'
			});
		 return false;
	 }
}
