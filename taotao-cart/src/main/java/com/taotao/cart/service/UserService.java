package com.taotao.cart.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.taotao.cart.bean.User;
import com.taotao.common.service.ApiService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

/**
 * Created by aoter on 2017/7/28.
 */

@Service
public class UserService {

    @Autowired
    ApiService apiService;

    @Value("${TAOTAO_SSO_URL}")
    public String TAOTAO_SSO_URL;

    public static final ObjectMapper MAPPER = new ObjectMapper();

    public User queryByToken(String token) {
        String url = TAOTAO_SSO_URL + "/service/user/" + token;
        try {
            String jsonData = this.apiService.doGet(url);
            if (StringUtils.isNotEmpty(jsonData)) {
                return MAPPER.readValue(jsonData, User.class);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;

    }
}
