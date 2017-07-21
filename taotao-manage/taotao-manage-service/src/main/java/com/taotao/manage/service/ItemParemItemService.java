package com.taotao.manage.service;

import com.github.abel533.entity.Example;
import com.taotao.manage.mapper.ItemParamItemMapper;
import com.taotao.manage.pojo.ItemParamItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.github.abel533.mapper.Mapper;
import com.taotao.manage.mapper.ItemParamMapper;
import com.taotao.manage.pojo.ItemParam;

import java.util.Date;

@Service
public class ItemParemItemService extends BaseService<ItemParamItem>{

	@Autowired
	ItemParamItemMapper itemParamItemMapper;
	
	@Override
	public Mapper<ItemParamItem> getMapper() {
		// TODO Auto-generated method stub
		return itemParamItemMapper;
	}


	public Integer updateByExampleSelective(Long itemid,String itemParams){
		ItemParamItem itemParamItem = new ItemParamItem();
		itemParamItem.setParamData(itemParams);
		itemParamItem.setUpdated(new Date());
		Example example = new Example(ItemParamItem.class);
		example.createCriteria().andEqualTo("itemId",itemid);

		return itemParamItemMapper.updateByExampleSelective(itemParamItem,example);
	}

}
