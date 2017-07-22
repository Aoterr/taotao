package com.taotao.sso.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * Created by leopride on 2017/7/21.
 */
@RequestMapping("user")
@Controller
public class UserController {

    @RequestMapping(value = "register", method = RequestMethod.GET)
    public String toRegister() {
        System.out.println("111");
        return "register";
    }
}
