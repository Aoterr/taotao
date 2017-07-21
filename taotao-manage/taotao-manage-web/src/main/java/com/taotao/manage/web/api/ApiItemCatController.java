package com.taotao.manage.web.api;

import com.fasterxml.jackson.databind.ObjectMapper;


import com.taotao.manage.pojo.ItemCatResult;
import com.taotao.manage.service.ItemCatService;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

/**
 * Created by YMSX30004 on 2016/12/22.
 */
@RequestMapping(value = "api/item/cat")
@Controller
public class ApiItemCatController {

	public static final ObjectMapper MAPPER = new ObjectMapper();
	@Autowired
	public ItemCatService itemCatService;

	@RequestMapping(method = RequestMethod.GET)
	public ResponseEntity<String> queryItemCat(@RequestParam(value = "callback",required = false) String callback){
		try {
			ItemCatResult result = itemCatService.queryAllToTree();
			if(result==null){
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
			}
			String json = MAPPER.writeValueAsString(result);
			if(StringUtils.isEmpty(callback)){
				return ResponseEntity.ok(json);
			}else{
			return ResponseEntity.ok(callback+"("+json+")");}
		}catch (Exception e){
		}
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
	}
	/*@RequestMapping(method = RequestMethod.GET)
	public ResponseEntity<ItemCatResult> queryItemCat(){
		try {
			ItemCatResult ItemCatResult = this.itemCatService.queryAllToTree();
			return ResponseEntity.ok(ItemCatResult);
		}catch (Exception e){
			e.printStackTrace();
		}
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
	}*/
}
