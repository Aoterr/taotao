package com.taotao.manage.web.api;

import com.taotao.manage.pojo.Item;
import com.taotao.manage.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * Created by YMSX30004 on 2016/12/29.
 */
@RequestMapping(value = "api/item")
@Controller
public class ApiItemController {

	@Autowired
	public ItemService itemService;

	@RequestMapping(value = "{itemId}",method = RequestMethod.GET)
	public ResponseEntity<Item> queryItemById(@PathVariable(value = "itemId") Long itemId){
		try {
			Item item = itemService.queryById(itemId);
			if(item!=null){
				return ResponseEntity.ok().body(item);
			}
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}catch (Exception e){
			e.printStackTrace();
		}
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
	}
}
