package com.taotao.manage.web;

import javax.xml.bind.annotation.adapters.XmlJavaTypeAdapter.DEFAULT;

import org.apache.commons.lang3.StringUtils;
import org.omg.CORBA.Request;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.taotao.common.bean.EasyUIResult;
import com.taotao.manage.pojo.Item;
import com.taotao.manage.pojo.ItemDesc;
import com.taotao.manage.service.ItemDescService;
import com.taotao.manage.service.ItemService;

@Controller
@RequestMapping(value = "item")
public class ItemController {

	private static final Logger LOGGER = LoggerFactory.getLogger(ItemController.class);

	@Autowired
	public ItemService itemService;

	@RequestMapping(method = RequestMethod.POST)
	public ResponseEntity<Item> saveItem(Item item, @RequestParam("desc") String desc, @RequestParam("itemParams") String itemParams) {

		try {
			if (LOGGER.isInfoEnabled()) {
				LOGGER.info("新增商品,item={},desc={}，itemParamitem={}", item, desc, itemParams);
			}
			if (StringUtils.isEmpty(item.getTitle())) {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
			}
			item.setStatus(1);
			item.setId(null);
			itemService.saveItem(item, desc, itemParams);

			return ResponseEntity.status(HttpStatus.CREATED).body(null);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			LOGGER.error("新增商品出错！item=" + item.toString(), e);
		}

		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
	}

	@RequestMapping(method = RequestMethod.GET)
	public ResponseEntity<EasyUIResult> queryItemList(@RequestParam(value = "page", defaultValue = "1") Integer page,
													  @RequestParam(value = "rows", defaultValue = "30") Integer rows) {

		try {
			EasyUIResult eaEasyUIResult = itemService.queryItemList(page, rows);
			return new ResponseEntity(eaEasyUIResult, HttpStatus.OK);

		} catch (Exception e) {
			// TODO Auto-generated catch block

		}
		return new ResponseEntity(null, HttpStatus.INTERNAL_SERVER_ERROR);
	}

	@RequestMapping(method = RequestMethod.PUT)
	public ResponseEntity<Void> updateItem(Item item, @RequestParam("desc") String desc, @RequestParam("itemParams") String itemParams) {
		if (item.getTitle() == null) {
			return new ResponseEntity(HttpStatus.BAD_REQUEST);
		}
		try {
			boolean b = itemService.updateItem(item, desc, itemParams);
			if (!b) {
				return new ResponseEntity(null, HttpStatus.INTERNAL_SERVER_ERROR);
			}
			return new ResponseEntity(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return new ResponseEntity(null, HttpStatus.INTERNAL_SERVER_ERROR);
	}
}
