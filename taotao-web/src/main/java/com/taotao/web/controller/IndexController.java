package com.taotao.web.controller;

import com.taotao.web.service.IndexService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

/**
 * Created by YMSX30004 on 2016/12/22.
 */
@RequestMapping("index")
@Controller
public class IndexController {


	@Autowired
	public IndexService indexService;

	@RequestMapping(method = RequestMethod.GET)
	public ModelAndView index(){
		ModelAndView mv = new ModelAndView("index");
		String indexAD =  indexService.queryIndexAD1();
		mv.addObject("indexAD",indexAD);
		return mv;
	}
}
