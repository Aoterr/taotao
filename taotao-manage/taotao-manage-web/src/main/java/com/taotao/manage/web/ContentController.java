package com.taotao.manage.web;

import com.taotao.common.bean.EasyUIResult;
import com.taotao.manage.pojo.Content;
import com.taotao.manage.pojo.ContentCategory;
import com.taotao.manage.service.ContentCategoryService;
import com.taotao.manage.service.ContentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

/**
 * Created by YMSX30004 on 2016/12/23.
 */
@RequestMapping(value = "content")
@Controller
public class ContentController {
	@Autowired
	public ContentService contentService;
	@RequestMapping(method = RequestMethod.POST)
	public ResponseEntity<Void> saveContent(Content content){
		try {
			content.setId(null);
			this.contentService.save(content);
			return ResponseEntity.status(HttpStatus.CREATED).build();
		}catch (Exception e){
			e.printStackTrace();
		}
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
	}

	@RequestMapping(method = RequestMethod.GET)
	public ResponseEntity<EasyUIResult> queryListByCategoryId(@RequestParam(value = "categoryId") Long categoryId,
															  @RequestParam(value = "page",defaultValue = "1") Integer page,
															  @RequestParam(value = "rows",defaultValue = "10") Integer rows){

		try {
				EasyUIResult easyUIResult = this.contentService.queryListByCategoryId(categoryId,page,rows);
				return ResponseEntity.ok(easyUIResult);
		}catch (Exception e){
			e.printStackTrace();
		}
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
	}

}
