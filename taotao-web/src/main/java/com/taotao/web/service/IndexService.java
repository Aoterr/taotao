package com.taotao.web.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by YMSX30004 on 2016/12/27.
 */
@Service
public class IndexService {

	@Autowired
	public ApiService apiService;

	public static final ObjectMapper MAPPER = new ObjectMapper();
	public String queryIndexAD1() {
		try {
			String url ="http://127.0.0.1:8081/rest/content?categoryId=31&page=1&rows=20";
			String jsonData = this.apiService.doGet(url);
			if(null==jsonData){
				return  null;
			}
			JsonNode jsonNode = MAPPER.readTree(jsonData);
			ArrayNode rows = (ArrayNode) jsonNode.get("rows");
			List<Map<String,Object>> result = new ArrayList<Map<String, Object>>();
			for (JsonNode row:rows){
				Map<String,Object> map = new LinkedHashMap<String,Object>();
				map.put("srcB",row.get("pic").asText());
				map.put("height",240);
				map.put("alt",row.get("title").asText());
				map.put("width",670);
				map.put("src",row.get("pic").asText());
				map.put("widthB",550);
				map.put("href",row.get("url").asText());
				map.put("heightB",240);
				result.add(map);
			}

			return  MAPPER.writeValueAsString(result);
		}catch (Exception e){

		}
		return null;

	}
}
