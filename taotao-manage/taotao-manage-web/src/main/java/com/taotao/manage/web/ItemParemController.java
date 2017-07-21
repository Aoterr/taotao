package com.taotao.manage.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.taotao.manage.pojo.ItemParam;
import com.taotao.manage.service.ItemParemService;

@RequestMapping(value = "item/param/")
@Controller
public class ItemParemController {

	@Autowired
	private ItemParemService ItemParemService;

	@RequestMapping(value = "{itemCatId}", method = RequestMethod.GET)
	public ResponseEntity<ItemParam> queryByItemCatId(@PathVariable("itemCatId") Long itemCatId) {

		try {
			ItemParam record = new ItemParam();
			record.setItemCatId(itemCatId);

			ItemParam itemParam = this.ItemParemService.queryOne(record);
			if (itemParam == null) {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
			} else {

				return ResponseEntity.status(HttpStatus.OK).body(itemParam);
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			
		}

		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);

	}

	@RequestMapping(value = "{itemCatId}", method = RequestMethod.POST)
	public ResponseEntity<Void> saveItemParam(@PathVariable("itemCatId") Long itemCatId,
			@RequestParam("paramData") String paramData) {

		try {
			ItemParam record = new ItemParam();
			record.setId(null);
			record.setItemCatId(itemCatId);
			record.setParamData(paramData);
			this.ItemParemService.save(record);
			return ResponseEntity.status(HttpStatus.CREATED).build();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();

	}

}
