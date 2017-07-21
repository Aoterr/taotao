package com.taotao.manage.web;

import com.taotao.manage.pojo.ItemParamItem;
import com.taotao.manage.service.ItemParemItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@RequestMapping(value="item/param/item")
@Controller
public class ItemParemItemController {

	@Autowired
	ItemParemItemService itemParemItemService;
	@RequestMapping(value = "{itemId}",method = RequestMethod.GET)
	public ResponseEntity<ItemParamItem> quertItemParamItemById(@PathVariable("itemId") Long itemId){

		try {
			ItemParamItem record = new ItemParamItem();
			record.setItemId(itemId);
			ItemParamItem itemParamItem = itemParemItemService.queryOne(record);
			if(itemParamItem==null){
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
			}
			return ResponseEntity.ok(itemParamItem);
		}catch (Exception e){
			e.printStackTrace();
		}

		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
	}

}
