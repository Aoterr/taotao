package com.taotao.web.interceptor;

import com.taotao.common.util.CookieUtils;
import com.taotao.web.UserThreadLocal;
import com.taotao.web.pojo.User;
import com.taotao.web.service.UserService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Created by aoter on 2017/7/28.
 */
public class UserLoginHandlerInterceptor implements HandlerInterceptor {


    public static final String COOKIE_NAME = "TT_TOKEN";

    @Autowired
    UserService userService;

    @Override
    public boolean preHandle(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o) throws Exception {
        UserThreadLocal.set(null);
        String loginUrl = "http://127.0.0.1:8083/user/login.html";
        String token = CookieUtils.getCookieValue(httpServletRequest, COOKIE_NAME);
        if (StringUtils.isEmpty(token)) {
            httpServletResponse.sendRedirect(loginUrl);
            return false;
        }
        User user = userService.queryByToken(token);
        if (null == user) {
            httpServletResponse.sendRedirect(loginUrl);
            return false;
        }
        UserThreadLocal.set(user);
        return true;
    }

    @Override
    public void postHandle(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o, ModelAndView modelAndView) throws Exception {

    }

    @Override
    public void afterCompletion(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o, Exception e) throws Exception {

    }
}
