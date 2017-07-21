package com.taotao.manage.service;

import com.github.abel533.mapper.Mapper;
import com.taotao.manage.mapper.ContentCategoryMapper;
import com.taotao.manage.pojo.ContentCategory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by YMSX30004 on 2016/12/23.
 *
 *
 */
@Service
public class ContentCategoryService extends BaseService<ContentCategory>{
	@Autowired
	public ContentCategoryMapper contentCategoryMapper;

	@Override
	public Mapper<ContentCategory> getMapper() {
		return this.contentCategoryMapper;
	}

	public void deleteAll() {

	}
}
