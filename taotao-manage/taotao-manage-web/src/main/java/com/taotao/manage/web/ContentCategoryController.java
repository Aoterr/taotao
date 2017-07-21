package com.taotao.manage.web;

import com.taotao.manage.pojo.ContentCategory;
import com.taotao.manage.service.ContentCategoryService;
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
@RequestMapping(value = "content/category")
@Controller
public class ContentCategoryController {
	@Autowired
	public ContentCategoryService contentCategoryService;

	@RequestMapping(method = RequestMethod.GET)
	public ResponseEntity<List<ContentCategory>> queryContentCategoryList(@RequestParam(value = "id", defaultValue = "0") Long parentId) {

		ContentCategory record = new ContentCategory();
		record.setParentId(parentId);
		try {
			List<ContentCategory> list = this.contentCategoryService.queryListByWhere(record);
			if (list.size() == 0) {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
			}
			return ResponseEntity.ok(list);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
	}

	/*
	新增
	 */
	@RequestMapping(method = RequestMethod.POST)
	public ResponseEntity<ContentCategory> addContentCategory(ContentCategory contentCategory) {

		try {
			contentCategory.setId(null);
			contentCategory.setIsParent(false);
			contentCategory.setSortOrder(1);
			contentCategory.setStatus(1);
			Integer count = contentCategoryService.save(contentCategory);
			return ResponseEntity.status(HttpStatus.CREATED).body(null);
			//判断当前节点的父节点isParent是否为true

		} catch (Exception e) {
			e.printStackTrace();
		}

		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
	}

	/*
	重命名
	 */
	@RequestMapping(method = RequestMethod.PUT)
	public ResponseEntity<Void> updateContentCategory(@RequestParam(value = "id") Long id, @RequestParam(value = "name") String name) {

		try {
			ContentCategory contentCategory = new ContentCategory();
			contentCategory.setId(id);
			contentCategory.setName(name);
			this.contentCategoryService.updateSelective(contentCategory);
			return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
	}

	@RequestMapping(method = RequestMethod.DELETE)
	public ResponseEntity<Void> deleteContentCategory(ContentCategory contentCategory) {
		try {
			this.contentCategoryService.deleteAll();
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		} catch (Exception e) {
			e.printStackTrace();
		}

		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
	}
}
