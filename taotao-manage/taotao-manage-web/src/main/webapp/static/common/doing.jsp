<%@ page language="java" pageEncoding="utf-8"%>
<script language="JavaScript">
	var doingId;
	var doingSeed = 0;
	//让秒表跳一格
	function dongTip() {
		doingSeed++;
		//document.getElementById("timeCount").innerHTML = doingSeed+"";
		$("#timeCount").html(doingSeed);

	}
	function refreshDoding() {
		doingSeed = 0;
		doingId = window.setInterval(dongTip, 1000);

	}
	function showWaitBar()
	{
		$("#main").toggle();
		$("#doing").toggle();
		//refreshDoding();
	}
</script>
<div id="doing" style="display: none">

	<div align="center">
		<table width="100%" border="0" align="center" cellpadding="0" 
			cellspacing="1">
			<thead>
			</thead>
				<tr height="400"  valign="middle">
											<td height="71" align="center" colspan="2" >
											<img src="${ctx }/static/images/285.gif"><br /> <br /><img src="${ctx }/static/images/299.gif" style="margin-left:8px;"></td>
															
														<!--<td width="72%">
														 <span class="prompt">耗时：<label
																id="timeCount">0</label> 秒！

														</span>
														</td> -->
										</tr>
		</table>
		<p>&nbsp;</p>
	</div>
</div>