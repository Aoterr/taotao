package com.taotao.sso.web;

import com.mysql.jdbc.StringUtils;
import com.sun.org.apache.xpath.internal.operations.Bool;
import com.taotao.common.util.CookieUtils;
import com.taotao.sso.pojo.User;
import com.taotao.sso.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by leopride on 2017/7/21.
 */
@RequestMapping("user")
@Controller
public class UserController {

    @Autowired
    UserService userService;


    private static final String COKIE_NAME = "tt_token";

    @RequestMapping(value = "register", method = RequestMethod.GET)
    public String toRegister() {
        return "register";
    }

    @RequestMapping(value = "check/{param}/{type}", method = RequestMethod.GET)
    public ResponseEntity<Boolean> check(@PathVariable("param") String param,
                                         @PathVariable("type") Integer type) {
        Boolean b = userService.check(param, type);
        if (b == null) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }

        return ResponseEntity.ok(!b);
    }

    /**
     * login
     *
     * @return
     */
    @RequestMapping(value = "login", method = RequestMethod.GET)
    public String login() {
        return "login";
    }


    @RequestMapping(value = "doLogin",method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> doLogin(User user, HttpServletRequest request, HttpServletResponse response) {

        Map<String, Object> result = new HashMap<>();


        String token = null;
        try {
            token = this.userService.doLogin(user.getUsername(), user.getPassword());
            if (org.apache.commons.lang3.StringUtils.isEmpty(token)) {
                result.put("status", 500);
                return result;
            }

        } catch (Exception e) {
            e.printStackTrace();
            result.put("status", 500);
            return result;
        }

        result.put("status", 200);
        CookieUtils.setCookie(request, response, COKIE_NAME, token);
        return result;
    }

}
