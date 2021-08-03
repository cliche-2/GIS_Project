package com.geoserver.myapp.lamp;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class LampDao {
	
	@Autowired
	private SqlSessionTemplate sqlSession;
	
	
	public List<LampDto> selectAll()
	{
		return sqlSession.selectList("sql.lampSelect");
	}
	
	public List<LampDto> selectArea(String area){
		Map map = new HashMap();
		map.put("area", area);
		
		return sqlSession.selectList("sql.lampSelectLikeArea",map);
	}
}
