package com.taotao.web;

import com.taotao.web.pojo.User;

/**
 * Created by aoter on 2017/7/28.
 */
public class UserThreadLocal {
    private static final ThreadLocal<User> LOCAL = new ThreadLocal<User>();

    private UserThreadLocal() {

    }

    public static void set(User user) {
        LOCAL.set(user);
    }

    public static User get() {
        return LOCAL.get();
    }
}
