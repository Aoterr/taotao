package com.taotao.sso.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.taotao.sso.mapper.UserMapper;
import com.taotao.sso.pojo.User;
import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.beans.factory.ObjectFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    UserMapper userMapper;

    @Autowired
    RedisService redisService;

    public static ObjectMapper MAPPER = new ObjectMapper();

    private static final Integer REDIS_TOKEN_TIME = 60 * 30;

    public Boolean check(String param, Integer type) {
        User record = new User();
        switch (type) {
            case 1:
                record.setUsername(param);
                break;
            case 2:
                record.setPassword(param);
                break;
            case 3:
                record.setEmail(param);
                break;
            default:
                return null;
        }
        return this.userMapper.selectOne(record) == null;
    }

    /**
     * 先找到一个在匹配一个
     * 加快查询速度
     *
     * @param name
     * @param pass
     * @return
     */
    public String doLogin(String name, String pass) throws Exception {

        User record = new User();
        record.setUsername(name);
        User user = userMapper.selectOne(record);
        if (null == user)
            return null;
        //比对用户名和密码是否相同
//        if (!pass.equals(DigestUtils.md5Hex(user.getPassword()))) {
//            return null;
//        }
        //登录成功，将用户信息保存到redis中
        String token = DigestUtils.md2Hex(name + System.currentTimeMillis());
        //放入redis
        this.redisService.set("TOKEN" + token, MAPPER.writeValueAsString(user), 60 * 30);
        return token;
    }
}
