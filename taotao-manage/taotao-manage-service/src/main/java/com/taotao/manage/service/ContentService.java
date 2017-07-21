package com.taotao.manage.service;

import com.github.abel533.entity.Example;
import com.github.abel533.mapper.Mapper;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.taotao.common.bean.EasyUIResult;
import com.taotao.manage.mapper.ContentCategoryMapper;
import com.taotao.manage.mapper.ContentMapper;
import com.taotao.manage.pojo.Content;
import com.taotao.manage.pojo.ContentCategory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by YMSX30004 on 2016/12/23.
 */
@Service
public class ContentService extends BaseService<Content>{
	@Autowired
	public ContentMapper contentMapper;

	@Override
	public Mapper<Content> getMapper() {
		return this.contentMapper;
	}

	public EasyUIResult queryListByCategoryId(Long categoryId, Integer page, Integer rows) {
		PageHelper.startPage(page,rows);
		Example example = new Example(Content.class);
		example.setOrderByClause("updated DESC");
		example.createCriteria().andEqualTo("categoryId",categoryId);
		List<Content> list = contentMapper.selectByExample(example);
		PageInfo<Content> pageInfo = new PageInfo<Content>(list);
		return new EasyUIResult(pageInfo.getTotal(),pageInfo.getList());
	}
}
