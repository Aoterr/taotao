<%--
  Created by IntelliJ IDEA.
  User: YMSX30004
  Date: 2016/12/22
  Time: 16:43
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    String callback = request.getParameter("callback");
    if(callback ==null || callback.equals("")){
    	out.print("fun({\"abc\":123})");
    }else{
    out.print(callback+"({\"abc\":123})");
    }
%>
