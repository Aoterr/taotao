package com.taotao.web.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.taotao.manage.pojo.ItemDesc;
import com.taotao.manage.pojo.ItemParamItem;
import com.taotao.web.pojo.Item;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by YMSX30004 on 2016/12/29.
 */
@Service
public class ItemService {

	@Autowired
	private ApiService apiService;

	private String TAOTAO_MANAGE_URL = "http://127.0.0.1:8081";
	private static final ObjectMapper MAPPER = new ObjectMapper();

	/**
	 * 查询商品
	 * @param id
	 * @return
	 */
	public Item queryItemById(Long id) {
		try {
			String url = TAOTAO_MANAGE_URL + "/rest/api/item/" + id;
			String jsonData = this.apiService.doGet(url);
			return MAPPER.readValue(jsonData, Item.class);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	/**
	 * 查询商品描述
	 * @param itemId
	 * @return
	 */
	public ItemDesc queryItemDescById(Long itemId) {
		try {
			String url = TAOTAO_MANAGE_URL + "/rest/api/item/desc/" + itemId;
			String jsonData = this.apiService.doGet(url);
			return MAPPER.readValue(jsonData, ItemDesc.class);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	public String queryItemParamItemById(Long itemId) {
		try {
			String url = TAOTAO_MANAGE_URL+"/rest/api/item/param/item/"+itemId;
			String jsonData = this.apiService.doGet(url);
			JsonNode jsonNode =MAPPER.readTree(jsonData);
			String paramData = jsonNode.get("paramData").asText();
			ArrayNode arrayNode = (ArrayNode) MAPPER.readTree(paramData);
			StringBuilder sb = new StringBuilder();
			sb.append("<table cellpadding=\"0\" width=\"100%\" class=\"Ptable\"><tbody>");
			for(JsonNode jn:arrayNode){
				sb.append("<tr><th class=\"tdTitle\" colspan=\"2\">"+jn.get("group").asText()+"</th></tr>");
				ArrayNode params = (ArrayNode) jn.get("params");
				for(JsonNode param:params){
					sb.append("<tr><td class=\"tdTitle\">"+param.get("k").asText()+"</td><td>"+param.get("v").asText());

				}
				sb.append("</tbody></table>");
			}



		return sb.toString();
		}catch (Exception e){
			e.printStackTrace();
		}
		return null;
	}
}
