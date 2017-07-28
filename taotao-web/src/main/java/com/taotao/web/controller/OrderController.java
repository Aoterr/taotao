package com.taotao.web.controller;

import com.taotao.web.UserThreadLocal;
import com.taotao.web.interceptor.UserLoginHandlerInterceptor;
import com.taotao.web.pojo.Item;
import com.taotao.web.pojo.Order;
import com.taotao.web.pojo.User;
import com.taotao.web.service.ItemService;
import com.taotao.web.service.OrderService;
import com.taotao.web.service.UserService;
import org.apache.commons.lang3.StringUtils;
import org.joda.time.DateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by aoter on 2017/7/28.
 */
@Controller
@RequestMapping(value = "order")
public class OrderController {

    @Autowired
    ItemService itemService;

    @Autowired
    OrderService orderService;

    @Autowired
    UserService userService;

    /**
     * 去订单确认页
     *
     * @param itemId
     * @return
     */
    @RequestMapping(value = "{itemId}", method = RequestMethod.GET)
    public ModelAndView toOrder(@PathVariable("itemId") Long itemId) {
        ModelAndView mv = new ModelAndView("order");
        Item item = this.itemService.queryItemById(itemId);
        mv.addObject(item);
        return mv;
    }

    /**
     * 提交订单
     *
     * @param order
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "submit", method = RequestMethod.POST)
    public Map<String, Object> submit(Order order) {
        Map map = new HashMap();

        String orderId = this.orderService.submit(order);

        if (StringUtils.isEmpty(orderId)) {
            //订单创建失败
            map.put("status", 500);
        } else {
            map.put("status", 200);
            map.put("data", orderId);
        }
        return map;
    }

    @RequestMapping(value = "success", method = RequestMethod.GET)
    public ModelAndView success(@RequestParam("id") String id) {
        ModelAndView mv = new ModelAndView("success");
        Order order = this.orderService.queryById(id);
        mv.addObject("order", order);
        mv.addObject("data", new DateTime().plusDays(2).toString("mm月dd日"));
        return mv;
    }
}
