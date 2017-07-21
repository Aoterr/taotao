package com.taotao.web.pojo;

import org.apache.commons.lang3.StringUtils;

/**
 * Created by YMSX30004 on 2016/12/29.
 */
public class Item extends com.taotao.manage.pojo.Item {

	public String[] getImages(){
		return StringUtils.split(super.getImage(),',');
	}
}
