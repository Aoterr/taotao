package com.taotao.manage.web.api;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.taotao.manage.pojo.ItemCatResult;
import org.apache.commons.lang3.StringUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

/**
 * Created by YMSX30004 on 2017/2/21.
 */

@RequestMapping(value = "api/test")
@Controller
public class ApiTest {
	public static final ObjectMapper MAPPER = new ObjectMapper();
	@RequestMapping(method = RequestMethod.GET)
	public ResponseEntity<String> queryItemCat(){


String json = "{\"EBusinessID\":\"1273940\",\"UpdateTime\":\"2017-02-21 16:33:18\",\"Success\":true}";
				return ResponseEntity.ok(json);


	}
}
