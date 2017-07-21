package com.taotao.manage.web.api;

import com.taotao.manage.pojo.ItemDesc;
import com.taotao.manage.service.ItemDescService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping(value="api/item/desc")
public class ApiItemDescController {
	
	@Autowired
	public ItemDescService itemDescService;
	
	@RequestMapping(value="{itemId}",method=RequestMethod.GET)
	public ResponseEntity<ItemDesc> queryByItemId(@PathVariable(value="itemId") Long itemId){
		
		try {
			ItemDesc itemDesc = itemDescService.queryById(itemId);
			return new ResponseEntity(itemDesc,HttpStatus.OK);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
	}

	
}
