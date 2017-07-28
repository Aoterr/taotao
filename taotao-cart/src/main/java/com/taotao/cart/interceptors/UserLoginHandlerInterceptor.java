package com.taotao.cart.interceptors;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.taotao.common.util.CookieUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import com.taotao.cart.service.UserService;
import com.taotao.cart.bean.User;
import com.taotao.web.threadlocal.UserThreadLocal;

/**
 * 编写过滤器，检查用户是否已经登录
 *
 * @author Dong
 */
public class UserLoginHandlerInterceptor implements HandlerInterceptor {

    public static final String COOKIE_NAME = "TT_TOKEN";

    @Autowired
    private UserService userService;

    @Override
    public boolean preHandle(HttpServletRequest request,
                             HttpServletResponse response, Object handler) throws Exception {
        String token = CookieUtils.getCookieValue(request, COOKIE_NAME);

        if (StringUtils.isEmpty(token)) {
            //在购物车中，未登录，放行
            return true;
        }

        User user = this.userService.queryByToken(token);

        if (null == user) {
            //在购物车中，登录超时，放行
            return true;
        }

        //登录成功
        UserThreadLocal.set(user);//将user对象放置到本地线程中，方便在Controller和Service中获取

        return true;
    }

    @Override
    public void postHandle(HttpServletRequest request,
                           HttpServletResponse response, Object handler,
                           ModelAndView modelAndView) throws Exception {

    }

    @Override
    public void afterCompletion(HttpServletRequest request,
                                HttpServletResponse response, Object handler, Exception ex)
            throws Exception {
        UserThreadLocal.set(null);//完成之后清空本地线程中的user对象数据
    }

}
