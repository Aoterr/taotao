package com.taotao.web.controller;

import com.taotao.manage.pojo.ItemDesc;
import com.taotao.manage.pojo.ItemParam;
import com.taotao.web.pojo.Item;
import com.taotao.web.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

/**
 * Created by YMSX30004 on 2016/12/29.
 */
@RequestMapping(value = "item")
@Controller
public class ItemController {

	@Autowired
	private ItemService itemService;
	@RequestMapping(value = "{itemId}")
	public ModelAndView showDetail(@PathVariable("itemId") Long itemId){

		ModelAndView mv = new ModelAndView("item");
		Item item = this.itemService.queryItemById(itemId);
		ItemDesc itemDesc = this.itemService.queryItemDescById(itemId);
		String html = this.itemService.queryItemParamItemById(itemId);
		mv.addObject("item",item);
		mv.addObject("itemDesc",itemDesc);
		mv.addObject("itemParam",html);
		return mv;
	}
}
