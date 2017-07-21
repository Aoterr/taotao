function connAndLogin(ACDServer,ACDServerPort,acdCode,acdPhone)
{
    Connect(ACDServer,ACDServerPort);
    var r = Login(acdCode,acdPhone);
    //设置状态为人工忙；坐席状态为“置闲”时无法立即外拨；不做延时的话，可能坐席尚未登录，设置不成功；
    setTimeout("SetAgentState( 4 )",500);
    return  r+"";
}

function Connect(ACDServer,ACDServerPort)
{
//    if(!ACDServer)
//        ACDServer = "172.16.60.244";
//    if(!ACDServerPort)
//        ACDServerPort = "22222";

    var r;
    r = parent.GHOCX.ConnectToACD(ACDServer, ACDServerPort);
//    LogP("Connect: ",r);
    /*
     if (r == 1) {
     document.getElementById("spanServerStatus").innerText = "Connect调用，返回: 1 连接成功";
     } else if (r == 2) {
     document.getElementById("spanServerStatus").innerText = "Connect调用，返回: 2 已经连接";
     } else if (r==0) {
     document.getElementById("spanServerStatus").innerText = "Connect调用，返回:-1 连接失败";
     } else {
     document.getElementById("spanServerStatus").innerText = "Connect调用，返回:"+r+"未知状态" ;
     }
     */
}

function Login(acdCode,acdPhone)
{
    AgentID = acdCode
    AgentName = acdCode
    AgentExt = acdPhone
    GroupID = 1
    AgentLevel = 2
    AgentRight = 0
    var r = parent.GHOCX.Login(AgentID, AgentName, AgentExt, GroupID, AgentLevel, AgentRight);
    //LogP("登陆:", r);
    return r+"";
}

function Logout()
{
    var r = parent.GHOCX.Logout();
//    LogP("坐席登出：",r);
}



function Dial(dailNumber)
{
    SetAgentState( 4 );//cant
    var r;
    r  = parent.GHOCX.Dial( dailNumber );
}


function Onhook(){  
	var r;
	r  = parent.GHOCX.Onhook();
	LogP("座席挂机：",r);
}

function SetAgentState(nState)
{
    //这里最好先判断一下之前的状态，前面是闲才能置忙
    if( nState != 2 && nState != 4 )
    {
        alert( "无此坐席状态！" );
        return 0;
    }
    parent.GHOCX.SetAgentState( nState );
    return 1;
}

function LogP(eventname, msg)
{
    alert( eventname + ": " + msg );
}

function OnAgentConnectToACD(iResult){
    if (iResult == 1) {
        LogP(1, "Connect调用，返回: 1 连接成功");
    } else if (iResult == 2) {
        LogP(1,"Connect调用，返回: 2 已经连接");
    } else if (iResult==-1) {
        LogP(1,"Connect调用，返回:-1 连接失败");
    } else {
        LogP(1, "Connect调用，返回:"+r+"未知状态") ;
    }
    LogP("event OnAgentConnectToACD  iResult:", iResult);
}

function OnAgentStateChanged(iAgentState){
    switch( iAgentState )
    {
        case -1:// document.getElementById("spanAgentState").innerText = "未知状态(-1)";
            LogP("event AgentState:", "未知状态(-1)");
            break;
        case 0: //document.getElementById("spanAgentState").innerText = "离席(0)";
            LogP("event AgentState:", "离席(0)");
            break;
        case 1: //document.getElementById("spanAgentState").innerText = "登录(1)";
            LogP("event AgentState:", "登录(1)");
            break;
        case 2: //document.getElementById("spanAgentState").innerText = "置闲(2)";
            LogP("event AgentState:", "置闲(2)");
            break;
        case 3: //document.getElementById("spanAgentState").innerText = "话务忙(3)";
            LogP("event AgentState:", "话务忙(3)");
            break;
        case 4:// document.getElementById("spanAgentState").innerText = "人工忙(4)";
            LogP("event AgentState:", "人工忙(4)");
            break;
        case 5: //document.getElementById("spanAgentState").innerText = "话后忙(5)";
            LogP("event AgentState:", "话后忙(5)");
            //setTimeout("hi()",5000);
//            SetAgentState(2);
            break;
        case 6: //document.getElementById("spanAgentState").innerText = "被锁定分配(6)";
            LogP("event AgentState:", "被锁定分配(6)");
            break;
        case 7: //document.getElementById("spanAgentState").innerText = "强置忙(7)";
            //SetAgentState(2);
            LogP("event AgentState:", "强置忙(7)");
            break;
        case 8: //document.getElementById("spanAgentState").innerText = "强置闲(8)";
            LogP("event AgentState:", "强置闲(8)");
            break;
        case 9:// document.getElementById("spanAgentState").innerText = "业务锁定(9)";
            LogP("event AgentState:", "业务锁定(9)");
            break;
        default:
            LogP("event AgentState:", "恭喜，出现不可能的状态(iAgentState=" + iAgentState + ")");
            break;
    }
}

function registerACDEventHandler(){
    if(!GHOCX) return;
}