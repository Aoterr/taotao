<%@ page language="java" pageEncoding="UTF-8"%>
<script type="text/javascript" >
var csSoftPhone;
</script>
<script language="javascript" type="text/javascript" for="CSSPHONE" event="evtLogonSucc">
//alert(" ==登录 suc ! 11==" );
	csSoftPhone_evtLogonSucc();
</script>

<script language="javascript" type="text/javascript" for="CSSPHONE" event="evtLogonFailed(ErrNum)">
//alert(" ==登录失败 ErrNum  : ");
	csSoftPhone_evtLogonFailed(ErrNum);
</script>

<script language="javascript" type="text/javascript" for="CSSPHONE" event="evtStateChange(State)">
//alert("State :"+State);
    csSoftPhone_evtStateChange(State);
</script>

<script language="javascript" type="text/javascript" for="CSSPHONE" event="evtDialSucc">
//alert(" ==拨打 suc ！！  ");
</script>

<script language="javascript" type="text/javascript" for="CSSPHONE" event="evtDialFailed(ErrNum)">
//alert(" ==拨打 Failed :"+ErrNum);
csSoftPhone_evtDialFailed(ErrNum);
</script>


