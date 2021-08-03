package com.geoserver.myapp.cctv;

import java.util.List;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;


@Controller
@RequestMapping(value = "/cctv")
public class CctvController {
	
	@Autowired
	private CctvDao dao;
	
	@ResponseBody
	@RequestMapping(value = "/select", method = RequestMethod.GET)
	public String select(@RequestParam("detail") String detail, @RequestParam("area") String area) {
		
		List<CctvDto> list = null;
		
		System.out.println("recv "+detail+" "+area);
		
		
		// if both
		if(area!="") {
			System.out.println("if both");
			list = dao.selectBoth(detail, area);
			//list = dao.selectPurpose(detail); // temp
		// if detail only
		}else{
			System.out.println("if detail");
			list = dao.selectPurpose(detail);
		}
		
		JSONArray jArray = listToJArray(list);
		System.out.println("select "+jArray.size());
		
		return jArray.toJSONString();
		
		
	}
	
	private JSONArray listToJArray(List<CctvDto> list) {
		
		JSONArray jArray = new JSONArray();
		
		for (int i=0; i<list.size(); i++) {
			JSONObject jObject = new JSONObject();
			jObject.put("x", list.get(i).getLo());
			jObject.put("y", list.get(i).getLa());
			jArray.add(jObject);
		}
		
		return jArray;
	}
	

}
