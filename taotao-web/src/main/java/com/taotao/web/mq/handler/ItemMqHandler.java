package com.taotao.web.mq.handler;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.taotao.web.service.ItemService;

import java.io.IOException;

public class ItemMqHandler {


    private static final ObjectMapper MAPPER = new ObjectMapper();

    /**
     * 删除缓存中的商品数据，完成数据同步
     *
     * @param msg
     */
    public void execute(String msg) {

        JsonNode jsonNode = null;
        try {
            jsonNode = MAPPER.readTree(msg);
        } catch (IOException e) {
            e.printStackTrace();
        }
        Long id = jsonNode.get("itemId").asLong();
        System.out.println("读到mq数据---" + id);
    }
}
