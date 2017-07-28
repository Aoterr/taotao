package com.taotao.web.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.taotao.web.UserThreadLocal;
import com.taotao.web.httpclient.HttpResult;
import com.taotao.web.pojo.Order;
import com.taotao.web.pojo.User;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

/**
 * Created by aoter on 2017/7/28.
 */
@Service
public class OrderService {


    @Autowired
    ApiService apiService;

    @Value("${TAOTAO_ORDER_URL}")
    String TAOTAO_ORDER_URL;

    public static final ObjectMapper MAPPER = new ObjectMapper();

    /**
     * 提交订单
     *
     * @param order
     * @return
     */
    public String submit(Order order) {
        User user = UserThreadLocal.get();
        order.setUserId(user.getId());
        order.setBuyerNick(user.getUsername());
        try {
            String url = TAOTAO_ORDER_URL + "/order/create";
            String json = MAPPER.writeValueAsString(order);
            HttpResult httpResult = apiService.doPostJson(url, json);
            if (httpResult.getCode().intValue() == 200) {
                String body = httpResult.getBody();
                JsonNode jsonNode = MAPPER.readTree(body);
                if (jsonNode.get("status").asInt() == 200) {
                    return jsonNode.get("data").asText();
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    public Order queryById(String id) {
        String url = TAOTAO_ORDER_URL + "order/query/" + id;
        try {
            String jsonData = this.apiService.doGet(url);
            if (StringUtils.isNotEmpty(jsonData)) {
                Order order = MAPPER.readValue(jsonData, Order.class);
                return order;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;

    }
}
