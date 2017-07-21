package com.taotao.manage.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.taotao.manage.pojo.ItemCat;
import com.taotao.manage.service.ItemCatService;

@Controller
@RequestMapping(value = "item/cat")
public class ItemCatController {

	@Autowired
	public ItemCatService itemCatService;

	@RequestMapping(method = RequestMethod.GET)
	public ResponseEntity<List<ItemCat>> queryItemCatListByParentsId(
			@RequestParam(value="id",defaultValue = "0") Long pid
			) {
		
		try {
			ItemCat record = new ItemCat();
			record.setParentId(pid);
			List<ItemCat> list = this.itemCatService.queryListByWhere(record);			
			if (list == null) {				
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
			} else
				return ResponseEntity.ok(list);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);

	}
/*	@RequestMapping(value = "",method = RequestMethod.GET)
	public String query(){
		List<ItemCat> list = itemCatService.queryItemCatListByParentsId(1L);		
		System.out.println(list.size());
		return "login";
	}*/
	

}
